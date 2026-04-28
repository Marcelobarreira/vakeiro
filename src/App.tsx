import { HUDFrame } from '@/components/HUDFrame';
import { GlitchTitle } from '@/components/GlitchTitle';
import { ScanlineOverlay } from '@/components/ScanlineOverlay';

export default function App() {
  return (
    <>
      <ScanlineOverlay />
      <main className="min-h-screen px-8 py-12 max-w-5xl mx-auto">
        <GlitchTitle text="VAKEIRO" className="text-7xl" />
        <p className="font-mono text-sm text-[color:var(--color-cyan-neon)] mt-2">
          ▌SYSTEM ONLINE · ID_0xVAK
        </p>
        <div className="mt-12 grid grid-cols-2 gap-6">
          <HUDFrame variant="cyan">
            <p className="font-mono text-xs uppercase tracking-widest text-[color:var(--color-cyan-neon)]">
              Frame ciano
            </p>
            <p className="mt-2 font-display text-3xl">07</p>
          </HUDFrame>
          <HUDFrame variant="mixed">
            <p className="font-mono text-xs uppercase tracking-widest text-[color:var(--color-magenta-neon)]">
              Frame mixed
            </p>
            <p className="mt-2 font-display text-3xl">82h</p>
          </HUDFrame>
        </div>
      </main>
    </>
  );
}
