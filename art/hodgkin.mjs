// Î16/Î17: limfomul Hodgkin. Patru panouri:
//  A. ganglionul limfatic în secțiune (capsulă, sinus subcapsular, foliculi cu centri germinativi, paracortex, medulară,
//     hil cu arteră, venă și limfatic eferent), cu arhitectura fiecărui subtip;
//  B. o lupă pe micromediul tumoral, celulele aproximativ la scară (~2,3 px/µm): celula Reed–Sternberg și variantele ei,
//     limfocitele, eozinofilele, plasmocitele, histiocitele, fibroblastele și colagenul, o venulă cu endoteliu înalt;
//  C. corpul văzut din față: grupele de ganglioni, splina, ficatul, măduva, hipotalamusul;
//  D. simptomele B, trei grafice cu pragurile din LP (38 °C; nocturne; 10% în 6 luni).
// Culorile din lupă urmează colorația hematoxilină–eozină (nuclei violet, citoplasme și colagen roz, granule eozinofile roșu-portocaliu).
import { smooth, poly, lumpy, rng, sampleSmooth, offset } from "./lib/geo.mjs";
import { cytokine } from "./fever.mjs";

export const W = 420, H = 486;
const P2 = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
const f1 = (v) => (+v).toFixed(1);
const UM = 2.3;                                       // px pe µm în lupă

/* ---------- ajutoare ---------- */
const inPoly = (pt, pts) => { let c = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xi, yi] = pts[i], [xj, yj] = pts[j]; if ((yi > pt[1]) !== (yj > pt[1]) && pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi) c = !c; } return c; };
const scaleAbout = (pts, c, k) => pts.map(([x, y]) => [c[0] + (x - c[0]) * k, c[1] + (y - c[1]) * k]);
const rot = (x, y, a) => [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)];

