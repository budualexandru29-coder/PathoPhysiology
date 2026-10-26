// Î3: tipurile de hipertermie. Patru plăci:
//  A. hipertermia malignă: o fibră musculară scheletică în secțiune longitudinală — sarcolema, tubul T, cisternele terminale ale
//     reticulului sarcoplasmic (triada), receptorii de dihidropiridină (DHPR) față în față cu receptorii de rianodină (RyR1), pompele
//     SERCA, ionii de Ca²⁺, un sarcomer (filamente subțiri de actină, groase de miozină, liniile Z), mitocondrii; agenții declanșatori
//     (halotan, succinilcolină) și dantrolenul; în dreapta, un monitor de anestezie;
//  B. mialgia (crampa) termică: sudoarea cu Na⁺ și Cl⁻, apa băută fără săruri, sângele (hemoconcentrație), mușchiul în spasm;
//  C. insolația: capul din profil, cu craniul, meningele și creierul, sub razele soarelui; edemul cerebral, meningita seroasă;
//  D. arsurile solare: pielea în secțiune, gradele I (eritem, edem), II (flictenă), III (necroză).
// Toate plăcile urmează aceeași variabilă: normal, ușor, moderat, sever, tratament.
import { smooth, poly, lumpy, rng, sampleSmooth, offset } from "./lib/geo.mjs";
import { organ, vessels } from "./lib/an.mjs";
import { brainLat } from "./parts/brain-lat.mjs";

export const W = 420, H = 456;
const P2 = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
const f1 = (v) => (+v).toFixed(1);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const area = (pts) => pts.reduce((a, p, i) => { const q = pts[(i + 1) % pts.length]; return a + p[0] * q[1] - q[0] * p[1]; }, 0) / 2;
const outward = (pts, d) => { const o = offset(pts, d, true); return Math.abs(area(o)) > Math.abs(area(pts)) ? o : offset(pts, -d, true); };

/* molecule: halotanul (CF3–CHBrCl), succinilcolina (două coline legate printr-un succinil), dantrolenul (trei cicluri) */
const halothane = (x, y, a = 0) => {
  const c1 = [x, y], c2 = [x + 5, y + 1.5];
  const at = (c, ang, l) => [c[0] + Math.cos(ang + a) * l, c[1] + Math.sin(ang + a) * l];
  const F = [at(c1, 2.4, 4), at(c1, 3.4, 4), at(c1, 4.3, 4)], Br = at(c2, -0.6, 4.6), Cl = at(c2, 0.9, 4.2);
  return `<g class="hm-hal"><path d="M${P2(c1)}L${P2(c2)}${F.map((p) => `M${P2(c1)}L${P2(p)}`).join("")}M${P2(c2)}L${P2(Br)}M${P2(c2)}L${P2(Cl)}"/><circle class="c" cx="${f1(c1[0])}" cy="${f1(c1[1])}" r="1.6"/><circle class="c" cx="${f1(c2[0])}" cy="${f1(c2[1])}" r="1.6"/>${F.map((p) => `<circle class="f" cx="${f1(p[0])}" cy="${f1(p[1])}" r="1.2"/>`).join("")}<circle class="br" cx="${f1(Br[0])}" cy="${f1(Br[1])}" r="1.9"/><circle class="cl" cx="${f1(Cl[0])}" cy="${f1(Cl[1])}" r="1.5"/></g>`;
};
const succ = (x, y) => `<g class="hm-suc"><path d="M${x} ${y}h14"/><circle class="n" cx="${x}" cy="${y}" r="2.2"/><circle class="n" cx="${x + 14}" cy="${y}" r="2.2"/><circle class="o" cx="${x + 5}" cy="${y - 2}" r="1"/><circle class="o" cx="${x + 9}" cy="${y + 2}" r="1"/></g>`;
const dantro = (x, y) => `<g class="hm-dan"><path d="${poly(Array.from({ length: 5 }, (_, i) => [x + Math.cos(i * 1.2566) * 2.6, y + Math.sin(i * 1.2566) * 2.6]), true)}"/><path d="${poly(Array.from({ length: 5 }, (_, i) => [x + 6 + Math.cos(i * 1.2566 + 0.6) * 2.4, y + 1 + Math.sin(i * 1.2566 + 0.6) * 2.4]), true)}"/><path d="${poly(Array.from({ length: 6 }, (_, i) => [x + 12.5 + Math.cos(i * 1.047) * 2.8, y - 0.5 + Math.sin(i * 1.047) * 2.8]), true)}"/><circle cx="${x + 16.6}" cy="${y - 1}" r="1"/></g>`;
const ion = (x, y, k) => k === "ca" ? `<circle class="hm-ca" cx="${f1(x)}" cy="${f1(y)}" r="1.5"/>` : `<g class="hm-ion ${k}"><circle cx="${f1(x)}" cy="${f1(y)}" r="2.6"/><path d="M${f1(x - 1.3)} ${f1(y)}h2.6${k === "na" || k === "k" ? `M${f1(x)} ${f1(y - 1.3)}v2.6` : ""}"/></g>`;

