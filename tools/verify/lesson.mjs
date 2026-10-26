// Verificarea scenariului unei lecții în stil Khan (art/lessons/qN.script.mjs) și timpii lui.
// Pentru fiecare frază: durata la ritmul vocii (WPM), momentul în care începe desenul (cuvântul-cheie), durata acțiunii.
// Verifică: fiecare frază are exact o acțiune; acțiunea durează 2–6 s; vocea așteaptă cât se termină desenul (cel mult 3 s);
// capitolele țin 60–120 s, cu un ritm mediu de 120–160 de cuvinte pe minut; fiecare punct din barem are cel puțin o frază.
// Folosire: node tools/verify/lesson.mjs 15 [--json out.json]
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { pathToFileURL, fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const n = +(process.argv[2] || 15);
const S = await import(pathToFileURL(path.join(root, `art/lessons/q${n}.script.mjs`)).href);
// baremul, din fișierele cu întrebări
const ctx = { Q: {} }; vm.createContext(ctx);
for (const f of fs.readdirSync(path.join(root, "src/js")).filter((f) => /^1\d-ch.*\.js$/.test(f))) { try { vm.runInContext(fs.readFileSync(path.join(root, "src/js", f), "utf8"), ctx); } catch (e) { /* fișierele pot folosi alte globale; baremul e simplu */ } }
const rub = ctx.Q[n] && ctx.Q[n].rub; if (!rub) { console.error("nu găsesc baremul Î" + n); process.exit(2); }
const refs = []; rub.forEach(([sec, pts], i) => pts.forEach((p, j) => refs.push({ ref: `${i}:${j}`, sec, label: p[0] })));

const GAP = 0.5, TITLE = 2.5;                                  // pauza dintre fraze și titlul capitolului, în secunde
const words = (t) => t.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w));
const inner = (d) => (d.match(/«([^»]+)»/) || [, ""])[1];
const actDur = ([type, desc]) => type === "trace" ? 4 : type === "arrow" ? 2.4 : type === "circle" ? 2.2 : type === "strike" ? 2 : Math.min(6, Math.max(2, inner(desc).length * 0.12));
const out = { q: n, wpm: S.WPM, chapters: [], problems: [], cover: {} };
let T = 0;
for (const ch of S.CH) {
  const c = { id: ch.id, title: ch.title, t0: T, lines: [] };
  T += TITLE;
  ch.lines.forEach((l, i) => {
    const w = words(l.t), dur = w.length / S.WPM * 60;
    const ki = w.findIndex((x) => x.toLowerCase().replace(/[^\p{L}\p{N}-]/gu, "").startsWith(l.kw.toLowerCase().replace(/[^\p{L}\p{N}-]/gu, "")));
    if (!Array.isArray(l.a) || l.a.length !== 3 || typeof l.a[0] !== "string") out.problems.push(`${ch.id}.${i + 1}: nu are exact o acțiune`);
    if (ki < 0) out.problems.push(`${ch.id}.${i + 1}: cuvântul-cheie „${l.kw}” nu e în frază`);
    const a0 = T + (Math.max(0, ki) / w.length) * dur, ad = actDur(l.a), a1 = a0 + ad, end = T + dur;
    if (ad < 2 || ad > 6) out.problems.push(`${ch.id}.${i + 1}: acțiunea durează ${ad.toFixed(1)} s (în afara 2–6 s)`);
    const wait = Math.max(0, a1 + 0.3 - (end + GAP));            // vocea tace până se termină desenul, ca la Khan
    if (wait > 3) out.problems.push(`${ch.id}.${i + 1}: vocea ar aștepta ${wait.toFixed(1)} s după frază (mută cuvântul-cheie mai devreme)`);
    if (!S.COLORS[l.a[2]]) out.problems.push(`${ch.id}.${i + 1}: culoare necunoscută ${l.a[2]}`);
    (l.rub || []).forEach((r) => { (out.cover[r] = out.cover[r] || []).push(`${ch.id}.${i + 1}`); });
    c.lines.push({ n: `${ch.id.slice(1)}.${i + 1}`, t: l.t, words: w.length, start: +T.toFixed(1), dur: +dur.toFixed(1), act: l.a, kw: l.kw, aStart: +a0.toFixed(1), aDur: +ad.toFixed(1), wait: +wait.toFixed(1), rub: l.rub || [], src: l.src });
    T = end + GAP + wait;
  });
  c.t1 = T; c.dur = +(c.t1 - c.t0).toFixed(1);
  c.words = c.lines.reduce((s, l) => s + l.words, 0); c.wpm = +(c.words / (c.dur / 60)).toFixed(0);
  if (c.dur < 60 || c.dur > 120) out.problems.push(`${ch.id}: capitolul ține ${c.dur} s (ținta 60–120 s)`);
  if (c.wpm < 120 || c.wpm > 160) out.problems.push(`${ch.id}: ritmul mediu e ${c.wpm} cuvinte/min (ținta 120–160)`);
  out.chapters.push(c);
}
out.total = +T.toFixed(1);
const missing = refs.filter((r) => !out.cover[r.ref]);
missing.forEach((r) => out.problems.push(`barem ${r.ref} (${r.sec} → ${r.label}) nu are nicio frază`));
out.refs = refs.map((r) => ({ ...r, lines: out.cover[r.ref] || [] }));
const nl = out.chapters.reduce((s, c) => s + c.lines.length, 0), ad = out.chapters.flatMap((c) => c.lines.map((l) => l.aDur));
console.log(`Î${n}: ${out.chapters.length} capitole, ${nl} fraze, ${nl} acțiuni de desen; ${Math.floor(out.total / 60)} min ${Math.round(out.total % 60)} s`);
out.chapters.forEach((c) => console.log(`  ${c.title}: ${c.dur} s, ${c.lines.length} fraze, ${c.words} cuvinte (${c.wpm} cuvinte/min cu pauzele)`));
console.log(`  acțiunile: ${Math.min(...ad).toFixed(1)}–${Math.max(...ad).toFixed(1)} s; baremul: ${refs.length - missing.length}/${refs.length} puncte cu frază`);
console.log(out.problems.length ? "PROBLEME:\n  " + out.problems.join("\n  ") : "fără probleme");
const j = process.argv.indexOf("--json"); if (j > 0) fs.writeFileSync(process.argv[j + 1], JSON.stringify(out, null, 1));
process.exitCode = out.problems.length ? 1 : 0;
