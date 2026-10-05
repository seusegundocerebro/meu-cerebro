---
name: duas-integracoes-mesmo-pixel-venda-dobro
titulo: "Duas integrações no mesmo pixel é venda em dobro"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de site
area: [Site, Pixel e API de conversões]
pacote: site
---

Duas integrações no mesmo pixel é venda em dobro. Liguei a integração nativa do checkout junto com a minha, e o Purchase inflou bastante. Cada integração enviava o evento por conta própria, e a plataforma contava os dois como se fossem compras diferentes.

Quando vejo número de compras maior que o de pedidos reais, a primeira suspeita é duplicidade de integração. Desligo uma delas, deixo só a que eu controlo e confiro de novo. Sempre que ligo algo novo no pixel, comparo as contagens com o banco de pedidos. A fonte da verdade é o registro do webhook, não o painel de anúncios.

**Exemplo:** Marcos liga uma segunda integração e, no dia seguinte, o painel mostra bem mais compras do que existem no banco de pedidos.

**Cuidado:** não comemore número alto sem conferir com os pedidos reais.

Ligado a [[purchase-inflado-duplicata-nao-venda-nova]] · [[pixel-navegador-capi-servidor-mesmo-event-id]] · [[initiatecheckout-maior-pageview-ruido]]
