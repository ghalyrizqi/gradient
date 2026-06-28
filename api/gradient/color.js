// src/core/skyGradient.ts
var SKY_MOMENTS = [
  // ── Core sky moments ──────────────────────────────────────────────
  { name: "first light", w: 2, stops: [{ h: 232, s: 42, l: 24 }, { h: 255, s: 30, l: 40 }, { h: 18, s: 55, l: 72 }] },
  { name: "dawn", w: 3, stops: [{ h: 248, s: 40, l: 34 }, { h: 330, s: 48, l: 62 }, { h: 38, s: 72, l: 80 }] },
  { name: "clear morning", w: 3, stops: [{ h: 205, s: 55, l: 70 }, { h: 198, s: 42, l: 88 }] },
  { name: "hazy morning", w: 2, stops: [{ h: 18, s: 24, l: 74 }, { h: 42, s: 30, l: 86 }] },
  { name: "midday", w: 3, stops: [{ h: 212, s: 58, l: 58 }, { h: 202, s: 48, l: 80 }] },
  { name: "golden hour", w: 3, stops: [{ h: 220, s: 44, l: 52 }, { h: 35, s: 74, l: 70 }, { h: 28, s: 84, l: 74 }] },
  { name: "sunset", w: 3, stops: [{ h: 250, s: 44, l: 34 }, { h: 328, s: 54, l: 60 }, { h: 20, s: 80, l: 66 }] },
  { name: "afterglow", w: 2, stops: [{ h: 268, s: 40, l: 38 }, { h: 340, s: 46, l: 58 }, { h: 32, s: 60, l: 70 }] },
  { name: "blue hour", w: 3, stops: [{ h: 236, s: 50, l: 20 }, { h: 222, s: 40, l: 38 }, { h: 26, s: 34, l: 52 }] },
  { name: "overcast", w: 2, stops: [{ h: 210, s: 14, l: 60 }, { h: 200, s: 11, l: 80 }] },
  // ── Nuevo.tokyo — soft pastels, city-pop nostalgia ─────────────────
  { name: "city-pop dawn", w: 2, stops: [{ h: 272, s: 22, l: 56 }, { h: 332, s: 26, l: 72 }, { h: 18, s: 22, l: 84 }] },
  { name: "summer haze", w: 2, stops: [{ h: 30, s: 22, l: 74 }, { h: 46, s: 16, l: 86 }] },
  { name: "late afternoon", w: 2, stops: [{ h: 248, s: 18, l: 66 }, { h: 336, s: 20, l: 76 }, { h: 34, s: 22, l: 86 }] },
  { name: "pastel dusk", w: 2, stops: [{ h: 252, s: 16, l: 68 }, { h: 318, s: 18, l: 78 }, { h: 36, s: 16, l: 88 }] },
  { name: "sakura haze", w: 2, stops: [{ h: 348, s: 26, l: 70 }, { h: 18, s: 22, l: 82 }, { h: 38, s: 14, l: 90 }] },
  // ── Sho Shibuya / moody Tokyo ──────────────────────────────────────
  { name: "smog morning", w: 1, stops: [{ h: 32, s: 16, l: 54 }, { h: 44, s: 10, l: 74 }] },
  { name: "rain grey", w: 1, stops: [{ h: 210, s: 14, l: 46 }, { h: 204, s: 10, l: 70 }] },
  { name: "humid haze", w: 1, stops: [{ h: 150, s: 10, l: 60 }, { h: 140, s: 7, l: 80 }] },
  { name: "deep dusk", w: 2, stops: [{ h: 240, s: 36, l: 18 }, { h: 256, s: 26, l: 34 }, { h: 272, s: 18, l: 48 }] },
  { name: "midnight", w: 2, stops: [{ h: 230, s: 52, l: 14 }, { h: 222, s: 40, l: 24 }, { h: 214, s: 28, l: 36 }] },
  // ── Nippon Colors catalog — precise hue vocabulary ─────────────────
  // Asagi (浅葱) — the blue-green of shallow water, sea at dawn
  { name: "asagi dawn", w: 2, stops: [{ h: 185, s: 40, l: 36 }, { h: 186, s: 26, l: 60 }, { h: 36, s: 18, l: 84 }] },
  // Fuji (藤) — wisteria violet dusk; koniro zenith → fuji-iro mid → soft rose horizon
  { name: "fuji eve", w: 2, stops: [{ h: 216, s: 34, l: 24 }, { h: 249, s: 36, l: 60 }, { h: 336, s: 20, l: 76 }] },
  // Toki (鴇色) — ibis blush; softer than sakura haze, warmer pink family
  { name: "toki blush", w: 2, stops: [{ h: 346, s: 34, l: 62 }, { h: 348, s: 22, l: 76 }, { h: 36, s: 12, l: 90 }] },
  // Gunjou (群青) — ultramarine night; deep and cool with a warm amber hint
  { name: "gunjou deep", w: 2, stops: [{ h: 225, s: 46, l: 13 }, { h: 220, s: 36, l: 26 }, { h: 26, s: 26, l: 54 }] },
  // Yamabuki (山吹色) — kerria yellow gold at horizon; vivid rare moment
  { name: "yamabuki noon", w: 1, stops: [{ h: 210, s: 40, l: 50 }, { h: 34, s: 74, l: 72 }, { h: 44, s: 90, l: 78 }] },
  // Enji (臙脂) — crimson-indigo dusk; the dramatic Edo-era sunset
  { name: "enji dusk", w: 1, stops: [{ h: 242, s: 30, l: 16 }, { h: 340, s: 52, l: 38 }, { h: 14, s: 62, l: 60 }] },
  // Rikyunezumi (利休鼠) — Rikyu grey-green mist; tea-ceremony quietude
  { name: "rikyunezumi", w: 1, stops: [{ h: 145, s: 8, l: 44 }, { h: 148, s: 6, l: 68 }] },
  // Ainezumi (藍鼠) — indigo-grey overcast; bleached Tokyo winter sky
  { name: "ainezumi sky", w: 1, stops: [{ h: 205, s: 20, l: 36 }, { h: 204, s: 14, l: 62 }] }
];
var MOMENT_HOURS = {
  "first light": 4,
  "dawn": 6,
  "clear morning": 8,
  "hazy morning": 8,
  "midday": 12,
  "golden hour": 17,
  "sunset": 19,
  "afterglow": 20,
  "blue hour": 21,
  "overcast": 11,
  "city-pop dawn": 7,
  "summer haze": 15,
  "late afternoon": 16,
  "pastel dusk": 19,
  "sakura haze": 8,
  "smog morning": 9,
  "rain grey": 11,
  "humid haze": 9,
  "deep dusk": 21,
  "midnight": 1,
  "asagi dawn": 6,
  "fuji eve": 20,
  "toki blush": 5,
  "gunjou deep": 0,
  "yamabuki noon": 12,
  "enji dusk": 19,
  "rikyunezumi": 10,
  "ainezumi sky": 11
};
function xmur3(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = h << 13 | h >>> 19;
  }
  h = Math.imul(h ^ h >>> 16, 2246822507);
  h = Math.imul(h ^ h >>> 13, 3266489909);
  return (h ^ h >>> 16) >>> 0;
}
function mulberry32(seed) {
  let s = seed;
  return () => {
    s += 1831565813;
    let t = Math.imul(s ^ s >>> 15, s | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function makeRng(seed) {
  return seed !== void 0 ? mulberry32(xmur3(seed)) : Math.random;
}
function pickWeighted(moments, rng) {
  const total = moments.reduce((s, m) => s + m.w, 0);
  let r = rng() * total;
  for (const m of moments) {
    r -= m.w;
    if (r <= 0) return m;
  }
  return moments[moments.length - 1];
}
function pickWeightedByHue(hue, rng) {
  const scored = SKY_MOMENTS.map((m) => {
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
var JITTER = { h: 8, s: 8, l: 5 };
function jitterStop(stop, rng) {
  return {
    h: (stop.h + (rng() * 2 - 1) * JITTER.h + 360) % 360,
    s: Math.max(5, Math.min(90, stop.s + (rng() * 2 - 1) * JITTER.s)),
    l: Math.max(12, Math.min(92, stop.l + (rng() * 2 - 1) * JITTER.l))
  };
}
function createStyleVariant(style, rng) {
  return style === "veil" ? { vividBlend: 0, veilCut: 30 + rng() * 20 } : { vividBlend: rng(), veilCut: 0 };
}
function styleHslStop(stop, index, total, style, variant) {
  if (style === "vivid") {
    const blend = variant.vividBlend;
    if (index === 0) return { h: stop.h, s: Math.min(90, stop.s + 15 * blend), l: Math.max(12, stop.l - 8 * blend) };
    if (index === total - 1) return { h: stop.h, s: Math.min(90, stop.s + 5 * blend), l: stop.l };
    return { h: stop.h, s: Math.min(90, stop.s + 8 * blend), l: stop.l };
  }
  return { ...stop, s: Math.max(0, stop.s - variant.veilCut) };
}
function applyStyleToHsl(stops, style, variant) {
  return stops.map((stop, i) => styleHslStop(stop, i, stops.length, style, variant));
}
function normalStopPositions(n) {
  if (n === 2) return [0, 1];
  if (n === 3) return [0, 0.65, 1];
  if (n === 4) return [0, 0.38, 0.7, 1];
  return Array.from({ length: n }, (_, i) => i / (n - 1));
}
function skyStopPositions(n) {
  if (n === 2) return [0, 1];
  if (n === 3) return [0, 0.85, 1];
  if (n === 4) return [0, 0.5, 0.86, 1];
  return Array.from({ length: n }, (_, i) => i / (n - 1));
}
function stopPositions(n, style, variant) {
  if (style === "vivid") {
    const normal = normalStopPositions(n);
    const sky = skyStopPositions(n);
    const blend = variant?.vividBlend ?? 1;
    return normal.map((pos, i) => pos + (sky[i] - pos) * blend);
  }
  return normalStopPositions(n);
}
function hslToRgb(h, s, l) {
  const ss = s / 100, ll = l / 100;
  const c = (1 - Math.abs(2 * ll - 1)) * ss;
  const x = c * (1 - Math.abs(h / 60 % 2 - 1));
  const m = ll - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }
  return [r + m, g + m, b + m];
}
function rgbToHsl(r, g, b) {
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const ll = (max + min) / 2;
  let h = 0, ss = 0;
  if (max !== min) {
    const d = max - min;
    ss = ll > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      default:
        h = ((r - g) / d + 4) / 6;
    }
  }
  return [h * 360, ss * 100, ll * 100];
}
function srgbToLinear(x) {
  return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
}
function linearToSrgb(x) {
  return x <= 31308e-7 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055;
}
function rgbToOklab(r, g, b) {
  const lr = srgbToLinear(r), lg = srgbToLinear(g), lb = srgbToLinear(b);
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  ];
}
function oklabToRgb(L, a, bv) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * bv;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * bv;
  const s_ = L - 0.0894841775 * a - 1.291485548 * bv;
  const lc = l_ ** 3, mc = m_ ** 3, sc = s_ ** 3;
  return [
    Math.max(0, Math.min(1, linearToSrgb(4.0767416621 * lc - 3.3077115913 * mc + 0.2309699292 * sc))),
    Math.max(0, Math.min(1, linearToSrgb(-1.2684380046 * lc + 2.6097574011 * mc - 0.3413193965 * sc))),
    Math.max(0, Math.min(1, linearToSrgb(-0.0041960863 * lc - 0.7034186147 * mc + 1.707614701 * sc)))
  ];
}
var SEG_STEPS = 6;
function interpolateSegment(a, b) {
  const [ar, ag, ab] = hslToRgb(a.h, a.s, a.l);
  const [br, bg, bb] = hslToRgb(b.h, b.s, b.l);
  const oa = rgbToOklab(ar, ag, ab);
  const ob = rgbToOklab(br, bg, bb);
  return Array.from({ length: SEG_STEPS }, (_, i) => {
    const t = i / (SEG_STEPS - 1);
    const [r, g, bx] = oklabToRgb(
      oa[0] + (ob[0] - oa[0]) * t,
      oa[1] + (ob[1] - oa[1]) * t,
      oa[2] + (ob[2] - oa[2]) * t
    );
    const [h, s, l] = rgbToHsl(r, g, bx);
    return { t, color: `hsl(${h.toFixed(0)}, ${s.toFixed(1)}%, ${l.toFixed(1)}%)` };
  });
}
function buildCanvasStops(stops, positions) {
  const result = [];
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
function buildCss(stops, positions) {
  const parts = stops.map(
    (s, i) => `hsl(${s.h.toFixed(0)} ${s.s.toFixed(1)}% ${s.l.toFixed(1)}%) ${(positions[i] * 100).toFixed(0)}%`
  );
  return `linear-gradient(in oklab to bottom, ${parts.join(", ")})`;
}
function renderFromHsl(hslStops, momentName, style = "vivid", positions = stopPositions(hslStops.length, style), styleVariant = { vividBlend: style === "vivid" ? 1 : 0, veilCut: style === "veil" ? 40 : 0 }) {
  return {
    css: buildCss(hslStops, positions),
    moment: momentName,
    stops: buildCanvasStops(hslStops, positions),
    hslStops,
    positions,
    styleVariant
  };
}
function generateSkyGradient(opts = {}) {
  const jitterRng = makeRng(opts.seed);
  const style = opts.style ?? "vivid";
  const styleRng = makeRng(opts.seed !== void 0 ? `${opts.seed}:style` : void 0);
  const styleVariant = createStyleVariant(style, styleRng);
  let moment;
  if (opts.moment) {
    moment = SKY_MOMENTS.find((m) => m.name === opts.moment) ?? SKY_MOMENTS[0];
  } else {
    const momentRng = makeRng(opts.seed !== void 0 ? `${opts.seed}:m` : void 0);
    moment = pickWeighted(SKY_MOMENTS, momentRng);
  }
  const jittered = moment.stops.map((stop) => jitterStop({ ...stop }, jitterRng));
  const styled = applyStyleToHsl(jittered, style, styleVariant);
  const positions = stopPositions(styled.length, style, styleVariant);
  return {
    css: buildCss(styled, positions),
    moment: moment.name,
    stops: buildCanvasStops(styled, positions),
    hslStops: styled,
    positions,
    styleVariant
  };
}

// src/resolvers/color.ts
function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      default:
        h = ((r - g) / d + 4) / 6;
    }
  }
  return [h * 360, s * 100, l * 100];
}
var colorResolver = {
  id: "color",
  score(input) {
    return input.mode === "color" && !!input.color ? 100 : 0;
  },
  async resolve(input) {
    const hex = input.color ?? "#3a6ea5";
    const style = input.styleOverride ?? "vivid";
    const [hue, pickedS, pickedL] = hexToHsl(hex);
    const seed = input.shuffleSeed ? `${hex}:${input.shuffleSeed}` : hex;
    const rng = makeRng(`${seed}:m`);
    const moment = pickWeightedByHue(hue, rng).name;
    const sky = generateSkyGradient({ seed, moment, style });
    const anchor = styleHslStop(
      { h: hue, s: pickedS, l: pickedL },
      0,
      sky.hslStops.length,
      style,
      sky.styleVariant
    );
    const anchoredStops = [
      anchor,
      ...sky.hslStops.slice(1)
    ];
    const anchored = renderFromHsl(anchoredStops, sky.moment, style, sky.positions, sky.styleVariant);
    return {
      stops: anchored.stops,
      css: anchored.css,
      moment: anchored.moment,
      style,
      timeOfDay: MOMENT_HOURS[sky.moment] ?? (/* @__PURE__ */ new Date()).getHours(),
      source: `color:${hex}`,
      label: anchored.moment,
      paletteHex: hex
    };
  }
};

