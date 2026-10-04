# 🧠 Meu Cérebro — o segundo cérebro que pensa sozinho

Kit do curso **Segundo Cérebro no Claude**. Você conversa com o Claude como sempre; ele guarda o que importa,
liga uma ideia na outra, te lembra na hora certa e ainda sugere ideia nova juntando o que você já pensou.
Tudo fica no **seu** computador, em arquivos de texto comuns.

---

## Como instalar

### Opção 1: pelo Claude (mais fácil)

Com o Claude Code aberto em qualquer pasta, copie e cole:

```
Instala pra mim o repositório https://github.com/seusegundocerebro/meu-cerebro.git numa pasta chamada meu-cerebro, entra nela e roda /setup
```

O Claude baixa, entra na pasta e começa a configuração.

### Opção 2: pelo terminal

```bash
git clone https://github.com/seusegundocerebro/meu-cerebro.git
cd meu-cerebro
claude
```

E dentro do Claude:

```
/setup
```

Em uns 5 minutos o Claude te conhece e o cérebro nasce com as suas primeiras notas.

> **Importante:** abra sempre o Claude **dentro da pasta `meu-cerebro`**. É lá que ele encontra as regras do cérebro e os comandos.

---

## O que vem no kit

| Comando | O que faz |
|---|---|
| `/setup` | Primeira vez: te conhece e faz o cérebro nascer |
| `/anotar` | Guarda uma ideia (cole texto ou dite do jeito que vier) |
| `/mapa` | Abre o mapa 3D no navegador: cada bolinha é uma nota, cada fio uma ligação |
| `/perguntar` | "O que eu já pensei sobre…?" Responde só com o que está no seu cérebro |
| `/faisca` | Junta ideias suas que ainda não se conhecem e sugere coisa nova |
| `/conflitos` | Acha notas que se contradizem e pergunta qual vale |
| `/executa` | Transforma uma ideia em plano e o Claude executa com você |
| `/importar` | Traz suas notas do Obsidian (ou de qualquer pasta) |

E o mais importante não é comando: **conversando normalmente**, quando aparecer uma decisão, ideia ou aprendizado,
o Claude guarda sozinho e avisa numa linha (`🧠 Guardei: …`).

### Já vem pronto pra quem vende

O kit traz um **pacote de vendas** com 56 notas ligadas: funil, atendimento no WhatsApp e no telefone, follow-up,
SPIN, AIDA, Sandler, Challenger, os princípios de Cialdini, quebra das objeções mais comuns ("tá caro", "vou pensar",
"vou falar com meu marido") e jeitos de fechar. O `/setup` pergunta se você quer ligar o pacote no seu cérebro.

Depois é só contar o que o cliente disse. O Claude acha a técnica certa e monta a resposta com o seu produto e o seu
jeito de falar. O que funcionar com você vira nota sua, ligada à técnica.

---

## Precisa de quê

- **Claude Code** instalado, autenticado e acessível pelo comando `claude`. Os pedidos de IA usam a assinatura ou a conta de API configurada nele, sujeitos aos limites e custos dessa conta.
- **Node.js 18 ou mais novo**, só pro mapa 3D ([nodejs.org](https://nodejs.org), versão LTS).
- Internet na primeira vez que abrir o mapa (ele baixa o motor 3D).

## Já usa Obsidian?

As notas são arquivos `.md` com `[[links]]`, iguais às do Obsidian. Dá pra:
- abrir a pasta `notas/` como cofre no Obsidian e usar os dois juntos; ou
- rodar `/importar` e trazer seu cofre pro cérebro; ou
- apontar o mapa direto pro seu cofre: `CEREBRO_NOTAS=/caminho/do/cofre npm run mapa`.

## Privacidade

As notas ficam no seu computador. Ao perguntar, organizar tópicos, pedir plano ou gerar faíscas, o mapa envia ao Claude a pergunta e trechos das notas relevantes. Não há chamada de IA ao abrir o mapa, nem geração agendada. O reconhecimento de voz do navegador pode usar um serviço online.

O servidor aceita acesso apenas pelo próprio computador (`localhost`). As chamadas ao Claude usam configurações de projeto/local, ferramentas desativadas, sem hooks ou servidores MCP, e têm limite de dois minutos por etapa. Não guarde senhas nem documentos no cérebro.


## Usando o mapa

Na pasta do cérebro, rode `npm run mapa` (ou `node mapa/servidor.js`) e abra http://localhost:4747. Funciona em Mac, Windows e Linux, sem instalar pacotes. Encerre com Ctrl+C nesse terminal.

- **Números vivos:** neurônios são notas; sinapses são ligações escritas; latentes são sugestões por semelhança de texto. Fios latentes não modificam seus arquivos.
- **Tópicos:** escolha frentes, áreas, ideias no plano ou feitas e tipos de nota. Duas frentes somam; frente + área cruza. **TUDO** limpa os filtros; **RECOLHER** libera espaço. Notas antigas sem tópicos ganham **ORGANIZAR TÓPICOS** (até 60 por pedido).
- **+ IDEIA:** escreva ou dite; a nota nasce ligada às parecidas e aparece piscando. Busca, leitura e edição continuam no mapa; cada alteração guarda a versão anterior em `notas/.historico/`.
- **Pergunte ao cérebro:** ele responde na tela, cita as notas e acende as usadas. Sem Claude no caminho de comandos, aparece o comando para copiar e colar no terminal. Use o microfone quando o navegador oferecer suporte e permitir acesso.
- **O cérebro sugere:** quatro atalhos para tocar um plano, ler uma faísca, retomar ideia ou pedir ideias novas para uma frente. **OUTRAS** muda a seleção.
- **FAÍSCAS:** leia, aprove ou descarte. Aprovar transforma em ideia; descartar move para `notas/.lixeira/`, de onde pode recuperar manualmente. **NOVA FAÍSCA** pede até três cruzamentos ao Claude.
- **Ideia → plano → feita:** abra uma ideia, peça ou veja o plano; depois registre o resultado em **MARCAR FEITA**. Para executar o plano com o Claude, use `/executa nome-da-nota` no terminal.

No celular a disposição se adapta e os tópicos ficam recolhidos. O servidor continua local: para acessar o computador pelo celular, seria necessário um túnel privado configurado à parte; não abra o servidor na internet. Para gravar vídeos, use `http://localhost:4747/?lento=3`. `?leve` reduz o trabalho da animação.

Os tópicos ficam no início de cada nota, por exemplo `frente: Estúdio` e `area: [Produto, Vendas]`. `/setup`, `/anotar` e `/importar` já orientam o Claude a preencher esses campos. Você pode ajustá-los no editor da nota.

## Verificação do código

`npm test` roda os testes locais com o próprio Node. Os testes de navegador usam Playwright apenas no ambiente de desenvolvimento; ele não é necessário para usar o kit.
