// Auditul figurilor interactive, pe pagina construită (index.html).
// Pentru fiecare figură: erori JS, toate modurile se deschid, depășiri pe telefon (390 px), capturi în ambele teme
// și cu simularea deuteranopiei/protanopiei, plus dimensiunile celulelor raportate la hematie (rigla internă:
// diametrul hematiei 7,5–7,8 µm; Junqueira ed. 13, cap. 12; Ross & Pawlina ed. 7, cap. 10).
// Celulele din biblioteca comună se măsoară direct în µm, din scara pe care o poartă (data-k).
// Folosire: node tools/verify/figs.cjs [index.html] [--out shots/audit] [--only circ,fever] [--no-shots]
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const FIGS = { circ: 1, head: 2, hyper: 3, hypomech: 4, cold: 5, thermolysis: 7, tgen: 8, coldloc: 9, fever: 11, fevcons: 12, noninf: 13, pyro: 15, hodgkin: 16, strep: 18, inflcause: 21, apr: 22, inflam: 27 };
// diametrul celulei / diametrul hematiei, din manual (fără toleranță); toleranța de ±20% se aplică la capete
const RATIO = {
  neut: [10 / 7.8, 15 / 7.5, 'neutrofil 10–15 µm (Ross cap. 10; Junqueira cap. 12)'],
  eo: [10 / 7.8, 15 / 7.5, 'eozinofil ≈ neutrofil (Ross cap. 10)'],
  baso: [12 / 7.8, 15 / 7.5, 'bazofil 12–15 µm (Junqueira cap. 12)'],
  lysm: [6 / 7.8, 9 / 7.5, 'limfocit mic ≈ hematia (Junqueira cap. 12)'],
  mono: [12 / 7.8, 20 / 7.5, 'monocit 12–20 µm (Junqueira cap. 12)'],
  mast: [7 / 7.8, 20 / 7.5, 'mastocit 7–20 µm (Junqueira cap. 5)'],
  mac: [10 / 7.8, 30 / 7.5, 'macrofag 10–30 µm (Junqueira cap. 5)'],
  plt: [2 / 7.8, 4 / 7.5, 'trombocit 2–4 µm (Junqueira cap. 12)'],
};
// clasele cu care fiecare figură își desenează celulele (contur exterior)
const SEL = {
  rbc: 'ellipse.rbc, .ap-rbc, .rbcg ellipse.rbc',
  neut: '.nt-cell, .ap-ntc, .fc-ntc, .ic-ne .c, .ni-ne .c',
  eo: '.hk-eo .c, .ni-eo .c',
  lysm: '.hk-ly .c, .ic-ly .c',
  mono: '.ni-mono .c',
  mast: '.ms-cell, .ap-mast',
  mac: '.mac-b',
};
// celulele din biblioteca comună (art/parts/cells.mjs) își poartă scara (data-k, px/µm): dimensiunea se citește direct în µm
const UM = {
  'lc-rbc': [7.5, 7.8, 'hematie 7,5–7,8 µm (Junqueira p. 251; Ross p. 291)', '.lc-rbcb'],
  'lc-neut': [10, 15, 'neutrofil 10–15 µm (Ross p. 296; Junqueira p. 254)', '.lc-cyt'],
  'lc-eo': [10, 15, 'eozinofil ≈ neutrofil (Ross p. 301)', '.lc-cyt'],
  'lc-baso': [12, 15, 'bazofil 12–15 µm (Junqueira p. 256)', '.lc-cyt'],
  'lc-ly': [6, 18, 'limfocit mic ≈ hematia, mijlociu/mare 9–18 µm (Junqueira p. 258)', '.lc-cyt'],
  'lc-mono': [12, 20, 'monocit 12–20 µm (Junqueira p. 259–260)', '.lc-cyt'],
  'lc-mac': [10, 30, 'macrofag 10–30 µm (Junqueira p. 113)', '.lc-cyt'],
  'lc-mast': [7, 20, 'mastocit 7–20 µm (Junqueira p. 115–116)', '.lc-cyt'],
  'lc-plasma': [20, 20, 'plasmocit ~20 µm (Ross p. 203)', '.lc-cyt'],
  'lc-plt': [2, 4, 'trombocit 2–4 µm (Junqueira p. 261)', '.lc-pltb'],
};
// simularea daltonismului (matricele Machado et al. 2009, severitate 1.0)
const CVD = {
  deutan: '0.367322 0.860646 -0.227968 0 0  0.280085 0.672501 0.047413 0 0  -0.011820 0.042940 0.968881 0 0  0 0 0 1 0',
  protan: '0.152286 1.052583 -0.204868 0 0  0.114503 0.786281 0.099216 0 0  -0.003882 -0.048116 1.051998 0 0  0 0 0 1 0',
};

