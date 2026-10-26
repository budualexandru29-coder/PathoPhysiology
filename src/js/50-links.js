/* ===== Legarea figurilor de întrebări ===== */
(function () {
  /* figura veche (static) devine interactivă pe loc: aceeași poziție în pagina întrebării */
  const KEY = { 1: 'circ', 2: 'head', 5: 'cold', 6: 'head' };               // întrebarea -> figura nouă; celelalte rămân pe 'thermo' până sunt refăcute
  [1, 2, 5, 6].forEach(n => Q[n].learn.forEach(b => { if (b[0] === 'fig' && b[1] === 'thermo') { b[1] = KEY[n] || 'thermo'; b[2] = { q: n }; } }));
})();
/* Î2: figura veche „răcirea selectivă a creierului” (statică) e înlocuită de figura interactivă „head” */
(function () {
  Q[2].learn = Q[2].learn.filter(b => !(b[0] === 'fig' && b[1] === 'braincool'));
  delete FIGS.braincool; delete FIGMETA.braincool;
})();
/* Î7: schema statică a termolizei e înlocuită de figura interactivă „thermolysis” */
(function () {
  Q[7].learn.forEach(b => { if (b[0] === 'fig' && b[1] === 'termoliza') { b[1] = 'thermolysis'; b[2] = { q: 7 }; } });
  delete FIGS.termoliza; delete FIGMETA.termoliza;
})();
/* scala veche a temperaturii (statică) e înlocuită peste tot de figurile interactive circ / head / cold */
(function () { delete FIGS.thermo; delete FIGMETA.thermo; })();
/* ===== pagina întrebării: secțiuni numerotate + hartă fixă; antet compact la derulare ===== */
(function () {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const measure = () => {
    const h = document.querySelector('.hdr'), m = document.querySelector('.qmap');
    const hh = h ? h.getBoundingClientRect().height : 0, mh = m ? m.getBoundingClientRect().height : 0;
    root.style.setProperty('--hdr-h', hh + 'px'); root.style.setProperty('--stick-top', (hh + mh) + 'px');
  };
  let mini = false;
  const onScroll = () => {
    const h = document.querySelector('.hdr'); if (!h) return;
    const want = window.scrollY > 120;
    if (want !== mini) { mini = want; h.classList.toggle('mini', want); measure(); }
    const m = document.querySelector('.qmap'); if (!m) return;
    const top = (parseFloat(root.style.getPropertyValue('--stick-top')) || 0) + 30;
    let cur = null; document.querySelectorAll('.qsec').forEach(s => { if (s.getBoundingClientRect().top <= top) cur = s.id; });
    if (!cur) { const f = document.querySelector('.qsec'); cur = f && f.id; }
    m.querySelectorAll('a').forEach(a => a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + cur)));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', measure);
  new MutationObserver(() => { mini = false; const h = document.querySelector('.hdr'); if (h) h.classList.remove('mini'); measure(); onScroll(); }).observe(document.getElementById('app') || document.body, { childList: true });
  document.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('.qmap a'); if (!a) return;
    e.preventDefault(); const t = document.getElementById(a.getAttribute('href').slice(1)); if (t) t.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  });
  window.FXmeasure = () => { measure(); onScroll(); };
})();

if (typeof module !== 'undefined') module.exports = { FIGS, FIGMETA, FX };

;