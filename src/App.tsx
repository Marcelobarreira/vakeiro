import { ScanlineOverlay } from '@/components/ScanlineOverlay';
import { GlitchTitle } from '@/components/GlitchTitle';
import { StatCard } from '@/components/StatCard';
import { StatusBadge } from '@/components/StatusBadge';
import { LiveCounter } from '@/components/LiveCounter';

export default function App() {
  return (
    <>
      <ScanlineOverlay />
      <main className="min-h-screen px-8 py-12 max-w-5xl mx-auto">
        <GlitchTitle text="VAKEIRO" className="text-7xl" />
        <div className="mt-3"><StatusBadge online={false} /></div>
        <div className="mt-12 grid grid-cols-2 gap-6">
          <StatCard label="Tempo desde a última live" value={<LiveCounter fromIso={null} />} variant="cyan" />
          <StatCard label="Média de viewers" value="07" variant="mixed" />
          <StatCard label="Lives esta semana" value="2" unit="/ meta 7" variant="magenta" />
          <StatCard label="Status" value="OFFLINE" variant="cyan" />
        </div>
      </main>
    </>
  );
}
