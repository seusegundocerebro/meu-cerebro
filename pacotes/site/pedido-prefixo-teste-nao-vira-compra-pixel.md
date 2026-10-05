---
name: pedido-prefixo-teste-nao-vira-compra-pixel
titulo: "Pedido com prefixo de teste não vira compra no pixel"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de site
area: [Site, Checkout e entrega]
pacote: site
---

Pedido com prefixo de teste não vira compra no pixel. A trava entra depois de montar o evento, para o teste imprimir o que sairia; sem ela, saem compras falsas. Assim consigo testar o fluxo inteiro sem poluir os dados dos anúncios.

Todo pedido de teste leva um prefixo no identificador. O código monta o evento normalmente, mostra o que enviaria e, no último passo, só envia se o prefixo não for de teste. Dessa forma vejo o resultado do teste e garanto que nada falso chega ao sistema de anúncios. Compra falsa ensina a campanha a buscar o público errado.

**Exemplo:** Paula faz um pedido com identificador de teste. O sistema registra o que enviaria, mas não envia nada à plataforma de anúncios.

**Cuidado:** nunca deixe a trava para antes do evento. Ela precisa ficar no final.

Ligado a [[purchase-gerar-pix-fica-desligado]] · [[primeira-venda-real-prova-formato-payload]] · [[evento-teste-codigo-teste]]
