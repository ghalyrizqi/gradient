<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import type { GradientState } from '../core/types';
import { Renderer } from '../core/renderer';

const props = defineProps<{ state: GradientState }>();

const canvasEl = ref<HTMLCanvasElement | null>(null);
let renderer: Renderer | null = null;
let ro: ResizeObserver | null = null;

onMounted(() => {
  const canvas = canvasEl.value!;
  renderer = new Renderer(canvas);
  renderer.setState(props.state);

  ro = new ResizeObserver(() => {
    renderer!.resize();
    renderer!.start();
  });
  ro.observe(canvas);

  renderer.resize();
  renderer.start();
});

onUnmounted(() => {
  renderer?.stop();
  ro?.disconnect();
});

watch(() => props.state, (s) => {
  renderer?.setState(s);
}, { deep: true });

defineExpose({
  exportPNG: () => renderer?.exportPNG() ?? '',
});
</script>

<template>
  <canvas ref="canvasEl" class="gradient-canvas" aria-hidden="true" />
</template>

<style scoped>
.gradient-canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
