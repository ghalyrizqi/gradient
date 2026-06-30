<!-- Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 -->
<!-- Handoff: landing.dc.html · dark warm paper · IBM Plex Mono · clay accent -->
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const presets = [
  { mode: 'TEXT · "foggy harbor at dawn"',     angle: 160, stops: ['oklch(0.82 0.06 250)', 'oklch(0.74 0.09 285)', 'oklch(0.70 0.10 25)'] },
  { mode: 'COLOR · #E8743B',                   angle: 145, stops: ['oklch(0.78 0.13 55)',  'oklch(0.66 0.16 35)',  'oklch(0.50 0.14 18)'] },
  { mode: 'RANDOM · seed 0x4f2a',              angle: 200, stops: ['oklch(0.82 0.07 140)', 'oklch(0.70 0.09 175)', 'oklch(0.62 0.10 210)'] },
  { mode: 'TEXT · "steel and cherry blossom"', angle: 135, stops: ['oklch(0.88 0.04 210)', 'oklch(0.78 0.08 350)', 'oklch(0.70 0.10 20)'] },
  { mode: 'COLOR · #6B4FBB',                   angle: 155, stops: ['oklch(0.78 0.08 300)', 'oklch(0.68 0.12 295)', 'oklch(0.52 0.14 265)'] },
  { mode: 'RANDOM · seed 0x2c8d',              angle: 175, stops: ['oklch(0.85 0.05 50)',  'oklch(0.72 0.11 30)',  'oklch(0.60 0.13 355)'] },
];

const currentIndex = ref(0);
const current      = computed(() => presets[currentIndex.value]);
const gradientCss  = computed(() => `linear-gradient(${current.value.angle}deg, ${current.value.stops.join(', ')})`);
const modeLabel    = computed(() => current.value.mode);
const cssLine      = computed(() => `linear-gradient(${current.value.angle}deg,\n  ${current.value.stops.join(',\n  ')})`);

function regenerate() {
  currentIndex.value = (currentIndex.value + 1) % presets.length;
}

const modes = [
  {
    num: '01', title: 'Describe it in words',
    body: 'Type a phrase like "foggy harbor at dawn" and the engine maps it into a perceptually balanced three-stop gradient.',
    example: '"late autumn fog over steel water"',
    preview: 'linear-gradient(160deg, oklch(0.82 0.06 250), oklch(0.74 0.09 285) 50%, oklch(0.70 0.10 25))',
  },
  {
    num: '02', title: 'Start from a color',
    body: 'Drop in any hex or CSS color. The engine builds a harmonic ramp around it — matching lightness, hue, chroma.',
    example: '#E8743B',
    preview: 'linear-gradient(145deg, oklch(0.78 0.13 55), oklch(0.66 0.16 35) 50%, oklch(0.50 0.14 18))',
  },
  {
    num: '03', title: 'Let it surprise you',
    body: "Hit Random and get a gradient you wouldn't have picked yourself. Seed it, share it, regenerate until it clicks.",
    example: 'seed: 0x4f2a',
    preview: 'linear-gradient(160deg, oklch(0.82 0.07 140), oklch(0.70 0.09 175) 50%, oklch(0.62 0.10 210))',
  },
];

const gallery = [
  { name: 'foggy harbor at dawn', css: 'linear-gradient(160deg, oklch(0.82 0.06 250), oklch(0.74 0.09 285) 50%, oklch(0.70 0.10 25))' },
  { name: 'coral dusk',           css: 'linear-gradient(145deg, oklch(0.78 0.13 55),  oklch(0.66 0.16 35)  50%, oklch(0.50 0.14 18))' },
  { name: 'jade forest',          css: 'linear-gradient(160deg, oklch(0.82 0.07 140), oklch(0.70 0.09 175) 50%, oklch(0.62 0.10 210))' },
  { name: 'steel & cherry',       css: 'linear-gradient(135deg, oklch(0.88 0.04 210), oklch(0.78 0.08 350) 50%, oklch(0.70 0.10 20))' },
  { name: 'amethyst dusk',        css: 'linear-gradient(155deg, oklch(0.78 0.08 300), oklch(0.68 0.12 295) 50%, oklch(0.52 0.14 265))' },
  { name: 'ember fields',         css: 'linear-gradient(175deg, oklch(0.85 0.05 50),  oklch(0.72 0.11 30)  50%, oklch(0.60 0.13 355))' },
  { name: 'polar night',          css: 'linear-gradient(180deg, oklch(0.60 0.06 240), oklch(0.45 0.08 270) 50%, oklch(0.35 0.06 300))' },
  { name: 'saffron road',         css: 'linear-gradient(150deg, oklch(0.88 0.10 80),  oklch(0.78 0.14 55)  50%, oklch(0.65 0.14 30))' },
];

