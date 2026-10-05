---
name: chave-deduplicacao-id-pedido
titulo: "Chave de deduplicação é o id do pedido"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de site
area: [Site, Checkout e entrega]
pacote: site
---

A chave de deduplicação é o id do pedido, nunca o nome do cliente. Nome muda, id não. Dois clientes podem ter o mesmo nome, e um mesmo cliente pode escrever o nome de formas diferentes; o identificador do pedido é único e estável.

Quando o aviso do checkout chega duas vezes, comparo o identificador. Se já existe, ignoro o segundo. Quando conto vendas, uso o mesmo identificador. Isso evita contar uma venda duas vezes e evita juntar vendas diferentes só porque os nomes se parecem. É uma regra simples que protege qualquer relatório de dinheiro.

**Exemplo:** Diego recebe duas vezes o aviso de um pedido. Pelo identificador, vê que é o mesmo e registra apenas uma venda.

**Cuidado:** nome e e-mail podem repetir em compras diferentes. Só o identificador do pedido é seguro.

Ligado a [[status-pedido-canonico]] · [[acesso-libera-identificador-pedido-nome]] · [[pixel-navegador-capi-servidor-mesmo-event-id]]