(async () => {
  const args = process.argv.slice(2);
  const file = path.resolve(args.find(a => a.endsWith('.html')) || 'index.html');
  const opt = k => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
  const out = path.resolve(opt('--out') || 'shots/audit');
  const only = opt('--only') ? opt('--only').split(',') : Object.keys(FIGS);
  const shots = !args.includes('--no-shots');
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const report = {};
  for (const key of only) {
    const n = FIGS[key], r = report[key] = { q: n, errors: [], modes: [], overflow: null, cells: {} };
    for (const theme of ['light', 'dark']) {
      const p = await b.newPage({ viewport: { width: 1000, height: 1300 }, deviceScaleFactor: 2, colorScheme: theme });
      p.on('pageerror', e => r.errors.push(e.message)); p.on('console', m => { if (m.type() === 'error') r.errors.push(m.text()); });
      await p.goto('file://' + file + '#q-' + n); await p.waitForTimeout(1200);
      const fig = await p.$(`figure.xfig[data-fx="${key}"]`);
      if (!fig) { r.errors.push('figura nu e pe pagina Î' + n); await p.close(); continue; }
      await fig.evaluate(f => f.scrollIntoView());
      if (theme === 'light') {
        r.modes = await fig.evaluate(async f => {
          const res = [];
          for (const btn of f.querySelectorAll('[data-fxa="mode"]')) { btn.click(); await new Promise(z => setTimeout(z, 250)); res.push(btn.dataset.m + (f.dataset.mode === btn.dataset.m ? ':ok' : ':NU')); }
          return res;
        });
        await fig.evaluate(f => f.querySelector('[data-fxa="mode"][data-m="explore"]').click());
        await p.waitForTimeout(500);
        r.cells = await fig.evaluate((f, SEL) => {
          const svg = f.querySelector('.fx-stage svg'); const o = {};
          for (const [k, sel] of Object.entries(SEL)) {
            const ds = [...svg.querySelectorAll(sel)].map(el => { try { const bb = el.getBBox(); return Math.max(bb.width, bb.height); } catch (e) { return 0; } }).filter(d => d > 0.5);
            if (ds.length) { ds.sort((a, b) => a - b); o[k] = { n: ds.length, med: +ds[Math.floor(ds.length / 2)].toFixed(2), min: +ds[0].toFixed(2), max: +ds[ds.length - 1].toFixed(2) }; }
          }
          return o;
        }, SEL);
        r.um = await fig.evaluate((f, UM) => {
          const svg = f.querySelector('.fx-stage svg'), o = {};
          for (const g of svg.querySelectorAll('g.lc[data-k]')) {
            const t = [...g.classList].find(c => UM[c]); if (!t) continue;
            const el = g.querySelector(UM[t][3]); if (!el) continue;
            const bb = el.getBBox(), um = Math.max(bb.width, bb.height) / +g.dataset.k;
            const [lo, hi] = UM[t], ok = um >= lo * 0.8 && um <= hi * 1.2;
            const e = o[t] = o[t] || { n: 0, bad: 0, min: 1e9, max: 0, range: [+(lo * 0.8).toFixed(1), +(hi * 1.2).toFixed(1)], src: UM[t][2] };
            e.n++; if (!ok) e.bad++; e.min = Math.min(e.min, +um.toFixed(1)); e.max = Math.max(e.max, +um.toFixed(1));
          }
          return o;
        }, UM);
      }
      if (shots) {
        await fig.evaluate(f => f.querySelector('[data-fxa="mode"][data-m="explore"]').click());
        await p.waitForTimeout(700);
        const svgEl = await fig.$('.fx-stage svg');
        await svgEl.screenshot({ path: path.join(out, `${key}-${theme}.png`) });
        if (theme === 'light') for (const [k, m] of Object.entries(CVD)) {
          await p.evaluate(([m, k]) => {
            let d = document.getElementById('cvd-defs'); if (!d) { d = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); d.id = 'cvd-defs'; d.setAttribute('width', 0); d.setAttribute('height', 0); d.style.position = 'absolute'; document.body.append(d); }
            d.innerHTML = `<filter id="cvd-${k}"><feColorMatrix type="matrix" values="${m}"/></filter>`;
            document.querySelectorAll('figure.xfig .fx-stage svg').forEach(s => { s.style.filter = `url(#cvd-${k})`; });
          }, [m, k]);
          await p.waitForTimeout(200);
          await svgEl.screenshot({ path: path.join(out, `${key}-${k}.png`) });
          await p.evaluate(() => document.querySelectorAll('figure.xfig .fx-stage svg').forEach(s => { s.style.filter = ''; }));
        }
      }
      await p.close();
    }
    const m = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
    await m.goto('file://' + file + '#q-' + n); await m.waitForTimeout(1000);
    r.overflow = await m.evaluate(() => document.documentElement.scrollWidth);
    await m.close();
    // rapoartele față de hematie
    const rbc = r.cells.rbc && r.cells.rbc.med;
    r.ratio = {};
    if (rbc) for (const [k, v] of Object.entries(r.cells)) if (RATIO[k]) {
      const q = v.med / rbc, [lo, hi, src] = RATIO[k];
      r.ratio[k] = { ratio: +q.toFixed(2), range: [+(lo * 0.8).toFixed(2), +(hi * 1.2).toFixed(2)], ok: q >= lo * 0.8 && q <= hi * 1.2, src };
    }
    const umBad = Object.entries(r.um || {}).filter(([, v]) => v.bad).map(([k, v]) => `${k} ${v.bad}/${v.n} în afara ${v.range[0]}–${v.range[1]} µm (${v.min}–${v.max})`);
    const umTxt = Object.keys(r.um || {}).length ? `; biblioteca: ${Object.entries(r.um).map(([k, v]) => `${k.slice(3)} ${v.n}`).join(', ')}${umBad.length ? ' — SCARĂ: ' + umBad.join('; ') : ' — toate în ±20%'}` : '';
    const bad = Object.entries(r.ratio).filter(([, v]) => !v.ok).map(([k, v]) => `${k} ${v.ratio}× (ținta ${v.range[0]}–${v.range[1]}×)`);
    console.log(`${key} (Î${n}): erori ${r.errors.length}; moduri ${r.modes.filter(x => x.endsWith(':ok')).length}/${r.modes.length}; lățime pe telefon ${r.overflow}px; celule ${Object.keys(r.cells).join(',') || '—'}${rbc ? '' : ' (fără hematie de referință)'}${bad.length ? '; SCARĂ: ' + bad.join('; ') : ''}${umTxt}`);
  }
  await b.close();
  fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 1));
})();
