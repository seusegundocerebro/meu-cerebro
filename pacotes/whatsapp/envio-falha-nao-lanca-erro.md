---
name: envio-falha-nao-lanca-erro
titulo: "Envio que falha não lança erro"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de WhatsApp
area: [WhatsApp, Janela de 24h e API oficial]
pacote: whatsapp
---

A função de envio que eu uso não lança erro quando a mensagem falha. Ela registra, grava a bolha com status de erro e segue a vida. Quem diz a verdade é o retorno dela.

Código escrito como "mandei, não deu exceção, então marca avisado" mente. O certo é ler o que a função devolve, a lista do que saiu de fato, e só carimbar o que está nela. E tem mais um degrau: a plataforma aceita a mensagem na hora e pode recusar minutos depois, pelo recibo de status que chega no webhook. Então são três momentos distintos: aceita, entregue e lida. Cada um grava uma coluna.

**Exemplo:** o robô de Juliana marcou "cliente avisado" em 40 conversas numa semana. Trinta avisos tinham falhado por janela fechada. O gerente passou a semana cobrando o vendedor por cliente que nunca recebeu nada, e o vendedor jurando que o cliente não tinha escrito. Os dois estavam certos.

**Cuidado:** tratar "aceito pela plataforma" como "entregue". A recusa tardia é comum em mídia e em template fora do limite, e sem ler o recibo você nunca vai saber.

Ligado a [[despedida-passagem-fora-janela-chega]] · [[falha-gravar-nao-pode-negar-ok]] · [[erro-upload-midia-intermitente-lado-plataforma]] · [[registrar-cada-toque-nao-existe-cadencia]]
