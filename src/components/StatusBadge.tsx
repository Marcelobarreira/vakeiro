interface Props {
  online: boolean;
}

export function StatusBadge({ online }: Props) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
      <span
        className={`inline-block h-2 w-2 rounded-full ${
          online ? 'bg-[color:var(--color-cyan-neon)] animate-pulse' : 'bg-[color:var(--color-magenta-neon)]'
        }`}
      />
      {online ? 'AO VIVO' : 'OFFLINE'}
    </span>
  );
}
