---
name: fbc-so-existe-depois-pixel-carrega
titulo: "O fbc só existe depois que o pixel carrega"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de site
area: [Site, Pixel e API de conversões]
pacote: site
---

O fbc só existe depois que o pixel carrega. A fonte no primeiro milissegundo é o fbclid da URL; deposito na hora e de novo três segundos depois. Se espero o pixel, a pessoa já pode ter clicado e saído, e perco o identificador do clique.

Por isso leio o parâmetro da URL assim que a página abre e crio o cookie na hora. Depois de alguns segundos, quando o pixel já carregou, confirmo e atualizo se necessário. Assim, mesmo quem sai rápido deixa o identificador guardado, e a compra feita mais tarde pode ser ligada ao anúncio de origem.

**Exemplo:** Juliana grava o identificador do clique logo que a página abre, em vez de esperar a biblioteca carregar.

**Cuidado:** cookie criado sem o formato correto é ignorado. Siga o padrão da plataforma.

Ligado a [[bilhete-curto-checkout-levar-fbc]] · [[fbc-fbp-ip-navegador-vao-crus-mail-telefone-nome-vao]] · [[link-checkout-preserva-parametros-pagina]]
