import type { Resolver, ResolverInput } from '../core/types.ts';
import { colorResolver } from './color.ts';
import { textResolver } from './text.ts';
import { customResolver } from './custom.ts';
import { defaultGradientState } from '../core/palette.ts';

const registry: Resolver[] = [customResolver, textResolver, colorResolver];

const fallbackResolver: Resolver = {
  id: 'fallback',
  score: () => 1,
  resolve: async () => defaultGradientState(),
};

export async function pickResolver(input: ResolverInput): Promise<Resolver> {
  const scores = await Promise.all(
    registry.map(async r => {
      try {
        const s = await r.score(input);
        return { r, s };
      } catch {
        return { r, s: 0 };
      }
    }),
  );
  scores.sort((a, b) => b.s - a.s);
  return scores[0].s > 0 ? scores[0].r : fallbackResolver;
}
