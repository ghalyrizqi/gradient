<!-- Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 -->
<!-- Handoff: marketing.dc.html · editorial showcase · dark warm paper · IBM Plex Mono -->
<script setup lang="ts">
import { onMounted } from 'vue';

const sections = [
  {
    num: '01', title: 'The midpoint is everything',
    body: 'Pick two colors and let the browser interpolate, and you often get a dead grey band in the middle — the colors cancel as they cross through an unsaturated zone. The fix is to interpolate in a perceptual space and, where needed, route the path around the grey. That single decision is the difference between a gradient that glows and one that sags.',
    pull: "Most \"bad\" gradients aren't bad colors. They're a bad path between good ones.",
  },
  {
    num: '02', title: 'Three ways to begin',
    body: 'A color is a confident start — you know the brand red, you want a ramp around it. A word is a looser, faster start — "foggy harbor at dawn" carries a palette already, you just need it extracted. And random is for when you want to be surprised inside guardrails: harmonious hues, even lightness, no neon soup. Same engine underneath; three doors in.',
    pull: '',
  },
  {
    num: '03', title: 'Built to leave the building',
    body: 'A gradient that only lives in a design tool is half-finished. Every result exports as CSS you can paste, an SVG that scales, or a flat PNG for slides and sprites — and the same recipe is one API call away, so production matches the mockup exactly.',
    pull: '',
  },
];

const specimens = [
  { name: 'aurora',  css: 'linear-gradient(150deg, oklch(0.80 0.12 150), oklch(0.70 0.12 280))' },
  { name: 'ember',   css: 'linear-gradient(155deg, oklch(0.82 0.12 70),  oklch(0.62 0.16 25))' },
  { name: 'tide',    css: 'linear-gradient(165deg, oklch(0.82 0.07 220), oklch(0.60 0.11 250))' },
  { name: 'orchid',  css: 'linear-gradient(140deg, oklch(0.80 0.10 330), oklch(0.66 0.13 295))' },
  { name: 'moss',    css: 'linear-gradient(160deg, oklch(0.82 0.09 140), oklch(0.58 0.10 165))' },
  { name: 'dusk',    css: 'linear-gradient(150deg, oklch(0.74 0.10 30),  oklch(0.55 0.12 305))' },
  { name: 'glacier', css: 'linear-gradient(170deg, oklch(0.88 0.05 200), oklch(0.66 0.09 230))' },
  { name: 'saffron', css: 'linear-gradient(150deg, oklch(0.88 0.10 90),  oklch(0.70 0.16 50))' },
  { name: 'plum',    css: 'linear-gradient(145deg, oklch(0.72 0.12 350), oklch(0.50 0.12 320))' },
  { name: 'reef',    css: 'linear-gradient(160deg, oklch(0.82 0.10 190), oklch(0.64 0.12 165))' },
  { name: 'clay',    css: 'linear-gradient(150deg, oklch(0.80 0.10 60),  oklch(0.58 0.13 35))' },
  { name: 'ink',     css: 'linear-gradient(165deg, oklch(0.70 0.08 250), oklch(0.40 0.09 275))' },
];

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
  <div class="mk">
    <!-- Minimal nav -->
    <nav class="mk-nav">
      <a href="/" class="mk-nav__brand">
        <span class="mk-nav__mark"></span>
        <span class="mk-nav__name">gradient</span>
      </a>
      <span class="g-label mk-nav__page">Showcase</span>
      <div class="mk-nav__links">
        <a href="/docs"   class="g-nav__link">Docs</a>
        <a href="/studio" class="g-btn g-btn--solid g-btn--sm mk-nav__cta">Open Studio</a>
      </div>
    </nav>

    <!-- Cover -->
    <header class="mk-cover">
      <div class="mk-cover__bg"></div>
      <div class="mk-cover__overlay"></div>
      <div class="mk-cover__inner">
        <span class="g-label mk-cover__kicker">Field notes · issue 01</span>
        <h1 class="mk-cover__title">The quiet craft of a good gradient.</h1>
        <p class="mk-cover__lede">
          A gradient is two colors and everything they decide on the way between.
          We built a studio that gets the in-between right — perceptually even,
          never muddy. This is how, and why it matters.
        </p>
        <div class="mk-cover__meta">
          <span>6 min read</span><span>·</span><span>Studio Kuro</span><span>·</span><span>June 2026</span>
        </div>
      </div>
      <div class="mk-cover__scroll">Scroll ↓</div>
    </header>

    <!-- Editorial sections -->
    <article class="mk-article">
      <section v-for="s in sections" :key="s.num" class="mk-article__section reveal">
        <div class="mk-article__heading">
          <span class="mk-article__num">{{ s.num }}</span>
          <h2 class="mk-article__title">{{ s.title }}</h2>
        </div>
        <p class="mk-article__body">{{ s.body }}</p>
        <p v-if="s.pull" class="mk-article__pull">{{ s.pull }}</p>
      </section>
    </article>

    <!-- Specimen gallery -->
    <section class="mk-specimen reveal">
      <div class="mk-specimen__head">
        <span class="g-label mk-specimen__label">Specimen</span>
        <h2 class="mk-specimen__title">Twelve made this morning.</h2>
      </div>
      <div class="mk-specimen__grid">
        <div
          v-for="g in specimens"
          :key="g.name"
          class="mk-specimen__item"
          :style="{ background: g.css }"
        >
          <span class="mk-specimen__name">{{ g.name }}</span>
        </div>
      </div>
    </section>

    <!-- Pull quote -->
    <section class="mk-quote reveal">
      <p class="mk-quote__text">
        "It stopped being a thing I fiddled with for twenty minutes. I type a
        mood; it gives me a gradient I'd have built by hand — and I move on."
      </p>
      <div class="mk-quote__attr">— Mira Tanaka · Art Director, Halcyon</div>
    </section>

    <!-- Closing CTA -->
    <section class="mk-cta reveal">
      <div class="mk-cta__bg"></div>
      <div class="mk-cta__overlay"></div>
      <div class="mk-cta__content">
        <h2 class="mk-cta__title">Make one yourself.</h2>
        <p class="mk-cta__sub">No account needed to start. Type a word and watch it become a gradient.</p>
        <div class="mk-cta__btns">
          <a href="/studio" class="g-btn g-btn--lg mk-cta__btn-primary">Open Studio →</a>
          <a href="/docs"   class="g-btn g-btn--lg mk-cta__btn-secondary">Read the docs</a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="mk-footer">
      <a href="/" class="mk-footer__brand">
        <span class="mk-nav__mark"></span>
        <span class="mk-footer__name">gradient</span>
        <span class="g-label mk-footer__copy">© 2026</span>
      </a>
      <nav class="mk-footer__links">
        <a href="/"       class="g-nav__link">Home</a>
        <a href="/studio" class="g-nav__link">Studio</a>
        <a href="/docs"   class="g-nav__link">Docs</a>
      </nav>
    </footer>
  </div>
