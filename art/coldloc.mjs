// Î9: efectele locale ale frigului. Trei plăci:
//  A. degetul (fața dorsală, cu unghia), care își schimbă aspectul: normal, palid (vasoconstricție), alb-cerat cu brumă (îngheț),
//     roșu și umflat cu flictene (după reîncălzire), negru la vârf cu linie de demarcație (necroză);
//  B. secțiunea prin pulpa degetului: epidermul, dermul cu o arteriolă, anse capilare, o venulă, un mastocit, un nerv,
//     hipodermul cu adipocite; vasoconstricția, încetinirea fluxului (hematii în fișicuri), cristalele de gheață din interstițiu,
//     histamina, edemul și flictena, microtrombii, necroza (inclusiv necroza grăsoasă);
//  C. durata expunerii: gradele I, II, III ale degerăturii (Cursul 3, slide 43).
import { smooth, poly, lumpy, rng, sampleSmooth, offset } from "./lib/geo.mjs";
import { organ, vessels } from "./lib/an.mjs";

export const W = 420, H = 446;
const P2 = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
const f1 = (v) => (+v).toFixed(1);
// cristal de gheață: dendrită cu șase brațe și ramificații
const ice = (x, y, r, a = 0) => { let d = ""; for (let k = 0; k < 6; k++) { const t = a + k * Math.PI / 3, e = [x + Math.cos(t) * r, y + Math.sin(t) * r], m = [x + Math.cos(t) * r * 0.55, y + Math.sin(t) * r * 0.55]; d += `M${f1(x)} ${f1(y)}L${P2(e)}M${P2(m)}l${f1(Math.cos(t + 0.8) * r * 0.3)} ${f1(Math.sin(t + 0.8) * r * 0.3)}M${P2(m)}l${f1(Math.cos(t - 0.8) * r * 0.3)} ${f1(Math.sin(t - 0.8) * r * 0.3)}`; } return `<path class="cl-ice" d="${d}"/>`; };

