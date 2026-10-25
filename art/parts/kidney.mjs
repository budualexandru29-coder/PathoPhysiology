// Rinichiul stâng în secțiune frontală, hilul spre linia mediană (stânga desenului): capsula, corticala,
// piramidele medulare cu papilele, coloanele renale, calicele mici și mari, bazinetul și ureterul.
// Coordonate locale ~0..72 × 0..108.
import { smooth, lerp } from "../lib/geo.mjs";
import { organ } from "../lib/an.mjs";

// mirror: rinichiul drept (hilul spre dreapta desenului)
const T = (o, s, m) => (pts) => pts.map(([x, y]) => [o[0] + (m ? 72 - x : x) * s, o[1] + y * s]);

export function kidney({ origin = [0, 0], s = 1, mirror = false } = {}) {
  const t = T(origin, s, mirror);
  const out = t([[40, 2], [56.5, 9], [66, 27], [69, 52], [65.5, 78], [54, 97.5], [36, 104], [20, 97], [12.5, 82], [15, 69], [24.5, 62.5], [25.5, 46.5], [15.5, 40], [12, 25], [20.5, 8.5]]);
  const sinus = [27, 54];                                    // centrul sinusului renal (local)
  // piramidele: baza spre corticală, vârful (papila) spre sinus
  const pyr = [
    [[36, 12], [50, 15.5]], [[54, 22], [61, 34]], [[62.5, 42], [63.5, 57]], [[62, 66], [57, 79]], [[52, 85], [41, 93.5]], [[33.5, 94], [23.5, 88]],
  ].map(([a, b], i) => {
    const mid = lerp(a, b, 0.5), tip = lerp(mid, sinus, 0.55 + (i % 2) * 0.04);
    return { d: smooth(t([a, lerp(a, tip, 0.5), tip, lerp(b, tip, 0.5), b, lerp(lerp(a, b, 0.5), mid, 1)]), true), tip: tip };
  });
  // calicele mici (cupe pe papile) și cele mari, apoi bazinetul care iese prin hil
  const calyx = pyr.map((p) => { const c = t([p.tip])[0]; return `<path class="kd-cal" d="${smooth(t([[p.tip[0] - 2.8, p.tip[1] - 1.5], [p.tip[0] + 2.8, p.tip[1] - 1.5], [p.tip[0] + 2.2, p.tip[1] + 2.2], [p.tip[0] - 2.2, p.tip[1] + 2.2]]), true)}"/>` + `<path class="kd-calk" d="${smooth([c, lerp(c, t([sinus])[0], 0.6)])}"/>`; }).join("");
  const pelvis = t([[31, 42], [37, 50], [36, 60], [29, 66], [21, 66.5], [14.5, 70], [12.5, 64], [18, 58.5], [22, 51], [24, 44]]);
  const cortexIn = t([[39, 9], [52.5, 15], [60, 30], [62.5, 52], [59.5, 74], [50, 89.5], [36, 96], [24, 90.5], [19.5, 81], [27, 70], [31, 56], [30.5, 43], [21, 31], [24, 16]]);
  const ureter = t([[14, 67.5], [10, 82], [9, 98], [10.5, 112]]);
  const svg = `<g class="kd-g">`
    + organ(smooth(out, true), "kd-cap")
    + `<path class="kd-med" d="${smooth(cortexIn, true)}"/>`
    + pyr.map((p) => `<path class="kd-pyr" d="${p.d}"/><path class="kd-stri" d="${p.d}"/>`).join("")
    + `<path class="kd-sinus" d="${smooth(t([[30, 38], [35, 47], [34, 61], [27, 68], [18, 69], [15, 61], [24, 52], [24.5, 42]]), true)}"/>`
    + calyx
    + `<path class="kd-pelv" d="${smooth(pelvis, true)}"/>`
    + `<path class="kd-ur-w" d="${smooth(ureter)}"/><path class="kd-ur" d="${smooth(ureter)}"/>`
    + `<ellipse class="kd-urc" cx="${ureter[3][0].toFixed(1)}" cy="${ureter[3][1].toFixed(1)}" rx="${(2.3 * s).toFixed(1)}" ry="${(0.9 * s).toFixed(1)}"/>`
    + `<path class="an-vol" d="${smooth(out, true)}"/>`
    + `<path class="kd-edge" d="${smooth(out, true)}"/>`
    + `</g>`;
  return { svg, anchors: { hilumA: t([[18, 49.5]])[0], hilumV: t([[17, 56.5]])[0], ureterEnd: ureter[ureter.length - 1], center: t([[42, 54]])[0], box: { x: origin[0] + (mirror ? 2 : 10) * s, y: origin[1], w: 60 * s, h: 106 * s } } };
}
