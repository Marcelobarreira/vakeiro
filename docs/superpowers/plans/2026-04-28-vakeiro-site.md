# Vakeiro Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a parody fan site for streamer Euler Vakeiro — single-page, cyberpunk HUD aesthetic, with real-time data from Decapi.me and satirical hardcoded content.

**Architecture:** Vite + React 18 + TypeScript SPA, Tailwind v4 for styling, framer-motion for entrance animations, SWR polling Decapi (no auth, client-side) for live data. Single page with 8 anchored sections. Deploy to Vercel via GitHub auto-deploy on `main`.

**Tech Stack:** Vite · React 18 · TypeScript · Tailwind CSS v4 · framer-motion 11 · lucide-react · @fontsource (Orbitron, Chakra Petch, JetBrains Mono) · SWR · Decapi.me

**Spec:** [`docs/superpowers/specs/2026-04-28-vakeiro-site-design.md`](../specs/2026-04-28-vakeiro-site-design.md)

**Repo:** [github.com/Marcelobarreira/vakeiro](https://github.com/Marcelobarreira/vakeiro)

**Project root:** `E:\APPS\Vakeiro-Site\`

**Conventions:**
- All bash commands assume cwd is project root.
- Each task ends with **commit + push** so Vercel previews update progressively (after Task 15 connects Vercel).
- Per spec, no automated tests. Verification = TypeScript strict (`npm run build`) + manual browser smoke check.
- Commit messages: conventional commits in English (e.g. `feat: add HUDFrame component`). Site copy stays PT-BR.

---

## Task 1: Project setup, dependencies, repo init & first push

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `.gitignore`, `README.md`

- [x] **Step 1: Scaffold Vite project** (use printf "y\n" pipe or `--force` flag — DO NOT use `--overwrite` unless you know the dir is empty, since it deletes pre-existing files like `docs/`)
- [x] **Step 2: Install scaffold deps** (`npm install`)
- [x] **Step 3: Install project libs** (`npm install tailwindcss @tailwindcss/vite framer-motion lucide-react swr @fontsource/orbitron @fontsource/chakra-petch @fontsource/jetbrains-mono`)
- [x] **Step 4: Append `.superpowers/` to `.gitignore`** (preserve Vite defaults)
- [x] **Step 5: Replace README.md with project intro**
- [x] **Step 6: git init, set remote `https://github.com/Marcelobarreira/vakeiro.git`, branch main, first commit, push -u**
- [x] **Step 7: Verify `npm run dev` boots cleanly**

**Status:** ✅ Implemented (commit a0e07b6 + recovery commit for `docs/`).

---

## Task 2: Configure Tailwind v4 + theme tokens + global styles

**Files:**
- Modify: `vite.config.ts`
- Replace: `src/index.css`

- [ ] **Step 1: Wire Tailwind plugin in `vite.config.ts`**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

- [ ] **Step 2: Add `@/*` path alias in `tsconfig.json`** (or `tsconfig.app.json` if Vite split it)

```json
"baseUrl": ".",
"paths": {
  "@/*": ["src/*"]
}
```

- [ ] **Step 3: Replace `src/index.css`**

```css
@import "tailwindcss";

@import "@fontsource/orbitron/700.css";
@import "@fontsource/orbitron/900.css";
@import "@fontsource/chakra-petch/700.css";
@import "@fontsource/jetbrains-mono/400.css";
@import "@fontsource/jetbrains-mono/700.css";

@theme {
  --color-bg: #08000f;
  --color-cyan-neon: #00f0ff;
  --color-magenta-neon: #ff006e;
  --color-text-dim: #9aa3c7;

  --font-display: "Orbitron", sans-serif;
  --font-ui: "Chakra Petch", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}

html, body, #root {
  background: var(--color-bg);
  color: #ffffff;
  font-family: var(--font-ui);
  min-height: 100vh;
}

body {
  font-feature-settings: "ss01" on;
  overflow-x: hidden;
}

::selection {
  background: var(--color-magenta-neon);
  color: #000;
}
```

- [ ] **Step 4: Replace `src/App.tsx` with bare shell**

```tsx
export default function App() {
  return (
    <main className="min-h-screen px-8 py-12">
      <h1 className="font-display text-6xl font-black tracking-tight">VAKEIRO</h1>
      <p className="font-mono text-sm text-[color:var(--color-cyan-neon)] mt-2">
        ▌SYSTEM ONLINE
      </p>
    </main>
  );
}
```

- [ ] **Step 5: Verify build + dev**

```bash
npm run build && npm run dev
```

Open `http://localhost:5173` — should see "VAKEIRO" in big Orbitron type, dark `#08000f` background, ciano label below.

- [ ] **Step 6: Commit + push**

```bash
git add .
git commit -m "feat: configure Tailwind v4, theme tokens, and global typography"
git push
```

---

## Task 3: Decapi client library

**Files:**
- Create: `src/lib/decapi.ts`

- [ ] **Step 1: Create the Decapi client**

```ts
const BASE = 'https://decapi.me/twitch';
const USER = 'vakeiroo';

export class DecapiError extends Error {}

async function fetchText(endpoint: string): Promise<string> {
  const res = await fetch(`${BASE}/${endpoint}/${USER}`, {
    headers: { Accept: 'text/plain' },
  });
  if (!res.ok) throw new DecapiError(`HTTP ${res.status} on ${endpoint}`);
  return (await res.text()).trim();
}

export async function getAvatar(): Promise<string> {
  return fetchText('avatar');
}

export interface UptimeResult {
  online: boolean;
  uptime: string | null;
}

export async function getUptime(): Promise<UptimeResult> {
  const text = await fetchText('uptime');
  const offline = /offline|not.*live|nunca/i.test(text);
  return { online: !offline, uptime: offline ? null : text };
}

export async function getFollowers(): Promise<number> {
  const text = await fetchText('followcount');
  const n = parseInt(text.replace(/\D/g, ''), 10);
  return Number.isFinite(n) ? n : 0;
}

export async function getTitle(): Promise<string> {
  return fetchText('title');
}

export async function getLastGame(): Promise<string> {
  return fetchText('lastgame');
}

/**
 * Decapi may not expose `last_stream` for all channels.
 * If the endpoint fails or returns an error string, callers fall back
 * to a hardcoded ISO date in `data/conquistas.ts`.
 */
export async function getLastStreamDate(): Promise<string | null> {
  try {
    const text = await fetchText('last_stream');
    if (/error|not\s*found|nunca/i.test(text)) return null;
    return text;
  } catch {
    return null;
  }
}
```

- [ ] **Step 2: Smoke test Decapi**

In browser DevTools console (any tab):

```js
fetch('https://decapi.me/twitch/uptime/vakeiroo').then(r => r.text()).then(console.log);
```

Expected: a string like `vakeiroo is offline` (or live duration if live).

- [ ] **Step 3: Commit + push**

```bash
git add src/lib/decapi.ts
git commit -m "feat: add Decapi client with parsed uptime/followers/avatar/title"
git push
```

---

## Task 4: SWR hooks for Decapi

**Files:**
- Create: `src/hooks/useAvatar.ts`, `src/hooks/useUptime.ts`, `src/hooks/useFollowers.ts`, `src/hooks/useStreamInfo.ts`, `src/hooks/useLastStream.ts`

- [ ] **Step 1: `useAvatar.ts`**

```ts
import useSWR from 'swr';
import { getAvatar } from '@/lib/decapi';

export function useAvatar() {
  return useSWR('decapi:avatar', getAvatar, {
    refreshInterval: 30 * 60 * 1000,
    revalidateOnFocus: false,
  });
}
```

- [ ] **Step 2: `useUptime.ts`**

```ts
import useSWR from 'swr';
import { getUptime } from '@/lib/decapi';

export function useUptime() {
  return useSWR('decapi:uptime', getUptime, {
    refreshInterval: 60 * 1000,
    revalidateOnFocus: false,
  });
}
```

- [ ] **Step 3: `useFollowers.ts`**

```ts
import useSWR from 'swr';
import { getFollowers } from '@/lib/decapi';

export function useFollowers() {
  return useSWR('decapi:followers', getFollowers, {
    refreshInterval: 5 * 60 * 1000,
    revalidateOnFocus: false,
  });
}
```

- [ ] **Step 4: `useStreamInfo.ts`**

```ts
import useSWR from 'swr';
import { getTitle, getLastGame } from '@/lib/decapi';

export function useStreamInfo() {
  return useSWR(
    'decapi:streamInfo',
    async () => {
      const [title, lastGame] = await Promise.all([getTitle(), getLastGame()]);
      return { title, lastGame };
    },
    { refreshInterval: 5 * 60 * 1000, revalidateOnFocus: false }
  );
}
```

- [ ] **Step 5: `useLastStream.ts`**

```ts
import useSWR from 'swr';
import { getLastStreamDate } from '@/lib/decapi';

export function useLastStream() {
  return useSWR('decapi:lastStream', getLastStreamDate, {
    refreshInterval: 5 * 60 * 1000,
    revalidateOnFocus: false,
  });
}
```

- [ ] **Step 6: Type-check**

```bash
npm run build
```

- [ ] **Step 7: Commit + push**

```bash
git add src/hooks/
git commit -m "feat: add SWR hooks for Decapi (avatar, uptime, followers, streamInfo, lastStream)"
git push
```

---

## Task 5: Visual primitives — HUDFrame, GlitchTitle, ScanlineOverlay

**Files:**
- Create: `src/components/HUDFrame.tsx`, `src/components/GlitchTitle.tsx`, `src/components/ScanlineOverlay.tsx`

- [ ] **Step 1: `HUDFrame.tsx`**

```tsx
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

type Variant = 'cyan' | 'magenta' | 'mixed';

interface Props {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

const colorMap = {
  cyan: { tl: 'border-[color:var(--color-cyan-neon)]', tr: 'border-[color:var(--color-cyan-neon)]', bl: 'border-[color:var(--color-cyan-neon)]', br: 'border-[color:var(--color-cyan-neon)]' },
  magenta: { tl: 'border-[color:var(--color-magenta-neon)]', tr: 'border-[color:var(--color-magenta-neon)]', bl: 'border-[color:var(--color-magenta-neon)]', br: 'border-[color:var(--color-magenta-neon)]' },
  mixed: { tl: 'border-[color:var(--color-cyan-neon)]', tr: 'border-[color:var(--color-magenta-neon)]', bl: 'border-[color:var(--color-magenta-neon)]', br: 'border-[color:var(--color-cyan-neon)]' },
};

export function HUDFrame({ children, variant = 'cyan', className = '' }: Props) {
  const c = colorMap[variant];
  return (
    <div className={`relative border border-white/10 bg-black/30 p-6 ${className}`}>
      <Corner pos="tl" cls={c.tl} />
      <Corner pos="tr" cls={c.tr} />
      <Corner pos="bl" cls={c.bl} />
      <Corner pos="br" cls={c.br} />
      {children}
    </div>
  );
}

function Corner({ pos, cls }: { pos: 'tl' | 'tr' | 'bl' | 'br'; cls: string }) {
  const base = 'absolute w-4 h-4 pointer-events-none';
  const sides: Record<typeof pos, string> = {
    tl: `${base} top-1 left-1 border-t-2 border-l-2`,
    tr: `${base} top-1 right-1 border-t-2 border-r-2`,
    bl: `${base} bottom-1 left-1 border-b-2 border-l-2`,
    br: `${base} bottom-1 right-1 border-b-2 border-r-2`,
  };
  return (
    <motion.div
      className={`${sides[pos]} ${cls}`}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.05 }}
      viewport={{ once: true }}
    />
  );
}
```

- [ ] **Step 2: `GlitchTitle.tsx`**

```tsx
interface Props {
  text: string;
  className?: string;
}

export function GlitchTitle({ text, className = '' }: Props) {
  return (
    <span
      className={`relative inline-block font-display font-black tracking-tight ${className}`}
      style={{ textShadow: '2px 0 var(--color-magenta-neon), -2px 0 var(--color-cyan-neon)' }}
    >
      {text}
    </span>
  );
}
```

- [ ] **Step 3: `ScanlineOverlay.tsx`**

```tsx
export function ScanlineOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60]"
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, rgba(0,240,255,0.04) 0, rgba(0,240,255,0.04) 1px, transparent 1px, transparent 3px)',
      }}
    />
  );
}
```

- [ ] **Step 4: Smoke render in `App.tsx`**

```tsx
import { HUDFrame } from '@/components/HUDFrame';
import { GlitchTitle } from '@/components/GlitchTitle';
import { ScanlineOverlay } from '@/components/ScanlineOverlay';

export default function App() {
  return (
    <>
      <ScanlineOverlay />
      <main className="min-h-screen px-8 py-12 max-w-5xl mx-auto">
        <GlitchTitle text="VAKEIRO" className="text-7xl" />
        <p className="font-mono text-sm text-[color:var(--color-cyan-neon)] mt-2">
          ▌SYSTEM ONLINE · ID_0xVAK
        </p>
        <div className="mt-12 grid grid-cols-2 gap-6">
          <HUDFrame variant="cyan">
            <p className="font-mono text-xs uppercase tracking-widest text-[color:var(--color-cyan-neon)]">
              Frame ciano
            </p>
            <p className="mt-2 font-display text-3xl">07</p>
          </HUDFrame>
          <HUDFrame variant="mixed">
            <p className="font-mono text-xs uppercase tracking-widest text-[color:var(--color-magenta-neon)]">
              Frame mixed
            </p>
            <p className="mt-2 font-display text-3xl">82h</p>
          </HUDFrame>
        </div>
      </main>
    </>
  );
}
```

- [ ] **Step 5: Verify visually**

`npm run dev`, confirm: glitch RGB no título, 2 frames com cantos angulares neon, scanlines sutis, fade-in scale dos cantos no primeiro render.

- [ ] **Step 6: Commit + push**

```bash
git add src/components/ src/App.tsx
git commit -m "feat: add HUDFrame, GlitchTitle, and ScanlineOverlay primitives"
git push
```

---

## Task 6: Stat primitives — StatCard, StatusBadge, LiveCounter

**Files:**
- Create: `src/components/StatCard.tsx`, `src/components/StatusBadge.tsx`, `src/components/LiveCounter.tsx`

- [ ] **Step 1: `StatCard.tsx`**

```tsx
import type { ReactNode } from 'react';
import { HUDFrame } from './HUDFrame';

interface Props {
  label: string;
  value: ReactNode;
  unit?: string;
  loading?: boolean;
  error?: boolean;
  variant?: 'cyan' | 'magenta' | 'mixed';
}

export function StatCard({ label, value, unit, loading, error, variant = 'cyan' }: Props) {
  return (
    <HUDFrame variant={variant} className="min-h-[120px]">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-text-dim)]">
        ▌ {label}
      </p>
      <div className="mt-3 flex items-baseline gap-2">
        {loading ? (
          <span className="font-display text-3xl text-[color:var(--color-text-dim)]">--</span>
        ) : error ? (
          <span className="font-mono text-sm text-[color:var(--color-magenta-neon)]">
            DADOS CLASSIFICADOS
          </span>
        ) : (
          <>
            <span className="font-display text-4xl font-black">{value}</span>
            {unit && <span className="font-mono text-xs text-[color:var(--color-text-dim)]">{unit}</span>}
          </>
        )}
      </div>
    </HUDFrame>
  );
}
```

- [ ] **Step 2: `StatusBadge.tsx`**

```tsx
interface Props {
  online: boolean;
}

export function StatusBadge({ online }: Props) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
      <span
        className={`inline-block h-2 w-2 rounded-full ${
          online ? 'bg-[color:var(--color-cyan-neon)] animate-pulse' : 'bg-[color:var(--color-magenta-neon)]'
        }`}
      />
      {online ? 'AO VIVO' : 'OFFLINE'}
    </span>
  );
}
```

- [ ] **Step 3: `LiveCounter.tsx`**

```tsx
import { useEffect, useState } from 'react';

interface Props {
  fromIso: string | null;
  fallbackHours?: number;
}

function formatDelta(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${String(d).padStart(2, '0')}d ${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
}

export function LiveCounter({ fromIso, fallbackHours = 78 }: Props) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') tick();
    }, 1000);
    document.addEventListener('visibilitychange', tick);
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', tick);
    };
  }, []);

  const start = fromIso ? new Date(fromIso).getTime() : Date.now() - fallbackHours * 3600 * 1000;
  const delta = Math.max(0, now - start);
  return <span className="font-mono tabular-nums">{formatDelta(delta)}</span>;
}
```

- [ ] **Step 4: Smoke render**

```tsx
// src/App.tsx
import { ScanlineOverlay } from '@/components/ScanlineOverlay';
import { GlitchTitle } from '@/components/GlitchTitle';
import { StatCard } from '@/components/StatCard';
import { StatusBadge } from '@/components/StatusBadge';
import { LiveCounter } from '@/components/LiveCounter';

export default function App() {
  return (
    <>
      <ScanlineOverlay />
      <main className="min-h-screen px-8 py-12 max-w-5xl mx-auto">
        <GlitchTitle text="VAKEIRO" className="text-7xl" />
        <div className="mt-3"><StatusBadge online={false} /></div>
        <div className="mt-12 grid grid-cols-2 gap-6">
          <StatCard label="Tempo desde a última live" value={<LiveCounter fromIso={null} />} variant="cyan" />
          <StatCard label="Média de viewers" value="07" variant="mixed" />
          <StatCard label="Lives esta semana" value="2" unit="/ meta 7" variant="magenta" />
          <StatCard label="Status" value="OFFLINE" variant="cyan" />
        </div>
      </main>
    </>
  );
}
```

- [ ] **Step 5: Verify** — 4 stat cards, contador rolando segundo a segundo, status badge rosa.

- [ ] **Step 6: Commit + push**

```bash
git add src/components/ src/App.tsx
git commit -m "feat: add StatCard, StatusBadge, and LiveCounter components"
git push
```

---

## Task 7: Layout — NavBar + SectionAnchor + App skeleton

**Files:**
- Create: `src/components/NavBar.tsx`, `src/components/SectionAnchor.tsx`
- Replace: `src/App.tsx`

- [ ] **Step 1: `SectionAnchor.tsx`**

```tsx
import type { ReactNode } from 'react';

interface Props {
  id: string;
  children: ReactNode;
  className?: string;
}

export function SectionAnchor({ id, children, className = '' }: Props) {
  return (
    <section id={id} className={`min-h-[80vh] px-6 py-20 md:px-12 ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}
