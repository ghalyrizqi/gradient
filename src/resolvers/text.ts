import type { Resolver, ResolverInput, GradientState, JapaneseStyle } from '../core/types';
import type { HslStop } from '../core/skyGradient';
import { analyzeText, type TextAnalysis, type ExtractedEntity } from '../core/nlp/index';
import {
  generateSkyGradient, renderFromHsl,
  makeRng, pickWeighted, pickWeightedByHue,
  SKY_MOMENTS, MOMENT_HOURS,
} from '../core/skyGradient';
import { BRAND_POOL } from '../core/brandPool';

// ── Time-of-day selection ──────────────────────────────────────────

function pickHour(a: TextAnalysis): number {
  if (a.timeOfDay !== null) return a.timeOfDay;
  const { emotions: e, domain, valence } = a;
  if (domain.tech > 0.35)                          return 20;
  if (e.anticipation > 0.12 && valence > 0.1)     return 6;
  if (e.joy > 0.14)                                return 17;
  if (e.sadness > 0.15)                            return 14;
  if (e.fear > 0.15 || e.anger > 0.15)            return 22;
  if (e.trust > 0.15 && valence > 0.1)            return 11;
  return new Date().getHours();
}

// ── NLP-aware moment selection ─────────────────────────────────────

function pickMomentForAnalysis(a: TextAnalysis, rng: () => number): string {
  const { emotions: e, valence, domain, timeOfDay } = a;

  let pool: readonly typeof SKY_MOMENTS[number][];

  if (e.sadness > 0.20 || valence < -0.30 || e.fear > 0.18) {
    pool = SKY_MOMENTS.filter(m =>
      ['rain grey', 'overcast', 'blue hour', 'smog morning', 'midnight', 'deep dusk', 'humid haze'].includes(m.name),
    );
  } else if (e.joy > 0.18 && valence > 0.20) {
    pool = SKY_MOMENTS.filter(m =>
      ['clear morning', 'midday', 'golden hour', 'summer haze', 'sakura haze', 'city-pop dawn', 'hazy morning'].includes(m.name),
    );
  } else if (e.anticipation > 0.15 || (timeOfDay !== null && timeOfDay < 8)) {
    pool = SKY_MOMENTS.filter(m =>
      ['first light', 'dawn', 'city-pop dawn', 'sakura haze', 'clear morning', 'hazy morning'].includes(m.name),
    );
  } else if (timeOfDay !== null && timeOfDay >= 17) {
    pool = SKY_MOMENTS.filter(m =>
      ['golden hour', 'sunset', 'afterglow', 'blue hour', 'late afternoon', 'pastel dusk', 'deep dusk'].includes(m.name),
    );
  } else if (domain.personal > 0.30) {
    pool = SKY_MOMENTS.filter(m =>
      ['city-pop dawn', 'sakura haze', 'late afternoon', 'pastel dusk', 'summer haze', 'hazy morning'].includes(m.name),
    );
  } else {
    pool = SKY_MOMENTS;
  }

  if (pool.length === 0) pool = SKY_MOMENTS;
  return pickWeighted(pool, rng).name;
}

// ── Nippon Colors catalog (nipponcolors.com) ───────────────────────
// HSL values derived from authentic Nippon Color catalog hues.
// Used for precision nudging when the user types a Japanese color word.

