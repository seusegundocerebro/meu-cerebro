#!/usr/bin/env node
"use strict";
// Servidor local do mapa. Node 18+, sem instalação de pacotes.
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { criarBanco, erro, chaveLink } = require("./notas");
const { criarClaude } = require("./claude");
const { criarOperacoes } = require("./operacoes");
const PUBLICO = path.join(__dirname, "public");
function manda(res, status, obj) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(obj));
}
async function corpoJson(req) {
  if (!/^application\/json(?:;|$)/i.test(req.headers["content-type"] || ""))
    throw erro("Envie JSON.", 415);
  let tamanho = 0,
    partes = [];
  for await (const c of req) {
    tamanho += c.length;
    if (tamanho > 1100000) throw erro("Texto grande demais.", 413);
    partes.push(c);
  }
  try {
    return JSON.parse(Buffer.concat(partes).toString("utf8") || "{}");
  } catch {
    throw erro("JSON inválido.");
  }
}
function criarServidor({
  raiz = path.resolve(__dirname, ".."),
  notas = process.env.CEREBRO_NOTAS,
  claude,
} = {}) {
  const banco = criarBanco(raiz, notas);
  claude = claude || criarClaude({ cwd: raiz });
  const op = criarOperacoes(banco, claude);
  const servidor = http.createServer(async (req, res) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "no-referrer");
    try {
      // Loopback + Host + Origin: uma página externa não pode disparar o Claude local.
      const host = req.headers.host || "";
      if (!/^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/.test(host))
        throw erro("Abra o mapa pelo endereço localhost.", 403);
      const origem = req.headers.origin;
      if (origem && origem !== "http://" + host)
        throw erro("Pedido de outro site bloqueado.", 403);
      if (req.headers["sec-fetch-site"] === "cross-site")
        throw erro("Pedido de outro site bloqueado.", 403);
      const url = new URL(req.url, "http://" + host),
        p = url.pathname;
      if (req.method === "GET") {
        if (p === "/api/grafo") return manda(res, 200, banco.grafo());
        if (p === "/api/versao")
          return manda(res, 200, { versao: banco.versao() });
        if (p === "/api/job") {
          const j = op.job(url.searchParams.get("id"));
          return manda(
            res,
            j ? 200 : 404,
            j || { erro: "Esse pedido expirou. Faça o pedido novamente." },
          );
        }
        if (p === "/api/nota") {
          const n = banco.ler(url.searchParams.get("id")),
            g = banco.montar(),
            alvos = new Map();
          for (const m of n.texto.matchAll(
            /\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]/g,
          ))
            alvos.set(
              m[1],
              g.porChave.get(chaveLink(m[1])) || "fantasma:" + chaveLink(m[1]),
            );
          return manda(res, 200, {
            texto: n.texto,
            mtime: n.mtime,
            revisao: n.revisao,
            alvos: [...alvos],
          });
        }
        if (p === "/api/faiscas") {
          const lista = banco
            .grafo()
            .nos.filter(
              (n) =>
                n.especie === "faisca" &&
                (!n.status || n.status === "pendente"),
            )
            .map((n) => {
              const d = banco.ler(n.id);
              return { ...n, corpo: d.corpo, revisao: d.revisao };
            });
          return manda(res, 200, { lista });
        }
        if (p.startsWith("/api/")) throw erro("Rota não encontrada.", 404);
        const nomes = {
          "/": "index.html",
          "/index.html": "index.html",
          "/mapa.js": "mapa.js",
          "/recursos.js": "recursos.js",
          "/mapa.css": "mapa.css",
          "/icone.svg": "icone.svg",
        };
        const rel = nomes[p];
        if (!rel) throw erro("Arquivo não encontrado.", 404);
        const tipos = {
          ".html": "text/html",
          ".js": "text/javascript",
          ".css": "text/css",
          ".svg": "image/svg+xml",
        };
        const abs = path.join(PUBLICO, rel);
        const conteudo = fs.readFileSync(abs);
        res.writeHead(200, {
          "Content-Type": tipos[path.extname(abs)] + "; charset=utf-8",
          "Cache-Control": "no-cache",
        });
        return res.end(conteudo);
      }
      if (req.method !== "POST") throw erro("Método não permitido.", 405);
      const b = await corpoJson(req);
      if (!b || typeof b !== "object" || Array.isArray(b))
        throw erro("Pedido inválido.");
      if (p === "/api/nota")
        return manda(res, 200, banco.salvar(b.id, b.texto, b.revisao, b.mtime));
      if (p === "/api/ideia")
        return manda(res, 201, { id: banco.ideia(b.texto) });
      if (p === "/api/uso") {
        banco.ativar(b.id);
        return manda(res, 200, { ok: true });
      }
      if (p === "/api/faiscas/aceitar")
        return manda(res, 200, banco.faisca(b.id, "aceitar", b.revisao));
      if (p === "/api/faiscas/descartar")
        return manda(res, 200, banco.faisca(b.id, "descartar", b.revisao));
      if (p === "/api/feito")
        return manda(res, 200, banco.feito(b.id, b.resultado, b.revisao));
      const tipos = {
        "/api/perguntar": "perguntar",
        "/api/topicos": "topicos",
        "/api/faiscas/gerar": "faisca",
        "/api/plano": "plano",
      };
      if (tipos[p]) return manda(res, 202, { job: op.iniciar(tipos[p], b) });
      throw erro("Rota não encontrada.", 404);
    } catch (e) {
      if (!res.headersSent)
        manda(res, e.status || 500, {
          erro: e.status
            ? e.message
            : "Não foi possível concluir. Confira as permissões da pasta e tente novamente.",
        });
    }
  });
  servidor.on("close", () => claude.encerrar?.());
  servidor.encerrarClaude = () => claude.encerrar?.();
  return servidor;
}
if (require.main === module) {
  const porta = Number(process.env.PORT || 4747),
    host = process.env.HOST || "127.0.0.1";
  if (!["127.0.0.1", "localhost", "::1"].includes(host)) {
    console.error(
      "O mapa aceita apenas localhost. Para acesso remoto, use um túnel SSH.",
    );
    process.exit(1);
  }
  const servidor = criarServidor();
  servidor.on("error", (e) => {
    console.error(
      e.code === "EADDRINUSE"
        ? `A porta ${porta} está ocupada. Confira se seu mapa já está aberto ou escolha outra porta.`
        : "Não foi possível iniciar o mapa.",
    );
    process.exitCode = 1;
  });
  servidor.listen(porta, host, () =>
    console.log(
      `🧠 Mapa do cérebro: http://localhost:${servidor.address().port}`,
    ),
  );
  const parar = () => {
    servidor.encerrarClaude();
    servidor.closeAllConnections();
    servidor.close();
  };
  process.once("SIGINT", parar);
  process.once("SIGTERM", parar);
}
module.exports = { criarServidor };