// src/core/nlp/lexicon.ts
var LEXICON = {
  // ── Joy + Positive ─────────────────────────────────────────────
  happy: 64 + 256,
  happiness: 64 + 256,
  joy: 64 + 256,
  joyful: 64 + 256,
  joyous: 64 + 256,
  wonderful: 64 + 256,
  amazing: 64 + 16 + 256,
  beautiful: 64 + 256,
  gorgeous: 64 + 256,
  delight: 64 + 4 + 256,
  delightful: 64 + 256,
  celebrate: 64 + 4 + 256,
  celebration: 64 + 4 + 256,
  love: 64 + 8 + 256,
  bliss: 64 + 256,
  elate: 64 + 256,
  elated: 64 + 256,
  cheerful: 64 + 256,
  bright: 64 + 256,
  radiant: 64 + 256,
  pleasure: 64 + 256,
  enjoy: 64 + 256,
  laugh: 64 + 256,
  smile: 64 + 256,
  fun: 64 + 256,
  fantastic: 64 + 256,
  excellent: 256,
  perfect: 8 + 256,
  brilliant: 64 + 16 + 256,
  glorious: 64 + 256,
  magnificent: 64 + 256,
  triumph: 64 + 4 + 256,
  victory: 64 + 4 + 256,
  succeed: 64 + 4 + 8 + 256,
  success: 64 + 4 + 8 + 256,
  win: 64 + 4 + 256,
  reward: 64 + 4 + 8 + 256,
  thrill: 64 + 4 + 16 + 256,
  excited: 64 + 4 + 256,
  enthusiasm: 64 + 4 + 256,
  inspire: 64 + 4 + 8 + 256,
  inspiration: 64 + 4 + 8 + 256,
  peace: 8 + 64 + 256,
  peaceful: 8 + 64 + 256,
  calm: 8 + 256,
  serene: 8 + 64 + 256,
  harmony: 8 + 64 + 256,
  comfort: 8 + 64 + 256,
  // ── Trust + Positive ───────────────────────────────────────────
  trust: 8 + 256,
  reliable: 8 + 256,
  stable: 8 + 256,
  safe: 8 + 256,
  secure: 8 + 256,
  honest: 8 + 256,
  faithful: 8 + 256,
  loyal: 8 + 256,
  genuine: 8 + 256,
  confident: 8 + 256,
  confidence: 8 + 4 + 8 + 256,
  steady: 8 + 256,
  solid: 8 + 256,
  strong: 8 + 256,
  true: 8 + 256,
  truth: 8 + 256,
  belief: 8 + 4 + 256,
  certain: 8 + 256,
  clarity: 8 + 256,
  clear: 8 + 256,
  focus: 8 + 4 + 256,
  // ── Anticipation ───────────────────────────────────────────────
  hope: 4 + 8 + 256,
  hopeful: 4 + 8 + 256,
  expect: 4,
  await: 4,
  wonder: 4 + 16 + 256,
  curious: 4 + 256,
  eager: 4 + 64 + 256,
  ready: 4 + 8 + 256,
  dream: 4 + 64 + 256,
  wish: 4 + 64 + 256,
  aspire: 4 + 256,
  plan: 4 + 8,
  goal: 4 + 8 + 256,
  ambition: 4 + 256,
  opportunity: 4 + 256,
  future: 4,
  forward: 4 + 256,
  progress: 4 + 256,
  improve: 4 + 256,
  grow: 4 + 8 + 256,
  learn: 4 + 8 + 256,
  discover: 4 + 16 + 256,
  explore: 4 + 64 + 256,
  adventure: 4 + 64 + 16 + 256,
  // ── Sadness + Negative ─────────────────────────────────────────
  sad: 32 + 512,
  sadness: 32 + 512,
  grief: 32 + 2 + 512,
  sorrow: 32 + 512,
  melancholy: 32 + 512,
  lonely: 32 + 512,
  alone: 32 + 512,
  despair: 32 + 2 + 512,
  mourn: 32 + 512,
  heartbreak: 32 + 512,
  tear: 32 + 512,
  weep: 32 + 512,
  miss: 32 + 512,
  loss: 32 + 512,
  lost: 32 + 512,
  empty: 32 + 512,
  hollow: 32 + 512,
  gloomy: 32 + 512,
  dreary: 32 + 512,
  depress: 32 + 512,
  miserable: 32 + 512,
  tragic: 32 + 512,
  unfortunate: 512,
  regret: 32 + 512,
  disappoint: 32 + 512,
  fail: 32 + 512,
  failure: 32 + 512,
  broken: 32 + 512,
  struggle: 32 + 2 + 512,
  suffer: 32 + 512,
  pain: 32 + 512,
  hurt: 32 + 2 + 512,
  wound: 32 + 2 + 512,
  abandon: 32 + 512,
  neglect: 32 + 512,
  forget: 32 + 512,
  darkness: 32 + 2 + 512,
  shadow: 32 + 2,
  isolation: 32 + 512,
  silence: 32,
  // ── Anger + Negative ───────────────────────────────────────────
  angry: 1 + 512,
  anger: 1 + 512,
  rage: 1 + 512,
  fury: 1 + 512,
  furious: 1 + 512,
  hate: 1 + 128 + 512,
  hatred: 1 + 128 + 512,
  violent: 1 + 2 + 512,
  aggressive: 1 + 512,
  hostile: 1 + 512,
  bitter: 1 + 128 + 512,
  resentment: 1 + 32 + 512,
  wrath: 1 + 512,
  frustration: 1 + 512,
  irritate: 1 + 512,
  annoy: 1 + 512,
  conflict: 1 + 2 + 512,
  war: 1 + 2 + 512,
  fight: 1 + 512,
  attack: 1 + 2 + 512,
  destroy: 1 + 512,
  corrupt: 1 + 128 + 512,
  betray: 1 + 2 + 32 + 512,
  cruel: 1 + 128 + 512,
  oppress: 1 + 2 + 512,
  brutal: 1 + 512,
  // ── Fear + Negative ────────────────────────────────────────────
  fear: 2 + 512,
  afraid: 2 + 512,
  terror: 2 + 512,
  panic: 2 + 16 + 512,
  horror: 2 + 128 + 512,
  dread: 2 + 512,
  anxious: 2 + 512,
  anxiety: 2 + 512,
  worried: 2 + 512,
  nervous: 2 + 512,
  scared: 2 + 512,
  frighten: 2 + 512,
  ominous: 2 + 512,
  threaten: 1 + 2 + 512,
  danger: 2 + 512,
  risk: 2,
  alarm: 2 + 16 + 512,
  uncertain: 2 + 512,
  doubt: 2 + 512,
  nightmare: 2 + 512,
  // ── Surprise ───────────────────────────────────────────────────
  surprise: 16,
  sudden: 16,
  unexpected: 16,
  shock: 2 + 16 + 512,
  astonish: 16 + 256,
  amaze: 16 + 64 + 256,
  startled: 2 + 16,
  unforeseen: 16,
  realize: 16 + 256,
  reveal: 16 + 4,
  notice: 16,
  // ── Disgust + Negative ─────────────────────────────────────────
  disgust: 128 + 512,
  revolt: 128 + 1 + 512,
  repulsive: 128 + 512,
  foul: 128 + 512,
  nasty: 128 + 1 + 512,
  gross: 128 + 512,
  vile: 128 + 1 + 512,
  contaminate: 128 + 512,
  pollute: 128 + 512,
  // ── Atmosphere / Weather words ─────────────────────────────────
  storm: 1 + 2 + 512,
  thunder: 2 + 16,
  lightning: 2 + 16,
  hurricane: 1 + 2 + 512,
  tornado: 1 + 2 + 512,
  rain: 32,
  drizzle: 32,
  pour: 32,
  flood: 2 + 32 + 512,
  fog: 32 + 2,
  mist: 32,
  haze: 32,
  murky: 32 + 128 + 512,
  overcast: 32,
  cloudy: 32,
  snow: 32 + 2,
  frost: 2 + 32,
  ice: 2,
  cold: 32 + 2,
  freeze: 2,
  blizzard: 2 + 512,
  sunny: 64 + 256,
  sunshine: 64 + 256,
  warmth: 64 + 256,
  warm: 64 + 256,
  cool: 8 + 256,
  breeze: 64 + 256,
  crisp: 8 + 256,
  night: 2 + 32,
  dark: 2 + 32,
  midnight: 2 + 32,
  dawn: 4 + 64 + 256,
  dusk: 32 + 4,
  twilight: 4 + 32,
  sunset: 64 + 4 + 256,
  sunrise: 64 + 4 + 256,
  // ── General valence ────────────────────────────────────────────
  good: 8 + 256,
  great: 64 + 256,
  bad: 512,
  awful: 128 + 512,
  terrible: 512,
  horrible: 128 + 512,
  poor: 512,
  interesting: 4 + 16 + 256,
  boring: 512,
  dull: 512,
  hard: 2 + 512,
  difficult: 2 + 512,
  easy: 8 + 256,
  simple: 8 + 256,
  complex: 2 + 4,
  fast: 64 + 256,
  slow: 32,
  long: 32,
  quick: 4 + 256,
  fresh: 4 + 256,
  old: 32,
  fix: 8 + 256,
  clean: 8 + 256,
  dirty: 128 + 512,
  ugly: 128 + 512,
  powerful: 8 + 64 + 256,
  weak: 32 + 512,
  unstable: 2 + 512,
  consistent: 8 + 256,
  inconsistent: 512,
  rough: 512,
  recommend: 8 + 4 + 256,
  prefer: 256,
  avoid: 2 + 512,
  like: 64 + 256,
  dislike: 512,
  review: 4,
  story: 4 + 64,
  experience: 4 + 256,
  perspective: 8 + 4,
  journey: 4 + 64 + 256,
  change: 4 + 16,
  moment: 4 + 256,
  life: 64 + 8 + 256,
  time: 4,
  month: 4,
  week: 4,
  year: 4,
  share: 8 + 256
};
var EMOTION_BITS = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512];
var DOMAIN = {
  tech: /* @__PURE__ */ new Set([
    "software",
    "hardware",
    "os",
    "operating",
    "system",
    "terminal",
    "install",
    "driver",
    "interface",
    "kernel",
    "app",
    "application",
    "workflow",
    "laptop",
    "desktop",
    "computer",
    "keyboard",
    "mouse",
    "screen",
    "display",
    "monitor",
    "code",
    "coding",
    "programming",
    "linux",
    "mac",
    "windows",
    "processor",
    "cpu",
    "gpu",
    "memory",
    "ram",
    "battery",
    "performance",
    "speed",
    "update",
    "bug",
    "feature",
    "user",
    "settings",
    "configuration",
    "review",
    "technical",
    "setup",
    "environment",
    "distribution",
    "distro",
    "command",
    "shell",
    "package",
    "resolution",
    "cursor",
    "theme",
    "dock",
    "desktop",
    "default",
    "script",
    "git",
    "build",
    "deploy",
    "server",
    "network",
    "browser",
    "extension",
    "plugin",
    "api",
    "framework",
    "library",
    "tool",
    "dev",
    "developer",
    "program",
    "run",
    "boot",
    "startup",
    "log",
    "file",
    "folder",
    "directory",
    "path",
    "shortcut",
    "hotkey",
    "window",
    "tab",
    "menu",
    "click",
    "button",
    "icon",
    "font",
    "mode",
    "omarchy",
    "arch",
    "ubuntu",
    "debian",
    "fedora",
    "gnome",
    "kde",
    "i3",
    "hyprland"
  ]),
  nature: /* @__PURE__ */ new Set([
    "forest",
    "tree",
    "mountain",
    "ocean",
    "river",
    "lake",
    "sky",
    "cloud",
    "wind",
    "flower",
    "garden",
    "grass",
    "leaf",
    "earth",
    "landscape",
    "valley",
    "hill",
    "coast",
    "beach",
    "wave",
    "waterfall",
    "meadow",
    "wilderness",
    "bird",
    "fish",
    "animal",
    "sunrise",
    "sunset",
    "nature",
    "jungle",
    "desert",
    "arctic",
    "tropical",
    "breeze",
    "gale",
    "tide",
    "shore",
    "cliff",
    "peak",
    "glacier",
    "coral",
    "reef",
    "habitat",
    "ecosystem",
    "soil",
    "root",
    "branch",
    "seed",
    "bloom",
    "petal",
    "bark"
  ]),
  urban: /* @__PURE__ */ new Set([
    "city",
    "street",
    "building",
    "concrete",
    "glass",
    "metal",
    "neon",
    "traffic",
    "urban",
    "downtown",
    "pavement",
    "subway",
    "highway",
    "road",
    "bridge",
    "tower",
    "skyscraper",
    "apartment",
    "cafe",
    "restaurant",
    "shop",
    "market",
    "noise",
    "crowd",
    "bus",
    "train",
    "commute",
    "office",
    "work",
    "meeting",
    "schedule",
    "deadline",
    "rush"
  ]),
  personal: /* @__PURE__ */ new Set([
    "feel",
    "think",
    "believe",
    "experience",
    "perspective",
    "journey",
    "story",
    "life",
    "memory",
    "remember",
    "discover",
    "learn",
    "grow",
    "change",
    "moment",
    "personal",
    "share",
    "tell",
    "write",
    "read",
    "reflect",
    "understand",
    "realize",
    "know",
    "wonder",
    "question",
    "decision",
    "choice",
    "path",
    "way",
    "mind",
    "heart",
    "soul",
    "thought",
    "emotion",
    "myself",
    "yourself",
    "himself",
    "herself",
    "ourselves",
    "common",
    "user",
    "person",
    "people",
    "month",
    "week",
    "year",
    "day"
  ])
};
var COLOR_HUES = {
  // Western color names
  red: 5,
  crimson: 350,
  scarlet: 10,
  rose: 345,
  pink: 340,
  orange: 28,
  amber: 38,
  gold: 48,
  golden: 48,
  yellow: 58,
  green: 125,
  lime: 85,
  teal: 175,
  cyan: 190,
  blue: 215,
  azure: 208,
  cobalt: 225,
  navy: 228,
  indigo: 248,
  purple: 270,
  violet: 280,
  lavender: 290,
  magenta: 305,
  brown: 25,
  copper: 22,
  bronze: 32,
  rust: 15,
  ochre: 42,
  grey: -1,
  gray: -1,
  silver: -1,
  white: -1,
  black: -1,
  dark: -2,
  light: -3,
  // not hues — luminance signals
  // Japanese traditional colors (日本の伝統色) — all 250 from nipponcolors.com
  // Hue = HSL hue (0–359). Special signals: -1 grey, -2 dark/black, -3 light/white.
  // ── Pink · red (beni-kei)
  umenezumi: 0,
  // 梅鼠 #9E7A7A
  toki: 0,
  // 鴇 #EEA9A9
  entan: 0,
  // 鉛丹 #D75455
  cyohsyun: 1,
  // 長春 #BF6766
  shinsyu: 1,
  // 真朱 #AB3B3A
  jinzamomi: 2,
  // 甚三紅 #EB7A77
  suohkoh: 2,
  // 蘇芳香 #A96360
  ginsyu: 2,
  // 銀朱 #C73E3A
  azuki: 4,
  // 小豆 #954A45
  sakuranezumi: 6,
  // 桜鼠 #B19693
  kuriume: 6,
  // 栗梅 #904840
  kokiake: 7,
  // 深緋 #86473F
  benikaba: 7,
  // 紅樺 #B54434
  benitobi: 8,
  // 紅鳶 #994639
  syojyohi: 8,
  // 猩猩緋 #E83015
  akebono: 9,
  // 曙 #F19483
  sangosyu: 9,
  // 珊瑚朱 #F17C67
  shikancha: 10,
  // 芝翫茶 #B55D4C
  ebicha: 11,
  // 海老茶 #734338
  mizugaki: 11,
  // 水がき #B9887D
  ake: 11,
  // 緋 #CC543A
  benihiwada: 14,
  // 紅檜皮 #884C3A
  hiwada: 14,
  // 檜皮 #854836
  benihi: 14,
  // 紅緋 #F75C2F
  terigaki: 14,
  // 照柿 #C46243
  kakishibu: 15,
  // 柿渋 #A35E47
  bengara: 16,
  // 弁柄 #9A5034
  tokigaracha: 16,
  // ときがら茶 #DB8E71
  araisyu: 17,
  // 洗朱 #FB966E
  karacha: 17,
  // 唐茶 #B47157
  sohi: 17,
  // 纁 #ED784A
  benikeshinezumi: 17,
  // 紅消鼠 #52433D
  edocha: 18,
  // 江戸茶 #AF5F3C
  momoshiocha: 18,
  // 百塩茶 #724938
  kabacha: 18,
  // 樺茶 #B35C37
  akakoh: 18,
  // 赤香 #E3916E
  haizakura: 19,
  // 灰桜 #D7C4BB
  ohni: 19,
  // 黄丹 #F05E1C
  ensyucha: 19,
  // 遠州茶 #CA7853
  // ── Orange · amber · brown (cha-kei)
  shishi: 20,
  // 宍 #F0A986
  sodenkaracha: 20,
  // 宗伝唐茶 #A0674B
  kaba: 20,
  // 樺 #C1693C
  kurumi: 20,
  // 胡桃 #947A6D
  tobi: 21,
  // 鳶 #724832
  kokikuchinashi: 21,
  // 深支子 #FB9966
  kurikawacha: 22,
  // 栗皮茶 #6A4028
  suzumecha: 22,
  // 雀茶 #8F5A3C
  kurotobi: 23,
  // 黒鳶 #554236
  araigaki: 23,
  // 洗柿 #E79460
  taisya: 25,
  // 代赭 #A36336
  kogecha: 26,
  // 焦茶 #563F2E
  akashirotsurubami: 26,
  // 赤白橡 #E1A679
  sharegaki: 26,
  // 洒落柿 #FFBA84
  akakuchiba: 27,
  // 赤朽葉 #C78550
  umezome: 27,
  // 梅染 #E9A368
  kanzo: 28,
  // 萱草 #FC9F4D
  usugaki: 28,
  // 薄柿 #ECB88A
  kohrozen: 29,
  // 黄櫨染 #7D532C
  tonocha: 29,
  // 礪茶 #985F2A
  biwacha: 29,
  // 枇杷茶 #B17844
  sencha: 30,
  // 煎茶 #855B32
  beniukon: 30,
  // 紅鬱金 #E98B2A
  kohaku: 30,
  // 琥珀 #CA7A2C
  chojicha: 31,
  // 丁子茶 #96632E
  chojizome: 32,
  // 丁子染 #B07736
  fushizome: 32,
  // 柴染 #967249
  kuchiba: 32,
  // 朽葉 #E2943B
  kincha: 32,
  // 金茶 #C7802D
  kyara: 33,
  // 伽羅 #78552B
  usukoh: 33,
  // 薄香 #EBB471
  tonoko: 35,
  // 砥粉 #D7B98E
  ohdo: 35,
  // 黄土 #B68E55
  shiracha: 35,
  // 白茶 #BC9F77
  susutake: 36,
  // 煤竹 #6E552F
  kobicha: 36,
  // 媚茶 #876633
  binrojizome: 36,
  // 檳榔子染 #3A3226
  ginsusutake: 37,
  // 銀煤竹 #82663A
  kenpohzome: 38,
  // 憲法染 #43341B
  kitsune: 38,
  // 狐 #9B6E23
  shirotsurubami: 38,
  // 白橡 #DCB879
  kigaracha: 39,
  // 黄唐茶 #C18A26
  yamabuki: 39,
  // 山吹 #FFB11B
  yamabukicha: 40,
  // 山吹茶 #D19826
  kuwacha: 40,
  // 桑茶 #C99833
  torinoko: 40,
  // 鳥の子 #DAC9A6
  hajizome: 41,
  // 櫨染 #DDA52D
  tamago: 41,
  // 玉子 #F9BF45
  tamamorokoshi: 41,
  // 玉蜀黍 #E8B647
  namakabe: 41,
  // 生壁 #7D6C46
  usuki: 41,
  // 浅黄 #FAD689
  kitsurubami: 42,
  // 黄橡 #BA9132
  hanaba: 42,
  // 花葉 #F7C242
  kikuchiba: 42,
  // 黄朽葉 #D9AB42
  kuchinashi: 42,
  // 梔子 #F6C555
  rikyushiracha: 42,
  // 利休白茶 #B4A582
  aku: 42,
  // 灰汁 #877F6C
  karashi: 44,
  // 芥子 #CAAD5F
  ukon: 45,
  // 鬱金 #EFBB24
  higosusutake: 45,
  // 肥後煤竹 #8D742A
  tohoh: 46,
  // 籐黄 #FFC408
  rikyucha: 46,
  // 利休茶 #897D55
  rokohcha: 46,
  // 路考茶 #74673E
  nataneyu: 48,
  // 菜種油 #A28C37
  kariyasu: 49,
  // 刈安 #E9CD4C
  nanohana: 49,
  // 菜の花 #F7D94C
  // ── Yellow (ki-kei)
  uguisucha: 50,
  // 鶯茶 #6C6024
  kimirucha: 50,
  // 黄海松茶 #867835
  mirucha: 50,
  // 海松茶 #62592C
  mushikuri: 50,
  // 蒸栗 #D9CD90
  kihada: 51,
  // 黄蘗 #FBE251
  aokuchiba: 53,
  // 青朽葉 #ADA142
  ominaeshi: 56,
  // 女郎花 #DDD23B
  hiwacha: 56,
  // 鶸茶 #A5A051
  uguisu: 58,
  // 鶯 #6C6A2D
  rikancha: 60,
  // 璃寛茶 #616138
  hiwa: 62,
  // 鶸 #BEC23F
  yanagicha: 63,
  // 柳茶 #939650
  kikujin: 63,
  // 麹塵 #B1B479
  koke: 65,
  // 苔 #838A2D
  aikobicha: 65,
  // 藍媚茶 #4B4E2A
  miru: 68,
  // 海松 #5B622E
  sensaicha: 70,
  // 千歳茶 #4D5139
  baikocha: 73,
  // 梅幸茶 #89916B
  // ── Green (midori-kei)
  iwaicha: 80,
  // 岩井茶 #646A58
  hiwamoegi: 81,
  // 鶸萌黄 #90B44B
  moegi: 84,
  // 萌黄 #7BA23F
  yanagizome: 88,
  // 柳染 #91AD70
  urayanagi: 90,
  // 裏柳 #B5CAA0
  yanagisusutake: 92,
  // 柳煤竹 #4A593D
  matsuba: 95,
  // 松葉 #42602D
  nae: 99,
  // 苗 #86C166
  aoni: 99,
  // 青丹 #516E41
  yanaginezumi: 107,
  // 柳鼠 #808F7C
  usuao: 123,
  // 薄青 #91B493
  chitosemidori: 131,
  // 千歳緑 #36563C
  onandocha: 136,
  // 御納戸茶 #465D4C
  oitake: 139,
  // 老竹 #6A8372
  tokiwa: 141,
  // 常磐 #1B813E
  byakuroku: 141,
  // 白緑 #A8D8B9
  wakatake: 147,
  // 若竹 #5DAC81
  tokusa: 148,
  // 木賊 #2D6D4B
  midori: 151,
  // 緑 #227D51
  sabiseiji: 152,
  // 錆青磁 #86A697
  rokusyoh: 160,
  // 緑青 #24936E
  aimirucha: 162,
  // 藍海松茶 #0F4C3A
  veludo: 163,
  // ビロード #096148
  mushiao: 164,
  // 虫襖 #20604F
  // ── Teal · cyan (asagi-kei)
  tetsu: 165,
  // 鉄 #26453D
  aotake: 167,
  // 青竹 #00896C
  sabitetsuonando: 167,
  // 錆鉄御納戸 #405B55
  tonocha2: 170,
  // 沈香茶 #4F726C
  aomidori: 171,
  // 青緑 #00AA90
  korainando: 174,
  // 高麗納戸 #305A56
  onando: 174,
  // 御納戸 #0C4842
  seiji: 177,
  // 青磁 #69B0AC
  mizuasagi: 178,
  // 水浅葱 #66BAB7
  seiheki: 179,
  // 青碧 #268785
  byakugun: 182,
  // 白群 #78C2C4
  omeshicha: 182,
  // 御召茶 #376B6D
  kamenozoki: 186,
  // 瓶覗 #A5DEE4
  fukagawanezumi: 187,
  // 深川鼠 #77969A
  tetsuonando: 187,
  // 鉄御納戸 #255359
  sabiasagi: 188,
  // 錆浅葱 #6699A1
  asagi: 188,
  // 浅葱 #33A6B8
  ai: 188,
  // 藍 #0D5661
  mizu: 189,
  // 水 #81C7D4
  shinbashi: 191,
  // 新橋 #0089A7
  sabionando: 192,
  // 錆御納戸 #336774
  hanaasagi: 194,
  // 花浅葱 #1E88A8
  ainezumi: 194,
  // 藍鼠 #566C73
  hanada: 195,
  // 縹 #006284
  masuhana: 196,
  // 舛花 #577C8A
  omeshionando: 197,
  // 御召御納戸 #2E5C6E
  noshimehana: 198,
  // 熨斗目花 #2B5F75
  tsuyukusa: 198,
  // 露草 #2EA9DF
  sora: 199,
  // 空 #58B2DC
  chigusa: 199,
  // 千草 #3A8FB7
  wasurenagusa: 203,
  // 勿忘草 #7DB9DE
  gunjyo: 203,
  // 群青 #51A8DD
  ruri: 208,
  // 瑠璃 #005CAF
  // ── Blue · indigo (ai-kei)
  kachi: 212,
  // 褐 #08192D
  kon: 213,
  // 紺 #0F2540
  rurikon: 215,
  // 瑠璃紺 #0B346E
  konjyo: 223,
  // 紺青 #113285
  benimidori: 226,
  // 紅碧 #7B90D2
  fujinezumi: 232,
  // 藤鼠 #6E75A4
  benikakehana: 239,
  // 紅掛花 #4E4F97
  konkikyo: 243,
  // 紺桔梗 #211E55
  fuji: 249,
  // 藤 #8B81C3
  tetsukon: 252,
  // 鉄紺 #261E47
  futaai: 253,
  // 二藍 #70649A
  ouchi: 253,
  // 楝 #9B90C2
  // ── Purple · violet (murasaki-kei)
  fujimurasaki: 262,
  // 藤紫 #8A6BBE
  kikyo: 262,
  // 桔梗 #6A4C9C
  shion: 263,
  // 紫苑 #8F77B5
  usu: 273,
  // 薄 #B28FCE
  hashita: 277,
  // 半 #986DB2
  kokimurasaki: 281,
  // 深紫 #4A225D
  edomurasaki: 282,
  // 江戸紫 #77428D
  sumire: 282,
  // 菫 #66327C
  shikon: 283,
  // 紫紺 #3C2F41
  messhi: 284,
  // 滅紫 #533D5B
  ayame: 286,
  // 菖蒲 #6F3381
  murasaki: 289,
  // 紫 #592C63
  benifuji: 293,
  // 紅藤 #B481BB
  // ── Magenta · grape · deep rose (budoh-kei)
  kakitsubata: 315,
  // 杜若 #622954
  ebizome: 317,
  // 蒲葡 #6D2E5B
  botan: 321,
  // 牡丹 #C1328E
  budohnezumi: 325,
  // 葡萄鼠 #5E3D50
  kurobeni: 327,
  // 黒紅 #3F2B36
  umemurasaki: 329,
  // 梅紫 #A8497A
  tsutsuji: 331,
  // 躑躅 #E03C8A
  nasukon: 332,
  // 茄子紺 #572A3F
  nadeshiko: 339,
  // 撫子 #DC9FB4
  karakurenai: 341,
  // 韓紅花 #D0104C
  kohbai: 343,
  // 紅梅 #E16B8C
  suoh: 346,
  // 蘇芳 #8E354A
  ikkonzome: 346,
  // 一斥染 #F4A7B9
  nakabeni: 346,
  // 中紅 #DB4D6D
  kurenai: 346,
  // 紅 #CB1B45
  nisemurasaki: 346,
  // 似紫 #562E37
  momo: 347,
  // 桃 #F596AA
  usubeni: 348,
  // 薄紅 #E87A90
  taikoh: 349,
  // 退紅 #F8C3CD
  ichigo: 350,
  // 苺 #B5495B
  imayoh: 350,
  // 今様 #D05A6E
  murasakitobi: 350,
  // 紫鳶 #60373E
  kuwazome: 352,
  // 桑染 #64363C
  sakura: 356,
  // 桜 #FEDFE1
  enji: 357,
  // 燕脂 #9F353A
  akabeni: 359,
  // 赤紅 #CB4042
  // ── Neutrals — grey · black · white signals
  shironeri: -3,
  // 白練 #FCFAF2
  gofun: -3,
  // 胡粉 #FFFFFB
  kurotsurubami: -2,
  // 黒橡 #0B1013
  sumi: -2,
  // 墨 #1C1C1C
  kuro: -2,
  // 黒 #080808
  ro: -2,
  // 呂 #0C0C0C
  fujisusutake: -1,
  // 藤煤竹 #574C57
  hatobanezumi: -1,
  // 鳩羽鼠 #72636E
  shironezumi: -1,
  // 白鼠 #BDC0BA
  ginnezumi: -1,
  // 銀鼠 #91989F
  namari: -1,
  // 鉛 #787878
  hai: -1,
  // 灰 #828282
  sunezumi: -1,
  // 素鼠 #787D7B
  rikyunezumi: -1,
  // 利休鼠 #707C74
  nibi: -1,
  // 鈍 #656765
  aonibi: -1,
  // 青鈍 #535953
  dobunezumi: -1,
  // 溝鼠 #4F4F48
  aisumicha: -1,
  // 藍墨茶 #373C38
  keshizumi: -1
  // 消炭 #434343
};
var TIME_WORDS = {
  midnight: 0,
  night: 22,
  evening: 20,
  dusk: 18,
  sunset: 18,
  afternoon: 14,
  noon: 12,
  morning: 8,
  dawn: 5,
  sunrise: 6,
  twilight: 19
};
var STOPWORDS = /* @__PURE__ */ new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "but",
  "in",
  "on",
  "at",
  "to",
  "for",
  "of",
  "with",
  "by",
  "from",
  "up",
  "about",
  "into",
  "as",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "do",
  "does",
  "did",
  "will",
  "would",
  "should",
  "could",
  "may",
  "might",
  "must",
  "shall",
  "can",
  "it",
  "its",
  "this",
  "that",
  "these",
  "those",
  "i",
  "me",
  "my",
  "we",
  "our",
  "you",
  "your",
  "he",
  "she",
  "they",
  "them",
  "their",
  "what",
  "which",
  "who",
  "how",
  "when",
  "where",
  "why",
  "all",
  "any",
  "some",
  "no",
  "not",
  "so",
  "if",
  "then",
  "than",
  "more",
  "most",
  "very",
  "just",
  "also",
  "only",
  "even",
  "while",
  "after",
  "before",
  "since",
  "until",
  "though",
  "although",
  "because",
  "get",
  "got",
  "make",
  "made",
  "take",
  "took",
  "use",
  "used",
  "come",
  "came",
  "go",
  "went",
  "see",
  "saw",
  "know",
  "knew",
  "think",
  "thought",
  "want",
  "need",
  "like",
  "look",
  "im",
  "ive",
  "id",
  "ill",
  "thats",
  "its",
  "dont",
  "doesnt",
  "didnt",
  "wouldnt",
  "couldnt",
  "shouldnt",
  "havent",
  "hasnt",
  "hadnt",
  "isnt",
  "arent",
  "wasnt",
  "werent"
]);