```

- [ ] **Step 2: `NavBar.tsx`**

```tsx
const LINKS = [
  { id: 'hero', label: 'IDENT' },
  { id: 'live', label: 'LIVE STATUS' },
  { id: 'dossie', label: 'DOSSIÊ' },
  { id: 'conquistas', label: 'CONQUISTAS' },
  { id: 'agenda', label: 'AGENDA' },
  { id: 'manifesto', label: 'MANIFESTO' },
  { id: 'patrocinadores', label: 'SPONSORS' },
  { id: 'rodape', label: '∎' },
];

export function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[color:var(--color-bg)]/80 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <a href="#hero" className="font-display font-black text-sm tracking-widest">
          ◢ VAKEIRO ◣
        </a>
        <ul className="hidden md:flex gap-5 font-mono text-[10px] uppercase tracking-widest">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className="text-[color:var(--color-text-dim)] hover:text-[color:var(--color-cyan-neon)] transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
```

- [ ] **Step 3: Add smooth scroll** — append to `src/index.css`:

```css
html {
  scroll-behavior: smooth;
}
```

- [ ] **Step 4: Update `App.tsx`**

```tsx
import { NavBar } from '@/components/NavBar';
import { ScanlineOverlay } from '@/components/ScanlineOverlay';
import { SectionAnchor } from '@/components/SectionAnchor';
import { GlitchTitle } from '@/components/GlitchTitle';

