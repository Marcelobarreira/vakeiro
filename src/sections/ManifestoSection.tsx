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
