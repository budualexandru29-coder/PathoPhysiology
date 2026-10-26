// Î11 · Febra, de la pirogen la termostat. Trei niveluri în aceeași planșă:
//  1. țesutul: bacterii Gram-negative (membrana externă cu lipopolizaharid), opsonizate de complement (C3b) și fagocitate
//     de un macrofag, care eliberează pirogeni endogeni (IL-1, TNF-α, IL-6) în sânge;
//  2. creierul în secțiune mediosagitală, cu OVLT în lama terminală, deasupra chiasmei optice, și o lupă pe un capilar
//     al OVLT: endoteliu fenestrat (fără barieră hematoencefalică), COX-2 în celula endotelială, PGE2 (formula scheletică),
//     receptorii EP3 ai unui neuron din aria preoptică;
//  3. graficul: valoarea de referință (punctat) și temperatura centrală pe fazele febrei.
import { smooth, poly, ellipse, lumpy, rng, sampleSmooth, offset, ribbon, along } from "./lib/geo.mjs";
import { vessels, organ, cutEnd } from "./lib/an.mjs";
import { brainMedSvg } from "./parts/brain-med.mjs";

export const W = 420, H = 446;
const P2 = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;

/* glife pentru citokine (schematice, nu structuri): IL-1β = trefoil, TNF-α = homotrimer, IL-6 = mănunchi de 4 helixuri */
export function cytokine(kind, x, y, s = 1, cls = "") {
  if (kind === "il1") return `<g class="ck il1 ${cls}">${[0, 1, 2].map((k) => { const a = -Math.PI / 2 + k * 2 * Math.PI / 3; return `<circle cx="${(x + Math.cos(a) * 2.3 * s).toFixed(1)}" cy="${(y + Math.sin(a) * 2.3 * s).toFixed(1)}" r="${(2.2 * s).toFixed(1)}"/>`; }).join("")}</g>`;
  if (kind === "tnf") return `<g class="ck tnf ${cls}">${[0, 1, 2].map((k) => { const a = -Math.PI / 2 + k * 2 * Math.PI / 3; return `<circle cx="${(x + Math.cos(a) * 2.1 * s).toFixed(1)}" cy="${(y + Math.sin(a) * 2.1 * s).toFixed(1)}" r="${(1.9 * s).toFixed(1)}"/>`; }).join("")}<path d="M${P2([x, y - 2.1 * s])}L${P2([x + 1.8 * s, y + 1.05 * s])}L${P2([x - 1.8 * s, y + 1.05 * s])}Z"/></g>`;
  return `<g class="ck il6 ${cls}">${[0, 1, 2, 3].map((k) => `<rect x="${(x - 4 * s + k * 2.05 * s).toFixed(1)}" y="${(y - 3.6 * s + (k % 2) * 0.8 * s).toFixed(1)}" width="${(1.8 * s).toFixed(1)}" height="${(6.4 * s).toFixed(1)}" rx="${(0.9 * s).toFixed(1)}"/>`).join("")}</g>`;
}

/* PGE2, formula scheletică simplificată: ciclopentanona (C9 =O, C11 –OH) cu cele două lanțuri în „ac de păr” (α cu –COOH, ω cu –OH la C15) */
export function pge2(x, y, s = 1, cls = "") {
  const ring = [0, 1, 2, 3, 4].map((k) => { const a = Math.PI / 2 + k * 2 * Math.PI / 5 + Math.PI; return [x + Math.cos(a) * 3.4 * s, y + Math.sin(a) * 3.4 * s]; });
  const zig = (p0, n, up) => { const out = [p0]; for (let i = 1; i <= n; i++) out.push([p0[0] + i * 3 * s, p0[1] + (i % 2 ? -1.6 : 0) * s * (up ? 1 : -1)]); return out; };
  const a = zig(ring[1], 6, true), w = zig(ring[2], 6, false);
  const kO = [ring[4][0] - 2.6 * s, ring[4][1] - 1.6 * s], hO = [ring[3][0] - 2.4 * s, ring[3][1] + 2 * s];
  return `<g class="pge ${cls}"><path class="pg-b" d="${poly(ring, true)}M${P2(ring[4])}L${P2(kO)}M${P2([ring[4][0] - 0.4 * s, ring[4][1] + 0.9 * s])}L${P2([kO[0] - 0.4 * s, kO[1] + 0.9 * s])}M${P2(ring[3])}L${P2(hO)}${poly(a)}${poly(w)}"/><circle class="pg-o" cx="${kO[0].toFixed(1)}" cy="${kO[1].toFixed(1)}" r="${(1.1 * s).toFixed(1)}"/><circle class="pg-o" cx="${hO[0].toFixed(1)}" cy="${hO[1].toFixed(1)}" r="${(1.1 * s).toFixed(1)}"/><circle class="pg-o" cx="${a[a.length - 1][0].toFixed(1)}" cy="${a[a.length - 1][1].toFixed(1)}" r="${(1.1 * s).toFixed(1)}"/><circle class="pg-o" cx="${w[w.length - 2][0].toFixed(1)}" cy="${(w[w.length - 2][1] + 1.6 * s).toFixed(1)}" r="${(1 * s).toFixed(1)}"/></g>`;
}

