// Î13/Î14: febra non-infecțioasă. Sus, aceeași scenă pentru toate tipurile: declanșatorul (stânga), macrofagul care produce
// pirogenii endogeni (centru), vasul care îi duce la hipotalamus (dreapta sus, fața medială a creierului) și termometrul.
// Declanșatorul se schimbă cu tipul:
//  0. autoimun: o celulă proprie acoperită de autoanticorpi și C3b, un limfocit T autoreactiv, complexe imune;
//  1. „drug fever”: beta-lactamina legată de proteine proprii (haptenă–purtător), anticorpi, eozinofile;
//  2. reacția posttransfuzională: punga de sânge, leucocitele donatorului (HLA străin), anticorpii primitorului;
//  3. febra în context neoplazic: celule tumorale (nuclei mari, hipercromi, o mitoză), necroză, un trombus.
// Jos, ce e specific fiecărui tip: pirogenii endogeni și imunitatea nespecifică; medicamentele și eozinofilia;
// fereastra de timp posttransfuzională; organele cu tumori care dau febră.
import { smooth, poly, lumpy, rng } from "./lib/geo.mjs";
import { organ, vessels } from "./lib/an.mjs";
import { cytokine } from "./fever.mjs";
import { brainMedSvg } from "./parts/brain-med.mjs";

export const W = 420, H = 470;
const f1 = (v) => (+v).toFixed(1);
const P2 = (p) => `${f1(p[0])} ${f1(p[1])}`;
const ring = (x, y, n, r, a0 = 0) => Array.from({ length: n }, (_, i) => [x + Math.cos(a0 + i * 2 * Math.PI / n) * r, y + Math.sin(a0 + i * 2 * Math.PI / n) * r]);
// anticorp (IgG, schematic „Y”): coada spre exterior, brațele (Fab) în direcția a, cu vârfurile la (x, y)
const ab = (x, y, a, s = 1, cls = "") => {
  const c = Math.cos(a), sn = Math.sin(a), p = (u, v) => P2([x + (u - 4) * s * c - v * s * sn, y + (u - 4) * s * sn + v * s * c]);
  return `<path class="ni-ab ${cls}" d="M${p(-5, 0)}L${p(0, 0)}L${p(4, -3.2)}M${p(0, 0)}L${p(4, 3.2)}"/>`;
};
const lb = (x, y, t, a = "start", cls = "") => `<text class="ni-lb ${cls}" x="${f1(x)}" y="${f1(y)}" text-anchor="${a}" data-ui>${t}</text>`;