// src/core/nlp/entities.ts
var BRANDS = {
  // ── Tech / Software ──────────────────────────────────────────────
  omarchy: { type: "brand", hues: [228, 220, 35], luma: -0.8, sat: 5 },
  // deep navy → amber
  apple: { type: "brand", hues: [-1], luma: 0.3, sat: -10 },
  // silver / neutral
  google: { type: "brand", hues: [215, 5, 50], luma: 0.2, sat: 8 },
  // primary colors
  microsoft: { type: "brand", hues: [210], luma: 0.1, sat: 5 },
  // azure blue
  meta: { type: "brand", hues: [215], luma: -0.1, sat: 8 },
  // Facebook blue
  facebook: { type: "brand", hues: [215], luma: -0.1, sat: 8 },
  twitter: { type: "brand", hues: [200], luma: -0.2, sat: 5 },
  x: { type: "brand", hues: [-1], luma: -0.7, sat: -15 },
  // near-black
  github: { type: "brand", hues: [228, 28], luma: -0.6, sat: 0 },
  // dark + orange
  vercel: { type: "brand", hues: [-1], luma: -0.8, sat: -20 },
  // pure black/white
  notion: { type: "brand", hues: [-1], luma: 0.2, sat: -12 },
  // warm cream
  linear: { type: "brand", hues: [252], luma: -0.4, sat: 8 },
  // purple-indigo
  figma: { type: "brand", hues: [285, 28], luma: -0.1, sat: 10 },
  // purple + orange
  stripe: { type: "brand", hues: [255, 200], luma: -0.2, sat: 12 },
  // indigo + cyan
  supabase: { type: "brand", hues: [142, 155], luma: -0.5, sat: 15 },
  // emerald green
  tailwind: { type: "brand", hues: [195, 210], luma: 0, sat: 12 },
  // cyan-sky
  tailwindcss: { type: "brand", hues: [195, 210], luma: 0, sat: 12 },
  spotify: { type: "brand", hues: [142], luma: -0.7, sat: 20 },
  // neon green on dark
  netflix: { type: "brand", hues: [5], luma: -0.8, sat: 20 },
  // red on black
  youtube: { type: "brand", hues: [5], luma: -0.6, sat: 18 },
  // red
  discord: { type: "brand", hues: [248, 255], luma: -0.3, sat: 15 },
  // blurple
  slack: { type: "brand", hues: [270, 142], luma: -0.1, sat: 12 },
  // purple + green
  airbnb: { type: "brand", hues: [348, 340], luma: 0, sat: 12 },
  // coral-red
  uber: { type: "brand", hues: [-1], luma: -0.7, sat: -18 },
  // dark neutral
  linkedin: { type: "brand", hues: [210], luma: -0.1, sat: 15 },
  // professional blue
  pinterest: { type: "brand", hues: [348], luma: 0, sat: 18 },
  // crimson
  instagram: { type: "brand", hues: [290, 28, 340], luma: 0, sat: 15 },
  // purple → orange → pink
  tiktok: { type: "brand", hues: [185, 348], luma: -0.7, sat: 20 },
  // cyan + red on dark
  openai: { type: "brand", hues: [162, 165], luma: -0.3, sat: 5 },
  // teal-grey
  anthropic: { type: "brand", hues: [18, 28], luma: -0.1, sat: 10 },
  // warm coral
  dropbox: { type: "brand", hues: [215], luma: 0.1, sat: 15 },
  // sky blue
  adobe: { type: "brand", hues: [5], luma: -0.5, sat: 18 },
  // red on dark
  // ── Hardware / Devices ───────────────────────────────────────────
  sony: { type: "brand", hues: [-1], luma: -0.4, sat: -10 },
  // dark neutral
  samsung: { type: "brand", hues: [210], luma: -0.3, sat: 10 },
  // blue-dark
  // ── Apparel / Lifestyle ──────────────────────────────────────────
  nike: { type: "brand", hues: [20, 28], luma: -0.5, sat: 15 },
  // orange/warm dark
  adidas: { type: "brand", hues: [-1], luma: -0.4, sat: -15 },
  // minimal dark
  supreme: { type: "brand", hues: [5], luma: -0.1, sat: 22 },
  // box logo red
  levis: { type: "brand", hues: [245], luma: -0.3, sat: 18 },
  // denim indigo
  gucci: { type: "brand", hues: [48, 5], luma: -0.6, sat: 8 },
  // dark + gold
  hermes: { type: "brand", hues: [22], luma: 0, sat: 18 },
  // burnt orange
  chanel: { type: "brand", hues: [-1], luma: -0.6, sat: -20 },
  // black + white
  louisvuitton: { type: "brand", hues: [28, 48], luma: -0.1, sat: 10 },
  // warm brown + gold
  // ── F&B ─────────────────────────────────────────────────────────
  starbucks: { type: "brand", hues: [155], luma: -0.3, sat: 20 },
  // forest green
  mcdonalds: { type: "brand", hues: [52, 5], luma: 0.1, sat: 20 },
  // yellow + red
  cocacola: { type: "brand", hues: [5], luma: -0.2, sat: 22 },
  // signature red
  pepsi: { type: "brand", hues: [215, 5], luma: -0.2, sat: 18 },
  // blue + red
  // ── Automotive ───────────────────────────────────────────────────
  ferrari: { type: "brand", hues: [358], luma: -0.1, sat: 25 },
  // Rosso Corsa
  lamborghini: { type: "brand", hues: [52, 28], luma: -0.5, sat: 20 },
  // yellow/orange dark
  tesla: { type: "brand", hues: [5], luma: -0.6, sat: 15 },
  // red on dark
  bmw: { type: "brand", hues: [210, 5], luma: -0.2, sat: 12 },
  // blue + white
  // ── Media ────────────────────────────────────────────────────────
  bbc: { type: "brand", hues: [5], luma: -0.1, sat: 18 },
  // BBC red
  cnn: { type: "brand", hues: [5], luma: -0.3, sat: 18 },
  nyt: { type: "brand", hues: [-1], luma: 0.1, sat: -15 },
  // newsprint grey
  nytimes: { type: "brand", hues: [-1], luma: 0.1, sat: -15 }
};
var CITIES = {
  // ── East Asia ────────────────────────────────────────────────────
  tokyo: { type: "city", hues: [340, 248], luma: 0, sat: -5 },
  // sakura pink → quiet indigo
  kyoto: { type: "city", hues: [130, 38], luma: -0.1, sat: -8 },
  // moss green + warm wood
  osaka: { type: "city", hues: [25, 225], luma: 0, sat: 8 },
  // neon orange + bay navy
  hiroshima: { type: "city", hues: [200, 48], luma: 0.1, sat: -5 },
  // peace memorial grey-blue + gold
  sapporo: { type: "city", hues: [205, 248], luma: 0.2, sat: -8 },
  // snow-blue + cold indigo
  seoul: { type: "city", hues: [205, 340], luma: 0.2, sat: -5 },
  // pale sky + cherry blossom
  busan: { type: "city", hues: [200, 35], luma: 0.1, sat: 5 },
  // sea + golden seafood
  beijing: { type: "city", hues: [5, 248], luma: -0.2, sat: 5 },
  // imperial red + deep sky
  shanghai: { type: "city", hues: [185, 248], luma: -0.3, sat: 15 },
  // neon cyan + dark
  guangzhou: { type: "city", hues: [28, 175], luma: -0.1, sat: 10 },
  // warm humid + dim sum gold
  hongkong: { type: "city", hues: [185, 248], luma: -0.4, sat: 18 },
  // neon harbour + dark
  taipei: { type: "city", hues: [180, 35], luma: -0.1, sat: 10 },
  // bubble tea teal + warm
  chengdu: { type: "city", hues: [5, 130], luma: -0.1, sat: 12 },
  // Sichuan red + green tea
  // ── Southeast Asia ───────────────────────────────────────────────
  bangkok: { type: "city", hues: [48, 125], luma: 0, sat: 15 },
  // golden temples + humid green
  siamreap: { type: "city", hues: [42, 28], luma: 0, sat: 10 },
  // Angkor stone + warm jungle
  hanoi: { type: "city", hues: [130, 28], luma: -0.1, sat: 8 },
  // old quarter green + warm
  hochiminhcity: { type: "city", hues: [28, 175], luma: 0, sat: 12 },
  saigon: { type: "city", hues: [28, 175], luma: 0, sat: 12 },
  // warm + mekong teal
  singapore: { type: "city", hues: [5, 200], luma: 0.1, sat: 10 },
  // red/white + harbour blue
  kualalumpur: { type: "city", hues: [5, 28], luma: -0.1, sat: 12 },
  // Petronas + warm
  manila: { type: "city", hues: [28, 200], luma: 0.1, sat: 10 },
  // tropical warm + bay
  jakarta: { type: "city", hues: [35, 175], luma: -0.1, sat: 10 },
  // warm ochre + humid teal
  bali: { type: "city", hues: [182, 28], luma: 0.2, sat: 18 },
  // turquoise + sunset
  yogyakarta: { type: "city", hues: [42, 130], luma: 0, sat: 8 },
  // batik earth + jungle
  // ── South Asia ───────────────────────────────────────────────────
  mumbai: { type: "city", hues: [28, 45], luma: 0, sat: 15 },
  // Bollywood orange + gold
  delhi: { type: "city", hues: [40, 195], luma: -0.1, sat: 18 },
  // saffron + peacock teal
  bangalore: { type: "city", hues: [142, 210], luma: 0.1, sat: 10 },
  // garden city green + tech blue
  kolkata: { type: "city", hues: [28, 5], luma: 0, sat: 12 },
  // warm + terracotta
  dhaka: { type: "city", hues: [5, 130], luma: 0.1, sat: 12 },
  // green + red (flag)
  kathmandu: { type: "city", hues: [28, 200], luma: -0.1, sat: 8 },
  // Himalayan earth + sky
  // ── Middle East & Central Asia ───────────────────────────────────
  dubai: { type: "city", hues: [45, 210], luma: 0.2, sat: 15 },
  // gold + gulf blue
  abudhabi: { type: "city", hues: [42, 215], luma: 0.1, sat: 12 },
  // sand + deep blue
  riyadh: { type: "city", hues: [42, 35], luma: 0, sat: 5 },
  // desert sand
  istanbul: { type: "city", hues: [188, 22], luma: -0.1, sat: 15 },
  // Bosphorus teal + Grand Bazaar warm
  tehran: { type: "city", hues: [40, 248], luma: -0.1, sat: 8 },
  // saffron + Persian indigo
  jerusalem: { type: "city", hues: [42, 28], luma: 0.1, sat: 5 },
  // golden stone
  beirut: { type: "city", hues: [5, 200], luma: 0, sat: 12 },
  // cedar red + Med blue
  // ── Europe ───────────────────────────────────────────────────────
  london: { type: "city", hues: [-1, 5], luma: -0.1, sat: -15 },
  // fog grey + brick red
  paris: { type: "city", hues: [48, -1], luma: 0.1, sat: -5 },
  // gold + stone grey
  rome: { type: "city", hues: [18, 45], luma: 0.1, sat: 10 },
  // terracotta + golden
  milan: { type: "city", hues: [-1, 28], luma: 0, sat: -8 },
  // fashion grey + warm
  venice: { type: "city", hues: [200, 42], luma: 0.1, sat: 8 },
  // canal teal + warm light
  florence: { type: "city", hues: [28, 45], luma: 0.2, sat: 8 },
  // Renaissance warm ochre
  naples: { type: "city", hues: [18, 200], luma: 0.1, sat: 12 },
  // terracotta + Med blue
  barcelona: { type: "city", hues: [42, 205], luma: 0.1, sat: 12 },
  // Gaudí warm + sea blue
  madrid: { type: "city", hues: [5, 42], luma: 0, sat: 12 },
  // Spanish red + warm
  lisbon: { type: "city", hues: [215, 18], luma: 0.1, sat: 12 },
  // azulejo blue + terracotta
  porto: { type: "city", hues: [18, 215], luma: 0, sat: 15 },
  // port wine red + Douro blue
  amsterdam: { type: "city", hues: [348, 218], luma: 0, sat: 10 },
  // tulip red + canal
  brussels: { type: "city", hues: [50, 5], luma: 0.1, sat: 5 },
  // gold + muted
  berlin: { type: "city", hues: [-1, 355], luma: -0.4, sat: -12 },
  // concrete + muted red
  munich: { type: "city", hues: [210, 5], luma: 0, sat: 8 },
  // Bavarian blue + white
  hamburg: { type: "city", hues: [205, 5], luma: -0.1, sat: 5 },
  // harbour + red
  vienna: { type: "city", hues: [50, -1], luma: 0.1, sat: 0 },
  // Habsburg gold + cream
  zurich: { type: "city", hues: [5, -1], luma: 0.1, sat: -8 },
  // Swiss red + neutral clean
  geneva: { type: "city", hues: [5, 215], luma: 0.1, sat: 5 },
  // Red Cross + lake blue
  stockholm: { type: "city", hues: [210, 50], luma: 0, sat: 5 },
  // Nordic blue + gold
  oslo: { type: "city", hues: [210, -1], luma: 0, sat: -5 },
  // fjord blue + grey
  copenhagen: { type: "city", hues: [215, 5], luma: 0, sat: 5 },
  // Danish blue + red
  helsinki: { type: "city", hues: [205, -1], luma: 0, sat: -8 },
  // Arctic grey-blue
  athens: { type: "city", hues: [210, -1], luma: 0.3, sat: 5 },
  // brilliant blue + white
  santorini: { type: "city", hues: [215, -1], luma: 0.3, sat: 8 },
  // deep blue + white
  prague: { type: "city", hues: [18, 130], luma: -0.1, sat: 5 },
  // Bohemian russet + forest
  warsaw: { type: "city", hues: [5, -1], luma: -0.1, sat: 5 },
  // Polish red + grey
  budapest: { type: "city", hues: [28, 215], luma: 0, sat: 8 },
  // Danube + warm stone
  bucharest: { type: "city", hues: [5, 28], luma: -0.1, sat: 5 },
  // Romanian warm
  moscow: { type: "city", hues: [5, 45], luma: -0.4, sat: 10 },
  // red + dark gold
  stpetersburg: { type: "city", hues: [45, 215], luma: 0, sat: 8 },
  // White Nights gold + blue
  // ── Africa ───────────────────────────────────────────────────────
  cairo: { type: "city", hues: [42, 45], luma: 0.1, sat: 5 },
  // warm desert sand
  alexandria: { type: "city", hues: [205, 42], luma: 0.1, sat: 8 },
  // Med blue + sand
  tunis: { type: "city", hues: [5, 205], luma: 0.1, sat: 10 },
  // medina red + blue
  casablanca: { type: "city", hues: [215, -1], luma: 0.1, sat: 5 },
  // white + Atlantic blue
  marrakech: { type: "city", hues: [15, 40], luma: 0, sat: 18 },
  // terracotta + saffron
  nairobi: { type: "city", hues: [18, 42], luma: 0, sat: 12 },
  // savanna red + gold
  addisababa: { type: "city", hues: [125, 5], luma: 0, sat: 10 },
  // Ethiopian green + red
  accra: { type: "city", hues: [50, 28], luma: 0.1, sat: 15 },
  // Gold Coast warm + bright
  lagos: { type: "city", hues: [28, 130], luma: 0, sat: 15 },
  // warm orange + green
  abuja: { type: "city", hues: [5, 130], luma: 0, sat: 12 },
  // Nigerian green + red
  dakar: { type: "city", hues: [28, 200], luma: 0.1, sat: 12 },
  // Atlantic + warm
  capetown: { type: "city", hues: [340, 205], luma: 0, sat: 12 },
  // Cape wine + sea blue
  johannesburg: { type: "city", hues: [42, 5], luma: -0.2, sat: 10 },
  // gold + deep
  // ── Americas ─────────────────────────────────────────────────────
  newyork: { type: "city", hues: [50, -1], luma: -0.4, sat: 8 },
  // yellow cab + steel dark
  losangeles: { type: "city", hues: [40, 28], luma: 0.2, sat: 12 },
  // golden + sunset warm
  sanfrancisco: { type: "city", hues: [28, -1], luma: 0, sat: -5 },
  // golden gate + fog
  chicago: { type: "city", hues: [-1, 210], luma: -0.3, sat: -5 },
  // windy city grey + lake blue
  miami: { type: "city", hues: [182, 340], luma: 0.2, sat: 18 },
  // teal + flamingo pink
  neworleans: { type: "city", hues: [270, 48], luma: 0, sat: 18 },
  // jazz purple + gold
  lasvegas: { type: "city", hues: [50, 5], luma: -0.3, sat: 22 },
  // neon gold + red on dark
  seattle: { type: "city", hues: [210, 130], luma: -0.1, sat: -8 },
  // Pacific rain + evergreen
  portland: { type: "city", hues: [130, 28], luma: 0, sat: -5 },
  // forest + warm
  austin: { type: "city", hues: [38, 5], luma: 0, sat: 12 },
  // Texas warm + burnt orange
  toronto: { type: "city", hues: [5, -1], luma: 0, sat: 5 },
  // Canadian red + neutral
  montreal: { type: "city", hues: [5, 210], luma: 0, sat: 8 },
  // French + Nordic
  vancouver: { type: "city", hues: [205, 130], luma: 0.1, sat: 5 },
  // Pacific blue + mountain green
  mexicocity: { type: "city", hues: [18, 130], luma: 0, sat: 15 },
  // Mexico terracotta + green
  bogota: { type: "city", hues: [50, 5], luma: -0.1, sat: 10 },
  // Colombian gold + red
  lima: { type: "city", hues: [28, 210], luma: 0, sat: 8 },
  // Peruvian warm + Pacific grey
  santiago: { type: "city", hues: [210, 42], luma: 0, sat: 5 },
  // Andes blue + earth
  buenosaires: { type: "city", hues: [210, -1], luma: 0, sat: 8 },
  // Argentine blue + neutral
  riodejaneiro: { type: "city", hues: [130, 45], luma: 0.2, sat: 18 },
  // tropical green + carnival gold
  saopaulo: { type: "city", hues: [130, 28], luma: -0.2, sat: 10 },
  // Paulista grey + warm
  // ── Oceania ──────────────────────────────────────────────────────
  sydney: { type: "city", hues: [205, 45], luma: 0.2, sat: 12 },
  // harbour blue + golden
  melbourne: { type: "city", hues: [270, -1], luma: -0.1, sat: -5 },
  // artistic purple + grey
  brisbane: { type: "city", hues: [48, 200], luma: 0.2, sat: 12 },
  // Queensland sunny + blue
  auckland: { type: "city", hues: [205, 130], luma: 0.1, sat: 8 },
  // Pacific + green
  wellington: { type: "city", hues: [210, -1], luma: 0, sat: -5 }
  // Cook Strait + grey
};
function normalize(s) {
  return s.toLowerCase().replace(/[^a-z]/g, "");
}
function extractEntities(text) {
  const found = [];
  const seen = /* @__PURE__ */ new Set();
  const candidates = [];
  const multiWord = text.matchAll(/\b([A-Z][a-zA-Z]{1,})(?:\s+([A-Z][a-zA-Z]{1,}))?(?:\s+([A-Z][a-zA-Z]{1,}))?\b/g);
  for (const m of multiWord) {
    if (m[3]) candidates.push(m[1] + m[2] + m[3]);
    if (m[2]) candidates.push(m[1] + m[2]);
    candidates.push(m[1]);
  }
  const acronyms = text.matchAll(/\b([A-Z]{2,5})\b/g);
  for (const m of acronyms) candidates.push(m[1]);
  for (const raw of candidates) {
    const key = normalize(raw);
    if (seen.has(key)) continue;
    const entry = BRANDS[key] ?? CITIES[key];
    if (entry) {
      seen.add(key);
      found.push({ name: raw, ...entry });
    }
  }
  return found;
}

