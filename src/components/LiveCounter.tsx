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
