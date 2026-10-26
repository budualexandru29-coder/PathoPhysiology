// Î27 (și Î22): răspunsul inflamator acut — o venulă postcapilară în secțiune longitudinală și interstițiul de sub ea.
// Scară aproximativă pentru celule: ~3,6 px/µm (lumenul ~30 µm, neutrofilul ~12 µm, hematia ~7,5 µm); moleculele
// de adeziune (selectine, integrine, ICAM-1), chemokinele și bacteriile sunt mărite mult, ca să se vadă.
// Sângele curge de la stânga la dreapta. Stațiile neutrofilelor, de-a lungul peretelui de jos: marginație, rulare,
// activare, aderare fermă, transmigrare; apoi chemotaxia prin interstițiu și fagocitoza bacteriilor.
import { smooth, poly, lumpy, rng, sampleSmooth, offset } from "./lib/geo.mjs";
import { organ } from "./lib/an.mjs";

export const W = 420, H = 326;
const P2 = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
const UM = 3.6;                                   // px pe µm (celule)
const LUM = { top: 40, bot: 40 + 30 * UM };       // lumenul venulei: 30 µm

/* neutrofil: nucleu cu 3–4 lobi legați prin punți subțiri, granule fine; forma dată ca listă de puncte */
function neutrophil(shape, nucC, nucS = 1, seed = 1, cls = "") {
  const R = rng(seed);
  const lobes = [[-1, -0.2], [-0.2, 0.5], [0.75, 0.1], [0.3, -0.75]].slice(0, 3 + (seed % 2));
  const lob = lobes.map(([dx, dy]) => [nucC[0] + dx * 7 * nucS, nucC[1] + dy * 7 * nucS]);
  const bridges = lob.slice(1).map((p, i) => `M${P2(lob[i])}L${P2(p)}`).join("");
  const nuc = lob.map((p, i) => `<ellipse class="nt-lobe" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" rx="${(4.6 * nucS).toFixed(1)}" ry="${(3.6 * nucS).toFixed(1)}" transform="rotate(${(i * 47 + 10).toFixed(0)} ${p[0].toFixed(1)} ${p[1].toFixed(1)})"/>`).join("");
  const box = shape.reduce((b, p) => ({ x0: Math.min(b.x0, p[0]), x1: Math.max(b.x1, p[0]), y0: Math.min(b.y0, p[1]), y1: Math.max(b.y1, p[1]) }), { x0: 1e9, x1: -1e9, y0: 1e9, y1: -1e9 });
  let gran = "";
  for (let i = 0; i < 26; i++) { const x = box.x0 + 4 + R() * (box.x1 - box.x0 - 8), y = box.y0 + 4 + R() * (box.y1 - box.y0 - 8); gran += `<circle class="nt-gr" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r=".9"/>`; }
  return `<g class="nt ${cls}">${organ(smooth(shape, true), "nt-cell")}<g clip-path="url(#__U__-nt${seed})">${gran}</g><path class="nt-br" d="${bridges}"/>${nuc}</g>`;
}
const circleShape = (cx, cy, r, n = 16, seed = 1, amp = 0.05) => lumpy(cx, cy, r, n, amp, seed);

