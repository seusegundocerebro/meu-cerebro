---
name: trocar-meta-desempenho-conversao-so-alguns-conjuntos
titulo: "Trocar a meta de desempenho pra conversão só em alguns conjuntos"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de tráfego
area: [Tráfego, Pixel e atribuição]
pacote: trafego
---

Trocar a meta de desempenho pra conversão só em alguns conjuntos, nunca em todos de uma vez. A API recusa a troca em massa, e eu faço na mão. A razão é simples: se tudo muda ao mesmo tempo e o resultado piora, não há conjunto de comparação.
Eu escolho um ou dois conjuntos pra testar a meta nova, deixo os outros como estavam e comparo depois de uma janela completa. Se a meta nova vence, eu estendo aos poucos.
Depois da janela, se a meta nova venceu, estendo a mais um ou dois conjuntos. A migração acontece em ondas, e o grupo de controle só some quando a prova é clara.

**Exemplo:** A Juliana mudou todos os conjuntos de uma vez e o resultado caiu na semana. Não conseguiu saber se foi a meta ou outra coisa. Na vez seguinte, trocou só dois e comparou com os que ficaram.

**Cuidado:** Mudar tudo por impaciência. O conjunto que fica como estava é o seu grupo de controle. Sem ele, você decide no escuro.

Ligado a [[nao-troque-evento-profundo-antes-cinquenta-semana]] · [[lead-so-escreveu-duas-mensagens]] · [[pausar-trocar-anuncio-nao-reseta-aprendizado-mexer]] · [[meta-custo-limite-lance-nao-servem-testar]]
