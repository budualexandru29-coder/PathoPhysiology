/* ===== Aplicația: rute, ecrane, exerciții ===== */
(function () {
'use strict';
const app = document.getElementById('app');
const NQ = 41, QN = Array.from({ length: NQ }, (_, i) => i + 1);
const chOf = n => CH.find(c => n >= c.from && n <= c.to);
const pct = x => Math.round(x * 100);
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const fmt = s => { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
const plural = (n, one, many) => n === 1 ? one : many;

/* tonul fiecărei scheme, după capitolul în care apare */
const FLOWTONE = {}, FLOWQ = {};
QN.forEach(n => {
  const q = Q[n], tone = chOf(n).tone;
  const keys = q.learn.filter(b => b[0] === 'flow').map(b => b[1]).concat(q.chains);
  keys.forEach(k => { if (!FLOWTONE[k]) FLOWTONE[k] = tone; (FLOWQ[k] = FLOWQ[k] || []).includes(n) || FLOWQ[k].push(n); });
});

/* ---------- stocare ---------- */
const LS = 'fiziopat-m1-v1';
function load() {
  let d = {};
  try { d = JSON.parse(localStorage.getItem(LS) || '{}') || {}; } catch (_) { d = {}; }
  d.q = d.q && typeof d.q === 'object' ? d.q : {};
  d.czs = d.czs && typeof d.czs === 'object' ? d.czs : {};
  d.kz = d.kz && typeof d.kz === 'object' ? d.kz : {};
  d.drafts = d.drafts && typeof d.drafts === 'object' ? d.drafts : {};
  d.sims = Array.isArray(d.sims) ? d.sims : [];
  d.fx = d.fx && typeof d.fx === 'object' ? d.fx : {};
  d.settings = Object.assign({ simTime: 30, weak: true, bank: false, live: true, czN: 10, czCh: CH.map(c => c.id), czWeak: false }, d.settings || {});
  return d;
}
let store = load();
FX.persist = { get: k => store.fx[k], set: (k, t, v) => { const o = store.fx[k] || (store.fx[k] = {}); o[t] = Math.max(o[t] || 0, v); save(); } };
try { document.body.classList.toggle('ess', !!store.settings.ess); } catch (_) {}
function save() { try { localStorage.setItem(LS, JSON.stringify(store)); } catch (_) {} }
function czScore(n) {
  const L = Q[n].cloze.length; let s = 0, any = false;
  for (let i = 0; i < L; i++) { const v = store.czs[n + ':' + i]; if (v != null) { any = true; s += v; } }
  return any ? Math.round(s / L * 100) : null;
}
function rScore(n) { const r = store.q[n]; return r && r.best != null ? r.best : null; }
function mastery(n) {
  const a = rScore(n), c = czScore(n);
  if (a == null && c == null) return null;
  if (a != null && c != null) return Math.round(.6 * a + .4 * c);
  return a != null ? a : Math.round(c * .85);
}
const lvl = p => p == null ? '' : p >= 80 ? 'l3' : p >= 50 ? 'l2' : 'l1';
function recordWrite(n, score) {
  const r = store.q[n] || (store.q[n] = { n: 0, best: 0 });
  r.n = (r.n || 0) + 1; r.last = score; r.best = Math.max(r.best || 0, score); r.ts = Date.now();
  save();
}
function weightedPick(k, pool) {
  pool = (pool || QN).slice(); const out = [];
  while (out.length < k && pool.length) {
    const w = pool.map(n => store.settings.weak ? 1 + (100 - (mastery(n) == null ? 0 : mastery(n))) / 20 : 1);
    let r = Math.random() * w.reduce((a, b) => a + b, 0), i = 0;
    while (r > w[i] && i < w.length - 1) { r -= w[i]; i++; }
    out.push(pool[i]); pool.splice(i, 1);
  }
  return out;
}

/* ---------- cadru ---------- */
const NAV = [['acasa', 'Acasă'], ['invata', 'Învață'], ['completeaza', 'Completează'], ['redacteaza', 'Redactează'], ['cascade', 'Cascade'], ['bilet', 'Bilet'], ['scheme', 'Scheme']];
function frame(active, body) {
  return `<header class="hdr"><div class="hdr-in"><a class="brand" href="#acasa"><b>Fizio<i>pato</i>logie</b><span>Modul I · examen practic</span></a>
  <nav class="nav" aria-label="Secțiuni">${NAV.map(([h, l]) => `<a href="#${h}" ${h === active ? 'aria-current="page"' : ''}>${l}</a>`).join('')}</nav></div></header>
  <main class="wrap" id="main">${body}</main>`;
}
const qtag = (n, link) => { const c = chOf(n); return link === false ? `<span class="qtag ${c.tone}">Î${n}</span>` : `<a class="qtag ${c.tone}" href="#q-${n}">Î${n}</a>`; };
const badge = p => `<span class="badge ${lvl(p)}">${p == null ? 'nou' : p + '%'}</span>`;

/* ---------- blocuri de explicație ---------- */
function blocks(arr) { return arr.map(block).join(''); }
function block(b) {
  switch (b[0]) {
    case 'p': return `<p class="blk">${b[1]}</p>`;
    case 'def': return `<dl class="def blk"><dt>${b[1]}</dt><dd>${b[2]}</dd></dl>`;
    case 'ul': case 'ol': return `<div class="blk">${b[1] ? `<p class="lt">${b[1]}</p>` : ''}<${b[0]}>${b[2].map(i => `<li>${i}</li>`).join('')}</${b[0]}></div>`;
    case 'h': return `<h3 class="blk-h">${b[1]}</h3>`;
    case 'flow': return flowHTML(b[1]);
    case 'fig': return FIGS[b[1]] ? FIGS[b[1]](b[2]) : '';
    case 'lesson': return LESSON.html(b[1]);
    case 'tbl': return `<div class="blk"><div class="tblw"><table class="t">${b[1] ? `<caption>${b[1]}</caption>` : ''}<thead><tr>${b[2].map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${b[3].map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`;
    case 'cols': return `<div class="blk cols">${b[1].map(([t, items]) => `<div class="col"><h4>${t}</h4><ul>${items.map(i => `<li>${i}</li>`).join('')}</ul></div>`).join('')}</div>`;
    case 'box': {
      const [, kind, title, html] = b;
      if (kind === 'ctx' || kind === 'lp') return `<details class="box ${kind} blk"><summary><span><span class="k">${kind === 'ctx' ? 'Explicație suplimentară, nu e în slide' : 'Tot din LP'}</span>${title}</span></summary><div>${html}</div></details>`;
      return `<div class="box ${kind} blk"><span class="bt">${title}</span>${html}</div>`;
    }
  }
  return '';
}
function flowHTML(key, compact) {
  const f = FLOWS[key]; if (!f) return '';
  return renderFlow(f, { key, tone: FLOWTONE[key], tools: true, ess: !!store.settings.ess, tip: !compact });
}
function stepTo(fl, step) {
  const n = +fl.dataset.n;
  if (step >= n - 1) { delete fl.dataset.step; fl.querySelectorAll('.fi').forEach(x => x.classList.remove('hid')); fl.querySelector('.flow-foot').hidden = true; return; }
  fl.dataset.step = step;
  fl.querySelectorAll('.fi').forEach(x => {
    const i = +x.dataset.i; x.classList.toggle('hid', i > step);
    x.querySelectorAll('[data-act="why"]').forEach(b => b.setAttribute('aria-expanded', String(i === step)));
  });
  fl.querySelector('.flow-foot').hidden = false;
}

/* ---------- ACASĂ ---------- */
function viewHome() {
  const done = QN.filter(n => mastery(n) != null);
  const avg = done.length ? Math.round(done.reduce((a, n) => a + mastery(n), 0) / done.length) : null;
  const rows = CH.map(c => {
    const ns = QN.filter(n => n >= c.from && n <= c.to);
    return `<div class="chrow"><div class="lbl">${c.s}<small>Î${c.from}–${c.to}</small></div><div class="cells">${ns.map(n => { const m = mastery(n); return `<a class="cell ${lvl(m)}" href="#q-${n}" title="Î${n}: ${esc(Q[n].s)}${m != null ? ' · ' + m + '%' : ''}" aria-label="Întrebarea ${n}, ${m == null ? 'neexersată' : m + ' la sută'}">${n}</a>`; }).join('')}</div></div>`;
  }).join('');
  const weak = weightedPick(3, QN.filter(n => (mastery(n) == null ? 0 : mastery(n)) < 80));
  const nCz = QN.reduce((a, n) => a + Q[n].cloze.length, 0), nK = Object.keys(FLOWS).filter(k => FLOWS[k].ord && FLOWQ[k]).length;
  const last = store.sims[0];
  app.innerHTML = frame('acasa', `
  <section class="hero">
    <div>
      <p class="eyebrow">Fiziopatologie · MG anul II · Modulul I</p>
      <h1>Două bilete din 41 de întrebări.</h1>
      <p class="lede">Înveți fiecare mecanism din LP legat de întrebarea la care se cere, apoi îl verifici completând enunțuri, punând cascadele în ordine și redactând răspunsul ca la examen, corectat pe cuvinte-cheie.</p>
      <div class="row" style="margin-top:14px"><a class="btn primary" href="#bilet">Extrage biletele</a><a class="btn" href="#q-1">Începe cu Î1</a></div>
    </div>
    <a class="tickets" href="#bilet" aria-label="Simulare de examen: extrage două bilete">
      <span class="ticket t1"><small>Biletul 1</small><b>Î?</b><small>fiziopatologie</small></span>
      <span class="ticket t2"><small>Biletul 2</small><b>Î?</b><small>fiziopatologie</small></span>
    </a>
  </section>
  <section class="panel">
    <h2>Foaia de progres</h2>
    <p class="muted small" style="margin-top:0">${done.length ? `Ai lucrat ${done.length} din 41 de întrebări; media: <b>${avg}%</b>.` : 'Fiecare pătrat e o întrebare. Se colorează după ce completezi enunțurile sau redactezi răspunsul.'}${last ? ` Ultima simulare: Î${last.qs[0]} și Î${last.qs[1]}, ${Math.round((last.sc[0] + last.sc[1]) / 2)}%.` : ''}</p>
    <div class="chart">${rows}</div>
    <div class="legend"><span><i></i>nelucrată</span><span><i class="l1"></i>sub 50%</span><span><i class="l2"></i>50–79%</span><span><i class="l3"></i>80% sau peste</span></div>
  </section>
  ${weak.length ? `<section class="panel"><h2>De lucrat acum</h2><ul class="todo">${weak.map(n => `<li><a href="#q-${n}">${qtag(n, false)}<span class="t">${Q[n].s}</span>${badge(mastery(n))}</a></li>`).join('')}</ul></section>` : ''}
  <h2 style="margin-top:26px">Ce poți face</h2>
  <div class="modes">
    <a class="mode" href="#invata"><b>Învață</b><span>Explicația fiecărei întrebări: definiții, scheme pas cu pas, tabele și planul răspunsului.</span><em>41 de întrebări</em></a>
    <a class="mode" href="#completeaza"><b>Completează</b><span>Enunțuri cu spații libere, fiecare legat de întrebarea din care face parte.</span><em>${nCz} de enunțuri</em></a>
    <a class="mode" href="#redacteaza"><b>Redactează</b><span>Scrii răspunsul pe foaie; corectura caută cuvintele-cheie din LP și îți arată ce lipsește.</span><em>41 de rubrici</em></a>
    <a class="mode" href="#cascade"><b>Cascade</b><span>Pui în ordine pașii unui mecanism, de la cauză la efect.</span><em>${nK} cascade</em></a>
  </div>
  <details class="panel"><summary><b>Cum funcționează corectura</b></summary>
    <ul class="small muted">
      <li>Răspunsul redactat e verificat după cuvintele-cheie ale fiecărui punct din barem. Diacriticele și terminațiile nu contează („vasodilatația”, „vasodilatatie” și „vasodilatație” sunt la fel).</li>
      <li>Corectura nu înțelege sensul frazei. Dacă ai scris corect ceva ce n-a fost recunoscut (sau invers), atingi rândul și scorul se recalculează.</li>
      <li>Punctele esențiale (marcate ×2) contează dublu. Scorul e un reper pentru învățat, nu nota de la examen.</li>
      <li>Progresul se păstrează doar în acest browser, pe acest dispozitiv.</li>
    </ul>
    ${Object.keys(store.q).length || Object.keys(store.czs).length ? '<button class="btn sm danger" data-act="reset">Șterge progresul</button>' : ''}
  </details>`);
}

/* ---------- ÎNVAȚĂ: lista ---------- */
function viewLearn() {
  app.innerHTML = frame('invata', `
  <section class="qhead"><p class="eyebrow">Învață</p><h1>Cele 41 de întrebări</h1>
  <p class="muted">Fiecare întrebare are explicația mecanismelor din LP, schemele redesenate și planul răspunsului.</p></section>
  <label class="sr" for="qsearch">Caută</label><input id="qsearch" class="search" type="search" placeholder="Caută: PGE2, sinus cavernos, hipersensibilitate…" autocomplete="off">
  <div id="qlist">${learnList('')}</div>
  <section class="chsec"><header><h2>Anexă</h2></header><ul class="qlist"><li><a class="qi" href="#anexa"><span class="n">LP 1</span><span class="tx">${EXTRA[0].t}</span><span class="badge">model</span></a></li></ul></section>`);
}
function learnList(f) {
  const fw = words(f).join(' ');
  return CH.map(c => {
    const ns = QN.filter(n => n >= c.from && n <= c.to).filter(n => !fw || words(QT[n] + ' ' + Q[n].s + ' ' + Q[n].sum).join(' ').includes(fw));
    if (!ns.length) return '';
    return `<section class="chsec"><header><h2>${c.n}</h2><span class="eyebrow">Î${c.from}–${c.to}</span></header><ul class="qlist">${ns.map(n => `<li><a class="qi" href="#q-${n}"><span class="n">Î${n}</span><span class="tx">${QT[n]}</span>${badge(mastery(n))}</a></li>`).join('')}</ul></section>`;
  }).join('') || '<p class="muted">Nicio întrebare nu conține acest termen.</p>';
}

/* ---------- ÎNTREBAREA ---------- */
function qHeader(n, tab) {
  const q = Q[n], c = chOf(n), m = mastery(n);
  const tabs = [['', 'Explicație'], ['c', 'Completează', q.cloze.length], ['r', 'Redactează'], ...(q.chains.length ? [['k', 'Cascadă', q.chains.length]] : [])];
  return `<section class="qhead"><div class="meta"><span class="qtag ${c.tone}">Întrebarea ${n}</span><span class="eyebrow">${c.s}</span>${m != null ? badge(m) : ''}</div><h1>${QT[n]}</h1></section>
  <nav class="tabs" aria-label="Moduri pentru întrebarea ${n}">${tabs.map(([k, l, cnt]) => `<a href="#q-${n}${k ? '-' + k : ''}" ${k === tab ? 'aria-current="page"' : ''}>${l}${cnt ? `<span class="c">${cnt}</span>` : ''}</a>`).join('')}</nav>`;
}
function pager(n, tab) {
  const suf = tab ? '-' + tab : '';
  const p = n > 1 ? n - 1 : null, x = n < NQ ? n + 1 : null;
  const ok = k => !tab || tab !== 'k' || Q[k].chains.length;
  let pp = p; while (pp && !ok(pp)) pp--; let xx = x; while (xx && xx <= NQ && !ok(xx)) xx++; if (xx > NQ) xx = null;
  return `<nav class="pager">${pp ? `<a href="#q-${pp}${suf}"><small>← Î${pp}</small><span>${Q[pp].s}</span></a>` : '<span></span>'}${xx ? `<a class="nx" href="#q-${xx}${suf}"><small>Î${xx} →</small><span>${Q[xx].s}</span></a>` : '<span></span>'}</nav>`;
}
function viewQ(n) {
    const q = Q[n];
    const isFx = b => (b[0] === 'fig' && FX.specs[b[1]]) || b[0] === 'lesson';
    const figs = q.learn.filter(isFx), rest = q.learn.filter(b => !isFx(b));
    const secs = [['s-sum', 'Pe scurt'], ...(figs.length ? [['s-fig', 'Mecanismul în desen']] : []), ['s-exp', 'Explicația'], ['s-plan', 'Cum răspunzi']];
    const head = (i, id, t, sub) => `<h2 class="qsec-h"><i>${i}</i>${t}${sub ? `<small>${sub}</small>` : ''}</h2>`;
    let k = 0;
    app.innerHTML = frame('invata', qHeader(n, '') + `
    <nav class="qmap" aria-label="Secțiunile paginii">${secs.map(([id, t], i) => `<a href="#${id}" aria-current="${i === 0}"><i>${i + 1}</i>${t}</a>`).join('')}</nav>
    <section class="qsec" id="s-sum">${head(++k, 's-sum', 'Pe scurt')}<div class="sum">${q.sum}</div></section>
    ${figs.length ? `<section class="qsec" id="s-fig">${head(++k, 's-fig', 'Mecanismul în desen', figs.some(b => b[0] === 'lesson') ? 'lecție pe tablă' : 'pas cu pas')}${blocks(figs)}</section>` : ''}
    <section class="qsec" id="s-exp">${head(++k, 's-exp', 'Explicația')}${blocks(rest)}</section>
    <section class="qsec" id="s-plan">${head(++k, 's-plan', 'Cum construiești răspunsul')}
      <ol class="plan">${q.plan.map(p => `<li><span>${p}</span></li>`).join('')}</ol>
      <p class="srcline">Sursa: ${q.src}</p>
      <div class="actions"><a class="btn soft" href="#q-${n}-c">Completează enunțurile</a><a class="btn primary" href="#q-${n}-r">Redactează răspunsul</a></div></section>
    ${pager(n, '')}`);
    requestAnimationFrame(() => { if (window.FXmeasure) window.FXmeasure(); });
  }

/* ---------- COMPLETARE ---------- */
function clozeHTML(n, i, opt) {
  opt = opt || {};
  const parts = parseCloze(Q[n].cloze[i]);
  let b = 0; const answers = [];
  const body = parts.map(p => {
    if (p.t != null) return p.t;
    const k = b++; answers.push(p.a[0]);
    const w = Math.min(22, Math.max(7, p.a[0].length + 2));
    return `<input class="bl" data-n="${n}" data-i="${i}" data-b="${k}" style="width:${w}ch" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="next" aria-label="Spațiul ${k + 1}">`;
  }).join('');
  const bank = store.settings.bank ? `<div class="bank" aria-label="Variante">${shuffle(answers.slice()).map(a => `<button type="button" data-act="bank" data-v="${esc(a)}">${esc(a)}</button>`).join('')}</div>` : '';
  return `<div class="cz" id="cz-${n}-${i}" data-n="${n}" data-i="${i}">${opt.head ? `<div class="cq">${qtag(n)}<span class="tx">${QT[n]}</span></div>` : ''}<div class="czt">${body}</div>${bank}</div>`;
}
function checkCloze(el) {
  const n = +el.dataset.n, i = +el.dataset.i;
  const parts = parseCloze(Q[n].cloze[i]).filter(p => p.a);
  let good = 0;
  el.querySelectorAll('input.bl').forEach(inp => {
    const k = +inp.dataset.b, alts = parts[k].a;
    const r = checkBlank(inp.value, alts);
    inp.classList.remove('ok', 'near', 'no'); inp.classList.add(r); inp.readOnly = true;
    const nx = inp.nextElementSibling; if (nx && (nx.classList.contains('fix') || nx.classList.contains('nearn'))) nx.remove();
    if (r === 'no') inp.insertAdjacentHTML('afterend', `<span class="fix">${esc(alts[0])}</span>`);
    else if (r === 'near' && words(inp.value).join(' ') !== words(alts[0]).join(' ')) inp.insertAdjacentHTML('afterend', `<span class="nearn">(${esc(alts[0])})</span>`);
    if (r !== 'no') good++;
  });
  const frac = parts.length ? good / parts.length : 0;
  store.czs[n + ':' + i] = Math.round(frac * 100) / 100; save();
  return { good, total: parts.length, frac };
}
function viewQCloze(n) {
  const q = Q[n];
  app.innerHTML = frame('completeaza', qHeader(n, 'c') + `
  <p class="muted" style="margin-top:0">Scrie cuvântul care lipsește. Diacriticele și micile greșeli de tastare sunt acceptate. <kbd>Enter</kbd> te duce la spațiul următor.</p>
  <label class="check"><input type="checkbox" data-act="bankopt" ${store.settings.bank ? 'checked' : ''}><span>Arată variantele sub fiecare enunț (mai ușor)</span></label>
  <div id="czres"></div>
  <div style="margin-top:14px">${q.cloze.map((_, i) => clozeHTML(n, i)).join('')}</div>
  <div class="actions stick"><button class="btn" data-act="czreset" data-n="${n}">Reia</button><button class="btn primary" data-act="czcheckall" data-n="${n}">Verifică tot</button></div>
  ${pager(n, 'c')}`);
}

/* sesiunea de completare din mai multe întrebări */
let cz = null;
function viewCloze() {
  if (cz && cz.items) return viewClozeRun();
  const st = store.settings;
  const pool = clozePool();
  app.innerHTML = frame('completeaza', `
  <section class="qhead"><p class="eyebrow">Completează</p><h1>Enunțuri cu spații libere</h1>
  <p class="muted">Primești enunțuri amestecate din capitolele alese. Fiecare enunț arată întrebarea de examen din care face parte, ca să legi informația de subiect.</p></section>
  <section class="panel"><h2>Capitole</h2>
    <div class="chips">${CH.map(c => `<button class="chip" data-act="czch" data-ch="${c.id}" aria-pressed="${st.czCh.includes(c.id)}">${c.s} <span class="mono small">Î${c.from}–${c.to}</span></button>`).join('')}</div>
    <h2 style="margin-top:16px">Câte enunțuri</h2>
    <div class="seg" role="group" aria-label="Număr de enunțuri">${[10, 20, 40, 0].map(v => `<button data-act="czn" data-v="${v}" aria-pressed="${st.czN === v}">${v || 'Toate'}</button>`).join('')}</div>
    <label class="check"><input type="checkbox" data-act="czweak" ${st.czWeak ? 'checked' : ''}><span>Doar din întrebările sub 80%</span></label>
    <label class="check"><input type="checkbox" data-act="bankopt" ${st.bank ? 'checked' : ''}><span>Arată variantele sub enunț (mai ușor)</span></label>
    <p class="muted small">${pool.length} ${plural(pool.length, 'enunț disponibil', 'enunțuri disponibile')}.</p>
    <div class="actions"><button class="btn primary" data-act="czstart" ${pool.length ? '' : 'disabled'}>Începe</button></div>
  </section>
  <section class="chsec"><header><h2>Sau pe întrebări</h2></header><ul class="qlist">${QN.map(n => { const c = czScore(n); return `<li><a class="qi" href="#q-${n}-c"><span class="n">Î${n}</span><span class="tx">${Q[n].s} <span class="muted small">· ${Q[n].cloze.length} enunțuri</span></span>${badge(c)}</a></li>`; }).join('')}</ul></section>`);
}
function clozePool() {
  const st = store.settings, out = [];
  QN.forEach(n => {
    if (!st.czCh.includes(chOf(n).id)) return;
    if (st.czWeak && (mastery(n) || 0) >= 80) return;
    Q[n].cloze.forEach((_, i) => out.push([n, i]));
  });
  return out;
}
function viewClozeRun() {
  const it = cz.items[cz.pos];
  if (!it) return viewClozeEnd();
  const [n, i] = it;
  app.innerHTML = frame('completeaza', `
  <section class="qhead" style="padding-bottom:0"><div class="row" style="justify-content:space-between"><p class="eyebrow" style="margin:0">Enunțul ${cz.pos + 1} din ${cz.items.length}</p><button class="btn ghost sm" data-act="czquit">Oprește</button></div>
  <div class="progress" aria-hidden="true"><i style="width:${cz.pos / cz.items.length * 100}%"></i></div></section>
  ${clozeHTML(n, i, { head: true })}
  <div id="czfb"></div>
  <div class="actions stick"><button class="btn primary" id="czgo" data-act="czone">Verifică</button></div>`);
  const f = app.querySelector('input.bl'); if (f) f.focus({ preventScroll: true });
}
function viewClozeEnd() {
  const byQ = {};
  cz.res.forEach(r => { const o = byQ[r.n] || (byQ[r.n] = { g: 0, t: 0 }); o.g += r.good; o.t += r.total; });
  const g = cz.res.reduce((a, r) => a + r.good, 0), t = cz.res.reduce((a, r) => a + r.total, 0);
  const wrong = cz.res.filter(r => r.good < r.total).length;
  app.innerHTML = frame('completeaza', `
  <section class="verdict"><p class="was">Sesiune încheiată</p><h1>${g} din ${t} spații corecte</h1></section>
  <div class="czscore"><b>${t ? pct(g / t) : 0}%</b><span class="muted">${wrong ? `${wrong} ${plural(wrong, 'enunț are', 'enunțuri au')} greșeli.` : 'Toate enunțurile sunt corecte.'}</span></div>
  <section class="sec"><h2>Pe întrebări</h2><ul class="qlist">${Object.keys(byQ).map(Number).sort((a, b) => a - b).map(n => `<li><a class="qi" href="#q-${n}"><span class="n">Î${n}</span><span class="tx">${Q[n].s}</span><span class="badge ${lvl(pct(byQ[n].g / byQ[n].t))}">${byQ[n].g}/${byQ[n].t}</span></a></li>`).join('')}</ul></section>
  <div class="actions">${wrong ? '<button class="btn soft" data-act="czwrong">Reia enunțurile greșite</button>' : ''}<button class="btn primary" data-act="cznew">Sesiune nouă</button></div>`);
}

/* ---------- REDACTARE ---------- */
let wr = null, last = null, tInt = null;
function stopTimer() { if (tInt) { clearInterval(tInt); tInt = null; } }
function viewWritePick() {
  app.innerHTML = frame('redacteaza', `
  <section class="qhead"><p class="eyebrow">Redactează</p><h1>Scrie răspunsul ca la examen</h1>
  <p class="muted">Alegi o întrebare, scrii răspunsul pe foaie, apoi primești corectura pe puncte-cheie: ce ai atins, ce lipsește și răspunsul model.</p>
  <div class="row"><button class="btn primary" data-act="wrand">Dă-mi o întrebare la întâmplare</button></div>
  <p class="muted small">Întrebarea la întâmplare vine mai des din cele pe care nu le stăpânești încă.</p></section>
  ${CH.map(c => `<section class="chsec"><header><h2>${c.n}</h2></header><ul class="qlist">${QN.filter(n => n >= c.from && n <= c.to).map(n => `<li><a class="qi" href="#q-${n}-r"><span class="n">Î${n}</span><span class="tx">${QT[n]}</span>${badge(rScore(n))}</a></li>`).join('')}</ul></section>`).join('')}`);
}
function viewQWrite(n) {
  const q = Q[n];
  const total = q.rub.reduce((a, s) => a + s[1].length, 0);
  if (!wr || wr.n !== n) wr = { n, start: Date.now(), hint: false };
  app.innerHTML = frame('redacteaza', qHeader(n, 'r') + `
  <div class="timerbar"><span class="timer" id="timer" role="timer" aria-label="Timp scurs">0:00</span>
    <div class="row"><label class="check" style="margin:0"><input type="checkbox" data-act="liveopt" ${store.settings.live ? 'checked' : ''}><span class="small">Contor de puncte-cheie</span></label></div></div>
  <div class="sheetw"><label class="sr" for="ans">Răspunsul tău</label>
  <textarea id="ans" class="sheet" data-n="${n}" placeholder="Scrie aici răspunsul, ca pe foaia de examen. Pe telefon poți dicta cu iconița microfon de pe tastatură.">${esc(store.drafts[n] || '')}</textarea></div>
  <p class="count" id="count" aria-live="polite" ${store.settings.live ? '' : 'hidden'}><b>0</b> din ${total} puncte-cheie atinse</p>
  <div id="hint">${wr.hint ? hintHTML(n) : ''}</div>
  <div class="actions stick"><button class="btn soft" data-act="hint" ${wr.hint ? 'hidden' : ''}>Arată planul răspunsului</button><button class="btn primary" data-act="wfinish">Termină și corectează</button></div>
  ${pager(n, 'r')}`);
  onAns();
  stopTimer();
  const tick = () => { const el = document.getElementById('timer'); if (!el) { stopTimer(); return; } el.textContent = fmt((Date.now() - wr.start) / 1000); };
  tick(); tInt = setInterval(tick, 500);
}
const hintHTML = n => `<div class="hintbox"><b>Planul răspunsului</b><ol>${Q[n].plan.map(p => `<li>${p}</li>`).join('')}</ol></div>`;
let cntT = null;
function onAns() {
  clearTimeout(cntT);
  cntT = setTimeout(() => {
    const ta = document.getElementById('ans'); if (!ta) return;
    const n = +ta.dataset.n; store.drafts[n] = ta.value; save();
    const c = document.getElementById('count');
    if (c && !c.hidden) c.querySelector('b').textContent = countHits(Q[n].rub, ta.value);
  }, 200);
}
function gradeOf(n, text, extra) {
  const ev = evalRubric(Q[n].rub, text);
  return Object.assign({ n, text, ev, ovr: {} }, extra || {});
}
function applyOvr(res) {
  return res.ev.secs.map((s, i) => ({ name: s.name, pts: s.pts.map((p, j) => { const k = i + ':' + j, o = res.ovr[k]; return Object.assign({}, p, { key: k, auto: p.hit, hit: o == null ? p.hit : o, man: o != null && o !== p.hit }); }) }));
}
function finishWrite() {
  const ta = document.getElementById('ans'); if (!ta || !wr) return;
  stopTimer();
  const n = wr.n, text = ta.value;
  last = gradeOf(n, text, { secs: Math.round((Date.now() - wr.start) / 1000), hint: wr.hint, from: 'write' });
  last.score = pct(scoreRubric(applyOvr(last)));
  recordWrite(n, last.score);
  delete store.drafts[n]; save();
  wr = null;
  go('rezultat');
}
function gradeClass(p) { return p >= 80 ? 'g3' : p >= 50 ? 'g2' : ''; }
function resultBody(res, opts) {
  opts = opts || {};
  const n = res.n, secs = applyOvr(res), sc = pct(scoreRubric(secs));
  const bars = secs.map(s => { const g = s.pts.filter(p => p.hit).length; const v = scoreRubric([s]); return `<div class="brow"><span title="${esc(s.name)}">${s.name}</span><span class="track"><span class="fill" style="width:${pct(v)}%"></span></span><span class="n">${g}/${s.pts.length}</span></div>`; }).join('');
  const marks = new Set(res.ev.marks);
  let tx = '', pos = 0;
  res.ev.tk.forEach((t, i) => { if (marks.has(i)) { tx += esc(res.text.slice(pos, t.s)) + '<mark>' + esc(res.text.slice(t.s, t.e)) + '</mark>'; pos = t.e; } });
  tx += esc(res.text.slice(pos));
  return `
  <div class="scorebox"><div class="grade ${gradeClass(sc)}" aria-label="Scor ${sc} la sută"><b>${sc}</b><small>%</small></div><div class="bars">${bars}</div></div>
  ${res.text.trim() ? '<p class="muted small">Bifele sunt puse automat după cuvintele-cheie. Atinge un rând ca să-l corectezi; scorul se recalculează.</p>' : '<p class="box note"><span class="bt">Nu ai scris nimic</span>Mai jos ai baremul complet și răspunsul model.</p>'}
  ${secs.map((s, si) => `<section class="sec"><h2>${s.name} <span class="frac">${s.pts.filter(p => p.hit).length}/${s.pts.length}</span></h2><ul class="pts">${s.pts.map(p => `<li><button class="pt ${p.hit ? 'hit' : ''}" data-act="toggle" data-k="${p.key}" data-r="${opts.idx == null ? '' : opts.idx}" aria-pressed="${p.hit}"><span class="mk" aria-hidden="true">${p.hit ? '✓' : '✗'}</span><span class="lbl">${p.label}${p.man ? ' <span class="man">(corectat de tine)</span>' : ''}</span>${p.w > 1 ? '<span class="w">×2</span>' : ''}</button></li>`).join('')}</ul></section>`).join('')}
  <section class="sec"><h2>Răspunsul model</h2><div class="sum">${Q[n].sum}</div><ol class="plan">${Q[n].plan.map(p => `<li><span>${p}</span></li>`).join('')}</ol></section>
  <details class="sec" ${opts.openText ? 'open' : ''}><summary>Răspunsul tău, cu termenii recunoscuți</summary><p class="transcript">${res.text.trim() ? tx : '(gol)'}</p></details>`;
}
function viewResult() {
  if (!last) { go('redacteaza'); return; }
  const n = last.n;
  const meta = [];
  if (last.secs != null) meta.push(`Ai scris în ${fmt(last.secs)}`);
  if (last.hint) meta.push('ai folosit planul răspunsului');
  app.innerHTML = frame('redacteaza', `
  <section class="verdict"><p class="was">Corectura · ${qtag(n, false)} · ${chOf(n).s}</p><h1>${QT[n]}</h1>${meta.length ? `<p class="muted small">${meta.join('; ')}.</p>` : ''}</section>
  ${resultBody(last, { openText: true })}
  <div class="actions stick"><a class="btn" href="#q-${n}">Explicația</a><button class="btn soft" data-act="wretry">Rescrie</button><button class="btn primary" data-act="wrand">Altă întrebare</button></div>`);
}

/* ---------- CASCADE ---------- */
const kz = {};
function kzInit(key) { const n = FLOWS[key].ord.length; kz[key] = { order: [], pool: shuffle(Array.from({ length: n }, (_, i) => i)), done: false }; return kz[key]; }
function kzHTML(key, n) {
  const f = FLOWS[key], st = kz[key] || kzInit(key);
  const ord = f.ord, best = store.kz[key];
  const slots = st.order.length ? `<ol class="kz-order">${st.order.map((ix, p) => `<li><button class="kz-slot ${st.done ? (ix === p ? 'ok' : 'no') : ''}" data-act="kzrem" data-key="${key}" data-p="${p}" ${st.done ? 'disabled' : ''}><span>${ord[ix]}</span>${st.done ? '' : '<span class="x">scoate</span>'}</button></li>`).join('')}</ol>` : '<div class="kz-empty">Atinge pașii de mai jos în ordinea corectă.</div>';
  const pool = st.pool.filter(ix => !st.order.includes(ix));
  const okN = st.done ? st.order.filter((ix, p) => ix === p).length : 0;
  return `<div class="kz" id="kz-${key}"><div class="row" style="justify-content:space-between;margin-bottom:8px"><h3 style="margin:0">${f.t}</h3>${n ? qtag(n) : ''}</div>
    ${slots}
    ${pool.length && !st.done ? `<div class="kz-pool">${pool.map(ix => `<button data-act="kzadd" data-key="${key}" data-ix="${ix}">${ord[ix]}</button>`).join('')}</div>` : ''}
    ${st.done ? `<div class="kz-sol"><b>${okN} din ${ord.length} pe poziția corectă.</b>${okN < ord.length ? `<ol>${ord.map(o => `<li>${o}</li>`).join('')}</ol>` : ''}</div>` : ''}
    <div class="actions">${st.done ? `<button class="btn" data-act="kzreset" data-key="${key}">Încă o dată</button>` : `<button class="btn" data-act="kzreset" data-key="${key}">Amestecă</button><button class="btn primary" data-act="kzcheck" data-key="${key}" ${st.order.length === ord.length ? '' : 'disabled'}>Verifică ordinea</button>`}</div>
    ${best != null ? `<p class="muted small" style="margin:8px 0 0">Cel mai bun rezultat: ${best}%</p>` : ''}</div>`;
}
function refreshKz(key) { const el = document.getElementById('kz-' + key); if (el) { const n = el.querySelector('.qtag') ? +el.querySelector('.qtag').textContent.slice(1) : null; el.outerHTML = kzHTML(key, n); } }
function viewQCascade(n) {
  const q = Q[n];
  if (!q.chains.length) { go('q-' + n); return; }
  app.innerHTML = frame('cascade', qHeader(n, 'k') + `
  <p class="muted" style="margin-top:0">Pune pașii în ordine, de la cauză la efect. La redactare exact această înlănțuire contează.</p>
  ${q.chains.map(k => kzHTML(k)).join('')}
  <div class="actions"><a class="btn soft" href="#q-${n}">Vezi schema completă</a></div>
  ${pager(n, 'k')}`);
}
function viewCascades() {
  app.innerHTML = frame('cascade', `
  <section class="qhead"><p class="eyebrow">Cascade</p><h1>Pune mecanismele în ordine</h1>
  <p class="muted">Fiecare cascadă vine dintr-o schemă a unei întrebări. Ordinea pașilor e scheletul răspunsului scris.</p></section>
  ${CH.map(c => { const ns = QN.filter(n => n >= c.from && n <= c.to && Q[n].chains.length); if (!ns.length) return ''; return `<section class="chsec"><header><h2>${c.n}</h2></header><ul class="qlist">${ns.map(n => { const bs = Q[n].chains.map(k => store.kz[k]).filter(v => v != null); const b = bs.length === Q[n].chains.length ? Math.round(bs.reduce((a, v) => a + v, 0) / bs.length) : (bs.length ? Math.round(bs.reduce((a, v) => a + v, 0) / Q[n].chains.length) : null); return `<li><a class="qi" href="#q-${n}-k"><span class="n">Î${n}</span><span class="tx">${Q[n].chains.map(k => FLOWS[k].t).join(' · ')}</span>${badge(b)}</a></li>`; }).join('')}</ul></section>`; }).join('')}`);
}

/* ---------- BILET (simulare) ---------- */
let sim = store.simCur || null;
function viewBilet() {
  const st = store.settings;
  const drawn = sim && !sim.start ? sim.qs : null;
  const running = sim && sim.start;
  app.innerHTML = frame('bilet', `
  <section class="qhead"><p class="eyebrow">Simulare de examen</p><h1>Extragi două bilete</h1>
  <p class="muted">Primești două întrebări din cele 41 și le redactezi pe foaie, cu cronometru. La final vezi corectura pentru fiecare.</p></section>
  <section class="panel"><h2>Timp de lucru</h2>
    <div class="seg" role="group" aria-label="Timp">${[20, 30, 45, 0].map(v => `<button data-act="simtime" data-v="${v}" aria-pressed="${st.simTime === v}">${v ? v + ' min' : 'Fără limită'}</button>`).join('')}</div>
    <label class="check"><input type="checkbox" data-act="weakopt" ${st.weak ? 'checked' : ''}><span>Extrage mai des întrebările pe care nu le stăpânesc</span></label>
    <p class="muted small">Durata reală a examenului o afli de la disciplină; alege timpul care ți se potrivește.</p>
  </section>
  ${running ? `<section class="panel"><h2>Ai o lucrare începută</h2><p class="muted">Î${sim.qs[0]} și Î${sim.qs[1]}. Textul scris e păstrat.</p><div class="actions"><button class="btn danger" data-act="simquit">Renunță la ea</button><a class="btn primary" href="#bilet-examen">Continuă lucrarea</a></div></section>` : drawn ? `<div class="drawstage">${drawn.map((n, i) => `<div class="slip"><span class="eyebrow">Biletul ${i + 1}</span><span class="no">Î${n}</span><p>${QT[n]}</p></div>`).join('')}</div>
  <div class="actions"><button class="btn" data-act="simdraw">Extrage din nou</button><button class="btn primary" data-act="simstart">Începe lucrarea</button></div>`
  : `<div class="actions"><button class="btn primary" data-act="simdraw">Extrage biletele</button></div>`}
  ${store.sims.length ? `<section class="sec"><h2>Simulările tale</h2><ul class="hist">${store.sims.slice(0, 10).map(s => `<li><span class="d">${new Date(s.ts).toLocaleDateString('ro-RO', { day: 'numeric', month: 'short' })}</span><span>${qtag(s.qs[0])} ${qtag(s.qs[1])} <span class="muted small">${s.secs != null ? fmt(s.secs) : ''}</span></span><span class="s">${Math.round((s.sc[0] + s.sc[1]) / 2)}%</span></li>`).join('')}</ul></section>` : ''}`);
}
function simDraw() { sim = { qs: weightedPick(2), start: 0 }; store.simCur = sim; save(); viewBilet(); }
function viewExam() {
  if (!sim || !sim.start) { go('bilet'); return; }
  const lim = sim.lim;
  app.innerHTML = frame('bilet', `
  <section class="qhead" style="padding-bottom:0"><p class="eyebrow">Examen · 2 subiecte · ${lim ? lim + ' minute' : 'fără limită de timp'}</p></section>
  ${sim.qs.map((n, i) => `<section class="examq"><div class="qcard"><span class="eyebrow">Subiectul ${i + 1} · Î${n}</span><p>${QT[n]}</p></div>
    <label class="sr" for="ex-${i}">Răspunsul la subiectul ${i + 1}</label><textarea id="ex-${i}" class="sheet" data-ex="${i}" placeholder="Răspunsul la subiectul ${i + 1}…">${esc((sim.texts || [])[i] || '')}</textarea></section>`).join('')}
  <div class="actions stick examstick"><span class="timer" id="timer" role="timer" aria-label="${lim ? 'Timp rămas' : 'Timp scurs'}">${lim ? fmt(lim * 60) : '0:00'}</span><button class="btn danger" data-act="simquit">Renunță</button><button class="btn primary" data-act="simsubmit">Predă lucrarea</button></div>`);
  stopTimer();
  const tick = () => {
    const el = document.getElementById('timer'); if (!el) { stopTimer(); return; }
    const used = (Date.now() - sim.start) / 1000;
    if (lim) { const left = lim * 60 - used; el.textContent = fmt(left); el.classList.toggle('low', left <= 120); if (left <= 0) { stopTimer(); simSubmit(true); } }
    else el.textContent = fmt(used);
  };
  tick(); tInt = setInterval(tick, 500);
}
let simRes = null;
function simSubmit(timeUp) {
  if (!sim || !sim.start) return;
  stopTimer();
  const texts = sim.qs.map((_, i) => { const ta = document.getElementById('ex-' + i); return ta ? ta.value : ((sim.texts || [])[i] || ''); });
  const secs = Math.round((Date.now() - sim.start) / 1000);
  const res = sim.qs.map((n, i) => { const r = gradeOf(n, texts[i], { from: 'sim' }); r.score = pct(scoreRubric(applyOvr(r))); recordWrite(n, r.score); return r; });
  simRes = { res, secs, timeUp: !!timeUp, lim: sim.lim };
  store.sims.unshift({ ts: Date.now(), qs: sim.qs.slice(), sc: res.map(r => r.score), secs });
  store.sims = store.sims.slice(0, 30);
  sim = null; delete store.simCur; save();
  go('bilet-rezultat');
}
function viewSimResult() {
  if (!simRes) { go('bilet'); return; }
  const avg = Math.round(simRes.res.reduce((a, r) => a + pct(scoreRubric(applyOvr(r))), 0) / simRes.res.length);
  app.innerHTML = frame('bilet', `
  <section class="verdict"><p class="was">Simulare încheiată${simRes.timeUp ? ' · timpul a expirat' : ''} · ${fmt(simRes.secs)}${simRes.lim ? ' din ' + simRes.lim + ':00' : ''}</p><h1>Media pe cele două subiecte: ${avg}%</h1></section>
  ${simRes.res.map((r, i) => `<section class="sec" style="margin-top:28px"><p class="eyebrow">Subiectul ${i + 1} · ${qtag(r.n, false)}</p><h2 style="margin:6px 0 4px">${QT[r.n]}</h2>${resultBody(r, { idx: i })}</section>`).join('')}
  <div class="actions stick"><a class="btn" href="#bilet">Înapoi la bilete</a><button class="btn primary" data-act="simagain">Altă simulare</button></div>`);
}

/* ---------- SCHEME ---------- */
let schemeFilter = 'all';
function viewScheme() {
  const secs = CH.map(c => {
    const items = [];
    QN.filter(n => n >= c.from && n <= c.to).forEach(n => Q[n].learn.forEach(b => {
      if (b[0] !== 'flow' && b[0] !== 'fig') return;
      if (items.find(x => x.kind === b[0] && x.id === b[1])) return;
      items.push({ kind: b[0], id: b[1], n });
    }));
    const shown = items.filter(it => schemeFilter === 'all' || (schemeFilter === 'flow') === (it.kind === 'flow'));
    if (!shown.length) return '';
    return `<section class="chsec" id="sch-${c.id}"><header><h2>${c.n}</h2><span class="eyebrow">${shown.length} ${plural(shown.length, 'schemă', 'scheme')}</span></header><div class="atl">${shown.map(it => {
      const qs = it.kind === 'flow' ? (FLOWQ[it.id] || [it.n]) : (FIGMETA[it.id] ? FIGMETA[it.id].q : [it.n]);
      return `<article class="atl-card"><header><span class="eyebrow">${it.kind === 'flow' ? 'Cascadă' : 'Grafic / tabel'}</span><span class="row" style="gap:6px">${qs.map(q => qtag(q)).join('')}</span></header>${it.kind === 'flow' ? flowHTML(it.id, true) : FIGS[it.id]({})}</article>`;
    }).join('')}</div></section>`;
  }).join('');
  app.innerHTML = frame('scheme', `
  <section class="qhead"><p class="eyebrow">Scheme</p><h1>Toate schemele, într-un loc</h1>
  <p class="muted">Cascadele și graficele din LP, redesenate, cu întrebările la care le folosești. Pentru recapitularea rapidă apasă „Doar esențialul”: rămân numai titlurile pașilor.</p></section>
  <div class="schbar">
    <div class="seg" role="group" aria-label="Ce arăt">${[['all', 'Toate'], ['flow', 'Cascade'], ['fig', 'Grafice']].map(([v, l]) => `<button data-act="schf" data-v="${v}" aria-pressed="${schemeFilter === v}">${l}</button>`).join('')}</div>
    <button type="button" class="btn sm" data-act="essopt" aria-pressed="${!!store.settings.ess}">${store.settings.ess ? 'Arată detaliile' : 'Doar esențialul'}</button>
  </div>
  <nav class="chips" aria-label="Capitole" style="margin:12px 0 4px">${CH.map(c => `<button class="chip" data-act="jump" data-id="sch-${c.id}">${c.s}</button>`).join('')}</nav>
  ${secs}`);
}
function viewAnexa() {
  const e = EXTRA[0];
  app.innerHTML = frame('invata', `<section class="qhead"><div class="meta"><span class="qtag">Anexă</span><span class="eyebrow">LP 1</span></div><h1>${e.t}</h1></section>
  <div class="sum"><span class="eyebrow">De ce e aici</span>${e.intro}</div>${blocks(e.learn)}<p class="srcline">Sursa: ${e.src}</p>`);
}

/* ---------- router ---------- */
/* Navigarea e internă: nu depinde de adresa paginii. Când fișierul e deschis într-un
   vizualizator izolat (previzualizare în aplicație, vizualizator de fișiere pe telefon),
   linkele #... sunt rezolvate față de pagina-gazdă și nu duc nicăieri; aici le interceptăm. */
const CAN_HASH = (() => { try { return /^(https?|file):$/.test(location.protocol); } catch (_) { return false; } })();
let cur = (() => { try { return CAN_HASH ? decodeURIComponent((location.hash || '').slice(1)) : ''; } catch (_) { return ''; } })() || 'acasa';
let skipHash = null;
function go(h) {
  h = String(h || '').replace(/^#/, '') || 'acasa';
  cur = h;
  route();
  if (CAN_HASH) { try { if (location.hash.slice(1) !== h) { skipHash = h; location.hash = h; } } catch (_) {} }
}
function route() {
  const h = cur || 'acasa';
  if (!h.startsWith('q-') || !h.endsWith('-r')) { if (h !== 'bilet-examen') stopTimer(); }
  let m;
  if ((m = h.match(/^q-(\d+)(?:-([crk]))?$/)) && Q[+m[1]]) {
    const n = +m[1];
    if (m[2] === 'c') viewQCloze(n); else if (m[2] === 'r') viewQWrite(n); else if (m[2] === 'k') viewQCascade(n); else viewQ(n);
  }
  else if (h === 'invata') viewLearn();
  else if (h === 'completeaza') viewCloze();
  else if (h === 'redacteaza') viewWritePick();
  else if (h === 'rezultat') viewResult();
  else if (h === 'cascade') viewCascades();
  else if (h === 'bilet') viewBilet();
  else if (h === 'bilet-examen') viewExam();
  else if (h === 'bilet-rezultat') viewSimResult();
  else if (h === 'scheme') viewScheme();
  else if (h === 'anexa') viewAnexa();
  else viewHome();
  if (h !== 'completeaza' || !cz) window.scrollTo(0, 0);
}
window.addEventListener('hashchange', () => {
  let h = ''; try { h = decodeURIComponent(location.hash.slice(1)); } catch (_) {}
  if (h === skipHash) { skipHash = null; return; }
  skipHash = null;
  h = h || 'acasa';
  if (h !== cur) { cur = h; route(); }
});

function twoTap(el, label, fn) {
  if (el.dataset.armed === '1') { fn(); return; }
  const old = el.textContent; el.dataset.armed = '1'; el.textContent = label;
  setTimeout(() => { if (el.isConnected) { el.dataset.armed = ''; el.textContent = old; } }, 3000);
}

/* ---------- evenimente ---------- */
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (a && !e.defaultPrevented && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey) { e.preventDefault(); go(a.getAttribute('href')); return; }
  const el = e.target.closest('[data-act]'); if (!el) return;
  const act = el.dataset.act;
  switch (act) {
    case 'why': el.setAttribute('aria-expanded', el.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'); break;
    case 'stepstart': stepTo(el.closest('.flow'), 0); break;
    case 'schf': schemeFilter = el.dataset.v; viewScheme(); break;
    case 'jump': { const t = document.getElementById(el.dataset.id); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); break; }
    case 'essopt': {
      store.settings.ess = !store.settings.ess; save();
      document.body.classList.toggle('ess', store.settings.ess);
      document.querySelectorAll('[data-act="essopt"]').forEach(b => { b.setAttribute('aria-pressed', String(store.settings.ess)); b.textContent = store.settings.ess ? 'Arată detaliile' : 'Doar esențialul'; });
      break;
    }
    case 'stepnext': { const fl = el.closest('.flow'); stepTo(fl, (+fl.dataset.step || 0) + 1); break; }
    case 'stepall': { const fl = el.closest('.flow'); stepTo(fl, +fl.dataset.n); break; }
    case 'reset': twoTap(el, 'Apasă din nou ca să ștergi tot', () => { store = Object.assign(load(), { q: {}, czs: {}, kz: {}, drafts: {}, sims: [], fx: {} }); delete store.simCur; save(); viewHome(); }); break;
    /* completare */
    case 'bankopt': store.settings.bank = el.checked; save(); route(); break;
    case 'bank': {
      const box = el.closest('.cz'); const inp = (lastBl && box.contains(lastBl) && !lastBl.value ? lastBl : null) || [...box.querySelectorAll('input.bl')].find(x => !x.value && !x.readOnly);
      if (inp && !inp.readOnly) { inp.value = el.dataset.v; el.classList.add('used'); const nx = [...box.querySelectorAll('input.bl')].find(x => !x.value); if (nx) nx.focus(); }
      break;
    }
    case 'czcheckall': {
      const n = +el.dataset.n; let g = 0, t = 0;
      document.querySelectorAll('.cz').forEach(c => { const r = checkCloze(c); g += r.good; t += r.total; });
      const res = document.getElementById('czres');
      if (res) { res.innerHTML = `<div class="czscore"><b>${pct(g / t)}%</b><span class="muted">${g} din ${t} spații corecte la Î${n}.</span></div>`; res.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
      break;
    }
    case 'czreset': viewQCloze(+el.dataset.n); break;
    case 'czch': { const id = el.dataset.ch, L = store.settings.czCh; store.settings.czCh = L.includes(id) ? L.filter(x => x !== id) : L.concat(id); save(); viewCloze(); break; }
    case 'czn': store.settings.czN = +el.dataset.v; save(); viewCloze(); break;
    case 'czweak': store.settings.czWeak = el.checked; save(); viewCloze(); break;
    case 'czstart': { let pool = shuffle(clozePool()); const N = store.settings.czN; if (N) pool = pool.slice(0, N); cz = { items: pool, pos: 0, res: [] }; viewClozeRun(); window.scrollTo(0, 0); break; }
    case 'czone': {
      const box = app.querySelector('.cz'); if (!box || !cz) break;
      if (box.dataset.checked) { cz.pos++; viewClozeRun(); window.scrollTo(0, 0); break; }
      const r = checkCloze(box); box.dataset.checked = '1';
      cz.res.push({ n: +box.dataset.n, i: +box.dataset.i, good: r.good, total: r.total });
      const n = +box.dataset.n;
      document.getElementById('czfb').innerHTML = r.good === r.total ? '' : `<p class="small muted" style="margin-top:10px">Recitește <a href="#q-${n}">explicația pentru Î${n}</a> dacă nu ești sigur.</p>`;
      el.textContent = cz.pos + 1 < cz.items.length ? 'Următorul enunț' : 'Vezi rezultatul';
      el.focus();
      break;
    }
    case 'czquit': if (cz && cz.res.length) { cz.items = cz.items.slice(0, cz.pos); viewClozeEnd(); } else { cz = null; viewCloze(); } break;
    case 'czwrong': { const items = cz.res.filter(r => r.good < r.total).map(r => [r.n, r.i]); cz = { items: shuffle(items), pos: 0, res: [] }; viewClozeRun(); break; }
    case 'cznew': cz = null; viewCloze(); break;
    /* redactare */
    case 'liveopt': { store.settings.live = el.checked; save(); const c = document.getElementById('count'); if (c) { c.hidden = !el.checked; onAns(); } break; }
    case 'hint': if (wr) { wr.hint = true; document.getElementById('hint').innerHTML = hintHTML(wr.n); el.hidden = true; } break;
    case 'wfinish': finishWrite(); break;
    case 'wretry': if (last) { store.drafts[last.n] = last.text; save(); wr = null; go('q-' + last.n + '-r'); } break;
    case 'wrand': { const [n] = weightedPick(1); wr = null; go('q-' + n + '-r'); break; }
    case 'toggle': {
      const k = el.dataset.k, ri = el.dataset.r;
      const res = ri === '' ? last : (simRes && simRes.res[+ri]); if (!res) break;
      const flat = applyOvr(res).flatMap(s => s.pts); const p = flat.find(x => x.key === k); if (!p) break;
      const nv = !p.hit; if (nv === p.auto) delete res.ovr[k]; else res.ovr[k] = nv;
      const sc = pct(scoreRubric(applyOvr(res)));
      const r = store.q[res.n]; if (r) { r.last = sc; r.best = Math.max(r.best || 0, sc); save(); }
      if (simRes && ri !== '') { const s0 = store.sims[0]; if (s0) { s0.sc[+ri] = sc; save(); } }
      const y = window.scrollY; if (ri === '') viewResult(); else viewSimResult(); window.scrollTo(0, y);
      const again = document.querySelector(`[data-k="${k}"][data-r="${ri}"]`); if (again) again.focus({ preventScroll: true });
      break;
    }
    /* cascade */
    case 'kzadd': { const st = kz[el.dataset.key]; st.order.push(+el.dataset.ix); refreshKz(el.dataset.key); break; }
    case 'kzrem': { const st = kz[el.dataset.key]; st.order.splice(+el.dataset.p, 1); refreshKz(el.dataset.key); break; }
    case 'kzreset': { kzInit(el.dataset.key); refreshKz(el.dataset.key); break; }
    case 'kzcheck': {
      const key = el.dataset.key, st = kz[key]; st.done = true;
      const ok = st.order.filter((ix, p) => ix === p).length, sc = pct(ok / FLOWS[key].ord.length);
      store.kz[key] = Math.max(store.kz[key] || 0, sc); save(); refreshKz(key); break;
    }
    /* bilet */
    case 'simtime': store.settings.simTime = +el.dataset.v; save(); viewBilet(); break;
    case 'weakopt': store.settings.weak = el.checked; save(); break;
    case 'simdraw': simDraw(); break;
    case 'simstart': if (sim) { sim.start = Date.now(); sim.lim = store.settings.simTime; sim.texts = ['', '']; store.simCur = sim; save(); go('bilet-examen'); } break;
    case 'simsubmit': twoTap(el, 'Sigur? Apasă din nou', () => simSubmit(false)); break;
    case 'simquit': twoTap(el, 'Renunți? Apasă din nou', () => { stopTimer(); sim = null; delete store.simCur; save(); go('bilet'); }); break;
    case 'simagain': simRes = null; simDraw(); go('bilet'); break;
  }
});
document.addEventListener('input', e => {
  const t = e.target;
  if (t.id === 'ans') onAns();
  else if (t.id === 'qsearch') { const l = document.getElementById('qlist'); if (l) l.innerHTML = learnList(t.value); }
  else if (t.dataset && t.dataset.ex != null && sim) { sim.texts = sim.texts || ['', '']; sim.texts[+t.dataset.ex] = t.value; store.simCur = sim; clearTimeout(cntT); cntT = setTimeout(save, 400); }
});
let lastBl = null;
document.addEventListener('focusin', e => { if (e.target.classList && e.target.classList.contains('bl')) lastBl = e.target; });
document.addEventListener('keydown', e => {
  const t = e.target;
  if (e.key === 'Enter' && t.classList && t.classList.contains('bl')) {
    e.preventDefault();
    const all = [...document.querySelectorAll('input.bl:not([readonly])')];
    const i = all.indexOf(t);
    if (i >= 0 && i < all.length - 1) all[i + 1].focus();
    else { const go = document.getElementById('czgo') || document.querySelector('[data-act="czcheckall"]'); if (go) go.click(); }
  } else if (e.key === 'Enter' && document.getElementById('czgo') && app.querySelector('.cz[data-checked]') && t.tagName !== 'TEXTAREA') {
    e.preventDefault(); document.getElementById('czgo').click();
  }
});

route();
})();