/* ---------- formulele (simplificate, scheletice) ---------- */
// nucleul penicilinelor: inelul beta-lactamic (C7=O lângă N) fuzionat pe legătura C5–N4 cu inelul tiazolidinic (S lângă C5)
function penam(x, y, s = 1) {
  const C7 = [x, y], C6 = [x, y - 3 * s], C5 = [x + 3 * s, y - 3 * s], N4 = [x + 3 * s, y];
  const S1 = [x + 6.1 * s, y - 4.3 * s], C2 = [x + 7.7 * s, y - 1.5 * s], C3 = [x + 5.8 * s, y + 1.1 * s];
  const O = [x - 1.7 * s, y + 2.1 * s], O2 = [x - 1.2 * s, y + 2.6 * s], side = [x - 2.5 * s, y - 4.7 * s];
  const cooh = [x + 6.2 * s, y + 4.2 * s], me1 = [x + 10.6 * s, y - 2 * s], me2 = [x + 9.2 * s, y + 1.2 * s];
  return `<g class="ni-mol"><path d="${poly([C7, C6, C5, N4], true)}${poly([C5, S1, C2, C3, N4])}M${P2(C7)}L${P2(O)}M${P2([x + 0.5 * s, y + 0.4 * s])}L${P2(O2)}M${P2(C6)}L${P2(side)}M${P2(C3)}L${P2(cooh)}M${P2(C2)}L${P2(me1)}M${P2(C2)}L${P2(me2)}"/>`
    + `<circle class="s" cx="${f1(S1[0])}" cy="${f1(S1[1])}" r="${f1(1.05 * s)}"/><circle class="n" cx="${f1(N4[0])}" cy="${f1(N4[1])}" r="${f1(0.8 * s)}"/><circle class="o" cx="${f1(O[0])}" cy="${f1(O[1])}" r="${f1(0.8 * s)}"/></g>`;
}
// fenitoina (difenilhidantoina): inelul hidantoinic (N1, C2=O, N3, C4=O, C5) cu două fenile pe același C5
function phenytoin(x, y, s = 1) {
  const r = 3.6 * s, v = [180, 252, 324, 36, 108].map((d) => [x + Math.cos(d * Math.PI / 180) * r, y + Math.sin(d * Math.PI / 180) * r]);
  const out = (p, k) => [p[0] + (p[0] - x) / r * k, p[1] + (p[1] - y) / r * k];
  const o1 = out(v[1], 3 * s), o2 = out(v[3], 3 * s);
  const ph = (deg) => { const a = deg * Math.PI / 180, b = [v[0][0] + Math.cos(a) * 3.2 * s, v[0][1] + Math.sin(a) * 3.2 * s], c = [b[0] + Math.cos(a) * 3.4 * s, b[1] + Math.sin(a) * 3.4 * s]; const hx = ring(c[0], c[1], 6, 3.4 * s, a + Math.PI); return `M${P2(v[0])}L${P2(b)}${poly(hx, true)}M${f1(c[0] + 2 * s)} ${f1(c[1])}a${f1(2 * s)} ${f1(2 * s)} 0 1 0 ${f1(-4 * s)} 0a${f1(2 * s)} ${f1(2 * s)} 0 1 0 ${f1(4 * s)} 0`; };
  return `<g class="ni-mol"><path d="${poly(v, true)}M${P2(v[1])}L${P2(o1)}M${P2(v[3])}L${P2(o2)}${ph(138)}${ph(222)}"/>`
    + [o1, o2].map((p) => `<circle class="o" cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(0.8 * s)}"/>`).join("") + [v[2], v[4]].map((p) => `<circle class="n" cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(0.8 * s)}"/>`).join("") + `</g>`;
}
// procainamida: H2N–benzen–C(=O)–NH–CH2–CH2–N(C2H5)2, în zigzag
function procainamide(x, y, s = 1) {
  const hx = ring(x, y, 6, 3.4 * s, 0), L = hx[0], R0 = hx[3];
  const nh2 = [R0[0] - 3 * s, R0[1]];
  const st = 2.9 * s, h = 1.7 * s, z = [L];
  for (let i = 1; i <= 7; i++) z.push([L[0] + i * st, L[1] + (i % 2 ? -h : 0)]);
  const o = [z[1][0], z[1][1] - 3 * s], et = [[z[5][0], z[5][1] - 3 * s], [z[5][0] + st, z[5][1] - 3 * s - h]];
  return `<g class="ni-mol"><path d="${poly(hx, true)}M${f1(x + 2 * s)} ${f1(y)}a${f1(2 * s)} ${f1(2 * s)} 0 1 0 ${f1(-4 * s)} 0a${f1(2 * s)} ${f1(2 * s)} 0 1 0 ${f1(4 * s)} 0M${P2(R0)}L${P2(nh2)}${poly(z)}M${P2(z[1])}L${P2(o)}M${P2([z[1][0] + 0.6 * s, z[1][1]])}L${P2([o[0] + 0.6 * s, o[1] + 0.2 * s])}M${P2(z[5])}${poly(et).replace("M", "L")}"/>`
    + `<circle class="n" cx="${f1(nh2[0])}" cy="${f1(nh2[1])}" r="${f1(0.85 * s)}"/><circle class="o" cx="${f1(o[0])}" cy="${f1(o[1])}" r="${f1(0.85 * s)}"/><circle class="n" cx="${f1(z[2][0])}" cy="${f1(z[2][1])}" r="${f1(0.85 * s)}"/><circle class="n" cx="${f1(z[5][0])}" cy="${f1(z[5][1])}" r="${f1(0.85 * s)}"/></g>`;
}
// haptena din desen (glifă mică, ca să încapă pe proteină): același nucleu penam, fără lanțuri
const hapten = (x, y, s = 1) => `<g class="ni-hap"><path d="${poly([[x, y], [x, y - 2.6 * s], [x + 2.6 * s, y - 2.6 * s], [x + 2.6 * s, y]], true)}${poly([[x + 2.6 * s, y - 2.6 * s], [x + 5.2 * s, y - 3.6 * s], [x + 6.3 * s, y - 1.2 * s], [x + 4.7 * s, y + 0.9 * s], [x + 2.6 * s, y]])}"/><circle cx="${f1(x + 5.2 * s)}" cy="${f1(y - 3.6 * s)}" r="${f1(0.9 * s)}"/></g>`;
const eos = (x, y, r, R) => { let g = ""; for (let k = 0; k < Math.round(r * 1.7); k++) { const a = R() * 6.283, rr = Math.sqrt(R()) * (r - 2); g += `<circle cx="${f1(x + Math.cos(a) * rr)}" cy="${f1(y + Math.sin(a) * rr)}" r="${f1(r / 12)}"/>`; } return `<g class="ni-eo"><circle class="c" cx="${x}" cy="${y}" r="${r}"/><g class="g">${g}</g><ellipse class="n" cx="${f1(x - r * 0.32)}" cy="${f1(y + r * 0.05)}" rx="${f1(r * 0.3)}" ry="${f1(r * 0.36)}"/><ellipse class="n" cx="${f1(x + r * 0.32)}" cy="${f1(y - r * 0.05)}" rx="${f1(r * 0.3)}" ry="${f1(r * 0.36)}"/><path class="nb" d="M${f1(x - r * 0.06)} ${f1(y)}h${f1(r * 0.12)}"/></g>`; };
const neut = (x, y, r, cls = "") => `<g class="ni-ne ${cls}"><circle class="c" cx="${x}" cy="${y}" r="${r}"/><path class="nb" d="M${f1(x - 0.38 * r)} ${f1(y - 0.12 * r)}L${f1(x - 0.05 * r)} ${f1(y + 0.22 * r)}L${f1(x + 0.3 * r)} ${f1(y - 0.18 * r)}L${f1(x + 0.42 * r)} ${f1(y + 0.24 * r)}"/>${[[-0.38, -0.12], [-0.05, 0.22], [0.3, -0.18], [0.42, 0.24]].map(([u, v]) => `<circle class="n" cx="${f1(x + u * r)}" cy="${f1(y + v * r)}" r="${f1(r * 0.24)}"/>`).join("")}</g>`;
// complex imun: antigenul (punct) legat încrucișat de trei anticorpi
const icx = (x, y, s = 1, a0 = 0) => `<g class="ni-ic"><circle class="ag" cx="${x}" cy="${y}" r="${f1(2.6 * s)}"/>${[0, 1, 2].map((k) => { const a = a0 + k * 2.094; return ab(x + Math.cos(a) * 2.6 * s, y + Math.sin(a) * 2.6 * s, a + Math.PI, 0.85 * s); }).join("")}</g>`;

