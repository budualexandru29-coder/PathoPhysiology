/* ===== Mișcarea pieselor între pași, în ritmul cititorului =====
   Desenul (art/*.mjs) pune pe fiecare piesă care se mișcă data-a="nume" și dă în ART.<figură>.anim:
     A:   { nume: { s0: [x, y, rot, opac], k: { pas: [[t ms, x, y, rot, opac], ...] } } }   (null = păstrează valoarea de dinainte)
     cap: { pas: [[t ms, text], ...] }   — momentele pasului: fiecare text începe la t-ul lui și ține până la următorul
     dur: { pas: ms }
   Un pas e împărțit în momente. Când treci înainte cu un pas, se joacă primul moment, încet, apoi mișcarea se oprește
   cu textul pe ecran; „Următorul” joacă momentul următor, „Înapoi” îl reia pe cel dinainte. „Redă singur” trece singur
   mai departe, cu timp de citit între momente (după lungimea textului). La orice alt salt (înapoi, peste mai mulți pași,
   „Compară”), piesele iau direct starea de la sfârșitul pasului. Fără mișcare dacă s-a cerut mișcare redusă.
   „Ecran complet”: figura ocupă tot ecranul (și ecranul complet al browserului, unde e permis), desenul cât mai mare,
   explicația jos, ca un subtitlu; sus, pașii și închiderea. Tastele: → sau spațiu = următorul, ← = înapoi, Esc = închide. */
