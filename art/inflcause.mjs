// Î21: cauzele inflamației. Sus, un singur țesut: suprafața, epiteliul pavimentos stratificat, membrana bazală, țesutul
// conjunctiv cu fibre de colagen și fibroblaste, un macrofag rezident, un mastocit și o venulă. Cursorul schimbă cauza:
//  1. microorganisme (bacterii, coci în lanț, hife cu levuri, un keratinocit infectat viral, o larvă de nematod),
//     plus bacteriile care intră în venulă (reacția devine sistemică);
//  2. corpi străini (granule de polen pe suprafață, fibre de azbest și un corp azbestozic, particule de siliciu, pulberi
//     în macrofag, iritanți inhalatori);
//  3. distrucție tisulară (o plagă, o arsură chimică, radiații UV și X, căldură; celule necrotice care eliberează DAMP);
//  4. celule tumorale care rup membrana bazală;
//  5. cristale (un tofus cu ace de urat și o celulă gigantă, plăci de colesterol, oxalat de calciu, fosfat de calciu).
// Reacția e aceeași pentru orice cauză: venula se dilată, apare edemul, neutrofilele ies spre cauză, mastocitul se
// degranulează, macrofagul fagocitează. Jos: clasificarea cauzelor (exogene, endogene) și scopul inflamației.
import { smooth, poly, lumpy, rng } from "./lib/geo.mjs";
import { organ } from "./lib/an.mjs";

export const W = 420, H = 476;
const f1 = (v) => (+v).toFixed(1);
const P2 = (p) => `${f1(p[0])} ${f1(p[1])}`;
const lb = (x, y, t, a = "start", cls = "") => `<text class="ic-lb ${cls}" x="${f1(x)}" y="${f1(y)}" text-anchor="${a}" data-ui>${t}</text>`;
const ring = (x, y, n, r, a0 = 0) => Array.from({ length: n }, (_, i) => [x + Math.cos(a0 + i * 2 * Math.PI / n) * r, y + Math.sin(a0 + i * 2 * Math.PI / n) * r]);

/* ---------- celulele ---------- */
const neut = (x, y, r, cls = "", sh = null) => `<g class="ic-ne ${cls}"><path class="c" d="${smooth(sh || lumpy(x, y, r, 12, 0.08, Math.round(x + y)), true)}"/><path class="nb" d="M${f1(x - 0.38 * r)} ${f1(y - 0.12 * r)}L${f1(x - 0.05 * r)} ${f1(y + 0.22 * r)}L${f1(x + 0.3 * r)} ${f1(y - 0.18 * r)}L${f1(x + 0.42 * r)} ${f1(y + 0.24 * r)}"/>${[[-0.38, -0.12], [-0.05, 0.22], [0.3, -0.18], [0.42, 0.24]].map(([u, v]) => `<circle class="n" cx="${f1(x + u * r)}" cy="${f1(y + v * r)}" r="${f1(r * 0.24)}"/>`).join("")}</g>`;
const rod = (x, y, a, l = 7, cls = "ic-bac") => { const c = Math.cos(a), s = Math.sin(a); return `<path class="${cls}" d="M${f1(x - c * l / 2)} ${f1(y - s * l / 2)}L${f1(x + c * l / 2)} ${f1(y + s * l / 2)}"/>`; };
const cocciChain = (pts) => pts.map(([x, y]) => `<circle class="ic-coc" cx="${f1(x)}" cy="${f1(y)}" r="1.9"/>`).join("");
const lymph = (x, y) => `<g class="ic-ly"><circle class="c" cx="${x}" cy="${y}" r="4.6"/><circle class="n" cx="${f1(x + 0.3)}" cy="${y}" r="3.7"/></g>`;
// polen ehinat (tip Ambrosia, schematic): exina cu spini, trei pori
const pollen = (x, y, r) => `<g class="ic-pol">${ring(x, y, 18, r + 2.2, 0.1).map(([a, b], i) => { const [c, d] = ring(x, y, 18, r, 0.1)[i]; return `<path class="sp" d="M${f1(c)} ${f1(d)}L${f1(a)} ${f1(b)}"/>`; }).join("")}<circle class="ex" cx="${x}" cy="${y}" r="${r}"/><circle class="in" cx="${x}" cy="${y}" r="${f1(r * 0.62)}"/>${ring(x, y, 3, r * 0.78, -Math.PI / 2).map(([a, b]) => `<circle class="po" cx="${f1(a)}" cy="${f1(b)}" r="${f1(r * 0.17)}"/>`).join("")}</g>`;
// placă de colesterol: romboidă, cu un colț crestat
const chol = (x, y, w, h, a) => { const c = Math.cos(a), s = Math.sin(a), p = (u, v) => [x + u * c - v * s, y + u * s + v * c]; return `<path class="ic-chol" d="${poly([p(-w / 2, -h / 2), p(w / 2 - 3, -h / 2), p(w / 2 - 3, -h / 2 + 3), p(w / 2, -h / 2 + 3), p(w / 2 - 2, h / 2), p(-w / 2 - 2, h / 2)], true)}"/>`; };
// oxalat de calciu dihidrat: bipiramidal, „plic”
const oxal = (x, y, r) => `<g class="ic-ox"><path d="${poly([[x, y - r], [x + r, y], [x, y + r], [x - r, y]], true)}"/><path class="x" d="M${x} ${y - r}L${x} ${y + r}M${x - r} ${y}L${x + r} ${y}"/></g>`;

