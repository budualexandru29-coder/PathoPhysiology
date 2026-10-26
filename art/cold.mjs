// Î5 · Cele trei stadii ale hipotermiei: un panou de dale, fiecare cu un organ și semnul lui din curs.
// Dalele: creierul (conștiența, senzoriul), ochiul cu lanterna (reflexul pupilar), inima cu ECG-ul, plămânii
// (respirația), un vas cu hematii și molecule de glucoză (glicemia) și cadranul consumului de oxigen, pielea cu
// arteriola și firul de păr peste mușchiul scheletic (vasoconstricția, piloerecția, frisonul, rigiditatea) și o
// celulă (cristalele de gheață și ruperea membranei). Geometria dalelor e cea din versiunea veche, ca zoom-urile
// turului ghidat să rămână valabile.
import { smooth, poly, lumpy, rng } from "./lib/geo.mjs";
import { vessels, cutEnd } from "./lib/an.mjs";
import { brainLat } from "./parts/brain-lat.mjs";
import { heart } from "./parts/heart.mjs";
import { lungs, eyeFront, penlight, cell } from "./parts/organs-small.mjs";
import { prof } from "./parts/skin-block.mjs";

export const W = 400, H = 580;
const TILES = { brain: [2, 0, 196, 140], eye: [202, 0, 196, 140], heart: [2, 143, 396, 140], lungs: [2, 285, 196, 140], gluc: [202, 285, 196, 140], skin: [2, 428, 196, 146], cell: [202, 428, 196, 146] };

