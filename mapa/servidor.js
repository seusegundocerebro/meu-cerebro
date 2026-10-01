#!/usr/bin/env node
// Mapa do cérebro — servidor local, sem dependência nenhuma (só Node 18+).
// Lê as notas .md da pasta notas/ (ou de CEREBRO_NOTAS), monta o grafo pelos [[links]] e serve o mapa 3D.
// Roda só no seu computador: escuta em 127.0.0.1, ninguém de fora enxerga.
"use strict";
const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const RAIZ = path.resolve(__dirname, "..");
const NOTAS = path.resolve(
  process.env.CEREBRO_NOTAS || path.join(RAIZ, "notas"),
);
const ESTADO = path.join(RAIZ, ".cerebro");
const PUBLICO = path.join(__dirname, "public");
const PORTA = Number(process.env.PORT || 4747);
const HOST = process.env.HOST || "127.0.0.1";
const PULAR = new Set([
  ".obsidian",
  ".historico",
  ".trash",
  ".git",
  "node_modules",
  ".cerebro",
]);

fs.mkdirSync(ESTADO, { recursive: true });
fs.mkdirSync(NOTAS, { recursive: true });

// "Reunião com o João" → "reuniao-com-o-joao" (é assim que [[link]] casa com arquivo, título ou name:)
// com "/" (link pra nota dentro de pasta) cada pedaço vira chave e a barra fica: [[pasta/nota]] ≠ [[pasta-nota]]
const chaveLink = (s) => String(s || "").split("/").map(chave).filter(Boolean).join("/");
const chave = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\.md$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function listaMd(dir, base = dir, out = []) {
  let itens;
  try {
    itens = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const it of itens) {
    if (PULAR.has(it.name)) continue;
    const p = path.join(dir, it.name);
    if (it.isDirectory()) listaMd(p, base, out);
    else if (it.name.endsWith(".md")) out.push(path.relative(base, p));
  }
  return out;
}

