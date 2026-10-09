import { useEffect, useRef, useState } from 'react';
import { POINTER_EASE, SCROLL_EASE } from '../journey/config';
import { JourneyScene } from '../journey/JourneyScene';
import { clamp, damp } from '../journey/math';
import { journeyProgress } from '../journey/progressStore';
import { cn } from '../utils/cn';

interface JourneyCanvasProps {
  reducedMotion: boolean;
  /** Called once the first frame is on screen (or immediately if WebGL is unavailable). */
  onReady: () => void;
}

type Status = 'booting' | 'running' | 'unsupported';

function readScrollProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  return maxScroll > 0 ? clamp(window.scrollY / maxScroll) : 0;
}

function tryCreateJourney(width: number, height: number) {
  try {
    return new JourneyScene(width, height);
  } catch (error) {
    console.warn('[journey] WebGL is unavailable — falling back to a static backdrop.', error);
    return null;
  }
}

export function JourneyCanvas({ reducedMotion, onReady }: JourneyCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const reducedMotionRef = useRef(reducedMotion);
  const onReadyRef = useRef(onReady);
  const [status, setStatus] = useState<Status>('booting');

  useEffect(() => {
    reducedMotionRef.current = reducedMotion;
    onReadyRef.current = onReady;
  });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const measure = () => ({
      width: host.clientWidth || window.innerWidth,
      height: host.clientHeight || window.innerHeight,
    });

    const initial = measure();
    const journey = tryCreateJourney(initial.width, initial.height);
    if (!journey) {
      setStatus('unsupported');
      onReadyRef.current();
      return;
    }
    host.appendChild(journey.domElement);

    // Scroll → target progress, eased towards every frame.
    let target = readScrollProgress();
    let progress = target;
    journeyProgress.set(progress);

    const pointer = { x: 0, y: 0 };
    const easedPointer = { x: 0, y: 0 };

    const onScroll = () => {
      target = readScrollProgress();
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = -(event.clientY / window.innerHeight - 0.5) * 2;
    };
    const onPointerLeave = () => {
      pointer.x = 0;
      pointer.y = 0;
    };

    const resizeObserver = new ResizeObserver(() => {
      const { width, height } = measure();
      journey.resize(width, height);
      target = readScrollProgress();
    });
    resizeObserver.observe(host);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onPointerLeave);

    const startedAt = performance.now();
    let lastTime = startedAt;
    let frameId = 0;
    let announced = false;

    const tick = (now: number) => {
      frameId = requestAnimationFrame(tick);

      const delta = clamp((now - lastTime) / 1000, 0, 0.1);
      lastTime = now;
      const reduced = reducedMotionRef.current;

      const previous = progress;
      progress += (target - progress) * damp(SCROLL_EASE, delta);
      if (Math.abs(target - progress) < 1e-5) progress = target;
      journeyProgress.set(progress);

      const pointerEase = damp(POINTER_EASE, delta);
      easedPointer.x += ((reduced ? 0 : pointer.x) - easedPointer.x) * pointerEase;
      easedPointer.y += ((reduced ? 0 : pointer.y) - easedPointer.y) * pointerEase;

      journey.update({
        progress,
        pointerX: easedPointer.x,
        pointerY: easedPointer.y,
        velocity: delta > 0 ? (progress - previous) / delta : 0,
        delta,
        elapsed: (now - startedAt) / 1000,
        motion: reduced ? 0.15 : 1,
      });
      journey.render();

      if (!announced) {
        announced = true;
        setStatus('running');
        onReadyRef.current();
      }
    };
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('mouseleave', onPointerLeave);
      journey.dispose();
    };
  }, []);

  return (
    <>
      <div
        ref={hostRef}
        aria-hidden="true"
        className={cn(
          'pointer-events-none fixed inset-0 z-[1] overflow-hidden transition-opacity duration-[1800ms] ease-out',
          status === 'running' ? 'opacity-100' : 'opacity-0',
        )}
      />
      {status === 'unsupported' && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_at_72%_45%,rgba(0,242,254,0.14),transparent_55%),radial-gradient(ellipse_at_30%_85%,rgba(142,45,226,0.16),transparent_55%)]"
        />
      )}
    </>
  );
}