export function build() {
  const tiles = Object.values(TILES).map(([x, y, w, h]) => `<rect class="cd2-tile" x="${x + 1}" y="${y + 1}" width="${w - 2}" height="${h - 2}" rx="9"/>`).join("");

  /* creierul (emisfera stângă, lateral) */
  const BR = brainLat({ origin: [27, 10], s: 1.02 });
  const sparks = [[62, 30], [92, 22], [120, 38], [100, 62], [70, 56], [138, 52]];

  /* ochiul și lanterna */
  const EY = eyeFront({ c: [326, 74], s: 0.72 });
  const PLa = [244, 118], rotA = -22 * Math.PI / 180;
  const PL = penlight({ at: [0, 0], s: 0.62 });
  const lensW = [PLa[0] + Math.cos(rotA) * PL.lens[0] - Math.sin(rotA) * PL.lens[1], PLa[1] + Math.sin(rotA) * PL.lens[0] + Math.cos(rotA) * PL.lens[1]];
  const pc = EY.iris.c, beam = `M${lensW[0].toFixed(1)} ${(lensW[1] - 2.4).toFixed(1)}L${(pc[0] - 4).toFixed(1)} ${(pc[1] - 11).toFixed(1)}L${(pc[0] + 2).toFixed(1)} ${(pc[1] + 11).toFixed(1)}L${(lensW[0] + 1).toFixed(1)} ${(lensW[1] + 2.4).toFixed(1)}Z`;
  const torch = `<g transform="translate(${PLa[0]} ${PLa[1]}) rotate(-22)">${PL.svg}</g>`;

  /* inima (din față) cu marile vase secționate și monitorul ECG */
  const HT = heart({ origin: [16, 163], s: 0.74 });
  const ao = HT.aoAsc, aoTop = ao[ao.length - 1];
  const stubs = vessels([{ pts: [...ao, [aoTop[0] + 1, aoTop[1] - 6], [aoTop[0] + 8, aoTop[1] - 11], [aoTop[0] + 17, aoTop[1] - 10]], w: 7.4, k: "a" }])
    + vessels([{ pts: HT.pt.axis, w: 6.8, k: "p" }])
    + vessels([{ pts: [[HT.anchors.svcIn[0], HT.anchors.svcIn[1] - 16], [HT.anchors.svcIn[0] - 0.5, HT.anchors.svcIn[1] - 6], HT.anchors.svcIn], w: 6.2, k: "v" }, { pts: [[HT.anchors.ivcIn[0] + 2, HT.anchors.ivcIn[1] + 20], [HT.anchors.ivcIn[0] + 1, HT.anchors.ivcIn[1] + 8], HT.anchors.ivcIn], w: 6.6, k: "v" }]);
  const stubCuts = cutEnd([aoTop[0] + 17, aoTop[1] - 10], [1, 0.15], 7.4, "a") + cutEnd(HT.pt.top, [0.55, -0.85], 6.8, "p") + cutEnd([HT.anchors.svcIn[0], HT.anchors.svcIn[1] - 16], [0, -1], 6.2, "v") + cutEnd([HT.anchors.ivcIn[0] + 2, HT.anchors.ivcIn[1] + 20], [0.1, 1], 6.6, "v");
  const MON = { x: 132, y: 156, w: 258, h: 116 }, ecg = { x: MON.x + 8, y: MON.y + 18, w: MON.w - 16, h: MON.h - 26 };
  const screen = `<rect class="mon-shadow" x="${MON.x + 2}" y="${MON.y + 3}" width="${MON.w}" height="${MON.h}" rx="9"/><rect class="mon-body" x="${MON.x}" y="${MON.y}" width="${MON.w}" height="${MON.h}" rx="9"/><rect class="mon-bevel" x="${MON.x + 3}" y="${MON.y + 3}" width="${MON.w - 6}" height="${MON.h - 6}" rx="7"/><text class="mon-t" x="${ecg.x + 2}" y="${MON.y + 12.5}" data-ui>ECG · derivația II</text><circle class="mon-led" cx="${MON.x + MON.w - 11}" cy="${MON.y + 9}" r="2"/>`;

  /* plămânii */
  const LG = lungs({ origin: [24, 296], s: 1.02 });
  const trachTop = [24 + 75 * 1.02, 296 - 2 * 1.02];

  /* vasul cu hematii și glucoză; cadranul O2 */
  const V = { x0: 210, x1: 300, y: 352, r: 17 };
  const vessel = `<path class="cd2-vw" d="M${V.x0} ${V.y - V.r - 2}H${V.x1}V${V.y + V.r + 2}H${V.x0}Z"/><path class="cd2-vl" d="M${V.x0} ${V.y - V.r}H${V.x1}V${V.y + V.r}H${V.x0}Z"/><path class="cd2-endo" d="M${V.x0} ${V.y - V.r + 1.4}H${V.x1}M${V.x0} ${V.y + V.r - 1.4}H${V.x1}"/>`
    + `<ellipse class="an-cut-lumen" cx="${V.x0}" cy="${V.y}" rx="4" ry="${V.r + 2}"/><ellipse class="cd2-vend" cx="${V.x1}" cy="${V.y}" rx="4" ry="${V.r + 2}"/>`;
  const R = rng(4);
  const rbc = [[222, 343], [250, 360], [276, 341], [238, 365], [290, 362], [265, 352]].map(([x, y], i) => { const a = (R() - 0.5) * 50; return `<g transform="translate(${x} ${y}) rotate(${a.toFixed(0)})"><ellipse class="rbc" rx="6.4" ry="${i % 2 ? 2.6 : 5.6}"/><ellipse class="rbc-c" rx="${i % 2 ? 3.6 : 2.6}" ry="${i % 2 ? 0.9 : 2.2}"/></g>`; }).join("");
  // glucoza: inelul piranozic (cinci atomi de carbon și un oxigen în inel), 14 molecule; câte sunt „aprinse” arată glicemia
  const gluPos = [[216, 336], [232, 352], [246, 339], [258, 366], [270, 349], [284, 336], [294, 352], [224, 366], [240, 346], [254, 352], [280, 364], [228, 340], [264, 337], [288, 344]];
  const glu = gluPos.map(([x, y]) => { const hx = []; for (let k = 0; k < 6; k++) { const a = Math.PI / 6 + k * Math.PI / 3; hx.push([x + Math.cos(a) * 3.4, y + Math.sin(a) * 3.4]); } const o = hx[5]; return `${poly(hx, true)}M${(o[0] + 1).toFixed(1)} ${o[1].toFixed(1)}A1 1 0 1 1 ${(o[0] - 1).toFixed(1)} ${o[1].toFixed(1)}A1 1 0 1 1 ${(o[0] + 1).toFixed(1)} ${o[1].toFixed(1)}`; });
  const dial = { cx: 350, cy: 355, r: 33 };
  let dialSvg = `<circle class="dl-body" cx="${dial.cx}" cy="${dial.cy}" r="${dial.r + 4}"/><circle class="dl-face" cx="${dial.cx}" cy="${dial.cy}" r="${dial.r}"/>`;
  // scala ×1 … ×6 (cursul: consumul de O2 crește „de până la 6x”), pe un arc de 240°
  for (let k = 0; k <= 25; k++) { const f = k / 25, a = (-210 + f * 240) * Math.PI / 180, big = k % 5 === 0, r0 = dial.r - (big ? 7 : 4); dialSvg += `<path class="dl-tick${big ? " big" : ""}" d="M${(dial.cx + Math.cos(a) * r0).toFixed(1)} ${(dial.cy + Math.sin(a) * r0).toFixed(1)}L${(dial.cx + Math.cos(a) * (dial.r - 1)).toFixed(1)} ${(dial.cy + Math.sin(a) * (dial.r - 1)).toFixed(1)}"/>`; if (big) dialSvg += `<text class="dl-n" x="${(dial.cx + Math.cos(a) * (dial.r - 13)).toFixed(1)}" y="${(dial.cy + Math.sin(a) * (dial.r - 13) + 2.6).toFixed(1)}" text-anchor="middle" data-ui>×${k / 5 + 1}</text>`; }
  dialSvg += `<text class="dl-u" x="${dial.cx}" y="${dial.cy + 18}" text-anchor="middle" data-ui>consum O₂</text>`;

  /* pielea, arteriola, firul de păr și mușchiul scheletic (secțiune 2D) */
  const S = { x0: 4, x1: 196, top: 441, epi: 449, derm: 487, hyp: 506, bot: 572 };
  const epiPts = []; for (let x = S.x0; x <= S.x1; x += 1) epiPts.push([x, S.top + prof((x - S.x0) * 1.15) * 0.75]);
  const skin2 = `<path class="sb-hyp" d="M${S.x0} ${S.derm}H${S.x1}V${S.hyp}H${S.x0}Z"/>${fatRow(S)}<path class="sb-ret" d="M${S.x0} ${S.top}H${S.x1}V${S.derm}H${S.x0}Z"/><path class="sb-pap" d="${smooth(epiPts)}L${S.x1} ${S.top + 15}L${S.x0} ${S.top + 15}Z"/>`
    + `<path class="sb-epi" d="M${S.x0} ${S.top}H${S.x1}L${S.x1} ${epiPts[epiPts.length - 1][1].toFixed(1)}${smooth(epiPts.slice().reverse()).replace(/^M[^C]+/, "")}Z"/><path class="sb-corn" d="M${S.x0} ${S.top}H${S.x1}V${S.top + 1.2}H${S.x0}Z"/>`;
  const art = [[S.x0 - 2, 474], [40, 472], [80, 475], [120, 472.5], [160, 475], [S.x1 + 2, 473]];
  const ven = [[S.x0 - 2, 481], [44, 482], [84, 480.5], [124, 482.5], [164, 481], [S.x1 + 2, 482]];
  const loops = [22, 52, 82, 112, 142, 172].map((x) => [[x - 1.5, 474], [x - 1.8, 462], [x - 1, S.top + 10], [x + 1, S.top + 10], [x + 1.8, 462], [x + 1.5, 481]]);
  const skinV = vessels([{ pts: art, w: 4.4, k: "a", cls: "vc" }, ...loops.map((p) => ({ pts: p.slice(0, 4), w: 0.9, k: "a", cls: "cap vc" }))]) + vessels([{ pts: ven, w: 4.6, k: "v" }, ...loops.map((p) => ({ pts: p.slice(2), w: 1, k: "v", cls: "cap" }))]);
  // folicul pilos cu mușchiul erector: la frig mușchiul se contractă și firul se ridică (piloerecția, Cursul 3, slide 29)
  const fol = `<g class="pilo"><path class="sb-arr" d="${smooth([[134, 479], [124, 467], [111, 452]])}" style="fill:none;stroke:var(--an-musc);stroke-width:2.2;stroke-linecap:round"/><path class="sb-fol-o" d="${poly([[126.5, 494], [132, 494], [147.5, S.top + 1], [142.5, S.top + 1]], true)}"/><ellipse class="sb-bulb" cx="129" cy="495" rx="5" ry="4"/><path class="sb-shaft" d="M129 494L145 ${S.top}"/><g class="hair"><path class="sb-hair" d="${poly([[144, S.top + 0.5], [146.4, S.top - 0.5], [154.5, S.top - 11.5], [153.6, S.top - 12]], true)}"/></g></g>`;
  const muscle = muscleFascicles(S);

  /* celula și cristalele de gheață */
  const CE = cell({ c: [300, 500], r: 42 });
  const iceAt = [[236, 448, 9, 0.2], [366, 452, 9, 0.6], [372, 548, 10, 0.1], [232, 552, 10, 0.4], [338, 494, 6.5, 0.3], [260, 498, 6.5, 0.9], [314, 540, 6.5, 0.5], [318, 458, 6.5, 0.15], [292, 486, 4.5, 0.7], [276, 520, 4.5, 0.2]];
  const ice = iceAt.map(([x, y, r, a]) => ({ d: dendrite(x, y, r, a), x, y, r }));
  const rupt = [[262, 470], [338, 528], [262, 530]];

  const L = {
    tiles,
    brain: BR.svg,
    eye: EY.svg, torch, beam,
    heart: stubs + HT.svg + stubCuts, screen,
    lungs: LG.svg,
    vessel, rbc, dial: dialSvg,
    skin: skin2 + `<g clip-path="url(#__U__-sk)">${skinV}</g>` + fol, muscle,
    cell: CE.svg,
  };
  return {
    W, H, L, brainD: BR.outline, cellD: smooth(CE.out, true),
    defs: BR.defs + EY.defs + HT.defs + LG.defs + `<clipPath id="__U__-sk"><rect x="${S.x0}" y="${S.top - 20}" width="${S.x1 - S.x0}" height="${S.bot - S.top + 20}" rx="7"/></clipPath>`,
    sparks, eye: { cx: +pc[0].toFixed(1), cy: +pc[1].toFixed(1), ri: +EY.iris.r.toFixed(1), rp0: 5.8, rp1: 2.4, rp3: 11 }, glint: EY.glint.map((v) => +v.toFixed(1)),
    ecg, glu, dial, needle: { cx: dial.cx, cy: dial.cy, len: dial.r - 9 },
    ice: ice.map((k) => ({ d: k.d })), rupt, trachTop,
    hits: {
      brain: { x: 22, y: 8, w: 150, h: 122 }, eye: { cx: +pc[0].toFixed(1), cy: +pc[1].toFixed(1), r: 30 }, torch: { x: 206, y: 92, w: 62, h: 40 },
      heart: { x: 18, y: 150, w: 104, h: 126 }, ecg: { x: MON.x, y: MON.y, w: MON.w, h: MON.h }, lungs: { x: 30, y: 292, w: 140, h: 124 },
      tank: { x: 206, y: 320, w: 98, h: 66 }, dial: { cx: dial.cx, cy: dial.cy, r: dial.r + 4 },
      muscle: { x: 6, y: 506, w: 188, h: 64 }, vessel: { x: 6, y: 456, w: 188, h: 32 }, cell: { cx: 300, cy: 500, r: 44 },
      ice: ice.slice(0, 4).map((k) => ({ cx: k.x, cy: k.y, r: 11 })),
    },
    badges: { brain: [184, 18], eye: [384, 18], heart: [20, 160], lungs: [184, 302], gluc: [218, 304], o2: [384, 302], muscle: [184, 556], vessel: [184, 462], ice: [216, 444], cell: [384, 444] },
  };
}

