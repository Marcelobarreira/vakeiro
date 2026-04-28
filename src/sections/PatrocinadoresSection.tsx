import { HUDFrame } from '@/components/HUDFrame';
import { PATROCINADORES_SLOT_COUNT, PATROCINADORES_CONTACT } from '@/data/patrocinadores';

export function PatrocinadoresSection() {
  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.3em] text-[color:var(--color-cyan-neon)]">
        ▌SEÇÃO 09 · PARCEIROS COMERCIAIS
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
