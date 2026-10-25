// Piesele de desen ale atlasului (vase, organe, capete secționate) ca șiruri SVG.
// Culorile și grosimile vin din CSS (src/css/30-atlas.css), ca desenul să urmeze tema paginii.
import { smooth, sampleSmooth, along, P, r1, poly, ellipse } from "./geo.mjs";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Un arbore de vase desenat în patru treceri (perete, sânge, umbră, luciu), ca ramificațiile să se
 * contopească fără cusături. vs: [{ pts, w, k: 'a'|'v'|'c'|'p', cls, d }] — d (opțional) înlocuiește curba.
 * w = diametrul vasului în px; grosimea reală se calculează în CSS din --w și --k (dilatare, volum).
 */
export function vessels(vs, { cls = "" } = {}) {
  const ds = vs.map((v) => v.d || smooth(v.pts, false, v.tension ?? 1));
  const kinds = [...new Set(vs.map((v) => v.k))];
  // fiecare tip de vas (arteră, venă, capilar) are trecerile lui, în grupuri cu clasa tipului
  return kinds.map((k) => {
    const idx = vs.map((v, i) => (v.k === k ? i : -1)).filter((i) => i >= 0);
    // umbra și luciul se opresc puțin înainte de capete, ca la joncțiuni să nu treacă peste vasul în care se varsă
    const p = (name) => idx.map((i) => `<path class="an-v${name}${vs[i].cls ? " " + vs[i].cls : ""}" d="${ds[i]}" style="--w:${vs[i].w}"${name === "d" || name === "s" ? ' pathLength="100"' : ""}/>`).join("");
    return `<g class="an-vt ${k}${cls ? " " + cls : ""}">${p("w")}${p("b")}${p("d")}${p("s")}</g>`;
  }).join("");
}

/** Capăt de vas secționat: elipsa peretelui cu lumenul (convenția atlaselor pentru un vas tăiat). */
export function cutEnd(at, dir, w, k = "a") {
  const ang = Math.atan2(dir[1], dir[0]) * 180 / Math.PI;
  const rx = w * 0.26, ry = w * 0.5 + 0.8;
  return `<g class="an-cut ${k}" transform="translate(${r1(at[0])} ${r1(at[1])}) rotate(${r1(ang)})"><ellipse class="an-cw" rx="${r1(rx + 0.7)}" ry="${r1(ry)}"/><ellipse class="an-cl" rx="${r1(rx * 0.62)}" ry="${r1(ry * 0.7)}"/></g>`;
}

/** Organ: forma plină + umbrirea volumului (gradient radial comun) + contur. */
export function organ(d, cls, { vol = true, extra = "" } = {}) {
  return `<path class="${cls}" d="${d}"/>${vol ? `<path class="an-vol" d="${d}"/>` : ""}${extra}`;
}

/** Linie de flux (punctele care curg) pe linia mediană a unui vas. */
export function flowPath(pts, cls) { return `<path class="flow ${cls}" d="${smooth(pts)}"/>`; }

/** Puncte (de exemplu nuclei, pori) ca cercuri mici. */
export function dots(pts, r, cls) { return pts.map(([x, y]) => `<circle class="${cls}" cx="${r1(x)}" cy="${r1(y)}" r="${r1(r)}"/>`).join(""); }

/** Text de ecran (doar în ferestre de aparate). */
export function screenText(x, y, s, cls) { return `<text class="${cls}" x="${r1(x)}" y="${r1(y)}" data-ui>${esc(s)}</text>`; }

/**
 * Definițiile comune (gradienți), inserate o singură dată în pagină. Gradientul de volum e alb→transparent→negru,
 * în unități relative la fiecare formă, deci merge peste orice culoare și în ambele teme.
 */
export const DEFS = `<svg class="an-defs" aria-hidden="true" focusable="false" width="0" height="0" style="position:absolute;width:0;height:0;overflow:hidden">
<defs>
<radialGradient id="an-vol" cx=".36" cy=".3" r=".86" fx=".32" fy=".24"><stop offset="0" stop-color="#fff" stop-opacity=".42"/><stop offset=".38" stop-color="#fff" stop-opacity=".06"/><stop offset=".62" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".34"/></radialGradient>
<radialGradient id="an-vol-soft" cx=".4" cy=".34" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".26"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></radialGradient>
<radialGradient id="an-glow"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".5" stop-color="#fff" stop-opacity=".25"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
<linearGradient id="an-fade-down" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".7" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
<mask id="an-mask-down" maskContentUnits="objectBoundingBox"><rect width="1" height="1" fill="url(#an-fade-down)"/></mask>
<linearGradient id="an-fade-up" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
</defs></svg>`;

export { smooth, sampleSmooth, along, P, r1, poly, ellipse };
