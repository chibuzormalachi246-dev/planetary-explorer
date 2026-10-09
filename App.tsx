import { useCallback, useState } from 'react';
import { ContentSection } from './components/ContentSection';
import { HudHeader } from './components/hud/HudHeader';
import { HudProgressBar } from './components/hud/HudProgressBar';
import { HudReadout } from './components/hud/HudReadout';
import { SectionNav } from './components/hud/SectionNav';
import { JourneyCanvas } from './components/JourneyCanvas';
import { OutroSection } from './components/OutroSection';
import { ScrollCue } from './components/ScrollCue';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { SECTIONS, SLIDE_COUNT, slideCenter } from './journey/config';

export default function App() {
  const reducedMotion = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);

  const goToSlide = useCallback(
    (index: number) => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: slideCenter(index) * maxScroll, behavior: reducedMotion ? 'auto' : 'smooth' });
    },
    [reducedMotion],
  );

  return (
    <>
      <HudProgressBar />
      <HudHeader />
      <SectionNav onNavigate={goToSlide} />
      <HudReadout />

      <JourneyCanvas reducedMotion={reducedMotion} onReady={handleReady} />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(3,3,7,0.7)_100%)]"
      />

      <main className="relative z-[2]">
        {SECTIONS.map((section, index) => (
          <ContentSection
            key={section.id}
            section={section}
            center={slideCenter(index)}
            ready={ready}
            headingLevel={index === 0 ? 'h1' : 'h2'}
          >
            {index === 0 && <ScrollCue ready={ready} />}
          </ContentSection>
        ))}
        <OutroSection center={slideCenter(SLIDE_COUNT - 1)} ready={ready} onRestart={() => goToSlide(0)} />
      </main>
    </>
  );
}
