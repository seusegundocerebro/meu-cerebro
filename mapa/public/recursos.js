// Controles do mapa local. Sem dependências, sem chamadas de IA ao carregar a página.
export function emTopico(n, f) {
  return (
    (!f.frentes.size || (n.frentes || []).some((x) => f.frentes.has(x))) &&
    (!f.areas.size || (n.areas || []).some((x) => f.areas.has(x))) &&
    (!f.ideias.size || f.ideias.has(n.plano))
  );
}
export function sugestoes(ns, volta = 0) {
  const vivas = ns.filter(
    (n) =>
      n.especie === "ideia" &&
      n.status !== "feito" &&
      !["encerrado", "cancelado", "descartada"].includes(n.status),
  );
  // Frente de pacote pronto (ex.: vendas) não vira sugestão: ideia boa nasce das frentes da pessoa.
  const frentes = [
    ...new Set(ns.filter((n) => !n.pacote).flatMap((n) => n.frentes || [])),
  ];
  const grupos = [
    vivas
      .filter((n) => n.plano === "no-plano")
      .map((n) => ({ tipo: "plano", id: n.id, texto: "Tocar: " + n.titulo })),
    ns
      .filter(
        (n) => n.especie === "faisca" && (!n.status || n.status === "pendente"),
      )
      .map((n) => ({ tipo: "faisca", id: n.id, texto: "Faísca: " + n.titulo })),
    vivas
      .filter((n) => !n.plano)
      .sort((a, b) =>
        (a.ultimoUso || a.criado || "").localeCompare(
          b.ultimoUso || b.criado || "",
        ),
      )
      .map((n) => ({
        tipo: "parada",
        id: n.id,
        texto: "Retomar: " + n.titulo,
      })),
    [
      ...frentes.map((f) => "Me dá 3 ideias novas pra " + f),
      "O que eu deixei pela metade e vale retomar?",
      "Qual ideia posso tirar do papel esta semana?",
      "O que eu decidi e ainda não virou ação?",
      "Que aprendizados das minhas notas podem ajudar agora?",
    ].map((texto) => ({ tipo: "pergunta", texto })),
  ].filter((g) => g.length);
  const out = [],
    vistos = new Set();
  for (let r = 0; r < 4 && out.length < 4; r++)
    for (const g of grupos) {
      const x = g[(volta + r) % g.length];
      if (vistos.has(x.texto) || out.length === 4) continue;
      vistos.add(x.texto);
      out.push(x);
    }
  return out;
}
export function instalarRecursos(h) {
  const $ = (s) => document.querySelector(s);
  const filtros = { frentes: new Set(), areas: new Set(), ideias: new Set() };
  let dados = { nos: [], topicos: { frentes: [], areas: [], faltantes: 0 } },
    volta = 0,
    ocupado = false,
    faiscas = [],
    vozAtiva = null;
  function recolher(sim) {
    $("#lateral").hidden = sim;
    $("#lateral-aba").hidden = !sim;
    $("#lateral-aba").setAttribute("aria-expanded", String(!sim));
  }
  recolher(innerWidth <= 760);
  $("#lat-recolher").onclick = () => recolher(true);
  $("#lateral-aba").onclick = () => recolher(false);
  function resumo() {
    const ativos = Object.values(filtros).some((s) => s.size);
    const qtd = dados.nos.filter(
      (n) => n.especie !== "fantasma" && h.visivel(n),
    ).length;
    $("#lat-resumo").textContent = ativos
      ? `${qtd} neurônios no filtro`
      : "Frentes somam. Frente + área cruza.";
    $("#lat-resumo").dataset.quantidade = qtd;
    $("#lat-tudo").classList.toggle("ativo", !ativos);
  }
  function topicos() {
    const listas = {
      frentes: dados.topicos.frentes,
      areas: dados.topicos.areas,
      ideias: [
        {
          nome: "no-plano",
          rotulo: "No plano",
          n: dados.nos.filter((n) => n.plano === "no-plano").length,
        },
        {
          nome: "feito",
          rotulo: "Feitas",
          n: dados.nos.filter((n) => n.plano === "feito").length,
        },
      ],
    };
    for (const [grupo, lista] of Object.entries(listas)) {
      const el = $("#lat-" + grupo);
      el.replaceChildren();
      for (const x of lista) {
        const b = document.createElement("button");
        b.className = "lat-item";
        b.dataset.nome = x.nome;
        b.textContent = (x.rotulo || x.nome) + " · " + x.n;
        b.classList.toggle("ativo", filtros[grupo].has(x.nome));
        b.setAttribute("aria-pressed", String(filtros[grupo].has(x.nome)));
        b.onclick = () => {
          filtros[grupo].has(x.nome)
            ? filtros[grupo].delete(x.nome)
            : filtros[grupo].add(x.nome);
          h.limpaFoco();
          topicos();
          h.pinta();
          if (innerWidth <= 760) recolher(true);
        };
        el.append(b);
      }
    }
    $("#lat-faltantes").textContent = dados.topicos.faltantes
      ? `${dados.topicos.faltantes} notas sem frente ou área.`
      : "Tópicos em dia.";
    $("#lat-organizar").hidden = !dados.topicos.faltantes;
    resumo();
  }
  $("#lat-tudo").onclick = () => {
    Object.values(filtros).forEach((s) => s.clear());
    h.tudo();
    topicos();
    h.pinta();
  };
  function visSugestoes() {
    $("#sugestoes").hidden =
      !dados.nos.length ||
      !$("#painel").hidden ||
      !$("#resposta").hidden ||
      !$("#faiscas").hidden ||
      $("#dlg-nova").open;
  }
  function desenhaSugestoes() {
    $("#sg-lista").replaceChildren();
    for (const s of sugestoes(dados.nos, volta)) {
      const b = document.createElement("button");
      b.className = "sg sg-" + s.tipo;
      b.textContent = s.texto;
      b.title = s.texto;
      b.onclick = () => {
        if (s.tipo === "pergunta") {
          $("#pergunta").value = s.texto;
          perguntar(s.texto);
        } else if (s.tipo === "faisca") abrirFaiscas(s.id);
        else h.abre(s.id);
      };
      $("#sg-lista").append(b);
    }
    visSugestoes();
  }
  $("#sg-mais").onclick = () => {
    volta++;
    desenhaSugestoes();
  };
  const obs = new MutationObserver(visSugestoes);
  for (const id of ["painel", "resposta", "faiscas", "dlg-nova"])
    obs.observe($("#" + id), {
      attributes: true,
      attributeFilter: ["hidden", "open"],
    });
  function atividade(j) {
    const frases = {
      lembrando: "Escolhendo as notas…",
      pensando: "Preparando a resposta…",
      classificando: "Organizando tópicos…",
      associando: "Cruzando notas para criar faíscas…",
      planejando: "Preparando o plano…",
    };
    const texto = frases[j.fase] || "O cérebro está pensando…";
    $("#atividade").textContent = texto;
    $("#atividade").hidden = false;
    if (!$("#resposta").hidden) $("#r-status").textContent = texto;
    if (j.ativadas?.length) h.acende(j.ativadas);
  }
  async function pedido(rota, corpo, aoPronto) {
    if (ocupado)
      return h.toast("O cérebro já está pensando. Aguarde terminar.");
    ocupado = true;
    document.body.classList.add("pensando");
    atividade({ fase: "lembrando" });
    const botoes = [
      "#btn-perguntar",
      "#fx-gerar",
      "#lat-organizar",
      "#p-plano",
    ];
    botoes.forEach((s) => ($(s).disabled = true));
    let jobId = null;
    try {
      const r = await h.api(rota, corpo);
      jobId = r.job;
      try {
        sessionStorage.setItem(
          "cerebro.pedido",
          JSON.stringify({ id: jobId, rota, corpo }),
        );
      } catch {}
      const j = await acompanhar(jobId);
      await finalizar(j, rota, aoPronto);
    } catch (e) {
      h.toast(e.message, 7000);
      if (rota === "/api/perguntar") $("#r-status").textContent = e.message;
    } finally {
      ocupado = false;
      document.body.classList.remove("pensando");
      $("#atividade").hidden = true;
      botoes.forEach((s) => ($(s).disabled = false));
      try {
        sessionStorage.removeItem("cerebro.pedido");
      } catch {}
    }
  }
  async function acompanhar(id) {
    const inicio = Date.now();
    while (Date.now() - inicio < 270000) {
      const j = await h.api("/api/job?id=" + encodeURIComponent(id));
      if (j.pronto) return j;
      atividade(j);
      await new Promise((r) => setTimeout(r, 1200));
    }
    throw Error("O pedido demorou demais. Confira o Claude Code no terminal.");
  }
  async function finalizar(j, rota, aoPronto) {
    if (j.erro) {
      if (j.codigo === "SEM_CLAUDE") {
        $("#resposta").hidden = false;
        $("#r-status").textContent = j.erro;
        $("#r-texto").replaceChildren();
        $("#r-fontes").replaceChildren();
        $("#r-fallback").hidden = false;
        $("#r-comando").value = j.comando;
        await h.copia(j.comando);
        return;
      }
      throw Error(j.erro);
    }
    $("#r-status").textContent = "";
    if (rota === "/api/perguntar") mostrarResposta(j);
    else {
      await h.carrega(true);
      if (rota === "/api/topicos")
        h.toast(
          `${j.alteradas} notas organizadas.${j.conflitos ? " " + j.conflitos + " mudaram durante o pedido; foram preservadas." : ""}${j.restantes ? " Restam " + j.restantes + "; toque novamente para continuar." : ""}`,
          7000,
        );
      if (rota === "/api/faiscas/gerar") await abrirFaiscas();
      if (rota === "/api/plano") await h.abre(j.nota);
    }
    await aoPronto?.(j);
  }
  async function perguntar(texto) {
    if (ocupado) return h.toast("Aguarde o pedido atual terminar.");
    if (!texto.trim()) return;
    if (h.fecha() === false) return;
    $("#faiscas").hidden = true;
    $("#resposta").hidden = false;
    $("#r-pergunta").textContent = texto;
    $("#r-texto").replaceChildren();
    $("#r-fontes").replaceChildren();
    $("#r-fallback").hidden = true;
    Object.values(filtros).forEach((s) => s.clear());
    h.tudo();
    topicos();
    await pedido("/api/perguntar", {
      pergunta: texto.replace(/^\/perguntar\s*/, ""),
    });
  }
  function mostrarResposta(j) {
    $("#resposta").hidden = false;
    $("#r-texto").innerHTML = h.renderiza(j.resposta);
    const permitidas = new Set(j.usadas || []);
    for (const a of $("#r-texto").querySelectorAll("a[data-id]"))
      if (!permitidas.has(a.dataset.id)) {
        a.removeAttribute("data-id");
        a.classList.add("vazio");
      }
    $("#r-fontes").replaceChildren();
    for (const id of permitidas) {
      const n = dados.nos.find((n) => n.id === id);
      if (!n) continue;
      const b = document.createElement("button");
      b.textContent = n.titulo;
      b.dataset.id = id;
      b.onclick = () => h.abre(id);
      $("#r-fontes").append(b);
    }
    h.acende([...permitidas]);
  }
  $("#r-texto").onclick = (e) => {
    const a = e.target.closest("a[data-id]");
    if (a) h.abre(a.dataset.id);
  };
  $("#comando").onsubmit = (e) => {
    e.preventDefault();
    perguntar($("#pergunta").value.trim());
  };
  $("#r-fechar").onclick = () => {
    $("#resposta").hidden = true;
    h.acende([]);
  };
  $("#r-copiar").onclick = async () => {
    const ok = await h.copia($("#r-comando").value);
    h.toast(
      ok
        ? "Copiado. Cole no Claude Code."
        : "Selecione e copie o comando abaixo.",
    );
    if (!ok) $("#r-comando").select();
  };
  $("#lat-organizar").onclick = () => pedido("/api/topicos", {});
  $("#btn-nova").onclick = () => {
    $("#dn-erro").textContent = "";
    $("#dlg-nova").showModal();
    $("#dn-texto").focus();
  };
  $("#dn-cancelar").onclick = () => $("#dlg-nova").close();
  $("#dlg-nova").addEventListener("close", () => vozAtiva?.stop());
  $("#nova-form").onsubmit = async (e) => {
    e.preventDefault();
    $("#dn-criar").disabled = true;
    try {
      const { id } = await h.api("/api/ideia", { texto: $("#dn-texto").value });
      $("#dlg-nova").close();
      $("#dn-texto").value = "";
      h.tudo();
      Object.values(filtros).forEach((s) => s.clear());
      await h.carrega(true);
      await h.abre(id);
    } catch (e) {
      $("#dn-erro").textContent = e.message;
    } finally {
      $("#dn-criar").disabled = false;
    }
  };
  async function abrirFaiscas(foco) {
    if (h.fecha() === false) return;
    $("#resposta").hidden = true;
    $("#faiscas").hidden = false;
    try {
      const r = await h.api("/api/faiscas");
      faiscas = r.lista;
      $("#fx-lista").replaceChildren();
      if (!faiscas.length)
        $("#fx-lista").textContent =
          "Nenhuma faísca pendente. Toque em Nova faísca para cruzar suas notas.";
      for (const f of faiscas) {
        const card = document.createElement("section");
        card.className = "fx-card";
        card.dataset.id = f.id;
        const tit = document.createElement("button");
        tit.className = "fx-titulo";
        tit.textContent = f.titulo;
        tit.onclick = () => h.abre(f.id);
        card.append(tit);
        const corpo = document.createElement("article");
        corpo.innerHTML = h.renderiza(f.corpo);
        corpo.onclick = (e) => {
          const a = e.target.closest("a[data-id]");
          if (a?.dataset.id) h.abre(a.dataset.id);
        };
        card.append(corpo);
        const acoes = document.createElement("div");
        acoes.className = "acoes";
        for (const [acao, rotulo] of [
          ["aceitar", "Aprovar"],
          ["descartar", "Descartar"],
        ]) {
          const b = document.createElement("button");
          b.textContent = rotulo;
          b.dataset.acao = acao;
          b.onclick = async () => {
            b.disabled = true;
            try {
              await h.api("/api/faiscas/" + acao, {
                id: f.id,
                revisao: f.revisao,
              });
              await h.carrega(true);
              await abrirFaiscas();
              h.toast(
                acao === "aceitar"
                  ? "Faísca aprovada: virou ideia."
                  : "Faísca guardada na lixeira local.",
              );
            } catch (e) {
              h.toast(e.message);
            } finally {
              b.disabled = false;
            }
          };
          acoes.append(b);
        }
        card.append(acoes);
        $("#fx-lista").append(card);
        if (foco === f.id) {
          card.classList.add("ativa");
          h.acende([f.id]);
          setTimeout(() => card.scrollIntoView({ block: "nearest" }), 0);
        }
      }
    } catch (e) {
      h.toast(e.message);
    }
  }
  $("#btn-faiscas").onclick = () => abrirFaiscas();
  $("#fx-fechar").onclick = () => {
    $("#faiscas").hidden = true;
    h.acende([]);
  };
  $("#fx-gerar").onclick = () => pedido("/api/faiscas/gerar", {});
  function painel(n) {
    const ideia = n?.especie === "ideia";
    $("#p-ciclo").hidden = !ideia;
    $("#p-feito-form").hidden = true;
    $("#p-selo").hidden = !n?.plano;
    $("#p-selo").textContent = n?.plano === "feito" ? "✓ FEITA" : "NO PLANO";
    $("#p-feito").hidden = n?.status === "feito";
    $("#p-plano").hidden = n?.status === "feito";
    $("#p-ver-plano").hidden = !n?.plano;
    $("#p-plano").textContent =
      n?.plano === "no-plano" ? "Pedir outro plano" : "Pedir plano";
  }
  $("#p-plano").onclick = () => {
    if (h.editando())
      return h.toast("Salve sua edição antes de pedir o plano.");
    const n = h.aberta();
    if (n) pedido("/api/plano", { id: n.id });
  };
  $("#p-ver-plano").onclick = () => {
    const hs = [...$("#p-leitura").querySelectorAll("h2,h3,h4")];
    const el = hs.reverse().find((el) => /^Plano\b/i.test(el.textContent));
    el?.scrollIntoView({ block: "start" });
  };
  $("#p-feito").onclick = () => {
    if (h.editando()) return h.toast("Salve sua edição antes de marcar feita.");
    $("#p-feito-form").hidden = false;
    $("#p-resultado").focus();
  };
  $("#p-feito-cancelar").onclick = () => ($("#p-feito-form").hidden = true);
  $("#p-feito-form").onsubmit = async (e) => {
    e.preventDefault();
    const n = h.aberta();
    if (!n) return;
    try {
      await h.api("/api/feito", {
        id: n.id,
        revisao: n.revisao,
        resultado: $("#p-resultado").value,
      });
      $("#p-resultado").value = "";
      await h.carrega(false);
      await h.abre(n.id);
      h.toast("Ideia marcada como feita.");
    } catch (e) {
      h.toast(e.message);
    }
  };
  function microfone(botao, campo) {
    const Voz = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Voz) return;
    const b = $(botao),
      c = $(campo),
      r = new Voz();
    r.lang = "pt-BR";
    r.interimResults = true;
    r.continuous = false;
    let antes = "",
      ouvindo = false;
    b.hidden = false;
    b.onclick = () => {
      if (ouvindo) return r.stop();
      vozAtiva?.stop();
      antes = c.value.trim();
      vozAtiva = r;
      try {
        r.start();
      } catch {
        h.toast("Não consegui abrir o microfone. Tente novamente.");
      }
    };
    r.onstart = () => {
      ouvindo = true;
      b.classList.add("gravando");
      b.setAttribute("aria-pressed", "true");
    };
    r.onresult = (e) => {
      let texto = "";
      for (let i = 0; i < e.results.length; i++)
        texto += e.results[i][0].transcript;
      c.value = [antes, texto.trim()].filter(Boolean).join(" ");
    };
    r.onerror = () =>
      h.toast(
        "Não consegui ouvir. Confira a permissão do microfone ou digite.",
      );
    r.onend = () => {
      ouvindo = false;
      b.classList.remove("gravando");
      b.setAttribute("aria-pressed", "false");
      if (vozAtiva === r) vozAtiva = null;
      c.focus();
    };
  }
  microfone("#btn-mic", "#pergunta");
  microfone("#dn-mic", "#dn-texto");
  addEventListener("pagehide", () => vozAtiva?.stop());
  // Retoma a visualização de um pedido já iniciado; não cria outra chamada ao Claude.
  let retomado = false;
  async function retomar() {
    if (retomado) return;
    retomado = true;
    let salvo;
    try {
      salvo = JSON.parse(sessionStorage.getItem("cerebro.pedido"));
    } catch {}
    if (!salvo?.id) return;
    ocupado = true;
    if (salvo.rota === "/api/perguntar") {
      $("#resposta").hidden = false;
      $("#r-pergunta").textContent = salvo.corpo.pergunta;
    }
    try {
      await finalizar(await acompanhar(salvo.id), salvo.rota);
    } catch (e) {
      h.toast(e.message);
    } finally {
      ocupado = false;
      $("#atividade").hidden = true;
      try {
        sessionStorage.removeItem("cerebro.pedido");
      } catch {}
    }
  }
  return {
    emTopico: (n) => emTopico(n, filtros),
    resumo,
    painel,
    atualizar(g) {
      dados = g;
      topicos();
      $("#fx-n").textContent = g.nos.filter(
        (n) => n.especie === "faisca" && (!n.status || n.status === "pendente"),
      ).length;
      desenhaSugestoes();
      retomar();
    },
  };
}