const stats     = [
  { value: '3',         label: 'gradient modes' },
  { value: 'OKLCH',     label: 'color space' },
  { value: 'CSS · SVG', label: 'export formats' },
];
const companies = ['Vercel', 'Linear', 'Raindrop', 'Craft', 'Pika'];

onMounted(() => {
  const io = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
    }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
});
</script>

<template>
  <div class="lp">
    <!-- Ambient animated backdrop -->
    <div class="lp-backdrop" aria-hidden="true">
      <div class="lp-blob lp-blob--a"></div>
      <div class="lp-blob lp-blob--b"></div>
      <div class="lp-blob lp-blob--c"></div>
    </div>

    <!-- ── Fixed nav ─────────────────────────────────────────────── -->
    <nav class="lp-nav">
      <a href="/" class="lp-nav__brand">
        <span class="lp-nav__mark"></span>
        <span class="lp-nav__name">gradient</span>
      </a>
      <div class="lp-nav__links">
        <a href="/docs"   class="g-nav__link">Docs</a>
        <a href="/docs"   class="g-btn g-btn--ghost g-btn--sm">API</a>
        <a href="/studio" class="g-btn g-btn--solid g-btn--sm">Open Studio</a>
      </div>
    </nav>

    <!-- ── Hero ──────────────────────────────────────────────────── -->
    <section class="lp-hero">
      <div class="lp-hero__inner">

        <!-- Left column -->
        <div class="lp-hero__left">
          <span class="g-badge g-badge--clay reveal">
            <span class="g-badge__dot"></span>
            Gradient Studio
          </span>

          <h1 class="lp-hero__h1 reveal">Every gradient you can describe.</h1>

          <p class="lp-hero__sub reveal">
            Describe a mood, drop in a color, or hit Random. The engine builds a
            perceptually balanced gradient — then hands you the CSS, SVG, or PNG.
          </p>

          <div class="lp-hero__ctas reveal">
            <a href="/studio" class="g-btn g-btn--accent g-btn--lg">Open Studio →</a>
            <a href="/docs"   class="g-btn g-btn--outline g-btn--lg">Read the docs</a>
          </div>

          <div class="lp-stats reveal">
            <template v-for="(s, i) in stats" :key="i">
              <div class="lp-stat">
                <span class="lp-stat__value">{{ s.value }}</span>
                <span class="lp-stat__label">{{ s.label }}</span>
              </div>
              <span v-if="i < stats.length - 1" class="lp-stat__divider"></span>
            </template>
          </div>
        </div>

        <!-- Right column: floating gradient preview card -->
        <div class="lp-hero__right">
          <div class="lp-preview-card" :style="{ background: gradientCss }">
            <div class="lp-preview-card__glass">
              <div class="lp-preview-card__top">
                <span class="g-label lp-preview-card__mode">{{ modeLabel }}</span>
                <button class="lp-regen-btn" @click="regenerate">↻ Regenerate</button>
              </div>
              <pre class="lp-preview-card__code">{{ cssLine }}</pre>
            </div>
          </div>
          <div class="lp-swatches">
            <span
              v-for="(stop, i) in current.stops"
              :key="i"
              class="lp-swatch"
              :style="{ background: stop }"
            ></span>
          </div>
        </div>

      </div>
    </section>

    <!-- ── Trust strip ───────────────────────────────────────────── -->
    <div class="lp-trust reveal">
      <span class="lp-trust__label g-label">Trusted in the stacks at</span>
      <span v-for="co in companies" :key="co" class="lp-trust__co">{{ co }}</span>
    </div>

    <!-- ── How it works ──────────────────────────────────────────── -->
    <section class="lp-section lp-how">
      <div class="lp-section__inner">
        <div class="lp-section__head reveal">
          <span class="g-label lp-how__accentlabel">How it works</span>
          <h2 class="lp-section__title">Three ways to start.</h2>
        </div>
        <div class="lp-how__grid">
          <div v-for="m in modes" :key="m.num" class="g-card lp-how__card reveal">
            <div class="lp-how__card-preview" :style="{ background: m.preview }"></div>
            <div class="g-card__body">
              <div class="lp-how__num">
                <span class="g-badge g-badge--clay">{{ m.num }}</span>
              </div>
              <h3 class="g-card__title">{{ m.title }}</h3>
              <p class="g-card__text">{{ m.body }}</p>
              <code class="lp-how__example">{{ m.example }}</code>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Gallery ───────────────────────────────────────────────── -->
    <section class="lp-section lp-gallery">
      <div class="lp-section__inner">
        <div class="lp-section__head reveal">
          <span class="g-label lp-gallery__accentlabel">Specimen</span>
          <h2 class="lp-section__title">Made this session.</h2>
        </div>
      </div>
      <div class="lp-gallery__grid">
        <div
          v-for="g in gallery"
          :key="g.name"
          class="lp-gallery__item"
          :style="{ background: g.css }"
        >
          <span class="lp-gallery__label">{{ g.name }}</span>
        </div>
      </div>
    </section>

    <!-- ── API teaser ─────────────────────────────────────────────── -->
    <section class="lp-section lp-api reveal">
      <div class="lp-section__inner lp-api__inner">
        <div class="lp-api__left">
          <span class="g-label lp-api__accentlabel">API</span>
          <h2 class="lp-section__title">One call. Any gradient.</h2>
          <p class="lp-api__body">
            Every result from the Studio is available over HTTP. Pass a prompt,
            a color, or a seed — get back CSS, SVG, or PNG.
          </p>
          <a href="/docs" class="g-btn g-btn--outline g-btn--md lp-api__cta">Read the docs →</a>
        </div>
        <div class="lp-api__right">
          <div class="lp-api__code-block">
            <div class="lp-api__code-label">
              <span class="g-label lp-code-dim">GET</span>
              <span class="g-label lp-code-clay">/api/gradient/text</span>
            </div>
            <pre class="lp-api__code"><span class="lp-code-dim">curl</span> https://gradient.app/api/gradient/text \
  <span class="lp-code-dim">-G</span> \
  <span class="lp-code-dim">--data-urlencode</span> <span class="lp-code-clay">"text=foggy harbor at dawn"</span> \
  <span class="lp-code-dim">-d</span> <span class="lp-code-clay">"format=css"</span></pre>
            <div class="lp-api__code-response">
              <span class="g-label lp-code-sage">Response</span>
              <pre class="lp-api__code lp-api__code--resp"><span class="lp-code-dim">"css"</span>: <span class="lp-code-clay">"linear-gradient(160deg, ...)"</span></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CTA band ──────────────────────────────────────────────── -->
    <section class="lp-section lp-cta-band reveal">
      <div class="lp-section__inner">
        <div class="lp-cta-band__card">
          <div class="lp-cta-band__bg"></div>
          <div class="lp-cta-band__overlay"></div>
          <div class="lp-cta-band__content">
            <h2 class="lp-cta-band__title">Start with a word.</h2>
            <p class="lp-cta-band__sub">No sign-up. Type a mood and the gradient appears.</p>
            <div class="lp-cta-band__btns">
              <a href="/studio" class="g-btn g-btn--lg lp-cta-band__btn-primary">Open Studio →</a>
              <a href="/docs"   class="g-btn g-btn--lg lp-cta-band__btn-secondary">Read the docs</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Footer ────────────────────────────────────────────────── -->
    <footer class="lp-footer">
      <div class="lp-section__inner lp-footer__inner">
        <a href="/" class="lp-footer__brand">
          <span class="lp-nav__mark"></span>
          <span class="lp-footer__name">gradient</span>
          <span class="g-label lp-footer__copy">© 2026</span>
        </a>
        <nav class="lp-footer__links">
          <a href="/"         class="g-nav__link">Home</a>
          <a href="/studio"   class="g-nav__link">Studio</a>
          <a href="/docs"     class="g-nav__link">Docs</a>
          <a href="/showcase" class="g-nav__link">Showcase</a>
        </nav>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* ── Scroll-reveal ──────────────────────────────────────────────────── */
