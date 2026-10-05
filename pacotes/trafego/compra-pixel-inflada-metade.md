---
name: compra-pixel-inflada-metade
titulo: "Compra do pixel inflada em metade"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de tráfego
area: [Tráfego, Leitura de métrica]
pacote: trafego
---

A compra do pixel pode estar inflada. A venda real mora no banco da plataforma de pagamento, nunca no evento duplicado. Quando o pixel e o servidor mandam o mesmo evento sem deduplicar, a plataforma conta duas vezes.
Eu faço uma conferência mensal: comparo as compras do painel com as vendas confirmadas no sistema de pagamento. Se o painel mostra bem mais, existe duplicidade. Aí corrijo a deduplicação antes de tomar decisão.
Na dúvida, eu rodo uma compra de teste e vejo quantas vezes o evento aparece. Se aparece duas, a deduplicação não está funcionando e eu preciso ajustar o envio.

**Exemplo:** A Juliana viu mais compras no painel do que no checkout. Ao revisar, notou que o evento era enviado por dois caminhos sem chave de deduplicação.

**Cuidado:** Usar o número do painel como faturamento. Painel é estimativa de atribuição. Faturamento é o que entrou no caixa.

Ligado a [[mesma-conversao-aparece-varios-nomes-acao]] · [[checkout-iniciado-infla-nao-kpi]] · [[atraso-lead-resultado-le-mediana-percentil]] · [[pixel-id-chave-nao-so-id]]
