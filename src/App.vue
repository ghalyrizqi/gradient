<!-- Handoff: studio.dc.html · dark warm paper · IBM Plex Mono · top bar + split canvas -->
<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useGradient } from './composables/useGradient';
import Controls, { type ControlState } from './components/Controls.vue';
import WindowView from './components/WindowView.vue';
import PhoneWallpaperView from './components/PhoneWallpaperView.vue';

const { state, loading, resolve } = useGradient();
const displayMode = ref<'window' | 'phone'>('window');

interface ControlsExpose { updateColor: (hex: string) => void; randomize: () => void }
const controlsRef = ref<ControlsExpose | null>(null);

let _prev = {
  inputMode:   'color' as string,
  query:       '',
  color:       '#3a6ea5',
  style:       'vivid',
  shuffleSeed: 0,
  customStops: ['#2D4B8E', '#D97C5A', '#F5C06E'] as string[],
  composition: 'standard' as string,
};

function gradientInputChanged(c: ControlState): boolean {
  return (
    _prev.inputMode   !== c.inputMode   ||
    _prev.query       !== c.query       ||
    _prev.color       !== c.color       ||
    _prev.style       !== c.style       ||
    _prev.shuffleSeed !== c.shuffleSeed ||
    _prev.composition !== c.composition ||
    JSON.stringify(_prev.customStops) !== JSON.stringify(c.customStops)
  );
}

async function onControlChange(controls: ControlState) {
  displayMode.value = controls.displayMode;

  if (!gradientInputChanged(controls)) return;
  _prev = {
    inputMode:   controls.inputMode,
    query:       controls.query,
    color:       controls.color,
    style:       controls.style,
    shuffleSeed: controls.shuffleSeed,
    customStops: [...controls.customStops],
    composition: controls.composition,
  };

  const q = controls.query.trim();

  if (controls.inputMode === 'custom') {
    await resolve({
      mode:          'custom',
      customStops:   controls.customStops,
      styleOverride: controls.style,
      composition:   controls.composition,
    });
  } else if (controls.inputMode === 'text' && q.length > 0) {
    await resolve({ mode: 'text', text: q, styleOverride: controls.style });
  } else {
    await resolve({
      mode:          'color',
      color:         controls.color,
      styleOverride: controls.style,
      shuffleSeed:   controls.shuffleSeed,
    });
    const hex = state.paletteHex;
    if (hex) {
      await nextTick();
      controlsRef.value?.updateColor(hex);
      _prev.color = hex;
    }
  }
}

function handleRandom() {
  controlsRef.value?.randomize();
}
</script>

<template>
  <div class="studio">

    <!-- Top bar -->
    <header class="studio-topbar">
      <a href="/" class="studio-topbar__brand">
        <span class="studio-topbar__mark"></span>
        <span class="studio-topbar__name">gradient</span>
      </a>
      <span class="g-label studio-topbar__page">Studio</span>
      <div class="studio-topbar__actions">
        <span v-if="loading" class="studio-topbar__busy" aria-live="polite" aria-label="loading">·</span>
        <a href="/docs"  class="g-btn g-btn--ghost g-btn--sm">API</a>
        <button class="g-btn g-btn--outline g-btn--sm" @click="handleRandom">↻ Random</button>
      </div>
    </header>

    <!-- Main split: canvas + panel -->
    <div class="studio-body">

      <!-- Left: gradient canvas -->
      <div class="studio-canvas" :class="{ 'studio-canvas--loading': loading }">
        <WindowView       v-if="displayMode === 'window'" :state="state" />
        <PhoneWallpaperView v-else                          :state="state" />
      </div>

      <!-- Right: instrument panel -->
      <aside class="studio-panel">
        <Controls ref="controlsRef" @change="onControlChange" />
      </aside>

    </div>
  </div>
</template>

<style scoped>
/* ── Studio wrapper ──────────────────────────────────────────────────── */
.studio {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--paper-bg);
  overflow: hidden;
}

/* ── Top bar ─────────────────────────────────────────────────────────── */
.studio-topbar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 clamp(16px, 3vw, 28px);
  height: 52px;
  border-bottom: 1px solid var(--paper-line);
  background: var(--paper-raised);
  flex-shrink: 0;
}
.studio-topbar__brand {
  display: flex;
  align-items: center;
  gap: 9px;
  text-decoration: none;
  color: var(--ink-900);
  flex-shrink: 0;
}
.studio-topbar__mark {
  width: 16px; height: 16px;
  border-radius: 3px;
  background: var(--sunrise);
  flex-shrink: 0;
}
.studio-topbar__name {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 14px;
  letter-spacing: -0.01em;
}
.studio-topbar__page {
  color: var(--ink-300);
  flex-shrink: 0;
}
.studio-topbar__actions {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
}
.studio-topbar__busy {
  font-family: var(--font-mono);
  font-size: 18px;
  color: var(--clay);
  line-height: 1;
  animation: topbar-blink 1s step-end infinite;
}
@keyframes topbar-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

/* ── Body split ──────────────────────────────────────────────────────── */
.studio-body {
  display: grid;
  grid-template-columns: 1fr minmax(320px, 360px);
  flex: 1;
  overflow: hidden;
}

/* ── Canvas pane ─────────────────────────────────────────────────────── */
.studio-canvas {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-5);
  background:
    radial-gradient(ellipse 70% 60% at 8% 88%, oklch(0.70 0.075 40 / 0.10) 0%, transparent 52%),
    radial-gradient(ellipse 55% 48% at 88% 12%, oklch(0.70 0.065 150 / 0.08) 0%, transparent 48%),
    var(--paper-bg);
  overflow: hidden;
  transition: opacity 0.25s var(--ease-out);
}
.studio-canvas--loading { opacity: 0.45; pointer-events: none; }

/* ── Instrument panel ────────────────────────────────────────────────── */
.studio-panel {
  border-left: 1px solid var(--paper-line);
  background: var(--paper-sunken);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

/* ── Mobile ──────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .studio {
    height: auto;
    min-height: 100vh;
    overflow: auto;
  }
  .studio-body {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    overflow: visible;
  }
  .studio-canvas {
    min-height: 55vw;
    padding: var(--space-4);
  }
  .studio-panel {
    border-left: none;
    border-top: 1px solid var(--paper-line);
    overflow-y: visible;
  }
  .studio-topbar__actions .g-btn--outline { display: none; }
}
</style>
