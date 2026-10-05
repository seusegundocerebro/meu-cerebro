---
name: erro-permanente-sai-rodizio-reenvio
titulo: "Erro permanente sai do rodízio de reenvio"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de site
area: [Site, Pixel e API de conversões]
pacote: site
---

Erro permanente sai do rodízio de reenvio. Uma recusa definitiva virou muitas linhas de erro num dia; marco como permanente e paro. Se o sistema reenvia sempre que falha, um erro que nunca vai se resolver gera uma pilha de tentativas e ruído.

Distingo falha temporária, como queda de rede, de falha definitiva, como campo inválido. A temporária volta a tentar com intervalo. A definitiva é registrada, marcada e removida da fila. Assim o sistema não fica preso tentando o impossível, e eu vejo os erros reais, em vez de me perder numa lista infinita.

**Exemplo:** Renata marca como permanente o erro de moeda ausente e o item sai da fila, em vez de ser reenviado a cada hora.

**Cuidado:** não classifique tudo como permanente. Falha de rede deve ser tentada de novo.

Ligado a [[evento-valor-exige-moeda]] · [[janela-sete-dias-evento-atrasado]] · [[webhook-responde-200-hora-trabalha-depois]]
