import { motion } from 'framer-motion';

/**
 * Three large blurred radial gradients drifting slowly across the viewport.
 * Adds atmospheric depth behind all content. Pointer-events none.
 */
export function AmbientGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Top-left magenta orb */}
      <motion.div
        className="absolute -top-40 -left-40 w-[28rem] h-[28rem] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255,0,110,0.18) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Bottom-right cyan orb */}
      <motion.div
        className="absolute -bottom-40 -right-40 w-[34rem] h-[34rem] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(0,240,255,0.15) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        animate={{
          x: [0, -50, 20, 0],
          y: [0, 30, -15, 0],
          scale: [1, 0.9, 1.12, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Mid-right cyan accent */}
      <motion.div
        className="absolute top-1/3 -right-24 w-80 h-80 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(0,240,255,0.10) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        animate={{
          x: [0, -40, 15, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
