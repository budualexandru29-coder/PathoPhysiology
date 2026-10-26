// Biblioteca comună de celule și molecule. Fiecare desen e la scară: celulele primesc k (px pe µm), moleculele kn (px pe nm).
// Dimensiunile (diametre, µm) vin din manuale; fiecare figură care le folosește își declară scara și pune o bară de scară.
//   hematia 7,5–7,8 µm, 2,6 µm la margine, 0,75 µm în centru (Junqueira ed. 13, p. 251; Ross ed. 7, p. 291)
//   neutrofilul 10–15 µm, 3–5 lobi (Junqueira p. 254, tab. 12–2; Ross p. 296)
//   eozinofilul ≈ neutrofilul, nucleu bilobat, granule specifice ~0,5 µm (Ross p. 301; Junqueira p. 256)
//   bazofilul 12–15 µm, nucleu bilobat sau în S, granule mari (Junqueira p. 256)
//   limfocitul mic ≈ hematia; cel mijlociu/mare 9–18 µm (Junqueira p. 258)
//   monocitul 12–20 µm, nucleu reniform sau în C (Junqueira p. 259–260)
//   macrofagul 10–30 µm, nucleu excentric oval sau reniform (Junqueira p. 113)
//   mastocitul 7–20 µm, granule 0,3–2 µm (Junqueira p. 115–116)
//   plasmocitul ~20 µm, ovoid, nucleu excentric „în cadran de ceas”, Golgi juxtanuclear (Ross p. 203; Junqueira p. 118–119)
//   trombocitul 2–4 µm (Junqueira p. 261)
// Moleculele (extinderea maximă, calculată din coordonatele PDB): IgG 16 nm (1IGT), IgE-Fc pe FcεRIα 10,7 nm (1F6A),
// IgM pentamer 37 nm (2RCJ), IgA dimer secretor, miezul 16,9 nm (6UE7), C1q capul globular 5,4 nm (1PK6), MHC I 7,1 nm (3HLA),
// MHC II 8,1 nm (1DLH), PCR pentamer 9,8 nm (1B09), TLR4–MD-2–LPS 13,4 nm (3FXI), TLR2–TLR6 12,1 nm (3A79), TLR1–TLR2 11,9 nm (2Z7X).
// Liniile de textură (punțile de cromatină, reticulul, scările) au clasa iso-line, ca verificarea capetelor de linii să le prindă.
import { smooth, lumpy, rng, poly } from "../lib/geo.mjs";

const f1 = (v) => (+v).toFixed(1);
const P2 = (p) => `${f1(p[0])} ${f1(p[1])}`;
export const SIZE = { rbc: 7.6, neut: 12, eo: 12, baso: 13, lysm: 7.5, lymed: 11, mono: 16, mac: 21, mast: 13, plasma: 18, plt: 3 };

