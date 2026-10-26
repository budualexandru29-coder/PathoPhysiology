// Î4: mecanismele generale ale hipotermiei.
// Sus, o metaforă mecanică (marcată ca atare): rezervorul de căldură al corpului. Robinetul de sus e termogeneza, scurgerea
// de jos e termoliza, nivelul apei e temperatura centrală (gradat 37, 35, 32, 28°C, pragurile din LP). Hipotermia apare
// când scurgerea depășește robinetul: pierdere excesivă (↑ termoliza) sau producție inadecvată (↓ termogeneza).
// În dreapta, categoriile mai expuse. Jos, patru casete cu consecințele, pe etape (răspunsul inițial, epuizarea, decompensarea):
//  1. pielea: arteriola, capilarele, șuntul arteriovenos și venula (vasoconstricția, alterarea microcirculației);
//  2. ficatul și mușchiul: glicogenul din hepatocite, consumul de O2 și metabolismul (schematic, fără valori);
//  3. sângele: hematiile (vâscozitatea), acidul lactic și pH-ul;
//  4. inima: potențialul de acțiune al miocitului ventricular și traseul ECG (tahicardie, bradicardie, fibrilație, asistolie).
import { smooth, poly, lumpy, rng } from "./lib/geo.mjs";

export const W = 420, H = 474;
const f1 = (v) => (+v).toFixed(1);
const lb = (x, y, t, a = "start", cls = "") => `<text class="hm2-lb ${cls}" x="${f1(x)}" y="${f1(y)}" text-anchor="${a}" data-ui>${t}</text>`;

/* ---------- ECG: un complex P–QRS–T (opțional cu undă J Osborn și QRS lărgit) ---------- */
function beat(x, y, s = 1, { wide = 1, j = 0, amp = 1 } = {}) {
  const k = (v) => f1(v * s);
  return `L${f1(x)} ${f1(y)}q${k(2)} ${k(-3 * amp)} ${k(4)} 0l${k(2)} 0l${k(1 * wide)} ${k(2)}l${k(1.4 * wide)} ${k(-14 * amp)}l${k(1.6 * wide)} ${k(16 * amp)}l${k(1 * wide)} ${k(-4)}${j ? `q${k(1.4)} ${k(-4 * j)} ${k(3)} ${k(-1)}` : `l${k(2)} 0`}l${k(3)} 0q${k(3)} ${k(-5 * amp)} ${k(6)} 0`;
}
function strip(x0, x1, y, bpm, opts = {}) {
  const gap = 60 / bpm * 28;                      // px între bătăi (schematic)
  let d = `M${x0} ${y}`, x = x0 + 4;
  while (x + 30 < x1) { d += beat(x, y, 1, opts); x += gap; }
  return d + `L${x1} ${y}`;
}
// fibrilația ventriculară, apoi linia izoelectrică (asistolie)
function vfThenFlat(x0, x1, y, R) {
  let d = `M${x0} ${y}`, x = x0;
  const xm = x0 + (x1 - x0) * 0.55;
  while (x < xm) { const a = 3 + R() * 7 * (1 - (x - x0) / (xm - x0) * 0.6); d += `Q${f1(x + 2.4)} ${f1(y - a)} ${f1(x + 4.8)} ${f1(y)}Q${f1(x + 7.2)} ${f1(y + a * 0.8)} ${f1(x + 9.6)} ${f1(y)}`; x += 9.6; }
  return d + `L${x1} ${y}`;
}
// potențialul de acțiune al miocitului ventricular: faza 0 (urcarea), 1 (crestătura), 2 (platoul), 3 (repolarizarea), 4 (repausul)
function apPath(x0, yR, yP, dur, up = 1.4) {
  const yN = yP + 6, yPl = yP + 9;
  return `M${x0} ${yR}H${f1(x0 + 6)}L${f1(x0 + 6 + up)} ${yP}L${f1(x0 + 8 + up)} ${yN}Q${f1(x0 + 10 + up)} ${yPl - 1} ${f1(x0 + 14 + up)} ${yPl}L${f1(x0 + 14 + up + dur * 0.55)} ${f1(yPl + 4)}C${f1(x0 + 14 + up + dur * 0.8)} ${f1(yPl + 8)} ${f1(x0 + 14 + up + dur * 0.9)} ${yR} ${f1(x0 + 14 + up + dur)} ${yR}H${f1(x0 + 104)}`;
}

