---
name: garimpar-corpo-webhook-atras-bilhete
titulo: "Garimpar o corpo do webhook atrás do bilhete"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de site
area: [Site, Pixel e API de conversões]
pacote: site
---

Garimpar o corpo do webhook atrás do bilhete. A plataforma aceita o parâmetro mas não documenta onde o devolve; procuro em todos os níveis, sem diferenciar maiúscula. Cada checkout organiza o aviso de um jeito, e o campo de rastreio pode aparecer em lugares inesperados.

Escrevo uma busca que percorre o conteúdo inteiro do aviso e procura o código, ignorando maiúsculas e minúsculas. Guardo o aviso cru para poder reprocessar se o formato mudar. Com isso não dependo da documentação, que pode estar incompleta, e consigo ligar a venda ao clique mesmo quando o campo muda de lugar.

**Exemplo:** Diego percorre o aviso de venda e acha o código dentro de um campo aninhado que a documentação não citava.

**Cuidado:** não presuma um caminho fixo. O formato pode variar entre vendas ou versões.

Ligado a [[bilhete-curto-checkout-levar-fbc]] · [[primeira-venda-real-prova-formato-payload]] · [[webhook-responde-200-hora-trabalha-depois]]
