export interface LiveDay {
  date: string; // 'YYYY-MM-DD'
  startTime?: string; // 'HH:mm' (24h, GMT-3) — main session start of the day
  durationMin: number;
  title: string;
  game?: string;
}

// Atividade real puxada do streamscharts.com/channels/vakeiroo
// Multi-stream em mesmo dia consolidadas em uma entrada (duração somada,
// startTime do segmento mais longo do dia). Atualizar manualmente.
export const LIVE_DAYS: LiveDay[] = [
  // Pico histórico de todos os tempos
  {
    date: '2024-10-31',
    durationMin: 240,
    title: 'Live de Halloween — pico histórico de 592 viewers simultâneos',
    game: 'Just Chatting',
  },

  // Março 2026
  {
    date: '2026-03-27',
    startTime: '22:05',
    durationMin: 340,
    title: 'A sexta-cheira bandida chegou — rumo a 20k',
    game: 'EA Sports FC 26',
  },
  {
    date: '2026-03-31',
    startTime: '19:40',
    durationMin: 125,
    title: 'Aprendendo a jogar LOL',
    game: 'League of Legends',
  },

  // Abril 2026
  {
    date: '2026-04-01',
    startTime: '18:40',
    durationMin: 605,
    title: 'Gameplay duvidosa + LOL',
    game: 'EA Sports FC 26',
  },
  {
    date: '2026-04-07',
    startTime: '19:05',
    durationMin: 400,
    title: 'Quem é vivo sempre aparece',
    game: 'EA Sports FC 26',
  },
  {
    date: '2026-04-08',
    startTime: '20:15',
    durationMin: 375,
    title: 'Café da tarde com o Vakas',
    game: 'EA Sports FC 26',
  },
  {
    date: '2026-04-09',
    startTime: '20:05',
    durationMin: 245,
    title: 'Tô mental',
    game: 'Stationeers',
  },
  {
    date: '2026-04-10',
    startTime: '18:55',
    durationMin: 570,
    title: 'Sextou né',
    game: 'EA Sports FC 26',
  },
  {
    date: '2026-04-14',
    startTime: '20:00',
    durationMin: 375,
    title: 'Terrorzin e depois react',
    game: 'EA Sports FC 26',
  },
  {
    date: '2026-04-15',
    startTime: '19:30',
    durationMin: 140,
    title: 'Live meio zap hoje',
    game: 'ROBLOX',
  },
  {
    date: '2026-04-16',
    startTime: '19:15',
    durationMin: 670,
    title: 'Gameplays de qualidade',
    game: 'EA Sports FC 26',
  },
  {
    date: '2026-04-21',
    startTime: '18:25',
    durationMin: 130,
    title: 'Dia de peneira no Herome FC',
    game: 'EA Sports FC 26',
  },
  {
    date: '2026-04-22',
    startTime: '19:15',
    durationMin: 360,
    title: 'Terrorzin e muita sacanagem',
    game: 'EA Sports FC 26',
  },
  {
    date: '2026-04-23',
    startTime: '21:35',
    durationMin: 345,
    title: 'Só gameplay insana',
    game: 'EA Sports FC 26',
  },
  {
    date: '2026-04-24',
    startTime: '19:00',
    durationMin: 265,
    title: 'Sexta do caos',
    game: 'Just Chatting',
  },
  {
    date: '2026-04-25',
    startTime: '22:40',
    durationMin: 280,
    title: 'Live no sábado?',
    game: 'Just Chatting',
  },
];

export const CALENDAR_MIN_YEAR = 2024;
export const CALENDAR_MIN_MONTH = 9;
