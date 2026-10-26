// Î2 + Î6 · Capul ca „radiator”: secțiune mediosagitală a capului și gâtului, fața spre dreapta.
// Geometria e dată în centimetri față de centrul șeii turcești (x spre față, y în jos), pe proporții
// cefalometrice obișnuite la adult (S–N ≈ 7 cm, unghiul N–S–Ba ≈ 130°, înălțimea feței N–Me ≈ 12,5 cm),
// apoi transformată în pixeli. Structurile laterale (ochiul, vena oftalmică superioară, sinusul cavernos,
// carotida internă, vena facială, jugulara internă) sunt proiectate peste secțiune și desenate translucid.
import { smooth, sampleSmooth, offset, poly, ellipse, lumpy, along } from "./lib/geo.mjs";
import { vessels, organ, cutEnd } from "./lib/an.mjs";
import { brainMedData } from "./parts/brain-med.mjs";

export const W = 400, H = 452;
const K = 17;                                         // px pe cm
const X0 = 12 + 11.2 * K, Y0 = 12 + 10.2 * K;          // poziția șeii turcești în desen
const c = ([x, y]) => [X0 + x * K, Y0 + y * K];
const C = (pts) => pts.map(c);
const sm = (pts, closed = false, t = 1) => smooth(C(pts), closed, t);