/* ---------- ajutoare ---------- */
// contur de celulă: un cerc ușor neregulat (sau o formă dată), întors ca puncte
const outline = (x, y, r, seed, amp = 0.05, n = 18) => lumpy(x, y, r, n, amp, seed);
const inside = (pts, [x, y]) => { let c = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xi, yi] = pts[i], [xj, yj] = pts[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
// granule răspândite în citoplasmă, ocolind nucleul (lista de cercuri [x, y, r] de evitat)
function granules(pts, n, rg, R, avoid = [], cls) {
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  let s = "", tries = 0, k = 0;
  while (k < n && tries < n * 30) {
    tries++;
    const p = [x0 + R() * (x1 - x0), y0 + R() * (y1 - y0)];
    if (!inside(pts, p) || avoid.some(([ax, ay, ar]) => Math.hypot(p[0] - ax, p[1] - ay) < ar + rg)) continue;
    const r = rg * (0.75 + R() * 0.5);
    s += `<circle class="${cls}" cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(r)}"/>`; k++;
  }
  return s;
}
const vol = (d) => `<path class="an-vol" d="${d}"/>`;

/* ---------- celulele ---------- */
/** Hematia: disc biconcav, văzut din față (centru palid) sau din profil (edge: true, forma de halteră). */
export function rbc(x, y, k, { d = SIZE.rbc, edge = false, angle = 0, cls = "" } = {}) {
  const r = d * k / 2;
  if (edge) {
    // profil: 2,6 µm la margine, 0,75 µm în centru
    const t = 1.3 * k, c = 0.375 * k, a = angle * 180 / Math.PI;
    return `<g class="lc lc-rbc e ${cls}" data-k="${+k.toFixed(3)}" transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(a)})"><path class="lc-rbcb" d="M${f1(-r)} 0C${f1(-r)} ${f1(-t)} ${f1(-r * 0.55)} ${f1(-t)} ${f1(-r * 0.3)} ${f1(-c)}C${f1(-r * 0.1)} ${f1(-c * 0.8)} ${f1(r * 0.1)} ${f1(-c * 0.8)} ${f1(r * 0.3)} ${f1(-c)}C${f1(r * 0.55)} ${f1(-t)} ${f1(r)} ${f1(-t)} ${f1(r)} 0C${f1(r)} ${f1(t)} ${f1(r * 0.55)} ${f1(t)} ${f1(r * 0.3)} ${f1(c)}C${f1(r * 0.1)} ${f1(c * 0.8)} ${f1(-r * 0.1)} ${f1(c * 0.8)} ${f1(-r * 0.3)} ${f1(c)}C${f1(-r * 0.55)} ${f1(t)} ${f1(-r)} ${f1(t)} ${f1(-r)} 0Z"/></g>`;
  }
  return `<g class="lc lc-rbc ${cls}" data-k="${+k.toFixed(3)}"><circle class="lc-rbcb" cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}"/><circle class="lc-rbcc" cx="${f1(x - r * 0.06)}" cy="${f1(y - r * 0.06)}" r="${f1(r * 0.42)}"/></g>`;
}

/** Neutrofilul: 3–5 lobi legați prin punți subțiri de cromatină, granule fine. shape: puncte de contur (celulă care migrează). */
export function neutrophil(x, y, k, { d = SIZE.neut, lobes = 4, seed = 1, shape = null, cls = "", rot = 0 } = {}) {
  const R = rng(seed), r = d * k / 2;
  const pts = shape || outline(x, y, r, seed, 0.05);
  // lobii (~3 µm) înșirați pe un arc în formă de C, la ~3,2 µm unul de altul, legați prin punți subțiri de cromatină
  const lr = 1.6 * k, arcR = 2.7 * k * (d / 12), step = 3.05 * k / arcR, a0 = rot + Math.PI / 2 - step * (lobes - 1) / 2;
  const L = Array.from({ length: lobes }, (_, i) => { const a = a0 + i * step; return [x + Math.cos(a) * arcR + (R() - 0.5) * 0.5 * k, y + Math.sin(a) * arcR + (R() - 0.5) * 0.5 * k, lr * (0.88 + R() * 0.24), a]; });
  const bridges = L.slice(1).map((p, i) => `M${P2(L[i])}L${P2(p)}`).join("");
  const nuc = L.map(([lx, ly, rr, a]) => `<ellipse class="lc-nuc" cx="${f1(lx)}" cy="${f1(ly)}" rx="${f1(rr * 1.1)}" ry="${f1(rr * 0.78)}" transform="rotate(${f1(a * 57.3 + (R() - 0.5) * 30)} ${f1(lx)} ${f1(ly)})"/>`).join("");
  const d0 = smooth(pts, true);
  return `<g class="lc lc-neut ${cls}" data-k="${+k.toFixed(3)}"><path class="lc-cyt n" d="${d0}"/>${granules(pts, Math.round(d * 6), 0.13 * k, R, [], "lc-gn")}<path class="lc-br iso-line" d="${bridges}"/>${nuc}${vol(d0)}</g>`;
}

/** Eozinofilul: nucleu bilobat, granule mari roșu-portocalii (~0,5 µm) care umplu citoplasma. */
export function eosinophil(x, y, k, { d = SIZE.eo, seed = 2, shape = null, cls = "", rot = 0 } = {}) {
  const R = rng(seed), r = d * k / 2, pts = shape || outline(x, y, r, seed, 0.04);
  const c = Math.cos(rot), s = Math.sin(rot), off = r * 0.3, lr = r * 0.3;
  const L1 = [x - c * off, y - s * off], L2 = [x + c * off, y + s * off];
  const avoid = [[L1[0], L1[1], lr], [L2[0], L2[1], lr]];
  const d0 = smooth(pts, true);
  return `<g class="lc lc-eo ${cls}" data-k="${+k.toFixed(3)}"><path class="lc-cyt e" d="${d0}"/>${granules(pts, Math.round(d * 9), 0.25 * k, R, avoid, "lc-ge")}<path class="lc-br iso-line" d="M${P2(L1)}L${P2(L2)}"/><ellipse class="lc-nuc" cx="${f1(L1[0])}" cy="${f1(L1[1])}" rx="${f1(lr)}" ry="${f1(lr * 0.82)}"/><ellipse class="lc-nuc" cx="${f1(L2[0])}" cy="${f1(L2[1])}" rx="${f1(lr)}" ry="${f1(lr * 0.82)}"/>${vol(d0)}</g>`;
}

/** Bazofilul: nucleu bilobat sau în S, acoperit de granule mari, violet închis. */
export function basophil(x, y, k, { d = SIZE.baso, seed = 3, cls = "" } = {}) {
  const R = rng(seed), r = d * k / 2, pts = outline(x, y, r, seed, 0.04), d0 = smooth(pts, true);
  const nuc = `<path class="lc-nuc" d="${smooth([[x - r * 0.5, y - r * 0.1], [x - r * 0.2, y - r * 0.38], [x + r * 0.15, y - r * 0.2], [x + r * 0.05, y + r * 0.1], [x + r * 0.42, y + r * 0.2], [x + r * 0.2, y + r * 0.42], [x - r * 0.15, y + r * 0.25], [x - r * 0.45, y + r * 0.2]], true)}"/>`;
  return `<g class="lc lc-baso ${cls}" data-k="${+k.toFixed(3)}"><path class="lc-cyt b" d="${d0}"/>${nuc}${granules(pts, Math.round(d * 4.5), 0.38 * k, R, [], "lc-gb")}${vol(d0)}</g>`;
}

/** Limfocitul: mic (≈ hematia, nucleu dens aproape cât celula) sau mijlociu (mai multă citoplasmă). ring: receptor desenat pe margine (B: IgM; T: TCR). */
export function lymphocyte(x, y, k, { d = SIZE.lysm, seed = 4, kind = "", cls = "", active = false } = {}) {
  const R = rng(seed), r = d * k / 2, pts = outline(x, y, r, seed, 0.04), d0 = smooth(pts, true);
  const nr = r * (d <= 9 ? 0.86 : 0.7), nx = x + r * (d <= 9 ? 0.04 : 0.1);
  let chrom = ""; for (let i = 0; i < 7; i++) { const a = R() * 6.28, q = Math.sqrt(R()) * nr * 0.75; chrom += `<circle class="lc-hc" cx="${f1(nx + Math.cos(a) * q)}" cy="${f1(y + Math.sin(a) * q)}" r="${f1(nr * 0.13)}"/>`; }
  // receptorii de antigen pe membrană (schematici, mult mai mari decât sunt): B = IgM de membrană (Y), T = TCR (două bețe)
  let rec = "";
  if (kind) for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3 + 0.3, px = x + Math.cos(a) * r, py = y + Math.sin(a) * r, ox = Math.cos(a), oy = Math.sin(a), L = Math.max(1.6, 0.5 * k); rec += kind === "B" ? `<path class="lc-rec b iso-line" d="M${f1(px)} ${f1(py)}l${f1(ox * L)} ${f1(oy * L)}m0 0l${f1(ox * L * 0.6 - oy * L * 0.5)} ${f1(oy * L * 0.6 + ox * L * 0.5)}m${f1(-(ox * L * 0.6 - oy * L * 0.5))} ${f1(-(oy * L * 0.6 + ox * L * 0.5))}l${f1(ox * L * 0.6 + oy * L * 0.5)} ${f1(oy * L * 0.6 - ox * L * 0.5)}"/>` : `<path class="lc-rec t iso-line" d="M${f1(px - oy * 0.4)} ${f1(py + ox * 0.4)}l${f1(ox * L)} ${f1(oy * L)}M${f1(px + oy * 0.4)} ${f1(py - ox * 0.4)}l${f1(ox * L)} ${f1(oy * L)}"/>`; }
  return `<g class="lc lc-ly ${active ? "act" : ""} ${cls}" data-k="${+k.toFixed(3)}"><path class="lc-cyt l" d="${d0}"/><circle class="lc-nuc dense" cx="${f1(nx)}" cy="${f1(y)}" r="${f1(nr)}"/>${chrom}${rec}${vol(d0)}</g>`;
}

