import { NavBar } from '@/components/NavBar';
import { ScanlineOverlay } from '@/components/ScanlineOverlay';
import { SectionAnchor } from '@/components/SectionAnchor';
import { HeroSection } from '@/sections/HeroSection';
import { LiveStatusSection } from '@/sections/LiveStatusSection';
import { DossieSection } from '@/sections/DossieSection';
import { ConquistasSection } from '@/sections/ConquistasSection';
import { AgendaSection } from '@/sections/AgendaSection';
import { ManifestoSection } from '@/sections/ManifestoSection';
import { PatrocinadoresSection } from '@/sections/PatrocinadoresSection';
import { FooterSection } from '@/sections/FooterSection';

export default function App() {
  return (
    <>
      <ScanlineOverlay />
      <NavBar />
      <SectionAnchor id="hero" className="pt-32">
        <HeroSection />
      </SectionAnchor>
      <SectionAnchor id="live"><LiveStatusSection /></SectionAnchor>
      <SectionAnchor id="dossie"><DossieSection /></SectionAnchor>
      <SectionAnchor id="conquistas"><ConquistasSection /></SectionAnchor>
      <SectionAnchor id="agenda"><AgendaSection /></SectionAnchor>
      <SectionAnchor id="manifesto"><ManifestoSection /></SectionAnchor>
      <SectionAnchor id="patrocinadores"><PatrocinadoresSection /></SectionAnchor>
      <SectionAnchor id="rodape" className="min-h-0"><FooterSection /></SectionAnchor>
    </>
  );
}