/* ---------- celulele lupei (H&E) ---------- */
// limfocit mic: ~7 µm, nucleu rotund, dens, care umple aproape toată celula, cromatină în grămezi.
// Sunt sute în lupă, așa că fiecare e o referință (<use>) la unul din câteva modele, cu culorile scrise în model.
const LY_K = [[0.94, 0.4], [1, 2.1], [1.06, 4.3], [0.98, 5.5]];
function lySymbol(id, k, a, t) {
  const r = 3.5 * UM * k, n1 = rot(r * 0.32, 0, a), n2 = rot(-r * 0.2, r * 0.3, a);
  return `<g id="${id}"><circle cx="0" cy="0" r="${f1(r)}" fill="${t ? "#d7cdea" : "#cdc3e0"}" stroke="${t ? "#6f5fa6" : "#8f80b8"}" stroke-width="${t ? 0.6 : 0.4}"/><circle cx="${f1(r * 0.08)}" cy="${f1(r * 0.04)}" r="${f1(r * 0.82)}" fill="#3e2f6e"/><circle cx="${f1(n1[0])}" cy="${f1(n1[1])}" r="${f1(r * 0.2)}" fill="#261b4d"/><circle cx="${f1(n2[0])}" cy="${f1(n2[1])}" r="${f1(r * 0.16)}" fill="#261b4d"/></g>`;
}
const lyDefs = LY_K.map(([k, a], i) => lySymbol(`__U__-ly${i}`, k, a, false)).join("") + LY_K.slice(0, 2).map(([k, a], i) => lySymbol(`__U__-lt${i}`, k, a, true)).join("");
function lymph(x, y, R, cls = "") {
  const t = cls === "t", i = Math.floor(R() * (t ? 2 : 4));
  return `<use href="#__U__-${t ? "lt" : "ly"}${i}" x="${f1(x)}" y="${f1(y)}"/>`;
}
// eozinofil: ~13 µm, nucleu bilobat („ochelari”), citoplasma plină de granule roșu-portocalii
function eos(x, y, R) {
  const r = 6.4 * UM, a = R() * 6.28, sh = lumpy(x, y, r, 12, 0.05, Math.floor(R() * 999));
  let g = ""; for (let i = 0; i < 34; i++) { const t = R() * 6.28, rr = Math.sqrt(R()) * (r - 2); g += `<circle cx="${f1(x + Math.cos(t) * rr)}" cy="${f1(y + Math.sin(t) * rr)}" r="1.05"/>`; }
  const l1 = rot(-r * 0.32, 0, a), l2 = rot(r * 0.32, 0, a);
  return `<g class="hk-eo"><path class="c" d="${smooth(sh, true)}"/><g class="g">${g}</g><path class="br" d="M${P2([x + l1[0], y + l1[1]])}L${P2([x + l2[0], y + l2[1]])}"/><ellipse class="n" cx="${f1(x + l1[0])}" cy="${f1(y + l1[1])}" rx="${f1(r * 0.3)}" ry="${f1(r * 0.38)}" transform="rotate(${f1(a * 57.3)} ${f1(x + l1[0])} ${f1(y + l1[1])})"/><ellipse class="n" cx="${f1(x + l2[0])}" cy="${f1(y + l2[1])}" rx="${f1(r * 0.3)}" ry="${f1(r * 0.38)}" transform="rotate(${f1(a * 57.3)} ${f1(x + l2[0])} ${f1(y + l2[1])})"/></g>`;
}
// plasmocit: oval, citoplasmă bazofilă, nucleu excentric cu cromatina „în spițe de roată”, halou perinuclear (aparatul Golgi)
function plasma(x, y, R) {
  const a = R() * 6.28, rx = 6.2 * UM, ry = 4.6 * UM;
  const nc = rot(rx * 0.42, 0, a), hc = rot(-rx * 0.05, 0, a);
  const nx = x + nc[0], ny = y + nc[1], nr = 2.7 * UM;
  let k = `<circle cx="${f1(nx)}" cy="${f1(ny)}" r="1.2"/>`; for (let i = 0; i < 7; i++) { const t = i / 7 * 6.28 + a; k += `<circle cx="${f1(nx + Math.cos(t) * nr * 0.7)}" cy="${f1(ny + Math.sin(t) * nr * 0.7)}" r="1.15"/>`; }
  return `<g class="hk-pl"><ellipse class="c" cx="${f1(x)}" cy="${f1(y)}" rx="${f1(rx)}" ry="${f1(ry)}" transform="rotate(${f1(a * 57.3)} ${f1(x)} ${f1(y)})"/><ellipse class="hof" cx="${f1(x + hc[0])}" cy="${f1(y + hc[1])}" rx="${f1(rx * 0.3)}" ry="${f1(ry * 0.5)}" transform="rotate(${f1(a * 57.3)} ${f1(x + hc[0])} ${f1(y + hc[1])})"/><circle class="n" cx="${f1(nx)}" cy="${f1(ny)}" r="${f1(nr)}"/><g class="k">${k}</g></g>`;
}
// histiocit (macrofag): ~20 µm, citoplasmă palidă, abundentă, nucleu reniform
function histio(x, y, R, epith = false) {
  const r = (epith ? 8 : 9.5) * UM, a = R() * 6.28;
  const sh = epith ? Array.from({ length: 16 }, (_, i) => { const t = i / 16 * 6.28; const p = rot(Math.cos(t) * r * 1.35, Math.sin(t) * r * 0.72, a); return [x + p[0], y + p[1]]; }) : lumpy(x, y, r, 14, 0.12, Math.floor(R() * 999));
  const nuc = Array.from({ length: 12 }, (_, i) => { const t = i / 12 * 6.28; const bean = 1 - 0.28 * Math.max(0, Math.cos(t)); const p = rot(Math.cos(t) * r * (epith ? 0.58 : 0.42) * bean, Math.sin(t) * r * 0.26, a); return [x + p[0], y + p[1]]; });
  let v = ""; if (!epith) for (let i = 0; i < 4; i++) { const t = R() * 6.28, rr = r * (0.55 + R() * 0.25); v += `<circle class="v" cx="${f1(x + Math.cos(t) * rr)}" cy="${f1(y + Math.sin(t) * rr)}" r="${f1(1.2 + R() * 1.2)}"/>`; }
  return `<g class="hk-hi"><path class="c" d="${smooth(sh, true)}"/>${v}<path class="n" d="${smooth(nuc, true)}"/></g>`;
}
// fibroblast: fusiform, nucleu alungit
function fibro(x, y, a, l = 18) {
  const p = (u, v) => { const q = rot(u, v, a); return [x + q[0], y + q[1]]; };
  return `<g class="hk-fb"><path class="c" d="${smooth([p(-l, 0), p(-6, -2.2), p(6, -2.2), p(l, 0), p(6, 2.2), p(-6, 2.2)], true)}"/><ellipse class="n" cx="${f1(x)}" cy="${f1(y)}" rx="${f1(l * 0.45)}" ry="1.7" transform="rotate(${f1(a * 57.3)} ${f1(x)} ${f1(y)})"/></g>`;
}
// nucleu de celulă Hodgkin: membrană groasă, cromatină veziculoasă, nucleol mare eozinofil cu halou clar
function hNucleus(cx, cy, rx, ry, a, nr, R) {
  let st = ""; for (let i = 0; i < 9; i++) { const t = R() * 6.28, rr = Math.sqrt(R()) * 0.8; const q = rot(Math.cos(t) * rx * rr, Math.sin(t) * ry * rr, a); st += `<circle cx="${f1(cx + q[0])}" cy="${f1(cy + q[1])}" r=".8"/>`; }
  return `<ellipse class="hn" cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(rx)}" ry="${f1(ry)}" transform="rotate(${f1(a * 57.3)} ${f1(cx)} ${f1(cy)})"/><g class="hs">${st}</g><circle class="halo" cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(nr + 1.6)}"/><circle class="nl" cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(nr)}"/>`;
}
// celula Reed–Sternberg clasică: ~36 µm, doi nuclei în oglindă, fiecare cu nucleol mare („ochi de bufniță”)
function rsCell(x, y, R, s = 1) {
  const r = 18 * UM * s, sh = lumpy(x, y, r, 18, 0.06, 7);
  const d = 6.4 * UM * s;
  return `<g class="hk-rs"><path class="c" d="${smooth(sh, true)}"/>${hNucleus(x - d, y + 1, 5.6 * UM * s, 7 * UM * s, 0.16, 2.1 * UM * s, R)}${hNucleus(x + d, y - 1, 5.6 * UM * s, 7 * UM * s, -0.16, 2.1 * UM * s, R)}</g>`;
}
// celula Hodgkin (varianta mononucleată)
function hCell(x, y, R, s = 1) {
  const r = 13 * UM * s;
  return `<g class="hk-rs"><path class="c" d="${smooth(lumpy(x, y, r, 16, 0.08, 11), true)}"/>${hNucleus(x + 1, y, 6.4 * UM * s, 7.2 * UM * s, 0.4, 2.2 * UM * s, R)}</g>`;
}
// celula lacunară (scleroza nodulară): citoplasma se retrage la fixare și lasă un spațiu clar; nucleu plurilobat, nucleoli mici
function lacunar(x, y, R) {
  const lac = lumpy(x, y, 16 * UM, 16, 0.1, 21), cell = lumpy(x, y, 11 * UM, 14, 0.12, 22);
  const strands = [0.3, 1.7, 3.1, 4.4, 5.6].map((t) => `M${P2([x + Math.cos(t) * 10.6 * UM, y + Math.sin(t) * 10.6 * UM])}L${P2([x + Math.cos(t) * 15 * UM, y + Math.sin(t) * 15 * UM])}`).join("");
  const lob = []; for (let i = 0; i < 44; i++) { const t = i / 44 * 6.28; const rr = 5.4 * UM * (1 + 0.2 * Math.sin(t * 3 + 0.4) + 0.05 * Math.sin(t * 7)); lob.push([x + Math.cos(t) * rr, y + Math.sin(t) * rr * 0.9]); }
  const lobes = `<path class="hn" d="${smooth(lob, true)}"/><path class="fold" d="M${P2([x, y])}L${P2([x + 3.4 * UM, y - 1.2 * UM])}M${P2([x, y])}L${P2([x - 2.4 * UM, y + 3 * UM])}"/>` + [[-1.8, -1.4], [2.4, 1.6]].map(([dx, dy]) => `<circle class="halo" cx="${f1(x + dx * UM)}" cy="${f1(y + dy * UM)}" r="${f1(1.25 * UM)}"/><circle class="nl" cx="${f1(x + dx * UM)}" cy="${f1(y + dy * UM)}" r="${f1(0.85 * UM)}"/>`).join("");
  return `<g class="hk-lac"><path class="lac" d="${smooth(lac, true)}"/><path class="str" d="${strands}"/><g class="hk-rs"><path class="c" d="${smooth(cell, true)}"/>${lobes}</g></g>`;
}
// celula LP („popcorn”), din forma nodulară cu predominanță limfocitară: nucleu plurilobat, pliat, nucleoli mici, multipli
function popcorn(x, y, R) {
  const r = 12 * UM;
  const nuc = []; for (let i = 0; i < 40; i++) { const t = i / 40 * 6.28; const rr = 7.2 * UM * (1 + 0.22 * Math.sin(t * 5 + 0.6) + 0.06 * Math.sin(t * 11)); nuc.push([x + Math.cos(t) * rr, y + Math.sin(t) * rr * 0.86]); }
  const folds = [0.6, 1.9, 3.2, 4.4, 5.6].map((t) => `M${P2([x + Math.cos(t) * 2.4 * UM, y + Math.sin(t) * 2.4 * UM])}Q${P2([x + Math.cos(t + 0.3) * 4.6 * UM, y + Math.sin(t + 0.3) * 4.6 * UM])} ${P2([x + Math.cos(t) * 6.2 * UM, y + Math.sin(t) * 5.2 * UM])}`).join("");
  const nls = [[-2, -2], [2.6, 1], [-0.6, 3], [3, -3]].map(([dx, dy]) => `<circle class="nl" cx="${f1(x + dx * UM)}" cy="${f1(y + dy * UM)}" r="${f1(0.7 * UM)}"/>`).join("");
  void R;
  return `<g class="hk-rs hk-lp"><path class="c" d="${smooth(lumpy(x, y, r, 16, 0.07, 31), true)}"/><path class="hn" d="${smooth(nuc, true)}"/><path class="fold" d="${folds}"/>${nls}</g>`;
}
// celulă Hodgkin pleomorfă (forma săracă în limfocite): nuclei bizari, de mărimi diferite
function pleo(x, y, R, s = 1) {
  const r = 15 * UM * s, sh = lumpy(x, y, r, 14, 0.16, Math.floor(R() * 999));
  const a = R() * 6.28, n1 = rot(-4 * UM * s, 0, a), n2 = rot(5 * UM * s, 2 * UM * s, a);
  return `<g class="hk-rs"><path class="c" d="${smooth(sh, true)}"/>${hNucleus(x + n1[0], y + n1[1], 6.6 * UM * s, 4.6 * UM * s, a, 1.8 * UM * s, R)}${hNucleus(x + n2[0], y + n2[1], 3.6 * UM * s, 5.4 * UM * s, a + 1, 1.5 * UM * s, R)}</g>`;
}

