import { HUDFrame } from '@/components/HUDFrame';
import { DOSSIE } from '@/data/dossie';

export function DossieSection() {
  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.3em] text-[color:var(--color-cyan-neon)]">
        ▌SEÇÃO 03 · {DOSSIE.classification}
      </p>

      <div className="mt-8 max-w-3xl border-l-2 border-[color:var(--color-magenta-neon)] pl-6 py-2">
        <p className="font-mono text-[10px] tracking-[0.3em] text-[color:var(--color-magenta-neon)]">
          ▌ {DOSSIE.personalQuote.label}
        </p>
        <blockquote className="mt-4 font-display text-2xl md:text-4xl font-black leading-tight">
          “{DOSSIE.personalQuote.text}
          <br />
          <span className="text-[color:var(--color-cyan-neon)]">
            {DOSSIE.personalQuote.highlight}
          </span>
          ”
        </blockquote>
        <p className="mt-3 font-mono text-xs text-[color:var(--color-text-dim)]">
          {DOSSIE.personalQuote.attribution}
        </p>
      </div>

      <h2 className="font-display text-4xl md:text-5xl font-black mt-12">
        {DOSSIE.title}
      </h2>

      <HUDFrame variant="mixed" className="mt-10 max-w-3xl">
        <div className="space-y-5 leading-relaxed text-white/90">
          {DOSSIE.paragraphs.map((p, i) => (
            <p key={i} className="font-ui">
              <span className="font-mono text-[color:var(--color-cyan-neon)] mr-2">
                »
              </span>
              {p}
            </p>
          ))}
        </div>
      </HUDFrame>
    </div>
  );
}
