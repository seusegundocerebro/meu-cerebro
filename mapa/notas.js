"use strict";
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { criarIndice } = require("./mente");
const erro = (texto, status = 400) =>
  Object.assign(new Error(texto), { status });
const chave = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\.md$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
const chaveLink = (s) =>
  String(s || "")
    .split("/")
    .map(chave)
    .filter(Boolean)
    .join("/");
const hash = (texto) => crypto.createHash("sha256").update(texto).digest("hex");
const dataLocal = () => new Date().toLocaleDateString("sv-SE");
const bloco = (txt) => txt.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
function escalar(s) {
  const m = s
    .trim()
    .match(/^("(?:\\.|[^"\\])*"|'(?:''|[^'])*'|[^#]*)(?:\s+#.*)?$/);
  s = (m ? m[1] : s).trim();
  if (s.startsWith('"')) {
    try {
      return JSON.parse(s);
    } catch {}
  }
  return s
    .replace(/^'(.*)'$/, "$1")
    .replace(/''/g, "'")
    .trim();
}
function frontmatter(txt) {
  const m = bloco(txt),
    fm = Object.create(null);
  if (!m) return { fm, corpo: txt };
  let lista = null;
  for (const linha of m[1].split(/\r?\n/)) {
    const k = linha.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (k) {
      const v = escalar(k[2]);
      lista = null;
      if (v.startsWith("[") && v.endsWith("]")) {
        try {
          fm[k[1]] = JSON.parse(v);
        } catch {
          fm[k[1]] = v.slice(1, -1).split(",").map(escalar).filter(Boolean);
        }
      } else fm[k[1]] = v;
      if (!v) lista = k[1];
    } else if (lista && /^\s+-\s+/.test(linha)) {
      if (!Array.isArray(fm[lista])) fm[lista] = [];
      fm[lista].push(escalar(linha.replace(/^\s+-\s+/, "")));
    }
  }
  return { fm, corpo: txt.slice(m[0].length) };
}
// Só substitui os campos pedidos; preserva campos desconhecidos e o corpo original.
function campos(texto, novos) {
  const m = bloco(texto);
  let linhas = m ? m[1].split(/\r?\n/) : [];
  for (const [k, v] of Object.entries(novos)) {
    const i = linhas.findIndex((l) => l.startsWith(k + ":"));
    const valor = k + ": " + JSON.stringify(v);
    if (i < 0) linhas.push(valor);
    else {
      let fim = i + 1;
      while (fim < linhas.length && /^\s+\S/.test(linhas[fim])) fim++;
      linhas.splice(i, fim - i, valor);
    }
  }
  return (
    "---\n" +
    linhas.join("\n") +
    "\n---\n" +
    (m ? texto.slice(m[0].length) : "\n" + texto)
  );
}
const lista = (v) =>
  (Array.isArray(v) ? v : v ? [v] : [])
    .map(String)
    .map((x) => x.trim())
    .filter(Boolean);
