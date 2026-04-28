import { useState } from 'react';
import { CalendarMonth } from '@/components/CalendarMonth';
import {
  LIVE_DAYS,
  CALENDAR_MIN_YEAR,
  CALENDAR_MIN_MONTH,
} from '@/data/calendario';

const MONTH_NAMES = [
  'JANEIRO',
  'FEVEREIRO',
  'MARÇO',
  'ABRIL',
  'MAIO',
  'JUNHO',
  'JULHO',
  'AGOSTO',
  'SETEMBRO',
  'OUTUBRO',
  'NOVEMBRO',
  'DEZEMBRO',
];

export function CalendarioSection() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);

  const isAtMin = year === CALENDAR_MIN_YEAR && month === CALENDAR_MIN_MONTH;
  const isAtMax =
    year === today.getFullYear() && month === today.getMonth() + 1;

  function goPrev() {
    if (isAtMin) return;
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  }

  function goNext() {
    if (isAtMax) return;
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  }

  const navBtnClass =
    'border border-[color:var(--color-cyan-neon)] px-3 py-1.5 font-mono text-xs uppercase tracking-widest hover:bg-[color:var(--color-cyan-neon)] hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-current';

  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.3em] text-[color:var(--color-cyan-neon)]">
        ▌SEÇÃO 06 · REGISTRO HISTÓRICO DE TRANSMISSÕES
      </p>
      <h2 className="font-display text-4xl md:text-5xl font-black mt-2">
        CALENDÁRIO
      </h2>

      <div className="mt-10 max-w-3xl">
        <div className="flex items-center justify-between mb-6 gap-3">
          <button
            type="button"
            onClick={goPrev}
            disabled={isAtMin}
            className={navBtnClass}
            aria-label="Mês anterior"
          >
            ◂ ANT
          </button>

          <div className="font-display text-xl md:text-2xl tracking-wide text-center">
            {MONTH_NAMES[month - 1]} · {year}
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={isAtMax}
            className={navBtnClass}
            aria-label="Próximo mês"
          >
            PROX ▸
          </button>
        </div>

        <CalendarMonth
          year={year}
          month={month}
          liveDays={LIVE_DAYS}
          today={today}
        />

        <p className="mt-6 font-mono text-[10px] text-[color:var(--color-text-dim)] text-center">
          ▌HOVER OU TAP NO DIA · DETALHES DA TRANSMISSÃO
        </p>
      </div>
    </div>
  );
}
