---
name: evento-valor-exige-moeda
titulo: "Evento de valor exige moeda"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de site
area: [Site, Pixel e API de conversões]
pacote: site
---

Evento de valor exige moeda. Sem currency, a requisição inteira é recusada e, como o erro não é definitivo, o sistema reenvia para sempre. Um campo faltando derruba o envio e ainda cria uma fila de tentativas sem fim.

Por isso, todo evento com valor leva o código da moeda. Testo com um evento de exemplo e verifico a resposta. Se vier recusa, leio a mensagem e ajusto. Também limito o número de tentativas, para uma falha de formato não ficar se repetindo. Campos obrigatórios esquecidos são uma das causas mais comuns de dado perdido sem aviso.

**Exemplo:** Renata envia o valor sem a moeda. A resposta é uma recusa; ela adiciona o código da moeda e o envio passa.

**Cuidado:** leia a resposta da plataforma. Silêncio não significa sucesso.

Ligado a [[erro-permanente-sai-rodizio-reenvio]] · [[fbc-fbp-ip-navegador-vao-crus-mail-telefone-nome-vao]] · [[quatro-eventos-padrao-pagina]]
