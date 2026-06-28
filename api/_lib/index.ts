import type { JapaneseStyle } from '../../src/core/types.ts';

// Minimal Vercel request/response shapes (no extra package needed).
export interface Req {
  method: string;
  url: string;
}

export interface Res {
  status(code: number): Res;
  json(data: unknown): void;
  setHeader(key: string, value: string): void;
  end(data?: string): void;
}

export function cors(res: Res): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export function parseStyle(raw: string | null): JapaneseStyle {
  return raw === 'veil' ? 'veil' : 'vivid';
}

export function parseUrl(req: Req): URLSearchParams {
  return new URL(req.url, 'http://localhost').searchParams;
}
