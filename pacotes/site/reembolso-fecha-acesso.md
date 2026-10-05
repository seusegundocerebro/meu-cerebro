---
name: reembolso-fecha-acesso
titulo: "Reembolso fecha o acesso"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de site
area: [Site, Checkout e entrega]
pacote: site
---

Reembolso fecha o acesso. Testo a negação sem compra, com Pix pendente e depois do estorno, antes de ativar. Se o reembolso não retira o acesso, o cliente pede o dinheiro de volta e continua usando. A cada situação, o resultado esperado é o mesmo: só quem pagou e não pediu reembolso entra.

Faço quatro testes: usuário sem compra, com pedido pendente, com pedido pago e com pedido reembolsado. Apenas o terceiro deve ter acesso. Também garanto que o aviso de reembolso chegue ao sistema e dispare o fechamento. Sem esse teste, uma falha silenciosa pode liberar o produto para sempre a quem já foi reembolsado.

**Exemplo:** Marcos simula um estorno e confirma que o acesso do cliente é cancelado na hora.

**Cuidado:** considerar apenas o caso feliz deixa buracos. Teste os quatro estados.

Ligado a [[arquivo-pago-atras-login-link-aberto]] · [[acesso-libera-identificador-pedido-nome]] · [[status-pedido-canonico]]
