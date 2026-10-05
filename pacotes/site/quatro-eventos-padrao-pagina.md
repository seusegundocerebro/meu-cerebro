---
name: quatro-eventos-padrao-pagina
titulo: "Os quatro eventos padrão da página"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de site
area: [Site, Pixel e API de conversões]
pacote: site
---

Os quatro eventos padrão da página: PageView ao abrir, ViewContent com o valor do plano, InitiateCheckout no clique do botão e Purchase só na aprovação. Com esses quatro, tenho o funil completo: quem viu, quem se interessou, quem foi pagar e quem pagou.

Cada evento tem um momento exato para disparar e um dado que o acompanha. O valor vai no ViewContent e no Purchase. O InitiateCheckout sai uma vez por sessão. O Purchase só sai quando o pagamento é aprovado. Poucos eventos, bem feitos, valem mais que muitos mal definidos, e deixam a leitura do funil simples.

**Exemplo:** Paula confere que, ao abrir a página, sai o PageView; ao clicar no botão, o InitiateCheckout; e só depois do pagamento, o Purchase.

**Cuidado:** disparar Purchase na geração do pagamento infla o resultado. Só na aprovação.

Ligado a [[pixel-navegador-capi-servidor-mesmo-event-id]] · [[trava-sessao-initiatecheckout]] · [[purchase-gerar-pix-fica-desligado]]
