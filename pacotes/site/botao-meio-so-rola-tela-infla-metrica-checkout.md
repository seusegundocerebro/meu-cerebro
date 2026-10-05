---
name: botao-meio-so-rola-tela-infla-metrica-checkout
titulo: "Botão do meio que só rola a tela infla a métrica de checkout"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de site
area: [Site, A primeira dobra]
pacote: site
---

Se o clique no botão é contado como início de compra mas o botão só rola para outro bloco, o número mente. A métrica de checkout fica inflada e você acha que o problema está depois do clique, quando está no botão. Eu separo as ações: quem leva ao pagamento dispara o evento de checkout, quem apenas navega não dispara nada. O erro é duplo: o número bonito leva a decisões erradas, e o problema real, que é o botão que não leva a lugar nenhum, continua escondido.

**Exemplo:** Renata via muitos inícios de compra e poucas vendas. O motivo: metade dos botões só descia a tela, mas todos disparavam o mesmo evento.

**Cuidado:** consertar o botão e esquecer de corrigir a contagem histórica. Os números antigos não servem para comparar.

Ligado a [[sete-dez-botoes-todos-indo-pro-checkout]] · [[quatro-eventos-padrao-pagina]] · [[initiatecheckout-maior-pageview-ruido]]
