---
name: pendente-verdade-pedido-pago-depois
titulo: "Pendente de verdade é pedido sem 'pago' depois"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de low ticket
area: [Low ticket, Pós-venda]
pacote: lowticket
---

Pendente de verdade é pedido sem pago depois. Somar todo aguardando conta o pago de novo e infla o número várias vezes. Um pedido pode aparecer como aguardando e depois como pago; se eu somo os dois, conto a mesma venda duas vezes. Eu defino pendente como pedido que nunca chegou a pago, e confiro por identificador, não por contagem de linhas. Essa regra simples evita relatórios otimistas e decisões baseadas em venda que não existe.

**Exemplo:** O Diego somou todos os pedidos aguardando e viu uma pendência enorme. Era o mesmo pedido que depois foi pago. Passou a contar só os que nunca viraram pagos.

**Cuidado:** Cruze sempre os registros pelo mesmo pedido. Contar linhas é a forma mais fácil de se enganar.

Ligado a [[contar-venda-pedido-principal-nao-pedido]] · [[tres-estados-cliente-nao-dois]] · [[pix-abandonado-decisao-instante-nao-esquecimento]]