.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.55s var(--ease-out), transform 0.55s var(--ease-out);
}
.reveal.revealed { opacity: 1; transform: translateY(0); }

/* ── Root wrapper ───────────────────────────────────────────────────── */
.lp {
  background: var(--paper-bg);
  color: var(--ink-900);
  font-family: var(--font-mono);
  min-height: 100vh;
  overflow-x: clip;
  position: relative;
}

/* ── Ambient backdrop ───────────────────────────────────────────────── */
.lp-backdrop {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.lp-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
}
.lp-blob--a {
  width: 700px; height: 700px;
  top: -200px; left: -100px;
  background: radial-gradient(circle, oklch(0.70 0.075 40 / 0.20) 0%, transparent 70%);
  animation: lp-drift 26s ease-in-out infinite;
}
.lp-blob--b {
  width: 600px; height: 600px;
  top: 40%; right: -150px;
  background: radial-gradient(circle, oklch(0.70 0.070 310 / 0.14) 0%, transparent 70%);
  animation: lp-drift 34s ease-in-out infinite 3s;
}
.lp-blob--c {
  width: 500px; height: 500px;
  bottom: 10%; left: 30%;
  background: radial-gradient(circle, oklch(0.70 0.065 150 / 0.12) 0%, transparent 70%);
  animation: lp-drift 30s ease-in-out infinite 7s;
}
@keyframes lp-drift {
  0%, 100% { transform: translateY(0) scale(1); }
  33%      { transform: translateY(-3%) scale(1.03); }
  66%      { transform: translateY(2%) scale(0.98); }
}

