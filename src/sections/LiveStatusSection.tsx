import { StatCard } from '@/components/StatCard';
import { LiveCounter } from '@/components/LiveCounter';
import { useUptime } from '@/hooks/useUptime';
import { useLastStream } from '@/hooks/useLastStream';
import { useStreamInfo } from '@/hooks/useStreamInfo';
import {
  LAST_STREAM_FALLBACK,
  LIVES_THIS_WEEK,
  META_LIVES_PER_WEEK,
} from '@/data/conquistas';
import { LIVE_DAYS } from '@/data/calendario';
import { formatHoursMinutes, sumAirtimeLastNDays } from '@/lib/format';

export function LiveStatusSection() {
  const { data: uptime, isLoading: uptimeLoading, error: uptimeError } = useUptime();
  const { data: lastStream } = useLastStream();
  const { data: streamInfo } = useStreamInfo();

  const online = uptime?.online ?? false;
  const fromIso = lastStream ?? LAST_STREAM_FALLBACK;
  const progressPct = (LIVES_THIS_WEEK / META_LIVES_PER_WEEK) * 100;

  const totalAirtime30dMin = sumAirtimeLastNDays(LIVE_DAYS, new Date(), 30);

  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.3em] text-[color:var(--color-magenta-neon)]">
        ▌SEÇÃO 02 · MONITORAMENTO EM TEMPO REAL
      </p>
      <h2 className="font-display text-4xl md:text-5xl font-black mt-2">LIVE STATUS</h2>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
        <StatCard
          label="Tempo desde a última live"
          value={
            online ? (
              <span className="text-[color:var(--color-cyan-neon)]">AO VIVO AGORA</span>
            ) : (
              <LiveCounter fromIso={fromIso} />
            )
          }
          variant="cyan"
          loading={uptimeLoading}
          error={!!uptimeError}
        />
        <StatCard
          label="Média de viewers"
          value="07"
          unit="(estimado)"
          variant="magenta"
        />
        <StatCard
          label="Tempo total transmitido"
          value={formatHoursMinutes(totalAirtime30dMin)}
          unit="(últ. 30d)"
          variant="cyan"
        />
        <StatCard
          label="Lives esta semana"
          value={
            <span>
              {LIVES_THIS_WEEK}{' '}
              <span className="text-[color:var(--color-text-dim)] text-xl">
                / meta {META_LIVES_PER_WEEK}
              </span>
            </span>
          }
          variant="mixed"
        />
        <StatCard
          label="Status do imperador"
          value={
            online ? (
              <span className="text-2xl text-[color:var(--color-cyan-neon)]">AO VIVO</span>
            ) : (
              <span className="text-2xl text-[color:var(--color-magenta-neon)]">DORMINDO</span>
            )
          }
          variant="cyan"
        />
      </div>

      <div className="mt-6">
        <div className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-text-dim)]">
          ▌meta semanal · progresso
        </div>
        <div className="mt-2 h-2 bg-white/10 relative">
          <div
            className="absolute inset-y-0 left-0 bg-[color:var(--color-magenta-neon)]"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {streamInfo && (
        <div className="mt-8 border-l-2 border-[color:var(--color-cyan-neon)] pl-4 font-mono text-xs">
          <div className="text-[color:var(--color-text-dim)] uppercase tracking-widest">
            ▌última stream
          </div>
          <div className="mt-1 text-white">{streamInfo.title || '(sem título)'}</div>
          <div className="mt-1 text-[color:var(--color-cyan-neon)]">
            jogo: {streamInfo.lastGame || '—'}
          </div>
        </div>
      )}
    </div>
  );
}
