/**
 * Named Entity Color Registry
 *
 * When a brand or city name appears in pasted text, its characteristic hues
 * anchor the palette — emotion still controls atmosphere and lightness,
 * but the hue signature comes from the entity's visual identity.
 *
 * hues: 1–3 characteristic hues (0–360), in top→bottom palette order.
 *       -1 = achromatic (no hue shift applied)
 * luma: -1 (dark-biased brand) → 0 (neutral) → 1 (light-biased)
 * sat:  saturation delta applied to every stop (-20 to +20)
 */

export interface EntityEntry {
  type: 'brand' | 'city';
  hues: number[];
  luma: number;
  sat?: number;
}

export interface ExtractedEntity extends EntityEntry {
  name: string;
}

// ── Brand Color Registry ─────────────────────────────────────────────────────

export const BRANDS: Record<string, EntityEntry> = {
  // ── Tech / Software ──────────────────────────────────────────────
  omarchy:    { type:'brand', hues:[228, 220, 35],  luma:-0.8, sat: 5  },  // deep navy → amber
  apple:      { type:'brand', hues:[-1],            luma: 0.3, sat:-10 },  // silver / neutral
  google:     { type:'brand', hues:[215, 5, 50],    luma: 0.2, sat: 8  },  // primary colors
  microsoft:  { type:'brand', hues:[210],           luma: 0.1, sat: 5  },  // azure blue
  meta:       { type:'brand', hues:[215],           luma:-0.1, sat: 8  },  // Facebook blue
  facebook:   { type:'brand', hues:[215],           luma:-0.1, sat: 8  },
  twitter:    { type:'brand', hues:[200],           luma:-0.2, sat: 5  },
  x:          { type:'brand', hues:[-1],            luma:-0.7, sat:-15 },  // near-black
  github:     { type:'brand', hues:[228, 28],       luma:-0.6, sat: 0  },  // dark + orange
  vercel:     { type:'brand', hues:[-1],            luma:-0.8, sat:-20 },  // pure black/white
  notion:     { type:'brand', hues:[-1],            luma: 0.2, sat:-12 },  // warm cream
  linear:     { type:'brand', hues:[252],           luma:-0.4, sat: 8  },  // purple-indigo
  figma:      { type:'brand', hues:[285, 28],       luma:-0.1, sat:10  },  // purple + orange
  stripe:     { type:'brand', hues:[255, 200],      luma:-0.2, sat:12  },  // indigo + cyan
  supabase:   { type:'brand', hues:[142, 155],      luma:-0.5, sat:15  },  // emerald green
  tailwind:   { type:'brand', hues:[195, 210],      luma: 0.0, sat:12  },  // cyan-sky
  tailwindcss:{ type:'brand', hues:[195, 210],      luma: 0.0, sat:12  },
  spotify:    { type:'brand', hues:[142],           luma:-0.7, sat:20  },  // neon green on dark
  netflix:    { type:'brand', hues:[5],             luma:-0.8, sat:20  },  // red on black
  youtube:    { type:'brand', hues:[5],             luma:-0.6, sat:18  },  // red
  discord:    { type:'brand', hues:[248, 255],      luma:-0.3, sat:15  },  // blurple
  slack:      { type:'brand', hues:[270, 142],      luma:-0.1, sat:12  },  // purple + green
  airbnb:     { type:'brand', hues:[348, 340],      luma: 0.0, sat:12  },  // coral-red
  uber:       { type:'brand', hues:[-1],            luma:-0.7, sat:-18 },  // dark neutral
  linkedin:   { type:'brand', hues:[210],           luma:-0.1, sat:15  },  // professional blue
  pinterest:  { type:'brand', hues:[348],           luma: 0.0, sat:18  },  // crimson
  instagram:  { type:'brand', hues:[290, 28, 340],  luma: 0.0, sat:15  },  // purple → orange → pink
  tiktok:     { type:'brand', hues:[185, 348],      luma:-0.7, sat:20  },  // cyan + red on dark
  openai:     { type:'brand', hues:[162, 165],      luma:-0.3, sat: 5  },  // teal-grey
  anthropic:  { type:'brand', hues:[18, 28],        luma:-0.1, sat:10  },  // warm coral
  dropbox:    { type:'brand', hues:[215],           luma: 0.1, sat:15  },  // sky blue
  adobe:      { type:'brand', hues:[5],             luma:-0.5, sat:18  },  // red on dark
  // ── Hardware / Devices ───────────────────────────────────────────
  sony:       { type:'brand', hues:[-1],            luma:-0.4, sat:-10 },  // dark neutral
  samsung:    { type:'brand', hues:[210],           luma:-0.3, sat:10  },  // blue-dark
  // ── Apparel / Lifestyle ──────────────────────────────────────────
  nike:       { type:'brand', hues:[20, 28],        luma:-0.5, sat:15  },  // orange/warm dark
  adidas:     { type:'brand', hues:[-1],            luma:-0.4, sat:-15 },  // minimal dark
  supreme:    { type:'brand', hues:[5],             luma:-0.1, sat:22  },  // box logo red
  levis:      { type:'brand', hues:[245],           luma:-0.3, sat:18  },  // denim indigo
  gucci:      { type:'brand', hues:[48, 5],         luma:-0.6, sat: 8  },  // dark + gold
  hermes:     { type:'brand', hues:[22],            luma: 0.0, sat:18  },  // burnt orange
  chanel:     { type:'brand', hues:[-1],            luma:-0.6, sat:-20 },  // black + white
  louisvuitton:{ type:'brand', hues:[28, 48],       luma:-0.1, sat:10  }, // warm brown + gold
  // ── F&B ─────────────────────────────────────────────────────────
  starbucks:  { type:'brand', hues:[155],           luma:-0.3, sat:20  },  // forest green
  mcdonalds:  { type:'brand', hues:[52, 5],         luma: 0.1, sat:20  },  // yellow + red
  cocacola:   { type:'brand', hues:[5],             luma:-0.2, sat:22  },  // signature red
  pepsi:      { type:'brand', hues:[215, 5],        luma:-0.2, sat:18  },  // blue + red
  // ── Automotive ───────────────────────────────────────────────────
  ferrari:    { type:'brand', hues:[358],           luma:-0.1, sat:25  },  // Rosso Corsa
  lamborghini:{ type:'brand', hues:[52, 28],        luma:-0.5, sat:20  },  // yellow/orange dark
  tesla:      { type:'brand', hues:[5],             luma:-0.6, sat:15  },  // red on dark
  bmw:        { type:'brand', hues:[210, 5],        luma:-0.2, sat:12  },  // blue + white
  // ── Media ────────────────────────────────────────────────────────
  bbc:        { type:'brand', hues:[5],             luma:-0.1, sat:18  },  // BBC red
  cnn:        { type:'brand', hues:[5],             luma:-0.3, sat:18  },
  nyt:        { type:'brand', hues:[-1],            luma: 0.1, sat:-15 },  // newsprint grey
  nytimes:    { type:'brand', hues:[-1],            luma: 0.1, sat:-15 },
};

