// Bloc de piele cu păr (antebraț) în secțiune, văzut izometric: epiderm, derm papilar și reticular, hipoderm.
// Fața din față arată microcirculația cutanată (plexul profund și cel subpapilar, arteriolele „în candelabru”,
// ansele capilare din papile), două glande sudoripare ecrine și un folicul pilos cu glanda sebacee și mușchiul
// erector al firului de păr. Fața laterală arată vasele plexurilor tăiate transversal. Fața de sus are pori și fire de păr.
// Grosimile straturilor sunt schematice (epidermul e îngroșat ca să se vadă); nu e la scară.
import { iso } from "../../tools/anima/kit/iso-kit.mjs";
import { smooth, poly, rng, lumpy, sampleSmooth, ribbon, r1 } from "../lib/geo.mjs";
import { vessels } from "../lib/an.mjs";

export const W = 128, D = 56, H = 128;           // lățimea feței din față, adâncimea, înălțimea (unități de lume)
const Z_PAP = 21, Z_DERM = 82;                     // limita derm papilar / reticular, derm / hipoderm (adâncimi w)

/** Profilul joncțiunii dermo-epidermice: papilele dermice urcă îngust, crestele epidermice sunt late. */
export function prof(x) {
  const per = 12.5, ph = ((x + 3) % per + per) % per / per;     // 0..1 în perioadă
  const bump = Math.pow(Math.max(0, Math.cos((ph - 0.5) * Math.PI * 2)), 2.2);
  return 11.5 - 4.6 * bump + 0.5 * Math.sin(x * 0.21);
}
/** Centrele papilelor de pe fața din față (pentru ansele capilare). */
export function papillae() {
  const out = [];
  for (let x = 0; x <= W; x += 0.25) {
    const a = prof(x - 0.25), b = prof(x), c = prof(x + 0.25);
    if (b < a && b <= c && b < 8.5 && x > 3 && x < W - 3) out.push(x);
  }
  return out;
}

