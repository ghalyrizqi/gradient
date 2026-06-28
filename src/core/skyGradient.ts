import type { JapaneseStyle, ColorStop } from './types.ts';

// ── Types ──────────────────────────────────────────────────────────

export interface HslStop {
  h: number;  // hue 0–360
  s: number;  // saturation 0–100
  l: number;  // lightness 0–100
}

export interface SkyMoment {
  readonly name: string;
  readonly w: number;
  readonly stops: readonly HslStop[];
}

export interface SkyGradient {
  css: string;          // linear-gradient(in oklab to bottom, …)
  moment: string;       // archetype name
  stops: ColorStop[];   // oklab-densified stops for canvas
  hslStops: HslStop[];  // jittered + styled anchor stops
  positions: number[];  // exact stop positions used for CSS/canvas rendering
  styleVariant: StyleVariant;
}

export interface SkyGradientOpts {
  seed?:   string;
  moment?: string;
  style?:  JapaneseStyle;
}

export interface StyleVariant {
  vividBlend: number; // 0 = old Subtle, 1 = old Sky
  veilCut: number;    // old Nezumi→Greydient range, 30..50
}

// ── Archetype library ──────────────────────────────────────────────
// Zenith (top) is cool + deep; horizon (bottom) is warm + light.
// Ordering: first stop = sky zenith, last stop = horizon glow.

export const SKY_MOMENTS: readonly SkyMoment[] = [
  // ── Core sky moments ──────────────────────────────────────────────
  { name: 'first light',   w: 2, stops: [{h:232,s:42,l:24},{h:255,s:30,l:40},{h:18,s:55,l:72}] },
  { name: 'dawn',          w: 3, stops: [{h:248,s:40,l:34},{h:330,s:48,l:62},{h:38,s:72,l:80}] },
  { name: 'clear morning', w: 3, stops: [{h:205,s:55,l:70},{h:198,s:42,l:88}] },
  { name: 'hazy morning',  w: 2, stops: [{h:18,s:24,l:74},{h:42,s:30,l:86}] },
  { name: 'midday',        w: 3, stops: [{h:212,s:58,l:58},{h:202,s:48,l:80}] },
  { name: 'golden hour',   w: 3, stops: [{h:220,s:44,l:52},{h:35,s:74,l:70},{h:28,s:84,l:74}] },
  { name: 'sunset',        w: 3, stops: [{h:250,s:44,l:34},{h:328,s:54,l:60},{h:20,s:80,l:66}] },
  { name: 'afterglow',     w: 2, stops: [{h:268,s:40,l:38},{h:340,s:46,l:58},{h:32,s:60,l:70}] },
  { name: 'blue hour',     w: 3, stops: [{h:236,s:50,l:20},{h:222,s:40,l:38},{h:26,s:34,l:52}] },
  { name: 'overcast',      w: 2, stops: [{h:210,s:14,l:60},{h:200,s:11,l:80}] },

  // ── Nuevo.tokyo — soft pastels, city-pop nostalgia ─────────────────
  { name: 'city-pop dawn', w: 2, stops: [{h:272,s:22,l:56},{h:332,s:26,l:72},{h:18,s:22,l:84}] },
  { name: 'summer haze',   w: 2, stops: [{h:30,s:22,l:74},{h:46,s:16,l:86}] },
  { name: 'late afternoon',w: 2, stops: [{h:248,s:18,l:66},{h:336,s:20,l:76},{h:34,s:22,l:86}] },
  { name: 'pastel dusk',   w: 2, stops: [{h:252,s:16,l:68},{h:318,s:18,l:78},{h:36,s:16,l:88}] },
  { name: 'sakura haze',   w: 2, stops: [{h:348,s:26,l:70},{h:18,s:22,l:82},{h:38,s:14,l:90}] },

  // ── Sho Shibuya / moody Tokyo ──────────────────────────────────────
  { name: 'smog morning',  w: 1, stops: [{h:32,s:16,l:54},{h:44,s:10,l:74}] },
  { name: 'rain grey',     w: 1, stops: [{h:210,s:14,l:46},{h:204,s:10,l:70}] },
  { name: 'humid haze',    w: 1, stops: [{h:150,s:10,l:60},{h:140,s:7,l:80}] },
  { name: 'deep dusk',     w: 2, stops: [{h:240,s:36,l:18},{h:256,s:26,l:34},{h:272,s:18,l:48}] },
  { name: 'midnight',      w: 2, stops: [{h:230,s:52,l:14},{h:222,s:40,l:24},{h:214,s:28,l:36}] },

  // ── Nippon Colors catalog — precise hue vocabulary ─────────────────
  // Asagi (浅葱) — the blue-green of shallow water, sea at dawn
  { name: 'asagi dawn',    w: 2, stops: [{h:185,s:40,l:36},{h:186,s:26,l:60},{h:36,s:18,l:84}] },
  // Fuji (藤) — wisteria violet dusk; koniro zenith → fuji-iro mid → soft rose horizon
  { name: 'fuji eve',      w: 2, stops: [{h:216,s:34,l:24},{h:249,s:36,l:60},{h:336,s:20,l:76}] },
  // Toki (鴇色) — ibis blush; softer than sakura haze, warmer pink family
  { name: 'toki blush',    w: 2, stops: [{h:346,s:34,l:62},{h:348,s:22,l:76},{h:36,s:12,l:90}] },
  // Gunjou (群青) — ultramarine night; deep and cool with a warm amber hint
  { name: 'gunjou deep',   w: 2, stops: [{h:225,s:46,l:13},{h:220,s:36,l:26},{h:26,s:26,l:54}] },
  // Yamabuki (山吹色) — kerria yellow gold at horizon; vivid rare moment
  { name: 'yamabuki noon', w: 1, stops: [{h:210,s:40,l:50},{h:34,s:74,l:72},{h:44,s:90,l:78}] },
  // Enji (臙脂) — crimson-indigo dusk; the dramatic Edo-era sunset
  { name: 'enji dusk',     w: 1, stops: [{h:242,s:30,l:16},{h:340,s:52,l:38},{h:14,s:62,l:60}] },
  // Rikyunezumi (利休鼠) — Rikyu grey-green mist; tea-ceremony quietude
  { name: 'rikyunezumi',   w: 1, stops: [{h:145,s:8,l:44},{h:148,s:6,l:68}] },
  // Ainezumi (藍鼠) — indigo-grey overcast; bleached Tokyo winter sky
  { name: 'ainezumi sky',  w: 1, stops: [{h:205,s:20,l:36},{h:204,s:14,l:62}] },
] as const;

