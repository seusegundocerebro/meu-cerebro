---
name: toda-escrita-sistema-devolve-estagio-atual
titulo: "Toda escrita no sistema devolve o estágio atual"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de vendas
area: [Vendas, Pipeline]
pacote: vendas
---

Toda escrita no sistema devolve o estágio atual. Gravar sem informar o estágio reseta o funil, e muitos leads perdem a etapa. Eu aprendi isso do jeito difícil: um envio sem a situação apagou o progresso de uma parte da base. Hoje, toda atualização inclui o estágio que já existe. Parece detalhe técnico, mas decide se o funil continua confiável ou vira bagunça.

Eu escrevo a rotina de atualização pra sempre ler o estágio atual antes de gravar e devolvê-lo junto com a mudança. Testo com um único caso e confiro no sistema. Só depois libero pra todos.

**Exemplo:** Ao anotar uma conversa num lead, a rotina envia o texto junto com o estágio atual, que é visita agendada. O funil permanece intacto e o vendedor continua vendo o lead na etapa certa.

**Cuidado:** Não teste em massa sem validar com um registro antes. Rode primeiro em um caso e confira. Um erro em lote custa horas de correção.

Ligado a [[estagio-terminal-nao-promove-robo]] · [[gravar-antes-confirmar-recebimento]] · [[chave-dedup-id-nome]] · [[funil-de-vendas]]
