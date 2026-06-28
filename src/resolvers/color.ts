import type { Resolver, ResolverInput, GradientState, JapaneseStyle } from '../core/types.ts';
import { generateSkyGradient, renderFromHsl, makeRng, pickWeightedByHue, MOMENT_HOURS, styleHslStop } from '../core/skyGradient.ts';
import type { HslStop } from '../core/skyGradient.ts';


function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      default: h = ((r - g) / d + 4) / 6;
    }
  }
  return [h * 360, s * 100, l * 100];
}

export const colorResolver: Resolver = {
  id: 'color',

  score(input: ResolverInput): number {
    return input.mode === 'color' && !!input.color ? 100 : 0;
  },

  async resolve(input: ResolverInput): Promise<GradientState> {
    const hex   = input.color ?? '#3a6ea5';
    const style: JapaneseStyle = input.styleOverride ?? 'vivid';
    const [hue, pickedS, pickedL] = hexToHsl(hex);

    // seed=hex → same hex always gives same moment when shuffleSeed=0.
    // seed=`hex:N` → different N gives different moment/jitter.
    const seed = input.shuffleSeed
      ? `${hex}:${input.shuffleSeed}`
      : hex;

    // Pick archetype biased toward the picker's hue
    const rng    = makeRng(`${seed}:m`);
    const moment = pickWeightedByHue(hue, rng).name;

    // Generate archetype gradient; its remaining stops give the trajectory
    const sky = generateSkyGradient({ seed, moment, style });

    // Anchor the zenith (top) stop to the user's actual picked color.
    // Apply the same sampled style variant so the anchor matches the rest.
    const anchor = styleHslStop(
      { h: hue, s: pickedS, l: pickedL },
      0,
      sky.hslStops.length,
      style,
      sky.styleVariant,
    );
    const anchoredStops: HslStop[] = [
      anchor,
      ...sky.hslStops.slice(1),
    ];
    const anchored = renderFromHsl(anchoredStops, sky.moment, style, sky.positions, sky.styleVariant);

    return {
      stops:      anchored.stops,
      css:        anchored.css,
      moment:     anchored.moment,
      style,
      timeOfDay:  MOMENT_HOURS[sky.moment] ?? new Date().getHours(),
      source:     `color:${hex}`,
      label:      anchored.moment,
      paletteHex: hex,
    };
  },
};
