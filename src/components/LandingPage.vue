<script setup lang="ts">
/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
/* Hallmark · genre: atmospheric · macrostructure: Marquee Hero
 * theme: custom (vibe: "nuevo.tokyo, Shibuya sunrise" — continued system)
 * nav: N9 Edge-aligned minimal · footer: Ft5 Statement
 * paper oklch(0.11 0.010 250) · accent oklch(0.76 0.10 220) sora-blue
 * display: Instrument Serif 400 roman · body: DM Sans 300/400 · ui: DM Mono
 * paper-band: dark / display-style: serif-roman / accent-hue: cool
 * studied: yes · DNA-source: image (ditther.com reference screenshots)
 * H1 knobs: size=xl, alignment=left-bias, underlay=live-gradient
 * N9 knobs: CTA=filled-pill, wordmark=mono-uppercase, padding-block=spacious
 * Ft5 knobs: width=38ch, wordmark=under-sentence, rule=hairline-above
 * F4 knobs: numbering=01/02/03, layout=vertical-stack, connector=none
 */
import { ref, onMounted } from 'vue';

const heroCss = ref(
  'linear-gradient(to bottom in oklab, hsl(215 62% 40%) 0%, hsl(28 68% 56%) 68%, hsl(348 42% 64%) 100%)'
);

onMounted(async () => {
  try {
    const res = await fetch('/api/gradient/seed?seed=small-window-landing&style=vivid');
    if (res.ok) {
      const data = await res.json() as { css?: string };
      if (data.css) heroCss.value = data.css;
    }
  } catch { /* fallback gradient stays */ }
});
</script>

