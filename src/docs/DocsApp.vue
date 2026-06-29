<!-- Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V4 -->
<!-- Hallmark · macrostructure: Long Document · tone: atmospheric glass
     · genre: atmospheric · anchor hue: sora-blue oklch(0.76 0.10 220)
     · theme: custom (DM Mono + DM Sans · OKLCH paper-dark system)
     Hero = live gradient canvas from seed endpoint · no re-drawn chrome
     Quick Start → Endpoints → Schema → Integration → Footer
-->
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

interface Param {
  name: string;
  type: string;
  default: string;
  note: string;
}

interface ApiResult {
  css?: string;
  moment?: string;
  label?: string;
  [key: string]: unknown;
}

interface Endpoint {
  id: string;
  path: string;
  tagline: string;
  description: string;
  params: Param[];
  example: string;
  result: ApiResult | null;
  loading: boolean;
}

const base = computed(() => window.location.origin);
const heroGradientCss = ref(
  'linear-gradient(to bottom in oklab, hsl(215 60% 52%) 0%, hsl(30 72% 66%) 80%, hsl(355 48% 76%) 100%)'
);
const copiedKey = ref<string | null>(null);

const vividCss = ref(
  'linear-gradient(to bottom in oklab, hsl(215 70% 42%) 0%, hsl(28 72% 58%) 68%, hsl(348 48% 68%) 100%)'
);
const veilCss = ref(
  'linear-gradient(to bottom in oklab, hsl(215 30% 52%) 0%, hsl(28 28% 64%) 68%, hsl(348 18% 70%) 100%)'
);

const coreMoments = [
  'first light', 'dawn', 'clear morning', 'hazy morning', 'midday',
  'golden hour', 'sunset', 'afterglow', 'blue hour', 'overcast',
] as const;
const nuevoMoments = ['city-pop dawn', 'summer haze', 'late afternoon', 'pastel dusk', 'sakura haze'] as const;
const shoMoments = ['smog morning', 'rain grey', 'humid haze', 'deep dusk', 'midnight'] as const;
const nipponMoments = [
  'asagi dawn', 'fuji eve', 'toki blush', 'gunjou deep',
  'yamabuki noon', 'enji dusk', 'rikyunezumi', 'ainezumi sky',
] as const;

const endpoints = ref<Endpoint[]>([
  {
    id: 'text',
    path: '/api/gradient/text',
    tagline: 'NLP-driven gradient from natural language',
    description:
      'Parses the prompt for emotions, time-of-day cues, Japanese color words (sakura, kon, fuji…), and brand names (Python, Docker, Omarchy, Tokyo Night…). Each signal nudges the sky archetype and HSL stops.',
    params: [
      { name: 'q',     type: 'string',        default: '—',     note: 'Text prompt. Max 500 chars. Also accepts text=.' },
      { name: 'style', type: 'vivid | veil',  default: 'vivid', note: 'vivid = saturated skies · veil = misty, desaturated' },
    ],
    example: 'q=Omarchy+OS+Review+Two+Months+In&style=vivid',
    result: null,
    loading: false,
  },
  {
    id: 'color',
    path: '/api/gradient/color',
    tagline: 'Gradient anchored to a hex color',
    description:
      'The engine biases the sky archetype toward the given hue, anchors the zenith stop to the exact color, and applies the chosen style treatment to the remaining stops.',
    params: [
      { name: 'color', type: 'hex',           default: '#3a6ea5', note: 'Seed color. URL-encode the #.' },
      { name: 'style', type: 'vivid | veil',  default: 'vivid',   note: 'Color treatment.' },
      { name: 'seed',  type: 'integer',       default: '0',       note: 'Shuffle seed — same color, different archetype.' },
    ],
    example: 'color=%233a6ea5&style=vivid',
    result: null,
    loading: false,
  },
  {
    id: 'seed',
    path: '/api/gradient/seed',
    tagline: 'Deterministic gradient from any opaque string',
    description:
      'Same seed always returns the same gradient — useful for stable per-entity visuals (project slugs, user IDs, article titles). Internally routes through the same NLP engine so brand signals still fire.',
    params: [
      { name: 'seed',  type: 'string',        default: '—',     note: 'Any string identifier. Max 200 chars.' },
      { name: 'style', type: 'vivid | veil',  default: 'vivid', note: 'Color treatment.' },
    ],
    example: 'seed=small-window&style=vivid',
    result: null,
    loading: false,
  },
]);

