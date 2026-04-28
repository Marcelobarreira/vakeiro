export interface Conquista {
  period: string;
  text: string;
}

export const CONQUISTAS: Conquista[] = [
  {
    period: '2024 · OUT 31',
    text: 'Pico histórico de 592 viewers simultâneos durante a transmissão de Halloween. Episódio único — jamais reproduzido nas semanas subsequentes.',
  },
  {
    period: '2024 · Q4',
    text: 'Atinge nível Twitch Affiliate. Volume de subscriptions categorizado como informação reservada do gabinete.',
  },
  {
    period: '2025 · Q1',
    text: 'Consolida média estatística de 7 viewers simultâneos — evidência inquestionável de resistência ao crescimento orgânico.',
  },
  {
    period: '2025 · Q3',
    text: 'Inaugura formato institucional "live anunciada → cancelada minutos antes". Tradição mantida com regularidade quase litúrgica.',
  },
  {
    period: '2026 · Q1',
    text: 'Acumula 4.259 followers em registro permanente. 550 horas assistidas em 30 dias — equivale a um único espectador devotado, presente nas 82h25m de transmissão mensal.',
  },
  {
    period: '2026 · ABR 25',
    text: 'Última transmissão oficial registrada às 22h40. Sucessora agendada para "quando convier ao gabinete".',
  },
];

export const LIVES_THIS_WEEK = 2;
export const META_LIVES_PER_WEEK = 7;

// Fallback ISO date for "tempo desde a última live" when Decapi doesn't expose it.
// Update on commits to keep the joke fresh.
export const LAST_STREAM_FALLBACK = '2026-04-25T22:40:00-03:00';