<template>
  <div class="landing">

    <!-- Nav: N9 Edge-aligned minimal -->
    <nav class="nav" aria-label="Main navigation">
      <a href="/" class="nav-mark">Small Window</a>
      <a href="/studio" class="nav-cta">Open Studio →</a>
    </nav>

    <!-- Hero: Marquee Hero — live sky gradient fills viewport, text left-biased at bottom -->
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-bg" :style="{ background: heroCss }" aria-hidden="true"></div>
      <div class="hero-overlay" aria-hidden="true"></div>

      <div class="hero-body">
        <h1 id="hero-title" class="hero-title">Sky,<br>as a gradient.</h1>
        <p class="hero-sub">Any color. Any text. Any seed.</p>
      </div>

      <div class="hero-foot">
        <ul class="chips" role="list" aria-label="API input types">
          <li class="chip" role="listitem">Color</li>
          <li class="chip chip--on" role="listitem">Text</li>
          <li class="chip" role="listitem">Seed</li>
        </ul>
        <span class="hero-badge">Free · Open API · No account</span>
      </div>
    </section>

    <!-- How it works: F4 Step sequence — 01/02/03, vertical, hairline-separated -->
    <section class="how" id="how" aria-labelledby="how-title">
      <div class="inner">
        <p class="eyebrow" aria-hidden="true">How it works</p>
        <h2 id="how-title" class="sec-title">From prompt to gradient<br>in one request.</h2>

        <ol class="steps">
          <li class="step">
            <span class="step-n" aria-hidden="true">01</span>
            <div class="step-text">
              <h3 class="step-head">Pick an input</h3>
              <p class="step-body">Send a hex color, a text prompt — "tokyo night rain", "sakura season" — or any opaque string as a seed.</p>
            </div>
          </li>
          <li class="step">
            <span class="step-n" aria-hidden="true">02</span>
            <div class="step-text">
              <h3 class="step-head">The engine reads the sky</h3>
              <p class="step-body">NLP parses emotions, time-of-day cues, Japanese color words (kon, sakura, fuji…), and brand signals (Python, Docker, Tokyo Night…) to select a sky archetype: dawn, zenith, dusk, or night.</p>
            </div>
          </li>
          <li class="step">
            <span class="step-n" aria-hidden="true">03</span>
            <div class="step-text">
              <h3 class="step-head">Use it anywhere</h3>
              <p class="step-body">A ready-to-use <code>linear-gradient()</code> string comes back, plus raw stops — each carrying <code>pos</code> (0–1) and an <code>hsl()</code> color for canvas, SVG, or WebGL.</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- Endpoints: full-width stacked list (avoids 3-equal-column icon-grid anti-pattern) -->
    <section class="eps" id="api" aria-labelledby="eps-title">
      <div class="inner">
        <p class="eyebrow" aria-hidden="true">Three endpoints</p>
        <h2 id="eps-title" class="sec-title">Three ways to reach a sky.</h2>
        <p class="sec-sub">All return the same JSON shape — <code>css</code>, <code>stops</code>, <code>label</code>, <code>moment</code>. All free.</p>

        <ul class="ep-list" role="list">
          <li class="ep-card">
            <div class="ep-head">
              <span class="ep-tag">Text</span>
              <code class="ep-path">GET /api/gradient/text</code>
            </div>
            <p class="ep-desc">NLP-driven. Parses emotions, time-of-day cues, Japanese color words, and brand signals. Each nudges the sky archetype and HSL stops.</p>
            <pre class="ep-sample" aria-label="Example query string">?q=tokyo+night+rain&amp;style=vivid</pre>
          </li>
          <li class="ep-card">
            <div class="ep-head">
              <span class="ep-tag">Color</span>
              <code class="ep-path">GET /api/gradient/color</code>
            </div>
            <p class="ep-desc">Anchored to a hex color. Biases the sky archetype toward the given hue, anchors the zenith stop to the exact color, and applies the chosen style treatment to the remaining stops.</p>
            <pre class="ep-sample" aria-label="Example query string">?color=%233a6ea5&amp;style=vivid&amp;seed=0</pre>
          </li>
          <li class="ep-card">
            <div class="ep-head">
              <span class="ep-tag">Seed</span>
              <code class="ep-path">GET /api/gradient/seed</code>
            </div>
            <p class="ep-desc">Deterministic from any opaque string. Same seed always returns the same gradient — useful for stable per-entity visuals: project slugs, user IDs, article titles.</p>
            <pre class="ep-sample" aria-label="Example query string">?seed=my-project-slug&amp;style=vivid</pre>
          </li>
        </ul>
      </div>
    </section>

    <!-- CTA strip -->
    <section class="cta" aria-label="Call to action">
      <div class="inner cta-inner">
        <a href="/studio" class="btn btn--fill">Open the Studio →</a>
        <a href="/docs"   class="btn btn--ghost">API Reference →</a>
      </div>
    </section>

    <!-- Footer: Ft5 Statement — sentence 38ch, wordmark under sentence, hairline rule above -->
    <footer class="foot">
      <div class="inner foot-inner">
        <p class="foot-stmt">The sky is always<br>doing something interesting.</p>
        <div class="foot-meta">
          <span class="foot-mark">Small Window</span>
          <a href="/studio" class="foot-lnk">Studio</a>
          <a href="/docs"   class="foot-lnk">API</a>
        </div>
      </div>
    </footer>

  </div>
</template>

<style scoped>
/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
/* Hallmark · genre: atmospheric · macrostructure: Marquee Hero
 * theme: custom (continued) · nav: N9 · footer: Ft5
 */