/* bacterie Gram-negativă: bastonaș cu membrana externă (LPS ca franjuri scurte) și opsonine C3b */
function bacterium(cx, cy, ang, len = 26, wid = 9.5, opson = true, cls = "") {
  const ax = [Math.cos(ang), Math.sin(ang)], nx = [-ax[1], ax[0]];
  const pts = [];
  for (let i = 0; i <= 24; i++) { const t = i / 24 * Math.PI * 2; const ex = Math.cos(t), ey = Math.sin(t); const u = Math.sign(ex) * Math.min(1, Math.abs(ex) * 1.4) * (len / 2 - wid / 2) + ex * wid / 2, v = ey * wid / 2; pts.push([cx + ax[0] * u + nx[0] * v, cy + ax[1] * u + nx[1] * v]); }
  const outer = smooth(pts, true);
  const inner = smooth(offset(pts, -1.3, true), true);
  let fringe = ""; pts.forEach((p, i) => { if (i % 1 === 0) { const q = offset([pts[(i + pts.length - 1) % pts.length], p, pts[(i + 1) % pts.length]], 2.4)[1]; fringe += `M${P2(p)}L${P2(q)}`; } });
  const R = rng(Math.round(cx * 7 + cy));
  const c3b = opson ? pts.filter((_, i) => i % 4 === 1).map((p, i) => { const q = offset([pts[0], p, pts[2]], 3.2)[1]; return `<circle class="c3b" cx="${(p[0] + (q[0] - p[0]) * (0.9 + R() * 0.2)).toFixed(1)}" cy="${(p[1] + (q[1] - p[1]) * (0.9 + R() * 0.2)).toFixed(1)}" r="1.4"/>`; }).join("") : "";
  return `<g class="bac ${cls}"><path class="lps" d="${fringe}"/><path class="bac-o" d="${outer}"/><path class="bac-i" d="${inner}"/><path class="bac-n" d="M${P2([cx - ax[0] * len * 0.22, cy - ax[1] * len * 0.22])}C${P2([cx - ax[0] * 2 + nx[0] * 2.4, cy - ax[1] * 2 + nx[1] * 2.4])} ${P2([cx + ax[0] * 2 - nx[0] * 2.4, cy + ax[1] * 2 - nx[1] * 2.4])} ${P2([cx + ax[0] * len * 0.22, cy + ax[1] * len * 0.22])}"/>${c3b}</g>`;
}

