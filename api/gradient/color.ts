import { pickResolver } from '../../src/resolvers/index.ts';
import { cors, parseStyle, parseUrl, type Req, type Res } from '../_lib/index.ts';

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

export default async function handler(req: Req, res: Res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const p     = parseUrl(req);
  const color = p.get('color') ?? '#3a6ea5';
  const style = parseStyle(p.get('style'));
  const seed  = Math.abs(parseInt(p.get('seed') ?? '0', 10)) || 0;

  if (!HEX_RE.test(color)) {
    return res.status(400).json({ error: 'Invalid color. Expected a 6-digit hex like #3a6ea5.' });
  }

  const input    = { mode: 'color' as const, color, styleOverride: style, shuffleSeed: seed };
  const resolver = await pickResolver(input);
  const state    = await resolver.resolve(input);

  return res.status(200).json(state);
}
