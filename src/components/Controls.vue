<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import type { JapaneseStyle } from '../core/types';
import { NIPPON_POOL } from '../core/nipponPool';

export interface ControlState {
  inputMode: 'text' | 'color' | 'custom';
  displayMode: 'window' | 'phone';
  query: string;
  color: string;
  style: JapaneseStyle;
  shuffleSeed: number;
  customStops: string[];
  composition: 'standard' | 'sho';
}

const emit = defineEmits<{ (e: 'change', state: ControlState): void }>();

const inputMode   = ref<'text' | 'color' | 'custom'>('color');
const displayMode = ref<'window' | 'phone'>('window');
const query       = ref('');
const color       = ref('#3a6ea5');
const style       = ref<JapaneseStyle>('vivid');
const shuffleSeed = ref(0);
const customStops   = ref<string[]>(['#2D4B8E', '#D97C5A', '#F5C06E']);
const composition   = ref<'standard' | 'sho'>('standard');

function customStopLabel(i: number, total: number): string {
  if (i === 0)         return 'Sky';
  if (i === total - 1) return 'Horizon';
  if (total === 3)     return 'Mid';
  return `Mid ${i}`;
}

function addCustomStop() {
  // Insert before Horizon, seed with the current second-to-last colour
  const stops = customStops.value;
  const newColor = stops[stops.length - 2] ?? '#888888';
  customStops.value = [...stops.slice(0, -1), newColor, stops[stops.length - 1]];
}

function removeCustomStop(i: number) {
  customStops.value = customStops.value.filter((_, idx) => idx !== i);
}

const queryRef  = ref<HTMLTextAreaElement | null>(null);
const charCount = computed(() => query.value.length);
const isLong    = computed(() => query.value.trim().length >= 20);

const STYLES: { value: JapaneseStyle; label: string }[] = [
  { value: 'vivid', label: 'Vivid' },
  { value: 'veil',  label: 'Veil'  },
];

function hashStr(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}

function seededRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s += 0x6d2b79f5;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DAILY_COUNT = 12;

const dailySuggestions = computed(() => {
  const dateKey = new Date().toISOString().slice(0, 10); // "2026-06-25"
  const rng = seededRng(hashStr(dateKey));
  const pool = [...NIPPON_POOL];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, DAILY_COUNT);
});

function emit_() {
  emit('change', {
    inputMode:   inputMode.value,
    displayMode: displayMode.value,
    query:       query.value,
    color:       color.value,
    style:       style.value,
    shuffleSeed: shuffleSeed.value,
    customStops: [...customStops.value],
    composition: composition.value,
  });
}

function submit(e: Event) {
  e.preventDefault();
  if (query.value.trim().length > 0) emit_();
}

function shuffle() {
  shuffleSeed.value = Math.floor(Math.random() * 0x7fffffff);
  emit_();
}

function chooseSuggestion(suggestion: (typeof NIPPON_POOL)[number]) {
  _skipEmit = true;
  color.value = suggestion.hex;
  style.value = suggestion.style;
  nextTick(() => {
    _skipEmit = false;
    emit_();
  });
}



watch(query, () => {
  nextTick(() => {
    const el = queryRef.value;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 240) + 'px';
  });
});

// Suppress emit when the parent feeds back a palette color after shuffle
let _skipEmit = false;
watch([inputMode, displayMode, color, style, composition], () => {
  if (_skipEmit) return;
  emit_();
});
watch(customStops, () => {
  if (_skipEmit) return;
  emit_();
}, { deep: true });

// Called by App after a shuffle resolve to keep the swatch in sync
function updateColor(hex: string) {
  _skipEmit = true;
  color.value = hex;
  nextTick(() => { _skipEmit = false; });
}

defineExpose({ updateColor });
</script>

