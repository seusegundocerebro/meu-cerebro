---
name: pixel-navegador-capi-servidor-mesmo-event-id
titulo: "Pixel no navegador e CAPI no servidor com o mesmo event_id"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de site
area: [Site, Pixel e API de conversões]
pacote: site
---

O pixel no navegador e a API de conversões no servidor usam o mesmo event_id. A plataforma deduplica pelo id; sem id, cada venda conta duas vezes. Os dois caminhos existem para se complementar: o navegador pode ser bloqueado, o servidor é mais confiável.

Gero um identificador único por evento, mando o mesmo no navegador e no servidor, e a plataforma entende que é um só. Se o id falta ou muda, ela soma os dois. Conferir isso na tela de diagnóstico da plataforma é parte do trabalho, e vale repetir após qualquer alteração na página.

**Exemplo:** Diego gera o id da compra e o inclui nos dois envios. O painel mostra os eventos como um só.

**Cuidado:** id diferente em cada canal faz o mesmo evento aparecer duas vezes.

Ligado a [[duas-integracoes-mesmo-pixel-venda-dobro]] · [[chave-deduplicacao-id-pedido]] · [[fbc-fbp-ip-navegador-vao-crus-mail-telefone-nome-vao]]