export function build() {
  const R = rng(19);
  /* ======================= A. degetul ======================= */
  const cA = { x: 10, y: 10, w: 140, h: 426 };
  const FX0 = 80;
  // conturul degetului (fața dorsală), de la vârf (sus) la baza lui (jos), cu pliurile articulațiilor interfalangiene
  const half = [[FX0, 36], [FX0 + 14, 40], [FX0 + 22, 54], [FX0 + 25, 76], [FX0 + 24, 120], [FX0 + 26, 150], [FX0 + 27, 200], [FX0 + 26, 250], [FX0 + 28, 300], [FX0 + 30, 340], [FX0 + 34, 420]];
  const fingerPts = [...half, ...half.slice().reverse().map(([x, y]) => [2 * FX0 - x, y])];
  const fD = smooth(fingerPts, true, 0.6);
  const nail = `<path class="cl-nail" d="${smooth([[FX0 - 14, 92], [FX0 - 15, 64], [FX0 - 8, 50], [FX0 + 8, 50], [FX0 + 15, 64], [FX0 + 14, 92], [FX0, 96]], true, 0.6)}"/><path class="cl-lun" d="M${FX0 - 9} 90Q${FX0} 84 ${FX0 + 9} 90"/><path class="cl-fold" d="M${FX0 - 15} 96Q${FX0} 102 ${FX0 + 15} 96"/>`;
  const creases = [150, 158, 250, 258, 264].map((y, i) => `<path class="cl-crease" d="M${FX0 - 16 + (i % 2) * 2} ${y}Q${FX0} ${y + 3} ${FX0 + 16 - (i % 2) * 2} ${y}"/>`).join("");
  // aspectul pe stadii: palid, cerat cu brumă, roșu-umflat cu flictene, necroză la vârf cu demarcație
  const tipD = smooth([...half.slice(0, 5), [FX0 + 24, 132], [FX0, 136], [FX0 - 24, 132], ...half.slice(0, 5).reverse().map(([x, y]) => [2 * FX0 - x, y])], true, 0.6);
  const frost = Array.from({ length: 16 }, () => ice(FX0 + (R() - 0.5) * 40, 44 + R() * 90, 2.6 + R() * 1.6, R())).join("");
  const blisters = [[FX0 - 10, 112, 9, 7], [FX0 + 12, 120, 7, 6], [FX0 + 2, 40, 8, 5], [FX0 - 18, 70, 5, 8]].map(([x, y, rx, ry]) => `<ellipse class="cl-bl" cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"/><ellipse class="cl-blh" cx="${x - rx * 0.3}" cy="${y - ry * 0.35}" rx="${rx * 0.3}" ry="${ry * 0.25}"/>`).join("");
  const necro = `<path class="cl-nec" d="${smooth([...half.slice(0, 4), [FX0 + 24, 100], [FX0, 104], [FX0 - 24, 100], ...half.slice(0, 4).reverse().map(([x, y]) => [2 * FX0 - x, y])], true, 0.6)}"/><path class="cl-dem" d="M${FX0 - 25} 102Q${FX0} 112 ${FX0 + 25} 102"/>`;
  const spot = [FX0, 118];
  const fingerSvg = `<g clip-path="url(#__U__-cA)"><rect class="cl-bgA" x="${cA.x}" y="${cA.y}" width="${cA.w}" height="${cA.h}"/><path class="cl-skin" d="${fD}"/><path class="an-vol" d="${fD}"/><path class="cl-tint" d="${tipD}"/>${creases}${nail}<g class="cl-frost">${frost}</g><g class="cl-blg">${blisters}</g><g class="cl-necg">${necro}</g><path class="cl-edge" d="${fD}"/></g>`;

  /* ======================= B. secțiunea prin pulpa degetului ======================= */
  const cB = { x: 158, y: 10, w: 252, h: 318 };
  const X0 = cB.x, X1 = cB.x + cB.w;
  const sTop = 30, epiB = (x) => 54 + Math.sin((x - X0) / 9) * 4;
  const epiPts = []; for (let x = X0; x <= X1; x += 3) epiPts.push([x, epiB(x)]);
  const hypTop = 216;
  let base = `<rect class="cl-air" x="${X0}" y="${cB.y}" width="${cB.w}" height="${sTop - cB.y}"/><rect class="cl-hyp" x="${X0}" y="${hypTop}" width="${cB.w}" height="${cB.y + cB.h - hypTop}"/>`;
  const adip = []; for (let i = 0; i < 16; i++) { const cx = X0 + 14 + (i % 8) * 31 + (i > 7 ? 15 : 0), cy = 246 + (i > 7 ? 46 : 0); adip.push([cx, cy]); base += `<path class="cl-fat" d="${smooth(lumpy(cx, cy, 15, 9, 0.1, i + 3), true)}"/><ellipse class="cl-fatn" cx="${cx + 9}" cy="${cy - 9}" rx="2.4" ry="1.2"/>`; }
  base += `<path class="cl-der" d="${poly([[X0, hypTop], [X0, epiB(X0)], ...epiPts, [X1, hypTop]], true)}"/>`;
  let coll = ""; for (let i = 0; i < 9; i++) { const y0 = 70 + i * 16; const pts = []; for (let x = X0; x <= X1; x += 14) pts.push([x, y0 + Math.sin(x / 17 + i) * 3]); coll += `<path class="cl-coll" d="${smooth(pts)}"/>`; }
  base += coll;
  // fibroblaste (se zbârcesc la îngheț: deshidratare celulară)
  const fibs = [[190, 96], [262, 104], [340, 92], [214, 176], [300, 186], [376, 170], [236, 136], [394, 120]].map(([x, y], i) => `<g class="cl-fb" style="transform-origin:${x}px ${y}px"><path class="c" d="${smooth([[x - 12, y], [x - 4, y - 2.4], [x + 4, y - 2.4], [x + 12, y], [x + 4, y + 2.4], [x - 4, y + 2.4]], true)}"/><ellipse class="n" cx="${x}" cy="${y}" rx="5" ry="1.6"/></g>`).join("");
  base += fibs;
  // epidermul (cu stratul cornos gros al pulpei)
  base += `<path class="cl-epi" d="${poly([[X0, sTop], [X1, sTop], ...epiPts.slice().reverse()], true)}"/><path class="cl-corn" d="M${X0} ${sTop + 2.4}H${X1}"/>`;
  for (let x = X0 + 4; x < X1; x += 9) base += `<ellipse class="cl-kn" cx="${x}" cy="${f1(epiB(x) - 3)}" rx="2.2" ry="1.6"/>`;
  // arteriola (cu tunica musculară), ansele capilare spre papile, venula
  const AY = 120, VY = 162;
  const art = vessels([{ pts: [[X0 - 4, AY], [X0 + 80, AY - 2], [X0 + 170, AY + 2], [X1 + 4, AY]], w: 11, k: "a", cls: "cl-art" }]);
  const ven = vessels([{ pts: [[X0 - 4, VY], [X0 + 90, VY + 3], [X1 + 4, VY - 1]], w: 15, k: "v", cls: "cl-ven" }]);
  const loops = []; for (let x = X0 + 20; x < X1 - 6; x += 30) loops.push(x);
  const capD = loops.map((x) => smooth([[x - 4, AY - 4], [x - 4, 80], [x - 3, epiB(x) + 6], [x + 3, epiB(x) + 6], [x + 4, 80], [x + 4, VY - 6]])).join("");
  const caps = `<path class="cl-capw" d="${capD}"/><path class="cl-cap" d="${capD}"/>`;
  // hematiile: curg normal (separate) sau în fișicuri (flux încetinit, vâscozitate crescută)
  const rbcFlow = [X0 + 30, X0 + 80, X0 + 140, X0 + 200].map((x) => `<ellipse class="rbc" cx="${x}" cy="${VY}" rx="4.4" ry="${f1(3.4)}"/>`).join("");
  const rouleaux = [X0 + 40, X0 + 120, X0 + 190].map((x) => Array.from({ length: 6 }, (_, k) => `<ellipse class="rbc" cx="${f1(x + k * 2.4)}" cy="${VY}" rx="1.4" ry="4.4"/>`).join("")).join("") + loops.slice(1, 6).map((x) => `<ellipse class="rbc" cx="${x - 3.2}" cy="88" rx="1.4" ry="2.2"/><ellipse class="rbc" cx="${x - 3.2}" cy="98" rx="1.4" ry="2.2"/>`).join("");
  // mastocitul și histamina; joncțiunile deschise, edemul (lichid în interstițiu) și flictena (decolare epiderm–derm)
  const MS = [222, 142];
  let mg = ""; for (let i = 0; i < 24; i++) { const a = R() * 6.283, rr = Math.sqrt(R()) * 9; mg += `<circle class="ms-g" cx="${f1(MS[0] + Math.cos(a) * rr)}" cy="${f1(MS[1] + Math.sin(a) * rr * 0.8)}" r="1.2"/>`; }
  const mast = `<path class="ms-cell" d="${smooth(lumpy(MS[0], MS[1], 12, 12, 0.12, 7), true)}"/>${mg}<ellipse class="ms-nuc" cx="${MS[0] - 1}" cy="${MS[1] + 1}" rx="4" ry="3.4"/>`;
  let hist = ""; for (let i = 0; i < 18; i++) hist += `<circle class="cl-hi" cx="${f1(MS[0] + 10 + R() * 60)}" cy="${f1(MS[1] - 30 + R() * 50)}" r="1.1"/>`;
  let edema = ""; for (let i = 0; i < 46; i++) edema += `<circle class="cl-ed" cx="${f1(X0 + 4 + R() * (cB.w - 8))}" cy="${f1(64 + R() * 146)}" r="1.1"/>`;
  const bl0 = X0 + 60, bl1 = X0 + 196;
  const domeTop = (x) => sTop - 12 * Math.sin((x - bl0) / (bl1 - bl0) * Math.PI);
  const dome = []; for (let x = bl0; x <= bl1; x += 3) dome.push([x, domeTop(x)]);
  const blister = `<path class="cl-fluid" d="${poly([...dome.map(([x, y]) => [x, y + 20]), ...dome.slice().reverse().map(([x]) => [x, epiB(x) + 1])], true)}"/><path class="cl-epi" d="${poly([...dome, ...dome.slice().reverse().map(([x, y]) => [x, y + 20])], true)}"/><path class="cl-corn" d="${poly(dome.map(([x, y]) => [x, y + 2.4]))}"/>`;
  // cristalele de gheață în interstițiu (îngheț)
  const iceSvg = Array.from({ length: 26 }, () => ice(X0 + 10 + R() * (cB.w - 20), 64 + R() * 140, 3.4 + R() * 3, R())).join("");
  // microtrombii (trombocite + fibrină) în capilare și în venulă
  const thr = (x, y, r) => `<g class="cl-thr"><path class="m" d="${smooth(lumpy(x, y, r, 10, 0.22, Math.round(x)), true)}"/>${Array.from({ length: 5 }, (_, k) => `<circle class="p" cx="${f1(x + Math.cos(k * 1.26) * r * 0.5)}" cy="${f1(y + Math.sin(k * 1.26) * r * 0.5)}" r="1.2"/>`).join("")}<path class="f" d="M${f1(x - r)} ${f1(y - r * 0.4)}L${f1(x + r)} ${f1(y + r * 0.5)}M${f1(x - r * 0.6)} ${f1(y + r * 0.7)}L${f1(x + r * 0.7)} ${f1(y - r * 0.6)}"/></g>`;
  const thrombi = thr(X0 + 70, VY, 7) + thr(X0 + 170, VY - 1, 6) + loops.filter((_, i) => i % 2).map((x) => thr(x, 104, 3.4)).join("");
  // necroza: epidermul și dermul superficial distruse, nuclei picnotici; necroza grăsoasă în hipoderm
  const necZ = [[X0, sTop - 1], [X1, sTop - 1], [X1, 150], [X0 + 200, 160], [X0 + 140, 152], [X0 + 80, 162], [X0, 156]];
  let pyk = ""; for (let i = 0; i < 22; i++) pyk += `<circle class="cl-pyk" cx="${f1(X0 + 6 + R() * (cB.w - 12))}" cy="${f1(sTop + 8 + R() * 110)}" r="${f1(1 + R())}"/>`;
  const fatNec = adip.filter((_, i) => i % 3 === 1).map(([x, y]) => `<path class="cl-fatnec" d="${smooth(lumpy(x, y, 15, 10, 0.3, Math.round(x + y)), true)}"/>${Array.from({ length: 5 }, (_, k) => `<circle class="cl-sap" cx="${f1(x + (R() - 0.5) * 18)}" cy="${f1(y + (R() - 0.5) * 18)}" r="${f1(1.4 + R())}"/>`).join("")}`).join("");
  const necSvg = `<path class="cl-necz" d="${smooth(necZ, true, 0.4)}"/>${pyk}`;
  // nervul senzitiv (pierderea sensibilității)
  const nerve = `<path class="cl-nv" d="${smooth([[X1 + 4, 200], [X0 + 200, 196], [X0 + 168, 150], [X0 + 152, 70]])}"/><path class="cl-nv" d="M${X0 + 168} 150Q${X0 + 182} 120 ${X0 + 186} 72"/>`;
  const panelB = `<g clip-path="url(#__U__-cB)">${base}<g class="cl-edg">${edema}</g>${nerve}${ven}<g class="cl-flow">${rbcFlow}</g><g class="cl-roul">${rouleaux}</g><g class="cl-artg" style="transform-origin:0 ${AY}px">${art}</g>${caps}${mast}<g class="cl-hig">${hist}</g><g class="cl-iceg">${iceSvg}</g><g class="cl-thrg">${thrombi}</g><g class="cl-necg2">${necSvg}${fatNec}</g><g class="cl-blg2">${blister}</g></g>`;
  // legătura dintre deget și secțiune (lupa)
  const callout = `<circle class="cl-spot" cx="${spot[0]}" cy="${spot[1]}" r="9"/><path class="cl-call" d="M${spot[0] + 9} ${spot[1] - 2}L${X0} 16M${spot[0] + 9} ${spot[1] + 2}L${X0} 324"/>`;

  /* ======================= C. durata expunerii: gradele degerăturii ======================= */
  const cC = { x: 158, y: 336, w: 252, h: 100 };
  const G = { x: 176, w: 220, y: 386 };
  const seg = [[0, 0.32, "g1", "I"], [0.32, 0.6, "g2", "II"], [0.6, 1, "g3", "III"]];
  let ch = `<text class="cl-ti" x="${cC.x + 10}" y="${cC.y + 16}" data-ui>Degerăturile, după durata expunerii</text>`;
  seg.forEach(([a, b, c, n]) => { ch += `<rect class="cl-seg ${c}" x="${f1(G.x + a * G.w)}" y="${G.y - 10}" width="${f1((b - a) * G.w)}" height="14" rx="3"/><text class="cl-segt ${c}" x="${f1(G.x + (a + b) / 2 * G.w)}" y="${G.y + 0.6}" text-anchor="middle" data-ui>gradul ${n}</text>`; });
  ch += `<path class="cl-ax" d="M${G.x} ${G.y + 10}H${G.x + G.w}"/>` + [[0, "ore"], [0.32, "12–24 h"], [0.6, "zile"], [1, "săptămâni"]].map(([f, t]) => `<path class="cl-ax" d="M${f1(G.x + f * G.w)} ${G.y + 8}v4"/><text class="cl-t" x="${f1(G.x + f * G.w)}" y="${G.y + 21}" text-anchor="${f === 0 ? "start" : f === 1 ? "end" : "middle"}" data-ui>${t}</text>`).join("");
  const marks = [0.02, 0.1, 0.2, 0.46, 0.8].map((f) => +(G.x + f * G.w).toFixed(1));
  const pointer = `<path class="cl-ptr" d="M0 ${G.y - 22}l-4 -6h8z"/>`;
  const frames = [cB, cC].map((c) => `<rect class="cl-card" x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" rx="10"/>`).join("") + `<rect class="cl-card" x="${cA.x}" y="${cA.y}" width="${cA.w}" height="${cA.h}" rx="10"/>`;
  const clips = [["cA", cA], ["cB", cB]].map(([id, c]) => `<clipPath id="__U__-${id}"><rect x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" rx="10"/></clipPath>`).join("");

  return {
    W, H, marks,
    defs: clips,
    L: { frames, finger: fingerSvg, panelB, callout, chart: ch, pointer },
    hits: {
      fing: { x: 50, y: 30, w: 60, h: 110 },
      art: { x: X0 + 4, y: AY - 10, w: 120, h: 20 }, roul: { x: X0 + 30, y: VY - 10, w: 140, h: 20 }, ice: { cx: X0 + 120, cy: 90, r: 22 }, mast: { cx: MS[0], cy: MS[1], r: 16 }, edema: { cx: X0 + 200, cy: 190, r: 18 }, bl: { x: bl0, y: 16, w: bl1 - bl0, h: 34 }, thr: { cx: X0 + 70, cy: VY, r: 14 }, nec: { cx: X0 + 120, cy: 128, r: 16 }, fat: { x: X0 + 4, y: 230, w: 120, h: 92 }, nv: { cx: X0 + 160, cy: 110, r: 12 },
      chart: { x: cC.x + 4, y: cC.y + 4, w: cC.w - 8, h: cC.h - 8 },
    },
    badges: {
      fing: [24, 30], art: [X0 + 12, AY - 14], roul: [X0 + 24, VY + 16], ice: [X0 + 140, 72], mast: [MS[0] - 18, MS[1] + 14], edema: [X0 + 222, 206], bl: [X0 + 40, 22], thr: [X0 + 92, VY - 14], nec: [X0 + 100, 138], fat: [X0 + 136, 314], nv: [X0 + 176, 90], chart: [cC.x + cC.w - 14, cC.y + 14],
    },
  };
}

export function preview(state = {}) {
  const A = build(), L = A.L, s = (x) => x.replaceAll("__U__", "pv");
  const st = state.st ?? 3;
  return { viewBox: `0 0 ${W} ${H}`, svg: s(`<defs>${A.defs}</defs><g class="clx" data-st="${st}">${L.frames}${L.finger}${L.panelB}${L.callout}${L.chart}<g transform="translate(${A.marks[st]} 0)">${L.pointer}</g></g>`) };
}
