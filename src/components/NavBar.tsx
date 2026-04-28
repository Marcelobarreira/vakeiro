const LINKS = [
  { id: 'hero', label: 'IDENT' },
  { id: 'live', label: 'LIVE' },
  { id: 'dossie', label: 'DOSSIÊ' },
  { id: 'conquistas', label: 'CONQUISTAS' },
  { id: 'clipes', label: 'CLIPES' },
  { id: 'membros', label: 'MEMBROS' },
  { id: 'calendario', label: 'CALENDÁRIO' },
  { id: 'manifesto', label: 'MANIFESTO' },
  { id: 'patrocinadores', label: 'SPONSORS' },
];

export function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[color:var(--color-bg)]/80 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <a href="#hero" className="font-display font-black text-sm tracking-widest">
          ◢ VAKEIRO LIVES ◣
        </a>
        <ul className="hidden md:flex gap-3 font-mono text-[10px] uppercase tracking-widest">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className="text-[color:var(--color-text-dim)] hover:text-[color:var(--color-cyan-neon)] transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
