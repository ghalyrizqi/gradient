<script setup lang="ts">
import { ref, computed } from 'vue';

interface Param {
  name: string;
  type: string;
  default: string;
  note: string;
}

interface Endpoint {
  id: string;
  path: string;
  tagline: string;
  description: string;
  params: Param[];
  example: string;
  result: unknown;
  loading: boolean;
}

const base = computed(() => window.location.origin);

const endpoints = ref<Endpoint[]>([
  {
    id: 'color',
    path: '/api/gradient/color',
    tagline: 'Gradient anchored to a hex color',
    description:
      'The engine biases the sky archetype toward the given hue, anchors the zenith stop to the exact color, and applies the chosen style treatment to the remaining stops.',
    params: [
      { name: 'color',  type: 'hex',          default: '#3a6ea5', note: 'Seed color. URL-encode the #.' },
      { name: 'style',  type: 'vivid | veil',  default: 'vivid',   note: 'vivid = saturated skies · veil = misty, desaturated' },
      { name: 'seed',   type: 'integer',       default: '0',       note: 'Shuffle seed — same color, different archetype.' },
    ],
    example: 'color=%233a6ea5&style=vivid',
    result: null,
    loading: false,
  },
  {
    id: 'text',
    path: '/api/gradient/text',
    tagline: 'NLP-driven gradient from natural language',
    description:
      'Parses the prompt for emotions, time-of-day cues, entities, Japanese color words (sakura, kon, fuji…), and brand names (Python, Docker, Omarchy, Tokyo Night…). Each signal nudges the archetype and HSL stops.',
    params: [
      { name: 'q',      type: 'string',        default: '—',      note: 'Text prompt. Max 500 chars. Also accepts text=.' },
      { name: 'style',  type: 'vivid | veil',  default: 'vivid',  note: 'Color treatment.' },
    ],
    example: 'q=Omarchy+OS+Review+Two+Months+In&style=vivid',
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
      { name: 'seed',   type: 'string',        default: '—',      note: 'Any string identifier. Max 200 chars.' },
      { name: 'style',  type: 'vivid | veil',  default: 'vivid',  note: 'Color treatment.' },
    ],
    example: 'seed=small-window&style=vivid',
    result: null,
    loading: false,
  },
]);

async function tryEndpoint(ep: Endpoint) {
  ep.loading = true;
  ep.result = null;
  try {
    const res = await fetch(`${base.value}${ep.path}?${ep.example}`);
    ep.result = await res.json();
  } catch (e) {
    ep.result = { error: String(e) };
  } finally {
    ep.loading = false;
  }
}

function curlExample(ep: Endpoint): string {
  return `curl "${base.value}${ep.path}?${ep.example}"`;
}

function gradientCss(result: unknown): string | null {
  if (result && typeof result === 'object' && 'css' in result && typeof result.css === 'string') {
    return result.css;
  }
  return null;
}

const SCHEMA = `interface GradientStop {
  pos:   number;   // 0–1, top→bottom
  color: string;   // hsl(H S% L%)
}

interface GradientResponse {
  stops:     GradientStop[];  // 3–11 stops
  css:       string;          // ready-to-use linear-gradient(…)
  moment:    string;          // sky archetype name
  style:     "vivid" | "veil";
  timeOfDay: number;          // 0–23
  label:     string;          // human-readable name
  source:    string;          // resolver trace
  word?:     string;          // echo of input text (text/seed only)
  paletteHex?: string;        // zenith hex (color endpoint only)
}`;
</script>