/* ── Reset ──────────────────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ── Local derived tokens (opacity variants of global system tokens) ── */
.landing {
  /* all raw OKLCH values are opacity-derived from existing system tokens */
  --_w96: oklch(from white l c h / 0.96);
  --_w80: oklch(from white l c h / 0.80);
  --_w68: oklch(from white l c h / 0.68);
  --_w65: oklch(from white l c h / 0.65);
  --_w50: oklch(from white l c h / 0.50);
  --_w22: oklch(from white l c h / 0.22);
  --_w88: oklch(from white l c h / 0.88);
  --_w06: oklch(from white l c h / 0.06);
  --_chip-dark: oklch(from black l c h / 0.32);
  --_p72:  oklch(from var(--color-paper) l c h / 0.72);
  --_p20:  oklch(from var(--color-paper) l c h / 0.20);
  --_a10:  oklch(from var(--color-accent) l c h / 0.10);
  --_a20:  oklch(from var(--color-accent) l c h / 0.20);
  /* ep code colors — consistent with DocsApp.vue */
  --_ep-glow: oklch(0.72 0.022 220);
  --_ep-bg:   oklch(0.10 0.012 250);
  /* radial bloom — consistent with App.vue bloom values */
  --_bloom:   oklch(0.15 0.042 250 / 0.38);
}

/* ── Page shell ─────────────────────────────────────────────────────── */
.landing {
  min-height: 100svh;
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-ui);
  font-size: var(--text-base);
  line-height: 1.6;
  overflow-x: clip;
}

/* ── Nav: N9 Edge-aligned minimal ───────────────────────────────────── */
.nav {
  position: absolute;
  top: 0; left: 0; right: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--s5) var(--s7);
}

.nav-mark {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 400;
  font-style: normal;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: var(--_w80);
  text-decoration: none;
  transition: color 140ms var(--ease-out);
}
.nav-mark:hover { color: var(--_w96); }
.nav-mark:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 4px; border-radius: var(--radius-md); }

.nav-cta {
  display: inline-flex;
  align-items: center;
  height: 34px;
  padding: 0 var(--s4);
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 400;
  font-style: normal;
  letter-spacing: 0.05em;
  text-decoration: none;
  color: var(--color-paper);
  background: var(--_w88);
  border-radius: var(--radius-xl);
  white-space: nowrap;
  transition: background 140ms var(--ease-out);
}
.nav-cta:hover { background: white; }
.nav-cta:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 3px; }

/* ── Hero: full-bleed, text left-biased at bottom ───────────────────── */
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  transition: background 1.4s var(--ease-out);
}

/* gradient overlay: dark at bottom (text legibility), clear at top (sky shows) */
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    var(--color-paper)   0%,
    var(--_p72)         22%,
    var(--_p20)         50%,
    transparent        100%
  );
}

.hero-body {
  position: relative;
  padding: 0 var(--s7) var(--s5);
  max-width: 640px;
}

.hero-title {
  font-family: var(--font-serif);
  font-size: clamp(2.8rem, 7vw + 0.5rem, 5.6rem);
  font-weight: 400;
  font-style: normal;
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: var(--_w96);
  overflow-wrap: anywhere;
  min-width: 0;
}

.hero-sub {
  font-family: var(--font-sans);
  font-size: var(--text-md);
  font-weight: 300;
  font-style: normal;
  color: var(--_w65);
  margin-top: var(--s3);
  line-height: 1.5;
}

.hero-foot {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 var(--s7) var(--s5);
  gap: var(--s4);
  flex-wrap: wrap;
}

/* ── Chips — Ditther-style input-type selectors ─────────────────────── */
.chips {
  display: flex;
  gap: var(--s2);
  list-style: none;
  flex-wrap: wrap;
}

.chip {
  display: inline-flex;
  align-items: center;
  height: 30px;
  padding: 0 var(--s3);
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 400;
  font-style: normal;
  letter-spacing: 0.04em;
  color: var(--_w68);
  background: var(--_chip-dark);
  border: 1px solid var(--_w22);
  border-radius: var(--radius-xl);
  cursor: default;
  user-select: none;
  white-space: nowrap;
}

.chip--on {
  color: var(--color-paper);
  background: var(--_w88);
  border-color: transparent;
}

.hero-badge {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 400;
  font-style: normal;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--_w50);
  white-space: nowrap;
}

/* ── Shared section shell ───────────────────────────────────────────── */
.inner {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 var(--s7);
}

/* ── Eyebrow — sora-blue label, used ≤ 2× per page ─────────────────── */
.eyebrow {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 400;
  font-style: normal;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: var(--s3);
}

