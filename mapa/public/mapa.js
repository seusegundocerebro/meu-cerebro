// Mapa 3D do cérebro. Cada bolinha é uma nota .md; cada fio é um [[link]] entre elas.
// O mapa pergunta ao servidor a cada 4 s se algo mudou: nota que o Claude criar aparece sozinha, piscando.
const CDN = "https://cdn.jsdelivr.net/npm/";
const $ = (s) => document.querySelector(s);
// ?lento=20 estica os tempos (aviso, brilho, voo da câmera) pra gravar vídeo num computador sem placa de vídeo
const LENTO = Math.max(1, Number(new URLSearchParams(location.search).get("lento")) || 1);
const LEVE = new URLSearchParams(location.search).has("leve");
document.body.classList.toggle("leve", LEVE);

const CORES = {
  ideia: "#ffb020",
  decisao: "#00e5ff",
  aprendizado: "#39ff88",
  projeto: "#b48cff",
  pessoa: "#ff4f9a",
  faisca: "#ffe14a",
  nota: "#a9bdd2",
  fantasma: "#435268",
};
const NOMES = {
  ideia: "Ideia",
  decisao: "Decisão",
  aprendizado: "Aprendizado",
  projeto: "Projeto",
  pessoa: "Pessoa",
  faisca: "Faísca",
  nota: "Nota",
  fantasma: "Ainda sem nota",
};
const grupo = (n) => (CORES[n.especie] ? n.especie : "nota");
const norm = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );
const idDe = (x) => (x && typeof x === "object" ? x.id : x);

let THREE, graph, CSS2DObject, GEO_NO, TEX_HALO;
let nos = new Map();
let links = [];
let vizinhos = new Map();
let versaoAtual = "";
let foco = null;
let achados = null; // Set de ids que casam com a busca
const oculto = new Set();
const recentes = new Map(); // id -> quando nasceu (brilha por 25 s)
let rotulados = new Set();
let ultimaInteracao = Date.now();
let aberta = null; // { id, mtime, texto }
let editando = false;
let alvosDaNota = null; // [[link]] → nota, resolvido pelo servidor pra nota aberta
let animados = []; // só notas novas e faíscas pendentes pulsam a cada quadro

async function api(url, corpo) {
  const r = await fetch(
    url,
    corpo
      ? {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(corpo),
        }
      : undefined,
  );
  const j = await r.json().catch(() => ({}));
  if (!r.ok)
    throw Object.assign(new Error(j.erro || "erro " + r.status), {
      status: r.status,
    });
  return j;
}

let toastTimer;
function toast(txt, ms = 4500) {
  const t = $("#toast");
  t.textContent = txt;
  t.hidden = false;
  clearTimeout(toastTimer);
  if (ms) toastTimer = setTimeout(() => (t.hidden = true), ms * LENTO);
}

// A barra não conversa com IA: prepara o comando para continuar no Claude Code.
async function copiaPergunta(txt) {
  try {
    await navigator.clipboard.writeText(txt);
    return true;
  } catch {
    const campo = document.createElement("textarea");
    campo.value = txt;
    campo.setAttribute("readonly", "");
    campo.style.position = "fixed";
    campo.style.opacity = "0";
    document.body.appendChild(campo);
    campo.select();
    let copiou = false;
    try {
      copiou = document.execCommand("copy");
    } catch {}
    campo.remove();
    if (!copiou) {
      $("#pergunta").value = txt;
      $("#pergunta").select();
    }
    return copiou;
  }
}

$("#comando").addEventListener("submit", async (e) => {
  e.preventDefault();
  const pergunta = $("#pergunta").value.trim();
  if (!pergunta) return $("#pergunta").focus();
  const comando = /^\/perguntar(?:\s|$)/.test(pergunta)
    ? pergunta
    : "/perguntar " + pergunta;
  const copiou = await copiaPergunta(comando);
  toast(
    copiou
      ? "Copiado. Cole no Claude Code."
      : "O comando ficou selecionado. Copie e cole no Claude Code.",
    4200,
  );
});

