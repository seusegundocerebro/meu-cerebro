---
name: conferir-inicializacao-html-publicado
titulo: "Conferir a inicialização no HTML publicado"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de site
area: [Site, Pixel e API de conversões]
pacote: site
---

Conferir a inicialização no HTML publicado. Bato na página com o terminal e procuro o init do pixel; linha vazia na configuração é pixel ausente. Já vi página publicada sem o identificador do pixel por esquecimento de um campo, e ninguém percebeu por semanas.

Depois de cada publicação, pego o HTML real que está no ar e procuro a chamada de inicialização com o identificador correto. Se o campo está vazio, o pixel não existe. É uma verificação de segundos que evita semanas de tráfego sem medição, algo caro e sem volta, porque o dado perdido não se recupera.

**Exemplo:** Diego baixa a página publicada, procura a linha de inicialização e vê que o identificador estava em branco.

**Cuidado:** conferir o arquivo local não basta. Verifique o que está publicado.

Ligado a [[pixel-nao-dispara-navegador-automatizado]] · [[politica-seguranca-conteudo-bloqueia-pixel-silencio]] · [[evento-teste-codigo-teste]]
