import { pickResolver } from '../../src/resolvers/index.ts';
import { cors, parseStyle, parseUrl, type Req, type Res } from '../_lib/index.ts';
import type { ResolverInput } from '../../src/core/types.ts';

// GET /api/gradient/image
// Returns an SVG image of the gradient. No extra dependencies — SVG linearGradient
// handles the same stops the JSON endpoints produce.
//
// Params (pick one input mode):
//   seed=<string>   deterministic from any string (same as /seed endpoint)
//   q=<text>        NLP-driven (same as /text endpoint)
//   color=<hex>     anchored to a hex color (same as /color endpoint)
//   (default)       falls back to #3a6ea5
//
// Sizing:
//   w=<px>   image width  (100–4000, default 1200)
//   h=<px>   image height (100–4000, default 630)
//   style=vivid|veil
//
// Usage in HTML:
//   <img src="/api/gradient/image?seed=my-post-slug" width="1200" height="630" />
//   <img src="/api/gradient/image?q=tokyo+night&w=800&h=450" />

export default async function handler(req: Req, res: Res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const p     = parseUrl(req);
  const style = parseStyle(p.get('style'));
  const w     = clamp(parseIntOr(p.get('w'), 1200), 100, 4000);
  const h     = clamp(parseIntOr(p.get('h'), 630),  100, 4000);

  const colorParam = p.get('color');
  const textParam  = (p.get('q') ?? p.get('text') ?? '').trim().slice(0, 500);
  const seedParam  = (p.get('seed') ?? '').trim().slice(0, 200);

  let input: ResolverInput;
  if (colorParam) {
    if (!/^#[0-9a-fA-F]{6}$/.test(colorParam)) {
      return res.status(400).json({ error: 'Invalid color param — use 6-digit hex like %233a6ea5.' });
    }
    input = { mode: 'color', color: colorParam, styleOverride: style, shuffleSeed: 0 };
  } else if (seedParam) {
    input = { mode: 'text', text: seedParam, styleOverride: style };
  } else if (textParam) {
    input = { mode: 'text', text: textParam, styleOverride: style };
  } else {
    input = { mode: 'color', color: '#3a6ea5', styleOverride: style, shuffleSeed: 0 };
  }

  const resolver = await pickResolver(input);
  const state    = await resolver.resolve(input);

  const stopTags = state.stops
    .map(s => `<stop offset="${(s.pos * 100).toFixed(2)}%" stop-color="${s.color}"/>`)
    .join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">${stopTags}</linearGradient></defs><rect width="${w}" height="${h}" fill="url(#g)"/></svg>`;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  return res.status(200).end(svg);
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max);
}

function parseIntOr(s: string | null, fallback: number): number {
  const n = parseInt(s ?? '', 10);
  return isNaN(n) ? fallback : n;
}
