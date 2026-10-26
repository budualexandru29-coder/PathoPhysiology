// Î22: reacțiile inflamatorii locale și generale (de fază acută) și rolul complementului. Patru panouri:
//  A. reacția locală: un mastocit cu IgE pe receptorii FcεRI, antigenul care le leagă încrucișat, intrarea Ca²⁺, degranularea
//     (histamina), o venulă care se dilată și lasă să iasă plasmă, o terminație nervoasă liberă (nociceptor); jos, membrana cu
//     fosfolipide, fosfolipaza A2, acidul arahidonic și derivații lui (prostaglandina, leucotriena, PAF);
//  B. complementul pe peretele unei bacterii Gram-negative: căile clasică (C1q pe IgG), a lectinei (MBL pe manoză) și
//     alternativă (C3bBb), C3b depus (opsonizare), anafilatoxinele C3a și C5a, complexul de atac membranar (C5b–C9), un neutrofil;
//  C. reacțiile generale: ficatul (hepatocite care secretă proteine de fază acută în sinusoid), frotiul de sânge (leucocitoza,
//     devierea la stânga), creierul (hipotalamusul: febra; oboseala, somnolența);
//  D. evoluția în timp: proteinele de fază acută (scară logaritmică) și leucocitele, curbe-exemplu.
// Moleculele (IgE, complementul, citokinele, PCR) sunt desenate mult mai mari decât sunt, ca să se vadă.
import { smooth, poly, lumpy, rng, sampleSmooth, offset } from "./lib/geo.mjs";
import { organ } from "./lib/an.mjs";
import { cytokine, pge2 } from "./fever.mjs";
import { brainMedSvg } from "./parts/brain-med.mjs";

export const W = 420, H = 480;
const P2 = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
const f1 = (v) => (+v).toFixed(1);
const rot = (x, y, a) => [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)];
const inPoly = (pt, pts) => { let c = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xi, yi] = pts[i], [xj, yj] = pts[j]; if ((yi > pt[1]) !== (yj > pt[1]) && pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi) c = !c; } return c; };

/* ---------- molecule ---------- */
// anticorp (Y): două brațe Fab și coada Fc; `a` = direcția spre care sunt brațele
function antibody(x, y, a, s = 1, cls = "") {
  const p = (u, v) => { const q = rot(u * s, v * s, a); return [x + q[0], y + q[1]]; };
  const stem = `M${P2(p(-7, 0))}L${P2(p(0, 0))}`, arms = `M${P2(p(0, 0))}L${P2(p(5, -4))}M${P2(p(0, 0))}L${P2(p(5, 4))}`;
  return `<g class="ap-ab ${cls}"><path class="fc" d="${stem}"/><path class="fab" d="${arms}"/><circle class="tip" cx="${f1(p(5.6, -4.4)[0])}" cy="${f1(p(5.6, -4.4)[1])}" r="${f1(1.1 * s)}"/><circle class="tip" cx="${f1(p(5.6, 4.4)[0])}" cy="${f1(p(5.6, 4.4)[1])}" r="${f1(1.1 * s)}"/></g>`;
}
// „buchet de lalele”: C1q sau MBL (6 brațe cu capete globulare pe o tijă comună)
function bouquet(x, y, cls, s = 1) {
  let d = "", heads = "";
  for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + (i - 2.5) * 0.36, tip = [x + Math.cos(a) * 10 * s, y + 8 * s + Math.sin(a) * 10 * s]; d += `M${P2([x, y - 2 * s])}Q${P2([x + Math.cos(a) * 4 * s, y + 4 * s])} ${P2(tip)}`; heads += `<circle cx="${f1(tip[0])}" cy="${f1(tip[1])}" r="${f1(1.9 * s)}"/>`; }
  return `<g class="ap-bq ${cls}"><path d="M${P2([x, y - 9 * s])}L${P2([x, y - 2 * s])}${d}"/>${heads}</g>`;
}
// proteina C reactivă: pentamer (cinci protomeri în inel)
const crp = (x, y, s = 1, cls = "") => `<g class="ap-crp ${cls}">${[0, 1, 2, 3, 4].map((k) => { const a = -Math.PI / 2 + k * 2 * Math.PI / 5; return `<circle cx="${f1(x + Math.cos(a) * 2.6 * s)}" cy="${f1(y + Math.sin(a) * 2.6 * s)}" r="${f1(1.7 * s)}"/>`; }).join("")}</g>`;
// fibrinogenul: bastonaș cu un nodul central și doi nodului terminali
const fbg = (x, y, a, cls = "") => { const p = (u) => [x + Math.cos(a) * u, y + Math.sin(a) * u]; return `<g class="ap-fbg ${cls}"><path d="M${P2(p(-7))}L${P2(p(7))}"/><circle cx="${f1(p(-7)[0])}" cy="${f1(p(-7)[1])}" r="1.8"/><circle cx="${f1(x)}" cy="${f1(y)}" r="1.5"/><circle cx="${f1(p(7)[0])}" cy="${f1(p(7)[1])}" r="1.8"/></g>`; };
// fragmentele mici ale complementului: C3a (romb violet), C5a (romb verde)
const frag = (x, y, k) => `<path class="ap-fr ${k}" d="M${f1(x)} ${f1(y - 2.4)}L${f1(x + 2.4)} ${f1(y)}L${f1(x)} ${f1(y + 2.4)}L${f1(x - 2.4)} ${f1(y)}Z"/>`;

