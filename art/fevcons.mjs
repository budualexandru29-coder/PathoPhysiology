// Î12: consecințele sistemice și efectele benefice ale febrei. Trei plăci:
//  A. gazda: creierul cu EEG-ul (somn cu unde lente, apoi delir/convulsii), inima cu ECG-ul (frecvența crește cu temperatura),
//     o celulă cu mitocondrii și oxigenul consumat (metabolismul);
//  B. microorganismele și apărarea: bacterii care se înmulțesc tot mai greu, o celulă infectată cu virus, un neutrofil care
//     fagocitează, limfocite T helper care proliferează, interferon, glucoza, un capilar cu Fe, Zn, Cu și un macrofag cu feritină;
//  C. două grafice în funcție de temperatură: frecvența cardiacă (+8–12/min/°C, LP) și consumul de oxigen (+13%/°C, Cursul 3).
// Trasee și celule schematice; numerele vin din LP și din curs, curbele sunt construite pe ele.
import { smooth, poly, lumpy, rng, sampleSmooth } from "./lib/geo.mjs";
import { organ, vessels, cutEnd } from "./lib/an.mjs";
import { brainLat } from "./parts/brain-lat.mjs";
import { heart } from "./parts/heart.mjs";
import { cytokine } from "./fever.mjs";

export const W = 420, H = 480;
const P2 = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
const f1 = (v) => (+v).toFixed(1);

