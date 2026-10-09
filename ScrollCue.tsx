import { useProgressSelector } from '../hooks/useJourneyProgress';
import { cn } from '../utils/cn';

export function ScrollCue({ ready }: { ready: boolean }) {
  const atStart = useProgressSelector((progress) => progress < 0.015);
  const visible = ready && atStart;

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute bottom-8 left-[10vw] flex items-center gap-4 transition-opacity duration-700 sm:bottom-10',
        visible ? 'opacity-100 delay-700' : 'opacity-0',
      )}
    >
      <span className="relative block h-10 w-px overflow-hidden bg-white/10">
        <span className="absolute inset-0 block animate-scroll-cue bg-linear-to-b from-transparent via-plasma to-transparent motion-reduce:animate-none" />
      </span>
      <span className="font-mono text-[0.625rem] uppercase tracking-[0.3em] text-white/45">Scroll to traverse</span>
    </div>
  );
}
