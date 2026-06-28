import { ref, reactive } from 'vue';
import type { GradientState, ResolverInput } from '../core/types';
import { defaultGradientState } from '../core/palette';
import { pickResolver } from '../resolvers/index';

export function useGradient() {
  const state = reactive<GradientState>(defaultGradientState());
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function resolve(input: ResolverInput) {
    loading.value = true;
    error.value = null;
    try {
      const resolver = await pickResolver(input);
      const result = await resolver.resolve(input);
      Object.assign(state, result);
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'resolve failed';
      Object.assign(state, defaultGradientState());
    } finally {
      loading.value = false;
    }
  }

  return { state, loading, error, resolve };
}
