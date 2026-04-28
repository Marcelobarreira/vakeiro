import type { ReactNode } from 'react';

interface Props {
  id: string;
  children: ReactNode;
  className?: string;
}

export function SectionAnchor({ id, children, className = '' }: Props) {
  return (
    <section id={id} className={`min-h-[80vh] px-6 py-20 md:px-12 ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}