function fatRow(S) {
  let s = ""; const R = rng(21);
  for (let x = S.x0 + 6; x < S.x1 + 6; x += 12.5) s += `<path class="sb-fat" d="${smooth(lumpy(x + (R() - 0.5) * 2, (S.derm + S.hyp) / 2 + (R() - 0.5) * 2, 7, 9, 0.1, Math.floor(R() * 1e5)), true)}"/>`;
  return `<g clip-path="url(#__U__-sk)">${s}</g>`;
}

/* mușchiul scheletic: fascicule lungi cu perimisium și striații transversale */
function muscleFascicles(S) {
  let s = `<path class="ms-epi" d="M${S.x0} ${S.hyp}H${S.x1}V${S.bot}H${S.x0}Z"/>`;
  const rows = 4, h = (S.bot - S.hyp - 4) / rows;
  for (let i = 0; i < rows; i++) {
    const y0 = S.hyp + 2 + i * h, y1 = y0 + h - 1.6, mid = (y0 + y1) / 2;
    const d = `M${S.x0} ${(y0 + 0.6).toFixed(1)}C${S.x0 + 60} ${(y0 - 0.8).toFixed(1)} ${S.x1 - 60} ${(y0 + 1.6).toFixed(1)} ${S.x1} ${(y0 + 0.4).toFixed(1)}V${(y1 - 0.4).toFixed(1)}C${S.x1 - 60} ${(y1 + 1).toFixed(1)} ${S.x0 + 60} ${(y1 - 1.2).toFixed(1)} ${S.x0} ${(y1 - 0.6).toFixed(1)}Z`;
    let str = ""; for (let x = S.x0 + 2 + (i % 2) * 1.5; x < S.x1; x += 3) str += `M${x.toFixed(1)} ${(y0 + 1.6).toFixed(1)}V${(y1 - 1.6).toFixed(1)}`;
    s += `<path class="ms-fas" d="${d}"/><path class="ms-str" d="${str}"/><path class="ms-fib" d="M${S.x0} ${mid.toFixed(1)}H${S.x1}"/>`;
  }
  return `<g clip-path="url(#__U__-sk)">${s}</g>`;
}

