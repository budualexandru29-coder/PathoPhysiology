// Inima văzută din față (fața sternocostală), cu marile vase. Coordonate locale ~0..115 × 0..135;
// partea stângă a desenului e partea dreaptă a pacientului (atriul drept, vena cavă), vârful e jos-dreapta.
// Pe fața anterioară se văd: atriul drept cu auriculul, ventriculul drept (cea mai mare parte), o fâșie din
// ventriculul stâng spre marginea stângă și vârf, auriculul stâng, trunchiul pulmonar și aorta ascendentă.
// Șanțurile au grăsime epicardică cu artera coronară dreaptă (șanțul coronar) și artera interventriculară
// anterioară (ram al coronarei stângi), însoțită de vena cardiacă mare.
import { smooth } from "../lib/geo.mjs";
import { vessels, organ } from "../lib/an.mjs";

const T = (o, s) => (pts) => pts.map(([x, y]) => [o[0] + x * s, o[1] + y * s]);

export function heart({ origin = [0, 0], s = 1 } = {}) {
  const t = T(origin, s);
  const outline = t([[24, 22], [17, 40], [13.5, 62], [17, 84], [26, 98], [42, 108.5], [62, 118.5], [82, 126.5], [97, 131], [106.5, 125], [110.5, 108], [110.5, 88], [106.5, 68], [100.5, 54], [94, 46], [86, 41], [78, 37.5], [66, 35.5], [56, 38.5], [43, 31], [34, 24.5]]);
  // atriul drept: de la vena cavă superioară la cea inferioară, delimitat de șanțul coronar
  const ra = t([[24, 22], [17, 40], [13.5, 62], [17, 84], [26, 98], [36, 103], [40, 92], [38.5, 72], [39.5, 52], [42, 36], [34, 24.5]]);
  // fâșia ventriculului stâng (de la șanțul interventricular la marginea stângă)
  const lv = t([[86, 41], [94, 46], [100.5, 54], [106.5, 68], [110.5, 88], [110.5, 108], [106.5, 125], [97, 131], [95.5, 118], [92.5, 98], [88.5, 76], [84, 58], [80.5, 44.5]]);
  const sulcCor = t([[42, 34], [40, 52], [38.5, 72], [39.5, 92], [38, 104.5]]);           // șanțul coronar drept
  const sulcIV = t([[80, 40.5], [84.5, 58], [88.8, 77], [92.6, 98], [95.6, 118], [97, 130.5]]); // șanțul interventricular anterior
  // auriculele: lambouri în formă de ureche, cu marginea liberă crenelată
  const lAur = t([[85.5, 42], [88.5, 35.5], [94.5, 31.2], [101, 30.6], [105.2, 33], [104.6, 36.6], [101.6, 37.6], [103, 40.6], [100.2, 43.2], [97.6, 42.6], [96.4, 46.2], [93, 46.4]]);
  const rAur = t([[33.5, 25.5], [39.5, 19.2], [47.5, 16.2], [55.5, 16.4], [61.2, 19.6], [59.6, 24.2], [55.6, 25.4], [57.2, 29], [53, 31.6], [49.8, 30.4], [49.2, 34.6], [45, 36.4], [42.4, 33.6], [39.2, 31.4]]);
  // trunchiul pulmonar (iese din infundibulul ventriculului drept, urcă spre stânga pacientului)
  const ptAxis = t([[71, 41], [72.5, 30], [75.5, 20], [80.5, 12.5]]);
  // aorta ascendentă (pornește din spatele trunchiului pulmonar, urcă spre dreapta pacientului)
  const aoAsc = t([[60, 40], [58, 28], [57, 17], [58.5, 7]]);

  const fatBand = (pts, w) => `<path class="hc-fat" d="${smooth(pts)}" style="stroke-width:${w * s}px"/>`;
  const cor = vessels([
    { pts: t([[47, 33], [42.5, 44], [40.6, 60], [39.4, 78], [39.8, 94], [42, 104.5], [54, 112]]), w: 1.9 * s, k: "a" },   // coronara dreaptă
    { pts: t([[39.6, 82], [30, 92], [26.5, 100]]), w: 1 * s, k: "a" },                                                    // ram marginal drept
    { pts: t([[79, 37], [83.5, 56], [87.9, 76.5], [91.8, 98], [94.8, 118], [96.4, 129]]), w: 1.7 * s, k: "a" },           // interventriculara anterioară
    { pts: t([[85.4, 62], [94, 70], [101, 80]]), w: 0.95 * s, k: "a" },                                                   // ram diagonal
    { pts: t([[89.6, 86], [98, 95], [104, 104]]), w: 0.85 * s, k: "a" },
    { pts: t([[85, 50], [75, 58], [66, 70]]), w: 0.8 * s, k: "a" },                                                        // ram septal/ventricular drept
  ]) + vessels([
    { pts: t([[97.8, 128], [96, 117], [93.4, 98.4], [89.5, 77], [85.4, 57.5], [83.2, 45]]), w: 1.2 * s, k: "v" },           // vena cardiacă mare
    { pts: t([[56, 112], [66, 100], [72, 86]]), w: 0.9 * s, k: "v" },                                                     // vene cardiace anterioare
  ]);
  // „mușchiul”: fibre fine pe ventriculi (urmează conturul), ca textura să aibă direcție
  const fibers = [0.18, 0.34, 0.5].map((k) => `<path class="hc-fib" d="${smooth(t([[44 + k * 30, 40 + k * 10], [48 + k * 28, 70], [56 + k * 24, 100], [70 + k * 20, 120 - k * 6]]))}"/>`).join("");

  const svg = `<g class="heart-g">`
    + organ(smooth(outline, true), "hc-body")
    + `<path class="hc-lv" d="${smooth(lv, true)}"/>`
    + `<path class="hc-ra" d="${smooth(ra, true)}"/>`
    + `<g clip-path="url(#__U__-hc)">${fibers}</g>`
    + `<path class="an-vol" d="${smooth(outline, true)}"/>`
    + fatBand(sulcCor, 4.2) + fatBand(sulcIV, 4)
    + cor
    + `<path class="hc-edge" d="${smooth(outline, true)}"/>`
    + organ(smooth(lAur, true, 0.7), "hc-aur l")
    + organ(smooth(rAur, true, 0.7), "hc-aur r")
    + `</g>`;
  return {
    svg,
    defs: `<clipPath id="__U__-hc"><path d="${smooth(outline, true)}"/></clipPath>`,
    pt: { axis: ptAxis, top: ptAxis[ptAxis.length - 1] },
    aoAsc,
    anchors: {
      svcIn: t([[28, 23]])[0], ivcIn: t([[30, 100]])[0], ra: t([[26, 60]])[0], rv: t([[62, 80]])[0], apex: t([[100, 126]])[0],
      center: t([[62, 80]])[0], box: { x: origin[0] + 10 * s, y: origin[1] + 15 * s, w: 104 * s, h: 120 * s },
    },
  };
}
