import { useState } from 'react';
import { Camera, Globe, Instagram, Mail } from 'lucide-react';
import { MinimalistHero } from '@/src/components/MinimalistHero';
import { WorksWheel } from '@/src/components/WorksWheel';
import { MedicalVideosSection } from '@/src/components/MedicalVideosSection';
import { ApproachSection } from '@/src/components/ApproachSection';
import { ArchiveIndex } from '@/src/components/ArchiveIndex';
import { InquirySection } from '@/src/components/InquirySection';
import { LightboxModal } from '@/src/components/LightboxModal';
import {
  ARCHIVE_ENTRIES,
  HERO_PORTRAIT_SRC,
  PORTFOLIO_WORKS,
  PortfolioWork,
  STUDIO_DISCIPLINES,
  STUDIO_METRICS,
} from '@/src/data/portfolio';
import marketingStrategyImage from '@/src/assets/images/service-marketing-strategy.jpg';
import creativeDirectionImage from '@/src/assets/images/service-creative-direction.jpg';
import mediaBuyingImage from '@/src/assets/images/service-media-buying.jpg';
import graphicDesignImage from '@/src/assets/images/service-graphic-design.jpg';
import videoEditingImage from '@/src/assets/images/service-video-editing.jpg';

const serviceItems = [
  { title: 'Marketing Strategy', image: marketingStrategyImage },
  { title: 'Creative Direction', image: creativeDirectionImage },
  { title: 'Media Buying', image: mediaBuyingImage },
  { title: 'Graphic Design', image: graphicDesignImage },
  { title: 'Video Editing', image: videoEditingImage },
];

export function App() {
  const [activeWork, setActiveWork] = useState<PortfolioWork | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <MinimalistHero
        logoText="Fatma Elsayed"
        navLinks={[
          { label: 'Services', href: '#services' },
          { label: 'Catalog', href: '#catalog' },
          { label: 'Approach', href: '#approach' },
          { label: 'Archive', href: '#archive' },
        ]}
        primaryAction={{ label: 'Inquire', href: '#contact' }}
        mainText="Fatma Elsayed helps brands grow through marketing strategy, creative direction, media buying, graphic design, and video editing."
        readMoreLink="#services"
        readMoreLabel="Explore Services"
        imageSrc={HERO_PORTRAIT_SRC}
        imageAlt="Portrait of Fatma Elsayed"
        overlayText={{
          part1: 'Fatma',
          part2: 'Elsayed',
        }}
        socialLinks={[
          { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
          { icon: Camera, label: 'Photography Archive', href: '#catalog' },
          { icon: Globe, label: 'Exhibitions', href: '#archive' },
          { icon: Mail, label: 'Email Studio', href: '#contact' },
        ]}
        locationText="Marketing & Creative Services"
      />

      <main>
        <div id="services" className="relative h-[calc(100svh+80px)] w-full">
          <div className="sticky top-0 h-[100svh] border-t border-border">
            <WorksWheel items={serviceItems} label="Services" />
          </div>
        </div>

        <div id="catalog" className="border-t border-border">
          <MedicalVideosSection />
        </div>

        <ApproachSection disciplines={STUDIO_DISCIPLINES} metrics={STUDIO_METRICS} />

        <ArchiveIndex
          entries={ARCHIVE_ENTRIES}
          works={PORTFOLIO_WORKS}
          onSelectWork={setActiveWork}
        />
      </main>

      <InquirySection />

      <LightboxModal
        work={activeWork}
        works={PORTFOLIO_WORKS}
        onClose={() => setActiveWork(null)}
        onNavigate={setActiveWork}
      />
    </div>
  );
}

export default App;
