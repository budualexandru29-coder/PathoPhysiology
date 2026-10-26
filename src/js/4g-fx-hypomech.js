/* ===== Î4: mecanismele generale ale hipotermiei =====
   Desenul vine din art/hypomech.mjs (ART.hypomech). Variabila: etapa (0 echilibru, 1–2 cauzele, 3 răspunsul inițial, 4 epuizarea, 5 decompensarea).
   Textele cu diapozitiv vin din LP (Termoreglarea, slide 19–21); restul sunt explicații suplimentare, cu sursa. */
(function () {
  const A = ART.hypomech;
  const ST = ['Echilibru termic', 'Pierdere excesivă (↑ termoliza)', 'Producție inadecvată (↓ termogeneza)', 'Răspunsul inițial', 'Epuizarea resurselor', 'Decompensarea'];
  const at = (...v) => S => v.includes(S.v);
  const from = n => S => S.v >= n;
  const LP = n => 'Termoreglarea (LP), slide ' + n;
  const P = {
    def: { t: 'Hipotermia: temperatura centrală sub 35°C', slide: LP(19), q: { 4: ['0:0', '0:1'] }, on: from(1),
      body: 'Hipotermia este scăderea temperaturii centrale sub 35°C, ca urmare a expunerii prelungite la frig. În desen, nivelul apei din rezervor coboară sub linia punctată de 35°C; gradațiile de 32 și 28°C sunt pragurile stadiilor din LP (Î5).' },
    over: { t: 'Producția și conservarea căldurii sunt depășite', slide: LP(20), q: { 4: ['1:0'] }, eff: 1, on: from(1),
      body: 'În hipotermie, mecanismele de producere și de conservare a căldurii sunt depășite: ce iese pe scurgere e mai mult decât ce intră pe robinet, iar nivelul scade.' },
    tl: { t: 'Pierdere excesivă: ↑ termoliza', slide: LP(20), q: { 4: ['1:1'] }, eff: 1, on: at(1),
      body: 'Cauza poate fi pierderea excesivă de căldură, prin creșterea termolizei (radiație, convecție, conducție, evaporare: Î7). În desen, scurgerea se lărgește, robinetul rămâne la fel.' },
    tg: { t: 'Producție inadecvată: ↓ termogeneza', slide: LP(20), q: { 4: ['1:2'] }, eff: 1, on: at(2),
      body: 'Cauza poate fi producția inadecvată de căldură, prin scăderea termogenezei. În desen, robinetul se îngustează, scurgerea rămâne la fel; așa se explică vulnerabilitatea celor cu rată metabolică scăzută.' },
    risk: { t: 'Categoriile mai expuse', slide: LP(19), q: { 4: ['0:2'] }, eff: 1, on: at(2),
      body: 'Vârstnici, sugari, nou-născuți; alcoolici, bolnavi psihic; hipotiroidism, hipopituitarism; insuficiență hepatică, malnutriție, artrită reumatoidă. Numitorul comun: rată metabolică scăzută, glicoliză insuficientă.' },
    vc: { t: 'Vasoconstricția periferică', slide: LP(20), q: { 4: ['1:3'] }, eff: 1, on: from(3),
      body: 'Apare vasoconstricția periferică: arteriolele pielii se îngustează, capilarele se golesc, pielea devine palidă; scade pierderea de căldură. În desen, arteriola se subțiază; în rezervor, scurgerea se îngustează.' },
    micro: { t: 'Alterarea microcirculației', slide: LP(20), q: { 4: ['1:4'] }, eff: 1, on: from(4),
      body: 'Vasoconstricția prelungită și încetinirea fluxului alterează microcirculația. În desen, agregate de hematii (roșu-închis) în capilare.' },
    o2: { t: '↑ Consumul de oxigen', slide: LP(20), q: { 4: ['1:5'] }, eff: 1, on: at(3),
      body: 'Crește consumul de oxigen: frisonul și termogeneza din răspunsul inițial cer energie. În desen, bara O₂ urcă, iar fibra musculară tremură; în rezervor, robinetul se deschide mai mult.' },
    gly: { t: '↓ Rezervele hepatice de glicogen', slide: LP(20), q: { 4: ['1:6'] }, eff: 1, on: from(3),
      body: 'Scad rezervele hepatice de glicogen, consumate pentru a produce căldură. În desen, punctele de glicogen din hepatocite dispar de la o etapă la alta.' },
    met: { t: '↓ Rata metabolismului bazal', slide: LP(21), q: { 4: ['1:7'] }, eff: 1, on: from(4),
      body: 'După epuizarea resurselor scade rata reacțiilor metabolismului bazal: frigul încetinește reacțiile chimice. În desen, barele O₂ și metab. coboară; în rezervor, robinetul se strânge.' },
    visc: { t: '↑ Vâscozitatea sângelui', slide: LP(21), q: { 4: ['1:8'] }, eff: 1, on: from(4),
      body: 'Crește vâscozitatea sanguină. În desen, hematiile se strâng în fișicuri, iar plasma iese din capilar (săgețile albastre), ceea ce concentrează sângele.' },
    acid: { t: 'Acidoza metabolică', slide: LP(21), q: { 4: ['1:9'] }, eff: 1, on: from(4),
      body: 'Apare acidoza metabolică. În desen, o celulă cu puțin oxigen face glicoliză anaerobă: lactat și H⁺; acul pH-metrului trece spre acid.' },
    tachy: { t: 'Tahicardia, apoi epuizarea resurselor', slide: LP(21), q: { 4: ['1:10'] }, eff: 1, on: at(3),
      body: 'Inițial apare tahicardia, care consumă resursele; urmează epuizarea lor. În desen, traseul ECG cu bătăi dese.' },
    brady: { t: 'Bradicardie, aritmii, asistolie', slide: LP(21), q: { 4: ['1:11'] }, eff: 1, on: from(4),
      body: 'După epuizarea resurselor apar bradicardia, aritmiile și, în final, asistolia. În desen: bătăi rare, cu QRS larg și undă J (Osborn), apoi fibrilație ventriculară și linie izoelectrică.' },
    ap: { t: 'Potențialele de acțiune se prelungesc; ↓ conductibilitatea', slide: LP(21), q: { 4: ['1:12'] }, eff: 1, on: from(4),
      body: 'La nivel cardiac se prelungesc potențialele de acțiune și scade conductibilitatea. În desen, potențialul de acțiune al miocitului ventricular: urcarea e mai lentă, platoul mai lung (curba gri e normotermia).' },
    death: { t: 'Moartea celulară', slide: LP(21), q: { 4: ['1:13'] }, eff: 1, on: at(5),
      body: 'În final apare moartea celulară. În desen, hepatocitele fără glicogen, cu nuclei picnotici (mici și închiși).' },
    x1: { t: 'Metafora rezervorului', ctx: 'metaforă mecanică',
      body: 'Apa e căldura corpului, nivelul e temperatura centrală, robinetul e termogeneza, scurgerea e termoliza. Limitele metaforei: în corp, căldura nu „curge” printr-o singură țeavă, ci se pierde pe patru căi (Î7); robinetul și scurgerea sunt reglate de hipotalamus, iar în hipotermia severă reglarea însăși cedează.' },
    x2: { t: 'De ce încetinește inima la rece', ctx: 'Mallet ML. Pathophysiology of accidental hypothermia. QJM 2002;95:775–785; Brown DJA et al. Accidental hypothermia. N Engl J Med 2012;367:1930–1938',
      body: 'Frigul încetinește canalele ionice și pompele: depolarizarea e mai lentă, repolarizarea întârzie, conducerea scade. Pe ECG: bradicardie sinusală, PR, QRS și QT lungi, uneori unda J (Osborn) la joncțiunea QRS–ST. Miocardul rece e iritabil: o mobilizare bruscă poate declanșa fibrilația ventriculară. Hipotermia severă se tratează cu reîncălzire controlată, în spital.' },
  };
  // [part, hit, badge, unde se vede]
  const HITS = [
    ['def', 'tank', 1, 'oall'], ['tg', 'in', 2, 'oall'], ['tl', 'out', 3, 'oall'], ['risk', 'risk', 4, 'oall'],
    ['vc', 'skA', 5, 'oall'], ['micro', 'skC', 6, 'oall'], ['gly', 'hep', 7, 'oall no5x'], ['death', 'hep', 7, 'o5'], ['o2', 'o2', 8, 'oall'], ['met', 'mb', 9, 'oall'],
    ['visc', 'rbc', 10, 'oall'], ['acid', 'ph', 11, 'oall'], ['tachy', 'ecg', 12, 'o0 o1 o2 o3'], ['brady', 'ecg', 12, 'o4'], ['ap', 'ap', 13, 'oall'],
  ];
  const DEV = { def: 'Nivelul apei și gradația', tg: 'Robinetul de sus', tl: 'Scurgerea de jos', risk: 'Caseta din dreapta', vc: 'Arteriola pielii', micro: 'Capilarele', gly: 'Punctele din hepatocite', death: 'Nucleii hepatocitelor', o2: 'Bara O₂', met: 'Bara metab.', visc: 'Hematiile din capilar', acid: 'pH-metrul și H⁺', tachy: 'Traseul ECG', brady: 'Traseul ECG', ap: 'Curba potențialului de acțiune' };
  const hit = a => a.w != null ? `<rect class="hit" x="${(+a.x).toFixed(1)}" y="${(+a.y).toFixed(1)}" width="${(+a.w).toFixed(1)}" height="${(+a.h).toFixed(1)}" rx="8"/>` : `<circle class="hit" cx="${(+a.cx).toFixed(1)}" cy="${(+a.cy).toFixed(1)}" r="${a.r}"/>`;
  const badge = (n, [x, y]) => `<g class="bdg-s"><circle cx="${x}" cy="${y}" r="8.6"/><text x="${x}" y="${y + 3.6}" text-anchor="middle" data-ui>${n}</text></g>`;

  FX.def('hypomech', {
    title: 'Hipotermia: de la bilanțul termic la celulă',
    meta: 'Mecanismele generale ale hipotermiei',
    qs: [4],
    kind: 'mix',
    note: 'Sus, o metaforă: rezervorul de căldură al corpului, cu robinetul (termogeneza) și scurgerea (termoliza); nivelul apei e temperatura centrală. În dreapta, cine e mai expus. Jos, ce se întâmplă în piele, ficat și mușchi, sânge și inimă. Cursorul trece prin cauze și prin etapele hipotermiei.',
    src: 'Termoreglarea (LP), slide 19–21',
    neutral: 0,
    ctl: { type: 'range', label: 'Etapa', min: 0, max: 5, step: 1, init: 3, fmt: v => ST[v], play: { ms: 2800, label: 'Redă etapele' }, peek: 'Compară cu echilibrul' },
    initV: () => 3,
    hints: {
      predict: 'Alege o etapă, bifează ce crezi că se vede, apoi apasă „Dezvăluie”.',
      explore: 'Mută cursorul. Apasă rezervorul, robinetul, scurgerea, o casetă de jos sau un rând de mai jos: vezi textul din LP și punctul din barem.',
    },
    predict: { kind: 'pick', prompt: (S, lab) => `${lab}: ce se vede?` },
    tour: [
      { v: 0, parts: ['x1'], t: 'Bilanțul termic, ca un rezervor',
        see: 'Robinetul (termogeneza) umple cât golește scurgerea (termoliza): nivelul, adică temperatura centrală, stă la 37°C.' },
      { v: 1, parts: ['tl', 'over'], t: 'Prima cale: pierdere excesivă',
        see: 'Scurgerea se lărgește (3): termoliza crește, nivelul scade.' },
      { v: 2, parts: ['tg', 'risk'], t: 'A doua cale: producție inadecvată',
        see: 'Robinetul se îngustează (2): termogeneza scade. Mai expuși sunt cei cu rată metabolică scăzută (4).' },
      { v: 3, parts: ['def', 'vc', 'o2', 'gly', 'tachy'], t: 'Răspunsul inițial',
        see: 'Sub 35°C (1). Vasoconstricția închide pielea (5), frisonul crește consumul de O₂ (8), glicogenul hepatic scade (7), inima bate repede (12).' },
      { v: 4, parts: ['met', 'micro', 'visc', 'acid'], t: 'Epuizarea resurselor',
        see: 'Metabolismul încetinește (9), microcirculația se alterează (6), sângele devine vâscos (10), apare acidoza (11).' },
      { v: 4, parts: ['brady', 'ap', 'x2'], t: 'Inima rece',
        see: 'Potențialul de acțiune se prelungește (13), conducerea scade; bradicardie cu QRS larg și undă J (12).' },
      { v: 5, parts: ['brady', 'death'], t: 'Decompensarea',
        see: 'Fibrilație, apoi asistolie (12); moartea celulară (7).' },
    ],
    parts: P,
    games: {
      order: {
        prompt: 'Pune în ordine consecințele hipotermiei (LP, slide 20–21).',
        items: [
          { t: 'Vasoconstricția periferică', parts: ['vc'] },
          { t: '↑ consumul de O₂, ↓ glicogenul hepatic', parts: ['o2', 'gly'] },
          { t: '↓ metabolismul, ↑ vâscozitatea, acidoza', parts: ['met', 'visc', 'acid'] },
          { t: 'Bradicardie, aritmii, asistolie', parts: ['brady'] },
          { t: 'Moartea celulară', parts: ['death'] },
        ],
      },
      sort: {
        prompt: 'Răspuns inițial sau epuizare? (LP, slide 20–21)',
        bins: [{ id: 'i', t: 'Răspunsul inițial', short: 'Inițial', tone: 'heat' }, { id: 'e', t: 'După epuizarea resurselor', short: 'Epuizare' }],
        items: [{ id: 'vc', bin: 'i' }, { id: 'o2', bin: 'i' }, { id: 'tachy', bin: 'i' }, { id: 'met', bin: 'e' }, { id: 'acid', bin: 'e' }, { id: 'brady', bin: 'e' }, { id: 'ap', bin: 'e' }],
      },
    },
    now(S) { return `<b data-ui>${ST[S.v]}</b>`; },
    stage(o, H, S) {
      const uid = 'fx' + FX.n, U = x => x.replaceAll('__U__', uid), L = A.L, hs = A.hits, bd = A.badges;
      let s = `<div class="hyx" data-st="${S.v}">`;
      s += `<svg class="iso-svg hm2-svg an-svg" viewBox="0 0 ${A.W} ${A.H}" role="group" aria-label="Rezervorul de căldură cu robinetul și scurgerea, categoriile expuse; pielea, ficatul și mușchiul, sângele și inima în hipotermie">`;
      s += `<defs>${U(A.defs)}</defs>`;
      s += L.frames + U(L.panelA) + L.panelB;
      HITS.forEach(([id, hk, n, k]) => { s += `<g class="hy-only ${k}">${H.spart(id, hit(hs[hk]) + badge(n, bd[hk]))}</g>`; });
      s += '</svg>';
      const cut = s.length;
      s += `<ul class="circ-rows fv-rows hm2-rows" aria-label="Ce arată figura">${HITS.map(([id, , n, k]) => `<li class="hy-only ${k}"><button type="button" class="fxp row" data-p="${id}"><span class="bdg" data-ui>${n}</span><span class="rt"><span class="rl">${H.lab('l' + id, P[id].t)}</span><span class="rd" data-ui>${DEV[id]}</span></span><span class="ar" aria-hidden="true"></span></button></li>`).join('')}</ul>`;
      s += `<div class="circ-sym"><span class="sl" data-ui>Din LP</span><button type="button" class="fxp sym" data-p="over">${P.over.t}</button>${['x1', 'x2'].map(id => `<button type="button" class="fxp sym ctxs" data-p="${id}">${P[id].t}</button>`).join('')}</div></div>`;
      return { view: s.slice(0, cut) + '</div>', legend: '<div class="hyx hm2-leg circ" data-st="' + S.v + '">' + s.slice(cut) };
    },
    update(el, S) {
      const v = Math.max(0, Math.min(5, Math.round(S.vv)));
      el.querySelectorAll('.hyx').forEach(r => { r.dataset.st = v; });
      el.querySelectorAll('.hm2-rows .row').forEach(b => { const on = FX.isOn(P[b.dataset.p], { v }); b.dataset.ch = on ? 1 : 0; b.querySelector('.ar').textContent = on ? '●' : '·'; });
      el.querySelectorAll('.hm2-leg .sym').forEach(b => b.classList.toggle('lit', FX.isOn(P[b.dataset.p], { v })));
    },
    panel(S, H) {
      const li = (ids, cls) => ids.filter(id => FX.isOn(P[id], S)).map(id => `<li>${H.node(id, cls)}</li>`).join('');
      if (S.v === 0) return `<section class="fx-grp"><h4><span data-ui>${ST[0]}</span><small>${LP(19)}</small></h4><ol class="fx-chain"><li class="fx-gap">Termogeneza egalează termoliza: temperatura centrală rămâne în jur de 37°C.</li></ol></section>`;
      if (S.v <= 2) return `<section class="fx-grp"><h4><span data-ui>Cauza</span><small>${LP('19–20')}</small></h4><ol class="fx-chain">${li(['over', 'tl', 'tg', 'risk'], 'cold')}</ol></section>`;
      return `<section class="fx-grp"><h4><span data-ui>${ST[S.v]}</span><small>${LP('19–21')}</small></h4><ol class="fx-chain">${li(['def', 'vc', 'o2', 'gly', 'tachy', 'met', 'micro', 'visc', 'acid', 'ap', 'brady', 'death'], 'cold')}</ol></section>`;
    },
  });
})();
