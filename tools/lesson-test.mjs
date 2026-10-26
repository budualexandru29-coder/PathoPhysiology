// Generează pagina testului de după lecție (dist/test-q<N>.html), publicată separat ca artifact cu bază de date:
// fiecare participant scrie din memorie răspunsul la întrebare, după o singură vizionare a lecției; punctele din barem se
// caută cu același motor ca în aplicație (evalRubric din src/js/00-core.js), iar participantul corectează onest ce n-a
// recunoscut robotul. Rezultatele se adună în colecția „results” (fiecare își scrie rândul lui; toți văd tabelul).
// Lecția trece dacă fiecare participant recuperează ≥ 80% din punctele baremului și nimeni nu spune că s-a pierdut.
// Folosire: node tools/lesson-test.mjs 15 [url-ul aplicației]
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const n = +(process.argv[2] || 15);
const app = process.argv[3] || "https://claude.ai/artifact/KkPQ3HuPQJeiuUU1PLUKUY";
const core = fs.readFileSync(path.join(root, "src/js/00-core.js"), "utf8");
// motorul baremului, exact cel din aplicație: de la normalizare până la scoreRubric
const engine = core.slice(core.indexOf("const GREEK"), core.indexOf("function countHits"));
const ctx = { Q: {}, FLOWS: {}, EXTRA: [], CH: [] }; vm.createContext(ctx);
for (const f of fs.readdirSync(path.join(root, "src/js")).filter((f) => /^1\d-ch.*\.js$/.test(f))) { try { vm.runInContext(fs.readFileSync(path.join(root, "src/js", f), "utf8"), ctx); } catch (e) { /* alte globale */ } }
const q = ctx.Q[n]; if (!q) throw new Error("nu găsesc Î" + n);
const L = (await import(pathToFileURL(path.join(root, `art/lessons/q${n}.board.mjs`)).href)).build();
const DATA = { n, s: q.s, rub: q.rub, app: app + "#q-" + n, chapters: L.chapters.map((c) => c.title), total: L.total, pass: 0.8 };
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