const NIPPON_COLORS: Record<string, { h: number; s: number; l: number }> = {
  // Blues
  sora:        { h: 195, s: 42, l: 66 },  sorairo:      { h: 195, s: 42, l: 66 },
  asagi:       { h: 185, s: 42, l: 45 },  asagiiro:     { h: 185, s: 42, l: 45 },
  hanada:      { h: 210, s: 64, l: 45 },
  gunjou:      { h: 225, s: 44, l: 43 },
  rurikon:     { h: 216, s: 51, l: 36 },
  aiiro:       { h: 213, s: 49, l: 22 },  ai:           { h: 213, s: 49, l: 22 },
  koniro:      { h: 228, s: 51, l: 13 },  kon:          { h: 228, s: 51, l: 13 },
  tetsukon:    { h: 224, s: 44, l: 18 },
  ainezumi:    { h: 205, s: 22, l: 48 },
  byakugun:    { h: 208, s: 14, l: 72 },
  // Purples / violets
  fujiiro:     { h: 248, s: 35, l: 66 },  fuji:         { h: 248, s: 35, l: 66 },
  kikyoiro:    { h: 244, s: 37, l: 42 },  kikyo:        { h: 244, s: 37, l: 42 },
  sumireiro:   { h: 253, s: 34, l: 37 },  sumire:       { h: 253, s: 34, l: 37 },
  murasaki:    { h: 268, s: 60, l: 46 },
  edomurasaki: { h: 272, s: 43, l: 33 },
  hanafuji:    { h: 252, s: 28, l: 72 },
  fujinezumi:  { h: 241, s: 12, l: 49 },
  budou:       { h: 286, s: 42, l: 28 },
  // Pinks / roses
  sakura:      { h: 5,   s: 84, l: 92 },  sakurairo:    { h: 5,   s: 84, l: 92 },
  nadeshiko:   { h: 357, s: 65, l: 80 },
  tokiiro:     { h: 346, s: 73, l: 83 },  toki:         { h: 346, s: 73, l: 83 },
  usubeni:     { h: 350, s: 55, l: 50 },
  kohbai:      { h: 352, s: 77, l: 58 },
  botan:       { h: 330, s: 56, l: 58 },
  beni:        { h: 345, s: 60, l: 42 },
  kurenai:     { h: 344, s: 72, l: 45 },
  akane:       { h: 350, s: 69, l: 35 },
  enji:        { h: 348, s: 62, l: 35 },
  ikkonzome:   { h: 344, s: 74, l: 52 },
  momo:        { h: 14,  s: 88, l: 78 },  momoiro:      { h: 14,  s: 88, l: 78 },
  // Oranges / ambers
  shu:         { h: 15,  s: 77, l: 55 },
  daidaiiro:   { h: 28,  s: 87, l: 52 },  daidai:       { h: 28,  s: 87, l: 52 },
  kohaku:      { h: 30,  s: 69, l: 46 },
  // Yellows / golds
  yamabukiiro: { h: 42,  s: 100,l: 48 },  yamabuki:     { h: 42,  s: 100,l: 48 },
  kogane:      { h: 43,  s: 80, l: 52 },
  kuchinashi:  { h: 40,  s: 89, l: 68 },
  nanohana:    { h: 52,  s: 95, l: 56 },
  // Creams / whites
  gofun:       { h: 50,  s: 40, l: 97 },
  torinoko:    { h: 34,  s: 72, l: 86 },
  kinari:      { h: 44,  s: 72, l: 93 },
  // Greens
  moegi:       { h: 84,  s: 39, l: 50 },  moegyoiro:    { h: 84,  s: 39, l: 50 },
  wakakusa:    { h: 85,  s: 37, l: 52 },  wakakusairo:  { h: 85,  s: 37, l: 52 },
  matcha:      { h: 75,  s: 48, l: 61 },
  seijiro:     { h: 174, s: 29, l: 65 },  seiji:        { h: 174, s: 29, l: 65 },
  midori:      { h: 119, s: 43, l: 30 },
  tokiwa:      { h: 148, s: 30, l: 30 },  tokiwairo:    { h: 148, s: 30, l: 30 },
  wakatake:    { h: 148, s: 38, l: 44 },  wakatakeiro:  { h: 148, s: 38, l: 44 },
  // Greys
  rikyunezumi: { h: 145, s: 11, l: 54 },
  usuzumi:     { h: 220, s: 6,  l: 64 },
  nibiiiro:    { h: 233, s: 10, l: 43 },
};

function lookupNipponColor(word: string): { h: number; s: number; l: number } | null {
  const key = word.toLowerCase().replace(/[^a-z]/g, '');
  return NIPPON_COLORS[key] ?? null;
}

// ── Tech brand color detection ────────────────────────────────────
// Built once at module load from BRAND_POOL, keyed by term (lower-case).
// Aliases cover common shorthand that doesn't appear verbatim in the pool.

