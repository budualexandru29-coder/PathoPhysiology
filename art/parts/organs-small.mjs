// Piese mici pentru dale: plămânii (vedere anterioară), ochiul din față cu o lanternă medicală, o celulă cu organite.
import { smooth, ellipse, lumpy, rng, sampleSmooth, offset, ribbon, poly } from "../lib/geo.mjs";
import { organ } from "../lib/an.mjs";

const T = (o, s) => (pts) => pts.map(([x, y]) => [o[0] + x * s, o[1] + y * s]);

/** Plămânii văzuți din față: traheea cu inelele cartilaginoase, bronhiile principale (dreapta mai verticală și mai
 * largă), plămânul drept cu trei lobi (scizurile orizontală și oblică), cel stâng cu doi lobi, incizura cardiacă și lingula. */
export function lungs({ origin = [0, 0], s = 1 } = {}) {
  const t = T(origin, s);
  const R = t([[50, 9], [40, 19], [27, 46], [16.5, 78], [12, 103], [27, 111.5], [46, 109], [60.5, 100], [64.5, 74], [63, 47], [58.5, 22]]);
  const Lh = t([[100, 9], [110, 19], [123, 46], [133.5, 78], [138, 103], [124, 111.5], [107, 110], [99, 103.5], [94, 95], [86.5, 84.5], [89.5, 69], [87.5, 45], [91.5, 22]]);
  const trachea = t([[70.5, -2], [79.5, -2], [79.8, 33], [70.2, 33]]);
  const rings = []; for (let y = 1.5; y < 32; y += 3.6) rings.push(`<path class="lg-ring" d="${smooth(t([[70.6, y], [75, y + 1.1], [79.4, y]]))}"/>`);
  const bronchi = [
    [[75, 32], [68, 38], [60.5, 46], [53, 55]], [[75, 32], [84, 37], [93, 42], [101, 47]],
    [[60.5, 46], [50, 40], [40, 32]], [[56, 51], [44, 62], [32, 70]], [[53, 55], [48, 74], [40, 92]], [[53, 55], [58, 80], [54, 100]],
    [[93, 42], [104, 34], [112, 27]], [[97, 45], [110, 58], [122, 66]], [[101, 47], [106, 72], [112, 94]], [[101, 47], [98, 76], [101, 98]],
  ].map((p, i) => i < 2 ? "" : `<path class="lg-br" d="${smooth(t(p))}" style="stroke-width:${2 * s}px"/>`).join("");
  // bronhiile principale: tuburi cartilaginoase ca traheea (dreapta mai scurtă, mai largă și mai verticală)
  const mainB = [[[75, 31], [68, 37.5], [60.5, 46], [55, 52]], [[75, 31], [84, 36.5], [93, 42], [99, 46]]].map((p, i) => poly(ribbon(sampleSmooth(t(p), false, 6), () => (i ? 3.6 : 4.4) * s, { caps: false }), true));
  const fiss = [
    [[64, 66], [46, 63.5], [28, 62], [17, 63.5]], [[60, 33], [44, 52], [34, 80], [29, 110]],
    [[90, 33], [106, 54], [118, 80], [124, 110]],
  ].map((p) => `<path class="lg-fis" d="${smooth(t(p))}"/>`).join("");
  const svg = `<g class="lung lR">${organ(smooth(R, true), "lg-lobe")}</g><g class="lung lL">${organ(smooth(Lh, true), "lg-lobe")}</g>`
    + `<g clip-path="url(#__U__-lg)">${fiss}${bronchi}</g>`
    + mainB.map((d) => organ(d, "lg-tr")).join("") + organ(poly(trachea, true), "lg-tr") + rings.join("");
  return { svg, defs: `<clipPath id="__U__-lg"><path d="${smooth(R, true)}${smooth(Lh, true)}"/><path d="${poly(t([[60, 28], [90, 28], [104, 50], [46, 58]]), true)}"/></clipPath>`, box: { x: origin[0] + 10 * s, y: origin[1], w: 130 * s, h: 114 * s } };
}

