---
name: casar-venda-id-nao-nome
titulo: "Casar venda por id, não por nome"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de site
area: [Site, UTM, atribuição, presell e captura]
pacote: site
---

Casar a venda por id, não por nome. Renomear o anúncio quebrou a atribuição no dia seguinte; o id do objeto é a chave, e a utm é só o caminho. Nomes mudam por organização, por teste, por capricho; ids não mudam.

Guardo, junto de cada venda, o id do anúncio que a originou. Na hora de montar o relatório, junto pelo id e só depois mostro o nome atual. Se alguém renomear a campanha, a venda continua ligada ao mesmo anúncio. Essa escolha de desenho evita relatórios que se quebram toda vez que alguém arruma os nomes.

**Exemplo:** Paula renomeia um anúncio para deixar o nome mais claro. As vendas antigas continuam ligadas a ele pelo id.

**Cuidado:** não use o nome como chave de junção. Ele muda sem aviso.

Ligado a [[utm-macros-plataforma]] · [[nome-renomeado-chega-cache-horas]] · [[chave-deduplicacao-id-pedido]]