/** Monocitul: nucleu reniform sau în potcoavă, cromatină fină, citoplasmă gri-albăstruie cu câteva vacuole. */
export function monocyte(x, y, k, { d = SIZE.mono, seed = 5, shape = null, cls = "", rot = 0 } = {}) {
  const R = rng(seed), r = d * k / 2, pts = shape || outline(x, y, r, seed, 0.06), d0 = smooth(pts, true);
  const nuc = kidney(x + r * 0.08, y, r * 0.48, r * 0.34, rot);
  return `<g class="lc lc-mono ${cls}" data-k="${+k.toFixed(3)}"><path class="lc-cyt m" d="${d0}"/>${nuc}${granules(pts, 5, 0.45 * k, R, [[x, y, r * 0.5]], "lc-vac")}${granules(pts, 8, 0.15 * k, R, [[x, y, r * 0.5]], "lc-az")}${vol(d0)}</g>`;
}
// nucleu reniform: elipsă cu o scobitură (hilul) pe o latură
function kidney(x, y, rx, ry, rot = 0, dent = 0.55) {
  const pts = [];
  for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2; let px = Math.cos(a) * rx, py = Math.sin(a) * ry; py += ry * dent * 1.6 * Math.exp(-((a - Math.PI * 1.5) ** 2) / (2 * 0.42 ** 2)); pts.push([px, py]); }
  const c = Math.cos(rot), s = Math.sin(rot);
  return `<path class="lc-nuc" d="${smooth(pts.map(([px, py]) => [x + px * c - py * s, y + px * s + py * c]), true)}"/>`;
}