const JS_EXAMPLE =
`// Fetch and apply a sky gradient
const res = await fetch('/api/gradient/text?q=tokyo+night');
const { css, label, stops } = await res.json();

// Apply the gradient directly
document.body.style.background = css;
console.log(label); // → "Tokyo Night sky"

// Or use individual stops for a custom canvas/SVG render
stops.forEach(({ pos, color }) => {
  // pos: 0–1 (top → bottom), color: "hsl(H S% L%)"
});`;

const SCHEMA =
`interface GradientStop {
  pos:   number;   // 0–1, top→bottom
  color: string;   // "hsl(H S% L%)"
}

interface GradientResponse {
  stops:       GradientStop[];  // 3–11 stops
  css:         string;          // ready-to-use linear-gradient(…)
  moment:      string;          // sky archetype name
  style:       "vivid" | "veil";
  timeOfDay:   number;          // 0–23
  label:       string;          // human-readable name  e.g. "Tokyo Night sky"
  source:      string;          // resolver trace
  word?:       string;          // echo of input text (text/seed endpoints)
  paletteHex?: string;          // zenith hex (color endpoint only)
}`;

async function tryEndpoint(ep: Endpoint) {
  ep.loading = true;
  ep.result = null;
  try {
    const res = await fetch(`${base.value}${ep.path}?${ep.example}`);
    ep.result = (await res.json()) as ApiResult;
  } catch (e) {
    ep.result = { error: String(e) };
  } finally {
    ep.loading = false;
  }
}

function curlFor(ep: Endpoint): string {
  return `curl "${base.value}${ep.path}?${ep.example}"`;
}

function gradientCss(ep: Endpoint): string | null {
  return ep.result?.css ?? null;
}

async function copyText(text: string, key: string) {
  try {
    await navigator.clipboard.writeText(text);
    copiedKey.value = key;
    setTimeout(() => { copiedKey.value = null; }, 1500);
  } catch {}
}

onMounted(async () => {
  try {
    const res = await fetch(`${window.location.origin}/api/gradient/seed?seed=small-window-docs`);
    if (res.ok) {
      const data = (await res.json()) as { css?: string };
      if (data.css) heroGradientCss.value = data.css;
    }
  } catch {}

  try {
    const [vividRes, veilRes] = await Promise.all([
      fetch(`${window.location.origin}/api/gradient/seed?seed=style-compare-a&style=vivid`),
      fetch(`${window.location.origin}/api/gradient/seed?seed=style-compare-a&style=veil`),
    ]);
    if (vividRes.ok) { const d = (await vividRes.json()) as { css?: string }; if (d.css) vividCss.value = d.css; }
    if (veilRes.ok)  { const d = (await veilRes.json()) as { css?: string }; if (d.css) veilCss.value = d.css; }
  } catch {}
});
</script>

