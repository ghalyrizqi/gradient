<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useGradient } from './composables/useGradient';
import Controls, { type ControlState } from './components/Controls.vue';
import WindowView from './components/WindowView.vue';
import FrontPageView from './components/FrontPageView.vue';
import PhoneWallpaperView from './components/PhoneWallpaperView.vue';

const { state, loading, resolve } = useGradient();
const displayMode = ref<'window' | 'frontpage' | 'phone'>('window');

interface ControlsExpose { updateColor: (hex: string) => void }
const controlsRef = ref<ControlsExpose | null>(null);

// Initialised to Controls.vue defaults — keeps view/mode switches from looking like changes.
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
      mode:        'custom',
      customStops: controls.customStops,
      styleOverride: controls.style,
      composition: controls.composition,
    });
  } else if (controls.inputMode === 'text' && q.length > 0) {
    await resolve({ mode: 'text', text: q, styleOverride: controls.style });
  } else {
    // Color mode, OR text mode with no query (style-only change falls through here).
    await resolve({
      mode: 'color',
      color: controls.color,
      styleOverride: controls.style,
      shuffleSeed: controls.shuffleSeed,
    });
    // Feed the gradient's zenith color back to the swatch and keep _prev in sync
    // so the feedback update doesn't look like a new color change on the next emit.
    const hex = state.paletteHex;
    if (hex) {
      await nextTick();
      controlsRef.value?.updateColor(hex);
      _prev.color = hex;
    }
  }
}
</script>

<template>
  <div class="studio" :class="{ 'studio--frontpage': displayMode === 'frontpage' }">

    <!-- Left: sky canvas -->
    <div class="studio-canvas" :class="{ 'studio-canvas--loading': loading }">
      <WindowView v-if="displayMode === 'window'" :state="state" />
      <FrontPageView v-else-if="displayMode === 'frontpage'" :state="state" />
      <PhoneWallpaperView v-else :state="state" />
    </div>

    <!-- Right: instrument panel -->
    <aside class="studio-panel">
      <header class="panel-head">
        <span class="panel-wordmark">Small Window</span>
        <span v-if="loading" class="panel-busy" aria-live="polite" aria-label="loading">·</span>
      </header>
      <Controls ref="controlsRef" @change="onControlChange" />
    </aside>

  </div>
</template>

<style scoped>
/* ── Split Studio layout ─────────────────────────────────────────────
   Canvas pane (left, flexible) + instrument panel (right, fixed).
   The canvas is the primary surface; the panel serves it.           */
.studio {
  display: grid;
  grid-template-columns: 1fr minmax(320px, 380px);
  min-height: 100vh;
  background:
    linear-gradient(120deg, var(--color-paper), var(--color-paper-2));
}

/* ── Canvas pane ─────────────────────────────────────────────────── */
.studio-canvas {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--s5);
  min-height: 100vh;
  transition: opacity 0.25s var(--ease-out);
}

.studio-canvas--loading { opacity: 0.45; pointer-events: none; }

/* Front page mode: canvas fills edge-to-edge (no centering padding) */
.studio--frontpage .studio-canvas {
  padding: 0;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
}

/* ── Instrument panel ────────────────────────────────────────────── */
.studio-panel {
  margin: var(--s4) var(--s4) var(--s4) 0;
  background: var(--color-panel-glass);
  border: 1px solid var(--color-glass-rule);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-panel);
  backdrop-filter: blur(26px) saturate(140%);
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - var(--s6));
  max-height: calc(100vh - var(--s6));
  overflow-y: auto;
}

.panel-head {
  display: flex;
  align-items: center;
  gap: var(--s3);
  padding: var(--s4) var(--s5);
  border-bottom: 1px solid var(--color-glass-rule);
  flex-shrink: 0;
}

.panel-wordmark {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 400;
  letter-spacing: 0;
  text-transform: uppercase;
  color: var(--color-ink-2);
  user-select: none;
}

.panel-busy {
  font-family: var(--font-ui);
  font-size: var(--text-md);
  color: var(--color-accent);
  line-height: 1;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

/* ── Mobile: single column ───────────────────────────────────────── */
@media (max-width: 768px) {
  .studio {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
  .studio-canvas {
    min-height: 55vw;
    padding: var(--s4);
  }
  .studio-panel {
    margin: 0;
    border-left: none;
    border-right: none;
    border-bottom: none;
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    min-height: auto;
    max-height: none;
  }
}
</style>
