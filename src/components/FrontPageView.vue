<script setup lang="ts">
import { ref, computed } from 'vue';
import type { GradientState } from '../core/types';
import GradientCanvas from './GradientCanvas.vue';
// html-to-image is added in package.json; imported lazily below
const props = defineProps<{ state: GradientState }>();

const masthead = ref('THE MORNING SKY');
const pageRef = ref<HTMLElement | null>(null);

const dateStr = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  }).toUpperCase();
});

const cityStr = computed(() => {
  if (props.state.source.startsWith('weather:')) {
    return props.state.source.replace('weather:', '').toUpperCase();
  }
  return '';
});

async function exportPage() {
  if (!pageRef.value) return;
  const { toPng } = await import('html-to-image');
  const dataUrl = await toPng(pageRef.value, { pixelRatio: 2 });
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = 'morning-sky.png';
  a.click();
}

const loremCol = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`;
</script>

<template>
  <div class="fp-wrapper">
    <div ref="pageRef" class="front-page">
      <!-- Masthead header row -->
      <div class="fp-header-row">
        <span class="fp-meta fp-meta--left">VOL. I · NO. 1</span>
        <span class="fp-meta fp-meta--right">SINGLE COPY — COMPLIMENTARY</span>
      </div>
      <hr class="fp-rule fp-rule--heavy" />

      <!-- Masthead -->
      <div class="fp-masthead-wrap">
        <input
          v-model="masthead"
          class="fp-masthead"
          aria-label="Masthead title"
          spellcheck="false"
          maxlength="40"
        />
      </div>
      <hr class="fp-rule fp-rule--heavy" />

      <!-- Dateline -->
      <div class="fp-dateline">
        <span>{{ dateStr }}</span>
        <span v-if="cityStr"> · {{ cityStr }}</span>
        <span> · {{ state.label.toUpperCase() }}</span>
      </div>
      <hr class="fp-rule fp-rule--thin" />

      <!-- Lead art -->
      <div class="fp-lead-art">
        <GradientCanvas :state="state" class="fp-canvas" />
      </div>

      <!-- Caption -->
      <p class="fp-caption">
        {{ state.label.charAt(0).toUpperCase() + state.label.slice(1) }},
        {{ new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }}.
        <em class="fp-credit">Sky rendering · Small Window</em>
      </p>
      <hr class="fp-rule fp-rule--thin" />

      <!-- Greeked columns -->
      <div class="fp-columns">
        <div class="fp-column">
          <p class="fp-column-head">Dispatches from the horizon</p>
          <p class="fp-body">{{ loremCol }}</p>
        </div>
        <div class="fp-column">
          <p class="fp-body">{{ loremCol }}</p>
        </div>
        <div class="fp-column">
          <p class="fp-body">{{ loremCol }}</p>
        </div>
      </div>
    </div>

    <button class="fp-export-btn" @click="exportPage" aria-label="Export as PNG">
      Export Edition
    </button>
  </div>
</template>

<style scoped>
/* ── Front page view — nuevo.tokyo + newspaper ────────────────────
   The newspaper card now floats on warm paper with a hairline border.
   No heavy shadow — the white card separates itself from the near-white
   page by a single border rule, not elevation. */
.fp-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--s7) var(--s6) var(--s6);
  gap: var(--s4);
  background: transparent;
}

.front-page {
  width: 100%;
  max-width: 780px;
  background: oklch(0.997 0.002 80);  /* slightly brighter than page — the card */
  color: oklch(0.12 0.010 60);
  padding: var(--s7);
  border: 1px solid var(--color-rule);
}

.fp-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--s3);
}

.fp-meta {
  font-family: var(--font-ui);
  font-size: 9px;
  font-weight: 400;
  letter-spacing: 0;
  text-transform: uppercase;
  color: oklch(0.45 0.008 60);
}

.fp-rule {
  border: none;
  margin: 0;
}
.fp-rule--heavy { border-top: 1.5px solid oklch(0.12 0.010 60); }
.fp-rule--thin  { border-top: 1px solid oklch(0.82 0.005 80); }

.fp-masthead-wrap {
  display: flex;
  justify-content: center;
  padding: var(--s5) 0;
}

.fp-masthead {
  font-family: var(--font-serif);
  font-size: clamp(var(--text-2xl), 6vw, var(--text-5xl));
  font-weight: 400;
  font-style: normal;
  letter-spacing: 0;
  text-align: center;
  color: oklch(0.12 0.010 60);
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  cursor: text;
}
.fp-masthead:focus-visible {
  outline: 1.5px dashed oklch(0.56 0.009 60);
  outline-offset: 4px;
}

.fp-dateline {
  font-family: var(--font-ui);
  font-size: 9px;
  font-weight: 400;
  letter-spacing: 0;
  text-transform: uppercase;
  color: oklch(0.45 0.008 60);
  text-align: center;
  padding: var(--s2) 0;
}

.fp-lead-art {
  margin: var(--s5) 0 0;
  width: 100%;
  aspect-ratio: 3/1.4;
  overflow: hidden;
  border: 1px solid oklch(0.88 0.005 80);
}

.fp-canvas {
  width: 100%;
  height: 100%;
}

.fp-caption {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 300;
  font-style: normal;
  color: oklch(0.56 0.009 60);
  margin: var(--s3) 0 var(--s4);
  line-height: 1.5;
}

.fp-credit {
  margin-left: var(--s3);
  opacity: 0.55;
}

.fp-columns {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0;
  border-top: 1px solid oklch(0.82 0.005 80);
}

.fp-column {
  padding: var(--s4);
  border-right: 1px solid oklch(0.88 0.005 80);
}
.fp-column:last-child { border-right: none; }

.fp-column-head {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 500;
  font-style: normal;
  letter-spacing: 0;
  text-transform: uppercase;
  color: oklch(0.12 0.010 60);
  margin-bottom: var(--s3);
  line-height: 1.3;
}

.fp-body {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 300;
  color: oklch(0.36 0.010 60);
  line-height: 1.65;
  white-space: pre-line;
}

.fp-export-btn {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 400;
  letter-spacing: 0;
  text-transform: uppercase;
  color: var(--color-ink-3);
  background: transparent;
  border: none;
  padding: var(--s2) 0;
  cursor: pointer;
  transition: color 120ms ease;
  align-self: flex-end;
}
.fp-export-btn::before { content: '↓ '; }
.fp-export-btn:hover   { color: var(--color-ink); }
.fp-export-btn:focus-visible {
  outline: 1.5px solid var(--color-focus);
  outline-offset: 3px;
}

@media (max-width: 600px) {
  .fp-wrapper  { padding: var(--s5) var(--s4) var(--s5); }
  .front-page  { padding: var(--s5) var(--s4); }
  .fp-columns  { grid-template-columns: 1fr; }
  .fp-column   { border-right: none; border-bottom: 1px solid oklch(0.88 0.005 80); }
}
</style>