<template>
  <div class="docs">

    <!-- ── Header ────────────────────────────────────────────────── -->
    <header class="docs-header">
      <div class="docs-header-brand">
        <span class="docs-wordmark">Small Window</span>
        <span class="docs-sep">·</span>
        <span class="docs-wordmark-sub">API</span>
      </div>
      <nav class="docs-header-nav" aria-label="Docs sections">
        <a href="#quick-start" class="docs-nav-link">Quick Start</a>
        <a href="#endpoints"   class="docs-nav-link">Endpoints</a>
        <a href="#schema"      class="docs-nav-link">Schema</a>
        <a href="#styles"      class="docs-nav-link">Styles</a>
        <a href="#catalog"     class="docs-nav-link">Catalog</a>
        <a href="/"            class="docs-back">← Studio</a>
      </nav>
    </header>

    <!-- ── Hero — live gradient from seed endpoint ──────────────── -->
    <section class="docs-hero" aria-label="Introduction">
      <div class="docs-hero-bg" :style="{ background: heroGradientCss }" />
      <div class="docs-hero-overlay">
        <div class="docs-hero-content">
          <h1 class="docs-hero-title">Sky gradient<br>as an API.</h1>
          <p class="docs-hero-sub">Three endpoints. Color, text, seed.</p>
          <div class="docs-base-chip">
            <span class="base-chip-label">Base URL</span>
            <code class="base-chip-url">{{ base }}</code>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Main content ──────────────────────────────────────────── -->
    <div class="docs-content">

      <!-- Quick Start ─────────────────────────────────────────── -->
      <section id="quick-start" class="docs-section">
        <h2 class="section-heading">Quick Start</h2>
        <p class="section-desc">One curl command per endpoint. All return JSON with a ready-to-use <code class="inline-code">css</code> property.</p>
        <div class="quick-grid">
          <div v-for="ep in endpoints" :key="ep.id + '-qs'" class="quick-card">
            <div class="quick-card-head">
              <span class="ep-method-badge">GET</span>
              <code class="quick-card-path">{{ ep.path }}</code>
            </div>
            <p class="quick-card-tagline">{{ ep.tagline }}</p>
            <div class="code-wrap">
              <pre class="code-block">{{ curlFor(ep) }}</pre>
              <button
                class="copy-btn"
                :class="{ 'copy-btn--done': copiedKey === ep.id + '-qs' }"
                :aria-label="'Copy curl for ' + ep.id"
                @click="copyText(curlFor(ep), ep.id + '-qs')"
              >{{ copiedKey === ep.id + '-qs' ? '✓' : 'copy' }}</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Endpoints ───────────────────────────────────────────── -->
      <section id="endpoints" class="docs-section">
        <h2 class="section-heading">Endpoints</h2>
        <div class="ep-list">
          <article v-for="ep in endpoints" :key="ep.id" class="ep-card">

            <div class="ep-card-head">
              <span class="ep-method-badge">GET</span>
              <code class="ep-card-path">{{ ep.path }}</code>
            </div>

            <p class="ep-tagline">{{ ep.tagline }}</p>
            <p class="ep-desc">{{ ep.description }}</p>

            <!-- Params table -->
            <div class="ep-params">
              <div class="table-label">Parameters</div>
              <table class="param-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th class="hide-sm">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="p in ep.params" :key="p.name">
                    <td><code class="param-name">{{ p.name }}</code></td>
                    <td><span class="param-type">{{ p.type }}</span></td>
                    <td><code class="param-default">{{ p.default }}</code></td>
                    <td class="param-note hide-sm">{{ p.note }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- curl example -->
            <div class="ep-curl">
              <div class="table-label">curl</div>
              <div class="code-wrap">
                <pre class="code-block">{{ curlFor(ep) }}</pre>
                <button
                  class="copy-btn"
                  :class="{ 'copy-btn--done': copiedKey === ep.id + '-curl' }"
                  :aria-label="'Copy curl command for ' + ep.id"
                  @click="copyText(curlFor(ep), ep.id + '-curl')"
                >{{ copiedKey === ep.id + '-curl' ? '✓' : 'copy' }}</button>
              </div>
            </div>

            <!-- Try it live -->
            <div class="ep-try">
              <button
                class="try-btn"
                :class="{ 'try-btn--loading': ep.loading }"
                @click="tryEndpoint(ep)"
              >{{ ep.loading ? 'loading…' : 'Try it →' }}</button>

              <div v-if="ep.result" class="try-result">
                <div
                  v-if="gradientCss(ep)"
                  class="result-swatch"
                  :style="{ background: gradientCss(ep)! }"
                >
                  <span v-if="ep.result.label" class="result-label">
                    {{ ep.result.moment }} · {{ ep.result.label }}
                  </span>
                </div>
                <div class="code-wrap">
                  <pre class="code-block result-json">{{ JSON.stringify(ep.result, null, 2) }}</pre>
                </div>
              </div>
            </div>

          </article>
        </div>
      </section>

      <!-- Response Schema ─────────────────────────────────────── -->
      <section id="schema" class="docs-section">
        <h2 class="section-heading">Response schema</h2>
        <div class="code-wrap">
          <pre class="code-block">{{ SCHEMA }}</pre>
          <button
            class="copy-btn"
            :class="{ 'copy-btn--done': copiedKey === 'schema' }"
            aria-label="Copy schema"
            @click="copyText(SCHEMA, 'schema')"
          >{{ copiedKey === 'schema' ? '✓' : 'copy' }}</button>
        </div>
      </section>

      <!-- Styles ─────────────────────────────────────────────── -->
      <section id="styles" class="docs-section">
        <h2 class="section-heading">Styles</h2>
        <p class="section-desc">
          Every endpoint accepts a <code class="inline-code">style</code> parameter.
          Two treatments are available — same seed, same sky archetype, different rendering.
        </p>

        <div class="style-grid">
          <div class="style-card">
            <div class="style-swatch" :style="{ background: vividCss }" role="img" aria-label="vivid style preview">
              <span class="style-badge">vivid</span>
            </div>
            <h3 class="style-name">vivid</h3>
            <p class="style-desc-text">Saturated, painterly sky. The zenith stop gains up to +15 saturation points; stop positions compress toward the horizon — 85% of the gradient carries the warm-to-cool arc. Default treatment.</p>
            <pre class="style-code">?style=vivid</pre>
          </div>

          <div class="style-card">
            <div class="style-swatch" :style="{ background: veilCss }" role="img" aria-label="veil style preview">
              <span class="style-badge">veil</span>
            </div>
            <h3 class="style-name">veil</h3>
            <p class="style-desc-text">Misty, desaturated. Every stop loses 30–50 saturation points — the exact cut is derived from the seed, so it's deterministic. Reads like fog, gauze, or Sho Shibuya's newspaper surfaces.</p>
            <pre class="style-code">?style=veil</pre>
          </div>
        </div>
      </section>

      <!-- Catalog ─────────────────────────────────────────────── -->
      <section id="catalog" class="docs-section">
        <h2 class="section-heading">Moment catalog</h2>
        <p class="section-desc">
          The engine selects a sky archetype — a "moment" — for each request.
          28 moments are organized in four groups. The response always names the one picked in the <code class="inline-code">moment</code> field.
        </p>

        <div class="catalog-grid">
          <div class="catalog-group">
            <div class="catalog-group-head">
              <span class="catalog-tag catalog-tag--core">Core sky</span>
              <span class="catalog-count">10 moments</span>
            </div>
            <p class="catalog-group-desc">The full arc of a day — pre-dawn blue through golden hour to overcast grey. Weighted 2–3× so everyday requests draw from the full sky range.</p>
            <ul class="moment-list" role="list">
              <li v-for="m in coreMoments" :key="m" class="moment-item">{{ m }}</li>
            </ul>
          </div>

          <div class="catalog-group">
            <div class="catalog-group-head">
              <span class="catalog-tag catalog-tag--nuevo">Nuevo.tokyo</span>
              <span class="catalog-count">5 moments</span>
            </div>
            <p class="catalog-group-desc">Soft pastels and city-pop nostalgia — desaturated peach, muted lavender, faded coral. The hazy sky above a summer city seen through a train window.</p>
            <ul class="moment-list" role="list">
              <li v-for="m in nuevoMoments" :key="m" class="moment-item">{{ m }}</li>
            </ul>
          </div>

          <div class="catalog-group">
            <div class="catalog-group-head">
              <span class="catalog-tag catalog-tag--sho">Sho Shibuya</span>
              <span class="catalog-count">5 moments</span>
            </div>
            <p class="catalog-group-desc">Moody, restrained Tokyo. Smog-filtered mornings, rain-grey overcast, wet midnight streets. Sky reduced to its emotional minimum — pigment without saturation.</p>
            <ul class="moment-list" role="list">
              <li v-for="m in shoMoments" :key="m" class="moment-item">{{ m }}</li>
            </ul>
          </div>

          <div class="catalog-group">
            <div class="catalog-group-head">
              <span class="catalog-tag catalog-tag--nippon">Nippon Colors</span>
              <span class="catalog-count">8 moments</span>
            </div>
            <p class="catalog-group-desc">Named after traditional Japanese pigments — asagi (浅葱), fuji (藤), gunjou (群青). Precise, evocative hue vocabulary drawn from the classical color canon.</p>
            <ul class="moment-list" role="list">
              <li v-for="m in nipponMoments" :key="m" class="moment-item">{{ m }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Integration ─────────────────────────────────────────── -->
      <section id="integration" class="docs-section">
        <h2 class="section-heading">Use in your project</h2>
        <p class="section-desc">
          The <code class="inline-code">css</code> field is a ready-to-use
          <code class="inline-code">linear-gradient()</code> string.
          Apply it directly to any element's background.
        </p>
        <div class="code-wrap">
          <pre class="code-block">{{ JS_EXAMPLE }}</pre>
          <button
            class="copy-btn"
            :class="{ 'copy-btn--done': copiedKey === 'integration' }"
            aria-label="Copy integration example"
            @click="copyText(JS_EXAMPLE, 'integration')"
          >{{ copiedKey === 'integration' ? '✓' : 'copy' }}</button>
        </div>
        <div class="integration-note">
          The <code class="inline-code">stops</code> array gives you full control over the render —
          each stop carries <code class="inline-code">pos</code> (0–1) and an
          <code class="inline-code">hsl()</code> color string for canvas, SVG, WebGL, or
          three.js shaders.
        </div>
      </section>

    </div>

    <!-- ── Footer ────────────────────────────────────────────────── -->
    <footer class="docs-footer">
      <div class="docs-footer-inner">
        <span class="footer-brand">Small Window</span>
        <span class="footer-sep">·</span>
        <span class="footer-tagline">Sky gradient engine · NLP brand detection · Nippon color catalog</span>
        <a href="/" class="footer-back">← Studio</a>
      </div>
    </footer>

  </div>
</template>

<style scoped>
/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V4 */
/* Hallmark · macrostructure: Long Document · genre: atmospheric
 * · anchor hue: sora-blue · paper-band: dark · display-style: mono
 */

/* ── Reset ────────────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ── Page ─────────────────────────────────────────────────────── */
.docs {
  min-height: 100vh;
  background:
    radial-gradient(ellipse 65% 55% at 8% 90%, oklch(0.17 0.042 250 / 0.48) 0%, transparent 52%),
    radial-gradient(ellipse 50% 44% at 88% 12%, oklch(0.15 0.052 262 / 0.36) 0%, transparent 48%),
    var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-ui);
  font-size: var(--text-base);
  line-height: 1.6;
}

/* ── Header ───────────────────────────────────────────────────── */
.docs-header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s4);
  padding: var(--s3) var(--s6);
  background: oklch(0.11 0.010 250 / 0.82);
  border-bottom: 1px solid oklch(1 0 0 / 0.07);
  backdrop-filter: blur(36px) saturate(175%);
}

