---
name: link-checkout-preserva-parametros-pagina
titulo: "O link de checkout preserva os parâmetros da página"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de site
area: [Site, Checkout e entrega]
pacote: site
---

O link de checkout preserva os parâmetros da página. Todo botão recebe a URL fixa da oferta mais as utm que a pessoa trouxe. Sem isso, a atribuição se perde: a venda aparece sem origem e eu não sei qual anúncio vendeu.

Programo a página para ler os parâmetros da barra de endereço e anexar ao link de cada botão. Depois testo abrindo a página com parâmetros de exemplo e clicando: o checkout deve abrir com os mesmos parâmetros. Esse pequeno encadeamento é o que liga o dinheiro que entra ao anúncio que o gerou.

**Exemplo:** Diego abre a página com um parâmetro de teste, clica no botão e confere que o endereço do checkout traz o mesmo parâmetro.

**Cuidado:** parâmetro perdido no meio do caminho transforma toda venda em origem desconhecida.

Ligado a [[parametro-redirecionamento-nao-pode-trocar-destino]] · [[utm-macros-plataforma]] · [[casar-venda-id-nao-nome]]
