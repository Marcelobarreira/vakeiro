import type { ReactNode } from 'react';
import { HUDFrame } from './HUDFrame';

interface Props {
  label: string;
  value: ReactNode;
  unit?: string;
  loading?: boolean;
  error?: boolean;
  variant?: 'cyan' | 'magenta' | 'mixed';
}

export function StatCard({ label, value, unit, loading, error, variant = 'cyan' }: Props) {
  return (
    <HUDFrame variant={variant} className="min-h-[120px]">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-text-dim)]">
        ▌ {label}
      </p>
      <div className="mt-3 flex items-baseline gap-2">
        {loading ? (
          <span className="font-display text-3xl text-[color:var(--color-text-dim)]">--</span>
        ) : error ? (
          <span className="font-mono text-sm text-[color:var(--color-magenta-neon)]">
            DADOS CLASSIFICADOS
          </span>
        ) : (
          <>
            <span className="font-display text-4xl font-black">{value}</span>
            {unit && <span className="font-mono text-xs text-[color:var(--color-text-dim)]">{unit}</span>}
          </>
        )}
      </div>
    </HUDFrame>
  );
}
