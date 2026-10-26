// Î8: termogeneza și sursele ei. Patru plăci:
//  A. metabolismul energetic celular: glicoliza în citosol (2 ATP), mitocondria cu criste și ciclul Krebs, iar dedesubt o porțiune
//     din membrana internă, mărită: complexele I, III, IV, coenzima Q, citocromul c, ATP-sintaza, protonii (H⁺), oxigenul care devine apă;
//  B. ATP-aza Na⁺/K⁺ dependentă din membrana celulară: 3 Na⁺ afară, 2 K⁺ înăuntru, ATP → ADP + Pi;
//  C. efectorii: fibre musculare scheletice cu placa motorie (frisonul) și un adipocit brun (picături multiple de lipide, multe
//     mitocondrii cu UCP1, terminații simpatice cu noradrenalină);
//  D. balanța termogeneză–termoliză, sursele căldurii în repaus și la efort (Cursul 3) și controlul hormonal.
// Moleculele și organitele sunt mărite și simplificate.
import { smooth, poly, lumpy, rng, sampleSmooth, offset } from "./lib/geo.mjs";
import { organ } from "./lib/an.mjs";

export const W = 420, H = 470;
const P2 = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
const f1 = (v) => (+v).toFixed(1);
const ion = (x, y, k) => `<g class="tg-ion ${k}"><circle cx="${f1(x)}" cy="${f1(y)}" r="2.6"/><path d="M${f1(x - 1.3)} ${f1(y)}h2.6M${f1(x)} ${f1(y - 1.3)}v2.6"/></g>`;
const hp = (x, y) => `<circle class="tg-h" cx="${f1(x)}" cy="${f1(y)}" r="1.5"/>`;
// ATP: adenina (dublu ciclu), riboza (pentagon), trei fosfați; ADP are doi
const atp = (x, y, n = 3, cls = "") => `<g class="tg-atp ${cls}"><path class="ad" d="${poly(Array.from({ length: 6 }, (_, i) => [x + Math.cos(i * 1.047) * 2.4, y + Math.sin(i * 1.047) * 2.4]), true)}"/><path class="rb" d="${poly(Array.from({ length: 5 }, (_, i) => [x + 5.4 + Math.cos(i * 1.2566 - 1.57) * 2.2, y + 1 + Math.sin(i * 1.2566 - 1.57) * 2.2]), true)}"/>${Array.from({ length: n }, (_, i) => `<circle class="p" cx="${f1(x + 9.6 + i * 3.2)}" cy="${f1(y + 1)}" r="1.4"/>`).join("")}</g>`;
const glow = (x, y, r, cls = "") => `<circle class="tg-heat ${cls}" cx="${f1(x)}" cy="${f1(y)}" r="${r}"/>`;

