// Tabla lecției Î15, în stilul Khan Academy: fundal închis, linii trasate cu mâna, cinci culori cu sens fix (COLORS din scenariu).
// Fiecare frază din scenariu (q15.script.mjs) are aici desenul ei: un grup de linii (path) și cuvinte scrise (text), pe care
// playerul (src/js/33-lesson.js) le trasează în ordine, cât timp vocea spune fraza. Tabla are 1280 × 720 (16:9).
// Desenul e o schemă de tablă, nu la scară, cu o excepție declarată: în cercul de mărire din capitolul 1 membrana are 4 nm
// și receptorii ~11–13 nm, la 10 px/nm, cu bara de 10 nm (structurile PDB 3FXI și 3A79).
import { smooth, rng } from "../lib/geo.mjs";
import { CH, COLORS, WPM } from "./q15.script.mjs";
import { plan, TITLE, GAP } from "./timing.mjs";

export const W = 1280, H = 720;
const f1 = (v) => (+v).toFixed(1);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const R = rng(15);
// linie „de mână”: punctele primesc o abatere mică, apoi o curbă netedă prin ele
const hand = (pts, closed = false, j = 1.4) => smooth(pts.map(([x, y]) => [x + (R() - 0.5) * j, y + (R() - 0.5) * j]), closed);
const P = (d, c, w = 4) => `<path class="ink c-${c}" d="${d}" stroke-width="${w}"/>`;
const L = (pts, c, w, closed = false, j) => P(hand(pts, closed, j), c, w);
// linie frântă „de mână” (fără curbă netedă): pentru trepte și curbe dese, unde netezirea ar depăși colțurile
const S = (pts, c, w, j = 0.6) => P(pts.map(([x, y], i) => `${i ? "L" : "M"}${f1(x + (R() - 0.5) * j)} ${f1(y + (R() - 0.5) * j)}`).join(""), c, w);
// foarfeca (TACE): două lame încrucișate în pivot, cu inelele la capătul opus; ang = direcția vârfurilor
function scissors(px, py, ang, c, len = 22) {
  let s = "";
  for (const sg of [-1, 1]) { const a = ang + sg * 0.38, tip = [px + Math.cos(a) * len, py + Math.sin(a) * len], back = [px - Math.cos(a) * len, py - Math.sin(a) * len];
    s += L([back, [px, py], tip], c, 3, false, 0.4) + ell(back[0] - Math.cos(a) * 6, back[1] - Math.sin(a) * 6, 6, 6, c, 2.5); }
  return s;
}
const T = (x, y, s, c, size = 38, anchor = "start") => `<text class="kt c-${c}" x="${f1(x)}" y="${f1(y)}" font-size="${size}" text-anchor="${anchor}">${esc(s)}</text>`;
const circ = (cx, cy, rx, ry = rx, n = 26, j = 1.6) => Array.from({ length: n }, (_, i) => { const a = i / n * Math.PI * 2; return [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]; });
const ell = (cx, cy, rx, ry, c, w = 4) => L(circ(cx, cy, rx, ry), c, w, true, 2);
// săgeată: corpul pe puncte și vârful (două linii scurte), ca un singur gest
function arrow(pts, c, w = 4, head = 16) {
  const [a, b] = [pts[pts.length - 2], pts[pts.length - 1]], ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
  const h1 = [b[0] - Math.cos(ang - 0.45) * head, b[1] - Math.sin(ang - 0.45) * head], h2 = [b[0] - Math.cos(ang + 0.45) * head, b[1] - Math.sin(ang + 0.45) * head];
  return P(hand(pts, false, 1), c, w) + P(`M${f1(h1[0])} ${f1(h1[1])}L${f1(b[0])} ${f1(b[1])}L${f1(h2[0])} ${f1(h2[1])}`, c, w);
}
// bastonaș (bacterie Gram-negativă): contur rotunjit
const pill = (cx, cy, len, hgt) => { const r = hgt / 2, pts = []; for (let i = 0; i <= 12; i++) { const a = -Math.PI / 2 + i / 12 * Math.PI; pts.push([cx + len / 2 - r + Math.cos(a) * r, cy + Math.sin(a) * r]); } for (let i = 0; i <= 12; i++) { const a = Math.PI / 2 + i / 12 * Math.PI; pts.push([cx - len / 2 + r + Math.cos(a) * r, cy + Math.sin(a) * r]); } return pts; };
// un receptor Toll ca potcoavă: de la bază (pe membrană) urcă și se curbează spre mijloc
const horse = (bx, by, top, side, wdt) => [[bx, by], [bx + side * 4, by - (by - top) * 0.45], [bx + side * wdt * 0.35, by - (by - top) * 0.9], [bx + side * wdt * 0.62, top], [bx + side * wdt * 0.9, top + 6]];

