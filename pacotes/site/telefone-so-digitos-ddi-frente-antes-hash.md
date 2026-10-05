---
name: telefone-so-digitos-ddi-frente-antes-hash
titulo: "Telefone só dígitos, com o DDI na frente, antes do hash"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de site
area: [Site, Pixel e API de conversões]
pacote: site
---

O telefone vai só com dígitos, com o DDI na frente, antes do hash. O sinal de mais e a pontuação fazem o hash não bater; uma boa parte da correspondência morre numa linha mal feita. O hash é sensível: qualquer caractere diferente gera outro resultado.

Padronizo o telefone antes: tiro espaços, parênteses e traços, acrescento o código do país e só depois aplico o hash. Faço o mesmo com o e-mail em minúsculas e sem espaços. Esses cuidados de limpeza são a diferença entre um dado que a plataforma reconhece e um que ela ignora.

**Exemplo:** Marcos tira parênteses, espaços e traços do telefone, deixa só dígitos com o código do país e só então aplica o hash.

**Cuidado:** hashear antes de limpar é erro clássico. Limpe, depois proteja.

Ligado a [[fbc-fbp-ip-navegador-vao-crus-mail-telefone-nome-vao]] · [[external-id-ganho-graca]] · [[fbc-so-existe-depois-pixel-carrega]]
