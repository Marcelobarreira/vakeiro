export interface Conquista {
  period: string;
  text: string;
}

export const CONQUISTAS: Conquista[] = [
  { period: '2024 · Q3', text: 'Quebra recorde pessoal: 11 viewers simultâneos durante 4min32s' },
  { period: '2024 · Q4', text: 'Primeira live de 30 minutos consecutivos sem AFK confirmado' },
  { period: '2025 · Q1', text: 'Atinge 50 followers — marco lendário' },
  { period: '2025 · Q2', text: 'Permanece 42 dias offline — recorde institucional' },
  { period: '2025 · Q3', text: 'Inaugura formato "live anunciada → cancelada 3min antes"' },
  { period: '2026 · Q1', text: 'Desafia limites: 3 lives na mesma semana (não repetido desde)' },
];

export const LIVES_THIS_WEEK = 2;
export const META_LIVES_PER_WEEK = 7;

// Fallback ISO date for "tempo desde a última live" when Decapi doesn't expose it.
// Update on commits to keep the joke fresh.
export const LAST_STREAM_FALLBACK = '2026-04-25T22:14:00-03:00';