function criarBanco(raiz, pasta = path.join(raiz, "notas")) {
  fs.mkdirSync(pasta, { recursive: true });
  const notas = fs.realpathSync(pasta),
    estado = path.join(raiz, ".cerebro");
  fs.mkdirSync(estado, { recursive: true });
  let cache = null;
  function caminho(id) {
    if (
      typeof id !== "string" ||
      !id ||
      id.includes("\\") ||
      id.includes(":") ||
      id.includes("\0") ||
      id.split("/").some((p) => !p || p.startsWith("."))
    )
      throw erro("Nota inválida.");
    const abs = path.resolve(notas, id + ".md");
    if (!abs.startsWith(notas + path.sep)) throw erro("Nota inválida.");
    let atual = notas;
    for (const parte of path.relative(notas, abs).split(path.sep)) {
      atual = path.join(atual, parte);
      if (fs.existsSync(atual) && fs.lstatSync(atual).isSymbolicLink())
        throw erro("Atalhos de arquivo não são abertos pelo mapa.");
    }
    return abs;
  }
  function arquivos(dir = notas, out = []) {
    for (const it of fs
      .readdirSync(dir, { withFileTypes: true })
      .sort((a, b) => a.name.localeCompare(b.name))) {
      if (
        it.name.startsWith(".") ||
        it.name === "node_modules" ||
        it.isSymbolicLink()
      )
        continue;
      const abs = path.join(dir, it.name);
      if (it.isDirectory()) arquivos(abs, out);
      else if (it.isFile() && it.name.endsWith(".md")) out.push(abs);
    }
    return out;
  }
  function versao() {
    return hash(
      arquivos()
        .map((a) => {
          const s = fs.statSync(a);
          return a + ":" + s.mtimeMs + ":" + s.ctimeMs + ":" + s.size;
        })
        .join("|"),
    );
  }
  function ler(id) {
    const abs = caminho(id);
    if (!fs.existsSync(abs)) throw erro("Nota não existe.", 404);
    const texto = fs.readFileSync(abs, "utf8");
    return {
      id,
      texto,
      ...frontmatter(texto),
      revisao: hash(texto),
      mtime: fs.statSync(abs).mtimeMs,
    };
  }
  function interno(nome) {
    const dir = path.join(notas, nome);
    if (fs.existsSync(dir) && fs.lstatSync(dir).isSymbolicLink())
      throw erro("Pasta de histórico inválida.");
    fs.mkdirSync(dir, { recursive: true });
    return dir;
  }
  function historico(id, abs, pasta = ".historico") {
    const destino = path.join(
      interno(pasta),
      id.replace(/\//g, "__") +
        "." +
        Date.now() +
        "." +
        crypto.randomBytes(4).toString("hex") +
        ".md",
    );
    fs.copyFileSync(abs, destino, fs.constants.COPYFILE_EXCL);
  }
  function salvar(id, texto, revisao, mtime) {
    const abs = caminho(id);
    if (typeof texto !== "string" || Buffer.byteLength(texto) > 1e6)
      throw erro("Texto inválido ou grande demais.");
    const existe = fs.existsSync(abs);
    if ((revisao || mtime) && !existe)
      throw erro(
        "Essa nota foi apagada enquanto você editava. Copie seu texto.",
        409,
      );
    if (existe) {
      const atual = ler(id);
      if (
        (revisao && atual.revisao !== revisao) ||
        (!revisao && mtime && Math.abs(atual.mtime - mtime) > 1)
      )
        throw erro(
          "A nota mudou enquanto você editava. Copie seu texto e reabra.",
          409,
        );
      historico(id, abs);
    }
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    const tmp = abs + ".tmp-" + crypto.randomBytes(6).toString("hex");
    try {
      fs.writeFileSync(tmp, texto, { flag: "wx" });
      fs.renameSync(tmp, abs);
    } finally {
      if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    }
    cache = null;
    return { ok: true, revisao: hash(texto), mtime: fs.statSync(abs).mtimeMs };
  }
  function uso() {
    try {
      return JSON.parse(fs.readFileSync(path.join(estado, "uso.json"), "utf8"));
    } catch {
      return {};
    }
  }
  function montar() {
    const v = versao();
    if (cache?.versao === v) return cache;
    const documentos = arquivos().map((abs) =>
      ler(path.relative(notas, abs).replace(/\\/g, "/").slice(0, -3)),
    );
    const porChave = new Map(),
      nos = [];
    for (const n of documentos) {
      const { fm, corpo, id } = n;
      const titulo = String(
        fm.titulo ||
          fm.title ||
          corpo.match(/^#\s+(.+)$/m)?.[1] ||
          path.basename(id),
      );
      const no = {
        id,
        titulo,
        especie: fm.especie || "nota",
        status: fm.status || "",
        aviso: fm.aviso || "",
        criado: fm.criado || dataLocal(),
        frentes: lista(fm.frente),
        areas: lista(fm.area),
        grau: 0,
        plano:
          fm.status === "feito"
            ? "feito"
            : /^## Plano\b/m.test(corpo) || fm.status === "no-plano"
              ? "no-plano"
              : null,
      };
      nos.push(no);
      n.titulo = titulo;
      porChave.set(chaveLink(id), id);
      for (const k of [path.basename(id), fm.name, titulo])
        if (k && !porChave.has(chave(k))) porChave.set(chave(k), id);
    }
    const links = [],
      vistos = new Set(),
      fantasmas = new Map();
    for (const n of documentos)
      for (const m of n.corpo.matchAll(
        /\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]/g,
      )) {
        const k = chaveLink(m[1]);
        if (!k) continue;
        const alvo = porChave.get(k) || "fantasma:" + k;
        if (alvo.startsWith("fantasma:"))
          fantasmas.set(alvo, {
            id: alvo,
            titulo: m[1],
            especie: "fantasma",
            grau: 0,
            uso: 0,
            frentes: [],
            areas: [],
          });
        const par = [n.id, alvo].sort().join("\0");
        if (alvo === n.id || vistos.has(par)) continue;
        vistos.add(par);
        links.push({ source: n.id, target: alvo });
      }
    const todos = [...nos, ...fantasmas.values()],
      porId = new Map(todos.map((n) => [n.id, n]));
    for (const l of links) {
      porId.get(l.source).grau++;
      porId.get(l.target).grau++;
    }
    const indice = criarIndice(documentos);
    const contar = (campo) =>
      [...new Set(nos.flatMap((n) => n[campo]))]
        .sort((a, b) => a.localeCompare(b))
        .map((nome) => ({
          nome,
          n: nos.filter((n) => n[campo].includes(nome)).length,
        }));
    cache = {
      versao: v,
      nos: todos,
      links,
      latentes: indice.latentes(links),
      topicos: {
        frentes: contar("frentes"),
        areas: contar("areas"),
        faltantes: nos.filter((n) => !n.frentes.length || !n.areas.length)
          .length,
      },
      documentos,
      indice,
      porChave,
    };
    return cache;
  }
  function grafo() {
    const { versao, nos, links, latentes, topicos } = montar(),
      u = uso();
    return {
      versao,
      nos: nos.map((n) => ({
        ...n,
        uso: u[n.id]?.n || 0,
        ultimoUso: u[n.id]?.ultimo || null,
      })),
      links,
      latentes,
      topicos,
    };
  }
  function criar(titulo, corpo, fm = {}, ligadas = []) {
    titulo = String(titulo || "")
      .trim()
      .replace(/[\r\n]+/g, " ")
      .slice(0, 140);
    if (!titulo) throw erro("Escreva sua ideia.");
    const base = chave(titulo).slice(0, 60) || "ideia";
    let id = base,
      i = 2;
    while (fs.existsSync(caminho(id))) id = base + "-" + i++;
    const texto =
      String(corpo || "").trim() +
      (ligadas.length
        ? "\n\nLigado a " +
          [...new Set(ligadas)].map((id) => "[[" + id + "]]").join(" · ")
        : "");
    salvar(
      id,
      campos(texto + "\n", {
        name: id,
        titulo,
        especie: "ideia",
        criado: dataLocal(),
        ...fm,
      }),
    );
    return id;
  }
  function ideia(texto) {
    if (typeof texto !== "string" || !texto.trim() || texto.length > 12000)
      throw erro("Escreva uma ideia com até 12 mil caracteres.");
    const g = montar(),
      ligadas = g.indice
        .recupera(texto, [], 3)
        .filter((x) => x.forca >= 0.1)
        .map((x) => x.id);
    const primeira = g.nos.find((n) => n.id === ligadas[0]);
    return criar(
      texto.split("\n")[0].slice(0, 100),
      texto,
      {
        frente:
          primeira?.frentes?.length === 1
            ? primeira.frentes[0]
            : primeira?.frentes || [],
        area: primeira?.areas || [],
      },
      ligadas,
    );
  }
  function faisca(id, acao, revisao) {
    const n = ler(id);
    if (
      n.fm.especie !== "faisca" ||
      !["", "pendente", undefined].includes(n.fm.status)
    )
      throw erro("Essa faísca já foi resolvida ou não é uma faísca.");
    if (revisao && revisao !== n.revisao)
      throw erro("A faísca mudou. Reabra antes de decidir.", 409);
    if (acao === "aceitar")
      salvar(
        id,
        campos(n.texto, {
          status: "aceita",
          especie: "ideia",
          origem: "faisca",
        }),
        n.revisao,
      );
    else if (acao === "descartar") {
      historico(id, caminho(id), ".lixeira");
      fs.unlinkSync(caminho(id));
      cache = null;
    } else throw erro("Escolha aprovar ou descartar.");
    return { ok: true, id };
  }
  function cruzamentos() {
    const ns = montar().documentos.filter(
      (n) =>
        n.fm.especie === "faisca" ||
        n.fm.status === "aceita" ||
        n.fm.origem === "faisca" ||
        n.id.startsWith("faisca-") ||
        /Nasceu de \[\[/.test(n.corpo),
    );
    const dir = path.join(notas, ".lixeira");
    if (fs.existsSync(dir) && !fs.lstatSync(dir).isSymbolicLink()) {
      for (const it of fs.readdirSync(dir, { withFileTypes: true }))
        if (it.isFile() && it.name.endsWith(".md")) {
          const n = frontmatter(
            fs.readFileSync(path.join(dir, it.name), "utf8"),
          );
          if (n.fm.especie === "faisca" || n.fm.origem === "faisca") ns.push(n);
        }
    }
    return ns.map((n) =>
      [...n.corpo.matchAll(/\[\[([^\]|#]+)(?:[^\]]*)\]\]/g)].map(
        (m) => montar().porChave.get(chaveLink(m[1])) || m[1],
      ),
    );
  }
  function plano(id, texto, revisao) {
    const n = ler(id);
    if (n.fm.especie !== "ideia" || n.fm.status === "feito")
      throw erro("Escolha uma ideia ainda não feita.");
    return salvar(
      id,
      campos(n.texto, { status: "no-plano" }).trimEnd() +
        "\n\n## Plano (" +
        dataLocal() +
        ")\n" +
        texto +
        "\n",
      revisao || n.revisao,
    );
  }
  function feito(id, resultado, revisao) {
    const n = ler(id);
    if (n.fm.especie !== "ideia") throw erro("Escolha uma ideia.");
    if (n.fm.status === "feito") return { ok: true };
    return salvar(
      id,
      campos(n.texto, { status: "feito" }).trimEnd() +
        "\n\n## Feito (" +
        dataLocal() +
        ")\n" +
        String(resultado || "Concluída por você.").slice(0, 2000) +
        "\n",
      revisao || n.revisao,
    );
  }
  function ativar(id) {
    ler(id);
    const u = uso();
    Object.defineProperty(u, id, {
      value: {
        n: (Number(u[id]?.n) || 0) + 1,
        ultimo: new Date().toISOString(),
      },
      enumerable: true,
      configurable: true,
      writable: true,
    });
    fs.writeFileSync(path.join(estado, "uso.json"), JSON.stringify(u));
  }
  return {
    ler,
    salvar,
    grafo,
    montar,
    versao,
    criar,
    ideia,
    faisca,
    plano,
    feito,
    ativar,
    cruzamentos,
  };
}
module.exports = { criarBanco, frontmatter, campos, erro, chaveLink };
