---
name: travar-texto-antes-gerar-voz
titulo: "Travar o texto antes de gerar a voz"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de site
area: [Site, VSL por blocos]
pacote: site
---

Travar o texto antes de gerar a voz. A fala aprovada ganha uma impressão digital, e o processo recusa gerar o áudio se o texto mudou depois. Isso evita o erro clássico de aprovar uma versão e gravar outra, e de descobrir só no vídeo pronto que um trecho foi alterado.

Eu salvo o texto final, calculo uma assinatura dele e a guardo. Antes de gerar o áudio, o processo compara a assinatura. Se bater, segue. Se não, para e avisa. É um cuidado pequeno, que economiza horas de retrabalho e garante que o que foi revisado é exatamente o que será falado.

**Exemplo:** Diego aprova o roteiro, o sistema guarda a assinatura. Dias depois, alguém muda uma frase; a geração de áudio é recusada até nova aprovação.

**Cuidado:** travar sem permitir nova aprovação vira burocracia. Deixe um caminho simples de reaprovar.

Ligado a [[auditoria-promessa-antes-voz]] · [[preco-falado-vira-evento-segundo-exato]] · [[vsl-escreve-blocos-nomeados]]