FX.anim = (function () {
  const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const SPEED = { slow: 1.8, normal: 1 };          // de câte ori mai lent decât cadrele din desen
  function rows(ks, prev) {
    let p = prev.slice();
    return ks.map(k => { const r = [k[0]]; for (let i = 1; i < 5; i++) r.push(k[i] == null ? p[i - 1] : k[i]); p = r.slice(1); return r; });
  }
  function sample(ks, t, prev) {
    const R = rows(ks, prev);
    if (t <= R[0][0]) return R[0].slice(1);
    const L = R[R.length - 1]; if (t >= L[0]) return L.slice(1);
    for (let i = 1; i < R.length; i++) if (t <= R[i][0]) {
      const a = R[i - 1], b = R[i], u = ease((t - a[0]) / Math.max(1, b[0] - a[0]));
      return [1, 2, 3, 4].map(j => a[j] + (b[j] - a[j]) * u);
    }
    return L.slice(1);
  }
  function stateOf(a, v, t) {
    let st = a.s0.slice();
    Object.keys(a.k).map(Number).sort((x, y) => x - y).forEach(s => { if (s <= v) st = sample(a.k[s], s === v ? t : Infinity, st); });
    return st;
  }
  function apply(svg, AN, v, t) {
    Object.keys(AN.A).forEach(n => {
      const el = svg.querySelector(`[data-a="${n}"]`); if (!el) return;
      const [x, y, r, o] = stateOf(AN.A[n], v, t);
      el.setAttribute('transform', `translate(${(+x).toFixed(2)} ${(+y).toFixed(2)})${r ? ` rotate(${(+r).toFixed(2)})` : ''}`);
      el.setAttribute('opacity', (+o).toFixed(3));
    });
  }
  // momentele pasului: [început, sfârșit, text]
  const beats = (AN, v) => { const C = AN.cap[v] || []; return C.map((c, i) => [c[0], i + 1 < C.length ? C[i + 1][0] : AN.dur[v], c[1]]); };

  function bar(el) {
    const X = el._an, spec = FX.specOf(el), c = spec.ctl || {}, t = el.querySelector('[data-tstep]'), d = el.querySelector('[data-tdots]');
    if (t) t.innerHTML = `<b data-ui>Pasul ${X.v}</b> ${(c.fmt || String)(X.v)}`;
    if (d) { let h = ''; for (let k = c.min || 0; k <= c.max; k++) h += `<button type="button" class="fx-tdot${k === X.v ? ' on' : ''}" data-bstep="${k}" aria-label="Pasul ${k}" aria-pressed="${k === X.v}">${k}</button>`; d.innerHTML = h; }
  }
  function ui(el) {
    const X = el._an, box = el.querySelector('[data-narrw]'); if (!X || !box) return;
    bar(el);
    const B = beats(X.AN, X.v), n = B.length, i = X.beat, done = X.phase === 'end';
    const note = (X.AN.note || {})[X.v], max0 = (FX.specOf(el).ctl || {}).max;
    box.hidden = !n && !note;
    if (!n) {                                     // pas fără mișcare: doar explicația și trecerea la pasul următor
      const c = box.querySelector('[data-beat]'); if (c) c.innerHTML = note ? `<span class="fx-bn" data-ui>Pasul ${X.v}</span>${note}` : '';
      box.querySelectorAll('[data-bstart],[data-bprev]').forEach(b => { b.hidden = true; });
      const nx = box.querySelector('[data-bnext]'); if (nx) { nx.hidden = false; nx.textContent = 'Pasul următor ▸'; nx.disabled = X.v >= max0; }
      const l = box.querySelector('[data-narr]'); if (l) l.innerHTML = '';
      const au = box.querySelector('[data-bauto]'); if (au) { au.setAttribute('aria-pressed', X.auto ? 'true' : 'false'); au.textContent = X.auto ? '⏸ Oprește' : '▶ Redă singur'; }
      return;
    }
    const cur = box.querySelector('[data-beat]');
    if (cur) cur.innerHTML = !n ? '' : done && X.fresh
      ? `<span class="fx-bn" data-ui>Pasul ${X.v}</span>Apasă „▶ Arată cum se întâmplă” ca să vezi pasul moment cu moment.`
      : `<span class="fx-bn" data-ui>${Math.min(i + 1, n)} / ${n}</span>${B[Math.min(i, n - 1)][2]}`;
    const list = box.querySelector('[data-narr]');
    if (list) list.innerHTML = B.map((b, k) => `<li class="${done ? 'done' : k < i ? 'done' : k === i ? 'now' : 'next'}">${b[2]}</li>`).join('');
    const q = s => box.querySelector(s);
    const prev = q('[data-bprev]'), next = q('[data-bnext]'), auto = q('[data-bauto]'), sp = q('[data-bspeed]'), start = q('[data-bstart]');
    const max = (FX.specOf(el).ctl || {}).max;
    if (start) start.hidden = !(done && X.fresh);
    if (prev) prev.hidden = done && X.fresh;
    if (next) {
      next.hidden = done && X.fresh;
      const last = i >= n - 1 && X.phase !== 'play';
      next.textContent = last ? (X.v < max ? 'Pasul următor ▸' : 'Gata') : 'Următorul ▸';
      next.disabled = last && X.v >= max;
    }
    if (auto) { auto.setAttribute('aria-pressed', X.auto ? 'true' : 'false'); auto.textContent = X.auto ? '⏸ Oprește' : '▶ Redă singur'; }
    if (sp) sp.textContent = 'Viteză: ' + (X.speed === 'slow' ? 'încet' : 'normal');
  }
  function stop(el) { const X = el._an; if (!X) return; if (X.raf) cancelAnimationFrame(X.raf); if (X.wait) clearTimeout(X.wait); X.raf = X.wait = null; }
  // joacă momentul i al pasului curent; la sfârșit se oprește (sau, în „Redă singur”, așteaptă cât e de citit și merge mai departe)
  function playBeat(el, i) {
    const X = el._an; stop(el);
    const B = beats(X.AN, X.v); if (!B.length) return;
    i = Math.max(0, Math.min(B.length - 1, i));
    X.beat = i; X.phase = 'play'; X.fresh = false;
    X.root.classList.add('animating');
    const [a, b] = B[i], k = SPEED[X.speed] || 1, t0 = performance.now();
    apply(X.svg, X.AN, X.v, a); ui(el);
    const tick = now => {
      if (!document.body.contains(el)) return;
      const t = a + (now - t0) / k;
      apply(X.svg, X.AN, X.v, Math.min(t, b));
      if (t < b) { X.raf = requestAnimationFrame(tick); return; }
      X.raf = null; X.phase = 'pause';
      if (i === B.length - 1) { apply(X.svg, X.AN, X.v, Infinity); X.root.classList.remove('animating'); }
      ui(el);
      if (X.auto) X.wait = setTimeout(() => advance(el), Math.max(2600, B[i][2].length * 55) * (X.speed === 'slow' ? 1.25 : 1));
    };
    X.raf = requestAnimationFrame(tick);
  }
  function advance(el) {
    const X = el._an; if (!X) return;
    const n = beats(X.AN, X.v).length, max = (FX.specOf(el).ctl || {}).max;
    if (X.phase === 'play') { stop(el); apply(X.svg, X.AN, X.v, beats(X.AN, X.v)[X.beat][1]); X.phase = 'pause'; if (X.beat === n - 1) { apply(X.svg, X.AN, X.v, Infinity); X.root.classList.remove('animating'); } ui(el); if (!X.auto) return; }
    if (n && X.beat < n - 1 && X.phase !== 'end') playBeat(el, X.beat + 1);
    else if (X.v < max) FX.setVar(el, X.v + 1);
    else { X.auto = false; ui(el); }
  }
  function toEnd(el) {
    const X = el._an; stop(el);
    X.phase = 'end'; X.beat = Math.max(0, beats(X.AN, X.v).length - 1);
    apply(X.svg, X.AN, X.v, Infinity); X.root.classList.remove('animating'); ui(el);
  }
  /* el = figura; root = elementul cu data-st; svg = desenul */
  function go(el, root, svg, AN, v) {
    const X = el._an || (el._an = { speed: 'slow', auto: false });
    const prev = X.v;
    X.root = root; X.svg = svg; X.AN = AN;
    if (prev === v) return;
    X.v = v;
    const moving = prev != null && v === prev + 1 && AN.dur[v] && el.dataset.anim !== '0';
    if (moving) playBeat(el, 0);
    else { toEnd(el); X.fresh = true; ui(el); }
    if (!beats(AN, v).length && X.auto) X.wait = setTimeout(() => advance(el), Math.max(2600, ((AN.note || {})[v] || '').length * 55));
  }
  /* ecranul complet: clasa .theater pe figură (merge oriunde) și, unde browserul permite, ecranul complet adevărat */
  function openFull(el) {
    const X = el._an; if (!X || el.classList.contains('theater')) return;
    el.classList.add('theater'); document.documentElement.classList.add('fx-th-open');
    if (el.requestFullscreen) el.requestFullscreen().then(() => { X.fs = true; }).catch(() => { X.fs = false; });
    if (beats(X.AN, X.v).length && X.phase === 'end' && X.fresh && el.dataset.anim !== '0') playBeat(el, 0);
    const nx = el.querySelector('[data-bnext]'); if (nx) nx.focus({ preventScroll: true });
    ui(el);
  }
  function closeFull(el) {
    const X = el._an; if (!el.classList.contains('theater')) return;
    el.classList.remove('theater'); document.documentElement.classList.remove('fx-th-open');
    if (X && X.fs && document.fullscreenElement) document.exitFullscreen().catch(() => {});
    if (X) X.fs = false;
    el.scrollIntoView({ block: 'start' });
  }
  if (typeof document !== 'undefined') {
    document.addEventListener('fullscreenchange', () => {
      document.querySelectorAll('figure.xfig.theater').forEach(el => { if (el._an && el._an.fs && document.fullscreenElement !== el) { el._an.fs = false; closeFull(el); } });
    });
    document.addEventListener('keydown', e => {
      const el = document.querySelector('figure.xfig.theater'); if (!el || !el._an) return;
      if (e.target.closest && e.target.closest('input,textarea,select')) return;
      if (e.key === 'Escape') { e.preventDefault(); closeFull(el); }
      else if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); advance(el); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); const X = el._an; X.auto = false; playBeat(el, X.phase === 'play' || X.phase === 'end' ? X.beat : X.beat - 1); }
    });
  }
  if (typeof document !== 'undefined') document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('[data-bprev],[data-bnext],[data-bauto],[data-bspeed],[data-bstart],[data-bfull],[data-bclose],[data-bstep]'); if (!b) return;
    const el = b.closest('figure.xfig'), X = el && el._an; if (!X) return;
    if (b.hasAttribute('data-bfull')) { openFull(el); return; }
    if (b.hasAttribute('data-bclose')) { closeFull(el); return; }
    if (b.hasAttribute('data-bstep')) { X.auto = false; FX.setVar(el, +b.dataset.bstep); return; }
    if (b.hasAttribute('data-bstart')) { if (el.dataset.anim === '0') return; playBeat(el, 0); }
    else if (b.hasAttribute('data-bnext')) advance(el);
    else if (b.hasAttribute('data-bprev')) { X.auto = false; playBeat(el, X.phase === 'play' || X.phase === 'end' ? X.beat : X.beat - 1); }
    else if (b.hasAttribute('data-bauto')) { X.auto = !X.auto; if (X.auto) { if (!beats(X.AN, X.v).length) advance(el); else if (X.phase === 'end' && X.fresh) playBeat(el, 0); else if (X.phase !== 'play') advance(el); } else stop(el); ui(el); }
    else if (b.hasAttribute('data-bspeed')) { X.speed = X.speed === 'slow' ? 'normal' : 'slow'; ui(el); }
  });
  /* blocul de sub figură: momentul curent, butoanele, lista tuturor momentelor */
  const html = () => `<div class="fx-tbar" data-tbar><span class="fx-tstep" data-tstep></span><div class="fx-tdots" data-tdots role="group" aria-label="Pașii"></div><button type="button" class="fx-tclose" data-bclose aria-label="Închide ecranul complet">✕</button></div>
    <div class="fx-narrw" data-narrw>
    <p class="fx-beat" data-beat aria-live="polite"></p>
    <div class="fx-bctl"><button type="button" class="btn soft fx-bfull" data-bfull>⛶ Ecran complet</button><button type="button" class="btn fx-bstart" data-bstart>▶ Arată cum se întâmplă</button><button type="button" class="btn soft" data-bprev>◂ Înapoi</button><button type="button" class="btn" data-bnext>Următorul ▸</button><button type="button" class="btn soft" data-bauto aria-pressed="false">▶ Redă singur</button><button type="button" class="btn soft fx-bsp" data-bspeed>Viteză: încet</button></div>
    <details class="fx-ball"><summary data-ui>Toate momentele pasului</summary><ol class="fx-narr" data-narr></ol></details></div>`;
  return { go, apply, stateOf, html, openFull, closeFull };
})();
