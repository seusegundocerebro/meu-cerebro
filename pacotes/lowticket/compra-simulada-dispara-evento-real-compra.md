---
name: compra-simulada-dispara-evento-real-compra
titulo: "Compra simulada dispara evento real de compra"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de low ticket
area: [Low ticket, Pós-venda]
pacote: lowticket
---

Compra simulada dispara evento real de compra. Eu blindo o webhook com um prefixo de teste antes de simular qualquer pedido. Se não faço isso, o teste chega como venda de verdade nas ferramentas de anúncio e nos relatórios. O pedido de teste leva um marcador claro, e o sistema o ignora nos eventos externos. Só depois da blindagem eu faço compras simuladas para conferir o fluxo. É um cuidado simples que evita poluir os números e confundir o algoritmo de anúncio.

**Exemplo:** O Marcos fez uma compra de teste e o evento foi enviado como compra real ao gerenciador de anúncios. Os números ficaram bagunçados. Passou a marcar os testes e a bloqueá-los.

**Cuidado:** Faça a blindagem antes do primeiro teste. Evento enviado não se apaga com facilidade.

Ligado a [[evento-falso-compra-ensina-algoritmo-procurar-nao-existe]] · [[tres-estados-cliente-nao-dois]] · [[link-acesso-vazio-prende-comprador-plataforma]]
