export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

/**
 * Frame-rate independent replacement for `value += (target - value) * factor`,
 * where `factor` was tuned for 60 fps.
 */
export const damp = (factor: number, deltaSeconds: number) => 1 - Math.pow(1 - factor, deltaSeconds * 60);

/** Small seeded PRNG so the scene composition is identical on every visit. */
export function mulberry32(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
