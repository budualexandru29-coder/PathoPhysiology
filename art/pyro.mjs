// Î15: pirogenii exogeni și efectele biologice ale pirogenilor endogeni. Două panouri, fiecare cu scara lui:
//  A. membrana unui macrofag la scară moleculară (4 px/nm, bara de 10 nm): un fragment din membrana externă a unei bacterii
//     Gram-negative cu lipopolizaharid (LPS; în chenar, o moleculă mărită de 2,5 ori), LBP care duce LPS la CD14, receptorii
//     TLR4–MD-2 (separați, apoi dimerul cu lipidul A), peretele unei bacterii Gram-pozitive cu acid lipoteicoic pe
//     heterodimerul TLR2:TLR6 (Janeway ed. 10, p. 252, 258–259); sub membrană MyD88, IRAK4, IRAK1, TRAF6, IKK, IκB și NF-κB
//     (p. 260–262); citokinele ies pe căile lor: TNF-α ancorat în membrană și tăiat de TACE (p. 319), IL-1β prin porii de
//     gasdermină D (p. 273), IL-6. În colț, macrofagul întreg la 3 px/µm (21 µm; Junqueira p. 113), cu un fagozom.
//  B. efectele pirogenilor endogeni, în jurul unui vas: celulele la 2,4 px/µm (bara de 10 µm), din biblioteca comună;
//     moleculele (PGE2, PCR, anticorpi, interferon, IL-8) și virionii sunt simboluri, nu la scară; scenele sunt în locuri
//     diferite din corp, legate de un singur vas (hartă).
import { smooth, poly, lumpy, rng, sampleSmooth, ribbon } from "./lib/geo.mjs";
import * as C from "./parts/cells.mjs";
import { cytokine, pge2 } from "./fever.mjs";

export const W = 420, H = 536;
export const KN = 4, KC = 3, KB = 2.4;                  // px/nm (panoul A), px/µm (macrofagul din colț), px/µm (panoul B)
const P2 = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
const f1 = (v) => (+v).toFixed(1);
const hex = (x, y, r, cls = "") => `<path class="${cls}" d="${poly(Array.from({ length: 6 }, (_, i) => [x + Math.cos(i * Math.PI / 3 + Math.PI / 6) * r, y + Math.sin(i * Math.PI / 3 + Math.PI / 6) * r]), true)}"/>`;
// contur de celulă alungită (pentru celule care migrează sau se strâng printr-un sinus)
const blob = (cx, cy, rx, ry, ang = 0, seed = 1, amp = 0.06) => lumpy(0, 0, 1, 14, amp, seed).map(([u, v]) => [cx + u * rx * Math.cos(ang) - v * ry * Math.sin(ang), cy + u * rx * Math.sin(ang) + v * ry * Math.cos(ang)]);

/*
 * LPS în nm (kn px/nm). (x, y) = fața dizaharidului lipidului A dinspre exterior; dir = +1 dacă lanțul de zaharuri iese în jos.
 * Lipidul A: dizaharid de glucozamină cu două fosfați și șase lanțuri acil (~1,8 nm); miezul: ~8 zaharuri (~3 nm);
 * antigenul O: nO unități repetitive de câte patru zaharuri (Raetz & Whitfield 2002). Un inel de zahăr are ~0,5 nm.
 */
function lps(x, y, kn, { dir = 1, nO = 3, cls = "", lean = 0 } = {}) {
  const r = 0.28 * kn, st = 0.55 * kn, d = dir;
  let tails = "";
  for (let i = 0; i < 6; i++) { const x0 = x + (i - 2.5) * 0.32 * kn; let s = `M${f1(x0)} ${f1(y)}`; for (let k = 1; k <= 4; k++) s += `L${f1(x0 + (k % 2 ? 0.1 : -0.1) * kn)} ${f1(y - d * k * (i === 0 || i === 5 ? 0.38 : 0.45) * kn)}`; tails += s; }
  const gl = hex(x - 0.33 * kn, y + d * 0.3 * kn, r, "lp-g") + hex(x + 0.33 * kn, y + d * 0.3 * kn, r, "lp-g");
  const ph = [-1, 1].map((sg) => `<circle class="lp-p" cx="${f1(x + sg * 0.78 * kn)}" cy="${f1(y + d * 0.22 * kn)}" r="${f1(0.19 * kn)}"/>`).join("");
  let core = "", p = [x, y + d * 0.62 * kn];
  for (let i = 0; i < 6; i++) { p = [p[0] + ((i % 2 ? 0.16 : -0.16) + lean) * kn, p[1] + d * st]; core += hex(p[0], p[1], r, "lp-core"); if (i === 2 || i === 4) core += hex(p[0] + (i === 2 ? 0.5 : -0.5) * kn, p[1] + d * 0.15 * kn, r * 0.9, "lp-core"); }
  let oag = "";
  for (let u = 0; u < nO; u++) for (let i = 0; i < 3; i++) { p = [p[0] + ((i % 2 ? 0.14 : -0.14) + lean) * kn, p[1] + d * st]; oag += hex(p[0], p[1], r, "lp-o"); if (i === 1) oag += hex(p[0] + (u % 2 ? 0.5 : -0.5) * kn, p[1], r * 0.85, "lp-o2"); }
  return `<g class="lps1 ${cls}"><path class="lp-acyl" d="${tails}"/>${gl}${ph}${core}${oag}</g>`;
}
// doar lipidul A (în buzunarul MD-2 sau în LBP)
const lipidA = (x, y, kn, dir = -1) => lps(x, y, kn, { dir, nO: 0 }).replace(/<path class="lp-core"[^>]*\/>/g, "");

