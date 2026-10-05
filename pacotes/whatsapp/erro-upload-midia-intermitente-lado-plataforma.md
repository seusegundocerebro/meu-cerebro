---
name: erro-upload-midia-intermitente-lado-plataforma
titulo: "Erro de upload de mídia é intermitente do lado da plataforma"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de WhatsApp
area: [WhatsApp, Janela de 24h e API oficial]
pacote: whatsapp
---

Erro de upload de mídia na API oficial é intermitente, do lado da plataforma. Guarde o motivo do erro no banco antes de culpar o arquivo.

Eu vi dezesseis áudios recusados numa semana com erro de upload, e os mesmos arquivos subirem sem erro dias depois. A perícia não achou nada: formato certo, duração, tamanho, encoder, canais. As falhas vinham em rajada na mesma conversa, e o áudio gerado pelo robô, pelo mesmo caminho, nunca falhava. O motivo real vinha num campo do recibo que o app jogava fora. O primeiro conserto foi gravar esse detalhe. Depois: converter o áudio pro formato aceito usando arquivo temporário e conferir o cabeçalho; repetir o upload três vezes com espera curta; e conversão que falha vira linha com status "falhou", nunca some.

**Exemplo:** Paula gravou um áudio pelo painel e viu "não enviado". Juliana culpou o celular dela. O detalhe do erro, depois de gravado, dizia que a plataforma não reconheceu o tipo do arquivo no processamento, num áudio idêntico a outros vinte que tinham passado naquela manhã.

**Cuidado:** retry infinito. Três tentativas, e aí marca "falhou" com o motivo, pra alguém decidir.

Ligado a [[envio-falha-nao-lanca-erro]] · [[audio-gravado-celular-pode-sair-formato-api-rejeita]] · [[falha-gravar-nao-pode-negar-ok]] · [[arquivo-pesado-avisa-antes-chegar]]
