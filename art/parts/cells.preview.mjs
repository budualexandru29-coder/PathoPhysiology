// Planșa bibliotecii: toate celulele la aceeași scară (k px/µm), apoi moleculele la aceeași scară (kn px/nm).
// node art/preview.mjs art/parts/cells.preview.mjs shots/cells.html [--light]
import * as C from "./cells.mjs";

const T = (x, y, s, a = "middle") => `<text x="${x}" y="${y}" text-anchor="${a}" class="lc-lab" data-ui>${s}</text>`;
export function preview() {
  const k = 6, row1 = 70, row2 = 200;
  const cells = [
    ["hematie", 7.6, (x, y) => C.rbc(x, y, k)],
    ["hematie (profil)", 7.6, (x, y) => C.rbc(x, y, k, { edge: true })],
    ["trombocit", 3, (x, y) => C.platelet(x, y, k)],
    ["limfocit mic B", 7.5, (x, y) => C.lymphocyte(x, y, k, { kind: "B" })],
    ["limfocit mic T", 7.5, (x, y) => C.lymphocyte(x, y, k, { kind: "T", seed: 9 })],
    ["neutrofil", 12, (x, y) => C.neutrophil(x, y, k)],
    ["eozinofil", 12, (x, y) => C.eosinophil(x, y, k)],
  ];
  const cells2 = [
    ["bazofil", 13, (x, y) => C.basophil(x, y, k)],
    ["mastocit", 13, (x, y) => C.mastCell(x, y, k)],
    ["mastocit degranulat", 13, (x, y) => C.mastCell(x, y, k, { degran: 1, seed: 11 })],
    ["monocit", 16, (x, y) => C.monocyte(x, y, k)],
    ["plasmocit", 18, (x, y) => C.plasmaCell(x, y, k)],
    ["macrofag", 21, (x, y) => C.macrophage(x, y, k)],
  ];
  let s = "", x = 30;
  for (const [n, d, f] of cells) { const r = d * k / 2; x += r; s += f(x, row1) + T(x, row1 + 62, n) + T(x, row1 + 74, d + " µm"); x += r + 34; }
  x = 30;
  for (const [n, d, f] of cells2) { const r = d * k / 2; x += r; s += f(x, row2) + T(x, row2 + 78, n) + T(x, row2 + 90, d + " µm"); x += r + 28; }
  s += C.scaleBar(30, 318, k, 10);
  // moleculele: kn = 6 px/nm
  const kn = 6, y3 = 470;
  s += C.antibody(80, y3, kn, { iso: "G" }) + T(80, y3 + 70, "IgG (1IGT)") + T(80, y3 + 82, "16 nm");
  s += C.antibody(210, y3, kn, { iso: "E" }) + T(210, y3 + 82, "IgE") + T(210, y3 + 94, "un CH în plus, fără balama");
  s += C.igmPentamer(420, y3 - 30, kn * 0.55) + T(420, y3 + 70, "IgM pentamer (2RCJ)") + T(420, y3 + 82, "37 nm, la 0,55×");
  s += C.igaDimer(620, y3 - 20, kn * 0.6) + T(620, y3 + 70, "IgA dimer + J + CS (6UE7)") + T(620, y3 + 82, "la 0,6×");
  s += C.c1q(790, y3 + 30, kn * 0.7) + T(790, y3 + 70, "C1q + C1r₂s₂") + T(790, y3 + 82, "cap 5,4 nm (1PK6), 0,7×");
  const y4 = 640;
  s += C.bilayer(30, 500, y4, kn * 0.8, { step: 1.2 });
  s += C.mhc(80, y4, kn * 0.8) + T(80, y4 + 66, "MHC I (3HLA)") + C.mhc(170, y4, kn * 0.8, { cls2: 2 }) + T(170, y4 + 66, "MHC II (1DLH)");
  s += C.tlr(258, y4, kn * 0.8, { tone: "t4", md2: true }) + C.tlr(302, y4, kn * 0.8, { tone: "t4", flip: true, md2: true }) + T(280, y4 + 66, "TLR4–MD-2 dimer");
  s += C.tlr(380, y4, kn * 0.8, { tone: "t2" }) + C.tlr(420, y4, kn * 0.8, { tone: "t6", flip: true }) + T(400, y4 + 66, "TLR2:TLR6");
  s += C.crp(600, y4 - 30, kn) + T(600, y4 + 24, "PCR (1B09) ~10 nm");
  s += C.scaleBar(30, y4 + 90, kn, 10, "10 nm (rândul de sus)") + C.scaleBar(300, y4 + 90, kn * 0.8, 10, "10 nm (membrana)");
  s += C.antibody(760, y4 - 20, 1, { iso: "G" }) + T(760, y4 + 24, "IgG la 1 px/nm");
  return { viewBox: "0 0 900 750", svg: `<style>.lc-lab{font:500 10px system-ui;fill:var(--ink)} .lc-mem{stroke:#c9a46a;stroke-width:4;fill:none}</style>${s}` };
}