/** Ochiul văzut din față: pleoapele, sclera cu caruncula, irisul cu stroma radială și colereta, pupila, genele, sprânceana. */
export function eyeFront({ c = [0, 0], s = 1 } = {}) {
  const t = T(c, s);
  const fis = t([[-52, 3], [-36, -14], [-14, -23.5], [10, -23], [32, -15], [50, -3], [34, 12.5], [10, 19.5], [-14, 19], [-36, 12]]);
  const lidU = t([[-62, 0], [-40, -26], [-10, -37], [22, -35], [48, -22], [62, -6], [50, -3], [32, -15], [10, -23], [-14, -23.5], [-36, -14], [-52, 3]]);
  const crease = t([[-44, -22], [-14, -33], [18, -31.5], [44, -19]]);
  const brow = []; const R = rng(3);
  for (let i = 0; i < 26; i++) { const f = i / 25, x = -54 + f * 108, y = -52 + Math.sin(f * Math.PI) * -6 + (f > 0.7 ? (f - 0.7) * 16 : 0); brow.push(`<path class="ey-brow" d="${smooth(t([[x, y + 4], [x + 3 + R() * 2, y], [x + 7 + R() * 2, y - 2.5 + R()]]))}"/>`); }
  const lashes = []; for (let i = 0; i < 17; i++) { const f = 0.08 + i / 19, x = -48 + f * 98, y = -18 - Math.sin(f * Math.PI) * 6.5; lashes.push(`<path class="ey-lash" d="${smooth(t([[x, y], [x - 2 + f * 4, y - 6], [x - 4 + f * 9, y - 9.5]]))}"/>`); }
  const iris = { c: t([[0, -2]])[0], r: 20 * s };
  let stroma = "";
  for (let i = 0; i < 40; i++) { const a = i / 40 * Math.PI * 2; stroma += `M${(iris.c[0] + Math.cos(a) * 9 * s).toFixed(1)} ${(iris.c[1] + Math.sin(a) * 9 * s).toFixed(1)}L${(iris.c[0] + Math.cos(a + 0.05) * 19 * s).toFixed(1)} ${(iris.c[1] + Math.sin(a + 0.05) * 19 * s).toFixed(1)}`; }
  const coll = smooth(ellipse(iris.c[0], iris.c[1], 11.5 * s, 11.5 * s, 18).map((p, i) => { const k = 1 + (i % 2 ? 0.06 : -0.04); return [iris.c[0] + (p[0] - iris.c[0]) * k, iris.c[1] + (p[1] - iris.c[1]) * k]; }), true);
  const carun = smooth(t([[-52, 3], [-46, -4], [-42, 1], [-45, 7]]), true);
  const skin = smooth(t([[-78, 10], [-70, -38], [-36, -62], [10, -66], [52, -54], [78, -26], [80, 14], [52, 36], [10, 44], [-36, 38]]), true);
  const svg = `<g class="ey-g">${organ(skin, "ey-skin")}${brow.join("")}<path class="ey-sclera" d="${smooth(fis, true)}"/><path class="ey-carun" d="${carun}"/>`
    + `<g clip-path="url(#__U__-ef)"><circle class="ey-iris" cx="${iris.c[0].toFixed(1)}" cy="${iris.c[1].toFixed(1)}" r="${iris.r.toFixed(1)}"/><path class="ey-str" d="${stroma}"/><path class="ey-coll" d="${coll}"/><circle class="ey-limb" cx="${iris.c[0].toFixed(1)}" cy="${iris.c[1].toFixed(1)}" r="${iris.r.toFixed(1)}"/>__PUPIL__<ellipse class="ey-lidsh" cx="${t([[0, -22]])[0][0].toFixed(1)}" cy="${t([[0, -22]])[0][1].toFixed(1)}" rx="${(54 * s).toFixed(1)}" ry="${(9 * s).toFixed(1)}"/></g>`
    + `<path class="ey-fis" d="${smooth(fis, true)}"/>${organ(smooth(lidU, true), "ey-lid")}<path class="ey-crease" d="${smooth(crease)}"/>${lashes.join("")}<path class="ey-lidlo" d="${smooth(t([[-36, 12], [-14, 19], [10, 19.5], [34, 12.5]]))}"/></g>`;
  return { svg, defs: `<clipPath id="__U__-ef"><path d="${smooth(fis, true)}"/></clipPath>`, iris, glint: t([[7, -9]])[0] };
}

/** Lanterna medicală (stilou-lanternă) cu corpul moletat, clema și capul cu LED; fasciculul pleacă spre `to`. */
export function penlight({ at = [0, 0], s = 1, to }) {
  const t = T(at, s);
  const body = t([[-44, -4.6], [8, -4.6], [8, 4.6], [-44, 4.6]]);
  const head = t([[8, -5.6], [20, -5.6], [22, -4], [22, 4], [20, 5.6], [8, 5.6]]);
  const cap = t([[-50, -4.2], [-44, -4.6], [-44, 4.6], [-50, 4.2]]);
  const clip = t([[-36, -4.6], [-36, -8], [-6, -8], [-4, -6], [-4, -4.6]]);
  let knurl = ""; for (let x = -40; x < -14; x += 2) knurl += `M${t([[x, -4.6]])[0].map((v) => v.toFixed(1)).join(" ")}L${t([[x + 1.4, 4.6]])[0].map((v) => v.toFixed(1)).join(" ")}`;
  const lens = t([[22, 0]])[0];
  const beam = to ? `M${(lens[0]).toFixed(1)} ${(lens[1] - 3.6 * s).toFixed(1)}L${(to[0]).toFixed(1)} ${(to[1] - 13 * s).toFixed(1)}L${(to[0]).toFixed(1)} ${(to[1] + 13 * s).toFixed(1)}L${(lens[0]).toFixed(1)} ${(lens[1] + 3.6 * s).toFixed(1)}Z` : "";
  const svg = organ(poly(cap, true), "pl-cap") + organ(poly(body, true), "pl-body") + `<path class="pl-knurl" d="${knurl}"/>` + organ(poly(head, true), "pl-head") + `<rect class="pl-lens" x="${(lens[0] - 1.6 * s).toFixed(1)}" y="${(lens[1] - 3.6 * s).toFixed(1)}" width="${(1.6 * s).toFixed(1)}" height="${(7.2 * s).toFixed(1)}" rx=".6"/>` + `<path class="pl-clip" d="${poly(clip)}"/>`;
  return { svg, beam, lens, box: { x: at[0] - 52 * s, y: at[1] - 10 * s, w: 76 * s, h: 20 * s } };
}