export function build() {
  const R = rng(7);
  /* ======================= A. hipertermia malignă ======================= */
  const cA = { x: 10, y: 10, w: 400, h: 202 };
  const SL = 38;                                      // sarcolema (mijlocul)
  const TT = [92, 206];                               // tuburile T
  const TB = 108;                                     // fundul tuburilor T
  let ext = `<rect class="hm-ex" x="${cA.x}" y="${cA.y}" width="270" height="${SL - cA.y}"/><rect class="hm-cy" x="${cA.x}" y="${SL}" width="270" height="${cA.y + cA.h - SL}"/>`;
  // sarcolema cu invaginațiile tuburilor T (lumen continuu cu spațiul extracelular)
  const memPath = [[cA.x, SL], [TT[0] - 4, SL], [TT[0] - 4, TB], [TT[0] + 4, TB], [TT[0] + 4, SL], [TT[1] - 4, SL], [TT[1] - 4, TB], [TT[1] + 4, TB], [TT[1] + 4, SL], [280, SL]];
  const tLumen = TT.map((x) => `<rect class="hm-ex" x="${x - 3.6}" y="${SL - 2}" width="7.2" height="${TB - SL + 1}"/>`).join("");
  const sarco = `<path class="hm-mem" d="${poly(memPath)}"/>`;
  // cisternele terminale (de o parte și de alta a fiecărui tub T) și reticulul longitudinal, cu Ca²⁺ și SERCA
  let sr = "", caSR = "", ryr = "", dhpr = "", serca = "";
  TT.forEach((x) => {
    [-1, 1].forEach((sg) => {
      const x0 = x + sg * 9, x1 = x + sg * 22, xa = Math.min(x0, x1), xb = Math.max(x0, x1);
      sr += `<rect class="hm-sr" x="${xa}" y="50" width="${xb - xa}" height="52" rx="6"/>`;
      for (let i = 0; i < 9; i++) caSR += ion(xa + 3 + R() * (xb - xa - 6), 56 + R() * 40, "ca");
      [60, 74, 88].forEach((y) => { ryr += `<rect class="hm-ryr" x="${f1(x + sg * 9 - (sg > 0 ? 0 : 3.6))}" y="${y - 3.4}" width="3.6" height="6.8" rx="1"/><path class="hm-ryrp" d="M${f1(x + sg * 9 + (sg > 0 ? 1.8 : -1.8))} ${y - 1.6}v3.2"/>`; dhpr += `<rect class="hm-dhpr" x="${f1(x + sg * 4 - (sg > 0 ? 0 : 2.4))}" y="${y - 2.4}" width="2.4" height="4.8" rx=".8"/>`; });
    });
  });
  // reticulul longitudinal între triade, cu pompe SERCA
  sr += `<path class="hm-lsr" d="M${TT[0] + 22} 64H${TT[1] - 22}M${TT[0] + 22} 92H${TT[1] - 22}M${cA.x} 64H${TT[0] - 22}M${cA.x} 92H${TT[0] - 22}M${TT[1] + 22} 64H272M${TT[1] + 22} 92H272"/>`;
  [130, 150, 170, 40, 248].forEach((x, i) => { const y = i % 2 ? 92 : 64; serca += `<g class="hm-serca"><rect x="${x - 2.6}" y="${y - 4.4}" width="5.2" height="8.8" rx="2"/><path d="M${x} ${y - 3}v6"/></g>`; });
  // Ca²⁺ eliberat în citosol (spre sarcomer), cu porii RyR deschiși
  let caOut = ""; TT.forEach((x) => { for (let i = 0; i < 16; i++) { const sg = i % 2 ? 1 : -1; caOut += ion(x + sg * (24 + R() * 30), 100 + R() * 22, "ca"); } });
  // sarcomerul: liniile Z, filamentele subțiri (actină) din Z, cele groase (miozină) în banda A, cu capete
  const Y0 = 128, Y1 = 198, rows = [134, 146, 158, 170, 182, 194];
  const zL = 71, zR = 228, mid = 149.5;
  const thickHalf = 57, thinLen = 71;
  let thick = ""; rows.forEach((y, i) => { if (i % 2) return; thick += `<path class="hm-thick" d="M${mid - thickHalf} ${y}H${mid + thickHalf}"/>`; for (let x = mid - thickHalf + 4; x < mid + thickHalf - 3; x += 6) { if (Math.abs(x - mid) < 6) continue; const sg = x < mid ? -1 : 1; thick += `<path class="hm-head" d="M${x} ${y - 1.4}l${sg * 2.4} -3M${x} ${y + 1.4}l${sg * 2.4} 3"/>`; } });
  const thinRows = rows.filter((_, i) => i % 2);
  const half = (side) => {
    const z = side < 0 ? zL : zR, dir = side < 0 ? 1 : -1;
    let s = `<path class="hm-z" d="M${z} ${Y0}V${Y1}"/>`;
    thinRows.forEach((y) => { s += `<path class="hm-thin" d="M${z} ${y}H${z + dir * thinLen}"/>`; });
    // filamentele subțiri ale sarcomerelor vecine (de cealaltă parte a liniei Z)
    thinRows.forEach((y) => { s += `<path class="hm-thin" d="M${z} ${y}H${z - dir * 30}"/>`; });
    return s;
  };
  const sarcomere = `<rect class="hm-mf" x="${cA.x}" y="${Y0 - 4}" width="270" height="${Y1 - Y0 + 6}"/>${thick}<g class="hm-hl">${half(-1)}</g><g class="hm-hr">${half(1)}</g>`
    + `<path class="hm-thick" d="M${cA.x} 146H${zL - 31}M${cA.x} 170H${zL - 31}M${cA.x} 194H${zL - 31}M${zR + 31} 146H272M${zR + 31} 170H272M${zR + 31} 194H272"/>`;
  // mitocondrii (căldură, consum de O₂), în dreapta
  const mito = (cx, cy) => `<g class="hm-mito"><ellipse cx="${cx}" cy="${cy}" rx="14" ry="7"/><path d="M${cx - 9} ${cy - 4}v8M${cx - 4} ${cy - 5}v6M${cx + 1} ${cy - 5}v8M${cx + 6} ${cy - 5}v7M${cx + 10} ${cy - 3}v5"/></g>`;
  const mitos = mito(250, 108) + mito(32, 108);
  const heat = [[250, 108], [32, 108]].map(([x, y]) => `<circle class="hm-heat" cx="${x}" cy="${y}" r="16"/>`).join("");
  // ionii și moleculele care ies: K⁺ (hiperpotasemie), H⁺ (acidoză), CO₂; triggerii în spațiul extracelular
  const kOut = [[40, 26], [60, 22], [150, 26], [176, 20], [236, 24]].map(([x, y]) => ion(x, y, "k")).join("");
  const trig = halothane(22, 20, 0.2) + halothane(122, 18, -0.4) + halothane(250, 18, 0.6) + succ(56, 24) + succ(206, 22);
  const dan = TT.map((x) => [-1, 1].map((sg) => dantro(x + sg * 22 + (sg > 0 ? 2 : -20), 74)).join("")).join("");
  // monitorul de anestezie
  const MON = { x: 284, y: 18, w: 120, h: 186 };
  let mon = `<rect class="mon-shadow" x="${MON.x + 2}" y="${MON.y + 3}" width="${MON.w}" height="${MON.h}" rx="9"/><rect class="mon-body" x="${MON.x}" y="${MON.y}" width="${MON.w}" height="${MON.h}" rx="9"/><rect class="mon-bevel" x="${MON.x + 3}" y="${MON.y + 3}" width="${MON.w - 6}" height="${MON.h - 6}" rx="7"/><text class="mon-t" x="${MON.x + 9}" y="${MON.y + 14}" data-ui>Monitor · anestezie</text><circle class="mon-led" cx="${MON.x + MON.w - 11}" cy="${MON.y + 10}" r="2"/>`;
  const rowsM = [["Tc", "°C"], ["FC", "/min"], ["TA", ""], ["K⁺", ""], ["pH", ""]];
  rowsM.forEach(([lab], i) => { const y = MON.y + 36 + i * 30; mon += `<text class="hm-ml" x="${MON.x + 10}" y="${y}" data-ui>${esc(lab)}</text><path class="hm-mrule" d="M${MON.x + 8} ${y + 9}H${MON.x + MON.w - 8}"/>`; });
  const tcVals = ["37,0", "38,5", "40,0", "43,0", "38,6"];
  const tcSvg = tcVals.map((v, i) => `<text class="hm-mv v${i}" x="${MON.x + MON.w - 12}" y="${MON.y + 37}" text-anchor="end" data-ui>${v}</text>`).join("");
  const arr = (x, y, up, cls) => `<path class="hm-arr ${cls}" d="${up ? `M${x - 4} ${y + 2}L${x} ${y - 4}L${x + 4} ${y + 2}Z` : `M${x - 4} ${y - 4}L${x} ${y + 2}L${x + 4} ${y - 4}Z`}"/>`;
  const arrows = [["fc", 1, true], ["ta", 2, false], ["k", 3, true], ["ph", 4, false]].map(([k, i, up]) => arr(MON.x + MON.w - 16, MON.y + 34 + i * 30, up, k)).join("");
  const dash = [1, 2, 3, 4].map((i) => `<path class="hm-dash" d="M${MON.x + MON.w - 22} ${MON.y + 33 + i * 30}h12"/>`).join("");
  const panelA = `<g clip-path="url(#__U__-cA)">${ext}<g class="hm-mfw">${sarcomere}</g>${sr}${tLumen}${sarco}<g class="hm-caSR">${caSR}</g>${serca}${dhpr}${ryr}<g class="hm-heatg">${heat}</g>${mitos}<g class="hm-caOut">${caOut}</g><g class="hm-kOut">${kOut}</g><g class="hm-trig">${trig}</g><g class="hm-dang">${dan}</g></g>${mon}${tcSvg}<g class="hm-dashg">${dash}</g><g class="hm-arrg">${arrows}</g>`;

  /* ======================= B. mialgia termică ======================= */
  const cB = { x: 10, y: 220, w: 128, h: 230 };
  // pielea cu un por sudoripar și picătura de sudoare cu Na⁺ și Cl⁻
  let skin = `<path class="hc-epi" d="M${cB.x} 252Q40 248 74 252T${cB.x + cB.w} 252V266H${cB.x}Z"/><path class="hc-der" d="M${cB.x} 266H${cB.x + cB.w}V282H${cB.x}Z"/><path class="hc-duct" d="M56 280C52 274 60 268 56 262L56 252"/><path class="hc-coil" d="${smooth(lumpy(58, 282, 5, 9, 0.3, 3), true)}"/>`;
  const drop = `<path class="hc-drop" d="M56 252C46 248 44 236 56 226C68 236 66 248 56 252Z"/>` + ion(52, 240, "na") + ion(60, 236, "cl") + ion(56, 246, "na") + `<path class="hc-drop s" d="M86 250C80 248 79 240 86 234C93 240 92 248 86 250Z"/>` + ion(86, 243, "cl");
  // paharul cu apă (fără săruri)
  const glass = `<path class="hc-glass" d="M100 294L124 294L121 330L103 330Z"/><path class="hc-water" d="M101.4 304L122.6 304L121 330L103 330Z"/><path class="hc-gl" d="M104 298L106 326"/>`;
  // sângele: un vas în secțiune transversală, cu hematii și ioni (Na⁺, Cl⁻)
  const VB = [50, 312], vr = 26;
  let blood = `<circle class="hc-vw" cx="${VB[0]}" cy="${VB[1]}" r="${vr}"/><circle class="hc-vl" cx="${VB[0]}" cy="${VB[1]}" r="${vr - 3.6}"/>`;
  const rbcAt = (pts, cls) => pts.map(([x, y, a]) => `<g class="${cls}" transform="translate(${f1(x)} ${f1(y)}) rotate(${a})"><ellipse class="rbc" rx="5.4" ry="4.8"/><ellipse class="rbc-c" rx="2.2" ry="1.9"/></g>`).join("");
  blood += rbcAt([[40, 302, 10], [58, 298, -20], [48, 318, 30], [64, 318, 0], [36, 322, -10]], "");
  const rbcX = rbcAt([[50, 296, 40], [32, 310, 0], [62, 306, 15], [56, 328, -30], [42, 332, 20], [68, 330, 10], [30, 300, -25]], "");
  const ionsN = [[44, 296, "na"], [62, 290, "cl"], [32, 314, "na"], [70, 312, "cl"], [52, 330, "na"], [40, 330, "cl"], [56, 310, "na"]].map(([x, y, k]) => ion(x, y, k)).join("");
  // mușchiul (gastrocnemian): relaxat și în spasm
  const musRel = `<path class="hc-mus" d="${smooth([[20, 368], [60, 360], [104, 366], [128, 388], [104, 410], [60, 418], [20, 410], [14, 388]], true, 0.7)}"/>` + [372, 380, 388, 396, 404].map((y) => `<path class="hc-fib" d="M22 ${y}Q70 ${y - 4} 120 ${y + (y - 388) * 0.4}"/>`).join("") + `<path class="hc-ten" d="M128 388L138 390"/><path class="hc-ten" d="M14 388L4 386"/>`;
  const musSp = `<path class="hc-mus sp" d="${smooth([[30, 362], [64, 350], [100, 358], [116, 388], [100, 418], [64, 426], [30, 414], [24, 388]], true, 0.7)}"/>` + [364, 374, 384, 394, 404, 414].map((y, i) => `<path class="hc-fib" d="M30 ${y}Q46 ${y - 5} 60 ${y + 2}T88 ${y - 1}T112 ${y + (y - 388) * 0.3 + (i % 2 ? 2 : -2)}"/>`).join("") + `<path class="hc-ten" d="M116 388L138 390"/><path class="hc-ten" d="M24 388L4 386"/>`;
  const panelB = `<g clip-path="url(#__U__-cB)"><rect class="hc-bg" x="${cB.x}" y="${cB.y}" width="${cB.w}" height="${cB.h}"/>${skin}<g class="hc-dropg">${drop}</g><g class="hc-glassg">${glass}</g>${blood}<g class="hc-rbcx">${rbcX}</g><g class="hc-ions">${ionsN}</g><g class="hc-rel">${musRel}</g><g class="hc-sp">${musSp}</g></g>`;

  /* ======================= C. insolația ======================= */
  const cC = { x: 146, y: 220, w: 128, h: 230 };
  const BR = brainLat({ origin: [160, 284], s: 0.62 });
  const cerPts = [[4, 52], [7.5, 33], [20, 15.5], [42, 5], [70, 1.5], [96, 4.5], [118, 14.5], [132.5, 30], [139, 47.5], [135.5, 60.5], [124, 66.5], [106, 67], [93, 72.5], [72, 78], [52, 76.5], [38, 71], [31.5, 63.5], [25, 60.5], [13, 59]].map(([x, y]) => [160 + x * 0.62, 284 + y * 0.62]);
  const cerS = sampleSmooth(cerPts, true, 6);
  const mening = outward(cerS, 2.6), skull = outward(cerS, 5.4), skull2 = outward(cerS, 8.4), scalpIn = outward(cerS, 10);
  // profilul capului: creștetul urmează craniul, fruntea, nasul, buzele, bărbia, gâtul (fața spre stânga)
  const head = [[160, 300], [166, 282], [186, 270], [212, 266], [238, 270], [256, 284], [264, 304], [262, 326], [254, 340], [252, 362], [256, 396], [262, 450], [192, 450], [196, 418], [190, 400], [178, 394], [166, 392], [162, 384], [158, 378], [160, 372], [156, 366], [158, 360], [152, 354], [146, 350], [148, 342], [154, 336], [156, 322], [154, 312]];
  const headD = smooth(head, true, 0.6);
  const ear = `<path class="sp-ear" d="${smooth([[226, 330], [232, 326], [236, 334], [236, 346], [232, 356], [226, 356], [224, 348], [225, 340]], true)}"/>`;
  const eye = `<path class="sp-eye" d="M160 344Q165 341 170 344Q165 346 160 344Z"/>`;
  const sunC = [262, 232];
  const sunSvg = `<circle class="sun-g" cx="${sunC[0]}" cy="${sunC[1]}" r="16"/><circle class="sun" cx="${sunC[0]}" cy="${sunC[1]}" r="10"/>` + Array.from({ length: 10 }, (_, k) => { const a = k / 10 * 6.283; return `<path class="sun-r" d="M${f1(sunC[0] + Math.cos(a) * 13)} ${f1(sunC[1] + Math.sin(a) * 13)}L${f1(sunC[0] + Math.cos(a) * 17)} ${f1(sunC[1] + Math.sin(a) * 17)}"/>`; }).join("");
  const rays = [[200, 268], [222, 266], [244, 274], [258, 296], [258, 352]].map(([x, y]) => { const a = Math.atan2(y - sunC[1], x - sunC[0]); const s0 = [sunC[0] + Math.cos(a) * 18, sunC[1] + Math.sin(a) * 18]; return `<path class="in-ray" d="M${P2(s0)}L${x} ${y}"/>`; }).join("");
  // umbrela (tratament: scos de sub razele soarelui)
  const shade = `<path class="in-shade" d="M180 244Q226 206 272 244Z"/><path class="in-shs" d="M226 234V258"/>`;
  const panelC = `<g clip-path="url(#__U__-cC)"><rect class="in-bg" x="${cC.x}" y="${cC.y}" width="${cC.w}" height="${cC.h}"/><g class="in-raysg">${rays}</g><path class="sp-skin in-sk" d="${headD}"/><path class="an-vol" d="${headD}"/>${ear}${eye}`
    + `<path class="in-skull" d="${smooth(skull2.filter((_, i) => i % 2 === 0), true)}"/><path class="in-dip" d="${smooth(skull.filter((_, i) => i % 2 === 0), true)}"/><path class="in-men" d="${smooth(mening.filter((_, i) => i % 2 === 0), true)}"/>`
    + `<g class="in-brain" style="transform-origin:${f1(160 + 70 * 0.62)}px ${f1(284 + 40 * 0.62)}px">${BR.svg}</g><path class="in-edema" d="${BR.outline}"/><path class="in-menf" d="${smooth(mening.filter((_, i) => i % 2 === 0), true)}"/>`
    + `<path class="sp-hedge" d="${headD}"/><g class="in-sung">${sunSvg}</g><g class="in-shadeg">${shade}</g></g>`;
  void scalpIn;

  /* ======================= D. arsurile solare ======================= */
  const cD = { x: 282, y: 220, w: 128, h: 230 };
  const sx0 = cD.x, sx1 = cD.x + cD.w, sTop = 272;
  const epiBot = (x) => sTop + 16 + Math.sin((x - sx0) / 7) * 3;
  const epiPts = []; for (let x = sx0; x <= sx1; x += 3) epiPts.push([x, epiBot(x)]);
  let skinD = `<rect class="bu-hyp" x="${sx0}" y="384" width="${cD.w}" height="70"/>` + Array.from({ length: 9 }, (_, i) => `<path class="sb-fat" d="${smooth(lumpy(sx0 + 10 + (i % 5) * 26 + (i > 4 ? 13 : 0), 400 + (i > 4 ? 26 : 0), 11, 9, 0.12, i + 2), true)}"/>`).join("")
    + `<path class="bu-der" d="${poly([[sx0, 384], [sx0, epiBot(sx0)], ...epiPts, [sx1, 384]], true)}"/>`
    + `<path class="bu-epi" d="${poly([[sx0, sTop], [sx1, sTop], ...epiPts.slice().reverse()], true)}"/><path class="bu-corn" d="M${sx0} ${sTop}H${sx1}"/>`;
  // capilarele papilare (anse) și plexul dermic; un fir de păr; glanda sudoripară
  const loops = []; for (let x = sx0 + 8; x < sx1; x += 14) loops.push([[x - 2.6, 314], [x - 2, epiBot(x) + 4], [x + 2, epiBot(x) + 4], [x + 2.6, 314]]);
  const vD = vessels([{ pts: [[sx0 - 4, 318], [sx0 + 40, 316], [sx0 + 90, 320], [sx1 + 4, 317]], w: 4.2, k: "a" }, { pts: [[sx0 - 4, 362], [sx0 + 50, 358], [sx1 + 4, 364]], w: 6, k: "v" }]);
  const loopSvg = loops.map((p) => `<path class="bu-loop" d="${smooth(p)}"/>`).join("");
  const hair = `<path class="sb-fol-o" d="${smooth([[sx0 + 86, sTop], [sx0 + 84, 330], [sx0 + 88, 352], [sx0 + 96, 352], [sx0 + 98, 330], [sx0 + 94, sTop]], true)}"/><path class="sb-shaft" d="M${sx0 + 91} 352L${sx0 + 90} ${sTop - 14}"/>`;
  const gland = `<path class="sb-coil" d="${smooth(lumpy(sx0 + 34, 376, 6, 9, 0.3, 5), true)}" style="stroke-width:2.4"/><path class="sb-duct" d="M${sx0 + 34} 370C${sx0 + 30} 340 ${sx0 + 38} 310 ${sx0 + 34} ${sTop}"/>`;
  skinD += vD + loopSvg + hair + gland;
  const uv = Array.from({ length: 5 }, (_, i) => { const x = sx0 + 14 + i * 26; let d = `M${x - 6} 232`; for (let k = 1; k <= 8; k++) d += `L${f1(x - 6 + k * 0.8 + (k % 2 ? 3 : -3))} ${232 + k * 4.4}`; return `<path class="bu-uv" d="${d}"/>`; }).join("");
  // gradul I: eritem (anse dilatate, tentă roșie), edem
  let edema = ""; for (let i = 0; i < 26; i++) edema += `<circle class="bu-ed" cx="${f1(sx0 + 6 + R() * (cD.w - 12))}" cy="${f1(296 + R() * 80)}" r="1.1"/>`;
  const g1 = `<rect class="bu-ery" x="${sx0}" y="${sTop}" width="${cD.w}" height="${384 - sTop}"/>` + loops.map((p) => `<path class="bu-loopd" d="${smooth(p)}"/>`).join("") + edema;
  // gradul II: flictena — epidermul ridicat de lichid
  const bl0 = sx0 + 18, bl1 = sx0 + 110;
  const domeTop = (x) => sTop - 14 * Math.sin((x - bl0) / (bl1 - bl0) * Math.PI);
  const dome = []; for (let x = bl0; x <= bl1; x += 3) dome.push([x, domeTop(x)]);
  const g2 = `<path class="bu-fluid" d="${poly([...dome, ...dome.slice().reverse().map(([x, y]) => [x, epiBot(x) - 1])], true)}"/>` + `<path class="bu-epi" d="${poly([...dome, ...dome.slice().reverse().map(([x, y]) => [x, y + 9])], true)}"/><path class="bu-corn" d="${poly(dome)}"/>`;
  // gradul III: necroza pe toată grosimea pielii (escară), vase trombozate
  const nec = [[sx0, sTop - 1], [sx1, sTop - 1], [sx1, 372], [sx1 - 20, 380], [sx0 + 90, 374], [sx0 + 60, 382], [sx0 + 30, 376], [sx0, 380]];
  const g3 = `<path class="bu-nec" d="${smooth(nec, true, 0.4)}"/>` + Array.from({ length: 30 }, () => `<circle class="bu-necd" cx="${f1(sx0 + 4 + R() * (cD.w - 8))}" cy="${f1(sTop + 4 + R() * 96)}" r="${f1(0.8 + R() * 1.4)}"/>`).join("") + `<path class="bu-thr" d="M${sx0} 318Q${sx0 + 64} 314 ${sx1} 318"/><path class="bu-thr" d="M${sx0} 362Q${sx0 + 64} 358 ${sx1} 364"/>`;
  const sunD = [396, 232];
  const panelD = `<g clip-path="url(#__U__-cD)"><rect class="in-bg" x="${cD.x}" y="${cD.y}" width="${cD.w}" height="${cD.h}"/><g class="bu-uvg">${uv}</g>${skinD}<g class="bu-g1">${g1}</g><g class="bu-g2">${g2}</g><g class="bu-g3">${g3}</g><circle class="sun-g" cx="${sunD[0]}" cy="${sunD[1]}" r="14"/><circle class="sun" cx="${sunD[0]}" cy="${sunD[1]}" r="8.6"/></g>`;

  const frames = [cA, cB, cC, cD].map((c) => `<rect class="hm-card" x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" rx="10"/>`).join("");
  const clips = [["cA", cA], ["cB", cB], ["cC", cC], ["cD", cD]].map(([id, c]) => `<clipPath id="__U__-${id}"><rect x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" rx="10"/></clipPath>`).join("");

  return {
    W, H,
    defs: clips + BR.defs,
    L: { frames, panelA, panelB, panelC, panelD },
    hits: {
      ryr: { x: TT[0] - 24, y: 48, w: 48, h: 58 }, sr: { x: TT[1] - 24, y: 48, w: 48, h: 58 }, trig: { x: 14, y: 12, w: 256, h: 22 }, sarc: { x: 70, y: 126, w: 160, h: 72 }, mito: { cx: 250, cy: 108, r: 18 }, mon: { x: 284, y: 18, w: 120, h: 186 },
      sweat: { x: 40, y: 224, w: 56, h: 32 }, blood: { cx: VB[0], cy: VB[1], r: vr + 4 }, glass: { x: 98, y: 290, w: 30, h: 44 }, mus: { x: 14, y: 352, w: 118, h: 74 },
      sun: { x: 180, y: 262, w: 90, h: 40 }, brain: { cx: 204, cy: 310, r: 36 }, men: { cx: 186, cy: 286, r: 12 },
      g1: { x: 286, y: 290, w: 120, h: 30 }, g2: { x: 300, y: 254, w: 92, h: 30 }, g3: { x: 286, y: 324, w: 120, h: 56 },
    },
    badges: {
      ryr: [TT[0], 117], sr: [TT[1], 117], trig: [270, 22], sarc: [149, 204], mito: [256, 88], mon: [296, 196],
      sweat: [24, 236], blood: [86, 290], glass: [130, 286], mus: [126, 434],
      sun: [162, 236], brain: [254, 316], men: [168, 270],
      g1: [400, 300], g2: [292, 250], g3: [400, 352],
    },
  };
}

export function preview(state = {}) {
  const A = build(), L = A.L, s = (x) => x.replaceAll("__U__", "pv");
  const st = state.st ?? 3;
  return { viewBox: `0 0 ${W} ${H}`, svg: s(`<defs>${A.defs}</defs><g class="hmx" data-st="${st}">${L.frames}${L.panelA}${L.panelB}${L.panelC}${L.panelD}</g>`) };
}
