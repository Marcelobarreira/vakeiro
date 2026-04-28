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