// ---- desenele, pe capitole și fraze (în ordinea din scenariu) ----
const G = {
  c1: [
    // 1.1 titlul
    () => T(40, 112, "exogen → endogen → efecte", "alb", 46),
    // 1.2 bacteria Gram-negativă: membrana externă și cea internă
    () => L(pill(200, 270, 240, 100), "rosu", 4, true, 1.2) + L(pill(200, 270, 216, 76), "rosu", 3, true, 1) + T(200, 282, "Gram −", "rosu", 34, "middle"),
    // 1.3 franjurile de LPS pe membrana externă
    () => { let s = ""; for (let i = 0; i < 9; i++) { const x = 116 + i * 21; s += L([[x, 220], [x + 2, 206], [x - 3, 196]], "rosu", 3, false, 0.6) + L([[x, 320], [x - 2, 334], [x + 3, 344]], "rosu", 3, false, 0.6); } return s + T(334, 236, "LPS", "rosu", 42); },
    // 1.4 bacteria Gram-pozitivă: peretele gros, acidul lipoteicoic
    () => { let s = L(circ(200, 520, 62, 62), "rosu", 4, true, 1.2) + L(circ(200, 520, 50, 50), "rosu", 3, true, 1) + L(circ(200, 520, 44, 44), "rosu", 2.5, true, 1); for (let i = 0; i < 7; i++) { const a = -0.3 + i * 0.9, x = 200 + Math.cos(a) * 62, y = 520 + Math.sin(a) * 62; s += L([[x, y], [x + Math.cos(a) * 10 + 4, y + Math.sin(a) * 10], [x + Math.cos(a) * 20, y + Math.sin(a) * 20 - 3]], "rosu", 2.5, false, 0.8); } return s + T(96, 622, "Gram +", "rosu", 34) + T(270, 598, "acid lipoteicoic", "rosu", 30); },
    // 1.5 cercul de mărire, membrana macrofagului (4 nm = 40 px) și bara de 10 nm
    () => L(circ(860, 400, 290, 290, 40), "alb", 3.5, true, 2) + L([[580, 470], [860, 471], [1141, 470]], "alb", 3.5, false, 1) + L([[593, 510], [860, 511], [1128, 510]], "alb", 3.5, false, 1)
      + T(700, 574, "membrana macrofagului", "alb", 30) + P("M640 628H740M640 620V636M740 620V636", "alb", 3) + T(752, 637, "10 nm", "alb", 28),
    // 1.6 LBP duce LPS la CD14 (cupa ancorată în membrană)
    () => arrow([[372, 206], [450, 152], [560, 182], [640, 292], [650, 400]], "albastru", 4) + L([[630, 412], [632, 440], [650, 452], [668, 440], [670, 412]], "albastru", 4, false, 0.6) + P("M650 452V470", "albastru", 3) + T(574, 168, "LBP", "albastru", 36) + T(585, 398, "CD14", "albastru", 30, "end"),
    // 1.7 dimerul TLR4–MD-2 („m”), cu segmentele transmembranare și domeniile TIR
    () => L(horse(782, 470, 384, 1, 66), "albastru", 9, false, 0.8) + L(horse(898, 470, 384, -1, 66), "albastru", 9, false, 0.8) + ell(832, 380, 11, 9, "albastru", 3.5) + ell(848, 380, 11, 9, "albastru", 3.5)
      + P("M782 470V512M898 470V512", "albastru", 4) + ell(782, 524, 10, 8, "albastru", 3) + ell(898, 524, 10, 8, "albastru", 3) + T(830, 342, "TLR4:MD-2", "albastru", 32, "middle"),
    // 1.8 heterodimerul TLR2:TLR6, cu acidul lipoteicoic pe el
    () => L(horse(976, 470, 398, 1, 52), "albastru", 9, false, 0.8) + L(horse(1068, 470, 398, -1, 52), "albastru", 9, false, 0.8) + P("M976 470V512M1068 470V512", "albastru", 4) + ell(976, 524, 10, 8, "albastru", 3) + ell(1068, 524, 10, 8, "albastru", 3)
      + L([[1022, 352], [1016, 362], [1026, 372], [1018, 382], [1022, 392]], "rosu", 3, false, 0.4) + T(1022, 336, "TLR2:TLR6", "albastru", 32, "middle"),
    // 1.9 macrofagul înconjoară bacteria (pseudopode), C3b pe bacterie
    () => L([[60, 300], [56, 230], [90, 186], [160, 172], [230, 176], [300, 190], [346, 222]], "alb", 4, false, 1.4) + L([[66, 316], [100, 352], [170, 366], [250, 364], [320, 344], [348, 316]], "alb", 4, false, 1.4)
      + [[150, 216], [228, 214], [266, 322]].map(([x, y]) => ell(x, y, 4, 4, "alb", 2.5)).join("") + T(40, 410, "fagocitoză", "alb", 30),
    // 1.10 cercul de semnalizare: tiparul microbian
    () => ell(925, 448, 192, 96, "galben", 4) + T(925, 296, "recunosc tipare microbiene", "galben", 34, "middle"),
  ],
  c2: [
    // 2.1 macrofagul: membrana cu pseudopode, receptorii, nucleul
    () => { const pts = circ(400, 410, 290, 225, 30).map(([x, y], i) => [x + (i % 5 === 0 ? 14 : 0) * Math.cos(i), y + (i % 7 === 0 ? 10 : 0)]); return L(pts, "alb", 4, true, 3) + L([[350, 420], [420, 396], [520, 410], [540, 470], [500, 530], [420, 540], [360, 520], [372, 476], [420, 470], [452, 452], [420, 436], [366, 444]], "alb", 3.5, true, 1.5)
      + [[230, 222], [300, 196], [380, 186]].map(([x, y]) => L([[x - 10, y - 14], [x - 8, y - 2], [x, y + 4], [x + 8, y - 2], [x + 10, y - 14]], "albastru", 4, false, 0.5)).join("") + T(548, 532, "nucleu", "alb", 28); },
    // 2.2 semnalul în trepte
    () => arrow([[300, 214], [298, 262]], "galben", 4, 12) + T(318, 260, "MyD88", "galben", 30) + arrow([[300, 278], [298, 322]], "galben", 4, 12) + T(318, 320, "kinaze", "galben", 30) + arrow([[300, 338], [300, 378]], "galben", 4, 12) + T(318, 384, "NF-κB", "galben", 32),
    // 2.3 NF-κB intră în nucleu: genele
    () => arrow([[352, 396], [384, 430], [410, 452]], "galben", 4, 14) + T(430, 492, "gene", "galben", 32),
    // 2.4 pirogenii endogeni ies din celulă
    () => arrow([[700, 330], [760, 314]], "verde", 4, 14) + T(776, 316, "IL-1, TNF-α, IL-6", "verde", 46),
    // 2.5 cercul: endogeni
    () => ell(938, 302, 186, 50, "galben", 4) + T(938, 238, "pirogeni endogeni", "galben", 34, "middle"),
    // 2.6 IL-6: slab, dar persistent
    () => T(780, 392, "IL-6: slab, dar persistent", "verde", 32),
    // 2.7 lista din LP
    () => T(780, 444, "LP: + IFN-α, IFN-γ, IL-8, TNF-β", "verde", 28),
    // 2.8 TNF-α ancorat în membrană și foarfeca TACE
    () => P("M634 544L700 533", "verde", 3.5) + ell(711, 522, 9, 9, "verde", 3) + ell(716, 542, 9, 9, "verde", 3) + ell(729, 528, 9, 9, "verde", 3)
      + scissors(667, 562, -Math.PI / 2, "verde") + T(748, 538, "TACE taie TNF-α", "verde", 28),
    // 2.9 porul de gasdermină D și IL-1β care iese
    () => P("M430 616V648M466 614V646", "verde", 5) + [[448, 660], [441, 672], [455, 672]].map(([x, y]) => ell(x, y, 7, 7, "verde", 2.5)).join("") + arrow([[448, 684], [448, 704]], "verde", 3, 10) + T(486, 690, "IL-1β prin porii de gasdermină D", "verde", 26),
    // 2.10 în sânge
    () => P("M820 640H1240M820 700H1240", "alb", 3) + arrow([[650, 612], [740, 638], [858, 664]], "verde", 4, 14) + [[900, 668], [960, 676], [1020, 664], [1080, 674], [1140, 668]].map(([x, y]) => ell(x, y, 5, 5, "verde", 3)).join("") + T(1180, 630, "sânge", "alb", 28, "end"),
  ],
  c3: (() => {
    const X = (t) => 660 + t * 110, Y = (T) => 600 - (T - 36.5) * 120;
    // temperatura corpului: urcă exponențial spre noul prag (atins la ~2,8 h), platou, apoi coboară după criză
    const rise = (t) => 37 + 2 * (1 - Math.exp(-(t - 0.5) / 0.55)) / (1 - Math.exp(-2.3 / 0.55));
    const core = [[X(0), Y(37)], [X(0.5), Y(37)]]; for (let i = 1; i <= 28; i++) { const t = 0.5 + i / 28 * 2.3; core.push([X(t), Y(rise(t))]); } core.push([X(3.6), Y(39)]);
    const fall = [[X(3.6), Y(39)]]; for (let i = 1; i <= 16; i++) { const t = 3.6 + i / 16 * 1.5; fall.push([X(t), Y(37 + 2 * Math.exp(-(t - 3.6) / 0.4))]); }
    return [
      // 3.1 creierul în secțiune sagitală, cu hipotalamusul (aria preoptică)
      () => L([[90, 330], [80, 250], [120, 170], [210, 120], [320, 110], [420, 140], [490, 210], [510, 290], [480, 350], [420, 370], [330, 360], [270, 350], [200, 352], [130, 350]], "alb", 4, true, 2)
        + L([[430, 372], [480, 360], [520, 380], [512, 420], [460, 430], [432, 408]], "alb", 3.5, true, 1.5) + L([[338, 362], [346, 410], [352, 452]], "alb", 3.5, false, 1) + L([[372, 364], [380, 408], [388, 448]], "alb", 3.5, false, 1)
        + ell(250, 362, 22, 14, "alb", 3) + P("M196 396L232 374", "alb", 2.5) + T(60, 420, "hipotalamus anterior", "alb", 28) + T(60, 452, "(aria preoptică)", "alb", 26),
      // 3.2 OVLT fără barieră
      () => T(60, 506, "OVLT — fără barieră hematoencefalică", "alb", 30) + arrow([[50, 488], [36, 430], [96, 380], [222, 358]], "alb", 3, 12),
      // 3.3 COX-2 → PGE2
      () => T(60, 594, "COX-2 → PGE₂ ↑", "galben", 40),
      // 3.4 AMPc, GMPc → pragul ↑
      () => T(60, 656, "AMPc, GMPc → pragul ↑", "galben", 40),
      // 3.5 axele graficului (după Guyton fig. 74-11; Febra LP, slide 27)
      () => P(`M${X(0)} 150V600H1236`, "alb", 3.5) + P(`M${X(0) - 8} ${Y(37)}H${X(0)}M${X(0) - 8} ${Y(39)}H${X(0)}`, "alb", 3) + T(X(0) - 14, Y(37) + 10, "37", "alb", 30, "end") + T(X(0) - 14, Y(39) + 10, "39", "alb", 30, "end")
        + T(X(0) - 14, 168, "°C", "alb", 28, "end") + [1, 2, 3, 4, 5].map((t) => P(`M${X(t)} 600V608`, "alb", 3)).join("") + T(1236, 640, "ore", "alb", 28, "end"),
      // 3.6 pragul termostatului urcă brusc
      () => S([[X(0), Y(37)], [X(0.5), Y(37)], [X(0.54), Y(39)], [X(3.6), Y(39)]], "galben", 4) + T(X(0.6), Y(39) - 16, "pragul", "galben", 30),
      // 3.7 temperatura corpului urcă încet: frig, frison
      () => S(core, "alb", 4, 0.4) + T(X(1.2), Y(37.6), "frig, frison", "alb", 28),
      // 3.8 febra pe platou
      () => ell(X(3.2), Y(39), 66, 30, "galben", 4) + T(X(3.2), Y(39) - 44, "febra", "galben", 40, "middle"),
      // 3.9 criza: pragul cade, temperatura urmează
      () => S([[X(3.6), Y(39)], [X(3.64), Y(37)], [X(5.1), Y(37)]], "galben", 4) + S(fall, "alb", 4, 0.4) + T(X(3.9), Y(39) - 16, "criza", "galben", 30),
      // 3.10 aspirina taie COX
      () => P("M56 580L168 574", "alb", 4) + T(60, 548, "aspirina", "alb", 28),
    ];
  })(),
  c4: [
    // 4.1 periferic: apărarea ↑
    () => T(40, 120, "periferic: apărarea ↑", "alb", 40),
    // 4.2 neutrofilul (nucleu lobat): nespecifică
    () => L(circ(120, 230, 46, 44), "alb", 4, true, 1.6) + [[100, 222], [118, 240], [140, 224]].map(([x, y]) => ell(x, y, 10, 8, "alb", 3)).join("") + P("M108 228L114 236M126 236L134 228", "alb", 2.5) + T(60, 316, "nespecifică", "alb", 30),
    // 4.3 limfocitele B și T: specifică
    () => L(circ(300, 230, 32, 32), "alb", 4, true, 1) + L(circ(300, 230, 24, 24), "alb", 3, true, 1) + T(300, 241, "B", "alb", 28, "middle") + L(circ(390, 230, 32, 32), "alb", 4, true, 1) + L(circ(390, 230, 24, 24), "alb", 3, true, 1) + T(390, 241, "T", "alb", 28, "middle") + T(276, 316, "specifică", "alb", 30),
    // 4.4 anticorpii
    () => [[262, 164], [300, 152], [338, 164]].map(([x, y]) => P(`M${x} ${y + 16}V${y + 4}M${x} ${y + 4}L${x - 8} ${y - 6}M${x} ${y + 4}L${x + 8} ${y - 6}`, "alb", 3)).join(""),
    // 4.5 venula
    () => L([[40, 400], [640, 402], [1240, 400]], "alb", 4, false, 1) + L([[40, 460], [640, 458], [1240, 460]], "alb", 4, false, 1) + T(1236, 440, "vas", "alb", 26, "end"),
    // 4.6 1. mediatori lipidici
    () => T(560, 120, "1. PGE₂, TxA₂, PAF", "galben", 36),
    // 4.7 2. din măduvă în vas
    () => T(40, 560, "2. măduvă", "alb", 34) + arrow([[110, 530], [124, 500], [140, 466]], "alb", 4, 12) + [[116, 514], [130, 490]].map(([x, y]) => ell(x + 14, y, 6, 6, "alb", 2.5)).join(""),
    // 4.8 3. moleculele de adeziune pe perete
    () => { let s = ""; for (let i = 0; i < 8; i++) { const x = 300 + i * 24; s += P(`M${x} 460V448`, "albastru", 3) + ell(x, 443, 4.5, 4.5, "albastru", 2.5); } return s + T(300, 500, "3. adeziune", "albastru", 30); },
    // 4.9 4. IL-8 cheamă spre focar
    () => arrow([[620, 464], [624, 530], [620, 590]], "verde", 4, 14) + T(640, 540, "4. IL-8", "verde", 34) + T(596, 636, "focar", "verde", 30),
    // 4.10 5. fagocitoza
    () => L([[790, 560], [800, 520], [840, 506], [880, 520], [900, 540], [886, 556], [868, 548], [872, 566], [890, 590], [860, 612], [814, 606]], "alb", 4, true, 1.4) + L(pill(856, 556, 26, 12), "rosu", 3, true, 0.3) + T(780, 494, "5. fagocitoză", "alb", 30),
    // 4.11 6. ficatul: proteine de fază acută
    () => T(560, 182, "6. ficat → proteine de fază acută (PCR, fibrinogen)", "alb", 31),
    // 4.12 7. Fe și Zn scad
    () => T(560, 242, "7. Fe ↓, Zn ↓", "galben", 36),
    // 4.13 8. limfocite și interferoni
    () => T(560, 302, "8. LB, LT, IFN antivirali", "verde", 36),
    // 4.14 recapitularea, pe tablă curată
    () => T(60, 150, "pirogen exogen → TLR", "rosu", 46),
    // 4.15
    () => arrow([[150, 172], [150, 236]], "verde", 4, 14) + T(60, 280, "IL-1, TNF-α, IL-6", "verde", 46),
    // 4.16
    () => arrow([[150, 302], [150, 366]], "galben", 4, 14) + T(60, 410, "central: PGE₂ → prag ↑ → febra", "galben", 44),
    // 4.17
    () => arrow([[150, 432], [150, 500], [140, 520]], "alb", 4, 14) + arrow([[150, 470], [420, 500], [560, 520]], "alb", 4, 14) + T(60, 562, "periferic", "alb", 42) + T(560, 562, "proinflamator (8)", "alb", 42),
  ],
};

