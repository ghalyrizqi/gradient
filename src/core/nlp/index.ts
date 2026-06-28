import {
  LEXICON, EMOTION_BITS, DOMAIN, COLOR_HUES, TIME_WORDS, STOPWORDS,
} from './lexicon.ts';
import { extractEntities, type ExtractedEntity } from './entities.ts';
export type { ExtractedEntity };

export interface EmotionScores {
  anger: number; fear: number; anticipation: number; trust: number;
  surprise: number; sadness: number; joy: number; disgust: number;
  positive: number; negative: number;
}

export interface DomainScores {
  tech: number; nature: number; urban: number; personal: number;
}

export interface TextAnalysis {
  emotions: EmotionScores;
  valence: number;        // -1 (very negative) … +1 (very positive)
  arousal: number;        // 0 (calm) … 1 (intense)
  domain: DomainScores;
  dominantDomain: keyof DomainScores | null;
  colorHints: number[];   // hue values 0..360 from named colors in text
  lumaHint: number;       // -1 dark bias, 0 neutral, +1 light bias
  timeOfDay: number | null;
  entities: ExtractedEntity[];
  label: string;
  topWords: string[];     // highest-scoring content words, for debugging
}

// ── Tokenizer ────────────────────────────────────────────────────
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/['']/g, '')          // smart quotes → nothing (keeps contractions joinable)
    .replace(/[^a-z0-9\s-]/g, ' ') // strip punctuation except hyphen
    .split(/\s+/)
    .filter(t => t.length > 1 && !STOPWORDS.has(t));
}

// ── Lightweight suffix stemmer ───────────────────────────────────
// Tries common English derivational suffixes, returns the stem if it
// exists in the lexicon — otherwise returns the word unchanged.
const SUFFIXES = [
  'fulness','fulness','lessly','lessly','ations','ments',
  'iness','ously','ingly','ation','ness','ment','less',
  'ful','ous','ive','ize','ise','ing','ely','ity','ied',
  'ers','est','ing','ful','al','ed','er','ly','es','s',
] as const;

export function stem(word: string): string {
  // Direct hit
  if (LEXICON[word] !== undefined) return word;

  // Try stripping suffixes longest-first
  for (const sfx of SUFFIXES) {
    if (word.length > sfx.length + 2 && word.endsWith(sfx)) {
      const root = word.slice(0, -sfx.length);
      if (LEXICON[root] !== undefined) return root;
      // One level of e-restoration (e.g. "loving" → "lov" → check "love")
      if (LEXICON[root + 'e'] !== undefined) return root + 'e';
    }
  }
  return word;
}

// ── Term frequency with log damping ─────────────────────────────
function buildFrequency(tokens: string[]): Map<string, number> {
  const freq = new Map<string, number>();
  for (const t of tokens) {
    const s = stem(t);
    freq.set(s, (freq.get(s) ?? 0) + 1);
  }
  return freq;
}

// ── IDF approximation via a small inverse-frequency table ────────
// Words that are very common across English get downweighted.
// We approximate this with a hardcoded penalty list.
const OVERUSED: Record<string, number> = {
  good: 0.6, great: 0.7, bad: 0.6, like: 0.5, new: 0.5,
  time: 0.5, day: 0.5, feel: 0.6, look: 0.5, way: 0.4,
  make: 0.4, work: 0.6, use: 0.5, come: 0.4, think: 0.6,
};