const html = `<title>Test Î${n} după lecție</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Caveat:wght@600&display=swap" rel="stylesheet">
<style>
:root{--paper:#F1F3F6;--sheet:#FFFFFF;--sheet2:#E8ECF1;--ink:#17202B;--muted:#56616E;--line:#D3DAE2;--pen:#2140A8;--pen-soft:#E2E8F8;--on-pen:#FFFFFF;--ok:#17744A;--ok-soft:#DCF1E5;--red:#C2352A;--red-soft:#FBE4E0;--board:#1d2125;--chalk:#F3F1EA;--chalk-y:#F5CF55}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--paper:#0E131A;--sheet:#161D27;--sheet2:#1D2531;--ink:#E6EBF1;--muted:#9AA5B3;--line:#2A3441;--pen:#93A9FF;--pen-soft:#1E2848;--on-pen:#0E1530;--ok:#5ED39A;--ok-soft:#133024;--red:#FF7D6E;--red-soft:#3A1F1C;color-scheme:dark}}
:root[data-theme="dark"]{--paper:#0E131A;--sheet:#161D27;--sheet2:#1D2531;--ink:#E6EBF1;--muted:#9AA5B3;--line:#2A3441;--pen:#93A9FF;--pen-soft:#1E2848;--on-pen:#0E1530;--ok:#5ED39A;--ok-soft:#133024;--red:#FF7D6E;--red-soft:#3A1F1C;color-scheme:dark}
*{box-sizing:border-box}
body{background:var(--paper);color:var(--ink);font:16px/1.55 'Archivo',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-block:20px 48px}
main{max-width:760px;margin:0 auto;display:flex;flex-direction:column;gap:16px}
.hero{background:var(--board);color:var(--chalk);border-radius:16px;padding:20px 22px;display:flex;flex-direction:column;gap:8px}
.hero .eb{font:600 1.35rem/1 'Caveat',cursive;color:var(--chalk-y)}
.hero h1{margin:0;font-size:1.55rem;line-height:1.25;text-wrap:balance}
.hero p{margin:0;color:#C9CED3;max-width:62ch}
.hero a{color:var(--chalk);font-weight:600}
.card{background:var(--sheet);border:1px solid var(--line);border-radius:14px;padding:18px;display:flex;flex-direction:column;gap:12px}
.card h2{margin:0;font-size:1.08rem;display:flex;gap:10px;align-items:center}
.card h2 i{font-style:normal;flex:none;width:26px;height:26px;border-radius:50%;display:inline-grid;place-items:center;background:var(--pen-soft);color:var(--pen);font-size:.85rem}
.hint{margin:0;color:var(--muted);font-size:.92rem;max-width:62ch}
label.f{display:flex;flex-direction:column;gap:6px;font-weight:600;font-size:.95rem}
input[type=text],textarea{font:inherit;color:var(--ink);background:var(--paper);border:1px solid var(--line);border-radius:10px;padding:10px 12px;width:100%}
textarea{min-height:220px;resize:vertical;line-height:1.5}
input:focus-visible,textarea:focus-visible,button:focus-visible,summary:focus-visible{outline:2px solid var(--pen);outline-offset:2px}
.row{display:flex;flex-wrap:wrap;gap:8px 18px}
.opt{display:flex;flex-direction:column;gap:6px}
.opt b{font-size:.95rem}
.seg{display:inline-flex;border:1px solid var(--line);border-radius:10px;overflow:hidden}
.seg label{padding:8px 14px;cursor:pointer;font-weight:600;font-size:.92rem;display:flex;align-items:center;min-height:40px}
.seg input{position:absolute;opacity:0;pointer-events:none}
.seg label:has(input:checked){background:var(--pen);color:var(--on-pen)}
.seg label:has(input:focus-visible){outline:2px solid var(--pen);outline-offset:-2px}
.btn{appearance:none;font:inherit;font-weight:650;border:1px solid var(--line);background:var(--sheet);color:var(--ink);border-radius:10px;padding:10px 16px;min-height:44px;cursor:pointer}
.btn.primary{background:var(--pen);border-color:var(--pen);color:var(--on-pen)}
.btn:disabled{opacity:.5;cursor:default}
.pts{display:flex;flex-direction:column;gap:12px}
.sec h3{margin:0 0 6px;font-size:.82rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
.pt{display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:start;padding:8px 10px;border-radius:10px;background:var(--paper)}
.pt input{width:20px;height:20px;margin-top:2px;accent-color:var(--pen)}
.pt span{line-height:1.4}
.pt small{font-size:.78rem;font-weight:600;padding:2px 8px;border-radius:999px;white-space:nowrap}
.pt small.y{background:var(--ok-soft);color:var(--ok)}
.pt small.n{background:var(--sheet2);color:var(--muted)}
.score{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap}
.score b{font-size:1.6rem;font-variant-numeric:tabular-nums}
.score span{color:var(--muted)}
.lost{display:none;flex-direction:column;gap:10px}
.lost.on{display:flex}
.chk{display:flex;flex-wrap:wrap;gap:6px 14px}
.chk label{display:flex;gap:6px;align-items:center;font-size:.92rem}
.chk input{accent-color:var(--pen)}
.msg{margin:0;padding:10px 12px;border-radius:10px;background:var(--sheet2);font-size:.92rem}
.msg.ok{background:var(--ok-soft);color:var(--ok)}
.msg.bad{background:var(--red-soft);color:var(--red)}
.code{font:500 .85rem/1.45 ui-monospace,'SFMono-Regular',Menlo,Consolas,monospace;background:var(--paper);border:1px dashed var(--line);border-radius:10px;padding:10px 12px;word-break:break-word;user-select:all}
.verdict{border-radius:14px;padding:16px 18px;display:flex;flex-direction:column;gap:4px;border:1px solid var(--line);background:var(--sheet)}
.verdict b{font-size:1.15rem}
.verdict.ok{background:var(--ok-soft);border-color:transparent;color:var(--ok)}
.verdict.bad{background:var(--red-soft);border-color:transparent;color:var(--red)}
.tw{overflow-x:auto}
table{border-collapse:collapse;width:100%;font-size:.92rem;min-width:520px}
th,td{text-align:left;padding:8px 10px;border-bottom:1px solid var(--line);vertical-align:top}
th{font-size:.78rem;letter-spacing:.05em;text-transform:uppercase;color:var(--muted);font-weight:650}
td.num{font-variant-numeric:tabular-nums;white-space:nowrap}
td details summary{cursor:pointer;color:var(--pen);font-weight:600}
td details p{margin:6px 0 0;white-space:pre-wrap;max-width:48ch}
.tag{display:inline-block;padding:1px 8px;border-radius:999px;font-size:.78rem;font-weight:650}
.tag.y{background:var(--ok-soft);color:var(--ok)} .tag.n{background:var(--red-soft);color:var(--red)}
[hidden]{display:none!important}
</style>
<main>
  <header class="hero">
    <span class="eb">Test după lecție · Î${n}</span>
    <h1>${esc(q.s)}</h1>
    <p>Vezi <a href="${esc(DATA.app)}" target="_blank" rel="noopener">lecția de pe tablă</a> o singură dată (${Math.floor(DATA.total / 60)} min ${Math.round(DATA.total % 60)} s), apoi, fără notițe, scrie aici tot ce-ți amintești, ca la examen. Lecția trece dacă fiecare participant recuperează cel puțin 80% din punctele baremului și nimeni nu spune că s-a pierdut.</p>
  </header>

  <section class="card" id="s1">
    <h2><i>1</i>Înainte</h2>
    <label class="f">Inițialele tale<input type="text" id="who" maxlength="12" autocomplete="off" placeholder="de ex. A.B."></label>
    <div class="row">
      <div class="opt"><b>Ai văzut lecția o singură dată?</b><div class="seg"><label><input type="radio" name="once" value="da">da, o dată</label><label><input type="radio" name="once" value="nu">nu</label></div></div>
      <div class="opt"><b>Cum ai urmărit-o?</b><div class="seg"><label><input type="radio" name="mode" value="voce">cu voce</label><label><input type="radio" name="mode" value="subtitlu">doar subtitlul</label></div></div>
    </div>
  </section>

  <section class="card" id="s2">
    <h2><i>2</i>Răspunsul, din memorie</h2>
    <p class="hint">Scrie în propoziții sau pe puncte, cum ai scrie la examen. Nu te uita în lecție sau în curs.</p>
    <textarea id="ans" aria-label="Răspunsul tău" placeholder="Pirogenii exogeni…"></textarea>
    <div><button class="btn primary" id="grade">Corectează după barem</button></div>
  </section>

  <section class="card" id="s3" hidden>
    <h2><i>3</i>Punctele din barem</h2>
    <p class="hint">Robotul caută cuvinte-cheie, ca în aplicație. Dacă ai scris ideea cu alte cuvinte, bifeaz-o; dacă a bifat ceva ce n-ai scris de fapt, debifeaz-o. Fii sincer: testul verifică lecția, nu pe tine.</p>
    <div class="pts" id="pts"></div>
    <div class="score"><b id="sc">0/0</b><span id="scw"></span></div>
  </section>

  <section class="card" id="s4" hidden>
    <h2><i>4</i>Te-ai pierdut undeva?</h2>
    <div class="seg"><label><input type="radio" name="lost" value="nu">nu, am urmărit tot</label><label><input type="radio" name="lost" value="da">da</label></div>
    <div class="lost" id="lostbox">
      <div class="chk" id="where">${DATA.chapters.map((c, i) => `<label><input type="checkbox" value="${i + 1}">${esc(c)}</label>`).join("")}</div>
      <label class="f">Unde anume și de ce? (o frază)<input type="text" id="why" maxlength="240" autocomplete="off"></label>
    </div>
    <div><button class="btn primary" id="send">Trimite rezultatul</button></div>
    <p class="msg" id="sent" hidden></p>
    <div id="codebox" hidden><p class="hint">Rezultatul nu s-a putut salva aici pentru contul tău. Copiază codul de mai jos și trimite-l celui care ți-a dat testul; el îl adaugă în tabel.</p><p class="code" id="code"></p><button class="btn" id="copy">Copiază codul</button></div>
  </section>

  <section class="card" id="res">
    <h2>Rezultatele</h2>
    <div class="verdict" id="verdict"><b>Încă nu sunt rezultate.</b><span>Ținta: tu și 2–3 colegi.</span></div>
    <div class="tw"><table><thead><tr><th>Cine</th><th>Puncte</th><th>Pierdut?</th><th>Vizionare</th><th>Răspuns</th></tr></thead><tbody id="rows"><tr><td colspan="5" class="hint">—</td></tr></tbody></table></div>
    <p class="hint" id="dbnote">Inițialele, punctele și răspunsul sunt vizibile celor care deschid testul.</p>
    <details id="paste" hidden><summary class="hint">Adaugă un cod primit de la un coleg</summary><div class="opt" style="margin-top:8px"><input type="text" id="pcode" autocomplete="off" aria-label="Codul primit"><div><button class="btn" id="padd">Adaugă</button></div><p class="msg" id="pmsg" hidden></p></div></details>
  </section>
</main>
<script>
${engine}
const DATA = ${JSON.stringify(DATA)};
const $ = (s) => document.querySelector(s);
const flat = []; DATA.rub.forEach(([sec, pts], i) => pts.forEach((p, j) => flat.push({ ref: i + ':' + j, sec, label: p[0], w: p[2] || 1 })));
const NEED = Math.ceil(DATA.pass * flat.length - 1e-9);
let auto = new Set(), got = new Set(), graded = false;

function grade() {
  const r = evalRubric(DATA.rub, $('#ans').value); auto = new Set(); r.secs.forEach((s, i) => s.pts.forEach((p, j) => { if (p.hit) auto.add(i + ':' + j); }));
  got = new Set(auto); graded = true;
  const box = $('#pts'); box.textContent = '';
  DATA.rub.forEach(([sec], i) => {
    const d = document.createElement('div'); d.className = 'sec'; const h = document.createElement('h3'); h.textContent = sec; d.append(h);
    flat.filter(p => p.ref.startsWith(i + ':')).forEach(p => {
      const l = document.createElement('label'); l.className = 'pt';
      const c = document.createElement('input'); c.type = 'checkbox'; c.checked = got.has(p.ref);
      c.onchange = () => { c.checked ? got.add(p.ref) : got.delete(p.ref); score(); };
      const s = document.createElement('span'); s.textContent = p.label;
      const t = document.createElement('small'); t.className = auto.has(p.ref) ? 'y' : 'n'; t.textContent = auto.has(p.ref) ? 'găsit' : 'negăsit';
      l.append(c, s, t); d.append(l);
    });
    box.append(d);
  });
  $('#s3').hidden = false; $('#s4').hidden = false; score();
}
function score() {
  const w = flat.reduce((a, p) => a + p.w, 0), gw = flat.filter(p => got.has(p.ref)).reduce((a, p) => a + p.w, 0);
  $('#sc').textContent = got.size + '/' + flat.length + ' puncte';
  $('#scw').textContent = Math.round(100 * got.size / flat.length) + '% · ponderat după barem ' + Math.round(100 * gw / w) + '% · pragul: ' + NEED + '/' + flat.length;
}
$('#grade').onclick = grade;
document.querySelectorAll('input[name=lost]').forEach(r => r.onchange = () => $('#lostbox').classList.toggle('on', r.value === 'da' && r.checked));

const val = (n) => (document.querySelector('input[name=' + n + ']:checked') || {}).value || '';
function result() {
  return { who: ($('#who').value || '').trim().slice(0, 12) || '?', got: [...got].sort(), auto: [...auto].sort(), n: flat.length, score: got.size,
    lost: val('lost') || 'nu', where: [...document.querySelectorAll('#where input:checked')].map(c => +c.value), why: ($('#why').value || '').trim().slice(0, 240),
    once: val('once'), mode: val('mode'), answer: $('#ans').value.slice(0, 6000), at: new Date().toISOString() };
}
const code = (r) => ['Î' + DATA.n + ' TEST', 'cine=' + r.who, 'puncte=' + r.score + '/' + r.n, 'barem=' + r.got.join(','), 'pierdut=' + r.lost, 'unde=' + r.where.join(','), 'vizionare=' + (r.once || '?'), 'mod=' + (r.mode || '?')].join(' · ');
function parse(s) {
  const m = {}; String(s).split('·').forEach(p => { const k = p.indexOf('='); if (k > 0) m[p.slice(0, k).trim()] = p.slice(k + 1).trim(); });
  const sc = /^(\\d+)\\/(\\d+)$/.exec(m.puncte || ''); if (!sc || !m.cine) return null;
  return { who: m.cine.slice(0, 12), score: +sc[1], n: +sc[2], got: (m.barem || '').split(',').filter(x => /^\\d+:\\d+$/.test(x)), auto: [], lost: m.pierdut === 'da' ? 'da' : 'nu',
    where: (m.unde || '').split(',').filter(Boolean).map(Number), why: '', once: m.vizionare === '?' ? '' : m.vizionare, mode: m.mod === '?' ? '' : m.mod, answer: '', at: new Date().toISOString(), manual: true };
}

let db = null, uid = null, owner = false;
function render(list) {
  const tb = $('#rows'); tb.textContent = '';
  if (!list.length) { const tr = document.createElement('tr'); const td = document.createElement('td'); td.colSpan = 5; td.className = 'hint'; td.textContent = 'Niciun rezultat încă.'; tr.append(td); tb.append(tr); }
  list.forEach(r => {
    const tr = document.createElement('tr');
    const td = (t, cls) => { const e = document.createElement('td'); if (cls) e.className = cls; if (t != null) e.textContent = t; tr.append(e); return e; };
    td(r.who + (r.manual ? ' (cod)' : ''));
    const p = td(null, 'num'); const pass = r.score >= Math.ceil(DATA.pass * r.n - 1e-9); const tg = document.createElement('span'); tg.className = 'tag ' + (pass ? 'y' : 'n'); tg.textContent = r.score + '/' + r.n + ' · ' + Math.round(100 * r.score / r.n) + '%'; p.append(tg);
    const l = td(null); const lt = document.createElement('span'); lt.className = 'tag ' + (r.lost === 'da' ? 'n' : 'y'); lt.textContent = r.lost === 'da' ? 'da' + (r.where && r.where.length ? ' (cap. ' + r.where.join(', ') + ')' : '') : 'nu'; l.append(lt);
    if (r.why) { const w = document.createElement('div'); w.className = 'hint'; w.textContent = r.why; l.append(w); }
    td((r.once === 'da' ? 'o dată' : r.once === 'nu' ? 'de mai multe ori' : '—') + (r.mode ? ', ' + (r.mode === 'voce' ? 'cu voce' : 'subtitlu') : ''));
    const a = td(null); if (r.answer) { const d = document.createElement('details'); const s = document.createElement('summary'); s.textContent = 'vezi'; const q = document.createElement('p'); q.textContent = r.answer; d.append(s, q); a.append(d); } else a.textContent = '—';
    tb.append(tr);
  });
  const v = $('#verdict'); v.className = 'verdict'; v.textContent = '';
  const b = document.createElement('b'), s = document.createElement('span'); v.append(b, s);
  if (!list.length) { b.textContent = 'Încă nu sunt rezultate.'; s.textContent = 'Ținta: tu și 2–3 colegi.'; return; }
  const low = list.filter(r => r.score < Math.ceil(DATA.pass * r.n - 1e-9)), lost = list.filter(r => r.lost === 'da'), many = list.filter(r => r.once === 'nu');
  const ok = !low.length && !lost.length;
  v.classList.add(ok ? 'ok' : 'bad');
  b.textContent = (ok ? 'Lecția trece' : 'Lecția nu trece') + ' (' + list.length + (list.length === 1 ? ' participant' : ' participanți') + ')';
  s.textContent = ok ? ('Toți au recuperat cel puțin ' + NEED + '/' + flat.length + ' puncte și nimeni nu s-a pierdut.' + (list.length < 3 ? ' Ținta e de 3–4 participanți.' : '') + (many.length ? ' Atenție: ' + many.length + ' au văzut lecția de mai multe ori.' : ''))
    : [low.length ? low.length + ' sub ' + NEED + '/' + flat.length + ' puncte' : '', lost.length ? lost.length + ' s-au pierdut' : ''].filter(Boolean).join('; ') + '.';
}
const isBad = (r) => !r || typeof r.score !== 'number' || typeof r.n !== 'number' || !r.n;
function listen() {
  db.collection('results').onSnapshot(snap => render(snap.docs.map(d => d.data()).filter(r => !isBad(r)).sort((a, b) => String(a.at).localeCompare(String(b.at)))), () => { $('#dbnote').textContent = 'Tabelul nu se poate încărca acum.'; });
}
function fallback(r) { $('#code').textContent = code(r); $('#codebox').hidden = false; }
$('#copy').onclick = async () => { const t = $('#code').textContent; try { await navigator.clipboard.writeText(t); $('#copy').textContent = 'Copiat'; } catch (e) { const g = document.createRange(); g.selectNodeContents($('#code')); const s = getSelection(); s.removeAllRanges(); s.addRange(g); $('#copy').textContent = 'Selectat: apasă Copiere'; } };
$('#send').onclick = async () => {
  if (!graded) grade();
  if (!val('lost')) { const m = $('#sent'); m.hidden = false; m.className = 'msg bad'; m.textContent = 'Răspunde întâi: te-ai pierdut undeva?'; return; }
  const r = result(), m = $('#sent'); m.hidden = false; m.className = 'msg'; m.textContent = 'Se salvează…'; $('#send').disabled = true;
  if (db && uid) {
    try { await db.collection('results').doc(uid).set(r); m.className = 'msg ok'; m.textContent = 'Salvat: ' + r.score + '/' + r.n + ' puncte. Mulțumesc!'; $('#codebox').hidden = true; $('#send').disabled = false; return; }
    catch (e) { /* contul nu poate scrie aici: codul */ }
  }
  m.className = 'msg'; m.textContent = 'Rezultatul tău: ' + r.score + '/' + r.n + ' puncte.'; fallback(r); $('#send').disabled = false;
};
$('#padd').onclick = async () => {
  const r = parse($('#pcode').value), m = $('#pmsg'); m.hidden = false;
  if (!r) { m.className = 'msg bad'; m.textContent = 'Codul nu are forma așteptată (Î' + DATA.n + ' TEST · cine=… · puncte=…/…).'; return; }
  try { await db.collection('results').doc('cod-' + Date.now().toString(36)).set(r); m.className = 'msg ok'; m.textContent = 'Adăugat: ' + r.who + ', ' + r.score + '/' + r.n + '.'; $('#pcode').value = ''; }
  catch (e) { m.className = 'msg bad'; m.textContent = 'Nu s-a putut adăuga.'; }
};
(async () => {
  if (!window.claude || !claude.use) { $('#dbnote').textContent = 'Tabelul comun funcționează doar în pagina publicată; aici primești un cod la trimitere.'; return; }
  const [d, u] = await Promise.all([claude.use('db'), claude.use('user')]);
  db = d; if (!db) { $('#dbnote').textContent = 'Tabelul comun nu e disponibil pentru tine aici; la trimitere primești un cod.'; return; }
  if (u) { uid = await u.id(); owner = await u.isOwner(); }
  if (owner) $('#paste').hidden = false;
  listen();
})();
</script>
`;
const out = path.join(root, `dist/test-q${n}.html`);
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html);
console.log(out, (Buffer.byteLength(html) / 1024).toFixed(1) + " KB", `${DATA.rub.reduce((a, s) => a + s[1].length, 0)} puncte, pragul ${Math.ceil(0.8 * DATA.rub.reduce((a, s) => a + s[1].length, 0))}`);
