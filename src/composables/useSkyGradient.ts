import { ref, computed } from 'vue';
import { generateSkyGradient, type SkyGradient, type SkyGradientOpts } from '../core/skyGradient';
import type { JapaneseStyle } from '../core/types';

export function useSkyGradient(initial?: SkyGradientOpts) {
  const opts = ref<SkyGradientOpts>(initial ?? {});
  const sky  = computed<SkyGradient>(() => generateSkyGradient(opts.value));

  // Ready to bind as :style on any element
  const cssStyle = computed(() => ({ background: sky.value.css }));

  function generate(newOpts?: SkyGradientOpts) {
    opts.value = newOpts ?? {};
  }

  function setSeed(seed: string) {
    opts.value = { ...opts.value, seed };
  }

  function setStyle(style: JapaneseStyle) {
    opts.value = { ...opts.value, style };
  }

  function setMoment(moment: string) {
    opts.value = { ...opts.value, moment };
  }

  return { sky, cssStyle, generate, setSeed, setStyle, setMoment };
}