<template>
  <div class="controls" role="form" aria-label="Sky controls">

    <!-- Input mode toggle -->
    <div class="ctrl-block">
      <span class="ctrl-label">Input</span>
      <div class="seg-row" role="group" aria-label="Input mode">
        <button
          :class="['seg-btn', { active: inputMode === 'text' }]"
          @click="inputMode = 'text'"
          :aria-pressed="inputMode === 'text'"
          type="button"
        >Text</button>
        <button
          :class="['seg-btn', { active: inputMode === 'color' }]"
          @click="inputMode = 'color'"
          :aria-pressed="inputMode === 'color'"
          type="button"
        >Color</button>
        <button
          :class="['seg-btn', { active: inputMode === 'custom' }]"
          @click="inputMode = 'custom'"
          :aria-pressed="inputMode === 'custom'"
          type="button"
        >Custom</button>
      </div>
    </div>

    <!-- Display mode toggle -->
    <div class="ctrl-block">
      <span class="ctrl-label">View</span>
      <div class="seg-row" role="group" aria-label="Display mode">
        <button
          :class="['seg-btn', { active: displayMode === 'window' }]"
          @click="displayMode = 'window'"
          :aria-pressed="displayMode === 'window'"
          type="button"
        >Window</button>
        <button
          :class="['seg-btn', { active: displayMode === 'phone' }]"
          @click="displayMode = 'phone'"
          :aria-pressed="displayMode === 'phone'"
          type="button"
        >Wallpaper</button>
      </div>
    </div>

    <!-- Style selector — always visible -->
    <div class="ctrl-block">
      <span class="ctrl-label">Style</span>
      <div class="style-grid" role="group" aria-label="Japanese gradient style">
        <button
          v-for="s in STYLES"
          :key="s.value"
          :class="['style-btn', { active: style === s.value }]"
          @click="style = s.value"
          :aria-pressed="style === s.value"
          type="button"
        >{{ s.label }}</button>
      </div>
    </div>

    <div class="ctrl-divider" />

    <!-- Text input -->
    <form v-if="inputMode === 'text'" @submit="submit" class="ctrl-block ctrl-block--form">
      <span class="ctrl-label">Word / City / Text</span>
      <div class="form-row">
        <div class="textarea-wrap">
          <label for="sky-input" class="sr-only">Word, city, or text</label>
          <textarea
            id="sky-input"
            ref="queryRef"
            v-model="query"
            class="sky-textarea"
            :class="{ 'sky-textarea--expanded': isLong }"
            placeholder="Tokyo, sakura, melancholy…"
            rows="1"
            maxlength="4000"
            spellcheck="false"
            @keydown.enter.exact.prevent="submit"
          />
          <span
            v-if="charCount > 60"
            class="char-count"
            :class="{ 'char-count--near': charCount > 3500 }"
          >{{ charCount }}/4000</span>
        </div>
        <button
          class="go-btn"
          type="submit"
          :disabled="query.trim().length === 0"
          aria-label="Generate gradient"
        >↗</button>
      </div>
    </form>

    <!-- Color input -->
    <div v-else-if="inputMode === 'color'" class="ctrl-block">
      <span class="ctrl-label">Base Color</span>
      <div class="color-row">
        <label for="color-input" class="sr-only">Base color</label>
        <input
          id="color-input"
          v-model="color"
          class="color-swatch"
          type="color"
          aria-label="Base color"
        />
        <span class="color-hex">{{ color }}</span>
        <button class="go-btn go-btn--inline" type="button" @click="shuffle" aria-label="Shuffle gradient">↻</button>
      </div>
      <div class="suggestion-grid" aria-label="Suggested Japanese colors">
        <button
          v-for="suggestion in dailySuggestions"
          :key="suggestion.name"
          class="suggestion-btn"
          type="button"
          @click="chooseSuggestion(suggestion)"
          :aria-label="`${suggestion.name} ${suggestion.hex}`"
        >
          <span class="suggestion-swatch" :style="{ background: suggestion.hex }" />
          <span class="suggestion-copy">
            <span>{{ suggestion.name }}</span>
            <span>{{ suggestion.jp }} · {{ suggestion.style === 'vivid' ? 'Vivid' : 'Veil' }}</span>
          </span>
        </button>
      </div>
    </div>

    <!-- Custom gradient input -->
    <div v-else-if="inputMode === 'custom'" class="ctrl-block">
      <span class="ctrl-label">Custom Gradient</span>

      <!-- Composition toggle -->
      <div class="seg-row" role="group" aria-label="Gradient composition">
        <button
          :class="['seg-btn', { active: composition === 'standard' }]"
          @click="composition = 'standard'"
          :aria-pressed="composition === 'standard'"
          type="button"
        >Standard</button>
        <button
          :class="['seg-btn', { active: composition === 'sho' }]"
          @click="composition = 'sho'"
          :aria-pressed="composition === 'sho'"
          type="button"
        >Sho</button>
      </div>

      <div class="custom-stops">
        <label
          v-for="(_, i) in customStops"
          :key="i"
          :for="`custom-stop-${i}`"
          class="custom-stop-row"
        >
          <span class="custom-stop-label">{{ customStopLabel(i, customStops.length) }}</span>
          <input
            :id="`custom-stop-${i}`"
            v-model="customStops[i]"
            type="color"
            class="color-swatch custom-swatch"
          />
          <span class="color-hex">{{ customStops[i] }}</span>
          <button
            v-if="customStops.length > 3 && i > 0 && i < customStops.length - 1"
            class="stop-remove-btn"
            type="button"
            @click.prevent="removeCustomStop(i)"
            aria-label="Remove stop"
          >×</button>
        </label>
      </div>
      <button
        v-if="customStops.length < 7"
        class="add-stop-btn"
        type="button"
        @click="addCustomStop"
      >+ Add Stop</button>
    </div>

  </div>