const ReconhecimentoVoz =
  window.SpeechRecognition || window.webkitSpeechRecognition;
if (ReconhecimentoVoz) {
  const mic = $("#btn-mic");
  const reconhecimento = new ReconhecimentoVoz();
  reconhecimento.lang = "pt-BR";
  reconhecimento.interimResults = true;
  reconhecimento.continuous = false;
  let ouvindo = false;
  let textoAntes = "";
  mic.hidden = false;
  mic.onclick = () => {
    if (ouvindo) return reconhecimento.stop();
    textoAntes = $("#pergunta").value.trim();
    try {
      reconhecimento.start();
    } catch {}
  };
  reconhecimento.onstart = () => {
    ouvindo = true;
    mic.classList.add("gravando");
    mic.title = "Parar de ouvir";
  };
  reconhecimento.onresult = (e) => {
    let falado = "";
    for (let i = 0; i < e.results.length; i++)
      falado += e.results[i][0].transcript;
    $("#pergunta").value = [textoAntes, falado.trim()].filter(Boolean).join(" ");
  };
  reconhecimento.onerror = () => toast("Não consegui ouvir. Tente de novo.");
  reconhecimento.onend = () => {
    ouvindo = false;
    mic.classList.remove("gravando");
    mic.title = "Falar";
    $("#pergunta").focus();
  };
}

