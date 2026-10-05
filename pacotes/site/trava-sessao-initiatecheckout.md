---
name: trava-sessao-initiatecheckout
titulo: "Trava por sessão no InitiateCheckout"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de site
area: [Site, Pixel e API de conversões]
pacote: site
---

Trava por sessão no InitiateCheckout. Disparo uma vez por sessão, não por clique; senão a mesma pessoa vira três checkouts. Com a trava, o número reflete pessoas, não toques, e o funil fica legível.

Guardo uma marca no navegador da sessão quando o evento sai e verifico antes de enviar de novo. Se a marca existe, não envio. A trava cobre também quem volta e clica em outro botão. É uma regra pequena que limpa bastante a medição e evita que o sistema de anúncios aprenda com cliques repetidos.

**Exemplo:** Juliana adiciona uma marca de sessão ao evento. A mesma pessoa que clica em três botões gera apenas um registro.

**Cuidado:** trava eterna esconde quem volta dias depois. Limite à sessão.

Ligado a [[initiatecheckout-maior-pageview-ruido]] · [[ic-nao-kpi]] · [[quatro-eventos-padrao-pagina]]