export function build() {
  /* ======================= A. membrana macrofagului, 4 px/nm ======================= */
  const k = KN, cA = { x: 10, y: 10, w: 400, h: 246 }, MY = 160;          // MY = fața externă a membranei; dublul strat are 4 nm
  const memL = C.bilayer(cA.x, 72, MY, k, { step: 1.2 }) + C.bilayer(104, cA.x + cA.w, MY, k, { step: 1.2 });
  const memPore0 = C.bilayer(72, 104, MY, k, { step: 1.2 });            // aceeași bucată, fără por (pasul 0–1)
  // gasdermina D: subunitățile care căptușesc porul (secțiune), deschis între x 76 și 100 (Janeway p. 273)
  const gsd = [74, 102].map((x) => Array.from({ length: 5 }, (_, i) => `<rect class="gsd" x="${f1(x - 2.2)}" y="${f1(MY - 2.5 + i * 4.2)}" width="4.4" height="3.8" rx="1.2"/>`).join("")).join("");
  const memPore = C.bilayer(72, 74, MY, k, { step: 1.2 }) + C.bilayer(102, 104, MY, k, { step: 1.2 }) + gsd;

  // fragment din membrana externă a unei bacterii Gram-negative (stânga sus): periplasma, peptidoglicanul subțire, dublul strat cu LPS
  const om = `<rect class="bg-peri" x="${cA.x}" y="${cA.y}" width="150" height="8"/><path class="bg-pgl" d="M${cA.x} 14H160"/>` + C.bilayer(cA.x, 160, 18, k, { step: 1.2, cls: "om" });
  const lpsOM = [20, 36, 52, 68, 84, 100, 116, 132, 148].map((x, i) => lps(x, 34, k, { dir: 1, nO: 2 + (i * 7) % 4, lean: ((i * 5) % 3 - 1) * 0.04 })).join("");
  // chenarul cu LPS mărit (10 px/nm), cu bara lui de 2 nm
  const ins = { x: 198, y: 14, w: 66, h: 98 };
  const lpsBig = `<rect class="pa-ins" x="${ins.x}" y="${ins.y}" width="${ins.w}" height="${ins.h}" rx="6"/>` + lps(231, 34, 10, { dir: 1, nO: 1 }) + C.scaleBar(204, 104, 10, 2, "2 nm", { cls: "dk" }) + `<circle class="pa-zoom" cx="148" cy="44" r="5"/>`;
  // LBP (în bumerang, ~13 nm) care a scos o moleculă de LPS: lipidul A în vârful LBP
  const lbpP = [[112, 112], [124, 104], [138, 98], [152, 96], [164, 99], [162, 106], [150, 104], [137, 106], [124, 112], [114, 118]];
  const lbp = `<path class="lbp" d="${smooth(lbpP, true)}"/>` + lps(160, 104, k, { dir: 1, nO: 2 });
  // CD14 (potcoavă ancorată prin GPI) cu LPS predat
  const cd14 = `<path class="gpi" d="M186 ${MY}V146"/><path class="cd14b" d="${smooth([[176, 146], [173, 134], [180, 124], [192, 124], [199, 134], [196, 146], [190, 140], [186, 132], [182, 140]], true)}"/>`;
  const cd14L = lps(186, 129, k, { dir: -1, nO: 0 });
  // TLR4–MD-2: monomeri separați (pasul 0) sau dimerul cu lipidul A în buzunarele MD-2 (de la pasul 1)
  const tlrMono = C.tlr(214, MY, k, { tone: "t4", md2: true }) + C.tlr(318, MY, k, { tone: "t4", flip: true, md2: true });
  const tlrDim = C.tlr(234, MY, k, { tone: "t4", md2: true }) + C.tlr(298, MY, k, { tone: "t4", flip: true, md2: true }) + lipidA(260, 127, k, -1) + lipidA(272, 127, k, -1);
  // peretele Gram-pozitiv (dreapta sus): ochiurile de peptidoglican (lanțuri de glican orizontale, punți peptidice), acidul lipoteicoic
  let gp = `<rect class="gp-wall" x="300" y="${cA.y}" width="110" height="30"/>`;
  for (let y = 14; y <= 36; y += 7) gp += `<path class="gp-gly iso-line" d="M300 ${y}H410"/>`;
  for (let i = 0; i < 26; i++) { const x = 304 + i * 4.1 + (i % 3), y = 14 + (i % 3) * 7; gp += `<path class="gp-pep iso-line" d="M${f1(x)} ${y}V${y + 7}"/>`; }
  const lta = (x, y0, n, cls = "") => { let s = `<g class="lta1 ${cls}">`; for (let i = 0; i < n; i++) s += `<circle class="lta-b" cx="${f1(x + (i % 2 ? 0.9 : -0.9))}" cy="${f1(y0 + i * 2.6)}" r="1.15"/>`; return s + "</g>"; };
  gp += lta(318, 34, 7) + lta(334, 36, 6) + lta(398, 34, 7);
  // LTA eliberat, cu ancora de diacilglicerol, pe heterodimerul TLR2:TLR6
  const ltaFree = lta(374, 104, 9) + `<path class="lp-acyl" d="M372.6 127l-.6 5l.6 5M375.4 127l.6 5l-.6 5"/>`;
  const tlr26mono = C.tlr(330, MY, k, { tone: "t2" }) + C.tlr(408, MY, k, { tone: "t6", flip: true });
  const tlr26dim = C.tlr(342, MY, k, { tone: "t2" }) + C.tlr(406, MY, k, { tone: "t6", flip: true }) + ltaFree;

  // sub membrană: MyD88 (TIR + domeniul morții), IRAK4, IRAK1, TRAF6, TAK1, IKK (α, β, NEMO), IκBα–NF-κB (p50/p65)
  const dm = (x, y, rx, ry, cls) => `<ellipse class="${cls}" cx="${f1(x)}" cy="${f1(y)}" rx="${f1(rx)}" ry="${f1(ry)}"/>`;
  // un lanț continuu, fiecare proteină lipită de următoarea: TIR (receptor) → TIR + domeniul morții (MyD88) → IRAK4 → IRAK1 → TRAF6 → TAK1 → IKK
  const myd = dm(246, 194, 6, 4.6, "myd") + dm(286, 194, 6, 4.6, "myd") + dm(254, 203, 5.4, 4.4, "myd dd") + dm(278, 203, 5.4, 4.4, "myd dd")
    + dm(260, 212, 6, 4.8, "kin") + dm(272, 212, 6, 4.8, "kin") + dm(266, 222, 6.6, 5, "kin k1") + `<path class="traf" d="${smooth(lumpy(280, 230, 7, 9, 0.12, 4), true)}"/>`
    + `<path class="tak" d="${smooth(lumpy(293, 234, 5.6, 9, 0.12, 6), true)}"/>` + dm(307.6, 238, 6.4, 5.6, "ikk") + dm(320, 238, 6.4, 5.6, "ikk") + dm(314, 247, 6.4, 3.6, "ikk nemo")
    + dm(354, 194, 6, 4.6, "myd") + dm(394, 194, 6, 4.6, "myd");
  const nfkb = (x, y) => `<g class="nfkb">${dm(x - 5.6, y, 6, 4.8, "p50")}${dm(x + 5.6, y, 6, 4.8, "p65")}</g>`;
  const nfRest = nfkb(380, 226) + `<path class="ikb" d="M368 219Q380 211 392 219"/>`;
  const nfFree = [[350, 222], [356, 218], [362, 221]].map(([x, y]) => `<circle class="ikbf" cx="${x}" cy="${y}" r="1.5"/>`).join("") + nfkb(386, 242) + `<path class="pa-arrow" d="M396 248L404 252M404 252l-4.6 .2M404 252l-2 -4"/>`;
  // citokinele, pe căile lor (de la pasul 2): TNF-α ancorat și TACE care îl taie; trimerul solubil liber; IL-1β prin porul de gasdermină; IL-6
  const tnfM = `<path class="tnf-st" d="M28 ${MY}V150M34 ${MY}V150M40 ${MY}V150"/>` + [[28, 145], [40, 145], [34, 138]].map(([x, y]) => `<circle class="tnf-c" cx="${x}" cy="${y}" r="6"/>`).join("");
  const tace = `<path class="tace" d="${smooth([[50, MY], [48, 150], [52, 140], [60, 136], [66, 142], [64, 152], [60, MY]], true)}"/><path class="tace-cut iso-line" d="M49 150l-6 -1.5M49 150l-5.6 2.6"/>`;
  const ckOut = `<g class="tnf-sol">${[[30, 112], [42, 112], [36, 102]].map(([x, y]) => `<circle class="tnf-c" cx="${x}" cy="${y}" r="6"/>`).join("")}</g>`
    + `<g class="il1b">${[0, 1, 2].map((i) => { const a = -Math.PI / 2 + i * 2.094; return `<circle cx="${f1(88 + Math.cos(a) * 3.6)}" cy="${f1(150 + Math.sin(a) * 3.6)}" r="3.6"/>`; }).join("")}</g>`
    + `<g class="il1b">${[0, 1, 2].map((i) => { const a = -Math.PI / 2 + i * 2.094; return `<circle cx="${f1(90 + Math.cos(a) * 3.6)}" cy="${f1(124 + Math.sin(a) * 3.6)}" r="3.6"/>`; }).join("")}</g>`
    + `<g class="il6m">${[0, 1, 2, 3].map((i) => `<rect x="${f1(54 + i * 2.6)}" y="${f1(116 + (i % 2) * 1.2)}" width="2.3" height="9" rx="1.1"/>`).join("")}</g>`;

  // macrofagul întreg, la 3 px/µm, cu fagozomul (bacteria opsonizată) și locul membranei mărite sus
  const th = { x: 14, y: 182, w: 136, h: 70 };
  const fagS = `<circle class="fagm" cx="70" cy="226" r="6.2"/><rect class="fagb" x="65.5" y="224.6" width="9" height="2.8" rx="1.4"/>` + [[66, 224], [70, 223.6], [74, 224.3]].map(([x, y]) => `<circle class="c3b" cx="${x}" cy="${y}" r=".7"/>`).join("") + `<circle class="lc-lys" cx="62" cy="234" r="1.5"/>`;
  const macShape = blob(56, 217, 31, 29, 0.3, 21, 0.1);
  const thumb = `<rect class="pa-ins" x="${th.x}" y="${th.y}" width="${th.w}" height="${th.h}" rx="6"/>` + C.macrophage(56, 217, KC, { shape: macShape, seed: 21, eat: fagS, rot: 0 })
    + [[100, 196, 0.4], [104, 236, -0.3]].map(([x, y, a]) => `<rect class="fagb" x="${x - 3}" y="${y - 1.2}" width="6" height="2.4" rx="1.2" transform="rotate(${a * 57.3} ${x} ${y})"/>`).join("")
    + `<circle class="pa-zoom" cx="86" cy="208" r="3"/>` + C.scaleBar(146, 246, KC, 10, "10 µm", { cls: "dk", anchor: "end" });
  const thMrna = [[42, 212], [48, 208], [38, 222]].map(([x, y]) => `<path class="mrna" d="M${x} ${y}q2 -2 0 -4"/>`).join("");

  const panelA = `<g clip-path="url(#__U__-cA)"><rect class="pa-ex" x="${cA.x}" y="${cA.y}" width="${cA.w}" height="${MY - cA.y}"/><rect class="pa-cy" x="${cA.x}" y="${MY}" width="${cA.w}" height="${cA.y + cA.h - MY}"/>`
    + `${om}${lpsOM}${gp}${memL}<g class="pa-s0">${memPore0}${tlrMono}${tlr26mono}${nfRest}</g><g class="pa-s1">${lbp}${cd14L}${tlrDim}${tlr26dim}${myd}</g>${cd14}`
    + `<g class="pa-s2">${memPore}${tnfM}${tace}${nfFree}</g><g class="pa-s2b">${ckOut}</g>${lpsBig}${C.scaleBar(270, 100, k, 10, "10 nm", { cls: "dk" })}${thumb}<g class="pa-s2">${thMrna}</g></g>`;

  /* ======================= B. efectele pirogenilor endogeni, celulele la 2,4 px/µm ======================= */
  const q = KB, cB = { x: 10, y: 224, w: 400, h: 266 };
  const VY0 = 342, VY1 = 368;                              // lumenul vasului: 26 px ≈ 11 µm
  let vessel = `<g clip-path="url(#__U__-cB)"><rect class="pv-l" x="${cB.x}" y="${VY0}" width="${cB.w}" height="${VY1 - VY0}"/><path class="pv-w" d="M${cB.x} ${VY0 - 1.5}H${cB.x + cB.w}M${cB.x} ${VY1 + 1.5}H${cB.x + cB.w}"/>`;
  for (let x = cB.x + 8; x < cB.x + cB.w; x += 26) vessel += `<ellipse class="pv-n" cx="${x}" cy="${VY0 - 1.5}" rx="4" ry="1"/><ellipse class="pv-n" cx="${x + 13}" cy="${VY1 + 1.5}" rx="4" ry="1"/>`;
  for (let i = 0; i < 9; i++) { const x = cB.x + 22 + i * 44; vessel += i % 3 === 1 ? C.rbc(x, 355, q) : C.rbc(x, 355 + (i % 2 ? 3 : -3), q, { edge: true, angle: (i % 2 ? 0.3 : -0.25) }); }
  vessel += `</g>`;
  const fe = [40, 96, 150, 212, 258, 318, 372].map((x, i) => `<circle class="pv-fe" cx="${x}" cy="${348 + (i % 3) * 7}" r="1.4"/>`).join("") + [70, 180, 290, 396].map((x) => `<circle class="pv-zn" cx="${x}" cy="361" r="1.3"/>`).join("");
  const ckV = ["il1", "tnf", "il6", "il1", "tnf", "il6", "il1"].map((kk, i) => cytokine(kk, 46 + i * 52, 355 + (i % 2 ? -6 : 6), 0.8, `v${i}`)).join("");
  // S1: OVLT — capilar fenestrat (7,5 µm) care urcă din vas, endoteliul cu COX-2, PGE2, neuronul preoptic cu EP3, termostatul
  const s1 = { x: 14, y: 230, w: 128, h: 108 };
  const cap1 = `<rect class="pn-bg" x="${s1.x}" y="${s1.y}" width="${s1.w}" height="${s1.h}" rx="6"/><rect class="pv-l" x="37" y="${s1.y}" width="18" height="${VY0 - s1.y}"/><path class="pv-w" d="M36 ${s1.y}V${VY0 - 1.5}M56 ${s1.y}V${VY0 - 1.5}"/>` + [254, 278, 302, 326].map((y) => `<path class="pv-fen" d="M56 ${y}v3"/>`).join("") + C.rbc(46, 262, q, { edge: true, angle: Math.PI / 2 }) + C.rbc(46, 306, q, { edge: true, angle: Math.PI / 2 + 0.2 });
  const cox = `<path class="cox2" d="${smooth(lumpy(61, 292, 4.4, 9, 0.16, 7), true)}"/>`;
  const neu = { c: [98, 268], r: 13 };
  const dend = [[0.9, -0.6, 16], [1, 0.3, 14], [-0.2, -1, 14], [0.3, 1, 12]].map(([dx, dy, l]) => `<path class="pn-d" d="${poly(ribbon(sampleSmooth([[neu.c[0] + dx * neu.r, neu.c[1] + dy * neu.r], [neu.c[0] + dx * (neu.r + l * 0.5) + 3, neu.c[1] + dy * (neu.r + l * 0.5)], [neu.c[0] + dx * (neu.r + l), neu.c[1] + dy * (neu.r + l)]], false, 4), (t) => 2.4 * (1 - t) + 0.4), true)}"/>`).join("");
  const neuron = `<g class="pn-n">${dend}<path class="pn-s" d="${smooth(lumpy(neu.c[0], neu.c[1], neu.r, 10, 0.1, 4), true)}"/><circle class="pn-nu" cx="${neu.c[0] + 1}" cy="${neu.c[1]}" r="5"/><circle class="pn-nl" cx="${neu.c[0] + 2}" cy="${neu.c[1] - 1}" r="1.3"/></g>` + [[-0.95, 0.3], [-0.8, 0.6], [-0.95, -0.1]].map(([dx, dy]) => `<path class="ep3" d="M${f1(neu.c[0] + dx * (neu.r + 0.5))} ${f1(neu.c[1] + dy * (neu.r + 0.5))}l-3 0m0 -2l0 4"/>`).join("");
  const pges = [[68, 286], [74, 278], [80, 272]].map(([x, y]) => pge2(x, y, 0.5, "")).join("");
  const camp = `<g class="camp"><path d="${poly(Array.from({ length: 5 }, (_, i) => [100 + Math.cos(i * 1.2566 - 1.57) * 2.6, 266 + Math.sin(i * 1.2566 - 1.57) * 2.6]), true)}"/><circle cx="103.6" cy="268.6" r="1.1"/></g>`;
  const dial = { c: [116, 316], r: 16 };
  let dialSvg = `<circle class="dl-body" cx="${dial.c[0]}" cy="${dial.c[1]}" r="${dial.r + 2}"/><circle class="dl-face" cx="${dial.c[0]}" cy="${dial.c[1]}" r="${dial.r}"/>`;
  [36, 37, 38, 39, 40].forEach((T, i) => { const a = (-210 + i * 60) * Math.PI / 180; dialSvg += `<path class="dl-tick big" d="M${f1(dial.c[0] + Math.cos(a) * (dial.r - 4))} ${f1(dial.c[1] + Math.sin(a) * (dial.r - 4))}L${f1(dial.c[0] + Math.cos(a) * (dial.r - 1))} ${f1(dial.c[1] + Math.sin(a) * (dial.r - 1))}"/>`; if (T === 37 || T === 39) dialSvg += `<text class="dl-n" x="${f1(dial.c[0] + Math.cos(a) * (dial.r - 7.6))}" y="${f1(dial.c[1] + Math.sin(a) * (dial.r - 7.6) + 2)}" text-anchor="middle" data-ui>${T}</text>`; });
  const needle = { cx: dial.c[0], cy: dial.c[1], len: dial.r - 3 };
  const S1 = cap1 + cox + neuron;
  // S2: ficatul — două rânduri de hepatocite (20–30 µm, nucleu central; Ross p. 653), sinusoidul care se varsă în vas, celula Kupffer; PCR, feritina
  const s2 = { x: 146, y: 230, w: 128, h: 108 };
  let hepS = `<rect class="pl-bg" x="${s2.x}" y="${s2.y}" width="${s2.w}" height="${s2.h}" rx="6"/><rect class="pv-l s" x="200" y="${s2.y}" width="22" height="${VY0 - s2.y}"/>`;
  const RH = rng(13);
  for (let row = 0; row < 2; row++) [[148, 198], [224, 272]].forEach(([x0, x1], side) => {
    const y0 = s2.y + 2 + row * 54, j = () => (RH() - 0.5) * 3;
    hepS += `<path class="ph" d="${poly([[x0 + j(), y0 + j()], [x1, y0 + 1 + j()], [x1 - 1, y0 + 51], [x0 + 1 + j(), y0 + 50]], true)}"/>`;
    const cx = (x0 + x1) / 2 + (side ? -2 : 2), cy = y0 + 25;
    hepS += row === 1 && side === 0 ? `<circle class="phn" cx="${cx - 9}" cy="${cy}" r="6"/><circle class="phn" cx="${cx + 9}" cy="${cy}" r="6"/>` : `<circle class="phn" cx="${cx}" cy="${cy}" r="6.5"/>`;
  });
  hepS += `<path class="pv-w" d="M199.5 ${s2.y}V${VY0 - 1.5}M222.5 ${s2.y}V${VY0 - 1.5}"/>` + C.macrophage(211, 300, q, { shape: blob(211, 300, 8, 20, 0, 5, 0.1), seed: 5 });
  const ferr = [[160, 246], [176, 262], [188, 290], [236, 252], [254, 280], [240, 316], [166, 320], [210, 292], [214, 300], [208, 306]].map(([x, y]) => `<circle class="ferr" cx="${x}" cy="${y}" r="1.6"/>`).join("");
  const crps = [[211, 246], [210, 266], [212, 326], [211, 337]].map(([x, y]) => C.crp(x, y, 0.6)).join("");
  const S2 = hepS;
  // S3: măduva — trabecule, celule hematopoietice, o parte dintr-un megacariocit (până la 150 µm; Junqueira p. 273), adipocite, sinusul medular
  const s3 = { x: 278, y: 230, w: 128, h: 108 };
  let mar = `<g clip-path="url(#__U__-c3)"><rect class="pm-bg" x="${s3.x}" y="${s3.y}" width="${s3.w}" height="${s3.h}" rx="6"/>`;
  mar += `<path class="pbone" d="${smooth([[276, 238], [298, 232], [318, 244], [314, 256], [294, 252], [276, 260]], true)}"/>`;
  mar += `<circle class="pm-f" cx="410" cy="250" r="30"/><circle class="pm-f" cx="300" cy="346" r="22"/>`;
  mar += `<g class="pm-mk"><path d="${smooth(lumpy(392, 312, 30, 16, 0.08, 7), true)}"/><path class="n" d="${smooth(lumpy(394, 312, 15, 12, 0.32, 8), true)}"/></g>`;
  const RM = rng(9), placed = [];
  for (let t = 0; t < 900 && placed.length < 14; t++) {
    const x = 284 + RM() * 116, y = 262 + RM() * 72, r = 12 + RM() * 3;
    if (x > 324 && x < 366) continue; if (Math.hypot(x - 392, y - 312) < 30 + r || Math.hypot(x - 410, y - 250) < 30 + r || Math.hypot(x - 300, y - 346) < 22 + r) continue;
    if (placed.some(([a, b, c]) => Math.hypot(a - x, b - y) < c + r - 1)) continue;
    placed.push([x, y, r]);
  }
  placed.forEach(([x, y, r], i) => { mar += i % 3 === 0 ? C.neutrophil(x, y, q, { d: r * 2 / q, lobes: 3, seed: 30 + i }) : i % 3 === 1 ? C.lymphocyte(x, y, q, { d: r * 2 / q, seed: 30 + i }) : C.eosinophil(x, y, q, { d: r * 2 / q, seed: 30 + i }); });
  mar += `<rect class="pv-l s" x="331" y="262" width="28" height="${VY0 - 262}"/><path class="pv-w" d="M330.5 262V${VY0 - 1.5}M359.5 262V${VY0 - 1.5}"/></g>`;
  const mob = [288, 314, 336].map((y, i) => C.neutrophil(345, y, q, { shape: blob(345, y, 11, 14, 0, 40 + i, 0.07), seed: 40 + i, lobes: 3 + (i % 2) })).join("");
  const S3 = mar;
  // S4: endoteliul — selectine și ICAM-1, neutrofil aderat, unul care trece prin perete, unul care urmează IL-8 spre un macrofag; trombocit; Tx, PAF, PGE2
  const s4 = { x: 14, y: 372, w: 128, h: 112 };
  const endo = `<rect class="pn-bg2" x="${s4.x}" y="${s4.y}" width="${s4.w}" height="${s4.h}" rx="6"/>`;
  const adh = [36, 44, 52, 60, 68, 76, 84].map((x, i) => i % 2 ? `<path class="sel" d="M${x} ${VY1}L${x} ${VY1 - 3.4}"/><circle class="sel-h" cx="${x}" cy="${VY1 - 4.4}" r="1.2"/>` : `<path class="icam" d="M${x} ${VY1}L${x} ${VY1 - 2.6}"/>`).join("");
  const ntOut = C.neutrophil(56, 357, q, { shape: blob(56, 357, 16, 9, 0, 51, 0.05), seed: 51, lobes: 4 }) + C.neutrophil(92, 370, q, { shape: blob(92, 370, 8, 17, 0.1, 52, 0.07), seed: 52, lobes: 3 }) + C.neutrophil(104, 404, q, { shape: blob(104, 404, 15, 11, 0.8, 53, 0.1), seed: 53, rot: 0.8 });
  const il8 = [[108, 424], [114, 434], [104, 440], [118, 446], [96, 428], [124, 452], [112, 452]].map(([x, y]) => `<circle class="chk" cx="${x}" cy="${y}" r="1.3"/>`).join("") + C.macrophage(118, 468, q, { shape: blob(118, 468, 22, 14, 0.15, 54, 0.12), seed: 54 });
  const plt = C.platelet(24, 352, q, { angle: 0.2 }) + C.platelet(30, 361, q, { angle: -0.3 }) + `<g class="pc-txg">${txa2(32, 392)}</g>` + paf(34, 418) + pge2(26, 444, 0.62, "");
  const S4 = endo;
  // S5: apărarea specifică și nespecifică — limfocit B (IgM de membrană), plasmocit (~18 µm) cu anticorpi, limfocit T care se divide, neutrofil care fagocitează
  const s5 = { x: 146, y: 372, w: 128, h: 112 };
  const def = `<rect class="pn-bg2" x="${s5.x}" y="${s5.y}" width="${s5.w}" height="${s5.h}" rx="6"/>`;
  const bcell = C.lymphocyte(166, 396, q, { kind: "B", seed: 61 });
  const plas = C.plasmaCell(204, 402, q, { seed: 62, rot: 0.1 }) + [[232, 388, 0.4], [238, 402, 0], [230, 416, -0.5], [246, 392, 0.2], [248, 410, -0.2]].map(([x, y, a]) => C.antibody(x, y, 0.75, { a: a - Math.PI / 2 + Math.PI })).join("");
  const tcell = C.lymphocyte(166, 446, q, { kind: "T", seed: 63 }) + C.lymphocyte(184, 460, q, { kind: "T", seed: 64 }) + `<path class="pc-div iso-line" d="M172.5 451.5L177.5 455"/>`;
  const phagoShape = [[220, 446], [228, 436], [240, 432], [250, 438], [258, 436], [264, 444], [258, 450], [252, 448], [256, 458], [246, 468], [232, 468], [222, 460]];
  const phago = C.neutrophil(238, 452, q, { shape: phagoShape.map(([x, y]) => [238 + (x - 238) * 0.8, 452 + (y - 452) * 0.8]), seed: 65 }) + `<rect class="pc-bac" x="248" y="443.6" width="5" height="2" rx="1"/><circle class="c3b" cx="249" cy="443.2" r=".6"/><circle class="c3b" cx="252.4" cy="445.8" r=".6"/>`;
  const S5 = def;
  // S6: interferonul — celula epitelială infectată (virioni, simboluri mărite) eliberează IFN, celulele vecine intră în starea antivirală
  const s6 = { x: 278, y: 372, w: 128, h: 112 };
  let iv = `<rect class="pn-bg2" x="${s6.x}" y="${s6.y}" width="${s6.w}" height="${s6.h}" rx="6"/>`;
  [[284, 320], [322, 358], [360, 398]].forEach(([x0, x1], i) => { iv += `<path class="ep-c" d="${poly([[x0, 404], [x1, 402], [x1 + 1, 470], [x0 + 1, 472]], true)}"/><circle class="ep-n" cx="${(x0 + x1) / 2}" cy="${448}" r="7"/>`; });
  const vir = [[296, 414], [310, 420], [292, 432], [312, 460], [298, 464]].map(([x, y]) => virion(x, y)).join("");
  const ifns = [[324, 416], [334, 426], [344, 412], [352, 440], [362, 420]].map(([x, y]) => ifn(x, y)).join("");
  const isg = [[330, 432], [348, 462], [370, 414], [388, 422], [372, 462], [390, 458], [380, 410]].map(([x, y]) => `<circle class="isg" cx="${x}" cy="${y}" r="1.6"/>`).join("") + `<circle class="isgh" cx="340" cy="448" r="11"/><circle class="isgh" cx="379" cy="448" r="11"/>`;
  const S6 = iv;
  const barB = C.scaleBar(284, 479, q, 10, "10 µm", { cls: "dk" });

  const frames = `<rect class="pa-card" x="${cA.x}" y="${cA.y}" width="${cA.w}" height="${cA.h}" rx="10"/><g transform="translate(0 ${DY})"><rect class="pa-card" x="${cB.x}" y="${cB.y}" width="${cB.w}" height="${cB.h}" rx="10"/></g>`;
  const frameLine = `<rect class="pa-cardl" x="${cA.x}" y="${cA.y}" width="${cA.w}" height="${cA.h}" rx="10"/>`;
  const sh = (o) => Object.fromEntries(Object.entries(o).map(([kk, v]) => [kk, Array.isArray(v) ? [v[0], v[1] + DY] : v.cy != null ? { ...v, cy: v.cy + DY } : { ...v, y: v.y + DY }]));

  const Lb = { vessel, fe, ckV, S1, S2, S3, S4, S5, S6, barB, cox, pges, camp, dial: dialSvg, ferr, crps, mob, adh, ntOut, il8, plt, bcell, plas, tcell, phago, vir, ifns, isg };
  return {
    W, H, needle: { ...needle, cy: needle.cy + DY }, DY,
    defs: `<clipPath id="__U__-cB"><rect x="${cB.x}" y="${cB.y}" width="${cB.w}" height="${cB.h}" rx="10"/></clipPath><clipPath id="__U__-cA"><rect x="${cA.x}" y="${cA.y}" width="${cA.w}" height="${cA.h}" rx="10"/></clipPath><clipPath id="__U__-c3"><rect x="${s3.x}" y="${s3.y}" width="${s3.w}" height="${s3.h}" rx="6"/></clipPath>`,
    L: {
      frames, panelA, frameLine, B: panelB(Lb),
    },
    hits: {
      lps: { x: 12, y: 12, w: 146, h: 70 }, tlr4: { cx: 266, cy: 136, r: 26 }, myd: { cx: 282, cy: 220, r: 30 }, ck: { x: 16, y: 96, w: 94, h: 62 }, fag: { x: th.x + 2, y: th.y + 2, w: th.w - 4, h: th.h - 4 }, tlr2: { cx: 374, cy: 92, r: 34 },
      ...sh({ ovlt: { x: 32, y: 250, w: 46, h: 60 }, poa: { cx: 98, cy: 268, r: 18 }, dial: { cx: dial.c[0], cy: dial.c[1], r: 18 }, liv: { x: 148, y: 232, w: 124, h: 104 }, mar: { x: 280, y: 232, w: 124, h: 104 },
        lip: { x: 16, y: 374, w: 40, h: 108 }, adh: { x: 58, y: 352, w: 82, h: 110 }, per: { x: 148, y: 374, w: 106, h: 60 }, fgc: { cx: 240, cy: 452, r: 22 }, ifn: { x: 280, y: 374, w: 124, h: 96 } }),
    },
    badges: {
      lps: [176, 48], tlr4: [318, 130], myd: [234, 236], ck: [18, 96], fag: [140, 192], tlr2: [338, 56],
      ...sh({ ovlt: [24, 242], poa: [128, 246], dial: [136, 330], liv: [158, 242], mar: [396, 330], lip: [52, 476], adh: [134, 386], per: [262, 384], fgc: [268, 474], ifn: [396, 380] }),
    },
  };
}
// distanța cu care panoul B coboară sub panoul A (mai înalt acum)
const DY = 38;
// simbolurile din panoul B
const ifn = (x, y) => `<g class="pc-ifn"><path d="M${f1(x - 2.6)} ${f1(y - 1.6)}h5.2M${f1(x - 2.6)} ${f1(y + 1.6)}h5.2"/><circle cx="${f1(x)}" cy="${f1(y)}" r="1.2"/></g>`;
const virion = (x, y, s = 1) => `<path class="pc-vi" d="${poly(Array.from({ length: 6 }, (_, i) => [x + Math.cos(i * Math.PI / 3) * 2.2 * s, y + Math.sin(i * Math.PI / 3) * 2.2 * s]), true)}"/>`;
// tromboxanul A2 (inel oxanic cu punte de oxigen, schematic) și PAF (cap cu colină, o coadă lungă, una scurtă)
const txa2 = (x, y) => `<g class="pc-tx"><path d="${poly([[x - 3, y - 1.5], [x, y - 3.2], [x + 3, y - 1.5], [x + 3, y + 1.5], [x, y + 3.2], [x - 3, y + 1.5]], true)}M${x - 3} ${y - 1.5}L${x + 3} ${y + 1.5}M${x + 3} ${y - 1.5}L${x + 8} ${y - 3}M${x - 3} ${y + 1.5}L${x - 8} ${y + 3}"/><circle cx="${x}" cy="${y}" r="1.1"/></g>`;
const paf = (x, y) => `<g class="pc-paf"><circle cx="${x}" cy="${y}" r="2.2"/><path d="M${x} ${y + 2.2}l-1 8M${x + 1} ${y + 2.2}l3 3"/></g>`;