// ---------- aparência ----------
function brilhando(id) {
  const t = recentes.get(id);
  if (t && Date.now() - t > 25000 * LENTO) recentes.delete(id);
  return recentes.has(id);
}
function visivel(n) {
  return !oculto.has(n.especie === "fantasma" ? "fantasma" : grupo(n));
}
function apagado(n) {
  if (achados) return !achados.has(n.id);
  if (foco)
    return n.id !== foco && !(vizinhos.get(foco) || new Set()).has(n.id);
  return false;
}
function corNo(n) {
  if (apagado(n)) return "#1b2233";
  if (n.aviso) return "#ff5a72";
  if (n.status === "feito") return "#79ffad";
  if (n.especie === "fantasma") return CORES.fantasma;
  const base = CORES[grupo(n)];
  const k = Math.min(0.48, Math.max(0, n.grau - 1) * 0.045);
  if (!k) return base;
  const rgb = base.slice(1).match(/../g).map((x) => parseInt(x, 16));
  return (
    "#" +
    rgb
      .map((v) => Math.round(v + (255 - v) * k).toString(16).padStart(2, "0"))
      .join("")
  );
}
function tamanho(n) {
  return (
    1.05 +
    Math.min(Math.sqrt(n.grau || 0) * 0.34, 1.25) +
    Math.min(Math.sqrt(n.uso || 0) * 0.08, 0.35) +
    (brilhando(n.id) ? 0.7 : 0) +
    (n.id === foco ? 0.38 : 0)
  );
}
function ligaFoco(l) {
  return foco && (idDe(l.source) === foco || idDe(l.target) === foco);
}
function corLink(l) {
  const a = nos.get(idDe(l.source));
  if (ligaFoco(l)) return a ? corNo(a) : CORES.decisao;
  if (foco || achados) return "rgba(62,78,98,0.1)";
  return a ? corNo(a) : CORES.nota;
}
function particulas(l) {
  const a = nos.get(idDe(l.source)),
    b = nos.get(idDe(l.target));
  if (ligaFoco(l)) return 3;
  if ((a && brilhando(a.id)) || (b && brilhando(b.id))) return 4;
  // faísca esperando resposta fica "pensando": pulso correndo nos fios dela
  if (
    (a && a.especie === "faisca" && a.status !== "aceita") ||
    (b && b.especie === "faisca" && b.status !== "aceita")
  )
    return 2;
  return 0;
}
function escolheRotulos() {
  const lista = [...nos.values()].filter(
    (n) => n.especie !== "fantasma" && visivel(n),
  );
  lista.sort((a, b) => b.grau + (b.uso || 0) - (a.grau + (a.uso || 0)));
  const s = new Set(
    lista.slice(0, Math.min(14, Math.ceil(lista.length / 4))).map((n) => n.id),
  );
  if (foco) {
    s.add(foco);
    for (const v of vizinhos.get(foco) || []) s.add(v);
  }
  for (const id of recentes.keys()) s.add(id);
  if (achados) for (const id of [...achados].slice(0, 20)) s.add(id);
  return s;
}
// rótulo nasce uma vez por nota e só liga/desliga (recriar a cada pintura deixava rótulo duplicado na tela)
// rótulo só nasce pra nota que precisa dele (cofre com milhares de notas não vira milhares de divs)
// e depois só liga/desliga e acompanha o tamanho da bolinha
function criaRotulo(n) {
  const div = document.createElement("div");
  div.className = "rotulo";
  n.__rot = new CSS2DObject(div);
  return n.__rot;
}
function ajustaRotulo(n) {
  const r = n.__rot;
  if (!r) return;
  r.element.textContent =
    n.titulo.length > 38 ? n.titulo.slice(0, 36) + "…" : n.titulo;
  r.element.style.setProperty("--cor", CORES[n.especie] || CORES.nota);
  r.element.classList.toggle("foco", n.id === foco);
  r.element.classList.toggle("nova", brilhando(n.id));
  r.element.classList.toggle("apagado", apagado(n));
  r.position.set(0, tamanho(n) * 2.7 + 2, 0);
  r.visible = rotulados.has(n.id) && visivel(n);
}
function objetoNo(n) {
  const g = new THREE.Group();
  const cor = new THREE.Color(corNo(n));
  const core = new THREE.Mesh(
    GEO_NO,
    new THREE.MeshBasicMaterial({ color: cor, transparent: true }),
  );
  const halo = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: TEX_HALO,
      color: cor,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  // O quadrado transparente do halo é grande; só o núcleo visível recebe clique.
  halo.raycast = () => {};
  n.__core = core;
  n.__halo = halo;
  n.__fase = Math.random() * Math.PI * 2;
  n.__grupo = g;
  g.add(core, halo);
  if (rotulados.has(n.id)) g.add(n.__rot || criaRotulo(n));
  atualizaObjetoNo(n);
  return g;
}
function atualizaObjetoNo(n) {
  if (!n.__core || !n.__halo) return;
  const r = tamanho(n);
  const cor = new THREE.Color(corNo(n));
  const fraco = apagado(n);
  n.__core.material.color.copy(cor);
  n.__core.material.opacity = fraco
    ? 0.18
    : n.especie === "fantasma"
      ? 0.38
      : 0.96;
  n.__core.scale.setScalar(r);
  n.__halo.material.color.copy(cor);
  n.__halo.material.opacity = fraco
    ? 0.025
    : brilhando(n.id)
      ? 0.92
      : n.especie === "fantasma"
        ? 0.14
        : 0.42;
  n.__halo.scale.setScalar(r * (brilhando(n.id) ? 7 : 4.8));
}
function pinta() {
  rotulados = escolheRotulos();
  animados = [...nos.values()].filter(
    (n) =>
      recentes.has(n.id) ||
      (n.especie === "faisca" && n.status !== "aceita"),
  );
  graph
    .nodeColor(corNo)
    .nodeVal(tamanho)
    .nodeVisibility(visivel)
    .linkVisibility((l) => {
      const a = nos.get(idDe(l.source)),
        b = nos.get(idDe(l.target));
      return a && b && visivel(a) && visivel(b);
    })
    .linkColor(corLink)
    .linkWidth((l) => (ligaFoco(l) ? 0.9 : 0.25))
    .linkDirectionalParticles(particulas)
    .linkDirectionalParticleColor(corLink);
  for (const n of nos.values()) {
    if (!n.__rot && rotulados.has(n.id) && n.__grupo)
      n.__grupo.add(criaRotulo(n));
    atualizaObjetoNo(n);
    ajustaRotulo(n);
  }
}