export function build() {
  const R = rng(41);
  /* ======================= A. rezervorul (metaforă) și categoriile expuse ======================= */
  const cA = { x: 10, y: 10, w: 400, h: 188 };
  const TK = { x: 64, y: 46, w: 76, h: 136 };                      // rezervorul
  const Ty = (t) => 60 + (37 - t) * 12;                            // 37°C → y 60, 27°C → y 180
  const tank = `<rect class="hm2-tk" x="${TK.x}" y="${TK.y}" width="${TK.w}" height="${TK.h}" rx="6"/>`;
  const water = `<g clip-path="url(#__U__-tk)"><g class="hm2-wl"><rect class="hm2-w" x="${TK.x}" y="${Ty(37)}" width="${TK.w}" height="${TK.h + 60}"/><path class="hm2-ws" d="M${TK.x} ${Ty(37)}q9.5 -2 19 0t19 0t19 0t19 0"/></g></g>`;
  const tankFront = `<rect class="hm2-tkf" x="${TK.x}" y="${TK.y}" width="${TK.w}" height="${TK.h}" rx="6"/><path class="hm2-tkg" d="M${TK.x + 6} ${TK.y + 8}V${TK.y + TK.h - 10}"/>`;
  // gradația (temperatura centrală)
  const gauge = [37, 35, 32, 28].map((t) => `<path class="hm2-gt${t === 35 ? " th" : ""}" d="M${TK.x - 8} ${Ty(t)}H${TK.x + (t === 35 ? TK.w : 0)}"/>${lb(TK.x - 11, Ty(t) + 2.2, String(t), "end", t === 35 ? "th" : "")}`).join("") + lb(TK.x - 30, TK.y - 4, "Tc (°C)", "start");
  // robinetul (termogeneza): țeava din dreapta sus, roata ventilului, jetul
  const inflow = `<path class="hm2-pipe" d="M206 30H96V40"/><circle class="hm2-vw" cx="160" cy="30" r="6.4"/><path class="hm2-vws" d="M160 23.6V36.4M153.6 30H166.4"/><circle class="hm2-vwc" cx="160" cy="30" r="1.6"/>`
;
  const inJet = `<path class="hm2-jet in" d="M96 42V${TK.y + TK.h - 4}"/><path class="hm2-jetf in" d="M96 42V${TK.y + TK.h - 4}"/>`;
  // scurgerea (termoliza): țeava de jos, ventilul, jetul care iese
  const outflow = `<path class="hm2-pipe" d="M${TK.x + TK.w} ${TK.y + TK.h - 10}H190V196"/><circle class="hm2-vw" cx="166" cy="${TK.y + TK.h - 10}" r="6.4"/><path class="hm2-vws" d="M166 ${TK.y + TK.h - 16.4}V${TK.y + TK.h - 3.6}M159.6 ${TK.y + TK.h - 10}H172.4"/><circle class="hm2-vwc" cx="166" cy="${TK.y + TK.h - 10}" r="1.6"/>`
    + `<path class="hm2-jet out" d="M190 ${TK.y + TK.h - 10}V198"/><path class="hm2-jetf out" d="M190 ${TK.y + TK.h - 10}V198"/>`;
  const labsTank = lb(170, 22, "termogeneza", "start", "b") + lb(170, 44, "metabolism bazal,", "start") + lb(170, 51, "mușchi (frison), ficat", "start")
    + lb(198, 150, "termoliza", "start", "b") + lb(198, 158, "radiație, convecție,", "start") + lb(198, 165, "conducție, evaporare", "start")
    + lb(220, 180, "metaforă: apa = căldura corpului,", "start", "dim") + lb(220, 187, "nivelul = temperatura centrală", "start", "dim");
  // săgețile de tendință (nivelul scade)
  const trend = `<g class="hm2-trend"><path d="M${TK.x + TK.w / 2} 66V84"/><path d="M${TK.x + TK.w / 2 - 4} 79L${TK.x + TK.w / 2} 85L${TK.x + TK.w / 2 + 4} 79"/></g>`;
  // categoriile mai expuse (LP) și numitorul comun
  const RX = 286;
  const risk = `<g class="hm2-risk"><rect class="hm2-rbox" x="${RX - 8}" y="58" width="128" height="84" rx="6"/>${lb(RX, 70, "Mai expuși (LP)", "start", "b")}`
    + ["vârstnici, sugari, nou-născuți", "alcoolici, bolnavi psihic", "hipotiroidism, hipopituitarism", "insuf. hepatică, malnutriție,", "artrită reumatoidă"].map((t, i) => `${i < 4 ? `<circle class="hm2-dot" cx="${RX + 1}" cy="${78.2 + i * 9}" r="1.3"/>` : ""}${lb(RX + 5, 80 + i * 9, t)}`).join("")
    + lb(RX, 132, "numitor comun: rată metabolică", "start", "i") + lb(RX, 139, "scăzută, glicoliză insuficientă", "start", "i") + `</g>`;
  // eticheta etapei, sus în dreapta (una pe stare)
  const capT = ["Echilibru: robinetul = scurgerea", "Pierdere excesivă: ↑ termoliza", "Producție inadecvată: ↓ termogeneza", "Răspunsul inițial: compensarea", "Epuizarea resurselor", "Decompensarea"];
  const caps = capT.map((t, i) => `<g class="hm2-cap c${i}">${lb(404, 22, t, "end", "cap")}</g>`).join("");
  const panelA = `<g clip-path="url(#__U__-cA)"><rect class="hm2-bg" x="${cA.x}" y="${cA.y}" width="${cA.w}" height="${cA.h}"/>${inflow}${tank}${inJet}${water}${outflow}${tankFront}${gauge}${trend}${labsTank}${risk}${caps}</g>`;

  /* ======================= B. consecințele, în patru casete ======================= */
  const tile = (x, y, t) => `<rect class="hm2-card" x="${x}" y="${y}" width="194" height="128" rx="9"/>${lb(x + 8, y + 13, t, "start", "ti")}`;
  // 1. pielea: microcirculația
  const o1 = [14, 206];
  const sk = (dx, dy) => [o1[0] + dx, o1[1] + dy];
  const ar = [sk(6, 46), sk(66, 46), sk(150, 46)], vn = [sk(54, 100), sk(188, 100)];
  const caps1 = [70, 100, 130].map((dx) => `<path class="hm2-cap1" d="M${f1(sk(dx, 46)[0])} ${f1(sk(dx, 46)[1])}C${f1(sk(dx - 10, 30)[0])} ${f1(sk(dx - 10, 30)[1])} ${f1(sk(dx + 22, 30)[0])} ${f1(sk(dx + 22, 30)[1])} ${f1(sk(dx + 12, 60)[0])} ${f1(sk(dx + 12, 60)[1])}S${f1(sk(dx + 6, 92)[0])} ${f1(sk(dx + 6, 92)[1])} ${f1(sk(dx + 14, 100)[0])} ${f1(sk(dx + 14, 100)[1])}"/>`).join("");
  const sph = [70, 100, 130].map((dx) => `<circle class="hm2-sph" cx="${f1(sk(dx + 1, 42)[0])}" cy="${f1(sk(dx + 1, 42)[1])}" r="2.4"/>`).join("");
  const sludge = `<g class="hm2-sl">${[[76, 66], [106, 70], [136, 64], [84, 86], [118, 88]].map(([dx, dy]) => `<ellipse cx="${f1(sk(dx, dy)[0])}" cy="${f1(sk(dx, dy)[1])}" rx="3" ry="2.2"/>`).join("")}</g>`;
  const b1 = `<g class="hm2-t1">${tile(o1[0], o1[1], "Pielea: microcirculația")}<rect class="hm2-skin" x="${o1[0] + 6}" y="${o1[1] + 18}" width="182" height="10" rx="2"/>`
    + `<path class="hm2-ven" d="M${f1(vn[0][0])} ${f1(vn[0][1])}H${f1(vn[1][0])}"/>${caps1}${sludge}<path class="hm2-shunt" d="M${f1(sk(58, 46)[0])} ${f1(sk(58, 46)[1])}V${f1(sk(58, 100)[1])}"/>`
    + `<path class="hm2-art" d="M${f1(ar[0][0])} ${f1(ar[0][1])}H${f1(ar[2][0])}"/>${sph}`
    + lb(sk(8, 40)[0], sk(8, 40)[1], "arteriolă") + lb(sk(150, 60)[0], sk(150, 60)[1], "capilare") + lb(sk(186, 112)[0], sk(186, 112)[1], "venulă", "end") + lb(sk(54, 76)[0], sk(54, 76)[1], "șunt", "end") + lb(sk(8, 124)[0], sk(8, 124)[1], "pielea palidă, capilarele goale", "start", "s3") + `</g>`;
  // 2. ficatul și mușchiul: glicogenul, consumul de O2, metabolismul
  const o2 = [212, 206];
  const hp = (dx, dy) => [o2[0] + dx, o2[1] + dy];
  let hep = `<rect class="hm2-sin" x="${f1(hp(8, 70)[0])}" y="${f1(hp(8, 70)[1])}" width="112" height="9" rx="4"/>${[18, 40, 66, 90, 110].map((dx) => `<ellipse class="rbc" cx="${f1(hp(dx, 74.5)[0])}" cy="${f1(hp(dx, 74.5)[1])}" rx="3.4" ry="2.6"/>`).join("")}`;
  const RG = rng(7);
  [0, 1, 2, 3].forEach((i) => {
    const cx = hp(22 + i * 27, 48)[0], cy = hp(22 + i * 27, 48)[1];
    hep += `<path class="hm2-hep" d="${poly([[cx - 13, cy - 7], [cx, cy - 15], [cx + 13, cy - 7], [cx + 13, cy + 7], [cx, cy + 15], [cx - 13, cy + 7]], true)}"/>`;
    for (let g = 0; g < 18; g++) { const a = RG() * 6.283, r = 5 + RG() * 6; hep += `<circle class="hm2-gl k${g % 4}" cx="${f1(cx + Math.cos(a) * r)}" cy="${f1(cy + Math.sin(a) * r * 0.9)}" r=".95"/>`; }
    hep += `<circle class="hm2-hn" cx="${f1(cx)}" cy="${f1(cy)}" r="3.6"/><circle class="hm2-hpk" cx="${f1(cx)}" cy="${f1(cy)}" r="1.9"/>`;
  });
  // fibra musculară striată (frisonul)
  const mf = hp(8, 92);
  const muscle = `<g class="hm2-mus"><rect class="hm2-mf" x="${f1(mf[0])}" y="${f1(mf[1])}" width="112" height="14" rx="7"/>${[...Array(22)].map((_, i) => `<path class="hm2-mz" d="M${f1(mf[0] + 6 + i * 4.8)} ${f1(mf[1] + 2)}v10"/>`).join("")}</g>`;
  // barele: consumul de O2 și metabolismul (schematic, fără valori)
  const bar = (dx, key, t) => { const [x, y] = hp(dx, 22); return `<rect class="hm2-bb" x="${f1(x)}" y="${f1(y)}" width="14" height="80" rx="3"/><g class="hm2-bf ${key}"><rect x="${f1(x + 2)}" y="${f1(y + 2)}" width="10" height="76" rx="2"/></g>${lb(x + 7, y + 90, t, "middle")}`; };
  const b2 = `<g class="hm2-t2">${tile(o2[0], o2[1], "Ficatul și mușchiul")}${hep}${muscle}${bar(134, "o2", "O₂")}${bar(162, "mb", "metab.")}`
    + lb(hp(8, 30)[0], hp(8, 30)[1], "hepatocite cu glicogen") + lb(hp(8, 118)[0], hp(8, 118)[1], "fibră musculară") + `</g>`;
  // 3. sângele: hematiile (vâscozitatea), acidul lactic și pH-ul
  const o3 = [14, 340];
  const bp = (dx, dy) => [o3[0] + dx, o3[1] + dy];
  const capT3 = bp(8, 26);
  const rbcN = [12, 30, 48, 66, 84, 100].map((dx, i) => `<ellipse class="rbc" cx="${f1(capT3[0] + dx)}" cy="${f1(capT3[1] + 12 + (i % 2 ? 3 : -3))}" rx="5" ry="3.8"/>`).join("");
  const rbcR = [...Array(11)].map((_, i) => `<rect class="rbc" x="${f1(capT3[0] + 18 + i * 4.2)}" y="${f1(capT3[1] + 5)}" width="3.6" height="14" rx="1.8"/>`).join("") + [...Array(6)].map((_, i) => `<ellipse class="rbc" cx="${f1(capT3[0] + 74 + i * 7)}" cy="${f1(capT3[1] + 12 + (i % 2 ? 3 : -3))}" rx="4.6" ry="3.6"/>`).join("");
  const leak = `<g class="hm2-leak">${[30, 60, 90].map((dx) => `<path d="M${f1(capT3[0] + dx)} ${f1(capT3[1] + 25)}v7"/><path d="M${f1(capT3[0] + dx - 2.4)} ${f1(capT3[1] + 29.6)}l2.4 2.6l2.4 -2.6"/>`).join("")}</g>`;
  const cell3 = bp(40, 96);
  const lact = `<g class="hm2-lac"><path class="hm2-cell" d="${smooth(lumpy(cell3[0], cell3[1], 15, 12, 0.08, 3), true)}"/><circle class="hm2-cn" cx="${f1(cell3[0] - 5)}" cy="${f1(cell3[1] + 1)}" r="4"/>${lb(cell3[0] + 20, cell3[1] - 6, "glucoză → lactat + H⁺")}${lb(cell3[0] + 20, cell3[1] + 2, "(anaerob, O₂ puțin)")}${[...Array(10)].map((_, i) => `<text class="hm2-h" x="${f1(cell3[0] + 18 + (i % 5) * 9)}" y="${f1(cell3[1] + 12 + Math.floor(i / 5) * 8)}" data-ui>H⁺</text>`).join("")}</g>`;
  const PG = bp(166, 74);
  const phG = `<path class="hm2-pha" d="M${f1(PG[0] - 20)} ${f1(PG[1])}A20 20 0 0 1 ${f1(PG[0] + 20)} ${f1(PG[1])}"/><path class="hm2-phn" d="M${f1(PG[0] - 20)} ${f1(PG[1])}A20 20 0 0 1 ${f1(PG[0] - 6.2)} ${f1(PG[1] - 19)}"/>`
    + `<g class="hm2-ndl"><path d="M${f1(PG[0])} ${f1(PG[1])}V${f1(PG[1] - 16)}"/></g><circle class="hm2-ndc" cx="${f1(PG[0])}" cy="${f1(PG[1])}" r="2.4"/>`
    + lb(PG[0] - 22, PG[1] + 9, "acid", "start") + lb(PG[0] + 22, PG[1] + 9, "alcalin", "end") + lb(PG[0], PG[1] - 24, "pH", "middle", "b");
  const b3 = `<g class="hm2-t3">${tile(o3[0], o3[1], "Sângele: vâscozitate, pH")}<rect class="hm2-capb" x="${f1(capT3[0])}" y="${f1(capT3[1])}" width="116" height="24" rx="12"/><g class="hm2-rn">${rbcN}</g><g class="hm2-rr">${rbcR}</g>${leak}${lact}${phG}`
    + lb(capT3[0] + 120, capT3[1] + 10, "hematii", "start") + lb(capT3[0] + 120, capT3[1] + 18, "în fișicuri", "start", "s4") + `</g>`;
  // 4. inima: potențialul de acțiune și traseul ECG
  const o4 = [212, 340];
  const hpx = (dx, dy) => [o4[0] + dx, o4[1] + dy];
  const ap0 = hpx(10, 0);
  const apY = (mv) => o4[1] + 24 + (20 - mv) / 110 * 38;            // +20 mV sus, −90 mV jos
  const aps = `<path class="hm2-apref" d="${apPath(ap0[0], apY(-85), apY(20), 36, 1.2)}"/>`
    + `<path class="hm2-ap a0" d="${apPath(ap0[0], apY(-85), apY(20), 36, 1.2)}"/><path class="hm2-ap a1" d="${apPath(ap0[0], apY(-82), apY(14), 56, 3)}"/><path class="hm2-ap a2" d="${apPath(ap0[0], apY(-78), apY(6), 74, 5)}"/>`;
  const ecgY = o4[1] + 104;
  const ecgs = `<path class="hm2-ecg e0" d="${strip(o4[0] + 8, o4[0] + 186, ecgY, 70)}"/><path class="hm2-ecg e1" d="${strip(o4[0] + 8, o4[0] + 186, ecgY, 120)}"/><path class="hm2-ecg e2" d="${strip(o4[0] + 8, o4[0] + 186, ecgY, 38, { wide: 1.8, j: 1, amp: 0.85 })}"/><path class="hm2-ecg e3" d="${vfThenFlat(o4[0] + 8, o4[0] + 186, ecgY, R)}"/>`;
  const ecgT = ["ritm sinusal", "tahicardie", "bradicardie, QRS larg, undă J", "fibrilație, apoi asistolie"].map((t, i) => `<g class="hm2-et k${i}">${lb(o4[0] + 174, o4[1] + 84, t, "end", "b")}</g>`).join("");
  const b4 = `<g class="hm2-t4">${tile(o4[0], o4[1], "Inima")}<path class="hm2-ax" d="M${f1(ap0[0])} ${f1(apY(-90))}H${f1(ap0[0] + 104)}"/>${aps}${lb(ap0[0] + 108, o4[1] + 30, "potențialul", "start")}${lb(ap0[0] + 108, o4[1] + 38, "de acțiune", "start")}${lb(ap0[0] + 108, o4[1] + 46, "ventricular", "start")}${lb(ap0[0] + 108, o4[1] + 54, "(gri: 37°C)", "start")}`
    + `<path class="hm2-ecgb" d="M${o4[0] + 8} ${ecgY}H${o4[0] + 186}"/>${ecgs}${ecgT}${lb(o4[0] + 8, o4[1] + 84, "ECG", "start", "b")}</g>`;
  const panelB = b1 + b2 + b3 + b4;
  const frames = `<rect class="hm2-card" x="${cA.x}" y="${cA.y}" width="${cA.w}" height="${cA.h}" rx="10"/>`;
  return {
    W, H, Ty,
    defs: `<clipPath id="__U__-cA"><rect x="${cA.x}" y="${cA.y}" width="${cA.w}" height="${cA.h}" rx="10"/></clipPath><clipPath id="__U__-tk"><rect x="${TK.x}" y="${TK.y}" width="${TK.w}" height="${TK.h}" rx="6"/></clipPath>`,
    L: { frames, panelA, panelB },
    hits: {
      tank: { x: TK.x - 34, y: TK.y - 6, w: TK.w + 36, h: TK.h + 20 }, in: { x: 92, y: 18, w: 116, h: 24 }, out: { x: 146, y: 154, w: 60, h: 44 }, risk: { x: RX - 8, y: 58, w: 128, h: 84 },
      skA: { x: 18, y: 240, w: 186, h: 16 }, skC: { x: 66, y: 228, w: 120, h: 80 }, hep: { x: 216, y: 222, w: 124, h: 60 }, o2: { x: 344, y: 226, w: 22, h: 96 }, mb: { x: 372, y: 226, w: 26, h: 96 }, mus: { x: 216, y: 294, w: 124, h: 24 },
      rbc: { x: 18, y: 362, w: 160, h: 40 }, ph: { cx: 180, cy: 408, r: 24 }, lac: { x: 18, y: 404, w: 128, h: 58 },
      ap: { x: 216, y: 352, w: 190, h: 50 }, ecg: { x: 216, y: 418, w: 190, h: 46 },
    },
    badges: { tank: [56, 40], in: [140, 48], out: [206, 186], risk: [398, 62], skA: [36, 272], skC: [190, 286], hep: [334, 228], o2: [353, 217], mb: [381, 217], mus: [344, 312], rbc: [196, 352], ph: [204, 392], lac: [24, 450], ap: [398, 354], ecg: [398, 430] },
  };
}

export function preview(state = {}) {
  const A = build(), L = A.L, sub = (x) => x.replaceAll("__U__", "pv");
  const st = state.st ?? 0;
  return { viewBox: `0 0 ${W} ${H}`, svg: sub(`<defs>${A.defs}</defs><g class="hyx" data-st="${st}">${L.frames}${L.panelA}${L.panelB}</g>`) };
}
