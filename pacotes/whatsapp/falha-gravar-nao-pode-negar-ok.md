---
name: falha-gravar-nao-pode-negar-ok
titulo: "Falha ao gravar não pode negar o OK"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de WhatsApp
area: [WhatsApp, Janela de 24h e API oficial]
pacote: whatsapp
---

Se gravar na caixa de entrada falhar, responda OK mesmo assim. Negar o OK degrada a entrega do número inteiro, e isso é pior que perder um evento.

Quando o seu webhook devolve erro, a plataforma tenta de novo por um tempo. Se o seu endereço falha repetido, ela passa a tratar a integração como doente e atrasa ou corta a entrega de tudo, não só daquela mensagem. Um banco travado por trinta segundos vira horas de fila atrasada pra todos os clientes. Então a ordem é: tenta gravar; se falhar, registra alto, dispara alerta pra alguém, e devolve OK. Perde-se talvez uma mensagem, com nome e hora no alerta. O número continua vivo.

**Exemplo:** Marcos deixou o banco em manutenção por três minutos. Com o OK garantido, o app perdeu duas mensagens, e o alerta disse quem eram; ele ligou pras duas pessoas. Sem isso, a plataforma segurou a entrega do número por duas horas e ninguém recebeu nada.

**Cuidado:** OK calado em falha é só esconder o problema. O alerta precisa existir, precisa chegar em alguém e precisa dizer qual cliente ficou sem registro.

Ligado a [[responder-ok-webhook-antes-gravar-perde-mensagem-rastro]] · [[gravar-payload-cru-antes-confirmar-reprocessar-rotina]] · [[envio-falha-nao-lanca-erro]]