// ---------- dados ----------
function montaVizinhos() {
  vizinhos = new Map();
  for (const l of links) {
    const a = idDe(l.source),
      b = idDe(l.target);
    if (!vizinhos.has(a)) vizinhos.set(a, new Set());
    if (!vizinhos.has(b)) vizinhos.set(b, new Set());
    vizinhos.get(a).add(b);
    vizinhos.get(b).add(a);
  }
}
async function carrega(atualizando) {
  const g = await api("/api/grafo");
  versaoAtual = g.versao;
  const antigos = nos;
  nos = new Map();
  const nascidos = [];
  for (const n of g.nos) {
    const a = antigos.get(n.id);
    if (a) {
      for (const k of [
        "titulo",
        "especie",
        "status",
        "aviso",
        "criado",
        "uso",
        "grau",
      ])
        a[k] = n[k];
      nos.set(n.id, a);
    } else {
      nos.set(n.id, n);
      if (atualizando && n.especie !== "fantasma") {
        recentes.set(n.id, Date.now());
        nascidos.push(n);
      }
    }
  }
  links = g.links;
  montaVizinhos();
  // nota nova nasce perto de quem ela liga, não no meio do nada
  for (const n of nascidos) {
    const v = [...(vizinhos.get(n.id) || [])]
      .map((id) => antigos.get(id))
      .find((x) => x && x.x != null);
    if (v)
      Object.assign(n, {
        x: v.x + (Math.random() - 0.5) * 20,
        y: v.y + (Math.random() - 0.5) * 20,
        z: v.z + (Math.random() - 0.5) * 20,
      });
  }
  graph.graphData({
    nodes: [...nos.values()],
    links: links.map((l) => ({ source: l.source, target: l.target })),
  });
  links = graph.graphData().links;
  montaLegenda();
  contagem();
  pinta();
  if (nascidos.length === 1)
    toast("🧠 Nasceu no cérebro: " + nascidos[0].titulo);
  else if (nascidos.length > 1)
    toast(`🧠 ${nascidos.length} notas novas no cérebro`);
  if (aberta && !editando && nos.has(aberta.id))
    abre(aberta.id, { semVoo: true, semUso: true });
}
function contagem() {
  const reais = [...nos.values()].filter((n) => n.especie !== "fantasma");
  const faiscas = reais.filter(
    (n) => n.especie === "faisca" && n.status !== "aceita",
  ).length;
  const avisos = reais.filter((n) => n.aviso).length;
  let t = `${reais.length} neurônios · ${links.length} sinapses`;
  if (faiscas)
    t += ` · ✨ ${faiscas} faísca${faiscas > 1 ? "s" : ""} esperando você`;
  if (avisos) t += ` · ${avisos} desatualizada${avisos > 1 ? "s" : ""}`;
  $("#contagem").textContent = t;
}
function montaLegenda() {
  const cont = {};
  for (const n of nos.values()) {
    const g = n.especie === "fantasma" ? "fantasma" : grupo(n);
    cont[g] = (cont[g] || 0) + 1;
  }
  const el = $("#legenda");
  el.innerHTML = "";
  for (const g of Object.keys(CORES)) {
    if (!cont[g]) continue;
    const b = document.createElement("button");
    b.className = oculto.has(g) ? "off" : "";
    b.innerHTML = `<i style="background:${CORES[g]};color:${CORES[g]}"></i>${NOMES[g]} ${cont[g]}`;
    b.onclick = () => {
      oculto.has(g) ? oculto.delete(g) : oculto.add(g);
      montaLegenda();
      pinta();
    };
    el.appendChild(b);
  }
}