<template>
  <div class="docs">

    <!-- ── Header ──────────────────────────────────────────────── -->
    <header class="docs-header">
      <span class="docs-wordmark">Small Window · API</span>
      <a class="docs-back" href="/">← Studio</a>
    </header>

    <!-- ── Hero ───────────────────────────────────────────────── -->
    <section class="hero">
      <div class="hero-bar" />
      <div class="hero-body">
        <h1 class="hero-title">Sky gradient<br><em>as an API.</em></h1>
        <p class="hero-desc">
          Three REST endpoints. Pass a color, a text prompt, or any seed string —
          get back a multi-stop gradient tuned by a sky archetype engine, NLP brand
          detection, and Nippon color nudges.
        </p>
        <div class="hero-base">
          <span class="base-label">Base URL</span>
          <code class="base-url">{{ base }}</code>
        </div>
      </div>
    </section>

    <!-- ── Endpoints ──────────────────────────────────────────── -->
    <main class="endpoints">

      <article v-for="ep in endpoints" :key="ep.id" class="endpoint">

        <!-- Path row -->
        <div class="ep-path-row">
          <span class="ep-method">GET</span>
          <code class="ep-path">{{ ep.path }}</code>
        </div>

        <p class="ep-tagline">{{ ep.tagline }}</p>
        <p class="ep-desc">{{ ep.description }}</p>

        <!-- Params -->
        <div class="ep-params">
          <div class="ep-params-head">Parameters</div>
          <table class="param-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in ep.params" :key="p.name">
                <td><code class="param-name">{{ p.name }}</code></td>
                <td><span class="param-type">{{ p.type }}</span></td>
                <td><code class="param-default">{{ p.default }}</code></td>
                <td class="param-note">{{ p.note }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- cURL -->
        <div class="ep-curl">
          <div class="code-label">curl</div>
          <pre class="code-block">{{ curlExample(ep) }}</pre>
        </div>

        <!-- Try it -->
        <div class="ep-try">
          <button
            class="try-btn"
            :class="{ 'try-btn--loading': ep.loading }"
            @click="tryEndpoint(ep)"
          >
            {{ ep.loading ? 'loading…' : 'Try it ↗' }}
          </button>

          <div v-if="ep.result" class="try-result">
            <!-- Gradient preview swatch -->
            <div
              v-if="gradientCss(ep.result)"
              class="result-swatch"
              :style="{ background: gradientCss(ep.result)! }"
            />
            <!-- JSON -->
            <pre class="code-block result-json">{{ JSON.stringify(ep.result, null, 2) }}</pre>
          </div>
        </div>

      </article>
    </main>

    <!-- ── Response schema ────────────────────────────────────── -->
    <section class="schema-section">
      <h2 class="schema-title">Response schema</h2>
      <pre class="code-block schema-block">{{ SCHEMA }}</pre>
    </section>

    <!-- ── Footer ─────────────────────────────────────────────── -->
    <footer class="docs-footer">
      <span>Small Window</span>
      <span class="footer-sep">·</span>
      <span>Sky gradient engine · NLP brand detection · Nippon color catalog</span>
    </footer>

  </div>
</template>

<style scoped>
/* ── Reset & base ────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.docs {
  min-height: 100vh;
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-ui);
  font-size: var(--text-base);
  line-height: 1.6;
}

/* ── Header ──────────────────────────────────────────────────── */
.docs-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--s3) var(--s6);
  background: oklch(0.11 0.010 250 / 0.88);
  border-bottom: 1px solid var(--color-glass-rule);
  backdrop-filter: blur(12px);
}

.docs-wordmark {
  font-size: var(--text-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-ink-2);
}

.docs-back {
  font-size: var(--text-xs);
  letter-spacing: 0.06em;
  text-decoration: none;
  color: var(--color-ink-3);
  transition: color 0.15s;
}
.docs-back:hover { color: var(--color-ink); }

/* ── Hero ────────────────────────────────────────────────────── */
.hero {
  border-bottom: 1px solid var(--color-glass-rule);
}

.hero-bar {
  height: 3px;
  background: linear-gradient(90deg,
    hsl(220 65% 55%),
    hsl(30 70% 58%),
    hsl(90 45% 60%),
    hsl(195 55% 58%));
}

.hero-body {
  max-width: 760px;
  margin: 0 auto;
  padding: var(--s8) var(--s6) var(--s7);
}

