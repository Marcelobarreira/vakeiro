import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  id: string;
  children: ReactNode;
  className?: string;
}

export function SectionAnchor({ id, children, className = '' }: Props) {
  return (
    <section id={id} className={`min-h-[80vh] px-6 py-20 md:px-12 ${className}`}>
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
