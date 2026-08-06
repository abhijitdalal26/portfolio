"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

type Stop = [number, [number, number, number]];
type PaletteSet = Record<"light" | "dark", Stop[]>;

// Swap PALETTE_CHOICE to switch the whole hero's color story.
const PALETTE_CHOICE: keyof typeof PALETTE_SETS = "blue";

const PALETTE_SETS: Record<"blue" | "fire", PaletteSet> = {
  blue: {
    dark: [
      [0.00, [18, 18, 18]],
      [0.32, [26, 41, 66]],
      [0.60, [59, 130, 246]],
      [0.84, [147, 197, 253]],
      [1.00, [242, 240, 237]],
    ],
    light: [
      [0.00, [250, 250, 249]],
      [0.32, [219, 234, 254]],
      [0.60, [37, 99, 235]],
      [0.84, [30, 58, 138]],
      [1.00, [17, 17, 16]],
    ],
  },
  fire: {
    dark: [
      [0.00, [12, 9, 8]],
      [0.28, [64, 16, 10]],
      [0.55, [201, 60, 20]],
      [0.78, [244, 143, 22]],
      [1.00, [255, 245, 202]],
    ],
    light: [
      [0.00, [250, 250, 249]],
      [0.28, [250, 213, 165]],
      [0.55, [224, 110, 24]],
      [0.78, [140, 32, 15]],
      [1.00, [28, 10, 6]],
    ],
  },
};

const PALETTES = PALETTE_SETS[PALETTE_CHOICE];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function colorAt(t: number, stops: Stop[]): [number, number, number] {
  for (let i = 0; i < stops.length - 1; i++) {
    const [t0, c0] = stops[i];
    const [t1, c1] = stops[i + 1];
    if (t >= t0 && t <= t1) {
      const lt = (t - t0) / (t1 - t0 || 1);
      return [
        Math.round(lerp(c0[0], c1[0], lt)),
        Math.round(lerp(c0[1], c1[1], lt)),
        Math.round(lerp(c0[2], c1[2], lt)),
      ];
    }
  }
  return stops[stops.length - 1][1];
}

function buildLUT(iter: number, stops: Stop[]) {
  const lut = new Uint8ClampedArray((iter + 1) * 3);
  for (let i = 0; i <= iter; i++) {
    const c = colorAt(Math.pow(i / iter, 0.45), stops);
    lut[i * 3] = c[0];
    lut[i * 3 + 1] = c[1];
    lut[i * 3 + 2] = c[2];
  }
  return lut;
}

const MAX_ITER = 130;
const RENDER_W = 640;

/**
 * Full-bleed animated background (sibling pattern to WaveBg) — the parent
 * is responsible for `position: relative` + a height; this fills it via
 * `position: absolute; inset: 0`. Purely ambient: it auto-cycles through a
 * loop of curated Julia constants and isn't cursor-interactive — earlier
 * cursor-follow behavior barely changed the shape moment to moment (only
 * the waypoints themselves look distinct), so it wasn't worth the extra
 * event listeners and per-move recompute.
 */
export function JuliaHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const themeRef = useRef(resolvedTheme);

  useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const parent = wrap?.parentElement;
    if (!canvas || !wrap || !parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let aspect = 2;
    let lastW = 0, lastH = 0;
    function resize() {
      const rect = parent!.getBoundingClientRect();
      const w = Math.round(rect.width), h = Math.round(rect.height);
      // Theme toggles can cause tiny reflow ticks (scrollbar, font swap);
      // ignore sub-4px deltas so the canvas is never resized mid-transition,
      // which otherwise aborts the View Transitions API with InvalidStateError.
      if (Math.abs(w - lastW) < 4 && Math.abs(h - lastH) < 4 && lastW !== 0) return;
      lastW = w; lastH = h;
      aspect = w / Math.max(1, h);
      canvas!.width = RENDER_W;
      canvas!.height = Math.round(RENDER_W / aspect);
    }
    resize();
    window.addEventListener("resize", resize);

    let lut = buildLUT(MAX_ITER, PALETTES[themeRef.current === "light" ? "light" : "dark"]);
    let lutTheme = themeRef.current;

    // Julia constant is interpolated along a loop of curated, individually
    // rich constants — a single-radius circle around the origin was tried
    // first, but the Mandelbrot boundary only crosses such a circle in a
    // razor-thin arc, so most of it was either a flat filled blob (inside
    // a bulb) or empty dust (outside entirely). Named points below are all
    // well clear of both failure modes.
    const WAYPOINTS: [number, number][] = [
      [-0.4, 0.6],       // Douady's rabbit
      [-0.8, 0.156],     // spiral dendrite
      [-0.7269, 0.1889], // frost / detailed filigree
      [-0.194, 0.6557],  // dense filament
      [0.28, 0.008],     // thin sparkle dendrite
    ];

    function waypointAt(t: number) {
      const n = WAYPOINTS.length;
      const scaled = ((t % 1) + 1) % 1 * n;
      const i0 = Math.floor(scaled) % n;
      const i1 = (i0 + 1) % n;
      const lt = scaled - Math.floor(scaled);
      const a = WAYPOINTS[i0];
      const b = WAYPOINTS[i1];
      return { x: lerp(a[0], b[0], lt), y: lerp(a[1], b[1], lt) };
    }

    const start = waypointAt(0);
    const current = { x: start.x, y: start.y };
    let idleT = 0;
    let animId = 0;
    let running = true;

    function render() {
      if (themeRef.current !== lutTheme) {
        lut = buildLUT(MAX_ITER, PALETTES[themeRef.current === "light" ? "light" : "dark"]);
        lutTheme = themeRef.current;
      }

      const w = canvas!.width;
      const h = canvas!.height;
      const img = ctx!.createImageData(w, h);
      const data = img.data;
      const cx = current.x;
      const cy = current.y;

      let idx = 0;
      for (let py = 0; py < h; py++) {
        const y = (py / h - 0.5) * (3.0 / aspect);
        for (let px = 0; px < w; px++) {
          const x = (px / w - 0.5) * 3.0;
          let zx = x, zy = y;
          let zx2 = zx * zx, zy2 = zy * zy;
          let iter = 0;
          while (zx2 + zy2 <= 4 && iter < MAX_ITER) {
            zy = 2 * zx * zy + cy;
            zx = zx2 - zy2 + cx;
            zx2 = zx * zx;
            zy2 = zy * zy;
            iter++;
          }
          let off: number;
          if (iter >= MAX_ITER) {
            off = MAX_ITER * 3;
          } else {
            const logZn = Math.log(zx2 + zy2) / 2;
            const nu = Math.log(logZn / Math.LN2) / Math.LN2;
            const smooth = Math.max(0, Math.min(MAX_ITER, Math.round(iter + 1 - nu)));
            off = smooth * 3;
          }
          data[idx++] = lut[off];
          data[idx++] = lut[off + 1];
          data[idx++] = lut[off + 2];
          data[idx++] = 255;
        }
      }
      ctx!.putImageData(img, 0, 0);
    }

    function tick() {
      if (!running) return;

      if (!reduceMotion) {
        idleT += 0.00025;
        const p = waypointAt(idleT);
        current.x = p.x;
        current.y = p.y;
      }

      render();
      if (!reduceMotion) {
        animId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      running = false;
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}
