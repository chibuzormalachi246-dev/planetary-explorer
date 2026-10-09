import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Chapters — original intro/outro preserved, planets inserted         */
/* ------------------------------------------------------------------ */

export interface Chapter {
  tag: string;
  title: string[];
  description: string;
  accent: string;
  planetId?: string;
  stats?: Array<{ label: string; value: string }>;
}

export const CHAPTERS: Chapter[] = [
  {
    tag: "01 / DEPARTURE",
    title: ["THE QUANTUM", "HORIZON"],
    description:
      "Explore the wonders of our solar system from the comfort of home. Scroll to begin an immersive journey across nine extraordinary worlds.",
    accent: "#29dcff",
  },
  {
    tag: "02 / MERCURY",
    title: ["THE IRON", "SCAR"],
    description:
      "A scorched iron heart wrapped in cratered grey stone. Mercury endures the most violent temperature swings in the solar system.",
    accent: "#c2ad96",
    planetId: "mercury",
    stats: [
      { label: "DIAMETER", value: "4,879 KM" },
      { label: "DAY LENGTH", value: "59 DAYS" },
      { label: "MOONS", value: "0" },
    ],
  },
  {
    tag: "03 / VENUS",
    title: ["THE VEILED", "FURNACE"],
    description:
      "Beneath unbroken seas of carbon cloud, Venus burns at 465°C — a runaway greenhouse wrapped in liquid-light haze.",
    accent: "#e8c07a",
    planetId: "venus",
    stats: [
      { label: "DIAMETER", value: "12,104 KM" },
      { label: "DAY LENGTH", value: "243 DAYS" },
      { label: "MOONS", value: "0" },
    ],
  },
  {
    tag: "04 / EARTH",
    title: ["THE LIVING", "OCEAN"],
    description:
      "The only known world with liquid-water oceans and breathing skies. Continents drift beneath swirling storm systems.",
    accent: "#3fa9ff",
    planetId: "earth",
    stats: [
      { label: "DIAMETER", value: "12,742 KM" },
      { label: "DAY LENGTH", value: "24 HRS" },
      { label: "MOONS", value: "1" },
    ],
  },
  {
    tag: "05 / MARS",
    title: ["THE RUSTED", "FRONTIER"],
    description:
      "A rusted desert of iron oxide dust, home to Olympus Mons — a volcano nearly three times the height of Everest.",
    accent: "#ff6a3d",
    planetId: "mars",
    stats: [
      { label: "DIAMETER", value: "6,779 KM" },
      { label: "DAY LENGTH", value: "24.6 HRS" },
      { label: "MOONS", value: "2" },
    ],
  },
  {
    tag: "06 / JUPITER",
    title: ["THE ETERNAL", "STORM"],
    description:
      "A gas colossus wider than eleven Earths. The Great Red Spot — a storm larger than our entire planet — has raged for centuries.",
    accent: "#e0a060",
    planetId: "jupiter",
    stats: [
      { label: "DIAMETER", value: "139,820 KM" },
      { label: "DAY LENGTH", value: "9.9 HRS" },
      { label: "MOONS", value: "95" },
    ],
  },
  {
    tag: "07 / SATURN",
    title: ["LORD OF", "THE RINGS"],
    description:
      "A pale golden giant crowned by rings of ancient ice — spanning 280,000 km yet, in places, only ten metres thick.",
    accent: "#ecd9a0",
    planetId: "saturn",
    stats: [
      { label: "DIAMETER", value: "116,460 KM" },
      { label: "DAY LENGTH", value: "10.7 HRS" },
      { label: "MOONS", value: "146" },
    ],
  },
  {
    tag: "08 / URANUS",
    title: ["THE SIDEWAYS", "GIANT"],
    description:
      "Knocked on its side by an ancient impact, Uranus rolls around the Sun at a 98° tilt — a frozen methane jewel.",
    accent: "#7fe7e2",
    planetId: "uranus",
    stats: [
      { label: "DIAMETER", value: "50,724 KM" },
      { label: "DAY LENGTH", value: "17.2 HRS" },
      { label: "MOONS", value: "28" },
    ],
  },
  {
    tag: "09 / NEPTUNE",
    title: ["THE AZURE", "ABYSS"],
    description:
      "The outermost giant. Supersonic methane winds — the fastest in the solar system — tear across its deep azure face.",
    accent: "#4f7dff",
    planetId: "neptune",
    stats: [
      { label: "DIAMETER", value: "49,244 KM" },
      { label: "DAY LENGTH", value: "16.1 HRS" },
      { label: "MOONS", value: "16" },
    ],
  },
  {
    tag: "10 / PLUTO",
    title: ["THE FROZEN", "HEART"],
    description:
      "A beloved dwarf world of nitrogen ice and rock, its pale heart-shaped glacier beating faintly in the dark.",
    accent: "#c9b8a3",
    planetId: "pluto",
    stats: [
      { label: "DIAMETER", value: "2,377 KM" },
      { label: "DAY LENGTH", value: "6.4 DAYS" },
      { label: "MOONS", value: "5" },
    ],
  },
  {
    tag: "11 / TRANSCENDENCE",
    title: ["CORE", "CONVERGENCE"],
    description:
      "Arrival at the core nexus. Nine worlds crossed, space folded, matter rearranged — journey complete.",
    accent: "#b46aff",
  },
];