// src/core/nlp/index.ts
function tokenize(text) {
  return text.toLowerCase().replace(/['']/g, "").replace(/[^a-z0-9\s-]/g, " ").split(/\s+/).filter((t) => t.length > 1 && !STOPWORDS.has(t));
}
var SUFFIXES = [
  "fulness",
  "fulness",
  "lessly",
  "lessly",
  "ations",
  "ments",
  "iness",
  "ously",
  "ingly",
  "ation",
  "ness",
  "ment",
  "less",
  "ful",
  "ous",
  "ive",
  "ize",
  "ise",
  "ing",
  "ely",
  "ity",
  "ied",
  "ers",
  "est",
  "ing",
  "ful",
  "al",
  "ed",
  "er",
  "ly",
  "es",
  "s"
];
function stem(word) {
  if (LEXICON[word] !== void 0) return word;
  for (const sfx of SUFFIXES) {
    if (word.length > sfx.length + 2 && word.endsWith(sfx)) {
      const root = word.slice(0, -sfx.length);
      if (LEXICON[root] !== void 0) return root;
      if (LEXICON[root + "e"] !== void 0) return root + "e";
    }
  }
  return word;
}
function buildFrequency(tokens) {
  const freq = /* @__PURE__ */ new Map();
  for (const t of tokens) {
    const s = stem(t);
    freq.set(s, (freq.get(s) ?? 0) + 1);
  }
  return freq;
}
var OVERUSED = {
  good: 0.6,
  great: 0.7,
  bad: 0.6,
  like: 0.5,
  new: 0.5,
  time: 0.5,
  day: 0.5,
  feel: 0.6,
  look: 0.5,
  way: 0.4,
  make: 0.4,
  work: 0.6,
  use: 0.5,
  come: 0.4,
  think: 0.6
};
function analyzeText(text) {
  const tokens = tokenize(text);
  if (tokens.length === 0) return emptyAnalysis();
  const freq = buildFrequency(tokens);
  const emotions = {
    anger: 0,
    fear: 0,
    anticipation: 0,
    trust: 0,
    surprise: 0,
    sadness: 0,
    joy: 0,
    disgust: 0,
    positive: 0,
    negative: 0
  };
  const domainHits = { tech: 0, nature: 0, urban: 0, personal: 0 };
  const colorHues = [];
  let lumaHint = 0;
  let timeOfDay = null;
  const wordScores = [];
  for (const [word, count] of freq) {
    const tf = Math.log1p(count);
    const idf = OVERUSED[word] ?? 1;
    const weight = tf * idf;
    const mask = LEXICON[word] ?? 0;
    if (mask !== 0) {
      let emotionScore = 0;
      const EMOTION_KEYS = [
        "anger",
        "fear",
        "anticipation",
        "trust",
        "surprise",
        "sadness",
        "joy",
        "disgust",
        "positive",
        "negative"
      ];
      EMOTION_BITS.forEach((bit, i) => {
        if (mask & bit) {
          emotions[EMOTION_KEYS[i]] += weight;
          emotionScore += weight;
        }
      });
      wordScores.push({ w: word, score: emotionScore });
    }
    for (const [domain2, wordSet] of Object.entries(DOMAIN)) {
      if (wordSet.has(word)) domainHits[domain2] += tf;
    }
    if (COLOR_HUES[word] !== void 0) {
      const hue = COLOR_HUES[word];
      if (hue >= 0) colorHues.push(hue);
      else if (hue === -2) lumaHint -= 0.3 * tf;
      else if (hue === -3) lumaHint += 0.3 * tf;
    }
    if (TIME_WORDS[word] !== void 0 && timeOfDay === null) {
      timeOfDay = TIME_WORDS[word];
    }
  }
  const norm = Math.sqrt(Math.max(tokens.length, 1));
  for (const key of Object.keys(emotions)) {
    emotions[key] = Math.min(1, emotions[key] / norm);
  }
  const totalDomain = Object.values(domainHits).reduce((a, b) => a + b, 0) || 1;
  const domain = {
    tech: domainHits.tech / totalDomain,
    nature: domainHits.nature / totalDomain,
    urban: domainHits.urban / totalDomain,
    personal: domainHits.personal / totalDomain
  };
  const dominantDomain = (Object.entries(domain).sort(([, a], [, b]) => b - a).find(([, v]) => v > 0.3) ?? [null])[0];
  const valence = Math.max(-1, Math.min(1, emotions.positive - emotions.negative));
  const arousal = Math.min(
    1,
    emotions.anger + emotions.fear + emotions.joy * 0.7 + emotions.surprise - (emotions.sadness * 0.3 + emotions.trust * 0.2)
  );
  const topWords = wordScores.sort((a, b) => b.score - a.score).slice(0, 5).map((x) => x.w);
  const label = buildLabel(emotions, domain, dominantDomain, valence);
  const entities = extractEntities(text);
  return {
    emotions,
    valence,
    arousal,
    domain,
    dominantDomain,
    colorHints: colorHues,
    lumaHint: Math.max(-1, Math.min(1, lumaHint)),
    timeOfDay,
    entities,
    label,
    topWords
  };
}
function buildLabel(e, domain, dom, valence) {
  const domainLabel = {
    tech: "a digital dusk",
    nature: "open air",
    urban: "city light",
    personal: "a quiet morning"
  };
  if (dom && domain[dom] > 0.4) return domainLabel[dom];
  const emotionPhrases = [
    [e.joy, "luminous air"],
    [e.sadness, "still indigo"],
    [e.anger, "burning edge"],
    [e.fear, "an unsettled sky"],
    [e.anticipation, "before daybreak"],
    [e.trust, "open horizon"],
    [e.surprise, "an unexpected sky"],
    [e.disgust, "heavy cloud"]
  ];
  const top = emotionPhrases.sort(([a], [b]) => b - a)[0];
  if (top[0] > 0.05) return top[1];
  return valence > 0.1 ? "a warm sky" : valence < -0.1 ? "weight of dusk" : "a still sky";
}
function emptyAnalysis() {
  return {
    emotions: { anger: 0, fear: 0, anticipation: 0, trust: 0, surprise: 0, sadness: 0, joy: 0, disgust: 0, positive: 0, negative: 0 },
    valence: 0,
    arousal: 0,
    domain: { tech: 0, nature: 0, urban: 0, personal: 0 },
    dominantDomain: null,
    colorHints: [],
    lumaHint: 0,
    timeOfDay: null,
    entities: [],
    label: "a still sky",
    topWords: []
  };
}