// ---------- painel ----------
// "criada hoje", "ontem", "há 5 dias" — mais humano que a data (e não entrega o dia num print)
function quando(iso) {
  const [a, m, d] = String(iso).split("-").map(Number);
  if (!a || !m || !d) return "";
  const hoje = new Date();
  const dias = Math.round((new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()) - new Date(a, m - 1, d)) / 864e5);
  if (dias <= 0) return "criada hoje";
  if (dias === 1) return "criada ontem";
  if (dias < 60) return `criada há ${dias} dias`;
  const meses = Math.round(dias / 30);
  return meses < 24 ? `criada há ${meses} meses` : `criada há ${Math.round(dias / 365)} anos`;
}
function separaFrontmatter(txt) {
  const m = txt.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  const fm = {};
  if (!m) return { fm, corpo: txt };
  for (const linha of m[1].split(/\r?\n/)) {
    const k = linha.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (k) fm[k[1]] = k[2].trim().replace(/^(["'])(.*)\1$/, "$2");
  }
  return { fm, corpo: txt.slice(m[0].length) };
}
function chaveLink(s) {
  return norm(s)
    .replace(/\.md$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
function achaPorLink(alvo) {
  // mesma prioridade do servidor: 1º caminho exato (cada pedaço vira chave, a "/" fica), depois nome do arquivo ou título
  const k = String(alvo).split("/").map(chaveLink).filter(Boolean).join("/");
  const reais = [...nos.values()].filter((n) => n.especie !== "fantasma");
  const exato = reais.find((n) => n.id.split("/").map(chaveLink).join("/") === k);
  if (exato) return exato.id;
  const pelo = reais.find((n) => chaveLink(n.id.split("/").pop()) === k || chaveLink(n.titulo) === k);
  if (pelo) return pelo.id;
  return nos.has("fantasma:" + k) ? "fantasma:" + k : null;
}
function inline(s) {
  return esc(s)
    .replace(
      /\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|([^\]]*))?\]\]/g,
      (_, alvo, rot) => {
        // o texto já veio escapado; a chave do servidor é o texto cru do link
        const cru = alvo.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
        const id = (alvosDaNota && alvosDaNota.get(cru)) || achaPorLink(cru);
        const txt = rot || (id && nos.get(id) ? nos.get(id).titulo : alvo);
        return `<a data-id="${esc(id || "")}" class="${id && !id.startsWith("fantasma:") ? "" : "vazio"}">${txt}</a>`;
      },
    )
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>")
    .replace(/(^|\W)_([^_]+)_(?=\W|$)/g, "$1<em>$2</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}
function renderiza(md) {
  const out = [];
  let lista = null;
  let paragrafo = [];
  const fechaParagrafo = () => {
    if (paragrafo.length) out.push(`<p>${inline(paragrafo.join(" "))}</p>`);
    paragrafo = [];
  };
  const fechaLista = () => {
    fechaParagrafo();
    if (lista) out.push(`</${lista}>`);
    lista = null;
  };
  for (const linha of md.split(/\r?\n/)) {
    let m;
    if ((m = linha.match(/^(#{1,4})\s+(.*)$/))) {
      fechaLista();
      out.push(`<h${m[1].length + 1}>${inline(m[2])}</h${m[1].length + 1}>`);
    } else if ((m = linha.match(/^\s*[-*]\s+(.*)$/))) {
      if (lista !== "ul") {
        fechaLista();
        out.push("<ul>");
        lista = "ul";
      }
      out.push(`<li>${inline(m[1])}</li>`);
    } else if ((m = linha.match(/^\s*\d+[.)]\s+(.*)$/))) {
      if (lista !== "ol") {
        fechaLista();
        out.push("<ol>");
        lista = "ol";
      }
      out.push(`<li>${inline(m[1])}</li>`);
    } else if ((m = linha.match(/^>\s?(.*)$/))) {
      fechaLista();
      out.push(`<blockquote>${inline(m[1])}</blockquote>`);
    } else if (linha.trim()) {
      if (lista) fechaLista();
      paragrafo.push(linha.trim()); // linhas seguidas são o mesmo parágrafo
      continue;
    } else fechaLista();
  }
  fechaLista();
  return out.join("\n");
}
async function abre(id, { semVoo, semUso } = {}) {
  if (
    editando &&
    !confirm("Tem texto não salvo. Sair sem salvar?")
  )
    return;
  const n = nos.get(id);
  if (!n) return;
  foco = id;
  achados = null;
  editando = false;
  if (!semVoo) voaPara(n);
  pinta();
  const p = $("#painel");
  p.hidden = false;
  const cor = corNo(n);
  $("#p-especie").textContent = n.aviso
    ? "Desatualizada"
    : n.status === "feito"
      ? "Feito ✓"
      : NOMES[n.especie] || n.especie;
  $("#p-especie").style.color = cor;
  $("#p-titulo").textContent = n.titulo;
  $("#p-texto").hidden = true;
  $("#p-salvar").hidden = true;
  $("#p-cancelar").hidden = true;
  $("#p-editar").hidden = n.especie === "fantasma";
  if (n.especie === "fantasma") {
    aberta = null;
    $("#p-meta").textContent = "";
    $("#p-aviso").hidden = true;
    $("#p-leitura").innerHTML =
      `<p>Outras notas falam dessa ideia, mas ela ainda não tem nota própria.</p>`;
    $("#p-dica").textContent = `/anotar ${n.titulo}`;
  } else {
    let d;
    try {
      d = await api("/api/nota?id=" + encodeURIComponent(id));
    } catch (e) {
      return toast("Não abriu: " + e.message);
    }
    if (foco !== id) return;
    aberta = { id, mtime: d.mtime, texto: d.texto };
    alvosDaNota = new Map(d.alvos || []);
    // só conta abertura que abriu de verdade (e antes de escrever o "aberta N×")
    if (!semUso) {
      n.uso = (n.uso || 0) + 1;
      api("/api/uso", { id }).catch(() => {});
    }
    const { fm, corpo } = separaFrontmatter(d.texto);
    $("#p-meta").textContent = [
      fm.criado && quando(fm.criado),
      n.uso ? `aberta ${n.uso}×` : "",
    ]
      .filter(Boolean)
      .join(" · ");
    $("#p-aviso").hidden = !fm.aviso;
    $("#p-aviso").innerHTML = fm.aviso ? inline(fm.aviso) : "";
    $("#p-leitura").innerHTML = renderiza(corpo);
    $("#p-leitura").hidden = false;
    $("#p-dica").textContent =
      n.especie === "ideia" && n.status !== "feito"
        ? `/executa ${id}`
        : n.especie === "faisca"
          ? `gostei da faísca ${id}  (ou: descarta a faísca ${id})`
          : `/perguntar o que eu sei sobre ${n.titulo}`;
  }
  const ul = $("#p-vizinhos");
  ul.innerHTML = "";
  const viz = [...(vizinhos.get(id) || [])]
    .map((v) => nos.get(v))
    .filter(Boolean);
  viz.sort((a, b) => b.grau - a.grau);
  if (!viz.length)
    ul.innerHTML = `<li style="cursor:default;color:var(--suave)">Nenhuma ligação ainda.</li>`;
  for (const v of viz) {
    const li = document.createElement("li");
    li.innerHTML = `<i style="background:${corNo(v)}"></i>${esc(v.titulo)}`;
    li.onclick = () => abre(v.id);
    ul.appendChild(li);
  }
}
function fecha() {
  if (editando && !confirm("Tem texto não salvo. Sair sem salvar?")) return;
  editando = false;
  aberta = null;
  foco = null;
  $("#painel").hidden = true;
  pinta();
}
$("#p-fechar").onclick = fecha;
$("#p-leitura").addEventListener("click", (e) => {
  const a = e.target.closest("a[data-id]");
  if (a && a.dataset.id) abre(a.dataset.id);
});
$("#p-aviso").addEventListener("click", (e) => {
  const a = e.target.closest("a[data-id]");
  if (a && a.dataset.id) abre(a.dataset.id);
});
$("#p-editar").onclick = () => {
  if (!aberta) return;
  editando = true;
  $("#p-texto").value = aberta.texto;
  $("#p-texto").hidden = false;
  $("#p-leitura").hidden = true;
  $("#p-editar").hidden = true;
  $("#p-salvar").hidden = false;
  $("#p-cancelar").hidden = false;
  $("#p-texto").focus();
};
$("#p-cancelar").onclick = () => {
  editando = false;
  if (aberta) abre(aberta.id, { semVoo: true, semUso: true });
};
$("#p-salvar").onclick = async () => {
  if (!aberta) return;
  try {
    await api("/api/nota", {
      id: aberta.id,
      texto: $("#p-texto").value,
      mtime: aberta.mtime,
    });
    editando = false;
    toast("Salvo.", 2000);
    await carrega(false);
    abre(aberta.id, { semVoo: true, semUso: true });
  } catch (e) {
    toast(e.message, 7000);
  }
};
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "s" && editando) {
    e.preventDefault();
    $("#p-salvar").click();
  }
  if (e.key === "Escape" && !editando) {
    if (achados) limpaBusca();
    else if (!$("#painel").hidden) fecha();
  }
});

// ---------- busca ----------
function limpaBusca() {
  achados = null;
  $("#busca").value = "";
  pinta();
}
$("#busca").addEventListener("input", () => {
  const q = norm($("#busca").value.trim());
  if (!q) return limpaBusca();
  achados = new Set(
    [...nos.values()]
      .filter((n) => norm(n.titulo).includes(q) || norm(n.id).includes(q))
      .map((n) => n.id),
  );
  foco = null;
  pinta();
});
$("#busca").addEventListener("keydown", (e) => {
  if (e.key !== "Enter" || !achados || !achados.size) return;
  const primeiro = [...achados][0];
  $("#busca").blur();
  abre(primeiro);
});

// ---------- câmera ----------
function voaPara(n) {
  if (n.x == null) return;
  const r = Math.hypot(n.x, n.y, n.z) || 1;
  const k = 1 + 110 / r;
  graph.cameraPosition({ x: n.x * k, y: n.y * k, z: n.z * k }, n, 1100 * LENTO);
  ultimaInteracao = Date.now();
}
// nunca parado: sem ninguém mexendo, o cérebro gira devagar
function gira(t = 0) {
  requestAnimationFrame(gira);
  if (graph) {
    for (const n of animados) {
      if (!n.__halo || !n.__core) continue;
      const pendente = n.especie === "faisca" && n.status !== "aceita";
      const ativa = recentes.has(n.id) || pendente;
      const pulso = ativa ? 1 + 0.16 * Math.sin(t * 0.004 + n.__fase) : 1;
      const r = tamanho(n);
      n.__core.scale.setScalar(r * (ativa ? 1 + (pulso - 1) * 0.28 : 1));
      n.__halo.scale.setScalar(r * (brilhando(n.id) ? 7 : 4.8) * pulso);
    }
  }
  if (!graph || Date.now() - ultimaInteracao < 7000 || !$("#painel").hidden)
    return;
  const cam = graph.camera();
  const alvo = graph.controls().target;
  const dx = cam.position.x - alvo.x,
    dz = cam.position.z - alvo.z,
    a = 0.0009;
  cam.position.x = alvo.x + dx * Math.cos(a) - dz * Math.sin(a);
  cam.position.z = alvo.z + dx * Math.sin(a) + dz * Math.cos(a);
  cam.lookAt(alvo);
}
for (const ev of ["pointerdown", "wheel", "touchstart"])
  $("#palco").addEventListener(ev, () => (ultimaInteracao = Date.now()), {
    passive: true,
  });

// ---------- início ----------
function preparaVisual3D() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext("2d");
  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.16, "rgba(255,255,255,.62)");
  grad.addColorStop(0.46, "rgba(255,255,255,.12)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);
  TEX_HALO = new THREE.CanvasTexture(canvas);
  TEX_HALO.colorSpace = THREE.SRGBColorSpace;
  GEO_NO = new THREE.SphereGeometry(1, LEVE ? 8 : 12, LEVE ? 6 : 9);
}

async function inicia() {
  let fg, bloomMod, css2d;
  try {
    [THREE, fg, bloomMod, css2d] = await Promise.all([
      import(CDN + "three@0.186.1/+esm"),
      import(CDN + "3d-force-graph@1.80.1/+esm"),
      import(
        CDN +
          "three@0.186.1/examples/jsm/postprocessing/UnrealBloomPass.js/+esm"
      ),
      import(
        CDN + "three@0.186.1/examples/jsm/renderers/CSS2DRenderer.js/+esm"
      ),
    ]);
  } catch (e) {
    $("#contagem").textContent = "";
    return toast(
      "Não carregou o motor 3D. Precisa de internet na primeira vez. (" +
        e.message +
        ")",
      0,
    );
  }
  CSS2DObject = css2d.CSS2DObject;
  preparaVisual3D();
  graph = fg
    .default({ extraRenderers: [new css2d.CSS2DRenderer()] })($("#palco"))
    .backgroundColor("#04060a")
    .nodeId("id")
    .nodeLabel(() => "")
    .nodeOpacity(1)
    .nodeResolution(LEVE ? 8 : 12)
    .nodeThreeObjectExtend(false)
    .nodeThreeObject(objetoNo)
    .linkOpacity(0.42)
    .linkDirectionalParticleSpeed(0.006)
    .linkDirectionalParticleWidth(1.25)
    .showNavInfo(false)
    .onNodeClick((n) => abre(n.id))
    .onBackgroundClick(() => {
      if (achados) limpaBusca();
      else if (!$("#painel").hidden) fecha();
    });
  // repulsão com alcance curto: grupo de notas sem ligação com o resto não sai voando pra longe
  graph.d3Force("charge").strength(-34).distanceMax(150);
  graph.d3Force("link").distance(28).strength(0.46);
  let enquadrou = false;
  graph.onEngineStop(() => {
    if (enquadrou) return;
    enquadrou = true;
    graph.zoomToFit(900 * LENTO, 60);
  });
  // ?leve na URL desliga o brilho (computador fraco)
  if (!LEVE) try {
    const bloom = new bloomMod.UnrealBloomPass(
      new THREE.Vector2(innerWidth, innerHeight),
      0.72,
      0.5,
      0.18,
    );
    graph.postProcessingComposer().addPass(bloom);
    // fundo opaco na cena: com o brilho ligado e fundo transparente, a tela sai cinza
    graph.scene().background = new THREE.Color("#04060a");
  } catch {}
  addEventListener("resize", () => graph.width(innerWidth).height(innerHeight));
  try {
    await carrega(false);
  } catch (e) {
    return toast("Não carregou as notas: " + e.message, 0);
  }
  if (!nos.size)
    toast("Cérebro vazio. No Claude Code, rode /setup pra ele nascer.", 0);
  gira();
  setInterval(async () => {
    try {
      const { versao } = await api("/api/versao");
      if (versao !== versaoAtual) await carrega(true);
      else if (animados.length) pinta(); // apaga o brilho e mantém faíscas vivas
    } catch {}
  }, 4000);
}
inicia();
