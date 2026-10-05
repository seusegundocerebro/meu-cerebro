---
name: atraso-lead-resultado-le-mediana-percentil
titulo: "Atraso entre lead e resultado se lê por mediana e percentil"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de tráfego
area: [Tráfego, Leitura de métrica]
pacote: trafego
---

O atraso entre lead e resultado se lê por mediana e percentil. A média vira desculpa pra não cortar conjunto morto, porque alguns resultados muito tardios puxam o número pra cima. A maturidade por coorte resolve.
Eu agrupo os leads por data de entrada e vejo, pra cada grupo, quanto tempo levou até a venda. Mediana mostra o caso típico. Percentil mostra os extremos. Quando a coorte já passou do tempo típico sem converter, posso cortar com segurança.
Quando o conjunto é novo e a coorte ainda é jovem, eu evito condenar. Aguardo o tempo típico passar, porque a decisão antes disso é palpite, não leitura.

**Exemplo:** O Diego mantinha um conjunto parado porque "às vezes demora". Pela mediana, a maioria das vendas vinha em poucos dias, e aquele conjunto já tinha passado muito disso.

**Cuidado:** Cortar cedo demais uma coorte ainda imatura. Espere a mediana passar antes de condenar.

Ligado a [[resultado-catorze-dias-retrospectivo-custo-conversa-tres]] · [[ate-quatro-resultados-semana-nao-existe-tendencia]] · [[gargalo-pode-estar-depois-anuncio]] · [[casamento-lead-formulario-exige-tres-condicoes]]
