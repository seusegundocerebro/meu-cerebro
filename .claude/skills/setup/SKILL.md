---
name: setup
description: Primeira configuração do cérebro — conhece a pessoa com poucas perguntas, preenche "Sobre a pessoa" no CLAUDE.md, cria as primeiras notas ligadas e abre o mapa. Use quando a pessoa rodar /setup ou disser que acabou de instalar o cérebro.
---

# /setup — fazer o cérebro nascer

Objetivo: em uns 5 minutos a pessoa sai com o cérebro dela no ar, com 8 a 15 notas **dela** ligadas, e o mapa aberto.

## Passo a passo

1. Dê boas-vindas em 2 linhas: o que é o cérebro ("eu guardo o que importa pra você e ligo uma ideia na outra")
   e que você vai fazer umas perguntas rápidas.
2. Pergunte **uma de cada vez** (espere a resposta antes da próxima). Aceite respostas curtas, ditadas, bagunçadas:
   1. Como você quer que eu te chame, e com o que você trabalha?
   2. Quais são os 2 ou 3 projetos ou frentes que mais ocupam sua cabeça agora?
   3. Tem alguma ideia que você vive tendo e nunca tira do papel? Pode falar mais de uma.
   4. Quem são as pessoas-chave do seu dia (sócio, cliente, chefe, equipe)? Só nome e papel.
   5. Tem alguma regra ou jeito seu de trabalhar que eu devo sempre lembrar? (ex.: "não marco reunião segunda")
3. Com as respostas:
   - Preencha a seção **"Sobre a pessoa"** no fim do `CLAUDE.md` (nome, trabalho, frentes, pessoas-chave, regras dela),
     em tópicos curtos. Substitua a linha em itálico que está lá.
   - Crie as notas em `notas/` seguindo o formato do `CLAUDE.md`:
     - uma nota `pessoa` sobre ela mesma (`eu.md`),
     - uma nota `projeto` por frente,
     - uma nota `ideia` por ideia que ela contou,
     - uma nota `pessoa` por pessoa-chave (curta),
     - uma nota `decisao` ou `aprendizado` por regra dela.
   - Preencha `frente:` em cada nota usando os projetos/contextos que a pessoa citou, e `area:` com uma ou duas áreas (por exemplo Produto, Vendas, Rotina). Reutilize os mesmos nomes nas notas relacionadas. Use Geral quando não houver contexto; não invente projetos. Registre esses nomes em "Sobre a pessoa" para manter consistência.
   - **Ligue tudo**: cada projeto liga em `[[eu]]`; cada ideia liga no projeto a que pertence; cada pessoa liga no projeto em que aparece.
   - Pode apagar as notas de exemplo `notas/comece-aqui.md` e `notas/como-o-cerebro-funciona.md` **só se ela quiser** — pergunte no fim.
4. Abra o mapa seguindo a skill `/mapa` e diga o link. Apresente os tópicos, + IDEIA, pergunta com resposta na tela, FAÍSCAS e os botões de plano/feita. Os contadores e as sugestões usam as notas que acabou de criar.
5. Feche com 3 dicas curtas:
   - "Fale comigo normalmente aqui: quando aparecer algo importante, eu guardo sozinho."
   - "`/anotar` quando quiser guardar algo na hora (pode colar texto ou ditar)."
   - "`/faisca` quando quiser ideia nova saindo do que você já pensou."

## Cuidados
- Não despeje as 5 perguntas de uma vez.
- Use as palavras da pessoa nas notas; guarde uma frase dela entre aspas quando for marcante.
- Nunca guarde senha, documento ou dado de cartão.
