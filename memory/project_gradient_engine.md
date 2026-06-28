---
name: gradient-engine-archetype
description: Gradient engine replaced with archetype+jitter system (Shibuya/nuevo.tokyo). Sky moments library, oklab densification, seeded PRNG.
metadata:
  type: project
---

Replaced the bokashi ichimonji (time-based, 7-stop) palette engine with an archetype + jitter system in `src/core/skyGradient.ts`.

**Why:** User wanted Sho Shibuya / nuevo.tokyo aesthetic — named sky moments with bounded jitter, oklab interpolation, seeded determinism.

**How to apply:** New gradient work goes through `generateSkyGradient(opts?)` in `skyGradient.ts`. For Vue components use `useSkyGradient` composable. Do NOT resurrect the old ichimonji functions.

## Key facts

- `SKY_MOMENTS` — 20 archetypes (10 core + 5 nuevo.tokyo + 5 Shibuya moody)
- PRNG: `xmur3` hash → `mulberry32` generator; `makeRng(seed?)` for determinism
- Jitter: H±8°, S±8 (clamped 5–90), L±5 (clamped 12–92)
- Stop positions: 2→[0,1], 3→[0,0.65,1], 4→[0,0.38,0.70,1] (warm band at bottom)
- Canvas: densified stops (6 per segment) interpolated in oklab space via `interpolateSegment`
- CSS: `linear-gradient(in oklab to bottom, hsl(…) N%, …)` — native oklab interpolation
- `JapaneseStyle` (subtle/nezumi/greydient) applies saturation cut after jitter: 0/30/50 pts
- `GradientState` gains optional `css?` and `moment?` fields (backwards-compatible)
- Text resolver: NLP → emotion pool → `pickMomentForAnalysis` → seeded jitter → entity/hue/luma nudges on `HslStop[]` → `renderFromHsl`
- Color resolver: hex → hue → `pickWeightedByHue` (Gaussian-weighted) → seeded jitter
- `palette.ts` is now a thin wrapper exposing only `defaultGradientState()`

[[color-research-findings]]