</template>

<style scoped>
/* ── Controls — dark instrument panel ────────────────────────────────
   Transparent on the right pane. Vertical list of labelled controls. */
.controls {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: var(--s3) 0 var(--s5);
  flex: 1;
}

/* ── Section block ───────────────────────────────────────────────── */
.ctrl-block {
  display: flex;
  flex-direction: column;
  gap: var(--s2);
  padding: var(--s4);
}

.ctrl-block--form { gap: var(--s3); }

.ctrl-divider {
  height: 1px;
  background: var(--color-rule);
  margin: var(--s1) 0;
}

/* ── Labels ──────────────────────────────────────────────────────── */
.ctrl-label {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 400;
  letter-spacing: 0;
  text-transform: uppercase;
  color: var(--color-ink-3);
  user-select: none;
}

/* ── Mode toggle row ─────────────────────────────────────────────── */
.seg-row {
  display: flex;
  gap: var(--s1);
  padding: var(--s1);
  border: 1px solid var(--color-glass-rule);
  border-radius: var(--radius-lg);
  background: var(--color-glass);
  backdrop-filter: blur(28px) saturate(165%);
}

.seg-btn {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 400;
  letter-spacing: 0;
  text-transform: uppercase;
  color: var(--color-ink-2);
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  padding: var(--s2) var(--s3);
  cursor: pointer;
  transition: color 120ms var(--ease-out), background 120ms var(--ease-out);
  position: relative;
  flex: 1;
  min-height: 34px;
}

.seg-btn:hover               { color: var(--color-ink); background: var(--color-glass-hover); }
.seg-btn.active              { color: var(--color-ink); background: var(--color-glass-active); }
.seg-btn:focus-visible       { outline: 1.5px solid var(--color-focus); outline-offset: 4px; }

/* ── Style selector (2×2 grid) ───────────────────────────────────── */
.style-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--s2);
}