/* ── Nav ────────────────────────────────────────────────────────────── */
.lp-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 18px clamp(20px, 5vw, 64px);
  background: oklch(0.155 0.008 60 / 0.55);
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
  border-bottom: 1px solid var(--paper-line);
}
.lp-nav__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--ink-900);
}
.lp-nav__mark {
  width: 18px; height: 18px;
  border-radius: 4px;
  background: var(--sunrise);
  flex-shrink: 0;
  box-shadow: 0 0 12px oklch(0.815 0.080 45 / 0.50);
}
.lp-nav__name {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 15px;
  letter-spacing: -0.01em;
}
.lp-nav__links {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
}

/* ── Hero ───────────────────────────────────────────────────────────── */
.lp-hero {
  position: relative;
  z-index: 1;
  padding: 0 clamp(20px, 5vw, 64px);
}
.lp-hero__inner {
  max-width: var(--content-max);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 60px;
  align-items: center;
  padding: 160px 0 80px;
}
.lp-hero__left {
  display: flex;
  flex-direction: column;
}
.lp-hero__h1 {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: clamp(40px, 6vw, 64px);
  line-height: var(--leading-tight);
  letter-spacing: -0.02em;
  color: var(--ink-900);
  margin: 20px 0 0;
  text-wrap: balance;
  overflow-wrap: anywhere;
  min-width: 0;
}
.lp-hero__sub {
  font-family: var(--font-sans);
  font-size: clamp(15px, 1.8vw, 18px);
  line-height: var(--leading-body);
  color: var(--ink-500);
  max-width: 44ch;
  margin: 20px 0 0;
}
.lp-hero__ctas {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 32px;
}
.lp-stats {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 44px;
  flex-wrap: wrap;
}
.lp-stat { display: flex; flex-direction: column; gap: 4px; }
.lp-stat__value {
  font-family: var(--font-mono);
  font-size: 20px;
  font-weight: 600;
  color: var(--ink-900);
  letter-spacing: -0.01em;
}
.lp-stat__label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-300);
}
.lp-stat__divider {
  width: 1px;
  height: 32px;
  background: var(--paper-line-strong);
  flex-shrink: 0;
}

