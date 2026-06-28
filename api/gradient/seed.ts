import { pickResolver } from '../../src/resolvers/index.ts';
import { cors, parseStyle, parseUrl, type Req, type Res } from '../_lib/index.ts';

// Deterministic gradient from any opaque string (project slug, user ID, etc.).
// Internally routes through the text resolver so brand/NLP signals still fire,
// but any string — not just natural language — produces a stable, reproducible result.
export default async function handler(req: Req, res: Res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const p     = parseUrl(req);
  const seed  = (p.get('seed') ?? '').trim().slice(0, 200);
  const style = parseStyle(p.get('style'));

  if (!seed) {
    return res.status(400).json({ error: 'Missing required param: seed.' });
  }

  const input    = { mode: 'text' as const, text: seed, styleOverride: style };
  const resolver = await pickResolver(input);
  const state    = await resolver.resolve(input);

  return res.status(200).json(state);
}
