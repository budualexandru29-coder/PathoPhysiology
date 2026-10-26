// Î15: pirogenii exogeni și efectele biologice ale pirogenilor endogeni. Două panouri:
//  A. recunoașterea, pe membrana unui macrofag: o bacterie Gram-negativă care eliberează LPS (o veziculă de membrană externă),
//     o moleculă de LPS desenată în detaliu (lipidul A, miezul, antigenul O), LBP, CD14, dimerul TLR4–MD-2, MyD88 și cascada
//     de kinaze, NF-κB eliberat din IκB, nucleul (ADN, ARNm), citokinele secretate; un fagozom cu o bacterie opsonizată;
//     în dreapta sus, peretele unei bacterii Gram-pozitive cu acid lipoteicoic, pe dimerul TLR2–TLR1;
//  B. efectele pirogenilor endogeni, în jurul unui vas: OVLT (PGE2, neuronul preoptic, AMPc, termostatul), ficatul
//     (proteine de fază acută, fierul sechestrat), măduva (mobilizarea leucocitelor), endoteliul (molecule de adeziune, IL-8,
//     mediatori lipidici), apărarea specifică și nespecifică (limfocite B și T, plasmocit, fagocitoză), interferonul antiviral.
// Moleculele sunt desenate mult mai mari decât sunt; panoul B e o hartă schematică, nu o secțiune reală.
import { smooth, poly, lumpy, rng, sampleSmooth, offset, ribbon } from "./lib/geo.mjs";
import { organ } from "./lib/an.mjs";
import { cytokine, pge2 } from "./fever.mjs";

export const W = 420, H = 500;
const P2 = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
const f1 = (v) => (+v).toFixed(1);
const hex = (x, y, r, cls = "") => `<path class="${cls}" d="${poly(Array.from({ length: 6 }, (_, i) => [x + Math.cos(i * Math.PI / 3 + Math.PI / 6) * r, y + Math.sin(i * Math.PI / 3 + Math.PI / 6) * r]), true)}"/>`;