export default function App() {
  return (
    <>
      <ScanlineOverlay />
      <NavBar />
      <SectionAnchor id="hero" className="pt-32">
        <GlitchTitle text="VAKEIRO" className="text-7xl md:text-9xl" />
        <p className="font-mono text-sm text-[color:var(--color-cyan-neon)] mt-3">
          ▌ID_0xVAK · STREAMER · TWITCH BR
        </p>
      </SectionAnchor>
      <SectionAnchor id="live"><h2 className="font-display text-4xl">LIVE STATUS</h2></SectionAnchor>
      <SectionAnchor id="dossie"><h2 className="font-display text-4xl">DOSSIÊ</h2></SectionAnchor>
      <SectionAnchor id="conquistas"><h2 className="font-display text-4xl">CONQUISTAS</h2></SectionAnchor>
      <SectionAnchor id="agenda"><h2 className="font-display text-4xl">AGENDA</h2></SectionAnchor>
      <SectionAnchor id="manifesto"><h2 className="font-display text-4xl">MANIFESTO</h2></SectionAnchor>
      <SectionAnchor id="patrocinadores"><h2 className="font-display text-4xl">PATROCINADORES</h2></SectionAnchor>
      <SectionAnchor id="rodape"><h2 className="font-display text-4xl">∎</h2></SectionAnchor>
    </>
  );
}
```

- [ ] **Step 5: Verify** — nav fixa, links rolam suave, hover muda pra ciano.

- [ ] **Step 6: Commit + push**

```bash
git add src/
git commit -m "feat: add NavBar, SectionAnchor, and 8-section App skeleton"
git push
```

---

## Task 8: Static data files

**Files:**
- Create: `src/data/dossie.ts`, `src/data/conquistas.ts`, `src/data/manifesto.ts`, `src/data/patrocinadores.ts`

- [ ] **Step 1: `dossie.ts`**

```ts
export const DOSSIE = {
  classification: 'ARQUIVO #0xVAK · ACESSO LIBERADO',
  title: 'PERFIL: SUJEITO VAKEIRO',
  paragraphs: [
    'Sujeito identificado em 2021 por algoritmos de detecção de potencial latente. Adotou o pseudônimo VAKEIRO ao constatar que o império não nasce no rebanho.',
    'Pioneiro ausente. Visionário recluso. Streamer nas horas que sobram do descanso.',
    'Ao escolher a Twitch como veículo de manifestação, dispensou os caminhos previsíveis: dedicação contínua, agenda fixa, busca por audiência. Optou pela via mais difícil — esperar o reconhecimento chegar.',
    'Estima-se que sua influência sobre o cenário ainda não foi devidamente mensurada por instrumentos convencionais.',
  ],
};
```

- [ ] **Step 2: `conquistas.ts`**

```ts
export interface Conquista {
  period: string;
  text: string;
}