export function build() {
  /* ---------- conturul capului (țesutul moale) ---------- */
  const skin = [[4.0, 15.6], [3.65, 13.9], [3.75, 12.95], [5.6, 12.85], [7.0, 12.5], [8.35, 11.35], [8.5, 10.3], [8.05, 9.35], [9.1, 8.35], [8.75, 7.4], [9.35, 6.45], [9.05, 5.25], [8.95, 4.75], [9.9, 4.5], [10.65, 3.4], [10.4, 2.4], [9.4, 1.0], [8.4, -0.3], [7.75, -0.85], [8.15, -1.9], [8.0, -3.6], [7.3, -5.6], [6.1, -7.4], [4.3, -8.9], [2.1, -9.85], [0, -10.2], [-2.5, -10.0], [-5.0, -9.0], [-7.3, -7.2], [-9.2, -4.9], [-10.6, -2.2], [-11.15, 0.0], [-10.95, 1.9], [-10.4, 3.3], [-9.45, 4.9], [-8.85, 6.6], [-8.45, 9], [-8.15, 12], [-7.95, 15.6]];
  const skinD = sm(skin, false) + "Z";

  /* ---------- craniul: tăblia externă, diploea, tăblia internă ---------- */
  const vaultOut = [[6.95, -0.85], [7.45, -1.75], [7.4, -3.5], [6.75, -5.4], [5.55, -7.1], [3.85, -8.4], [1.85, -9.25], [0, -9.55], [-2.4, -9.35], [-4.8, -8.4], [-7.0, -6.6], [-8.8, -4.4], [-10.0, -1.9], [-10.5, 0.2], [-10.25, 1.7], [-9.45, 3.2], [-8.0, 4.3], [-6.1, 4.95]];
  const vOut = sampleSmooth(vaultOut, false, 8);
  const vIn = offset(vOut, -0.62);                    // tăblia internă (spre interior)
  const vMid = offset(vOut, -0.31);
  // bolta ca inel: exterior + interior închise la capete (sinusul frontal în față, opistionul în spate)
  const vaultRing = [...vOut, ...vIn.slice().reverse()];
  // baza craniului pe linia mediană: opistion → (gaura mare) → bazion → clivus → șaua turcească → planum → lama ciuruită → frontal
  const clivus = [[-2.45, 3.78], [-1.7, 2.4], [-1.15, 1.0], [-0.85, -0.2], [-0.62, -0.68]];
  const sella = [[-0.62, -0.68], [-0.5, -0.12], [-0.12, 0.45], [0.5, 0.48], [0.92, 0.0], [1.0, -0.42]];
  const planum = [[1.0, -0.42], [1.5, -0.5], [2.6, -0.42], [3.4, -0.1], [4.6, 0.02], [5.2, -0.2], [5.45, -0.75], [5.85, -1.0]];
  // corpul sfenoidului și bazioccipitalul (os plin), cu sinusul sfenoidal
  const sphenoid = [[-2.45, 3.78], [-1.7, 2.4], [-1.15, 1.0], [-0.85, -0.2], [-0.62, -0.68], [-0.5, -0.12], [-0.12, 0.45], [0.5, 0.48], [0.92, 0.0], [1.0, -0.42], [1.6, -0.48], [2.55, -0.3], [2.75, 0.9], [2.55, 2.4], [1.8, 2.75], [0.4, 2.85], [-0.8, 3.15], [-1.7, 3.75], [-2.2, 4.05]];
  const sphSinus = [[0.35, 1.05], [1.05, 0.75], [2.15, 0.8], [2.4, 1.6], [2.1, 2.3], [1.05, 2.45], [0.4, 2.1], [0.2, 1.5]];
  // sinusul frontal (în osul frontal, deasupra nasionului)
  const frontSinus = [[6.55, -1.15], [7.0, -1.3], [7.05, -2.3], [6.75, -3.0], [6.35, -2.6], [6.2, -1.7]];
  // oasele nazale și cartilajul nasului
  const nasalBone = [[6.95, -0.85], [7.45, -0.2], [8.2, 1.15], [8.45, 1.6], [8.2, 1.7], [7.3, 0.4], [6.7, -0.4]];
  const noseCart = [[8.25, 1.55], [9.3, 2.5], [10.05, 3.35], [9.85, 4.05], [9.2, 4.2], [8.3, 3.6], [7.6, 2.4], [7.9, 1.75]];
  // maxila și palatul dur, cu incisivul superior
  const maxilla = [[7.25, 4.35], [6.0, 4.25], [3.2, 4.25], [2.0, 4.5], [2.1, 4.95], [3.4, 5.0], [5.8, 5.05], [6.8, 5.2], [7.25, 5.95], [7.55, 5.85], [7.6, 4.95]];
  const incU = [[7.3, 5.75], [7.75, 5.85], [7.95, 6.6], [7.85, 7.35], [7.55, 7.3], [7.3, 6.6]];
  // simfiza mandibulei (corticală și spongioasă), cu incisivul inferior
  const mand = [[7.05, 7.95], [7.6, 7.95], [7.8, 9.0], [8.0, 10.55], [7.65, 11.25], [6.9, 11.6], [6.15, 11.2], [5.85, 10.3], [6.2, 9.2], [6.65, 8.5]];
  const mandIn = [[7.1, 8.4], [7.45, 9.2], [7.6, 10.4], [7.0, 11.0], [6.35, 10.75], [6.25, 9.8], [6.6, 8.9]];
  const incL = [[7.15, 7.3], [7.55, 7.3], [7.7, 7.75], [7.6, 8.55], [7.3, 8.6], [7.15, 7.8]];
  // limba, palatul moale, epiglota, osul hioid
  const tongue = [[7.2, 7.2], [6.4, 6.3], [4.9, 5.72], [3.3, 5.72], [2.0, 6.25], [1.15, 7.3], [0.95, 8.45], [1.2, 9.3], [2.25, 10.25], [4.3, 10.4], [5.85, 10.1], [6.3, 8.75], [6.85, 7.9]];
  const softPal = [[2.0, 4.5], [1.25, 5.0], [0.75, 5.75], [0.5, 6.35], [0.85, 6.4], [1.3, 5.85], [2.1, 5.0]];
  const epiglot = [[1.25, 10.05], [0.7, 9.35], [0.3, 8.6], [0.5, 8.5], [1.0, 9.2], [1.55, 9.9]];
  const hyoid = ellipse(2.75, 10.95, 0.55, 0.32, 14, -0.3);
  // laringele și traheea
  const thyroid = [[2.55, 11.5], [3.35, 11.75], [3.4, 13.0], [3.1, 13.85], [2.6, 13.6], [2.35, 12.4]];
  const cricoid = [[2.2, 13.85], [3.0, 14.05], [2.9, 14.6], [1.6, 14.75], [0.95, 14.2], [1.1, 13.65]];
  const trachea = [[1.15, 14.6], [2.75, 14.5], [2.8, 15.7], [1.2, 15.7]];
  const vocal = [[1.25, 12.85], [2.45, 12.95], [2.45, 13.1], [1.25, 13.05]];
  const esoph = [[-0.25, 13.3], [0.95, 13.4], [1.05, 15.7], [-0.45, 15.7]];
  const lipU = [[8.45, 5.6], [9.3, 6.25], [9.35, 6.8], [8.85, 7.35], [8.3, 7.2], [8.0, 6.4]];
  const lipL = [[8.25, 7.45], [8.85, 7.45], [9.1, 8.1], [8.6, 8.85], [8.0, 8.7], [7.9, 8.0]];
  // căile aeriene: cavitatea nazală, nazofaringele, orofaringele, laringofaringele
  const nasalCav = [[2.75, 0.05], [3.4, 0.0], [4.6, 0.12], [5.2, -0.05], [6.6, -0.35], [7.6, 1.6], [8.3, 3.7], [9.0, 4.3], [7.3, 4.3], [6.0, 4.18], [3.2, 4.18], [2.05, 4.42], [1.85, 3.2], [2.0, 2.4], [2.6, 1.0]];
  const pharynx = [[2.05, 2.75], [1.0, 2.85], [-0.2, 3.1], [-0.55, 4.2], [-0.5, 6.0], [-0.45, 8.0], [-0.38, 10.0], [-0.25, 12.0], [-0.1, 13.4], [0.35, 13.75], [0.9, 13.5], [1.15, 12.9], [1.2, 11.6], [1.25, 10.15], [0.6, 9.35], [0.2, 8.5], [0.85, 7.5], [1.0, 6.7], [0.55, 6.4], [0.75, 5.75], [1.3, 4.95], [2.0, 4.48], [2.0, 3.4]];
  const turbs = [
    [[2.55, 3.3], [4.4, 2.85], [6.6, 3.35], [6.3, 3.85], [4.2, 3.85], [2.7, 3.75]],
    [[2.7, 1.7], [4.4, 1.35], [5.9, 1.9], [5.6, 2.35], [4.1, 2.3], [2.8, 2.15]],
    [[2.85, 0.55], [3.9, 0.35], [4.8, 0.75], [4.5, 1.05], [3.6, 1.0], [2.95, 0.9]],
  ];

  /* ---------- coloana cervicală și măduva ---------- */
  const vbody = (y0, y1, x0 = -2.65, x1 = -0.95, tilt = 0) => [[x0 + tilt, y0 + 0.1], [x1 + tilt, y0], [x1 + 0.12 + tilt, y0 + (y1 - y0) * 0.5], [x1 + tilt * 1.5, y1], [x0 + tilt * 1.4, y1 + 0.08], [x0 - 0.08 + tilt * 1.2, y0 + (y1 - y0) * 0.5]];
  const atlasA = ellipse(-0.82, 5.42, 0.42, 0.55, 16);
  const dens = [[-2.2, 6.0], [-2.15, 4.9], [-1.95, 4.42], [-1.55, 4.45], [-1.25, 5.0], [-1.2, 6.0]];
  const bodies = [vbody(6.05, 7.65, -2.65, -0.98, 0), vbody(8.05, 9.45, -2.7, -1.02, 0.05), vbody(9.85, 11.25, -2.78, -1.08, 0.1), vbody(11.65, 13.05, -2.86, -1.12, 0.15), vbody(13.45, 14.85, -2.95, -1.18, 0.2)];
  const discs = [[7.65, 8.05], [9.45, 9.85], [11.25, 11.65], [13.05, 13.45], [14.85, 15.25]].map(([a, b], i) => [[-2.62 - i * 0.07, a + 0.03], [-0.98 - i * 0.04, a], [-0.95 - i * 0.04, b], [-2.66 - i * 0.07, b + 0.04]]);
  const atlasP = ellipse(-5.3, 5.25, 0.55, 0.42, 14);
  const spines = [
    [[-4.15, 6.3], [-5.6, 6.35], [-6.55, 6.9], [-6.45, 7.6], [-5.5, 7.5], [-4.15, 7.5]],
    [[-4.2, 8.3], [-5.5, 8.5], [-6.1, 9.1], [-5.4, 9.4], [-4.25, 9.25]],
    [[-4.3, 10.1], [-5.5, 10.35], [-6.15, 11.0], [-5.45, 11.25], [-4.35, 11.05]],
    [[-4.4, 11.9], [-5.65, 12.2], [-6.35, 12.9], [-5.6, 13.1], [-4.45, 12.9]],
    [[-4.5, 13.7], [-5.9, 14.05], [-6.8, 14.85], [-5.9, 15.0], [-4.6, 14.75]],
  ];
  const canal = [[-2.45, 3.95], [-2.75, 6.0], [-2.75, 9.0], [-2.95, 12.0], [-3.15, 15.7], [-4.45, 15.7], [-4.3, 12.0], [-4.15, 9.0], [-4.05, 6.0], [-5.95, 4.95]];
  const cord = [[-2.75, 4.6], [-2.95, 6.0], [-3.0, 9.0], [-3.2, 12.0], [-3.4, 15.7], [-4.2, 15.7], [-4.0, 12.0], [-3.85, 9.0], [-3.8, 6.0], [-3.8, 4.9]];

  /* ---------- creierul: fața medială a emisferei ---------- */
  const { cer, cc, septum, fornix, thal, ita, hypoth, chiasm, stalk, pitA, pitP, mamm, pineal, antCom, postCom, stem, pons, colliculi, aqueduct, v4, cbl, fast, arbor, sulci, callosal } = brainMedData();

  /* ---------- dura: cortul cerebelului și sinusurile venoase ---------- */
  const tent = [[-9.25, 0.95], [-7.2, -0.35], [-5.4, -1.55], [-4.0, -2.9]];
  const sssPts = sampleSmooth(offset(sampleSmooth(vaultOut.slice(1, 15), false, 6), -0.82), false, 1).filter((_, i) => i % 3 === 0);
  const sss = [[5.95, -1.45], ...sssPts.slice(2, -1).filter(([x, y]) => !(x < -9.0 && y > 0.3)), [-9.25, 0.95]];
  const iss = [[2.6, -6.25], [0.5, -6.25], [-1.6, -6.05], [-3.2, -5.45], [-3.95, -4.35], [-4.0, -3.2]];
  const galen = [[-1.2, -3.1], [-2.6, -2.95], [-3.55, -2.95], [-4.0, -3.15]];
  const straight = [[-4.0, -3.15], [-5.4, -1.6], [-7.3, -0.3], [-9.25, 0.95]];

  /* ---------- șanțurile feței mediale ---------- */

  /* ---------- structuri laterale proiectate ---------- */
  const eye = { c: [5.65, 0.75], r: 1.15 };
  const globe = ellipse(eye.c[0], eye.c[1], eye.r, eye.r, 28);
  const cornea = [[6.55, 0.05], [6.95, 0.4], [7.05, 0.8], [6.9, 1.25], [6.55, 1.5]];
  const lens = ellipse(6.45, 0.78, 0.18, 0.42, 14);
  const optic = [[4.5, 0.85], [3.6, 0.55], [2.7, 0.15], [2.05, -0.1]];
  const orbit = [[7.2, -0.45], [6.7, -0.75], [5.2, -0.55], [3.6, -0.05], [2.4, 0.15], [2.9, 1.0], [4.4, 1.9], [6.0, 2.3], [7.2, 2.15], [7.55, 1.0]];
  const cs = [[1.7, -0.25], [1.3, -0.62], [0.2, -0.85], [-0.9, -0.6], [-1.45, 0.25], [-1.2, 1.15], [-0.3, 1.45], [0.85, 1.35], [1.7, 0.85], [1.95, 0.25]];
  // carotida internă: cervicală → pietroasă → cavernoasă (sifonul) → supraclinoidiană → bifurcația
  const icaPre = [[0.55, 15.7], [0.5, 13.5], [0.42, 11.4], [0.25, 9.2], [0.0, 7.0], [-0.4, 5.2], [-0.65, 3.6], [-0.55, 2.5], [-0.85, 1.75], [-0.95, 1.1], [-0.55, 0.62]];
  const icaCav = [[-0.55, 0.62], [0.3, 0.7], [1.05, 0.55], [1.4, 0.05], [1.1, -0.42]];
  const icaPost = [[1.1, -0.42], [0.55, -0.72], [0.5, -1.1], [0.85, -1.35]];
  const aca = [[0.85, -1.35], [1.75, -1.75], [2.55, -2.05], [3.85, -2.4], [4.4, -3.25], [4.3, -4.25], [3.6, -5.05], [2.4, -5.62], [0.6, -5.9], [-1.4, -5.85], [-3.0, -5.45], [-3.8, -4.95]];
  const acaBr = [[[4.35, -3.6], [5.15, -4.0], [5.45, -5.0]], [[3.6, -5.05], [3.95, -6.1], [3.4, -7.0]], [[1.6, -5.8], [1.75, -6.9], [1.4, -7.85]], [[-0.4, -5.9], [-0.55, -7.0], [-0.8, -8.1]], [[-2.2, -5.7], [-2.95, -6.65], [-3.2, -7.7]], [[2.7, -2.15], [3.4, -1.5], [4.4, -1.1]]];
  // venele: supratrohleară → unghiulară → oftalmică superioară → sinusul cavernos; vena facială → jugulara internă
  const supraTr = [[7.6, -4.6], [7.85, -3.0], [7.75, -1.6], [7.45, -0.55]];
  const angular = [[7.45, -0.55], [7.25, 0.15], [7.0, 0.25]];
  const ophth = [[7.0, 0.25], [6.4, -0.3], [5.3, -0.42], [3.9, -0.15], [2.6, 0.0], [1.75, 0.15]];
  const facial = [[7.45, -0.55], [7.95, 0.6], [8.3, 2.6], [8.1, 4.6], [7.6, 6.6], [6.7, 8.6], [5.2, 10.1], [3.2, 10.75], [1.4, 10.85], [-0.45, 10.75]];
  const ijv = [[-1.55, 3.95], [-1.35, 5.2], [-1.05, 7.0], [-0.72, 9.0], [-0.45, 10.6], [-0.3, 12.6], [-0.2, 15.7]];
  // venele scalpului și vena emisară parietală spre sinusul sagital superior
  const scalpF = sampleSmooth(offset(sampleSmooth([[7.95, -4.6], [7.2, -6.0], [5.9, -7.7], [4.1, -9.0], [2.0, -9.75]], false, 6), -0.24), false, 1).filter((_, i) => i % 3 === 0);
  const scalpP = sampleSmooth(offset(sampleSmooth([[-0.4, -10.1], [-2.5, -9.85], [-4.4, -9.1], [-6.4, -7.7]], false, 6), -0.24), false, 1).filter((_, i) => i % 3 === 0);
  const emiss = [[-2.6, -9.75], [-2.55, -9.3], [-2.48, -8.95]];
  const occEm = [[-10.9, 1.2], [-10.35, 1.1], [-9.85, 1.0]];

  /* ---------- glandele sudoripare ale scalpului și frunții, cu porii ---------- */
  const glandAt = [0.08, 0.17, 0.27, 0.37, 0.47, 0.57, 0.66];
  const scalpSurf = sampleSmooth(skin.slice(18, 29), false, 10);
  const glands = glandAt.map((t) => {
    const a = along(scalpSurf, t), n = [-a.dir[1], a.dir[0]];   // normala spre exterior
    const p = a.p, inn = [p[0] - n[0] * 0.36, p[1] - n[1] * 0.36];
    const coil = lumpy(inn[0], inn[1], 0.12, 7, 0.25, Math.round(t * 100));
    return { pore: p, n, coil, duct: [inn, [p[0] - n[0] * 0.2 + a.dir[0] * 0.04, p[1] - n[1] * 0.2 + a.dir[1] * 0.04], p] };
  });

  /* ---------- asamblare ---------- */
  const veinsCool = vessels([
    { pts: C(supraTr), w: 1.9, k: "v", cls: "cool" }, { pts: C(angular), w: 2, k: "v", cls: "cool" },
    { pts: C(ophth), w: 2.4, k: "v", cls: "cool proj" }, { pts: C(facial), w: 2.4, k: "v", cls: "cool proj" },
    { pts: C(scalpF), w: 1.6, k: "v", cls: "cool" }, { pts: C(scalpP), w: 1.6, k: "v", cls: "cool" },
    { pts: C(emiss), w: 1.5, k: "v", cls: "cool" }, { pts: C(occEm), w: 1.5, k: "v", cls: "cool" },
  ]);
  const sinuses = vessels([
    { pts: C(sss), w: 4.6, k: "v", cls: "sinus" }, { pts: C(iss), w: 2, k: "v", cls: "sinus" },
    { pts: C(galen), w: 2.6, k: "v", cls: "sinus" }, { pts: C(straight), w: 3.2, k: "v", cls: "sinus" },
  ]);
  const ijvSvg = vessels([{ pts: C(ijv), w: 4.4, k: "v", cls: "proj" }]);
  const icaPreSvg = vessels([{ pts: C(icaPre), w: 3.8, k: "a", cls: "proj warm" }]);
  const icaCavSvg = vessels([{ pts: C(icaCav), w: 3.6, k: "a", cls: "proj cav" }]);
  const icaPostSvg = vessels([{ pts: C(icaPost), w: 3.4, k: "a", cls: "proj cooled" }, { pts: C(aca), w: 2, k: "a", cls: "cooled aca" }, ...acaBr.map((p) => ({ pts: C(p), w: 1.1, k: "a", cls: "cooled aca" }))]);
  // săgețile conducției: din peretele carotidei spre sângele venos din jur
  const condAt = [[0.1, 0.7, 0, -1], [0.75, 0.66, 0, 1], [1.35, 0.15, 1, 0], [-0.3, 0.6, -0.6, 0.8]].map(([x, y, dx, dy]) => { const l = Math.hypot(dx, dy); return [x, y, dx / l, dy / l]; });
  const cond = condAt.map(([x, y, dx, dy]) => {
    const a = c([x + dx * 0.16, y + dy * 0.16]), b = c([x + dx * 0.6, y + dy * 0.6]), u = [dx, dy], q = [-dy, dx], h = 2.6;
    const l = [b[0] - u[0] * h + q[0] * h * 0.7, b[1] - u[1] * h + q[1] * h * 0.7], r = [b[0] - u[0] * h - q[0] * h * 0.7, b[1] - u[1] * h - q[1] * h * 0.7];
    const f = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
    return `M${f(a)}L${f(b)}M${f(l)}L${f(b)}L${f(r)}`;
  });

  const L = {
    soft: `<path class="hx2-soft" d="${skinD}"/><path class="an-vols" d="${skinD}"/><path class="hx2-derm" d="${smooth(offset(sampleSmooth(C(skin), false, 6), -2.4))}"/>`,
    scalp: `<g class="hx2-glands">${glands.map((g) => `<path class="hx2-duct" d="${smooth(C(g.duct))}"/><path class="hx2-coil" d="${smooth(C(g.coil), true)}"/>`).join("")}</g>`,
    bone: `<path class="hx2-bone" d="${poly(C(vaultRing), true)}"/><path class="hx2-diploe" d="${smooth(C(vMid))}"/>${diploicVeins(vOut, vIn)}`
      + organ(sm(sphenoid, true), "hx2-bone") + `<path class="hx2-air" d="${sm(sphSinus, true)}"/>`
      + `<path class="hx2-air" d="${sm(frontSinus, true)}"/>`
      + organ(sm(nasalBone, true), "hx2-bone") + organ(sm(noseCart, true), "hx2-cart")
      + organ(sm(maxilla, true), "hx2-bone") + organ(sm(mand, true), "hx2-bone") + `<path class="hx2-spong" d="${sm(mandIn, true)}"/>`
      + organ(sm(incU, true), "hx2-tooth") + organ(sm(incL, true), "hx2-tooth"),
    airway: `<path class="hx2-air" d="${sm(nasalCav, true)}"/>${turbs.map((t) => organ(sm(t, true), "hx2-turb")).join("")}<path class="hx2-air" d="${sm(pharynx, true)}"/>`,
    mouth: `<path class="hx2-esoph" d="${sm(esoph, true)}"/>` + organ(sm(lipU, true), "hx2-lip") + organ(sm(lipL, true), "hx2-lip") + organ(sm(tongue, true), "hx2-tongue")
      + `<g clip-path="url(#__U__-tg)">${[[6.6, 6.5], [5.2, 5.9], [3.8, 5.8], [2.5, 6.2], [1.5, 7.2], [1.2, 8.6], [1.9, 9.9]].map((e) => `<path class="hx2-tfib" d="${sm([[6.0, 10.05], [(6.0 + e[0]) / 2 + 0.3, (10.05 + e[1]) / 2], e])}"/>`).join("")}</g>` + organ(sm(softPal, true), "hx2-palate") + organ(sm(epiglot, true), "hx2-cart") + organ(sm(hyoid, true), "hx2-bone")
      + organ(sm(thyroid, true), "hx2-cart") + organ(sm(cricoid, true), "hx2-cart") + `<path class="hx2-air" d="${sm(trachea, true)}"/><path class="hx2-vf" d="${sm(vocal, true)}"/>`,
    spine: `<path class="hx2-canal" d="${sm(canal, true)}"/>` + [atlasA, dens, ...bodies, atlasP, ...spines].map((p) => organ(sm(p, true, 0.8), "hx2-vert")).join("")
      + discs.map((d) => `<path class="hx2-disc" d="${sm(d, true, 0.6)}"/>`).join("") + organ(sm(cord, true), "hx2-cord"),
    brain: organ(sm(cer, true), "hx2-cer"),
    sulci: sulci.map((p, i) => `<path class="hx2-sulc" d="${sm(p)}" style="stroke-width:${i < 5 ? 1.5 : 1}px"/><path class="hx2-crest" d="${smooth(offset(sampleSmooth(C(p), false, 4), -1.4))}"/>`).join("") + `<path class="hx2-callo" d="${smooth(C(callosal))}"/>`,
    septum: `<path class="hx2-vent" d="${sm(septum, true)}"/><path class="hx2-sept" d="${sm(septum, true)}"/>`,
    cc: organ(sm(cc, true), "hx2-cc") + `<path class="hx2-forn" d="${sm(fornix)}"/>` + organ(sm(antCom, true), "hx2-cc") + organ(sm(postCom, true), "hx2-cc"),
    thal: organ(sm(thal, true), "hx2-thal") + `<path class="hx2-ita" d="${sm(ita, true)}"/>` + organ(sm(pineal, true), "hx2-pin"),
    hypo: `<path class="hx2-hypo" d="${sm(hypoth, true)}"/>`,
    sella: organ(sm(stalk, true), "hx2-pit") + organ(sm(pitA, true), "hx2-pit a") + organ(sm(pitP, true), "hx2-pit p") + organ(sm(mamm, true), "hx2-thal") + organ(sm(chiasm, true), "hx2-nerve"),
    stem: organ(sm(stem, true), "hx2-stem") + organ(sm(pons, true), "hx2-pons") + `<path class="hx2-coll" d="${sm(colliculi)}"/><path class="hx2-aq" d="${sm(aqueduct)}"/><path class="hx2-v4" d="${sm(v4, true)}"/>`,
    cbl: organ(sm(cbl, true), "hx2-cbl") + arbor.map((p, i) => `<path class="hx2-arbor" d="${sm(p)}" style="stroke-width:${i ? 1.4 : 2.4}px"/>`).join("") + folia(cbl, fast),
    dura: `<path class="hx2-tent" d="${sm(tent)}"/>`,
    sinuses,
    orbit: `<path class="hx2-orbit" d="${sm(orbit, true)}"/><path class="hx2-optic" d="${sm(optic)}"/>` + organ(sm(globe, true), "hx2-globe") + `<path class="hx2-cornea" d="${sm(cornea)}"/><path class="hx2-iris" d="${smooth(C([[6.72, 0.3], [6.82, 0.78], [6.72, 1.26]]))}"/><path class="hx2-lens" d="${sm(lens, true)}"/>`,
    cs: `<path class="hx2-cs" d="${sm(cs, true)}"/>`,
    icaPre: icaPreSvg, icaCav: icaCavSvg, icaPost: icaPostSvg, ijv: ijvSvg,
    veins: veinsCool,
    cuts: [cutEnd(c([0.55, 15.55]), [0, 1], 3.8, "a"), cutEnd(c([-0.2, 15.55]), [0, 1], 4.4, "v")].join(""),
  };
  return {
    W, H, L, defs: extraDefs(cbl) + `<clipPath id="__U__-tg"><path d="${sm(tongue, true)}"/></clipPath>`,
    skinD, brainD: sm(cer, true), hypoD: sm(hypoth, true),
    hypo: { cx: +c([0.55, -1.0])[0].toFixed(1), cy: +c([0.55, -1.0])[1].toFixed(1), r: 13 },
    pores: glands.map((g) => ({ at: c(g.pore).map((v) => +v.toFixed(1)), n: g.n.map((v) => +v.toFixed(2)) })),
    edDots: [[-6.5, -5.0], [-3.5, -7.4], [0.0, -7.4], [3.6, -6.0], [-7.7, -2.6], [4.9, -2.4], [-1.5, -6.6], [2.2, -6.8], [-5.0, -3.7], [-8.4, -1.0], [5.4, -4.4], [-2.4, -7.9]].map((p) => c(p).map((v) => +v.toFixed(1))),
    flow: {
      face: smooth(C([...supraTr.slice(0, -1), ...angular, ...ophth.slice(1)])), scalp: smooth(C([...scalpP.slice(0, 4), ...emiss.slice(1)])),
      endo: smooth(C(sss)), artPre: smooth(C(icaPre)), artPost: smooth(C([...icaCav.slice(1), ...icaPost.slice(1), ...aca.slice(1)])), facial: smooth(C(facial)),
    },
    cond,
    waves: glands.slice(0, 6).map((g) => { const p = c(g.pore), pts = []; for (let k = 0; k <= 8; k++) pts.push([p[0] + g.n[0] * (4 + k * 2.8) + Math.sin(k * 1.1) * 1.8 * g.n[1], p[1] + g.n[1] * (4 + k * 2.8) - Math.sin(k * 1.1) * 1.8 * g.n[0]]); return smooth(pts); }),
    hits: {
      sweat: glands.map((g) => ({ cx: +c(g.pore)[0].toFixed(1), cy: +c(g.pore)[1].toFixed(1), r: 9 })),
      evap: { x: c([3.6, -11.6])[0], y: c([3.6, -11.6])[1], w: 7.2 * K, h: 2.0 * K },
      vein: [{ x: c([6.9, -4.8])[0], y: c([6.9, -4.8])[1], w: 1.4 * K, h: 4.4 * K }, { x: c([1.9, -0.9])[0], y: c([1.9, -0.9])[1], w: 5.4 * K, h: 1.4 * K }],
      endo: [{ x: c([-6.0, -9.4])[0], y: c([-6.0, -9.4])[1], w: 7.0 * K, h: 2.4 * K }, { x: c([-9.9, -1.0])[0], y: c([-9.9, -1.0])[1], w: 1.6 * K, h: 2.6 * K }],
      cs: { x: c([-1.5, -0.95])[0], y: c([-1.5, -0.95])[1], w: 3.5 * K, h: 2.5 * K },
      cond: { x: c([-0.6, 0.0])[0], y: c([-0.6, 0.0])[1], w: 2.4 * K, h: 1.4 * K },
      art: { x: c([-1.1, 4.0])[0], y: c([-1.1, 4.0])[1], w: 2.0 * K, h: 9 * K },
      brain: { x: c([-6.5, -8.2])[0], y: c([-6.5, -8.2])[1], w: 11 * K, h: 2.6 * K },
      hypo: { cx: +c([0.55, -1.0])[0].toFixed(1), cy: +c([0.55, -1.0])[1].toFixed(1), r: 14 },
      edema: { x: c([-8.6, -5.4])[0], y: c([-8.6, -5.4])[1], w: 3.2 * K, h: 4.2 * K },
    },
    badges: {
      sweat: c([5.6, -9.9]), evap: c([8.8, -6.2]), vein: c([8.75, -2.7]), endo: c([-8.55, -5.8]), cs: c([-2.0, 0.95]), cond: c([2.6, 1.55]),
      art: c([1.5, 12.2]), brain: c([-1.0, -7.3]), hypo: c([2.35, -1.05]), edema: c([-7.6, -4.4]),
    },
  };
}

