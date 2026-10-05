---
name: politica-seguranca-conteudo-bloqueia-pixel-silencio
titulo: "Política de segurança de conteúdo bloqueia pixel em silêncio"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de site
area: [Site, Pixel e API de conversões]
pacote: site
---

A política de segurança de conteúdo bloqueia o pixel em silêncio. A tag fica no HTML, parece instalada, e nunca roda. Se a página restringe de onde os scripts podem vir, o domínio do pixel precisa estar na lista, senão o navegador recusa sem mensagem visível na página.

Quando o pixel não responde, abro o console do navegador e procuro mensagens de bloqueio. Se aparecer, libero o domínio necessário e confiro de novo. Esse tipo de erro engana porque o código está lá. O que falta é a permissão para executá-lo, e só o console conta essa história.

**Exemplo:** Paula vê no console uma mensagem dizendo que o script foi bloqueado, adiciona o domínio à lista de permitidos e o pixel volta a funcionar.

**Cuidado:** não afrouxe a política inteira só para resolver. Libere só o que é necessário.

Ligado a [[pixel-nao-dispara-navegador-automatizado]] · [[conferir-inicializacao-html-publicado]] · [[pixel-carrega-depois-load-pagina-leve]]