export const CONQUISTAS: Conquista[] = [
  { period: '2024 · Q3', text: 'Quebra recorde pessoal: 11 viewers simultâneos durante 4min32s' },
  { period: '2024 · Q4', text: 'Primeira live de 30 minutos consecutivos sem AFK confirmado' },
  { period: '2025 · Q1', text: 'Atinge 50 followers — marco lendário' },
  { period: '2025 · Q2', text: 'Permanece 42 dias offline — recorde institucional' },
  { period: '2025 · Q3', text: 'Inaugura formato "live anunciada → cancelada 3min antes"' },
  { period: '2026 · Q1', text: 'Desafia limites: 3 lives na mesma semana (não repetido desde)' },
];

export const LIVES_THIS_WEEK = 2;
export const META_LIVES_PER_WEEK = 7;

// Fallback ISO date for "tempo desde a última live" when Decapi doesn't expose it.
// Update on commits to keep the joke fresh.
export const LAST_STREAM_FALLBACK = '2026-04-25T22:14:00-03:00';
```

- [ ] **Step 3: `manifesto.ts`**

```ts
export const MANIFESTO = {
  heading: 'AOS CIDADÃOS DA TWITCH BR',
  lines: [
    'Não venho prometer lives diárias.',
    'Não venho competir por viewers.',
    'Não venho sequer manter horário.',
    '',
    'Venho — quando me convém — abrir transmissão.',
    'E aos sete que aparecem, ofereço o privilégio de presenciar.',
    '',
    'Que os outros rebolem por engagement.',
    'Vakeiro, simplesmente, é.',
  ],
  signature: '— EV, século XXI',
};
```

- [ ] **Step 4: `patrocinadores.ts`**

```ts
export const PATROCINADORES_SLOT_COUNT = 6;
export const PATROCINADORES_CONTACT = 'vakeiro@nada.com.br';
```

- [ ] **Step 5: Type-check**

```bash
npm run build
```

- [ ] **Step 6: Commit + push**

```bash
git add src/data/
git commit -m "feat: add static content data files (dossie, conquistas, manifesto, patrocinadores)"
git push
```

---

## Task 9: HeroSection — wires up live data

**Files:**
- Create: `src/sections/HeroSection.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: `HeroSection.tsx`**