// src/core/brandPool.ts
var BRAND_POOL = [
  // ── Languages ──────────────────────────────────────────────────────
  { name: "Python Blue", brand: "Python", hex: "#3776AB", style: "vivid", category: "language" },
  { name: "Python Yellow", brand: "Python", hex: "#FFD43B", style: "vivid", category: "language" },
  { name: "Scala Red", brand: "Scala", hex: "#DC322F", style: "vivid", category: "language" },
  { name: "R Blue", brand: "R", hex: "#276DC3", style: "vivid", category: "language" },
  // ── Databases ─────────────────────────────────────────────────────
  { name: "BigQuery Blue", brand: "BigQuery", hex: "#4285F4", style: "vivid", category: "database" },
  { name: "BigQuery Yellow", brand: "BigQuery", hex: "#FBBC05", style: "vivid", category: "database" },
  { name: "BigQuery Green", brand: "BigQuery", hex: "#34A853", style: "vivid", category: "database" },
  { name: "Redshift Violet", brand: "Redshift", hex: "#8C4FFF", style: "vivid", category: "database" },
  { name: "DuckDB Gold", brand: "DuckDB", hex: "#FFC300", style: "vivid", category: "database" },
  { name: "PostgreSQL Blue", brand: "PostgreSQL", hex: "#336791", style: "vivid", category: "database" },
  { name: "MySQL Orange", brand: "MySQL", hex: "#F29111", style: "vivid", category: "database" },
  { name: "SQL Server Red", brand: "SQL Server", hex: "#CC2927", style: "vivid", category: "database" },
  { name: "MongoDB Green", brand: "MongoDB", hex: "#00ED64", style: "vivid", category: "database" },
  { name: "MongoDB Dark", brand: "MongoDB", hex: "#001E2B", style: "veil", category: "database" },
  { name: "S3 Sage", brand: "Amazon S3", hex: "#569A31", style: "vivid", category: "database" },
  // ── Tools ──────────────────────────────────────────────────────────
  { name: "Airflow Sky", brand: "Airflow", hex: "#017CEE", style: "vivid", category: "tool" },
  { name: "dbt Coral", brand: "dbt", hex: "#FF694A", style: "vivid", category: "tool" },
  { name: "Spark Ember", brand: "Spark", hex: "#E25A1C", style: "vivid", category: "tool" },
  { name: "Trino Scarlet", brand: "Trino", hex: "#DD4243", style: "vivid", category: "tool" },
  { name: "Impala Ember", brand: "Impala", hex: "#F96702", style: "vivid", category: "tool" },
  { name: "Lambda Gold", brand: "AWS Lambda", hex: "#FF9900", style: "vivid", category: "tool" },
  { name: "Jenkins Brick", brand: "Jenkins", hex: "#D33832", style: "vivid", category: "tool" },
  { name: "Kubernetes Blue", brand: "Kubernetes", hex: "#326CE5", style: "vivid", category: "tool" },
  { name: "Kubernetes Night", brand: "Kubernetes", hex: "#0F1729", style: "veil", category: "tool" },
  { name: "Docker Blue", brand: "Docker", hex: "#2496ED", style: "vivid", category: "tool" },
  { name: "Docker Slate", brand: "Docker", hex: "#384D54", style: "veil", category: "tool" },
  { name: "Linux Blue", brand: "Linux", hex: "#1793D1", style: "vivid", category: "tool" },
  { name: "Git Vermillion", brand: "Git", hex: "#F05032", style: "vivid", category: "tool" },
  // ── Omarchy Themes (by basecamp/omarchy) ──────────────────────────
  // `term` gives each theme its own detection keyword in the text resolver.
  { name: "Vantablack", brand: "Omarchy", term: "vantablack", hex: "#8d8d8d", style: "veil", category: "theme" },
  { name: "Matte Black", brand: "Omarchy", term: "matte black", hex: "#e68e0d", style: "vivid", category: "theme" },
  { name: "Hackerman", brand: "Omarchy", term: "hackerman", hex: "#82FB9C", style: "vivid", category: "theme" },
  { name: "Tokyo Night", brand: "Omarchy", term: "tokyo night", hex: "#7aa2f7", style: "vivid", category: "theme" },
  { name: "Last Horizon", brand: "Omarchy", term: "last horizon", hex: "#b59790", style: "veil", category: "theme" },
  { name: "Lumon", brand: "Omarchy", term: "lumon", hex: "#8bc9eb", style: "vivid", category: "theme" },
  { name: "Ristretto", brand: "Omarchy", term: "ristretto", hex: "#f38d70", style: "vivid", category: "theme" },
  { name: "Osaka Jade", brand: "Omarchy", term: "osaka jade", hex: "#509475", style: "vivid", category: "theme" },
  { name: "Rose Pine", brand: "Omarchy", term: "rose pine", hex: "#56949f", style: "vivid", category: "theme" },
  { name: "Nord", brand: "Omarchy", term: "nord", hex: "#81a1c1", style: "vivid", category: "theme" },
  { name: "Retro 82", brand: "Omarchy", term: "retro 82", hex: "#faa968", style: "vivid", category: "theme" },
  { name: "Solitude", brand: "Omarchy", term: "solitude", hex: "#798186", style: "veil", category: "theme" },
  { name: "Everforest", brand: "Omarchy", term: "everforest", hex: "#7fbbb3", style: "vivid", category: "theme" },
  { name: "Catppuccin Mocha", brand: "Omarchy", term: "catppuccin", hex: "#89b4fa", style: "vivid", category: "theme" },
  { name: "Catppuccin Latte", brand: "Omarchy", term: "catppuccin latte", hex: "#1e66f5", style: "vivid", category: "theme" },
  { name: "Omarchy Green", brand: "Omarchy", term: "omarchy", hex: "#9ece6a", style: "vivid", category: "theme" },
  { name: "Omarchy Turquoise", brand: "Omarchy", term: "omarchy turquoise", hex: "#b4f9f8", style: "vivid", category: "theme" }
];

