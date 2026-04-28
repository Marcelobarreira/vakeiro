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
