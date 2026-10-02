---
name: conflitos
description: Varre o cérebro atrás de notas que se contradizem ou ficaram velhas, pergunta à pessoa qual vale e marca a perdedora com aviso (sem apagar). Use quando a pessoa rodar /conflitos ou perguntar "tem coisa desatualizada?", "tem nota brigando?".
---

# /conflitos — notas que brigam

1. Leia as notas (`notas/*.md`). Agrupe por assunto (mesmas palavras-chave, mesmos links, mesmo projeto).
2. Dentro de cada grupo, procure:
   - **contradição**: uma diz X, outra diz não-X (preço, prazo, decisão, regra, pessoa responsável);
   - **desatualizada**: a mais nova muda o que a antiga dizia (compare `criado:` e datas no texto).
   Ignore diferença de detalhe que não muda nada.
3. Mostre no máximo 5 conflitos, um por vez ou numerados, assim:
   `1. [[nota-a]] diz "…" × [[nota-b]] diz "…" — acho que vale B (é mais nova). Qual vale: A, B ou as duas?`
4. Pra cada resposta, releia a versão atual, preserve os tópicos `frente`/`area` e faça cópia em `notas/.historico/` antes de alterar:

   - **vale A** (ou B): na perdedora, acrescente no topo (dentro do bloco `---`) `aviso: "Desatualizada: agora vale [[vencedora]]"`, e no fim do texto `Ligado a [[vencedora]]` se ainda não liga.
   - **as duas**: ligue uma na outra e acrescente uma linha explicando por que as duas valem.
   - Nunca apague nota aqui.
5. Se não achar nada: "Nenhuma nota brigando. Seu cérebro está coerente."