// src/resolvers/text.ts
function pickHour(a) {
  if (a.timeOfDay !== null) return a.timeOfDay;
  const { emotions: e, domain, valence } = a;
  if (domain.tech > 0.35) return 20;
  if (e.anticipation > 0.12 && valence > 0.1) return 6;
  if (e.joy > 0.14) return 17;
  if (e.sadness > 0.15) return 14;
  if (e.fear > 0.15 || e.anger > 0.15) return 22;
  if (e.trust > 0.15 && valence > 0.1) return 11;
  return (/* @__PURE__ */ new Date()).getHours();
}
function pickMomentForAnalysis(a, rng) {
  const { emotions: e, valence, domain, timeOfDay } = a;
  let pool;
  if (e.sadness > 0.2 || valence < -0.3 || e.fear > 0.18) {
    pool = SKY_MOMENTS.filter(
      (m) => ["rain grey", "overcast", "blue hour", "smog morning", "midnight", "deep dusk", "humid haze"].includes(m.name)
    );
  } else if (e.joy > 0.18 && valence > 0.2) {
    pool = SKY_MOMENTS.filter(
      (m) => ["clear morning", "midday", "golden hour", "summer haze", "sakura haze", "city-pop dawn", "hazy morning"].includes(m.name)
    );
  } else if (e.anticipation > 0.15 || timeOfDay !== null && timeOfDay < 8) {
    pool = SKY_MOMENTS.filter(
      (m) => ["first light", "dawn", "city-pop dawn", "sakura haze", "clear morning", "hazy morning"].includes(m.name)
    );
  } else if (timeOfDay !== null && timeOfDay >= 17) {
    pool = SKY_MOMENTS.filter(
      (m) => ["golden hour", "sunset", "afterglow", "blue hour", "late afternoon", "pastel dusk", "deep dusk"].includes(m.name)
    );
  } else if (domain.personal > 0.3) {
    pool = SKY_MOMENTS.filter(
      (m) => ["city-pop dawn", "sakura haze", "late afternoon", "pastel dusk", "summer haze", "hazy morning"].includes(m.name)
    );
  } else {
    pool = SKY_MOMENTS;
  }
  if (pool.length === 0) pool = SKY_MOMENTS;
  return pickWeighted(pool, rng).name;
}
var NIPPON_COLORS = {
  // Blues
  sora: { h: 195, s: 42, l: 66 },
  sorairo: { h: 195, s: 42, l: 66 },
  asagi: { h: 185, s: 42, l: 45 },
  asagiiro: { h: 185, s: 42, l: 45 },
  hanada: { h: 210, s: 64, l: 45 },
  gunjou: { h: 225, s: 44, l: 43 },
  rurikon: { h: 216, s: 51, l: 36 },
  aiiro: { h: 213, s: 49, l: 22 },
  ai: { h: 213, s: 49, l: 22 },
  koniro: { h: 228, s: 51, l: 13 },
  kon: { h: 228, s: 51, l: 13 },
  tetsukon: { h: 224, s: 44, l: 18 },
  ainezumi: { h: 205, s: 22, l: 48 },
  byakugun: { h: 208, s: 14, l: 72 },
  // Purples / violets
  fujiiro: { h: 248, s: 35, l: 66 },
  fuji: { h: 248, s: 35, l: 66 },
  kikyoiro: { h: 244, s: 37, l: 42 },
  kikyo: { h: 244, s: 37, l: 42 },
  sumireiro: { h: 253, s: 34, l: 37 },
  sumire: { h: 253, s: 34, l: 37 },
  murasaki: { h: 268, s: 60, l: 46 },
  edomurasaki: { h: 272, s: 43, l: 33 },
  hanafuji: { h: 252, s: 28, l: 72 },
  fujinezumi: { h: 241, s: 12, l: 49 },
  budou: { h: 286, s: 42, l: 28 },
  // Pinks / roses
  sakura: { h: 5, s: 84, l: 92 },
  sakurairo: { h: 5, s: 84, l: 92 },
  nadeshiko: { h: 357, s: 65, l: 80 },
  tokiiro: { h: 346, s: 73, l: 83 },
  toki: { h: 346, s: 73, l: 83 },
  usubeni: { h: 350, s: 55, l: 50 },
  kohbai: { h: 352, s: 77, l: 58 },
  botan: { h: 330, s: 56, l: 58 },
  beni: { h: 345, s: 60, l: 42 },
  kurenai: { h: 344, s: 72, l: 45 },
  akane: { h: 350, s: 69, l: 35 },
  enji: { h: 348, s: 62, l: 35 },
  ikkonzome: { h: 344, s: 74, l: 52 },
  momo: { h: 14, s: 88, l: 78 },
  momoiro: { h: 14, s: 88, l: 78 },
  // Oranges / ambers
  shu: { h: 15, s: 77, l: 55 },
  daidaiiro: { h: 28, s: 87, l: 52 },
  daidai: { h: 28, s: 87, l: 52 },
  kohaku: { h: 30, s: 69, l: 46 },
  // Yellows / golds
  yamabukiiro: { h: 42, s: 100, l: 48 },
  yamabuki: { h: 42, s: 100, l: 48 },
  kogane: { h: 43, s: 80, l: 52 },
  kuchinashi: { h: 40, s: 89, l: 68 },
  nanohana: { h: 52, s: 95, l: 56 },
  // Creams / whites
  gofun: { h: 50, s: 40, l: 97 },
  torinoko: { h: 34, s: 72, l: 86 },
  kinari: { h: 44, s: 72, l: 93 },
  // Greens
  moegi: { h: 84, s: 39, l: 50 },
  moegyoiro: { h: 84, s: 39, l: 50 },
  wakakusa: { h: 85, s: 37, l: 52 },
  wakakusairo: { h: 85, s: 37, l: 52 },
  matcha: { h: 75, s: 48, l: 61 },
  seijiro: { h: 174, s: 29, l: 65 },
  seiji: { h: 174, s: 29, l: 65 },
  midori: { h: 119, s: 43, l: 30 },
  tokiwa: { h: 148, s: 30, l: 30 },
  tokiwairo: { h: 148, s: 30, l: 30 },
  wakatake: { h: 148, s: 38, l: 44 },
  wakatakeiro: { h: 148, s: 38, l: 44 },
  // Greys
  rikyunezumi: { h: 145, s: 11, l: 54 },
  usuzumi: { h: 220, s: 6, l: 64 },
  nibiiiro: { h: 233, s: 10, l: 43 }
};
function lookupNipponColor(word) {
  const key = word.toLowerCase().replace(/[^a-z]/g, "");
  return NIPPON_COLORS[key] ?? null;
}
function _hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      default:
        h = ((r - g) / d + 4) / 6;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}
