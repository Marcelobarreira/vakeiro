# Vakeiro Lives V2 — Calendário + Clipes Lendários Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Calendário (replaces Agenda) + Clipes Lendários section + rename to "Vakeiro Lives" + custom CAM_01 favicon.

**Architecture:** Two new section components (Clipes, Calendário) added to the existing 8-section SPA. Clipes uses Twitch iframe embeds with runtime `parent` detection. Calendário is a single-month grid with prev/next navigation, fed by a hardcoded `LIVE_DAYS` array. Reuses HUDFrame, theme tokens, and animation patterns from V1.

**Tech Stack:** Same as V1 — Vite · React 18 · TypeScript · Tailwind v4 · framer-motion 12 · SWR · Decapi (no new deps).

**Spec:** [`docs/superpowers/specs/2026-04-28-vakeiro-calendar-clipes-design.md`](../specs/2026-04-28-vakeiro-calendar-clipes-design.md)

**Repo:** [github.com/Marcelobarreira/vakeiro](https://github.com/Marcelobarreira/vakeiro), branch `main`, direct push (no branches).

**Project root:** `E:\APPS\Vakeiro-Site\` (bash: `/e/APPS/Vakeiro-Site`).

**Conventions:**
- All bash commands assume cwd is project root.
- Each task ends with **commit + push** so Vercel deploys progressively.
- No automated tests (per V1 spec). Verification = `npm run build` (TS strict) + dev boot smoke.
- Conventional commits in English. Site copy stays PT-BR.

---

## Task 1: Rename to "Vakeiro Lives" + favicon CAM_01

**Files:**
- Create: `public/favicon.svg`
- Modify: `index.html`
- Modify: `src/components/NavBar.tsx`
- Modify: `README.md`

- [ ] **Step 1: Create `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#08000f"/>
  <path d="M2 2 H10 M2 2 V10" stroke="#00f0ff" stroke-width="2" fill="none" stroke-linecap="square"/>
  <path d="M30 2 H22 M30 2 V10" stroke="#00f0ff" stroke-width="2" fill="none" stroke-linecap="square"/>
  <path d="M2 30 H10 M2 30 V22" stroke="#00f0ff" stroke-width="2" fill="none" stroke-linecap="square"/>
  <path d="M30 30 H22 M30 30 V22" stroke="#00f0ff" stroke-width="2" fill="none" stroke-linecap="square"/>
  <circle cx="16" cy="16" r="3" fill="#ff006e"/>
</svg>
```

- [ ] **Step 2: Update `index.html`**

Replace the `<title>` and the favicon `<link>` (Vite scaffold uses `vite.svg` by default):

Old:
```html
<title>Vite + React + TS</title>
<link rel="icon" type="image/svg+xml" href="/vite.svg" />
```

New:
```html
<title>Vakeiro Lives — Portal Oficial</title>
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

Also add language attribute on the `<html>` element if missing:

```html
<html lang="pt-BR">
```

- [ ] **Step 3: Update NavBar logo in `src/components/NavBar.tsx`**

Find the `<a href="#hero">` element and change its inner text from `◢ VAKEIRO ◣` to `◢ VAKEIRO LIVES ◣`:

```tsx
<a href="#hero" className="font-display font-black text-sm tracking-widest">
  ◢ VAKEIRO LIVES ◣
</a>
```

(Leave the `LINKS` array untouched here — Task 7 updates it.)

- [ ] **Step 4: Update `README.md` first line**

Change `# Vakeiro` to `# Vakeiro Lives`. Keep the rest of the README intact.

- [ ] **Step 5: Verify build + dev**

```bash
npm run build
```

Expected: clean. The favicon must be emitted under `dist/`.

```bash
npm run dev
```

(Background.) Confirm boot. Stop server.

- [ ] **Step 6: Commit + push**

```bash
git add public/favicon.svg index.html src/components/NavBar.tsx README.md
git commit -m "feat: rename to Vakeiro Lives and add CAM_01 favicon"
git push
```

---

## Task 2: Static data files (clipes + calendario)

**Files:**
- Create: `src/data/clipes.ts`
- Create: `src/data/calendario.ts`

- [ ] **Step 1: Create `src/data/clipes.ts`**

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
    caption:
      'Em arquivo permanece momento clássico do gabinete. Audiência testemunha episódio que jamais se repetirá com a exata intensidade original.',
  },
  {
    slug: 'TemperedBraveGullRuleFive-5tycUQHLXvWJEmDv',
    registry: 'REGISTRO 0xC2',
    title: 'Clipe Lendário #2',
    caption:
      'Documento histórico isolado. Análise posterior confirmou — o sujeito estava, de fato, presente. Recomenda-se assistir em silêncio respeitoso.',
  },
  {
    slug: 'FunEphemeralTroutBuddhaBar-9Z3s3lR-yTYFNTe_',
    registry: 'REGISTRO 0xC3',
    title: 'Clipe Lendário #3',
    caption:
      'Fragmento raro de transmissão preservado para a posteridade. Ato único, irreproduzível, registrado para fins exclusivamente acadêmicos.',
  },
];
```

- [ ] **Step 2: Create `src/data/calendario.ts`**

```ts
export interface LiveDay {
  date: string; // 'YYYY-MM-DD'
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

- [ ] **Step 3: Type-check**

```bash
npm run build
```

Expected: clean. Files compile cleanly even without consumers yet.

- [ ] **Step 4: Commit + push**

```bash
git add src/data/clipes.ts src/data/calendario.ts
git commit -m "feat: add static data for clipes and calendario"
git push
```

---

## Task 3: ClipEmbed component

**Files:**
- Create: `src/components/ClipEmbed.tsx`

- [ ] **Step 1: Create `src/components/ClipEmbed.tsx`**

```tsx
interface Props {
  slug: string;
  title: string;
}

function getParent(): string {
  if (typeof window === 'undefined') return 'localhost';
  return window.location.hostname;
}

export function ClipEmbed({ slug, title }: Props) {
  const parent = getParent();
  return (
    <div className="aspect-video w-full">
      <iframe
        src={`https://clips.twitch.tv/embed?clip=${slug}&parent=${parent}`}
        title={title}
        loading="lazy"
        allowFullScreen
        className="w-full h-full"
        style={{ border: 'none' }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npm run build
```

Expected: clean.

- [ ] **Step 3: Commit + push**

```bash
git add src/components/ClipEmbed.tsx
git commit -m "feat: add ClipEmbed component with runtime parent detection"
git push
```

---

## Task 4: ClipesSection

**Files:**
- Create: `src/sections/ClipesSection.tsx`

- [ ] **Step 1: Create `src/sections/ClipesSection.tsx`**

```tsx
import { HUDFrame } from '@/components/HUDFrame';
import { ClipEmbed } from '@/components/ClipEmbed';
import { CLIPES } from '@/data/clipes';

export function ClipesSection() {
  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.3em] text-[color:var(--color-magenta-neon)]">
        ▌SEÇÃO 05 · ARQUIVOS AUDIOVISUAIS
      </p>
      <h2 className="font-display text-4xl md:text-5xl font-black mt-2">CLIPES LENDÁRIOS</h2>
      <p className="font-mono text-xs text-[color:var(--color-text-dim)] mt-3 max-w-2xl">
        Fragmentos preservados da transmissão. Acesso liberado para fins de estudo.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CLIPES.map((c) => (
          <HUDFrame key={c.slug} variant="mixed" className="flex flex-col gap-4">
            <div className="font-mono text-[10px] tracking-[0.3em] text-[color:var(--color-magenta-neon)]">
              ▌ {c.registry}
            </div>
            <ClipEmbed slug={c.slug} title={c.title} />
            <p className="font-ui text-sm text-white/85 leading-relaxed">
              <span className="font-mono text-[color:var(--color-cyan-neon)] mr-1">»</span>
              {c.caption}
            </p>
          </HUDFrame>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npm run build
```

Expected: clean. Section isn't wired into App yet — that happens in Task 7.

- [ ] **Step 3: Commit + push**

```bash
git add src/sections/ClipesSection.tsx
git commit -m "feat: add ClipesSection with 3-card grid of Twitch embeds"
git push
```

---

## Task 5: CalendarMonth component

**Files:**
- Create: `src/components/CalendarMonth.tsx`

- [ ] **Step 1: Create `src/components/CalendarMonth.tsx`**

```tsx
import type { LiveDay } from '@/data/calendario';

interface Props {
  year: number;
  month: number; // 1-12
  liveDays: LiveDay[];
  today: Date;
}

const WEEKDAYS = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function isoDate(year: number, month: number, day: number): string {
  return `${year}-${pad(month)}-${pad(day)}`;
}

export function CalendarMonth({ year, month, liveDays, today }: Props) {
  // First day of the month: 0=Sun..6=Sat → adjust to Mon=0..Sun=6
  const firstDayJs = new Date(year, month - 1, 1).getDay();
  const firstDayMon = (firstDayJs + 6) % 7;
  const daysInMonth = new Date(year, month, 0).getDate();

  const liveByDate = new Map(liveDays.map((ld) => [ld.date, ld]));

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDayMon; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const todayIso = isoDate(today.getFullYear(), today.getMonth() + 1, today.getDate());

  return (
    <div className="font-mono">
      <div className="grid grid-cols-7 gap-2 mb-3">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="text-[10px] tracking-widest text-[color:var(--color-text-dim)] text-center"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {cells.map((day, i) => {
          if (day === null) {
            return <div key={`empty-${i}`} className="aspect-square" />;
          }
          const iso = isoDate(year, month, day);
          const live = liveByDate.get(iso);
          const isToday = iso === todayIso;
          return (
            <button
              key={iso}
              type="button"
              className={`group relative aspect-square border flex flex-col items-center justify-center transition-colors focus-visible:outline-none ${
                isToday
                  ? 'border-[color:var(--color-magenta-neon)] ring-1 ring-[color:var(--color-magenta-neon)]/60'
                  : 'border-white/10'
              } ${live ? 'bg-[color:var(--color-cyan-neon)]/10' : ''} hover:border-[color:var(--color-cyan-neon)] focus-visible:border-[color:var(--color-cyan-neon)]`}
              aria-label={live ? `${day} — ${live.title} (${live.durationMin} min)` : `${day} — sem transmissão`}
            >
              <span
                className={`text-xs ${live ? 'text-white' : 'text-[color:var(--color-text-dim)]'}`}
              >
                {pad(day)}
              </span>
              {live && (
                <span
                  aria-hidden
                  className="mt-1 w-1.5 h-1.5 rounded-full bg-[color:var(--color-cyan-neon)] shadow-[0_0_8px_var(--color-cyan-neon)]"
                />
              )}
              {live && (
                <span className="pointer-events-none absolute z-30 top-full left-1/2 -translate-x-1/2 mt-1 hidden group-hover:flex group-focus-visible:flex flex-col items-start gap-1 bg-black/95 border border-[color:var(--color-cyan-neon)] px-3 py-2 text-[10px] text-white whitespace-nowrap">
                  <span>{live.title}</span>
                  <span className="text-[color:var(--color-cyan-neon)]">
                    {live.durationMin} min · {live.game ?? '—'}
                  </span>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npm run build
```

Expected: clean.

- [ ] **Step 3: Commit + push**

```bash
git add src/components/CalendarMonth.tsx
git commit -m "feat: add CalendarMonth grid component with day-cell tooltips"
git push
```

---

## Task 6: CalendarioSection

**Files:**
- Create: `src/sections/CalendarioSection.tsx`

- [ ] **Step 1: Create `src/sections/CalendarioSection.tsx`**

```tsx
import { useState } from 'react';
import { CalendarMonth } from '@/components/CalendarMonth';
import {
  LIVE_DAYS,
  CALENDAR_MIN_YEAR,
  CALENDAR_MIN_MONTH,
} from '@/data/calendario';

const MONTH_NAMES = [
  'JANEIRO',
  'FEVEREIRO',
  'MARÇO',
  'ABRIL',
  'MAIO',
  'JUNHO',
  'JULHO',
  'AGOSTO',
  'SETEMBRO',
  'OUTUBRO',
  'NOVEMBRO',
  'DEZEMBRO',
];

export function CalendarioSection() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);

  const isAtMin = year === CALENDAR_MIN_YEAR && month === CALENDAR_MIN_MONTH;
  const isAtMax =
    year === today.getFullYear() && month === today.getMonth() + 1;

  function goPrev() {
    if (isAtMin) return;
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  }

  function goNext() {
    if (isAtMax) return;
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  }

  const navBtnClass =
    'border border-[color:var(--color-cyan-neon)] px-3 py-1.5 font-mono text-xs uppercase tracking-widest hover:bg-[color:var(--color-cyan-neon)] hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-current';

  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.3em] text-[color:var(--color-cyan-neon)]">
        ▌SEÇÃO 06 · REGISTRO HISTÓRICO DE TRANSMISSÕES
      </p>
      <h2 className="font-display text-4xl md:text-5xl font-black mt-2">
        CALENDÁRIO
      </h2>

      <div className="mt-10 max-w-3xl">
        <div className="flex items-center justify-between mb-6 gap-3">
          <button
            type="button"
            onClick={goPrev}
            disabled={isAtMin}
            className={navBtnClass}
            aria-label="Mês anterior"
          >
            ◂ ANT
          </button>

          <div className="font-display text-xl md:text-2xl tracking-wide text-center">
            {MONTH_NAMES[month - 1]} · {year}
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={isAtMax}
            className={navBtnClass}
            aria-label="Próximo mês"
          >
            PROX ▸
          </button>
        </div>

        <CalendarMonth
          year={year}
          month={month}
          liveDays={LIVE_DAYS}
          today={today}
        />

        <p className="mt-6 font-mono text-[10px] text-[color:var(--color-text-dim)] text-center">
          ▌HOVER OU TAP NO DIA · DETALHES DA TRANSMISSÃO
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npm run build
```

Expected: clean.

- [ ] **Step 3: Commit + push**

```bash
git add src/sections/CalendarioSection.tsx
git commit -m "feat: add CalendarioSection with prev/next month navigation"
git push
```

---

## Task 7: Wire it all into App + delete AgendaSection + section-number copy fixes

**Files:**
- Modify: `src/components/NavBar.tsx`
- Modify: `src/App.tsx`
- Modify: `src/sections/ManifestoSection.tsx`
- Modify: `src/sections/PatrocinadoresSection.tsx`
- Delete: `src/sections/AgendaSection.tsx`

- [ ] **Step 1: Update `LINKS` array in `src/components/NavBar.tsx`**

Replace the existing `LINKS` constant with:

```ts
const LINKS = [
  { id: 'hero', label: 'IDENT' },
  { id: 'live', label: 'LIVE STATUS' },
  { id: 'dossie', label: 'DOSSIÊ' },
  { id: 'conquistas', label: 'CONQUISTAS' },
  { id: 'clipes', label: 'CLIPES' },
  { id: 'calendario', label: 'CALENDÁRIO' },
  { id: 'manifesto', label: 'MANIFESTO' },
  { id: 'patrocinadores', label: 'SPONSORS' },
  { id: 'rodape', label: '∎' },
];
```

Also reduce gap if it feels tight — change `gap-5` to `gap-4` on the `<ul>`:

```tsx
<ul className="hidden md:flex gap-4 font-mono text-[10px] uppercase tracking-widest">
```

- [ ] **Step 2: Update `src/App.tsx`**

Imports: add `ClipesSection` and `CalendarioSection`, remove `AgendaSection`.

```tsx
import { NavBar } from '@/components/NavBar';
import { ScanlineOverlay } from '@/components/ScanlineOverlay';
import { SectionAnchor } from '@/components/SectionAnchor';
import { HeroSection } from '@/sections/HeroSection';
import { LiveStatusSection } from '@/sections/LiveStatusSection';
import { DossieSection } from '@/sections/DossieSection';
import { ConquistasSection } from '@/sections/ConquistasSection';
import { ClipesSection } from '@/sections/ClipesSection';
import { CalendarioSection } from '@/sections/CalendarioSection';
import { ManifestoSection } from '@/sections/ManifestoSection';
import { PatrocinadoresSection } from '@/sections/PatrocinadoresSection';
import { FooterSection } from '@/sections/FooterSection';
```

Body — replace the `agenda` SectionAnchor with `calendario`, and insert `clipes` between `conquistas` and `calendario`. The new order:

```tsx
export default function App() {
  return (
    <>
      <ScanlineOverlay />
      <NavBar />
      <SectionAnchor id="hero" className="pt-32"><HeroSection /></SectionAnchor>
      <SectionAnchor id="live"><LiveStatusSection /></SectionAnchor>
      <SectionAnchor id="dossie"><DossieSection /></SectionAnchor>
      <SectionAnchor id="conquistas"><ConquistasSection /></SectionAnchor>
      <SectionAnchor id="clipes"><ClipesSection /></SectionAnchor>
      <SectionAnchor id="calendario"><CalendarioSection /></SectionAnchor>
      <SectionAnchor id="manifesto"><ManifestoSection /></SectionAnchor>
      <SectionAnchor id="patrocinadores"><PatrocinadoresSection /></SectionAnchor>
      <SectionAnchor id="rodape" className="min-h-0"><FooterSection /></SectionAnchor>
    </>
  );
}
```

(The `agenda` anchor with `<AgendaSection />` is gone. The `agenda` import is gone. The `clipes` anchor is new. The `calendario` anchor replaces `agenda`.)

- [ ] **Step 3: Update section number copy in `src/sections/ManifestoSection.tsx`**

The Manifesto's leading paragraph currently reads `▌SEÇÃO 06 · COMUNICADO À NAÇÃO`. Change it to:

```tsx
<p className="font-mono text-[10px] tracking-[0.3em] text-[color:var(--color-magenta-neon)]">
  ▌SEÇÃO 07 · COMUNICADO À NAÇÃO
</p>
```

(Only the number changes: `06` → `07`. Everything else in the file stays the same.)

- [ ] **Step 4: Update section number copy in `src/sections/PatrocinadoresSection.tsx`**

Change `▌SEÇÃO 07 · PARCEIROS COMERCIAIS` to:

```tsx
<p className="font-mono text-[10px] tracking-[0.3em] text-[color:var(--color-cyan-neon)]">
  ▌SEÇÃO 08 · PARCEIROS COMERCIAIS
</p>
```

(Only `07` → `08`.)

- [ ] **Step 5: Delete `src/sections/AgendaSection.tsx`**

```bash
git rm src/sections/AgendaSection.tsx
```

(`git rm` removes from disk AND stages the deletion in one step.)

- [ ] **Step 6: Build verify**

```bash
npm run build
```

Expected: clean. The deleted `AgendaSection` is no longer imported anywhere (Task 7 step 2 removed the import + usage), so TS shouldn't complain.

- [ ] **Step 7: Dev verify**

```bash
npm run dev
```

(Background.) Confirm clean boot. Stop server.

- [ ] **Step 8: Commit + push**

```bash
git add src/components/NavBar.tsx src/App.tsx src/sections/ManifestoSection.tsx src/sections/PatrocinadoresSection.tsx
git commit -m "feat: integrate Clipes + Calendario sections; remove Agenda; update nav and section numbers"
git push
```

(The `AgendaSection.tsx` deletion was already staged by `git rm` in Step 5, so it's part of this commit automatically.)

---

## Done

After Task 7, the live site has:
- Title "Vakeiro Lives — Portal Oficial"
- Custom CAM_01 SVG favicon
- 9 sections: Hero · LiveStatus · Dossiê · Conquistas · **Clipes** · **Calendário** · Manifesto · Patrocinadores · Rodapé
- 3 working Twitch clip embeds (with runtime parent detection — works in both `localhost` and Vercel domain)
- Single-month navigable calendar bounded between Sep 2024 and current month, 10 sample live days populated

**User-handled** (deferred):
- Vercel deploy / domain (user explicitly took this)
- Refining clip captions when content of each clip is known
- Populating real `LIVE_DAYS` entries as Vakeiro streams (or doesn't)

**Pendências conhecidas:**
- `lucide-react@1.11` lacks several common icons (e.g., `Github`, `ChevronLeft`); plan uses text symbols (`◂ ▸ ◢ ◣ ∎`) to avoid this entirely. If a Github logo is desired in the footer later, swap in a custom SVG inline.

**Possíveis evoluções futuras (fora deste escopo):**
- Auto-populate `LIVE_DAYS` from Twitch API VODs (would require backend / edge function for Client Secret)
- Year heatmap as alternative calendar view
- More than 3 clips with pagination
- Click-to-expand clip card (modal player)
