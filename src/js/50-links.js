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
/* Î11: figura interactivă a febrei intră înaintea curbei statice a fazelor */
(function () {
  const i = Q[11].learn.findIndex(b => b[0] === 'flow' && b[1] === 'feverCascade');
  Q[11].learn.splice(i + 1, 0, ['fig', 'fever', { q: 11 }]);
})();
/* Î27 și Î22: figura inflamației acute (vasul și leucocitele) */
(function () {
  const put = (n) => { const L = Q[n].learn, i = L.findIndex(b => b[0] === 'flow'); L.splice(i >= 0 ? i + 1 : 1, 0, ['fig', 'inflam', { q: n }]); };
  put(27); put(22);
})();
/* Î16 și Î17: figura limfomului Hodgkin; în Î16 înlocuiește arborele static al clasificării */
(function () {
  Q[16].learn.forEach(b => { if (b[0] === 'fig' && b[1] === 'hodgkinTree') { b[1] = 'hodgkin'; b[2] = { q: 16 }; } });
  const L = Q[17].learn, i = L.findIndex(b => b[0] === 'flow' && b[1] === 'hodgkin');
  L.splice(i + 1, 0, ['fig', 'hodgkin', { q: 17 }]);
  delete FIGS.hodgkinTree; delete FIGMETA.hodgkinTree;
})();
/* Î18, Î19, Î20: figura anginei streptococice; în Î18 vine după schema statică din slide 26 (etichetele din material) */
(function () {
  const L18 = Q[18].learn, k = L18.findIndex(b => b[0] === 'fig' && b[1] === 'strepScheme'); L18.splice(k + 1, 0, ['fig', 'strep', { q: 18 }]);
  const L19 = Q[19].learn, i = L19.findIndex(b => b[0] === 'flow' && b[1] === 'strepMech'); L19.splice(i + 1, 0, ['fig', 'strep', { q: 19 }]);
  const L20 = Q[20].learn, j = L20.findIndex(b => b[0] === 'tbl'); L20.splice(j + 1, 0, ['fig', 'strep', { q: 20, v: 5 }]);
})();
/* Î22: figura reacției de fază acută și a complementului, după tabelul reacțiilor generale */
(function () {
  const L = Q[22].learn, i = L.findIndex(b => b[0] === 'tbl'); L.splice(i + 1, 0, ['fig', 'apr', { q: 22 }]);
})();
/* Î15: figura pirogenilor, după cascada efectelor */
(function () {
  const L = Q[15].learn, i = L.findIndex(b => b[0] === 'flow' && b[1] === 'pyroEffects'); L.splice(i + 1, 0, ['fig', 'pyro', { q: 15 }]);
})();
/* Î3: figura tipurilor de hipertermie, după tabel */
(function () {
  const L = Q[3].learn, i = L.findIndex(b => b[0] === 'tbl'); L.splice(i + 1, 0, ['fig', 'hyper', { q: 3 }]);
})();
/* Î8: balanța statică e înlocuită de figura interactivă a termogenezei */
(function () {
  Q[8].learn.forEach(b => { if (b[0] === 'fig' && b[1] === 'balance') { b[1] = 'tgen'; b[2] = { q: 8 }; } });
  delete FIGS.balance; delete FIGMETA.balance;
})();
/* Î9: figura efectelor locale ale frigului, după cascadă */
(function () {
  const L = Q[9].learn, i = L.findIndex(b => b[0] === 'flow' && b[1] === 'coldLocal'); L.splice(i + 1, 0, ['fig', 'coldloc', { q: 9 }]);
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