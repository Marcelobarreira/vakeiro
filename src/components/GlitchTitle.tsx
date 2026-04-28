import { motion } from 'framer-motion';

interface Props {
  text: string;
  className?: string;
}

export function GlitchTitle({ text, className = '' }: Props) {
  return (
    <motion.span
      className={`relative inline-block font-display font-black tracking-tight ${className}`}
      animate={{
        textShadow: [
          '2px 0 var(--color-magenta-neon), -2px 0 var(--color-cyan-neon)',
          '4px 0 var(--color-magenta-neon), -4px 0 var(--color-cyan-neon)',
          '2px 0 var(--color-magenta-neon), -2px 0 var(--color-cyan-neon)',
          '0 0 var(--color-magenta-neon), 0 0 var(--color-cyan-neon)',
          '2px 0 var(--color-magenta-neon), -2px 0 var(--color-cyan-neon)',
        ],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        times: [0, 0.05, 0.1, 0.12, 1],
        ease: 'linear',
      }}
    >
      {text}
    </motion.span>
  );
}