export function build() {
  const R = rng(23);
  /* ======================= A. gazda ======================= */
  const cA = { x: 10, y: 10, w: 196, h: 318 };
  // 1. creierul + EEG
  const BR = brainLat({ origin: [16, 34], s: 0.44 });
  const scr = (x, y, w, h, t) => `<rect class="mon-shadow" x="${x + 1.5}" y="${y + 2}" width="${w}" height="${h}" rx="6"/><rect class="mon-body" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/><rect class="mon-bevel" x="${x + 2}" y="${y + 2}" width="${w - 4}" height="${h - 4}" rx="5"/><text class="mon-t" x="${x + 6}" y="${y + 10}" data-ui>${t}</text>`;
  const E = { x: 88, y: 24, w: 112, h: 76 };
  const eeg = (kind) => {
    const pts = [], x0 = E.x + 6, x1 = E.x + E.w - 6, yc = E.y + 44;
    for (let x = x0; x <= x1; x += 1) {
      const t = (x - x0);
      let y;
      if (kind === 0) y = Math.sin(t * 0.9) * 3 + Math.sin(t * 2.3) * 1.5;
      else if (kind === 1) y = Math.sin(t * 0.32) * 7 + Math.sin(t * 1.4) * 1.6;
      else if (kind === 2) y = Math.sin(t * 0.2) * 12 + Math.sin(t * 0.9) * 2;
      else { const sp = (t % 14) < 2 ? -16 : (t % 14) < 4 ? 12 : 0; y = sp + Math.sin(t * 1.7) * 4 + (R() - 0.5) * 3; }
      pts.push([x, yc + y]);
    }
    return `<path class="fc-eeg k${kind}" d="${poly(pts)}"/>`;
  };
  const eegTxt = ["treaz", "somn cu unde lente", "somn cu unde lente", "delir · convulsii (copii)"].map((t, i) => `<text class="fc-st k${i}" x="${E.x + 6}" y="${E.y + E.h - 7}" data-ui>${t}</text>`).join("");
  const rowBrain = BR.svg + scr(E.x, E.y, E.w, E.h, "EEG") + [0, 1, 2, 3].map(eeg).join("") + eegTxt;
  // 2. inima + ECG cu frecvența
  const HT = heart({ origin: [14, 120], s: 0.5 });
  const ao = HT.aoAsc, aoTop = ao[ao.length - 1];
  const hst = vessels([{ pts: [...ao, [aoTop[0] + 0.5, aoTop[1] - 4], [aoTop[0] + 5, aoTop[1] - 7], [aoTop[0] + 11, aoTop[1] - 6.5]], w: 5.4, k: "a" }]) + vessels([{ pts: HT.pt.axis, w: 5, k: "p" }]) + cutEnd([aoTop[0] + 11, aoTop[1] - 6.5], [1, 0.1], 5.4, "a") + cutEnd(HT.pt.top, [0.55, -0.85], 5, "p");
  const C = { x: 88, y: 122, w: 112, h: 80 };
  const beat = (x, y0) => `M${f1(x)} ${y0}h3l1.6 -2.4l1.6 2.4h2l1 2l2.2 -16l2.2 20l1.4 -6h4l2.6 -4.4l2.6 4.4`;
  const ecg = (rr, k) => { let d = `M${C.x + 6} ${C.y + 50}`; for (let x = C.x + 6; x < C.x + C.w - 30; x += rr) d += `L${f1(x)} ${C.y + 50}${beat(x, C.y + 50).slice(1).replace(/^/, "")}`; d += `L${C.x + C.w - 6} ${C.y + 50}`; return `<path class="fc-ecg k${k}" d="${d.replace(/L([\d.]+) ([\d.]+)M/g, "L$1 $2L")}"/>`; };
  const ecgs = [[44, 0], [36, 1], [32, 2], [27, 3]].map(([rr, k]) => { let d = ""; let x = C.x + 6; const y0 = C.y + 50; d = `M${x} ${y0}`; while (x + 28 < C.x + C.w - 6) { d += `L${f1(x)} ${y0}l3 0l1.6 -2.4l1.6 2.4l2 0l1 2l2.2 -16l2.2 20l1.4 -6l4 0l2.6 -4.4l2.6 4.4`; x += rr; } d += `L${C.x + C.w - 6} ${y0}`; return `<path class="fc-ecg k${k}" d="${d}"/>`; }).join("");
  void ecg;
  const hrTxt = `<text class="fc-num" x="${C.x + C.w - 8}" y="${C.y + 24}" text-anchor="end" data-ui data-hr>70</text><text class="fc-unit" x="${C.x + C.w - 8}" y="${C.y + 33}" text-anchor="end" data-ui>/min</text>`;
  const rowHeart = hst + HT.svg + scr(C.x, C.y, C.w, C.h, "ECG") + ecgs + hrTxt;
  // 3. o celulă cu mitocondrii; oxigenul consumat
  const CC = [50, 270];
  const cellD = smooth(lumpy(CC[0], CC[1], 32, 14, 0.06, 4), true);
  let mit = ""; [[36, 258, 0.3], [60, 262, -0.4], [44, 284, 0.8], [66, 284, 0.1], [52, 250, 1.4]].forEach(([x, y, a]) => { mit += `<g transform="translate(${x} ${y}) rotate(${f1(a * 57)})"><ellipse class="fc-mito" rx="7" ry="3.4"/><path class="fc-mitoc" d="M-4 -2v4M-1.4 -2.4v4.8M1.4 -2.4v4.8M4 -2v4"/></g>`; });
  const o2 = [[96, 250], [104, 262], [98, 276], [110, 286], [92, 290], [112, 252], [86, 264], [106, 300]].map(([x, y], i) => `<g class="fc-o2 o${i}"><circle cx="${x - 1.6}" cy="${y}" r="2"/><circle cx="${x + 1.6}" cy="${y}" r="2"/></g>`).join("");
  const M = { x: 124, y: 232, w: 76, h: 80 };
  const o2Txt = `<text class="fc-num" x="${M.x + M.w - 8}" y="${M.y + 30}" text-anchor="end" data-ui data-o2>100</text><text class="fc-unit" x="${M.x + M.w - 8}" y="${M.y + 40}" text-anchor="end" data-ui>% consum O₂</text>`;
  const rowCell = `<g class="fc-cellheat"><circle class="fc-heat" cx="${CC[0]}" cy="${CC[1]}" r="40"/></g>${organ(cellD, "fc-cell")}<circle class="fc-nuc" cx="${CC[0] - 4}" cy="${CC[1] + 4}" r="9"/>${mit}<g class="fc-o2g">${o2}</g>` + scr(M.x, M.y, M.w, M.h, "metabolism") + o2Txt;
  const panelA = `<g clip-path="url(#__U__-cA)"><rect class="fc-bg" x="${cA.x}" y="${cA.y}" width="${cA.w}" height="${cA.h}"/>${rowBrain}${rowHeart}${rowCell}</g>`;

  /* ======================= B. microorganismele și apărarea ======================= */
  const cB = { x: 214, y: 10, w: 196, h: 318 };
  let coll = ""; for (let i = 0; i < 12; i++) { const y0 = 20 + i * 26; const pts = []; for (let x = 210; x <= 414; x += 14) pts.push([x, y0 + Math.sin(x / 19 + i) * 4]); coll += `<path class="fc-coll" d="${smooth(pts)}"/>`; }
  // bacteriile: 12; la febră se înmulțesc mai greu (dispar treptat, după prag)
  const bacs = [[236, 36, 0.3], [262, 50, -0.6], [244, 74, 1.2], [282, 34, 0.1], [300, 60, -0.3], [226, 104, 0.7], [270, 96, -1.1], [314, 88, 0.5], [252, 128, 0.2], [292, 122, -0.8], [232, 146, 1.4], [276, 154, 0.4]];
  const bacSvg = bacs.map(([x, y, a], i) => { const ax = [Math.cos(a), Math.sin(a)]; return `<g class="fc-bac b${i}"><path class="o" d="M${P2([x - ax[0] * 6, y - ax[1] * 6])}L${P2([x + ax[0] * 6, y + ax[1] * 6])}"/><path class="i" d="M${P2([x - ax[0] * 3, y - ax[1] * 3])}L${P2([x + ax[0] * 3, y + ax[1] * 3])}"/></g>`; }).join("");
  // celula infectată cu virus (dreapta sus): virioni care ies (mai puțini la febră)
  const VC = [376, 52];
  const vcell = `<path class="fc-ep" d="${smooth(lumpy(VC[0], VC[1], 26, 12, 0.06, 6), true)}"/><circle class="fc-epn" cx="${VC[0] + 4}" cy="${VC[1] + 2}" r="8"/>`;
  const virs = [[352, 30], [366, 24], [384, 22], [400, 34], [404, 52], [398, 70], [350, 72], [360, 46], [390, 60], [372, 66]].map(([x, y], i) => `<path class="fc-vi v${i}" d="${poly(Array.from({ length: 6 }, (_, k) => [x + Math.cos(k * 1.047) * 2.4, y + Math.sin(k * 1.047) * 2.4]), true)}"/>`).join("");
  // neutrofilul care fagocitează (pseudopode, fagozomi cu bacterii)
  const NT = [340, 136];
  const ntSh = lumpy(NT[0], NT[1], 18, 14, 0.12, 9);
  const ntSvg = `${organ(smooth([...ntSh.slice(0, 7), [NT[0] - 24, NT[1] - 12], [NT[0] - 30, NT[1] - 4], [NT[0] - 22, NT[1] + 2], ...ntSh.slice(7)], true), "fc-ntc")}` + [[NT[0] - 6, NT[1] - 4], [NT[0] + 4, NT[1] + 4], [NT[0] + 8, NT[1] - 6]].map(([x, y]) => `<circle class="fc-ntn" cx="${x}" cy="${y}" r="4.4"/>`).join("") + [[NT[0] - 2, NT[1] + 10, "p0"], [NT[0] + 10, NT[1] + 8, "p1"], [NT[0] - 10, NT[1] + 6, "p2"]].map(([x, y, c]) => `<g class="fc-ph ${c}"><circle cx="${x}" cy="${y}" r="4"/><path d="M${x - 2.4} ${y}h4.8"/></g>`).join("");
  // limfocitele T helper (proliferează: 1 → 4)
  const TH = [[248, 196, "t0"], [266, 206, "t1"], [252, 216, "t2"], [272, 190, "t3"]].map(([x, y, c]) => `<g class="fc-th ${c}"><circle class="c" cx="${x}" cy="${y}" r="7.4"/><circle class="n" cx="${x + 0.6}" cy="${y}" r="5.8"/></g>`).join("");
  const ifn = [[290, 206], [300, 192], [296, 222], [312, 210], [306, 236], [286, 232]].map(([x, y], i) => `<g class="fc-ifn i${i}"><path d="M${x - 2.6} ${y - 1.6}h5.2M${x - 2.6} ${y + 1.6}h5.2"/><circle cx="${x}" cy="${y}" r="1.2"/></g>`).join("");
  // glucoza (rezervele scad)
  const glu = [[340, 196], [362, 206], [384, 192], [352, 222], [376, 226], [396, 212]].map(([x, y], i) => `<path class="fc-glu g${i}" d="${poly(Array.from({ length: 6 }, (_, k) => [x + Math.cos(k * 1.047 + 0.52) * 4, y + Math.sin(k * 1.047 + 0.52) * 4]), true)}"/>`).join("");
  // capilarul (jos) cu Fe, Zn, Cu în plasmă; macrofagul care stochează fierul (feritina)
  const capY = 290;
  const cap = vessels([{ pts: [[210, capY], [260, capY - 4], [320, capY + 2], [414, capY - 2]], w: 18, k: "a" }]);
  const met = [[228, "fe"], [244, "zn"], [262, "cu"], [280, "fe"], [298, "zn"], [316, "fe"], [334, "cu"], [352, "fe"], [370, "zn"], [388, "fe"], [404, "cu"]].map(([x, k], i) => `<circle class="fc-m ${k} m${i}" cx="${x}" cy="${capY + (i % 2 ? -3 : 3)}" r="2"/>`).join("");
  const MAC = [266, 252];
  const macSvg = `${organ(smooth(lumpy(MAC[0], MAC[1], 18, 14, 0.14, 3), true), "mac-b")}<path class="mac-nuc" d="${smooth(lumpy(MAC[0] - 4, MAC[1] + 2, 7, 9, 0.2, 5), true)}"/>` + [[MAC[0] + 8, MAC[1] - 6], [MAC[0] + 10, MAC[1] + 4], [MAC[0] + 2, MAC[1] - 10], [MAC[0] - 10, MAC[1] - 8], [MAC[0] + 4, MAC[1] + 10]].map(([x, y], i) => `<circle class="fc-ferr f${i}" cx="${x}" cy="${y}" r="2.2"/>`).join("") + `<g class="fc-mck">${cytokine("il1", MAC[0] + 26, MAC[1] - 12, 0.7, "a")}${cytokine("tnf", MAC[0] + 32, MAC[1] + 2, 0.7, "b")}</g>`;
  const panelB = `<g clip-path="url(#__U__-cB)"><rect class="fc-tis" x="${cB.x}" y="${cB.y}" width="${cB.w}" height="${cB.h}"/>${coll}${vcell}${virs}${bacSvg}${ntSvg}${TH}${ifn}${glu}${macSvg}${cap}${met}</g>`;

  /* ======================= C. graficele în funcție de temperatură ======================= */
  const G1 = { x: 44, y: 356, w: 150, h: 90 }, G2 = { x: 248, y: 356, w: 150, h: 90 };
  const tx = (g, T) => g.x + (T - 37) / 4 * g.w;
  const hy = (v) => G1.y + G1.h - (v - 60) / 70 * G1.h;              // 60–130 /min
  const oy = (v) => G2.y + G2.h - (v - 90) / 70 * G2.h;              // 90–160 %
  const band = `<path class="fc-band" d="M${tx(G1, 37)} ${f1(hy(70))}L${tx(G1, 41)} ${f1(hy(102))}L${tx(G1, 41)} ${f1(hy(118))}Z"/>`;
  let ch = `<text class="fc-ti" x="18" y="${G1.y - 12}" data-ui>Frecvența cardiacă (/min)</text><text class="fc-ti" x="222" y="${G2.y - 12}" data-ui>Consumul de O₂ (% din normal)</text>`;
  [70, 90, 110, 130].forEach((v) => { ch += `<path class="fc-grid" d="M${G1.x} ${f1(hy(v))}H${G1.x + G1.w}"/><text class="fc-t" x="${G1.x - 4}" y="${f1(hy(v) + 2.6)}" text-anchor="end" data-ui>${v}</text>`; });
  [100, 120, 140, 160].forEach((v) => { ch += `<path class="fc-grid" d="M${G2.x} ${f1(oy(v))}H${G2.x + G2.w}"/><text class="fc-t" x="${G2.x - 4}" y="${f1(oy(v) + 2.6)}" text-anchor="end" data-ui>${v}</text>`; });
  [G1, G2].forEach((g) => { ch += `<path class="fc-ax" d="M${g.x} ${g.y}V${g.y + g.h}H${g.x + g.w}"/>` + [37, 38, 39, 40, 41].map((T) => `<text class="fc-t" x="${f1(tx(g, T))}" y="${g.y + g.h + 9}" text-anchor="middle" data-ui>${T}</text>`).join("") + `<text class="fc-t" x="${g.x + g.w}" y="${g.y + g.h + 18}" text-anchor="end" data-ui>°C</text>`; });
  ch += band + `<path class="fc-line hr" d="M${tx(G1, 37)} ${f1(hy(70))}L${tx(G1, 41)} ${f1(hy(110))}"/><path class="fc-line o2" d="M${tx(G2, 37)} ${f1(oy(100))}L${tx(G2, 41)} ${f1(oy(152))}"/>`;
  ch += `<text class="fc-note" x="${G1.x + 4}" y="${G1.y + 8}" data-ui>+8–12/min la fiecare °C</text><text class="fc-note" x="${G2.x + 4}" y="${G2.y + 8}" data-ui>+13% la fiecare °C</text>`;
  const cur = `<g class="fc-cur1"><path class="fc-curl" d="M0 ${G1.y}V${G1.y + G1.h}"/><circle class="fc-dot hr" cx="0" cy="0" r="3"/></g><g class="fc-cur2"><path class="fc-curl" d="M0 ${G2.y}V${G2.y + G2.h}"/><circle class="fc-dot o2" cx="0" cy="0" r="3"/></g>`;

  const frames = [cA, cB].map((c) => `<rect class="fc-card" x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" rx="10"/>`).join("") + `<rect class="fc-card" x="10" y="334" width="400" height="140" rx="10"/>`;
  const clips = [["cA", cA], ["cB", cB]].map(([id, c]) => `<clipPath id="__U__-${id}"><rect x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" rx="10"/></clipPath>`).join("");
  return {
    W, H,
    geo: { G1, G2, hy0: G1.y + G1.h, hyK: G1.h / 70, oy0: G2.y + G2.h, oyK: G2.h / 70 },
    defs: clips + HT.defs + BR.defs,
    L: { frames, panelA, panelB, chart: ch, cur },
    hits: {
      eeg: { x: 14, y: 22, w: 190, h: 82 }, hr: { x: 14, y: 116, w: 190, h: 92 }, met: { x: 14, y: 226, w: 190, h: 92 },
      bac: { x: 220, y: 24, w: 104, h: 140 }, vir: { cx: VC[0], cy: VC[1], r: 34 }, fag: { cx: NT[0] - 6, cy: NT[1], r: 26 }, lt: { x: 236, y: 180, w: 84, h: 62 }, glu: { x: 330, y: 182, w: 76, h: 54 }, inf: { cx: MAC[0], cy: MAC[1], r: 22 }, fe: { x: 214, y: capY - 14, w: 196, h: 28 },
      chart: { x: 14, y: 344, w: 392, h: 126 },
    },
    badges: {
      eeg: [24, 30], hr: [24, 124], met: [24, 236], bac: [228, 22], vir: [404, 88], fag: [366, 116], lt: [236, 238], glu: [400, 240], inf: [292, 270], fe: [224, 310], chart: [400, 350],
    },
  };
}

export function preview(state = {}) {
  const A = build(), L = A.L, s = (x) => x.replaceAll("__U__", "pv");
  const b = state.b ?? 2;
  return { viewBox: `0 0 ${W} ${H}`, svg: s(`<defs>${A.defs}</defs><g class="fcx" data-b="${b}" data-n="${b * 3}">${L.frames}${L.panelA}${L.panelB}${L.chart}</g>`) };
}