/** Macrofagul: celulă mare, contur cu pseudopode, nucleu excentric oval/reniform, lizozomi, fagozomi (eat: conținut desenat de figură). */
export function macrophage(x, y, k, { d = SIZE.mac, seed = 6, shape = null, cls = "", rot = 0, eat = "" } = {}) {
  const R = rng(seed), r = d * k / 2, pts = shape || outline(x, y, r, seed, 0.12, 16), d0 = smooth(pts, true);
  const nx = x - Math.cos(rot) * r * 0.3, ny = y - Math.sin(rot) * r * 0.3;
  return `<g class="lc lc-mac ${cls}" data-k="${+k.toFixed(3)}"><path class="lc-cyt mac" d="${d0}"/>${kidney(nx, ny, r * 0.34, r * 0.24, rot + 0.4)}${granules(pts, 7, 0.5 * k, R, [[nx, ny, r * 0.4]], "lc-lys")}${granules(pts, 3, 0.9 * k, R, [[nx, ny, r * 0.42]], "lc-vac")}${eat}${vol(d0)}</g>`;
}

/** Mastocitul: oval, nucleu central rotund, citoplasma plină de granule metacromatice (0,3–2 µm). out: granulele eliberate (degranulare). */
export function mastCell(x, y, k, { d = SIZE.mast, seed = 7, cls = "", degran = 0 } = {}) {
  const R = rng(seed), r = d * k / 2, pts = outline(x, y, r, seed, 0.06).map(([px, py]) => [px, y + (py - y) * 0.82]), d0 = smooth(pts, true);
  const nr = r * 0.3;
  const inside_ = granules(pts, Math.round(d * 7 * (1 - degran * 0.6)), 0.3 * k, R, [[x, y, nr]], "lc-gm");
  let out = "";
  if (degran) for (let i = 0; i < Math.round(d * 1.6 * degran); i++) { const a = R() * 6.28, q = r * (1.08 + R() * 0.7); out += `<circle class="lc-gm out" cx="${f1(x + Math.cos(a) * q)}" cy="${f1(y + Math.sin(a) * q * 0.85)}" r="${f1(0.3 * k * (0.7 + R() * 0.6))}"/>`; }
  return `<g class="lc lc-mast ${cls}" data-k="${+k.toFixed(3)}"><path class="lc-cyt ms" d="${d0}"/>${inside_}<ellipse class="lc-nuc" cx="${f1(x)}" cy="${f1(y)}" rx="${f1(nr)}" ry="${f1(nr * 0.9)}"/>${out}${vol(d0)}</g>`;
}