/* ── Preview card ───────────────────────────────────────────────────── */
.lp-hero__right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}
.lp-preview-card {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px oklch(0 0 0 / 0.4);
  animation: lp-floaty 7s ease-in-out infinite;
  transition: background 0.6s ease;
}
@keyframes lp-floaty {
  0%, 100% { transform: translateY(0) rotate(-1.5deg); }
  50%       { transform: translateY(-12px) rotate(1.5deg); }
}
.lp-preview-card__glass {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  background: oklch(0 0 0 / 0.25);
  backdrop-filter: blur(4px);
}
.lp-preview-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.lp-preview-card__mode { color: oklch(1 0 0 / 0.75); }
.lp-regen-btn {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: var(--radius-md);
  border: 1px solid oklch(1 0 0 / 0.25);
  background: transparent;
  color: oklch(1 0 0 / 0.75);
  cursor: pointer;
  transition: background 120ms ease, color 120ms ease;
}
.lp-regen-btn:hover {
  background: oklch(1 0 0 / 0.12);
  color: oklch(1 0 0 / 1);
}
.lp-regen-btn:active { transform: translateY(1px); }
.lp-preview-card__code {
  font-family: var(--font-mono);
  font-size: 11px;
  color: oklch(1 0 0 / 0.85);
  white-space: pre;
  line-height: 1.6;
  background: oklch(0 0 0 / 0.30);
  border-radius: 6px;
  padding: 10px 12px;
}
.lp-swatches { display: flex; gap: 8px; }
.lp-swatch {
  width: 28px; height: 28px;
  border-radius: 50%;
  box-shadow: 0 2px 6px oklch(0 0 0 / 0.3);
  transition: background 0.6s ease;
}

/* ── Trust strip ────────────────────────────────────────────────────── */
.lp-trust {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 28px;
  flex-wrap: wrap;
  padding: 20px clamp(20px, 5vw, 64px);
  border-top: 1px solid var(--paper-line);
  border-bottom: 1px solid var(--paper-line);
}
.lp-trust__label { color: var(--ink-300); flex-shrink: 0; }
.lp-trust__co {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 500;
  color: var(--ink-500);
  letter-spacing: 0.02em;
}

/* ── Shared section helpers ─────────────────────────────────────────── */
.lp-section { position: relative; z-index: 1; }
.lp-section__inner {
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 64px);
}
.lp-section__head { margin-bottom: 40px; }
.lp-section__head .g-label { display: block; margin-bottom: 8px; }
.lp-section__title {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: clamp(28px, 4vw, 40px);
  letter-spacing: -0.015em;
  line-height: var(--leading-tight);
  color: var(--ink-900);
  margin: 0;
  overflow-wrap: anywhere;
  min-width: 0;
}

/* ── How it works ───────────────────────────────────────────────────── */
.lp-how { padding: clamp(80px, 12vh, 120px) 0; }
.lp-how__accentlabel { color: var(--clay); }
.lp-how__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
.lp-how__card-preview { height: 120px; width: 100%; }
.lp-how__num { margin-bottom: 12px; }
.lp-how__example {
  display: block;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--clay);
  background: var(--clay-tint);
  border-radius: 4px;
  padding: 6px 10px;
  margin-top: 12px;
  letter-spacing: 0.02em;
}

/* ── Gallery ────────────────────────────────────────────────────────── */
.lp-gallery { padding: clamp(80px, 12vh, 120px) 0; }
.lp-gallery__accentlabel { color: var(--lilac); }
.lp-gallery__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  margin-top: 36px;
}
.lp-gallery__item {
  aspect-ratio: 1 / 1.15;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
}
.lp-gallery__label {
  position: absolute;
  left: 10px; bottom: 9px;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: oklch(1 0 0 / 0.85);
  text-shadow: 0 1px 4px oklch(0 0 0 / 0.4);
}

