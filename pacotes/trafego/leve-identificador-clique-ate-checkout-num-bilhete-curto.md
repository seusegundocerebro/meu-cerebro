---
name: leve-identificador-clique-ate-checkout-num-bilhete-curto
titulo: "Leve o identificador do clique até o checkout num bilhete curto"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de tráfego
area: [Tráfego, Pixel e atribuição]
pacote: trafego
---

Leve o identificador do clique até o checkout num bilhete curto. O parâmetro inteiro não cabe no campo que o checkout oferece, que costuma ser pequeno. A solução é guardar o valor completo no seu lado e mandar ao checkout só um código curto que aponta pra ele.
Quando a venda volta pelo webhook, o código curto me devolve o identificador inteiro, e eu o uso pra avisar a plataforma. É como entregar uma ficha de guarda-volumes: a mala fica comigo, a ficha viaja.
Eu testo o fluxo completo com uma venda pequena minha: clico no anúncio, compro e vejo se o código curto devolve o identificador certo. Só depois confio.

**Exemplo:** A Paula tentou passar o identificador completo no campo do checkout e ele foi cortado. Passou a mandar um código de poucos caracteres e a buscar o valor inteiro no próprio banco quando a venda chegava.

**Cuidado:** Truncar o identificador e usar a metade. Um identificador cortado não reconhece nada. Guarde inteiro e use um código pra recuperá-lo.

Ligado a [[identificador-clique-venda-webhook-nao-liga-anuncio]] · [[pixel-id-chave-nao-so-id]] · [[identificador-google-lead-parece-organico]] · [[evento-chamado-lead-vindo-crm-entra-mesma-linha-formulario]]
