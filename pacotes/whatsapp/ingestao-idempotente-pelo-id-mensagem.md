---
name: ingestao-idempotente-pelo-id-mensagem
titulo: "Ingestão idempotente pelo id da mensagem"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de WhatsApp
area: [WhatsApp, Janela de 24h e API oficial]
pacote: whatsapp
---

A caixa de entrada só é segura porque a ingestão é idempotente pelo id da mensagem. Sem isso, reprocessar vira máquina de mandar a mesma resposta duas vezes.

Idempotente quer dizer que processar duas vezes dá o mesmo resultado que processar uma. Cada mensagem chega com um id único da plataforma; grave esse id e cheque antes de inserir. A plataforma também reenvia o mesmo evento em alguns casos, então um segundo filtro pelo hash do corpo pega o que escapa. E tem a trava de turno: uma resposta por conversa por vez. Cliente que manda três mensagens seguidas disparava três turnos sobrepostos e três saudações, e parecia robô travado.

**Exemplo:** Renata mandou "oi", "é sobre o apartamento" e "de dois quartos" em cinco segundos. Sem trava e sem dedup, três saudações diferentes e uma delas respondendo o que a outra já tinha perguntado. Com trava e dedup, uma resposta só, que considera as três linhas juntas.

**Cuidado:** fazer dedup por telefone mais texto em vez de id. Cliente que manda "ok" duas vezes de propósito, em horas diferentes, seria engolido. O id da mensagem é único; o texto não.

Ligado a [[gravar-payload-cru-antes-confirmar-reprocessar-rotina]] · [[responder-ok-webhook-antes-gravar-perde-mensagem-rastro]] · [[repetir-mesma-mensagem-duas-vezes-parece-robo-travado]] · [[registrar-cada-toque-nao-existe-cadencia]]
