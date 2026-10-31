/**
 * Faint topographic contour lines radiating out from behind the portrait.
 * Generated once at build time (deterministic math, no randomness, no JS on
 * the client): each line is a closed loop whose radius wobbles with a few
 * slow sine harmonics, drifting a little from one loop to the next so the
 * set reads like terrain contours. Styled + faded in globals.css (.topo).
 */

const SIZE = 1200;
const C = SIZE / 2;
const LOOPS = 17;
const STEPS = 180;

function loopPath(i: number): string {
  const base = 178 + i * 25;
  const grow = 1 + i * 0.35; // outer loops wobble more
  let d = "";
  for (let s = 0; s <= STEPS; s++) {
    const t = (s / STEPS) * Math.PI * 2;
    const r =
      base +
      grow * 5.5 * Math.sin(2 * t + 0.6 + i * 0.21) +
      grow * 3.6 * Math.sin(3 * t + 1.9 - i * 0.17) +
      grow * 1.8 * Math.sin(5 * t + 0.3 + i * 0.29);
    const x = (C + r * Math.cos(t)).toFixed(1);
    const y = (C + r * Math.sin(t)).toFixed(1);
    d += `${s === 0 ? "M" : "L"}${x} ${y}`;
  }
  return d + "Z";
}

const PATHS = Array.from({ length: LOOPS }, (_, i) => loopPath(i));

export function TopoLines() {
  return (
    <svg className="topo" viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true" focusable="false">
      {PATHS.map((d, i) => (
        <path key={i} d={d} className={i % 4 === 3 ? "topo-major" : undefined} />
      ))}
    </svg>
  );
}