```tsx
import { GlitchTitle } from '@/components/GlitchTitle';
import { StatusBadge } from '@/components/StatusBadge';
import { useAvatar } from '@/hooks/useAvatar';
import { useUptime } from '@/hooks/useUptime';
import { ExternalLink } from 'lucide-react';

export function HeroSection() {
  const { data: avatar } = useAvatar();
  const { data: uptime } = useUptime();
  const online = uptime?.online ?? false;

  return (
    <div className="pt-12 grid md:grid-cols-[1fr_auto] gap-12 items-center">
      <div>
        <p className="font-mono text-[10px] tracking-[0.3em] text-[color:var(--color-cyan-neon)]">
          ▌ACESSO LIBERADO · PROTOCOLO 0xVAK
        </p>
        <GlitchTitle text="VAKEIRO" className="block text-7xl md:text-[10rem] mt-4 leading-none" />
        <p className="font-mono text-sm text-[color:var(--color-text-dim)] mt-4">
          ID_0xVAK · STREAMER · TWITCH BR
        </p>
        <div className="mt-6 flex items-center gap-6">
          <StatusBadge online={online} />
          <a
            href="https://www.twitch.tv/vakeiroo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[color:var(--color-cyan-neon)] px-4 py-2 font-mono text-xs uppercase tracking-widest hover:bg-[color:var(--color-cyan-neon)] hover:text-black transition-colors"
          >
            [ ACESSAR TRANSMISSÃO ] <ExternalLink size={14} />
          </a>
        </div>
      </div>
      {avatar && (
        <div className="relative w-48 h-48 md:w-64 md:h-64 border-2 border-[color:var(--color-cyan-neon)]">
          <img src={avatar} alt="vakeiroo" className="w-full h-full object-cover grayscale contrast-110" />
          <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 60px rgba(0,240,255,0.3)' }} />
          <span className="absolute bottom-2 left-2 font-mono text-[10px] text-[color:var(--color-cyan-neon)] bg-black/60 px-2 py-1">
            CAM_01 · LIVE FEED
          </span>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Wire into `App.tsx`** — replace hero `SectionAnchor` body with `<HeroSection />`. Add import.

- [ ] **Step 3: Verify** — avatar carrega, glitch title enorme, status badge, CTA hover invertendo cor.

- [ ] **Step 4: Commit + push**

```bash
git add src/
git commit -m "feat: implement HeroSection with live avatar and status from Decapi"
git push
```

---

## Task 10: LiveStatusSection — the centerpiece

**Files:**
- Create: `src/sections/LiveStatusSection.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: `LiveStatusSection.tsx`**

