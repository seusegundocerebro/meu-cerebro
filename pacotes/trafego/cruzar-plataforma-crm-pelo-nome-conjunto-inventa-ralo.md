---
name: cruzar-plataforma-crm-pelo-nome-conjunto-inventa-ralo
titulo: "Cruzar plataforma com CRM pelo nome do conjunto inventa ralo"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de tráfego
area: [Tráfego, Diagnóstico]
pacote: trafego
---

Cruzar plataforma com CRM pelo nome do conjunto inventa ralo. A plataforma reporta o nome atual pra gasto antigo, então se o conjunto foi renomeado, o cruzamento junta coisas diferentes e cria buracos que não existem.
Eu junto pelo id do anúncio, que não muda. Com o id, o gasto de ontem e a venda de hoje continuam ligados, mesmo que o nome tenha mudado no meio do caminho.
Eu guardo uma tabela simples de equivalência entre id do anúncio e o nome de cada época. Se um nome muda, a tabela continua apontando pro mesmo objeto, e a conta fecha.

**Exemplo:** A Paula cruzou gasto e vendas pelo nome do conjunto e viu um conjunto aparentemente sem venda. Ao usar o id do anúncio, a venda apareceu: o nome tinha mudado.

**Cuidado:** Usar nome como chave. Nome muda, id não. Qualquer cruzamento sério usa o identificador, nunca o texto.

Ligado a [[unidade-estavel-anuncio]] · [[relatorio-plataforma-infla-formulario-subconta-whatsapp]] · [[casamento-lead-formulario-exige-tres-condicoes]] · [[mudanca-feita-fora-seu-sistema-so-aparece-historico]]
