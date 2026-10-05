---
name: identificador-clique-venda-webhook-nao-liga-anuncio
titulo: "Sem o identificador do clique, a venda por webhook não liga ao anúncio"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de tráfego
area: [Tráfego, Pixel e atribuição]
pacote: trafego
---

Sem o identificador do clique, a venda por webhook não liga ao anúncio. O hash de e-mail não basta: ele ajuda a reconhecer a pessoa, mas não diz de qual clique ela veio. Fechar esse laço é trabalho de verdade, não uma linha de configuração.
Quando o checkout avisa a venda por webhook, o sistema precisa ter guardado, lá atrás, o identificador do clique que trouxe a pessoa. Aí o evento enviado de volta carrega esse dado, e a plataforma atribui a venda ao anúncio certo.

**Exemplo:** O Marcos enviava a compra só com e-mail com hash. A plataforma casava poucas vendas. Quando passou a guardar o identificador do clique na entrada da página e devolvê-lo na compra, a atribuição melhorou bastante.

**Cuidado:** Achar que e-mail resolve tudo. Ele reconhece a pessoa, mas o clique é quem aponta o anúncio. Sem o identificador, a venda aparece como se não tivesse origem.

Ligado a [[pixel-id-chave-nao-so-id]] · [[leve-identificador-clique-ate-checkout-num-bilhete-curto]] · [[evento-chamado-lead-vindo-crm-entra-mesma-linha-formulario]] · [[identificador-google-lead-parece-organico]]
