import { useProgressSelector } from '../../hooks/useJourneyProgress';
import { SECTIONS, SLIDE_COUNT } from '../../journey/config';
import { cn } from '../../utils/cn';

interface SectionNavProps {
  onNavigate: (index: number) => void;
}

export function SectionNav({ onNavigate }: SectionNavProps) {
  const active = useProgressSelector((progress) =>
    Math.min(SECTIONS.length - 1, Math.round(progress * (SLIDE_COUNT - 1))),
  );

  return (
    <nav
      aria-label="Journey chapters"
      className="fixed right-10 top-1/2 z-10 hidden -translate-y-1/2 animate-fade-in lg:block"
    >
      <ol className="flex flex-col items-end gap-3">
        {SECTIONS.map((section, index) => {
          const isActive = index === active;
          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => onNavigate(index)}
                aria-current={isActive ? 'step' : undefined}
                aria-label={`Jump to ${section.index}: ${section.title}`}
                className="group flex cursor-pointer items-center gap-3 rounded-sm px-1 py-1.5 outline-none focus-visible:ring-1 focus-visible:ring-plasma/50"
              >
                <span
                  className={cn(
                    'font-mono text-[0.625rem] uppercase tracking-[0.25em] transition-[opacity,translate,color] duration-500 ease-out-expo',
                    isActive
                      ? 'translate-x-0 text-plasma opacity-100'
                      : 'translate-x-2 text-white/60 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100',
                  )}
                >
                  {section.label}
                </span>
                <span
                  className={cn(
                    'font-mono text-[0.625rem] tabular-nums transition-colors duration-500',
                    isActive ? 'text-white' : 'text-white/35 group-hover:text-white/70',
                  )}
                >
                  {section.index}
                </span>
                <span
                  className={cn(
                    'block h-px transition-all duration-500 ease-out-expo',
                    isActive
                      ? 'w-10 bg-plasma shadow-[0_0_10px_rgba(0,242,254,0.9)]'
                      : 'w-4 bg-white/25 group-hover:w-6 group-hover:bg-white/60 group-focus-visible:w-6 group-focus-visible:bg-white/60',
                  )}
                />
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
