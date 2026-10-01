---
name: importar
description: Traz notas de outra pasta (um cofre do Obsidian, uma pasta de .md ou .txt) pro cérebro, arrumando o topo das notas sem perder os [[links]]. Use quando a pessoa rodar /importar <pasta> ou disser que já tem notas no Obsidian/Notion exportado.
argument-hint: <caminho da pasta>
---

# /importar — trazer notas que já existem

Pasta de origem: `$ARGUMENTS` (se vazio, pergunte o caminho).

1. Conte os arquivos: `.md` e `.txt`, ignorando `.obsidian/`, `.trash/` e anexos (imagens, pdf).
   Diga quantos são e pergunte se pode trazer **cópia** (a pasta original não é tocada).
   - Alternativa que não copia nada: abrir o mapa direto no cofre com `CEREBRO_NOTAS=<pasta> node mapa/servidor.js` — ofereça se forem centenas de notas e a pessoa quiser manter tudo no Obsidian.
2. Copie para `notas/importadas/`, mantendo o nome do arquivo (os `[[links]]` do Obsidian usam o nome, então continuam funcionando no mapa). Arquivo `.txt` vira `.md` na cópia (mesmo nome, só troca a extensão): o mapa só lê `.md`.
3. Para cada nota copiada que não tem topo `---`, acrescente:
   `titulo:` (o nome do arquivo ou o primeiro `# título`), `especie: nota`, `criado:` (data de modificação do arquivo, no formato AAAA-MM-DD; funciona em Mac, Windows e Linux: `node -e "console.log(require('fs').statSync(process.argv[1]).mtime.toLocaleDateString('sv-SE'))" "<arquivo>"`).
   Não mexa no texto.
4. Se forem até ~60 notas, leia os títulos e ajuste `especie` das óbvias (ideia, projeto, pessoa). Mais que isso, deixe `nota`.
5. Responda com o total trazido e sugira abrir o `/mapa`: "suas notas antigas agora têm fios".
