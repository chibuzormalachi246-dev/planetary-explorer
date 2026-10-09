import { useRef } from 'react';
import { useProgressListener } from '../../hooks/useJourneyProgress';
import { formatDepth, formatPercent } from '../../journey/format';

function writeText(node: HTMLElement | null, text: string) {
  if (node && node.textContent !== text) node.textContent = text;
}

export function HudReadout() {
  const percentRef = useRef<HTMLSpanElement>(null);
  const depthRef = useRef<HTMLSpanElement>(null);

  useProgressListener((progress) => {
    writeText(percentRef.current, formatPercent(progress));
    writeText(depthRef.current, formatDepth(progress));
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-6 right-6 z-10 flex animate-fade-in flex-col items-end gap-1 font-mono text-[0.65rem] text-white/40 sm:bottom-10 sm:right-10 sm:text-xs"
    >
      <div>
        PROGRESS:{' '}
        <span ref={percentRef} className="text-plasma">
          00.0%
        </span>
      </div>
      <div>
        COORDINATE:{' '}
        <span ref={depthRef} className="text-plasma">
          0000m
        </span>
      </div>
    </div>
  );
}
