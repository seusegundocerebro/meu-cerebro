---
name: conferir-nome-grupo-antes-disparar
titulo: "Conferir o nome do grupo antes de disparar"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de WhatsApp
area: [WhatsApp, Dia a dia]
pacote: whatsapp
---

Antes de qualquer mensagem automática em grupo, o sistema confere o nome e o tamanho do grupo pelo identificador. O id guardado na configuração pode apontar pro grupo errado, e ninguém descobre até a mensagem cair lá.

Grupo muda. Alguém salva o id de teste no lugar do de produção, e a configuração continua ali, com cara de certa. A mensagem do robô sai, chega num grupo de clientes em vez do grupo da equipe, e não tem como apagar o que trinta pessoas já leram.

A rotina que eu uso:
1. Antes de enviar, o sistema pede os dados do grupo pelo id: nome e quantidade de participantes.
2. Se o nome não bate com o esperado, não envia e avisa quem cuida.
3. O nome esperado fica escrito ao lado do id na configuração.

**Exemplo:** a Renata ligou um aviso diário de pendências pro "grupo da equipe". O id era do grupo de clientes de um lançamento antigo. Durante dois dias, 60 clientes receberam a lista de leads sem resposta.

**Cuidado:** conferir uma vez, na instalação, não basta. Grupo é recriado sem aviso; a conferência é a cada envio.

Ligado a [[disparar-grupo-manda-pedir]] · [[robo-fala-time-so-horario-comercial]] · [[mensagem-fixada-grupo-time]] · [[envio-falha-nao-lanca-erro]]