```tsx
import { StatCard } from '@/components/StatCard';
import { LiveCounter } from '@/components/LiveCounter';
import { useUptime } from '@/hooks/useUptime';
import { useLastStream } from '@/hooks/useLastStream';
import { useStreamInfo } from '@/hooks/useStreamInfo';
import { LAST_STREAM_FALLBACK, LIVES_THIS_WEEK, META_LIVES_PER_WEEK } from '@/data/conquistas';

export function LiveStatusSection() {
  const { data: uptime, isLoading: uptimeLoading, error: uptimeError } = useUptime();
  const { data: lastStream } = useLastStream();
  const { data: streamInfo } = useStreamInfo();

  const online = uptime?.online ?? false;
  const fromIso = lastStream ?? LAST_STREAM_FALLBACK;
  const progressPct = (LIVES_THIS_WEEK / META_LIVES_PER_WEEK) * 100;

  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.3em] text-[color:var(--color-magenta-neon)]">
        ▌SEÇÃO 02 · MONITORAMENTO EM TEMPO REAL
      </p>
      <h2 className="font-display text-4xl md:text-5xl font-black mt-2">LIVE STATUS</h2>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          label="Tempo desde a última live"
          value={online ? <span className="text-[color:var(--color-cyan-neon)]">AO VIVO AGORA</span> : <LiveCounter fromIso={fromIso} />}
          variant="cyan"
          loading={uptimeLoading}
          error={!!uptimeError}
        />
        <StatCard
          label="Média de viewers"
          value="07"
          unit="(estimado)"
          variant="magenta"
        />
        <StatCard
          label="Lives esta semana"
          value={
            <span>
              {LIVES_THIS_WEEK} <span className="text-[color:var(--color-text-dim)] text-xl">/ meta {META_LIVES_PER_WEEK}</span>
            </span>
          }
          variant="mixed"
        />
        <StatCard
          label="Status do imperador"
          value={
            online ? (
              <span className="text-[color:var(--color-cyan-neon)]">AO VIVO</span>
            ) : (
              <span className="text-[color:var(--color-magenta-neon)]">DORMINDO</span>
            )
          }
          variant="cyan"
        />
      </div>

      <div className="mt-6">
        <div className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-text-dim)]">
          ▌meta semanal · progresso
        </div>
        <div className="mt-2 h-2 bg-white/10 relative">
          <div
            className="absolute inset-y-0 left-0 bg-[color:var(--color-magenta-neon)]"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {streamInfo && (
        <div className="mt-8 border-l-2 border-[color:var(--color-cyan-neon)] pl-4 font-mono text-xs">
          <div className="text-[color:var(--color-text-dim)] uppercase tracking-widest">
            ▌última stream
          </div>
          <div className="mt-1 text-white">{streamInfo.title || '(sem título)'}</div>
          <div className="mt-1 text-[color:var(--color-cyan-neon)]">
            jogo: {streamInfo.lastGame || '—'}
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Wire into `App.tsx`** — replace live `SectionAnchor` body with `<LiveStatusSection />`.

- [ ] **Step 3: Verify** — 4 painéis HUD em grid, contador rolando, barra rosa em ~28%, bloco "última stream".

- [ ] **Step 4: Commit + push**

```bash
git add src/
git commit -m "feat: implement LiveStatusSection with 4 HUD panels and real-time counter"
git push
```

---

## Task 11: DossieSection + ConquistasSection + AgendaSection

**Files:**
- Create: `src/sections/DossieSection.tsx`, `src/sections/ConquistasSection.tsx`, `src/sections/AgendaSection.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: `DossieSection.tsx`**

```tsx
import { HUDFrame } from '@/components/HUDFrame';
import { DOSSIE } from '@/data/dossie';

export function DossieSection() {
  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.3em] text-[color:var(--color-cyan-neon)]">
        ▌SEÇÃO 03 · {DOSSIE.classification}
      </p>
      <h2 className="font-display text-4xl md:text-5xl font-black mt-2">{DOSSIE.title}</h2>

      <HUDFrame variant="mixed" className="mt-10 max-w-3xl">
        <div className="space-y-5 leading-relaxed text-white/90">
          {DOSSIE.paragraphs.map((p, i) => (
            <p key={i} className="font-ui">
              <span className="font-mono text-[color:var(--color-cyan-neon)] mr-2">»</span>
              {p}
            </p>
          ))}
        </div>
      </HUDFrame>
    </div>
  );
}
```

- [ ] **Step 2: `ConquistasSection.tsx`**