function _hexToHsl(hex: string): { h: number; s: number; l: number } {
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
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      default: h = ((r - g) / d + 4) / 6;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

// One entry per lookup key. `term` gives themed entries their own key;
// plain brand entries fall back to using `brand` as before.
const _seen = new Set<string>();
const BRAND_LOOKUP: Record<string, { h: number; s: number; l: number; label: string }> = {};

for (const b of BRAND_POOL) {
  const key = (b.term ?? b.brand).toLowerCase();
  if (!_seen.has(key)) {
    _seen.add(key);
    const hsl = _hexToHsl(b.hex);
    BRAND_LOOKUP[key] = { ...hsl, label: b.name.toLowerCase() };
  }
}

// Extra aliases not in pool names
const _ALIASES: Record<string, string> = {
  postgres:     'postgresql',
  mongo:        'mongodb',
  k8s:          'kubernetes',
  'sql server': 'sql server',
  mssql:        'sql server',
  airflow:      'airflow',
  pyspark:      'spark',
  'apache spark': 'spark',
  'apache airflow': 'airflow',
  gcp:          'bigquery',
  aws:          'amazon s3',
  github:       'git',
};
for (const [alias, target] of Object.entries(_ALIASES)) {
  if (!BRAND_LOOKUP[alias] && BRAND_LOOKUP[target]) {
    BRAND_LOOKUP[alias] = BRAND_LOOKUP[target];
  }
}

// Returns the first brand match found in text, longest key first (avoid partial hits).
function detectBrand(text: string): { h: number; s: number; l: number; label: string } | null {
  const lower = text.toLowerCase();
  const keys  = Object.keys(BRAND_LOOKUP).sort((a, b) => b.length - a.length);
  for (const key of keys) {
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (new RegExp(`(?<![a-z])${escaped}(?![a-z])`, 'i').test(lower)) {
      return BRAND_LOOKUP[key];
    }
  }
  return null;
}

// Nudge stops toward an authentic Nippon Color.
// H: strong pull (50–70%); S and L: gentle pull (25–35%).
function nudgeToNipponColor(
  stops: HslStop[], th: number, ts: number, tl: number,
): HslStop[] {
  return stops.map((stop, i) => {
    const str = 0.50 + i * (0.40 / Math.max(stops.length - 1, 1));
    let dh = th - stop.h;
    if (dh > 180) dh -= 360;
    if (dh < -180) dh += 360;
    return {
      h: ((stop.h + dh * str)              + 360) % 360,
      s: Math.max(0,  Math.min(90, stop.s + (ts - stop.s) * 0.30 * str)),
      l: Math.max(12, Math.min(92, stop.l + (tl - stop.l) * 0.22 * str)),
    };
  });
}

// ── HSL-level NLP nudges ───────────────────────────────────────────

// Short-arc hue shift toward a target hue at given strength (0–1).
function nudgeHue(stops: HslStop[], targetH: number, strength: number): HslStop[] {
  return stops.map(stop => {
    let delta = targetH - stop.h;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    return { ...stop, h: ((stop.h + delta * strength) + 360) % 360 };
  });
}

function applyEntityHint(stops: HslStop[], entity: ExtractedEntity): HslStop[] {
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
      h: ((stop.h + delta * str * 0.70) + 360) % 360,
      s: Math.max(5,  Math.min(90, stop.s + sat * str)),
      l: Math.max(12, Math.min(92, stop.l + luma * 10 * str * 0.40)),
    };
  });
}

function applyLumaToHsl(stops: HslStop[], luma: number): HslStop[] {
  const shift = luma * 6;
  return stops.map(stop => ({
    ...stop, l: Math.max(12, Math.min(92, stop.l + shift)),
  }));
}

// ── Label helpers ──────────────────────────────────────────────────

const JP_LABELS: Record<string, string> = {
  sora: 'sora clear',          sorairo: 'sora clear',
  hanada: 'hanada blue',       ai: 'ai-iro night',         aiiro: 'ai-iro night',
  ruri: 'ruri-iro deep',       rurikon: 'rurikon dusk',
  asagi: 'asagi morning',      nando: 'nando grey',
  gunjou: 'gunjou night',      tsuyukusa: 'tsuyukusa blue',
  kon: 'kon night',            tetsukon: 'tetsukon depth',
  byakugun: 'byakugun mist',
  sakura: 'sakura dawn',       sakurairo: 'sakura dawn',
  momo: 'momo-iro sky',        momoiro: 'momo-iro sky',
  kobai: 'kobai evening',      beni: 'beni dusk',
  enji: 'enji depth',          nadeshiko: 'nadeshiko light',
  toki: 'toki rose',           usubeni: 'usubeni rose',
  kurenai: 'kurenai edge',     akane: 'akane dusk',
  murasaki: 'murasaki dusk',   fuji: 'fuji haze',          fujiiro: 'fuji haze',
  kikyo: 'kikyo evening',      kikyoiro: 'kikyo evening',
  sumire: 'sumire violet',     hanafuji: 'hanafuji mist',
  budou: 'budou dark',         usumurasaki: 'usume violet',
  yamabuki: 'yamabuki sky',    kohaku: 'kohaku amber',
  kuchinashi: 'kuchinashi eve', nanohana: 'nanohana gold',
  gofun: 'gofun sky',          torinoko: 'torinoko haze',
  midori: 'midori air',        matcha: 'matcha haze',
  tokiwa: 'tokiwa green',      moegi: 'moegi dawn',
  wakakusa: 'wakakusa morning', wakatake: 'wakatake mist',
  yanagi: 'yanagi air',        seiji: 'seiji light',
};

