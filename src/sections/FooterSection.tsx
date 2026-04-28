import { GitBranch } from 'lucide-react';

export function FooterSection() {
  return (
    <div className="text-center text-sm font-mono text-[color:var(--color-text-dim)] py-8">
      <p>
        Site não-oficial. Homenagem zoeira sem fins lucrativos. Imagens via Twitch.
      </p>
      <div className="mt-4 flex items-center justify-center gap-4">
        <a
          href="https://github.com/Marcelobarreira/vakeiro"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:text-[color:var(--color-cyan-neon)] transition-colors"
        >
          <GitBranch size={14} /> github/vakeiro
        </a>
      </div>
      <p className="mt-6 text-[color:var(--color-magenta-neon)]">
        © REPÚBLICA TWITCHEANA · ANO ∞
      </p>
    </div>
  );
}
