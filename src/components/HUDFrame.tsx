import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

type Variant = 'cyan' | 'magenta' | 'mixed';

interface Props {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

const colorMap = {
  cyan: { tl: 'border-[color:var(--color-cyan-neon)]', tr: 'border-[color:var(--color-cyan-neon)]', bl: 'border-[color:var(--color-cyan-neon)]', br: 'border-[color:var(--color-cyan-neon)]' },
  magenta: { tl: 'border-[color:var(--color-magenta-neon)]', tr: 'border-[color:var(--color-magenta-neon)]', bl: 'border-[color:var(--color-magenta-neon)]', br: 'border-[color:var(--color-magenta-neon)]' },
  mixed: { tl: 'border-[color:var(--color-cyan-neon)]', tr: 'border-[color:var(--color-magenta-neon)]', bl: 'border-[color:var(--color-magenta-neon)]', br: 'border-[color:var(--color-cyan-neon)]' },
};

export function HUDFrame({ children, variant = 'cyan', className = '' }: Props) {
  const c = colorMap[variant];
  return (
    <div className={`relative border border-white/10 bg-black/30 p-6 ${className}`}>
      <Corner pos="tl" cls={c.tl} />
      <Corner pos="tr" cls={c.tr} />
      <Corner pos="bl" cls={c.bl} />
      <Corner pos="br" cls={c.br} />
      {children}
    </div>
  );
}

function Corner({ pos, cls }: { pos: 'tl' | 'tr' | 'bl' | 'br'; cls: string }) {
  const base = 'absolute w-4 h-4 pointer-events-none';
  const sides: Record<typeof pos, string> = {
    tl: `${base} top-1 left-1 border-t-2 border-l-2`,
    tr: `${base} top-1 right-1 border-t-2 border-r-2`,
    bl: `${base} bottom-1 left-1 border-b-2 border-l-2`,
    br: `${base} bottom-1 right-1 border-b-2 border-r-2`,
  };
  return (
    <motion.div
      className={`${sides[pos]} ${cls}`}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.05 }}
      viewport={{ once: true }}
    />
  );
}
