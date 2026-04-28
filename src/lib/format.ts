/**
 * Format minutes as "Xh Ym" (e.g. 280 -> "4h 40m"). Drops zero parts:
 *   - 60 -> "1h"
 *   - 35 -> "35m"
 *   - 0  -> "0m"
 */
export function formatHoursMinutes(mins: number): string {
  const safe = Math.max(0, Math.floor(mins));
  const h = Math.floor(safe / 60);
  const m = safe % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

/**
 * Sum airtime (durationMin) of entries within the last N days from `today`.
 * `today` is included; the cutoff is `today - days` (exclusive).
 */
export function sumAirtimeLastNDays(
  entries: { date: string; durationMin: number }[],
  today: Date,
  days: number,
): number {
  const cutoff = new Date(today);
  cutoff.setHours(0, 0, 0, 0);
  cutoff.setDate(cutoff.getDate() - days);
  const cutoffMs = cutoff.getTime();
  return entries.reduce((sum, e) => {
    const t = new Date(e.date).getTime();
    return t >= cutoffMs ? sum + e.durationMin : sum;
  }, 0);
}