/** Plasmocitul: ovoid, nucleu excentric cu heterocromatina în „cadran de ceas”, zona clară a aparatului Golgi lângă nucleu, citoplasmă bazofilă. */
export function plasmaCell(x, y, k, { d = SIZE.plasma, seed = 8, cls = "", rot = 0 } = {}) {
  const r = d * k / 2, c = Math.cos(rot), s = Math.sin(rot);
  const pts = outline(0, 0, r, seed, 0.04).map(([px, py]) => [x + px * c - py * 0.72 * s, y + px * s + py * 0.72 * c]), d0 = smooth(pts, true);
  const nx = x + c * r * 0.38, ny = y + s * r * 0.38, nr = r * 0.38;
  const clock = Array.from({ length: 7 }, (_, i) => { const a = i / 7 * Math.PI * 2; return `<circle class="lc-hc" cx="${f1(nx + Math.cos(a) * nr * 0.68)}" cy="${f1(ny + Math.sin(a) * nr * 0.68)}" r="${f1(nr * 0.17)}"/>`; }).join("") + `<circle class="lc-hc" cx="${f1(nx)}" cy="${f1(ny)}" r="${f1(nr * 0.16)}"/>`;
  return `<g class="lc lc-plasma ${cls}" data-k="${+k.toFixed(3)}"><path class="lc-cyt p" d="${d0}"/><ellipse class="lc-golgi" cx="${f1(nx - c * nr * 1.15)}" cy="${f1(ny - s * nr * 1.15)}" rx="${f1(nr * 0.5)}" ry="${f1(nr * 0.72)}" transform="rotate(${f1(rot * 57.3)} ${f1(nx - c * nr * 1.15)} ${f1(ny - s * nr * 1.15)})"/><circle class="lc-nuc pl" cx="${f1(nx)}" cy="${f1(ny)}" r="${f1(nr)}"/>${clock}${vol(d0)}</g>`;
}

/** Trombocitul: fragment discoid, granulomerul central. */
export function platelet(x, y, k, { d = SIZE.plt, cls = "", angle = 0 } = {}) {
  const r = d * k / 2;
  return `<g class="lc lc-plt ${cls}" data-k="${+k.toFixed(3)}"><ellipse class="lc-pltb" cx="${f1(x)}" cy="${f1(y)}" rx="${f1(r)}" ry="${f1(r * 0.62)}" transform="rotate(${f1(angle * 57.3)} ${f1(x)} ${f1(y)})"/><circle class="lc-pltg" cx="${f1(x)}" cy="${f1(y)}" r="${f1(r * 0.32)}"/></g>`;
}

/** Bara de scară: o linie de lungime µm·k, cu capete marcate, și eticheta. */
export function scaleBar(x, y, k, um, label = `${um} µm`, { cls = "", anchor = "start" } = {}) {
  const L = um * k, x0 = anchor === "end" ? x - L : x;
  return `<g class="lc-bar ${cls}"><path class="iso-line" d="M${f1(x0)} ${f1(y - 2.2)}V${f1(y + 2.2)}M${f1(x0)} ${f1(y)}H${f1(x0 + L)}M${f1(x0 + L)} ${f1(y - 2.2)}V${f1(y + 2.2)}"/><text x="${f1(anchor === "end" ? x0 - 3 : x0 + L + 3)}" y="${f1(y + 2.4)}" text-anchor="${anchor === "end" ? "end" : "start"}" data-ui>${label}</text></g>`;
}

/* ---------- moleculele (kn = px pe nm) ---------- */
// un domeniu Ig: elipsoid de ~3,6 × 2,4 nm (axa lungă de-a lungul lanțului)
const dom = (x, y, kn, a, cls) => `<ellipse class="lm-d ${cls}" cx="${f1(x)}" cy="${f1(y)}" rx="${f1(1.8 * kn)}" ry="${f1(1.2 * kn)}" transform="rotate(${f1(a * 57.3)} ${f1(x)} ${f1(y)})"/>`;
/**
 * Anticorpul monomer (IgG, IgE, IgA, IgM), cu brațele Fab spre direcția a. Domeniile: VH+VL și CH1+CL în fiecare Fab,
 * CH2 și CH3 în Fc (IgE și IgM au un CH în plus și nu au balama; Janeway cap. 4–5). Extinderea maximă iese ~16 nm (PDB 1IGT).
 * Sub ~1,4 px/nm se desenează doar ca „Y”.
 */