.docs-header-brand {
  display: flex;
  align-items: center;
  gap: var(--s2);
  flex-shrink: 0;
}

.docs-wordmark {
  font-size: var(--text-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-ink-2);
}

.docs-sep { color: var(--color-ink-4); }

.docs-wordmark-sub {
  font-size: var(--text-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-ink-3);
}

.docs-header-nav {
  display: flex;
  align-items: center;
  gap: var(--s4);
}

.docs-nav-link {
  font-size: var(--text-xs);
  letter-spacing: 0.04em;
  text-decoration: none;
  color: var(--color-ink-3);
  transition: color 120ms;
}
.docs-nav-link:hover { color: var(--color-ink); }

.docs-back {
  font-size: var(--text-xs);
  letter-spacing: 0.04em;
  text-decoration: none;
  color: var(--color-ink-3);
  padding: var(--s1) var(--s3);
  border: 1px solid oklch(1 0 0 / 0.09);
  border-radius: var(--radius-md);
  background: oklch(1 0 0 / 0.04);
  transition: color 120ms, background 120ms;
  white-space: nowrap;
}
.docs-back:hover { color: var(--color-ink); background: oklch(1 0 0 / 0.09); }

/* ── Hero ─────────────────────────────────────────────────────── */
.docs-hero {
  position: relative;
  min-height: 48vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
}