/* ---------- așezarea celulelor în lupă: întâi cele mari, apoi umplutura, fără suprapuneri mari ---------- */
function packer(c, R0, seed) {
  const R = rng(seed), placed = [];
  const free = (x, y, r, k) => placed.every((q) => Math.hypot(q.x - x, q.y - y) > (q.r + r) * (q.big || r > 12 ? 1 : k));
  return {
    R,
    fixed(x, y, r, svg) { placed.push({ x, y, r, big: 1 }); return svg; },
    fill(n, r, draw, k = 0.88, maxTry = 600, area) {
      let s = "", got = 0;
      for (let t = 0; t < maxTry && got < n; t++) {
        const a = R() * 6.28, rr = Math.sqrt(R()) * (R0 + r * 0.3);
        const x = c[0] + Math.cos(a) * rr, y = c[1] + Math.sin(a) * rr;
        if (area && !area(x, y)) continue;
        if (!free(x, y, r, k)) continue;
        placed.push({ x, y, r }); s += draw(x, y, R); got++;
      }
      return s;
    },
    exclude(x, y, r) { placed.push({ x, y, r, big: 1 }); },
  };
}

export function build() {
  /* ================= A. ganglionul ================= */
  const NODE = [[64, 38], [112, 30], [158, 44], [186, 86], [192, 136], [184, 186], [156, 224], [108, 238], [64, 226], [38, 200], [40, 176], [54, 160], [58, 136], [50, 112], [36, 94], [40, 62]];
  const nodeS = sampleSmooth(NODE, true, 8), nodeD = smooth(NODE, true);
  const NC = [118, 134];
  const sinus = smooth(offset(nodeS, 4.2, true).filter((_, i) => i % 2 === 0), true);
  const paraS = scaleAbout(NODE, NC, 0.72), paraD = smooth(paraS, true);
  const hil = [58, 136];
  // medulara: cordoane medulare (ribonuri violet) între sinusuri (fond palid), convergente spre hil
  const medD = smooth([[62, 112], [80, 96], [104, 98], [120, 112], [126, 136], [118, 160], [100, 174], [78, 172], [62, 158], [60, 136]], true);
  const cordP = [[[116, 108], [104, 112], [96, 122], [84, 124], [70, 130]], [[124, 130], [110, 128], [100, 136], [86, 134], [66, 136]], [[118, 156], [106, 150], [98, 152], [86, 144], [68, 142]], [[100, 100], [94, 110], [86, 114], [76, 122]], [[100, 172], [94, 162], [84, 158], [74, 150]], [[104, 112], [108, 124], [100, 136]], [[98, 152], [104, 142]], [[86, 114], [88, 124]], [[84, 158], [88, 148]]];
  const cords = cordP.map((p, i) => `<path class="hk-cord${i > 4 ? " br" : ""}" d="${smooth(p)}"/>`).join("") + [[90, 128], [92, 146], [108, 120], [110, 144], [80, 140]].map(([x, y]) => `<circle class="hk-msin" cx="${x}" cy="${y}" r="1.6"/>`).join("");
  // foliculi cu centru germinativ, de-a lungul corticalei (nu și lângă hil)
  const cortPath = offset(nodeS, 17, true);
  const fol = []; { let acc = 0; for (let i = 1; i < cortPath.length; i++) { acc += Math.hypot(cortPath[i][0] - cortPath[i - 1][0], cortPath[i][1] - cortPath[i - 1][1]); if (acc > 30) { acc = 0; const p = cortPath[i]; if (Math.hypot(p[0] - 58, p[1] - 136) > 52) fol.push(p); } } }
  const follicles = fol.map((p, i) => { const g = [p[0] + (NC[0] - p[0]) * 0.06, p[1] + (NC[1] - p[1]) * 0.06]; return `<circle class="hk-mant" cx="${f1(p[0])}" cy="${f1(p[1])}" r="${12.5 - (i % 3)}"/><circle class="hk-gc" cx="${f1(g[0])}" cy="${f1(g[1])}" r="${8 - (i % 3) * 0.8}"/>`; }).join("");
  // trabeculele: din capsulă spre interior, între foliculi
  const trab = fol.slice(0, -1).map((p, i) => { const q = fol[i + 1], m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; const o = [m[0] + (m[0] - NC[0]) * 0.22, m[1] + (m[1] - NC[1]) * 0.22], e = [m[0] + (NC[0] - m[0]) * 0.36, m[1] + (NC[1] - m[1]) * 0.36]; return `M${P2(o)}L${P2(e)}`; }).join("");
  // hilul: artera, vena, limfaticul eferent, cu capete secționate
  const hilV = [{ d: [[hil[0], hil[1] - 4], [40, 126], [22, 118]], k: "a", w: 5.2 }, { d: [[hil[0], hil[1] + 3], [40, 146], [20, 154]], k: "v", w: 6.4 }, { d: [[hil[0] - 2, hil[1] + 10], [44, 166], [28, 180]], k: "l", w: 4.4 }];
  const hilSvg = hilV.map(({ d, k, w }) => `<path class="hk-hv ${k}" d="${smooth(d)}" style="stroke-width:${w}"/><path class="hk-hv-l ${k}" d="${smooth(d)}" style="stroke-width:${(w * 0.45).toFixed(1)}"/>` + (() => { const e = d[d.length - 1], p = d[d.length - 2], ang = Math.atan2(e[1] - p[1], e[0] - p[0]) * 57.3; return `<g transform="translate(${P2(e)}) rotate(${f1(ang)})"><ellipse class="hk-cut ${k}" rx="${f1(w * 0.26 + 0.6)}" ry="${f1(w * 0.5 + 0.6)}"/><ellipse class="hk-cutl ${k}" rx="${f1(w * 0.15)}" ry="${f1(w * 0.32)}"/></g>`; })()).join("");
  // limfaticele aferente, cu valve, care străbat capsula pe fața convexă
  const aff = [[[88, 6], [92, 18], [94, 31]], [[150, 14], [146, 28], [142, 40]], [[206, 206], [194, 200], [182, 192]]].map((p) => { const e = p[2], s0 = p[1]; const ang = Math.atan2(e[1] - s0[1], e[0] - s0[0]); const v = [0.35, 0.7].map((t) => { const q = [p[0][0] + (e[0] - p[0][0]) * t, p[0][1] + (e[1] - p[0][1]) * t]; const n = [-Math.sin(ang), Math.cos(ang)], u = [Math.cos(ang), Math.sin(ang)]; return `M${P2([q[0] + n[0] * 2.2 - u[0] * 1.6, q[1] + n[1] * 2.2 - u[1] * 1.6])}L${P2([q[0] + u[0] * 1.2, q[1] + u[1] * 1.2])}L${P2([q[0] - n[0] * 2.2 - u[0] * 1.6, q[1] - n[1] * 2.2 - u[1] * 1.6])}`; }).join(""); return `<path class="hk-hv l" d="${smooth(p)}" style="stroke-width:4"/><path class="hk-hv-l l" d="${smooth(p)}" style="stroke-width:1.8"/><path class="hk-valve" d="${v}"/>`; }).join("");

  // texturile subtipurilor, decupate de ganglion
  const R = rng(5);
  const specks = (n, cls, r0, r1, seedR) => { let s = ""; for (let i = 0, t = 0; i < n && t < n * 30; t++) { const x = 30 + seedR() * 166, y = 26 + seedR() * 216; if (!inPoly([x, y], nodeS)) continue; s += `<circle class="${cls}" cx="${f1(x)}" cy="${f1(y)}" r="${f1(r0 + seedR() * (r1 - r0))}"/>`; i++; } return s; };
  // NS: benzi groase de colagen care împart ganglionul în noduli
  const nsBands = [[[40, 92], [86, 100], [120, 84], [168, 64]], [[46, 186], [92, 168], [132, 176], [180, 160]], [[110, 30], [108, 70], [122, 110], [150, 130], [192, 128]], [[84, 236], [96, 200], [116, 170]], [[132, 176], [150, 206], [158, 226]], [[86, 100], [92, 130], [90, 168]]].map((p) => `<path class="hk-band" d="${smooth(p)}"/>`).join("");
  const nsNod = [[80, 70], [140, 70], [72, 140], [130, 140], [168, 100], [168, 186], [110, 206], [62, 206]].map(([x, y], i) => `<path class="hk-nod ns" d="${smooth(lumpy(x, y, 22, 10, 0.14, 40 + i), true)}"/>`).join("");
  // LR și NLPHL: noduli denși de limfocite mici (cei din NLPHL sunt mai mari și mai vagi)
  const lrNod = [[86, 64], [134, 58], [170, 96], [176, 150], [150, 196], [104, 212], [70, 196], [114, 110], [134, 150]].map(([x, y], i) => `<circle class="hk-nod lr" cx="${x}" cy="${y}" r="${13 + (i % 3) * 2}"/>${i % 2 ? `<circle class="hk-gc sm" cx="${x + 2}" cy="${y - 1}" r="4"/>` : ""}`).join("");
  const lpNod = [[92, 70], [150, 76], [176, 138], [140, 190], [88, 196], [116, 134]].map(([x, y], i) => `<path class="hk-nod lp" d="${smooth(lumpy(x, y, 28, 12, 0.08, 60 + i), true)}"/>`).join("");
  // LD: fibroză difuză, dezordonată
  let ldFib = ""; for (let i = 0; i < 26; i++) { const x = 34 + R() * 160, y = 30 + R() * 210; const a = R() * 6.28, l = 16 + R() * 26; ldFib += `<path class="hk-fibl" d="${smooth([[x, y], [x + Math.cos(a) * l * 0.5 + 3, y + Math.sin(a) * l * 0.5 - 2], [x + Math.cos(a) * l, y + Math.sin(a) * l]])}"/>`; }

  const nodeSub = {
    n0: `<path class="hk-cortex" d="${nodeD}"/><path class="hk-para" d="${paraD}"/><path class="hk-med" d="${medD}"/>${cords}${follicles}<path class="hk-trab" d="${trab}"/>`,
    n1: `<path class="hk-lymtis" d="${nodeD}"/>${nsNod}${specks(46, "hk-sp lac", 1.2, 1.9, rng(81))}${specks(40, "hk-sp eo", 0.6, 1, rng(82))}${nsBands}`,
    n2: `<path class="hk-lymtis mc" d="${nodeD}"/>${specks(150, "hk-sp eo", 0.6, 1, rng(83))}${specks(26, "hk-sp rs", 1.1, 1.7, rng(84))}${specks(60, "hk-sp pl", 0.7, 1.1, rng(85))}${specks(120, "hk-sp ly", 0.6, 0.9, rng(90))}`,
    n3: `<path class="hk-lymtis lr" d="${nodeD}"/>${lrNod}${specks(16, "hk-sp rs", 1.2, 1.8, rng(86))}`,
    n4: `<path class="hk-lymtis ld" d="${nodeD}"/>${ldFib}${specks(70, "hk-sp rs", 1.2, 2.2, rng(87))}${specks(40, "hk-sp ly", 0.6, 1, rng(88))}`,
    n5: `<path class="hk-lymtis lp" d="${nodeD}"/>${lpNod}${specks(24, "hk-sp lpc", 1.3, 2, rng(89))}`,
  };
  const nodeSvg = `<g clip-path="url(#__U__-node)">${Object.entries(nodeSub).map(([k, s]) => `<g class="hk-ns ${k}">${s}</g>`).join("")}</g>`
    + `<path class="hk-sinus" d="${sinus}"/><path class="hk-cap" d="${nodeD}"/>`;

  /* ================= B. lupa ================= */
  const spot = [154, 122], small = 10;
  const lens = { c: [312, 140], r: 100 }, Lc = lens.c;
  const dd = Math.hypot(Lc[0] - spot[0], Lc[1] - spot[1]), base = Math.atan2(Lc[1] - spot[1], Lc[0] - spot[0]), phi = Math.acos((lens.r - small) / dd);
  const tang = [1, -1].map((sg) => { const a = base + Math.PI + sg * (Math.PI - phi); return [[spot[0] + Math.cos(a) * small, spot[1] + Math.sin(a) * small], [Lc[0] + Math.cos(a) * lens.r, Lc[1] + Math.sin(a) * lens.r]]; });
  const callout = `<circle class="hk-spot" cx="${spot[0]}" cy="${spot[1]}" r="${small}"/>` + tang.map(([a, b]) => `<path class="hk-call" d="M${P2(a)}L${P2(b)}"/>`).join("");

  // venula (endoteliu înalt, cuboidal) în colțul lupei: pe aici ies citokinele pirogene în sânge
  const VN = [Lc[0] + 58, Lc[1] + 54], vr = 15;
  let hev = `<circle class="hk-vw" cx="${VN[0]}" cy="${VN[1]}" r="${vr}"/><circle class="hk-vl" cx="${VN[0]}" cy="${VN[1]}" r="${vr - 5.6}"/>`;
  for (let i = 0; i < 9; i++) { const t = i / 9 * 6.28; hev += `<ellipse class="hk-ven" cx="${f1(VN[0] + Math.cos(t) * (vr - 2.8))}" cy="${f1(VN[1] + Math.sin(t) * (vr - 2.8))}" rx="2" ry="1.4" transform="rotate(${f1(t * 57.3 + 90)} ${f1(VN[0] + Math.cos(t) * (vr - 2.8))} ${f1(VN[1] + Math.sin(t) * (vr - 2.8))})"/>`; }
  hev += `<g transform="translate(${VN[0] - 2} ${VN[1] + 2}) rotate(20)"><ellipse class="rbc" rx="${f1(3.75 * UM * 0.9)}" ry="${f1(3.5 * UM * 0.9)}"/><ellipse class="rbc-c" rx="${f1(1.5 * UM)}" ry="${f1(1.4 * UM)}"/></g>`;
  const pyr = cytokine("il1", VN[0] + 4, VN[1] - 5, 0.8, "py a") + cytokine("tnf", VN[0] - 6, VN[1] - 4, 0.8, "py b") + cytokine("il6", VN[0] + 5, VN[1] + 6, 0.7, "py c");
  // citokinele pirogene pe drum spre venulă, din celulele reactive
  const pyrOut = cytokine("il1", Lc[0] + 30, Lc[1] + 36, 0.9, "po a") + cytokine("tnf", Lc[0] + 40, Lc[1] + 22, 0.9, "po b") + cytokine("il6", Lc[0] + 22, Lc[1] + 50, 0.8, "po c");

  const MAIN = [Lc[0] - 16, Lc[1] - 12];               // celula tumorală principală, în toate subtipurile
  const rosette = (cx, cy, rr, n, K, cls = "t") => { let s = ""; for (let i = 0; i < n; i++) { const t = i / n * 6.28 + 0.2, x = cx + Math.cos(t) * rr, y = cy + Math.sin(t) * rr; K.exclude(x, y, 7.5); s += lymph(x, y, K.R, cls); } return s; };
  const chemo = (cx, cy, rr, n, cls) => { let s = ""; for (let i = 0; i < n; i++) { const t = i / n * 6.28 + 0.5; s += `<circle class="${cls}" cx="${f1(cx + Math.cos(t) * rr)}" cy="${f1(cy + Math.sin(t) * rr)}" r="1.1"/>`; } return s; };
  const lensSub = {};
  // st0: ganglion normal (paracortex): limfocite mici dense, un macrofag, fibre de reticulină
  { const K = packer(Lc, lens.r, 100); K.exclude(VN[0], VN[1], vr + 2); let s = "";
    let ret = ""; for (let i = 0; i < 9; i++) { const y0 = Lc[1] - 90 + i * 22; ret += `<path class="hk-ret" d="${smooth([[Lc[0] - 110, y0], [Lc[0] - 40, y0 + 10], [Lc[0] + 30, y0 - 6], [Lc[0] + 110, y0 + 8]])}"/>`; }
    s += ret + K.fixed(Lc[0] - 40, Lc[1] - 34, 22, histio(Lc[0] - 40, Lc[1] - 34, K.R));
    s += K.fill(170, 8, (x, y, RR) => lymph(x, y, RR), 0.84, 12000);
    lensSub.l0 = s; }
  // st1: scleroză nodulară: bandă de colagen, celule lacunare, eozinofile, histiocite
  { const K = packer(Lc, lens.r, 101); K.exclude(VN[0], VN[1], vr + 2);
    const bandC = (x) => Lc[1] + 22 - (x - Lc[0]) * 0.42;
    const onBand = (x, y) => Math.abs(y - bandC(x)) < 16;
    let band = `<path class="hk-coll" d="${poly([...Array.from({ length: 12 }, (_, i) => { const x = Lc[0] - 110 + i * 20; return [x, bandC(x) - 13 + Math.sin(i * 1.3) * 2]; }), ...Array.from({ length: 12 }, (_, i) => { const x = Lc[0] + 110 - i * 20; return [x, bandC(x) + 13 + Math.sin(i * 1.7) * 2]; })], true)}"/>`;
    for (let k = 0; k < 6; k++) { const pts = []; for (let x = Lc[0] - 110; x <= Lc[0] + 110; x += 14) pts.push([x, bandC(x) - 10 + k * 4 + Math.sin(x / 13 + k) * 1.4]); band += `<path class="hk-collf" d="${smooth(pts)}"/>`; }
    band += [-70, -20, 34, 80].map((dx, i) => fibro(Lc[0] + dx, bandC(Lc[0] + dx) + (i % 2 ? 4 : -4), -0.4, 15)).join("");
    let s = band;
    s += K.fixed(MAIN[0], MAIN[1] - 26, 16 * UM, lacunar(MAIN[0], MAIN[1] - 26, K.R));
    s += K.fixed(Lc[0] - 56, Lc[1] + 56, 16 * UM, lacunar(Lc[0] - 56, Lc[1] + 56, K.R));
    s += K.fixed(Lc[0] + 44, Lc[1] - 54, 22, histio(Lc[0] + 44, Lc[1] - 54, K.R));
    s += K.fill(6, 6.4 * UM, (x, y, RR) => eos(x, y, RR), 1, 2000, (x, y) => !onBand(x, y));
    s += K.fill(1, 6 * UM, (x, y, RR) => plasma(x, y, RR), 1, 800, (x, y) => !onBand(x, y));
    s += chemo(MAIN[0], MAIN[1] - 26, 16 * UM + 6, 12, "hk-chk");
    s += K.fill(90, 8, (x, y, RR) => lymph(x, y, RR), 0.88, 6000, (x, y) => !onBand(x, y));
    lensSub.l1 = s; }
  // st2: celularitate mixtă: celule RS clasice, multe eozinofile, plasmocite, histiocite epitelioide
  { const K = packer(Lc, lens.r, 102); K.exclude(VN[0], VN[1], vr + 2); let s = "";
    s += K.fixed(MAIN[0], MAIN[1], 18 * UM + 8, rsCell(MAIN[0], MAIN[1], K.R));
    s += K.fixed(Lc[0] + 50, Lc[1] - 50, 13 * UM, hCell(Lc[0] + 50, Lc[1] - 50, K.R));
    s += rosette(MAIN[0], MAIN[1], 18 * UM + 7.6, 15, K);
    s += chemo(MAIN[0], MAIN[1], 18 * UM + 2, 14, "hk-chk");
    s += K.fill(9, 6.4 * UM, (x, y, RR) => eos(x, y, RR), 1, 3000);
    s += K.fill(5, 6.2 * UM, (x, y, RR) => plasma(x, y, RR), 1, 2000);
    s += K.fill(3, 11, (x, y, RR) => histio(x, y, RR, true), 1, 2000);
    s += K.fill(60, 8, (x, y, RR) => lymph(x, y, RR), 0.88, 6000);
    lensSub.l2 = s; }
  // st3: bogat în limfocite: o celulă Hodgkin, multe limfocite mici
  { const K = packer(Lc, lens.r, 103); K.exclude(VN[0], VN[1], vr + 2); let s = "";
    s += K.fixed(MAIN[0], MAIN[1], 13 * UM + 8, hCell(MAIN[0], MAIN[1], K.R));
    s += rosette(MAIN[0], MAIN[1], 13 * UM + 7.6, 12, K);
    s += chemo(MAIN[0], MAIN[1], 13 * UM + 2, 10, "hk-chk");
    s += K.fill(1, 6.4 * UM, (x, y, RR) => eos(x, y, RR), 1, 2000);
    s += K.fill(1, 22, (x, y, RR) => histio(x, y, RR), 1, 2000);
    s += K.fill(160, 8, (x, y, RR) => lymph(x, y, RR), 0.86, 12000);
    lensSub.l3 = s; }
  // st4: sărac în limfocite: multe celule Hodgkin pleomorfe, fibroză difuză, puține limfocite
  { const K = packer(Lc, lens.r, 104); K.exclude(VN[0], VN[1], vr + 2); let s = "";
    let fib = ""; const RF = rng(9); for (let i = 0; i < 16; i++) { const y0 = Lc[1] - 100 + i * 13; const pts = []; for (let x = Lc[0] - 110; x <= Lc[0] + 110; x += 18) pts.push([x, y0 + Math.sin(x / 17 + i) * 6 + (RF() - 0.5) * 6]); fib += `<path class="hk-collf ld" d="${smooth(pts)}"/>`; }
    s += fib;
    s += K.fixed(MAIN[0], MAIN[1], 15 * UM, pleo(MAIN[0], MAIN[1], K.R));
    s += K.fixed(Lc[0] + 52, Lc[1] - 40, 15 * UM * 0.8, pleo(Lc[0] + 52, Lc[1] - 40, K.R, 0.8));
    s += K.fixed(Lc[0] - 54, Lc[1] + 48, 13 * UM, hCell(Lc[0] - 54, Lc[1] + 48, K.R));
    s += K.fixed(Lc[0] - 10, Lc[1] - 72, 15 * UM * 0.7, pleo(Lc[0] - 10, Lc[1] - 72, K.R, 0.7));
    s += K.fixed(Lc[0] + 10, Lc[1] + 62, 15 * UM * 0.66, pleo(Lc[0] + 10, Lc[1] + 62, K.R, 0.66));
    s += [[-70, -20, 0.5], [40, 20, -0.4], [-30, 30, 0.2], [70, 0, 1.2], [-80, 20, -0.8]].map(([dx, dy, a]) => fibro(Lc[0] + dx, Lc[1] + dy, a, 16)).join("");
    s += K.fill(16, 8, (x, y, RR) => lymph(x, y, RR), 0.92, 2000);
    lensSub.l4 = s; }
  // st5: nodular cu predominanță limfocitară: celule LP („popcorn”) cu rozetă de limfocite T, într-un nodul de limfocite B
  { const K = packer(Lc, lens.r, 105); K.exclude(VN[0], VN[1], vr + 2); let s = "";
    let fdc = ""; const RF = rng(12); for (let i = 0; i < 22; i++) { const x = Lc[0] - 90 + RF() * 170, y = Lc[1] - 90 + RF() * 170, a = RF() * 6.28, l = 14 + RF() * 16; fdc += `<path class="hk-fdc" d="M${P2([x, y])}Q${P2([x + Math.cos(a + 0.6) * l * 0.6, y + Math.sin(a + 0.6) * l * 0.6])} ${P2([x + Math.cos(a) * l, y + Math.sin(a) * l])}"/>`; }
    s += fdc;
    s += K.fixed(MAIN[0], MAIN[1], 12 * UM + 8, popcorn(MAIN[0], MAIN[1], K.R));
    s += K.fixed(Lc[0] + 46, Lc[1] - 46, 12 * UM + 8, popcorn(Lc[0] + 46, Lc[1] - 46, K.R));
    s += rosette(MAIN[0], MAIN[1], 12 * UM + 7.6, 12, K) + rosette(Lc[0] + 46, Lc[1] - 46, 12 * UM + 7.6, 12, K);
    s += K.fill(160, 8, (x, y, RR) => lymph(x, y, RR, "b"), 0.86, 12000);
    lensSub.l5 = s; }

  const lensSvg = `<g clip-path="url(#__U__-lens)"><rect class="hk-str" x="${Lc[0] - lens.r}" y="${Lc[1] - lens.r}" width="${lens.r * 2}" height="${lens.r * 2}"/>`
    + Object.entries(lensSub).map(([k, s]) => `<g class="hk-lsub ${k}">${s}</g>`).join("")
    + `<g class="hk-hev">${hev}</g><g class="hk-pyr">${pyrOut}${pyr}</g></g>`
    + `<circle class="hk-lens" cx="${Lc[0]}" cy="${Lc[1]}" r="${lens.r}"/><circle class="hk-lens2" cx="${Lc[0]}" cy="${Lc[1]}" r="${lens.r - 3}"/>`;
  // bara de scară: 20 µm
  const sb = [214, 252];
  const scaleBar = `<path class="hk-sb" d="M${sb[0]} ${sb[1]}h${f1(20 * UM)}"/><text class="hk-sbt" x="${f1(sb[0] + 20 * UM + 4)}" y="${sb[1] + 2.4}" data-ui>20 µm</text>`;

  /* ================= C. corpul ================= */
  const BX = 108;
  const half = [[118, 303], [119, 316], [125, 321], [140, 326], [154, 331], [162, 341], [166, 362], [168, 386], [170, 410], [172, 434], [173, 456], [168, 466], [161, 462], [158, 436], [155, 410], [152, 386], [149, 362], [146, 374], [143, 392], [141, 406], [145, 424], [150, 446], [151, 482], [116, 482], [112, 458], [108, 452]];
  const mir = (pts) => pts.map(([x, y]) => [2 * BX - x, y]);
  const bodyPts = [...half, ...mir(half).reverse().slice(1, -1)];
  const body = `<path class="hk-body" d="${smooth(bodyPts, true, 0.5)}"/><ellipse class="hk-body hd" cx="${BX}" cy="288" rx="15" ry="17.5"/>`;
  const brainS = `<path class="hk-brain" d="${smooth(lumpy(BX, 284, 11, 10, 0.06, 3), true)}"/>`;
  const hypo = [BX + 1, 291];
  const trachea = `<path class="hk-trach" d="M${BX} 306V346M${BX} 346L${BX - 10} 360M${BX} 346L${BX + 10} 360"/>`;
  const heartS = `<path class="hk-heart" d="${smooth([[104, 360], [118, 356], [128, 366], [124, 380], [112, 388], [100, 378], [98, 366]], true)}"/>`;
  const liver = `<path class="hk-liver" d="${smooth([[72, 384], [96, 378], [120, 382], [114, 392], [96, 398], [78, 398], [70, 392]], true)}"/>`;
  const spleen = `<path class="hk-spleen" d="${smooth([[128, 384], [138, 381], [142, 391], [137, 401], [129, 397]], true)}"/>`;
  const vessel = `<path class="hk-ao" d="${smooth([[BX + 3, 362], [BX + 10, 352], [BX + 4, 346], [BX + 4, 330], [BX + 6, 312], [BX + 3, 300], [hypo[0], hypo[1] + 2]])}"/><path class="hk-ao" d="M${BX + 2} 366V440"/>`;
  // oasele: bazinul (aripile iliace cu măduvă roșie, inelul pelvin, găurile obturatoare) și femurele
  const pelvisOut = smooth([[80, 418], [88, 409], [100, 411], [108, 418], [116, 411], [128, 409], [136, 418], [134, 432], [124, 446], [112, 454], [104, 454], [92, 446], [82, 432]], true, 0.6);
  const holes = `M${BX + 11} 436a11 8 0 1 0 -22 0a11 8 0 1 0 22 0ZM100 447a4 3 0 1 0 -8 0a4 3 0 1 0 8 0ZM124 447a4 3 0 1 0 -8 0a4 3 0 1 0 8 0Z`;
  const femur = (x0, x1) => `<path class="hk-bone" d="${smooth([[x0 - 3.6, 450], [x0 + 3.6, 450], [x1 + 3, 482], [x1 - 3, 482]], true, 0.3)}"/><circle class="hk-bone" cx="${x0}" cy="448" r="4"/><path class="hk-marrow" d="M${x0} 455L${x1} 482"/>`;
  const bones = femur(92, 94) + femur(124, 122) + `<path class="hk-bone pel" d="${pelvisOut}${holes}"/>` + `<g class="hk-mar">${[[88, 418], [94, 414], [122, 414], [128, 418], [86, 426], [130, 426]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.3"/>`).join("")}</g>`;
  // grupele de ganglioni (mărite în limfom: cervicali, supraclaviculari, mediastinali)
  const groups = {
    cerv: [[101, 309], [101, 315], [115, 309], [115, 315]], supra: [[96, 326], [120, 326]], ax: [[73, 362], [143, 362]],
    med: [[101, 350], [115, 350], [102, 360], [114, 362]], pa: [[104, 403], [112, 403], [104, 411], [112, 411]], il: [[96, 426], [120, 426]], ing: [[84, 454], [132, 454]],
  };
  const big = new Set(["cerv", "supra", "med"]);
  const nodesB = Object.entries(groups).map(([k, pts]) => pts.map(([x, y]) => `<ellipse class="hk-bn ${k}${big.has(k) ? " big" : ""}" cx="${x}" cy="${y}" rx="${big.has(k) ? 3 : 2.6}" ry="${big.has(k) ? 2.3 : 2}"/>`).join("")).join("");
  // citokinele pirogene pe drum spre hipotalamus (sânge)
  const ckRoute = [[BX + 4, 344], [BX + 4, 328], [BX + 6, 314], [BX + 3, 302]];
  const ckBody = `<g class="hk-ckb">${ckRoute.map(([x, y], i) => cytokine(["il1", "tnf", "il6", "il1"][i], x + (i % 2 ? 5 : -5), y, 0.62, `cb c${i}`)).join("")}</g>`;
  const hypoS = `<circle class="hk-hyp" cx="${hypo[0]}" cy="${hypo[1]}" r="3"/>`;
  const sitesHL = `<g class="hk-org">${[[84, 388], [96, 392], [108, 386], [134, 389], [133, 395]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.5"/>`).join("")}</g>`;

  /* ================= D. simptomele B ================= */
  const G = { x: 248, w: 152 };
  const cards = [{ y: 286, h: 40, t: "Febra (°C), pe 28 de zile" }, { y: 360, h: 32, t: "Transpirațiile, pe 24 de ore" }, { y: 428, h: 38, t: "Greutatea (kg), pe 6 luni" }];
  const gx = (t, t1) => G.x + t / t1 * G.w;
  const title = (c) => `<text class="hk-ti" x="222" y="${c.y - 10}" data-ui>${c.t}</text>`;
  const ticks = (c, vals, t1) => vals.map((v) => `<text class="hk-t" x="${f1(gx(v, t1))}" y="${c.y + c.h + 9}" text-anchor="middle" data-ui>${v}</text>`).join("");
  // 1. temperatura pe 28 de zile: 36,4–40 °C, pragul 38 °C
  const c1 = cards[0], ty = (T) => c1.y + c1.h - (T - 36.4) / 3.6 * c1.h;
  const feverPts = [[0, 36.8], [4, 36.9], [6, 38.4], [8, 39.3], [10, 39.0], [12, 38.2], [13.5, 37.0], [18, 36.9], [20, 38.5], [22, 39.4], [24, 39.1], [26, 38.0], [28, 37.1]].map(([d, T]) => [gx(d, 28), ty(T)]);
  const normPts = [[0, 36.8], [7, 36.9], [14, 36.7], [21, 36.9], [28, 36.8]].map(([d, T]) => [gx(d, 28), ty(T)]);
  let ch1 = title(c1) + `<path class="hk-grid" d="M${G.x} ${f1(ty(37))}H${G.x + G.w}M${G.x} ${f1(ty(39))}H${G.x + G.w}"/><path class="hk-thr" d="M${G.x} ${f1(ty(38))}H${G.x + G.w}"/>`
    + [37, 38, 39, 40].map((T) => `<text class="hk-t" x="${G.x - 4}" y="${f1(ty(T) + 2.6)}" text-anchor="end" data-ui>${T}</text>`).join("")
    + `<path class="hk-ax" d="M${G.x} ${c1.y}V${c1.y + c1.h}H${G.x + G.w}"/>` + ticks(c1, [0, 7, 14, 21, 28], 28)
    + `<text class="hk-thl" x="${G.x + 3}" y="${f1(ty(38) - 2.5)}" data-ui>38 °C</text>`
    + `<path class="hk-cv b0" d="${smooth(normPts, false, 0.6)}"/><path class="hk-cv b1" d="${smooth(feverPts, false, 0.6)}"/>`;
  // 2. 24 de ore, de la 12:00 la 12:00: noaptea 22–06 umbrită; picături de sudoare la defervescență, noaptea
  const c2 = cards[1], hx = (h) => gx(((h - 12) + 24) % 24, 24);
  const t2 = (T) => c2.y + c2.h - 4 - (T - 36.4) / 3.2 * (c2.h - 8);
  let ch2 = title(c2) + `<rect class="hk-night" x="${f1(hx(22))}" y="${c2.y}" width="${f1(hx(6) - hx(22))}" height="${c2.h}"/><path class="hk-ax" d="M${G.x} ${c2.y + c2.h}H${G.x + G.w}"/>`
    + [12, 18, 0, 6, 12].map((h, i) => `<text class="hk-t" x="${f1(G.x + i / 4 * G.w)}" y="${c2.y + c2.h + 9}" text-anchor="middle" data-ui>${String(h).padStart(2, "0")}</text>`).join("");
  const dayT = [[12, 37.2], [16, 38.3], [19, 39.1], [22, 38.9], [1, 37.6], [4, 36.9], [8, 37.0]].map(([h, T]) => [hx(h), t2(T)]);
  dayT.push([G.x + G.w, t2(37.3)]);
  ch2 += `<path class="hk-cv b1" d="${smooth(dayT, false, 0.6)}"/><path class="hk-cv b0" d="M${G.x} ${f1(t2(36.9))}H${G.x + G.w}"/>`;
  const drops = [[hx(23.4), c2.y + 9], [hx(0.5), c2.y + 17], [hx(1.6), c2.y + 8], [hx(2.6), c2.y + 18], [hx(3.7), c2.y + 10]].map(([x, y]) => `<path class="hk-drop" d="M${f1(x)} ${f1(y - 3.6)}C${f1(x + 2.6)} ${f1(y)} ${f1(x + 2.4)} ${f1(y + 2.6)} ${f1(x)} ${f1(y + 2.6)}C${f1(x - 2.4)} ${f1(y + 2.6)} ${f1(x - 2.6)} ${f1(y)} ${f1(x)} ${f1(y - 3.6)}Z"/>`).join("");
  ch2 += `<g class="hk-drops">${drops}</g>`;
  // 3. greutatea pe 6 luni (exemplu: 70 → 61 kg); pragul de 10% e la 63 kg
  const c3 = cards[2], wy = (kg) => c3.y + c3.h - (kg - 58) / 14 * c3.h;
  const wPts = [[0, 70], [1, 69.6], [2, 68.4], [3, 66.8], [4, 65], [5, 63], [6, 61]].map(([m, kg]) => [gx(m, 6), wy(kg)]);
  let ch3 = title(c3) + `<path class="hk-grid" d="M${G.x} ${f1(wy(70))}H${G.x + G.w}"/><path class="hk-thr" d="M${G.x} ${f1(wy(63))}H${G.x + G.w}"/>`
    + [60, 63, 70].map((kg) => `<text class="hk-t" x="${G.x - 4}" y="${f1(wy(kg) + 2.6)}" text-anchor="end" data-ui>${kg}</text>`).join("")
    + `<path class="hk-ax" d="M${G.x} ${c3.y}V${c3.y + c3.h}H${G.x + G.w}"/>` + ticks(c3, [0, 1, 2, 3, 4, 5, 6], 6)
    + `<text class="hk-thl" x="${G.x + 3}" y="${f1(wy(63) - 2.5)}" data-ui>−10%</text>`
    + `<path class="hk-cv b0" d="M${G.x} ${f1(wy(70))}H${G.x + G.w}"/><path class="hk-cv b1" d="${smooth(wPts, false, 0.6)}"/>`;
  const panelD = { x: 212, y: 262, w: 200, h: 220 };

  const frames = `<rect class="hk-card" x="10" y="262" width="196" height="220" rx="10"/><rect class="hk-card" x="${panelD.x}" y="${panelD.y}" width="${panelD.w}" height="${panelD.h}" rx="10"/>`;

  return {
    W, H,
    defs: `${lyDefs}<clipPath id="__U__-node"><path d="${nodeD}"/></clipPath><clipPath id="__U__-lens"><circle cx="${Lc[0]}" cy="${Lc[1]}" r="${lens.r - 2}"/></clipPath>`,
    L: {
      node: aff + hilSvg + nodeSvg, callout, lens: lensSvg, scaleBar, frames,
      body: body + brainS + trachea + heartS + liver + spleen + bones + vessel, nodesB, sitesHL, ckBody, hypo: hypoS,
      ch1, ch2, ch3,
    },
    lens, MAIN, VN, hypo,
    hits: {
      node: { x: 30, y: 28, w: 140, h: 214 }, hil: { cx: 36, cy: 146, r: 18 },
      rs: { cx: MAIN[0], cy: MAIN[1], r: 40 }, bg: { cx: Lc[0] - 62, cy: Lc[1] + 10, r: 26 }, pyr: { cx: VN[0], cy: VN[1], r: 24 },
      sites: { x: 84, y: 304, w: 48, h: 66 }, org: { x: 66, y: 378, w: 88, h: 30 }, mar: { x: 76, y: 410, w: 64, h: 70 }, hyp: { cx: hypo[0], cy: hypo[1], r: 12 },
      b1: { x: 216, y: cards[0].y - 20, w: 192, h: cards[0].h + 32 }, b2: { x: 216, y: cards[1].y - 20, w: 192, h: cards[1].h + 32 }, b3: { x: 216, y: cards[2].y - 20, w: 192, h: cards[2].h + 32 },
    },
    badges: {
      node: [24, 40], hil: [14, 132], rs: [MAIN[0] - 30, MAIN[1] - 52], bg: [Lc[0] - 92, Lc[1] - 2], pyr: [VN[0] + 26, VN[1] - 18],
      sites: [74, 316], org: [60, 392], mar: [70, 466], hyp: [84, 278], b1: [400, 276], b2: [400, 350], b3: [400, 418],
    },
    panelD, cards,
  };
}

export function preview(state = {}) {
  const A = build(), L = A.L, s = (x) => x.replaceAll("__U__", "pv");
  const st = state.st ?? 2;
  return { viewBox: `0 0 ${W} ${H}`, svg: s(`<defs>${A.defs}</defs><g class="hk" data-st="${st}">${L.frames}${L.node}${L.callout}${L.lens}${L.scaleBar}${L.body}${L.nodesB}${L.sitesHL}${L.ckBody}${L.hypo}${L.ch1}${L.ch2}${L.ch3}</g>`) };
}
