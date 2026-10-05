---
name: responder-ok-webhook-antes-gravar-perde-mensagem-rastro
titulo: "Responder OK ao webhook antes de gravar perde a mensagem sem rastro"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de WhatsApp
area: [WhatsApp, Janela de 24h e API oficial]
pacote: whatsapp
---

Responder OK ao webhook antes de gravar a mensagem no banco perde o cliente sem rastro. A plataforma considera entregue e nunca reenvia.

O desenho natural é receber, responder OK rápido e depois trabalhar: baixar o áudio, transcrever, passar a imagem pela visão, gravar. Se o processo morre nesse meio, por um restart ou um erro, não existe linha nenhuma dizendo que o cliente escreveu. Nenhum vigia recupera o que nunca foi registrado. Com mídia, a exposição é de minutos por mensagem, porque são várias chamadas de rede antes do primeiro insert. É o único buraco dessa família que não deixa rastro; os outros pelo menos mostram uma conversa parada.

**Exemplo:** Marcos reiniciou o app às 14h02 pra subir uma correção pequena. Renata tinha mandado um áudio às 14h01; o OK já tinha saído e a transcrição estava no meio. Ela esperou resposta até desistir. No painel, a mensagem dela nunca existiu, e ninguém foi cobrado porque não havia o que cobrar.

**Cuidado:** achar que o log resolve. Log não é fila e ninguém lê log atrás de cliente perdido. O que salva é o conteúdo gravado antes do OK.

Ligado a [[gravar-payload-cru-antes-confirmar-reprocessar-rotina]] · [[ingestao-idempotente-pelo-id-mensagem]] · [[falha-gravar-nao-pode-negar-ok]] · [[zero-silencio-entrada-nao-respondido-nao-volta]]
