import { pickResolver } from '../../src/resolvers/index';
import { cors, parseStyle, parseUrl, type Req, type Res } from '../_lib/index';

export default async function handler(req: Req, res: Res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const p     = parseUrl(req);
  // Accept ?q= (short) or ?text= (explicit)
  const text  = (p.get('q') ?? p.get('text') ?? '').trim().slice(0, 500);
  const style = parseStyle(p.get('style'));

  if (!text) {
    return res.status(400).json({ error: 'Missing required param: q (text prompt, max 500 chars).' });
  }

  const input    = { mode: 'text' as const, text, styleOverride: style };
  const resolver = await pickResolver(input);
  const state    = await resolver.resolve(input);

  return res.status(200).json(state);
}
