<script setup lang="ts">
import { ref, computed } from 'vue';
import type { GradientState } from '../core/types';
import GradientCanvas from './GradientCanvas.vue';
import MetaReadout from './MetaReadout.vue';

defineProps<{ state: GradientState }>();
const canvasRef = ref<InstanceType<typeof GradientCanvas> | null>(null);

type SizePreset = { label: string; w: number; h: number };

const PRESETS: SizePreset[] = [
  { label: 'HD 1080p',  w: 1080, h: 1920 },
  { label: 'QHD',       w: 1440, h: 2560 },
  { label: '4K',        w: 2160, h: 3840 },
  { label: 'Custom',    w: 0,    h: 0    },
];

const selectedPreset = ref<SizePreset>(PRESETS[0]);
const customW = ref(1080);
const customH = ref(1920);

const isCustom = computed(() => selectedPreset.value.label === 'Custom');

const activeW = computed(() => isCustom.value ? customW.value  : selectedPreset.value.w);
const activeH = computed(() => isCustom.value ? customH.value  : selectedPreset.value.h);

function save() {
  const url = canvasRef.value?.exportPNG();
  if (!url) return;
  const a = document.createElement('a');
  a.href = url;
  a.download = 'wallpaper.png';
  a.click();
}
</script>

<template>
  <div class="wallpaper-view">
    <div class="wallpaper-header">
      <h2 class="wallpaper-title">Wallpaper</h2>
      <button class="save-btn" @click="save" aria-label="Save as PNG">↓ Save</button>
    </div>

    <!-- Size selector -->
    <div class="size-row" role="group" aria-label="Wallpaper size">
      <button
        v-for="p in PRESETS"
        :key="p.label"
        :class="['size-btn', { active: selectedPreset.label === p.label }]"
        @click="selectedPreset = p"
        :aria-pressed="selectedPreset.label === p.label"
        type="button"
      >{{ p.label }}</button>
    </div>

    <!-- Custom dimensions -->
    <div v-if="isCustom" class="custom-size-row">
      <label class="dim-label">
        <span>W</span>
        <input v-model.number="customW" type="number" min="100" max="8192" class="dim-input" />
        <span class="dim-unit">px</span>
      </label>
      <span class="dim-sep">×</span>
      <label class="dim-label">
        <span>H</span>
        <input v-model.number="customH" type="number" min="100" max="8192" class="dim-input" />
        <span class="dim-unit">px</span>
      </label>
    </div>

    <!-- Canvas preview -->
    <div class="wallpaper-canvas-wrapper">
      <div
        class="wallpaper-frame"
        :style="{ aspectRatio: `${activeW} / ${activeH}` }"
      >
        <GradientCanvas ref="canvasRef" :state="state" class="wallpaper-canvas" />
      </div>
    </div>

    <div class="wallpaper-footer">
      <MetaReadout :state="state" />
      <span class="resolution-info">{{ activeW }}×{{ activeH }}</span>
    </div>
  </div>
</template>

<style scoped>
/* ── Wallpaper View ──────────────────────────────────────────────────── */
.wallpaper-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  gap: var(--s4);
  padding: var(--s3);
}

/* ── Header ──────────────────────────────────────────────────────────── */
.wallpaper-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s3);
  width: 100%;
  padding: var(--s2) var(--s3);
  background: var(--color-glass);
  border: 1px solid var(--color-glass-rule);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(18px) saturate(135%);
}

.wallpaper-title {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  font-weight: 500;
  text-transform: uppercase;
  color: var(--color-ink);
  margin: 0;
  user-select: none;
}

/* ── Size selector row ───────────────────────────────────────────────── */
.size-row {
  display: flex;
  gap: var(--s1);
  padding: var(--s1);
  width: 100%;
  background: var(--color-glass);
  border: 1px solid var(--color-glass-rule);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(18px) saturate(135%);
}

.size-btn {
  flex: 1;
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 400;
  text-transform: uppercase;
  color: var(--color-ink-2);
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  padding: var(--s2) var(--s2);
  cursor: pointer;
  min-height: 34px;
  transition: color 120ms var(--ease-out), background 120ms var(--ease-out);
}
.size-btn:hover  { color: var(--color-ink); background: var(--color-glass-hover); }
.size-btn.active { color: var(--color-ink); background: var(--color-glass-active); }
.size-btn:focus-visible { outline: 1.5px solid var(--color-focus); outline-offset: 2px; }

/* ── Custom dimension inputs ─────────────────────────────────────────── */
.custom-size-row {
  display: flex;
  align-items: center;
  gap: var(--s3);
  width: 100%;
  padding: var(--s3) var(--s4);
  background: var(--color-glass);
  border: 1px solid var(--color-glass-rule);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(18px) saturate(135%);
}

.dim-label {
  display: flex;
  align-items: center;
  gap: var(--s2);
  flex: 1;
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 400;
  text-transform: uppercase;
  color: var(--color-ink-3);
}

.dim-input {
  flex: 1;
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  font-weight: 300;
  color: var(--color-ink);
  background: var(--color-glass-active);
  border: 1px solid var(--color-glass-rule);
  border-radius: var(--radius-md);
  padding: var(--s1) var(--s2);
  min-width: 0;
  text-align: right;
  transition: border-color 120ms var(--ease-out);
}
.dim-input:focus { outline: none; border-color: var(--color-accent-soft); }

.dim-unit {
  color: var(--color-ink-4);
}

.dim-sep {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  color: var(--color-ink-3);
  flex-shrink: 0;
}

/* ── Save Button ─────────────────────────────────────────────────────── */
.save-btn {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  font-weight: 400;
  color: var(--color-ink-2);
  background: var(--color-glass-active);
  border: 1px solid var(--color-glass-rule);
  border-radius: var(--radius-lg);
  padding: var(--s2) var(--s4);
  cursor: pointer;
  flex-shrink: 0;
  min-height: 44px;
  display: flex;
  align-items: center;
  transition: color 120ms var(--ease-out), border-color 120ms var(--ease-out), background 120ms var(--ease-out), transform 120ms var(--ease-out);
}
.save-btn:hover  { color: var(--color-ink); border-color: var(--color-glass-rule-strong); background: var(--color-glass-hover); }
.save-btn:active { transform: translateY(1px); }
.save-btn:focus-visible { outline: 1.5px solid var(--color-focus); outline-offset: 2px; }

/* ── Canvas area ─────────────────────────────────────────────────────── */
.wallpaper-canvas-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: var(--s2);
  background: var(--color-paper);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.wallpaper-frame {
  width: 100%;
  max-width: 380px;
  border: 2px solid var(--color-rule);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.wallpaper-canvas {
  width: 100%;
  height: 100%;
}

/* ── Footer ──────────────────────────────────────────────────────────── */
.wallpaper-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--s2);
  width: 100%;
  padding: var(--s2);
  text-align: center;
}

.resolution-info {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  color: var(--color-ink-3);
  user-select: none;
}
</style>