/* venele diploice: canale ondulate între cele două tăblii, care se termină pe tăblia internă */
function diploicVeins(vOut, vIn) {
  const out = [];
  [[0.12, 0.2], [0.42, 0.52], [0.62, 0.72]].forEach(([a, b], i) => {
    const pts = [];
    for (let k = 0; k <= 10; k++) {
      const t = a + (b - a) * k / 10, i0 = Math.round(t * (vOut.length - 1));
      const o = vOut[i0], n = vIn[i0], f = 0.5 + Math.sin(k * 1.3 + i) * 0.16;
      pts.push([o[0] + (n[0] - o[0]) * f, o[1] + (n[1] - o[1]) * f]);
    }
    const e = vIn[Math.round(b * (vOut.length - 1))];
    pts.push(e);
    out.push({ pts: C(pts), w: 1.1, k: "v", cls: "dipl" });
  });
  return vessels(out);
}

/* foliile cerebelului: arcuri concentrice în jurul fastigiului, decupate pe contur */
function folia(cbl, f) {
  let s = "";
  for (let r = 1.1; r < 5.6; r += 0.48) {
    const pts = [];
    for (let a = -1.5; a <= 1.75; a += 0.12) pts.push([f[0] - Math.cos(a) * r * 1.05, f[1] - Math.sin(a) * r * 0.62]);
    s += `<path class="hx2-fol" d="${sm(pts)}"/>`;
  }
  return `<g clip-path="url(#__U__-cb)">${s}</g>`;
}
export const extraDefs = (cbl) => `<clipPath id="__U__-cb"><path d="${sm(cbl, true)}"/></clipPath>`;

export function preview() {
  const A = build();
  const L = A.L;
  const s = (x) => x.replaceAll("__U__", "pv");
  return { viewBox: `0 0 ${W} ${H}`, svg: s(`${L.soft}${L.scalp}${L.bone}${L.airway}${L.mouth}${L.spine}${L.brain}<g clip-path="url(#pv-b)">${L.sulci}${L.septum}</g>${L.cc}${L.thal}${L.hypo}${L.sella}${L.stem}${L.cbl}${L.dura}${L.sinuses}${L.orbit}${L.ijv}${L.cs}${L.icaPre}${L.icaCav}${L.icaPost}${L.veins}${L.cuts}`) + `<defs>${s(A.defs)}<clipPath id="pv-b"><path d="${A.brainD}"/></clipPath></defs>` };
}
