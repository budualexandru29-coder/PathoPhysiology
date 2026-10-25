/* ===================== FIGURI INTERACTIVE ===================== */
/* ===== Figuri interactive (FX) =====
   Un motor comun pentru toate figurile interactive. Fiecare figură este o specificație:
     ctl      singura variabilă pe care o manipulezi (cursor sau opțiuni)
     parts    punctele pe care apeși; fiecare are `q`: {nr. întrebare: ['secțiune:punct', ...]} = punctele din barem
     stage    desenul (SVG sau HTML), cu etichete ascunse în modul „Etichete”
     panel    lanțurile de pași care depind de valoarea variabilei
   Modurile: Prezice (întâi alegi, apoi dezvălui), Explorează, Etichete (le completezi tu),
   Ordonează (pașii unei cascade) și Sortează (caracteristici pe stadii), când figura le definește în `games`.
   `neutral`: valoarea cu care se desenează scena înainte de „Dezvăluie” (ca să nu fie dat răspunsul).
   Textul din `parts[].body` este textul diapozitivului; ce nu e în curs poartă `ctx` și sursa lui. */
const FX = { specs: {}, st: new WeakMap(), n: 0, persist: null };

FX.def = function (key, spec) {
  spec.key = key;
  FX.specs[key] = spec;
  FIGMETA[key] = { t: spec.meta || spec.title, q: spec.qs.slice() };
  FIGS[key] = function (o) { return FX.render(key, o || {}); };
};
FX.fmtDef = v => String(v).replace('.', ',');
FX.plain = h => String(h).replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
FX.isOn = function (p, S) { return p.on == null ? true : Array.isArray(p.on) ? p.on.includes(S.stop) : p.on(S); };
FX.rub = function (n, ref) {
  const [s, p] = ref.split(':').map(Number), sec = Q[n].rub[s], pt = sec[1][p];
  return { sec: sec[0], label: pt[0], w: pt[2] || 1 };
};
FX.totalPts = n => Q[n].rub.reduce((a, s) => a + s[1].length, 0);
FX.shuffleA = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
FX.initState = function (spec, o) {
  const c = spec.ctl, S = { mode: spec.tour ? 'tour' : 'explore', tour: 0, tauto: null, stop: 0, v: null, vv: null, seen: new Set(), sel: null, rev: false, qz: null, lab: null, ord: null, sort: null, play: null, key: spec.key };
  if (c.type === 'range') S.v = o.v != null ? +o.v : (spec.initV ? spec.initV(o) : c.init);
  if (spec.tour) S.tour = spec.tourStart ? spec.tourStart(o) : 0;
  else S.stop = o.stop != null ? +o.stop : (c.init || 0);
  return S;
};
/* valoarea desenată: înainte de „Dezvăluie” scena rămâne neutră, ca să nu dea răspunsul */
FX.effV = (spec, S) => {
  if (S.mode === 'tour' && spec.tour) { const st = spec.tour[S.tour]; if (st && st.dv != null) return st.dv; }
  return (spec.neutral != null && ((S.mode === 'predict' && !S.rev) || S.peek)) ? spec.neutral : S.v;
};
FX.stateLabel = function (spec, S) {
  const c = spec.ctl;
  return c.type === 'range' ? (c.fmt || FX.fmtDef)(S.v) : c.stops[S.stop].t;
};

/* ---------- ajutoare de desen ---------- */
FX.helpers = function (spec) {
  const H = {
    /* nod HTML apăsabil (un punct din barem) */
    node(id, cls, extra) {
      const p = spec.parts[id]; if (!p) throw new Error('part? ' + id);
      return `<button type="button" class="fxp fxn ${cls || ''} ${p.ctx ? 'ctxn' : ''}" data-p="${id}" aria-pressed="false">${p.node || `<b>${p.t}</b>`}${extra || ''}</button>`;
    },
    /* grup SVG apăsabil */
    spart(id, inner, cls) {
      const p = spec.parts[id]; if (!p) throw new Error('part? ' + id);
      return `<g class="fxp ${cls || ''}" data-p="${id}" tabindex="0" role="button" aria-label="${esc(FX.plain(p.t))}">${inner}</g>`;
    },
    /* etichetă ascunsă (HTML) */
    lab(id, text, cls) {
      return `<span class="lab ${cls || ''}" data-lab="${id}" data-text="${esc(text)}"><span class="lr">${text}</span><span class="lq" aria-hidden="true">?</span></span>`;
    },
    /* etichetă ascunsă în SVG, centrată pe (cx, cy) */
    slab(id, text, cx, cy, o) {
      o = o || {}; const fs = o.fs || 11, lh = fs + 2, cls = o.cls || 't';
      const lines = o.lines || [text], n = lines.length;
      const y0 = cy - (n - 1) * lh / 2 + fs * .35;
      const w = o.w || 44, hh = o.h || 17;
      return `<g class="lab" data-lab="${id}" data-text="${esc(text)}">`
        + `<text class="lr ${cls}" x="${cx}" y="${y0.toFixed(1)}" text-anchor="middle" font-size="${fs}">${lines.map((l, i) => `<tspan x="${cx}" dy="${i ? lh : 0}">${esc(l)}</tspan>`).join('')}</text>`
        + `<g class="lq"><rect class="lq-r" x="${(cx - Math.min(w, 80) / 2).toFixed(1)}" y="${(cy - Math.min(hh, 24) / 2).toFixed(1)}" width="${Math.min(w, 80)}" height="${Math.min(hh, 24)}" rx="5"/><text class="lq-t" x="${cx}" y="${(cy + 4.2).toFixed(1)}">?</text></g></g>`;
    },
    /* etichetă cu linie de ghidaj care se termină pe piesă: (tx,ty) = punctul de pe piesă, (lx,ly) = capătul etichetei.
       al = 'l' | 'r' | 'c': unde stă textul față de (lx,ly). Linia se termină într-un punct, ca în skill-ul anima. */
    co(id, text, tx, ty, lx, ly, al, o) {
      o = o || {}; const fs = o.fs || 11, lines = o.lines || [text], w = Math.max(...lines.map(l => l.length)) * fs * .56 + 6;
      const cx = al === 'l' ? lx - w / 2 : al === 'r' ? lx + w / 2 : lx;
      const lead = `<path class="lead" d="M${tx} ${ty}L${lx} ${ly}"/><circle class="lead-d" cx="${tx}" cy="${ty}" r="2.1"/>`;
      return `<g class="co">${lead}${H.slab(id, text, cx, ly + (o.dy || 0), { fs, lines, cls: o.cls || 't', w: Math.min(80, w), h: lines.length > 1 ? 30 : 17 })}</g>`;
    },
    wrap: (s, n) => wrapTxt(s, n),
    esc,
  };
  return H;
};