export function build() {
  const R = rng(31);
  /* ---------- interstițiul: colagen, fibroblaste ---------- */
  let coll = ""; for (let i = 0; i < 10; i++) { const y0 = LUM.bot + 22 + i * 24; const pts = []; for (let x = -6; x <= W + 6; x += 14) pts.push([x, y0 + Math.sin(x / 23 + i * 1.3) * 5]); coll += `<path class="in-coll" d="${smooth(pts)}"/>`; }
  for (let i = 0; i < 3; i++) { const y0 = 8 + i * 12; const pts = []; for (let x = -6; x <= W + 6; x += 14) pts.push([x, y0 + Math.sin(x / 19 + i) * 3]); coll += `<path class="in-coll" d="${smooth(pts)}"/>`; }
  const fibro = [[124, 196, 0.3], [252, 296, -0.2], [26, 276, 0.5]].map(([x, y, a]) => `<path class="in-fib" d="${smooth([[x - 22 * Math.cos(a), y - 22 * Math.sin(a)], [x - 6, y - 3], [x + 6, y + 2], [x + 22 * Math.cos(a), y + 22 * Math.sin(a)], [x + 6, y + 5], [x - 6, y + 4]], true)}"/><ellipse class="in-fibn" cx="${x}" cy="${y + 1}" rx="7" ry="2.6" transform="rotate(${(a * 57).toFixed(0)} ${x} ${y + 1})"/>`).join("");
  const edema = `<rect class="in-edema" x="0" y="${LUM.bot + 8}" width="${W}" height="${H - LUM.bot - 8}"/>`;

  /* ---------- peretele venulei: celule endoteliale cu nuclei, joncțiuni, membrana bazală, pericite ---------- */
  const wall = (y, sg, seed) => {
    // sg = -1 pentru peretele de sus (lumenul e dedesubt), +1 pentru cel de jos
    const RR = rng(seed); let s = "", juncs = [];
    for (let x0 = -20; x0 < W + 20; x0 += 46) {
      const x1 = x0 + 46, nx = x0 + 16 + RR() * 14;
      const lumSide = (x) => y - sg * (x > nx - 9 && x < nx + 9 ? 2.6 * Math.cos((x - nx) / 9 * Math.PI / 2) : 0);
      const top = []; for (let x = x0 + 1.2; x <= x1 - 1.2; x += 2) top.push([x, lumSide(x)]);
      const cell = [...top, [x1 - 1.2, y + sg * 2.4], [x0 + 1.2, y + sg * 2.4]];
      s += `<path class="en-cell" d="${smooth(cell, true, 0.5)}"/><ellipse class="en-nuc" cx="${nx.toFixed(1)}" cy="${(y - sg * 0.6).toFixed(1)}" rx="7.4" ry="1.7"/>`;
      juncs.push(x1);
    }
    const bm = `<path class="en-bm" d="M-5 ${y + sg * 3.4}H${W + 5}"/>`;
    return { s: s + bm, juncs };
  };
  const WT = wall(LUM.top, -1, 3), WB = wall(LUM.bot, 1, 4);
  // joncțiunile peretelui de jos: x = 26, 72, 118, 164, 210, 256, 302, 348, 394 (o deschidem la x = 302, pe unde trece neutrofilul)
  const gapsT = WT.juncs.filter((x, i) => i % 2 === 1 && x > 20 && x < W - 20);
  const gapsB = WB.juncs.filter((x) => x > 20 && x < W - 20 && x !== 302 && x % 92 === 26 % 92);
  const pericytes = [[86, LUM.bot + 7.5], [238, LUM.bot + 7.5], [150, LUM.top - 7.5], [330, LUM.top - 7.5]].map(([x, y]) => `<path class="en-peri" d="${smooth([[x - 18, y], [x - 6, y - 2.2], [x + 6, y - 2.2], [x + 18, y], [x + 6, y + 2.2], [x - 6, y + 2.2]], true)}"/>`).join("");

  /* ---------- fluxul: hematiile din curentul axial ---------- */
  const rbc = [];
  for (let i = 0; i < 13; i++) { const x = 8 + i * 32 + (R() - 0.5) * 10, y = LUM.top + 30 + (i % 3) * 18 + (R() - 0.5) * 8, a = (R() - 0.5) * 60, edge = i % 2; rbc.push(`<g class="rbcg r${i % 4}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${a.toFixed(0)})"><ellipse class="rbc" rx="${(3.75 * UM).toFixed(1)}" ry="${edge ? (1.1 * UM).toFixed(1) : (3.6 * UM).toFixed(1)}"/>${edge ? "" : `<ellipse class="rbc-c" rx="${(1.6 * UM).toFixed(1)}" ry="${(1.5 * UM).toFixed(1)}"/>`}</g>`); }
  // hematii în plus (hemoconcentrația din stază), vizibile în fazele târzii
  const rbcX = []; for (let i = 0; i < 7; i++) { const x = 30 + i * 56 + (R() - 0.5) * 10, y = LUM.top + 22 + ((i + 1) % 3) * 22; rbcX.push(`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${((R() - 0.5) * 60).toFixed(0)})"><ellipse class="rbc" rx="${(3.75 * UM).toFixed(1)}" ry="${(1.3 * UM).toFixed(1)}"/></g>`); }
  const plasma = []; for (let i = 0; i < 40; i++) plasma.push([6 + R() * (W - 12), LUM.top + 6 + R() * (LUM.bot - LUM.top - 12)]);

  /* ---------- neutrofilele, pe stații ---------- */
  const r12 = 6 * UM;                                  // raza unui neutrofil de 12 µm
  const yB = LUM.bot - 2.6;                            // suprafața luminală a peretelui de jos
  const S1 = circleShape(46, yB - r12 - 9, r12, 18, 1);                               // marginație: aproape de perete
  const S2 = circleShape(112, yB - r12 - 3.2, r12, 22, 2, 0.04);                      // rulare: microvilozitățile ating peretele
  const S3 = circleShape(176, yB - r12 - 1.4, r12 * 1.0, 22, 3, 0.06);                // activare
  const S4 = (() => { const out = []; for (let i = 0; i < 22; i++) { const a = i / 22 * Math.PI * 2; out.push([240 + Math.cos(a) * r12 * 1.32, yB - r12 * 0.62 + Math.sin(a) * r12 * 0.62 * (Math.sin(a) > 0 ? 0.98 : 1.05)]); } return out; })(); // aderare: turtit
  const S5 = [[290, yB - 14], [296, yB - 26], [306, yB - 30], [316, yB - 24], [310, yB - 6], [307, yB + 2], [310, yB + 10], [322, yB + 16], [324, yB + 30], [310, yB + 38], [294, yB + 34], [290, yB + 20], [296, yB + 8], [296, yB + 1], [289, yB - 4]]; // transmigrare: clepsidră prin joncțiune
  const S6 = [[318, 196], [330, 188], [346, 192], [356, 204], [352, 218], [340, 226], [325, 224], [314, 212], [306, 206], [312, 198]]; // chemotaxie: ameboid, pseudopod spre bacterii
  const S7 = circleShape(352, 268, r12 * 0.95, 20, 7, 0.1);                           // fagocitoză
  const micro = sampleSmooth(S2, true, 2).filter((_, i) => i % 3 === 0).map((p) => { const d = [p[0] - 112, p[1] - (yB - r12 - 3.2)], l = Math.hypot(...d); return `<path class="nt-mv" d="M${P2(p)}L${P2([p[0] + d[0] / l * 3.2, p[1] + d[1] / l * 3.2])}"/>`; }).join("");
  // molecule de adeziune (mărite): selectine pe endoteliu (acadele), integrine pe neutrofil (Y îndoit sau întins), ICAM-1 (bastonașe)
  const selectin = (x, up = 1) => `<path class="sel" d="M${x} ${yB}L${x} ${(yB - 3.6 * up).toFixed(1)}"/><circle class="sel-h" cx="${x}" cy="${(yB - 4.6 * up).toFixed(1)}" r="1.4"/>`;
  const selectins = [86, 94, 102, 110, 118, 126, 134, 150, 158, 166, 186, 194].map((x) => selectin(x)).join("");
  const integ = (x, y, open) => open ? `<path class="itg" d="M${x} ${y}L${x} ${y + 3.6}M${x} ${y + 3.6}L${x - 1.6} ${y + 6}M${x} ${y + 3.6}L${x + 1.6} ${y + 6}"/>` : `<path class="itg" d="M${x} ${y}L${x - 2.4} ${y + 1.8}L${x - 0.4} ${y + 3.2}"/>`;
  const integrins = [164, 172, 180, 188].map((x) => integ(x, yB - 6.6, false)).join("") + [214, 222, 230, 238, 246, 254, 262].map((x) => integ(x, yB - 6.2, true)).join("");
  const icam = [212, 220, 228, 236, 244, 252, 260, 268].map((x) => `<path class="icam" d="M${x} ${yB}L${x} ${yB - 2.4}"/>`).join("");
  const chemok = [168, 174, 182, 190, 198, 206, 226, 250].map((x, i) => `<circle class="chk" cx="${x}" cy="${(yB - 1.4 - (i % 2) * 1.2).toFixed(1)}" r="1.1"/>`).join("");

  /* ---------- mastocitul (degranulare: histamina), macrofagul, bacteriile, gradientul chemotactic ---------- */
  const mast = { c: [62, 192] };
  const mastShape = lumpy(mast.c[0], mast.c[1], 23, 16, 0.12, 12);
  let mg = ""; for (let i = 0; i < 46; i++) { const a = R() * Math.PI * 2, rr = Math.sqrt(R()) * 19; mg += `<circle class="ms-g" cx="${(mast.c[0] + Math.cos(a) * rr).toFixed(1)}" cy="${(mast.c[1] + Math.sin(a) * rr * 0.9).toFixed(1)}" r="1.5"/>`; }
  let hist = ""; for (let i = 0; i < 22; i++) { const t = R(), x = mast.c[0] + 10 + t * 60 + (R() - 0.5) * 30, y = mast.c[1] - 24 - t * 40 + (R() - 0.5) * 16; hist += `<circle class="hist h${i % 3}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.2"/>`; }
  const mastSvg = organ(smooth(mastShape, true), "ms-cell") + `<g clip-path="url(#__U__-mast)">${mg}</g><ellipse class="ms-nuc" cx="${mast.c[0] - 2}" cy="${mast.c[1] + 2}" rx="7" ry="6"/>`;
  const mac = { c: [192, 252] };
  const macShape = lumpy(mac.c[0], mac.c[1], 26, 18, 0.16, 14);
  const macSvg = organ(smooth(macShape, true), "mac-b") + `<path class="mac-nuc" d="${smooth([[180, 248], [186, 240], [198, 242], [201, 252], [195, 258], [189, 256], [185, 262], [178, 260]], true)}"/>` + [[172, 236], [208, 264], [176, 270], [210, 240]].map(([x, y]) => `<circle class="mac-lyso" cx="${x}" cy="${y}" r="2.6"/>`).join("");
  const bact = [[392, 246, 0.4], [402, 268, -0.6], [384, 292, 1.1], [406, 300, 0.2], [374, 240, -1.2]].map(([x, y, a]) => { const ax = [Math.cos(a), Math.sin(a)]; return `<path class="in-bac" d="M${P2([x - ax[0] * 6, y - ax[1] * 6])}L${P2([x + ax[0] * 6, y + ax[1] * 6])}"/>`; }).join("");
  const engulfed = `<ellipse class="mac-phago" cx="350" cy="270" rx="7.5" ry="6"/><path class="in-bac" d="M346 268L354 272"/>`;
  // gradientul chemotactic: inele concentrice slabe din jurul bacteriilor
  const grad = [26, 52, 80, 110, 142].map((r, i) => `<circle class="in-grad g${i}" cx="392" cy="272" r="${r}"/>`).join("");
  const ros = [[340, 258], [345, 280], [362, 262], [364, 282]].map(([x, y]) => `<path class="ros" d="M${x - 2} ${y}L${x + 2} ${y}M${x} ${y - 2}L${x} ${y + 2}"/>`).join("");

  /* ---------- exsudatul: proteinele plasmatice care trec prin joncțiunile deschise ---------- */
  let exu = ""; [...gapsB, ...gapsT].forEach((x, k) => { for (let i = 0; i < 9; i++) { const up = k >= gapsB.length; const y = up ? LUM.top - 8 - R() * 26 : LUM.bot + 8 + R() * 44; exu += `<circle class="exu" cx="${(x + (R() - 0.5) * 34).toFixed(1)}" cy="${y.toFixed(1)}" r="1.3"/>`; } });
  const gapMarks = [...gapsB.map((x) => [x, LUM.bot]), ...gapsT.map((x) => [x, LUM.top])].map(([x, y]) => `<rect class="en-gap" x="${x - 2.4}" y="${y - 3}" width="4.8" height="6" rx="1"/>`).join("");

  /* ---------- capilarul limfatic: tub cu capăt orb, celule endoteliale suprapuse ca niște clape ---------- */
  const ly = [[236, 334], [244, 318], [258, 310], [290, 310], [330, 314], [380, 314], [432, 312]];
  const lyOut = poly([...offset(sampleSmooth(ly, false, 6), 9), ...offset(sampleSmooth(ly, false, 6), -9).reverse()], true);
  const lyFlaps = [268, 292, 316, 340, 364, 388].map((x) => `<path class="ly-flap" d="M${x} ${303}l7 4"/>`).join("");
  const lymph = `<path class="ly-tube" d="${lyOut}"/>${lyFlaps}<path class="ly-flow" d="${smooth(ly.slice(2))}"/>`;

  const L = {
    tissue: `<rect class="in-bg" x="0" y="0" width="${W}" height="${H}"/>${edema}${coll}${fibro}`,
    lumen: `<rect class="lu-bg" x="0" y="${LUM.top}" width="${W}" height="${LUM.bot - LUM.top}"/>` + plasma.map(([x, y]) => `<circle class="lu-p" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r=".9"/>`).join(""),
    rbc: rbc.join(""), rbcX: rbcX.join(""),
    walls: WT.s + WB.s + pericytes, gaps: gapMarks, exu,
    lymph, grad, mast: mastSvg, hist, mac: macSvg, bact, engulfed, ros,
    n1: neutrophil(S1, [46, yB - r12 - 9], 1, 1, "s1"),
    n2: micro + neutrophil(S2, [112, yB - r12 - 3.2], 1, 2, "s2"),
    n3: neutrophil(S3, [176, yB - r12 - 1.4], 1, 3, "s3"),
    n4: neutrophil(S4, [240, yB - r12 * 0.62], 1.05, 4, "s4"),
    n5: neutrophil(S5, [306, yB + 20], 0.85, 5, "s5"),
    n6: neutrophil(S6, [332, 206], 0.9, 6, "s6"),
    n7: neutrophil(S7, [352, 268], 0.9, 7, "s7"),
    selectins, integrins, icam, chemok,
  };
  const clipFor = (id, pts) => `<clipPath id="__U__-nt${id}"><path d="${smooth(pts, true)}"/></clipPath>`;
  return {
    W, H, L, LUM,
    defs: clipFor(1, S1) + clipFor(2, S2) + clipFor(3, S3) + clipFor(4, S4) + clipFor(5, S5) + clipFor(6, S6) + clipFor(7, S7) + `<clipPath id="__U__-mast"><path d="${smooth(mastShape, true)}"/></clipPath>`,
    flow: [`M-10 ${LUM.top + 54}H${W + 10}`, `M-10 ${LUM.top + 34}H${W + 10}`, `M-10 ${LUM.top + 76}H${W + 10}`],
    hits: {
      vd: { x: 0, y: LUM.top - 6, w: W, h: 22 }, mast: { cx: mast.c[0], cy: mast.c[1], r: 30 }, perm: { x: 96, y: LUM.bot + 6, w: 90, h: 40 },
      s1: { cx: 46, cy: yB - r12 - 9, r: r12 + 3 }, s2: { cx: 112, cy: yB - r12 - 3, r: r12 + 3 }, s3: { cx: 176, cy: yB - r12, r: r12 + 3 }, s4: { x: 210, y: yB - r12 * 1.3, w: 62, h: r12 * 1.4 },
      s5: { x: 284, y: yB - 32, w: 44, h: 74 }, s6: { x: 302, y: 184, w: 58, h: 46 }, s7: { cx: 370, cy: 268, r: 34 }, mac: { cx: mac.c[0], cy: mac.c[1], r: 30 }, lymph: { x: 236, y: 298, w: 184, h: 28 },
    },
    badges: { vd: [12, 22], mast: [34, 166], perm: [140, 170], s1: [24, 98], s2: [140, 86], s3: [204, 86], s4: [270, 98], s5: [332, 124], s6: [300, 184], s7: [320, 290], mac: [226, 230], lymph: [228, 314] },
  };
}

export function preview() {
  const A = build(), L = A.L, s = (x) => x.replaceAll("__U__", "pv");
  return { viewBox: `0 0 ${W} ${H}`, svg: s(`<defs>${A.defs}</defs>${L.tissue}${L.grad}${L.lymph}${L.mast}${L.hist}${L.mac}${L.bact}${L.exu}${L.lumen}${L.rbc}${L.walls}${L.gaps}${L.selectins}${L.icam}${L.chemok}${L.n1}${L.n2}${L.n3}${L.n4}${L.integrins}${L.n5}${L.n6}${L.n7}${L.engulfed}${L.ros}`) };
}