.style-btn {
  font-family: var(--font-ui);
  font-size: var(--text-base);
  font-weight: 500;
  letter-spacing: 0;
  text-transform: uppercase;
  color: var(--color-ink-2);
  background: var(--color-glass);
  border: 1px solid var(--color-glass-rule);
  border-radius: var(--radius-lg);
  padding: var(--s3) var(--s4);
  cursor: pointer;
  text-align: center;
  backdrop-filter: blur(28px) saturate(165%);
  transition: color 120ms var(--ease-out), border-color 120ms var(--ease-out), background 120ms var(--ease-out), transform 120ms var(--ease-out);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.style-btn:hover    { color: var(--color-ink); border-color: var(--color-glass-rule-strong); background: var(--color-glass-hover); }
.style-btn:active   { transform: translateY(1px); }
.style-btn.active   { color: var(--color-ink); border-color: var(--color-accent-soft); background: var(--color-glass-active); box-shadow: inset 0 1px 0 oklch(1 0 0 / 0.10); }
.style-btn:focus-visible { outline: 1.5px solid var(--color-focus); outline-offset: 2px; }

/* ── Sky text input ──────────────────────────────────────────────── */
.form-row {
  display: flex;
  gap: 0;
  align-items: flex-start;
}

.textarea-wrap {
  position: relative;
  flex: 1;
  min-width: 0;
}

.sky-textarea {
  width: 100%;
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: 300;
  line-height: 1.6;
  background: var(--color-glass);
  border: 1px solid var(--color-glass-rule);
  border-radius: var(--radius-lg);
  color: var(--color-ink);
  padding: var(--s3) var(--s4);
  resize: none;
  overflow: hidden;
  min-height: 44px;
  max-height: 240px;
  backdrop-filter: blur(28px) saturate(165%);
  transition: border-color 120ms var(--ease-out), background 120ms var(--ease-out);
  box-sizing: border-box;
}

.sky-textarea::placeholder { color: var(--color-ink-4); }
.sky-textarea:hover   { border-color: var(--color-glass-rule-strong); }
.sky-textarea:focus   { outline: none; border-color: var(--color-accent-soft); background: var(--color-glass-active); }

.char-count {
  position: absolute;
  bottom: var(--s2);
  right: var(--s3);
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  color: var(--color-ink-4);
  pointer-events: none;
}
.char-count--near { color: var(--color-warn); }

/* ── Go / Shuffle button ─────────────────────────────────────────── */
.go-btn {
  font-family: var(--font-ui);
  font-size: var(--text-md);
  font-weight: 300;
  color: var(--color-ink-2);
  background: var(--color-glass);
  border: 1px solid var(--color-glass-rule);
  border-radius: var(--radius-lg);
  padding: var(--s2) var(--s4);
  margin-left: var(--s2);
  cursor: pointer;
  flex-shrink: 0;
  align-self: flex-start;
  min-height: 44px;
  display: flex;
  align-items: center;
  backdrop-filter: blur(28px) saturate(165%);
  transition: color 120ms var(--ease-out), border-color 120ms var(--ease-out), background 120ms var(--ease-out), transform 120ms var(--ease-out);
}

.go-btn:hover:not(:disabled) {
  color: var(--color-ink);
  border-color: var(--color-glass-rule-strong);
  background: var(--color-glass-hover);
}

.go-btn:active:not(:disabled) { transform: translateY(1px); }
.go-btn:disabled      { opacity: 0.22; cursor: not-allowed; }
.go-btn:focus-visible { outline: 1.5px solid var(--color-focus); outline-offset: 2px; }

.go-btn--inline {
  align-self: center;
  min-height: 36px;
  padding: var(--s1) var(--s3);
}

/* ── Color mode row ──────────────────────────────────────────────── */
.color-row {
  display: flex;
  align-items: center;
  gap: var(--s3);
  padding: var(--s2);
  border: 1px solid var(--color-glass-rule);
  border-radius: var(--radius-lg);
  background: var(--color-glass);
  backdrop-filter: blur(28px) saturate(165%);
}

.color-swatch {
  width: 36px;
  height: 36px;
  border: 1px solid var(--color-glass-rule-strong);
  border-radius: var(--radius-md);
  background: transparent;
  cursor: pointer;
  padding: 2px;
  flex-shrink: 0;
}
.color-swatch:focus-visible { outline: 1.5px solid var(--color-focus); outline-offset: 2px; }

.color-hex {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 300;
  color: var(--color-ink-2);
  letter-spacing: 0;
  flex: 1;
}

.suggestion-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--s2);
  padding-top: var(--s2);
}

