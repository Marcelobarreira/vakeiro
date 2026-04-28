export interface LiveDay {
  date: string; // 'YYYY-MM-DD'
  durationMin: number;
  title: string;
  game?: string;
}

export const LIVE_DAYS: LiveDay[] = [
  { date: '2024-09-15', durationMin: 23, title: 'primeira aparição da era moderna', game: 'Just Chatting' },
  { date: '2024-09-22', durationMin: 41, title: 'tentativa interrompida por descanso', game: 'Just Chatting' },
  { date: '2024-10-08', durationMin: 34, title: 'sessão noturna sob protesto', game: 'Counter-Strike 2' },
  { date: '2024-11-30', durationMin: 19, title: 'live anunciada às 23h57', game: 'Just Chatting' },
  { date: '2025-02-12', durationMin: 28, title: 'retorno triunfal após hiato de 42 dias', game: 'Counter-Strike 2' },
  { date: '2025-04-21', durationMin: 56, title: 'maratona de raciocínio elevado', game: 'GTA V' },
  { date: '2025-08-05', durationMin: 17, title: 'transmissão técnica curta', game: 'Just Chatting' },
  { date: '2026-01-13', durationMin: 33, title: 'ano-novo do imperador', game: 'Just Chatting' },
  { date: '2026-03-04', durationMin: 45, title: 'sessão de análise estratégica', game: 'Counter-Strike 2' },
  { date: '2026-04-25', durationMin: 38, title: 'última transmissão registrada', game: 'Just Chatting' },
];

export const CALENDAR_MIN_YEAR = 2024;
export const CALENDAR_MIN_MONTH = 9;
