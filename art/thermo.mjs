// Î7 · Termoliza: cele patru căi fizice prin care pielea cedează căldură, desenate la interfața piele–mediu.
// Blocul de piele (același ca la Î1) e suprafața corpului; căldura vine din sângele cald din plexurile dermului.
// Radiația: unde infraroșii care pleacă de pe piele (sau vin de la Soare, când mediul e mai cald).
// Convecția: aerul din stratul lipit de piele se încălzește și e dus de curenți (moleculele roșii), aerul rece vine în loc.
// Conducția: o placă metalică rece așezată pe piele (sau apa, la imersie) preia căldura prin contact.
// Evaporarea: sudoarea iese prin pori, iar moleculele de apă care trec în vapori iau cu ele căldura.
import { iso, slabOf, solidSvg } from "../tools/anima/kit/iso-kit.mjs";
import { smooth, poly, rng } from "./lib/geo.mjs";
import { skinBlock, W as BW, D as BD } from "./parts/skin-block.mjs";

export const W = 420, H = 410;

export function build() {
  const SB = skinBlock({ origin: [86, 128], scale: 1.33, uid: "__U__" });
  const PR = SB.proj, T = SB.anchors.T;
  const top = (u, t, z = 0) => iso([u, BD - t, z], PR);           // punct pe fața de sus (z = înălțimea deasupra pielii)
  const P2 = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;

  /* radiația: unde (sinusoide) care pleacă perpendicular pe piele, spre cer; și razele Soarelui, în sens invers */
  const wave = (a, b, amp = 3.2, per = 9) => {
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, out = [];
    for (let s = 0; s <= L; s += 1.5) { const k = Math.sin(s / per * Math.PI * 2) * amp * Math.min(1, s / 10, (L - s) / 10); out.push([a[0] + ux * s - uy * k, a[1] + uy * s + ux * k]); }
    const tip = b, l = [b[0] - ux * 6 + uy * 3.6, b[1] - uy * 6 - ux * 3.6], r = [b[0] - ux * 6 - uy * 3.6, b[1] - uy * 6 + ux * 3.6];
    return { d: poly(out), head: `M${P2(l)}L${P2(tip)}L${P2(r)}` };
  };
  const radOut = [[46, 30], [58, 42], [64, 18], [52, 10]].map(([u, t], i) => { const a = top(u, t, 2); return wave(a, [a[0] - 30 + i * 12, a[1] - 96 + (i % 2) * 14]); });
  const sun = { c: [376, 44], r: 17 };
  const radIn = [[54, 26], [66, 40], [44, 16]].map(([u, t]) => { const b = top(u, t, 3); return wave([sun.c[0] - 14, sun.c[1] + 12], b); });
  let rays = ""; for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; rays += `M${P2([sun.c[0] + Math.cos(a) * (sun.r + 4), sun.c[1] + Math.sin(a) * (sun.r + 4)])}L${P2([sun.c[0] + Math.cos(a) * (sun.r + 10), sun.c[1] + Math.sin(a) * (sun.r + 10)])}`; }

  /* convecția: linii de curent paralele cu pielea (în stratul de aer de deasupra ei) */
  const stream = [5, 12, 20].map((z, i) => { const pts = []; for (let u = -46; u <= BW + 30; u += 8) pts.push(top(u, 52 - i * 2.5 + Math.sin(u / 22 + i) * 2, z + Math.sin(u / 17 + i) * 2)); return pts; });
  const streamSvg = stream.map((p, i) => `<path class="cv-line l${i}" d="${smooth(p)}"/>`).join("");
  const arrowAt = (pts) => { const b = pts[pts.length - 1], a = pts[pts.length - 2], dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L; return `M${P2([b[0] - ux * 6 + uy * 3.4, b[1] - uy * 6 - ux * 3.4])}L${P2(b)}L${P2([b[0] - ux * 6 - uy * 3.4, b[1] - uy * 6 + ux * 3.4])}`; };
  const R = rng(13);
  const mol = []; stream.forEach((p, i) => { for (let k = 2; k < p.length - 1; k += 3) mol.push({ at: p[k], warm: i === 0 && k > 5 || i === 1 && k > 12 }); });
  const molSvg = mol.map((m, i) => `<circle class="air ${m.warm ? "w" : "c"} m${i % 5}" cx="${m.at[0].toFixed(1)}" cy="${m.at[1].toFixed(1)}" r="${(2 + R() * 0.6).toFixed(1)}"/>`).join("");

  /* conducția: placă metalică rece pe piele (kit: slab izometric) */
  const plan = { x: 8, y: BD - 44, w: 28, d: 30, r: 2 };
  const plate = slabOf(plan, 0, 7, PR, 3, 0.8);
  const plateSvg = `<g class="cd-plate">${solidSvg(plate, { tone: "mid", crease: "faint" })}</g>`;
  const condArrows = [[15, 22], [24, 32], [30, 21]].map(([u, t]) => { const a = top(u, t, -9), b = top(u, t, 9); return `M${P2(a)}L${P2(b)}M${P2([b[0] - 3, b[1] + 5])}L${P2(b)}L${P2([b[0] + 3, b[1] + 5])}`; }).join("");

  /* imersia: un strat de apă peste toată fața de sus, cu suprafața ondulată */
  const wTop = [top(0, BD, 22), top(BW, BD, 22), top(BW, 0, 22), top(0, 0, 22)];
  const water = `<path class="im-water" d="${poly([top(0, 0, 0), top(BW, 0, 0), top(BW, BD, 0), top(BW, BD, 22), top(BW, 0, 22), top(0, 0, 22)], true)}"/><path class="im-top" d="${poly(wTop, true)}"/>`
    + [0.25, 0.5, 0.75].map((f) => { const pts = []; for (let u = 0; u <= BW; u += 6) pts.push(top(u, BD * f + Math.sin(u / 9) * 2, 22)); return `<path class="im-wave" d="${smooth(pts)}"/>`; }).join("");

  const condW = [[20, 30], [50, 14], [80, 36], [104, 20], [118, 44]].map(([u, t]) => { const a = top(u, t, -6), b = top(u, t, 14); return `M${P2(a)}L${P2(b)}M${P2([b[0] - 3, b[1] + 5])}L${P2(b)}L${P2([b[0] + 3, b[1] + 5])}`; }).join("");
  const gain = [[30, 28], [70, 44], [96, 30], [116, 14]].map(([u, t]) => { const a = top(u, t, 20), b = top(u, t, 2); return `M${P2(a)}L${P2(b)}M${P2([b[0] - 3, b[1] - 5])}L${P2(b)}L${P2([b[0] + 3, b[1] - 5])}`; }).join("");

  /* evaporarea: molecule de apă (O roșu, doi H albi) care pleacă din picături */
  const h2o = (x, y, a, cls) => { const o = [x, y], h1 = [x + Math.cos(a - 0.92) * 3.4, y + Math.sin(a - 0.92) * 3.4], h2 = [x + Math.cos(a + 0.92) * 3.4, y + Math.sin(a + 0.92) * 3.4]; return `<g class="h2o ${cls}"><path class="hb" d="M${P2(h1)}L${P2(o)}L${P2(h2)}"/><circle class="h" cx="${h1[0].toFixed(1)}" cy="${h1[1].toFixed(1)}" r="1.5"/><circle class="h" cx="${h2[0].toFixed(1)}" cy="${h2[1].toFixed(1)}" r="1.5"/><circle class="o" cx="${o[0].toFixed(1)}" cy="${o[1].toFixed(1)}" r="2.4"/></g>`; };
  const pores = SB.anchors.pores;
  const vap = []; pores.forEach((p, i) => { for (let k = 0; k < 3; k++) vap.push(h2o(p[0] + (k - 1) * 6 + i * 2, p[1] - 16 - k * 14, k * 1.3 + i, `v v${k}`)); });
  const humid = []; for (let k = 0; k < 18; k++) humid.push(h2o(150 + R() * 230, 24 + R() * 110, R() * 6, "hum"));

  /* căldura adusă de sânge: săgeți din plexul dermului spre suprafață */
  const F = SB.anchors.F;
  const heat = [24, 58, 92].map((u) => { const a = F(u, 30), b = F(u, 9); return `M${P2(a)}L${P2(b)}M${P2([b[0] - 3, b[1] + 5])}L${P2(b)}L${P2([b[0] + 3, b[1] + 5])}`; }).join("");

  const C = SB.anchors.corner;
  return {
    W, H, defs: SB.defs,
    L: {
      skin: SB.halo + SB.body + SB.vess + SB.outline,
      skinTop: SB.top,
      radOut: radOut.map((w, i) => `<path class="rw" d="${w.d}"/><path class="rh" d="${w.head}"/>`).join(""),
      radIn: radIn.map((w) => `<path class="rw" d="${w.d}"/><path class="rh" d="${w.head}"/>`).join(""),
      sun: `<circle class="sun-g" cx="${sun.c[0]}" cy="${sun.c[1]}" r="${sun.r + 12}"/><path class="sun-r" d="${rays}"/><circle class="sun" cx="${sun.c[0]}" cy="${sun.c[1]}" r="${sun.r}"/>`,
      conv: streamSvg + stream.map((p, i) => `<path class="cv-head l${i}" d="${arrowAt(p)}"/>`).join("") + molSvg,
      plate: plateSvg, cond: condArrows,
      water, condW, gain, vap: vap.join(""), humid: humid.join(""), heat,
    },
    hits: {
      rad: { x: top(46, 30)[0] - 50, y: top(46, 30)[1] - 106, w: 100, h: 104 }, conv: { x: top(BW, 50)[0] - 10, y: top(BW, 50, 20)[1] - 18, w: 96, h: 44 }, cond: { x: top(8, 44)[0] - 8, y: top(36, 44, 7)[1] - 14, w: 72, h: 50 },
      evap: pores.map((p) => ({ cx: +p[0].toFixed(1), cy: +(p[1] - 20).toFixed(1), r: 18 })), skin: { x: C.fbl[0], y: C.ftl[1] + 20, w: 110, h: 120 },
    },
    badges: { rad: [top(46, 30)[0] - 44, top(46, 30)[1] - 96], conv: [top(BW, 50)[0] + 78, top(BW, 50, 20)[1] - 6], cond: [top(8, 44)[0] - 14, top(8, 44, 7)[1] - 2], evap: [pores[1][0] + 28, pores[1][1] - 44], skin: [C.fbl[0] - 8, C.ftl[1] + 70] },
  };
}

export function preview() {
  const A = build(), L = A.L, s = (x) => x.replaceAll("__U__", "pv");
  return { viewBox: `0 0 ${W} ${H}`, attrs: 'data-sw="1"', style: "--dil:1", svg: s(`<defs>${A.defs}</defs>${L.sun}${L.skin}<g class="heat">${L.heat}</g>${L.plate}<g class="cond">${L.cond}</g>${L.skinTop}<g class="rad-out">${L.radOut}</g><g class="conv">${L.conv}</g><g class="vap">${L.vap}</g>`) };
}
