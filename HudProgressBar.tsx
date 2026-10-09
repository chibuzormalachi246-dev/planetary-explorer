import { useRef } from 'react';
import { useProgressListener } from '../../hooks/useJourneyProgress';

export function HudProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useProgressListener((progress) => {
    if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
  });

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px]">
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-linear-to-r from-plasma via-azure to-nebula shadow-[0_0_12px_rgba(79,172,254,0.8)] will-change-transform"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
