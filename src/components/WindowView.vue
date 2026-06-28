<script setup lang="ts">
import { ref } from 'vue';
import type { GradientState } from '../core/types';
import GradientCanvas from './GradientCanvas.vue';
import MetaReadout from './MetaReadout.vue';

defineProps<{ state: GradientState }>();
const canvasRef = ref<InstanceType<typeof GradientCanvas> | null>(null);

function save() {
  const url = canvasRef.value?.exportPNG();
  if (!url) return;
  const a = document.createElement('a');
  a.href = url;
  a.download = 'small-window.png';
  a.click();
}
</script>

<template>
  <div class="window-view">
    <div class="canvas-frame">
      <GradientCanvas ref="canvasRef" :state="state" class="canvas" />
    </div>
    <div class="canvas-footer">
      <MetaReadout :state="state" />
      <button class="save-btn" @click="save" aria-label="Save as PNG">↓ Save</button>
    </div>
  </div>
</template>

<style scoped>
/* ── Window view — canvas in the dark left pane ───────────────────
   No glass, no grain. The gradient is the only colour on screen.
   A thin hairline border is all the framing it needs.              */
.window-view {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 680px;
  gap: var(--s3);
}

.canvas-frame {
  width: 100%;
  aspect-ratio: 4 / 3;
  border: 1px solid var(--color-rule);
  border-radius: var(--radius-md);
  overflow: hidden;
  flex-shrink: 0;
}

.canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.canvas-footer {
  display: flex;
  align-items: center;
  gap: var(--s4);
}

.save-btn {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 400;
  letter-spacing: 0;
  text-transform: uppercase;
  color: var(--color-ink-3);
  background: transparent;
  border: 1px solid var(--color-rule);
  border-radius: var(--radius-sm);
  padding: var(--s1) var(--s4);
  cursor: pointer;
  flex-shrink: 0;
  white-space: nowrap;
  transition: color 100ms ease, border-color 100ms ease;
}

.save-btn:hover        { color: var(--color-ink); border-color: var(--color-rule-mid); }
.save-btn:focus-visible { outline: 1.5px solid var(--color-focus); outline-offset: 2px; }
</style>
