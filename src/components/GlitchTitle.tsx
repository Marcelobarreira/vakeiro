interface Props {
  text: string;
  className?: string;
}

export function GlitchTitle({ text, className = '' }: Props) {
  return (
    <span
      className={`relative inline-block font-display font-black tracking-tight ${className}`}
      style={{ textShadow: '2px 0 var(--color-magenta-neon), -2px 0 var(--color-cyan-neon)' }}
    >
      {text}
    </span>
  );
}