// un path cu mai multe subtrasee (M…M…) devine path-uri separate, ca fiecare să fie trasat cap-coadă (dash-ul nu se reia între subtrasee)
const split = (svg) => svg.replace(/<path ([^>]*?)d="([^"]+)"([^>]*)\/>/g, (m, a, d, b) => d.split(/(?=M)/).map((x) => `<path ${a}d="${x}"${b}/>`).join(""));
const r1 = (v) => +v.toFixed(2);

export function build() {
  const TM = plan(CH, WPM);
  const chapters = CH.map((ch, ci) => {
    const g = G[ch.id], tm = TM.chapters[ci];
    if (!g || g.length !== ch.lines.length) throw new Error(`desenul capitolului ${ch.id}: ${g ? g.length : 0} desene pentru ${ch.lines.length} fraze`);
    return {
      id: ch.id, title: ch.title, t0: r1(tm.t0), t1: r1(tm.t1),
      titleSvg: T(40, 52, ch.title, "alb", 30),
      lines: ch.lines.map((l, i) => { const m = tm.lines[i]; return { t: l.t, ki: m.ki, act: l.a, rub: l.rub || [], src: l.src, clear: !!l.clear, svg: split(g[i]()),
        start: r1(m.start), dur: r1(m.dur), aOff: r1(m.aOff), aDur: r1(m.aDur), len: r1(m.len) }; }),
    };
  });
  return { W, H, WPM, TITLE, GAP, total: r1(TM.total), colors: Object.fromEntries(Object.entries(COLORS).map(([k, v]) => [k, v.hex])), legend: Object.fromEntries(Object.entries(COLORS).map(([k, v]) => [k, v.rol])), chapters };
}
