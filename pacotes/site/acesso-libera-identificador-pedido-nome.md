---
name: acesso-libera-identificador-pedido-nome
titulo: "Acesso se libera por identificador do pedido, nunca por nome"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de site
area: [Site, Checkout e entrega]
pacote: site
---

O acesso se libera por identificador do pedido, nunca por nome. Liberar por nome de produto ou por palavra abre brecha para produto parecido entrar de graça; a chave é o id. Quando uso o nome, qualquer produto com nome semelhante pode ser confundido e liberar o acesso errado.

Trabalho com o identificador único do produto ou da oferta, e só libero quando o identificador bate exatamente com o que foi pago. Se o identificador não está na lista, não libero nada. É uma regra rígida, que evita acesso indevido e erro de entrega, e que torna a auditoria muito mais simples.

**Exemplo:** Marcos libera o acesso apenas quando o código da oferta paga coincide com o código cadastrado, e nunca pelo nome do produto.

**Cuidado:** não use busca por parte do nome. Ela aceita o que não devia.

Ligado a [[chave-deduplicacao-id-pedido]] · [[arquivo-pago-atras-login-link-aberto]] · [[reembolso-fecha-acesso]]