```tsx
import { CONQUISTAS } from '@/data/conquistas';

export function ConquistasSection() {
  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.3em] text-[color:var(--color-magenta-neon)]">
        ▌SEÇÃO 04 · MARCOS HISTÓRICOS
      </p>
      <h2 className="font-display text-4xl md:text-5xl font-black mt-2">CONQUISTAS</h2>

      <ol className="mt-10 relative border-l-2 border-[color:var(--color-cyan-neon)]/40 pl-8 space-y-6 max-w-3xl">
        {CONQUISTAS.map((c, i) => (
          <li key={i} className="relative">
            <span
              aria-hidden
              className="absolute -left-[37px] top-2 w-3 h-3 rounded-full bg-[color:var(--color-cyan-neon)] shadow-[0_0_12px_var(--color-cyan-neon)]"
            />
            <div className="font-mono text-xs text-[color:var(--color-magenta-neon)] uppercase tracking-widest">
              {c.period}
            </div>
            <p className="mt-1 text-white/90">{c.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
```

- [ ] **Step 3: `AgendaSection.tsx`**

```tsx
import { HUDFrame } from '@/components/HUDFrame';

const DIAS = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];

interface SlotState {
  label: string;
  tone: 'off' | 'maybe' | 'on';
}

const WEEK: SlotState[] = [
  { label: 'SEM TRANSMISSÃO', tone: 'off' },
  { label: 'TBD: quando der', tone: 'maybe' },
  { label: 'SEM TRANSMISSÃO', tone: 'off' },
  { label: 'SEM TRANSMISSÃO', tone: 'off' },
  { label: '[REDACTED] · 22h', tone: 'on' },
  { label: 'SEM TRANSMISSÃO', tone: 'off' },
  { label: 'TBD: se acordar', tone: 'maybe' },
];

const TONE_COLOR: Record<SlotState['tone'], string> = {
  off: 'text-[color:var(--color-text-dim)]',
  maybe: 'text-[#ffe600]',
  on: 'text-[color:var(--color-cyan-neon)]',
};

export function AgendaSection() {
  // 0=Sun..6=Sat → adjust to Mon=0..Sun=6
  const todayIdx = (new Date().getDay() + 6) % 7;

  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.3em] text-[color:var(--color-cyan-neon)]">
        ▌SEÇÃO 05 · AGENDA OPERACIONAL
      </p>
      <h2 className="font-display text-4xl md:text-5xl font-black mt-2">SEMANA CORRENTE</h2>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {DIAS.map((d, i) => {
          const slot = WEEK[i];
          const isToday = i === todayIdx;
          return (
            <HUDFrame
              key={d}
              variant={isToday ? 'magenta' : 'cyan'}
              className={`min-h-[120px] ${isToday ? 'ring-1 ring-[color:var(--color-magenta-neon)]/60' : ''}`}
            >
              <div className="font-mono text-[10px] tracking-widest text-[color:var(--color-text-dim)]">
                {d} {isToday && <span className="text-[color:var(--color-magenta-neon)]">· HOJE</span>}
              </div>
              <p className={`mt-3 font-mono text-xs ${TONE_COLOR[slot.tone]}`}>{slot.label}</p>
            </HUDFrame>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Wire all 3 into `App.tsx`** — add imports + replace section bodies.

- [ ] **Step 5: Verify** — Dossiê em frame mixed com 4 parágrafos, Conquistas timeline com glow, Agenda 7 dias com hoje destacado.

- [ ] **Step 6: Commit + push**

```bash
git add src/
git commit -m "feat: implement Dossie, Conquistas, and Agenda sections"
git push
```

---

## Task 12: ManifestoSection + PatrocinadoresSection + FooterSection

**Files:**
- Create: `src/sections/ManifestoSection.tsx`, `src/sections/PatrocinadoresSection.tsx`, `src/sections/FooterSection.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: `ManifestoSection.tsx`**

```tsx
import { MANIFESTO } from '@/data/manifesto';

export function ManifestoSection() {
  return (
    <div className="text-center max-w-2xl mx-auto py-20">
      <p className="font-mono text-[10px] tracking-[0.3em] text-[color:var(--color-magenta-neon)]">
        ▌SEÇÃO 06 · COMUNICADO À NAÇÃO
      </p>
      <h2 className="font-display text-3xl md:text-4xl font-black mt-4 tracking-wide">
        {MANIFESTO.heading}
      </h2>
      <div className="mt-12 space-y-3 leading-loose font-ui text-lg md:text-xl">
        {MANIFESTO.lines.map((line, i) =>
          line === '' ? <div key={i} aria-hidden /> : <p key={i}>{line}</p>
        )}
      </div>
      <p className="mt-12 font-mono text-sm text-[color:var(--color-cyan-neon)]">
        {MANIFESTO.signature}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: `PatrocinadoresSection.tsx`**

```tsx
import { HUDFrame } from '@/components/HUDFrame';
import { PATROCINADORES_SLOT_COUNT, PATROCINADORES_CONTACT } from '@/data/patrocinadores';