function colorLabel(hue: number, rawInput: string): string {
  const key = rawInput.toLowerCase().replace(/[^a-z]/g, '');
  if (JP_LABELS[key]) return JP_LABELS[key];
  if (hue >= 330 || hue < 15) return 'rose sky';
  if (hue < 60)  return 'golden light';
  if (hue < 80)  return 'citrus air';
  if (hue < 170) return 'verdant air';
  if (hue < 230) return 'open sky';
  if (hue < 265) return 'deep indigo';
  if (hue < 310) return 'violet dusk';
  return 'crimson edge';
}

function entityLabel(entities: ExtractedEntity[], fallback: string): string {
  if (entities.length === 0) return fallback;
  return entities.slice(0, 2).map(e => e.name).join(' × ') + ' sky';
}

// ── Resolver ───────────────────────────────────────────────────────

export const textResolver: Resolver = {
  id: 'text',

  score(input: ResolverInput): number {
    if (input.mode !== 'text') return 0;
    return (input.text?.trim().length ?? 0) > 0 ? 90 : 0;
  },

  async resolve(input: ResolverInput): Promise<GradientState> {
    const text  = input.text ?? '';
    const style: JapaneseStyle = input.styleOverride ?? 'vivid';
    const analysis = analyzeText(text);
    const hour  = pickHour(analysis);

    const trimmed   = text.trim();
    const wordCount = trimmed.split(/\s+/).length;
    const isColorWord = wordCount <= 3 && analysis.colorHints.length > 0 && analysis.entities.length === 0;

    // Separate seed for moment vs jitter so overriding moment doesn't shift the jitter phase
    const momentRng = makeRng(`${text}:m`);

    let momentName: string;
    let baseLabel: string;

    // Check Nippon Colors catalog first for precise color words
    const nipponColor = isColorWord ? lookupNipponColor(trimmed) : null;
    // Brand detection: runs on all inputs, not just color words
    const brand = detectBrand(text);

    if (nipponColor) {
      momentName = pickWeightedByHue(nipponColor.h, momentRng).name;
      baseLabel  = colorLabel(nipponColor.h, trimmed);
    } else if (isColorWord) {
      // Single color-word: pick archetype closest to that hue
      momentName = pickWeightedByHue(analysis.colorHints[0], momentRng).name;
      baseLabel  = colorLabel(analysis.colorHints[0], trimmed);
    } else if (brand && analysis.entities.length === 0 && !isColorWord) {
      // Brand-only or brand-led input: bias the moment toward the brand hue
      momentName = pickWeightedByHue(brand.h, momentRng).name;
      baseLabel  = brand.label + ' sky';
    } else if (analysis.entities.length > 0) {
      momentName = pickMomentForAnalysis(analysis, momentRng);
      baseLabel  = entityLabel(analysis.entities, analysis.label);
    } else {
      momentName = pickMomentForAnalysis(analysis, momentRng);
      baseLabel  = analysis.label;
    }

    // Generate archetype + jitter + style
    const sky = generateSkyGradient({ seed: text, moment: momentName, style });
    let hsl = sky.hslStops;

    // Apply color nudges on top of the archetype
    if (nipponColor) {
      // Precision nudge: pull toward the authentic Nippon Color (H + gentle S/L)
      hsl = nudgeToNipponColor(hsl, nipponColor.h, nipponColor.s, nipponColor.l);
    } else if (brand) {
      // Brand nudge: moderate hue pull toward the brand's primary color
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

    // Re-render only if we modified the HSL stops (pass style so sky positions apply)
    const final = hsl === sky.hslStops
      ? sky
      : renderFromHsl(hsl, momentName, style, sky.positions, sky.styleVariant);

    return {
      stops:     final.stops,
      css:       final.css,
      moment:    final.moment,
      style,
      timeOfDay: MOMENT_HOURS[final.moment] ?? hour,
      source:    `text:${trimmed.slice(0, 40)}…`,
      label:     baseLabel,
      word:      text.slice(0, 60),
    };
  },
};
