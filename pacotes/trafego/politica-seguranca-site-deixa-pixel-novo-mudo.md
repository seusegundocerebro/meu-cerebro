---
name: politica-seguranca-site-deixa-pixel-novo-mudo
titulo: "Política de segurança do site deixa pixel novo mudo"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de tráfego
area: [Tráfego, Pixel e atribuição]
pacote: trafego
---

Política de segurança do site deixa pixel novo mudo. A lista de scripts permitidos precisa incluir o domínio do pixel antes de qualquer teste. Se não incluir, o navegador bloqueia o script e nenhum evento é enviado.
Quando instalo um pixel e ele não dispara, abro o console do navegador e procuro erros de política de segurança. É a causa mais comum nesses casos, e corrigir é só liberar o domínio.
Peço a quem cuida do site que me envie a política atual, e confiro se o domínio do pixel está lá. Esse pedido, feito antes, evita dias de busca por um erro simples.

**Exemplo:** O Diego instalou um pixel novo e nada aconteceu. No console, havia um erro de bloqueio de script. Liberou o domínio na política e o evento chegou.

**Cuidado:** Reinstalar o pixel várias vezes. Se o erro é de política, reinstalar não resolve. Leia o console antes de refazer.

Ligado a [[pixel-nao-dispara-navegador-automatizado]] · [[pixel-produto-evento-teste-antes-ligar]] · [[pixel-id-chave-nao-so-id]] · [[qualidade-correspondencia-evento-tem-nota]]
