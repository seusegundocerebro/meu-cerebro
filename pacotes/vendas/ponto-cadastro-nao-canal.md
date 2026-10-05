---
name: ponto-cadastro-nao-canal
titulo: "Ponto de cadastro não é canal"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de vendas
area: [Vendas, Pipeline]
pacote: vendas
---

Ponto de cadastro não é canal. Vendedor que só registra cliente pronto cria um canal manual com conversão falsa perto de cem por cento. Parece ótimo, mas só mostra quem cadastrou, não quem foi atendido. Eu separo o registro de cadastro do canal de aquisição. Assim a conversão de cada canal fica honesta, e o cadastro manual deixa de distorcer. O dado precisa dizer de onde veio o cliente, não onde foi digitado.

Eu separo o campo de quem cadastrou do campo de origem do cliente. O relatório de canais usa só a origem. Quando um canal mostra conversão alta demais, investigo pra ver se é cadastro posterior.

**Exemplo:** O relatório mostra um canal manual com quase toda venda convertida. Ao investigar, o gerente vê que são clientes já fechados, apenas cadastrados depois. Reclassifica pela origem real e o número volta ao normal.

**Cuidado:** Não elogie canal com conversão suspeita sem investigar. Resultado bom demais merece conferência. Origem falsa leva a decisões erradas.

Ligado a [[origem-lead-nao-fechamento]] · [[medir-decide-nao-cadastra]] · [[venda-conta-pelo-mes-competencia]] · [[funil-de-vendas]]
