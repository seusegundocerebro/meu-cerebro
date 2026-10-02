"use strict";
// TF-IDF e cosseno: títulos pesam mais; índice invertido evita comparar todos os pares.
const PARADAS = new Set(
  "como para pelo pela pelos pelas porque quando onde isso esse essa estes estas sobre entre depois antes ainda tambem cada todo toda todos todas tudo nada fazer feito sempre nunca mais menos muito pode precisa quem qual quais agora hoje ontem amanha dele dela nosso nossa seu sua seus suas voce voces gente coisa coisas entao tinha teve sendo estar estava estao dentro desde apos sem com uma umas dos das nos nas pra pro que the and for with this that from name titulo especie criado status frente area ligado nota notas nasceu plano".split(
    " ",
  ),
);
function tokens(texto) {
  return String(texto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length >= 3 && !/^\d+$/.test(t) && !PARADAS.has(t));
}
const par = (a, b) => [a, b].sort().join("\0");
function criarIndice(notas) {
  const df = new Map();
  const docs = notas.map((n) => {
    const tf = new Map();
    for (const [texto, peso] of [
      [n.titulo, 3],
      [n.corpo, 1],
    ])
      for (const t of tokens(texto)) tf.set(t, (tf.get(t) || 0) + peso);
    for (const t of tf.keys()) df.set(t, (df.get(t) || 0) + 1);
    return { n, tf };
  });
  // IDF suavizado: palavras raras e coleções pequenas também são pesquisáveis.
  const idf = new Map(
    [...df].map(([t, c]) => [t, Math.log(1 + notas.length / c)]),
  );
  const vetores = new Map(),
    postings = new Map();
  for (const { n, tf } of docs) {
    const v = new Map(
      [...tf].map(([t, c]) => [t, (1 + Math.log(c)) * idf.get(t)]),
    );
    const norma = Math.hypot(...v.values()) || 1;
    for (const [t, x] of v) {
      v.set(t, x / norma);
      if (!postings.has(t)) postings.set(t, []);
      postings.get(t).push([n.id, x / norma]);
    }
    vetores.set(n.id, v);
  }
  function pontua(v) {
    const scores = new Map();
    for (const [t, x] of v)
      for (const [id, y] of postings.get(t) || [])
        scores.set(id, (scores.get(id) || 0) + x * y);
    return [...scores].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }
  function recupera(texto, links = [], limite = 16) {
    const q = new Map();
    for (const t of tokens(texto))
      if (idf.has(t)) q.set(t, (q.get(t) || 0) + idf.get(t));
    const norma = Math.hypot(...q.values()) || 1;
    for (const [t, x] of q) q.set(t, x / norma);
    const fortes = pontua(q),
      scores = new Map(fortes);
    for (const [id, s] of fortes.slice(0, 6))
      for (const l of links) {
        const outro =
          l.source === id ? l.target : l.target === id ? l.source : null;
        if (vetores.has(outro))
          scores.set(outro, Math.max(scores.get(outro) || 0, s * 0.5));
      }
    return [...scores]
      .sort((a, b) => b[1] - a[1])
      .slice(0, limite)
      .map(([id, forca]) => ({ id, forca }));
  }
  function latentes(links) {
    const explicitas = new Set(links.map((l) => par(l.source, l.target))),
      pares = new Map();
    for (const [id, v] of vetores) {
      for (const [outro, s] of pontua(v)
        .filter(
          ([o, s]) => o !== id && s >= 0.22 && !explicitas.has(par(id, o)),
        )
        .slice(0, 3)) {
        const [source, target] = [id, outro].sort();
        pares.set(par(id, outro), {
          source,
          target,
          forca: +s.toFixed(3),
          latente: true,
        });
      }
    }
    return [...pares.values()];
  }
  return { recupera, latentes };
}
module.exports = { criarIndice, tokens };