.docs-hero-bg {
  position: absolute;
  inset: 0;
  transition: background 0.9s ease;
}

.docs-hero-overlay {
  position: relative;
  padding: var(--s8) var(--s6) var(--s7);
  background: linear-gradient(to top,
    var(--color-paper) 0%,
    oklch(0.11 0.010 250 / 0.88) 28%,
    transparent 100%);
}

.docs-hero-content {
  max-width: 760px;
  margin: 0 auto;
}

.docs-hero-title {
  font-family: var(--font-ui);
  font-size: clamp(2rem, 5vw, 3.4rem);
  font-weight: 300;
  font-style: normal;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: var(--color-ink);
  margin-bottom: var(--s4);
}

.docs-hero-sub {
  font-size: var(--text-base);
  color: var(--color-ink-2);
  margin-bottom: var(--s5);
  letter-spacing: 0.01em;
}

.docs-base-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--s3);
  padding: var(--s2) var(--s4);
  background: oklch(0 0 0 / 0.30);
  border: 1px solid oklch(1 0 0 / 0.13);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(20px);
}

.base-chip-label {
  font-size: var(--text-xs);
  color: oklch(1 0 0 / 0.45);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.base-chip-url {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  color: var(--color-accent);
}

/* ── Content column ───────────────────────────────────────────── */
.docs-content {
  max-width: 820px;
  margin: 0 auto;
  padding: var(--s7) var(--s6) var(--s9);
  display: flex;
  flex-direction: column;
  gap: var(--s8);
}

/* ── Section ──────────────────────────────────────────────────── */
.docs-section {
  display: flex;
  flex-direction: column;
  gap: var(--s5);
}

.section-heading {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 400;
  font-style: normal;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-ink-3);
}

