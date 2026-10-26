// Modelul de timp al unei lecții în stil Khan, comun pentru verificare (tools/verify/lesson.mjs) și pentru player.
// Pentru fiecare frază: durata la ritmul vocii (WPM), momentul în care începe desenul (la cuvântul-cheie), durata acțiunii
// și cât așteaptă vocea după frază, ca desenul să se termine înainte de fraza următoare.
export const GAP = 0.5, TITLE = 2.5;                           // pauza dintre fraze și titlul capitolului, în secunde
export const words = (t) => t.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w));
const inner = (d) => (d.match(/«([^»]+)»/) || [, ""])[1];
const norm = (w) => w.toLowerCase().replace(/[^\p{L}\p{N}-]/gu, "");
export const actDur = ([type, desc]) => type === "trace" ? 4 : type === "arrow" ? 2.4 : type === "circle" ? 2.2 : type === "strike" ? 2 : Math.min(6, Math.max(2, inner(desc).length * 0.12));
// indicele cuvântului-cheie în frază (-1 dacă lipsește)
export const kwIndex = (t, kw) => words(t).findIndex((x) => norm(x).startsWith(norm(kw)));

export function plan(CH, WPM) {
  let T = 0;
  const chapters = CH.map((ch) => {
    const c = { id: ch.id, t0: T, lines: [] };
    T += TITLE;
    ch.lines.forEach((l) => {
      const w = words(l.t), dur = w.length / WPM * 60, ki = kwIndex(l.t, l.kw);
      const a0 = T + (Math.max(0, ki) / w.length) * dur, ad = actDur(l.a), a1 = a0 + ad, end = T + dur;
      const wait = Math.max(0, a1 + 0.3 - (end + GAP));          // vocea tace până se termină desenul, ca la Khan
      c.lines.push({ start: T, words: w.length, dur, ki, aOff: a0 - T, aDur: ad, wait, len: dur + GAP + wait });
      T = end + GAP + wait;
    });
    c.t1 = T;
    return c;
  });
  return { chapters, total: T };
}
