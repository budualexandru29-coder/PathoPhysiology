// Fața medială a emisferei și structurile de pe linia mediană (diencefal, trunchi cerebral, cerebel), în centimetri
// față de centrul șeii turcești (x spre față, y în jos). Folosită de figura capului (Î2/Î6) și de figura febrei.
import { smooth, sampleSmooth, offset, ellipse } from "../lib/geo.mjs";
import { organ } from "../lib/an.mjs";

export function brainMedData() {
  const cer = [[6.05, -1.55], [5.95, -3.05], [5.25, -4.95], [4.15, -6.65], [2.55, -7.9], [0.55, -8.62], [-1.6, -8.78], [-3.85, -8.3], [-6.05, -7.0], [-7.8, -5.1], [-9.0, -2.9], [-9.55, -0.85], [-9.2, 0.25], [-8.0, 0.0], [-6.6, -0.75], [-5.1, -1.85], [-4.1, -2.65], [-3.2, -2.75], [-2.2, -1.9], [-1.0, -1.0], [0.4, -0.65], [1.55, -0.62], [3.5, -0.62], [5.3, -0.95]];
  const cc = [[2.25, -2.45], [2.9, -2.4], [3.75, -2.85], [3.9, -3.45], [3.55, -4.55], [2.45, -5.3], [0.5, -5.55], [-1.5, -5.45], [-3.0, -5.0], [-4.0, -4.35], [-4.3, -3.65], [-3.8, -3.0], [-3.05, -3.25], [-2.0, -4.0], [-0.5, -4.55], [1.2, -4.65], [2.35, -4.25], [2.85, -3.55], [2.65, -2.95]];
  const septum = [[2.55, -3.1], [2.7, -3.75], [2.25, -4.2], [1.0, -4.55], [-0.6, -4.45], [-2.05, -3.9], [-2.95, -3.25], [-2.0, -3.0], [-0.6, -3.35], [0.9, -3.15], [1.75, -2.75], [2.05, -2.45]];
  const fornix = [[-3.35, -3.25], [-2.2, -3.15], [-0.7, -3.42], [0.75, -3.25], [1.45, -2.8], [1.4, -2.0], [0.95, -1.15], [0.35, -0.6]];
  const thal = ellipse(-0.75, -1.95, 1.55, 0.95, 22, -0.12);
  const ita = ellipse(-0.6, -1.9, 0.38, 0.27, 12);
  const hypoth = [[1.65, -1.65], [1.95, -0.6], [1.3, -0.12], [0.45, -0.22], [-0.25, -0.5], [-0.95, -1.0], [-0.3, -1.55], [0.75, -2.15]];
  const chiasm = [[1.45, -0.42], [2.25, -0.35], [2.35, 0.05], [1.55, 0.12]];
  const stalk = [[1.15, -0.2], [0.75, -0.02], [0.45, 0.12], [0.62, 0.25], [1.0, 0.1], [1.3, -0.08]];
  const pitA = [[0.2, 0.05], [0.88, 0.02], [0.85, 0.45], [0.45, 0.55], [0.15, 0.45]];
  const pitP = [[-0.38, 0.0], [0.2, 0.05], [0.15, 0.45], [-0.12, 0.5], [-0.42, 0.25]];
  const mamm = ellipse(0.05, -0.42, 0.28, 0.24, 12);
  const pineal = [[-2.35, -1.95], [-3.05, -1.85], [-3.25, -1.6], [-2.55, -1.42]];
  const antCom = ellipse(1.42, -2.05, 0.2, 0.17, 10);
  const postCom = ellipse(-2.15, -1.25, 0.16, 0.14, 10);
  // trunchiul cerebral: mezencefal, punte, bulb
  const stem = [[-0.25, -0.5], [-0.75, -0.95], [-1.55, -1.05], [-2.25, -1.2], [-2.55, -0.85], [-2.7, -0.2], [-2.45, 0.55], [-2.55, 1.6], [-2.65, 2.45], [-3.0, 3.35], [-3.25, 4.4], [-3.35, 5.0], [-2.65, 5.0], [-2.3, 4.2], [-1.6, 3.4], [-0.8, 3.0], [-0.15, 2.4], [0.0, 1.4], [-0.4, 0.5], [-0.45, -0.1]];
  const pons = [[-0.45, 0.45], [0.0, 1.35], [-0.15, 2.4], [-0.8, 3.0], [-1.6, 3.05], [-2.0, 2.1], [-1.9, 0.9], [-1.25, 0.45]];
  const colliculi = [[-2.25, -1.2], [-2.75, -1.05], [-2.95, -0.6], [-2.75, -0.35], [-2.95, 0.05], [-2.7, 0.4], [-2.45, 0.5]];
  const aqueduct = [[-1.95, -0.95], [-2.15, -0.3], [-2.25, 0.35]];
  const v4 = [[-2.25, 0.35], [-3.75, 1.35], [-3.0, 2.6], [-3.05, 3.35], [-2.55, 2.45], [-2.45, 1.4]];
  // cerebelul (vermisul în secțiune) cu arbor vitae
  const cbl = [[-4.0, -2.45], [-5.35, -1.42], [-7.05, -0.22], [-8.55, 0.95], [-9.0, 1.85], [-8.6, 2.85], [-7.6, 3.65], [-6.0, 4.05], [-4.6, 4.15], [-3.6, 3.55], [-3.25, 2.7], [-3.85, 1.4], [-3.25, 0.4], [-3.15, -0.7]];
  const fast = [-3.85, 1.2];
  const arbor = [[[-3.85, 1.2], [-5.0, 1.15], [-6.4, 1.3], [-7.9, 1.5]], [[-5.0, 1.15], [-5.7, 0.2], [-6.4, -0.35]], [[-5.6, 0.4], [-4.9, -0.8], [-4.4, -1.75]], [[-6.4, 1.45], [-7.4, 0.8]], [[-5.0, 1.3], [-5.9, 2.3], [-7.2, 2.9]], [[-5.9, 2.3], [-5.6, 3.3], [-5.2, 3.75]], [[-6.4, 1.45], [-7.6, 2.2], [-8.2, 2.2]], [[-4.5, 1.3], [-4.4, 2.6], [-4.4, 3.5]]];
  const sulci = [
    [[2.2, -2.35], [3.75, -2.2], [4.75, -3.0], [4.85, -4.3], [4.0, -5.7], [2.4, -6.55], [0.3, -6.85], [-1.6, -6.75], [-2.5, -6.6], [-2.75, -7.4], [-2.85, -8.55]],  // cingular + ramura marginală
    [[0.15, -6.85], [0.35, -7.8], [0.25, -8.55]],                                                // paracentral
    [[-1.05, -8.72], [-1.25, -8.0]],                                                             // capătul medial al șanțului central
    [[-6.05, -6.95], [-5.6, -5.3], [-5.15, -3.95], [-4.75, -2.95]],                               // parieto-occipital
    [[-9.4, -1.15], [-8.2, -1.6], [-6.8, -2.05], [-5.6, -2.55], [-4.75, -2.95], [-4.15, -2.6]],   // calcarin
    [[-2.6, -6.55], [-3.7, -6.25], [-4.6, -6.3]],                                                 // subparietal
    [[2.6, -1.65], [4.0, -1.45], [5.4, -1.85]],                                                   // rostral superior
    [[3.1, -6.85], [4.0, -6.05], [4.6, -5.15]], [[1.6, -7.55], [2.3, -7.1]], [[-7.3, -3.6], [-6.5, -3.2], [-6.0, -3.55]], [[-7.8, -4.4], [-8.4, -3.6]],
    [[-3.6, -7.6], [-4.2, -7.0]], [[-8.6, -0.9], [-7.6, -0.6]], [[5.1, -2.9], [5.5, -3.6]],
  ];
  const callosal = sampleSmooth([[2.9, -2.35], [3.95, -2.85], [4.1, -3.5], [3.7, -4.7], [2.5, -5.48], [0.5, -5.75], [-1.5, -5.65], [-3.05, -5.2], [-4.15, -4.45], [-4.5, -3.6]], false, 6);
  return { cer, cc, septum, fornix, thal, ita, hypoth, chiasm, stalk, pitA, pitP, mamm, pineal, antCom, postCom, stem, pons, colliculi, aqueduct, v4, cbl, fast, arbor, sulci, callosal };
}