export function build() {
  /* ---------- 2. creierul medial, cu OVLT ---------- */
  const k = 12.6, bx = (x) => 16 + (x + 9.6) * k, by = (y) => 12 + (y + 8.8) * k;
  const BM = brainMedSvg(([x, y]) => [bx(x), by(y)], k);
  const ovlt = [bx(1.82), by(-1.05)];
  const lens = { c: [322, 108], r: 86 };
  // liniile lupei: tangentele comune exterioare ale cercului mic (OVLT) și ale celui mare
  const small = 9, d = Math.hypot(lens.c[0] - ovlt[0], lens.c[1] - ovlt[1]), base = Math.atan2(lens.c[1] - ovlt[1], lens.c[0] - ovlt[0]), phi = Math.acos((lens.r - small) / d);
  const tang = [1, -1].map((sg) => { const a = base + Math.PI + sg * (Math.PI - phi); return [[ovlt[0] + Math.cos(a) * small, ovlt[1] + Math.sin(a) * small], [lens.c[0] + Math.cos(a) * lens.r, lens.c[1] + Math.sin(a) * lens.r]]; });
  const callout = `<circle class="fv-spot" cx="${ovlt[0].toFixed(1)}" cy="${ovlt[1].toFixed(1)}" r="${small}"/>` + tang.map(([a, b]) => `<path class="fv-call" d="M${P2(a)}L${P2(b)}"/>`).join("");

  /* ---------- lupa: capilarul OVLT, endoteliul fenestrat, neuronul preoptic ---------- */
  const L0 = lens.c;
  const cap = [[L0[0] - 96, L0[1] + 30], [L0[0] - 30, L0[1] + 2], [L0[0] + 30, L0[1] - 28], [L0[0] + 96, L0[1] - 56]];
  const capS = sampleSmooth(cap, false, 10);
  const wallU = offset(capS, 17), wallD = offset(capS, -17);
  const lumen = poly([...offset(capS, 14), ...offset(capS, -14).reverse()], true);
  // celulele endoteliale: segmente cu nucleu turtit, despărțite de fenestre (goluri) — fără barieră hematoencefalică
  const endo = (wall, inner, sg) => {
    let s = ""; const n = wall.length;
    for (let i = 0; i < n - 6; i += 7) {
      const seg = wall.slice(i, i + 6), segI = inner.slice(i, i + 6);
      s += `<path class="fv-endo" d="${poly([...seg, ...segI.reverse()], true)}"/>`;
      const m = seg[3], mi = segI[2]; s += `<ellipse class="fv-enuc" cx="${((m[0] + mi[0]) / 2).toFixed(1)}" cy="${((m[1] + mi[1]) / 2).toFixed(1)}" rx="4.2" ry="1.4" transform="rotate(${(Math.atan2(seg[5][1] - seg[0][1], seg[5][0] - seg[0][0]) * 180 / Math.PI).toFixed(0)} ${((m[0] + mi[0]) / 2).toFixed(1)} ${((m[1] + mi[1]) / 2).toFixed(1)})"/>`;
    }
    void sg; return s;
  };
  const capSvg = `<path class="fv-lumen" d="${lumen}"/>${endo(wallU, offset(capS, 14), 1)}${endo(wallD, offset(capS, -14), -1)}`
    + `<g transform="translate(${L0[0] - 52} ${L0[1] + 12}) rotate(-24)"><ellipse class="rbc" rx="6.4" ry="5.4"/><ellipse class="rbc-c" rx="2.6" ry="2.1"/></g>`
    + `<g transform="translate(${L0[0] + 48} ${L0[1] - 40}) rotate(-24)"><ellipse class="rbc" rx="6.4" ry="2.6"/></g>`;
  // citokinele din lumen și receptorii lor pe endoteliu
  const ckLumen = cytokine("il1", L0[0] - 18, L0[1] - 4, 1, "lum a") + cytokine("tnf", L0[0] + 8, L0[1] - 16, 1, "lum b") + cytokine("il6", L0[0] - 60, L0[1] + 15, 1, "lum c") + cytokine("il1", L0[0] + 30, L0[1] - 22, 0.9, "lum d");
  // COX-2 în celula endotelială de jos și PGE2 care difuzează spre neuron
  const cox = [L0[0] - 6, L0[1] + 18];
  const coxSvg = `<g class="cox"><path d="${smooth(lumpy(cox[0], cox[1], 4.6, 9, 0.18, 4), true)}"/><path class="cox-site" d="M${cox[0] - 1.6} ${cox[1] - 2}Q${cox[0] + 1} ${cox[1]} ${cox[0] - 1.6} ${cox[1] + 2}"/></g>`;
  const neuron = { c: [L0[0] + 30, L0[1] + 46], r: 14 };
  const dend = [[[0, -1], 30], [[1, -0.4], 26], [[0.9, 0.7], 24], [[-0.6, 0.9], 22], [[-1, 0.1], 20]].map(([[dx, dy], l], i) => { const a = [neuron.c[0] + dx * neuron.r * 0.9, neuron.c[1] + dy * neuron.r * 0.9], b = [a[0] + dx * l + dy * 6, a[1] + dy * l - dx * 6]; return ribbon(sampleSmooth([a, [(a[0] + b[0]) / 2 + 3, (a[1] + b[1]) / 2], b], false, 5), (t) => 2.6 * (1 - t) + 0.5, { caps: true }); });
  const neuronSvg = `<g class="poa">${dend.map((p) => `<path class="nr-d" d="${poly(p, true)}"/>`).join("")}<path class="nr-s" d="${smooth(lumpy(neuron.c[0], neuron.c[1], neuron.r, 10, 0.12, 9), true)}"/><circle class="nr-n" cx="${neuron.c[0] + 1}" cy="${neuron.c[1]}" r="5.4"/><circle class="nr-nl" cx="${neuron.c[0] + 2}" cy="${neuron.c[1] - 1}" r="1.6"/></g>`;
  const ep3 = [[-0.95, -0.35], [-0.7, -0.75], [-0.25, -1]].map(([dx, dy]) => { const p = [neuron.c[0] + dx * (neuron.r + 0.5), neuron.c[1] + dy * (neuron.r + 0.5)]; return `<path class="ep3" d="M${P2(p)}l${(dx * 3).toFixed(1)} ${(dy * 3).toFixed(1)}m${(-dy * 2).toFixed(1)} ${(dx * 2).toFixed(1)}l${(dy * 4).toFixed(1)} ${(-dx * 4).toFixed(1)}"/>`; }).join("");
  const pgPath = [[cox[0] + 4, cox[1] + 2], [cox[0] + 12, cox[1] + 10], [neuron.c[0] - 18, neuron.c[1] - 14]];
  const pges = [0.2, 0.55, 0.88].map((t, i) => { const a = along(sampleSmooth(pgPath, false, 6), t).p; return pge2(a[0] - 6, a[1], 0.62, `p${i}`); }).join("");
  // impulsurile neuronului: o linie de ieșire spre „termostat”
  const axon = [[neuron.c[0] + 10, neuron.c[1] + 10], [neuron.c[0] + 26, neuron.c[1] + 18], [neuron.c[0] + 46, neuron.c[1] + 14]];
  const lensSvg = `<g clip-path="url(#__U__-lens)"><rect class="fv-np" x="${L0[0] - lens.r}" y="${L0[1] - lens.r}" width="${lens.r * 2}" height="${lens.r * 2}"/>`
    + `<path class="fv-glia" d="${smooth(lumpy(L0[0] + 60, L0[1] + 46, 12, 9, 0.2, 3), true)}"/><path class="fv-glia" d="${smooth(lumpy(L0[0] - 44, L0[1] + 58, 10, 9, 0.2, 5), true)}"/>`
    + capSvg + ckLumen + coxSvg + `<path class="fv-ax" d="${smooth(axon)}"/>` + neuronSvg + ep3 + `<g class="pg-g">${pges}</g>` + `<path class="fv-spike" d="${smooth(axon)}"/></g>`
    + `<circle class="fv-lens" cx="${L0[0]}" cy="${L0[1]}" r="${lens.r}"/><circle class="fv-lens2" cx="${L0[0]}" cy="${L0[1]}" r="${lens.r - 3}"/>`;

  /* ---------- 1. țesutul: bacterii, macrofag, citokine, vas spre creier ---------- */
  const tis = { x: 10, y: 214, w: 206, h: 222 };
  const R = rng(17);
  let coll = ""; for (let i = 0; i < 9; i++) { const y0 = tis.y + 14 + i * 24; const pts = []; for (let x = tis.x - 4; x <= tis.x + tis.w + 4; x += 12) pts.push([x, y0 + Math.sin(x / 19 + i) * 4]); coll += `<path class="fv-coll" d="${smooth(pts)}"/>`; }
  const mac = { c: [92, 348], r: 40 };
  const macOut = lumpy(mac.c[0], mac.c[1], mac.r, 16, 0.16, 21);
  // pseudopodele care cuprind bacteria (fagocitoza)
  const pseudo = [[[118, 314], [134, 300], [146, 304]], [[128, 336], [146, 328], [152, 316]]].map((p) => ribbon(sampleSmooth(p, false, 6), (t) => 7 * (1 - t) + 2.5, { caps: true }));
  const macSvg = `<g class="mac">${pseudo.map((p) => `<path class="mac-b" d="${poly(p, true)}"/>`).join("")}${organ(smooth(macOut, true), "mac-b")}`
    + `<path class="mac-nuc" d="${smooth([[72, 342], [80, 330], [94, 333], [98, 344], [92, 352], [86, 350], [82, 358], [72, 356]], true)}"/>`
    + `<path class="mac-phago" d="${smooth(lumpy(108, 362, 11, 10, 0.1, 6), true)}"/>`
    + bacterium(108, 362, 0.6, 16, 7, false, "eaten")
    + [[70, 318], [118, 340], [64, 372], [96, 384], [112, 316]].map(([x, y]) => `<circle class="mac-lyso" cx="${x}" cy="${y}" r="3.4"/>`).join("") + `</g>`;
  const bacts = bacterium(150, 304, -0.5, 26, 9.5, true, "b0") + bacterium(176, 262, 0.3, 26, 9.5, true, "b1") + bacterium(46, 262, 1.2, 24, 9, true, "b2") + bacterium(40, 410, -0.9, 24, 9, true, "b3");
  // vasul care duce citokinele spre creier (o venulă care se varsă în circulația generală, desenată schematic)
  const vpath = [[tis.x + tis.w + 6, 424], [196, 404], [178, 372], [176, 330], [194, 284], [212, 236], [230, 192], [256, 152]];
  const vessel = vessels([{ pts: vpath, w: 14, k: "a", cls: "fv-vs" }]);
  const ckFlow = ["il1", "tnf", "il6", "il1", "tnf", "il6"].map((kd, i) => { const a = along(sampleSmooth(vpath, false, 8), 0.12 + i * 0.13).p; return cytokine(kd, a[0], a[1], 1.05, `fl f${i}`); }).join("");
  const ckOut = [["il1", 140, 344], ["tnf", 132, 372], ["il6", 150, 360]].map(([kd, x, y], i) => cytokine(kd, x, y, 1.1, `out o${i}`)).join("");
  const tissue = `<g clip-path="url(#__U__-tis)"><rect class="fv-tis" x="${tis.x}" y="${tis.y}" width="${tis.w}" height="${tis.h}"/>${coll}</g><rect class="fv-tis-e" x="${tis.x}" y="${tis.y}" width="${tis.w}" height="${tis.h}" rx="10"/>`;

  /* ---------- 3. graficul: valoarea de referință și temperatura centrală ---------- */
  const G = { x: 252, y: 236, w: 154, h: 150 };
  const ty = (T) => G.y + G.h - (T - 36) / 5.5 * G.h;         // 36 … 41,5 °C
  const tx = [G.x + 6, G.x + 22, G.x + 34, G.x + 46, G.x + 74, G.x + 108, G.x + 138];  // momentele fazelor 0–6
  const SP = 39.2;
  const spD = `M${G.x} ${ty(37).toFixed(1)}H${tx[3]}V${ty(SP).toFixed(1)}H${tx[6] - 14}V${ty(37).toFixed(1)}H${G.x + G.w}`;
  const tcPts = [[G.x, 37], [tx[3], 37], [tx[3] + 10, 37.15], [tx[4], 38.1], [tx[5] - 14, SP - 0.05], [tx[5], SP], [tx[6] - 14, SP], [tx[6], 38.2], [G.x + G.w - 4, 37.05], [G.x + G.w, 37]].map(([x, T]) => [x, ty(T)]);
  const bands = [[tx[3], tx[5] - 14, "I"], [tx[5] - 14, tx[6] - 14, "II"], [tx[6] - 14, G.x + G.w, "III"]];
  let chart = bands.map(([a, b, n], i) => `<rect class="ch-band b${i}" x="${a.toFixed(1)}" y="${G.y}" width="${(b - a).toFixed(1)}" height="${G.h}"/><text class="ch-ph" x="${((a + b) / 2).toFixed(1)}" y="${G.y + 11}" text-anchor="middle" data-ui>${n}</text>`).join("");
  [37, 38, 39, 40, 41].forEach((T) => { chart += `<path class="ch-grid" d="M${G.x} ${ty(T).toFixed(1)}H${G.x + G.w}"/><text class="ch-t" x="${G.x - 4}" y="${(ty(T) + 3).toFixed(1)}" text-anchor="end" data-ui>${T}</text>`; });
  chart += `<path class="ch-ax" d="M${G.x} ${G.y}V${G.y + G.h}H${G.x + G.w}"/><text class="ch-u" x="${G.x - 4}" y="${G.y - 6}" text-anchor="end" data-ui>°C</text><text class="ch-u" x="${G.x + G.w}" y="${G.y + G.h + 13}" text-anchor="end" data-ui>timp</text>`;
  chart += `<path class="ch-sp" d="${spD}"/><path class="ch-tc" d="${smooth(tcPts, false, 0.6)}"/>`;
  const tcAt = (x) => { const s = sampleSmooth(tcPts, false, 12, 0.6); let best = s[0]; s.forEach((p) => { if (Math.abs(p[0] - x) < Math.abs(best[0] - x)) best = p; }); return best[1]; };
  const marks = tx.map((x) => ({ x, tc: +tcAt(x).toFixed(1), sp: +(x >= tx[3] && x < tx[6] - 14 ? ty(SP) : ty(37)).toFixed(1) }));

  return {
    W, H,
    defs: BM.defs + `<clipPath id="__U__-lens"><circle cx="${L0[0]}" cy="${L0[1]}" r="${lens.r - 2}"/></clipPath><clipPath id="__U__-tis"><rect x="${tis.x}" y="${tis.y}" width="${tis.w}" height="${tis.h}" rx="10"/></clipPath>`,
    L: {
      brain: BM.brain + BM.sulci + BM.cc + BM.thal + BM.hypo + BM.sella + BM.stem + BM.cbl,
      hypoD: BM.hypoD, callout, lens: lensSvg,
      tissue, bacts, mac: macSvg, ckOut, vessel, ckFlow,
      chart, chartFrame: `<rect class="ch-card" x="${G.x - 26}" y="${G.y - 20}" width="${G.w + 36}" height="${G.h + 40}" rx="10"/>`,
    },
    G, marks, ovlt: ovlt.map((v) => +v.toFixed(1)), lens, flowD: smooth(vpath),
    hits: {
      bac: [{ cx: 150, cy: 304, r: 18 }, { cx: 176, cy: 262, r: 18 }, { cx: 46, cy: 262, r: 16 }, { cx: 40, cy: 410, r: 16 }],
      mac: { cx: mac.c[0], cy: mac.c[1], r: mac.r + 4 }, ck: { x: 168, y: 200, w: 60, h: 220 },
      ovlt: { cx: ovlt[0], cy: ovlt[1], r: 14 }, endo: { x: L0[0] - 80, y: L0[1] - 50, w: 120, h: 70 }, pge: { cx: cox[0] + 18, cy: cox[1] + 16, r: 18 }, poa: { cx: neuron.c[0], cy: neuron.c[1], r: 22 },
      chart: { x: G.x - 26, y: G.y - 20, w: G.w + 36, h: G.h + 40 },
    },
    badges: { bac: [26, 232], mac: [42, 306], ck: [204, 318], ovlt: [ovlt[0] - 16, ovlt[1] + 22], endo: [L0[0] - 72, L0[1] - 52], pge: [cox[0] - 4, cox[1] + 40], poa: [neuron.c[0] + 34, neuron.c[1] - 20], chart: [G.x + G.w + 6, G.y - 12] },
  };
}

export function preview() {
  const A = build(), L = A.L, s = (x) => x.replaceAll("__U__", "pv");
  return { viewBox: `0 0 ${W} ${H}`, svg: s(`<defs>${A.defs}</defs>${L.brain}${L.callout}${L.tissue}${L.vessel}${L.ckFlow}${L.lens}${L.mac}${L.bacts}${L.ckOut}${L.chartFrame}${L.chart}`) };
}