/* LPS: lipidul A (dizaharid de glucozamină cu două fosfați și șase lanțuri acil), miezul (zaharuri), antigenul O (unități repetitive) */
function lps(x, y, up = -1, s = 1, cls = "") {
  // (x, y) = mijlocul dizaharidului lipidului A; `up` = sensul în care iese lanțul de zaharuri
  const g1 = [x - 3.6 * s, y], g2 = [x + 3.6 * s, y];
  let tails = ""; [-7, -4.2, -1.4, 1.4, 4.2, 7].forEach((dx, i) => { const x0 = x + dx * s; tails += `M${f1(x0)} ${f1(y - up * 3 * s)}l${f1((i % 2 ? 0.8 : -0.8) * s)} ${f1(-up * 4 * s)}l${f1((i % 2 ? -0.8 : 0.8) * s)} ${f1(-up * 4 * s)}l${f1((i % 2 ? 0.8 : -0.8) * s)} ${f1(-up * (i % 3 === 0 ? 3 : 4) * s)}`; });
  const phos = [[g1[0] - 4 * s, y + up * 1.5 * s], [g2[0] + 4 * s, y + up * 1.5 * s]].map(([a, b]) => `<circle class="lp-p" cx="${f1(a)}" cy="${f1(b)}" r="${f1(1.5 * s)}"/>`).join("");
  let core = "", ch = [x, y + up * 4 * s];
  const cpts = []; for (let i = 0; i < 4; i++) { ch = [ch[0] + (i % 2 ? 2 : -2) * s, ch[1] + up * 5.6 * s]; cpts.push(ch); core += hex(ch[0], ch[1], 2.6 * s, "lp-core"); }
  let oag = "", o = cpts[cpts.length - 1];
  for (let i = 0; i < 4; i++) { o = [o[0] + (i % 2 ? 1.5 : -1.5) * s, o[1] + up * 5.4 * s]; oag += hex(o[0], o[1], 2.3 * s, "lp-o"); if (i % 2 === 0) oag += hex(o[0] + 4.4 * s, o[1] + up * 1 * s, 1.8 * s, "lp-o2"); }
  return `<g class="lps1 ${cls}"><path class="lp-acyl" d="${tails}"/>${hex(g1[0], g1[1], 3 * s, "lp-g")}${hex(g2[0], g2[1], 3 * s, "lp-g")}${phos}<path class="lp-link" d="M${P2([x, y + up * 2 * s])}L${P2(cpts[0])}"/>${core}${oag}</g>`;
}
// receptor TLR (ectodomeniul în potcoavă, solenoid cu repetiții bogate în leucină) — desenat ca un arc gros, cu striații
function tlr(cx, base, side, h, cls) {
  // side = -1 (stânga) / +1 (dreapta); potcoava urcă din membrană și se curbează spre mijloc
  const pts = [[cx + side * 10, base], [cx + side * 13, base - h * 0.45], [cx + side * 8, base - h * 0.85], [cx + side * 1.5, base - h]];
  const S = sampleSmooth(pts, false, 8);
  const band = ribbon(S, (t) => 4.4 - t * 1.2);
  let rib = ""; S.forEach((p, i) => { if (i % 3 || i === 0) return; const n = offset(S, 1)[i], m = offset(S, -1)[i]; const dx = n[0] - m[0], dy = n[1] - m[1]; rib += `M${P2([p[0] + dx * 3.2, p[1] + dy * 3.2])}L${P2([p[0] - dx * 3.2, p[1] - dy * 3.2])}`; });
  return `<g class="${cls}"><path class="tl-e" d="${poly(band, true)}"/><path class="tl-r" d="${rib}"/></g>`;
}
// celule mici pentru panoul B
const lymphC = (x, y, r = 6, cls = "") => `<g class="pc-ly ${cls}"><circle class="c" cx="${f1(x)}" cy="${f1(y)}" r="${r}"/><circle class="n" cx="${f1(x + 0.5)}" cy="${f1(y)}" r="${f1(r * 0.78)}"/></g>`;
function neut(x, y, r = 8, ang = 0, el = 1) {
  const sh = Array.from({ length: 14 }, (_, i) => { const t = i / 14 * 6.28; const u = Math.cos(t) * r * el, v = Math.sin(t) * r / Math.sqrt(el); return [x + u * Math.cos(ang) - v * Math.sin(ang), y + u * Math.sin(ang) + v * Math.cos(ang)]; });
  const lob = [[-0.45, -0.15], [0, 0.3], [0.45, -0.1]].map(([u, v]) => [x + (u * r * el) * Math.cos(ang) - v * r * Math.sin(ang), y + (u * r * el) * Math.sin(ang) + v * r * Math.cos(ang)]);
  return `<g class="pc-nt"><path class="c" d="${smooth(sh, true)}"/><path class="br" d="${poly(lob)}"/>${lob.map(([a, b]) => `<circle class="n" cx="${f1(a)}" cy="${f1(b)}" r="${f1(r * 0.3)}"/>`).join("")}</g>`;
}
const antib = (x, y, a, s = 1) => { const c = Math.cos(a), sn = Math.sin(a); const p = (u, v) => P2([x + u * s * c - v * s * sn, y + u * s * sn + v * s * c]); return `<path class="pc-ab" d="M${p(-4, 0)}L${p(0, 0)}L${p(3, -2.6)}M${p(0, 0)}L${p(3, 2.6)}"/>`; };
const crpG = (x, y, s = 1) => `<g class="pc-crp">${[0, 1, 2, 3, 4].map((k) => { const a = -Math.PI / 2 + k * 2 * Math.PI / 5; return `<circle cx="${f1(x + Math.cos(a) * 2.4 * s)}" cy="${f1(y + Math.sin(a) * 2.4 * s)}" r="${f1(1.5 * s)}"/>`; }).join("")}</g>`;
const ifn = (x, y) => `<g class="pc-ifn"><path d="M${f1(x - 2.6)} ${f1(y - 1.6)}h5.2M${f1(x - 2.6)} ${f1(y + 1.6)}h5.2"/><circle cx="${f1(x)}" cy="${f1(y)}" r="1.2"/></g>`;
const virion = (x, y, s = 1) => `<path class="pc-vi" d="${poly(Array.from({ length: 6 }, (_, i) => [x + Math.cos(i * Math.PI / 3) * 2.2 * s, y + Math.sin(i * Math.PI / 3) * 2.2 * s]), true)}"/>`;
// tromboxanul A2 (inel oxanic cu punte de oxigen, schematic) și PAF (cap cu colină, o coadă lungă, una scurtă)
const txa2 = (x, y) => `<g class="pc-tx"><path d="${poly([[x - 3, y - 1.5], [x, y - 3.2], [x + 3, y - 1.5], [x + 3, y + 1.5], [x, y + 3.2], [x - 3, y + 1.5]], true)}M${x - 3} ${y - 1.5}L${x + 3} ${y + 1.5}M${x + 3} ${y - 1.5}L${x + 8} ${y - 3}M${x - 3} ${y + 1.5}L${x - 8} ${y + 3}"/><circle cx="${x}" cy="${y}" r="1.1"/></g>`;
const paf = (x, y) => `<g class="pc-paf"><circle cx="${x}" cy="${y}" r="2.2"/><path d="M${x} ${y + 2.2}l-1 8M${x + 1} ${y + 2.2}l3 3"/></g>`;