export function skinBlock({ origin, scale, uid = "__U__", az = 72, el = 30 }) {
  const PR = { origin, scale, azimuth: az, elevation: el };
  const S = (x, y, z) => iso([x, y, z], PR);
  const o = S(0, 0, 0);
  const ex = sub2(S(1, 0, 0), o), ey = sub2(S(0, 1, 0), o), ez = sub2(S(0, 0, 1), o);
  // fața din față: (u, w) -> lume (u, D, -w); laterală: (s, w) -> (W, D - s, -w); sus: (u, t) -> (u, D - t, 0)
  const MF = [ex[0], ex[1], -ez[0], -ez[1], ...S(0, D, 0)];
  const MS = [-ey[0], -ey[1], -ez[0], -ez[1], ...S(W, D, 0)];
  const MT = [ex[0], ex[1], -ey[0], -ey[1], ...S(0, D, 0)];
  const mat = (m) => `matrix(${m.map((v) => +v.toFixed(4)).join(" ")})`;
  const F = (u, w) => [MF[0] * u + MF[2] * w + MF[4], MF[1] * u + MF[3] * w + MF[5]];
  const Sd = (s, w) => [MS[0] * s + MS[2] * w + MS[4], MS[1] * s + MS[3] * w + MS[5]];
  const T = (u, t) => [MT[0] * u + MT[2] * t + MT[4], MT[1] * u + MT[3] * t + MT[5]];
  // vasele se desenează în spațiul ecranului (grosimi în px), deci le proiectăm punctele
  const fp = (pts) => pts.map(([u, w]) => F(u, w));

  /* ---------- straturile (în coordonatele fiecărei fețe) ---------- */
  const xs = []; for (let x = 0; x <= W; x += 1) xs.push(x);
  const ss = []; for (let s = 0; s <= D; s += 1) ss.push(s);
  const profF = xs.map((x) => [x, prof(x)]);
  const profS = ss.map((s) => [s, prof(W + s)]);
  const facesLayers = (pr, x1) => ({
    corneum: poly([[0, 0], [x1, 0], [x1, 1.6], [0, 1.6]], true),
    epi: `M0 0L${x1} 0L${x1} ${r1(pr[pr.length - 1][1])}` + smooth(pr.slice().reverse(), false).replace(/^M[^C]+/, "") + "Z",
    pap: smooth(pr, false) + `L${x1} ${Z_PAP}L0 ${Z_PAP}Z`,
    ret: poly([[0, Z_PAP], [x1, Z_PAP], [x1, Z_DERM], [0, Z_DERM]], true),
    hyp: poly([[0, Z_DERM], [x1, Z_DERM], [x1, H], [0, H]], true),
  });
  const LF = facesLayers(profF, W), LS = facesLayers(profS, D);

  /* celulele bazale: un șir de puncte mici chiar deasupra joncțiunii */
  const basal = (pr) => sampleSmooth(pr, false, 3).filter((_, i) => i % 2 === 0).map(([x, w]) => `<circle class="sb-basal" cx="${r1(x)}" cy="${r1(w - 0.9)}" r=".55"/>`).join("");

  /* colagenul dermului reticular: fâșii ondulate care traversează toată fața (se termină pe muchii) */
  const collagen = (x1, seed) => {
    const R = rng(seed); let s = "";
    for (let w = Z_PAP + 4; w < Z_DERM - 2; w += 4.2 + R() * 1.5) {
      const pts = []; const ph = R() * 6;
      for (let x = -6; x <= x1 + 6; x += 6) pts.push([x, w + Math.sin(x * 0.18 + ph) * 1.3]);
      s += `<path class="sb-coll" d="${smooth(pts)}"/>`;
    }
    return s;
  };

  /* lobulii de grăsime ai hipodermului, separați de septuri */
  const fat = (x1, seed) => {
    const R = rng(seed); let s = ""; const pts = [];
    for (let w = Z_DERM + 7; w < H + 8; w += 12.5) {
      for (let x = (Math.round(w) % 2 ? 4 : 10); x < x1 + 8; x += 13.5) {
        const cx = x + (R() - 0.5) * 3, cy = w + (R() - 0.5) * 2.5;
        pts.push([cx, cy]);
        s += `<path class="sb-fat" d="${smooth(lumpy(cx, cy, 6.4 + R() * 1.2, 9, 0.1, Math.floor(R() * 1e6)), true)}"/>`;
      }
    }
    return { s, pts };
  };

  /* ---------- fața din față: vasele ---------- */
  const PAP = papillae();
  const ART_DEEP = [[-3, 80.5], [25, 79.6], [55, 81.2], [90, 79.8], [131, 80.6]];
  const VEN_DEEP = [[-3, 85.8], [30, 86.6], [62, 85.4], [96, 86.8], [131, 85.9]];
  const ART_SUP = [[-3, 24.2], [30, 25], [65, 23.8], [100, 24.8], [131, 24.2]];
  const VEN_SUP = [[-3, 18.6], [34, 18], [70, 19], [108, 18.1], [131, 18.7]];
  const yAt = (pts, x) => { for (let i = 1; i < pts.length; i++) if (pts[i][0] >= x) { const a = pts[i - 1], b = pts[i], f = (x - a[0]) / (b[0] - a[0]); return a[1] + (b[1] - a[1]) * f; } return pts[pts.length - 1][1]; };
  const cand = [12, 52, 92, 122].map((x, i) => [[x, yAt(ART_DEEP, x)], [x + 1.6, 62 - i % 2 * 3], [x - 0.8, 40], [x + 1, yAt(ART_SUP, x + 1)]]);
  const venl = [20, 64, 102].map((x, i) => [[x, yAt(VEN_SUP, x)], [x - 1.2, 38 + i % 2 * 2], [x + 1.4, 64], [x, yAt(VEN_DEEP, x)]]);
  const perfA = [[33, H + 4], [34.5, 116], [32.6, 99], [34, yAt(ART_DEEP, 34)]];
  const perfV = [[45, H + 4], [44, 114], [46.4, 100], [45, yAt(VEN_DEEP, 45)]];
  const loopsA = [], loopsV = [];
  PAP.forEach((x) => {
    const top = prof(x) + 1.3;
    loopsA.push([[x - 1.1, yAt(ART_SUP, x - 1.1)], [x - 1.15, (top + 22) / 2], [x - 0.9, top + 1], [x, top]]);
    loopsV.push([[x, top], [x + 0.9, top + 1], [x + 1.15, (top + 17) / 2], [x + 1.1, yAt(VEN_SUP, x + 1.1)]]);
  });
  const skinVess = vessels([
    { pts: fp(ART_DEEP), w: 2.4, k: "a", cls: "sk" },
    { pts: fp(perfA), w: 2.2, k: "a", cls: "sk" },
    ...cand.map((p) => ({ pts: fp(p), w: 1.25, k: "a", cls: "sk" })),
    { pts: fp(ART_SUP), w: 1.05, k: "a", cls: "sk" },
    ...loopsA.map((p) => ({ pts: fp(p), w: 0.75, k: "a", cls: "sk cap" })),
  ]) + vessels([
    { pts: fp(VEN_DEEP), w: 3.1, k: "v", cls: "sk pool" },
    { pts: fp(perfV), w: 2.8, k: "v", cls: "sk pool" },
    ...venl.map((p) => ({ pts: fp(p), w: 1.6, k: "v", cls: "sk pool" })),
    { pts: fp(VEN_SUP), w: 1.9, k: "v", cls: "sk pool" },
    ...loopsV.map((p) => ({ pts: fp(p), w: 0.8, k: "v", cls: "sk cap" })),
  ]);

  /* ---------- glandele sudoripare ecrine ---------- */
  const glands = [{ x: 76, w: 94 }, { x: 110, w: 90 }].map(({ x, w }, gi) => {
    // ghemul secretor: un tub încolăcit (curbă Lissajous închisă), apoi canalul drept prin derm și spiralat prin epiderm
    const coil = [];
    for (let i = 0; i < 110; i++) { const t = i / 110 * Math.PI * 2, q = 8, p = 3; const rr = 2.3 + Math.cos(q * t + gi * 0.7); const a = p * t + gi * 0.9; coil.push([x + Math.cos(a) * rr * 2.6, w + Math.sin(a) * rr * 1.55]); }
    const topY = prof(x + 2.5);
    const duct = [[x + 1, w - 5], [x + 2.6, w - 20], [x + 1.4, 60], [x + 2.8, 40], [x + 2, 24], [x + 2.5, topY + 1.5]];
    const spiral = []; for (let i = 0; i <= 40; i++) { const f = i / 40; spiral.push([x + 2.5 + Math.sin(f * Math.PI * 2 * 2.5) * 1.5, topY + 1.5 - f * (topY + 1.5)]); }
    const all = fp([...sampleSmooth(duct, false, 6), ...spiral.slice(1)]);
    return {
      coilD: smooth(fp(coil.filter((_, i) => i % 2 === 0)), true),
      ductD: smooth(all.filter((_, i) => i % 2 === 0 || i === all.length - 1)),
      pore: [x + 2.5, 0],
    };
  });
  const glandSvg = glands.map((g) => `<g class="sb-gland"><path class="sb-coil" d="${g.coilD}"/><path class="sb-coil-i" d="${g.coilD}"/><path class="sb-duct" d="${g.ductD}"/><path class="sb-duct-i" d="${g.ductD}"/><path class="sb-sweat" d="${g.ductD}"/></g>`).join("");

  /* ---------- foliculul pilos, glanda sebacee, mușchiul erector ---------- */
  const fol = { b: [30, 95], e: [46, 0] };
  const fa = (w) => fol.b[0] + (fol.e[0] - fol.b[0]) * (1 - w / fol.b[1]);
  const fAxis = []; for (let i = 0; i <= 16; i++) { const f = i / 16; fAxis.push([fol.b[0] + (fol.e[0] - fol.b[0]) * f + Math.sin(f * 3) * 0.8, fol.b[1] + (fol.e[1] - fol.b[1]) * f]); }
  const folOuter = ribbon(fp(fAxis), (t) => (t < 0.08 ? 4.6 : 3.3 - t * 1.1), { caps: false });
  const bulb = fp(lumpyEllipse(fol.b[0], fol.b[1] + 1.5, 5.6, 4.6));
  const papD = fp(lumpyEllipse(fol.b[0], fol.b[1] + 3.1, 1.9, 2.2));
  const shaft = fp(fAxis.slice(1));
  const seb = [[fa(37) - 4.2, 37], [fa(42) - 6.6, 42], [fa(45) - 3.8, 45]].map(([u, w], i) => smooth(fp(lumpy(u, w, 3.3 - i * 0.3, 8, 0.12, 30 + i)), true));
  const arr = fp([[fa(58) + 1.2, 58], [fa(50) - 6, 49], [fa(36) - 12, 32], [fa(16) - 17, 15.5]]);
  const arrD = ribbon(sampleSmooth(arr, false, 6), (t) => 1.4 - Math.abs(t - 0.45) * 1.3, { caps: true });
  const follicle = `<g class="sb-fol">${seb.map((d) => `<path class="sb-seb" d="${d}"/>`).join("")}<path class="sb-arr" d="${poly(arrD, true)}"/><path class="sb-fol-o" d="${poly(folOuter, true)}"/><path class="sb-bulb" d="${smooth(bulb, true)}"/><path class="sb-dpap" d="${smooth(papD, true)}"/><path class="sb-shaft" d="${smooth(shaft)}"/></g>`;

  /* ---------- fața laterală: vasele tăiate transversal ---------- */
  const cuts = [[9, 80.6, 1.25, "a"], [14.5, 85.6, 1.65, "v"], [31, 81.4, 1.25, "a"], [36.8, 86.2, 1.7, "v"], [48, 80.2, 1.2, "a"], [52.5, 85.4, 1.6, "v"], [20, 24.4, 0.6, "a"], [25, 18.8, 0.95, "v"], [42, 24, 0.6, "a"], [46.5, 18.4, 0.95, "v"]];
  const cutSvg = cuts.map(([s, w, r, k]) => `<g class="sb-xc ${k}"><ellipse class="w" cx="${s}" cy="${w}" rx="${r + 0.45}" ry="${r + 0.45}"/><ellipse class="b" cx="${s}" cy="${w}" rx="${r}" ry="${r}"/><ellipse class="s" cx="${r1(s - r * 0.3)}" cy="${r1(w - r * 0.32)}" rx="${r1(r * 0.35)}" ry="${r1(r * 0.3)}"/></g>`).join("");

  /* ---------- fața de sus: brazde, pori, fire de păr, picături ---------- */
  const furrows = [];
  for (let a = -40; a < 160; a += 23) furrows.push(poly([[a, -1], [a + 26, D + 1]]));
  for (let a = 10; a < 220; a += 27) furrows.push(poly([[a, -1], [a - 34, D + 1]]));
  const pores = [[glands[0].pore[0], 2.2], [glands[1].pore[0], 2.2], [16, 30], [60, 42], [96, 22], [120, 44], [36, 50], [86, 50], [118, 10]];
  const hairsAt = [[fol.e[0], 1.6], [24, 18], [68, 32], [100, 48], [122, 22], [10, 46]];
  const R = rng(7);
  const hairs = hairsAt.map(([u, t], i) => {
    const b = T(u, t), lean = i === 0 ? 1 : 0.6 + R() * 0.6, L = 13 + R() * 6;
    const tip = [b[0] + L * 0.55 * lean, b[1] - L * 0.85], mid = [b[0] + L * 0.18 * lean + 1.5, b[1] - L * 0.5];
    const sl = ribbon(sampleSmooth([b, mid, tip], false, 6), (f) => 0.62 * (1 - f) + 0.05, { caps: false });
    return `<path class="sb-hair" d="${poly(sl, true)}"/>`;
  }).join("");
  const poreSvg = pores.map(([u, t]) => `<ellipse class="sb-pore" cx="${r1(u)}" cy="${r1(t)}" rx="1.25" ry="1.1"/>`).join("");
  const beads = pores.slice(0, 7).map(([u, t], i) => { const [x, y] = T(u, t); return `<g class="sb-bead b${i}" style="--x:${r1(x)}px;--y:${r1(y)}px"><ellipse cx="${r1(x)}" cy="${r1(y - 0.8)}" rx="2.3" ry="1.5"/><ellipse class="hl" cx="${r1(x - 0.7)}" cy="${r1(y - 1.3)}" rx=".7" ry=".4"/></g>`; }).join("");
  const wisps = pores.slice(0, 5).map(([u, t], i) => { const [x, y] = T(u, t); const pts = []; for (let k = 0; k <= 8; k++) pts.push([x + Math.sin(k * 0.9 + i) * 2.2, y - 3 - k * 2.6]); return `<path class="sb-wisp w${i}" d="${smooth(pts)}"/>`; }).join("");

  /* ---------- conturul blocului ---------- */
  const C = { ftl: S(0, D, 0), ftr: S(W, D, 0), fbl: S(0, D, -H), fbr: S(W, D, -H), btr: S(W, 0, 0), bbr: S(W, 0, -H), btl: S(0, 0, 0) };
  const outline = poly([C.btl, C.btr, C.bbr, C.fbr, C.fbl, C.ftl], true);
  const edges = poly([C.ftl, C.ftr, C.btr]) + poly([C.ftr, C.fbr]);

  /* ---------- asamblare ---------- */
  const faceF = `<g transform="${mat(MF)}"><g clip-path="url(#${uid}-cf)"><path class="sb-hyp" d="${LF.hyp}"/>${fat(W, 11).s}<path class="sb-ret" d="${LF.ret}"/>${collagen(W, 3)}<path class="sb-pap" d="${LF.pap}"/><path class="sb-epi" d="${LF.epi}"/><path class="sb-corn" d="${LF.corneum}"/>${basal(profF)}<path class="sb-heat" d="M0 0H${W}V${Z_DERM}H0Z"/></g></g>`;
  const faceS = `<g transform="${mat(MS)}"><g clip-path="url(#${uid}-cs)"><path class="sb-hyp" d="${LS.hyp}"/>${fat(D, 12).s}<path class="sb-ret" d="${LS.ret}"/>${collagen(D, 4)}<path class="sb-pap" d="${LS.pap}"/><path class="sb-epi" d="${LS.epi}"/><path class="sb-corn" d="${LS.corneum}"/>${basal(profS)}<path class="sb-heat" d="M0 0H${D}V${Z_DERM}H0Z"/>${cutSvg}<path class="sb-side-shade" d="M0 0H${D}V${H}H0Z"/></g></g>`;
  const faceT = `<g transform="${mat(MT)}"><path class="sb-top" d="M0 0H${W}V${D}H0Z"/><g clip-path="url(#${uid}-sbt)">${furrows.map((d) => `<path class="sb-furrow" d="${d}"/>`).join("")}</g>${poreSvg}<path class="sb-heat top" d="M0 0H${W}V${D}H0Z"/></g>`;
  const defs = `<clipPath id="${uid}-cf"><path d="M0 0H${W}V${H}H0Z"/></clipPath><clipPath id="${uid}-cs"><path d="M0 0H${D}V${H}H0Z"/></clipPath><clipPath id="${uid}-sbt"><path d="M0 0H${W}V${D}H0Z"/></clipPath><clipPath id="${uid}-sbf"><path d="${poly([C.ftl, C.ftr, C.fbr, C.fbl], true)}"/></clipPath>`;

  return {
    defs,
    halo: `<path class="sb-halo" d="${poly([S(-6, D + 8, -H), S(W + 8, D + 8, -H), S(W + 8, -6, -H), S(-6, -6, -H)], true)}"/>`,
    body: `${faceS}${faceT}${faceF}`,
    vess: `<g class="skinv" clip-path="url(#${uid}-sbf)">${skinVess}${glandSvg}${follicle}</g>`,
    top: `${hairs}${beads}<g class="sb-wisps">${wisps}</g>`,
    outline: `<path class="sb-edge" d="${edges}"/><path class="sb-out" d="${outline}"/>`,
    anchors: {
      artIn: F(33, H), venOut: F(45, H), corner: C,
      pores: pores.slice(0, 2).map(([u, t]) => T(u, t)),
      glands: glands.map((g) => F(g.pore[0] - 1.5, 95)),
      loops: F(PAP[Math.floor(PAP.length / 2)], 10),
      plexus: F(70, 18), deep: F(110, 85),
      F, Sd, T,
    },
    box: { x: Math.min(C.fbl[0], C.btl[0]), y: C.btl[1], w: C.btr[0] - C.fbl[0], h: C.fbr[1] - C.btl[1] },
  };
}

function sub2(a, b) { return [a[0] - b[0], a[1] - b[1]]; }
function lumpyEllipse(cx, cy, rx, ry) { const out = []; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; out.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry * (a > Math.PI ? 1.05 : 0.95)]); } return out; }