</template>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.55s var(--ease-out), transform 0.55s var(--ease-out);
}
.reveal.revealed { opacity: 1; transform: translateY(0); }

.mk {
  background: oklch(0.135 0.008 60);
  color: var(--ink-900);
  font-family: var(--font-mono);
  min-height: 100vh;
  overflow-x: clip;
}
.mk ::selection { background: oklch(0.70 0.085 25 / 0.35); }

/* ── Nav ────────────────────────────────────────────────────────────── */
.mk-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 18px clamp(20px, 5vw, 64px);
  background: oklch(0.135 0.008 60 / 0.5);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--paper-line);
}
.mk-nav__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--ink-900);
}
.mk-nav__mark {
  width: 18px; height: 18px;
  border-radius: 4px;
  background: var(--sunrise);
  flex-shrink: 0;
}
.mk-nav__name { font-family: var(--font-mono); font-weight: 600; font-size: 15px; }
.mk-nav__page { color: var(--ink-300); }
.mk-nav__links { display: flex; align-items: center; gap: 6px; margin-left: auto; }

/* ── Cover ──────────────────────────────────────────────────────────── */
.mk-cover {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 clamp(20px, 5vw, 64px) clamp(48px, 8vh, 96px);
  position: relative;
  overflow: hidden;
}
.mk-cover__bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(165deg, oklch(0.74 0.12 25), oklch(0.62 0.14 330) 45%, oklch(0.50 0.12 270));
  opacity: 0.92;
}
.mk-cover__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, oklch(0.135 0.008 60 / 0.1), oklch(0.135 0.008 60 / 0.85));
}
.mk-cover__inner {
  position: relative;
  max-width: var(--content-max);
  margin: 0 auto;
  width: 100%;
}
.mk-cover__kicker { color: oklch(1 0 0 / 0.85); }
.mk-cover__title {
  font-family: var(--font-mono);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.04;
  font-size: clamp(48px, 9vw, 104px);
  margin: 18px 0 0;
  max-width: 14ch;
  text-wrap: balance;
  overflow-wrap: anywhere;
  min-width: 0;
  color: var(--ink-900);
}
.mk-cover__lede {
  font-family: var(--font-sans);
  font-size: 19px;
  line-height: 1.7;
  max-width: 54ch;
  margin: 28px 0 0;
  color: oklch(1 0 0 / 0.92);
}
.mk-cover__meta {
  display: flex;
  gap: 24px;
  margin-top: 36px;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: oklch(1 0 0 / 0.7);
}
.mk-cover__scroll {
  position: absolute;
  bottom: 32px; left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: oklch(1 0 0 / 0.6);
}

