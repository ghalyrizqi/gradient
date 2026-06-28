import { generateSkyGradient, MOMENT_HOURS } from './skyGradient.ts';
import type { GradientState, JapaneseStyle } from './types.ts';

export function defaultGradientState(): GradientState {
  const sky = generateSkyGradient();
  return {
    stops:     sky.stops,
    css:       sky.css,
    moment:    sky.moment,
    style:     'vivid' as JapaneseStyle,
    timeOfDay: MOMENT_HOURS[sky.moment] ?? new Date().getHours(),
    source:    'default',
    label:     sky.moment,
  };
}