/* ------------------------------------------------------------------ */
/*  Planet visual definitions                                           */
/* ------------------------------------------------------------------ */

export type TextureKind =
  | "mercury"
  | "venus"
  | "earth"
  | "mars"
  | "jupiter"
  | "saturn"
  | "uranus"
  | "neptune"
  | "pluto"
  | "moon"
  | "europa"
  | "titan";

export interface PlanetDef {
  id: string;
  name: string;
  kind: TextureKind;
  chapterIndex: number;
  size: number;
  tilt: number;
  rotSpeed: number;
  side: 1 | -1;
  lateral: number;
  lift: number;
  atmosphere: string | null;
  atmosphereStrength: number;
  clouds?: boolean;
  ring?: { inner: number; outer: number; tintA: string; tintB: string };
  roughness: number;
  metalness: number;
}

export const PLANETS: PlanetDef[] = [
  { id: "mercury", name: "MERCURY", kind: "mercury", chapterIndex: 1, size: 2.3, tilt: 0.03, rotSpeed: 0.03, side: 1, lateral: 8.5, lift: 1.5, atmosphere: null, atmosphereStrength: 0, roughness: 1, metalness: 0.08 },
  { id: "venus", name: "VENUS", kind: "venus", chapterIndex: 2, size: 3.1, tilt: 0.05, rotSpeed: -0.02, side: -1, lateral: 9.5, lift: -1, atmosphere: "#e8c98f", atmosphereStrength: 0.9, roughness: 0.9, metalness: 0 },
  { id: "earth", name: "EARTH", kind: "earth", chapterIndex: 3, size: 3.5, tilt: 0.41, rotSpeed: 0.09, side: 1, lateral: 10, lift: 1, atmosphere: "#3f9dff", atmosphereStrength: 1.1, clouds: true, roughness: 0.65, metalness: 0.12 },
  { id: "mars", name: "MARS", kind: "mars", chapterIndex: 4, size: 2.7, tilt: 0.44, rotSpeed: 0.08, side: -1, lateral: 9, lift: 1.6, atmosphere: "#d4693a", atmosphereStrength: 0.5, roughness: 1, metalness: 0 },
  { id: "jupiter", name: "JUPITER", kind: "jupiter", chapterIndex: 5, size: 8.6, tilt: 0.05, rotSpeed: 0.16, side: 1, lateral: 14, lift: 0.5, atmosphere: "#d8a878", atmosphereStrength: 0.45, roughness: 0.85, metalness: 0 },
  { id: "saturn", name: "SATURN", kind: "saturn", chapterIndex: 6, size: 7.3, tilt: 0.47, rotSpeed: 0.15, side: -1, lateral: 15, lift: -1.5, atmosphere: "#e3cf9e", atmosphereStrength: 0.4, ring: { inner: 1.24, outer: 2.25, tintA: "#c9ad7f", tintB: "#efe0bb" }, roughness: 0.85, metalness: 0 },
  { id: "uranus", name: "URANUS", kind: "uranus", chapterIndex: 7, size: 5.3, tilt: 1.71, rotSpeed: -0.1, side: 1, lateral: 12, lift: 2, atmosphere: "#8fe8e2", atmosphereStrength: 0.7, ring: { inner: 1.6, outer: 1.95, tintA: "#5a8f96", tintB: "#9fd8dc" }, roughness: 0.8, metalness: 0 },
  { id: "neptune", name: "NEPTUNE", kind: "neptune", chapterIndex: 8, size: 5.1, tilt: 0.49, rotSpeed: 0.11, side: -1, lateral: 12, lift: 1, atmosphere: "#4f7dff", atmosphereStrength: 0.8, roughness: 0.8, metalness: 0 },
  { id: "pluto", name: "PLUTO", kind: "pluto", chapterIndex: 9, size: 1.7, tilt: 0.6, rotSpeed: 0.04, side: 1, lateral: 7.5, lift: -0.5, atmosphere: null, atmosphereStrength: 0, roughness: 1, metalness: 0 },
];

