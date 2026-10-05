---
name: webhook-responde-200-hora-trabalha-depois
titulo: "Webhook responde 200 na hora e trabalha depois"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de site
area: [Site, Checkout e entrega]
pacote: site
---

O webhook responde 200 na hora e trabalha depois. A plataforma reenvia o aviso se demorar; por isso aceito, gravo o conteúdo cru e processo em seguida. Se eu tentasse fazer todo o trabalho antes de responder, a plataforma acharia que falhou e mandaria de novo, gerando duplicidade.

O fluxo é: recebo, gravo exatamente o que veio, respondo que recebi e só então processo. Se o processamento falhar, o aviso está guardado e posso refazer. Essa ordem protege contra perda de venda e contra duplicação. Guardar o cru também me deixa auditar depois o que de fato chegou.

**Exemplo:** Paula faz o servidor responder imediatamente e deixar a liberação do acesso para um passo seguinte, a partir do registro salvo.

**Cuidado:** não responda erro por problema interno de processamento. Isso dispara reenvios desnecessários.

Ligado a [[status-pedido-canonico]] · [[unidade-valor-confere-primeira-venda]] · [[primeira-venda-real-prova-formato-payload]]
