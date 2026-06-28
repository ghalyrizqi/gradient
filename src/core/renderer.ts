import type { GradientState } from './types.ts';

const DPR = () => Math.min(window.devicePixelRatio ?? 1, 2);
const REDUCED = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export class Renderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private sharp: HTMLCanvasElement;
  private sharpCtx: CanvasRenderingContext2D;
  private state: GradientState | null = null;
  private rafId = 0;
  private frame = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.sharp = document.createElement('canvas');
    this.sharpCtx = this.sharp.getContext('2d')!;
  }

  setState(s: GradientState) {
    this.state = s;
  }

  start() {
    this.stop();
    if (REDUCED()) {
      this.drawFrame();
      return;
    }
    const tick = () => {
      this.drawFrame();
      this.frame++;
      this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);
  }

  stop() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = 0;
  }

  resize() {
    const dpr = DPR();
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    this.canvas.width = w * dpr;
    this.canvas.height = h * dpr;
    this.sharp.width = w * dpr;
    this.sharp.height = h * dpr;
    this.ctx.scale(dpr, dpr);
    this.sharpCtx.scale(dpr, dpr);
    if (REDUCED()) this.drawFrame();
  }

  exportPNG(): string {
    return this.canvas.toDataURL('image/png');
  }

  private drawFrame() {
    if (!this.state) return;
    const { clientWidth: w, clientHeight: h } = this.canvas;
    const ctx = this.ctx;
    const state = this.state;

    this.drawSky(this.sharpCtx, w, h, state);

    ctx.clearRect(0, 0, w, h);
    this.drawSky(ctx, w, h, state);

    this.drawGrain(ctx, w, h);
  }

  private drawSky(ctx: CanvasRenderingContext2D, w: number, h: number, state: GradientState) {
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    for (const stop of state.stops) {
      grad.addColorStop(stop.pos, stop.color);
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }

  private drawGrain(ctx: CanvasRenderingContext2D, w: number, h: number) {
    const imageData = ctx.getImageData(0, 0, w, h);
    const { data } = imageData;
    for (let i = 0; i < data.length; i += 4) {
      const n = (Math.random() - 0.5) * 18;
      data[i]     = Math.max(0, Math.min(255, data[i]     + n));
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + n));
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + n));
    }
    ctx.putImageData(imageData, 0, 0);
  }
}
