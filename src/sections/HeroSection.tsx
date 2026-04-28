import { GlitchTitle } from '@/components/GlitchTitle';
import { StatusBadge } from '@/components/StatusBadge';
import { useAvatar } from '@/hooks/useAvatar';
import { useUptime } from '@/hooks/useUptime';
import { ExternalLink } from 'lucide-react';

export function HeroSection() {
  const { data: avatar } = useAvatar();
  const { data: uptime } = useUptime();
  const online = uptime?.online ?? false;

  return (
    <div className="pt-12 grid md:grid-cols-[1fr_auto] gap-12 items-center">
      <div>
        <p className="font-mono text-[10px] tracking-[0.3em] text-[color:var(--color-cyan-neon)]">
          ▌ACESSO LIBERADO · PROTOCOLO 0xVAK
        </p>
        <GlitchTitle text="VAKEIRO" className="block text-7xl md:text-[10rem] mt-4 leading-none" />
        <p className="font-mono text-sm text-[color:var(--color-text-dim)] mt-4">
          ID_0xVAK · STREAMER · TWITCH BR
        </p>
        <div className="mt-6 flex items-center gap-6">
          <StatusBadge online={online} />
          <a
            href="https://www.twitch.tv/vakeiroo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[color:var(--color-cyan-neon)] px-4 py-2 font-mono text-xs uppercase tracking-widest hover:bg-[color:var(--color-cyan-neon)] hover:text-black transition-colors"
          >
            [ ACESSAR TRANSMISSÃO ] <ExternalLink size={14} />
          </a>
        </div>
      </div>
      {avatar && (
        <div className="relative w-48 h-48 md:w-64 md:h-64 border-2 border-[color:var(--color-cyan-neon)]">
          <img src={avatar} alt="vakeiroo" className="w-full h-full object-cover grayscale contrast-110" />
          <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 60px rgba(0,240,255,0.3)' }} />
          <span className="absolute bottom-2 left-2 font-mono text-[10px] text-[color:var(--color-cyan-neon)] bg-black/60 px-2 py-1">
            CAM_01 · LIVE FEED
          </span>
        </div>
      )}
    </div>
  );
}
