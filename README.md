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

---

## Precisa de quê

- **Claude Code** com seu plano do Claude (Pro ou Max). O cérebro usa o seu plano, sem custo extra.
- **Node.js 18 ou mais novo**, só pro mapa 3D ([nodejs.org](https://nodejs.org), versão LTS).
- Internet na primeira vez que abrir o mapa (ele baixa o motor 3D).

## Já usa Obsidian?

As notas são arquivos `.md` com `[[links]]`, iguais às do Obsidian. Dá pra:
- abrir a pasta `notas/` como cofre no Obsidian e usar os dois juntos; ou
- rodar `/importar` e trazer seu cofre pro cérebro; ou
- apontar o mapa direto pro seu cofre: `CEREBRO_NOTAS=/caminho/do/cofre npm run mapa`.

## Privacidade

Nada sai do seu computador além do que você já manda pro Claude na conversa. O mapa roda em `localhost`
e só você enxerga. Não guarde senha nem documento no cérebro (o Claude avisa se aparecer).