export function antibody(x, y, kn, { a = -Math.PI / 2, iso = "G", cls = "", open = 0.75 } = {}) {
  const ux = Math.cos(a), uy = Math.sin(a), px = -uy, py = ux;
  const arm = (sg) => [Math.cos(a + sg * open), Math.sin(a + sg * open)];
  const at = (u, p) => [x + ux * u * kn + px * p * kn, y + uy * u * kn + py * p * kn];
  if (kn < 1.4) {
    const L = 8 * kn, S = 7 * kn, [l1, l2] = [arm(-1), arm(1)];
    return `<path class="lm-ab ${iso} iso-line ${cls}" d="M${f1(x - ux * S)} ${f1(y - uy * S)}L${f1(x)} ${f1(y)}M${f1(x)} ${f1(y)}L${f1(x + l1[0] * L)} ${f1(y + l1[1] * L)}M${f1(x)} ${f1(y)}L${f1(x + l2[0] * L)} ${f1(y + l2[1] * L)}"/>`;
  }
  const extra = iso === "E" || iso === "M", nFc = extra ? 3 : 2;
  let fc = "", fab = "", hinge = "";
  for (let i = 0; i < nFc; i++) for (const sg of [-1, 1]) { const [cx, cy] = at(-(2.4 + i * 3.6), sg * 1.22); fc += dom(cx, cy, kn, a, "h"); }
  for (const sg of [-1, 1]) {
    const [bx, by] = arm(sg), qx = -by, qy = bx, aa = Math.atan2(by, bx);
    // lanțul greu spre interior (lângă balama), lanțul ușor spre exterior
    for (let i = 0; i < 2; i++) {
      const cx = x + bx * (2.6 + i * 3.6) * kn, cy = y + by * (2.6 + i * 3.6) * kn, o = sg * 1.2 * kn;
      fab += dom(cx - qx * o, cy - qy * o, kn, aa, i ? "hv" : "h") + dom(cx + qx * o, cy + qy * o, kn, aa, i ? "lv" : "l");
    }
    // balamaua: lanțul greu trece din CH1 în CH2
    const [hx, hy] = at(-0.7, sg * 1.22), cx = x + bx * 0.9 * kn - qx * sg * 1.2 * kn, cy = y + by * 0.9 * kn - qy * sg * 1.2 * kn;
    hinge += `M${f1(hx)} ${f1(hy)}L${f1(cx)} ${f1(cy)}`;
  }
  const [s1x, s1y] = at(-0.7, -1.22), [s2x, s2y] = at(-0.7, 1.22);
  hinge += `M${f1(s1x)} ${f1(s1y)}L${f1(s2x)} ${f1(s2y)}`; // punțile disulfidice dintre lanțurile grele
  return `<g class="lm-ig ${iso} ${cls}"><path class="lm-hinge iso-line" d="${hinge}"/>${fc}${fab}</g>`;
}
/** IgM pentamer (cu lanțul J): cinci monomeri cu Fc spre centru; ~37 nm (PDB 2RCJ). */
export function igmPentamer(x, y, kn, { cls = "" } = {}) {
  let s = "";
  for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * 2 * Math.PI / 5; s += antibody(x + Math.cos(a) * 12.5 * kn, y + Math.sin(a) * 12.5 * kn, kn, { a, iso: "M", open: 0.6 }); }
  return `<g class="lm-igm ${cls}">${s}<circle class="lm-j" cx="${f1(x)}" cy="${f1(y)}" r="${f1(1.8 * kn)}"/></g>`;
}
/** IgA dimer secretor: doi monomeri legați coadă la coadă prin lanțul J, cu componenta secretorie înfășurată peste Fc (PDB 6UE7). */
export function igaDimer(x, y, kn, { cls = "", a = 0 } = {}) {
  const ux = Math.cos(a), uy = Math.sin(a), L = 10.5 * kn;
  return `<g class="lm-iga ${cls}">${antibody(x - ux * L, y - uy * L, kn, { a: a + Math.PI, iso: "A" })}${antibody(x + ux * L, y + uy * L, kn, { a, iso: "A" })}<circle class="lm-j" cx="${f1(x)}" cy="${f1(y)}" r="${f1(1.4 * kn)}"/><path class="lm-sc iso-line" d="M${f1(x - ux * 9 * kn + uy * 3 * kn)} ${f1(y - uy * 9 * kn - ux * 3 * kn)}Q${f1(x + uy * 6 * kn)} ${f1(y - ux * 6 * kn)} ${f1(x + ux * 9 * kn + uy * 3 * kn)} ${f1(y + uy * 9 * kn - ux * 3 * kn)}"/></g>`;
}
/** C1: C1q — tulpină colagenică, șase brațe și șase capete globulare (~5,4 nm, PDB 1PK6; Janeway p. 183–185) — cu C1r₂s₂ între brațe. */
export function c1q(x, y, kn, { a = -Math.PI / 2, cls = "", c1rs = true } = {}) {
  const ux = Math.cos(a), uy = Math.sin(a), px = -uy, py = ux;
  const at = (u, p) => [x + ux * u * kn + px * p * kn, y + uy * u * kn + py * p * kn];
  const fork = at(10, 0);
  let arms = "", heads = "";
  for (let i = 0; i < 6; i++) {
    const t = (i - 2.5) / 2.5, ang = t * 1.15, rr = i % 2 ? 13.5 : 11.5;
    const h = at(10 + Math.cos(ang) * rr, Math.sin(ang) * rr), m = at(10 + Math.cos(ang) * rr * 0.45, Math.sin(ang) * rr * 0.32);
    arms += `M${P2(fork)}Q${P2(m)} ${P2(h)}`;
    heads += `<circle class="lm-c1qh" cx="${f1(h[0])}" cy="${f1(h[1])}" r="${f1(2.7 * kn)}"/>`;
  }
  const rc = at(12.5, 0), rs = c1rs ? `<ellipse class="lm-c1rs" cx="${f1(rc[0])}" cy="${f1(rc[1])}" rx="${f1(4.6 * kn)}" ry="${f1(1.6 * kn)}" transform="rotate(${f1(a * 57.3 + 90)} ${f1(rc[0])} ${f1(rc[1])})"/>` : "";
  return `<g class="lm-c1q ${cls}"><path class="lm-stalk" d="M${P2([x, y])}L${P2(at(10.6, 0))}" style="stroke-width:${f1(1.7 * kn)}px"/><path class="lm-col iso-line" d="${arms}"/>${rs}${heads}</g>`;
}
/** Proteina C reactivă: pentraxină, cinci subunități identice într-un disc de ~10 nm (PDB 1B09; Janeway p. 322). */
export function crp(x, y, kn, { cls = "" } = {}) {
  let s = "";
  for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * 2 * Math.PI / 5; s += `<circle class="lm-crp" cx="${f1(x + Math.cos(a) * 3 * kn)}" cy="${f1(y + Math.sin(a) * 3 * kn)}" r="${f1(1.95 * kn)}"/>`; }
  return `<g class="lm-crpg ${cls}">${s}</g>`;
}
/**
 * MHC pe membrană (y = fața externă a membranei). Clasa I (PDB 3HLA, ~7 nm deasupra membranei): lanțul α cu platforma α1/α2,
 * domeniul α3 și β2-microglobulina alături. Clasa II (PDB 1DLH, ~8 nm): lanțurile α și β, platforma α1/β1 și domeniile α2, β2.
 * Peptidul stă în șanțul dintre cele două helixuri ale platformei (Janeway cap. 4).
 */
