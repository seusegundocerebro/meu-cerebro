---
name: chave-dedup-id-nome
titulo: "Chave de dedup é o id, nunca o nome"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de vendas
area: [Vendas, Pipeline]
pacote: vendas
---

A chave de deduplicação é o identificador, nunca o nome. O nome muda dentro do sistema, com abreviação, acento ou erro de digitação, e já levou a pagar prêmio em dobro. Eu uso sempre o ID da pasta ou do registro pra saber se algo já foi contado. Nome serve pra leitura, não pra controle. Essa regra simples evita pagamento duplicado e relatório inflado.

Eu escolho o identificador único de cada registro como chave de controle e nunca uso o nome. Antes de pagar qualquer prêmio, confiro se o código já foi contado. A checagem leva segundos e evita prejuízo.

**Exemplo:** O mesmo cliente aparece com e sem o "da" no sobrenome em dois registros. Se a chave fosse o nome, o sistema contaria duas vendas. Com o identificador, reconhece que é uma só.

**Cuidado:** Não use telefone ou nome como chave principal quando existe um código único. Ambos mudam. Confie no código e confira o resto pra detectar erros.

Ligado a [[deduplicacao-telefone-cola-ficha-morta]] · [[venda-conta-pelo-mes-competencia]] · [[telefone-pessoa-vem-cadastro]] · [[funil-de-vendas]]