// ── City Aesthetic Registry ──────────────────────────────────────────────────

export const CITIES: Record<string, EntityEntry> = {
  // ── East Asia ────────────────────────────────────────────────────
  tokyo:       { type:'city', hues:[340, 248],  luma: 0.0, sat: -5  }, // sakura pink → quiet indigo
  kyoto:       { type:'city', hues:[130, 38],   luma:-0.1, sat: -8  }, // moss green + warm wood
  osaka:       { type:'city', hues:[25, 225],   luma: 0.0, sat:  8  }, // neon orange + bay navy
  hiroshima:   { type:'city', hues:[200, 48],   luma: 0.1, sat: -5  }, // peace memorial grey-blue + gold
  sapporo:     { type:'city', hues:[205, 248],  luma: 0.2, sat: -8  }, // snow-blue + cold indigo
  seoul:       { type:'city', hues:[205, 340],  luma: 0.2, sat: -5  }, // pale sky + cherry blossom
  busan:       { type:'city', hues:[200, 35],   luma: 0.1, sat:  5  }, // sea + golden seafood
  beijing:     { type:'city', hues:[5, 248],    luma:-0.2, sat:  5  }, // imperial red + deep sky
  shanghai:    { type:'city', hues:[185, 248],  luma:-0.3, sat: 15  }, // neon cyan + dark
  guangzhou:   { type:'city', hues:[28, 175],   luma:-0.1, sat: 10  }, // warm humid + dim sum gold
  hongkong:    { type:'city', hues:[185, 248],  luma:-0.4, sat: 18  }, // neon harbour + dark
  taipei:      { type:'city', hues:[180, 35],   luma:-0.1, sat: 10  }, // bubble tea teal + warm
  chengdu:     { type:'city', hues:[5, 130],    luma:-0.1, sat: 12  }, // Sichuan red + green tea
  // ── Southeast Asia ───────────────────────────────────────────────
  bangkok:     { type:'city', hues:[48, 125],   luma: 0.0, sat: 15  }, // golden temples + humid green
  siamreap:    { type:'city', hues:[42, 28],    luma: 0.0, sat: 10  }, // Angkor stone + warm jungle
  hanoi:       { type:'city', hues:[130, 28],   luma:-0.1, sat:  8  }, // old quarter green + warm
  hochiminhcity:{ type:'city', hues:[28, 175],  luma: 0.0, sat: 12  },
  saigon:      { type:'city', hues:[28, 175],   luma: 0.0, sat: 12  }, // warm + mekong teal
  singapore:   { type:'city', hues:[5, 200],    luma: 0.1, sat: 10  }, // red/white + harbour blue
  kualalumpur: { type:'city', hues:[5, 28],     luma:-0.1, sat: 12  }, // Petronas + warm
  manila:      { type:'city', hues:[28, 200],   luma: 0.1, sat: 10  }, // tropical warm + bay
  jakarta:     { type:'city', hues:[35, 175],   luma:-0.1, sat: 10  }, // warm ochre + humid teal
  bali:        { type:'city', hues:[182, 28],   luma: 0.2, sat: 18  }, // turquoise + sunset
  yogyakarta:  { type:'city', hues:[42, 130],   luma: 0.0, sat:  8  }, // batik earth + jungle
  // ── South Asia ───────────────────────────────────────────────────
  mumbai:      { type:'city', hues:[28, 45],    luma: 0.0, sat: 15  }, // Bollywood orange + gold
  delhi:       { type:'city', hues:[40, 195],   luma:-0.1, sat: 18  }, // saffron + peacock teal
  bangalore:   { type:'city', hues:[142, 210],  luma: 0.1, sat: 10  }, // garden city green + tech blue
  kolkata:     { type:'city', hues:[28, 5],     luma: 0.0, sat: 12  }, // warm + terracotta
  dhaka:       { type:'city', hues:[5, 130],    luma: 0.1, sat: 12  }, // green + red (flag)
  kathmandu:   { type:'city', hues:[28, 200],   luma:-0.1, sat:  8  }, // Himalayan earth + sky
  // ── Middle East & Central Asia ───────────────────────────────────
  dubai:       { type:'city', hues:[45, 210],   luma: 0.2, sat: 15  }, // gold + gulf blue
  abudhabi:    { type:'city', hues:[42, 215],   luma: 0.1, sat: 12  }, // sand + deep blue
  riyadh:      { type:'city', hues:[42, 35],    luma: 0.0, sat:  5  }, // desert sand
  istanbul:    { type:'city', hues:[188, 22],   luma:-0.1, sat: 15  }, // Bosphorus teal + Grand Bazaar warm
  tehran:      { type:'city', hues:[40, 248],   luma:-0.1, sat:  8  }, // saffron + Persian indigo
  jerusalem:   { type:'city', hues:[42, 28],    luma: 0.1, sat:  5  }, // golden stone
  beirut:      { type:'city', hues:[5, 200],    luma: 0.0, sat: 12  }, // cedar red + Med blue
  // ── Europe ───────────────────────────────────────────────────────
  london:      { type:'city', hues:[-1, 5],     luma:-0.1, sat:-15  }, // fog grey + brick red
  paris:       { type:'city', hues:[48, -1],    luma: 0.1, sat: -5  }, // gold + stone grey
  rome:        { type:'city', hues:[18, 45],    luma: 0.1, sat: 10  }, // terracotta + golden
  milan:       { type:'city', hues:[-1, 28],    luma: 0.0, sat: -8  }, // fashion grey + warm
  venice:      { type:'city', hues:[200, 42],   luma: 0.1, sat:  8  }, // canal teal + warm light
  florence:    { type:'city', hues:[28, 45],    luma: 0.2, sat:  8  }, // Renaissance warm ochre
  naples:      { type:'city', hues:[18, 200],   luma: 0.1, sat: 12  }, // terracotta + Med blue
  barcelona:   { type:'city', hues:[42, 205],   luma: 0.1, sat: 12  }, // Gaudí warm + sea blue
  madrid:      { type:'city', hues:[5, 42],     luma: 0.0, sat: 12  }, // Spanish red + warm
  lisbon:      { type:'city', hues:[215, 18],   luma: 0.1, sat: 12  }, // azulejo blue + terracotta
  porto:       { type:'city', hues:[18, 215],   luma: 0.0, sat: 15  }, // port wine red + Douro blue
  amsterdam:   { type:'city', hues:[348, 218],  luma: 0.0, sat: 10  }, // tulip red + canal
  brussels:    { type:'city', hues:[50, 5],     luma: 0.1, sat:  5  }, // gold + muted
  berlin:      { type:'city', hues:[-1, 355],   luma:-0.4, sat:-12  }, // concrete + muted red
  munich:      { type:'city', hues:[210, 5],    luma: 0.0, sat:  8  }, // Bavarian blue + white
  hamburg:     { type:'city', hues:[205, 5],    luma:-0.1, sat:  5  }, // harbour + red
  vienna:      { type:'city', hues:[50, -1],    luma: 0.1, sat:  0  }, // Habsburg gold + cream
  zurich:      { type:'city', hues:[5, -1],     luma: 0.1, sat: -8  }, // Swiss red + neutral clean
  geneva:      { type:'city', hues:[5, 215],    luma: 0.1, sat:  5  }, // Red Cross + lake blue
  stockholm:   { type:'city', hues:[210, 50],   luma: 0.0, sat:  5  }, // Nordic blue + gold
  oslo:        { type:'city', hues:[210, -1],   luma: 0.0, sat: -5  }, // fjord blue + grey
  copenhagen:  { type:'city', hues:[215, 5],    luma: 0.0, sat:  5  }, // Danish blue + red
  helsinki:    { type:'city', hues:[205, -1],   luma: 0.0, sat: -8  }, // Arctic grey-blue
  athens:      { type:'city', hues:[210, -1],   luma: 0.3, sat:  5  }, // brilliant blue + white
  santorini:   { type:'city', hues:[215, -1],   luma: 0.3, sat:  8  }, // deep blue + white
  prague:      { type:'city', hues:[18, 130],   luma:-0.1, sat:  5  }, // Bohemian russet + forest
  warsaw:      { type:'city', hues:[5, -1],     luma:-0.1, sat:  5  }, // Polish red + grey
  budapest:    { type:'city', hues:[28, 215],   luma: 0.0, sat:  8  }, // Danube + warm stone
  bucharest:   { type:'city', hues:[5, 28],     luma:-0.1, sat:  5  }, // Romanian warm
  moscow:      { type:'city', hues:[5, 45],     luma:-0.4, sat: 10  }, // red + dark gold
  stpetersburg:{ type:'city', hues:[45, 215],   luma: 0.0, sat:  8  }, // White Nights gold + blue
  // ── Africa ───────────────────────────────────────────────────────
  cairo:       { type:'city', hues:[42, 45],    luma: 0.1, sat:  5  }, // warm desert sand
  alexandria:  { type:'city', hues:[205, 42],   luma: 0.1, sat:  8  }, // Med blue + sand
  tunis:       { type:'city', hues:[5, 205],    luma: 0.1, sat: 10  }, // medina red + blue
  casablanca:  { type:'city', hues:[215, -1],   luma: 0.1, sat:  5  }, // white + Atlantic blue
  marrakech:   { type:'city', hues:[15, 40],    luma: 0.0, sat: 18  }, // terracotta + saffron
  nairobi:     { type:'city', hues:[18, 42],    luma: 0.0, sat: 12  }, // savanna red + gold
  addisababa:  { type:'city', hues:[125, 5],    luma: 0.0, sat: 10  }, // Ethiopian green + red
  accra:       { type:'city', hues:[50, 28],    luma: 0.1, sat: 15  }, // Gold Coast warm + bright
  lagos:       { type:'city', hues:[28, 130],   luma: 0.0, sat: 15  }, // warm orange + green
  abuja:       { type:'city', hues:[5, 130],    luma: 0.0, sat: 12  }, // Nigerian green + red
  dakar:       { type:'city', hues:[28, 200],   luma: 0.1, sat: 12  }, // Atlantic + warm
  capetown:    { type:'city', hues:[340, 205],  luma: 0.0, sat: 12  }, // Cape wine + sea blue
  johannesburg:{ type:'city', hues:[42, 5],     luma:-0.2, sat: 10  }, // gold + deep
  // ── Americas ─────────────────────────────────────────────────────
  newyork:     { type:'city', hues:[50, -1],    luma:-0.4, sat:  8  }, // yellow cab + steel dark
  losangeles:  { type:'city', hues:[40, 28],    luma: 0.2, sat: 12  }, // golden + sunset warm
  sanfrancisco:{ type:'city', hues:[28, -1],    luma: 0.0, sat: -5  }, // golden gate + fog
  chicago:     { type:'city', hues:[-1, 210],   luma:-0.3, sat: -5  }, // windy city grey + lake blue
  miami:       { type:'city', hues:[182, 340],  luma: 0.2, sat: 18  }, // teal + flamingo pink
  neworleans:  { type:'city', hues:[270, 48],   luma: 0.0, sat: 18  }, // jazz purple + gold
  lasvegas:    { type:'city', hues:[50, 5],     luma:-0.3, sat: 22  }, // neon gold + red on dark
  seattle:     { type:'city', hues:[210, 130],  luma:-0.1, sat: -8  }, // Pacific rain + evergreen
  portland:    { type:'city', hues:[130, 28],   luma: 0.0, sat: -5  }, // forest + warm
  austin:      { type:'city', hues:[38, 5],     luma: 0.0, sat: 12  }, // Texas warm + burnt orange
  toronto:     { type:'city', hues:[5, -1],     luma: 0.0, sat:  5  }, // Canadian red + neutral
  montreal:    { type:'city', hues:[5, 210],    luma: 0.0, sat:  8  }, // French + Nordic
  vancouver:   { type:'city', hues:[205, 130],  luma: 0.1, sat:  5  }, // Pacific blue + mountain green
  mexicocity:  { type:'city', hues:[18, 130],   luma: 0.0, sat: 15  }, // Mexico terracotta + green
  bogota:      { type:'city', hues:[50, 5],     luma:-0.1, sat: 10  }, // Colombian gold + red
  lima:        { type:'city', hues:[28, 210],   luma: 0.0, sat:  8  }, // Peruvian warm + Pacific grey
  santiago:    { type:'city', hues:[210, 42],   luma: 0.0, sat:  5  }, // Andes blue + earth
  buenosaires: { type:'city', hues:[210, -1],   luma: 0.0, sat:  8  }, // Argentine blue + neutral
  riodejaneiro:{ type:'city', hues:[130, 45],   luma: 0.2, sat: 18  }, // tropical green + carnival gold
  saopaulo:    { type:'city', hues:[130, 28],   luma:-0.2, sat: 10  }, // Paulista grey + warm
  // ── Oceania ──────────────────────────────────────────────────────
  sydney:      { type:'city', hues:[205, 45],   luma: 0.2, sat: 12  }, // harbour blue + golden
  melbourne:   { type:'city', hues:[270, -1],   luma:-0.1, sat: -5  }, // artistic purple + grey
  brisbane:    { type:'city', hues:[48, 200],   luma: 0.2, sat: 12  }, // Queensland sunny + blue
  auckland:    { type:'city', hues:[205, 130],  luma: 0.1, sat:  8  }, // Pacific + green
  wellington:  { type:'city', hues:[210, -1],   luma: 0.0, sat: -5  }, // Cook Strait + grey
};

// ── Entity Extractor ─────────────────────────────────────────────────────────

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z]/g, '');
}

export function extractEntities(text: string): ExtractedEntity[] {
  const found: ExtractedEntity[] = [];
  const seen = new Set<string>();

  // Extract capitalized word sequences from raw text (proper nouns)
  const candidates: string[] = [];

  // Multi-word candidates (2–3 consecutive capitalized words)
  const multiWord = text.matchAll(/\b([A-Z][a-zA-Z]{1,})(?:\s+([A-Z][a-zA-Z]{1,}))?(?:\s+([A-Z][a-zA-Z]{1,}))?\b/g);
  for (const m of multiWord) {
    // Trigram first, then bigram, then unigram — longest match wins
    if (m[3]) candidates.push(m[1] + m[2] + m[3]);       // 3-word joined
    if (m[2]) candidates.push(m[1] + m[2]);               // 2-word joined
    candidates.push(m[1]);                                  // single word
  }

  // Also match all-caps abbreviations (e.g. OS, US, AI, API)
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

  // Deduplicate — if both "newyork" and "new" + "york" match, keep the longer
  return found;
}
