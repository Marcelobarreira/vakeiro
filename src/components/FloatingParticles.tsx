import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  color: 'cyan' | 'magenta';
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: 1 + Math.random() * 2.5,
    duration: 12 + Math.random() * 14,
    delay: Math.random() * 22,
    color: Math.random() > 0.5 ? 'cyan' : 'magenta',
  }));
}

interface Props {
  count?: number;
}

/**
 * Small neon dots drifting upward across the viewport. Generated once per
 * mount; positions/timings randomized but stable for the session.
 */
export function FloatingParticles({ count = 28 }: Props) {
  const particles = useMemo(() => generateParticles(count), [count]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {particles.map((p) => {
        const colorRgba =
          p.color === 'cyan' ? 'rgba(0,240,255,0.7)' : 'rgba(255,0,110,0.7)';
        const glowRgba =
          p.color === 'cyan' ? 'rgba(0,240,255,0.45)' : 'rgba(255,0,110,0.45)';
        return (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.left,
              bottom: '-12px',
              width: p.size,
              height: p.size,
              background: colorRgba,
              boxShadow: `0 0 6px ${glowRgba}`,
            }}
            animate={{
              y: ['0vh', '-110vh'],
              opacity: [0, 0.9, 0.9, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'linear',
              opacity: {
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                times: [0, 0.1, 0.85, 1],
                ease: 'linear',
              },
            }}
          />
        );
      })}
    </div>
  );
}
