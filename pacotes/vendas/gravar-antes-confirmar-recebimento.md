---
name: gravar-antes-confirmar-recebimento
titulo: "Gravar antes de confirmar recebimento"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de vendas
area: [Vendas, Pipeline]
pacote: vendas
---

Gravar antes de confirmar o recebimento. Mensagem confirmada antes de salva some sem rastro. Eu salvo cru primeiro, depois respondo ao remetente. Se algo falhar no meio, o dado está guardado e dá pra reprocessar. A ordem importa: confirmar antes de gravar é prometer o que não sei se cumpro. Em sistemas que recebem mensagens, perder dado é perder cliente.

Eu desenho o fluxo na ordem: receber, gravar, responder. Se a gravação falha, retorno erro e não confirmo. Os dados ficam seguros e posso reprocessar qualquer mensagem que tenha chegado.

**Exemplo:** Um cliente manda mensagem e o sistema precisa registrar. O fluxo grava primeiro, e só depois confirma o recebimento. Quando uma falha ocorre no processamento, a mensagem continua salva e é tratada depois.

**Cuidado:** Não use a confirmação rápida como prova de segurança. Rápido sem gravar é frágil. Priorize a persistência e deixe o resto para depois. Teste a falha de propósito, pra ver se o dado realmente fica salvo.

Ligado a [[toda-escrita-sistema-devolve-estagio-atual]] · [[mensagem-pronta-tarefa]] · [[estagio-terminal-nao-promove-robo]] · [[funil-de-vendas]]