.section-desc {
  font-size: var(--text-base);
  color: var(--color-ink-2);
  max-width: 560px;
  line-height: 1.75;
}

/* ── Quick Start grid ─────────────────────────────────────────── */
.quick-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--s4);
}

.quick-card {
  background: var(--glass-bg-card);
  border: 1px solid oklch(1 0 0 / 0.08);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-glass-sm);
  backdrop-filter: blur(28px) saturate(160%);
  padding: var(--s4);
  display: flex;
  flex-direction: column;
  gap: var(--s3);
}

.quick-card-head {
  display: flex;
  align-items: center;
  gap: var(--s2);
  min-width: 0;
}

.quick-card-path {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  color: var(--color-ink-2);
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.quick-card-tagline {
  font-size: var(--text-xs);
  color: var(--color-ink-3);
  line-height: 1.55;
  flex: 1;
}

/* ── Method badge ─────────────────────────────────────────────── */
.ep-method-badge {
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: 0.08em;
  padding: 2px 7px;
  border-radius: var(--radius-md);
  background: oklch(0.76 0.10 220 / 0.15);
  color: var(--color-accent);
  border: 1px solid oklch(0.76 0.10 220 / 0.22);
  flex-shrink: 0;
}

/* ── Endpoint cards ───────────────────────────────────────────── */
.ep-list {
  display: flex;
  flex-direction: column;
  gap: var(--s6);
}

.ep-card {
  background: var(--glass-bg-panel);
  border: 1px solid oklch(1 0 0 / 0.08);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-glass-panel);
  backdrop-filter: blur(32px) saturate(165%);
  padding: var(--s6);
  display: flex;
  flex-direction: column;
  gap: var(--s4);
}

.ep-card-head {
  display: flex;
  align-items: center;
  gap: var(--s3);
}

.ep-card-path {
  font-family: var(--font-ui);
  font-size: var(--text-md);
  color: var(--color-ink);
  letter-spacing: -0.01em;
}

.ep-tagline {
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--color-ink);
}

.ep-desc {
  font-size: var(--text-sm);
  color: var(--color-ink-2);
  line-height: 1.75;
  max-width: 580px;
}

/* ── Params ───────────────────────────────────────────────────── */
.ep-params {
  display: flex;
  flex-direction: column;
  gap: var(--s2);
}

.table-label {
  font-size: var(--text-xs);
  color: var(--color-ink-3);
  text-transform: uppercase;
  letter-spacing: 0.10em;
}

.param-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}

.param-table th {
  text-align: left;
  font-size: var(--text-xs);
  font-weight: 400;
  color: var(--color-ink-3);
  letter-spacing: 0.06em;
  padding: var(--s2) var(--s3);
  border-bottom: 1px solid oklch(1 0 0 / 0.07);
}

.param-table td {
  padding: var(--s2) var(--s3);
  vertical-align: top;
  border-bottom: 1px solid oklch(1 0 0 / 0.04);
}