/* ---------- construirea figurii ---------- */
FX.ctlHTML = function (spec, S, id) {
  const c = spec.ctl;
  if (c.type === 'range') {
    return `<div class="fx-ctl"><label class="fx-cl" for="${id}-r"><span>${c.label}</span><output data-var>${(c.fmt || FX.fmtDef)(S.v)}</output></label>
      <input class="fx-range" id="${id}-r" type="range" min="${c.min}" max="${c.max}" step="${c.step}" value="${S.v}" data-fxr aria-valuetext="${(c.fmt || FX.fmtDef)(S.v)}">
      ${c.peek ? `<div class="fx-playrow"><button type="button" class="btn soft fx-peek" data-fxa="peek" aria-pressed="false">${c.peek}</button></div>` : ''}
      <p class="fx-now" data-now></p></div>`;
  }
  return `<div class="fx-ctl"><div class="fx-cl"><span id="${id}-l">${c.label}</span></div>
    <div class="fx-stops" role="group" aria-labelledby="${id}-l">${c.stops.map((s, i) => `<button type="button" data-fxa="stop" data-i="${i}" aria-pressed="${i === S.stop}">${s.t}</button>`).join('')}</div>
    <p class="fx-now" data-now></p></div>`;
};
FX.render = function (key, o) {
  const spec = FX.specs[key], id = 'fx' + (++FX.n), S = FX.initState(spec, o), H = FX.helpers(spec);
  const learn = [];
  if (spec.tour) learn.push(['tour', 'Tur ghidat']);
  learn.push(['explore', 'Explorează']);
  const prac = [['predict', 'Prezice'], ['labels', 'Etichete']];
  if (spec.games && spec.games.order) prac.push(['order', spec.games.order.mode || 'Ordonează']);
  if (spec.games && spec.games.sort) prac.push(['sort', spec.games.sort.mode || 'Sortează']);
  const qs = spec.qs.map(q => `<span>Î${q}</span>`).join('');
  const KIND = { met: 'metaforă mecanică', chart: 'grafic din tabelul LP', lit: 'schemă literală', mix: 'anatomie schematică' };
  const m0 = S.mode;
  const st0 = spec.stage(o, H, S), ST = typeof st0 === 'string' ? { view: st0, legend: '' } : st0;
  const seg = arr => arr.map(([m, l]) => `<button type="button" data-fxa="mode" data-m="${m}" aria-pressed="${m === m0}">${l}</button>`).join('');
  return `<figure class="fig xfig" id="${id}" data-fx="${key}" data-mode="${m0}" data-rev="0" data-anim="${typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1}" data-q="${o.q || ''}" data-stop="${S.stop}"${S.v != null ? ` data-v="${S.v}"` : ''}>
    <div class="fx-head"><span class="ft">${spec.title}</span>
      <div class="fx-meta"><span class="fx-kind ${spec.kind}">${KIND[spec.kind] || spec.kind}</span><span class="fx-qs">${qs}</span>
      <button type="button" class="fx-info" data-fxa="info" aria-expanded="false">Despre desen</button>
      <button type="button" class="fx-anim" data-fxa="anim" aria-pressed="true" title="Pornește sau oprește mișcarea din desen">Mișcare: pornită</button></div></div>
    <p class="fx-note" data-note hidden>${spec.note}</p>
    <div class="fx-nav" role="group" aria-label="Mod de lucru">
      <div class="fx-ng"><span class="fx-nl">Învață</span><div class="seg fx-modes">${seg(learn)}</div></div>
      <div class="fx-ng"><span class="fx-nl">Exersează</span><div class="seg fx-modes">${seg(prac)}</div></div>
    </div>
    <div class="fx-body">
      <div class="fx-view"><div class="fx-stage">${ST.view}</div><div class="fx-tnav" data-tnav hidden></div></div>
      <div class="fx-side">
        <div class="fx-tour" data-tour aria-live="polite"></div>
        <p class="fx-hint" data-hint></p>
        <div class="fx-detail" data-detail hidden aria-live="polite"></div>
        ${FX.ctlHTML(spec, S, id)}
        <div class="fx-quiz" data-quiz></div>
        <div class="fx-bank" data-bank hidden></div>
        <div class="fx-game" data-game hidden></div>
        <div class="fx-legend" data-legend>${ST.legend || ''}</div>
        <div class="fx-panel" data-panel hidden>${spec.panel ? spec.panel(S, H) : ''}</div>
        <div class="fx-prog" data-prog></div>
      </div>
    </div>
    <figcaption>Sursa: ${spec.src}.<span class="nm">Educațional, nu sfat medical.${Object.values(spec.parts).some(p => p.ctx) ? ' Chenarele cu bordură punctată conțin explicații care nu sunt în diapozitive.' : ''}</span></figcaption>
  </figure>`;
};