// acul termostatului (rotit de figură: 37°C → 39°C)
export const needleSvg = (N, deg) => `<g class="py-needle" style="transform-origin:${N.cx}px ${N.cy}px;transform:rotate(${deg}deg)"><path class="dl-needle" d="M${N.cx - 1.4} ${N.cy + 4}L${N.cx} ${(N.cy - N.len).toFixed(1)}L${N.cx + 1.4} ${N.cy + 4}Z"/></g><circle class="hub" cx="${N.cx}" cy="${N.cy}" r="2"/>`;
// grupul panoului B (coborât cu DY), în ordinea de desen
export function panelB(L, extra = "") {
  return `<g transform="translate(0 ${DY})">${L.S1}${L.S2}${L.S3}${L.S4}${L.S5}${L.S6}${L.vessel}<g class="py-fe">${L.fe}</g><g class="py-ckv">${L.ckV}</g><g class="py-c3">${L.cox}${L.pges}${L.camp}</g>${L.dial}<g class="py-c4">${L.mob}${L.ferr}${L.crps}${L.adh}${L.ntOut}${L.il8}${L.plt}${L.bcell}${L.plas}${L.tcell}${L.phago}${L.ifns}${L.isg}</g>${L.vir}${L.barB}${extra}</g>`;
}

export function preview(state = {}) {
  const A = build(), L = A.L, s = (x) => x.replaceAll("__U__", "pv");
  const st = state.st ?? 4;
  return { viewBox: `0 0 ${W} ${H}`, svg: s(`<defs>${A.defs}</defs><g class="pyx" data-st="${st}">${L.frames}${L.panelA}${L.frameLine}${L.B}${needleSvg(A.needle, st >= 3 ? 60 : -60)}</g>`) };
}