/** Desenul feței mediale; c mapează [x, y] în cm la pixeli, k = px pe cm. Întoarce straturile separat. */
export function brainMedSvg(c, k, uid = "__U__") {
  const D = brainMedData(), C = (pts) => pts.map(c), sm = (pts, closed = false, t = 1) => smooth(C(pts), closed, t);
  const s = k / 17;
  let fol = "";
  for (let r = 1.1; r < 5.6; r += 0.48) { const pts = []; for (let a = -1.5; a <= 1.75; a += 0.12) pts.push([D.fast[0] - Math.cos(a) * r * 1.05, D.fast[1] - Math.sin(a) * r * 0.62]); fol += `<path class="hx2-fol" d="${sm(pts)}"/>`; }
  return {
    outline: sm(D.cer, true),
    defs: `<clipPath id="${uid}-bm"><path d="${sm(D.cer, true)}"/></clipPath><clipPath id="${uid}-bc"><path d="${sm(D.cbl, true)}"/></clipPath>`,
    // sub emisferă: diencefalul (fundalul de sub corpul calos) și cisterna dintre coliculi și cerebel
    brain: `<path class="hx2-dien" d="${sm([[-4.1, -2.75], [-3.0, -3.3], [-1.0, -3.6], [1.2, -3.4], [1.95, -2.3], [1.95, -0.55], [0.4, -0.45], [-0.6, -0.7], [-2.0, -1.0], [-2.8, -1.6]], true)}"/>`
      + `<path class="hx2-cist" d="${sm([[-4.05, -2.6], [-3.2, -2.8], [-2.45, -1.6], [-2.9, -0.7], [-3.0, 0.05], [-3.3, 0.35], [-3.2, -0.7], [-3.95, -2.4]], true)}"/>`
      + organ(sm(D.cer, true), "hx2-cer"),
    sulci: `<g clip-path="url(#${uid}-bm)">` + D.sulci.map((p, i) => `<path class="hx2-sulc" d="${sm(p)}" style="stroke-width:${(i < 5 ? 1.5 : 1) * s}px"/><path class="hx2-crest" d="${smooth(offset(sampleSmooth(C(p), false, 4), -1.4 * s))}"/>`).join("") + `<path class="hx2-callo" d="${smooth(C(D.callosal))}"/>` + `<path class="hx2-vent" d="${sm(D.septum, true)}"/></g>`,
    cc: organ(sm(D.cc, true), "hx2-cc") + `<path class="hx2-forn" d="${sm(D.fornix)}" style="stroke-width:${3.2 * s}px"/>` + organ(sm(D.antCom, true), "hx2-cc"),
    thal: organ(sm(D.thal, true), "hx2-thal") + `<path class="hx2-ita" d="${sm(D.ita, true)}"/>` + organ(sm(D.pineal, true), "hx2-pin"),
    hypo: `<path class="hx2-hypo" d="${sm(D.hypoth, true)}"/>`,
    hypoD: sm(D.hypoth, true),
    sella: organ(sm(D.stalk, true), "hx2-pit") + organ(sm(D.pitA, true), "hx2-pit a") + organ(sm(D.pitP, true), "hx2-pit p") + organ(sm(D.mamm, true), "hx2-thal") + organ(sm(D.chiasm, true), "hx2-nerve"),
    stem: organ(sm(D.stem, true), "hx2-stem") + organ(sm(D.pons, true), "hx2-pons") + `<path class="hx2-coll" d="${sm(D.colliculi)}"/><path class="hx2-aq" d="${sm(D.aqueduct)}" style="stroke-width:${1.6 * s}px"/><path class="hx2-v4" d="${sm(D.v4, true)}"/>`,
    cbl: organ(sm(D.cbl, true), "hx2-cbl") + `<g clip-path="url(#${uid}-bc)">${fol}</g>` + D.arbor.map((p, i) => `<path class="hx2-arbor" d="${sm(p)}" style="stroke-width:${(i ? 1.4 : 2.4) * s}px"/>`).join(""),
  };
}