.param-name    { font-family: var(--font-ui); font-size: var(--text-sm); color: var(--color-ink); }
.param-type    { font-family: var(--font-ui); font-size: var(--text-xs); color: var(--color-ink-3); }
.param-default { font-family: var(--font-ui); font-size: var(--text-sm); color: var(--color-ink-2); }
.param-note    { font-size: var(--text-xs); color: var(--color-ink-2); line-height: 1.6; }

/* ── Code blocks ──────────────────────────────────────────────── */
.ep-curl { display: flex; flex-direction: column; gap: var(--s2); }
.ep-try  { display: flex; flex-direction: column; gap: var(--s3); }

.code-wrap {
  position: relative;
}

.code-block {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  line-height: 1.65;
  color: oklch(0.72 0.022 220);
  background: oklch(0.10 0.012 250);
  border: 1px solid oklch(1 0 0 / 0.06);
  border-radius: var(--radius-lg);
  padding: var(--s4) var(--s5);
  overflow-x: auto;
  white-space: pre;
}

.copy-btn {
  position: absolute;
  top: var(--s2);
  right: var(--s2);
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-ink-3);
  background: oklch(0.18 0.016 245 / 0.85);
  border: 1px solid oklch(1 0 0 / 0.08);
  border-radius: var(--radius-md);
  padding: 2px 8px;
  cursor: pointer;
  transition: color 120ms, background 120ms;
}
.copy-btn:hover { color: var(--color-ink); background: oklch(0.24 0.016 245 / 0.95); }
.copy-btn--done { color: oklch(0.72 0.14 145); }
.copy-btn:focus-visible { outline: 1.5px solid var(--color-focus); outline-offset: 2px; }

/* ── Try it ───────────────────────────────────────────────────── */
.try-btn {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  height: 32px;
  padding: 0 var(--s4);
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  letter-spacing: 0.06em;
  border: 1px solid oklch(0.76 0.10 220 / 0.30);
  border-radius: var(--radius-md);
  background: oklch(0.76 0.10 220 / 0.10);
  color: var(--color-accent);
  cursor: pointer;
  transition: background 120ms, border-color 120ms;
}
.try-btn:hover { background: oklch(0.76 0.10 220 / 0.18); border-color: oklch(0.76 0.10 220 / 0.45); }
.try-btn--loading { opacity: 0.5; pointer-events: none; }
.try-btn:focus-visible { outline: 1.5px solid var(--color-focus); outline-offset: 2px; }

.try-result {
  display: flex;
  flex-direction: column;
  gap: var(--s3);
}

.result-swatch {
  position: relative;
  height: 110px;
  border-radius: var(--radius-lg);
  border: 1px solid oklch(1 0 0 / 0.08);
  overflow: hidden;
}

.result-label {
  position: absolute;
  bottom: var(--s3);
  left: var(--s4);
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  color: oklch(1 0 0 / 0.82);
  text-shadow: 0 1px 6px oklch(0 0 0 / 0.60);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.result-json {
  max-height: 280px;
  overflow-y: auto;
  font-size: var(--text-xs);
  color: var(--color-ink-3);
}

/* ── Integration ──────────────────────────────────────────────── */
.integration-note {
  padding: var(--s4) var(--s5);
  background: oklch(0.16 0.018 245 / 0.45);
  border: 1px solid oklch(1 0 0 / 0.06);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  color: var(--color-ink-2);
  line-height: 1.75;
}

.inline-code {
  font-family: var(--font-ui);
  font-size: 0.9em;
  color: var(--color-ink);
  background: oklch(1 0 0 / 0.06);
  padding: 1px 5px;
  border-radius: var(--radius-md);
}

/* ── Style comparison grid ────────────────────────────────────── */
.style-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--s5);
}

.style-card {
  display: flex;
  flex-direction: column;
  gap: var(--s3);
}

.style-swatch {
  position: relative;
  height: 200px;
  border-radius: var(--radius-xl);
  border: 1px solid oklch(1 0 0 / 0.08);
  overflow: hidden;
  flex-shrink: 0;
  transition: opacity 0.9s ease;
}