function frontmatter(txt) {
  const m = txt.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { fm: {}, corpo: txt };
  const fm = {};
  for (const linha of m[1].split(/\r?\n/)) {
    const k = linha.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!k) continue;
    let v = k[2].trim();
    if (/^(["']).*\1$/.test(v)) v = v.slice(1, -1);
    fm[k[1]] = v;
  }
  return { fm, corpo: txt.slice(m[0].length) };
}

function lerUso() {
  try {
    return JSON.parse(fs.readFileSync(path.join(ESTADO, "uso.json"), "utf8"));
  } catch {
    return {};
  }
}

function montaGrafo() {
  const arquivos = listaMd(NOTAS);
  const nos = [];
  const porChave = new Map();
  const uso = lerUso();
  for (const rel of arquivos) {
    const abs = path.join(NOTAS, rel);
    let txt, st;
    try {
      txt = fs.readFileSync(abs, "utf8");
      st = fs.statSync(abs);
    } catch {
      continue;
    }
    const { fm, corpo } = frontmatter(txt);
    const id = rel.replace(/\\/g, "/").replace(/\.md$/, "");
    const h1 = corpo.match(/^#\s+(.+)$/m);
    const titulo =
      fm.titulo || fm.title || (h1 && h1[1].trim()) || path.basename(id);
    const no = {
      id,
      titulo,
      especie: fm.especie || "nota",
      status: fm.status || "",
      aviso: fm.aviso || "",
      criado: fm.criado || st.mtime.toLocaleDateString("sv-SE") /* AAAA-MM-DD no fuso do computador */,
      uso: (uso[id] && uso[id].n) || 0,
      grau: 0,
      _corpo: corpo,
    };
    nos.push(no);
    porChave.set(chaveLink(id), id);
    for (const k of [path.basename(id), fm.name, fm.titulo, fm.title, titulo])
      if (k && !porChave.has(chave(k))) porChave.set(chave(k), id);
  }
  const links = [];
  const vistos = new Set();
  const fantasmas = new Map();
  const re = /\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]/g;
  for (const no of nos) {
    let m;
    while ((m = re.exec(no._corpo))) {
      const k = chaveLink(m[1]);
      if (!k) continue;
      let alvo = porChave.get(k);
      if (!alvo) {
        // link pra nota que ainda não existe: vira bolinha apagada (uma ideia esperando nascer)
        alvo = "fantasma:" + k;
        if (!fantasmas.has(alvo))
          fantasmas.set(alvo, {
            id: alvo,
            titulo: m[1].trim(),
            especie: "fantasma",
            grau: 0,
            uso: 0,
          });
      }
      if (alvo === no.id) continue;
      const par = [no.id, alvo].sort().join("\u0000");
      if (vistos.has(par)) continue;
      vistos.add(par);
      links.push({ source: no.id, target: alvo });
    }
    delete no._corpo;
  }
  const todos = [...nos, ...fantasmas.values()];
  const grau = new Map();
  for (const l of links) {
    grau.set(l.source, (grau.get(l.source) || 0) + 1);
    grau.set(l.target, (grau.get(l.target) || 0) + 1);
  }
  for (const n of todos) n.grau = grau.get(n.id) || 0;
  return { nos: todos, links, porChave };
}

// versão barata: muda quando qualquer nota nasce, some ou é editada — o mapa pergunta isso a cada poucos segundos
function versao() {
  const h = crypto.createHash("sha1");
  for (const rel of listaMd(NOTAS)) {
    try {
      h.update(rel + ":" + fs.statSync(path.join(NOTAS, rel)).mtimeMs + ";");
    } catch {}
  }
  return h.digest("hex").slice(0, 12);
}

function caminhoDaNota(id) {
  const abs = path.resolve(NOTAS, String(id || "") + ".md");
  if (!abs.startsWith(NOTAS + path.sep))
    throw Object.assign(new Error("id inválido"), { status: 400 });
  return abs;
}

function manda(res, status, obj) {
  const corpo = JSON.stringify(obj);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(corpo);
}

function corpoJson(req) {
  return new Promise((ok, falha) => {
    let s = "";
    req.on("data", (c) => {
      s += c;
      if (s.length > 2e6) req.destroy();
    });
    req.on("end", () => {
      try {
        ok(s ? JSON.parse(s) : {});
      } catch (e) {
        falha(Object.assign(e, { status: 400 }));
      }
    });
  });
}

const TIPOS = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};

const servidor = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://x");
  const p = url.pathname;
  try {
    if (p === "/api/grafo")
      {
      const { nos, links } = montaGrafo();
      return manda(res, 200, { nos, links, versao: versao() });
    }
    if (p === "/api/versao") return manda(res, 200, { versao: versao() });
    if (p === "/api/nota" && req.method === "GET") {
      const abs = caminhoDaNota(url.searchParams.get("id"));
      if (!fs.existsSync(abs))
        return manda(res, 404, { erro: "nota não existe" });
      const mtime = fs.statSync(abs).mtimeMs; // antes de ler: se mudar no meio, o salvar acusa conflito
      const texto = fs.readFileSync(abs, "utf8");
      // o painel usa a MESMA resolução de [[link]] do grafo (fio e clique sempre levam à mesma nota)
      const { porChave } = montaGrafo();
      const alvos = new Map();
      for (const m of texto.matchAll(/\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]/g)) {
        const k = chaveLink(m[1]);
        if (k) alvos.set(m[1], porChave.get(k) || "fantasma:" + k);
      }
      return manda(res, 200, { texto, mtime, alvos: [...alvos] }); // pares, não objeto: [[__proto__]] não quebra
    }
    if (p === "/api/nota" && req.method === "POST") {
      const b = await corpoJson(req);
      const abs = caminhoDaNota(b.id);
      if (typeof b.texto !== "string")
        return manda(res, 400, { erro: "texto vazio" });
      // a nota foi apagada (pelo Claude, no Finder) depois que você abriu: não ressuscita
      if (b.mtime && !fs.existsSync(abs))
        return manda(res, 409, {
          erro: "Essa nota foi apagada enquanto você editava. Copie seu texto se quiser guardar.",
        });
      if (fs.existsSync(abs)) {
        // alguém (o Claude, outra aba) mexeu nessa nota depois que você abriu: não salva por cima
        if (b.mtime && Math.abs(fs.statSync(abs).mtimeMs - b.mtime) > 1)
          return manda(res, 409, {
            erro: "A nota mudou enquanto você editava. Copie seu texto e reabra.",
          });
        const hist = path.join(NOTAS, ".historico");
        fs.mkdirSync(hist, { recursive: true });
        fs.copyFileSync(
          abs,
          path.join(
            hist,
            String(b.id).replace(/[\\/]/g, "__") + "." + Date.now() + ".md",
          ),
        );
      }
      const tmp = abs + ".tmp" + process.pid;
      fs.writeFileSync(tmp, b.texto);
      fs.renameSync(tmp, abs);
      return manda(res, 200, { ok: true, mtime: fs.statSync(abs).mtimeMs });
    }
    if (p === "/api/uso" && req.method === "POST") {
      const b = await corpoJson(req);
      const uso = lerUso();
      const id = String(b.id || "");
      if (id)
        uso[id] = {
          n: ((uso[id] && uso[id].n) || 0) + 1,
          ultimo: new Date().toISOString(),
        };
      fs.writeFileSync(
        path.join(ESTADO, "uso.json"),
        JSON.stringify(uso, null, 1),
      );
      return manda(res, 200, { ok: true });
    }
    // arquivos do mapa
    const rel = p === "/" ? "index.html" : p.slice(1);
    const abs = path.resolve(PUBLICO, rel);
    if (!abs.startsWith(PUBLICO + path.sep) || !fs.existsSync(abs)) {
      res.writeHead(404);
      return res.end("não achei");
    }
    res.writeHead(200, {
      "Content-Type":
        (TIPOS[path.extname(abs)] || "application/octet-stream") +
        "; charset=utf-8",
    });
    fs.createReadStream(abs).pipe(res);
  } catch (e) {
    manda(res, e.status || 500, { erro: e.message });
  }
});

servidor.on("error", (e) => {
  if (e.code === "EADDRINUSE") {
    console.log(
      `A porta ${PORTA} já está em uso — o mapa provavelmente já está aberto em http://localhost:${PORTA}`,
    );
    process.exit(0);
  }
  throw e;
});
servidor.listen(PORTA, HOST, () => {
  const g = montaGrafo();
  console.log(
    `🧠 Mapa do cérebro no ar: http://localhost:${PORTA}  (${g.nos.length} notas, ${g.links.length} ligações)`,
  );
  console.log(`   Lendo as notas de: ${NOTAS}`);
});