/** Path parameter for a chapter centre (chapters are evenly spaced along the flight). */
export const chapterT = (chapterIndex: number) =>
  chapterIndex / (CHAPTERS.length - 1);

/* ------------------------------------------------------------------ */
/*  Seeded RNG + periodic value noise (seamless equirect textures)      */
/* ------------------------------------------------------------------ */

function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function makeNoise(seed: number) {
  const rand = makeRng(seed);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const t = p[i];
    p[i] = p[j];
    p[j] = t;
  }
  const perm = new Uint8Array(512);
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  const grad = (h: number, x: number, y: number) => {
    switch (h & 3) {
      case 0: return x + y;
      case 1: return -x + y;
      case 2: return x - y;
      default: return -x - y;
    }
  };
  const fade = (t: number) => t * t * (3 - 2 * t);

  /** x wraps with the given lattice period (seamless around the globe). */
  const noiseX = (x: number, y: number, period: number) => {
    const X = Math.floor(x);
    const Y = Math.floor(y);
    const xf = x - X;
    const yf = y - Y;
    const wrap = (v: number) => ((v % period) + period) % period;
    const xi = wrap(X);
    const xj = wrap(X + 1);
    const yi = Y & 255;
    const yj = (Y + 1) & 255;
    const aa = perm[(perm[xi & 255] + yi) & 511];
    const ab = perm[(perm[xi & 255] + yj) & 511];
    const ba = perm[(perm[xj & 255] + yi) & 511];
    const bb = perm[(perm[xj & 255] + yj) & 511];
    const u = fade(xf);
    const v = fade(yf);
    const x1 = grad(aa, xf, yf) + (grad(ba, xf - 1, yf) - grad(aa, xf, yf)) * u;
    const x2 = grad(ab, xf, yf - 1) + (grad(bb, xf - 1, yf - 1) - grad(ab, xf, yf - 1)) * u;
    return (x1 + (x2 - x1) * v) * 0.7071;
  };

  const fbmX = (x: number, y: number, octaves: number, basePeriod: number) => {
    let amp = 0.5;
    let freq = 1;
    let period = basePeriod;
    let sum = 0;
    let norm = 0;
    for (let o = 0; o < octaves; o++) {
      sum += amp * noiseX(x * freq, y * freq, Math.max(2, Math.round(period)));
      norm += amp;
      amp *= 0.5;
      freq *= 2.03;
      period *= 2;
    }
    return sum / norm;
  };

  return { noiseX, fbmX };
}

/* ------------------------------------------------------------------ */
/*  Colour helpers                                                      */
/* ------------------------------------------------------------------ */

type RGB = [number, number, number];

