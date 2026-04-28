import { NavBar } from '@/components/NavBar';
import { ScanlineOverlay } from '@/components/ScanlineOverlay';
import { SectionAnchor } from '@/components/SectionAnchor';
import { HeroSection } from '@/sections/HeroSection';

export default function App() {
  return (
    <>
      <ScanlineOverlay />
      <NavBar />
      <SectionAnchor id="hero" className="pt-32">
        <HeroSection />
      </SectionAnchor>
      <SectionAnchor id="live"><h2 className="font-display text-4xl">LIVE STATUS</h2></SectionAnchor>
      <SectionAnchor id="dossie"><h2 className="font-display text-4xl">DOSSIÊ</h2></SectionAnchor>
      <SectionAnchor id="conquistas"><h2 className="font-display text-4xl">CONQUISTAS</h2></SectionAnchor>
      <SectionAnchor id="agenda"><h2 className="font-display text-4xl">AGENDA</h2></SectionAnchor>
      <SectionAnchor id="manifesto"><h2 className="font-display text-4xl">MANIFESTO</h2></SectionAnchor>
      <SectionAnchor id="patrocinadores"><h2 className="font-display text-4xl">PATROCINADORES</h2></SectionAnchor>
      <SectionAnchor id="rodape"><h2 className="font-display text-4xl">∎</h2></SectionAnchor>
    </>
  );
}
