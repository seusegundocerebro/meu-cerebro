---
name: faisca
description: Gera "faíscas" — ideias novas que nascem de juntar duas ou três notas que ainda não estão ligadas. Salva como notas da espécie faisca, que ficam pulsando no mapa até a pessoa aceitar ou descartar. Use quando a pessoa rodar /faisca, pedir "me dá uma ideia", "o que eu não estou vendo", ou disser "gostei da faísca X" / "descarta a faísca X".
argument-hint: "[assunto opcional pra focar]"
---

# /faisca — ideia nova a partir do que ela já pensou

## Aceitar ou descartar (se a pessoa pediu isso)
- "gostei da faísca X" → na nota `notas/X.md` ponha `status: aceita` no topo e troque `especie: faisca` por `especie: ideia`. Responda "Virou ideia: [[X]]. Quer que eu faça um plano? (`/executa X`)".
- "descarta a faísca X" → apague `notas/X.md` e responda "Descartada."

## Gerar faíscas
1. Liste as notas (`notas/*.md`, lendo `titulo` e `especie`). Se vier assunto em `$ARGUMENTS`, prefira notas desse assunto.
2. Escolha **pares ou trios de notas que NÃO se ligam** entre si (nenhuma cita a outra com `[[...]]`), de frentes diferentes
   — uma ideia com um aprendizado, um projeto com uma pessoa, uma decisão antiga com uma ideia nova.
   Leia essas notas inteiras.
3. Pense como um sócio esperto: o que nasce se juntar as duas? Um produto, um atalho, um risco que ninguém viu, uma pergunta que falta fazer.
   Descarte o óbvio e o genérico ("use IA", "faça marketing"). Precisa ser específico da vida dela.
4. Crie **até 3** faíscas, cada uma em `notas/faisca-<nome>.md`:
   ```markdown
   ---
   name: faisca-<nome>
   titulo: <a ideia em uma frase>
   especie: faisca
   status: pendente
   criado: <hoje>
   ---

   <2 a 4 linhas: o que é, e por que juntar essas notas dá nisso.>

   **Primeiro passo:** <uma ação concreta de até 1 hora>

   Nasceu de [[nota-a]] + [[nota-b]]
   ```
5. Responda com as faíscas numeradas (título + 1 linha cada) e diga:
   "Elas estão pulsando no mapa. Diga `gostei da faísca <nome>` ou `descarta a faísca <nome>`."
