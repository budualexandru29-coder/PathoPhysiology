// Acoperirea baremului de către figurile interactive.
// Pentru fiecare întrebare Î1–Î38, fiecare punct din barem (Q[n].rub) trebuie să fie legat de cel puțin o parte
// a unei figuri interactive (FX.specs[k].parts[id].q[n] conține „secțiune:punct”). Scriptul raportează:
//  - punctele acoperite și figura/partea care le acoperă;
//  - punctele neacoperite (cu justificarea din JUSTIFY, dacă există);
//  - trimiterile stricate (o parte trimite la un punct care nu există în barem).
// Folosire: node tools/verify/coverage.cjs [index.html] [--md raport.md] [--json raport.json] [--max 22]
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

// lipsuri acceptate, cu motivul (se completează doar cu decizii explicite)
const JUSTIFY = {};

(async () => {
  const args = process.argv.slice(2);
  const file = path.resolve(args.find(a => a.endsWith('.html')) || 'index.html');
  const opt = k => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
  const maxQ = +(opt('--max') || 38);
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('file://' + file);
  await p.waitForTimeout(800);
  const data = await p.evaluate(() => {
    const qs = {};
    for (let n = 1; n <= 38; n++) if (Q[n]) qs[n] = { s: Q[n].s, rub: Q[n].rub.map(([sec, pts]) => [sec, pts.map(pt => [pt[0], pt[2] || 1])]) };
    const refs = [];
    Object.entries(FX.specs).forEach(([key, spec]) => Object.entries(spec.parts).forEach(([id, part]) => {
      Object.entries(part.q || {}).forEach(([n, list]) => list.forEach(r => refs.push({ key, id, n: +n, r, t: part.t })));
    }));
    return { qs, refs };
  });
  await b.close();

  const rows = [], broken = [];
  let tot = 0, cov = 0, totW = 0, covW = 0;
  for (let n = 1; n <= maxQ; n++) {
    const q = data.qs[n]; if (!q) continue;
    q.rub.forEach(([sec, pts], si) => pts.forEach(([label, w], pi) => {
      const ref = `${si}:${pi}`;
      const by = data.refs.filter(x => x.n === n && x.r === ref);
      tot++; totW += w;
      if (by.length) { cov++; covW += w; }
      rows.push({ n, ref, sec, label, w, by: by.map(x => `${x.key}:${x.id}`), why: by.length ? '' : (JUSTIFY[`${n}/${ref}`] || '') });
    }));
  }
  data.refs.forEach(x => {
    const q = data.qs[x.n]; const [si, pi] = x.r.split(':').map(Number);
    if (!q || !q.rub[si] || !q.rub[si][1][pi]) broken.push(x);
  });

  const perQ = {};
  rows.forEach(r => { const o = perQ[r.n] || (perQ[r.n] = { t: 0, c: 0 }); o.t++; if (r.by.length) o.c++; });
  const pct = (a, b) => (b ? (100 * a / b).toFixed(1) : '0.0') + '%';
  console.log(`Puncte din barem (Î1–Î${maxQ}): ${cov}/${tot} acoperite (${pct(cov, tot)}); ponderat: ${pct(covW, totW)}`);
  console.log('Pe întrebări: ' + Object.entries(perQ).map(([n, o]) => `Î${n} ${o.c}/${o.t}`).join(' · '));
  const miss = rows.filter(r => !r.by.length);
  if (miss.length) { console.log(`\nNeacoperite (${miss.length}):`); miss.forEach(r => console.log(`  Î${r.n} [${r.ref}] ${r.sec} → ${r.label}${r.why ? '  — justificare: ' + r.why : ''}`)); }
  if (broken.length) { console.log(`\nTrimiteri stricate (${broken.length}):`); broken.forEach(x => console.log(`  ${x.key}:${x.id} → Î${x.n} ${x.r}`)); }

  if (opt('--json')) fs.writeFileSync(opt('--json'), JSON.stringify({ rows, broken, perQ }, null, 1));
  if (opt('--md')) {
    let md = `# Acoperirea baremului\n\n${cov}/${tot} puncte acoperite (${pct(cov, tot)}).\n\n`;
    for (let n = 1; n <= maxQ; n++) {
      const rs = rows.filter(r => r.n === n); if (!rs.length) continue;
      md += `## Î${n}. ${data.qs[n].s} (${perQ[n].c}/${perQ[n].t})\n\n| Punct | Secțiune | Barem | Figura:partea |\n|---|---|---|---|\n`;
      rs.forEach(r => { md += `| ${r.ref} | ${r.sec} | ${r.label} | ${r.by.length ? r.by.join(', ') : '**LIPSĂ**' + (r.why ? ' (' + r.why + ')' : '')} |\n`; });
      md += '\n';
    }
    fs.writeFileSync(opt('--md'), md);
  }
  process.exitCode = miss.filter(r => !r.why).length || broken.length ? 1 : 0;
})();
