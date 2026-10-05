---
name: botao-template-nao-aceita-emoji
titulo: "Botão de template não aceita emoji"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de WhatsApp
area: [WhatsApp, Janela de 24h e API oficial]
pacote: whatsapp
---

Botão de resposta rápida em template não aceita emoji, variável, quebra de linha nem formatação. A plataforma recusa, e a mensagem de erro não diz qual dos três botões foi o culpado.

Minha primeira tentativa tinha um emoji em cada botão. Recusado. Tirei os emojis, aprovou em minutos. As regras do botão: texto puro, até 20 caracteres, no máximo três por template. Emoji pode ir no corpo da mensagem, não no botão. Rótulo bom é verbo curto: "Bora seguir", "Mais pra frente", "Não quero contato". O botão de sair é obrigatório, por respeito ao cliente e porque a plataforma pesa isso a favor da sua conta.

**Exemplo:** Juliana montou os botões "Quero" com o sinal de certo, "Depois" com a ampulheta e "Parar" com o sinal de proibido, e perdeu uma tarde achando que o problema era o texto do corpo. Trocou pra "Quero sim", "Mais pra frente" e "Não quero contato", e aprovou em quinze minutos.

**Cuidado:** rótulo ambíguo. A resposta chega no webhook como o texto do botão. Se dois templates diferentes usam o mesmo rótulo, o sistema não sabe qual régua está respondendo. Cada régua tem seus rótulos.

Ligado a [[template-bem-escrito-aprova-quinze-minutos]] · [[botao-nao-quero-contato-obrigatorio-regua]] · [[emoji-tempero-nao-prato]] · [[resposta-regua-fecha-calada-72-horas]]
