export interface JourneySection {
  id: string;
  index: string;
  label: string;
  title: string;
  body: string;
}

export const SECTIONS: readonly JourneySection[] = [
  {
    id: 'departure',
    index: '01',
    label: 'Departure',
    title: 'The Quantum Horizon',
    body: 'Scroll down to initiate deep-space structural traversal along the synthetic singularity manifold.',
  },
  {
    id: 'intercept',
    index: '02',
    label: 'Intercept',
    title: 'Synthetic Architecture',
    body: 'Dynamic geometries coalesce from the dark void, forming self-aligning warp portals that guide incoming vectors.',
  },
  {
    id: 'velocity',
    index: '03',
    label: 'Velocity',
    title: 'Hyperluminal Drift',
    body: 'Local electromagnetic fields twist physical dimensions into hyper-convergent streamlines of pure energy.',
  },
  {
    id: 'transcendence',
    index: '04',
    label: 'Transcendence',
    title: 'Core Convergence',
    body: 'Arrival at the core nexus. Space folded, matter rearranged, journey complete.',
  },
];

/** Four chapters plus the closing "arrival" viewport — every slide is exactly one viewport tall. */
export const SLIDE_COUNT = SECTIONS.length + 1;

/** Scroll progress (0–1) at which a given slide fills the viewport. */
export const slideCenter = (index: number) => index / (SLIDE_COUNT - 1);

/** Distance (in progress units) from a slide's centre within which its copy is revealed. */
export const ACTIVE_RANGE = 0.12;

/** Value of the depth readout at the end of the journey, in metres. */
export const MAX_DEPTH = 4200;

/** Per-frame easing factors, expressed for a 60 fps baseline (made frame-rate independent at runtime). */
export const SCROLL_EASE = 0.05;
export const POINTER_EASE = 0.06;

export const PALETTE = {
  void: 0x030307,
  cyan: 0x00f2fe,
  azure: 0x00a8ff,
  sky: 0x4facfe,
  violet: 0x7928ca,
  purple: 0x9d4edd,
  track: 0x1a2639,
  ambient: 0x0a1020,
  artifact: 0x111625,
  core: 0xc8fbff,
} as const;

/** Control points of the camera spline. */
export const PATH_POINTS: ReadonlyArray<readonly [number, number, number]> = [
  [0, 0, 0],
  [5, 3, -40],
  [-8, -4, -90],
  [8, 6, -150],
  [-4, 0, -210],
  [0, 0, -270],
];
