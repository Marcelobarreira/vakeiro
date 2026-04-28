import { HUDFrame } from '@/components/HUDFrame';
import { StatusBadge } from '@/components/StatusBadge';
import { useMemberInfo } from '@/hooks/useMemberInfo';
import { MEMBROS, type Membro } from '@/data/membros';

function MemberCard({ login, name, description }: Membro) {
  const { data } = useMemberInfo(login);

  return (
    <HUDFrame variant="cyan" className="flex flex-col items-center gap-4 text-center">
      <div className="relative w-28 h-28 border-2 border-[color:var(--color-cyan-neon)] overflow-hidden bg-black/40">
        {data?.avatar ? (
          <img
            src={data.avatar}
            alt={name}
            className="w-full h-full object-cover grayscale contrast-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-mono text-[10px] text-[color:var(--color-text-dim)]">
            CARREGANDO
          </div>
        )}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 30px rgba(0,240,255,0.3)' }}
        />
      </div>

      <div>
        <div className="font-display text-lg font-black tracking-wide">{name}</div>
        <a
          href={`https://www.twitch.tv/${login}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] text-[color:var(--color-cyan-neon)] hover:underline"
        >
          @{login}
        </a>
      </div>

      <StatusBadge online={data?.online ?? false} />

      <p className="font-ui text-sm text-white/85 leading-relaxed">
        <span className="font-mono text-[color:var(--color-cyan-neon)] mr-1">»</span>
        {description}
      </p>
    </HUDFrame>
  );
}

export function MembrosSection() {
  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.3em] text-[color:var(--color-magenta-neon)]">
        ▌SEÇÃO 06 · CÍRCULO INTERNO
      </p>
      <h2 className="font-display text-4xl md:text-5xl font-black mt-2">
        MEMBROS LENDÁRIOS
      </h2>
      <p className="font-mono text-xs text-[color:var(--color-text-dim)] mt-3 max-w-2xl">
        Núcleo permanente da audiência institucional. Presença comprovada em registros sucessivos.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        {MEMBROS.map((m) => (
          <MemberCard key={m.login} {...m} />
        ))}
      </div>
    </div>
  );
}
