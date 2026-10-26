// Etichetele „de manual”: textul stă lângă structură, iar o linie subțire pleacă de lângă text și se termină într-un punct
// pe structură. Fără numere în cerculețe. Textul e în fontul paginii; culorile sunt fixe, pentru că planșele sunt deschise
// la culoare în ambele teme (ca o pagină tipărită). CSS: src/css/31-cells.css (.pl-*).
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const f1 = (v) => (+v).toFixed(1);
export const FS = 8.2;

/**
 * text: una sau mai multe linii (separate prin \n); at: [x, y] punctul de pe structură (sau null, fără linie);
 * to: [x, y] linia de bază a primului rând; anchor: 'start' | 'end' | 'middle'; via: un cot opțional al liniei.
 * Întoarce { s: SVG, box: [x, y, w, h] } — box e zona apăsabilă a textului.
 */
export function callout(text, at, to, { anchor = "start", via = null, cls = "", fs = FS } = {}) {
  const lines = String(text).split("\n"), lh = fs * 1.2, [lx, ly] = to;
  const w = Math.max(...lines.map((l) => l.length)) * fs * 0.52;
  const x0 = anchor === "start" ? lx : anchor === "end" ? lx - w : lx - w / 2, y0 = ly - fs * 0.85;
  const h = lines.length * lh;
  let lead = "";
  if (at) {
    const [tx, ty] = at, mid = y0 + h / 2 - 1;
    const sx = anchor === "start" ? lx - 2.5 : anchor === "end" ? lx + 2.5 : lx;
    const sy = anchor === "middle" ? (ty > ly ? y0 + h + 1.5 : y0 - 1.5) : (lines.length > 1 ? ly - fs * 0.32 : mid);
    const pts = [[sx, sy], ...(via ? [via] : []), [tx, ty]];
    lead = `<path class="pl-ln" d="M${pts.map(([x, y]) => `${f1(x)} ${f1(y)}`).join("L")}"/><circle class="pl-dot" cx="${f1(tx)}" cy="${f1(ty)}" r="1.15"/>`;
  }
  const t = `<text class="pl-t" x="${f1(lx)}" y="${f1(ly)}" text-anchor="${anchor}" font-size="${fs}">${lines.map((l, i) => `<tspan x="${f1(lx)}" dy="${i ? f1(lh) : 0}">${esc(l)}</tspan>`).join("")}</text>`;
  return { s: `<g class="pl ${cls}">${lead}${t}</g>`, box: [x0 - 2, y0 - 2, w + 4, h + 3] };
}

/** Titlul unui panou: litera (A, B…) și o descriere scurtă. */
export function panelTitle(x, y, letter, text, sub = "") {
  return `<text class="pl-h" x="${f1(x)}" y="${f1(y)}"><tspan class="pl-hk">${esc(letter)}</tspan><tspan dx="5">${esc(text)}</tspan>${sub ? `<tspan class="pl-sub" dx="6">${esc(sub)}</tspan>` : ""}</text>`;
}

/** Clasele de vizibilitate pe pași: elementul se vede doar la pașii dați (CSS: [data-st="n"] .vs.vn). */
export const vis = (steps) => `vs ${steps.map((n) => "v" + n).join(" ")}`;
