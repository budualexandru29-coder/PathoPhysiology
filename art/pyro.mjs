// Î15: pirogenii exogeni și efectele biologice ale pirogenilor endogeni, ca planșă de manual: etichete scrise lângă structuri,
// o singură idee pe pas (ce nu ține de pasul curent nu se vede), fără aparate desenate.
//  A. membrana unui macrofag la scară moleculară (4 px/nm, bara de 10 nm), pașii 0–2: fragmentul de membrană externă a unei
//     bacterii Gram-negative cu lipopolizaharid (LPS; în chenar, o moleculă mărită de 2,5 ori), LBP care duce LPS la CD14,
//     receptorii TLR4–MD-2 (separați, apoi dimerul cu lipidul A), peretele unei bacterii Gram-pozitive cu acid lipoteicoic pe
//     heterodimerul TLR2:TLR6 (Janeway ed. 10, p. 252, 258–259); sub membrană MyD88, IRAK4, IRAK1, TRAF6, TAK1, IKK, IκB și
//     NF-κB (p. 260–262); citokinele ies pe căile lor: TNF-α ancorat în membrană și tăiat de TACE (p. 319), IL-1β prin porii de
//     gasdermină D (p. 273), IL-6. În colț, macrofagul întreg la 2,4 px/µm (21 µm; Junqueira p. 113), cu un fagozom.
//  B. efectele pirogenilor endogeni, pașii 3–5, câte trei scene; celulele la 2,4 px/µm (bara de 10 µm), din biblioteca comună;
//     moleculele din aceste scene (PGE2, PCR, anticorpi, interferon, IL-8) și virionii sunt simboluri, nu la scară.
//     Pasul 3: OVLT, neuronul preoptic și graficul punctului de reglare (după Guyton ed. 13, fig. 74-11; Febra LP, slide 27);
//     pasul 4: măduva, venula, apărarea; pasul 5: mediatorii lipidici, ficatul, interferonul.
import { smooth, poly, lumpy, rng, sampleSmooth, ribbon } from "./lib/geo.mjs";
import * as C from "./parts/cells.mjs";
import { callout, panelTitle, vis } from "./lib/label.mjs";
import { cytokine, pge2 } from "./fever.mjs";

export const W = 420, H = 448;
export const KN = 4, KC = 2.4, KB = 2.4;                // px/nm (panoul A), px/µm (macrofagul din colț și panoul B)
export const STEPS = 6;
const DA = 14;                                            // panoul A e coborât cu DA, sub titlul lui
const P2 = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
const f1 = (v) => (+v).toFixed(1);
const hex = (x, y, r, cls = "") => `<path class="${cls}" d="${poly(Array.from({ length: 6 }, (_, i) => [x + Math.cos(i * Math.PI / 3 + Math.PI / 6) * r, y + Math.sin(i * Math.PI / 3 + Math.PI / 6) * r]), true)}"/>`;
// contur de celulă alungită (pentru celule care migrează sau se strâng printr-un sinus)
const blob = (cx, cy, rx, ry, ang = 0, seed = 1, amp = 0.06) => lumpy(0, 0, 1, 14, amp, seed).map(([u, v]) => [cx + u * rx * Math.cos(ang) - v * ry * Math.sin(ang), cy + u * rx * Math.sin(ang) + v * ry * Math.cos(ang)]);
const ALL = [0, 1, 2, 3, 4, 5];

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
// doar lipidul A (în buzunarul MD-2)
const lipidA = (x, y, kn, dir = -1) => lps(x, y, kn, { dir, nO: 0 }).replace(/<path class="lp-core"[^>]*\/>/g, "");
// simbolurile din panoul B
const ifn = (x, y) => `<g class="pc-ifn"><path d="M${f1(x - 2.6)} ${f1(y - 1.6)}h5.2M${f1(x - 2.6)} ${f1(y + 1.6)}h5.2"/><circle cx="${f1(x)}" cy="${f1(y)}" r="1.2"/></g>`;
const virion = (x, y, s = 1) => `<path class="pc-vi" d="${poly(Array.from({ length: 6 }, (_, i) => [x + Math.cos(i * Math.PI / 3) * 2.2 * s, y + Math.sin(i * Math.PI / 3) * 2.2 * s]), true)}"/>`;
// formule scheletice simplificate (desenate ca într-o carte de biochimie): tromboxanul A2 (inelul oxanic cu puntea de oxigen și
// cele două lanțuri) și PAF (glicerol: eter C16 în sn-1, acetil în sn-2, fosfocolină în sn-3)
const zig = (x, y, n, dx, dy) => { let s = `M${f1(x)} ${f1(y)}`; for (let i = 1; i <= n; i++) s += `L${f1(x + i * dx)} ${f1(y + (i % 2 ? dy : 0))}`; return s; };
function txa2(x, y, s = 1) {
  const R = [[0, -4], [3.5, -2], [3.5, 2], [0, 4], [-3.5, 2], [-3.5, -2]].map(([u, v]) => [x + u * s, y + v * s]);
  return `<g class="sk"><path d="${poly(R, true)}M${P2(R[0])}L${P2(R[3])}${zig(R[1][0], R[1][1], 6, 3 * s, -1.6 * s)}${zig(R[2][0], R[2][1], 6, 3 * s, 1.6 * s)}"/><circle class="sk-o" cx="${f1(x - 3.5 * s - 0.1)}" cy="${f1(y)}" r="${f1(1.1 * s)}"/><circle class="sk-o" cx="${f1(x)}" cy="${f1(y)}" r="${f1(1 * s)}"/></g>`;
}
function paf(x, y, s = 1) {
  const g = [[x, y], [x, y + 5 * s], [x, y + 10 * s]];
  return `<g class="sk"><path d="M${P2(g[0])}L${P2(g[2])}${zig(g[0][0], g[0][1], 9, 3 * s, -1.6 * s)}M${P2(g[1])}l${f1(4 * s)} 0l${f1(2 * s)} ${f1(-2 * s)}M${P2(g[2])}l${f1(4 * s)} 0"/><circle class="sk-p" cx="${f1(x + 6 * s)}" cy="${f1(y + 10 * s)}" r="${f1(1.5 * s)}"/><path d="M${f1(x + 7.5 * s)} ${f1(y + 10 * s)}l${f1(4 * s)} 0"/><circle class="sk-n" cx="${f1(x + 13 * s)}" cy="${f1(y + 10 * s)}" r="${f1(1.6 * s)}"/></g>`;
}