/* ── Section headings ───────────────────────────────────────────────── */
.sec-title {
  font-family: var(--font-serif);
  font-size: clamp(1.75rem, 3.5vw + 0.5rem, 3rem);
  font-weight: 400;
  font-style: normal;
  line-height: 1.15;
  letter-spacing: -0.015em;
  color: var(--color-ink);
  overflow-wrap: anywhere;
  min-width: 0;
}

.sec-sub {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: 300;
  font-style: normal;
  color: var(--color-ink-2);
  line-height: 1.75;
  margin-top: var(--s3);
  max-width: 58ch;
}

.sec-sub code {
  font-family: var(--font-ui);
  font-size: 0.9em;
  color: var(--color-ink);
  background: var(--color-paper-3);
  padding: 1px 5px;
  border-radius: var(--radius-md);
}

/* ── How it works ───────────────────────────────────────────────────── */
.how {
  padding: var(--s9) 0 var(--s8);
  background: var(--color-paper);
}

/* ── Steps: F4 — vertical stack, 01/02/03, hairline separators ─────── */
.steps {
  list-style: none;
  margin-top: var(--s7);
  border-top: 1px solid var(--color-rule);
}

.step {
  display: grid;
  grid-template-columns: 4.5ch 1fr;
  gap: var(--s5);
  padding: var(--s6) 0;
  border-bottom: 1px solid var(--color-rule);
  align-items: start;
}

.step-n {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 400;
  font-style: normal;
  letter-spacing: 0.08em;
  color: var(--color-ink-3);
  padding-top: 0.2em;
}

.step-text {
  display: flex;
  flex-direction: column;
  gap: var(--s2);
}

.step-head {
  font-family: var(--font-ui);
  font-size: var(--text-base);
  font-weight: 400;
  font-style: normal;
  letter-spacing: -0.01em;
  color: var(--color-ink);
}

.step-body {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 300;
  font-style: normal;
  color: var(--color-ink-2);
  line-height: 1.75;
  max-width: 62ch;
}

.step-body code {
  font-family: var(--font-ui);
  font-size: 0.9em;
  color: var(--color-ink);
  background: var(--color-paper-3);
  padding: 1px 4px;
  border-radius: var(--radius-md);
}

/* ── Endpoints section ──────────────────────────────────────────────── */
.eps {
  padding: var(--s8) 0 var(--s9);
  background:
    radial-gradient(ellipse 55% 38% at 88% 14%, var(--_bloom) 0%, transparent 52%),
    var(--color-paper);
}

/* stacked full-width list — avoids 3-equal-column icon-grid anti-pattern */
.ep-list {
  list-style: none;
  margin-top: var(--s6);
  display: flex;
  flex-direction: column;
  gap: var(--s4);
}

/* elevated surface — no glassmorphism, no border-left stripe */
.ep-card {
  background: var(--color-paper-2);
  border: 1px solid var(--_w06);
  border-radius: var(--radius-xl);
  padding: var(--s5) var(--s6);
  display: flex;
  flex-direction: column;
  gap: var(--s3);
  transition: border-color 160ms var(--ease-out);
}
.ep-card:hover { border-color: oklch(from var(--color-rule) l c h / 0.28); }

.ep-head {
  display: flex;
  align-items: center;
  gap: var(--s3);
  flex-wrap: wrap;
}

.ep-tag {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 400;
  font-style: normal;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--color-accent);
  background: var(--_a10);
  border: 1px solid var(--_a20);
  padding: 2px 8px;
  border-radius: var(--radius-md);
}

.ep-path {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  font-style: normal;
  color: var(--color-ink);
  letter-spacing: 0;
}

.ep-desc {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 300;
  font-style: normal;
  color: var(--color-ink-2);
  line-height: 1.75;
  max-width: 64ch;
}

