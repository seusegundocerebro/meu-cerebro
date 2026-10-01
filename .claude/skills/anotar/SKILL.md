---
name: anotar
description: Guarda uma ideia, decisão ou aprendizado no cérebro — aceita texto curto, texto longo colado ou ditado bagunçado; organiza, divide em notas se precisar e liga com as notas parecidas. Use quando a pessoa rodar /anotar ou pedir "guarda isso", "anota aí", "salva no cérebro".
argument-hint: <o que guardar — pode ser texto longo ou ditado>
---

# /anotar — guardar no cérebro

Entrada: `$ARGUMENTS` (se vier vazio, pergunte "O que você quer guardar? Pode colar ou ditar do jeito que vier.").

1. **Entenda** o que veio. Ditado vem bagunçado, com "é… tipo… sabe": limpe o vício, mantenha o sentido e as palavras dela.
2. **Divida** se tiver mais de um assunto: cada ideia/decisão/aprendizado vira uma nota própria.
3. Para cada nota:
   - Escolha a espécie: `ideia`, `decisao`, `aprendizado`, `projeto`, `pessoa` ou `nota`.
   - Procure notas parecidas: `Grep` em `notas/` por 2 a 4 palavras-chave (sem acento também) e leia os títulos que aparecerem.
   - Se já existe nota do **mesmo** assunto, **acrescente** nela (um parágrafo novo com a data) em vez de criar outra.
   - Senão, crie `notas/<nome>.md` no formato do `CLAUDE.md`, com `criado:` de hoje (`date +%F`).
   - No fim do texto: `Ligado a [[...]] · [[...]]` com as 1 a 3 mais parecidas. Se nada parecer, ligue ao projeto mais próximo ou a `[[eu]]`.
   - Se ela contou uma frase marcante, guarde entre aspas com `> "frase"`.
4. Responda curto:
   `🧠 Guardei: [[nome]] (ligada a [[a]], [[b]])` — uma linha por nota.
   Se o mapa estiver aberto, diga "já está piscando no mapa".
5. Se a ideia contradiz uma nota antiga, avise numa linha e ofereça rodar `/conflitos`.
