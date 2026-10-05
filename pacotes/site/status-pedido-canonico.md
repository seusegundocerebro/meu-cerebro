---
name: status-pedido-canonico
titulo: "Status do pedido é canônico"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de site
area: [Site, Checkout e entrega]
pacote: site
---

O status do pedido é canônico: "pago", "reembolsado", "estorno". Qualquer sufixo faz a venda sumir do painel que compara igualdade exata. Se um sistema grava "pago" e outro espera "paga", a venda desaparece dos números sem aviso.

Eu defino uma lista curta de status e traduzo o que vem do checkout para essa lista antes de guardar. Todo painel e todo relatório usam a mesma lista. Quando aparece um status novo, trato como exceção e avalio. A consistência de nomes parece detalhe, mas é o que mantém os números confiáveis.

**Exemplo:** Marcos percebe que algumas vendas não aparecem porque o status veio com um complemento no final. Normaliza para "pago".

**Cuidado:** comparar texto livre é fonte de erro. Normalize antes de contar.

Ligado a [[webhook-responde-200-hora-trabalha-depois]] · [[unidade-valor-confere-primeira-venda]] · [[chave-deduplicacao-id-pedido]]
