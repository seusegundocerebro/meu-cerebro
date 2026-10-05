---
name: pixel-id-chave-nao-so-id
titulo: "Pixel com ID e chave, não só o ID"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de tráfego
area: [Tráfego, Pixel e atribuição]
pacote: trafego
---

Pixel com ID e chave, não só o ID. Só o pixel no navegador perde muita venda: o bloqueador, o navegador que limita rastreio e a aba fechada antes da página carregar deixam a compra invisível. Por isso eu instalo também a API de conversões no checkout, que fala direto do servidor com a plataforma, usando a chave de acesso do pixel.
Com os dois caminhos ligados, o mesmo evento chega duas vezes, e a plataforma desduplica pelo identificador do evento. Depois eu cuido da nota de correspondência nos dois eventos que importam, o de início de compra e o de compra, mandando e-mail e telefone com hash.

**Exemplo:** A Juliana tinha só o pixel e via menos vendas no painel do que no caixa. Instalou a API de conversões no checkout, mandou o evento de compra pelos dois caminhos com o mesmo identificador, e o painel passou a refletir a realidade.

**Cuidado:** Mandar o mesmo evento pelos dois caminhos sem identificador comum. Sem ele, a plataforma conta tudo em dobro e você acha que o retorno melhorou.

Ligado a [[identificador-clique-venda-webhook-nao-liga-anuncio]] · [[leve-identificador-clique-ate-checkout-num-bilhete-curto]] · [[qualidade-correspondencia-evento-tem-nota]] · [[pixel-produto-evento-teste-antes-ligar]]