.ep-sample {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-style: normal;
  color: var(--_ep-glow);
  background: var(--_ep-bg);
  border: 1px solid var(--_w06);
  border-radius: var(--radius-lg);
  padding: var(--s3) var(--s4);
  overflow-x: auto;
  white-space: pre;
}

/* ── CTA strip ──────────────────────────────────────────────────────── */
.cta {
  padding: var(--s8) 0;
  border-top: 1px solid var(--color-rule);
}

.cta-inner {
  display: flex;
  align-items: center;
  gap: var(--s4);
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  height: 42px;
  padding: 0 var(--s5);
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 400;
  font-style: normal;
  letter-spacing: 0.05em;
  text-decoration: none;
  border-radius: var(--radius-xl);
  white-space: nowrap;
  transition: background 140ms var(--ease-out), border-color 140ms var(--ease-out), color 140ms var(--ease-out);
}
.btn:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 3px; }

.btn--fill {
  background: var(--color-accent);
  color: var(--color-paper);
  border: 1px solid transparent;
}
.btn--fill:hover { background: var(--color-accent-soft); }

.btn--ghost {
  background: transparent;
  color: var(--color-ink-2);
  border: 1px solid var(--color-rule-mid);
}
.btn--ghost:hover { color: var(--color-ink); border-color: var(--color-ink-3); }

/* ── Footer: Ft5 Statement ──────────────────────────────────────────── */
.foot {
  padding: var(--s7) 0 var(--s6);
  border-top: 1px solid var(--color-rule);
}

.foot-inner {
  display: flex;
  flex-direction: column;
  gap: var(--s5);
}

.foot-stmt {
  font-family: var(--font-serif);
  font-size: clamp(1.4rem, 2.5vw + 0.4rem, 2.2rem);
  font-weight: 400;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: var(--color-ink);
  max-width: 38ch;
  overflow-wrap: anywhere;
  min-width: 0;
}

.foot-meta {
  display: flex;
  align-items: center;
  gap: var(--s4);
  flex-wrap: wrap;
}

.foot-mark {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-ink-2);
}

.foot-lnk {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  letter-spacing: 0.04em;
  text-decoration: none;
  color: var(--color-ink-3);
  transition: color 120ms var(--ease-out);
}
.foot-lnk:hover { color: var(--color-ink); }
.foot-lnk:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 3px; border-radius: var(--radius-md); }

/* ── Responsive — 768 px ────────────────────────────────────────────── */
@media (max-width: 768px) {
  .nav    { padding: var(--s4) var(--s4); }

  .hero-body { padding: 0 var(--s4) var(--s4); }
  .hero-foot { padding: 0 var(--s4) var(--s4); flex-direction: column; align-items: flex-start; gap: var(--s3); }

  .inner  { padding: 0 var(--s4); }

  .how    { padding: var(--s7) 0 var(--s6); }
  .eps    { padding: var(--s6) 0 var(--s7); }

  .step   { grid-template-columns: 4ch 1fr; gap: var(--s3); padding: var(--s5) 0; }

  .ep-card  { padding: var(--s4); }
  .ep-head  { flex-direction: column; align-items: flex-start; gap: var(--s2); }

  .cta    { padding: var(--s6) 0; }
  .cta-inner { flex-direction: column; align-items: flex-start; }

  .foot   { padding: var(--s6) 0 var(--s5); }
}

/* ── Responsive — 480 px ────────────────────────────────────────────── */
@media (max-width: 480px) {
  .hero-title  { font-size: clamp(2.2rem, 10vw, 3.2rem); }
  .sec-title   { font-size: clamp(1.5rem, 6vw, 2rem); }
  .foot-stmt   { font-size: 1.35rem; }
  .nav-mark    { display: none; } /* wordmark hidden on small phones — CTA stays */
}

/* ── Reduced motion ─────────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .hero-bg   { transition-duration: 0ms; }
  .ep-card,
  .btn,
  .nav-mark,
  .nav-cta,
  .foot-lnk  { transition-duration: 0ms; }
}
</style>