export function build() {
  const R = rng(11);
  /* ======================= A. metabolismul energetic celular ======================= */
  const cA = { x: 10, y: 10, w: 262, h: 232 };
  // glicoliza (stânga sus): glucoza → 2 piruvat (+2 ATP), în citosol
  const glu = `<path class="tg-glu" d="${poly(Array.from({ length: 6 }, (_, i) => [34 + Math.cos(i * 1.047 + 0.52) * 5, 30 + Math.sin(i * 1.047 + 0.52) * 5]), true)}"/>`;
  const pyr = [[60, 26], [60, 38]].map(([x, y]) => `<path class="tg-pyr" d="M${x} ${y}l4 -2.4l4 2.4"/><circle class="tg-pyro" cx="${x + 8}" cy="${y}" r="1.2"/>`).join("");
  const glyAtp = atp(28, 46, 3, "s") + atp(28, 54, 3, "s");
  const glyPath = `<path class="tg-path" d="M41 30Q50 30 56 28M41 32Q50 34 56 37"/>`;
  // mitocondria: membrana externă, membrana internă cu criste, matricea; ciclul Krebs; ATP-sintaze pe criste
  const MC = [150, 96], mrx = 100, mry = 58;
  const outer = [], inner = [];
  for (let i = 0; i < 64; i++) { const t = i / 64 * 6.283; outer.push([MC[0] + Math.cos(t) * mrx, MC[1] + Math.sin(t) * mry]); inner.push([MC[0] + Math.cos(t) * (mrx - 6), MC[1] + Math.sin(t) * (mry - 6)]); }
  const cristae = [-70, -46, -22, 2, 26, 50, 72].map((dx, i) => { const x = MC[0] + dx, top = i % 2 === 0; const yEdge = MC[1] + (top ? -1 : 1) * (mry - 6) * Math.sqrt(Math.max(0, 1 - (dx / (mrx - 6)) ** 2)); const len = (mry - 6) * Math.sqrt(Math.max(0, 1 - (dx / (mrx - 6)) ** 2)) * 0.82; const y1 = yEdge + (top ? 1 : -1) * len; return { x, y0: yEdge, y1, top }; });
  const crSvg = cristae.map(({ x, y0, y1 }) => `<path class="tg-cr" d="M${f1(x - 3)} ${f1(y0)}L${f1(x - 3)} ${f1(y1)}Q${f1(x)} ${f1(y1 + (y1 > y0 ? 4 : -4))} ${f1(x + 3)} ${f1(y1)}L${f1(x + 3)} ${f1(y0)}"/>`).join("");
  const knobs = cristae.flatMap(({ x, y0, y1 }) => { const out = []; const n = 3; for (let k = 1; k <= n; k++) { const y = y0 + (y1 - y0) * k / (n + 1); out.push(`<path class="tg-kn" d="M${f1(x + 3)} ${f1(y)}h3"/><circle class="tg-knb" cx="${f1(x + 7)}" cy="${f1(y)}" r="1.4"/>`, `<path class="tg-kn" d="M${f1(x - 3)} ${f1(y)}h-3"/><circle class="tg-knb" cx="${f1(x - 7)}" cy="${f1(y)}" r="1.4"/>`); } return out; }).join("");
  const krebs = `<g class="tg-krebs"><circle cx="${MC[0] - 34}" cy="${MC[1] + 2}" r="9"/>${[0, 1, 2, 3].map((k) => { const a = k * 1.5708 + 0.4; return `<path d="M${f1(MC[0] - 34 + Math.cos(a) * 9)} ${f1(MC[1] + 2 + Math.sin(a) * 9)}l${f1(-Math.sin(a) * 3)} ${f1(Math.cos(a) * 3)}"/>`; }).join("")}</g>`;
  const mito = `<path class="tg-mo" d="${smooth(outer, true)}"/><path class="tg-mi" d="${smooth(inner, true)}"/>${crSvg}${knobs}${krebs}`;
  // porțiunea mărită din membrana internă (jos): spațiul intermembranar sus, matricea jos
  const SY = 202, sx0 = 16, sx1 = 266;
  let strip = `<rect class="tg-ims" x="${sx0}" y="164" width="${sx1 - sx0}" height="${SY - 6 - 164}"/><rect class="tg-mat" x="${sx0}" y="${SY + 6}" width="${sx1 - sx0}" height="${236 - SY - 6}"/>`;
  for (let x = sx0; x <= sx1; x += 4.4) strip += `<circle class="tg-ph" cx="${f1(x)}" cy="${SY - 4}" r="1.8"/><circle class="tg-ph" cx="${f1(x)}" cy="${SY + 4}" r="1.8"/>`;
  strip += `<rect class="tg-memc" x="${sx0}" y="${SY - 2.4}" width="${sx1 - sx0}" height="4.8"/>`;
  const cI = `<path class="tg-c1" d="${smooth([[38, SY - 10], [62, SY - 10], [62, SY + 8], [56, SY + 26], [44, SY + 26], [46, SY + 8], [38, SY + 8]], true, 0.4)}"/>`;
  const cQ = `<circle class="tg-q" cx="76" cy="${SY}" r="2.8"/>`;
  const cIII = `<path class="tg-c3" d="${smooth(lumpy(98, SY + 2, 12, 12, 0.08, 4), true)}"/>`;
  const cytc = `<circle class="tg-cc" cx="120" cy="${SY - 15}" r="3.2"/>`;
  const cIV = `<path class="tg-c4" d="${smooth(lumpy(142, SY + 1, 11, 12, 0.08, 6), true)}"/>`;
  const asyn = `<g class="tg-as"><rect class="f0" x="194" y="${SY - 7}" width="26" height="14" rx="5"/><path class="st" d="M207 ${SY + 6}V${SY + 16}"/><ellipse class="f1" cx="207" cy="${SY + 22}" rx="12" ry="8"/></g>`;
  const pumpH = [[50, SY - 18], [98, SY - 18], [142, SY - 18], [48, SY - 24], [100, SY - 26], [144, SY - 24], [170, SY - 20], [180, SY - 26], [160, SY - 28], [74, SY - 22]].map(([x, y]) => hp(x, y)).join("");
  const backH = [[207, SY - 14], [207, SY - 2], [210, SY + 8]].map(([x, y]) => hp(x, y)).join("");
  const mols = `<text class="tg-mt" x="30" y="${SY + 32}" data-ui>NADH</text><text class="tg-mt" x="138" y="${SY + 30}" data-ui>O₂→H₂O</text>` + atp(226, SY + 24, 3, "syn");
  const stripHeat = glow(50, SY, 16, "c") + glow(98, SY, 16, "c") + glow(142, SY, 16, "c");
  const callout = `<path class="tg-call" d="M${cristae[4].x - 6} ${f1(cristae[4].y1)}L${sx0 + 4} 164M${cristae[4].x + 6} ${f1(cristae[4].y1)}L${sx1 - 4} 164"/><circle class="tg-spot" cx="${cristae[4].x}" cy="${f1((cristae[4].y0 + cristae[4].y1) / 2)}" r="9"/>`;
  const panelA = `<g clip-path="url(#__U__-cA)"><rect class="tg-cy" x="${cA.x}" y="${cA.y}" width="${cA.w}" height="${cA.h}"/>${glu}${glyPath}${pyr}${glyAtp}<g class="tg-mheat">${glow(MC[0], MC[1], 70, "m")}</g>${mito}${strip}${stripHeat}${cI}${cQ}${cIII}${cytc}${cIV}${asyn}<g class="tg-hflow">${pumpH}${backH}</g>${mols}</g>${callout}`;

  /* ======================= B. ATP-aza Na⁺/K⁺ ======================= */
  const cB = { x: 280, y: 10, w: 130, h: 232 };
  const MY = 124;
  let memB = `<rect class="tg-ex" x="${cB.x}" y="${cB.y}" width="${cB.w}" height="${MY - cB.y}"/><rect class="tg-cy" x="${cB.x}" y="${MY}" width="${cB.w}" height="${cB.y + cB.h - MY}"/>`;
  for (let x = cB.x; x <= cB.x + cB.w; x += 4.4) memB += `<circle class="tg-ph" cx="${f1(x)}" cy="${MY - 4}" r="1.8"/><circle class="tg-ph" cx="${f1(x)}" cy="${MY + 4}" r="1.8"/>`;
  memB += `<rect class="tg-memc" x="${cB.x}" y="${MY - 2.4}" width="${cB.w}" height="4.8"/>`;
  const pump = (x) => `<g class="tg-nak"><path class="a" d="${smooth([[x - 12, MY - 14], [x + 10, MY - 16], [x + 12, MY + 12], [x + 20, MY + 30], [x + 4, MY + 40], [x - 14, MY + 30], [x - 12, MY + 12]], true, 0.5)}"/><path class="b" d="${smooth([[x + 8, MY - 12], [x + 20, MY - 22], [x + 26, MY - 16], [x + 14, MY - 6]], true)}"/><path class="gly" d="M${x + 24} ${MY - 20}l4 -6M${x + 26} ${MY - 23}l4 2"/></g>`;
  const pumps = pump(316) + pump(370);
  // gradientul: Na⁺ mult afară, K⁺ mult înăuntru
  let naOut = "", kIn = ""; for (let i = 0; i < 12; i++) naOut += ion(cB.x + 8 + R() * (cB.w - 16), cB.y + 10 + R() * 70, "na"); for (let i = 0; i < 10; i++) kIn += ion(cB.x + 8 + R() * (cB.w - 16), MY + 52 + R() * 50, "k");
  const flux = ion(312, MY - 26, "na") + ion(320, MY - 32, "na") + ion(306, MY - 34, "na") + ion(368, MY + 50, "k") + ion(378, MY + 44, "k") + ion(366, MY - 28, "na") + ion(374, MY - 34, "na") + ion(360, MY - 36, "na") + ion(314, MY + 50, "k") + ion(322, MY + 46, "k");
  const hyd = atp(300, MY + 66, 3, "use") + atp(346, MY + 70, 2, "use") + `<circle class="tg-pi" cx="${358 + 10}" cy="${MY + 64}" r="1.6"/>`;
  const panelB = `<g clip-path="url(#__U__-cB)">${memB}${naOut}${kIn}<g class="tg-pheat">${glow(316, MY + 14, 26)}${glow(370, MY + 14, 26)}</g>${pumps}<g class="tg-flux">${flux}</g>${hyd}</g>`;

  /* ======================= C. efectorii: mușchiul și țesutul adipos brun ======================= */
  const cC = { x: 10, y: 250, w: 262, h: 212 };
  // fibre musculare scheletice (striate), cu placa motorie
  let fibers = "";
  [266, 294, 322, 350, 378].forEach((y, i) => {
    fibers += `<rect class="tg-fib" x="16" y="${y}" width="112" height="24" rx="12"/>`;
    for (let x = 22; x < 124; x += 6) fibers += `<path class="tg-str${(x / 6) % 2 ? " d" : ""}" d="M${x} ${y + 2}V${y + 22}"/>`;
    fibers += `<ellipse class="tg-fn" cx="${40 + i * 18}" cy="${y + 20}" rx="4" ry="1.6"/>`;
  });
  const motor = `<path class="tg-mn" d="M140 262C120 268 96 272 84 292"/><path class="tg-mn" d="M98 274C90 300 76 312 70 326"/><ellipse class="tg-nmj" cx="84" cy="294" rx="5" ry="2.6"/><ellipse class="tg-nmj" cx="70" cy="328" rx="5" ry="2.6"/>`;
  const muscle = `<g class="tg-musg">${fibers}</g>${motor}<g class="tg-mheat2">${glow(72, 318, 46)}</g>`;
  // adipocitul brun: picături multiple de lipide, nucleu, multe mitocondrii (cu UCP1), capilar, terminații simpatice cu NA
  const BA = [206, 338], br = 48;
  const baShape = lumpy(BA[0], BA[1], br, 16, 0.06, 5);
  let drops = ""; [[188, 318, 11], [214, 312, 9], [232, 332, 10], [194, 346, 9], [218, 356, 12], [236, 358, 7], [176, 336, 7], [204, 330, 6]].forEach(([x, y, r]) => { drops += `<circle class="tg-lip" cx="${x}" cy="${y}" r="${r}"/><circle class="tg-lips" cx="${x - r * 0.35}" cy="${y - r * 0.35}" r="${r * 0.3}"/>`; });
  let mitos = ""; for (let i = 0, t = 0; i < 18 && t < 400; t++) { const a = R() * 6.283, rr = Math.sqrt(R()) * (br - 8); const x = BA[0] + Math.cos(a) * rr, y = BA[1] + Math.sin(a) * rr; if ([[188, 318, 11], [214, 312, 9], [232, 332, 10], [194, 346, 9], [218, 356, 12], [176, 336, 7]].some(([cx, cy, r]) => Math.hypot(x - cx, y - cy) < r + 4)) continue; const ang = R() * 180; mitos += `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(ang)})"><ellipse class="tg-bm" rx="5" ry="2.6"/><path class="tg-bmc" d="M-2.4 -1.6v3.2M0 -1.8v3.6M2.4 -1.6v3.2"/></g>`; i++; }
  const ucp = [[226, 316], [178, 352], [244, 344]].map(([x, y]) => `<g class="tg-ucp"><circle cx="${x}" cy="${y}" r="2"/>${hp(x - 3.4, y - 3)}${hp(x + 3.4, y + 3)}</g>`).join("");
  const baNuc = `<ellipse class="tg-ban" cx="${BA[0] + 30}" cy="${BA[1] - 26}" rx="7" ry="5"/>`;
  const capB = `<path class="tg-capb" d="M150 410C180 400 230 404 266 396"/><path class="tg-capl" d="M150 410C180 400 230 404 266 396"/>`;
  const symp = `<path class="tg-sy" d="M270 270C252 282 248 296 252 306"/><path class="tg-sy" d="M262 282C240 290 232 298 228 290"/>` + [[252, 306], [228, 290]].map(([x, y]) => `<circle class="tg-var" cx="${x}" cy="${y}" r="3"/>`).join("") + [[248, 312], [246, 300], [232, 296], [224, 296]].map(([x, y]) => `<circle class="tg-na" cx="${x}" cy="${y}" r="1.2"/>`).join("");
  const bat = `<g class="tg-bheat">${glow(BA[0], BA[1], 56)}</g>${organ(smooth(baShape, true), "tg-ba")}${drops}${mitos}${baNuc}<g class="tg-ucpg">${ucp}</g>${capB}<g class="tg-syg">${symp}</g>`;
  const panelC = `<g clip-path="url(#__U__-cC)"><rect class="tg-ct" x="${cC.x}" y="${cC.y}" width="${cC.w}" height="${cC.h}"/>${muscle}${bat}</g>`;

  /* ======================= D. balanța, sursele în repaus și la efort, hormonii ======================= */
  const cD = { x: 280, y: 250, w: 130, h: 212 };
  // balanța: termogeneza (stânga) și termoliza (dreapta), în echilibru
  const bx = 345, by = 284;
  const balance = `<path class="tg-bal" d="M${bx} ${by}V${by + 26}M${bx - 12} ${by + 26}H${bx + 12}"/><g class="tg-beam" style="transform-origin:${bx}px ${by}px"><path class="tg-bal" d="M${bx - 38} ${by}H${bx + 38}M${bx - 38} ${by}L${bx - 46} ${by + 14}M${bx - 38} ${by}L${bx - 30} ${by + 14}M${bx + 38} ${by}L${bx + 30} ${by + 14}M${bx + 38} ${by}L${bx + 46} ${by + 14}"/><path class="tg-pan" d="M${bx - 48} ${by + 14}Q${bx - 38} ${by + 20} ${bx - 28} ${by + 14}Z"/><path class="tg-pan" d="M${bx + 28} ${by + 14}Q${bx + 38} ${by + 20} ${bx + 48} ${by + 14}Z"/><path class="tg-flame" d="M${bx - 38} ${by + 13}C${bx - 44} ${by + 6} ${bx - 40} ${by + 2} ${bx - 38} ${by - 4}C${bx - 36} ${by + 2} ${bx - 32} ${by + 6} ${bx - 38} ${by + 13}Z"/>${[0, 1, 2].map((k) => `<path class="tg-wave" d="M${bx + 32 + k * 4} ${by + 12}q2 -4 0 -8q-2 -4 0 -8"/>`).join("")}</g><circle class="tg-pivot" cx="${bx}" cy="${by}" r="2.2"/>`;
  const balT = `<text class="tg-t" x="${bx - 38}" y="${by + 30}" text-anchor="middle" data-ui>termogeneză</text><text class="tg-t" x="${bx + 38}" y="${by + 30}" text-anchor="middle" data-ui>termoliză</text>`;
  // barele: repaus (organe interne 50–60%, ficatul peste 30%) și efort (mușchii scheletici 90%)
  const BX0 = 300, BW = 100;
  const bar = (y, parts, lab) => { let x = BX0, s = `<text class="tg-t l" x="${BX0}" y="${y - 3}" data-ui>${lab}</text>`; parts.forEach(([f, c, t]) => { const w = f * BW; s += `<rect class="tg-bar ${c}" x="${f1(x)}" y="${y}" width="${f1(w)}" height="10"/>${t ? `<text class="tg-bt" x="${f1(x + w / 2)}" y="${y + 7.4}" text-anchor="middle" data-ui>${t}</text>` : ""}`; x += w; }); return s + `<rect class="tg-barf" x="${BX0}" y="${y}" width="${BW}" height="10"/>`; };
  const bars = bar(338, [[0.3, "liv", "ficat"], [0.25, "org", ""], [0.45, "oth", ""]], "repaus") + bar(380, [[0.9, "mus", "mușchi 90%"], [0.1, "oth", ""]], "efort");
  const legend = `<text class="tg-t s" x="${BX0}" y="357" data-ui>organe interne 50–60%,</text><text class="tg-t s" x="${BX0}" y="365" data-ui>din care ficatul peste 30%</text>`;
  // controlul hormonal: rapid (catecolamine) și lent (hormoni tiroidieni)
  const thy = `<path class="tg-thy" d="M${300} 418C298 404 310 400 314 410C316 404 322 404 324 410C328 400 340 404 338 418C336 428 326 428 319 420C312 428 302 428 300 418Z"/>`;
  const adr = `<path class="tg-kid" d="M366 434C358 426 360 410 370 406C380 404 386 414 384 424C382 434 374 438 366 434Z"/><path class="tg-adr" d="M364 408L372 396L382 406Z"/>`;
  const hormT = `<text class="tg-t s" x="319" y="442" text-anchor="middle" data-ui>lent</text><text class="tg-t s" x="373" y="448" text-anchor="middle" data-ui>rapid</text>`;
  const panelD = `<rect class="tg-cd" x="${cD.x}" y="${cD.y}" width="${cD.w}" height="${cD.h}" rx="10"/>${balance}${balT}${bars}${legend}<g class="tg-thyg">${thy}</g><g class="tg-adrg">${adr}</g>${hormT}`;

  const frames = [cA, cB, cC].map((c) => `<rect class="tg-card" x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" rx="10"/>`).join("");
  const clips = [["cA", cA], ["cB", cB], ["cC", cC]].map(([id, c]) => `<clipPath id="__U__-${id}"><rect x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" rx="10"/></clipPath>`).join("");
  return {
    W, H,
    defs: clips,
    L: { frames, panelA, panelB, panelC, panelD },
    hits: {
      gly: { x: 16, y: 18, w: 56, h: 44 }, mito: { cx: MC[0], cy: MC[1], r: 40 }, etc: { x: 30, y: 176, w: 130, h: 54 }, asyn: { cx: 210, cy: SY + 8, r: 22 },
      nak: { x: 290, y: 90, w: 116, h: 70 }, grad: { x: 284, y: 16, w: 122, h: 56 },
      mus: { x: 16, y: 262, w: 120, h: 146 }, bat: { cx: BA[0], cy: BA[1], r: 50 }, sym: { cx: 248, cy: 292, r: 14 },
      bal: { x: 290, y: 266, w: 112, h: 52 }, bars: { x: 290, y: 326, w: 116, h: 68 }, thy: { cx: 319, cy: 416, r: 16 }, adr: { cx: 372, cy: 420, r: 18 },
    },
    badges: {
      gly: [80, 22], mito: [258, 46], etc: [24, 176], asyn: [242, 186],
      nak: [398, 92], grad: [398, 26],
      mus: [24, 448], bat: [176, 286], sym: [264, 314],
      bal: [400, 268], bars: [404, 322], thy: [296, 448], adr: [400, 448],
    },
  };
}

export function preview(state = {}) {
  const A = build(), L = A.L, s = (x) => x.replaceAll("__U__", "pv");
  const st = state.st ?? 0;
  return { viewBox: `0 0 ${W} ${H}`, svg: s(`<defs>${A.defs}</defs><g class="tgx" data-st="${st}">${L.frames}${L.panelA}${L.panelB}${L.panelC}${L.panelD}</g>`) };
}
