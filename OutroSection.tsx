import { useProgressSelector } from '../hooks/useJourneyProgress';
import { ACTIVE_RANGE, MAX_DEPTH } from '../journey/config';
import { cn } from '../utils/cn';

interface OutroSectionProps {
  center: number;
  ready: boolean;
  onRestart: () => void;
}

export function OutroSection({ center, ready, onRestart }: OutroSectionProps) {
  const near = useProgressSelector((progress) => Math.abs(progress - center) < ACTIVE_RANGE);
  const active = ready && near;

  return (
    <section
      aria-label="Journey complete"
      className="pointer-events-none relative flex h-screen flex-col items-center justify-end px-6 pb-28 sm:pb-32"
    >
      <div
        inert={!active}
        className={cn(
          'flex flex-col items-center gap-5 text-center transition-[opacity,translate,scale] duration-800 ease-out-expo motion-reduce:translate-y-0 motion-reduce:scale-100',
          active ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-10 scale-95 opacity-0',
        )}
      >
        <p className="flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-white/50 sm:text-xs">
          <span aria-hidden="true" className="h-px w-8 bg-linear-to-r from-transparent to-plasma/80" />
          Nexus reached · {MAX_DEPTH}m
          <span aria-hidden="true" className="h-px w-8 bg-linear-to-l from-transparent to-plasma/80" />
        </p>

        <button
          type="button"
          onClick={onRestart}
          className="group pointer-events-auto inline-flex cursor-pointer items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/85 backdrop-blur-md transition-[border-color,background-color,color,box-shadow] duration-500 hover:border-plasma/60 hover:bg-plasma/[0.06] hover:text-white hover:shadow-[0_0_28px_rgba(0,242,254,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plasma/70"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4 transition-transform duration-700 ease-out-expo group-hover:-rotate-[200deg]"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 12a9 9 0 1 0 3-6.7" />
            <path d="M3 4v5h5" />
          </svg>
          Return to origin
        </button>
      </div>
    </section>
  );
}
