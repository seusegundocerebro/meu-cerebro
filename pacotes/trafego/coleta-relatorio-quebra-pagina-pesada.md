---
name: coleta-relatorio-quebra-pagina-pesada
titulo: "Coleta de relatório que quebra em página pesada"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de tráfego
area: [Tráfego, Política e conta]
pacote: trafego
---

A coleta de relatório quebra em página pesada. Quando o relatório é grande e a plataforma devolve erro, eu repito a mesma página com metade do tamanho, sem abortar o resto da coleta. O erro de uma página não deve derrubar o trabalho de todas as outras.
Em vez de desistir, divido o pedido em partes menores. Se uma parte falha, tento de novo com um recorte ainda menor, e sigo com as demais. No fim, junto tudo num arquivo só. O processo leva um pouco mais de tempo, mas termina completo, e eu sei exatamente quais pedaços exigiram nova tentativa.

**Exemplo:** O Marcos pedia o relatório de um mês inteiro de uma vez e a coleta falhava na metade. Passou a pedir por faixas de poucos dias, repetindo com faixa menor quando dava erro, e o relatório fechou sem perda.

**Cuidado:** Abortar tudo no primeiro erro, ou repetir o mesmo pedido pesado em laço. Repetir igual gera o mesmo erro. Reduza o tamanho a cada tentativa, e ponha um limite de tentativas.

Ligado a [[chave-acesso-vencida-derruba-tudo-cascata]] · [[relatorio-diario-pixel]] · [[rastreio-falta-mix-origem-nao-bug]] · [[cruzar-plataforma-crm-pelo-nome-conjunto-inventa-ralo]]
