---
name: regras-valor-valem-conta-inteira
titulo: "Regras de valor valem pra conta inteira"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de tráfego
area: [Tráfego, Públicos]
pacote: trafego
---

Regras de valor valem pra conta inteira. Por isso, um pixel e uma conta por produto. Se você mistura produtos de preços muito diferentes na mesma conta, a máquina aprende uma régua de valor que não serve a nenhum deles.
Quando o produto barato e o caro compartilham a mesma conta, o aprendizado de valor fica contaminado. Separar mantém cada régua limpa e evita que um produto distorça a leitura do outro.
Eu também separo os eventos de valor por produto, pra a régua de cada um não se contaminar. Cada conta aprende sozinha a reconhecer o que é um bom comprador do seu produto.

**Exemplo:** A Renata vendia um e-book simples e uma mentoria cara, tudo na mesma conta. A máquina otimizava mal pros dois. Ao separar em duas contas, cada uma encontrou seu ritmo.

**Cuidado:** Juntar tudo pra facilitar a administração. A facilidade custa em precisão. Separe quando os produtos têm valor e público diferentes.

Ligado a [[maquina-le-cliente-registro-raiz-conta]] · [[conta-anuncios-idioma-produto]] · [[pixel-produto-evento-teste-antes-ligar]] · [[engajados-clientes-existentes-configurados-atualizados]]