.hero-title {
  font-family: var(--font-ui);
  font-size: clamp(2rem, 5vw, 3.4rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: var(--color-ink);
  margin-bottom: var(--s5);
}

.hero-title em {
  font-style: normal;
  color: var(--color-ink-2);
}

.hero-desc {
  font-size: var(--text-base);
  color: var(--color-ink-2);
  max-width: 560px;
  line-height: 1.7;
  margin-bottom: var(--s6);
}

.hero-base {
  display: inline-flex;
  align-items: center;
  gap: var(--s3);
  padding: var(--s2) var(--s4);
  background: var(--color-glass);
  border: 1px solid var(--color-glass-rule);
  border-radius: var(--radius-lg);
}

.base-label {
  font-size: var(--text-xs);
  color: var(--color-ink-3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.base-url {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  color: var(--color-accent);
}

/* ── Endpoints ───────────────────────────────────────────────── */
.endpoints {
  max-width: 760px;
  margin: 0 auto;
  padding: var(--s7) var(--s6);
  display: flex;
  flex-direction: column;
  gap: var(--s8);
}

.endpoint {
  display: flex;
  flex-direction: column;
  gap: var(--s4);
  padding-bottom: var(--s8);
  border-bottom: 1px solid var(--color-glass-rule);
}

.ep-path-row {
  display: flex;
  align-items: center;
  gap: var(--s3);
}

.ep-method {
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: 0.1em;
  padding: 2px 8px;
  border-radius: var(--radius-md);
  background: oklch(0.76 0.10 220 / 0.15);
  color: var(--color-accent);
  border: 1px solid oklch(0.76 0.10 220 / 0.25);
}

.ep-path {
  font-family: var(--font-ui);
  font-size: var(--text-md);
  color: var(--color-ink);
  letter-spacing: -0.01em;
}

.ep-tagline {
  font-size: var(--text-base);
  color: var(--color-ink);
  font-weight: 500;
}

.ep-desc {
  font-size: var(--text-sm);
  color: var(--color-ink-2);
  line-height: 1.75;
  max-width: 580px;
}

/* ── Params table ────────────────────────────────────────────── */
.ep-params-head {
  font-size: var(--text-xs);
  color: var(--color-ink-3);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: var(--s3);
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
  border-bottom: 1px solid var(--color-glass-rule);
}

.param-table td {
  padding: var(--s2) var(--s3);
  vertical-align: top;
  border-bottom: 1px solid oklch(0.98 0.006 95 / 0.06);
}

.param-name {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  color: var(--color-ink);
}

.param-type {
  font-size: var(--text-xs);
  color: var(--color-ink-3);
}

.param-default {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  color: var(--color-ink-2);
}

.param-note {
  color: var(--color-ink-2);
  font-size: var(--text-xs);
  line-height: 1.6;
}

/* ── Code blocks ─────────────────────────────────────────────── */
.code-label {
  font-size: var(--text-xs);
  color: var(--color-ink-3);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: var(--s2);
}

.code-block {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  line-height: 1.65;
  color: var(--color-ink-2);
  background: var(--color-paper-2);
  border: 1px solid var(--color-glass-rule);
  border-radius: var(--radius-lg);
  padding: var(--s4) var(--s5);
  overflow-x: auto;
  white-space: pre;
}

/* ── Try it ──────────────────────────────────────────────────── */
.try-btn {
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 var(--s4);
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  letter-spacing: 0.06em;
  border: 1px solid var(--color-glass-rule-strong);
  border-radius: var(--radius-md);
  background: var(--color-glass);
  color: var(--color-ink-2);
  cursor: pointer;
  transition: background 0.12s, color 0.12s;
}
.try-btn:hover { background: var(--color-glass-hover); color: var(--color-ink); }
.try-btn--loading { opacity: 0.5; pointer-events: none; }

.try-result {
  display: flex;
  flex-direction: column;
  gap: var(--s3);
  margin-top: var(--s3);
}

.result-swatch {
  height: 100px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-glass-rule);
}

.result-json {
  max-height: 320px;
  overflow-y: auto;
  font-size: var(--text-xs);
  color: var(--color-ink-3);
}

/* ── Schema section ──────────────────────────────────────────── */
.schema-section {
  max-width: 760px;
  margin: 0 auto;
  padding: 0 var(--s6) var(--s8);
}

.schema-title {
  font-size: var(--text-sm);
  font-weight: 400;
  color: var(--color-ink-3);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: var(--s4);
}

.schema-block {
  color: var(--color-ink-3);
}

/* ── Footer ──────────────────────────────────────────────────── */
.docs-footer {
  display: flex;
  align-items: center;
  gap: var(--s3);
  padding: var(--s5) var(--s6);
  border-top: 1px solid var(--color-glass-rule);
  font-size: var(--text-xs);
  color: var(--color-ink-3);
}

.footer-sep { color: var(--color-ink-4); }

/* ── Responsive ──────────────────────────────────────────────── */
@media (max-width: 600px) {
  .hero-body, .endpoints, .schema-section { padding-inline: var(--s4); }
  .hero-title { font-size: 2rem; }
  .param-table th:last-child,
  .param-table td:last-child { display: none; }
}
</style>
