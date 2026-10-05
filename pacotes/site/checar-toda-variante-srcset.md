---
name: checar-toda-variante-srcset
titulo: "Checar toda variante do srcset"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de site
area: [Site, Celular, velocidade, design e teste]
pacote: site
---

Checar toda variante do srcset. O src respondia normalmente e a variante que o celular escolhia não existia: buraco branco no carrossel. O navegador escolhe entre vários tamanhos de imagem, e se um deles está ausente, aparece um espaço vazio.

Quando uso imagens responsivas, listo cada tamanho declarado e abro um por um. Confiro que todos respondem e carregam. É fácil esquecer um, porque no computador funciona e só o celular escolhe aquele arquivo. Um teste em um aparelho real, rolando o carrossel, pega o erro, e a checagem completa o evita de vez.

**Exemplo:** Marcos abre cada endereço de imagem listado no srcset e descobre que a versão menor estava faltando.

**Cuidado:** conferir só a imagem principal deixa as variantes sem teste.

Ligado a [[imagem-comprimida-webp]] · [[testar-390-844-proprios-olhos]] · [[olhar-pagina-olho-gente]]
