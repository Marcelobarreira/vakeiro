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