var _seen = /* @__PURE__ */ new Set();
var BRAND_LOOKUP = {};
for (const b of BRAND_POOL) {
  const key = (b.term ?? b.brand).toLowerCase();
  if (!_seen.has(key)) {
    _seen.add(key);
    const hsl = _hexToHsl(b.hex);
    BRAND_LOOKUP[key] = { ...hsl, label: b.name.toLowerCase() };
  }
}
var _ALIASES = {
  postgres: "postgresql",
  mongo: "mongodb",
  k8s: "kubernetes",
  "sql server": "sql server",
  mssql: "sql server",
  airflow: "airflow",
  pyspark: "spark",
  "apache spark": "spark",
  "apache airflow": "airflow",
  gcp: "bigquery",
  aws: "amazon s3",
  github: "git"
};
for (const [alias, target] of Object.entries(_ALIASES)) {
  if (!BRAND_LOOKUP[alias] && BRAND_LOOKUP[target]) {
    BRAND_LOOKUP[alias] = BRAND_LOOKUP[target];
  }
}
function detectBrand(text) {
  const lower = text.toLowerCase();
  const keys = Object.keys(BRAND_LOOKUP).sort((a, b) => b.length - a.length);
  for (const key of keys) {
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (new RegExp(`(?<![a-z])${escaped}(?![a-z])`, "i").test(lower)) {
      return BRAND_LOOKUP[key];
    }
  }
  return null;
}
function nudgeToNipponColor(stops, th, ts, tl) {
  return stops.map((stop, i) => {
    const str = 0.5 + i * (0.4 / Math.max(stops.length - 1, 1));
    let dh = th - stop.h;
    if (dh > 180) dh -= 360;
    if (dh < -180) dh += 360;
    return {
      h: (stop.h + dh * str + 360) % 360,
      s: Math.max(0, Math.min(90, stop.s + (ts - stop.s) * 0.3 * str)),
      l: Math.max(12, Math.min(92, stop.l + (tl - stop.l) * 0.22 * str))
    };
  });
}
function nudgeHue(stops, targetH, strength) {
  return stops.map((stop) => {
    let delta = targetH - stop.h;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    return { ...stop, h: (stop.h + delta * strength + 360) % 360 };
  });
}
function applyEntityHint(stops, entity) {
  if (!entity.hues || entity.hues.length === 0) return stops;
  const targetH = entity.hues[0];
  const sat = entity.sat ?? 0;
  const luma = entity.luma ?? 0;
  return stops.map((stop, i) => {
    const str = 0.45 + i * (0.25 / Math.max(stops.length - 1, 1));
    let delta = targetH - stop.h;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    return {
      h: (stop.h + delta * str * 0.7 + 360) % 360,
      s: Math.max(5, Math.min(90, stop.s + sat * str)),
      l: Math.max(12, Math.min(92, stop.l + luma * 10 * str * 0.4))
    };
  });
}
function applyLumaToHsl(stops, luma) {
  const shift = luma * 6;
  return stops.map((stop) => ({
    ...stop,
    l: Math.max(12, Math.min(92, stop.l + shift))
  }));
}
var JP_LABELS = {
  sora: "sora clear",
  sorairo: "sora clear",
  hanada: "hanada blue",
  ai: "ai-iro night",
  aiiro: "ai-iro night",
  ruri: "ruri-iro deep",
  rurikon: "rurikon dusk",
  asagi: "asagi morning",
  nando: "nando grey",
  gunjou: "gunjou night",
  tsuyukusa: "tsuyukusa blue",
  kon: "kon night",
  tetsukon: "tetsukon depth",
  byakugun: "byakugun mist",
  sakura: "sakura dawn",
  sakurairo: "sakura dawn",
  momo: "momo-iro sky",
  momoiro: "momo-iro sky",
  kobai: "kobai evening",
  beni: "beni dusk",
  enji: "enji depth",
  nadeshiko: "nadeshiko light",
  toki: "toki rose",
  usubeni: "usubeni rose",
  kurenai: "kurenai edge",
  akane: "akane dusk",
  murasaki: "murasaki dusk",
  fuji: "fuji haze",
  fujiiro: "fuji haze",
  kikyo: "kikyo evening",
  kikyoiro: "kikyo evening",
  sumire: "sumire violet",
  hanafuji: "hanafuji mist",
  budou: "budou dark",
  usumurasaki: "usume violet",
  yamabuki: "yamabuki sky",
  kohaku: "kohaku amber",
  kuchinashi: "kuchinashi eve",
  nanohana: "nanohana gold",
  gofun: "gofun sky",
  torinoko: "torinoko haze",
  midori: "midori air",
  matcha: "matcha haze",
  tokiwa: "tokiwa green",
  moegi: "moegi dawn",
  wakakusa: "wakakusa morning",
  wakatake: "wakatake mist",
  yanagi: "yanagi air",
  seiji: "seiji light"
};
function colorLabel(hue, rawInput) {
  const key = rawInput.toLowerCase().replace(/[^a-z]/g, "");
  if (JP_LABELS[key]) return JP_LABELS[key];
  if (hue >= 330 || hue < 15) return "rose sky";
  if (hue < 60) return "golden light";
  if (hue < 80) return "citrus air";
  if (hue < 170) return "verdant air";
  if (hue < 230) return "open sky";
  if (hue < 265) return "deep indigo";
  if (hue < 310) return "violet dusk";
  return "crimson edge";
}
function entityLabel(entities, fallback) {
  if (entities.length === 0) return fallback;
  return entities.slice(0, 2).map((e) => e.name).join(" \xD7 ") + " sky";
}
var textResolver = {
  id: "text",
  score(input) {
    if (input.mode !== "text") return 0;
    return (input.text?.trim().length ?? 0) > 0 ? 90 : 0;
  },
  async resolve(input) {
    const text = input.text ?? "";
    const style = input.styleOverride ?? "vivid";
    const analysis = analyzeText(text);
    const hour = pickHour(analysis);
    const trimmed = text.trim();
    const wordCount = trimmed.split(/\s+/).length;
    const isColorWord = wordCount <= 3 && analysis.colorHints.length > 0 && analysis.entities.length === 0;
    const momentRng = makeRng(`${text}:m`);
    let momentName;
    let baseLabel;
    const nipponColor = isColorWord ? lookupNipponColor(trimmed) : null;
    const brand = detectBrand(text);
    if (nipponColor) {
      momentName = pickWeightedByHue(nipponColor.h, momentRng).name;
      baseLabel = colorLabel(nipponColor.h, trimmed);
    } else if (isColorWord) {
      momentName = pickWeightedByHue(analysis.colorHints[0], momentRng).name;
      baseLabel = colorLabel(analysis.colorHints[0], trimmed);
    } else if (brand && analysis.entities.length === 0 && !isColorWord) {
      momentName = pickWeightedByHue(brand.h, momentRng).name;
      baseLabel = brand.label + " sky";
    } else if (analysis.entities.length > 0) {
      momentName = pickMomentForAnalysis(analysis, momentRng);
      baseLabel = entityLabel(analysis.entities, analysis.label);
    } else {
      momentName = pickMomentForAnalysis(analysis, momentRng);
      baseLabel = analysis.label;
    }
    const sky = generateSkyGradient({ seed: text, moment: momentName, style });
    let hsl = sky.hslStops;
    if (nipponColor) {
      hsl = nudgeToNipponColor(hsl, nipponColor.h, nipponColor.s, nipponColor.l);
    } else if (brand) {
      hsl = nudgeToNipponColor(hsl, brand.h, brand.s * 0.75, brand.l);
      if (analysis.entities.length > 0) {
        hsl = applyEntityHint(hsl, analysis.entities[0]);
      }
    } else if (isColorWord && analysis.colorHints.length > 0) {
      hsl = nudgeHue(hsl, analysis.colorHints[0], 0.55);
    } else if (analysis.entities.length > 0) {
      hsl = applyEntityHint(hsl, analysis.entities[0]);
      if (analysis.entities[1]) hsl = applyEntityHint(hsl, analysis.entities[1]);
    } else if (analysis.colorHints.length > 0) {
      hsl = nudgeHue(hsl, analysis.colorHints[0], 0.35);
    }
    if (Math.abs(analysis.lumaHint) >= 0.1) {
      hsl = applyLumaToHsl(hsl, analysis.lumaHint);
    }
    const final = hsl === sky.hslStops ? sky : renderFromHsl(hsl, momentName, style, sky.positions, sky.styleVariant);
    return {
      stops: final.stops,
      css: final.css,
      moment: final.moment,
      style,
      timeOfDay: MOMENT_HOURS[final.moment] ?? hour,
      source: `text:${trimmed.slice(0, 40)}\u2026`,
      label: baseLabel,
      word: text.slice(0, 60)
    };
  }
};

