import { NavBar } from '@/components/NavBar';
import { ScanlineOverlay } from '@/components/ScanlineOverlay';
import { AmbientGlow } from '@/components/AmbientGlow';
import { FloatingParticles } from '@/components/FloatingParticles';
import { SectionAnchor } from '@/components/SectionAnchor';
import { HeroSection } from '@/sections/HeroSection';
import { LiveStatusSection } from '@/sections/LiveStatusSection';
import { DossieSection } from '@/sections/DossieSection';
import { ConquistasSection } from '@/sections/ConquistasSection';
import { ClipesSection } from '@/sections/ClipesSection';
import { MembrosSection } from '@/sections/MembrosSection';
import { CalendarioSection } from '@/sections/CalendarioSection';
import { ManifestoSection } from '@/sections/ManifestoSection';
import { PatrocinadoresSection } from '@/sections/PatrocinadoresSection';
import { FooterSection } from '@/sections/FooterSection';

export default function App() {
  return (
    <>
      <AmbientGlow />
      <FloatingParticles />
      <ScanlineOverlay />
      <NavBar />
      <div className="relative z-10">
        <SectionAnchor id="hero" className="pt-32"><HeroSection /></SectionAnchor>
        <SectionAnchor id="live"><LiveStatusSection /></SectionAnchor>
        <SectionAnchor id="dossie"><DossieSection /></SectionAnchor>
        <SectionAnchor id="conquistas"><ConquistasSection /></SectionAnchor>
        <SectionAnchor id="clipes"><ClipesSection /></SectionAnchor>
        <SectionAnchor id="membros"><MembrosSection /></SectionAnchor>
        <SectionAnchor id="calendario"><CalendarioSection /></SectionAnchor>
        <SectionAnchor id="manifesto"><ManifestoSection /></SectionAnchor>
        <SectionAnchor id="patrocinadores"><PatrocinadoresSection /></SectionAnchor>
        <SectionAnchor id="rodape" className="min-h-0"><FooterSection /></SectionAnchor>
      </div>
    </>
  );
}