export function PatrocinadoresSection() {
  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.3em] text-[color:var(--color-cyan-neon)]">
        ▌SEÇÃO 07 · PARCEIROS COMERCIAIS
      </p>
      <h2 className="font-display text-4xl md:text-5xl font-black mt-2">PATROCINADORES</h2>
      <p className="font-mono text-xs text-[color:var(--color-text-dim)] mt-3">
        Nenhum confirmado. Vagas abertas.
      </p>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-5">
        {Array.from({ length: PATROCINADORES_SLOT_COUNT }).map((_, i) => (
          <a
            key={i}
            href={`mailto:${PATROCINADORES_CONTACT}?subject=Proposta%20de%20patroc%C3%ADnio%20-%20VAKEIRO`}
            className="block group"
          >
            <HUDFrame variant="mixed" className="min-h-[140px] flex flex-col items-center justify-center text-center group-hover:bg-[color:var(--color-magenta-neon)]/5 transition-colors">
              <div className="font-mono text-[10px] tracking-[0.3em] text-[color:var(--color-magenta-neon)]">
                ▌ SLOT 0{i + 1}
              </div>
              <p className="mt-3 font-display text-lg">VAGA DISPONÍVEL</p>
              <p className="mt-1 font-mono text-[10px] text-[color:var(--color-text-dim)] break-all">
                {PATROCINADORES_CONTACT}
              </p>
            </HUDFrame>
          </a>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: `FooterSection.tsx`**

```tsx
import { Github } from 'lucide-react';

export function FooterSection() {
  return (
    <div className="text-center text-sm font-mono text-[color:var(--color-text-dim)] py-8">
      <p>
        Site não-oficial. Homenagem zoeira sem fins lucrativos. Imagens via Twitch.
      </p>
      <div className="mt-4 flex items-center justify-center gap-4">
        <a
          href="https://github.com/Marcelobarreira/vakeiro"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:text-[color:var(--color-cyan-neon)] transition-colors"
        >
          <Github size={14} /> github/vakeiro
        </a>
      </div>
      <p className="mt-6 text-[color:var(--color-magenta-neon)]">
        © REPÚBLICA TWITCHEANA · ANO ∞
      </p>
    </div>
  );
}
```

- [ ] **Step 4: Wire all 3 into `App.tsx`** (rodape `SectionAnchor` should use `className="min-h-0"` to avoid 80vh on the footer).

- [ ] **Step 5: Verify all 8 sections** — click each nav link, check render. Mobile (375px) — nada quebra.

- [ ] **Step 6: Commit + push**

```bash
git add src/
git commit -m "feat: implement Manifesto, Patrocinadores, and Footer sections"
git push
```

---

## Task 13: Polish — entrance animations + glitch flicker

**Files:**
- Modify: `src/components/SectionAnchor.tsx`, `src/components/GlitchTitle.tsx`

- [ ] **Step 1: Animate `SectionAnchor` reveal on scroll**

```tsx
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  id: string;
  children: ReactNode;
  className?: string;
}

export function SectionAnchor({ id, children, className = '' }: Props) {
  return (
    <section id={id} className={`min-h-[80vh] px-6 py-20 md:px-12 ${className}`}>
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Periodic glitch flicker on `GlitchTitle`**

```tsx
import { motion } from 'framer-motion';

interface Props {
  text: string;
  className?: string;
}

export function GlitchTitle({ text, className = '' }: Props) {
  return (
    <motion.span
      className={`relative inline-block font-display font-black tracking-tight ${className}`}
      animate={{
        textShadow: [
          '2px 0 var(--color-magenta-neon), -2px 0 var(--color-cyan-neon)',
          '4px 0 var(--color-magenta-neon), -4px 0 var(--color-cyan-neon)',
          '2px 0 var(--color-magenta-neon), -2px 0 var(--color-cyan-neon)',
          '0 0 var(--color-magenta-neon), 0 0 var(--color-cyan-neon)',
          '2px 0 var(--color-magenta-neon), -2px 0 var(--color-cyan-neon)',
        ],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        times: [0, 0.05, 0.1, 0.12, 1],
        ease: 'linear',
      }}
    >
      {text}
    </motion.span>
  );
}
```

- [ ] **Step 3: Verify** — fade-up por seção, glitch flicker no nome a cada ~4s.

- [ ] **Step 4: Commit + push**

```bash
git add src/
git commit -m "feat: add scroll reveal animations and periodic glitch flicker"
git push
```

---

## Task 14: Build + responsive smoke at 3 viewports

**Files:**
- Modify: `src/App.tsx` (small tweaks if needed)

- [ ] **Step 1: Run production build** (`npm run build`) — expect success, bundle under ~250kB gzip
- [ ] **Step 2: Preview** (`npm run preview`)
- [ ] **Step 3: DevTools test 375px / 768px / 1280px+** — confirm nothing horizontally overflows; if any does, add `overflow-x-hidden` to root or fix offending widths
- [ ] **Step 4: Commit any responsive tweaks (skip if nothing changed)**

```bash
git add src/
git commit -m "fix: responsive tweaks across breakpoints"
git push
```

---

## Task 15: Vercel deploy

- [ ] **Step 1: Create Vercel project via dashboard** — vercel.com/new → import `Marcelobarreira/vakeiro` → defaults
- [ ] **Step 2: Wait for first deploy** (1–2min)
- [ ] **Step 3: Smoke test prod URL** — site loads, Decapi calls work, 8 sections render, console clean
- [ ] **Step 4 (optional): Add `vercel.json` if SPA hash anchor deep-links break**

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

- [ ] **Step 5: Confirm push triggers auto-deploy**

---

## Done

Site live, repo limpo, deploy contínuo configurado.

**Pendências conhecidas (não bloqueantes):**
- `decapi.me/twitch/last_stream/{user}` may not exist — code falls back to hardcoded date silently
- "Média de viewers" e "Lives esta semana" são gags hardcoded; atualizar manualmente em commits

**Possíveis evoluções futuras (fora deste escopo):**
- Galeria de VODs (precisa Twitch API oficial + edge function)
- Som/SFX (cyberpunk beeps quando hover em elementos)
- Variante de tema "AO VIVO" (toda a UI muda quando ele estiver streamando)
- Easter eggs (clique 7x no avatar revela "modo viewer fiel")
