<script setup lang="ts">
import type { GradientState } from '../core/types';

const props = defineProps<{ state: GradientState }>();

function formatHour(h: number): string {
  const ampm = h >= 12 ? 'PM' : 'AM';
  const display = h % 12 || 12;
  return `${String(display).padStart(2, '0')}:00 ${ampm}`;
}
</script>

<template>
  <div class="meta-readout" role="status" aria-live="polite">
    <span class="source">{{ state.source }}</span>
    <span class="sep">·</span>
    <span class="label">{{ state.label }}</span>
    <span class="sep">·</span>
    <span class="time">{{ formatHour(state.timeOfDay) }}</span>
    <div class="swatches" aria-label="palette swatches">
      <span
        v-for="(stop, i) in state.stops.slice(0, 4)"
        :key="i"
        class="swatch"
        :style="{ background: stop.color }"
        :title="stop.color"
      />
    </div>
  </div>
</template>

<style scoped>
.meta-readout {
  display: flex;
  align-items: center;
  gap: var(--s3);
  flex-wrap: wrap;
  flex: 1;
  min-width: 0;
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 400;
  color: var(--color-ink-4);
  letter-spacing: 0;
  text-transform: uppercase;
  user-select: none;
}

.sep { color: var(--color-rule-mid); }

.swatches {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.swatch {
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 0;
}
</style>
