// Two public styles. Each one samples a range from the older four-style system.
export type JapaneseStyle = 'vivid' | 'veil';

export interface ColorStop {
  pos: number;   // 0..1 top→bottom
  color: string; // hsl() or hex
}

export interface GradientState {
  stops: ColorStop[];
  style: JapaneseStyle;
  timeOfDay: number; // hour 0..23
  source: string;
  label: string;
  word?: string;
  showCelestialBody?: boolean;
  css?: string;         // linear-gradient(in oklab …) for CSS context
  moment?: string;      // sky archetype name
  paletteHex?: string;  // hex of the zenith (dominant) stop — for UI feedback
}

export interface ResolverInput {
  mode: 'word' | 'color' | 'text' | 'custom';
  word?: string;
  color?: string;
  text?: string;
  styleOverride?: JapaneseStyle;
  shuffleSeed?: number;
  customStops?: string[];
  composition?: 'standard' | 'sho';
}

export interface Resolver {
  id: string;
  score(input: ResolverInput): number | Promise<number>;
  resolve(input: ResolverInput): Promise<GradientState>;
}
