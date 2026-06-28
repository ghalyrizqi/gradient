import type { Resolver, ResolverInput, GradientState, JapaneseStyle } from '../core/types';
import {
  renderFromHsl, createStyleVariant, makeRng, styleHslStop,
  normalStopPositions, skyStopPositions,
} from '../core/skyGradient';
import type { HslStop } from '../core/skyGradient';

function hexToHsl(hex: string): HslStop {
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
  return { h: h * 360, s: s * 100, l: l * 100 };
}

export const customResolver: Resolver = {
  id: 'custom',
  score: (input) => input.mode === 'custom' && (input.customStops?.length ?? 0) >= 2 ? 100 : 0,
  async resolve(input: ResolverInput): Promise<GradientState> {
    const hexStops  = input.customStops ?? [];
    const style: JapaneseStyle = input.styleOverride ?? 'vivid';
    const isSho     = input.composition === 'sho';
    const variant   = createStyleVariant(style, makeRng(hexStops.join(',')));
    const raw       = hexStops.map(hexToHsl);
    const styled    = raw.map((s, i) => styleHslStop(s, i, raw.length, style, variant));
    const positions = isSho ? skyStopPositions(styled.length) : normalStopPositions(styled.length);
    const rendered  = renderFromHsl(styled, 'custom', style, positions, variant);
    return {
      stops:      rendered.stops,
      css:        rendered.css,
      moment:     'custom',
      style,
      timeOfDay:  new Date().getHours(),
      source:     'custom',
      label:      isSho ? 'custom · sho' : 'custom gradient',
      paletteHex: hexStops[0],
    };
  },
};