.style-badge {
  position: absolute;
  bottom: var(--s3);
  left: var(--s4);
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: oklch(1 0 0 / 0.82);
  text-shadow: 0 1px 6px oklch(0 0 0 / 0.55);
}

.style-name {
  font-family: var(--font-ui);
  font-size: var(--text-base);
  font-weight: 400;
  font-style: normal;
  letter-spacing: -0.01em;
  color: var(--color-ink);
}

.style-desc-text {
  font-size: var(--text-sm);
  color: var(--color-ink-2);
  line-height: 1.75;
}

.style-code {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  color: oklch(0.72 0.022 220);
  background: oklch(0.10 0.012 250);
  border: 1px solid oklch(1 0 0 / 0.06);
  border-radius: var(--radius-md);
  padding: var(--s2) var(--s3);
  white-space: pre;
  overflow-x: auto;
}

/* ── Catalog grid ─────────────────────────────────────────────── */
.catalog-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--s4);
}

.catalog-group {
  background: var(--glass-bg-panel);
  border: 1px solid oklch(1 0 0 / 0.08);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-glass-panel);
  backdrop-filter: blur(32px) saturate(165%);
  padding: var(--s5);
  display: flex;
  flex-direction: column;
  gap: var(--s3);
}

.catalog-group-head {
  display: flex;
  align-items: center;
  gap: var(--s3);
}

.catalog-tag {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 400;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: var(--radius-md);
}

.catalog-tag--core {
  color: oklch(0.76 0.10 220);
  background: oklch(0.76 0.10 220 / 0.10);
  border: 1px solid oklch(0.76 0.10 220 / 0.22);
}

.catalog-tag--nuevo {
  color: oklch(0.80 0.11 330);
  background: oklch(0.80 0.11 330 / 0.10);
  border: 1px solid oklch(0.80 0.11 330 / 0.22);
}

.catalog-tag--sho {
  color: oklch(0.70 0.035 240);
  background: oklch(0.70 0.035 240 / 0.10);
  border: 1px solid oklch(0.70 0.035 240 / 0.22);
}

.catalog-tag--nippon {
  color: oklch(0.76 0.10 45);
  background: oklch(0.76 0.10 45 / 0.10);
  border: 1px solid oklch(0.76 0.10 45 / 0.22);
}

.catalog-count {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  color: var(--color-ink-4);
  letter-spacing: 0.04em;
}

.catalog-group-desc {
  font-size: var(--text-xs);
  color: var(--color-ink-2);
  line-height: 1.7;
}

.moment-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: var(--s2);
  margin-top: var(--s1);
}

.moment-item {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  color: var(--color-ink-3);
  background: oklch(1 0 0 / 0.04);
  border: 1px solid oklch(1 0 0 / 0.07);
  border-radius: var(--radius-md);
  padding: 2px 8px;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

/* ── Footer ───────────────────────────────────────────────────── */
.docs-footer {
  border-top: 1px solid oklch(1 0 0 / 0.07);
  padding: var(--s5) var(--s6);
}

.docs-footer-inner {
  max-width: 820px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: var(--s3);
  font-size: var(--text-xs);
  color: var(--color-ink-3);
  flex-wrap: wrap;
}

.footer-brand   { color: var(--color-ink-2); }
.footer-sep     { color: var(--color-ink-4); }
.footer-tagline { flex: 1; min-width: 200px; }

.footer-back {
  text-decoration: none;
  color: var(--color-ink-3);
  margin-left: auto;
  transition: color 120ms;
  white-space: nowrap;
}
.footer-back:hover { color: var(--color-ink); }

/* ── Responsive ───────────────────────────────────────────────── */
@media (max-width: 768px) {
  .docs-header      { padding: var(--s3) var(--s4); }
  .docs-nav-link    { display: none; }
  .docs-hero-overlay { padding: var(--s7) var(--s4) var(--s6); }
  .docs-content     { padding: var(--s6) var(--s4) var(--s8); gap: var(--s7); }
  .quick-grid       { grid-template-columns: 1fr; }
  .ep-card          { padding: var(--s4); }
  .hide-sm          { display: none; }
  .docs-footer      { padding: var(--s4); }
  .style-grid       { grid-template-columns: 1fr; }
  .catalog-grid     { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
  .docs-hero-title { font-size: 2rem; }
}
</style>
