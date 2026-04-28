# Vakeiro Lives — Calendário + Clipes Lendários (rename + favicon)

**Data:** 2026-04-28
**Autor:** apps2@destcert.com
**Status:** Aprovado para implementação
**Spec base:** [`2026-04-28-vakeiro-site-design.md`](./2026-04-28-vakeiro-site-design.md) (site original)

## Escopo

Quatro mudanças coordenadas no site Vakeiro:

1. **Rename** — site passa a ter nome de marca "Vakeiro Lives"
2. **Favicon** — SVG inline estilo CAM_01 (corner brackets neon + dot REC magenta)
3. **Nova section: Clipes Lendários** — 3 embeds reais do Twitch
4. **Calendário substitui Agenda** — single-month navegável com histórico de lives

Reaproveita 100% da stack e direção visual do site original (Tailwind v4, framer-motion, cyberpunk HUD, paleta ciano + magenta + bg `#08000f`, fontes Orbitron/Chakra Petch/JetBrains Mono).

## 1. Rename para "Vakeiro Lives"

**Onde aparece:**
- `index.html` `<title>` → `Vakeiro Lives — Portal Oficial`
- `src/components/NavBar.tsx` logo → `◢ VAKEIRO LIVES ◣`
- `README.md` header → `# Vakeiro Lives`

**Onde NÃO muda:**
- Hero glitch title continua `VAKEIRO` (é a identidade do streamer; "Vakeiro Lives" é o nome do site, são coisas diferentes)
- Outras seções e copy interna mantêm "VAKEIRO" / "Vakeiro" como referência ao sujeito

## 2. Favicon CAM_01

`public/favicon.svg` — SVG 32×32:

- Fundo: `#08000f`
- 4 corner brackets ciano `#00f0ff` (mirror do `HUDFrame variant="cyan"`)
- Dot central magenta `#ff006e` 4×4px (mimetiza REC indicator de live cam)

Referenciado em `index.html`: `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`. SVG escala bem em qualquer DPI/tamanho de tab.

## 3. Section: Clipes Lendários

### Posição
Entre Conquistas e Calendário na ordem do scroll e da nav. Slot novo na seção `id="clipes"`.

### Layout
Grid responsivo: 1 col `<768px`, 2 col `768–1023px`, 3 col `≥1024px`.

Cada card é uma `HUDFrame variant="mixed"` contendo:
- Header: `▌REGISTRO 0xC1` (ou C2/C3) em `font-mono` magenta
- Iframe 16:9 do clip (responsive via `aspect-video`)
- Caption pomposa abaixo (PT-BR, font-ui, justificada)

### Component: `<ClipEmbed>`

```ts
interface ClipEmbedProps {
  slug: string;
  title: string; // alt-text + a11y label
}
```

Renderiza:

```tsx
<div className="aspect-video w-full">
  <iframe
    src={`https://clips.twitch.tv/embed?clip=${slug}&parent=${parent}`}
    title={title}
    loading="lazy"
    allowFullScreen
    className="w-full h-full border-0"
  />
</div>
```

`parent` é determinado em runtime via `window.location.hostname` (funciona em `localhost`, em preview deploy, e em prod sem rebuild). Fallback hardcoded `'localhost'` se `window` indisponível (defensive — Vite SPA não tem SSR mas é cinto-e-suspensório barato).

### Dados: `src/data/clipes.ts`

```ts
export interface ClipeLendario {
  slug: string;
  registry: string;
  title: string;
  caption: string;
}

