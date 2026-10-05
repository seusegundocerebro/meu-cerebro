---
name: template-entregue-nao-reabre-janela-24h
titulo: "Template entregue não reabre a janela de 24h"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de WhatsApp
area: [WhatsApp, Janela de 24h e API oficial]
pacote: whatsapp
---

Na API oficial, texto livre só vale por 24 horas contadas da última mensagem do cliente. Template entregue não reabre nada. Só a resposta dele reabre.

Template é convite, não licença. A plataforma marca "entregue" e muita gente lê isso como "conversa aberta". Não é. Se o cliente viu e não respondeu, a janela continua fechada, e qualquer texto livre que você mandar depois volta recusado com erro de reengajamento.

A âncora é sempre a última mensagem que chegou do cliente. Nunca a que saiu. Se o seu sistema guarda a hora em que o webhook chegou, deixe uma folga de uma hora antes de considerar a janela aberta, porque a hora da plataforma e a sua não batem.

**Exemplo:** Renata recebeu um template de retomada às 9h30, viu e não respondeu. Às 10h o vendedor mandou "oi Renata, posso te ligar?" em texto livre. A mensagem morreu no servidor. Se ela tivesse respondido um "oi", aí sim seriam 24 horas de conversa gratuita.

**Cuidado:** contar a janela a partir do envio do template. É o erro mais comum e o mais caro.

Ligado a [[tratar-vencimento-prazo-janela-aberta-matou-mensagens]] · [[usar-janela-gratis-inteira-antes-pagar-template]] · [[ultima-chamada-antes-janela-fechar-vez-vida]] · [[regua-paga-tres-toques-pergunta-sincera-foto-escassez]]