/* cristal de gheață: dendrită hexagonală (șase brațe cu ramuri laterale la 60°) */
function dendrite(x, y, r, rot) {
  let d = "";
  for (let k = 0; k < 6; k++) {
    const a = rot + k * Math.PI / 3, ex = x + Math.cos(a) * r, ey = y + Math.sin(a) * r;
    d += `M${x.toFixed(1)} ${y.toFixed(1)}L${ex.toFixed(1)} ${ey.toFixed(1)}`;
    [0.45, 0.72].forEach((f) => {
      const bx = x + Math.cos(a) * r * f, by = y + Math.sin(a) * r * f, l = r * (0.42 - f * 0.25);
      [1, -1].forEach((sg) => { const b = a + sg * Math.PI / 3; d += `M${bx.toFixed(1)} ${by.toFixed(1)}L${(bx + Math.cos(b) * l).toFixed(1)} ${(by + Math.sin(b) * l).toFixed(1)}`; });
    });
  }
  return d;
}

export function preview() {
  const A = build(), L = A.L, s = (x) => x.replaceAll("__U__", "pv");
  const pupil = `<circle class="pupil" cx="${A.eye.cx}" cy="${A.eye.cy}" r="${A.eye.rp0}"/><circle class="glint" cx="${A.glint[0]}" cy="${A.glint[1]}" r="2.2"/>`;
  return { viewBox: `0 0 ${W} ${H}`, svg: s(`<defs>${A.defs}</defs>${L.tiles}${L.brain}${L.eye.replace("__PUPIL__", pupil)}<path class="beam" d="${L.beam}"/>${L.torch}${L.heart}${L.screen}${L.lungs}${L.vessel}${L.rbc}${A.glu.map((d) => `<path class="glu on" d="${d}"/>`).join("")}${L.dial}${L.skin}${L.muscle}${L.cell}${A.ice.map((k) => `<path class="ice-k" d="${k.d}"/>`).join("")}`) };
}