/* ── API teaser ─────────────────────────────────────────────────────── */
.lp-api { padding: clamp(80px, 12vh, 120px) 0; }
.lp-api__accentlabel { color: var(--sky); }
.lp-api__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 60px;
  align-items: start;
}
.lp-api__left {
  display: flex;
  flex-direction: column;
}
.lp-api__left .g-label { margin-bottom: 10px; }
.lp-api__body {
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: var(--leading-body);
  color: var(--ink-500);
  margin-top: 16px;
  max-width: 38ch;
}
.lp-api__cta { margin-top: 28px; }
.lp-api__right { padding-top: 24px; }
.lp-api__code-block {
  background: var(--paper-raised);
  border: 1px solid var(--paper-line);
  border-radius: 8px;
  overflow: hidden;
}
.lp-api__code-label {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--paper-line);
}
.lp-api__code {
  display: block;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.7;
  padding: 14px;
  color: var(--ink-700);
  white-space: pre;
  overflow-x: auto;
  margin: 0;
}
.lp-api__code--resp { margin-top: 8px; }
.lp-api__code-response {
  padding: 12px 14px;
  border-top: 1px solid var(--paper-line);
}
.lp-code-dim  { color: var(--ink-300); }
.lp-code-clay { color: var(--clay); }
.lp-code-sage { color: var(--sage); }

/* ── CTA band ───────────────────────────────────────────────────────── */
.lp-cta-band { padding: clamp(80px, 12vh, 120px) 0; }
.lp-cta-band__card {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  padding: clamp(60px, 10vh, 96px) clamp(32px, 6vw, 80px);
  text-align: center;
}
.lp-cta-band__bg {
  position: absolute;
  inset: 0;
  background: var(--sunrise);
}
.lp-cta-band__overlay {
  position: absolute;
  inset: 0;
  background: oklch(0.155 0.008 60 / 0.25);
}
.lp-cta-band__content { position: relative; }
.lp-cta-band__title {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: clamp(32px, 5vw, 56px);
  letter-spacing: -0.02em;
  line-height: var(--leading-tight);
  color: oklch(0.16 0.01 60);
  margin: 0;
  overflow-wrap: anywhere;
  min-width: 0;
}
.lp-cta-band__sub {
  font-family: var(--font-sans);
  font-size: 17px;
  color: oklch(0.16 0.01 60 / 0.80);
  max-width: 40ch;
  margin: 18px auto 0;
  line-height: var(--leading-body);
}
.lp-cta-band__btns {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 32px;
}
.lp-cta-band__btn-primary {
  background: oklch(0.16 0.01 60);
  color: oklch(0.97 0.004 80);
  border-color: transparent;
}
.lp-cta-band__btn-primary:hover { background: oklch(0.22 0.01 60); }
.lp-cta-band__btn-secondary {
  background: transparent;
  border-color: oklch(0.16 0.01 60 / 0.5);
  color: oklch(0.16 0.01 60);
}
.lp-cta-band__btn-secondary:hover { background: oklch(0.16 0.01 60 / 0.10); }

/* ── Footer ─────────────────────────────────────────────────────────── */
.lp-footer {
  border-top: 1px solid var(--paper-line);
  position: relative;
  z-index: 1;
}
.lp-footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  padding-top: 36px;
  padding-bottom: 52px;
}
.lp-footer__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--ink-900);
}
.lp-footer__name {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 15px;
}
.lp-footer__copy { color: var(--ink-300); }
.lp-footer__links {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
}

/* ── Mobile ─────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .lp-nav { padding: 14px clamp(16px, 4vw, 24px); gap: 12px; }
  .lp-nav__links .g-btn { display: none; }
  .lp-nav__links :last-child { display: inline-flex; }

  .lp-hero__inner {
    grid-template-columns: 1fr;
    padding: 120px 0 60px;
    gap: 40px;
  }
  .lp-hero__h1 { font-size: clamp(32px, 8vw, 48px); }
  .lp-hero__sub { max-width: none; }

  .lp-how__grid { grid-template-columns: 1fr; }
  .lp-gallery__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }

  .lp-api__inner { grid-template-columns: 1fr; gap: 32px; }
  .lp-api__body { max-width: none; }
  .lp-api__right { padding-top: 0; }

  .lp-footer__inner { flex-direction: column; align-items: flex-start; }
  .lp-trust { gap: 16px; }
  .lp-stats { gap: 16px; }
}

@media (max-width: 480px) {
  .lp-hero__ctas { flex-direction: column; }
  .lp-hero__ctas .g-btn { width: 100%; justify-content: center; }
  .lp-cta-band__btns { flex-direction: column; align-items: center; }
  .lp-gallery__grid { gap: 4px; }
}
</style>
