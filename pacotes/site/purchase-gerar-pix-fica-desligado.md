---
name: purchase-gerar-pix-fica-desligado
titulo: "Purchase ao gerar Pix fica desligado"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de site
area: [Site, Checkout e entrega]
pacote: site
---

O evento de compra ao gerar o Pix fica desligado. Pix gerado não é Pix pago; o evento de compra só dispara na aprovação. Se o evento sai na geração, o sistema de anúncios aprende que muita gente comprou, quando muita gente só gerou o código e não pagou.

Eu configuro para que o evento de compra só saia quando o pagamento é confirmado, via aviso do checkout para o servidor. Assim os dados refletem dinheiro real. Otimizar anúncio com compra inflada leva o sistema a buscar quem gera Pix e não paga, o que piora a campanha sem ninguém perceber.

**Exemplo:** Diego desliga o evento na geração do Pix e o liga só quando o pagamento é aprovado.

**Cuidado:** não otimize a campanha por um evento que não representa dinheiro recebido.

Ligado a [[webhook-responde-200-hora-trabalha-depois]] · [[quatro-eventos-padrao-pagina]] · [[pedido-prefixo-teste-nao-vira-compra-pixel]]
