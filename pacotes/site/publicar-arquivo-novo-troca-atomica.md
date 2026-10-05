---
name: publicar-arquivo-novo-troca-atomica
titulo: "Publicar com arquivo novo e troca atômica"
especie: aprendizado
criado: 2026-10-05
frente: Pacote de site
area: [Site, Celular, velocidade, design e teste]
pacote: site
---

Publicar com arquivo novo e troca atômica: subo como ".novo" e renomeio; faço backup com data antes de cada mudança. Assim o visitante nunca vê uma página pela metade, e posso voltar atrás em segundos se algo der errado.

Envio a nova versão com outro nome, confiro que está completa e só então a renomeio sobre a antiga em um único passo. Antes disso, guardo uma cópia da versão atual com a data no nome. Se o novo falhar, restauro a cópia. Esse cuidado protege contra arquivo truncado e contra mudanças que quebram a página, e custa poucos segundos.

**Exemplo:** Marcos salva a página atual com a data, sobe a nova com o sufixo temporário e a renomeia quando confere que está completa.

**Cuidado:** editar o arquivo no ar pode deixá-lo em estado inválido por instantes. Troque, não edite.

Ligado a [[esconder-css-motivo-escrito-lado-reversivel]] · [[versao-nova-zero-checkout-volta-anterior]] · [[link-publico-termina-arquivo-nao-pasta]]
