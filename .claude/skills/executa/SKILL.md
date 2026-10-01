---
name: executa
description: Transforma uma ideia do cérebro em plano e executa junto com a pessoa; no fim registra "## Feito" na nota e marca status feito (vira verde no mapa). Use quando a pessoa rodar /executa <nota>, disser "executa a ideia X" ou "vamos tirar X do papel".
argument-hint: <nome-da-nota>
---

# /executa — tirar a ideia do papel

Nota: `$ARGUMENTS` (se vier vazio ou não achar o arquivo, procure pelo título com Grep e confirme com a pessoa qual é).

1. Leia `notas/<nome>.md` e as notas ligadas a ela (`[[...]]`) — o contexto está nas vizinhas.
2. Se a nota ainda não tem `## Plano`, escreva e **grave na nota**:
   ```markdown
   ## Plano (<hoje>)
   **Objetivo:** 1 linha.
   **Passos:** lista numerada, até 7, cada um concreto.
   **Precisa de você:** decisões, acessos ou dinheiro que só a pessoa libera (ou "nada").
   **Tamanho:** pequeno (menos de 1 h) / médio / grande.
   ```
   Mostre o plano e pergunte: "Começo?"
3. Com o "sim", execute os passos que dá pra fazer daqui (escrever texto, montar planilha, criar arquivo, pesquisar, rascunhar mensagem).
   Passo que depende da pessoa: pare, explique em 1 linha o que ela precisa fazer, e siga quando ela voltar.
   Crie os arquivos do trabalho **fora** de `notas/` (ex.: pasta `trabalhos/<nome>/`), pra não misturar com o cérebro.
4. Ao terminar (ou quando a pessoa disser que acabou):
   - Acrescente no fim da nota: `## Feito (<hoje>)` + 2 a 4 linhas do resultado + onde estão os arquivos.
   - No topo, ponha `status: feito`. **Não apague** planos ou "Feito" anteriores.
   - Se surgiu aprendizado no caminho, guarde como nota `aprendizado` ligada a esta.
5. Responda: "✅ Feito. A ideia ficou verde no mapa."