export const CLIPES: ClipeLendario[] = [
  {
    slug: 'DaintyTameEelNononoCat-2y1K9i6T_IPX0Zf1',
    registry: 'REGISTRO 0xC1',
    title: 'Clipe Lendário #1',
    caption: 'Em arquivo permanece momento clássico do gabinete. Audiência testemunha episódio que jamais se repetirá com a exata intensidade original.',
  },
  {
    slug: 'TemperedBraveGullRuleFive-5tycUQHLXvWJEmDv',
    registry: 'REGISTRO 0xC2',
    title: 'Clipe Lendário #2',
    caption: 'Documento histórico isolado. Análise posterior confirmou — o sujeito estava, de fato, presente. Recomenda-se assistir em silêncio respeitoso.',
  },
  {
    slug: 'FunEphemeralTroutBuddhaBar-9Z3s3lR-yTYFNTe_',
    registry: 'REGISTRO 0xC3',
    title: 'Clipe Lendário #3',
    caption: 'Fragmento raro de transmissão preservado para a posteridade. Ato único, irreproduzível, registrado para fins exclusivamente acadêmicos.',
  },
];
```

Captions já em tom "arquivo confidencial" pomposo (mesma vibe do Dossiê). Genéricas o suficiente pra não comprometer mesmo sem saber o conteúdo dos clips. Usuário edita depois com base no que rola em cada um.

### Considerações Twitch embed
- Domínio precisa estar listado em `parent`. Detecção em runtime cobre todos os casos.
- iframe `loading="lazy"` evita carregar 3 players no primeiro paint
- `allowFullScreen` permite player fullscreen
- Sem autoplay (default Twitch)

## 4. Calendário (substitui Agenda)

### Posição
Mesmo slot da Agenda na nav e no scroll. `id` muda de `agenda` para `calendario`. Label da nav muda para `CALENDÁRIO`.

### Layout
Grid clássico de calendário, 7 colunas:

- Header com `[◂ MÊS ANTERIOR]  ABRIL · 2026  [PRÓXIMO MÊS ▸]`
- Linha de dias da semana: `SEG TER QUA QUI SEX SAB DOM`
- Grid 6×7 de células de dia (algumas vazias no início/fim do mês)

### Day cell
- Número do dia em `font-mono` no canto superior esquerdo
- Status visual:
  - **Live ocorreu**: dot ciano `#00f0ff` com glow (`box-shadow: 0 0 8px`) + ring sutil ao redor da célula
  - **Offline**: célula com border `white/10`, número em `text-text-dim`
  - **Hoje**: ring magenta `#ff006e` na célula (sobrepõe ao status normal)
  - **Fora do mês**: célula vazia, sem número
- Tooltip on hover (desktop) ou tap (mobile): `título · Xmin · jogo` quando há live; nenhum tooltip se offline

### Component: `<CalendarMonth>`

```ts
interface CalendarMonthProps {
  year: number;
  month: number; // 1-12
  liveDays: LiveDay[];
  today: Date;
}
```

Renderiza header dos dias da semana + grid de células. Calcula:
- Primeiro dia do mês: `new Date(year, month - 1, 1).getDay()` (ajustado pra Mon=0)
- Total de dias do mês: `new Date(year, month, 0).getDate()`
- Match de cada dia com `liveDays` por string ISO `YYYY-MM-DD`

### Component: `<CalendarioSection>`

Estado local: `[currentYear, currentMonth]`, inicializado em `(today.getFullYear(), today.getMonth() + 1)`.

Botões prev/next:
- Prev disabled se `currentYear === 2024 && currentMonth === 9` (set/2024)
- Next disabled se `currentYear === today.getFullYear() && currentMonth === today.getMonth() + 1`

Click prev/next chama `setCurrent...` com decremento/incremento + carryover de ano.

### Dados: `src/data/calendario.ts`

```ts
export interface LiveDay {
  date: string;        // 'YYYY-MM-DD'
  durationMin: number;
  title: string;
  game?: string;
}

export const LIVE_DAYS: LiveDay[] = [
  { date: '2024-09-15', durationMin: 23, title: 'primeira aparição da era moderna', game: 'Just Chatting' },
  { date: '2024-09-22', durationMin: 41, title: 'tentativa interrompida por descanso', game: 'Just Chatting' },
  { date: '2024-10-08', durationMin: 34, title: 'sessão noturna sob protesto', game: 'Counter-Strike 2' },
  { date: '2024-11-30', durationMin: 19, title: 'live anunciada às 23h57', game: 'Just Chatting' },
  { date: '2025-02-12', durationMin: 28, title: 'retorno triunfal após hiato de 42 dias', game: 'Counter-Strike 2' },
  { date: '2025-04-21', durationMin: 56, title: 'maratona de raciocínio elevado', game: 'GTA V' },
  { date: '2025-08-05', durationMin: 17, title: 'transmissão técnica curta', game: 'Just Chatting' },
  { date: '2026-01-13', durationMin: 33, title: 'ano-novo do imperador', game: 'Just Chatting' },
  { date: '2026-03-04', durationMin: 45, title: 'sessão de análise estratégica', game: 'Counter-Strike 2' },
  { date: '2026-04-25', durationMin: 38, title: 'última transmissão registrada', game: 'Just Chatting' },
];

export const CALENDAR_MIN_YEAR = 2024;
export const CALENDAR_MIN_MONTH = 9;
```