/* ── Article ────────────────────────────────────────────────────────── */
.mk-article {
  max-width: 760px;
  margin: 0 auto;
  padding: clamp(64px, 12vh, 120px) clamp(20px, 5vw, 32px) 0;
}
.mk-article__section { margin-bottom: clamp(72px, 12vh, 120px); }
.mk-article__heading {
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 20px;
}
.mk-article__num {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 600;
  color: var(--clay);
}
.mk-article__title {
  font-family: var(--font-mono);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.1;
  font-size: clamp(28px, 4.5vw, 40px);
  margin: 0;
  overflow-wrap: anywhere;
  min-width: 0;
}
.mk-article__body {
  font-family: var(--font-sans);
  font-size: 19px;
  line-height: 1.7;
  color: var(--ink-700);
}
.mk-article__pull {
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: clamp(20px, 3vw, 26px);
  line-height: 1.4;
  color: var(--ink-900);
  border-left: 2px solid var(--clay);
  padding-left: 24px;
  margin: 36px 0 0;
}

/* ── Specimen gallery ───────────────────────────────────────────────── */
.mk-specimen { padding: clamp(40px, 8vh, 80px) 0; }
.mk-specimen__head {
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 32px);
}
.mk-specimen__label { color: var(--lilac); }
.mk-specimen__title {
  font-family: var(--font-mono);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.1;
  font-size: clamp(28px, 4.5vw, 40px);
  margin: 12px 0 0;
  overflow-wrap: anywhere;
  min-width: 0;
}
.mk-specimen__grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 2px;
  margin-top: 36px;
}
.mk-specimen__item {
  aspect-ratio: 1;
  position: relative;
  overflow: hidden;
}
.mk-specimen__name {
  position: absolute;
  left: 8px; bottom: 7px;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: oklch(1 0 0 / 0.85);
  text-shadow: 0 1px 4px oklch(0 0 0 / 0.4);
}

/* ── Quote ──────────────────────────────────────────────────────────── */
.mk-quote {
  max-width: 880px;
  margin: 0 auto;
  padding: clamp(64px, 12vh, 120px) clamp(20px, 5vw, 32px);
  text-align: center;
}
.mk-quote__text {
  font-family: var(--font-mono);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.3;
  font-size: clamp(28px, 4.5vw, 44px);
  margin: 0;
  overflow-wrap: anywhere;
}
.mk-quote__attr {
  margin-top: 28px;
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.04em;
  color: var(--ink-500);
}

/* ── Closing CTA ────────────────────────────────────────────────────── */
.mk-cta {
  position: relative;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px clamp(20px, 5vw, 32px);
  overflow: hidden;
}
.mk-cta__bg { position: absolute; inset: 0; background: var(--sunrise); opacity: 0.95; }
.mk-cta__overlay { position: absolute; inset: 0; background: oklch(0.135 0.008 60 / 0.4); }
.mk-cta__content { position: relative; }
.mk-cta__title {
  font-family: var(--font-mono);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.1;
  font-size: clamp(36px, 6vw, 68px);
  margin: 0;
  color: oklch(0.16 0.01 60);
  overflow-wrap: anywhere;
  min-width: 0;
}
.mk-cta__sub {
  font-family: var(--font-sans);
  font-size: 17px;
  color: oklch(0.16 0.01 60 / 0.85);
  max-width: 40ch;
  margin: 20px auto 0;
  line-height: 1.6;
}
.mk-cta__btns {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 32px;
  flex-wrap: wrap;
}
.mk-cta__btn-primary {
  background: oklch(0.16 0.01 60);
  color: oklch(0.97 0.004 80);
  border-color: transparent;
}
.mk-cta__btn-primary:hover { background: oklch(0.22 0.01 60); }
.mk-cta__btn-secondary {
  background: transparent;
  border-color: oklch(0.16 0.01 60 / 0.5);
  color: oklch(0.16 0.01 60);
}
.mk-cta__btn-secondary:hover { background: oklch(0.16 0.01 60 / 0.10); }

/* ── Footer ─────────────────────────────────────────────────────────── */
.mk-footer {
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 40px clamp(20px, 5vw, 32px) 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  border-top: 1px solid var(--paper-line);
}
.mk-footer__brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: var(--ink-900);
}
.mk-footer__name { font-family: var(--font-mono); font-weight: 600; }
.mk-footer__copy { margin-left: 8px; }
.mk-footer__links { display: flex; gap: 6px; flex-wrap: wrap; }

/* ── Mobile ─────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .mk-nav { padding: 14px clamp(16px, 4vw, 24px); gap: 12px; }
  .mk-specimen__grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .mk-cover__meta { flex-wrap: wrap; gap: 10px; }
}
@media (max-width: 480px) {
  .mk-specimen__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .mk-cta__btns { flex-direction: column; align-items: center; }
}
</style>
