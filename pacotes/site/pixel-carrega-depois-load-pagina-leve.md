---
name: pixel-carrega-depois-load-pagina-leve
titulo: "Pixel carrega depois do load em página leve"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de site
area: [Site, Pixel e API de conversões]
pacote: site
---

O pixel carrega depois do load em página leve. Para público de internet de pacote, o pixel entra depois do conteúdo, nunca antes. Quem navega com sinal fraco precisa ver a página primeiro; o rastreio pode esperar alguns instantes.

Uso o evento de carregamento completo da página para iniciar o pixel. O conteúdo aparece rápido, o visitante já pode ler e só então os scripts de medição entram. Há uma pequena perda possível de quem sai antes, mas é muito menor que o ganho de uma página que abre rápido e retém mais gente.

**Exemplo:** Juliana move o carregamento do pixel para depois do conteúdo, e a página passa a abrir bem mais rápido no celular.

**Cuidado:** carregar tarde demais pode perder o evento de quem sai logo. Equilibre.

Ligado a [[pixel-script-terceiro-entram-depois-conteudo]] · [[rede-lenta-processador-fraco-teste]] · [[politica-seguranca-conteudo-bloqueia-pixel-silencio]]