export function build() {
  const labs = [];                                       // etichetele: { p: piesa, v: pașii, s, box }
  // eticheta din panoul A (coordonatele lui, coborâte cu DA)
  const LA = (p, steps, text, at, to, o = {}) => { const c = callout(text, at && [at[0], at[1] + DA], [to[0], to[1] + DA], { ...o, via: o.via && [o.via[0], o.via[1] + DA] }); labs.push({ p, v: steps, ...c }); };
  const LB = (p, steps, text, at, to, o = {}) => { labs.push({ p, v: steps, ...callout(text, at, to, o) }); };

  /* ======================= A. membrana macrofagului, 4 px/nm ======================= */
  const k = KN, cA = { x: 10, y: 10, w: 400, h: 246 }, MY = 160;          // MY = fața externă a membranei; dublul strat are 4 nm
  const memL = C.bilayer(cA.x, 72, MY, k, { step: 1.2 }) + C.bilayer(104, cA.x + cA.w, MY, k, { step: 1.2 });
  const memPore0 = C.bilayer(72, 104, MY, k, { step: 1.2 });
  // gasdermina D: subunitățile care căptușesc porul, în secțiune (Janeway p. 273)
  const gsd = [74, 102].map((x) => Array.from({ length: 5 }, (_, i) => `<rect class="gsd" x="${f1(x - 2.2)}" y="${f1(MY - 2.5 + i * 4.2)}" width="4.4" height="3.8" rx="1.2"/>`).join("")).join("");
  const memPore = C.bilayer(72, 74, MY, k, { step: 1.2 }) + C.bilayer(102, 104, MY, k, { step: 1.2 }) + gsd;
  // membrana externă a unei bacterii Gram-negative (stânga sus): periplasma, peptidoglicanul subțire, dublul strat cu LPS
  const om = `<rect class="bg-peri" x="${cA.x}" y="${cA.y}" width="150" height="8"/><path class="bg-pgl" d="M${cA.x} 14H160"/>` + C.bilayer(cA.x, 160, 18, k, { step: 1.2, cls: "om" });
  const lpsOM = [20, 36, 52, 68, 84, 100, 116, 132, 148].map((x, i) => lps(x, 34, k, { dir: 1, nO: 2 + (i * 7) % 4, lean: ((i * 5) % 3 - 1) * 0.04 })).join("");
  // chenarul cu o moleculă de LPS mărită (10 px/nm), cu bara ei de 2 nm
  const ins = { x: 184, y: 14, w: 84, h: 94 };
  const lpsBig = `<rect class="pa-ins" x="${ins.x}" y="${ins.y}" width="${ins.w}" height="${ins.h}" rx="4"/>` + lps(244, 32, 10, { dir: 1, nO: 1 }) + C.scaleBar(190, 100, 10, 2, "2 nm", { cls: "dk" });
  const insLab = [["lipid A", 35], ["miez", 56], ["antigen O", 80]].map(([t, y]) => callout(t, null, [232, y + DA], { anchor: "end", fs: 7.6 }).s).join("");
  // LBP (bumerang) care a scos o moleculă de LPS din membrana bacteriei
  const lbpP = [[112, 112], [124, 104], [138, 98], [152, 96], [164, 99], [162, 106], [150, 104], [137, 106], [124, 112], [114, 118]];
  const lbp = `<path class="lbp" d="${smooth(lbpP, true)}"/>` + lps(160, 104, k, { dir: 1, nO: 2 });
  // CD14 (potcoavă ancorată prin GPI), cu LPS predat de la pasul 1
  const cd14 = `<path class="gpi" d="M186 ${MY}V146"/><path class="cd14b" d="${smooth([[176, 146], [173, 134], [180, 124], [192, 124], [199, 134], [196, 146], [190, 140], [186, 132], [182, 140]], true)}"/>`;
  const cd14L = lps(186, 129, k, { dir: -1, nO: 0 });
  // TLR4–MD-2: monomeri separați (pasul 0) sau dimerul cu lipidul A în buzunarele MD-2
  const tlrMono = C.tlr(214, MY, k, { tone: "t4", md2: true }) + C.tlr(318, MY, k, { tone: "t4", flip: true, md2: true });
  const tlrDim = C.tlr(234, MY, k, { tone: "t4", md2: true }) + C.tlr(298, MY, k, { tone: "t4", flip: true, md2: true }) + lipidA(260, 127, k, -1) + lipidA(272, 127, k, -1);
  // peretele Gram-pozitiv (dreapta sus): lanțuri de glican legate prin punți peptidice; acidul lipoteicoic
  let gp = `<rect class="gp-wall" x="300" y="${cA.y}" width="110" height="30"/>`;
  for (let y = 14; y <= 36; y += 7) gp += `<path class="gp-gly iso-line" d="M300 ${y}H410"/>`;
  for (let i = 0; i < 26; i++) { const x = 304 + i * 4.1 + (i % 3), y = 14 + (i % 3) * 7; gp += `<path class="gp-pep iso-line" d="M${f1(x)} ${y}V${y + 7}"/>`; }
  const lta = (x, y0, n) => { let s = `<g class="lta1">`; for (let i = 0; i < n; i++) s += `<circle class="lta-b" cx="${f1(x + (i % 2 ? 0.9 : -0.9))}" cy="${f1(y0 + i * 2.6)}" r="1.15"/>`; return s + "</g>"; };
  gp += lta(318, 34, 7) + lta(334, 36, 6) + lta(398, 34, 7);
  const ltaFree = lta(374, 104, 9) + `<path class="lp-acyl" d="M372.6 127l-.6 5l.6 5M375.4 127l.6 5l-.6 5"/>`;
  const tlr26mono = C.tlr(330, MY, k, { tone: "t2" }) + C.tlr(408, MY, k, { tone: "t6", flip: true });
  const tlr26dim = C.tlr(342, MY, k, { tone: "t2" }) + C.tlr(406, MY, k, { tone: "t6", flip: true }) + ltaFree;
  // sub membrană: un lanț continuu TIR (receptor) → MyD88 (TIR + domeniul morții) → IRAK4 → IRAK1 → TRAF6 → TAK1 → IKK (α, β, NEMO)
  const dm = (x, y, rx, ry, cls) => `<ellipse class="${cls}" cx="${f1(x)}" cy="${f1(y)}" rx="${f1(rx)}" ry="${f1(ry)}"/>`;
  const myd = dm(246, 194, 6, 4.6, "myd") + dm(286, 194, 6, 4.6, "myd") + dm(254, 203, 5.4, 4.4, "myd dd") + dm(278, 203, 5.4, 4.4, "myd dd")
    + dm(260, 212, 6, 4.8, "kin") + dm(272, 212, 6, 4.8, "kin") + dm(266, 222, 6.6, 5, "kin k1") + `<path class="traf" d="${smooth(lumpy(280, 230, 7, 9, 0.12, 4), true)}"/>`
    + `<path class="tak" d="${smooth(lumpy(293, 234, 5.6, 9, 0.12, 6), true)}"/>` + dm(307.6, 238, 6.4, 5.6, "ikk") + dm(320, 238, 6.4, 5.6, "ikk") + dm(314, 247, 6.4, 3.6, "ikk nemo")
    + dm(354, 194, 6, 4.6, "myd") + dm(394, 194, 6, 4.6, "myd");
  const nfkb = (x, y) => `<g class="nfkb">${dm(x - 5.6, y, 6, 4.8, "p50")}${dm(x + 5.6, y, 6, 4.8, "p65")}</g>`;
  const nfRest = nfkb(380, 226) + `<path class="ikb" d="M368 219Q380 211 392 219"/>`;
  const nfFree = [[350, 222], [356, 218], [362, 221]].map(([x, y]) => `<circle class="ikbf" cx="${x}" cy="${y}" r="1.5"/>`).join("") + nfkb(386, 242) + `<path class="pa-arrow" d="M396 248L404 252M404 252l-4.6 .2M404 252l-2 -4"/>`;
  // citokinele, pe căile lor (de la pasul 2): TNF-α ancorat și TACE care îl taie, trimerul solubil; IL-1β prin porul de gasdermină; IL-6
  const tnfM = `<path class="tnf-st" d="M24 ${MY}V150M30 ${MY}V150M36 ${MY}V150"/>` + [[24, 145], [36, 145], [30, 138]].map(([x, y]) => `<circle class="tnf-c" cx="${x}" cy="${y}" r="6"/>`).join("");
  const tace = `<path class="tace" d="${smooth([[44, MY], [42, 150], [46, 140], [52, 136], [58, 142], [56, 152], [54, MY]], true)}"/><path class="tace-cut iso-line" d="M43 150l-5 -1.5M43 150l-4.6 2.6"/>`;
  const trefoil = (x, y) => `<g class="il1b">${[0, 1, 2].map((i) => { const a = -Math.PI / 2 + i * 2.094; return `<circle cx="${f1(x + Math.cos(a) * 3.6)}" cy="${f1(y + Math.sin(a) * 3.6)}" r="3.6"/>`; }).join("")}</g>`;
  const ckOut = `<g class="tnf-sol">${[[58, 112], [70, 112], [64, 104]].map(([x, y]) => `<circle class="tnf-c" cx="${x}" cy="${y}" r="6"/>`).join("")}</g>`
    + trefoil(88, 150) + trefoil(92, 122) + `<g class="il6m">${[0, 1, 2, 3].map((i) => `<rect x="${f1(107 + i * 2.6)}" y="${f1(136 + (i % 2) * 1.2)}" width="2.3" height="9" rx="1.1"/>`).join("")}</g>`;
  // macrofagul întreg (2,4 px/µm), cu fagozomul (bacteria opsonizată), locul mărit al membranei și, de la pasul 2, ARNm în citoplasmă
  const th = { x: 14, y: 182, w: 90, h: 70 };
  const fagS = `<circle class="fagm" cx="54" cy="224" r="5.4"/><rect class="fagb" x="50" y="222.8" width="8" height="2.5" rx="1.25"/>` + [[51, 222.4], [54, 222], [57, 222.6]].map(([x, y]) => `<circle class="c3b" cx="${x}" cy="${y}" r=".65"/>`).join("") + `<circle class="lc-lys" cx="48" cy="231" r="1.3"/>`;
  const macShape = blob(44, 215, 25, 23, 0.3, 21, 0.1);
  const thumb = `<rect class="pa-ins" x="${th.x}" y="${th.y}" width="${th.w}" height="${th.h}" rx="4"/>` + C.macrophage(44, 215, KC, { shape: macShape, seed: 21, eat: fagS, rot: 0 })
    + [[80, 194, 0.4], [92, 206, -0.3]].map(([x, y, a]) => `<rect class="fagb" x="${x - 2.6}" y="${y - 1}" width="5.2" height="2" rx="1" transform="rotate(${a * 57.3} ${x} ${y})"/>`).join("")
    + `<circle class="pa-zoom" cx="67" cy="206" r="2.6"/>` + C.scaleBar(100, 247, KC, 10, "10 µm", { cls: "dk", anchor: "end" });
  const thMrna = [[34, 210], [40, 206], [30, 220]].map(([x, y]) => `<path class="mrna" d="M${x} ${y}q2 -2 0 -4"/>`).join("");

  const panelA = `<g class="pA" transform="translate(0 ${DA})"><g clip-path="url(#__U__-cA)"><rect class="pa-ex" x="${cA.x}" y="${cA.y}" width="${cA.w}" height="${MY - cA.y}"/><rect class="pa-cy" x="${cA.x}" y="${MY}" width="${cA.w}" height="${cA.y + cA.h - MY}"/>`
    + `${om}${lpsOM}${gp}${memL}${cd14}<g class="${vis([0])}">${memPore0}${tlrMono}${tlr26mono}</g><g class="${vis([0, 1])}">${nfRest}</g><g class="${vis([1])}">${memPore0}</g>`
    + `<g class="${vis([1])}">${lbp}${lpsBig}</g><g class="${vis([1, 2, 3, 4, 5])}">${cd14L}${tlrDim}${tlr26dim}${myd}</g>`
    + `<g class="${vis([2, 3, 4, 5])}">${memPore}${tnfM}${tace}${nfFree}${ckOut}</g>${thumb}<g class="${vis([2, 3, 4, 5])}">${thMrna}</g>`
    + `${C.scaleBar(112, 252, k, 10, "10 nm", { cls: "dk" })}</g><rect class="pa-frame" x="${cA.x}" y="${cA.y}" width="${cA.w}" height="${cA.h}" rx="4"/></g>`;
  const insLabels = `<g class="${vis([1])}">${insLab}</g>`;

  // etichetele panoului A, pe pași
  LA("exo", [0], "bacterie\nGram-negativă", [60, 26], [14, 104]);
  LA("gp", [0], "bacterie Gram-pozitivă", null, [404, 62], { anchor: "end" });
  LA("rec", [0], "TLR4 și MD-2", null, [266, 114], { anchor: "middle" });
  LA("rec", [0], "TLR2, TLR6", null, [369, 114], { anchor: "middle" });
  LA("x2", [0, 1], "IκB ține NF-κB", [380, 232], [376, 250], { anchor: "middle" });
  LA("exo", [1], "LPS (endotoxina)", [52, 70], [14, 104]);
  LA("x2", [1], "LBP", null, [118, 132]);
  LA("x2", [1, 2], "CD14", null, [203, 142]);
  LA("rec", [1, 2], "dimer TLR4–MD-2\ncu lipidul A", [266, 122], [276, 72]);
  LA("gp", [1, 2], "acid lipoteicoic\npe TLR2:TLR6", [373, 112], [366, 94], { anchor: "end" });
  LA("x2", [1, 2], "MyD88, IRAK4, IRAK1", [241, 199], [237, 206], { anchor: "end" });
  LA("x2", [1, 2], "TRAF6, TAK1, IKK", [302, 241], [262, 248], { anchor: "end" });
  LA("fag", [1], "fagozom:\nbacterie + C3b", [58, 224], [108, 222]);
  labs.push({ p: "x1", v: [1], s: "", box: [ins.x, ins.y + DA, ins.w, ins.h] });   // chenarul cu structura LPS
  LA("endo", [2], "TNF-α", [30, 133], [14, 104]);
  LA("x5", [2], "TACE", null, [44, 131]);
  LA("x5", [2], "IL-1β, prin porul\nde gasdermină D", [93, 115], [100, 104]);
  LA("endo", [2], "IL-6", null, [121, 145]);
  LA("x2", [2], "NF-κB → nucleu", [384, 237], [404, 214], { anchor: "end" });
  LA("endo", [2], "ARNm pentru\ncitokine", [34, 210], [108, 230]);

  /* ======================= B. efectele, pașii 3–5: trei scene; celulele la 2,4 px/µm ======================= */
  const q = KB, BY = 294, SW = 124, SH = 116, SX = [14, 148, 282];
  const slot = (i) => ({ x: SX[i], y: BY, w: SW, h: SH });
  const frame = (i, cls) => `<rect class="pb-slot ${cls}" x="${SX[i]}" y="${BY}" width="${SW}" height="${SH}" rx="3"/>`;
  const clip = (i, inner) => `<g clip-path="url(#__U__-s${i})">${inner}</g>`;
  const cap = (i, t) => callout(t, null, [SX[i] + 5, BY + SH - 5], { fs: 7.6, cls: "cap" }).s;
  const B = {};
  // ---- pasul 3: efectele centrale ----
  {
    const o = slot(0), cx = o.x + 34;                    // capilarul fenestrat al OVLT (lumen 7,5 µm)
    let s = frame(0, "neuro") + `<rect class="pv-l" x="${cx}" y="${o.y}" width="18" height="${SH}"/><path class="pv-w" d="M${cx - 0.6} ${o.y}V${o.y + SH}M${cx + 18.6} ${o.y}V${o.y + SH}"/>`;
    s += [18, 42, 66, 90].map((dy) => `<path class="pv-fen" d="M${cx + 18.6} ${o.y + dy}v3"/>`).join("") + C.rbc(cx + 9, o.y + 30, q, { edge: true, angle: Math.PI / 2 }) + C.rbc(cx + 9, o.y + 84, q, { edge: true, angle: Math.PI / 2 + 0.2 });
    s += `<ellipse class="endo-n" cx="${cx + 20.5}" cy="${o.y + 56}" rx="2.4" ry="7"/><path class="cox2 on" d="${smooth(lumpy(cx + 27, o.y + 58, 4.2, 9, 0.16, 7), true)}"/>`;
    s += [[cx + 38, o.y + 62], [cx + 50, o.y + 54], [cx + 60, o.y + 68], [cx + 74, o.y + 58]].map(([x, y]) => pge2(x, y, 0.55, "")).join("");
    B.s3a = clip(0, s) + cap(0, "OVLT");
    LB("ovlt", [3], "capilar fenestrat", [cx + 19, o.y + 20], [cx + 26, o.y + 14]);
    LB("ovlt", [3], "COX-2", [cx + 29, o.y + 62], [cx + 32, o.y + 82]);
    LB("ovlt", [3], "PGE₂", [cx + 62, o.y + 66], [cx + 58, o.y + 92]);
  }
  {
    const o = slot(1), nc = [o.x + 72, o.y + 54], r = 13;  // neuronul din aria preoptică
    const dend = [[0.9, -0.6, 18], [1, 0.3, 16], [-0.2, -1, 16], [0.3, 1, 14], [0.6, 0.9, 10]].map(([dx, dy, l]) => `<path class="pn-d" d="${poly(ribbon(sampleSmooth([[nc[0] + dx * r, nc[1] + dy * r], [nc[0] + dx * (r + l * 0.5) + 3, nc[1] + dy * (r + l * 0.5)], [nc[0] + dx * (r + l), nc[1] + dy * (r + l)]], false, 4), (t) => 2.6 * (1 - t) + 0.4), true)}"/>`).join("");
    let s = frame(1, "neuro") + `<g class="pn-n">${dend}<path class="pn-s" d="${smooth(lumpy(nc[0], nc[1], r, 10, 0.1, 4), true)}"/><circle class="pn-nu" cx="${nc[0] + 3}" cy="${nc[1]}" r="5"/><circle class="pn-nl" cx="${nc[0] + 4}" cy="${nc[1] - 1}" r="1.3"/></g>`;
    s += [[-0.95, 0.3], [-0.8, 0.6], [-0.95, -0.1]].map(([dx, dy]) => `<path class="ep3" d="M${f1(nc[0] + dx * (r + 0.5))} ${f1(nc[1] + dy * (r + 0.5))}l-3 0m0 -2l0 4"/>`).join("");
    s += [[o.x + 22, o.y + 58], [o.x + 36, o.y + 66], [o.x + 30, o.y + 44]].map(([x, y]) => pge2(x, y, 0.55, "")).join("");
    s += `<g class="camp"><path d="${poly(Array.from({ length: 5 }, (_, i) => [nc[0] - 5 + Math.cos(i * 1.2566 - 1.57) * 2.6, nc[1] + 4 + Math.sin(i * 1.2566 - 1.57) * 2.6]), true)}"/><circle cx="${nc[0] - 1.4}" cy="${nc[1] + 6.6}" r="1.1"/></g>`;
    B.s3b = clip(1, s) + cap(1, "aria preoptică");
    LB("poa", [3], "receptor EP3", [nc[0] - r - 2, nc[1] + 3], [o.x + 6, o.y + 22]);
    LB("poa", [3], "AMPc", [nc[0] - 5, nc[1] + 5], [o.x + 46, o.y + 96], { anchor: "end" });
    LB("poa", [3], "neuron", null, [nc[0] + 6, o.y + 100]);
  }
  {
    const o = slot(2), gx0 = o.x + 24, gx1 = o.x + SW - 8, gy0 = o.y + 14, gy1 = o.y + 88;   // graficul: 36–40 °C în timp
    const Y = (T) => gy1 - (T - 36) / 4 * (gy1 - gy0), X = (t) => gx0 + t * (gx1 - gx0);
    let s = frame(2, "plot") + `<path class="gx" d="M${gx0} ${gy0 - 4}V${gy1}H${gx1 + 3}"/>`;
    [37, 38, 39, 40].forEach((T) => { s += `<path class="gt" d="M${gx0 - 2.5} ${f1(Y(T))}H${gx0}"/><text class="gl" x="${gx0 - 4}" y="${f1(Y(T) + 2.6)}" text-anchor="end">${T}</text>`; });
    s += `<text class="gl" x="${gx0 - 4}" y="${gy0 - 6}" text-anchor="end">°C</text><text class="gl" x="${gx1}" y="${gy1 + 10}" text-anchor="end">timp</text>`;
    const tS = 0.22, sp = `M${X(0)} ${Y(37)}H${f1(X(tS))}V${f1(Y(39))}H${X(1)}`;
    let core = `M${X(0)} ${f1(Y(37))}H${f1(X(tS))}`; for (let i = 1; i <= 30; i++) { const t = tS + i / 30 * (1 - tS); core += `L${f1(X(t))} ${f1(Y(37 + 2 * (1 - Math.exp(-(t - tS) / 0.16))))}`; }
    s += `<path class="g-sp" d="${sp}"/><path class="g-core" d="${core}"/>`;
    B.s3c = s + cap(2, "după Guyton, fig. 74-11");
    LB("set", [3], "punct de reglare", null, [X(0.3), Y(39) - 6]);
    LB("set", [3], "temperatura\ncentrală", [X(0.36), Y(37 + 2 * (1 - Math.exp(-0.14 / 0.16)))], [X(0.5), Y(37.4)]);
  }
  // ---- pasul 4: leucocitele ----
  {
    const o = slot(0), sx = o.x + 50;                    // sinusul medular (lumen ~11 µm) și celulele hematopoietice din jur
    let s = frame(0, "marrow") + `<circle class="pm-f" cx="${o.x + 4}" cy="${o.y + 6}" r="22"/><circle class="pm-f" cx="${o.x + SW}" cy="${o.y + SH - 4}" r="20"/>`;
    const RM = rng(9), placed = [];
    for (let t = 0; t < 1200 && placed.length < 9; t++) {
      const x = o.x + 4 + RM() * (SW - 8), y = o.y + 6 + RM() * (SH - 34), r = 12 + RM() * 3;
      if (x > sx - r - 1 && x < sx + 28 + r + 1) continue;
      if (Math.hypot(x - o.x - 4, y - o.y - 6) < 22 + r - 4 || Math.hypot(x - o.x - SW, y - o.y - SH + 4) < 20 + r - 4) continue;
      if (placed.some(([a, b, c]) => Math.hypot(a - x, b - y) < c + r - 2)) continue;
      placed.push([x, y, r]);
    }
    placed.forEach(([x, y, r], i) => { s += i % 3 === 0 ? C.neutrophil(x, y, q, { d: r * 2 / q, lobes: 3, seed: 30 + i }) : i % 3 === 1 ? C.lymphocyte(x, y, q, { d: r * 2 / q, seed: 30 + i }) : C.eosinophil(x, y, q, { d: r * 2 / q, seed: 30 + i }); });
    s += `<rect class="pv-l s" x="${sx}" y="${o.y}" width="28" height="${SH}"/><path class="pv-w" d="M${sx - 0.5} ${o.y}V${o.y + SH}M${sx + 28.5} ${o.y}V${o.y + SH}"/>`;
    s += C.neutrophil(sx + 14, o.y + 34, q, { shape: blob(sx + 14, o.y + 34, 11, 14, 0, 40, 0.07), seed: 40 }) + C.neutrophil(sx + 14, o.y + 78, q, { shape: blob(sx + 14, o.y + 78, 11, 14, 0, 41, 0.07), seed: 41, lobes: 3 });
    B.s4a = clip(0, s) + cap(0, "măduvă");
    LB("mob", [4], "neutrofile mobilizate", [sx + 16, o.y + 88], [o.x + SW - 4, o.y + SH - 5], { anchor: "end" });
  }
  {
    const o = slot(1), v0 = o.y + 6, v1 = o.y + 34;      // venula: lumenul sus, endoteliul cu selectine și ICAM-1
    let s = frame(1, "tissue") + `<rect class="pv-l" x="${o.x}" y="${v0}" width="${SW}" height="${v1 - v0}"/><path class="pv-w" d="M${o.x} ${v0 - 1.2}H${o.x + SW}M${o.x} ${v1 + 1.2}H${o.x + SW}"/>`;
    s += Array.from({ length: 14 }, (_, i) => { const x = o.x + 6 + i * 8.6; return i % 2 ? `<path class="sel" d="M${f1(x)} ${v1}V${v1 - 3.4}"/><circle class="sel-h" cx="${f1(x)}" cy="${v1 - 4.4}" r="1.1"/>` : `<path class="icam" d="M${f1(x)} ${v1}V${v1 - 2.6}"/>`; }).join("");
    s += C.rbc(o.x + 104, v0 + 14, q, { edge: true, angle: 0.2 });
    s += C.neutrophil(o.x + 24, v1 - 8, q, { shape: blob(o.x + 24, v1 - 8, 16, 8, 0, 51, 0.05), seed: 51, lobes: 4 }) + C.neutrophil(o.x + 54, v1 + 2, q, { shape: blob(o.x + 54, v1 + 2, 8, 16, 0.1, 52, 0.07), seed: 52, lobes: 3 }) + C.neutrophil(o.x + 66, o.y + 70, q, { shape: blob(o.x + 66, o.y + 70, 14, 10, 0.7, 53, 0.1), seed: 53, rot: 0.8 });
    s += [[84, 82], [90, 90], [82, 96], [96, 98], [90, 104], [102, 92]].map(([x, y]) => `<circle class="chk" cx="${o.x + x}" cy="${o.y + y}" r="1.3"/>`).join("") + C.macrophage(o.x + 108, o.y + 106, q, { shape: blob(o.x + 108, o.y + 106, 20, 13, 0.15, 54, 0.12), seed: 54 });
    B.s4b = clip(1, s) + cap(1, "venulă");
    LB("adh", [4], "selectine,\nICAM-1", [o.x + 100, v1 - 2], [o.x + SW - 4, o.y + 48], { anchor: "end" });
    LB("adh", [4], "diapedeză", [o.x + 50, v1 + 8], [o.x + 6, o.y + 58]);
    LB("adh", [4], "IL-8", [o.x + 92, o.y + 86], [o.x + 102, o.y + 78]);
  }
  {
    const o = slot(2);                                   // apărarea: limfocit B, plasmocit cu anticorpi, limfocite T, fagocitoza
    let s = frame(2, "tissue") + C.lymphocyte(o.x + 18, o.y + 22, q, { kind: "B", seed: 61 }) + C.plasmaCell(o.x + 58, o.y + 26, q, { seed: 62, rot: 0.1 });
    s += [[88, 14, 0.4], [96, 28, 0], [86, 40, -0.5], [104, 16, 0.2], [108, 36, -0.2]].map(([x, y, a]) => C.antibody(o.x + x, o.y + y, 0.75, { a: a + Math.PI / 2 })).join("");
    s += C.lymphocyte(o.x + 18, o.y + 68, q, { kind: "T", seed: 63 }) + C.lymphocyte(o.x + 36, o.y + 80, q, { kind: "T", seed: 64 });
    const ph = [[0, 6], [8, -4], [20, -8], [30, -2], [38, -4], [44, 4], [38, 10], [32, 8], [36, 18], [26, 28], [12, 28], [2, 20]].map(([x, y]) => [o.x + 66 + x * 0.8, o.y + 70 + y * 0.8]);
    s += C.neutrophil(o.x + 82, o.y + 78, q, { shape: ph, seed: 65 }) + `<rect class="pc-bac" x="${o.x + 92}" y="${o.y + 70.6}" width="5" height="2" rx="1"/><circle class="c3b" cx="${o.x + 93}" cy="${o.y + 70.2}" r=".6"/><circle class="c3b" cx="${o.x + 96.4}" cy="${o.y + 72.8}" r=".6"/>`;
    B.s4c = clip(2, s) + cap(2, "apărarea specifică și nespecifică");
    LB("per", [4], "limfocit B", null, [o.x + 6, o.y + 44]);
    LB("per", [4], "plasmocit", [o.x + 66, o.y + 30], [o.x + 70, o.y + 52]);
    LB("per", [4], "limfocite T", null, [o.x + 8, o.y + 98]);
    LB("fgc", [4], "fagocitoză", [o.x + 94, o.y + 72], [o.x + SW - 4, o.y + 98], { anchor: "end" });
  }
  // ---- pasul 5: mediatorii, ficatul, interferonul ----
  {
    const o = slot(0);                                   // mediatorii lipidici, ca formule (simboluri, nu la scară)
    let s = frame(0, "plain") + pge2(o.x + 20, o.y + 24, 0.95, "") + txa2(o.x + 24, o.y + 58, 1.15) + paf(o.x + 20, o.y + 82, 1.1);
    B.s5a = s + cap(0, "mediatori lipidici");
    LB("lip", [5], "PGE₂", null, [o.x + 70, o.y + 26]);
    LB("lip", [5], "tromboxan A₂", null, [o.x + 70, o.y + 60]);
    LB("lip", [5], "PAF", null, [o.x + 70, o.y + 90]);
  }
  {
    const o = slot(1), sx = o.x + 52;                    // ficatul: hepatocite (20–30 µm; Ross p. 653), sinusoidul, celula Kupffer
    let s = frame(1, "liver") + `<rect class="pv-l s" x="${sx}" y="${o.y}" width="22" height="${SH}"/>`;
    const RH = rng(13);
    for (let row = 0; row < 3; row++) [[o.x - 4, sx - 1], [sx + 23, o.x + SW + 4]].forEach(([x0, x1], side) => {
      const y0 = o.y - 18 + row * 52, j = () => (RH() - 0.5) * 3;
      s += `<path class="ph" d="${poly([[x0, y0 + j()], [x1, y0 + 1 + j()], [x1, y0 + 51], [x0, y0 + 50]], true)}"/>`;
      s += `<circle class="phn" cx="${(x0 + x1) / 2 + (side ? -3 : 3)}" cy="${y0 + 25}" r="6.5"/>`;
    });
    s += `<path class="pv-w" d="M${sx - 0.5} ${o.y}V${o.y + SH}M${sx + 22.5} ${o.y}V${o.y + SH}"/>` + C.macrophage(sx + 11, o.y + 60, q, { shape: blob(sx + 11, o.y + 60, 8, 20, 0, 5, 0.1), seed: 5 });
    s += [[16, 14], [30, 28], [24, 74], [86, 12], [104, 30], [96, 80], [62, 56], [64, 66]].map(([x, y]) => `<circle class="ferr" cx="${o.x + x}" cy="${o.y + y}" r="1.6"/>`).join("");
    s += [[63, 16], [62, 34], [64, 96], [63, 108]].map(([x, y]) => C.crp(o.x + x, o.y + y, 0.6)).join("");
    B.s5b = clip(1, s) + cap(1, "ficat");
    LB("apr", [5], "PCR", [o.x + 65, o.y + 34], [o.x + 80, o.y + 40]);
    LB("apr", [5], "Fe în feritină", [o.x + 30, o.y + 28], [o.x + 6, o.y + 46]);
    LB("apr", [5], "hepatocit", null, [o.x + 80, o.y + 98]);
  }
  {
    const o = slot(2);                                   // interferonul: celula infectată și celulele vecine în starea antivirală
    let s = frame(2, "tissue");
    [[2, 40], [42, 80], [82, 122]].forEach(([a, b], i) => { s += `<path class="ep-c" d="${poly([[o.x + a, o.y + 30], [o.x + b, o.y + 29], [o.x + b + 1, o.y + 100], [o.x + a + 1, o.y + 101]], true)}"/><circle class="ep-n" cx="${o.x + (a + b) / 2}" cy="${o.y + 76}" r="7"/>`; });
    s += [[12, 42], [26, 48], [10, 58], [28, 88], [14, 92]].map(([x, y]) => virion(o.x + x, o.y + y)).join("");
    s += [[42, 46], [52, 40], [60, 54], [70, 46], [80, 58]].map(([x, y]) => ifn(o.x + x, o.y + y)).join("");
    s += [[56, 66], [70, 92], [92, 44], [108, 50], [96, 92], [110, 88]].map(([x, y]) => `<circle class="isg" cx="${o.x + x}" cy="${o.y + y}" r="1.6"/>`).join("") + `<circle class="isgh" cx="${o.x + 61}" cy="${o.y + 76}" r="11"/><circle class="isgh" cx="${o.x + 102}" cy="${o.y + 76}" r="11"/>`;
    B.s5c = clip(2, s) + cap(2, "epiteliu");
    LB("ifn", [5], "celulă infectată", [o.x + 16, o.y + 50], [o.x + 4, o.y + 14]);
    LB("ifn", [5], "IFN", [o.x + 60, o.y + 50], [o.x + 74, o.y + 24]);
    LB("ifn", [5], "stare antivirală", [o.x + 104, o.y + 88], [o.x + SW - 4, o.y + 111], { anchor: "end" });
  }
  // vasul (sângele) sub scene: citokinele intră în sânge de la pasul 2
  const VY0 = 418, VY1 = 436;
  let vessel = `<rect class="pv-l" x="10" y="${VY0}" width="400" height="${VY1 - VY0}"/><path class="pv-w thin" d="M10 ${VY0 - 0.8}H410M10 ${VY1 + 0.8}H410"/>`;
  for (let i = 0; i < 8; i++) { const x = 70 + i * 46; vessel += i % 3 === 1 ? C.rbc(x, 427, q * 0.8) : C.rbc(x, 427 + (i % 2 ? 2 : -2), q * 0.8, { edge: true, angle: (i % 2 ? 0.3 : -0.25) }); }
  const ckV = ["il1", "tnf", "il6", "il1", "tnf", "il6", "il1"].map((kk, i) => cytokine(kk, 92 + i * 46, 427 + (i % 2 ? -4 : 4), 0.7, `v${i}`)).join("");
  const blood = callout("sânge", null, [16, 430], { fs: 7.6, cls: "cap" }).s;

  const plate = `<rect class="plate" x="0" y="0" width="${W}" height="${H}" rx="6"/>`;
  const titles = plate + panelTitle(12, 15, "A", "Recunoașterea pirogenului exogen", "membrana macrofagului, 4 px/nm") + panelTitle(12, 288, "B", "Efectele pirogenilor endogeni", "celule la 2,4 px/µm");
  // pașii 0–2: schema efectelor sistemice ale pirogenilor endogeni (după Janeway ed. 10, p. 321–322, fig. 3.32), ca hartă a pașilor 3–5
  const box = (x, y, w, h, cls = "") => `<rect class="sum-b ${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>`;
  const arr = (y) => `<path class="sum-a" d="M120 352C142 352 146 ${y} 166 ${y}"/><path class="sum-ah" d="M166 ${y}l-5 -2.6v5.2z"/>`;
  let sum = box(16, 318, 104, 68, "src") + [[42, 372], [60, 372], [78, 372], [96, 372]].map(([x, y], i) => cytokine(["il1", "tnf", "il6", "il1"][i], x, y, 0.95, "")).join("");
  sum += callout("pirogeni endogeni", null, [68, 336], { anchor: "middle", fs: 8.4, cls: "b" }).s + callout("IL-1β, TNF-α, IL-6", null, [68, 350], { anchor: "middle", fs: 8 }).s;
  [[300, "hipotalamus (OVLT): PGE₂ → febra", "efecte centrale · pasul 3"], [340, "măduvă, endoteliu, limfocite: neutrofile,", "adeziune, apărare · pasul 4"], [380, "ficat, trombocite, epitelii: proteine de fază", "acută, Fe și Zn ↓, mediatori, IFN · pasul 5"]].forEach(([y, a, b]) => {
    sum += box(168, y, 236, 34) + arr(y + 17) + callout(a, null, [176, y + 14], { fs: 8.2 }).s + callout(b, null, [176, y + 26], { fs: 7.6, cls: "cap" }).s;
  });
  sum += callout("după Janeway, fig. 3.32", null, [16, 404], { fs: 7.4, cls: "cap" }).s;
  const B0 = `<g class="${vis([0, 1, 2])}"><g class="sum">${sum}</g></g>`;
  const panelB = `${B0}<g class="${vis([3])}">${B.s3a}${B.s3b}${B.s3c}</g><g class="${vis([4])}">${B.s4a}${B.s4b}${B.s4c}</g><g class="${vis([5])}">${B.s5a}${B.s5b}${B.s5c}</g>`
    + `${vessel}<g class="${vis([2, 3, 4, 5])}">${ckV}</g>${blood}${C.scaleBar(404, 443, q, 10, "10 µm", { cls: "dk", anchor: "end" })}`;

  const clips = `<clipPath id="__U__-cA"><rect x="${cA.x}" y="${cA.y}" width="${cA.w}" height="${cA.h}" rx="4"/></clipPath>` + SX.map((x, i) => `<clipPath id="__U__-s${i}"><rect x="${x}" y="${BY}" width="${SW}" height="${SH}" rx="3"/></clipPath>`).join("");
  return {
    W, H, STEPS, defs: clips,
    L: { titles, panelA, insLabels, panelB },
    labs: labs.map((l) => ({ p: l.p, v: l.v, s: l.s, box: l.box.map((n) => +n.toFixed(1)) })),
  };
}

export function preview(state = {}) {
  const A = build(), L = A.L, s = (x) => x.replaceAll("__U__", "pv");
  const st = state.st ?? 1;
  const labs = A.labs.map((l) => `<g class="${vis(l.v)}">${l.s}</g>`).join("");
  return { viewBox: `0 0 ${W} ${H}`, svg: s(`<defs>${A.defs}</defs><g class="pyx pro" data-st="${st}">${L.titles}${L.panelA}${L.insLabels}${L.panelB}${labs}</g>`) };
}
