---
name: pixel-nao-dispara-navegador-automatizado
titulo: "Pixel não dispara em navegador automatizado"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de site
area: [Site, Pixel e API de conversões]
pacote: site
---

O pixel não dispara em navegador automatizado. Carrega, inicializa e não manda nada; testo com a flag de automação desligada e com agente de celular real antes de concluir que está quebrado. Muitas ferramentas de teste são reconhecidas como robôs, e o pixel se cala de propósito.

Quando o evento não aparece no teste automático, não concluo ainda que o código está errado. Abro a página num aparelho real e vejo se o evento sai. Se sai, o problema está no teste. Esse cuidado me poupou de refazer algo que já funcionava e de perder tempo investigando o lugar errado.

**Exemplo:** Marcos testa com uma ferramenta automática e nada aparece. Abre no celular e o evento chega normalmente.

**Cuidado:** teste em ambiente que a plataforma reconhece como robô dá resultado falso.

Ligado a [[politica-seguranca-conteudo-bloqueia-pixel-silencio]] · [[conferir-inicializacao-html-publicado]] · [[evento-teste-codigo-teste]]
