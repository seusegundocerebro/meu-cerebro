---
name: parametro-redirecionamento-nao-pode-trocar-destino
titulo: "Parâmetro de redirecionamento não pode trocar o destino"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de site
area: [Site, Checkout e entrega]
pacote: site
---

Parâmetro de redirecionamento não pode trocar o destino. Eu testo que nenhum parâmetro de URL muda o domínio ou o caminho do link de compra. Se um parâmetro pudesse decidir para onde o botão leva, alguém mal-intencionado poderia criar um link que mandasse a pessoa para um endereço falso.

O teste é simples: abro a página com parâmetros estranhos, incluindo endereços completos, e confiro se o botão continua apontando só para o checkout certo. O destino é fixo no código; os parâmetros só são acrescentados no fim, nunca interpretados como endereço. É uma proteção barata que evita um problema grave.

**Exemplo:** Paula abre a página com um parâmetro contendo outro endereço e vê que o botão continua levando ao checkout correto.

**Cuidado:** não aceite endereço vindo da URL como destino. Só o código decide para onde o botão vai.

Ligado a [[link-checkout-preserva-parametros-pagina]] · [[botao-leva-pro-login-vez-checkout]] · [[olhar-pagina-olho-gente]]
