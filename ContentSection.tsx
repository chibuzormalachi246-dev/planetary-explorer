import type { ReactNode } from 'react';
import { useProgressSelector } from '../hooks/useJourneyProgress';
import { ACTIVE_RANGE, type JourneySection } from '../journey/config';
import { cn } from '../utils/cn';

interface ContentSectionProps {
  section: JourneySection;
  /** Progress value at which this section fills the viewport. */
  center: number;
  /** Gate reveals until the scene has rendered its first frame. */
  ready: boolean;
  headingLevel?: 'h1' | 'h2';
  children?: ReactNode;
}

export function ContentSection({ section, center, ready, headingLevel = 'h2', children }: ContentSectionProps) {
  const near = useProgressSelector((progress) => Math.abs(progress - center) < ACTIVE_RANGE);
  const active = ready && near;
  const Heading = headingLevel;
  const titleId = `${section.id}-title`;

  return (
    <section
      id={section.id}
      aria-labelledby={titleId}
      className="pointer-events-none relative flex h-screen flex-col justify-center px-[10vw]"
    >
      <div
        className={cn(
          'max-w-[550px] transition-[opacity,translate,scale] duration-800 ease-out-expo motion-reduce:translate-y-0 motion-reduce:scale-100',
          active ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-10 scale-95 opacity-0',
        )}
      >
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-plasma">
          {section.index} / {section.label}
        </p>
        <Heading
          id={titleId}
          className="mb-4 bg-linear-to-b from-white from-40% to-white/50 bg-clip-text text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold uppercase leading-[1.05] tracking-[-0.02em] text-transparent"
        >
          {section.title}
        </Heading>
        <p className="text-base leading-[1.6] text-white/60">{section.body}</p>
      </div>
      {children}
    </section>
  );
}
