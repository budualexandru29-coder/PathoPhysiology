// Geometrie 2D pentru desenele anatomice: curbe netede, decalaje (offset), eșantionare.
// Toate punctele sunt [x, y] în coordonatele viewBox-ului figurii.

export const r1 = (v) => {
  const t = (Math.round(v * 10) / 10).toFixed(1).replace(/\.0$/, "");
  return t === "-0" ? "0" : t;
};
export const P = ([x, y]) => `${r1(x)} ${r1(y)}`;

export const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
export const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
export const mul = (a, k) => [a[0] * k, a[1] * k];
export const len = (a) => Math.hypot(a[0], a[1]);
export const norm = (a) => { const l = len(a) || 1; return [a[0] / l, a[1] / l]; };
export const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
export const perp = (a) => [-a[1], a[0]];
export const dist = (a, b) => len(sub(a, b));
export const rot = ([x, y], ang, c = [0, 0]) => {
  const s = Math.sin(ang), k = Math.cos(ang), dx = x - c[0], dy = y - c[1];
  return [c[0] + dx * k - dy * s, c[1] + dx * s + dy * k];
};

/** Polilinie dreaptă. */
export function poly(pts, closed = false) {
  return pts.map((p, i) => (i ? "L" : "M") + P(p)).join("") + (closed ? "Z" : "");
}

/** Catmull-Rom prin toate punctele, convertit în Bézier cubic. tension 1 = standard. */
export function smooth(pts, closed = false, tension = 1) {
  const n = pts.length;
  if (n < 2) return "";
  if (n === 2 && !closed) return poly(pts);
  const at = (i) => closed ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
  const k = tension / 6;
  let d = "M" + P(pts[0]);
  const last = closed ? n : n - 1;
  for (let i = 0; i < last; i++) {
    const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
    const c1 = [p1[0] + (p2[0] - p0[0]) * k, p1[1] + (p2[1] - p0[1]) * k];
    const c2 = [p2[0] - (p3[0] - p1[0]) * k, p2[1] - (p3[1] - p1[1]) * k];
    d += `C${P(c1)} ${P(c2)} ${P(p2)}`;
  }
  return d + (closed ? "Z" : "");
}

/** Eșantionează curba Catmull-Rom ca polilinie densă (pentru offset, lungimi, poziții). */
export function sampleSmooth(pts, closed = false, per = 12, tension = 1) {
  const n = pts.length;
  const at = (i) => closed ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
  const k = tension / 6, out = [];
  const last = closed ? n : n - 1;
  for (let i = 0; i < last; i++) {
    const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
    const c1 = [p1[0] + (p2[0] - p0[0]) * k, p1[1] + (p2[1] - p0[1]) * k];
    const c2 = [p2[0] - (p3[0] - p1[0]) * k, p2[1] - (p3[1] - p1[1]) * k];
    for (let j = 0; j < per; j++) {
      const t = j / per, u = 1 - t;
      out.push([
        u * u * u * p1[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p2[0],
        u * u * u * p1[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p2[1],
      ]);
    }
  }
  if (!closed) out.push(pts[n - 1]);
  return out;
}

/** Normalele (unitare) ale unei polilinii, mediate la vârfuri. */
export function normals(pts, closed = false) {
  const n = pts.length;
  return pts.map((p, i) => {
    const a = closed ? pts[(i - 1 + n) % n] : pts[Math.max(0, i - 1)];
    const b = closed ? pts[(i + 1) % n] : pts[Math.min(n - 1, i + 1)];
    return norm(perp(sub(b, a)));
  });
}

/** Decalează o polilinie cu d (pozitiv = spre stânga sensului de parcurgere). d poate fi funcție de t∈[0,1]. */
export function offset(pts, d, closed = false) {
  const N = normals(pts, closed), L = cumLen(pts), T = L[L.length - 1] || 1;
  return pts.map((p, i) => add(p, mul(N[i], typeof d === "function" ? d(L[i] / T, i) : d)));
}

export function cumLen(pts) {
  const out = [0];
  for (let i = 1; i < pts.length; i++) out.push(out[i - 1] + dist(pts[i - 1], pts[i]));
  return out;
}

/** Punctul și tangenta la fracțiunea t din lungimea poliliniei. */
export function along(pts, t) {
  const L = cumLen(pts), T = L[L.length - 1], s = Math.max(0, Math.min(1, t)) * T;
  let i = 1;
  while (i < L.length - 1 && L[i] < s) i++;
  const seg = L[i] - L[i - 1] || 1, f = (s - L[i - 1]) / seg;
  return { p: lerp(pts[i - 1], pts[i], f), dir: norm(sub(pts[i], pts[i - 1])) };
}

/** Partea din polilinie între fracțiunile t0 și t1. */
export function slice(pts, t0, t1) {
  const L = cumLen(pts), T = L[L.length - 1], a = t0 * T, b = t1 * T, out = [along(pts, t0).p];
  for (let i = 0; i < pts.length; i++) if (L[i] > a && L[i] < b) out.push(pts[i]);
  out.push(along(pts, t1).p);
  return out;
}

/** Contur închis al unui tub de rază variabilă r(t) în jurul liniei mediane, cu capete rotunjite. */
export function ribbon(pts, r, { caps = true } = {}) {
  const rr = typeof r === "function" ? r : () => r;
  const left = offset(pts, (t) => rr(t)), right = offset(pts, (t) => -rr(t));
  const capPts = (c, from, to, rad) => {
    const out = [], a0 = Math.atan2(from[1] - c[1], from[0] - c[0]);
    for (let k = 1; k < 6; k++) out.push([c[0] + Math.cos(a0 + Math.PI * k / 6) * rad, c[1] + Math.sin(a0 + Math.PI * k / 6) * rad]);
    return out;
  };
  const n = pts.length;
  const endCap = caps ? capPts(pts[n - 1], left[n - 1], right[n - 1], rr(1)) : [];
  const startCap = caps ? capPts(pts[0], right[0], left[0], rr(0)) : [];
  return [...left, ...endCap, ...right.reverse(), ...startCap];
}

/** Elipsă ca listă de puncte. */
export function ellipse(cx, cy, rx, ry, n = 24, ang = 0) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    out.push(rot([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry], ang, [cx, cy]));
  }
  return out;
}

/** Cerc „organic”: rază modulată de o funcție deterministă (pentru lobuli de grăsime, celule). */
export function lumpy(cx, cy, r, n = 9, amp = 0.12, seed = 1) {
  const rnd = rng(seed), out = [];
  const ph = rnd() * 6.28;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const k = 1 + amp * (Math.sin(a * 2 + ph) * 0.6 + (rnd() - 0.5));
    out.push([cx + Math.cos(a) * r * k, cy + Math.sin(a) * r * k]);
  }
  return out;
}

/** Generator pseudo-aleator determinist (mulberry32), ca desenul să iasă identic la fiecare build. */
export function rng(seed = 1) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Bounding box al unor puncte. */
export function bbox(pts) {
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const x = Math.min(...xs), y = Math.min(...ys);
  return { x, y, w: Math.max(...xs) - x, h: Math.max(...ys) - y };
}

/** Transformare afină [a b c d e f] aplicată unui punct. */
export const affine = (m, [x, y]) => [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]];
export const matrixAttr = (m) => `matrix(${m.map((v) => +v.toFixed(4)).join(" ")})`;
