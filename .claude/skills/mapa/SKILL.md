---
name: mapa
description: Abre o mapa 3D do cérebro no navegador (sobe o servidor local que lê a pasta notas/). Use quando a pessoa rodar /mapa ou pedir "abre o mapa", "quero ver o cérebro".
---

# /mapa — abrir o mapa 3D

O mapa é um servidor pequeno, sem dependência, que roda **só no computador da pessoa** (`mapa/servidor.js`, precisa de Node 18+).

1. Veja se já está no ar: `curl -s -o /dev/null -w "%{http_code}" http://localhost:4747/api/versao`
   - Se responder `200`, pule pro passo 3.
2. Suba em segundo plano, a partir da raiz do cérebro:
   - Confira o Node: `node --version`. Se não existir ou for menor que 18, explique em 2 linhas como instalar
     (https://nodejs.org, versão LTS) e pare.
   - `mkdir -p .cerebro && nohup node mapa/servidor.js > .cerebro/mapa.log 2>&1 &`
   - Espere 1–2 s e confira de novo com o `curl`. Se falhar, mostre as últimas linhas de `.cerebro/mapa.log`.
3. Abra no navegador conforme o sistema (se não der, só mostre o link):
   - macOS: `open http://localhost:4747`
   - Windows (Git Bash): `start http://localhost:4747`
   - Linux com tela: `xdg-open http://localhost:4747`
4. Responda: "Mapa aberto em http://localhost:4747 — cada bolinha é uma nota, cada fio uma ligação. Nota nova aparece sozinha, piscando."

Dicas se a pessoa perguntar:
- Porta ocupada: rodar com outra porta, `PORT=4848 node mapa/servidor.js`.
- Usar com um cofre do Obsidian sem copiar nada: `CEREBRO_NOTAS=/caminho/do/cofre node mapa/servidor.js`.
- Cérebro num servidor remoto (VPS): abrir com túnel, `ssh -L 4747:localhost:4747 usuario@servidor`, e acessar http://localhost:4747 no computador.
- Parar o mapa: `pkill -f mapa/servidor.js` (no Windows, fechar o processo `node`).
