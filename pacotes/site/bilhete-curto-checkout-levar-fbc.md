---
name: bilhete-curto-checkout-levar-fbc
titulo: "Bilhete curto no checkout pra levar o fbc"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de site
area: [Site, Pixel e API de conversões]
pacote: site
---

Um bilhete curto no checkout para levar o fbc. O fbclid é longo e nenhum checkout promete devolver tudo; uso um código curto no parâmetro de rastreio, e o servidor guarda o resto. Quando o aviso de venda chega, o código me leva de volta aos dados completos do clique.

Gero um código de poucos caracteres na página, guardo no servidor os dados longos associados a ele e mando só o código no link. No aviso de compra, procuro o código e recupero tudo. É uma ponte simples entre o clique e a venda, sem depender de que o checkout preserve um texto comprido.

**Exemplo:** Renata cria um código de dezesseis caracteres, guarda os dados e o envia no link. Ao receber a venda, encontra o código e recupera tudo.

**Cuidado:** o código não pode conter dado pessoal. Deve ser só uma chave sem significado.

Ligado a [[garimpar-corpo-webhook-atras-bilhete]] · [[fbc-so-existe-depois-pixel-carrega]] · [[link-checkout-preserva-parametros-pagina]]