// ── Moment → approximate hour of day ──────────────────────────────

export const MOMENT_HOURS: Readonly<Record<string, number>> = {
  'first light':    4,
  'dawn':           6,
  'clear morning':  8,
  'hazy morning':   8,
  'midday':        12,
  'golden hour':   17,
  'sunset':        19,
  'afterglow':     20,
  'blue hour':     21,
  'overcast':      11,
  'city-pop dawn':  7,
  'summer haze':   15,
  'late afternoon':16,
  'pastel dusk':   19,
  'sakura haze':    8,
  'smog morning':   9,
  'rain grey':     11,
  'humid haze':     9,
  'deep dusk':     21,
  'midnight':       1,
  'asagi dawn':     6,
  'fuji eve':      20,
  'toki blush':     5,
  'gunjou deep':    0,
  'yamabuki noon': 12,
  'enji dusk':     19,
  'rikyunezumi':   10,
  'ainezumi sky':  11,
};

// ── PRNG: xmur3 hash → mulberry32 ─────────────────────────────────

function xmur3(str: string): number {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  h = Math.imul(h ^ (h >>> 16), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  return (h ^ (h >>> 16)) >>> 0;
}

function mulberry32(seed: number): () => number {
  let s = seed;
  return () => {
    s += 0x6D2B79F5;
    let t = Math.imul(s ^ (s >>> 15), s | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeRng(seed?: string): () => number {
  return seed !== undefined ? mulberry32(xmur3(seed)) : Math.random;
}

// ── Weighted pick ──────────────────────────────────────────────────

export function pickWeighted(moments: readonly SkyMoment[], rng: () => number): SkyMoment {
  const total = moments.reduce((s, m) => s + m.w, 0);
  let r = rng() * total;
  for (const m of moments) {
    r -= m.w;
    if (r <= 0) return m;
  }
  return moments[moments.length - 1];
}

// ── Hue-biased pick (for color mode) ──────────────────────────────

export function pickWeightedByHue(hue: number, rng: () => number): SkyMoment {
  // Score = archetype weight × Gaussian centered on hue proximity
  const scored = (SKY_MOMENTS as SkyMoment[]).map(m => {
    const avgH = m.stops.reduce((s, stop) => s + stop.h, 0) / m.stops.length;
    let d = Math.abs(avgH - hue);
    if (d > 180) d = 360 - d;
    return { m, score: Math.exp(-d / 70) * m.w };
  });
  const total = scored.reduce((s, { score }) => s + score, 0);
  let r = rng() * total;
  for (const { m, score } of scored) {
    r -= score;
    if (r <= 0) return m;
  }
  return scored[scored.length - 1].m;
}

// ── Jitter (bounded, deterministic via rng) ────────────────────────

const JITTER = { h: 8, s: 8, l: 5 } as const;

function jitterStop(stop: HslStop, rng: () => number): HslStop {
  return {
    h: ((stop.h + (rng() * 2 - 1) * JITTER.h) + 360) % 360,
    s: Math.max(5,  Math.min(90, stop.s + (rng() * 2 - 1) * JITTER.s)),
    l: Math.max(12, Math.min(92, stop.l + (rng() * 2 - 1) * JITTER.l)),
  };
}

// ── JapaneseStyle variation ───────────────────────────────────────

export function createStyleVariant(style: JapaneseStyle, rng: () => number): StyleVariant {
  return style === 'veil'
    ? { vividBlend: 0, veilCut: 30 + rng() * 20 }
    : { vividBlend: rng(), veilCut: 0 };
}

export function styleHslStop(
  stop: HslStop,
  index: number,
  total: number,
  style: JapaneseStyle,
  variant: StyleVariant,
): HslStop {
  if (style === 'vivid') {
    const blend = variant.vividBlend;
    if (index === 0) return { h: stop.h, s: Math.min(90, stop.s + 15 * blend), l: Math.max(12, stop.l - 8 * blend) };
    if (index === total - 1) return { h: stop.h, s: Math.min(90, stop.s + 5 * blend), l: stop.l };
    return { h: stop.h, s: Math.min(90, stop.s + 8 * blend), l: stop.l };
  }
  return { ...stop, s: Math.max(0, stop.s - variant.veilCut) };
}

function applyStyleToHsl(stops: HslStop[], style: JapaneseStyle, variant: StyleVariant): HslStop[] {
  return stops.map((stop, i) => styleHslStop(stop, i, stops.length, style, variant));
}

// ── Stop positions (non-linear — warm sits low at horizon) ─────────

export function normalStopPositions(n: number): number[] {
  if (n === 2) return [0, 1];
  if (n === 3) return [0, 0.65, 1];
  if (n === 4) return [0, 0.38, 0.70, 1];
  return Array.from({ length: n }, (_, i) => i / (n - 1));
}

export function skyStopPositions(n: number): number[] {
  if (n === 2) return [0, 1];
  if (n === 3) return [0, 0.85, 1];
  if (n === 4) return [0, 0.50, 0.86, 1];
  return Array.from({ length: n }, (_, i) => i / (n - 1));
}

function stopPositions(n: number, style?: JapaneseStyle, variant?: StyleVariant): number[] {
  if (style === 'vivid') {
    const normal = normalStopPositions(n);
    const sky = skyStopPositions(n);
    const blend = variant?.vividBlend ?? 1;
    return normal.map((pos, i) => pos + (sky[i] - pos) * blend);
  }
  return normalStopPositions(n);
}

// ── Color math for canvas oklab approximation ──────────────────────

type RGB = [number, number, number];  // 0–1 linear

function hslToRgb(h: number, s: number, l: number): RGB {
  const ss = s / 100, ll = l / 100;
  const c = (1 - Math.abs(2 * ll - 1)) * ss;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ll - c / 2;
  let r = 0, g = 0, b = 0;
  if      (h < 60)  { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else              { r = c; b = x; }
  return [r + m, g + m, b + m];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const ll = (max + min) / 2;
  let h = 0, ss = 0;
  if (max !== min) {
    const d = max - min;
    ss = ll > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      default: h = ((r - g) / d + 4) / 6;
    }
  }
  return [h * 360, ss * 100, ll * 100];
}

function srgbToLinear(x: number): number {
  return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
}

function linearToSrgb(x: number): number {
  return x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055;
}

function rgbToOklab(r: number, g: number, b: number): [number, number, number] {
  const lr = srgbToLinear(r), lg = srgbToLinear(g), lb = srgbToLinear(b);
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return [
    0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s,
  ];
}

function oklabToRgb(L: number, a: number, bv: number): RGB {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * bv;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * bv;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * bv;
  const lc = l_ ** 3, mc = m_ ** 3, sc = s_ ** 3;
  return [
    Math.max(0, Math.min(1, linearToSrgb(4.0767416621 * lc - 3.3077115913 * mc + 0.2309699292 * sc))),
    Math.max(0, Math.min(1, linearToSrgb(-1.2684380046 * lc + 2.6097574011 * mc - 0.3413193965 * sc))),
    Math.max(0, Math.min(1, linearToSrgb(-0.0041960863 * lc - 0.7034186147 * mc + 1.7076147010 * sc))),
  ];
}

// ── Oklab-interpolated segment (densification for canvas) ──────────

const SEG_STEPS = 6;

function interpolateSegment(a: HslStop, b: HslStop): Array<{ t: number; color: string }> {
  const [ar, ag, ab] = hslToRgb(a.h, a.s, a.l);
  const [br, bg, bb] = hslToRgb(b.h, b.s, b.l);
  const oa = rgbToOklab(ar, ag, ab);
  const ob = rgbToOklab(br, bg, bb);

  return Array.from({ length: SEG_STEPS }, (_, i) => {
    const t = i / (SEG_STEPS - 1);
    const [r, g, bx] = oklabToRgb(
      oa[0] + (ob[0] - oa[0]) * t,
      oa[1] + (ob[1] - oa[1]) * t,
      oa[2] + (ob[2] - oa[2]) * t,
    );
    const [h, s, l] = rgbToHsl(r, g, bx);
    // comma-separated for canvas API compatibility
    return { t, color: `hsl(${h.toFixed(0)}, ${s.toFixed(1)}%, ${l.toFixed(1)}%)` };
  });
}

function buildCanvasStops(stops: HslStop[], positions: number[]): ColorStop[] {
  const result: ColorStop[] = [];
  for (let seg = 0; seg < stops.length - 1; seg++) {
    const posA = positions[seg];
    const posB = positions[seg + 1];
    const pts = interpolateSegment(stops[seg], stops[seg + 1]);
    for (let j = seg === 0 ? 0 : 1; j < SEG_STEPS; j++) {
      result.push({ pos: posA + (posB - posA) * pts[j].t, color: pts[j].color });
    }
  }
  return result;
}

// ── CSS string (native oklab interpolation in modern browsers) ─────

function buildCss(stops: HslStop[], positions: number[]): string {
  const parts = stops.map((s, i) =>
    `hsl(${s.h.toFixed(0)} ${s.s.toFixed(1)}% ${s.l.toFixed(1)}%) ${(positions[i] * 100).toFixed(0)}%`,
  );
  return `linear-gradient(in oklab to bottom, ${parts.join(', ')})`;
}

// ── Render pre-built HSL stops (after external NLP nudges) ─────────

export function renderFromHsl(
  hslStops: HslStop[],
  momentName: string,
  style: JapaneseStyle = 'vivid',
  positions = stopPositions(hslStops.length, style),
  styleVariant: StyleVariant = { vividBlend: style === 'vivid' ? 1 : 0, veilCut: style === 'veil' ? 40 : 0 },
): SkyGradient {
  return {
    css:      buildCss(hslStops, positions),
    moment:   momentName,
    stops:    buildCanvasStops(hslStops, positions),
    hslStops,
    positions,
    styleVariant,
  };
}

// ── Main API ───────────────────────────────────────────────────────

export function generateSkyGradient(opts: SkyGradientOpts = {}): SkyGradient {
  // Separate seeds so overriding moment doesn't shift jitter phase
  const jitterRng = makeRng(opts.seed);
  const style: JapaneseStyle = opts.style ?? 'vivid';
  const styleRng = makeRng(opts.seed !== undefined ? `${opts.seed}:style` : undefined);
  const styleVariant = createStyleVariant(style, styleRng);

  let moment: SkyMoment;
  if (opts.moment) {
    moment = (SKY_MOMENTS as SkyMoment[]).find(m => m.name === opts.moment) ?? SKY_MOMENTS[0];
  } else {
    const momentRng = makeRng(opts.seed !== undefined ? `${opts.seed}:m` : undefined);
    moment = pickWeighted(SKY_MOMENTS, momentRng);
  }

  const jittered  = (moment.stops as HslStop[]).map(stop => jitterStop({ ...stop }, jitterRng));
  const styled    = applyStyleToHsl(jittered, style, styleVariant);
  const positions = stopPositions(styled.length, style, styleVariant);

  return {
    css:      buildCss(styled, positions),
    moment:   moment.name,
    stops:    buildCanvasStops(styled, positions),
    hslStops: styled,
    positions,
    styleVariant,
  };
}
