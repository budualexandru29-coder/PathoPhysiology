// Emisfera cerebrală stângă văzută lateral (polul frontal în stânga), cu cerebelul și trunchiul cerebral.
// Șanțurile principale: central (Rolando), precentral, postcentral, fisura laterală (Sylvius), frontal superior
// și inferior, temporal superior, intraparietal. Coordonate locale ~0..140 × 0..115.
import { smooth, offset, sampleSmooth, ellipse } from "../lib/geo.mjs";
import { organ } from "../lib/an.mjs";

// mirror: emisfera dreaptă (polul frontal în dreapta); desenul e același, oglindit
const T = (o, s, m) => (pts) => pts.map(([x, y]) => [o[0] + (m ? 140 - x : x) * s, o[1] + y * s]);

export function brainLat({ origin = [0, 0], s = 1, cls = "", mirror = false } = {}) {
  const t = T(origin, s, mirror);
  const cer = t([[4, 52], [7.5, 33], [20, 15.5], [42, 5], [70, 1.5], [96, 4.5], [118, 14.5], [132.5, 30], [139, 47.5], [135.5, 60.5], [124, 66.5], [106, 67], [93, 72.5], [72, 78], [52, 76.5], [38, 71], [31.5, 63.5], [25, 60.5], [13, 59]]);
  const cbl = t(ellipse(110, 78.5, 24.5, 12.6, 22, -0.12));
  const stem = t([[80, 70], [94, 70.5], [97.5, 80], [95.5, 90], [93, 99.5], [81.5, 99.5], [79.5, 90], [77, 80]]);
  // șanțurile: fiecare e o linie întunecată + o margine luminoasă (creasta girusului), ca să aibă relief
  const S = [
    [[78, 2.5], [74, 14], [69.5, 25], [66.5, 35], [62, 46]],                 // central
    [[66, 3.8], [61.5, 15], [57, 27], [53.5, 37], [50, 47.5]],               // precentral
    [[90, 5.5], [86.5, 17], [82, 28], [78.5, 37.5], [74.5, 45]],             // postcentral
    [[12, 25], [24, 21], [37, 20.5], [50, 22]],                              // frontal superior
    [[9, 40], [20, 36], [33, 37.5], [46, 37]],                               // frontal inferior
    [[42, 63.5], [58, 58.8], [74, 56], [92, 54], [104, 51]],                 // temporal superior
    [[86, 22], [100, 26], [112, 33.5], [123, 41]],                           // intraparietal
    [[114, 13.5], [118, 22], [124, 26]],                                     // parieto-occipital (capătul lateral)
    [[47, 70.5], [64, 67.5], [82, 66]],                                      // temporal inferior
    [[126, 50], [132, 56]],                                                  // lunat
  ].map(t);
  // șanțuri secundare, mai fine: dau textura de cortex la mărire
  const S2 = [
    [[18, 30], [24, 26.5], [30.5, 29]], [[13, 47.5], [21, 45], [28, 48.5]], [[29, 11], [35.5, 14.5], [42, 12.5]], [[52, 9.5], [55.5, 15.5], [53.5, 22]],
    [[42.5, 28], [47.5, 32.5], [45, 40]], [[29, 43], [35.5, 47.5], [42, 45.5]], [[58.5, 32], [62, 36], [60, 41]],
    [[97, 11], [102.5, 15.5], [107.5, 13.5]], [[99.5, 40], [106, 44], [112.5, 41.5]], [[117, 22], [121.5, 27.5], [126.5, 29.5]], [[108, 50.5], [114, 54.5], [121, 52.5]],
    [[50, 68], [57.5, 65.5], [64, 69.5]], [[85.5, 61.5], [92, 64.5], [98.5, 60.5]], [[107, 58.5], [114, 61]], [[128.5, 38.5], [133.5, 45.5]], [[127, 57.5], [132.5, 61]],
    [[71, 59.5], [78, 61.5], [84, 59]], [[88, 30.5], [93.5, 35], [91.5, 42]], [[64, 14.5], [68.5, 19.5]], [[36, 56], [41, 52.5]],
  ].map(t);
  const sylvius = t([[29, 60.5], [44, 55.5], [60, 51.5], [76, 48.5], [90, 46.2], [99, 41]]);
  const syAsc = t([[90, 46.2], [96, 38.5], [99.5, 33]]);
  const syAnt = t([[44, 55.5], [40.5, 48], [41.5, 43]]);
  const sulcus = (pts, w = 1) => `<path class="bl-sulc" d="${smooth(pts)}" style="stroke-width:${w * s}px"/><path class="bl-crest" d="${smooth(offset(sampleSmooth(pts, false, 4), -1.3 * s))}"/>`;
  const folia = [];
  for (let k = -4; k <= 4; k++) {
    const y = 78.5 + k * 2.6, half = 24.5 * Math.sqrt(Math.max(0, 1 - (k * 2.6 / 12.6) ** 2)) - 1.5;
    if (half > 3) folia.push(t([[110 - half, y + 0.8], [110, y - 0.6], [110 + half, y + 0.4]]));
  }
  const svg = `<g class="brain-g ${cls}">`
    + organ(smooth(stem, true), "bl-stem")
    + `<path class="bl-pons" d="${smooth(t([[79, 76], [95, 76.5], [97, 84], [94.5, 90], [80.5, 89.5], [77.5, 83]]), true)}"/>`
    + organ(smooth(cbl, true), "bl-cbl", { extra: folia.map((p) => `<path class="bl-fol" d="${smooth(p)}"/>`).join("") })
    + organ(smooth(cer, true), "bl-cer")
    + `<g clip-path="url(#__U__-blc)">${S.map((p, i) => sulcus(p, i < 3 ? 1.25 : 0.95)).join("")}${S2.map((p) => sulcus(p, 0.7)).join("")}${sulcus(sylvius, 1.9)}${sulcus(syAsc, 1.1)}${sulcus(syAnt, 1.1)}</g>`
    + `<path class="bl-edge" d="${smooth(cer, true)}"/>`
    + `<ellipse class="bl-cut" cx="${t([[87.2, 99.5]])[0][0].toFixed(1)}" cy="${t([[87.2, 99.5]])[0][1].toFixed(1)}" rx="${(5.8 * s).toFixed(1)}" ry="${(1.6 * s).toFixed(1)}"/>`
    + `</g>`;
  // artera cerebrală medie: urcă de sub polul temporal, intră în șanțul lateral și se ramifică pe fața laterală
  const mca = [
    [[27, 82], [28.5, 72], [33, 62], [42, 56.4], [58, 52.2], [76, 48.9], [92, 45.8], [101, 40.5]],
    [[42, 56.4], [37.5, 46], [33, 35], [28, 26]], [[58, 52.2], [56.5, 40], [53, 28], [49, 17]],
    [[76, 48.9], [79, 36], [84, 24], [88, 13]], [[92, 45.8], [103, 34], [114, 26.5], [124, 23]],
    [[58, 52.2], [64, 60], [72, 66.5]], [[76, 48.9], [86, 56.5], [98, 60]], [[101, 40.5], [113, 44], [126, 47]],
  ].map(t);
  return {
    svg, mca, outline: smooth(cer, true),
    defs: `<clipPath id="__U__-blc"><path d="${smooth(cer, true)}"/></clipPath>`,
    anchors: { carotid: t([[27, 82]])[0], jug: t([[104, 89]])[0], stemEnd: t([[87.2, 99.5]])[0], center: t([[70, 38]])[0], box: { x: origin[0], y: origin[1], w: 140 * s, h: 115 * s } },
  };
}
