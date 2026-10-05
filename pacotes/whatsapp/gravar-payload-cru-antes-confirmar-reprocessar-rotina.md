---
name: gravar-payload-cru-antes-confirmar-reprocessar-rotina
titulo: "Gravar o payload cru antes de confirmar; reprocessar por rotina"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de WhatsApp
area: [WhatsApp, Janela de 24h e API oficial]
pacote: whatsapp
---

Grave o payload cru no banco, depois responda OK, e deixe uma rotina reprocessar o que ficou pendente. É a caixa de entrada que salva o cliente quando o processo cai no meio.

1. O webhook recebe, grava o JSON inteiro numa tabela de entrada com status pendente, e só então responde OK.
2. Processa pelo mesmo caminho de sempre e marca como feito.
3. Uma rotina a cada minuto, e no boot do app, pega os pendentes e processa de novo pelo mesmo caminho.
4. Lease de alguns minutos, pra dois processos não pegarem o mesmo item; desiste depois de cinco tentativas e avisa alguém.
5. Faxina: payload carrega dado pessoal, então apaga em sete dias.

**Exemplo:** Diego subiu uma correção às 14h02. A mensagem de Paula, das 14h01, estava na caixa como pendente. O boot reprocessou e ela recebeu resposta dois minutos depois, sem ninguém notar que houve restart.

**Cuidado:** recibo de entrega e de leitura também chega pelo webhook e não precisa de caixa. Filtre antes de gravar, senão a tabela enche de evento que não é mensagem e a rotina perde tempo com nada.

Ligado a [[responder-ok-webhook-antes-gravar-perde-mensagem-rastro]] · [[ingestao-idempotente-pelo-id-mensagem]] · [[falha-gravar-nao-pode-negar-ok]] · [[mensagem-segurada-madrugada-sai-8h-nao-some]]