/** Celulă: membrana plasmatică (dublu strat), nucleul cu înveliș și nucleol, mitocondrii cu creste, reticul endoplasmatic
 * rugos cu ribozomi, aparatul Golgi și lizozomi. */
export function cell({ c = [0, 0], r = 44, seed = 5 } = {}) {
  const R = rng(seed);
  const out = lumpy(c[0], c[1], r, 14, 0.06, seed);
  const inn = offset(sampleSmooth(out, true, 4), 1.6, true);
  const nuc = { c: [c[0] - r * 0.12, c[1] + r * 0.02], r: r * 0.33 };
  const mito = [[0.42, -0.42, 0.5], [0.5, 0.3, -0.4], [-0.48, 0.45, 0.9], [-0.55, -0.3, -0.7]].map(([fx, fy, a]) => {
    const mc = [c[0] + fx * r, c[1] + fy * r], o = ellipse(mc[0], mc[1], r * 0.17, r * 0.08, 16, a);
    let cr = ""; for (let k = -2; k <= 2; k++) { const cx = mc[0] + Math.cos(a) * k * r * 0.055, cy = mc[1] + Math.sin(a) * k * r * 0.055; cr += `M${(cx - Math.sin(a) * r * 0.06).toFixed(1)} ${(cy + Math.cos(a) * r * 0.06).toFixed(1)}L${(cx + Math.sin(a) * r * 0.035).toFixed(1)} ${(cy - Math.cos(a) * r * 0.035).toFixed(1)}`; }
    return `<path class="ce-mito" d="${smooth(o, true)}"/><path class="ce-crist" d="${cr}"/>`;
  }).join("");
  const er = [0, 1, 2].map((k) => { const rr = nuc.r + 5 + k * 4.2; const pts = []; for (let a = 0.6; a < 2.5; a += 0.15) pts.push([nuc.c[0] + Math.cos(a) * rr, nuc.c[1] + Math.sin(a) * rr * 0.9]); return pts; });
  const ribo = er.flatMap((p) => p.filter((_, i) => i % 2 === 0)).map(([x, y]) => `<circle class="ce-ribo" cx="${(x + (R() - 0.5) * 1.6).toFixed(1)}" cy="${(y + (R() - 0.5) * 1.6).toFixed(1)}" r=".75"/>`).join("");
  const golgi = [0, 1, 2, 3].map((k) => { const gc = [c[0] + r * 0.05, c[1] - r * 0.55]; const w = r * (0.32 - k * 0.04); return `<path class="ce-golgi" d="${smooth([[gc[0] - w, gc[1] + k * 3.2 + 2], [gc[0], gc[1] + k * 3.2 - 1.2], [gc[0] + w, gc[1] + k * 3.2 + 2]])}"/>`; }).join("");
  const lyso = [[0.25, 0.62], [-0.15, -0.62], [0.62, -0.05]].map(([fx, fy]) => `<circle class="ce-lyso" cx="${(c[0] + fx * r).toFixed(1)}" cy="${(c[1] + fy * r).toFixed(1)}" r="${(r * 0.06).toFixed(1)}"/>`).join("");
  const svg = `<g class="ce-g">${organ(smooth(out, true), "ce-cyto")}<path class="ce-mem" d="${smooth(out, true)}"/><path class="ce-mem i" d="${smooth(inn, true)}"/>`
    + er.map((p) => `<path class="ce-er" d="${smooth(p)}"/>`).join("") + ribo + golgi + mito + lyso
    + organ(smooth(ellipse(nuc.c[0], nuc.c[1], nuc.r, nuc.r * 0.92, 20), true), "ce-nuc") + `<path class="ce-env" d="${smooth(ellipse(nuc.c[0], nuc.c[1], nuc.r - 1.6, nuc.r * 0.92 - 1.6, 20), true)}"/>`
    + `<circle class="ce-nucl" cx="${(nuc.c[0] + nuc.r * 0.25).toFixed(1)}" cy="${(nuc.c[1] - nuc.r * 0.15).toFixed(1)}" r="${(nuc.r * 0.28).toFixed(1)}"/></g>`;
  return { svg, out, nuc };
}
