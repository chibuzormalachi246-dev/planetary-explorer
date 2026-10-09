export function HudHeader() {
  return (
    <header className="pointer-events-none fixed inset-x-6 top-6 z-10 flex animate-hud-in items-center justify-between text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-white/80 sm:inset-x-10 sm:top-8 sm:text-xs">
      <div className="flex items-center gap-3">
        <span className="relative flex size-1.5" aria-hidden="true">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-plasma opacity-70 motion-reduce:animate-none" />
          <span className="relative inline-flex size-1.5 rounded-full bg-plasma shadow-[0_0_8px_rgba(0,242,254,0.9)]" />
        </span>
        <span>Kinetic / Core</span>
      </div>
      <span>Spatial Exploration</span>
    </header>
  );
}