// src/resolvers/custom.ts
function hexToHsl2(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      default:
        h = ((r - g) / d + 4) / 6;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}
var customResolver = {
  id: "custom",
  score: (input) => input.mode === "custom" && (input.customStops?.length ?? 0) >= 2 ? 100 : 0,
  async resolve(input) {
    const hexStops = input.customStops ?? [];
    const style = input.styleOverride ?? "vivid";
    const isSho = input.composition === "sho";
    const variant = createStyleVariant(style, makeRng(hexStops.join(",")));
    const raw = hexStops.map(hexToHsl2);
    const styled = raw.map((s, i) => styleHslStop(s, i, raw.length, style, variant));
    const positions = isSho ? skyStopPositions(styled.length) : normalStopPositions(styled.length);
    const rendered = renderFromHsl(styled, "custom", style, positions, variant);
    return {
      stops: rendered.stops,
      css: rendered.css,
      moment: "custom",
      style,
      timeOfDay: (/* @__PURE__ */ new Date()).getHours(),
      source: "custom",
      label: isSho ? "custom \xB7 sho" : "custom gradient",
      paletteHex: hexStops[0]
    };
  }
};

// src/core/palette.ts
function defaultGradientState() {
  const sky = generateSkyGradient();
  return {
    stops: sky.stops,
    css: sky.css,
    moment: sky.moment,
    style: "vivid",
    timeOfDay: MOMENT_HOURS[sky.moment] ?? (/* @__PURE__ */ new Date()).getHours(),
    source: "default",
    label: sky.moment
  };
}

// src/resolvers/index.ts
var registry = [customResolver, textResolver, colorResolver];
var fallbackResolver = {
  id: "fallback",
  score: () => 1,
  resolve: async () => defaultGradientState()
};
async function pickResolver(input) {
  const scores = await Promise.all(
    registry.map(async (r) => {
      try {
        const s = await r.score(input);
        return { r, s };
      } catch {
        return { r, s: 0 };
      }
    })
  );
  scores.sort((a, b) => b.s - a.s);
  return scores[0].s > 0 ? scores[0].r : fallbackResolver;
}

// api/_lib/index.ts
function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}
function parseStyle(raw) {
  return raw === "veil" ? "veil" : "vivid";
}
function parseUrl(req) {
  return new URL(req.url, "http://localhost").searchParams;
}

// api/gradient/color.ts
var HEX_RE = /^#[0-9a-fA-F]{6}$/;
async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  const p = parseUrl(req);
  const color = p.get("color") ?? "#3a6ea5";
  const style = parseStyle(p.get("style"));
  const seed = Math.abs(parseInt(p.get("seed") ?? "0", 10)) || 0;
  if (!HEX_RE.test(color)) {
    return res.status(400).json({ error: "Invalid color. Expected a 6-digit hex like #3a6ea5." });
  }
  const input = { mode: "color", color, styleOverride: style, shuffleSeed: seed };
  const resolver = await pickResolver(input);
  const state = await resolver.resolve(input);
  return res.status(200).json(state);
}
export {
  handler as default
};