export function build() {
  const R = rng(29);
  /* ======================= A. scena ======================= */
  const cA = { x: 10, y: 10, w: 400, h: 240 };
  // macrofagul (centru): pseudopode, nucleul reniform, lizozomii, vacuole, aparatul Golgi
  const MC = [234, 134], mr = 42;
  const macOut = smooth(lumpy(MC[0], MC[1], mr, 16, 0.11, 4), true);
  const macSvg = organ(macOut, "mac-b") + `<path class="mac-nuc" d="${smooth([[MC[0] - 18, MC[1] - 4], [MC[0] - 10, MC[1] - 17], [MC[0] + 6, MC[1] - 13], [MC[0] + 3, MC[1] - 1], [MC[0] - 5, MC[1] + 1], [MC[0] - 8, MC[1] + 13], [MC[0] - 20, MC[1] + 9]], true)}"/>`
    + `<path class="ni-chr" d="M${MC[0] - 14} ${MC[1] - 6}q3 -2 5 1M${MC[0] - 6} ${MC[1] - 12}q3 0 4 3M${MC[0] - 15} ${MC[1] + 5}q3 1 3 4"/>`
    + [[20, -18], [25, 8], [0, 24], [13, 28], [-24, -24], [28, -4], [-2, -28]].map(([u, v], i) => `<circle class="mac-lyso" cx="${MC[0] + u}" cy="${MC[1] + v}" r="${i % 3 ? 2.6 : 3.4}"/>`).join("")
    + [[12, 14, 4.2], [-26, 20, 3.6]].map(([u, v, r]) => `<circle class="ni-vac" cx="${MC[0] + u}" cy="${MC[1] + v}" r="${r}"/>`).join("")
    + `<path class="ni-golgi" d="M${MC[0] + 8} ${MC[1] - 4}q6 -3 10 2M${MC[0] + 8} ${MC[1] - 1}q6 -3 10 2M${MC[0] + 9} ${MC[1] + 2}q5 -2 8 2"/>`;
  // receptorii Fc de pe marginea stângă (prind complexele imune)
  const fcPts = [-0.35, 0, 0.35].map((a) => [MC[0] + Math.cos(Math.PI + a) * (mr - 1), MC[1] + Math.sin(Math.PI + a) * (mr - 1)]);
  const fcR = fcPts.map(([x, y]) => `<path class="ni-fcr" d="M${f1(x)} ${f1(y)}l-3.4 0"/><circle class="ni-fcr2" cx="${f1(x - 3.6)}" cy="${f1(y)}" r="1"/>`).join("");
  // citokinele care ies spre vas: IL-1, TNF-α și IFN (cei mai puternici), IL-6 (mai slab, persistent)
  const ifn = (x, y, s = 1, cls = "") => `<g class="ni-ifn ${cls}"><path d="M${f1(x - 3 * s)} ${f1(y - 1.4 * s)}h${f1(6 * s)}M${f1(x - 3 * s)} ${f1(y + 1.4 * s)}h${f1(6 * s)}"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(1.3 * s)}"/></g>`;
  const ckOut = cytokine("il1", 284, 108, 1.1, "o0") + cytokine("tnf", 292, 130, 1.1, "o1") + cytokine("il6", 284, 154, 1, "o2") + ifn(276, 90, 1, "o3") + cytokine("tnf", 298, 104, 0.9, "o4");
  // vasul (sânge) spre baza creierului
  const vpts = [[322, 252], [324, 196], [328, 148], [340, 108], [358, 82], [374, 66], [379, 56]];
  const vessel = vessels([{ pts: vpts, w: 14, k: "a" }]);
  const ckV = [["il1", 323, 214], ["tnf", 325, 176], ["il6", 330, 136], ["il1", 344, 104], ["tnf", 361, 80]].map(([k, x, y], i) => cytokine(k, x, y, 0.72, `ni-v v${i}`)).join("");
  // creierul: fața medială, mică, cu hipotalamusul și OVLT
  const k = 3.4, bx = (x) => 372 + x * k, by = (y) => 52 + y * k;
  const BM = brainMedSvg(([x, y]) => [bx(x), by(y)], k);
  // la mărimea asta (≈55 px) crestele girilor și jumătate din foliile cerebelului nu se mai văd: le scot, ca desenul să fie mai mic
  let fol = 0;
  const thin = (svg) => svg.replace(/<path class="hx2-crest"[^>]*\/>/g, "").replace(/<path class="hx2-fol"[^>]*\/>/g, (m) => (fol++ % 2 ? "" : m)).replace(/(\d+\.\d)\d+/g, "$1");
  const brain = `<g class="ni-brain">${thin(BM.brain + BM.sulci + BM.cc + BM.thal + BM.hypo + BM.stem + BM.cbl)}</g>`;
  const hyp = [bx(0.7), by(-1.1)], ovlt = [bx(1.82), by(-1.05)];
  const hypS = `<circle class="ni-hyp" cx="${f1(hyp[0])}" cy="${f1(hyp[1])}" r="3"/><circle class="ni-ovlt" cx="${f1(ovlt[0])}" cy="${f1(ovlt[1])}" r="1.5"/>`;
  // termometrul: coloana urcă (febră)
  const TX = 400, T0 = 84, T1 = 146;
  const therm = `<rect class="ni-th" x="${TX - 3.6}" y="${T0}" width="7.2" height="${T1 - T0 + 6}" rx="3.6"/><circle class="ni-th" cx="${TX}" cy="${T1 + 8}" r="6.2"/><circle class="ni-thb" cx="${TX}" cy="${T1 + 8}" r="4.4"/><rect class="ni-thm" x="${TX - 1.6}" y="${T0 + 12}" width="3.2" height="${T1 - T0 - 4}" rx="1.6"/>`
    + [0, 1, 2, 3, 4, 5].map((i) => `<path class="ni-tht" d="M${TX + 3.6} ${T0 + 6 + i * 10}h${i % 5 === 0 ? 3.4 : 2}"/>`).join("");
  const labsA = lb(MC[0], MC[1] + mr + 12, "monocit / macrofag", "middle") + lb(336, 214, "sânge") + lb(337, 30, "hipotalamus", "end") + lb(337, 38, "(OVLT)", "end");
  // legenda citokinelor, jos
  const legY = 238;
  const legA = `<g class="ni-leg">${cytokine("il1", 180, legY - 2, 0.8, "")}${lb(187, legY, "IL-1")}${cytokine("tnf", 214, legY - 2, 0.8, "")}${lb(221, legY, "TNF-α")}${ifn(256, legY - 2, 0.8)}${lb(262, legY, "IFN")}${cytokine("il6", 284, legY - 2, 0.75, "")}${lb(291, legY, "IL-6")}</g>`;

  /* ---------- declanșatorii (stânga), câte un grup pe tip ---------- */
  const cap = (t) => lb(20, 26, t, "start", "cap");
  // 0. autoimun
  const SC = [74, 98], sr = 30;
  const selfOut = lumpy(SC[0], SC[1], sr, 14, 0.05, 3);
  const t0 = `<g class="ni-t t0">${cap("autoimun: proteinele proprii, tratate ca non-self")}`
    + `<path class="ni-self" d="${smooth(selfOut, true)}"/><path class="an-vol" d="${smooth(selfOut, true)}"/><path class="ni-selfn" d="${smooth(lumpy(SC[0] - 3, SC[1] + 2, 10.5, 9, 0.08, 7), true)}"/><circle class="ni-selfnl" cx="${SC[0] - 1}" cy="${SC[1]}" r="2.4"/>`
    + `<path class="ni-er" d="M${SC[0] + 6} ${SC[1] - 16}q6 2 10 8M${SC[0] + 9} ${SC[1] - 19}q7 3 11 9M${SC[0] + 10} ${SC[1] + 12}q6 -1 9 -6"/>`
    + ring(SC[0], SC[1], 11, 1, 0.25).map(([cx, cy], i) => { const a = Math.atan2(cy - SC[1], cx - SC[0]); const px = SC[0] + Math.cos(a) * (sr + 1.2), py = SC[1] + Math.sin(a) * (sr + 1.2); return `<path class="ni-sag" d="M${f1(px - Math.sin(a) * 1.6)} ${f1(py + Math.cos(a) * 1.6)}l${f1(Math.cos(a) * 1.8)} ${f1(Math.sin(a) * 1.8)}l${f1(Math.sin(a) * 3.2)} ${f1(-Math.cos(a) * 3.2)}l${f1(-Math.cos(a) * 1.8)} ${f1(-Math.sin(a) * 1.8)}"/>` + (i % 3 !== 2 ? ab(px + Math.cos(a) * 1.8, py + Math.sin(a) * 1.8, a + Math.PI, 1, "auto") : ""); }).join("")
    + ring(SC[0], SC[1], 9, sr + 1.6, 0.6).map(([x, y]) => `<circle class="c3b" cx="${f1(x)}" cy="${f1(y)}" r="1.5"/>`).join("")
    + `<g class="ni-tc"><circle class="c" cx="142" cy="100" r="11"/><circle class="n" cx="142.8" cy="100.4" r="8.4"/><path class="tcr" d="M131.2 98l-3.2 -0.4M131.6 102.6l-3 0.8"/></g>${lb(142, 122, "LT autoreactiv", "middle")}`
    + [[44, 178, 0.2], [82, 196, 1.1], [118, 180, 0.6], [150, 206, 0.1], [56, 214, 0.9]].map(([x, y, a]) => icx(x, y, 1, a)).join("") + lb(96, 230, "complexe imune", "middle") + lb(SC[0], SC[1] + sr + 16, "celulă proprie + autoanticorpi", "middle")
    + `<g class="ni-br0">${icx(184, 122, 0.9, 0)}${icx(188, 150, 0.9, 1.4)}</g></g>`;
  // 1. „drug fever”: beta-lactamina (haptenă) legată covalent de proteine proprii (purtător); anticorpii o recunosc
  const carriers = [[50, 64, 0], [102, 56, 1], [72, 106, 1], [124, 100, 0], [40, 144, 1], [98, 148, 0]];
  const t1 = `<g class="ni-t t1">${cap("„drug fever”: medicamentul, legat de proteine proprii")}`
    + carriers.map(([x, y, a], i) => `<path class="ni-prot" d="${smooth(lumpy(x, y, 9.5, 11, 0.16, i + 4), true)}"/><path class="ni-protl" d="M${x - 5} ${y + 2}q3 -4 6 0t6 0"/>${hapten(x + 2, y - 6, 1.5)}${a ? ab(x + 8.2, y - 15.6, Math.PI / 2 + 0.5, 1.1, "ige") : ""}`).join("")
    + lb(84, 172, "haptenă + proteină purtătoare", "middle") + eos(132, 196, 13, R) + eos(64, 206, 12, R) + lb(98, 228, "eozinofile", "middle")
    + `<g class="ni-br1">${icx(184, 122, 0.9, 0)}${icx(188, 150, 0.9, 1.4)}</g></g>`;
  // 2. reacția posttransfuzională: punga, tubul cu acul, leucocitele donatorului (HLA străin) și anticorpii primitorului
  const don = [[94, 160], [134, 178], [62, 196], [108, 206]];
  const t2 = `<g class="ni-t t2">${cap("transfuzie: leucocitele donatorului, anticorpii primitorului")}`
    + `<path class="ni-bag" d="M28 38H84V92Q84 102 74 102H38Q28 102 28 92Z"/><path class="ni-blood" d="M30 56H82V91Q82 100 73 100H39Q30 100 30 91Z"/><path class="an-vol" d="M30 56H82V91Q82 100 73 100H39Q30 100 30 91Z"/><rect class="ni-blab" x="38" y="42" width="36" height="10" rx="2"/><path class="ni-blabl" d="M42 45.5h28M42 48.5h18"/><path class="ni-bport" d="M50 102v6h12v-6"/>`
    + `<path class="ni-tube" d="M56 108V114C56 128 86 124 100 132C110 138 116 140 128 140"/><path class="ni-tubei" d="M56 108V114C56 128 86 124 100 132C110 138 116 140 128 140"/><path class="ni-drip" d="M52 114h8v8h-8z"/><path class="ni-hub" d="M128 136h8v8h-8z"/><path class="ni-needle" d="M136 140h12"/>`
    + don.map(([x, y], i) => `<g class="ni-don"><circle class="c" cx="${x}" cy="${y}" r="11"/><path class="n" d="${smooth(lumpy(x, y, 6, 9, 0.28, i + 3), true)}"/>${ring(x, y, 7, 11.4, 0.2 + i).map(([a, b]) => { const ang = Math.atan2(b - y, a - x); return `<path class="hla" d="M${f1(a - Math.sin(ang) * 1.7)} ${f1(b + Math.cos(ang) * 1.7)}L${f1(a + Math.cos(ang) * 2.6)} ${f1(b + Math.sin(ang) * 2.6)}L${f1(a + Math.sin(ang) * 1.7)} ${f1(b - Math.cos(ang) * 1.7)}Z"/>`; }).join("")}${ring(x, y, 3, 14.6, 0.5 + i).map(([a, b]) => { const ang = Math.atan2(b - y, a - x); return ab(a, b, ang + Math.PI, 0.9, "anti"); }).join("")}</g>`).join("")
    + lb(98, 240, "HLA străin (portocaliu) + anticorpi", "middle")
    + `<g class="ni-br2">${icx(184, 122, 0.9, 0)}${icx(188, 150, 0.9, 1.4)}</g></g>`;
  // 3. febra în context neoplazic: cuib de celule tumorale cu necroză centrală, o mitoză, un vas mic cu trombus
  const tum = [[46, 66], [74, 54], [102, 64], [128, 80], [52, 96], [126, 110], [56, 128], [84, 138], [114, 138]];
  const t3 = `<g class="ni-t t3">${cap("tumoră: celule tumorale, necroză, tromboză")}`
    + `<path class="ni-strom" d="${smooth(lumpy(88, 100, 56, 14, 0.1, 9), true)}"/><path class="ni-nec" d="${smooth(lumpy(88, 100, 17, 11, 0.2, 5), true)}"/>`
    + [[84, 96], [94, 104], [80, 106], [96, 92], [88, 112]].map(([x, y]) => `<circle class="ni-pyk" cx="${x}" cy="${y}" r="1.5"/>`).join("") + `<path class="ni-kr" d="M90 98l2 2M82 101l2 -1M93 109l1 -2"/>`
    + tum.map(([x, y], i) => `<path class="ni-tu" d="${smooth(lumpy(x, y, 12.5, 9, 0.15, i + 7), true)}"/><path class="ni-tun" d="${smooth(lumpy(x + 1, y, 6.6 + (i % 3) * 0.8, 9, 0.22, i + 17), true)}"/><circle class="ni-tunl" cx="${x + 2.4}" cy="${y - 1.2}" r="${i % 2 ? 1.9 : 1.4}"/>`).join("")
    + `<g class="ni-mit"><path class="ni-tu" d="${smooth(lumpy(84, 70, 9, 9, 0.1, 2), true)}"/><path class="sp" d="M78 70L84 66L90 70M78 70L84 74L90 70"/><path class="ch" d="M84 65.4V74.6"/></g>`
    + `<path class="ni-sv" d="M18 178C60 168 104 190 160 172"/><path class="ni-svl" d="M18 178C60 168 104 190 160 172"/><path class="ni-thr" d="${smooth(lumpy(88, 178, 6.4, 10, 0.18, 3), true)}"/><path class="ni-fib" d="M83 175l10 5M84 181l9 -6M86 173l3 10"/>`
    + lb(88, 196, "vas mic cu trombus", "middle") + lb(88, 37, "cuib tumoral, necroză centrală", "middle")
    + cytokine("il6", 150, 140, 0.8, "") + cytokine("il1", 158, 112, 0.8, "") + `<g class="ni-br3">${cytokine("tnf", 182, 124, 0.85, "")}${cytokine("il1", 184, 150, 0.85, "")}</g>`
    + lb(20, 214, "pirogeni: din tumoră și din răspunsul gazdei") + `</g>`;
  const panelA = `<g class="ni-pa" clip-path="url(#__U__-cA)"><rect class="ni-bg" x="${cA.x}" y="${cA.y}" width="${cA.w}" height="${cA.h}"/>${vessel}<g class="ni-ckv">${ckV}</g>${t0}${t1}${t2}${t3}${macSvg}${fcR}<g class="ni-cko">${ckOut}</g>${brain}${hypS}${therm}${labsA}${legA}</g>`;

  /* ======================= B. specificul fiecărui tip ======================= */
  const cB = { x: 10, y: 258, w: 400, h: 204 };
  // 0. stânga: pirogenii endogeni (schemă calitativă după LP, fără valori); dreapta: imunitatea nespecifică
  const G = { x: 34, y: 300, w: 170, h: 118 };
  const gx = (t) => G.x + t * G.w, gy = (v) => G.y + G.h - v * G.h;
  const curve = (pts) => smooth(pts.map(([t, v]) => [gx(t), gy(v)]), false, 0.6);
  const b0 = `<g class="ni-b b0"><text class="ni-ti" x="22" y="282" data-ui>Pirogenii endogeni (schemă după LP)</text>`
    + `<path class="ni-ax" d="M${G.x} ${G.y - 4}V${G.y + G.h}H${G.x + G.w}"/>${lb(G.x + G.w, G.y + G.h + 10, "timp →", "end")}${lb(G.x + 4, G.y - 1, "efect pirogen")}`
    + `<path class="ni-cv il1" d="${curve([[0, 0], [0.06, 0.55], [0.14, 0.94], [0.26, 0.55], [0.42, 0.16], [0.6, 0.04], [1, 0]])}"/><path class="ni-cv tnf" d="${curve([[0, 0], [0.04, 0.62], [0.1, 0.86], [0.2, 0.4], [0.34, 0.1], [0.55, 0.02], [1, 0]])}"/><path class="ni-cv ifn" d="${curve([[0, 0], [0.1, 0.36], [0.22, 0.74], [0.38, 0.46], [0.58, 0.14], [1, 0.02]])}"/><path class="ni-cv il6" d="${curve([[0, 0], [0.14, 0.17], [0.3, 0.27], [0.55, 0.29], [0.8, 0.28], [1, 0.27]])}"/>`
    + lb(gx(0.15) + 4, gy(0.94) + 2, "IL-1", "start", "il1") + lb(gx(0.1) - 4, gy(0.86) - 3, "TNF-α", "end", "tnf") + lb(gx(0.23) + 4, gy(0.74) - 1, "IFN α, γ", "start", "ifn") + lb(gx(1), gy(0.28) - 5, "IL-6: slab, persistent", "end", "il6")
    + lb(G.x - 12, G.y + G.h + 24, "IL-1, TNF-α, IFN: cei mai puternici (monocite, macrofage);", "start") + lb(G.x - 12, G.y + G.h + 33, "și celulele tumorale produc pirogeni", "start")
    // imunitatea nespecifică: capilarul, monocitul care iese (diapedeză) și devine macrofag, neutrofilul pe gradientul de chemokine
    + `<text class="ni-ti" x="226" y="282" data-ui>Imunitatea nespecifică</text>`
    + `<rect class="ni-capl" x="222" y="307" width="182" height="22"/><path class="ni-capw" d="M222 306H404M222 330H404"/>${[240, 262, 300, 322, 346, 392].map((x) => `<circle class="ap-rbc" cx="${x}" cy="318" r="5.4"/>`).join("")}${[[230, 306], [276, 306], [324, 306], [372, 306], [252, 330], [300, 330], [348, 330], [396, 330]].map(([x, y]) => `<ellipse class="ni-endn" cx="${x}" cy="${y}" rx="5" ry="1.4"/>`).join("")}`
    + `<g class="ni-mono"><path class="c" d="${smooth([[276, 318], [282, 310], [288, 304], [290, 296], [296, 292], [300, 300], [296, 310], [290, 322], [282, 326]], true)}"/><path class="n" d="${smooth([[284, 316], [288, 306], [294, 298], [296, 304], [290, 316]], true)}"/></g>`
    + `<path class="mac-b" d="${smooth(lumpy(258, 372, 15, 11, 0.16, 6), true)}"/><path class="mac-nuc" d="${smooth([[252, 368], [256, 362], [262, 365], [260, 372], [254, 376]], true)}"/><circle class="mac-lyso" cx="266" cy="378" r="2"/><circle class="mac-lyso" cx="250" cy="380" r="1.8"/>`
    + `<path class="ni-mpath" d="M292 340C292 352 280 360 272 364"/><circle class="ni-mpd" cx="292" cy="340" r="1.4"/><path class="ni-mpa" d="M275 360l-3.4 4l5 -0.4"/>`
    + neut(369, 318, 7.6, "in") + `<path class="ni-mpath" d="M369 338C369 348 360 354 354 360"/><circle class="ni-mpd" cx="369" cy="338" r="1.4"/>` + neut(346, 368, 8, "")
    + [...Array(16)].map((_, i) => { const t = i / 15, x = 340 - t * 32 + Math.sin(i * 2.3) * 5, y = 378 + t * 28 + Math.cos(i * 1.7) * 4; return `<circle class="ni-chk" cx="${f1(x)}" cy="${f1(y)}" r="${f1(0.7 + t * 0.9)}"/>`; }).join("")
    + `<path class="ni-focus" d="${smooth(lumpy(300, 414, 9, 9, 0.2, 4), true)}"/>`
    + `<g class="ni-lyz"><path d="${smooth([[364, 400], [372, 394], [380, 398], [378, 408], [370, 410]], true)}"/><path class="cl" d="M368 401l4 3l4 -4"/></g>${ring(390, 412, 5, 5, 0.3).map(([x, y]) => `<circle class="c3b" cx="${f1(x)}" cy="${f1(y)}" r="1.5"/>`).join("")}`
    + lb(258, 398, "monocit → macrofag", "middle") + lb(300, 438, "focar", "middle") + lb(357, 366, "neutrofil:") + lb(357, 374, "chemotactism") + lb(404, 426, "lizozim, complement", "end") + lb(226, 300, "capilar") + `</g>`;
  // 1. „drug fever”: formulele simplificate (beta-lactamă, fenitoină, procainamidă) și frotiul cu eozinofilie
  const sm = { c: [330, 352], r: 52 };
  const RS = rng(33);
  let smear = `<rect class="ni-smbg" x="${sm.c[0] - sm.r}" y="${sm.c[1] - sm.r}" width="${sm.r * 2}" height="${sm.r * 2}"/>`;
  for (let i = 0; i < 30; i++) { const x = sm.c[0] + (RS() - 0.5) * 2 * sm.r, y = sm.c[1] + (RS() - 0.5) * 2 * sm.r; smear += `<circle class="ap-rbc" cx="${f1(x)}" cy="${f1(y)}" r="5.2"/><circle class="ap-rbcc" cx="${f1(x)}" cy="${f1(y)}" r="2"/>`; }
  smear += eos(308, 330, 9.5, RS) + eos(350, 338, 9.5, RS) + eos(316, 376, 9.5, RS) + neut(352, 376, 8.4, "") + neut(334, 354, 8.4, "");
  const b1 = `<g class="ni-b b1"><text class="ni-ti" x="22" y="282" data-ui>„Drug fever”: medicamentele din LP</text>`
    + penam(38, 318, 2.6) + phenytoin(118, 314, 2.3) + procainamide(178, 316, 2.1)
    + lb(48, 344, "beta-lactamine", "middle") + lb(110, 344, "difenilhidantoină", "middle") + lb(196, 344, "procainamidă", "middle")
    + lb(22, 354, "(nucleul penicilinelor)") + lb(22, 380, "febră înaltă, însoțită de frison;") + lb(22, 390, "eozinofilie și leucocitoză tranzitorie") + lb(22, 400, "(eozinofilia sugerează un mecanism alergic)")
    + `<circle class="ni-k s" cx="26" cy="420" r="2"/>${lb(30, 422, "S")}<circle class="ni-k n" cx="44" cy="420" r="2"/>${lb(48, 422, "N")}<circle class="ni-k o" cx="62" cy="420" r="2"/>${lb(66, 422, "O")}`
    + `<g clip-path="url(#__U__-sm)">${smear}</g><circle class="ap-lens" cx="${sm.c[0]}" cy="${sm.c[1]}" r="${sm.r}"/><circle class="ap-lens2" cx="${sm.c[0]}" cy="${sm.c[1]}" r="${sm.r - 3}"/>`
    + lb(sm.c[0], sm.c[1] + sm.r + 12, "frotiu: eozinofile (granule roșii)", "middle") + lb(sm.c[0], sm.c[1] + sm.r + 21, "lângă neutrofile", "middle") + `</g>`;
  // 2. fereastra de timp posttransfuzională: frisonul, apoi febra la 30–180 min; leucocitoza până la 12 h (LP)
  const T = { x: 40, y: 304, w: 356 };
  const tx = (h) => T.x + Math.log10(1 + h * 4) / Math.log10(1 + 13 * 4) * T.w;
  const bar = (cls, h0, h1, row, txt, inside = true) => { const x0 = tx(h0), x1 = tx(h1), y = T.y + row * 22; return `<rect class="ni-bar ${cls}" x="${f1(x0)}" y="${y}" width="${f1(x1 - x0)}" height="14" rx="3"/>` + lb(inside ? x0 + 4 : x1 + 4, y + 9.6, txt, "start", inside ? "in" : ""); };
  const b2 = `<g class="ni-b b2"><text class="ni-ti" x="22" y="282" data-ui>Reacția posttransfuzională: fereastra de timp (LP)</text>`
    + bar("tr", 0, 0.5, 0, "transfuzia", false) + bar("ch", 0.35, 0.6, 1, "frisonul precede febra", false) + bar("fv", 0.5, 3, 2, "febra: la 30–180 min") + bar("lk", 0.5, 12, 3, "leucocitoză tranzitorie, până la 12 ore")
    + `<path class="ni-ax" d="M${T.x} ${T.y + 94}H${T.x + T.w}"/>` + [[0, "0"], [0.5, "30 min"], [1, "1 h"], [3, "3 h"], [6, "6 h"], [12, "12 h"]].map(([h, t]) => `<path class="ni-ax" d="M${f1(tx(h))} ${T.y + 92}v4"/>${lb(tx(h), T.y + 106, t, "middle")}`).join("")
    + lb(T.x + T.w, T.y + 118, "timpul de la începutul transfuziei (axă comprimată)", "end")
    + `<path class="ni-win" d="M${f1(tx(0.5))} ${T.y + 40}V${T.y + 92}M${f1(tx(3))} ${T.y + 40}V${T.y + 92}"/>`
    + lb(22, 444, "după sânge sau derivate de sânge") + `</g>`;
  // 3. corpul, cu organele în care tumorile dau febră (LP): silueta, cu organele desenate în culorile lor
  const s = 0.8, BX = 82, Y0 = 288;
  const B = ([x, y]) => [BX + (x - 108) * s, Y0 + (y - 270) * s];
  const half = [[118, 303], [119, 316], [125, 321], [140, 326], [154, 331], [162, 341], [166, 362], [168, 386], [170, 410], [172, 434], [173, 456], [168, 466], [161, 462], [158, 436], [155, 410], [152, 386], [149, 362], [146, 374], [143, 392], [141, 406], [145, 424], [150, 446], [151, 482], [116, 482], [112, 458], [108, 452]];
  const mir = (pts) => pts.map(([x, y]) => [216 - x, y]);
  const bodyPts = [...half, ...mir(half).reverse().slice(1, -1)].map(B);
  const head = B([108, 288]);
  const at = (x, y) => B([x, y]).map(f1);
  const orgs = {
    lung: [smooth([[104, 338], [92, 336], [86, 352], [86, 372], [98, 376], [104, 366]].map(B), true), smooth([[112, 338], [124, 336], [130, 352], [130, 372], [118, 376], [112, 366]].map(B), true)].map((d) => `<path class="ni-o lung" d="${d}"/>`).join(""),
    node: [[100, 310], [116, 310], [97, 326], [119, 326], [101, 350], [115, 350]].map(([x, y]) => { const [a, b] = at(x, y); return `<ellipse class="ni-o node" cx="${a}" cy="${b}" rx="2.6" ry="2"/>`; }).join(""),
    breast: [[86, 360], [130, 360]].map(([x, y]) => { const [a, b] = at(x, y); return `<circle class="ni-o breast" cx="${a}" cy="${b}" r="5"/>`; }).join(""),
    liver: `<path class="ni-o liver" d="${smooth([[80, 384], [102, 378], [118, 382], [112, 392], [96, 398], [80, 396]].map(B), true)}"/>`,
    kidney: [[92, 404], [124, 404]].map(([x, y]) => { const [a, b] = at(x, y); return `<ellipse class="ni-o kidney" cx="${a}" cy="${b}" rx="3.2" ry="5"/>`; }).join(""),
    colon: `<path class="ni-o colon" d="${smooth([[94, 436], [88, 420], [92, 410], [108, 412], [124, 410], [128, 420], [122, 436]].map(B))}"/>`,
    bone: `<path class="ni-o bone" d="${smooth([[94, 456], [95, 482]].map(B))}"/><path class="ni-o bone" d="${smooth([[122, 456], [121, 482]].map(B))}"/>`,
    blood: `<path class="ni-o blood" d="${smooth([[108, 304], [108, 330], [110, 352], [108, 376]].map(B))}"/>`,
  };
  const tsite = (x, y, r = 2) => { const [a, b] = at(x, y); return `<circle class="ni-tsite" cx="${a}" cy="${b}" r="${r}"/>`; };
  const sites = tsite(100, 310) + tsite(115, 350) + tsite(94, 362) + tsite(130, 360, 1.8) + tsite(90, 388) + tsite(106, 386, 1.6) + tsite(124, 404) + tsite(92, 418) + tsite(95, 470, 1.8);
  const list = [["node", "limfom Hodgkin (ganglioni)"], ["blood", "leucemie acută (măduvă, sânge)"], ["lung", "tumori pulmonare"], ["breast", "tumori mamare"], ["liver", "metastaze hepatice"], ["kidney", "cancer renal"], ["colon", "cancer de colon"], ["bone", "sarcoame osoase"]];
  const b3 = `<g class="ni-b b3"><text class="ni-ti" x="22" y="282" data-ui>Febra în context neoplazic: exemple din LP</text>`
    + `<path class="ni-body" d="${smooth(bodyPts, true, 0.5)}"/><ellipse class="ni-body" cx="${f1(head[0])}" cy="${f1(head[1])}" rx="12" ry="14"/>`
    + orgs.blood + orgs.lung + orgs.node + orgs.breast + orgs.liver + orgs.kidney + orgs.colon + orgs.bone + sites
    + list.map(([key, t], i) => `<rect class="ni-o ${key} sw" x="152" y="${296 + i * 13}" width="8" height="8" rx="2"/>${lb(166, 303 + i * 13, t)}`).join("")
    + lb(152, 410, "plurifactorial: tumora, hipersensibilitate,") + lb(152, 419, "grefă contra gazdă, tromboze;") + lb(152, 432, "citokinele proinflamatorii din răspunsul") + lb(152, 441, "gazdei la tumoră declanșează febra") + `</g>`;
  const panelB = `<rect class="ni-card" x="${cB.x}" y="${cB.y}" width="${cB.w}" height="${cB.h}" rx="10"/>${b0}${b1}${b2}${b3}`;
  const frames = `<rect class="ni-card" x="${cA.x}" y="${cA.y}" width="${cA.w}" height="${cA.h}" rx="10"/>`;
  return {
    W, H,
    defs: BM.defs + `<clipPath id="__U__-cA"><rect x="${cA.x}" y="${cA.y}" width="${cA.w}" height="${cA.h}" rx="10"/></clipPath><clipPath id="__U__-sm"><circle cx="${sm.c[0]}" cy="${sm.c[1]}" r="${sm.r - 2}"/></clipPath>`,
    L: { frames, panelA, panelB },
    hits: {
      trig: { x: 16, y: 34, w: 152, h: 200 }, bridge: { cx: 186, cy: 136, r: 18 }, mac: { cx: MC[0], cy: MC[1], r: 40 }, ck: { x: 270, y: 82, w: 36, h: 82 }, hyp: { x: 312, y: 16, w: 92, h: 54 }, therm: { x: 390, y: 78, w: 18, h: 86 },
      b0ch: { x: 18, y: 270, w: 196, h: 186 }, b0ni: { x: 218, y: 270, w: 188, h: 186 }, b1mol: { x: 18, y: 290, w: 214, h: 62 }, b1sm: { cx: sm.c[0], cy: sm.c[1], r: sm.r + 2 },
      b2fv: { x: 30, y: 298, w: 370, h: 64 }, b2lk: { x: 30, y: 366, w: 370, h: 20 }, b3body: { x: 18, y: 286, w: 128, h: 170 },
    },
    badges: { trig: [164, 44], bridge: [186, 108], mac: [268, 170], ck: [306, 76], hyp: [326, 52], therm: [400, 172], b0ch: [206, 300], b0ni: [396, 286], b1mol: [234, 282], b1sm: [384, 306], b2fv: [398, 300], b2lk: [398, 376], b3body: [140, 300] },
  };
}

export function preview(state = {}) {
  const A = build(), L = A.L, sub = (x) => x.replaceAll("__U__", "pv");
  const st = state.st ?? 0;
  return { viewBox: `0 0 ${W} ${H}`, svg: sub(`<defs>${A.defs}</defs><g class="nix" data-st="${st}">${L.frames}${L.panelA}${L.panelB}</g>`) };
}
