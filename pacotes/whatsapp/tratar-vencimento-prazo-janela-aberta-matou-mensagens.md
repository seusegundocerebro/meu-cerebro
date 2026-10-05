---
name: tratar-vencimento-prazo-janela-aberta-matou-mensagens
titulo: "Tratar vencimento de prazo como janela aberta matou dezenas de mensagens"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de WhatsApp
area: [WhatsApp, Janela de 24h e API oficial]
pacote: whatsapp
---

Eu perdi dezenas de mensagens em dezenas de conversas porque o código tratava o fim de um prazo interno como se fosse janela aberta.

A régua mandava um template pago de manhã e segurava a conversa por 24 horas pra dar tempo de o cliente responder. Quando esse prazo vencia, outra rotina assumia e mandava texto livre, exatamente 24 horas e alguns minutos depois. Só que o cliente não tinha respondido, então a janela gratuita nunca abriu. Eram dois relógios diferentes com nomes parecidos: o prazo de espera da régua e a janela da plataforma. O código confundiu um com o outro, e ninguém viu porque o painel mostrava a bolha como enviada.

**Exemplo:** Marcos recebeu o template às 9h30 e ignorou. No dia seguinte, às 9h36, o robô mandou "vou te passar pro Diego". Recusado pela plataforma. No painel, a bolha apareceu normal, e o Diego herdou um cliente que nunca soube de nada.

**Cuidado:** regra de janela espalhada em vários arquivos. Deixe uma função só que responde "posso mandar texto livre pra esse cliente agora?" e faça todo mundo perguntar a ela antes de enviar.

Ligado a [[template-entregue-nao-reabre-janela-24h]] · [[despedida-passagem-fora-janela-chega]] · [[envio-falha-nao-lanca-erro]] · [[passar-lead-sumir-entendi-deixa-cliente-vacuo]]