.suggestion-btn {
  min-width: 0;
  min-height: 52px;
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  align-items: center;
  gap: var(--s2);
  padding: var(--s2);
  color: var(--color-ink-2);
  background: var(--color-glass);
  border: 1px solid var(--color-glass-rule);
  border-radius: var(--radius-lg);
  cursor: pointer;
  text-align: left;
  backdrop-filter: blur(28px) saturate(165%);
  transition: color 120ms var(--ease-out), border-color 120ms var(--ease-out), background 120ms var(--ease-out), transform 120ms var(--ease-out);
}

.suggestion-btn:hover {
  color: var(--color-ink);
  border-color: var(--color-glass-rule-strong);
  background: var(--color-glass-hover);
}

.suggestion-btn:active { transform: translateY(1px); }
.suggestion-btn:focus-visible { outline: 1.5px solid var(--color-focus); outline-offset: 2px; }

.suggestion-swatch {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-glass-rule-strong);
  box-shadow: inset 0 0 0 1px var(--color-swatch-sheen);
}

.suggestion-copy {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-family: var(--font-ui);
}

.suggestion-copy span:first-child {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--text-xs);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0;
}

.suggestion-copy span:last-child {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--text-xs);
  font-weight: 300;
  color: var(--color-ink-3);
  letter-spacing: 0;
}

.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 480px) {
  .ctrl-block     { padding: var(--s3) var(--s4); }
  .style-grid     { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .suggestion-grid { grid-template-columns: 1fr; }
}

/* ── Custom gradient stops ───────────────────────────────────────── */
.custom-stops {
  display: flex;
  flex-direction: column;
  gap: var(--s2);
}

.custom-stop-row {
  display: grid;
  grid-template-columns: 52px 36px 1fr auto;
  align-items: center;
  gap: var(--s3);
  padding: var(--s2) var(--s3);
  background: var(--color-glass);
  border: 1px solid var(--color-glass-rule);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(28px) saturate(165%);
  cursor: pointer;
  transition: border-color 120ms var(--ease-out), background 120ms var(--ease-out);
}
.custom-stop-row:hover { border-color: var(--color-glass-rule-strong); background: var(--color-glass-hover); }

.custom-stop-label {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 400;
  text-transform: uppercase;
  color: var(--color-ink-3);
  user-select: none;
}

.custom-swatch {
  width: 36px;
  height: 28px;
  border: 1px solid var(--color-glass-rule-strong);
  border-radius: var(--radius-md);
  background: transparent;
  cursor: pointer;
  padding: 2px;
}
.custom-swatch:focus-visible { outline: 1.5px solid var(--color-focus); outline-offset: 2px; }

.stop-remove-btn {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  font-weight: 300;
  color: var(--color-ink-4);
  background: transparent;
  border: none;
  padding: 0 var(--s1);
  cursor: pointer;
  line-height: 1;
  flex-shrink: 0;
  transition: color 120ms var(--ease-out);
}
.stop-remove-btn:hover { color: var(--color-ink-2); }
.stop-remove-btn:focus-visible { outline: 1.5px solid var(--color-focus); outline-offset: 2px; }

.add-stop-btn {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 400;
  text-transform: uppercase;
  color: var(--color-ink-3);
  background: transparent;
  border: 1px dashed var(--color-glass-rule);
  border-radius: var(--radius-lg);
  padding: var(--s2) var(--s3);
  cursor: pointer;
  width: 100%;
  text-align: center;
  transition: color 120ms var(--ease-out), border-color 120ms var(--ease-out), background 120ms var(--ease-out);
}
.add-stop-btn:hover { color: var(--color-ink); border-color: var(--color-glass-rule-strong); background: var(--color-glass); }
.add-stop-btn:focus-visible { outline: 1.5px solid var(--color-focus); outline-offset: 2px; }
</style>