10 entradas em ~20 meses — escassez visual confirmada (mais de 90% dos dias offline), o que entrega a piada. Usuário edita à vontade.

## 5. NavBar atualizada

Ordem final dos LINKS em `src/components/NavBar.tsx`:

```ts
const LINKS = [
  { id: 'hero', label: 'IDENT' },
  { id: 'live', label: 'LIVE STATUS' },
  { id: 'dossie', label: 'DOSSIÊ' },
  { id: 'conquistas', label: 'CONQUISTAS' },
  { id: 'clipes', label: 'CLIPES' },        // novo
  { id: 'calendario', label: 'CALENDÁRIO' }, // antes 'agenda' / 'AGENDA'
  { id: 'manifesto', label: 'MANIFESTO' },
  { id: 'patrocinadores', label: 'SPONSORS' },
  { id: 'rodape', label: '∎' },
];
```

9 items. `gap-5` atual deve acomodar; se ficar apertado em viewports `md` (768–1023px), reduzir gap para `gap-4` ou `gap-3`.

## Arquivos

**Criar:**
- `public/favicon.svg`
- `src/data/calendario.ts`
- `src/data/clipes.ts`
- `src/sections/ClipesSection.tsx`
- `src/sections/CalendarioSection.tsx`
- `src/components/CalendarMonth.tsx`
- `src/components/ClipEmbed.tsx`

**Deletar:**
- `src/sections/AgendaSection.tsx` (substituído pelo Calendário)

**Modificar:**
- `index.html` (title + favicon link)
- `src/components/NavBar.tsx` (LINKS atualizada)
- `src/App.tsx` (remover Agenda, add Clipes + Calendário, atualizar imports)
- `README.md` (header rename)
- `src/data/conquistas.ts` (a constante `LIVES_THIS_WEEK` continua usada pelo `LiveStatusSection`; nada a remover desde que o LiveStatus referencie apenas o que precisa)

## Edge Cases & Tratamento

- **Twitch parent**: `window.location.hostname` lê em runtime; SPA-only Vite. Sem fallback complexo.
- **Calendar bounds**: navegação clamped entre `2024-09` e mês atual. Botões disabled visualmente (opacity-30, cursor-not-allowed).
- **Mobile tooltip**: cada DayCell é um `<button>` (não `<div>`). Tooltip mostrado via CSS com `:hover` (desktop) + `:focus-visible` (mobile, ativado por tap). Sem JavaScript de estado — Tailwind `group/group-hover:` + `focus-visible:` cobrem ambos casos. Tap fora de qualquer célula tira o foco e fecha o tooltip naturalmente.
- **Empty month**: se um mês não tem nenhum live em `LIVE_DAYS`, calendário renderiza tudo cinza — comportamento esperado, não é bug.
- **Today highlight com mês passado**: se navegar pra mês passado, `today` ring NÃO aparece (porque `today` está em outro mês).

## Estratégia de Testes

Idêntica à do site original: zero testes automatizados. Verificação:
- `npm run build` — TypeScript strict garante consistência de tipos
- Smoke manual no `npm run dev`: clicar nos meses prev/next do calendário, verificar bounds, verificar embed dos 3 clipes carrega, verificar nav scroll para cada section

## Fora de Escopo (YAGNI)

- Year heatmap como vista alternativa do calendário
- Click em dia → modal/drawer (tooltip já cobre)
- Player de clipe inline customizado (Twitch iframe basta)
- Mais de 3 clipes (lista estática de 3)
- Atualização automática de lives via Decapi (Decapi não dá histórico mensal real; hardcoded é a fonte)
- Edição inline de captions/lives via UI (commits no repo são a fonte da verdade)
- Mini-heatmap dos meses anteriores no rodapé do Calendário (rejeitado quando user escolheu opção B pura)
- Suporte a anos < 2024 (streamer não existia)

## Roadmap de Implementação (alto nível)

1. Rename + favicon
2. Data files (clipes.ts, calendario.ts)
3. ClipEmbed component
4. ClipesSection
5. CalendarMonth component
6. CalendarioSection (com nav prev/next)
7. App.tsx + NavBar integration (delete Agenda, insert Clipes + Calendário)
8. Build + smoke
9. Push (Vercel auto-deploys)

(O plano detalhado vai num documento separado via skill `writing-plans`.)
