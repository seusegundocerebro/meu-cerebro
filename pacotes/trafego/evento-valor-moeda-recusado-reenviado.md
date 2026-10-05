---
name: evento-valor-moeda-recusado-reenviado
titulo: "Evento de valor sem moeda é recusado e reenviado pra sempre"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de tráfego
area: [Tráfego, Pixel e atribuição]
pacote: trafego
---

Evento de valor sem moeda é recusado e reenviado pra sempre. Se eu mando uma compra com o valor e esqueço a moeda, a plataforma devolve erro. Quando o sistema trata esse erro como "tente de novo", o evento volta em laço, e o log enche de centenas de linhas iguais.
O certo é separar erro que passa com o tempo, como falha de rede, de erro que nunca passa, como campo faltando. O segundo não deve ser reenviado: deve ser registrado uma vez e corrigido na origem.

**Exemplo:** O Diego mandava o valor das compras sem a moeda. A plataforma recusava, o sistema reenviava, e em poucas horas o log estava cheio. Ao incluir a moeda no envio, o laço parou.

**Cuidado:** Reenviar sem limite. Todo laço de tentativa precisa de teto e de uma lista de erros que não merecem nova tentativa. Senão o log vira ruído.

Ligado a [[pixel-id-chave-nao-so-id]] · [[evento-chamado-lead-vindo-crm-entra-mesma-linha-formulario]] · [[anuncio-clonado-carrega-identidade-origem]] · [[relatorio-diario-pixel]]
