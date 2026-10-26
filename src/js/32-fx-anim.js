/* ===== Mișcarea pieselor între pași, pentru figurile-planșă =====
   Desenul (art/*.mjs) pune pe fiecare piesă care se mișcă data-a="nume" și dă în ART.<figură>.anim:
     A:   { nume: { s0: [x, y, rot, opac], k: { pas: [[t ms, x, y, rot, opac], ...] } } }   (null = păstrează valoarea de dinainte)
     cap: { pas: [[t ms, text], ...] }   — ce se întâmplă, pe rând (lista numerotată de sub figură)
     dur: { pas: ms }
   Când treci înainte cu un pas, piesele se mișcă după cadrele lui și lista arată momentul curent; la orice alt salt
   (înapoi, peste mai mulți pași, „Compară”) piesele iau direct starea de la sfârșitul pasului. Fără mișcare dacă
   utilizatorul a cerut mișcare redusă. */
FX.anim = (function () {
  const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  // cadrele unui pas, cu golurile (null) completate din valoarea de dinainte
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
  // starea unui actor la pasul v, în momentul t (Infinity = sfârșitul pasului)
  function stateOf(a, v, t) {
    let st = a.s0.slice();
    Object.keys(a.k).map(Number).sort((x, y) => x - y).forEach(s => { if (s <= v) st = sample(a.k[s], s === v ? t : Infinity, st); });
    return st;
  }
  function apply(root, AN, v, t) {
    Object.keys(AN.A).forEach(n => {
      const el = root.querySelector(`[data-a="${n}"]`); if (!el) return;
      const [x, y, r, o] = stateOf(AN.A[n], v, t);
      el.setAttribute('transform', `translate(${(+x).toFixed(2)} ${(+y).toFixed(2)})${r ? ` rotate(${(+r).toFixed(2)})` : ''}`);
      el.setAttribute('opacity', (+o).toFixed(3));
    });
  }
  // lista „ce se întâmplă”: elementele trecute, cel curent și cele care urmează
  function narr(el, AN, v, t) {
    const box = el.querySelector('[data-narr]'); if (!box) return;
    const C = AN.cap[v] || [];
    if (box.dataset.v !== String(v)) { box.dataset.v = v; box.innerHTML = C.map(c => `<li>${c[1]}</li>`).join(''); }
    const li = box.querySelectorAll('li');
    let cur = -1; C.forEach((c, i) => { if (t >= c[0]) cur = i; });
    li.forEach((n, i) => { n.className = t === Infinity ? 'done' : i < cur ? 'done' : i === cur ? 'now' : 'next'; });
    const rb = el.querySelector('[data-replay]'); if (rb) rb.hidden = !(AN.dur[v] && C.length);
  }
  function stop(el) { if (el._araf) cancelAnimationFrame(el._araf); el._araf = null; }
  /* el = figura; root = elementul cu data-st (clasa .animating cât durează mișcarea); svg = desenul */
  function go(el, root, svg, AN, v, force) {
    const prev = el._av;
    if (prev === v && !force) return;
    el._av = v; stop(el);
    const moving = (force || (prev != null && v === prev + 1)) && AN.dur[v] && el.dataset.anim !== '0';
    if (!moving) { apply(svg, AN, v, Infinity); narr(el, AN, v, Infinity); root.classList.remove('animating'); return; }
    root.classList.add('animating');
    const t0 = performance.now(), D = AN.dur[v];
    const tick = now => {
      if (!document.body.contains(el)) return;
      const t = now - t0;
      apply(svg, AN, v, t); narr(el, AN, v, t);
      if (t < D) el._araf = requestAnimationFrame(tick);
      else { el._araf = null; root.classList.remove('animating'); narr(el, AN, v, Infinity); }
    };
    apply(svg, AN, v, 0); narr(el, AN, v, 0);
    el._araf = requestAnimationFrame(tick);
  }
  /* butonul „Arată cum se întâmplă”: reia mișcarea pasului curent */
  if (typeof document !== 'undefined') document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('[data-replay]'); if (!b) return;
    const el = b.closest('figure.xfig'); if (el && el._replay) el._replay();
  });
  return { go, apply, stateOf };
})();