export function mhc(x, y, kn, { cls = "", cls2 = 1, peptide = true } = {}) {
  const e = (cx, cy, rx, ry, c) => `<ellipse class="${c}" cx="${f1(x + cx * kn)}" cy="${f1(y + cy * kn)}" rx="${f1(rx * kn)}" ry="${f1(ry * kn)}"/>`;
  const tm = (cx) => `<rect class="lm-tm" x="${f1(x + (cx - 0.35) * kn)}" y="${f1(y - 0.6 * kn)}" width="${f1(0.7 * kn)}" height="${f1(4.6 * kn)}" rx="${f1(0.3 * kn)}"/>`;
  const groove = (cy) => `<path class="lm-helix iso-line" d="M${f1(x - 2.8 * kn)} ${f1(y + (cy - 0.55) * kn)}H${f1(x + 2.8 * kn)}M${f1(x - 2.8 * kn)} ${f1(y + (cy + 0.55) * kn)}H${f1(x + 2.8 * kn)}"/>` + (peptide ? `<rect class="lm-pep" x="${f1(x - 2.2 * kn)}" y="${f1(y + (cy - 0.3) * kn)}" width="${f1(4.4 * kn)}" height="${f1(0.6 * kn)}" rx="${f1(0.3 * kn)}"/>` : "");
  if (cls2 === 1) return `<g class="lm-mhc i ${cls}">${tm(-1.2)}${e(-1.2, -2.2, 1.3, 1.9, "lm-a")}${e(1.45, -2.0, 1.3, 1.6, "lm-b2m")}${e(0, -5.6, 3.4, 1.35, "lm-a")}${groove(-5.9)}</g>`;
  return `<g class="lm-mhc ii ${cls}">${tm(-1.4)}${tm(1.4)}${e(-1.4, -2.4, 1.3, 1.9, "lm-a")}${e(1.4, -2.4, 1.3, 1.9, "lm-bb")}<path class="lm-a" d="M${f1(x - 3.4 * kn)} ${f1(y - 6.5 * kn)}a${f1(3.4 * kn)} ${f1(1.4 * kn)} 0 0 1 ${f1(3.4 * kn)} ${f1(-1.4 * kn)}V${f1(y - 5.1 * kn)}a${f1(3.4 * kn)} ${f1(1.4 * kn)} 0 0 1 ${f1(-3.4 * kn)} ${f1(-1.4 * kn)}Z"/><path class="lm-bb" d="M${f1(x)} ${f1(y - 7.9 * kn)}a${f1(3.4 * kn)} ${f1(1.4 * kn)} 0 0 1 ${f1(3.4 * kn)} ${f1(1.4 * kn)}a${f1(3.4 * kn)} ${f1(1.4 * kn)} 0 0 1 ${f1(-3.4 * kn)} ${f1(1.4 * kn)}Z"/>${groove(-6.5)}</g>`;
}
/**
 * Receptor Toll-like: ectodomeniul în potcoavă (repetițiile bogate în leucină), segmentul transmembranar, domeniul TIR în citoplasmă.
 * md2: proteina MD-2 lipită de ectodomeniul TLR4 (PDB 3FXI; Janeway p. 258).
 */