export function build() {
  const R = rng(17);
  /* ======================= A. țesutul ======================= */
  const cA = { x: 10, y: 10, w: 400, h: 258 };
  const yS = 34, yBM = 76;                       // suprafața epiteliului; membrana bazală
  // epiteliul pavimentos stratificat: stratul cornos (lamele), granulos, spinos (două rânduri), bazal (cilindric)
  let epi = `<rect class="ic-epib" x="0" y="${yS}" width="${W}" height="${yBM - yS}"/>`;
  for (let i = 0; i < 3; i++) { const y = yS + 1.4 + i * 1.8; const pts = []; for (let x = 0; x <= W; x += 20) pts.push([x, y + Math.sin(x / 31 + i) * 0.6]); epi += `<path class="ic-corn" d="${smooth(pts)}"/>`; }
  // keratinocitele: câte un simbol pe strat (celula și nucleul), refolosit de-a lungul rândului
  // (culorile stau pe elemente: stilurile paginii nu ajung în copiile din <use>)
  const kSym = (id, h, w, [fill, stroke], nuc) => `<symbol id="__U__-${id}" overflow="visible"><ellipse rx="${f1(w * 0.5)}" ry="${f1(h * 0.5)}" fill="${fill}" stroke="${stroke}" stroke-width=".45"/><ellipse rx="${nuc[0]}" ry="${nuc[1]}" fill="#8d6aa8" stroke="#5b3f7d" stroke-width=".3"/></symbol>`;
  const kDefs = kSym("kg", 4.6, 15, ["#ecc9bb", "#c99a88"], [3, 1]) + kSym("ks", 8, 13, ["#f3d9cf", "#c99a88"], [2.4, 2]) + kSym("kb", 10, 8, ["#ecc2b6", "#c08b78"], [2, 3.2]);
  const rowCells = (y, w, id, off = 0) => { let s = ""; for (let x = 6 + off; x < W + w; x += w) s += `<use href="#__U__-${id}" x="${f1(x + (R() - 0.5) * 1.6)}" y="${y}"/>`; return s; };
  epi += rowCells(yS + 9, 15, "kg", 4) + [...Array(26)].map(() => `<circle class="ic-kgg" cx="${f1(R() * W)}" cy="${f1(yS + 7.6 + R() * 3)}" r=".6"/>`).join("");
  epi += rowCells(yS + 17, 13, "ks") + rowCells(yS + 26, 13, "ks", 6.5) + rowCells(yS + 36, 8, "kb", 2);
  const bm = `<path class="ic-bm" d="M0 ${yBM}H${W}"/>`;
  // țesutul conjunctiv: fibre de colagen, fibroblaste
  let ct = `<rect class="ic-ct" x="0" y="${yBM + 1}" width="${W}" height="${H}"/>`;
  for (let i = 0; i < 9; i++) { const y0 = yBM + 12 + i * 15; const pts = []; for (let x = -6; x <= W + 6; x += 16) pts.push([x, y0 + Math.sin(x / 27 + i * 1.7) * 4]); ct += `<path class="ic-coll" d="${smooth(pts)}"/>`; }
  ct += [[250, 94, 0.2], [380, 150, -0.3], [40, 196, 0.15], [362, 120, 0.4]].map(([x, y, a]) => { const c = Math.cos(a), s = Math.sin(a); return `<path class="in-fib" d="${smooth([[x - 18 * c, y - 18 * s], [x - 4 * c + 2.4 * s, y - 4 * s - 2.4 * c], [x + 4 * c + 2.4 * s, y + 4 * s - 2.4 * c], [x + 18 * c, y + 18 * s], [x + 4 * c - 2.4 * s, y + 4 * s + 2.4 * c], [x - 4 * c - 2.4 * s, y - 4 * s + 2.4 * c]], true)}"/><ellipse class="in-fibn" cx="${x}" cy="${y}" rx="5" ry="1.5" transform="rotate(${f1(a * 57.3)} ${x} ${y})"/>`; }).join("");
  // edemul (apare în reacție): puncte de lichid în interstițiu
  const edema = `<g class="ic-ed">${[...Array(70)].map(() => `<circle cx="${f1(R() * W)}" cy="${f1(yBM + 6 + R() * 130)}" r="${f1(0.7 + R() * 0.7)}"/>`).join("")}</g>`;
  // venula (secțiune longitudinală): perete cu celule endoteliale, lumen cu hematii; în reacție: mai multe hematii, joncțiuni deschise
  const vT = 214, vB = 242;
  let ven = `<rect class="ic-lum" x="0" y="${vT}" width="${W}" height="${vB - vT}"/>`;
  for (let x = 0; x < W; x += 34) ven += `<ellipse class="en-nuc" cx="${x + 14}" cy="${vT - 1.2}" rx="6.4" ry="1.5"/><ellipse class="en-nuc" cx="${x + 30}" cy="${vB + 1.2}" rx="6.4" ry="1.5"/>`;
  ven += `<path class="ic-vw" d="M0 ${vT - 1.2}H${W}M0 ${vB + 1.2}H${W}"/>`;
  const rbcAt = (x, y, a) => `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(a)})"><ellipse class="rbc" rx="4.4" ry="3.6"/><ellipse class="rbc-c" rx="1.8" ry="1.4"/></g>`;
  ven += [...Array(11)].map((_, i) => rbcAt(10 + i * 38 + R() * 8, vT + 10 + (i % 2) * 9, R() * 90)).join("");
  const hyper = `<g class="ic-hyper">${[...Array(10)].map((_, i) => rbcAt(28 + i * 40 + R() * 6, vT + 6 + ((i + 1) % 3) * 8, R() * 90)).join("")}</g>`;
  const gaps = `<g class="ic-gap">${[96, 196, 252].map((x) => `<rect x="${x - 1.6}" y="${vT - 3}" width="3.2" height="3.6"/>`).join("")}</g>`;
  // neutrofilele (reacție): unul aderent, unul în transmigrare, două în interstițiu spre cauză
  const nResp = `<g class="ic-nr">` + neut(214, vT + 8, 7.4, "a", [[204, vT + 2], [214, vT + 1.2], [224, vT + 2], [223, vT + 11], [214, vT + 14], [205, vT + 11]])
    + neut(150, vT - 3, 7.2, "t", [[144, vT - 13], [152, vT - 14], [157, vT - 9], [152, vT - 2], [154, vT + 4], [150, vT + 9], [145, vT + 5], [147, vT - 2], [143, vT - 7]])
    + neut(122, 194, 7.2, "i") + neut(178, 186, 7.2, "i") + `</g>`;
  // macrofagul rezident și mastocitul
  const MC = [300, 120];
  const mac = organ(smooth(lumpy(MC[0], MC[1], 22, 14, 0.13, 6), true), "mac-b") + `<path class="mac-nuc" d="${smooth([[MC[0] - 9, MC[1] - 2], [MC[0] - 4, MC[1] - 9], [MC[0] + 4, MC[1] - 7], [MC[0] + 2, MC[1]], [MC[0] - 2, MC[1] + 1], [MC[0] - 4, MC[1] + 7], [MC[0] - 10, MC[1] + 5]], true)}"/>` + [[10, -10], [12, 6], [-1, 13], [-13, -12]].map(([u, v]) => `<circle class="mac-lyso" cx="${MC[0] + u}" cy="${MC[1] + v}" r="2"/>`).join("");
  const MS = [262, 182];
  const mastG = [...Array(22)].map(() => { const a = R() * 6.283, r = Math.sqrt(R()) * 9; return [MS[0] + Math.cos(a) * r, MS[1] + Math.sin(a) * r * 0.75]; });
  const mast = `<path class="ms-cell" d="${smooth(lumpy(MS[0], MS[1], 12, 12, 0.08, 4).map(([x, y]) => [x, MS[1] + (y - MS[1]) * 0.8]), true)}"/><ellipse class="ms-nuc" cx="${MS[0]}" cy="${MS[1]}" rx="4" ry="3.4"/>`
    + `<g class="ic-msin">${mastG.map(([x, y]) => `<circle class="ms-g" cx="${f1(x)}" cy="${f1(y)}" r=".9"/>`).join("")}</g>`
    + `<g class="ic-msout">${mastG.slice(0, 14).map(([x, y]) => `<circle class="ms-g" cx="${f1(x)}" cy="${f1(y)}" r=".9"/>`).join("")}${[...Array(16)].map(() => { const a = R() * 6.283, r = 14 + R() * 12; return `<circle class="ic-hist" cx="${f1(MS[0] + Math.cos(a) * r)}" cy="${f1(MS[1] + Math.sin(a) * r * 0.8)}" r=".9"/>`; }).join("")}</g>`;
  const labsA = lb(404, 31, "epiteliu", "end") + lb(404, yBM + 10, "membrana bazală", "end") + lb(404, 170, "țesut conjunctiv", "end") + lb(404, vT - 4, "venulă", "end") + lb(MC[0], MC[1] + 32, "macrofag", "middle") + lb(MS[0] + 16, MS[1] + 14, "mastocit");

  /* ---------- cauzele, câte un grup ---------- */
  const cap = (t) => lb(18, 24, t, "start", "cap");
  // 1. microorganisme
  const hyph = [[200, yS - 4], [204, yS + 14], [210, yS + 34], [214, yS + 56], [220, yS + 80], [226, yS + 104]];
  const branch = [[210, yS + 34], [196, yS + 52], [186, yS + 72], [180, yS + 92]];
  const septa = (pts) => pts.slice(1).map((p, i) => { const q = pts[i], m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2], a = Math.atan2(p[1] - q[1], p[0] - q[0]) + Math.PI / 2; return `M${f1(m[0] - Math.cos(a) * 2)} ${f1(m[1] - Math.sin(a) * 2)}L${f1(m[0] + Math.cos(a) * 2)} ${f1(m[1] + Math.sin(a) * 2)}`; }).join("");
  const worm = [[34, 160], [48, 150], [62, 162], [76, 152], [90, 164], [102, 156]];
  const c1 = `<g class="ic-c c1">${cap("exogen: microorganisme")}`
    + `<path class="ic-hy" d="${smooth(hyph)}"/><path class="ic-hy" d="${smooth(branch)}"/><path class="ic-hys" d="${septa(hyph)}${septa(branch)}"/>` + [[232, yS + 112, 0.4], [174, yS + 98, -0.3], [238, yS + 98, 1]].map(([x, y, a]) => `<ellipse class="ic-yst" cx="${x}" cy="${y}" rx="4" ry="2.8" transform="rotate(${f1(a * 57.3)} ${x} ${y})"/>`).join("")
    + [...Array(14)].map((_, i) => rod(48 + (i % 5) * 9 + R() * 4, 104 + Math.floor(i / 5) * 9 + R() * 4, R() * 3)).join("")
    + cocciChain([[120, 96], [123, 99.4], [126.4, 102], [130, 104], [133.6, 106.4], [137, 109]]) + cocciChain([[112, 118], [116, 118.6], [120, 120], [124, 121.6]])
    + `<g class="ic-vir"><path class="ic-kinf" d="${smooth(lumpy(110, yS + 26, 7, 9, 0.1, 3), true)}"/><circle class="ic-kinn" cx="110" cy="${yS + 26}" r="3.4"/>${ring(110, yS + 26, 7, 9.6, 0.3).map(([x, y]) => `<path class="ic-vp" d="${poly(ring(x, y, 6, 1.5, 0), true)}"/>`).join("")}</g>`
    + `<path class="ic-worm" d="${smooth(worm)}"/><path class="ic-wormi" d="${smooth(worm)}"/><circle class="ic-wormh" cx="34" cy="160" r="2.4"/>`
    + lb(66, 92, "bacterii", "middle") + lb(128, 90, "coci în lanț", "middle") + lb(124, yS - 3, "virus") + lb(184, yS + 116, "fungi", "middle") + lb(70, 178, "paraziți (larvă)", "middle")
    + `<g class="ic-sys">${[[334, vT + 8, 0], [356, vT + 18, 0.4], [378, vT + 10, -0.3], [398, vT + 20, 0.2]].map(([x, y, a]) => rod(x, y, a, 7, "ic-bac b")).join("")}</g>${lb(326, vB + 14, "→ sistemic (sânge)", "start")}</g>`;
  // 2. corpi străini
  const fibers = [[[40, 96], [92, 110]], [[60, 124], [114, 104]], [[30, 140], [86, 150]], [[120, 150], [176, 136]]];
  const ab = [[92, 132], [140, 124]];
  const c2 = `<g class="ic-c c2">${cap("exogen: corpi străini")}`
    + pollen(166, yS - 9, 8) + pollen(196, yS - 7, 7) + pollen(140, yS - 6, 6) + [...Array(12)].map(() => `<circle class="ic-polp" cx="${f1(150 + R() * 56)}" cy="${f1(yS + 4 + R() * 30)}" r=".9"/>`).join("")
    + fibers.map(([a, b]) => `<path class="ic-asb" d="M${P2(a)}L${P2(b)}"/>`).join("")
    + `<g class="ic-abody"><path class="ax" d="M${P2(ab[0])}L${P2(ab[1])}"/>${[...Array(9)].map((_, i) => { const t = i / 8, x = ab[0][0] + (ab[1][0] - ab[0][0]) * t, y = ab[0][1] + (ab[1][1] - ab[0][1]) * t; return `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${i === 0 || i === 8 ? 3.4 : 2.4}" ry="${i === 0 || i === 8 ? 2.8 : 2}" transform="rotate(-9 ${f1(x)} ${f1(y)})"/>`; }).join("")}</g>`
    + [[188, 96], [200, 108], [180, 116], [206, 122], [192, 128]].map(([x, y], i) => `<path class="ic-sil" d="${poly(lumpy(x, y, 3.2, 5, 0.35, i + 2), true)}"/>`).join("")
    + `<g class="ic-gas">${[[244, 20], [260, 27], [276, 20]].map(([x, y]) => `<path d="M${x} ${y}q3 -3 6 0t6 0"/>`).join("")}</g>`
    + `<g class="ic-macin">${[[-8, 8], [-5, 13], [6, 12], [9, 4], [-12, 0], [4, -14]].map(([u, v], i) => i < 3 ? `<path class="ic-sil" d="${poly(lumpy(MC[0] + u, MC[1] + v, 2.2, 5, 0.3, i + 9), true)}"/>` : `<circle class="ic-dust" cx="${MC[0] + u}" cy="${MC[1] + v}" r="1.4"/>`).join("")}</g>`
    + lb(214, yS - 14, "polen", "start") + lb(78, 166, "azbest (fibre, corp azbestozic)", "middle") + lb(196, 142, "siliciu", "middle") + lb(294, 27, "iritanți inhalatori", "start", "dim") + lb(MC[0] + 24, MC[1] + 18, "pulberi", "start") + `</g>`;
  // 3. distrucție tisulară: plagă, agent chimic, căldură, UV, raze X; celule necrotice care eliberează DAMP
  const cut = [[54, yS - 1], [62, yS + 30], [68, yS + 60], [72, yS + 84], [76, yS + 60], [82, yS + 30], [90, yS - 1]];
  const c3 = `<g class="ic-c c3">${cap("endogen: distrucție tisulară")}`
    + `<path class="ic-cut" d="${smooth(cut, true, 0.6)}"/>${[[66, yS + 54], [74, yS + 68], [70, yS + 40], [78, yS + 46]].map(([x, y]) => rbcAt(x, y, R() * 90)).join("")}`
    + `<path class="ic-drop" d="M196 ${yS - 18}C192 ${yS - 10} 190 ${yS - 6} 196 ${yS - 3}C202 ${yS - 6} 200 ${yS - 10} 196 ${yS - 18}Z"/><path class="ic-burn" d="${smooth([[182, yS + 1], [196, yS - 1], [212, yS + 1], [212, yS + 18], [196, yS + 22], [182, yS + 18]], true, 0.6)}"/>`
    + `<path class="ic-flame" d="M150 ${yS - 2}C144 ${yS - 8} 148 ${yS - 14} 152 ${yS - 18}C152 ${yS - 12} 158 ${yS - 12} 156 ${yS - 6}C160 ${yS - 8} 160 ${yS - 4} 158 ${yS - 2}Z"/><path class="ic-heat" d="M140 ${yS + 4}h22M138 ${yS + 8}h26"/>`
    + `<g class="ic-uv">${[236, 244, 252].map((x) => `<path d="M${x} 14q2 3 0 6t0 6t0 6t0 6"/>`).join("")}</g><g class="ic-xr">${[284, 292, 300].map((x) => `<path d="M${x} 14V${yS + 58}"/>`).join("")}</g>`
    + [[130, 112], [150, 126], [118, 140], [164, 104], [176, 138], [140, 150]].map(([x, y], i) => `<path class="ic-necc" d="${smooth(lumpy(x, y, 7.5, 9, 0.18, i + 3), true)}"/>${i % 3 === 0 ? `<circle class="ic-pyk" cx="${x}" cy="${y}" r="2"/>` : i % 3 === 1 ? `<path class="ic-krx" d="M${x - 2} ${y - 1}h1.4M${x + 1} ${y + 1.6}h1.4M${x} ${y - 2.6}h1.2"/>` : `<circle class="ic-lys" cx="${x}" cy="${y}" r="2.6"/>`}`).join("")
    + [...Array(26)].map(() => `<circle class="ic-damp" cx="${f1(116 + R() * 70)}" cy="${f1(96 + R() * 64)}" r="1"/>`).join("")
    + lb(72, yS + 98, "plagă", "middle") + lb(162, 22, "căldură") + lb(202, 22, "chimic") + lb(258, 22, "UV") + lb(306, 22, "raze X") + lb(150, 168, "celule necrotice, DAMP", "middle") + `</g>`;
  // 4. celule tumorale: un cuib de celule atipice care rup membrana bazală și invadează conjunctivul; limfocite în jur
  const tc = [[96, 62], [112, 66], [128, 62], [104, 84], [120, 88], [136, 82], [92, 104], [110, 108], [128, 106], [146, 100], [104, 128], [124, 130], [142, 124]];
  const c4 = `<g class="ic-c c4">${cap("endogen: celule tumorale")}`
    + `<path class="ic-tst" d="${smooth(lumpy(118, 98, 46, 13, 0.12, 4), true)}"/><path class="ic-bmgap" d="M76 ${yBM}H162"/>`
    + tc.map(([x, y], i) => `<path class="ic-tu" d="${smooth(lumpy(x, y, 9, 9, 0.16, i + 5), true)}"/><path class="ic-tun" d="${smooth(lumpy(x + 0.6, y, 4.8 + (i % 3) * 0.7, 8, 0.24, i + 15), true)}"/><circle class="ic-tunl" cx="${x + 1.6}" cy="${y - 1}" r="${i % 2 ? 1.3 : 1}"/>`).join("")
    + `<g class="ic-mit"><path class="ic-tu" d="${smooth(lumpy(156, 118, 8, 9, 0.1, 2), true)}"/><path class="sp" d="M150 118L156 114L162 118M150 118L156 122L162 118"/><path class="ch" d="M156 113.6V122.4"/></g>`
    + [[62, 110], [70, 140], [170, 92], [176, 144], [150, 154], [84, 154], [186, 120]].map(([x, y]) => lymph(x, y)).join("")
    + lb(118, 172, "celule atipice, o mitoză; limfocite în jur", "middle") + `</g>`;
  // 5. cristale: tofus (material amorf, ace de urat, celulă gigantă), plăci de colesterol, oxalat de calciu, fosfat de calciu
  const RN = rng(5);
  const needles = [...Array(22)].map(() => { const x = 44 + RN() * 50, y = 100 + RN() * 34, a = -0.6 + RN() * 1.2, l = 8 + RN() * 7; return rod(x, y, a, l, "ic-urate"); }).join("");
  const giant = `<path class="ic-giant" d="${smooth(lumpy(100, 150, 15, 14, 0.12, 8), true)}"/>${ring(100, 150, 6, 9, 0.2).map(([x, y]) => `<ellipse class="ic-gn" cx="${f1(x)}" cy="${f1(y)}" rx="2.6" ry="2"/>`).join("")}`;
  const c5 = `<g class="ic-c c5">${cap("endogen: cristale precipitate")}`
    + `<path class="ic-toph" d="${smooth(lumpy(68, 118, 30, 12, 0.12, 2).map(([x, y]) => [x, 118 + (y - 118) * 0.7]), true)}"/>${needles}${giant}`
    + chol(150, 100, 22, 11, -0.3) + chol(170, 116, 18, 9, 0.5) + chol(146, 126, 16, 8, 0.1)
    + oxal(200, 96, 4.4) + oxal(212, 106, 3.4) + oxal(196, 112, 3)
    + `<g class="ic-cap">${[...Array(30)].map(() => `<circle cx="${f1(186 + RN() * 30)}" cy="${f1(140 + RN() * 22)}" r="${f1(0.8 + RN() * 1.2)}"/>`).join("")}</g>`
    + `<g class="ic-macin">${rod(MC[0] - 4, MC[1] + 9, 0.3, 11, "ic-urate")}</g>`
    + lb(66, 92, "acid uric (tofus)", "middle") + lb(158, 90, "colesterol", "middle") + lb(206, 88, "oxalat de Ca", "middle") + lb(200, 172, "fosfat de Ca", "middle") + lb(100, 174, "celulă gigantă", "middle") + `</g>`;
  const panelA = `<g class="ic-pa" clip-path="url(#__U__-cA)"><rect class="ic-air" x="${cA.x}" y="${cA.y}" width="${cA.w}" height="${cA.h}"/>${ct}${edema}${epi}${bm}${ven}${hyper}${gaps}${mast}${mac}${nResp}${c1}${c2}${c3}${c4}${c5}${labsA}</g>`;

  /* ======================= B. clasificarea cauzelor și scopul ======================= */
  const cB = { x: 10, y: 276, w: 400, h: 192 };
  const TW = 76, TG = 3, TX = (i) => 14 + i * (TW + TG), TY = 298, TH = 80;
  const icon = [
    (x, y) => rod(x - 8, y - 3, 0.5, 9, "ic-bac") + rod(x - 4, y + 5, -0.3, 9, "ic-bac") + cocciChain([[x + 4, y - 7], [x + 7, y - 4.6], [x + 10, y - 2], [x + 12, y + 1.4]]) + `<path class="ic-vp" d="${poly(ring(x + 6, y + 7, 6, 3, 0), true)}"/>`,
    (x, y) => pollen(x - 5, y, 7) + `<path class="ic-asb" d="M${x + 4} ${y - 9}L${x + 14} ${y + 9}"/><path class="ic-asb" d="M${x + 8} ${y - 10}L${x + 12} ${y + 8}"/>`,
    (x, y) => `<path class="ic-necc" d="${smooth(lumpy(x - 2, y + 2, 9, 9, 0.18, 3), true)}"/><circle class="ic-pyk" cx="${x - 2}" cy="${y + 2}" r="2.6"/>${[...Array(8)].map((_, i) => `<circle class="ic-damp" cx="${f1(x + 9 + (i % 3) * 3)}" cy="${f1(y - 6 + i * 2)}" r="1"/>`).join("")}<g class="ic-xr"><path d="M${x - 12} ${y - 14}L${x - 6} ${y - 6}"/><path d="M${x - 6} ${y - 15}L${x - 1} ${y - 8}"/></g>`,
    (x, y) => [[-6, -4], [5, -5], [-1, 6]].map(([u, v], i) => `<path class="ic-tu" d="${smooth(lumpy(x + u, y + v, 7, 9, 0.16, i + 5), true)}"/><path class="ic-tun" d="${smooth(lumpy(x + u, y + v, 4, 8, 0.24, i + 15), true)}"/>`).join(""),
    (x, y) => rod(x - 9, y - 4, 0.4, 13, "ic-urate") + rod(x - 7, y + 3, -0.2, 12, "ic-urate") + chol(x + 7, y - 3, 12, 7, -0.2) + oxal(x + 6, y + 8, 3.6),
  ];
  const tiles = [
    ["Microorganisme", ["fungi, bacterii,", "virusuri, paraziți;", "local, apoi", "sistemic"]],
    ["Corpi străini", ["polen, proteine", "străine, azbest,", "siliciu, pulberi,", "iritanți inhalatori"]],
    ["Distrucție tisulară", ["mecanic, chimic,", "fizic: căldură,", "UV, raze X,", "radioactivitate"]],
    ["Celule tumorale", ["celule proprii", "transformate", "", ""]],
    ["Cristale", ["acid uric, oxalat", "și fosfat de Ca,", "colesterol", ""]],
  ];
  const tilesSvg = tiles.map(([t, ex], i) => { const x = TX(i), cx = x + TW / 2; return `<g class="ic-tile k${i + 1}"><rect class="fr" x="${x}" y="${TY}" width="${TW}" height="${TH}" rx="7"/>${icon[i](cx, TY + 18)}${lb(cx, TY + 40, t, "middle", "tt")}${ex.map((e, j) => (e ? lb(cx, TY + 50 + j * 7.6, e, "middle", "sm") : "")).join("")}</g>`; }).join("");
  const groups = `<path class="ic-grp" d="M${TX(0) + 2} 292H${TX(1) + TW - 2}M${TX(2) + 2} 292H${TX(4) + TW - 2}"/>${lb(TX(0) + 2, 288, "Exogene")}${lb(TX(2) + 2, 288, "Endogene")}`;
  // scopul: limitează, elimină cauza, repară (trei viniete)
  const SY = 426;
  const v1 = `<path class="ic-blob" d="${smooth(lumpy(54, SY, 8, 9, 0.2, 2), true)}"/><g class="ic-fbr">${[...Array(10)].map((_, i) => { const a = i * 0.63, r = 13; return `<path d="M${f1(54 + Math.cos(a) * r)} ${f1(SY + Math.sin(a) * r * 0.8)}L${f1(54 + Math.cos(a + 0.9) * r)} ${f1(SY + Math.sin(a + 0.9) * r * 0.8)}"/>`; }).join("")}</g>${ring(54, SY, 5, 18, 0.4).map(([x, y]) => neut(x, y, 4.8, "s")).join("")}`;
  const v2 = `<path class="mac-b" d="${smooth(lumpy(206, SY, 17, 12, 0.18, 6), true)}"/><path class="mac-nuc" d="${smooth([[196, SY - 2], [200, SY - 8], [206, SY - 6], [204, SY], [198, SY + 4]], true)}"/><circle class="ic-phs" cx="212" cy="${SY + 5}" r="6"/>${rod(212, SY + 5, 0.6, 6)}${rod(232, SY - 6, -0.4, 7)}${rod(236, SY + 6, 0.8, 7)}`;
  const v3 = `<path class="in-fib" d="${smooth([[322, SY + 2], [334, SY - 3], [348, SY - 3], [362, SY + 2], [348, SY + 5], [334, SY + 5]], true)}"/><ellipse class="in-fibn" cx="342" cy="${SY + 1}" rx="5" ry="1.6"/>${[0, 1, 2].map((i) => `<path class="ic-ncoll" d="M${330 + i * 2} ${SY + 10 + i * 4}C${346} ${SY + 6 + i * 4} ${358} ${SY + 14 + i * 4} ${382} ${SY + 8 + i * 4}"/>`).join("")}<path class="ic-cap0" d="M288 ${SY + 18}H318"/><path class="ic-sprout" d="M300 ${SY + 16}C302 ${SY + 4} 306 ${SY - 6} 312 ${SY - 10}"/><circle class="ic-sprt" cx="312" cy="${SY - 10}" r="2"/>`;
  const scop = `<g class="ic-scop">${lb(18, 396, "Scopul inflamației (LP): același, oricare ar fi cauza", "start", "ti")}<g class="ic-v v1">${v1}${lb(54, 460, "limitează leziunea", "middle")}</g><g class="ic-v v2">${v2}${lb(212, 460, "elimină cauza", "middle")}</g><g class="ic-v v3">${v3}${lb(344, 460, "repară țesutul", "middle")}</g></g>`;
  const panelB = `<rect class="ic-card" x="${cB.x}" y="${cB.y}" width="${cB.w}" height="${cB.h}" rx="10"/>${groups}${tilesSvg}${scop}`;
  const frames = `<rect class="ic-card" x="${cA.x}" y="${cA.y}" width="${cA.w}" height="${cA.h}" rx="10"/>`;
  return {
    W, H,
    defs: kDefs + `<clipPath id="__U__-cA"><rect x="${cA.x}" y="${cA.y}" width="${cA.w}" height="${cA.h}" rx="10"/></clipPath>`,
    L: { frames, panelA, panelB },
    hits: {
      cause: { x: 16, y: 14, w: 222, h: 166 }, sys: { x: 318, y: vT - 2, w: 88, h: vB - vT + 4 }, ves: { x: 16, y: vT - 4, w: 300, h: vB - vT + 8 }, neu: { x: 104, y: 178, w: 130, h: 26 },
      mac: { cx: MC[0], cy: MC[1], r: 26 }, mast: { cx: MS[0], cy: MS[1], r: 15 },
      t1: { x: TX(0), y: TY, w: TW, h: TH }, t2: { x: TX(1), y: TY, w: TW, h: TH }, t3: { x: TX(2), y: TY, w: TW, h: TH }, t4: { x: TX(3), y: TY, w: TW, h: TH }, t5: { x: TX(4), y: TY, w: TW, h: TH },
      lim: { x: 16, y: 402, w: 128, h: 62 }, elim: { x: 148, y: 402, w: 128, h: 62 }, rep: { x: 280, y: 402, w: 126, h: 62 },
    },
    badges: { cause: [236, 62], sys: [312, 208], ves: [24, 252], neu: [96, 196], mac: [326, 100], mast: [246, 168], lim: [130, 414], elim: [268, 414], rep: [398, 414] },
  };
}

export function preview(state = {}) {
  const A = build(), L = A.L, sub = (x) => x.replaceAll("__U__", "pv");
  const st = state.st ?? 0;
  return { viewBox: `0 0 ${W} ${H}`, svg: sub(`<defs>${A.defs}</defs><g class="icx" data-st="${st}">${L.frames}${L.panelA}${L.panelB}</g>`) };
}
