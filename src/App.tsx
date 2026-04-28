import { NavBar } from '@/components/NavBar';
import { ScanlineOverlay } from '@/components/ScanlineOverlay';
import { SectionAnchor } from '@/components/SectionAnchor';
import { HeroSection } from '@/sections/HeroSection';
import { LiveStatusSection } from '@/sections/LiveStatusSection';
import { DossieSection } from '@/sections/DossieSection';
import { ConquistasSection } from '@/sections/ConquistasSection';
import { AgendaSection } from '@/sections/AgendaSection';

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
      <SectionAnchor id="manifesto"><h2 className="font-display text-4xl">MANIFESTO</h2></SectionAnchor>
      <SectionAnchor id="patrocinadores"><h2 className="font-display text-4xl">PATROCINADORES</h2></SectionAnchor>
      <SectionAnchor id="rodape"><h2 className="font-display text-4xl">∎</h2></SectionAnchor>
    </>
  );
}