/* ---------- instanța: stare și redesenare ---------- */
FX.get = function (el) {
  let S = FX.st.get(el);
  if (!S) {
    const spec = FX.specs[el.dataset.fx];
    S = FX.initState(spec, { v: el.dataset.v, stop: el.dataset.stop });
    S.mode = el.dataset.mode || (spec.tour ? 'tour' : 'explore');
    FX.st.set(el, S);
  }
  return S;
};
FX.specOf = el => FX.specs[el.dataset.fx];
FX.ready = function (el) {
  if (el.dataset.ready) return;
  el.dataset.ready = '1';
  const spec = FX.specOf(el), S = FX.get(el);
  if (spec.init) spec.init(el, {
    setV: v => FX.setVar(el, v),
    getV: () => FX.get(el).v,
    min: spec.ctl.min, max: spec.ctl.max, step: spec.ctl.step,
  });
  FX.setAnim(el, el.dataset.anim === '1');
  FX.setMode(el, S.mode, true);
};
FX.setAnim = function (el, on) {
  el.dataset.anim = on ? '1' : '0';
  const b = el.querySelector('[data-fxa="anim"]');
  if (b) { b.setAttribute('aria-pressed', String(on)); b.textContent = on ? 'Mișcare: pornită' : 'Mișcare: oprită'; }
};
FX.setVar = function (el, v, keepPlay) {
  const spec = FX.specOf(el), S = FX.get(el), c = spec.ctl;
  if (!keepPlay) FX.stopPlay(el);
  if (c.type === 'range') {
    v = Math.min(c.max, Math.max(c.min, Math.round(v / c.step) * c.step));
    v = +v.toFixed(3);
    if (v === S.v) return;
    S.v = v;
    const r = el.querySelector('[data-fxr]'); if (r) { r.value = v; r.setAttribute('aria-valuetext', (c.fmt || FX.fmtDef)(v)); }
  }
  S.sel = null;
  FX.afterVar(el);
};
FX.setStop = function (el, i) {
  const S = FX.get(el); if (S.stop === i && el.dataset.drawn) return;
  S.stop = i; S.sel = null; el.dataset.stop = i;
  el.querySelectorAll('[data-fxa="stop"]').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.i === i)));
  FX.afterVar(el);
};
FX.afterVar = function (el) {
  const S = FX.get(el);
  if (S.peek) { S.peek = false; el.dataset.peek = '0'; const pb = el.querySelector('[data-fxa="peek"]'); if (pb) { pb.setAttribute('aria-pressed', 'false'); pb.textContent = FX.specOf(el).ctl.peek; } }
  if (S.mode === 'predict') { S.rev = false; el.dataset.rev = '0'; FX.buildQuiz(el); }
  FX.draw(el);
};
FX.setMode = function (el, m, force) {
  const S = FX.get(el);
  if (S.mode === m && !force) return;
  S.mode = m; S.sel = null; el.dataset.mode = m; FX.stopPlay(el); FX.tourStop(el);
  if (S.peek) { S.peek = false; el.dataset.peek = '0'; const pb = el.querySelector('[data-fxa="peek"]'); if (pb) { pb.setAttribute('aria-pressed', 'false'); pb.textContent = FX.specOf(el).ctl.peek; } }
  el.querySelectorAll('[data-fxa="mode"]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.m === m)));
  if (m === 'predict') { S.rev = false; el.dataset.rev = '0'; FX.buildQuiz(el); }
  if (m === 'order' && (!S.ord || S.ord.checked)) FX.buildOrder(el);
  if (m === 'sort' && (!S.sort || S.sort.checked)) FX.buildSort(el);
  if (m === 'labels') FX.buildBank(el);
  else FX.clearLabels(el);
  FX.labs(el).forEach(l => { if (m === 'labels') { l.setAttribute('tabindex', '0'); l.setAttribute('role', 'button'); l.setAttribute('aria-label', 'Spațiu de completat'); } else { l.removeAttribute('tabindex'); l.removeAttribute('role'); l.removeAttribute('aria-label'); } });
  if (m === 'tour') { FX.tourGo(el, S.tour || 0); return; }
  FX.draw(el);
};

FX.HINT = {
  tour: '',
  predict: 'Alege valoarea variabilei, spune ce crezi că se întâmplă, apoi apasă „Dezvăluie”: vezi ce spune cursul.',
  explore: 'Mută variabila și apasă pe pașii colorați: fiecare arată textul din curs și punctul din barem pe care îl acoperă.',
  labels: 'Etichetele sunt ascunse. Apasă un spațiu „?”, apoi eticheta potrivită din listă (sau invers), apoi „Verifică”.',
  order: 'Apasă pașii în ordinea din curs, ca atunci când povestești răspunsul. Apasă un pas pus ca să-l scoți. La final apasă „Verifică”.',
  sort: 'Apasă o caracteristică, apoi stadiul căruia îi aparține. Apasă una pusă ca s-o muți. La final apasă „Verifică”.',
};
FX.focusSel = function (el) {
  const a = document.activeElement; if (!a || a === document.body || !el.contains(a)) return null;
  const box = a.closest('[data-quiz],[data-bank],[data-panel],[data-game],[data-tour],[data-tnav]'); if (!box) return null;
  const at = n => a.hasAttribute(n) ? `[${n}="${a.getAttribute(n)}"]` : '';
  const sel = ['data-fxa', 'data-id', 'data-d', 'data-i', 'data-m', 'data-p', 'data-pos', 'data-b'].map(at).join('');
  const bx = box.hasAttribute('data-quiz') ? '[data-quiz]' : box.hasAttribute('data-bank') ? '[data-bank]' : box.hasAttribute('data-game') ? '[data-game]' : box.hasAttribute('data-tour') ? '[data-tour]' : box.hasAttribute('data-tnav') ? '[data-tnav]' : '[data-panel]';
  return { bx, sel };
};
FX.draw = function (el) {
  const fk = typeof document !== 'undefined' ? FX.focusSel(el) : null;
  FX.draw1(el);
  if (fk) {
    let t = fk.sel ? el.querySelector(fk.bx + ' ' + fk.sel) : null;
    if (!t) { const b = el.querySelector(fk.bx); t = b && b.querySelector('button:not([disabled])'); }
    if (t) t.focus({ preventScroll: true });
  }
};
FX.draw1 = function (el) {
  const spec = FX.specOf(el), S = FX.get(el), H = FX.helpers(spec), c = spec.ctl;
  el.dataset.drawn = '1';
  /* variabila */
  const out = el.querySelector('[data-var]'); if (out && c.type === 'range') out.textContent = (c.fmt || FX.fmtDef)(S.v);
  const now = el.querySelector('[data-now]'); if (now) now.innerHTML = spec.now ? spec.now(S) : '';
  el.dataset.stop = S.stop; if (S.v != null) el.dataset.v = S.v;
  /* stare grafică (S.vv = valoarea desenată: neutră înainte de „Dezvăluie”) */
  S.vv = FX.effV(spec, S);
  if (spec.update) spec.update(el, S);
  el.querySelectorAll('[data-on]').forEach(n => n.classList.toggle('off', !n.dataset.on.split(' ').includes(String(S.stop))));
  el.querySelectorAll('[data-showon]').forEach(n => { n.hidden = !n.dataset.showon.split(' ').includes(String(S.stop)); });
  /* panou */
  const hint = el.querySelector('[data-hint]'); if (hint) hint.textContent = (spec.hints && spec.hints[S.mode]) || FX.HINT[S.mode];
  const panel = el.querySelector('[data-panel]'), quiz = el.querySelector('[data-quiz]'), bank = el.querySelector('[data-bank]'), det = el.querySelector('[data-detail]'), game = el.querySelector('[data-game]');
  const showPanel = S.mode === 'explore' || (S.mode === 'predict' && S.rev);
  const showPanelSel = showPanel || (S.mode === 'order' && S.ord && S.ord.checked) || (S.mode === 'sort' && S.sort && S.sort.checked);
  const gm = S.mode === 'order' ? S.ord : S.mode === 'sort' ? S.sort : null, gDone = !!(gm && gm.checked);
  quiz.hidden = S.mode !== 'predict'; bank.hidden = S.mode !== 'labels'; game.hidden = !gm;
  panel.hidden = !(S.mode === 'explore' || (S.mode === 'predict' && S.rev)); det.hidden = !(showPanel || gDone);
  const tourBox = el.querySelector('[data-tour]'); tourBox.hidden = S.mode !== 'tour'; el.querySelector('[data-tnav]').hidden = S.mode !== 'tour'; if (S.mode === 'tour') FX.tourHTML(el);
  const leg = el.querySelector('[data-legend]'); if (leg) leg.hidden = !(S.mode === 'explore' || S.mode === 'labels' || (S.mode === 'predict' && S.rev));
  const ctlBox = el.querySelector('.fx-ctl'); if (ctlBox) ctlBox.hidden = !(S.mode === 'explore' || S.mode === 'predict');
  if (hint) hint.hidden = !hint.textContent;
  if (S.mode === 'predict') FX.quizHTML(el);
  if (S.mode === 'order') FX.orderHTML(el);
  if (S.mode === 'sort') FX.sortHTML(el);
  if (showPanel) {
    panel.innerHTML = spec.panel ? spec.panel(S, H) : '';
    panel.querySelectorAll('[data-p]').forEach(n => { const id = n.dataset.p; n.classList.toggle('seen', S.seen.has(id)); n.setAttribute('aria-pressed', String(S.sel === id)); });
  }
  if (showPanel || gDone) FX.detailHTML(el);
  el.querySelectorAll('svg [data-p]').forEach(n => { const p = spec.parts[n.dataset.p]; n.classList.toggle('off', !FX.isOn(p, S)); });
  el.querySelectorAll('[data-p]').forEach(n => { if (n.closest('[data-panel]')) return; n.classList.toggle('sel', !!showPanelSel && S.sel === n.dataset.p); });
  if (S.mode === 'labels') FX.bankHTML(el);
  FX.progHTML(el);
  FX.applyFocus(el);
};

/* ---------- detaliul unui punct ---------- */
FX.showPart = function (el, id) {
  const S = FX.get(el);
  if (S.mode === 'tour') { const i = FX.specOf(el).tour.findIndex(st => (st.parts || []).includes(id) || (st.hl || []).includes(id)); if (i >= 0) FX.tourGo(el, i); return; }
  if (S.mode === 'labels' || (S.mode === 'predict' && !S.rev)) return;
  if ((S.mode === 'order' && !(S.ord && S.ord.checked)) || (S.mode === 'sort' && !(S.sort && S.sort.checked))) return;
  S.sel = id; S.seen.add(id);
  FX.draw(el);
  const d = el.querySelector('[data-detail]'); if (d && d.getBoundingClientRect().top > window.innerHeight - 60) d.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
};
FX.detailHTML = function (el) {
  const spec = FX.specOf(el), S = FX.get(el), d = el.querySelector('[data-detail]');
  const p = S.sel && spec.parts[S.sel];
  if (!p) { d.innerHTML = '<span class="fx-empty">Apasă un pas colorat ca să vezi textul din curs și punctul din barem pe care îl acoperă.</span>'; return; }
  const rt = Object.keys(p.q || {}).map(n => p.q[n].map(ref => { const r = FX.rub(+n, ref); return `<li><b>Î${n}</b> · ${r.sec} → ${r.label}${r.w > 1 ? ' ×2' : ''}</li>`; }).join('')).join('');
  d.innerHTML = `<span class="k ${p.ctx ? 'ctx' : ''}">${p.ctx ? 'Explicație suplimentară, nu e în diapozitive' : 'Din curs · ' + p.slide}</span>
    <b class="t">${p.t}</b><p>${p.body}</p>
    ${p.ctx && typeof p.ctx === 'string' ? `<p class="src">Sursa explicației: ${p.ctx}</p>` : ''}
    ${rt ? `<ul class="rt" aria-label="Puncte din barem">${rt}</ul>` : ''}`;
};
FX.progHTML = function (el) {
  const spec = FX.specOf(el), S = FX.get(el), prog = el.querySelector('[data-prog]');
  const pts = {}; // n -> Set(ref) atinse
  S.seen.forEach(id => { const p = spec.parts[id]; Object.keys(p.q || {}).forEach(n => { (pts[n] = pts[n] || new Set()); p.q[n].forEach(r => pts[n].add(r)); }); });
  const best = FX.persist && FX.persist.get(spec.key) || {};
  const b = [best.pred != null ? `prezicere ${best.pred}%` : '', best.lab != null ? `etichete ${best.lab}%` : '', best.ord != null ? `ordine ${best.ord}%` : '', best.sort != null ? `sortare ${best.sort}%` : ''].filter(Boolean).join(' · ');
  const only = el.dataset.q ? spec.qs.filter(n => String(n) === el.dataset.q) : spec.qs;
  prog.innerHTML = (only.length ? only : spec.qs).map(n => { const t = FX.totalPts(n), g = pts[n] ? pts[n].size : 0; return `<span title="Puncte din baremul întrebării ${n} atinse în această figură">Î${n} <i><u style="width:${t ? Math.round(g / t * 100) : 0}%"></u></i> <b>${g}/${t}</b></span>`; }).join('')
    + (b ? `<span class="fx-best">Cel mai bun: ${b}</span>` : '');
};

/* ---------- Prezice ---------- */
FX.effects = function (spec) { return Object.keys(spec.parts).filter(id => spec.parts[id].eff); };
FX.buildQuiz = function (el) {
  const spec = FX.specOf(el), S = FX.get(el), kind = (spec.predict && spec.predict.kind) || 'pick';
  const eff = FX.effects(spec), on = eff.filter(id => FX.isOn(spec.parts[id], S));
  if (kind === 'dir') {
    S.qz = { kind, items: on.filter(id => spec.parts[id].dir), picks: {}, graded: false };
  } else {
    const off = FX.shuffleA(eff.filter(id => !FX.isOn(spec.parts[id], S)));
    const nd = on.length ? Math.min(off.length, Math.max(2, Math.min(5, 9 - on.length))) : 0;
    S.qz = { kind, items: FX.shuffleA(on.concat(off.slice(0, nd))), correct: on, picks: {}, graded: false };
  }
};
FX.quizHTML = function (el) {
  const spec = FX.specOf(el), S = FX.get(el), Z = S.qz, box = el.querySelector('[data-quiz]');
  const prompt = (spec.predict && spec.predict.prompt) ? spec.predict.prompt(S, FX.stateLabel(spec, S)) : `Ce se întâmplă: ${FX.stateLabel(spec, S)}?`;
  if (!Z || !Z.items.length) {
    box.innerHTML = `<b>${prompt}</b><p class="fx-res">Pentru această valoare nu există nimic de prezis în curs. Mută variabila pe o altă valoare.</p>`; return;
  }
  let body;
  if (Z.kind === 'dir') {
    body = `<div class="fx-dir">${Z.items.map(id => {
      const p = spec.parts[id], pk = Z.picks[id];
      const cls = d => { if (!Z.graded) return ''; if (d === p.dir && pk === d) return 'hit'; if (pk === d) return 'bad'; if (d === p.dir) return 'miss'; return ''; };
      return `<div><span class="dl">${p.dq || p.t}</span><span class="db">${['up', 'down'].map(d => `<button type="button" data-fxa="dir" data-id="${id}" data-d="${d}" class="${cls(d)}" aria-pressed="${pk === d}" aria-label="${d === 'up' ? 'crește' : 'scade'}: ${esc(FX.plain(p.dq || p.t))}">${d === 'up' ? '↑' : '↓'}</button>`).join('')}</span></div>`;
    }).join('')}</div>`;
  } else {
    body = `<div class="fx-qi" role="group" aria-label="Variante">${Z.items.map(id => {
      const p = spec.parts[id], pk = !!Z.picks[id], cor = Z.correct.includes(id);
      const cls = Z.graded ? (pk && cor ? 'hit' : pk && !cor ? 'bad' : !pk && cor ? 'miss' : '') : '';
      return `<button type="button" data-fxa="pick" data-id="${id}" aria-pressed="${pk}" class="${cls}">${p.t}</button>`;
    }).join('')}</div>`;
  }
  let res = '';
  if (Z.graded) {
    const sc = FX.gradeQuiz(el);
    res = `<p class="fx-res"><b>${sc.pct}%</b> · ${sc.hit} din ${sc.tot} corecte${sc.bad ? `, ${sc.bad} ${sc.bad === 1 ? 'greșită' : 'greșite'}` : ''}. Mai jos vezi ce spune cursul.</p>`;
  }
  box.innerHTML = `<b>${prompt}</b>${Z.kind === 'dir' ? '<p class="fx-hint" style="margin:0 0 8px">Pentru fiecare parametru alege sensul: ↑ crește, ↓ scade.</p>' : '<p class="fx-hint" style="margin:0 0 8px">Alege tot ce crezi că se întâmplă. Unele variante aparțin altor valori.</p>'}
    ${body}${res}
    <div class="fx-act">${Z.graded ? '<button type="button" class="btn" data-fxa="again">Încearcă din nou</button>' : `<button type="button" class="btn primary" data-fxa="reveal">Dezvăluie</button>`}</div>`;
};
FX.gradeQuiz = function (el) {
  const spec = FX.specOf(el), S = FX.get(el), Z = S.qz;
  let hit = 0, bad = 0, tot = 0;
  if (Z.kind === 'dir') { Z.items.forEach(id => { tot++; if (Z.picks[id] === spec.parts[id].dir) hit++; else bad++; }); }
  else { tot = Z.correct.length; Z.items.forEach(id => { const pk = !!Z.picks[id], cor = Z.correct.includes(id); if (pk && cor) hit++; else if (pk && !cor) bad++; }); }
  const pct = tot ? Math.max(0, Math.round((hit - (Z.kind === 'dir' ? 0 : bad)) / tot * 100)) : 0;
  return { hit, bad, tot, pct };
};

/* ---------- Etichete ---------- */
FX.labs = el => [...el.querySelectorAll('[data-lab]')];
FX.clearLabels = function (el) {
  const S = FX.get(el); S.lab = null;
  FX.labs(el).forEach(l => { l.classList.remove('filled', 'sel', 'ok', 'no'); const r = l.querySelector('.lr'); if (r) { if (r.tagName.toLowerCase() === 'text') { /* svg: restabilește tspan-urile */ } r.innerHTML = r.dataset.orig || r.innerHTML; } });
};
FX.buildBank = function (el) {
  const S = FX.get(el);
  FX.labs(el).forEach(l => { const r = l.querySelector('.lr'); if (r && !r.dataset.orig) r.dataset.orig = r.innerHTML; l.classList.remove('filled', 'sel', 'ok', 'no'); r.innerHTML = r.dataset.orig; });
  const ids = FX.labs(el).map(l => l.dataset.lab);
  const items = FX.shuffleA(ids.map(id => ({ id, text: el.querySelector(`[data-lab="${id}"]`).dataset.text })));
  S.lab = { items, placed: {}, bsel: null, sel: null, checked: false };
};
FX.bankHTML = function (el) {
  const S = FX.get(el), L = S.lab, box = el.querySelector('[data-bank]'); if (!L) return;
  const used = new Set(Object.values(L.placed));
  const nPlaced = used.size, total = L.items.length;
  let res = '';
  if (L.checked) res = `<p class="fx-res"><b>${L.pct}%</b> · ${L.good} din ${total} etichete corecte.${L.good < total ? ' Cele greșite sunt colorate cu roșu; textul corect se vede când apeși „Arată răspunsurile”.' : ''}</p>`;
  box.innerHTML = `<b>Etichete de completat: ${nPlaced}/${total}</b>
    <p class="fx-hint" style="margin:0">Apasă un „?” din lista de sub desen (numărul lui arată piesa din desen), apoi eticheta potrivită. Apasă o etichetă pusă ca s-o scoți.</p>
    <div class="bk" role="group" aria-label="Etichete disponibile">${L.items.map((it, i) => `<button type="button" data-fxa="bank" data-i="${i}" class="${used.has(i) ? 'used' : ''}" aria-pressed="${L.bsel === i}" ${L.checked ? 'disabled' : ''}>${esc(it.text)}</button>`).join('')}</div>${res}
    <div class="fx-act">${L.checked ? '<button type="button" class="btn" data-fxa="showans">Arată răspunsurile</button><button type="button" class="btn primary" data-fxa="lreset">Reia</button>' : `<button type="button" class="btn primary" data-fxa="lcheck" ${nPlaced ? '' : 'disabled'}>Verifică</button><button type="button" class="btn" data-fxa="lreset">Reia</button>`}</div>`;
  FX.labs(el).forEach(l => { l.classList.toggle('sel', L.sel === l.dataset.lab); });
};
FX.setLabText = function (l, text) {
  const r = l.querySelector('.lr'); if (!r) return;
  if (r.tagName.toLowerCase() === 'text') { const x = r.getAttribute('x'); r.innerHTML = `<tspan x="${x}" dy="0">${esc(text)}</tspan>`; }
  else r.textContent = text;
};
FX.tryPlace = function (el) {
  const S = FX.get(el), L = S.lab; if (!L || L.sel == null || L.bsel == null) return;
  Object.keys(L.placed).forEach(k => { if (L.placed[k] === L.bsel) { delete L.placed[k]; const o = el.querySelector(`[data-lab="${k}"]`); o.classList.remove('filled'); o.querySelector('.lr').innerHTML = o.querySelector('.lr').dataset.orig; } });
  L.placed[L.sel] = L.bsel;
  const lab = el.querySelector(`[data-lab="${L.sel}"]`);
  lab.classList.add('filled'); FX.setLabText(lab, L.items[L.bsel].text);
  L.sel = null; L.bsel = null;
};


/* ---------- Ordonează: pașii cascadei în ordinea din curs ---------- */
FX.buildOrder = function (el) {
  const spec = FX.specOf(el), S = FX.get(el), g = spec.games.order, n = g.items.length;
  let pool = FX.shuffleA(g.items.map((_, i) => i)), tries = 0;
  while (n > 1 && pool.every((v, i) => v === i) && tries++ < 8) pool = FX.shuffleA(pool);
  S.ord = { pool, seq: [], checked: false };
};
FX.orderHTML = function (el) {
  const spec = FX.specOf(el), S = FX.get(el), g = spec.games.order, O = S.ord, box = el.querySelector('[data-game]'); if (!O) return;
  const left = O.pool.filter(i => !O.seq.includes(i));
  const seq = O.seq.map((i, pos) => {
    const cls = O.checked ? (i === pos ? 'hit' : 'bad') : '';
    return `<li class="${cls}"><button type="button" data-fxa="ordrm" data-pos="${pos}" ${O.checked ? 'disabled' : ''}><i>${pos + 1}</i><span>${g.items[i].t}</span></button></li>`;
  }).join('');
  let res = '';
  if (O.checked) {
    res = `<p class="fx-res"><b>${O.pct}%</b> · ${O.good} din ${g.items.length} la locul corect.</p>
      <p class="fx-hint" style="margin:6px 0 4px">Ordinea din curs (apasă un pas ca să vezi textul și punctul din barem):</p>
      <ol class="fx-ord-key">${g.items.map(it => `<li><button type="button" class="fxp fxn ${it.tone || ''}" data-p="${it.parts[0]}" aria-pressed="${S.sel === it.parts[0]}"><b>${it.t}</b></button></li>`).join('')}</ol>`;
  }
  box.innerHTML = `<b>${g.prompt}</b>
    <ol class="fx-ord-seq" aria-label="Ordinea ta">${seq || '<li class="empty">Apasă primul pas de mai jos.</li>'}</ol>
    ${O.checked ? '' : `<div class="fx-ord-pool" role="group" aria-label="Pași rămași">${left.map(i => `<button type="button" data-fxa="ordpick" data-id="${i}">${g.items[i].t}</button>`).join('')}</div>`}
    ${res}
    <div class="fx-act">${O.checked ? '<button type="button" class="btn primary" data-fxa="ordreset">Reia</button>' : `<button type="button" class="btn" data-fxa="ordundo" ${O.seq.length ? '' : 'disabled'}>Înapoi</button><button type="button" class="btn primary" data-fxa="ordcheck" ${O.seq.length ? '' : 'disabled'}>Verifică</button>`}</div>`;
};
FX.ordCheck = function (el) {
  const spec = FX.specOf(el), S = FX.get(el), g = spec.games.order, O = S.ord;
  O.good = O.seq.filter((i, pos) => i === pos).length; O.pct = Math.round(O.good / g.items.length * 100); O.checked = true;
  g.items.forEach(it => it.parts.forEach(id => S.seen.add(id)));
  if (FX.persist) FX.persist.set(spec.key, 'ord', O.pct);
};

/* ---------- Sortează: caracteristici pe stadii ---------- */
FX.buildSort = function (el) {
  const spec = FX.specOf(el), S = FX.get(el), g = spec.games.sort;
  S.sort = { pool: FX.shuffleA(g.items.map(i => i.id)), assign: {}, sel: null, checked: false };
};
FX.sortHTML = function (el) {
  const spec = FX.specOf(el), S = FX.get(el), g = spec.games.sort, Z = S.sort, box = el.querySelector('[data-game]'); if (!Z) return;
  const by = Object.fromEntries(g.items.map(i => [i.id, i]));
  const chip = id => {
    const it = by[id], b = Z.assign[id], cls = Z.checked ? (b === it.bin ? 'hit' : 'bad') : '';
    const fix = Z.checked && b !== it.bin ? `<small>→ ${g.bins.find(x => x.id === it.bin).short || g.bins.find(x => x.id === it.bin).t}</small>` : '';
    return `<button type="button" class="chip ${cls}" data-fxa="sitem" data-id="${id}" aria-pressed="${Z.sel === id}" ${Z.checked ? 'data-p="' + id + '"' : ''}>${spec.parts[id].t}${fix}</button>`;
  };
  const pool = Z.pool.filter(id => !Z.assign[id]);
  let res = '';
  if (Z.checked) res = `<p class="fx-res"><b>${Z.pct}%</b> · ${Z.good} din ${g.items.length} la stadiul corect.${Z.good < g.items.length ? ' Cele greșite arată stadiul corect. Apasă una ca să vezi textul din curs.' : ''}</p>`;
  box.innerHTML = `<b>${g.prompt}</b>
    ${Z.checked ? '' : `<div class="fx-pool" role="group" aria-label="Caracteristici de așezat">${pool.map(chip).join('') || '<span class="fx-empty">Toate sunt așezate. Poți verifica.</span>'}</div>`}
    <div class="fx-bins">${g.bins.map(b => `<section class="fx-bin ${b.tone || ''}"><button type="button" class="bh" data-fxa="sbin" data-b="${b.id}" ${Z.checked ? 'disabled' : ''}><b>${b.t}</b>${b.sub ? `<small>${b.sub}</small>` : ''}</button><div class="bc">${Z.pool.filter(id => Z.assign[id] === b.id).map(chip).join('')}</div></section>`).join('')}</div>
    ${res}
    <div class="fx-act">${Z.checked ? '<button type="button" class="btn primary" data-fxa="sreset">Reia</button>' : `<button type="button" class="btn primary" data-fxa="scheck" ${Object.keys(Z.assign).length ? '' : 'disabled'}>Verifică</button><button type="button" class="btn" data-fxa="sreset">Reia</button>`}</div>`;
};
FX.sortCheck = function (el) {
  const spec = FX.specOf(el), S = FX.get(el), g = spec.games.sort, Z = S.sort;
  Z.good = g.items.filter(it => Z.assign[it.id] === it.bin).length; Z.pct = Math.round(Z.good / g.items.length * 100); Z.checked = true;
  g.items.forEach(it => S.seen.add(it.id));
  if (FX.persist) FX.persist.set(spec.key, 'sort', Z.pct);
};

/* ---------- redare automată și mișcare ---------- */
FX.stopPlay = function (el) {
  const S = FX.get(el); if (S.play) { clearInterval(S.play); S.play = null; }
  const b = el.querySelector('[data-fxa="play"]'); if (b) { b.setAttribute('aria-pressed', 'false'); b.textContent = '▶ ' + ((FX.specOf(el).ctl.play || {}).label || 'Redă'); }
};
FX.togglePlay = function (el) {
  const spec = FX.specOf(el), S = FX.get(el), c = spec.ctl;
  if (S.play) { FX.stopPlay(el); return; }
  if (S.v >= c.max) FX.setVar(el, c.min, true);
  const b = el.querySelector('[data-fxa="play"]'); if (b) { b.setAttribute('aria-pressed', 'true'); b.textContent = '⏸ Pauză'; }
  S.play = setInterval(() => {
    if (!document.body.contains(el)) { clearInterval(S.play); S.play = null; return; }
    if (S.v >= c.max) { FX.stopPlay(el); return; }
    FX.setVar(el, S.v + c.step, true);
  }, c.play.ms || 1500);
};

/* ---------- Tur ghidat: un pas = o schimbare din desen + textul din curs ---------- */
FX.tourGo = function (el, i, scroll) {
  const spec = FX.specOf(el), S = FX.get(el), T = spec.tour; if (!T) return;
  i = Math.max(0, Math.min(T.length - 1, i)); S.tour = i;
  const st = T[i];
  if (st.v != null && spec.ctl.type === 'range') { S.v = st.v; const r = el.querySelector('[data-fxr]'); if (r) r.value = st.v; }
  S.sel = (st.parts || st.hl || [])[0] || null;
  (st.parts || []).forEach(id => S.seen.add(id)); (st.hl || []).forEach(id => S.seen.add(id));
  FX.draw(el);
  if (st.act && spec.actions && spec.actions[st.act]) setTimeout(() => spec.actions[st.act](el, FX.get(el)), 450);
  if (scroll) FX.keepInView(el);
};
FX.keepInView = function (el) {
  /* desenul (fix sus) și cardul turului trebuie să se vadă împreună */
  const v = el.querySelector('.fx-view'), c = el.querySelector('[data-tour]'); if (!v || !c) return;
  const top = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--stick-top')) || 0;
  const rv = v.getBoundingClientRect(), rc = c.getBoundingClientRect();
  const side = getComputedStyle(el.querySelector('.fx-body')).gridTemplateColumns.split(' ').length > 1;
  const beh = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  if (side) { if (rv.top < top - 2 || rv.top > innerHeight * .4) window.scrollBy({ top: rv.top - top - 8, behavior: beh }); return; }
  if (rv.top > top + 4) { window.scrollBy({ top: rv.top - top, behavior: beh }); return; }   // figura nu e încă fixată sus
  if (rc.top < rv.bottom - 1) window.scrollBy({ top: rc.top - rv.bottom - 4, behavior: beh });
  else if (rc.bottom > innerHeight) window.scrollBy({ top: Math.min(rc.bottom - innerHeight + 8, rc.top - rv.bottom - 4), behavior: beh });
};
FX.revealView = function (el) {
  /* după schimbarea modului: desenul urcă sus, ca să se vadă împreună cu ce urmează sub el */
  const v = el.querySelector('.fx-view'); const tgt = v && v.offsetParent ? v : el.querySelector('.fx-side'); if (!tgt) return;
  const top = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--stick-top')) || 0;
  const r = tgt.getBoundingClientRect();
  if (r.top > innerHeight * .42 || r.top < top - 2) window.scrollBy({ top: r.top - top - 4, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
};
FX.tourStop = function (el) {
  const S = FX.get(el); if (S.tauto) { clearInterval(S.tauto); S.tauto = null; }
  el.dataset.tauto = '0';
  const b = el.querySelector('[data-fxa="tauto"]'); if (b) { b.setAttribute('aria-pressed', 'false'); b.textContent = '▶ Redă automat'; }
};
FX.tourAuto = function (el) {
  const spec = FX.specOf(el), S = FX.get(el), T = spec.tour;
  if (S.tour >= T.length - 1) FX.tourGo(el, 0);
  const ms = spec.tourMs || 6500;
  el.dataset.tauto = '1'; el.style.setProperty('--tms', ms + 'ms');
  S.tauto = setInterval(() => {
    if (!document.body.contains(el)) { clearInterval(S.tauto); S.tauto = null; return; }
    if (S.tour >= T.length - 1) { FX.tourStop(el); return; }
    FX.tourGo(el, S.tour + 1);
  }, ms);
  FX.draw(el);
};
FX.tourHTML = function (el) {
  const spec = FX.specOf(el), S = FX.get(el), T = spec.tour, st = T[S.tour], box = el.querySelector('[data-tour]');
  const ids = [...new Set([...(st.parts || [])])];
  const bodies = st.quote ? [st.quote] : [...new Set(ids.map(id => spec.parts[id] && !spec.parts[id].ctx ? spec.parts[id].body : null).filter(Boolean))];
  const ctxs = ids.map(id => spec.parts[id]).filter(p => p && p.ctx);
  const slide = st.slide || (ids.map(id => spec.parts[id] && spec.parts[id].slide).filter(Boolean)[0] || '');
  const rt = ids.flatMap(id => { const p = spec.parts[id]; return Object.keys(p.q || {}).filter(n => !el.dataset.q || n === el.dataset.q).flatMap(n => p.q[n].map(ref => { const r = FX.rub(+n, ref); return `<li><b>Î${n}</b> ${r.label}${r.w > 1 ? ' ×2' : ''}</li>`; })); });
  const last = S.tour === T.length - 1;
  const nav = el.querySelector('[data-tnav]');
  nav.innerHTML = `<button type="button" class="btn" data-fxa="tprev" ${S.tour ? '' : 'disabled'} aria-label="Pasul anterior">←</button>
    <div class="tn-mid"><span class="tr-n" data-ui>Pasul ${S.tour + 1} din ${T.length}</span><span class="tr-dots" role="group" aria-label="Pașii turului">${T.map((t, i) => `<button type="button" data-fxa="tgo" data-i="${i}" aria-label="Pasul ${i + 1}: ${esc(FX.plain(t.t))}" aria-current="${i === S.tour}" class="${i < S.tour ? 'done' : ''}"></button>`).join('')}</span></div>
    ${last ? `<button type="button" class="btn primary" data-fxa="tmode" data-m="predict">Testează-te</button>` : `<button type="button" class="btn primary" data-fxa="tnext">Înainte →</button>`}`;
  box.innerHTML = `<b class="tr-t">${st.t}</b>
    ${st.see ? `<p class="tr-see" data-ui><span class="tr-k">În desen</span>${st.see}</p>` : ''}
    ${bodies.length ? `<blockquote class="tr-q"><span class="tr-k">Din curs${slide ? ' · ' + slide : ''}</span>${bodies.map(b => `<span>${b}</span>`).join(' ')}</blockquote>` : ''}
    ${ctxs.map(p => `<p class="tr-ctx"><span class="tr-k">Deducție, nu e în diapozitive</span>${p.body}</p>`).join('')}
    ${rt.length ? `<ul class="tr-rt" aria-label="Puncte din barem">${rt.join('')}</ul>` : ''}
    <div class="tr-auto"><button type="button" class="btn ghost sm" data-fxa="tauto" aria-pressed="${!!S.tauto}">${S.tauto ? '⏸ Oprește redarea automată' : '▶ Redă automat, câte un pas'}</button>${S.tauto ? '<i class="tr-timer" aria-hidden="true"></i>' : ''}</div>`;
  const tm = box.querySelector('.tr-timer'); if (tm) { tm.style.animation = 'none'; void tm.offsetWidth; tm.style.animation = ''; }
};

/* ---------- reflector: în tur se vede doar ce explică pasul; în explorare, conturul piesei alese ---------- */
FX.applyFocus = function (el) {
  const spec = FX.specOf(el), S = FX.get(el), svg = el.querySelector('.fx-stage svg'); if (!svg) return;
  let ids = [];
  if (S.mode === 'tour' && spec.tour) ids = spec.tour[S.tour].hl || [];
  else if ((S.mode === 'explore' || (S.mode === 'predict' && S.rev)) && S.sel) ids = [S.sel];
  let fx = svg.querySelector(':scope > g.fx-foc');
  if (!fx) {
    const vb = svg.viewBox.baseVal, mid = 'm' + el.id;
    svg.insertAdjacentHTML('beforeend', `<g class="fx-foc" aria-hidden="true"><mask id="${mid}" maskUnits="userSpaceOnUse" x="${vb.x - 50}" y="${vb.y - 50}" width="${vb.width + 100}" height="${vb.height + 100}"><rect x="${vb.x - 50}" y="${vb.y - 50}" width="${vb.width + 100}" height="${vb.height + 100}" fill="#fff"/><g class="holes"></g></mask><rect class="veil" x="${vb.x - 50}" y="${vb.y - 50}" width="${vb.width + 100}" height="${vb.height + 100}" mask="url(#${mid})"/><g class="rings"></g></g>`);
    fx = svg.querySelector(':scope > g.fx-foc');
  }
  const holes = fx.querySelector('.holes'), rings = fx.querySelector('.rings');
  holes.innerHTML = ''; rings.innerHTML = '';
  ids.forEach(id => svg.querySelectorAll(`[data-p="${id}"] .hit`).forEach(h => {
    const a = h.cloneNode(); a.removeAttribute('class'); a.setAttribute('fill', '#000'); a.setAttribute('stroke', '#000'); a.setAttribute('stroke-width', '14'); a.setAttribute('stroke-linejoin', 'round'); holes.appendChild(a);
    const r = h.cloneNode(); r.setAttribute('class', 'ring'); rings.appendChild(r);
  }));
  ids.forEach(id => svg.querySelectorAll(`[data-p="${id}"] .bdg-s circle, .bdg-s[data-for~="${id}"] circle`).forEach(h => { const a = h.cloneNode(); a.removeAttribute('class'); a.setAttribute('fill', '#000'); a.setAttribute('r', '12'); holes.appendChild(a); }));
  el.dataset.foc = ids.length ? (S.mode === 'tour' ? 'tour' : 'sel') : '';
  /* apropiere (zoom) pe zona pasului */
  const st = S.mode === 'tour' && spec.tour ? spec.tour[S.tour] : null;
  FX.zoomTo(svg, st && st.zoom ? st.zoom : null);
};
FX.zoomTo = function (svg, z) {
  if (!svg.dataset.vb0) svg.dataset.vb0 = svg.getAttribute('viewBox');
  const to = (z ? z.join(' ') : svg.dataset.vb0).split(/\s+/).map(Number), from = svg.getAttribute('viewBox').split(/\s+/).map(Number);
  if (to.every((v, i) => Math.abs(v - from[i]) < .5)) return;
  cancelAnimationFrame(svg._za);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, t0 = performance.now(), D = reduce ? 0 : 650;
  const step = now => {
    const k = D ? Math.min(1, (now - t0) / D) : 1, e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    svg.setAttribute('viewBox', from.map((v, i) => (v + (to[i] - v) * e).toFixed(1)).join(' '));
    if (k < 1) svg._za = requestAnimationFrame(step);
  };
  svg._za = requestAnimationFrame(step);
};

/* ---------- evenimente (delegate) ---------- */
if (typeof document !== 'undefined') {
  const figOf = t => t.closest && t.closest('figure.xfig');
  document.addEventListener('click', e => {
    const el = figOf(e.target); if (!el) return;
    const S = FX.get(el), spec = FX.specOf(el);
    FX.ready(el);
    const a = e.target.closest('[data-fxa]');
    if (a && el.contains(a)) {
      const act = a.dataset.fxa;
      if (act === 'mode') { FX.setMode(el, a.dataset.m); FX.revealView(el); }
      else if (act === 'stop') FX.setStop(el, +a.dataset.i);
      else if (act === 'pick') { const Z = S.qz; if (Z && !Z.graded) { Z.picks[a.dataset.id] = !Z.picks[a.dataset.id]; FX.draw(el); } }
      else if (act === 'dir') { const Z = S.qz; if (Z && !Z.graded) { Z.picks[a.dataset.id] = a.dataset.d; FX.draw(el); } }
      else if (act === 'reveal') {
        const Z = S.qz; if (Z) { Z.graded = true; S.rev = true; el.dataset.rev = '1'; const sc = FX.gradeQuiz(el); if (FX.persist) FX.persist.set(spec.key, 'pred', sc.pct); FX.draw(el); const q = el.querySelector('[data-quiz]'); if (q) q.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
      }
      else if (act === 'again') { S.rev = false; el.dataset.rev = '0'; FX.buildQuiz(el); FX.draw(el); }
      else if (act === 'bank') { const L = S.lab; if (L && !L.checked) { const i = +a.dataset.i; const owner = Object.keys(L.placed).find(k => L.placed[k] === i); if (owner) { delete L.placed[owner]; const o = el.querySelector(`[data-lab="${owner}"]`); o.classList.remove('filled'); o.querySelector('.lr').innerHTML = o.querySelector('.lr').dataset.orig; } L.bsel = L.bsel === i ? null : i; FX.tryPlace(el); FX.draw(el); } }
      else if (act === 'lcheck') {
        const L = S.lab; let good = 0;
        L.items.forEach(() => {});
        FX.labs(el).forEach(l => { const id = l.dataset.lab, pi = L.placed[id]; l.classList.remove('sel'); if (pi == null) { l.classList.add('no'); return; } const ok = L.items[pi].text === l.dataset.text; l.classList.add(ok ? 'ok' : 'no'); if (ok) good++; });
        L.checked = true; L.good = good; L.pct = Math.round(good / L.items.length * 100);
        if (FX.persist) FX.persist.set(spec.key, 'lab', L.pct);
        FX.draw(el);
      }
      else if (act === 'anim') FX.setAnim(el, el.dataset.anim !== '1');
      else if (act === 'play') FX.togglePlay(el);
      else if (act === 'ordpick') { const O = S.ord; if (O && !O.checked) { O.seq.push(+a.dataset.id); FX.draw(el); } }
      else if (act === 'ordrm') { const O = S.ord; if (O && !O.checked) { O.seq.splice(+a.dataset.pos, 1); FX.draw(el); } }
      else if (act === 'ordundo') { const O = S.ord; if (O && !O.checked) { O.seq.pop(); FX.draw(el); } }
      else if (act === 'ordcheck') { FX.ordCheck(el); FX.draw(el); const g = el.querySelector('[data-game]'); if (g) g.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
      else if (act === 'ordreset') { FX.buildOrder(el); S.sel = null; FX.draw(el); }
      else if (act === 'sitem') { const Z = S.sort; if (Z && !Z.checked) { const id = a.dataset.id; Z.sel = Z.sel === id ? null : id; FX.draw(el); } else if (Z && Z.checked) FX.showPart(el, a.dataset.id); }
      else if (act === 'sbin') { const Z = S.sort; if (Z && !Z.checked && Z.sel) { Z.assign[Z.sel] = a.dataset.b; Z.sel = null; FX.draw(el); } }
      else if (act === 'scheck') { FX.sortCheck(el); FX.draw(el); const g = el.querySelector('[data-game]'); if (g) g.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
      else if (act === 'sreset') { FX.buildSort(el); S.sel = null; FX.draw(el); }
      else if (act === 'showans') { FX.labs(el).forEach(l => { l.classList.add('filled'); FX.setLabText(l, l.dataset.text); }); FX.draw(el); }
      else if (act === 'lreset') { FX.buildBank(el); FX.draw(el); }
      else if (act === 'tnext') { FX.tourStop(el); FX.tourGo(el, S.tour + 1, true); }
      else if (act === 'tprev') { FX.tourStop(el); FX.tourGo(el, S.tour - 1, true); }
      else if (act === 'tgo') { FX.tourStop(el); FX.tourGo(el, +a.dataset.i, true); }
      else if (act === 'tauto') { if (S.tauto) FX.tourStop(el); else FX.tourAuto(el); }
      else if (act === 'tmode') { FX.setMode(el, a.dataset.m); FX.revealView(el); }
      else if (act === 'info') { const n = el.querySelector('[data-note]'); n.hidden = !n.hidden; a.setAttribute('aria-expanded', String(!n.hidden)); }
      else if (act === 'peek') { S.peek = !S.peek; a.setAttribute('aria-pressed', String(S.peek)); a.textContent = S.peek ? 'Înapoi la valoarea aleasă' : spec.ctl.peek; el.dataset.peek = S.peek ? '1' : '0'; FX.draw(el); }
      else if (spec.actions && spec.actions[act]) spec.actions[act](el, S, a);
      return;
    }
    const lab = e.target.closest('[data-lab]');
    if (lab && el.contains(lab) && S.mode === 'labels' && S.lab && !S.lab.checked) {
      const id = lab.dataset.lab, L = S.lab;
      if (L.placed[id] != null) { delete L.placed[id]; lab.classList.remove('filled'); lab.querySelector('.lr').innerHTML = lab.querySelector('.lr').dataset.orig; }
      L.sel = L.sel === id ? null : id; FX.tryPlace(el); FX.draw(el); return;
    }
    const jump = e.target.closest('[data-jump]');
    if (jump && el.contains(jump) && S.mode !== 'labels') { FX.setVar(el, +jump.dataset.jump); return; }
    const part = e.target.closest('[data-p]');
    if (part && el.contains(part)) FX.showPart(el, part.dataset.p);
  });
  document.addEventListener('input', e => {
    const r = e.target.closest && e.target.closest('[data-fxr]'); if (!r) return;
    const el = figOf(r); FX.ready(el); FX.setVar(el, +r.value);
  });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const t = e.target; if (!t || !t.closest) return;
    const g = t.closest('svg [data-p], svg [data-jump], svg [data-lab], svg [data-fxa]');
    if (g && g.getAttribute('role') !== 'button' && !g.hasAttribute('tabindex')) return;
    if (g && figOf(g)) { e.preventDefault(); g.dispatchEvent(new MouseEvent('click', { bubbles: true })); }
  });
  const scan = root => { (root.querySelectorAll ? root.querySelectorAll('figure.xfig:not([data-ready])') : []).forEach(FX.ready); if (root.matches && root.matches('figure.xfig:not([data-ready])')) FX.ready(root); };
  new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => { if (n.nodeType === 1) scan(n); }))).observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('DOMContentLoaded', () => scan(document));
}