export function build() {
  const R = rng(5);
  /* ======================= A. recunoașterea pe membrana macrofagului ======================= */
  const cA = { x: 10, y: 10, w: 400, h: 206 };
  const MY = 104;                                            // mijlocul membranei
  let mem = ""; for (let x = cA.x; x <= cA.x + cA.w; x += 5) mem += `<circle class="pm-h" cx="${x}" cy="${MY - 4}" r="2"/><circle class="pm-h" cx="${x}" cy="${MY + 4}" r="2"/>`;
  mem = `<rect class="pm-core" x="${cA.x}" y="${MY - 3}" width="${cA.w}" height="6"/>` + mem;
  // bacteria Gram-negativă (stânga sus), cu straturile peretelui și franjuri de LPS
  const bac = { c: [26, 14], rx: 82, ry: 44 };
  const ell = (dr) => { const pts = []; for (let i = 0; i <= 48; i++) { const t = i / 48 * 6.283; pts.push([bac.c[0] + Math.cos(t) * (bac.rx + dr), bac.c[1] + Math.sin(t) * (bac.ry + dr)]); } return pts; };
  let fringe = ""; ell(0).forEach((p, i) => { if (i % 2) return; const n = [p[0] - bac.c[0], (p[1] - bac.c[1]) * (bac.rx / bac.ry)], l = Math.hypot(...n); fringe += `M${P2(p)}l${f1(n[0] / l * 5)} ${f1(n[1] / l * 5)}`; });
  const bacSvg = `<path class="bg-om" d="${smooth(ell(0), true)}"/><path class="bg-pg" d="${smooth(ell(-3), true)}"/><path class="bg-im" d="${smooth(ell(-6), true)}"/><path class="bg-cy" d="${smooth(ell(-8), true)}"/><path class="bg-lps" d="${fringe}"/>`;
  const omv = `<circle class="bg-omv" cx="104" cy="64" r="7"/>` + Array.from({ length: 12 }, (_, i) => { const a = i / 12 * 6.283; return `<path class="bg-lps" d="M${f1(104 + Math.cos(a) * 7)} ${f1(64 + Math.sin(a) * 7)}l${f1(Math.cos(a) * 3.6)} ${f1(Math.sin(a) * 3.6)}"/>`; }).join("");
  // molecula de LPS mare, ținută de LBP, apoi predată CD14 și MD-2
  const lpsBig = lps(140, 50, -1, 1.15, "big");
  const lbp = `<path class="lbp" d="${smooth([[150, 56], [160, 50], [170, 54], [168, 62], [160, 60], [154, 64]], true)}"/>`;
  const cd14 = `<path class="cd14" d="${smooth([[170, 92], [168, 80], [174, 72], [184, 72], [190, 80], [188, 92]])}"/><path class="gpi" d="M179 92V${MY - 4}"/>`;
  // TLR4: monomeri separați (înainte) sau dimerul TLR4–MD-2 cu lipidul A (după)
  const tx = 236;
  const tlrMono = tlr(tx - 14, MY - 6, -1, 40, "tlr4 m") + tlr(tx + 14, MY - 6, 1, 40, "tlr4 m") + `<ellipse class="md2" cx="${tx - 22}" cy="${MY - 30}" rx="4" ry="3.4"/><ellipse class="md2" cx="${tx + 22}" cy="${MY - 30}" rx="4" ry="3.4"/>`;
  const tlrDim = tlr(tx, MY - 6, -1, 44, "tlr4 d") + tlr(tx, MY - 6, 1, 44, "tlr4 d") + `<ellipse class="md2" cx="${tx - 8}" cy="${MY - 30}" rx="4.2" ry="3.6"/><ellipse class="md2" cx="${tx + 8}" cy="${MY - 30}" rx="4.2" ry="3.6"/>` + `<g transform="translate(${tx - 8} ${MY - 30}) scale(.55)"><path class="lp-acyl" d="M-6 -2l1 -4l-1 -4M-2 -2l-1 -4l1 -4M2 -2l1 -4l-1 -4M6 -2l-1 -4l1 -4"/></g>`;
  const tm = (x) => `<path class="tl-tm" d="M${x} ${MY - 6}V${MY + 7}"/>`;
  const tirMono = tm(tx - 24) + tm(tx + 24) + `<ellipse class="tir" cx="${tx - 24}" cy="${MY + 12}" rx="5" ry="3.6"/><ellipse class="tir" cx="${tx + 24}" cy="${MY + 12}" rx="5" ry="3.6"/>`;
  const tirDim = tm(tx - 10) + tm(tx + 10) + `<ellipse class="tir" cx="${tx - 7}" cy="${MY + 12}" rx="5" ry="3.6"/><ellipse class="tir" cx="${tx + 7}" cy="${MY + 12}" rx="5" ry="3.6"/>`;
  // MyD88, IRAK/TRAF6, IKK; NF-κB (p50/p65) ținut de IκB, apoi eliberat și mutat în nucleu
  const myd = `<path class="myd" d="${smooth(lumpy(tx, MY + 26, 6, 9, 0.12, 3), true)}"/><path class="kin" d="${smooth(lumpy(tx + 15, MY + 36, 5, 9, 0.14, 4), true)}"/><path class="kin" d="${smooth(lumpy(tx + 28, MY + 44, 5, 9, 0.14, 5), true)}"/><path class="ikk" d="${smooth(lumpy(tx + 42, MY + 50, 5.4, 9, 0.12, 6), true)}"/>`;
  const nfkb = (x, y) => `<g class="nfkb"><ellipse class="p50" cx="${x - 3.6}" cy="${y}" rx="4" ry="3.2"/><ellipse class="p65" cx="${x + 3.6}" cy="${y}" rx="4" ry="3.2"/></g>`;
  const ikb = (x, y) => `<path class="ikb" d="M${x - 8} ${y - 4}Q${x} ${y - 9} ${x + 8} ${y - 4}"/>`;
  const nfRest = nfkb(300, 140) + ikb(300, 140);
  const ikbDeg = [[288, 132], [294, 128], [300, 131]].map(([x, y]) => `<circle class="ikbf" cx="${x}" cy="${y}" r="1.4"/>`).join("");
  // nucleul (sus se vede doar partea lui superioară), cu pori, ADN, NF-κB pe promotor, ARNm care iese
  const nuc = { c: [290, 236], rx: 84, ry: 62 };
  const nucD = (() => { const pts = []; for (let i = 0; i <= 60; i++) { const t = Math.PI + i / 60 * Math.PI; pts.push([nuc.c[0] + Math.cos(t) * nuc.rx, nuc.c[1] + Math.sin(t) * nuc.ry]); } return pts; })();
  const pores = [0.3, 0.45, 0.6, 0.75].map((f) => { const p = nucD[Math.round(f * 60)]; return `<circle class="npore" cx="${f1(p[0])}" cy="${f1(p[1])}" r="2.2"/>`; }).join("");
  let dna = ""; for (let x = 226; x < 360; x += 2) { const y1 = 196 + Math.sin(x / 4) * 3, y2 = 196 - Math.sin(x / 4) * 3; dna += (x % 6 === 0 ? `M${x} ${f1(y1)}L${x} ${f1(y2)}` : ""); }
  const dnaS = `<path class="dna" d="${smooth(Array.from({ length: 34 }, (_, i) => [226 + i * 4, 196 + Math.sin((226 + i * 4) / 4) * 3]))}"/><path class="dna" d="${smooth(Array.from({ length: 34 }, (_, i) => [226 + i * 4, 196 - Math.sin((226 + i * 4) / 4) * 3]))}"/><path class="dnar" d="${dna}"/>`;
  const mrna = [[262, 188, 0.6], [300, 186, 0.75], [320, 190, 0.6]].map(([x, y]) => `<path class="mrna" d="${smooth([[x, y], [x + 4, y - 6], [x - 2, y - 12], [x + 3, y - 18]])}"/>`).join("");
  // secreția citokinelor (vezicule care fuzionează cu membrana, citokinele ies)
  const ves = [[330, 128], [344, 118], [336, 112]].map(([x, y]) => `<circle class="ves" cx="${x}" cy="${y}" r="4.6"/>`).join("");
  const ckOut = cytokine("il1", 318, 80, 1, "a") + cytokine("tnf", 336, 70, 1, "b") + cytokine("il6", 352, 84, 1, "c") + cytokine("il1", 300, 62, 0.9, "d") + `<g class="pc-ifng">${ifn(326, 52)}</g>`;
  // fagozomul cu o bacterie opsonizată (C3b) și lizozomi care fuzionează
  const fag = `<circle class="fagm" cx="70" cy="158" r="17"/><rect class="fagb" x="56" y="152" width="26" height="11" rx="5.5"/>` + [[58, 151], [70, 149], [82, 153], [64, 165], [78, 165]].map(([x, y]) => `<circle class="c3b" cx="${x}" cy="${y}" r="1.4"/>`).join("") + [[92, 150], [94, 166]].map(([x, y]) => `<circle class="lyso" cx="${x}" cy="${y}" r="4"/>`).join("");
  // bacteria Gram-pozitivă (dreapta sus): peptidoglican gros, acid lipoteicoic; dimerul TLR2–TLR1
  let gp = `<path class="gp-pg" d="${smooth([[300, 4], [340, 16], [380, 30], [420, 36]])}"/><path class="gp-pg2" d="${smooth([[300, 4], [340, 16], [380, 30], [420, 36]])}"/>`;
  [[350, 24], [372, 30], [394, 35]].forEach(([x, y]) => { let s = `M${x} ${y + 4}`; for (let k = 1; k < 7; k++) s += `L${x + (k % 2 ? 1.6 : -1.6)} ${y + 4 + k * 4.4}`; gp += `<path class="lta" d="${s}"/>` + Array.from({ length: 6 }, (_, k) => `<circle class="lta-b" cx="${f1(x + (k % 2 ? -1.6 : 1.6))}" cy="${f1(y + 8.4 + k * 4.4)}" r="1.1"/>`).join(""); });
  const t2x = 384;
  const tlr2 = tlr(t2x, MY - 6, -1, 36, "tlr2") + tlr(t2x, MY - 6, 1, 36, "tlr1") + tm(t2x - 10) + tm(t2x + 10) + `<ellipse class="tir" cx="${t2x - 7}" cy="${MY + 12}" rx="5" ry="3.6"/><ellipse class="tir" cx="${t2x + 7}" cy="${MY + 12}" rx="5" ry="3.6"/>`;
  const panelA = `<g clip-path="url(#__U__-cA)"><rect class="pa-ex" x="${cA.x}" y="${cA.y}" width="${cA.w}" height="${MY - cA.y}"/><rect class="pa-cy" x="${cA.x}" y="${MY}" width="${cA.w}" height="${cA.y + cA.h - MY}"/>${bacSvg}${gp}`
    + `<g class="pa-nuc"><path class="nucl" d="${smooth([...nucD, [nuc.c[0] + nuc.rx, 260], [nuc.c[0] - nuc.rx, 260]], true)}"/>${dnaS}${pores}</g>`
    + `${mem}<g class="pa-s0">${tlrMono}${tirMono}${nfRest}</g><g class="pa-s1">${omv}${lbp}${lpsBig}${tlrDim}${tirDim}${myd}${fag}</g><g class="pa-s2">${ikbDeg}${nfkb(244, 197)}${mrna}${ves}</g><g class="pa-s2b">${ckOut}</g>${cd14}${tlr2}</g>`;

  /* ======================= B. efectele pirogenilor endogeni ======================= */
  const cB = { x: 10, y: 224, w: 400, h: 266 };
  const VY0 = 346, VY1 = 366;                               // lumenul vasului
  let vessel = `<g clip-path="url(#__U__-cB)"><rect class="pv-l" x="${cB.x}" y="${VY0}" width="${cB.w}" height="${VY1 - VY0}"/><path class="pv-w" d="M${cB.x} ${VY0 - 1.5}H${cB.x + cB.w}M${cB.x} ${VY1 + 1.5}H${cB.x + cB.w}"/>`;
  for (let x = cB.x + 8; x < cB.x + cB.w; x += 26) vessel += `<ellipse class="pv-n" cx="${x}" cy="${VY0 - 1.5}" rx="4" ry="1"/><ellipse class="pv-n" cx="${x + 13}" cy="${VY1 + 1.5}" rx="4" ry="1"/>`;
  for (let i = 0; i < 9; i++) vessel += `<ellipse class="rbc" cx="${f1(cB.x + 20 + i * 44)}" cy="${f1(356 + (i % 2 ? 3 : -3))}" rx="5" ry="${i % 3 ? 2.2 : 4.4}"/>`;
  vessel += `</g>`;
  const fe = [40, 96, 150, 212, 258, 318, 372].map((x, i) => `<circle class="pv-fe" cx="${x}" cy="${351 + (i % 3) * 5}" r="1.4"/>`).join("") + [70, 180, 290, 396].map((x) => `<circle class="pv-zn" cx="${x}" cy="360" r="1.3"/>`).join("");
  const ckV = ["il1", "tnf", "il6", "il1", "tnf", "il6", "il1"].map((k, i) => cytokine(k, 30 + i * 56, 356 + (i % 2 ? -2 : 2), 0.8, `v${i}`)).join("");
  // S1: OVLT — capilar fenestrat care urcă din vas, celula endotelială cu COX-2, PGE2, neuronul preoptic cu EP3, termostatul
  const s1 = { x: 14, y: 230, w: 128, h: 108 };
  const cap1 = `<rect class="pn-bg" x="${s1.x}" y="${s1.y}" width="${s1.w}" height="${s1.h}" rx="6"/><rect class="pv-l" x="40" y="${s1.y}" width="12" height="${VY0 - s1.y}"/><path class="pv-w" d="M39 ${s1.y}V${VY0 - 1.5}M53 ${s1.y}V${VY0 - 1.5}"/>` + [256, 280, 304, 328].map((y) => `<path class="pv-fen" d="M53 ${y}v3"/>`).join("");
  const cox = `<path class="cox2" d="${smooth(lumpy(58, 292, 4.4, 9, 0.16, 7), true)}"/>`;
  const neu = { c: [96, 268], r: 10 };
  const dend = [[0.9, -0.6, 18], [1, 0.3, 16], [-0.2, -1, 16], [0.3, 1, 14]].map(([dx, dy, l]) => `<path class="pn-d" d="${poly(ribbon(sampleSmooth([[neu.c[0] + dx * neu.r, neu.c[1] + dy * neu.r], [neu.c[0] + dx * (neu.r + l * 0.5) + 3, neu.c[1] + dy * (neu.r + l * 0.5)], [neu.c[0] + dx * (neu.r + l), neu.c[1] + dy * (neu.r + l)]], false, 4), (t) => 2.2 * (1 - t) + 0.4), true)}"/>`).join("");
  const neuron = `<g class="pn-n">${dend}<path class="pn-s" d="${smooth(lumpy(neu.c[0], neu.c[1], neu.r, 10, 0.12, 4), true)}"/><circle class="pn-nu" cx="${neu.c[0] + 1}" cy="${neu.c[1]}" r="4"/></g>` + [[-0.95, 0.3], [-0.8, 0.6], [-0.95, -0.1]].map(([dx, dy]) => `<path class="ep3" d="M${f1(neu.c[0] + dx * (neu.r + 0.5))} ${f1(neu.c[1] + dy * (neu.r + 0.5))}l-3 0m0 -2l0 4"/>`).join("");
  const pges = [[66, 286], [74, 280], [82, 276]].map(([x, y]) => pge2(x, y, 0.5, "")).join("");
  const camp = `<g class="camp"><path d="${poly(Array.from({ length: 5 }, (_, i) => [98 + Math.cos(i * 1.2566 - 1.57) * 2.6, 266 + Math.sin(i * 1.2566 - 1.57) * 2.6]), true)}"/><circle cx="101.6" cy="268.6" r="1.1"/></g>`;
  const dial = { c: [114, 314], r: 17 };
  let dialSvg = `<circle class="dl-body" cx="${dial.c[0]}" cy="${dial.c[1]}" r="${dial.r + 2}"/><circle class="dl-face" cx="${dial.c[0]}" cy="${dial.c[1]}" r="${dial.r}"/>`;
  [36, 37, 38, 39, 40].forEach((T, i) => { const a = (-210 + i * 60) * Math.PI / 180; dialSvg += `<path class="dl-tick big" d="M${f1(dial.c[0] + Math.cos(a) * (dial.r - 4))} ${f1(dial.c[1] + Math.sin(a) * (dial.r - 4))}L${f1(dial.c[0] + Math.cos(a) * (dial.r - 1))} ${f1(dial.c[1] + Math.sin(a) * (dial.r - 1))}"/>`; if (T === 37 || T === 39) dialSvg += `<text class="dl-n" x="${f1(dial.c[0] + Math.cos(a) * (dial.r - 7.6))}" y="${f1(dial.c[1] + Math.sin(a) * (dial.r - 7.6) + 2)}" text-anchor="middle" data-ui>${T}</text>`; });
  const needle = { cx: dial.c[0], cy: dial.c[1], len: dial.r - 3 };
  const S1 = cap1 + cox + neuron;
  // S2: ficatul — sinusoid vertical care se varsă în vas, hepatocite, celula Kupffer; PCR, feritina
  const s2 = { x: 146, y: 230, w: 128, h: 108 };
  let hepS = `<rect class="pl-bg" x="${s2.x}" y="${s2.y}" width="${s2.w}" height="${s2.h}" rx="6"/><rect class="pv-l s" x="204" y="${s2.y}" width="14" height="${VY0 - s2.y}"/>`;
  for (let row = 0; row < 5; row++) [[150, 202], [220, 270]].forEach(([x0, x1], side) => { const y0 = s2.y + 3 + row * 22; hepS += `<path class="ph" d="${poly([[x0, y0], [x1, y0 + 1], [x1 - 1, y0 + 20], [x0 + 1, y0 + 19]], true)}"/><circle class="phn" cx="${(x0 + x1) / 2 + (side ? -6 : 6)}" cy="${y0 + 10}" r="3.6"/>`; });
  hepS += `<path class="pv-w" d="M203.5 ${s2.y}V${VY0 - 1.5}M218.5 ${s2.y}V${VY0 - 1.5}"/><path class="kup" d="${smooth(lumpy(211, 300, 5.4, 9, 0.18, 3), true)}"/>`;
  const ferr = [[160, 246], [176, 262], [188, 290], [232, 252], [250, 280], [238, 312], [166, 320], [210, 300], [214, 296], [208, 304]].map(([x, y]) => `<circle class="ferr" cx="${x}" cy="${y}" r="1.6"/>`).join("");
  const crps = [[211, 248], [210, 270], [212, 322], [211, 336]].map(([x, y]) => crpG(x, y, 0.9)).join("");
  const S2 = hepS;
  // S3: măduva — trabecule osoase, celule hematopoietice, un sinus medular care se varsă în vas; neutrofile care ies
  const s3 = { x: 278, y: 230, w: 128, h: 108 };
  let mar = `<rect class="pm-bg" x="${s3.x}" y="${s3.y}" width="${s3.w}" height="${s3.h}" rx="6"/>`;
  mar += `<path class="pbone" d="${smooth([[278, 240], [300, 236], [320, 248], [316, 262], [296, 258], [280, 266]], true)}"/><path class="pbone" d="${smooth([[372, 232], [404, 236], [406, 262], [390, 270], [380, 254]], true)}"/>`;
  const RM = rng(9); for (let i = 0, t = 0; i < 46 && t < 600; t++) { const x = 284 + RM() * 118, y = 268 + RM() * 64; if (x > 332 && x < 352) continue; const k = RM(); mar += k < 0.6 ? `<g class="pm-c"><circle cx="${f1(x)}" cy="${f1(y)}" r="4.6"/><circle class="n" cx="${f1(x)}" cy="${f1(y)}" r="${k < 0.3 ? 3.4 : 2.6}"/></g>` : `<circle class="pm-f" cx="${f1(x)}" cy="${f1(y)}" r="${f1(3 + RM() * 2)}"/>`; i++; }
  mar += `<g class="pm-mk"><path d="${smooth(lumpy(300, 300, 9, 12, 0.14, 7), true)}"/><path class="n" d="${smooth(lumpy(300, 300, 5, 9, 0.3, 8), true)}"/></g>`;
  mar += `<rect class="pv-l s" x="334" y="262" width="16" height="${VY0 - 262}"/><path class="pv-w" d="M333.5 262V${VY0 - 1.5}M350.5 262V${VY0 - 1.5}"/>`;
  const mob = neut(342, 288, 6) + neut(342, 314, 6) + neut(342, 336, 6);
  const S3 = mar;
  // S4: endoteliul — molecule de adeziune, neutrofil aderat și ieșit, gradientul de IL-8, trombocit cu tromboxan, PAF, PGE2
  const s4 = { x: 14, y: 372, w: 128, h: 112 };
  let endo = `<rect class="pn-bg2" x="${s4.x}" y="${s4.y}" width="${s4.w}" height="${s4.h}" rx="6"/>`;
  const adh = [30, 38, 46, 54, 62, 70, 78].map((x, i) => i % 2 ? `<path class="sel" d="M${x} ${VY1}L${x} ${VY1 - 3.4}"/><circle class="sel-h" cx="${x}" cy="${VY1 - 4.4}" r="1.2"/>` : `<path class="icam" d="M${x} ${VY1}L${x} ${VY1 - 2.6}"/>`).join("");
  const ntOut = neut(46, VY1 - 6, 7, 0, 1.4) + neut(82, VY1 + 2, 7, 1.57, 1.5) + neut(98, 402, 7, 0.9, 1.25);
  const il8 = [[108, 420], [112, 432], [104, 440], [116, 446], [96, 428], [120, 456], [110, 454]].map(([x, y]) => `<circle class="chk" cx="${x}" cy="${y}" r="1.3"/>`).join("") + `<path class="mac-b" d="${smooth(lumpy(118, 466, 11, 12, 0.14, 3), true)}"/><path class="mac-nuc" d="${smooth(lumpy(116, 467, 5, 9, 0.2, 5), true)}"/>`;
  const plt = `<ellipse class="plt" cx="26" cy="356" rx="5.4" ry="2.4"/><circle class="plt-g" cx="25" cy="355.6" r=".8"/><circle class="plt-g" cx="28" cy="356.4" r=".8"/>` + txa2(32, 392) + paf(34, 418) + pge2(26, 444, 0.62, "");
  const S4 = endo;
  // S5: apărarea specifică și nespecifică — limfocit B → plasmocit cu anticorpi, limfocit T care se divide, neutrofil care fagocitează
  const s5 = { x: 146, y: 372, w: 128, h: 112 };
  let def = `<rect class="pn-bg2" x="${s5.x}" y="${s5.y}" width="${s5.w}" height="${s5.h}" rx="6"/>`;
  const bcell = lymphC(166, 398, 9, "b") + [0, 1, 2, 3, 4].map((k) => { const a = -1.6 + k * 0.8; return antib(166 + Math.cos(a) * 10.4, 398 + Math.sin(a) * 10.4, a, 0.9); }).join("");
  const plas = `<g class="pc-pl"><ellipse class="c" cx="200" cy="400" rx="13" ry="9.5"/><ellipse class="hof" cx="196" cy="400" rx="3.4" ry="4.6"/><circle class="n" cx="207" cy="400" r="5.2"/></g>` + [[222, 390, 0.4], [228, 402, 0], [220, 414, -0.5], [234, 394, 0.2], [236, 410, -0.2]].map(([x, y, a]) => antib(x, y, a, 1.1)).join("");
  const tcell = lymphC(168, 444, 8.5, "t") + lymphC(186, 456, 7.5, "t") + `<path class="pc-div" d="M175 449L179 452"/>`;
  const phago = neut(236, 452, 12) + `<rect class="pc-bac" x="244" y="442" width="13" height="6.4" rx="3.2"/><circle class="c3b" cx="246" cy="441" r="1.2"/><circle class="c3b" cx="255" cy="449" r="1.2"/><path class="pc-pseudo" d="M244 438Q254 430 261 442"/>`;
  const S5 = def;
  // S6: interferonul — celula infectată (virioni) eliberează IFN, celula vecină intră în starea antivirală
  const s6 = { x: 278, y: 372, w: 128, h: 112 };
  let iv = `<rect class="pn-bg2" x="${s6.x}" y="${s6.y}" width="${s6.w}" height="${s6.h}" rx="6"/>`;
  iv += `<path class="ep-c" d="${poly([[286, 400], [334, 398], [336, 470], [288, 472]], true)}"/><circle class="ep-n" cx="310" cy="440" r="8"/><path class="ep-c" d="${poly([[340, 398], [398, 400], [396, 472], [338, 470]], true)}"/><circle class="ep-n" cx="368" cy="440" r="8"/>`;
  const vir = [[300, 412], [318, 418], [296, 456], [322, 462], [306, 424]].map(([x, y]) => virion(x, y)).join("");
  const ifns = [[330, 420], [338, 432], [346, 416], [352, 446]].map(([x, y]) => ifn(x, y)).join("");
  const isg = [[352, 414], [384, 420], [358, 462], [386, 458], [370, 408], [378, 470]].map(([x, y]) => `<circle class="isg" cx="${x}" cy="${y}" r="1.6"/>`).join("") + `<circle class="isgh" cx="368" cy="440" r="11"/>`;
  const S6 = iv;

  const frames = `<rect class="pa-card" x="${cA.x}" y="${cA.y}" width="${cA.w}" height="${cA.h}" rx="10"/><rect class="pa-card" x="${cB.x}" y="${cB.y}" width="${cB.w}" height="${cB.h}" rx="10"/>`;
  const frameLine = `<rect class="pa-cardl" x="${cA.x}" y="${cA.y}" width="${cA.w}" height="${cA.h}" rx="10"/>`;

  return {
    W, H, needle,
    defs: `<clipPath id="__U__-cB"><rect x="${cB.x}" y="${cB.y}" width="${cB.w}" height="${cB.h}" rx="10"/></clipPath><clipPath id="__U__-cA"><rect x="${cA.x}" y="${cA.y}" width="${cA.w}" height="${cA.h}" rx="10"/></clipPath>`,
    L: {
      frames, panelA, frameLine,
      vessel, fe, ckV, S1, S2, S3, S4, S5, S6,
      cox, pges, camp, dial: dialSvg, ferr, crps, mob, adh, ntOut, il8, plt, bcell, plas, tcell, phago, vir, ifns, isg,
    },
    hits: {
      lps: { cx: 136, cy: 44, r: 20 }, cd14: { cx: 180, cy: 82, r: 12 }, tlr4: { cx: tx, cy: MY - 24, r: 22 }, myd: { cx: tx + 18, cy: MY + 34, r: 18 }, nfkb: { cx: 262, cy: 180, r: 18 }, ck: { cx: 334, cy: 74, r: 22 }, fag: { cx: 72, cy: 158, r: 22 }, tlr2: { cx: 380, cy: 50, r: 26 },
      ovlt: { x: 36, y: 250, w: 40, h: 60 }, poa: { cx: 96, cy: 268, r: 16 }, dial: { cx: dial.c[0], cy: dial.c[1], r: 18 }, liv: { x: 148, y: 232, w: 124, h: 104 }, mar: { x: 280, y: 232, w: 124, h: 104 },
      lip: { x: 16, y: 374, w: 52, h: 108 }, adh: { x: 70, y: 352, w: 70, h: 130 }, per: { x: 148, y: 374, w: 92, h: 108 }, fgc: { cx: 240, cy: 452, r: 20 }, ifn: { x: 280, y: 374, w: 124, h: 108 },
    },
    badges: {
      lps: [118, 22], cd14: [196, 66], tlr4: [262, 58], myd: [222, 152], nfkb: [218, 180], ck: [290, 46], fag: [40, 140], tlr2: [404, 130],
      ovlt: [26, 242], poa: [126, 252], dial: [134, 326], liv: [160, 242], mar: [396, 324], lip: [58, 476], adh: [132, 384], per: [158, 476], fgc: [262, 476], ifn: [394, 476],
    },
  };
}

export function preview(state = {}) {
  const A = build(), L = A.L, s = (x) => x.replaceAll("__U__", "pv");
  const st = state.st ?? 4;
  return { viewBox: `0 0 ${W} ${H}`, svg: s(`<defs>${A.defs}</defs><g class="pyx" data-st="${st}">${L.frames}${L.panelA}${L.frameLine}${L.S1}${L.S2}${L.S3}${L.S4}${L.S5}${L.S6}${L.vessel}<g class="py-fe">${L.fe}</g><g class="py-ckv">${L.ckV}</g><g class="py-c3">${L.cox}${L.pges}${L.camp}</g>${L.dial}<g class="py-c4">${L.ferr}${L.crps}${L.mob}${L.adh}${L.ntOut}${L.il8}${L.plt}${L.bcell}${L.plas}${L.tcell}${L.phago}${L.ifns}${L.isg}</g>${L.vir}</g>`) };
}