export function build() {
  const R = rng(3);
  /* ======================= A. reacția locală: mastocitul ======================= */
  const cA = { x: 10, y: 10, w: 198, h: 230 };
  let coll = ""; for (let i = 0; i < 8; i++) { const y0 = 18 + i * 22; const pts = []; for (let x = 4; x <= 212; x += 16) pts.push([x, y0 + Math.sin(x / 21 + i) * 4]); coll += `<path class="ap-coll" d="${smooth(pts)}"/>`; }
  const M = [84, 92], mr = 50;
  const mShape = lumpy(M[0], M[1], mr, 22, 0.06, 7), mD = smooth(mShape, true);
  const mNuc = `<path class="ap-mnuc" d="${smooth(lumpy(M[0] - 6, M[1] + 6, 13, 10, 0.08, 3).map(([x, y]) => [x, M[1] + 6 + (y - M[1] - 6) * 0.82]), true)}"/>`;
  let gr = ""; for (let i = 0, t = 0; i < 70 && t < 900; t++) { const a = R() * 6.28, rr = Math.sqrt(R()) * (mr - 6), x = M[0] + Math.cos(a) * rr, y = M[1] + Math.sin(a) * rr; if (Math.hypot(x - (M[0] - 6), (y - (M[1] + 6)) / 0.82) < 16) continue; if (x > M[0] + mr * 0.62 && Math.abs(y - M[1]) < 26) continue; gr += `<circle class="ap-gr" cx="${f1(x)}" cy="${f1(y)}" r="${f1(2.4 + R() * 0.9)}"/>`; i++; }
  // receptorii FcεRI cu IgE pe arcul de sus-stânga; două perechi legate încrucișat de antigen
  const onCell = (deg, out = 0) => { const a = deg * Math.PI / 180; const i = Math.round(((a % 6.283) + 6.283) % 6.283 / 6.283 * mShape.length) % mShape.length; const p = mShape[i]; const n = [p[0] - M[0], p[1] - M[1]], l = Math.hypot(...n); return [[p[0] + n[0] / l * out, p[1] + n[1] / l * out], Math.atan2(n[1], n[0])]; };
  let ige = "", xlink = "";
  [196, 208, 222, 232, 246, 258, 272, 284].forEach((deg, i) => { const [p, a] = onCell(deg, 7); ige += antibody(p[0], p[1], a, 1, "e") + `<path class="ap-fcr" d="M${P2(onCell(deg, -1)[0])}L${P2(onCell(deg, 3)[0])}"/>`; void i; });
  [[222, 232], [258, 272]].forEach(([d1, d2]) => { const [p1] = onCell(d1, 14), [p2] = onCell(d2, 14); const m = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2]; const n = [m[0] - M[0], m[1] - M[1]], l = Math.hypot(...n); const c = [m[0] + n[0] / l * 2.6, m[1] + n[1] / l * 2.6]; xlink += `<path class="ap-ag" d="${smooth(lumpy(c[0], c[1], 4.6, 8, 0.2, Math.round(d1)), true)}"/>`; });
  // canalul de Ca²⁺ (stânga) și ionii care intră
  const [chP, chA] = onCell(176, 0);
  const chan = `<g transform="translate(${P2(chP)}) rotate(${f1(chA * 57.3)})"><rect class="ap-ch" x="-4" y="-5.2" width="8" height="3.6" rx="1.2"/><rect class="ap-ch" x="-4" y="1.6" width="8" height="3.6" rx="1.2"/></g>`;
  const ca = [[-14, -3], [-9, 3], [6, -1], [12, 2]].map(([u, v]) => { const q = rot(u, v, chA); return `<circle class="ap-ca" cx="${f1(chP[0] + q[0])}" cy="${f1(chP[1] + q[1])}" r="1.5"/>`; }).join("");
  // degranularea (dreapta): granule care fuzionează cu membrana și se deschid spre exterior; histamina care iese
  let exo = ""; [-24, -8, 8, 22].forEach((deg) => { const [p, a] = onCell(deg, -2); const q = rot(0, 0, a); void q; exo += `<path class="ap-exo" d="M${P2([p[0] + Math.cos(a + 1.4) * 3.2, p[1] + Math.sin(a + 1.4) * 3.2])}A3.6 3.6 0 1 0 ${P2([p[0] + Math.cos(a - 1.4) * 3.2, p[1] + Math.sin(a - 1.4) * 3.2])}"/>`; });
  let hist = ""; for (let i = 0; i < 30; i++) { const a = (R() - 0.5) * 1.2, rr = mr + 6 + R() * 50; hist += `<circle class="ap-hi h${i % 3}" cx="${f1(M[0] + Math.cos(a) * rr)}" cy="${f1(M[1] + Math.sin(a) * rr)}" r="1.2"/>`; }
  // venula din dreapta (verticală), care se dilată; exsudatul (plasmă cu proteine) iese printre celulele endoteliale
  const V = { x: 178, y0: 14, y1: 158, r: 11 };
  const venD = `M${V.x - V.r} ${V.y0}V${V.y1}M${V.x + V.r} ${V.y0}V${V.y1}`;
  let rbc = ""; for (let i = 0; i < 6; i++) rbc += `<ellipse class="rbc" cx="${f1(V.x + (i % 2 ? 2.5 : -2.5))}" cy="${f1(V.y0 + 14 + i * 26)}" rx="5.2" ry="${i % 3 ? 2.2 : 4.6}"/>`;
  let endo = ""; for (let y = V.y0 + 6; y < V.y1; y += 22) endo += `<ellipse class="ap-enuc" cx="${V.x - V.r + 1.2}" cy="${y}" rx="1.1" ry="4"/><ellipse class="ap-enuc" cx="${V.x + V.r - 1.2}" cy="${y + 11}" rx="1.1" ry="4"/>`;
  let exu = ""; for (let i = 0; i < 20; i++) { const y = V.y0 + 10 + R() * (V.y1 - V.y0 - 20), sg = R() < 0.6 ? -1 : 1; exu += `<circle class="ap-exu" cx="${f1(V.x + sg * (V.r + 3 + R() * 16))}" cy="${f1(y)}" r="1.1"/>`; }
  const venule = `<g class="ap-ven" style="transform-origin:${V.x}px 90px"><rect class="ap-vl" x="${V.x - V.r}" y="${V.y0 - 10}" width="${V.r * 2}" height="${V.y1 - V.y0 + 10}"/>${rbc}<path class="ap-vw" d="${venD}"/>${endo}</g>`;
  // terminația nervoasă liberă (nociceptor), sus, cu ramificații
  const nerve = [[[214, 22], [196, 26], [160, 30], [140, 26]], [[160, 30], [146, 40], [132, 44]], [[188, 25], [168, 14], [150, 12]]];
  const nerveSvg = nerve.map((p) => `<path class="ap-nv" d="${smooth(p)}"/>`).join("") + nerve.map((p) => `<circle class="ap-nvt" cx="${p[p.length - 1][0]}" cy="${p[p.length - 1][1]}" r="1.8"/>`).join("");
  const nerveAP = nerve.map((p) => `<path class="ap-nap" d="${smooth(p.slice().reverse())}"/>`).join("");
  // banda de jos: membrana cu fosfolipide, PLA2, acidul arahidonic, PGE2, leucotriena, PAF
  const mY = 196;
  let bil = ""; for (let x = 18; x <= 106; x += 7) { bil += `<circle class="ap-ph" cx="${x}" cy="${mY - 9}" r="2.3"/><path class="ap-tl" d="M${x - 1} ${mY - 7}V${mY - 1}M${x + 1} ${mY - 7}V${mY - 1}"/><circle class="ap-ph" cx="${x}" cy="${mY + 9}" r="2.3"/><path class="ap-tl" d="M${x - 1} ${mY + 7}V${mY + 1}M${x + 1} ${mY + 7}V${mY + 1}"/>`; }
  const pla2 = `<path class="ap-pla" d="${smooth(lumpy(74, mY - 19, 6.4, 9, 0.18, 5), true)}"/><path class="ap-plas" d="M71 ${mY - 15}Q74 ${mY - 12} 77 ${mY - 15}"/>`;
  // acidul arahidonic: 20 de atomi de carbon, 4 duble legături cis, care îndoaie lanțul; capătul –COOH
  const aaPts = []; { let x = 86, y = mY - 26, a = -0.3; for (let i = 0; i < 20; i++) { aaPts.push([x, y]); const turn = [4, 7, 10, 13].includes(i) ? 0.55 : 0; a += turn; x += Math.cos(a + (i % 2 ? 0.5 : -0.5)) * 3.1; y += Math.sin(a + (i % 2 ? 0.5 : -0.5)) * 3.1; } }
  const aa = `<g class="ap-aa"><path d="${poly(aaPts)}"/>${[4, 7, 10, 13].map((i) => { const a = aaPts[i], b = aaPts[i + 1], n = [-(b[1] - a[1]), b[0] - a[0]], l = Math.hypot(...n); return `<path d="M${P2([a[0] + n[0] / l * 1.4, a[1] + n[1] / l * 1.4])}L${P2([b[0] + n[0] / l * 1.4, b[1] + n[1] / l * 1.4])}"/>`; }).join("")}<circle class="o" cx="${f1(aaPts[0][0] - 1.6)}" cy="${f1(aaPts[0][1] - 1)}" r="1.2"/><circle class="o" cx="${f1(aaPts[0][0] - 1)}" cy="${f1(aaPts[0][1] + 1.8)}" r="1.2"/></g>`;
  const cox = `<path class="ap-enz cox" d="${smooth(lumpy(146, 180, 5.2, 9, 0.16, 8), true)}"/>`, lox = `<path class="ap-enz lox" d="${smooth(lumpy(146, 214, 5.2, 9, 0.16, 9), true)}"/>`;
  const pg = pge2(170, 180, 0.9, "ap-pg");
  // leucotriena B4: lanț cu trei duble legături conjugate și două grupări –OH (schematic)
  const ltPts = Array.from({ length: 12 }, (_, i) => [160 + i * 3, 214 + (i % 2 ? -1.6 : 0)]);
  const lt = `<g class="ap-lt"><path d="${poly(ltPts)}"/><path d="M${P2([ltPts[3][0], ltPts[3][1] + 1.4])}L${P2([ltPts[4][0], ltPts[4][1] + 1.4])}M${P2([ltPts[5][0], ltPts[5][1] + 1.4])}L${P2([ltPts[6][0], ltPts[6][1] + 1.4])}M${P2([ltPts[7][0], ltPts[7][1] + 1.4])}L${P2([ltPts[8][0], ltPts[8][1] + 1.4])}"/><circle class="o" cx="${f1(ltPts[2][0])}" cy="${f1(ltPts[2][1] - 3)}" r="1.1"/><circle class="o" cx="${f1(ltPts[9][0])}" cy="${f1(ltPts[9][1] - 3)}" r="1.1"/></g>`;
  // PAF: un fosfolipid cu acetil în poziția 2 (capul cu colină, o coadă lungă, una scurtă)
  const paf = `<g class="ap-paf"><circle class="h" cx="128" cy="${mY + 22}" r="2.6"/><path d="M128 ${mY + 25}V${mY + 33}M131 ${mY + 25}L134 ${mY + 28}"/><circle class="h2" cx="133" cy="${mY + 18}" r="1.4"/></g>`;
  const aaPath = `<path class="ap-arr" d="M118 ${mY - 18}Q130 ${mY - 18} 138 ${mY - 12}M118 ${mY - 14}Q130 ${mY + 4} 138 ${mY + 12}M118 ${mY - 12}Q122 ${mY + 4} 126 ${mY + 14}"/>`;
  const strip = `<rect class="ap-strip" x="14" y="${mY - 32}" width="190" height="${mY - 158 + 46}" rx="6"/>${bil}${pla2}${aa}${aaPath}${cox}${lox}${pg}${lt}${paf}`;
  const panelA = `<g clip-path="url(#__U__-cA)"><rect class="ap-ct" x="${cA.x}" y="${cA.y}" width="${cA.w}" height="${cA.h}"/>${coll}<g class="ap-exug">${exu}</g>${venule}<g class="ap-histg">${hist}</g>${organ(mD, "ap-mast")}${gr}${mNuc}<g class="ap-exog">${exo}</g>${ige}<g class="ap-xl">${xlink}</g>${chan}<g class="ap-cag">${ca}</g>${nerveSvg}<g class="ap-napg">${nerveAP}</g><g class="ap-stripg">${strip}</g></g>`;

  /* ======================= B. complementul pe peretele bacterian ======================= */
  const cB = { x: 214, y: 10, w: 198, h: 230 };
  const OM = 168, PGy = 182, IM = 196;                        // membrana externă, peptidoglicanul, membrana internă
  let env = `<rect class="ap-plasma" x="${cB.x}" y="${cB.y}" width="${cB.w}" height="${OM - 6 - cB.y}"/><rect class="ap-peri" x="${cB.x}" y="${OM + 6}" width="${cB.w}" height="${IM - OM - 12}"/><rect class="ap-cyto" x="${cB.x}" y="${IM + 6}" width="${cB.w}" height="${cB.y + cB.h - IM - 6}"/>`;
  const bilayer = (y, x0, x1) => { let s = ""; for (let x = x0; x <= x1; x += 5) s += `<circle class="ap-ph b" cx="${x}" cy="${y - 4}" r="1.9"/><circle class="ap-ph b" cx="${x}" cy="${y + 4}" r="1.9"/><path class="ap-tl b" d="M${x} ${y - 2.2}V${y + 2.2}"/>`; return s; };
  const gapMAC = [366, 384];
  env += bilayer(OM, cB.x + 2, gapMAC[0]) + bilayer(OM, gapMAC[1], cB.x + cB.w) + bilayer(IM, cB.x + 2, cB.x + cB.w);
  let pgm = ""; for (let x = cB.x; x < cB.x + cB.w; x += 8) pgm += `<path class="ap-pgn" d="M${x} ${PGy - 2}L${x + 8} ${PGy - 2}M${x} ${PGy + 2}L${x + 8} ${PGy + 2}M${x + 4} ${PGy - 2}L${x + 4} ${PGy + 2}"/>`;
  env += pgm;
  // LPS: antigenul O (lanțuri de zaharuri) care iese din membrana externă
  let lps = ""; for (let x = cB.x + 6; x < cB.x + cB.w; x += 9) { if (x > gapMAC[0] - 6 && x < gapMAC[1] + 6) continue; const n = 3 + (Math.round(x) % 3); let s = `M${x} ${OM - 6}`; for (let k = 1; k <= n; k++) s += `L${x + (k % 2 ? 1.5 : -1.5)} ${OM - 6 - k * 3.4}`; lps += `<path class="ap-lps" d="${s}"/>`; }
  let rib = ""; for (let i = 0; i < 26; i++) rib += `<circle class="ap-rib" cx="${f1(cB.x + 4 + R() * (cB.w - 8))}" cy="${f1(IM + 12 + R() * 22)}" r="1.3"/>`;
  // calea clasică: două IgG pe antigene de suprafață, C1q pe porțiunile Fc
  const clas = antibody(232, OM - 22, Math.PI / 2, 1.3, "g") + antibody(244, OM - 22, Math.PI / 2, 1.3, "g") + bouquet(238, OM - 38, "c1q", 1);
  // calea lectinei: MBL pe resturile de manoză
  const man = [[276, OM - 9], [284, OM - 9], [292, OM - 9]].map(([x, y]) => `<path class="ap-man" d="M${x - 2.2} ${y}l1.1 -1.9h2.2l1.1 1.9l-1.1 1.9h-2.2Z"/>`).join("");
  const lec = man + bouquet(284, OM - 26, "mbl", 1);
  // calea alternativă: C3b legat covalent de suprafață, cu factorul Bb: convertaza C3bBb
  const alt = `<g class="ap-conv"><ellipse class="c3b" cx="322" cy="${OM - 10}" rx="4.2" ry="3.2"/><ellipse class="bb" cx="329" cy="${OM - 15}" rx="3.4" ry="2.8"/></g>`;
  // C3b depus pe suprafață (opsonizare) și fragmentele C3a, C5a eliberate
  const c3bDots = [222, 252, 262, 300, 310, 340, 350, 396, 404].map((x, i) => `<circle class="c3b" cx="${x}" cy="${f1(OM - 9 - (i % 2) * 2)}" r="1.8"/>`).join("");
  let frs = ""; for (let i = 0; i < 16; i++) { const x = 230 + R() * 170, y = 30 + R() * 100; frs += frag(x, y, i % 2 ? "c5a" : "c3a"); }
  // complexul de atac membranar: C5b, C6, C7, C8 și inelul de poli-C9, care face un por prin membrana externă
  const macX = (gapMAC[0] + gapMAC[1]) / 2;
  const mac = `<g class="ap-mac"><rect class="c9" x="${gapMAC[0] - 1}" y="${OM - 16}" width="4.6" height="26" rx="2"/><rect class="c9" x="${gapMAC[1] - 3.6}" y="${OM - 16}" width="4.6" height="26" rx="2"/><path class="c9r" d="M${gapMAC[0] + 1} ${OM - 16}Q${macX} ${OM - 21} ${gapMAC[1] - 1} ${OM - 16}"/><ellipse class="c5b" cx="${gapMAC[0] - 7}" cy="${OM - 15}" rx="4.4" ry="3.4"/><ellipse class="c678" cx="${gapMAC[0] - 9}" cy="${OM - 8}" rx="3.2" ry="2.4"/><ellipse class="c678" cx="${gapMAC[0] - 4}" cy="${OM - 6}" rx="2.6" ry="2.2"/></g>`;
  const ions = [[macX, OM - 26], [macX - 1.5, OM - 12], [macX + 1, OM - 2], [macX - 1, OM + 9], [macX + 1.5, OM + 16]].map(([x, y], i) => `<circle class="ap-ion ${i % 2 ? "na" : "ca"}" cx="${f1(x)}" cy="${f1(y)}" r="1.3"/>`).join("");
  // neutrofilul atras de C5a (chemotaxie), în colțul de sus
  const nt = lumpy(386, 30, 22, 14, 0.1, 6);
  const neut = `<g class="ap-nt">${organ(smooth([...nt.slice(0, 9), [356, 52], [350, 58], [362, 50], ...nt.slice(9)], true), "ap-ntc")}${[[382, 26], [392, 34], [380, 38]].map(([x, y]) => `<circle class="ap-ntn" cx="${x}" cy="${y}" r="4.4"/>`).join("")}<path class="ap-ntb" d="M382 26L392 34L380 38"/></g>`;
  const panelB = `<g clip-path="url(#__U__-cB)">${env}${lps}${rib}<g class="ap-cpath">${clas}${lec}${alt}${c3bDots}</g><g class="ap-frg">${frs}</g><g class="ap-macg">${mac}${ions}</g>${neut}</g>`;

  /* ======================= C. reacțiile generale: ficatul, sângele, creierul ======================= */
  const cC = { x: 10, y: 248, w: 198, h: 224 };
  // ficatul: o placă de hepatocite de-a lungul unui sinusoid (orizontal), cu endoteliu fenestrat
  const sY0 = 300, sY1 = 316;
  let hep = ""; const RH = rng(17);
  for (let row = 0; row < 2; row++) for (let i = 0; i < 8; i++) {
    const top = row === 0, x0 = cC.x + 4 + i * 25 + (top ? 0 : 12), y0 = top ? 262 : sY1 + 4, h = top ? sY0 - 4 - 262 : 34;
    const pts = [[x0, y0], [x0 + 24, y0 + 1], [x0 + 25, y0 + h], [x0 + 1, y0 + h - 1]];
    hep += `<path class="ap-hep" d="${poly(pts, true)}"/><circle class="ap-hepn" cx="${f1(x0 + 12 + (RH() - 0.5) * 4)}" cy="${f1(y0 + h / 2 + (RH() - 0.5) * 4)}" r="4.2"/><circle class="ap-hepl" cx="${f1(x0 + 12)}" cy="${f1(y0 + h / 2)}" r="1.1"/>`;
  }
  const sinus = `<rect class="ap-sin" x="${cC.x}" y="${sY0 - 4}" width="${cC.w}" height="${sY1 - sY0 + 8}"/>` + Array.from({ length: 10 }, (_, i) => `<path class="ap-send" d="M${cC.x + i * 21} ${sY0 - 2.6}h15M${cC.x + 9 + i * 21} ${sY1 + 2.6}h15"/>`).join("") + `<ellipse class="rbc" cx="40" cy="${(sY0 + sY1) / 2}" rx="5" ry="3.6"/><ellipse class="rbc" cx="150" cy="${(sY0 + sY1) / 2 + 1}" rx="5" ry="2.2"/>`;
  const il6 = [[70, 307], [110, 305], [176, 308]].map(([x, y], i) => cytokine(i === 1 ? "il1" : "il6", x, y, 0.75, `s${i}`)).join("");
  const crps = [[28, 304], [56, 309], [88, 304], [126, 310], [140, 303], [196, 306], [100, 312], [164, 310]].map(([x, y], i) => crp(x, y, 1, `k${i % 4}`)).join("");
  const fbgs = [[48, 303, 0.2], [118, 311, -0.3], [182, 312, 0.4]].map(([x, y, a], i) => fbg(x, y, a, `k${i}`)).join("");
  const liver = `<g clip-path="url(#__U__-cC)"><rect class="ap-livbg" x="${cC.x}" y="${cC.y}" width="${cC.w}" height="${360 - cC.y}"/>${hep}${sinus}<g class="ap-ckl">${il6}</g><g class="ap-crpg">${crps}</g><g class="ap-fbgg">${fbgs}</g></g>`;
  // frotiul de sânge: hematii și neutrofile; devierea la stânga = neutrofile nesegmentate și metamielocite
  const sm = { c: [62, 414], r: 46 };
  let smear = `<rect class="ap-smbg" x="${sm.c[0] - sm.r}" y="${sm.c[1] - sm.r}" width="${sm.r * 2}" height="${sm.r * 2}"/>`;
  const RS = rng(23); for (let i = 0; i < 34; i++) { const x = sm.c[0] + (RS() - 0.5) * 2 * sm.r, y = sm.c[1] + (RS() - 0.5) * 2 * sm.r; smear += `<circle class="ap-rbc" cx="${f1(x)}" cy="${f1(y)}" r="5.2"/><circle class="ap-rbcc" cx="${f1(x)}" cy="${f1(y)}" r="2"/>`; }
  const wbc = (x, y, kind, cls) => {
    let nuc = "";
    if (kind === "seg") nuc = `<path class="ap-wn" d="M${x - 4} ${y - 2}L${x - 1} ${y + 2}L${x + 3} ${y - 1}L${x + 4} ${y + 3}"/>` + [[x - 4, y - 2], [x - 0.6, y + 2.2], [x + 3, y - 1.2], [x + 4.2, y + 3.2]].map(([a, b]) => `<circle class="ap-wnl" cx="${f1(a)}" cy="${f1(b)}" r="2.1"/>`).join("");
    else if (kind === "band") nuc = `<path class="ap-wband" d="M${x - 4.5} ${y - 3}Q${x - 5} ${y + 4} ${x} ${y + 4}Q${x + 5} ${y + 4} ${x + 4.5} ${y - 3}"/>`;
    else nuc = `<path class="ap-wmeta" d="${smooth([[x - 4, y - 3], [x + 1, y - 4], [x + 4, y - 1], [x + 3, y + 3], [x - 2, y + 4], [x - 5, y + 1], [x - 2, y - 0.5]], true)}"/>`;
    return `<g class="ap-wbc ${cls}"><circle class="ap-wc" cx="${x}" cy="${y}" r="7.6"/>${nuc}</g>`;
  };
  smear += wbc(44, 398, "seg", "n0") + wbc(82, 432, "seg", "n0") + wbc(74, 392, "seg", "n1") + wbc(40, 432, "seg", "n1") + wbc(60, 416, "band", "ls") + wbc(90, 408, "band", "ls") + wbc(30, 414, "meta", "ls") + wbc(58, 444, "seg", "n1");
  const smearSvg = `<g clip-path="url(#__U__-sm)">${smear}</g><circle class="ap-lens" cx="${sm.c[0]}" cy="${sm.c[1]}" r="${sm.r}"/><circle class="ap-lens2" cx="${sm.c[0]}" cy="${sm.c[1]}" r="${sm.r - 3}"/>`;
  // creierul: fața medială, mică, cu hipotalamusul evidențiat
  const k = 3.9, bx = (x) => 160 + x * k, by = (y) => 420 + y * k;
  const BM = brainMedSvg(([x, y]) => [bx(x), by(y)], k);
  const brain = BM.brain + BM.sulci + BM.cc + BM.thal + BM.hypo + BM.stem + BM.cbl;
  const hypS = `<circle class="ap-hyp" cx="${f1(bx(0.7))}" cy="${f1(by(-1.1))}" r="3.2"/>`;
  const panelC = liver + `<path class="ap-sep" d="M${cC.x + 8} 364H${cC.x + cC.w - 8}"/>` + smearSvg + `<g class="ap-brain">${brain}</g>${hypS}`;

  /* ======================= D. evoluția în timp ======================= */
  const G1 = { x: 248, y: 268, w: 152, h: 78 }, G2 = { x: 248, y: 380, w: 152, h: 66 };
  const gx = (d) => G1.x + d / 7 * G1.w;
  const ly = (v) => G1.y + G1.h - (Math.log10(v) + 0.5) / 3.5 * G1.h;      // 0,32× … 1000×
  const crpC = [[0, 1], [0.25, 1.4], [0.5, 6], [1, 60], [1.5, 200], [2, 300], [2.5, 260], [3, 160], [4, 50], [5, 14], [6, 5], [7, 2.2]].map(([d, v]) => [gx(d), ly(v)]);
  const fibC = [[0, 1], [1, 1.2], [2, 1.8], [3, 2.4], [4, 2.7], [5, 2.6], [6, 2.2], [7, 1.8]].map(([d, v]) => [gx(d), ly(v)]);
  const albC = [[0, 1], [1, 0.95], [2, 0.86], [3, 0.78], [4, 0.74], [5, 0.74], [6, 0.78], [7, 0.82]].map(([d, v]) => [gx(d), ly(v)]);
  let ch1 = `<text class="ap-ti" x="222" y="${G1.y - 10}" data-ui>Proteinele de fază acută (× normal)</text>`
    + [1, 10, 100, 1000].map((v) => `<path class="ap-grid" d="M${G1.x} ${f1(ly(v))}H${G1.x + G1.w}"/><text class="ap-t" x="${G1.x - 4}" y="${f1(ly(v) + 2.6)}" text-anchor="end" data-ui>${v}</text>`).join("")
    + `<path class="ap-ax" d="M${G1.x} ${G1.y}V${G1.y + G1.h}H${G1.x + G1.w}"/>` + [0, 1, 2, 3, 4, 5, 6, 7].map((d) => `<text class="ap-t" x="${f1(gx(d))}" y="${G1.y + G1.h + 9}" text-anchor="middle" data-ui>${d}</text>`).join("")
    + `<path class="ap-cv crp" d="${smooth(crpC, false, 0.6)}"/><path class="ap-cv fib" d="${smooth(fibC, false, 0.6)}"/><path class="ap-cv alb" d="${smooth(albC, false, 0.6)}"/>`
    + `<text class="ap-lab crp" x="${f1(gx(2.3))}" y="${f1(ly(300) - 3)}" data-ui>PCR</text><text class="ap-lab fib" x="${f1(gx(3.4))}" y="${f1(ly(2.6) - 4)}" data-ui>fibrinogen</text><text class="ap-lab alb" x="${f1(gx(3.4))}" y="${f1(ly(0.74) + 9)}" data-ui>albumină</text>`;
  // leucocitele (×10⁹/L): banda de referință 4–10; aria închisă = formele tinere (devierea la stânga)
  const gx2 = (d) => G2.x + d / 7 * G2.w, wy = (v) => G2.y + G2.h - v / 20 * G2.h;
  const wbcC = [[0, 7], [0.3, 9], [0.7, 13], [1.2, 16], [2, 16.5], [3, 14], [4, 11], [5, 9], [6, 8], [7, 7.5]];
  const bandC = [[0, 0.3], [0.3, 0.8], [0.7, 2.4], [1.2, 3.6], [2, 3.4], [3, 2.2], [4, 1.2], [5, 0.6], [6, 0.4], [7, 0.3]];
  const area = (pts) => { const top = sampleSmooth(pts.map(([d, v]) => [gx2(d), wy(v)]), false, 8, 0.6); return poly([...top, [gx2(7), wy(0)], [gx2(0), wy(0)]], true); };
  let ch2 = `<text class="ap-ti" x="222" y="${G2.y - 10}" data-ui>Leucocitele (×10⁹/L)</text>`
    + `<rect class="ap-ref" x="${G2.x}" y="${f1(wy(10))}" width="${G2.w}" height="${f1(wy(4) - wy(10))}"/>`
    + [0, 4, 10, 20].map((v) => `<text class="ap-t" x="${G2.x - 4}" y="${f1(wy(v) + 2.6)}" text-anchor="end" data-ui>${v}</text>`).join("")
    + `<path class="ap-area all" d="${area(wbcC)}"/><path class="ap-area band" d="${area(bandC)}"/>`
    + `<path class="ap-ax" d="M${G2.x} ${G2.y}V${G2.y + G2.h}H${G2.x + G2.w}"/>` + [0, 1, 2, 3, 4, 5, 6, 7].map((d) => `<text class="ap-t" x="${f1(gx2(d))}" y="${G2.y + G2.h + 9}" text-anchor="middle" data-ui>${d}</text>`).join("")
    + `<text class="ap-t" x="${G2.x + G2.w}" y="${G2.y + G2.h + 18}" text-anchor="end" data-ui>zile</text>`;
  const tMark = [0, 0.02, 0.3, 2, 5].map((d) => +gx(d).toFixed(1));
  const cursor = `<path class="ap-cur" d="M0 ${G1.y}V${G1.y + G1.h}M0 ${G2.y}V${G2.y + G2.h}"/>`;

  const frames = `<rect class="ap-card" x="${cA.x}" y="${cA.y}" width="${cA.w}" height="${cA.h}" rx="10"/><rect class="ap-card" x="${cB.x}" y="${cB.y}" width="${cB.w}" height="${cB.h}" rx="10"/><rect class="ap-card" x="${cC.x}" y="${cC.y}" width="${cC.w}" height="${cC.h}" rx="10"/><rect class="ap-card" x="214" y="248" width="198" height="224" rx="10"/>`;
  const frameLines = `<rect class="ap-cardl" x="${cA.x}" y="${cA.y}" width="${cA.w}" height="${cA.h}" rx="10"/><rect class="ap-cardl" x="${cB.x}" y="${cB.y}" width="${cB.w}" height="${cB.h}" rx="10"/><rect class="ap-cardl" x="${cC.x}" y="${cC.y}" width="${cC.w}" height="${cC.h}" rx="10"/>`;

  return {
    W, H, tMark,
    defs: BM.defs + `<clipPath id="__U__-cA"><rect x="${cA.x}" y="${cA.y}" width="${cA.w}" height="${cA.h}" rx="10"/></clipPath><clipPath id="__U__-cB"><rect x="${cB.x}" y="${cB.y}" width="${cB.w}" height="${cB.h}" rx="10"/></clipPath><clipPath id="__U__-cC"><rect x="${cC.x}" y="${cC.y}" width="${cC.w}" height="${cC.h}" rx="10"/></clipPath><clipPath id="__U__-sm"><circle cx="${sm.c[0]}" cy="${sm.c[1]}" r="${sm.r - 2}"/></clipPath>`,
    L: { frames, panelA, panelB, panelC, frameLines, ch1, ch2, cursor },
    hits: {
      mast: { cx: M[0], cy: M[1], r: 34 }, ige: { cx: 52, cy: 58, r: 16 }, deg: { cx: 140, cy: 92, r: 14 }, ven: { x: 162, y: 60, w: 32, h: 90 }, nv: { cx: 150, cy: 28, r: 14 }, aa: { x: 16, y: mY - 32, w: 186, h: 64 },
      cls: { cx: 238, cy: OM - 34, r: 15 }, lec: { cx: 284, cy: OM - 24, r: 13 }, alt: { cx: 324, cy: OM - 13, r: 10 }, op: { cx: 404, cy: OM - 10, r: 9 }, mac: { cx: macX - 2, cy: OM - 6, r: 14 }, frag: { cx: 300, cy: 80, r: 18 }, ntc: { cx: 382, cy: 34, r: 20 },
      liv: { x: 14, y: 254, w: 190, h: 102 }, smear: { cx: sm.c[0], cy: sm.c[1], r: sm.r }, brain: { cx: 160, cy: 410, r: 36 },
      apc: { x: 218, y: 252, w: 190, h: 110 }, wbc: { x: 218, y: 364, w: 190, h: 104 },
    },
    badges: {
      mast: [40, 120], ige: [30, 42], deg: [150, 116], ven: [156, 150], nv: [124, 22], aa: [24, 174],
      cls: [224, 112], lec: [272, 112], alt: [334, 132], op: [404, 132], mac: [356, 186], frag: [272, 52], ntc: [352, 22],
      liv: [22, 262], smear: [104, 378], brain: [196, 384], apc: [400, 258], wbc: [400, 370],
    },
  };
}

export function preview(state = {}) {
  const A = build(), L = A.L, s = (x) => x.replaceAll("__U__", "pv");
  const st = state.st ?? 3;
  return { viewBox: `0 0 ${W} ${H}`, svg: s(`<defs>${A.defs}</defs><g class="apx" data-st="${st}">${L.frames}${L.panelA}${L.panelB}${L.panelC}${L.frameLines}${L.ch1}${L.ch2}<g transform="translate(${A.tMark[st]} 0)">${L.cursor}</g></g>`) };
}