// ── Core emotion scorer ───────────────────────────────────────────
export function analyzeText(text: string): TextAnalysis {
  const tokens = tokenize(text);
  if (tokens.length === 0) return emptyAnalysis();

  const freq = buildFrequency(tokens);
  const emotions: EmotionScores = {
    anger: 0, fear: 0, anticipation: 0, trust: 0,
    surprise: 0, sadness: 0, joy: 0, disgust: 0,
    positive: 0, negative: 0,
  };

  // Domain raw hit counts
  const domainHits = { tech: 0, nature: 0, urban: 0, personal: 0 };

  // Color hints
  const colorHues: number[] = [];
  let lumaHint = 0;

  // Time of day
  let timeOfDay: number | null = null;

  // Scored tokens for debugging
  const wordScores: { w: string; score: number }[] = [];

  for (const [word, count] of freq) {
    // TF weight: log(1+count) caps the effect of repeated words
    const tf = Math.log1p(count);
    // IDF approximation: penalise very common words
    const idf = OVERUSED[word] ?? 1.0;
    const weight = tf * idf;

    // Emotion scoring
    const mask = LEXICON[word] ?? 0;
    if (mask !== 0) {
      let emotionScore = 0;
      const EMOTION_KEYS = [
        'anger','fear','anticipation','trust','surprise',
        'sadness','joy','disgust','positive','negative',
      ] as const;
      EMOTION_BITS.forEach((bit, i) => {
        if (mask & bit) {
          (emotions as unknown as Record<string, number>)[EMOTION_KEYS[i]] += weight;
          emotionScore += weight;
        }
      });
      wordScores.push({ w: word, score: emotionScore });
    }

    // Domain scoring — raw keyword presence, weighted by TF
    for (const [domain, wordSet] of Object.entries(DOMAIN) as [keyof DomainScores, Set<string>][]) {
      if (wordSet.has(word)) domainHits[domain] += tf;
    }

    // Color hints
    if (COLOR_HUES[word] !== undefined) {
      const hue = COLOR_HUES[word];
      if (hue >= 0) colorHues.push(hue);
      else if (hue === -2) lumaHint -= 0.3 * tf;   // "dark"
      else if (hue === -3) lumaHint += 0.3 * tf;   // "light"
    }

    // Time references (take the earliest match)
    if (TIME_WORDS[word] !== undefined && timeOfDay === null) {
      timeOfDay = TIME_WORDS[word];
    }
  }

  // Normalise emotion scores by sqrt(token count) — avoids long-text inflation
  const norm = Math.sqrt(Math.max(tokens.length, 1));
  for (const key of Object.keys(emotions) as (keyof EmotionScores)[]) {
    emotions[key] = Math.min(1, emotions[key] / norm);
  }

  // Normalise domain scores
  const totalDomain = Object.values(domainHits).reduce((a, b) => a + b, 0) || 1;
  const domain: DomainScores = {
    tech:     domainHits.tech     / totalDomain,
    nature:   domainHits.nature   / totalDomain,
    urban:    domainHits.urban    / totalDomain,
    personal: domainHits.personal / totalDomain,
  };

  // Dominant domain (must exceed 30% share to count)
  const dominantDomain = (
    (Object.entries(domain) as [keyof DomainScores, number][])
      .sort(([,a],[,b]) => b - a)
      .find(([, v]) => v > 0.3) ?? [null]
  )[0] as keyof DomainScores | null;

  // Valence: positive − negative, clamped
  const valence = Math.max(-1, Math.min(1, emotions.positive - emotions.negative));

  // Arousal: high-activation emotions (anger, fear, joy, surprise) vs low-activation (sadness, trust)
  const arousal = Math.min(1,
    (emotions.anger + emotions.fear + emotions.joy * 0.7 + emotions.surprise) -
    (emotions.sadness * 0.3 + emotions.trust * 0.2),
  );

  // Top words by score (for label / debugging)
  const topWords = wordScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(x => x.w);

  const label = buildLabel(emotions, domain, dominantDomain, valence);
  const entities = extractEntities(text);

  return {
    emotions, valence, arousal, domain, dominantDomain,
    colorHints: colorHues, lumaHint: Math.max(-1, Math.min(1, lumaHint)),
    timeOfDay, entities, label, topWords,
  };
}

// ── Label generator ──────────────────────────────────────────────
function buildLabel(
  e: EmotionScores,
  domain: DomainScores,
  dom: keyof DomainScores | null,
  valence: number,
): string {
  const domainLabel: Record<keyof DomainScores, string> = {
    tech:     'a digital dusk',
    nature:   'open air',
    urban:    'city light',
    personal: 'a quiet morning',
  };
  if (dom && domain[dom] > 0.4) return domainLabel[dom];

  // Emotion → sky mood phrase (atmosphere over adjective)
  const emotionPhrases: [number, string][] = [
    [e.joy,          'luminous air'],
    [e.sadness,      'still indigo'],
    [e.anger,        'burning edge'],
    [e.fear,         'an unsettled sky'],
    [e.anticipation, 'before daybreak'],
    [e.trust,        'open horizon'],
    [e.surprise,     'an unexpected sky'],
    [e.disgust,      'heavy cloud'],
  ];
  const top = emotionPhrases.sort(([a],[b]) => b - a)[0];
  if (top[0] > 0.05) return top[1];

  return valence > 0.1 ? 'a warm sky' : valence < -0.1 ? 'weight of dusk' : 'a still sky';
}

function emptyAnalysis(): TextAnalysis {
  return {
    emotions: { anger:0,fear:0,anticipation:0,trust:0,surprise:0,sadness:0,joy:0,disgust:0,positive:0,negative:0 },
    valence: 0, arousal: 0,
    domain: { tech:0, nature:0, urban:0, personal:0 },
    dominantDomain: null, colorHints: [], lumaHint: 0,
    timeOfDay: null, entities: [], label: 'a still sky', topWords: [],
  };
}
