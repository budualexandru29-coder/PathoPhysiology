// Î18/Î19/Î20: angina (faringita) streptococică și comparația cu angina virală. Cinci panouri:
//  A. orofaringele văzut prin gura deschisă: palatul, vălul cu uvula, pilierii, amigdalele palatine, peretele posterior, limba;
//  B. o lupă pe o criptă amigdaliană (~1,6 px/µm): epiteliul pavimentos stratificat necheratinizat, țesutul limfoid
//     cu un folicul, un capilar, un macrofag; streptococii în lanțuri (mult mai mari decât sunt), toxinele, neutrofilele, puroiul;
//  C. capul și gâtul din profil: ganglionii jugulodigastric și laterocervicali, rinoreea, urechea medie, sinusul maxilar, amigdala;
//  D. complicațiile la distanță: inima și genunchiul (reumatismul articular acut), rinichiul (glomerulonefrita post-streptococică);
//  E. debutul: febra, rinoreea și formula leucocitară, bacterian față de viral (curbe schematice după criteriile LP).
import { smooth, poly, lumpy, rng, sampleSmooth, offset, ribbon, along } from "./lib/geo.mjs";
import { vessels, cutEnd, organ } from "./lib/an.mjs";
import { heart } from "./parts/heart.mjs";
import { kidney } from "./parts/kidney.mjs";
import { cytokine } from "./fever.mjs";

export const W = 420, H = 500;
const P2 = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
const f1 = (v) => (+v).toFixed(1);
const inPoly = (pt, pts) => { let c = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xi, yi] = pts[i], [xj, yj] = pts[j]; if ((yi > pt[1]) !== (yj > pt[1]) && pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi) c = !c; } return c; };
const mirX = (pts, cx) => pts.map(([x, y]) => [2 * cx - x, y]);

/* ---------- celule și germeni (lupa) ---------- */
const UM = 1.6;
// lanț de coci (Streptococcus pyogenes): coci în perechi de-a lungul unei linii ușor curbe, capsulă de acid hialuronic (halou),
// fibrile de proteină M pe suprafață. Cocii au ~1 µm; aici sunt desenați de ~3 ori mai mari.
function chain(x, y, ang, n, R, cls = "") {
  const d = 5.2, pts = [];
  let a = ang, px = x, py = y;
  for (let i = 0; i < n; i++) { pts.push([px, py]); a += (R() - 0.5) * 0.35; px += Math.cos(a) * d * (i % 2 ? 1.12 : 0.96); py += Math.sin(a) * d * (i % 2 ? 1.12 : 0.96); }
  const halo = `<path class="sp-cap" d="${smooth(pts)}"/>`;
  let fib = "";
  pts.forEach((p, i) => { const n0 = i ? Math.atan2(p[1] - pts[i - 1][1], p[0] - pts[i - 1][0]) : ang; [1, -1].forEach((sg) => { const t = n0 + sg * Math.PI / 2 + (R() - 0.5) * 0.6; fib += `M${P2([p[0] + Math.cos(t) * 2.5, p[1] + Math.sin(t) * 2.5])}l${f1(Math.cos(t) * 1.8)} ${f1(Math.sin(t) * 1.8)}`; }); });
  return `<g class="sp-ch ${cls}">${halo}<path class="sp-fib" d="${fib}"/>${pts.map(([cx, cy]) => `<circle class="sp-coc" cx="${f1(cx)}" cy="${f1(cy)}" r="2.5"/>`).join("")}</g>`;
}
// neutrofil (~12 µm): nucleu cu 3–4 lobi, citoplasmă cu granule fine; `el` alungește celula (diapedeză prin epiteliu)
function neutro(x, y, R, el = 1, ang = 0) {
  const r = 6 * UM, sh = Array.from({ length: 14 }, (_, i) => { const t = i / 14 * 6.28, rr = r * (1 + (R() - 0.5) * 0.12); const u = Math.cos(t) * rr * el, v = Math.sin(t) * rr / Math.sqrt(el); return [x + u * Math.cos(ang) - v * Math.sin(ang), y + u * Math.sin(ang) + v * Math.cos(ang)]; });
  const lobes = [[-0.45, -0.1], [0.05, 0.3], [0.45, -0.05]].map(([u, v]) => { const uu = u * r * el * 0.9, vv = v * r; return [x + uu * Math.cos(ang) - vv * Math.sin(ang), y + uu * Math.sin(ang) + vv * Math.cos(ang)]; });
  let g = ""; for (let i = 0; i < 9; i++) { const t = R() * 6.28, rr = Math.sqrt(R()) * r * 0.7; g += `<circle cx="${f1(x + Math.cos(t) * rr * el)}" cy="${f1(y + Math.sin(t) * rr)}" r=".6"/>`; }
  return `<g class="sp-nt"><path class="c" d="${smooth(sh, true)}"/><g class="g">${g}</g><path class="br" d="${poly(lobes)}"/>${lobes.map(([lx, ly]) => `<circle class="n" cx="${f1(lx)}" cy="${f1(ly)}" r="${f1(r * 0.3)}"/>`).join("")}</g>`;
}
// limfocit mic (~7 µm), ca referință la un model (sunt multe)
const lyDefs = [0.95, 1.05].map((k, i) => { const r = 3.5 * UM * k; return `<g id="__U__-sly${i}"><circle r="${f1(r)}" fill="#cdc3e0" stroke="#8f80b8" stroke-width=".35"/><circle cx=".4" r="${f1(r * 0.8)}" fill="#3e2f6e"/><circle cx="${f1(r * 0.3)}" cy="${f1(-r * 0.2)}" r="${f1(r * 0.2)}" fill="#261b4d"/></g>`; }).join("");
const lym = (x, y, R) => `<use href="#__U__-sly${R() < 0.5 ? 0 : 1}" x="${f1(x)}" y="${f1(y)}"/>`;
// exotoxină pirogenă (superantigen), glifă mică cu două domenii
const toxin = (x, y, a = 0) => `<g class="sp-tx" transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(a)})"><circle cx="-1.4" r="1.7"/><circle cx="1.5" cy=".4" r="1.4"/></g>`;
// virion icosaedric (adenovirus, rinovirus), mărit mult
const virion = (x, y) => `<path class="sp-vi" d="M${f1(x + 2.2)} ${f1(y)}L${f1(x + 1.1)} ${f1(y + 1.9)}L${f1(x - 1.1)} ${f1(y + 1.9)}L${f1(x - 2.2)} ${f1(y)}L${f1(x - 1.1)} ${f1(y - 1.9)}L${f1(x + 1.1)} ${f1(y - 1.9)}Z"/>`;

