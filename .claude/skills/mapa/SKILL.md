---
name: mapa
description: Abre o mapa 3D do cérebro no navegador (sobe o servidor local que lê a pasta notas/). Use quando a pessoa rodar /mapa ou pedir "abre o mapa", "quero ver o cérebro".
---

# /mapa — abrir o mapa

O mapa roda no computador da pessoa, com Node 18+, sem pacotes adicionais.

1. Confira `node --version`. Se não existir ou for anterior ao 18, oriente instalar a versão LTS de https://nodejs.org.
2. A partir da raiz do cérebro, rode `node mapa/servidor.js`. Mantenha esse terminal aberto ou use o gerenciamento de processos da ferramenta disponível, anotando o processo criado. Se já houver um mapa na porta, confira se é desta pasta antes de reutilizá-lo. Nunca encerre todos os processos Node.
3. Abra http://localhost:4747 no navegador: `open` no macOS, `Start-Process` no PowerShell, `start` no Git Bash ou `xdg-open` no Linux com tela. Se não der, mostre o link.
4. Explique brevemente: notas são neurônios; links são sinapses; fios latentes sugerem semelhanças. Notas novas aparecem piscando.

Apresente os controles conforme a necessidade:
- Tópicos à esquerda: frentes somam; frente com área cruza. TUDO limpa, RECOLHER abre espaço. No celular começam recolhidos. ORGANIZAR TÓPICOS preenche campos ausentes em lotes de até 60 notas com o Claude.
- + IDEIA guarda texto ou ditado e liga às notas parecidas.
- A pergunta responde no próprio mapa, citando e acendendo as notas. As quatro sugestões ajudam a começar. Microfone só aparece se o navegador suportar reconhecimento em pt-BR.
- FAÍSCAS mostra pendentes: aprovar vira ideia, descartar guarda na lixeira, NOVA FAÍSCA pede cruzamentos novos ao Claude, sem agendamento.
- Abra uma ideia para PEDIR PLANO, VER PLANO e MARCAR FEITA. O plano fica na nota; a execução continua com `/executa` no terminal.
- A busca, leitura, edição e histórico continuam disponíveis. Se outra ferramenta alterar uma nota enquanto estiver editando, o mapa recusa sobrescrever: releia e reaplique sua mudança.

A IA usa `claude` do computador da pessoa, autenticado. Um pedido por vez; timeout de dois minutos por etapa. Sem ele no PATH, o mapa oferece copiar o comando. Após instalar, reinicie o servidor a partir de um terminal que encontre `claude`. Não instale chaves nem use permissões automáticas para contornar erros de login.

Outras opções:
- Porta diferente no Mac/Linux/Git Bash: `PORT=4848 node mapa/servidor.js`. No PowerShell: `$env:PORT=4848` e depois `node mapa/servidor.js`.
- Cofre externo: defina `CEREBRO_NOTAS` com o caminho antes de iniciar. No PowerShell: `$env:CEREBRO_NOTAS="C:\Notas"`; no Mac/Linux: `CEREBRO_NOTAS=/caminho/do/cofre node mapa/servidor.js`. O mapa edita esse cofre; IA recebe trechos dele quando solicitada.
- Gravação lenta: `http://localhost:4747/?lento=3`; modo leve: `?leve`.
- Em servidor remoto, use túnel privado: `ssh -L 4747:localhost:4747 usuario@servidor`. Não libere o servidor para acesso público.
- Para parar, Ctrl+C no terminal que iniciou o mapa, ou encerre somente o processo que você anotou. Não deixe processos de teste rodando.
