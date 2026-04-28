# Vakeiro Site — Design Doc

**Data:** 2026-04-28
**Autor:** apps2@destcert.com
**Status:** Aprovado para implementação

## Conceito

Site de fã (paródia) do streamer **Euler Vakeiro** ([twitch.tv/vakeiroo](https://www.twitch.tv/vakeiroo)). Mistura duas vibes:

1. **Fan site institucional pomposo** — finge ser portal oficial do "maior streamer do Brasil"
2. **Dashboard de métricas reais** — puxa dados de fato do canal e exibe com tom satírico

A piada funciona pelo contraste: estética cyberpunk-corporativa séria + números reais ridículos (média 5–10 viewers, lives 2–3x/semana, longos períodos offline).

## Direção Visual

**Tema:** Cyberpunk HUD — interface de "estação de monitoramento" acessando dossiê confidencial.

**Tipografia:**
- `Orbitron` 700/900 — display (nome, headlines)
- `Chakra Petch` 700 — UI / sub-headlines
- `JetBrains Mono` 400/700 — labels, terminais, números técnicos

**Paleta:**
- Background: `#08000f` (preto azulado)
- Acento ciano: `#00f0ff`
- Acento rosa: `#ff006e`
- Texto: `#ffffff`
- Texto secundário: `#9aa3c7`
- Off (estado dim): `rgba(255,255,255,0.4)`

**Texturas e efeitos:**
- Scanlines globais sutis (CRT-ish, opacidade ~4%)
- Frames com brackets nos cantos (`◢◣◤◥`)
- Glitch RGB no nome principal (text-shadow ciano/rosa deslocados)
- Hover em stats: brilho neon
- Cursor piscante em terminais

**Mood:** dark, frio, "mainframe acessando dossiê". Sem amenidades — toda UI veste a fantasia da seriedade institucional.

## Arquitetura de Informação

Single-page com scroll vertical. Nav superior fixa com 8 anchors. Cada seção tem altura mínima 80vh (exceto rodapé).

### 1. Hero / Ident
- Background: scanlines + grid sutil
- Headline: `VAKEIRO` em Orbitron 900, glitch RGB
- Subhead JetBrains Mono: `▌ID_0xVAK · STREAMER · TWITCH BR`
- Status badge: `● OFFLINE` ou `● AO VIVO` (pulsando) — vem do Decapi `uptime`
- Avatar real (Decapi `avatar`) num frame HUD
- CTA: `[ ACESSAR TRANSMISSÃO ]` → twitch.tv/vakeiroo
- Indicador de scroll no rodapé

### 2. Live Status — *o destaque do site*
HUD principal em grid 2x2 ou 4 colunas, com bordas neon e animações:

| Painel | Fonte do dado |
|---|---|
| ⏱️ **TEMPO DESDE A ÚLTIMA LIVE** — contador rolando ao vivo (`00d 78h 23m 14s`) | Decapi `last_stream/vakeiroo` (calcula delta no client) |
| 📊 **MÉDIA DE VIEWERS** — `7` com gráfico de linha apontando pra baixo | Hardcoded (Twitch API não dá histórico de avg viewers; gag fixa fica fiel ao real) |
| 📅 **LIVES ESTA SEMANA** — `2 / META 7` com barra de progresso vermelha (a "meta" é a piada) | Hardcoded em `data/conquistas.ts`, atualizado manualmente em commits |
| 🛌 **STATUS ATUAL** — `OFFLINE` / `AO VIVO` com último jogo abaixo | Decapi `uptime` + `lastgame` |

Polling a cada 60s pelos painéis dinâmicos.

### 3. Dossiê / Bio
Bloco estilo "arquivo classificado" com header `ARQUIVO #0xVAK · ACESSO LIBERADO`. Texto pomposo cyberpunk fingindo ser ficha confidencial. Conteúdo placeholder em `/data/dossie.ts`:

> "Sujeito identificado em 2021 por algoritmos de detecção de potencial latente. Pioneiro ausente. Visionário recluso. Streamer nas horas que sobram do descanso. Ao escolher a Twitch como veículo de manifestação, dispensou os caminhos previsíveis: dedicação contínua, agenda fixa, busca por audiência. Optou pela via mais difícil — esperar o reconhecimento chegar."

### 4. Conquistas / Marcos
Timeline vertical à esquerda com pontos neon. Cada marco em card HUD:
- 2024 · Q3 — Quebra recorde pessoal: **11 viewers simultâneos** durante 4min32s
- 2024 · Q4 — Primeira live de **30 minutos** consecutivos sem AFK confirmado
- 2025 · Q1 — Atinge **50 followers** — marco lendário
- 2025 · Q2 — Permanece **42 dias offline** — recorde institucional
- 2025 · Q3 — Inaugura formato "live anunciada → cancelada 3min antes"
- 2026 · Q1 — Desafia limites: **3 lives na mesma semana** (não repetido desde)

Hardcoded em `/data/conquistas.ts`.

### 5. Agenda Operacional
Calendário da semana atual em grid 7 colunas. Cada dia:
- 90% dos dias: `SEM TRANSMISSÃO` em cinza
- 1–2 dias: `TBD: quando der vontade` em amarelo
- Raríssimo: `[REDACTED] · 22h` em ciano

Layout estático mas data atual destacada (calculada no client).

### 6. Manifesto
Bloco fullscreen, fundo preto puro, texto centralizado tipo discurso oficial. Tipografia maior, line-height generoso:

> Aos cidadãos da Twitch BR,
> Não venho prometer lives diárias.
> Não venho competir por viewers.
> Não venho sequer manter horário.
> Venho — quando me convém — abrir transmissão.
> E aos sete que aparecem, ofereço o privilégio de presenciar.
>
> — EV, século XXI

### 7. Patrocinadores
Grid 3x2 de slots vazios. Cada slot: frame HUD com texto `[ VAGA DISPONÍVEL ]` + `contato: vakeiro@nada.com.br`. Hover: brilho ciano + cursor pointer.

### 8. Rodapé
- Disclaimer pequeno: `Site não-oficial. Homenagem zoeira sem fins lucrativos. Imagens via Twitch.`
- Link pra repo no GitHub
- Copyright fake: `© REPÚBLICA TWITCHEANA · ANO ∞`

## Stack Técnica

| Camada | Tecnologia |
|---|---|
| Build | Vite 5 |
| UI | React 18 + TypeScript |
| Estilo | Tailwind CSS v4 |
| Animação | framer-motion 11 |
| Ícones | lucide-react |
| Fontes | @fontsource/orbitron, @fontsource/chakra-petch, @fontsource/jetbrains-mono |
| Data fetching | SWR 2 |
| Hosting | Vercel (GitHub auto-deploy) |

**Repositório:** [github.com/Marcelobarreira/vakeiro](https://github.com/Marcelobarreira/vakeiro)
**Local:** `E:\APPS\Vakeiro-Site\`

## Estrutura de Arquivos

```
vakeiro/
├─ src/
│  ├─ App.tsx                    # shell, nav, monta seções
│  ├─ main.tsx
│  ├─ index.css                  # tailwind imports + base globals
│  ├─ components/
│  │  ├─ HUDFrame.tsx            # frame com cantos angulares
│  │  ├─ GlitchTitle.tsx         # texto com glitch RGB
│  │  ├─ StatCard.tsx            # painel HUD com label + valor
│  │  ├─ LiveCounter.tsx         # contador rolando (delta de timestamp)
│  │  ├─ ScanlineOverlay.tsx     # overlay global de scanlines
│  │  ├─ StatusBadge.tsx         # ● OFFLINE / ● AO VIVO
│  │  ├─ NavBar.tsx              # nav superior fixa
│  │  └─ SectionAnchor.tsx       # wrapper com id pra anchor links
│  ├─ sections/
│  │  ├─ HeroSection.tsx
│  │  ├─ LiveStatusSection.tsx
│  │  ├─ DossieSection.tsx
│  │  ├─ ConquistasSection.tsx
│  │  ├─ AgendaSection.tsx
│  │  ├─ ManifestoSection.tsx
│  │  ├─ PatrocinadoresSection.tsx
│  │  └─ FooterSection.tsx
│  ├─ hooks/
│  │  ├─ useDecapi.ts            # SWR fetcher base
│  │  ├─ useUptime.ts
│  │  ├─ useLastStream.ts
│  │  ├─ useFollowers.ts
│  │  ├─ useStreamInfo.ts
│  │  └─ useAvatar.ts
│  ├─ data/
│  │  ├─ dossie.ts
│  │  ├─ conquistas.ts
│  │  ├─ manifesto.ts
│  │  └─ patrocinadores.ts
│  └─ lib/
│     └─ decapi.ts               # cliente fetch + parse de erro
├─ public/
│  └─ favicon.svg                # mini brasão cyberpunk
├─ index.html
├─ tailwind.config.ts
├─ tsconfig.json
├─ vite.config.ts
├─ package.json
├─ .gitignore
├─ README.md
└─ docs/
   └─ superpowers/specs/2026-04-28-vakeiro-site-design.md
```

## Fluxo de Dados

**Fonte externa:** Decapi.me — API pública wrapper da Twitch, sem auth, CORS habilitado, plain text.

**Endpoints usados** (canal: `vakeiroo`):

| Endpoint | Retorna | Componente |
|---|---|---|
| `/twitch/avatar/vakeiroo` | URL do avatar | HeroSection |
| `/twitch/uptime/vakeiroo` | duração live ou `vakeiroo is offline` | StatusBadge, LiveStatusSection |
| `/twitch/followcount/vakeiroo` | nº followers | LiveStatusSection (decoração) |
| `/twitch/title/vakeiroo` | título da última stream | LiveStatusSection (sob status) |
| `/twitch/lastgame/vakeiroo` | último jogo | LiveStatusSection |
| `/twitch/last_stream/vakeiroo` | data ISO da última transmissão *(verificar disponibilidade na implementação; se não existir, fallback hardcoded)* | LiveCounter |

**Estratégia SWR:**
- Polling 60s pra `uptime` e `last_stream` (dinâmicos)
- Polling 5min pra `followcount`, `title`, `lastgame`
- Cache 30min pra `avatar`
- Retry exponencial 3x em falha

**Tratamento de erro:**
- Decapi retorna texto puro — incluindo erros tipo `Channel does not exist`. Função `parseDecapiResponse(text, expectedFormat)` em `lib/decapi.ts` detecta padrões de erro e retorna `{ ok: false, fallback }`.
- Falha de rede → SWR mantém último cache; UI mostra valor stale com indicador `▒ DADOS CACHEADOS`.
- Falha persistente → fallback hardcoded mantendo persona (`ACESSO INTERMITENTE` / `DADOS CLASSIFICADOS`).

## Componentes-chave

**HUDFrame** — wrapper com 4 brackets nos cantos (border-top + border-left, etc), aceita `variant: 'cyan' | 'magenta' | 'mixed'` e `children`. Anima entrada com framer-motion (corners "draw in" sequencialmente).

**GlitchTitle** — `<span>` com 3 camadas absolute-positioned: base branco, ciano deslocada -2px X, rosa deslocada +2px X. Animação opcional ativável em hover ou intervalo.

**StatCard** — composição de `HUDFrame` + label (JetBrains Mono uppercase) + valor grande (Orbitron). Aceita `loading`, `error`, `value`, `unit`.

**LiveCounter** — recebe um timestamp ISO (última live), recalcula delta a cada 1s no client com `setInterval`, formata como `00d 00h 00m 00s`. Pausa quando aba não está visível (Page Visibility API).

**ScanlineOverlay** — `<div fixed inset-0 pointer-events-none>` com `repeating-linear-gradient` em z-index alto mas permeável. Opacity ~4%.

## Responsividade

Desktop-first (foco). Breakpoints:
- `≥1024px` — layout completo, grid 4 colunas no Live Status
- `768–1023px` — grid 2 colunas, fontes -10%
- `<768px` — single column, hero compacto, manifesto reduzido

Não é mobile-first — o site é peça de portfolio/zoeira pra ser visto no desktop. Mobile só não pode quebrar.

## Fora de Escopo (YAGNI)

- Autenticação de visitante
- CMS / painel admin (conteúdo é commit no repo)
- Analytics / tracking
- Testes unitários (smoke manual no browser cobre)
- i18n (PT-BR fixo)
- Histórico de VODs / galeria de clipes (precisaria Twitch API oficial)
- Tema claro / dark toggle (cyberpunk dark é a única vibe)
- Loja de merchandise
- Chat embed da Twitch
- SSR / SSG (zero benefício SEO num joke site)

## Estratégia de Testes

Não haverá suite automatizada. Justificativa:
- Joke site, audiência estimada baixa, baixo custo de bug
- Lógica está toda em UI + fetch de API externa que não controlamos
- Testes E2E adicionariam fricção sem ganho proporcional

**Garantias compensatórias:**
- TypeScript strict pega erros estruturais
- ESLint + Prettier no pre-commit
- Smoke manual no browser antes de cada deploy (rodar dev, conferir as 8 seções)
- Vercel preview deploys em PR (se algum dia houver PR)

## Roadmap de Implementação (alto nível)

1. **Setup** — `npm create vite@latest`, instalar deps, configurar Tailwind v4, fontes, paths
2. **Componentes base** — HUDFrame, GlitchTitle, StatCard, ScanlineOverlay
3. **Hero + Nav** — anchor scroll funcionando
4. **Decapi client** — `lib/decapi.ts` + 1 hook (`useUptime`) end-to-end
5. **Live Status section** — todos os painéis, polling rodando
6. **Seções estáticas** — Dossiê, Conquistas, Agenda, Manifesto, Patrocinadores, Footer
7. **Polish** — animações framer-motion, hover states, responsive breakpoints
8. **Deploy** — push pro repo, conectar Vercel, verificar prod

(O plano detalhado de tarefas vai num documento separado via skill `writing-plans`.)