export function build() {
  /* ======================= A. orofaringele prin gura deschisă ======================= */
  const MC = 108;                                           // axa mediană
  const card = { x: 10, y: 10, w: 198, h: 196 };
  const open = smooth([[MC, 20], [150, 24], [184, 44], [198, 88], [196, 134], [182, 172], [150, 194], [MC, 200], [66, 194], [34, 172], [20, 134], [18, 88], [32, 44], [66, 24]], true, 0.8);
  const lipOuter = smooth([[MC, 10], [156, 14], [198, 40], [210, 90], [208, 140], [192, 182], [154, 206], [MC, 212], [62, 206], [24, 182], [8, 140], [6, 90], [18, 40], [60, 14]], true, 0.8);
  const skin = `<rect class="sp-face" x="${card.x}" y="${card.y}" width="${card.w}" height="${card.h}" rx="10"/>`;
  const lips = `<path class="sp-lip" d="${lipOuter}${open}"/>`;
  // palatul (dur și moale) până la marginea liberă a vălului, cu uvula
  const palL = [[16, 98], [30, 76], [52, 62], [78, 58], [96, 63]];
  const palEdge = [...palL, [100, 76], [102, 90], [MC, 98], [114, 90], [116, 76], ...mirX(palL, MC).reverse()];
  const palate = `<path class="sp-pal" d="${smooth([[12, 0], [204, 0], [204, 98], ...palEdge.slice().reverse(), [12, 98]], true, 0.5)}"/>`;
  const raphe = `<path class="sp-raphe" d="M${MC} 34V60"/>`;
  const rugae = [-1, 1].map((sg) => [0, 1, 2].map((i) => `<path class="sp-rug" d="${smooth([[MC + sg * 4, 32 + i * 7], [MC + sg * (12 + i * 3), 30 + i * 7], [MC + sg * (22 + i * 4), 34 + i * 7]])}"/>`).join("")).join("");
  const uvula = `<g class="sp-uvg"><path class="sp-uv" d="${smooth([[97, 62], [100, 76], [102, 90], [MC, 99], [114, 90], [116, 76], [119, 62]], false)}Z"/><path class="sp-uvs" d="M${MC} 66V94"/></g>`;
  // peterele posterior al faringelui, cu granulații limfoide
  const R = rng(4);
  let gran = ""; for (let i = 0; i < 22; i++) { const x = 78 + R() * 60, y = 74 + R() * 56; if (Math.abs(x - MC) < 10 && y < 100) continue; gran += `<ellipse class="sp-gran" cx="${f1(x)}" cy="${f1(y)}" rx="${f1(1.4 + R())}" ry="${f1(1 + R() * 0.6)}"/>`; }
  // pilierii: anterior (palatoglos), lateral; posterior (palatofaringian), medial; amigdala între ei
  const pillarA = [[30, 76], [26, 100], [28, 124], [36, 146]], pillarP = [[78, 62], [74, 86], [72, 112], [70, 138]];
  const pillars = [pillarA, pillarP, mirX(pillarA, MC), mirX(pillarP, MC)].map((p, i) => `<path class="sp-pil${i % 2 ? " p" : ""}" d="${smooth(p)}"/>`).join("");
  const fossa = [-1, 1].map((sg) => `<path class="sp-fossa" d="${smooth(sg < 0 ? [[32, 78], [28, 104], [32, 132], [52, 142], [70, 132], [74, 104], [74, 74], [54, 64]] : mirX([[32, 78], [28, 104], [32, 132], [52, 142], [70, 132], [74, 104], [74, 74], [54, 64]], MC), true)}"/>`).join("");
  const tonsil = (cx, seed) => {
    const sh = lumpy(cx, 108, 15, 14, 0.1, seed).map(([x, y]) => [cx + (x - cx) * 0.86, 108 + (y - 108) * 1.32]);
    const RR = rng(seed + 10);
    let crypts = ""; for (let i = 0; i < 7; i++) { const x = cx + (RR() - 0.5) * 16, y = 108 + (RR() - 0.5) * 30; crypts += `<path class="sp-crypt" d="M${f1(x - 1.8)} ${f1(y)}q1.8 -1.2 3.6 0"/>`; }
    const ex = [[cx - 4, 100, 4.6], [cx + 5, 112, 3.6], [cx - 3, 120, 3.2], [cx + 3, 94, 2.6]].map(([x, y, r], i) => `<path class="sp-exu" d="${smooth(lumpy(x, y, r, 8, 0.25, seed * 7 + i), true)}"/>`).join("");
    return `<g class="sp-ton"><path class="sp-tf" d="${smooth(sh, true)}"/><path class="an-vol" d="${smooth(sh, true)}"/>${crypts}<g class="sp-exg">${ex}</g></g>`;
  };
  const tonsils = tonsil(52, 3) + tonsil(164, 5);
  const pete = [[86, 44], [92, 50], [124, 46], [130, 52], [100, 54], [118, 56], [80, 52], [136, 46], [110, 48]].map(([x, y]) => `<circle class="sp-pet" cx="${x}" cy="${y}" r="1.1"/>`).join("");
  // abcesul periamigdalian (dreapta): vălul bombat deasupra amigdalei, uvula împinsă spre partea opusă
  const abscess = `<path class="sp-abs" d="${smooth([[132, 58], [154, 56], [174, 70], [176, 92], [164, 100], [146, 92], [134, 76]], true)}"/><path class="sp-absc" d="${smooth(lumpy(158, 78, 7, 9, 0.2, 2), true)}"/>`;
  const tongue = `<path class="sp-tg" d="${smooth([[14, 210], [18, 156], [40, 138], [76, 128], [MC, 126], [140, 128], [176, 138], [198, 156], [202, 210]], true, 0.6)}"/><path class="an-vol" d="${smooth([[14, 210], [18, 156], [40, 138], [76, 128], [MC, 126], [140, 128], [176, 138], [198, 156], [202, 210]], true, 0.6)}"/><path class="sp-sulc" d="${smooth([[MC, 132], [MC + 1, 160], [MC, 196]])}"/>`;
  let papil = ""; { const RP = rng(9); for (let i = 0; i < 60; i++) { const x = 30 + RP() * 156, y = 136 + RP() * 60; if (!inPoly([x, y], [[18, 156], [40, 138], [76, 128], [MC, 126], [140, 128], [176, 138], [198, 156], [198, 200], [18, 200]])) continue; papil += `<circle class="sp-pap" cx="${f1(x)}" cy="${f1(y)}" r=".9"/>`; } }
  // dinții: incisivii, caninii și premolarii superiori, pe arcadă; incisivii inferiori jos
  const tooth = (x, y, w, h, a = 0) => `<rect class="sp-th" x="${f1(x - w / 2)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(w * 0.32)}" transform="rotate(${a} ${f1(x)} ${f1(y)})"/>`;
  const upper = [[MC - 7, 18, 13, 20, 0], [MC + 7, 18, 13, 20, 0], [MC - 19, 20, 10, 18, 8], [MC + 19, 20, 10, 18, -8], [MC - 30, 24, 10, 18, 18], [MC + 30, 24, 10, 18, -18], [MC - 41, 30, 10, 15, 30], [MC + 41, 30, 10, 15, -30], [MC - 50, 38, 10, 13, 42], [MC + 50, 38, 10, 13, -42]].map((a) => tooth(...a)).join("");
  const lower = [[MC - 6, 188, 9, 14, 180], [MC + 6, 188, 9, 14, 180], [MC - 16, 186, 8, 13, 172], [MC + 16, 186, 8, 13, 188]].map(([x, y, w, h, a]) => tooth(x, y + 12, w, h, a)).join("");
  const mouth = `<g clip-path="url(#__U__-mouth)"><rect class="sp-phx" x="0" y="0" width="216" height="216"/>${gran}${fossa}${tonsils}${pillars}${palate}${raphe}${rugae}<g class="sp-peg">${pete}</g><g class="sp-absg">${abscess}</g>${uvula}${tongue}${papil}${upper}${lower}</g>`;

  /* ======================= B. lupa pe cripta amigdaliană ======================= */
  const spot = [164, 106], small = 9;
  const lens = { c: [316, 108], r: 96 }, Lc = lens.c;
  const dd = Math.hypot(Lc[0] - spot[0], Lc[1] - spot[1]), base = Math.atan2(Lc[1] - spot[1], Lc[0] - spot[0]), phi = Math.acos((lens.r - small) / dd);
  const tang = [1, -1].map((sg) => { const a = base + Math.PI + sg * (Math.PI - phi); return [[spot[0] + Math.cos(a) * small, spot[1] + Math.sin(a) * small], [Lc[0] + Math.cos(a) * lens.r, Lc[1] + Math.sin(a) * lens.r]]; });
  const callout = `<circle class="sp-spot" cx="${spot[0]}" cy="${spot[1]}" r="${small}"/>` + tang.map(([a, b]) => `<path class="sp-call" d="M${P2(a)}L${P2(b)}"/>`).join("");
  const X = (dx) => Lc[0] + dx, Y = (dy) => Lc[1] + dy;
  // suprafața epiteliului (spre lumen): orizontală sus, apoi pereții criptei până la fund
  const surf = [[X(-120), Y(-58)], [X(-60), Y(-57)], [X(-24), Y(-56)], [X(-16), Y(-38)], [X(-11), Y(-6)], [X(-6), Y(26)], [X(2), Y(44)], [X(10), Y(28)], [X(14), Y(-6)], [X(19), Y(-38)], [X(28), Y(-56)], [X(62), Y(-57)], [X(120), Y(-58)]];
  const sS = sampleSmooth(surf, false, 10, 0.7);
  const sg0 = offset(sS, 5)[2][1] > sS[2][1] ? 1 : -1;            // semnul care duce spre țesut
  const T = 24;                                                    // grosimea epiteliului criptei (~15 µm, epiteliu reticulat)
  const layers = [0, 7, 15, T].map((d) => offset(sS, sg0 * d));
  const cum = [0]; for (let i = 1; i < sS.length; i++) cum.push(cum[i - 1] + Math.hypot(sS[i][0] - sS[i - 1][0], sS[i][1] - sS[i - 1][1]));
  const total = cum[cum.length - 1];
  const idxAt = (s) => { let i = cum.findIndex((c) => c >= s); return i < 0 ? sS.length - 1 : i; };
  let epi = "";
  const cellLen = [15, 11, 8];                                     // celule superficiale turtite, intermediare, bazale
  const RE = rng(21);
  const cutsOf = (L) => { const c = [0]; let s = (RE() * 0.5) * L; while (s < total) { c.push(s); s += L * (0.85 + RE() * 0.3); } c.push(total); return c; };
  const desq = [];
  for (let k = 0; k < 3; k++) {
    const cuts = cutsOf(cellLen[k]);
    for (let j = 0; j < cuts.length - 1; j++) {
      const i0 = idxAt(cuts[j]), i1 = idxAt(cuts[j + 1]); if (i1 <= i0) continue;
      const a = layers[k].slice(i0, i1 + 1), b = layers[k + 1].slice(i0, i1 + 1).reverse();
      const im = Math.round((i0 + i1) / 2), pm = layers[k][im], qm = layers[k + 1][im];
      const c = [(pm[0] + qm[0]) / 2, (pm[1] + qm[1]) / 2], ta = Math.atan2(sS[Math.min(i1, sS.length - 1)][1] - sS[i0][1], sS[Math.min(i1, sS.length - 1)][0] - sS[i0][0]) * 57.3;
      const nrx = [3.6, 2.8, 2.3][k], nry = [1.2, 2, 2.3][k];
      epi += `<path class="sp-ep l${k}" d="${poly([...a, ...b], true)}"/><ellipse class="sp-epn l${k}" cx="${f1(c[0])}" cy="${f1(c[1])}" rx="${nrx}" ry="${nry}" transform="rotate(${f1(ta)} ${f1(c[0])} ${f1(c[1])})"/>`;
      if (k === 0 && Math.abs(c[0] - Lc[0]) < 18 && c[1] > Y(-30)) desq.push({ c, a: ta });
    }
  }
  const bm = `<path class="sp-bm" d="${smooth(layers[3].filter((_, i) => i % 2 === 0))}"/>`;
  const lumenPoly = [...sS, [X(130), Y(-130)], [X(-130), Y(-130)]];
  const tissuePoly = [...layers[3], [X(130), Y(130)], [X(-130), Y(130)]];
  const lumen = `<path class="sp-lum" d="${poly(lumenPoly, true)}"/>`;
  // țesutul limfoid: un folicul cu centru germinativ, limfocite dense, un capilar, un macrofag
  const fol = { c: [X(-56), Y(50)], r: 26 };
  const capC = [X(46), Y(8)], capR = 9;
  const mac = { c: [X(58), Y(52)], r: 16 };
  const placed = [{ x: capC[0], y: capC[1], r: capR + 3 }, { x: mac.c[0], y: mac.c[1], r: mac.r + 2 }];
  const free = (x, y, r) => placed.every((q) => Math.hypot(q.x - x, q.y - y) > (q.r + r) * 0.86);
  let lymphs = "", gcCells = "";
  { const RL = rng(31); for (let t = 0; t < 9000 && placed.length < 260; t++) { const x = X(-100 + RL() * 200), y = Y(-40 + RL() * 140); if (Math.hypot(x - Lc[0], y - Lc[1]) > lens.r + 6) continue; if (!inPoly([x, y], tissuePoly)) continue; const inGc = Math.hypot(x - fol.c[0], y - fol.c[1]) < fol.r - 4; const r = inGc ? 5.8 : 5.4; if (!free(x, y, r)) continue; placed.push({ x, y, r }); if (inGc) gcCells += `<g class="sp-cb"><circle cx="${f1(x)}" cy="${f1(y)}" r="5.6"/><circle class="n" cx="${f1(x)}" cy="${f1(y)}" r="3.8"/><circle class="nl" cx="${f1(x + 1)}" cy="${f1(y - 1)}" r=".9"/></g>`; else lymphs += lym(x, y, RL); } }
  // limfocite în epiteliul reticulat al criptei
  let epiLy = ""; { const RL = rng(33); [[-14, -20], [-9, 10], [12, -24], [8, 12], [-20, -46], [22, -46], [-4, 34]].forEach(([dx, dy]) => { epiLy += lym(X(dx + (dx < 0 ? -6 : 6)), Y(dy), RL); }); }
  const capillary = `<g class="sp-capg" style="transform-origin:${f1(capC[0])}px ${f1(capC[1])}px"><circle class="sp-capw" cx="${f1(capC[0])}" cy="${f1(capC[1])}" r="${capR}"/><circle class="sp-capl" cx="${f1(capC[0])}" cy="${f1(capC[1])}" r="${capR - 2.4}"/><ellipse class="rbc" cx="${f1(capC[0] - 1)}" cy="${f1(capC[1] + 1)}" rx="4.6" ry="4.2"/><ellipse class="rbc-c" cx="${f1(capC[0] - 1)}" cy="${f1(capC[1] + 1)}" rx="1.8" ry="1.6"/><ellipse class="sp-capn" cx="${f1(capC[0] + capR - 1.2)}" cy="${f1(capC[1])}" rx="1" ry="2.6"/></g>`;
  const RB = rng(41);
  const macSvg = `<g class="sp-mac">${organ(smooth(lumpy(mac.c[0], mac.c[1], mac.r, 14, 0.14, 8), true), "mac-b")}<path class="mac-nuc" d="${smooth([[mac.c[0] - 9, mac.c[1] - 2], [mac.c[0] - 4, mac.c[1] - 7], [mac.c[0] + 1, mac.c[1] - 4], [mac.c[0] - 1, mac.c[1] + 1], [mac.c[0] - 6, mac.c[1] + 4]], true)}"/><circle class="mac-phago" cx="${f1(mac.c[0] + 5)}" cy="${f1(mac.c[1] + 4)}" r="6"/>${chain(mac.c[0] + 2, mac.c[1] + 3, 0.4, 3, RB, "in")}${[[mac.c[0] + 3, mac.c[1] + 9], [mac.c[0] + 9, mac.c[1] + 2]].map(([x, y]) => `<circle class="c3b" cx="${f1(x)}" cy="${f1(y)}" r="1.2"/>`).join("")}</g>`;
  const ckOut = cytokine("il1", X(52), Y(30), 0.8, "a") + cytokine("tnf", X(40), Y(26), 0.8, "b") + cytokine("il6", X(56), Y(20), 0.7, "c");
  // streptococii: aderați de celulele superficiale (pereții criptei, suprafața), apoi multiplicați în lumen
  const RC = rng(51);
  const adh = [[X(-18), Y(-44), 1.45, 5], [X(-12), Y(-14), 1.5, 6], [X(15), Y(-30), 1.65, 5], [X(-50), Y(-62), 0.05, 6], [X(46), Y(-62), -0.05, 6]].map(([x, y, a, n]) => chain(x, y, a, n, RC)).join("");
  const more = [[X(-4), Y(-40), 1.3, 7], [X(2), Y(-10), 1.7, 6], [X(-80), Y(-66), 0.1, 7], [X(70), Y(-68), 0.2, 6], [X(-30), Y(-74), -0.2, 8]].map(([x, y, a, n]) => chain(x, y, a, n, RC)).join("");
  const tox = [[X(-30), Y(-28)], [X(-24), Y(-10)], [X(28), Y(-24)], [X(32), Y(-4)], [X(-34), Y(8)], [X(20), Y(16)], [X(40), Y(-14)], [X(-40), Y(-20)]].map(([x, y], i) => toxin(x, y, i * 40)).join("");
  // neutrofilele: din capilar spre criptă, prin epiteliu, apoi în lumen, cu bacterii și celule descuamate: puroiul (exsudatul)
  const RN = rng(61);
  const ntWay = neutro(X(30), Y(16), RN) + neutro(X(18), Y(-12), RN, 1.5, 1.2) + neutro(X(-17), Y(10), RN, 1.5, -1.3);
  const pus = [[X(1), Y(-30)], [X(-2), Y(-2)], [X(3), Y(22)], [X(-6), Y(-48)], [X(8), Y(-46)]].map(([x, y]) => neutro(x, y, RN)).join("")
    + desq.slice(0, 3).map(({ c, a }, i) => `<g transform="translate(${f1(Lc[0] + (i - 1) * 4)} ${f1(c[1] - 6)}) rotate(${f1(a + 40)})"><path class="sp-ep l0 dq" d="M-7 -2.2Q0 -3.6 7 -2.2L7 2.2Q0 3.6 -7 2.2Z"/><ellipse class="sp-epn l0" rx="3" ry="1.1"/></g>`).join("")
    + [[X(-3), Y(-20), 1.4, 4], [X(4), Y(8), 1.8, 4], [X(-4), Y(32), 1.2, 3]].map(([x, y, a, n]) => chain(x, y, a, n, RC)).join("");
  // forma virală: celule superficiale balonizate, virioni pe suprafață, mai multe limfocite
  const balloon = [[X(-15), Y(-26)], [X(16), Y(-36)], [X(-46), Y(-60)], [X(48), Y(-60)], [X(-10), Y(4)]].map(([x, y]) => `<ellipse class="sp-bal" cx="${f1(x)}" cy="${f1(y)}" rx="7" ry="5"/><circle class="sp-baln" cx="${f1(x)}" cy="${f1(y)}" r="2.4"/>`).join("");
  const vir = [[X(-30), Y(-66)], [X(-24), Y(-70)], [X(-60), Y(-66)], [X(36), Y(-68)], [X(60), Y(-66)], [X(-6), Y(-40)], [X(4), Y(-24)], [X(-2), Y(10)], [X(30), Y(-72)], [X(-70), Y(-70)]].map(([x, y]) => virion(x, y)).join("");
  const lensSvg = `<g clip-path="url(#__U__-lens)"><rect class="sp-lp" x="${Lc[0] - lens.r}" y="${Lc[1] - lens.r}" width="${lens.r * 2}" height="${lens.r * 2}"/>`
    + `<circle class="sp-gc" cx="${f1(fol.c[0])}" cy="${f1(fol.c[1])}" r="${fol.r}"/>${gcCells}${lymphs}${capillary}${macSvg}${lumen}${epi}${bm}${epiLy}`
    + `<g class="sp-vir">${balloon}${vir}</g><g class="sp-adh">${adh}</g><g class="sp-more">${more}</g><g class="sp-tox">${tox}</g><g class="sp-ntw">${ntWay}</g><g class="sp-pus">${pus}</g><g class="sp-ck">${ckOut}</g></g>`
    + `<circle class="sp-lens" cx="${Lc[0]}" cy="${Lc[1]}" r="${lens.r}"/><circle class="sp-lens2" cx="${Lc[0]}" cy="${Lc[1]}" r="${lens.r - 3}"/>`;
  const sb = [222, 212];
  const scaleBar = `<path class="sp-sb" d="M${sb[0]} ${sb[1]}h${f1(20 * UM)}"/><text class="sp-sbt" x="${f1(sb[0] + 20 * UM + 4)}" y="${sb[1] + 2.4}" data-ui>20 µm</text>`;

  /* ======================= C. capul și gâtul din profil ======================= */
  const cardC = { x: 10, y: 222, w: 198, h: 186 };
  const head = [[118, 232], [150, 234], [176, 248], [192, 270], [196, 296], [190, 320], [178, 334], [176, 354], [180, 380], [186, 410], [110, 410], [112, 392], [108, 378], [106, 372], [100, 364], [88, 360], [78, 358], [72, 352], [72, 342], [70, 337], [72, 333], [68, 328], [70, 320], [66, 316], [58, 312], [58, 306], [66, 292], [72, 280], [70, 270], [72, 254], [84, 240], [100, 234]];
  const headD = smooth(head, true, 0.6);
  const ear = `<path class="sp-ear" d="${smooth([[150, 290], [156, 286], [160, 294], [160, 308], [156, 320], [150, 322], [147, 314], [149, 304], [147, 296]], true)}"/><path class="sp-ear2" d="${smooth([[151, 296], [155, 294], [156, 304], [153, 312], [150, 308]])}"/><circle class="sp-meat" cx="150.5" cy="306" r="1.6"/>`;
  const eye = `<path class="sp-eye" d="M80 286Q86 282 92 286Q86 289 80 286Z"/><path class="sp-brow" d="M78 279Q86 275 94 279"/>`;
  const nostril = `<path class="sp-nos" d="M62 309Q66 307 69 310"/>`;
  const lipsC = `<path class="sp-lipc" d="${smooth([[68, 328], [72, 325], [76, 328]])}"/>`;
  const jaw = `<path class="sp-jaw" d="${smooth([[80, 357], [110, 354], [136, 350], [142, 344], [144, 326]])}"/>`;
  const scm = `<path class="sp-scm" d="${smooth([[150, 324], [158, 332], [150, 368], [136, 404], [124, 410], [128, 380], [142, 344]], true, 0.6)}"/>`;
  // proiecțiile interne (translucide): sinusul maxilar, cavitatea nazală, trompa auditivă, urechea medie, faringele, amigdala
  const maxS = `<path class="sp-sinus" d="${smooth([[82, 294], [96, 292], [104, 300], [100, 312], [86, 312], [80, 304]], true)}"/>`;
  const phar = `<path class="sp-phar" d="${smooth([[110, 296], [124, 300], [126, 340], [124, 372], [114, 372], [112, 340], [106, 304]], true)}"/>`;
  const tube = `<path class="sp-tube" d="${smooth([[118, 304], [130, 302], [140, 302]])}"/>`;
  const midEar = `<circle class="sp-mear" cx="143" cy="303" r="4.2"/>`;
  const tonC = { c: [118, 332], rx: 4.6, ry: 7 };
  const tonSide = `<ellipse class="sp-tons" cx="${tonC.c[0]}" cy="${tonC.c[1]}" rx="${tonC.rx}" ry="${tonC.ry}"/>`;
  const abscC = `<ellipse class="sp-absl" cx="${tonC.c[0]}" cy="${tonC.c[1] - 6}" rx="7" ry="7.5"/>`;
  // ganglionii: jugulodigastric (sub unghiul mandibulei), laterocervicali anteriori (de-a lungul marginii anterioare a SCM), submandibular
  const nodes = [[136, 358, 1.2], [132, 372, 1], [128, 386, 0.95], [124, 398, 0.9], [104, 364, 0.85]];
  const nodeSvg = nodes.map(([x, y, k], i) => `<g class="sp-ln${i === 0 ? " jd" : ""}" style="transform-origin:${x}px ${y}px"><ellipse class="sp-lnh" cx="${x}" cy="${y}" rx="${f1(7.6 * k)}" ry="${f1(6 * k)}"/><ellipse class="sp-lnb" cx="${x}" cy="${y}" rx="${f1(3.6 * k)}" ry="${f1(2.6 * k)}"/>${i === 0 ? `<circle class="sp-lnp" cx="${x}" cy="${y}" r="1.4"/>` : ""}</g>`).join("");
  // rinoreea: mucoasă, groasă (bacterian) sau seroasă, apoasă (viral)
  const drip = (cls) => `<path class="${cls}" d="M63 311C61 316 64 319 63 323C62.4 326 66 326.6 65.6 323C65.2 320 66.4 316 65 311Z"/>`;
  const rhino = `<g class="sp-rm">${drip("sp-muc")}</g><g class="sp-rs">${drip("sp-ser")}<circle class="sp-ser" cx="66" cy="331" r="1.4"/></g>`;
  // picăturile Pflügge care ajung la gură și nas (contaminarea aerogenă)
  let drops = ""; { const RD = rng(71); for (let i = 0; i < 16; i++) { const x = 16 + RD() * 40, y = 298 + RD() * 38; drops += `<circle class="sp-drop" cx="${f1(x)}" cy="${f1(y)}" r="${f1(0.8 + RD() * 1.4)}"/>`; } }
  const headSvg = `<g clip-path="url(#__U__-cardC)"><path class="sp-skin" d="${headD}"/><path class="an-vol" d="${headD}"/>${scm}${jaw}${maxS}${phar}${tube}${midEar}${tonSide}<g class="sp-abl">${abscC}</g>${ear}${eye}${nostril}${lipsC}${nodeSvg}${rhino}<g class="sp-drops">${drops}</g><path class="sp-hedge" d="${headD}"/></g>`;

  /* ======================= D. complicațiile la distanță ======================= */
  const HT = heart({ origin: [226, 250], s: 0.36 });
  const ao = HT.aoAsc, aoTop = ao[ao.length - 1];
  const hstubs = vessels([{ pts: [...ao, [aoTop[0] + 0.5, aoTop[1] - 3], [aoTop[0] + 4, aoTop[1] - 5.5], [aoTop[0] + 9, aoTop[1] - 5]], w: 4.2, k: "a" }]) + vessels([{ pts: HT.pt.axis, w: 3.8, k: "p" }])
    + cutEnd([aoTop[0] + 9, aoTop[1] - 5], [1, 0.1], 4.2, "a") + cutEnd(HT.pt.top, [0.55, -0.85], 3.8, "p");
  // genunchiul din profil: femurul, tibia, rotula, capsula articulară (sinoviala), care se umflă în poliartrită
  const kx = 312, ky = 270;
  const knee = `<path class="sp-syn" d="${smooth(lumpy(kx, ky + 4, 14, 12, 0.08, 4), true)}"/>`
    + `<path class="sp-bone" d="${smooth([[kx - 7, ky - 26], [kx + 6, ky - 26], [kx + 7, ky - 10], [kx + 11, ky - 2], [kx + 4, ky + 3], [kx - 6, ky + 2], [kx - 10, ky - 4], [kx - 7, ky - 12]], true, 0.6)}"/>`
    + `<path class="sp-bone" d="${smooth([[kx - 11, ky + 8], [kx + 10, ky + 8], [kx + 7, ky + 16], [kx + 5, ky + 26], [kx - 5, ky + 26], [kx - 7, ky + 16]], true, 0.6)}"/>`
    + `<ellipse class="sp-bone" cx="${kx - 12}" cy="${ky - 2}" rx="3.4" ry="6"/><path class="sp-cart" d="M${kx - 9} ${ky + 7.5}H${kx + 9}M${kx - 8} ${ky + 2.6}Q${kx} ${ky + 4.6} ${kx + 8} ${ky + 1}"/>`;
  const KD = kidney({ origin: [356, 248], s: 0.42 });
  const distTitle = `<text class="sp-ti" x="222" y="236" data-ui>Complicații la distanță</text>`;
  const distCap = [[250, 304, "inima"], [312, 304, "articulațiile"], [372, 304, "rinichiul"]].map(([x, y, t]) => `<text class="sp-cap2" x="${x}" y="${y}" text-anchor="middle" data-ui>${t}</text>`).join("");
  const dist = `<g class="sp-dist">${hstubs}${HT.svg}${knee}${KD.svg}</g>${distCap}`;

  /* ======================= E. debutul: febra, rinoreea, formula leucocitară ======================= */
  const G = { x: 248, w: 152, y: 334, h: 60 };
  const gx = (d) => G.x + d / 4 * G.w, gy = (T) => G.y + G.h - (T - 36.5) / 3.3 * G.h;
  const bact = [[0, 36.9], [0.45, 37], [0.6, 38.4], [0.8, 39.4], [1.5, 39.5], [2.5, 39.2], [3.2, 38.4], [4, 37.6]].map(([d, T]) => [gx(d), gy(T)]);
  const vira = [[0, 36.9], [0.5, 37.3], [1.2, 37.8], [2, 38.1], [2.8, 38.0], [3.5, 37.6], [4, 37.3]].map(([d, T]) => [gx(d), gy(T)]);
  let ch = `<text class="sp-ti" x="222" y="${G.y - 10}" data-ui>Debutul (°C), pe 4 zile</text>`
    + [37, 38, 39].map((T) => `<path class="sp-grid" d="M${G.x} ${f1(gy(T))}H${G.x + G.w}"/><text class="sp-t" x="${G.x - 4}" y="${f1(gy(T) + 2.6)}" text-anchor="end" data-ui>${T}</text>`).join("")
    + `<path class="sp-ax" d="M${G.x} ${G.y}V${G.y + G.h}H${G.x + G.w}"/>` + [0, 1, 2, 3, 4].map((d) => `<text class="sp-t" x="${f1(gx(d))}" y="${G.y + G.h + 9}" text-anchor="middle" data-ui>${d}</text>`).join("")
    + `<text class="sp-t" x="${G.x + G.w}" y="${G.y + G.h + 18}" text-anchor="end" data-ui>zile de la primul simptom</text>`
    + `<path class="sp-cv v" d="${smooth(vira, false, 0.6)}"/><path class="sp-cv b" d="${smooth(bact, false, 0.6)}"/>`;
  // rinoreea: mucoasă înaintea febrei (bacterian), seroasă odată cu febra (viral)
  const rY = G.y + G.h + 32;
  ch += `<text class="sp-t l" x="222" y="${rY - 6}" data-ui>rinoree</text>`
    + `<rect class="sp-bar b" x="${f1(gx(0) - 0)}" y="${rY - 2}" width="${f1(gx(2.4) - gx(0))}" height="5" rx="2.5"/><path class="sp-on b" d="M${f1(gx(0.55))} ${G.y + 6}V${rY + 4}"/>`
    + `<rect class="sp-bar v" x="${f1(gx(0))}" y="${rY + 7}" width="${f1(gx(3) - gx(0))}" height="5" rx="2.5"/>`
    + `<text class="sp-t b" x="${f1(gx(2.4) + 4)}" y="${rY + 2.6}" data-ui>mucoasă</text><text class="sp-t v" x="${f1(gx(3) + 4)}" y="${rY + 11.6}" data-ui>seroasă</text>`;
  // formula leucocitară (bare 100%): neutrofilie în infecția bacteriană, limfocitoză în cea virală (exemple)
  const lY = rY + 30;
  const bar100 = (y, parts, cls) => { let x = G.x; return parts.map(([f, c]) => { const w = f * G.w; const s = `<rect class="sp-wbc ${c}" x="${f1(x)}" y="${y}" width="${f1(w)}" height="7"/>`; x += w; return s; }).join("") + `<rect class="sp-wbcf ${cls}" x="${G.x}" y="${y}" width="${G.w}" height="7"/>`; };
  ch += `<text class="sp-t l" x="222" y="${lY - 6}" data-ui>leucocite</text>`
    + `<text class="sp-t b" x="${G.x - 4}" y="${lY + 6}" text-anchor="end" data-ui>B</text>` + bar100(lY, [[0.84, "ne"], [0.1, "ly"], [0.06, "mo"]], "b")
    + `<text class="sp-t v" x="${G.x - 4}" y="${lY + 17}" text-anchor="end" data-ui>V</text>` + bar100(lY + 11, [[0.4, "ne"], [0.5, "ly"], [0.1, "mo"]], "v")
    + `<rect class="sp-wbc ne" x="${G.x}" y="${lY + 23}" width="6" height="6"/><text class="sp-t" x="${G.x + 9}" y="${lY + 28.4}" data-ui>neutrofile</text><rect class="sp-wbc ly" x="${G.x + 62}" y="${lY + 23}" width="6" height="6"/><text class="sp-t" x="${G.x + 71}" y="${lY + 28.4}" data-ui>limfocite</text>`;

  const frames = `<rect class="sp-card" x="${cardC.x}" y="${cardC.y}" width="${cardC.w}" height="${cardC.h}" rx="10"/><rect class="sp-card" x="214" y="222" width="198" height="88" rx="10"/><rect class="sp-card" x="214" y="316" width="198" height="${H - 322}" rx="10"/>`;

  return {
    W, H,
    defs: lyDefs + HT.defs + `<clipPath id="__U__-mouth"><path d="${open}"/></clipPath><clipPath id="__U__-lens"><circle cx="${Lc[0]}" cy="${Lc[1]}" r="${lens.r - 2}"/></clipPath><clipPath id="__U__-cardC"><rect x="${cardC.x}" y="${cardC.y}" width="${cardC.w}" height="${cardC.h}" rx="10"/></clipPath>`,
    L: { skin, mouth, lips, callout, lens: lensSvg, scaleBar, frames, head: headSvg, dist, distTitle, chart: ch },
    hits: {
      ton: { cx: 52, cy: 108, r: 22 }, phx: { x: 80, y: 66, w: 56, h: 32 }, uv: { cx: MC, cy: 84, r: 13 }, pet: { x: 76, y: 38, w: 64, h: 22 },
      adh: { cx: X(-16), cy: Y(-34), r: 16 }, tox: { cx: X(-34), cy: Y(-8), r: 14 }, pus: { cx: X(1), cy: Y(-10), r: 15 }, mac: { cx: mac.c[0], cy: mac.c[1], r: 20 }, cap: { cx: capC[0], cy: capC[1], r: 14 }, ntw: { cx: X(-17), cy: Y(10), r: 12 },
      ln: { cx: 132, cy: 372, r: 20 }, rh: { cx: 64, cy: 318, r: 11 }, ear: { cx: 143, cy: 303, r: 10 }, sin: { cx: 92, cy: 302, r: 12 }, abs: { cx: 118, cy: 328, r: 10 }, drops: { cx: 36, cy: 318, r: 18 },
      raa: { x: 220, y: 244, w: 116, h: 64 }, gn: { x: 348, y: 244, w: 58, h: 64 }, chart: { x: 218, y: 318, w: 190, h: H - 326 },
    },
    badges: {
      ton: [28, 118], phx: [MC + 22, 112], uv: [MC + 16, 98], pet: [62, 46],
      adh: [X(-44), Y(-36)], tox: [X(-58), Y(-6)], pus: [X(14), Y(54)], mac: [X(80), Y(34)], cap: [X(64), Y(-12)], ntw: [X(-36), Y(26)],
      ln: [150, 386], rh: [46, 326], ear: [166, 290], sin: [110, 288], abs: [100, 320], drops: [24, 290],
      raa: [284, 252], gn: [402, 252], chart: [400, 326],
    },
  };
}

export function preview(state = {}) {
  const A = build(), L = A.L, s = (x) => x.replaceAll("__U__", "pv");
  const st = state.st ?? 3;
  return { viewBox: `0 0 ${W} ${H}`, svg: s(`<defs>${A.defs}</defs><g class="spx" data-st="${st}">${L.skin}${L.mouth}${L.lips}${L.callout}${L.lens}${L.scaleBar}${L.frames}${L.head}${L.distTitle}${L.dist}${L.chart}</g>`) };
}
