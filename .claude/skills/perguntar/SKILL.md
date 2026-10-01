---
name: perguntar
description: Responde uma pergunta usando SÓ o que está no cérebro, citando as notas usadas e dizendo quando o cérebro não sabe. Use quando a pessoa rodar /perguntar ou perguntar "o que eu já pensei sobre…", "o que eu decidi sobre…", "o que eu sei de…".
argument-hint: <pergunta>
---

# /perguntar — perguntar ao cérebro

Pergunta: `$ARGUMENTS`

1. Tire 3 a 6 palavras-chave da pergunta (com e sem acento, singular e plural, sinônimos óbvios).
2. `Grep` (sem diferenciar maiúscula) em `notas/` por elas. Leia as notas que aparecerem mais, até umas 12.
3. Siga os `[[links]]` das 2 ou 3 notas mais importantes: às vezes a resposta está na vizinha.
4. Responda em até 8 linhas, com as palavras da pessoa, citando `[[nota]]` em cada afirmação.
   - Se as notas discordam entre si, mostre as duas e ofereça `/conflitos`.
   - Se o cérebro não tem a resposta, diga "Seu cérebro ainda não tem nada sobre isso" — **não invente** com conhecimento geral
     (pode oferecer uma opinião separada, deixando claro que é sua e não do cérebro).
5. No fim, se a resposta juntou coisas de um jeito novo, ofereça: "Quer que eu guarde essa resposta como nota?"