export function tlr(x, y, kn, { cls = "", flip = false, tone = "t4", md2 = false } = {}) {
  const sg = flip ? -1 : 1, h = 9 * kn;
  const horse = smooth([[x, y], [x + sg * 1 * kn, y - h * 0.35], [x + sg * 4.5 * kn, y - h * 0.8], [x + sg * 8 * kn, y - h * 0.62], [x + sg * 6.2 * kn, y - h * 0.48], [x + sg * 3.6 * kn, y - h * 0.58], [x + sg * 2.2 * kn, y - h * 0.3], [x + sg * 1.6 * kn, y]], true);
  const m = md2 ? `<ellipse class="lm-md2" cx="${f1(x + sg * 6.4 * kn)}" cy="${f1(y - h * 0.85)}" rx="${f1(1.9 * kn)}" ry="${f1(1.4 * kn)}"/>` : "";
  return `<g class="lm-tlr ${tone} ${cls}"><path class="lm-ecto" d="${horse}"/>${m}<rect class="lm-tm" x="${f1(x + sg * 0.8 * kn - 0.4 * kn)}" y="${f1(y)}" width="${f1(0.8 * kn)}" height="${f1(4 * kn)}"/><ellipse class="lm-tir" cx="${f1(x + sg * 0.9 * kn)}" cy="${f1(y + 5.6 * kn)}" rx="${f1(1.8 * kn)}" ry="${f1(1.4 * kn)}"/></g>`;
}
/** Membrana: dublu strat lipidic de ~4 nm (capetele polare ca puncte, cozile ca perechi de linii), de la x0 la x1, cu fața externă la y. */
export function bilayer(x0, x1, y, kn, { cls = "", step = 1 } = {}) {
  let heads = "", tails = "";
  const hr = 0.42 * kn, T = 1.5 * kn, dx = step * kn;
  for (let x = x0 + dx / 2; x < x1; x += dx) {
    heads += `<circle cx="${f1(x)}" cy="${f1(y + hr)}" r="${f1(hr)}"/><circle cx="${f1(x)}" cy="${f1(y + 4 * kn - hr)}" r="${f1(hr)}"/>`;
    tails += `M${f1(x - hr * 0.4)} ${f1(y + 2 * hr)}v${f1(T)}M${f1(x + hr * 0.4)} ${f1(y + 2 * hr)}v${f1(T)}M${f1(x - hr * 0.4)} ${f1(y + 4 * kn - 2 * hr)}v${f1(-T)}M${f1(x + hr * 0.4)} ${f1(y + 4 * kn - 2 * hr)}v${f1(-T)}`;
  }
  return `<g class="lm-mem ${cls}"><rect class="lm-memb" x="${f1(x0)}" y="${f1(y)}" width="${f1(x1 - x0)}" height="${f1(4 * kn)}"/><path class="lm-tail" d="${tails}"/><g class="lm-head">${heads}</g></g>`;
}
