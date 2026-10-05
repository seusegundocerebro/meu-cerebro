---
name: purchase-inflado-duplicata-nao-venda-nova
titulo: "Purchase inflado é duplicata, não venda nova"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de site
area: [Site, Pixel e API de conversões]
pacote: site
---

Purchase inflado é duplicata, não venda nova. A diferença de receita no painel era um múltiplo exato do líquido de um pedido, sinal de que um mesmo pedido era contado várias vezes. A fonte da verdade é o banco do webhook, que guarda cada pedido uma vez.

Quando o painel de anúncios mostra um valor diferente do que recebi, comparo com o banco. Se a diferença é um múltiplo redondo do valor de um pedido, é duplicidade. Procuro quem está mandando o evento duas vezes e corrijo na origem. Decidir verba com número inflado leva a gastar mais onde o retorno é menor do que parece.

**Exemplo:** Renata vê que a receita do painel é o dobro da recebida e conclui que cada venda estava sendo enviada duas vezes.

**Cuidado:** não ajuste o orçamento com base em número que não bate com o dinheiro recebido.

Ligado a [[duas-integracoes-mesmo-pixel-venda-dobro]] · [[pixel-navegador-capi-servidor-mesmo-event-id]] · [[chave-deduplicacao-id-pedido]]
