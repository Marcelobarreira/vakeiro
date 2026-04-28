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
