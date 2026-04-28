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

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
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