const hex = (h: string): RGB => {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smoothstep = (e0: number, e1: number, x: number) => {
  const t = clamp01((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};
const mix3 = (a: RGB, b: RGB, t: number): RGB => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
  lerp(a[2], b[2], t),
];

function bandPalette(stops: Array<[number, string]>, t: number): RGB {
  const c = clamp01(t);
  for (let i = 1; i < stops.length; i++) {
    if (c <= stops[i][0]) {
      const [p0, c0] = stops[i - 1];
      const [p1, c1] = stops[i];
      return mix3(hex(c0), hex(c1), (c - p0) / Math.max(1e-5, p1 - p0));
    }
  }
  return hex(stops[stops.length - 1][1]);
}

/* ------------------------------------------------------------------ */
/*  Procedural planet textures                                          */
/* ------------------------------------------------------------------ */

function paintCraters(
  ctx: CanvasRenderingContext2D,
  rng: () => number,
  w: number,
  h: number,
  count: number,
  maxR: number,
  strength: number,
) {
  for (let i = 0; i < count; i++) {
    const x = rng() * w;
    const y = (0.06 + rng() * 0.88) * h;
    const r = (0.15 + Math.pow(rng(), 2.2) * 0.85) * maxR;
    // shadow bowl
    const bowl = ctx.createRadialGradient(x, y, r * 0.1, x, y, r);
    bowl.addColorStop(0, `rgba(0,0,0,${0.34 * strength})`);
    bowl.addColorStop(0.75, `rgba(0,0,0,${0.12 * strength})`);
    bowl.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = bowl;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    // lit rim (sun from upper-left)
    ctx.strokeStyle = `rgba(255,255,255,${0.28 * strength})`;
    ctx.lineWidth = Math.max(1, r * 0.12);
    ctx.beginPath();
    ctx.arc(x, y, r * 0.92, Math.PI * 0.9, Math.PI * 1.6);
    ctx.stroke();
    ctx.strokeStyle = `rgba(0,0,0,${0.3 * strength})`;
    ctx.beginPath();
    ctx.arc(x, y, r * 0.92, Math.PI * -0.1, Math.PI * 0.6);
    ctx.stroke();
  }
}

function generateSurface(
  kind: TextureKind,
  w: number,
  h: number,
  seed: number,
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(w, h);
  const data = img.data;
  const { fbmX } = makeNoise(seed);
  const rng = makeRng(seed * 7 + 13);

  const OCT = 5;
  const BP = 8;

  for (let y = 0; y < h; y++) {
    const v = y / h; // 0 north pole → 1 south pole
    const lat = Math.abs(v - 0.5) * 2; // 0 equator → 1 poles
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const nx = u * BP;
      const ny = v * BP * 0.5;
      const n1 = fbmX(nx, ny, OCT, BP);
      const n2 = fbmX(nx * 2.1 + 5.2, ny * 2.1 + 1.3, 4, BP * 2);
      const detail = fbmX(nx * 4.7 + 9.1, ny * 4.7 + 3.7, 3, BP * 4);
      const i = (y * w + x) * 4;
      let col: RGB;

      switch (kind) {
        case "mercury":
        case "moon": {
          const base = kind === "mercury" ? hex("#8d8478") : hex("#9a9a9e");
          const dark = kind === "mercury" ? hex("#5d564d") : hex("#6e6e74");
          const light = kind === "mercury" ? hex("#b3a898") : hex("#c9c9cf");
          col = mix3(dark, base, smoothstep(-0.5, 0.35, n1));
          col = mix3(col, light, smoothstep(0.25, 0.8, n2) * 0.5);
          const shade = 0.92 + detail * 0.14;
          col = [col[0] * shade, col[1] * shade, col[2] * shade];
          break;
        }
        case "venus": {
          const streak = fbmX(nx * 1.4, ny * 5.5 + Math.sin(u * 12.56) * 0.4, 4, BP);
          col = bandPalette(
            [
              [0, "#c49a6c"], [0.25, "#e0c194"], [0.5, "#efdcb2"],
              [0.7, "#d9b380"], [1, "#b98d5f"],
            ],
            v + streak * 0.24 + n1 * 0.06,
          );
          const shade = 0.96 + detail * 0.08;
          col = [col[0] * shade, col[1] * shade, col[2] * shade];
          break;
        }
        case "earth": {
          const sea = 0.06;
          if (n1 < sea) {
            const depth = smoothstep(sea, -0.45, n1);
            col = mix3(hex("#1a6fa0"), hex("#04163a"), depth);
            col = mix3(col, hex("#0b3d66"), 0.45);
          } else {
            const m = fbmX(nx * 1.6 + 11, ny * 1.6 + 7, 4, BP * 2);
            const desertBand = smoothstep(0.55, 0.25, lat) * smoothstep(0.02, 0.3, m);
            col = mix3(hex("#2d6a2d"), hex("#8a7a3d"), clamp01(desertBand + smoothstep(0.45, 0.75, n2) * 0.4));
            col = mix3(col, hex("#5a4a2e"), smoothstep(0.35, 0.7, n1) * 0.45); // mountains
            col = mix3(col, hex("#7a8a6a"), smoothstep(0.55, 0.8, lat) * 0.6); // tundra
          }
          // polar ice with noisy edge
          const iceLine = 0.86 + n2 * 0.05;
          if (lat > iceLine) {
            col = mix3(col, hex("#eef4fb"), smoothstep(iceLine, iceLine + 0.05, lat));
          }
          // shallow shelves near coasts
          if (n1 < sea && n1 > sea - 0.05) col = mix3(col, hex("#2a8ab0"), 0.4);
          break;
        }
        case "mars": {
          const base = hex("#b5532c");
          const dark = hex("#6e2f1a");
          const dust = hex("#d98a54");
          col = mix3(dark, base, smoothstep(-0.5, 0.3, n1));
          col = mix3(col, dust, smoothstep(0.2, 0.75, n2) * 0.55);
          // dark basaltic south
          col = mix3(col, hex("#4a2012"), smoothstep(0.55, 0.95, v) * 0.35 * (0.5 + n1 * 0.5));
          // canyon streak near equator
          const canyon = Math.exp(-Math.pow((v - 0.52) * 14, 2)) * smoothstep(0.1, 0.5, n1);
          col = mix3(col, hex("#3a1a0e"), canyon * 0.5);
          const cap = 0.93 + n2 * 0.02;
          if (lat > cap) col = mix3(col, hex("#f2ece2"), smoothstep(cap, cap + 0.03, lat));
          const shade = 0.94 + detail * 0.1;
          col = [col[0] * shade, col[1] * shade, col[2] * shade];
          break;
        }
        case "jupiter": {
          const turb = fbmX(nx * 2.2, ny * 6.5, 4, BP * 2) * 0.09;
          const t = clamp01(v + turb + Math.sin(u * 25 + v * 9) * 0.008);
          col = bandPalette(
            [
              [0, "#a9805e"], [0.12, "#d8b48f"], [0.2, "#8f5a35"], [0.3, "#e8d3b0"],
              [0.4, "#b07a4f"], [0.5, "#e0c193"], [0.58, "#a66a3f"], [0.66, "#e8d8b8"],
              [0.78, "#c49a6e"], [0.9, "#8a5f3d"], [1, "#c2a077"],
            ],
            t,
          );
          // Great Red Spot
          const dx = (u - 0.66) / 0.075;
          const dy = (v - 0.63) / 0.055;
          const d = dx * dx + dy * dy;
          if (d < 1) {
            const rim = smoothstep(1, 0.72, d);
            col = mix3(col, hex("#c2543a"), rim * 0.9);
            col = mix3(col, hex("#e08a5a"), smoothstep(0.45, 0, d) * 0.7);
          }
          const shade = 0.95 + detail * 0.09;
          col = [col[0] * shade, col[1] * shade, col[2] * shade];
          break;
        }
        case "saturn": {
          const turb = fbmX(nx * 1.8, ny * 5, 4, BP * 2) * 0.07;
          col = bandPalette(
            [
              [0, "#b39b72"], [0.2, "#e3cfa3"], [0.38, "#c9ad7f"],
              [0.5, "#f0e2ba"], [0.62, "#d4b98c"], [0.8, "#e8d6ab"], [1, "#a68f66"],
            ],
            clamp01(v + turb),
          );
          const shade = 0.96 + detail * 0.07;
          col = [col[0] * shade, col[1] * shade, col[2] * shade];
          break;
        }
        case "uranus": {
          const turb = fbmX(nx * 1.5, ny * 4, 3, BP) * 0.05;
          col = bandPalette(
            [[0, "#8fd4d6"], [0.35, "#a5e8e6"], [0.55, "#9fe3e8"], [0.8, "#86cfd4"], [1, "#79c2c8"]],
            clamp01(v + turb),
          );
          // faint polar hood
          col = mix3(col, hex("#6fb3b8"), smoothstep(0.8, 1, v) * 0.4);
          const shade = 0.97 + detail * 0.05;
          col = [col[0] * shade, col[1] * shade, col[2] * shade];
          break;
        }
        case "neptune": {
          const streak = fbmX(nx * 3.2, ny * 7.5, 4, BP * 3);
          col = bandPalette(
            [[0, "#1a2f8f"], [0.3, "#2a4fd8"], [0.5, "#3f6fe8"], [0.68, "#2748c8"], [1, "#16267e"]],
            clamp01(v + streak * 0.14),
          );
          // bright cirrus streaks
          const cirrus = smoothstep(0.45, 0.75, streak) * 0.5;
          col = mix3(col, hex("#9fc4ff"), cirrus);
          // dark spot
          const dx = (u - 0.4) / 0.06;
          const dy = (v - 0.42) / 0.045;
          if (dx * dx + dy * dy < 1) col = mix3(col, hex("#101c5e"), 0.75);
          break;
        }
        case "pluto": {
          const base = hex("#b8a48e");
          const dark = hex("#6e5b49");
          col = mix3(dark, base, smoothstep(-0.45, 0.4, n1));
          col = mix3(col, hex("#d8c8b2"), smoothstep(0.3, 0.7, n2) * 0.5);
          // Tombaugh Regio — the pale heart
          const hx = (u - 0.55) / 0.13;
          const hy = (v - 0.52) / 0.15;
          const hd = hx * hx + hy * hy;
          if (hd < 1) col = mix3(col, hex("#ece0cd"), smoothstep(1, 0.5, hd) * 0.85);
          const shade = 0.94 + detail * 0.1;
          col = [col[0] * shade, col[1] * shade, col[2] * shade];
          break;
        }
        case "europa": {
          col = mix3(hex("#a8998a"), hex("#e4d6c2"), smoothstep(-0.4, 0.4, n1));
          // lineae cracks
          const crack = Math.abs(fbmX(nx * 3 + 40, ny * 3, 3, BP * 3));
          col = mix3(col, hex("#8a4a3a"), smoothstep(0.08, 0.0, crack) * 0.55);
          break;
        }
        case "titan": {
          col = mix3(hex("#c98f2e"), hex("#e8b95a"), smoothstep(-0.4, 0.5, n1 + n2 * 0.3));
          col = mix3(col, hex("#8a5a1a"), smoothstep(0.7, 1, lat) * 0.3);
          break;
        }
      }

      data[i] = Math.max(0, Math.min(255, col[0]));
      data[i + 1] = Math.max(0, Math.min(255, col[1]));
      data[i + 2] = Math.max(0, Math.min(255, col[2]));
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);

  // craters for rocky bodies
  if (kind === "mercury" || kind === "moon") {
    paintCraters(ctx, rng, w, h, kind === "mercury" ? 150 : 110, w * 0.035, 1);
  } else if (kind === "mars" || kind === "pluto") {
    paintCraters(ctx, rng, w, h, 46, w * 0.02, 0.55);
  }

  return canvas;
}

function generateClouds(w: number, h: number, seed: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(w, h);
  const data = img.data;
  const { fbmX } = makeNoise(seed);
  const BP = 8;
  for (let y = 0; y < h; y++) {
    const v = y / h;
    // swirl offset varies with latitude (cyclonic shear)
    const shear = Math.sin(v * Math.PI * 3 + 1) * 0.7;
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const n = fbmX((u + shear * 0.08) * BP * 1.5, v * BP * 2.6, 5, BP);
      const n2 = fbmX(u * BP * 3 + 7, v * BP * 5, 3, BP * 3);
      const a = smoothstep(0.02, 0.5, n * 0.7 + n2 * 0.3) * 0.92;
      const i = (y * w + x) * 4;
      const bright = 235 + n2 * 20;
      data[i] = bright;
      data[i + 1] = bright;
      data[i + 2] = 245;
      data[i + 3] = Math.max(0, Math.min(255, a * 255));
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas;
}

function canvasTexture(canvas: HTMLCanvasElement, srgb = true) {
  const tex = new THREE.CanvasTexture(canvas);
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  return tex;
}

/* ------------------------------------------------------------------ */
/*  Shaders — atmosphere, rings, sun glow                               */
/* ------------------------------------------------------------------ */

const atmosphereVertex = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragment = /* glsl */ `
  uniform vec3 glowColor;
  uniform float strength;
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.4);
    gl_FragColor = vec4(glowColor, 1.0) * intensity * strength;
  }
`;

function createAtmosphere(size: number, color: string, strength: number) {
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      glowColor: { value: new THREE.Color(color) },
      strength: { value: strength * 1.6 },
    },
    vertexShader: atmosphereVertex,
    fragmentShader: atmosphereFragment,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(size * 1.22, 48, 32), mat);
  mesh.renderOrder = 5;
  return mesh;
}

const ringVertex = /* glsl */ `
  varying vec2 vLocal;
  void main() {
    vLocal = position.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ringFragment = /* glsl */ `
  uniform float innerR;
  uniform float outerR;
  uniform vec3 colorA;
  uniform vec3 colorB;
  uniform float time;
  varying vec2 vLocal;

  float hash(float n) { return fract(sin(n) * 43758.5453123); }

  void main() {
    float r = length(vLocal);
    float t = (r - innerR) / (outerR - innerR);
    float edge = smoothstep(0.0, 0.06, t) * smoothstep(1.0, 0.94, t);
    float bands = 0.5 + 0.5 * sin(t * 46.0 + sin(t * 13.0) * 2.2);
    bands = pow(bands, 1.4);
    float grain = 0.75 + 0.25 * hash(floor(t * 220.0));
    // Cassini-style division
    float cassini = smoothstep(0.025, 0.05, abs(t - 0.64));
    float alpha = edge * (0.25 + 0.75 * bands) * grain * (0.25 + 0.75 * cassini);
    vec3 col = mix(colorA, colorB, bands * 0.7 + t * 0.3);
    gl_FragColor = vec4(col, alpha * 0.92);
  }
`;

function createRing(size: number, inner: number, outer: number, tintA: string, tintB: string) {
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      innerR: { value: size * inner },
      outerR: { value: size * outer },
      colorA: { value: new THREE.Color(tintA) },
      colorB: { value: new THREE.Color(tintB) },
      time: { value: 0 },
    },
    vertexShader: ringVertex,
    fragmentShader: ringFragment,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(
    new THREE.RingGeometry(size * inner, size * outer, 160, 1),
    mat,
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.renderOrder = 4;
  return mesh;
}

function createSunSprite(): THREE.Sprite {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, "rgba(255,255,244,1)");
  g.addColorStop(0.12, "rgba(255,244,214,1)");
  g.addColorStop(0.28, "rgba(255,214,140,0.85)");
  g.addColorStop(0.55, "rgba(255,150,60,0.22)");
  g.addColorStop(1, "rgba(255,120,40,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: canvasTexture(c),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      toneMapped: false,
    }),
  );
  sprite.scale.setScalar(70);
  sprite.renderOrder = 1;
  return sprite;
}

/* ------------------------------------------------------------------ */
/*  Solar system builder                                                */
/* ------------------------------------------------------------------ */

export interface MoonRuntime {
  pivot: THREE.Group;
  speed: number;
}

export interface PlanetRuntime {
  def: PlanetDef;
  group: THREE.Group;
  surface: THREE.Mesh;
  clouds: THREE.Mesh | null;
  atmosphere: THREE.Mesh | null;
  ring: THREE.Mesh | null;
  moons: MoonRuntime[];
  spin: number;
}

export interface SolarSystem {
  planets: PlanetRuntime[];
  belt: THREE.InstancedMesh;
  beltData: Array<{ x: number; y: number; z: number; s: number; rx: number; ry: number; speed: number }>;
  sunLight: THREE.DirectionalLight;
  update: (delta: number, elapsed: number, motionScale: number) => void;
  dispose: () => void;
}

export function buildSolarSystem(
  scene: THREE.Scene,
  curve: THREE.CatmullRomCurve3,
  random: () => number,
  lowDetail: boolean,
): SolarSystem {
  const disposables: Array<{ dispose: () => void }> = [];
  const track = <T extends { dispose: () => void }>(d: T): T => {
    disposables.push(d);
    return d;
  };

  /* Sun light + visible sun */
  const sunLight = new THREE.DirectionalLight(0xfff2dd, 2.6);
  sunLight.position.set(60, 34, 80);
  sunLight.target.position.set(0, 0, -350);
  scene.add(sunLight, sunLight.target);
  const sun = createSunSprite();
  sun.position.set(120, 68, 130);
  scene.add(sun);
  track(sun.material);
  track(sun.geometry);

  const seg = lowDetail ? 40 : 64;
  const texW = lowDetail ? 384 : 768;
  const texH = lowDetail ? 192 : 384;
  const bigW = lowDetail ? 512 : 1024;
  const bigH = lowDetail ? 256 : 512;

  const anchor = new THREE.Vector3();
  const planets: PlanetRuntime[] = [];

  const moonTextureCache = new Map<TextureKind, THREE.Texture>();

  const surfaceTexture = (kind: TextureKind, large: boolean) => {
    const tex = track(
      canvasTexture(
        generateSurface(kind, large ? bigW : texW, large ? bigH : texH, 1000 + kind.length * 77 + kind.charCodeAt(0)),
      ),
    );
    return tex;
  };

  for (const def of PLANETS) {
    const t = chapterT(def.chapterIndex);
    curve.getPointAt(t, anchor);

    const group = new THREE.Group();
    group.position.set(
      anchor.x + def.side * def.lateral,
      anchor.y + def.lift,
      anchor.z,
    );
    group.rotation.z = def.tilt;

    const large = def.size >= 5 || def.id === "earth";
    const map = surfaceTexture(def.kind, large);
    const surface = new THREE.Mesh(
      track(new THREE.SphereGeometry(def.size, seg, Math.round(seg * 0.75))),
      track(
        new THREE.MeshStandardMaterial({
          map,
          roughness: def.roughness,
          metalness: def.metalness,
        }),
      ),
    );
    group.add(surface);

    /* clouds */
    let clouds: THREE.Mesh | null = null;
    if (def.clouds) {
      clouds = new THREE.Mesh(
        track(new THREE.SphereGeometry(def.size * 1.018, seg, Math.round(seg * 0.75))),
        track(
          new THREE.MeshStandardMaterial({
            map: track(canvasTexture(generateClouds(large ? bigW : texW, large ? bigH : texH, 4242))),
            transparent: true,
            depthWrite: false,
            roughness: 1,
            metalness: 0,
          }),
        ),
      );
      group.add(clouds);
    }

    /* atmosphere shell */
    let atmosphere: THREE.Mesh | null = null;
    if (def.atmosphere) {
      atmosphere = createAtmosphere(def.size, def.atmosphere, def.atmosphereStrength);
      track(atmosphere.geometry);
      track(atmosphere.material as THREE.Material);
      group.add(atmosphere);
    }

    /* rings */
    let ring: THREE.Mesh | null = null;
    if (def.ring) {
      ring = createRing(def.size, def.ring.inner, def.ring.outer, def.ring.tintA, def.ring.tintB);
      track(ring.geometry);
      track(ring.material as THREE.Material);
      group.add(ring);
    }

    scene.add(group);
    planets.push({ def, group, surface, clouds, atmosphere, ring, moons: [], spin: def.rotSpeed });
  }

  /* Moons — Luna, Europa, Titan */
  const addMoon = (
    planetId: string,
    kind: TextureKind,
    size: number,
    orbit: number,
    speed: number,
    phase: number,
  ) => {
    const planet = planets.find((p) => p.def.id === planetId);
    if (!planet) return;
    let tex = moonTextureCache.get(kind);
    if (!tex) {
      tex = track(canvasTexture(generateSurface(kind, 256, 128, 900 + kind.length * 31)));
      moonTextureCache.set(kind, tex);
    }
    const pivot = new THREE.Group();
    const moon = new THREE.Mesh(
      track(new THREE.SphereGeometry(size, 28, 20)),
      track(new THREE.MeshStandardMaterial({ map: tex, roughness: 1, metalness: 0 })),
    );
    moon.position.set(orbit, 0, 0);
    pivot.add(moon);
    pivot.rotation.y = phase;
    pivot.rotation.x = 0.08;
    planet.group.add(pivot);
    planet.moons.push({ pivot, speed });
  };

  addMoon("earth", "moon", 0.95, 6.4, 0.32, 0.6);
  addMoon("jupiter", "europa", 1.5, 13.5, 0.2, 2.1);
  addMoon("saturn", "titan", 1.3, 12.4, 0.16, 4.0);

  /* Asteroid belt between Mars and Jupiter */
  const beltCount = lowDetail ? 110 : 190;
  const belt = new THREE.InstancedMesh(
    track(new THREE.DodecahedronGeometry(1, 0)),
    track(new THREE.MeshStandardMaterial({ color: 0x8a7f74, roughness: 1, metalness: 0.05 })),
    beltCount,
  );
  const beltData: SolarSystem["beltData"] = [];
  const beltT0 = chapterT(4) + 0.012;
  const beltT1 = chapterT(5) - 0.025;
  const bp = new THREE.Vector3();
  const dummy = new THREE.Object3D();
  for (let i = 0; i < beltCount; i++) {
    const t = beltT0 + random() * (beltT1 - beltT0);
    curve.getPointAt(t, bp);
    const angle = random() * Math.PI * 2;
    const radius = 7 + random() * 11;
    const entry = {
      x: bp.x + Math.cos(angle) * radius,
      y: bp.y + (random() - 0.5) * 7,
      z: bp.z + Math.sin(angle) * radius * 0.6,
      s: 0.08 + Math.pow(random(), 2) * 0.5,
      rx: random() * Math.PI * 2,
      ry: random() * Math.PI * 2,
      speed: 0.15 + random() * 0.5,
    };
    beltData.push(entry);
    dummy.position.set(entry.x, entry.y, entry.z);
    dummy.rotation.set(entry.rx, entry.ry, 0);
    dummy.scale.setScalar(entry.s);
    dummy.updateMatrix();
    belt.setMatrixAt(i, dummy.matrix);
  }
  belt.instanceMatrix.needsUpdate = true;
  scene.add(belt);

  const update = (delta: number, _elapsed: number, motionScale: number) => {
    const d = delta * motionScale;
    for (const p of planets) {
      p.surface.rotation.y += p.spin * d;
      if (p.clouds) p.clouds.rotation.y += (p.spin * 1.35 + 0.008) * d;
      for (const m of p.moons) m.pivot.rotation.y += m.speed * d;
    }
    for (let i = 0; i < beltData.length; i++) {
      const b = beltData[i];
      b.rx += b.speed * d * 0.4;
      b.ry += b.speed * d * 0.3;
      dummy.position.set(b.x, b.y, b.z);
      dummy.rotation.set(b.rx, b.ry, 0);
      dummy.scale.setScalar(b.s);
      dummy.updateMatrix();
      belt.setMatrixAt(i, dummy.matrix);
    }
    belt.instanceMatrix.needsUpdate = true;
  };

  const dispose = () => {
    scene.remove(sunLight, sunLight.target, sun, belt);
    for (const p of planets) scene.remove(p.group);
    disposables.forEach((r) => r.dispose());
    disposables.length = 0;
  };

  return { planets, belt, beltData, sunLight, update, dispose };
}
