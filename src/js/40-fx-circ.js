/* ===== Î1: modificările hemodinamice în hipertermia cu Tc sub 39°C (slide 12–13) =====
   Desenul vine din art/circ.mjs (ART.circ): inima din față cu crosa aortei, emisfera dreaptă cu artera cerebrală medie,
   un bloc de piele în secțiune (plexurile vasculare, ansele capilare, glandele sudoripare), rinichiul drept, venele cave
   și monitorul unei linii arteriale. Variabila: cât a evoluat hipertermia, pe pașii din slide 13 (0–6).
   Scala nu are valori numerice: arată doar sensul. */
(function () {
  const A = ART.circ;
  const NAMES = ['Normal', 'Vasodilatația', 'Reducerea volumului circulant: intensificarea sudorației', 'Scăderea întoarcerii venoase și a rezistenței vasculare periferice', 'Scăderea debitului cardiac și a presiunii arteriale', 'Hipoperfuzia de organ', 'Simptome'];
  /* nivelurile pe pași (1 = normal): dil, sudoare, volum, întoarcere venoasă, RVP, debit, TA, perfuzie, simptome */
  const LV = [
    [0, 0, 1, 1, 1, 1, 1, 1, 0],
    [1, 0, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, .6, 1, 1, 1, 1, 1, 0],
    [1, 1, .6, .7, .7, 1, 1, 1, 0],
    [1, 1, .6, .7, .7, .7, .7, 1, 0],
    [1, 1, .6, .7, .7, .7, .7, .6, 0],
    [1, 1, .6, .7, .7, .7, .7, .6, 1],
  ];
  /* rândurile: partea, insigna aparatului, aparatul, eticheta ascunsă, coloana din LV, poziția „normal” pe bară */
  const ROWS = [
    { p: 'h1', b: 1, dev: 'Pielea: arteriola și ansele capilare', lab: 'Vasodilatația', k: 0, n: .4 },
    { p: 'h2a', b: 2, dev: 'Glandele sudoripare: picăturile', lab: 'Sudorația', k: 1, n: .08 },
    { p: 'h2b', b: 3, dev: 'Venele: cât de pline sunt', lab: 'Volumul circulant', k: 2, n: .8 },
    { p: 'h3a', b: 4, dev: 'Vena cavă: sângele care intră în inimă', lab: 'Întoarcerea venoasă', k: 3, n: .8 },
    { p: 'h3b', b: 1, dev: 'Pielea: vase largi, rezistență mică', lab: 'Rezistența vasculară periferică', k: 4, n: .8 },
    { p: 'h4a', b: 5, dev: 'Inima: cât se contractă', lab: 'Debitul cardiac', k: 5, n: .8 },
    { p: 'h4b', b: 6, dev: 'Monitorul: înălțimea undei', lab: 'Presiunea arterială', k: 6, n: .8 },
    { p: 'h5', b: 7, dev: 'Creierul și rinichiul: culoarea', lab: 'Perfuzia organelor', k: 7, n: .8 },
  ];
  const fmt = v => `${v} din 6`;
  const on = k => S => S.v >= k;
  const T13 = 'Scăderea întoarcerii venoase și a rezistenței vasculare periferice: scăderea debitului cardiac și a presiunii arteriale.';
  const SIM = 'Simptome: slăbiciune musculară, vertij, greață și alterarea stării de conștiență.';
  const P = {
    h0: { t: 'Hipertermia: depășirea mecanismelor termolizei', slide: 'slide 12', q: { 1: ['0:0', '0:1'] },
      body: 'Depășirea mecanismelor termolizei: creșterea temperaturii centrale a organismului în urma expunerii acestuia în mediu cald sau după un efort fizic intens.' },
    h1: { t: 'Vasodilatația', dq: 'Diametrul vaselor cutanate', slide: 'slide 13', q: { 1: ['1:0'] }, eff: 1, dir: 'up', on: on(1), body: 'Vasodilatația.' },
    h2a: { t: 'Intensificarea sudorației', dq: 'Sudorația', slide: 'slide 13', q: { 1: ['1:1'] }, eff: 1, dir: 'up', on: on(2), body: 'Reducerea volumului circulant: intensificarea sudorației.' },
    h2b: { t: 'Reducerea volumului circulant', dq: 'Volumul circulant', slide: 'slide 13', q: { 1: ['1:2'] }, eff: 1, dir: 'down', on: on(2), body: 'Reducerea volumului circulant: intensificarea sudorației.' },
    h3a: { t: 'Scăderea întoarcerii venoase', dq: 'Întoarcerea venoasă', slide: 'slide 13', q: { 1: ['1:3'] }, eff: 1, dir: 'down', on: on(3), body: T13 },
    h3b: { t: 'Scăderea rezistenței vasculare periferice', dq: 'Rezistența vasculară periferică', slide: 'slide 13', q: { 1: ['1:4'] }, eff: 1, dir: 'down', on: on(3), body: T13 },
    h4a: { t: 'Scăderea debitului cardiac', dq: 'Debitul cardiac', slide: 'slide 13', q: { 1: ['1:5'] }, eff: 1, dir: 'down', on: on(4), body: T13 },
    h4b: { t: 'Scăderea presiunii arteriale', dq: 'Presiunea arterială', slide: 'slide 13', q: { 1: ['1:6'] }, eff: 1, dir: 'down', on: on(4), body: T13 },
    h5: { t: 'Hipoperfuzia de organ', dq: 'Perfuzia organelor', slide: 'slide 13', q: { 1: ['1:7'] }, eff: 1, dir: 'down', on: on(5), body: 'Hipoperfuzia de organ.' },
    s1: { t: 'Slăbiciune musculară', slide: 'slide 13', q: { 1: ['2:0'] }, eff: 1, on: on(6), body: SIM },
    s2: { t: 'Vertij', slide: 'slide 13', q: { 1: ['2:1'] }, eff: 1, on: on(6), body: SIM },
    s3: { t: 'Greață', slide: 'slide 13', q: { 1: ['2:2'] }, eff: 1, on: on(6), body: SIM },
    s4: { t: 'Alterarea stării de conștiență', slide: 'slide 13', q: { 1: ['2:3'] }, eff: 1, on: on(6), body: SIM },
    c1: { t: 'Fluxul sanguin cutanat: de la 5% la 30%', slide: 'Cursul 3, slide 18', on: on(1), body: 'Fluxul sangvin cutanat poate crește de la 5% la 30% și astfel este stimulată activitatea glandelor sudoripare.' },
    c2: { t: 'Epuizarea termică: hipovolemie, ↓ debit cardiac, ↓ TA', slide: 'Cursul 3, slide 48', on: on(4), body: 'Vaso-dilatație periferică, cu pierderi excesive de lichide ⇒ hipovolemie cu scăderea debitului cardiac. În ortostatism se produce acumularea de lichid la nivelul membrelor inferioare ⇒ cu scăderea debitului cardiac. Consecința va fi ↓ TA cu apariția de greață, vertij, pierderea conștienței.' },
    x1: { t: 'La început pulsul și debitul cresc', on: on(4), ctx: 'Crandall CG, González-Alonso J. Cardiovascular function in the heat-stressed human. Acta Physiol 2010;199:407–423; Cursul 3, slide 50 (tahicardie cu hipotensiune)',
      body: 'Ca să trimită sânge spre piele, inima bate mai repede și debitul cardiac crește la începutul stresului termic. Debitul scade abia când deshidratarea și sângele rămas în venele dilatate ale pielii micșorează întoarcerea venoasă: atunci volumul-bătaie scade mai mult decât poate compensa tahicardia. De aceea, în sincopa termică, pulsul e rapid și tensiunea e mică.' },
  };
  const hit = a => a.w != null ? `<rect class="hit" x="${a.x}" y="${a.y}" width="${a.w}" height="${a.h}" rx="9"/>` : `<circle class="hit" cx="${a.cx}" cy="${a.cy}" r="${a.r}"/>`;
  const badge = (n, [x, y]) => `<g class="bdg-s"><circle cx="${x}" cy="${y}" r="8.6"/><text x="${x}" y="${y + 3.6}" text-anchor="middle" data-ui>${n}</text></g>`;

  FX.def('circ', {
    title: 'Circulația în hipertermia cu temperatura centrală sub 39 °C',
    meta: 'Circulația în hipertermia sub 39°C',
    qs: [1],
    kind: 'mix',
    note: 'Anatomie schematică, nu atlas și nu la scară. Inima e văzută din față: atriul drept, ventriculii, auriculele, coronarele în șanțuri, trunchiul pulmonar și crosa aortei cu cele trei ramuri (vasele care pleacă spre alte organe sunt desenate secționate). Carotida comună dreaptă urcă spre emisfera dreaptă și continuă cu artera cerebrală medie din șanțul lateral; jugulara internă duce sângele în vena cavă superioară. Vena brahiocefalică stângă trece prin fața ramurilor crosei, iar artera renală dreaptă prin spatele venei cave inferioare, ca în corp. Blocul de piele (antebraț, piele cu păr) arată epidermul cu papilele dermice, plexul vascular subpapilar și cel profund legate prin arteriole „în candelabru”, ansele capilare din papile, două glande sudoripare ecrine cu canalul spiralat prin epiderm și un folicul pilos cu glanda sebacee și mușchiul erector; epidermul e desenat mai gros, ca să se vadă. Presiunea arterială apare ca unda de pe monitorul unei linii arteriale. Desenul nu are valori numerice: arată sensul modificărilor din slide 13, în ordinea din curs; în organism procesele se suprapun.',
    src: 'Termoreglarea (LP), slide 12–13; Cursul 3, slide 18, 48, 50',
    neutral: 0,
    ctl: { type: 'range', label: 'Cât a evoluat hipertermia', min: 0, max: 6, step: 1, init: 6, fmt, play: { ms: 1700, label: 'Redă evoluția' }, peek: 'Compară cu normal' },
    initV: () => 6,
    hints: {
      predict: 'Desenul arată acum circulația normală. Spune pentru fiecare parametru dacă crește sau scade în hipertermia sub 39°C, apoi apasă „Dezvăluie”: vezi circuitul și ce spune cursul.',
      explore: 'Mută cursorul. Apasă o structură din desen sau un rând de mai jos: vezi textul din curs și punctul din barem.',
    },
    predict: { kind: 'dir', prompt: () => 'În hipertermia cu temperatura centrală sub 39°C, ce se întâmplă cu fiecare parametru?' },
    tour: [
      { v: 0, hl: [], parts: ['h0'], t: 'Punctul de plecare: circulația normală',
        see: 'Inima (5), văzută din față, pompează sângele în crosa aortei. Trunchiul brahiocefalic dă carotida comună dreaptă, care urcă la creier și continuă cu artera cerebrală medie în șanțul lateral (7). Aorta descendentă dă o ramură spre piele (blocul în secțiune din dreapta, 1) și artera renală spre rinichi (7). Sângele se întoarce prin vene (3): din piele și din rinichi în vena cavă inferioară (4), din creier prin jugulara internă în vena cavă superioară. Monitorul liniei arteriale (6) arată unda presiunii.' },
      { v: 1, hl: ['h1'], parts: ['h1', 'c1'], t: 'Vasodilatația',
        see: 'În piele (1) arteriolele, ansele capilare din papile și plexul venos de sub ele se lărgesc, iar dermul se înroșește: vine mult mai mult sânge la suprafață, ca să cedeze căldură.' },
      { v: 2, hl: ['h2a', 'h2b'], parts: ['h2a', 'h2b'], t: 'Sudorația scade volumul circulant',
        see: 'Glandele sudoripare ecrine (2) secretă: sudoarea urcă prin canal, iese prin pori și se evaporă de pe piele. Apa pierdută lipsește din sânge, iar o parte din sânge stă în venele dilatate ale pielii: venele mari (3) se subțiază.' },
      { v: 3, hl: ['h3a', 'h1'], parts: ['h3a', 'h3b'], t: 'Scad întoarcerea venoasă și rezistența periferică',
        see: 'Prin vena cavă inferioară (4) punctele albe curg mai rar: ajunge mai puțin sânge înapoi la inimă. Vasele largi din piele (1) opun mai puțină rezistență.' },
      { v: 4, hl: ['h4a', 'h4b'], parts: ['h4a', 'h4b', 'c2', 'x1'], t: 'Scad debitul cardiac și presiunea arterială',
        see: 'Inima (5) se umple mai puțin și pompează mai puțin la fiecare bătaie, iar unda de pe monitor (6) devine mai mică.' },
      { v: 5, hl: ['h5'], parts: ['h5'], t: 'Hipoperfuzia de organ',
        see: 'Creierul și rinichiul (7) pălesc, ramurile arterei cerebrale medii se subțiază, iar punctele albe care ajung la ele se răresc: organele primesc prea puțin sânge.' },
      { v: 6, hl: ['h5'], parts: ['s1', 's2', 's3', 's4'], t: 'Simptomele',
        see: 'Organele hipoperfuzate dau simptomele din slide 13. Le găsești și ca butoane sub desen, în modul Explorează.' },
    ],
    parts: P,
    games: {
      order: {
        prompt: 'Pune în ordinea din curs modificările hemodinamice din hipertermia sub 39°C.',
        items: [
          { t: 'Vasodilatația', parts: ['h1'] },
          { t: 'Reducerea volumului circulant: intensificarea sudorației', parts: ['h2a', 'h2b'] },
          { t: 'Scăderea întoarcerii venoase și a rezistenței vasculare periferice', parts: ['h3a', 'h3b'] },
          { t: 'Scăderea debitului cardiac și a presiunii arteriale', parts: ['h4a', 'h4b'] },
          { t: 'Hipoperfuzia de organ', parts: ['h5'] },
          { t: 'Simptome: slăbiciune musculară, vertij, greață, alterarea stării de conștiență', parts: ['s1', 's2', 's3', 's4'] },
        ],
      },
    },
    now(S) { return `<b data-ui>Pasul ${S.v} din 6</b> · ${NAMES[S.v]}`; },
    stage(o, H, S) {
      const uid = 'fx' + FX.n;
      const DEF = `<button type="button" class="fxp defchip" data-p="h0"><b>Hipertermie sub 39°C</b><span>mediu cald sau efort fizic intens: termoliza este depășită</span></button>`;
      const U = x => x.replaceAll('__U__', uid);
      const L = A.L, M = A.mon;
      /* unda presiunii arteriale: periodică pe lățimea ecranului (cu incizura dicrotă), derulată */
      const per = M.w / 3, base = M.y + M.h - 10, amp = M.h * .56;
      const beat = x0 => [[x0, base], [x0 + per * .07, base - amp * .95], [x0 + per * .18, base - amp * .8], [x0 + per * .27, base - amp * .52], [x0 + per * .31, base - amp * .58], [x0 + per * .46, base - amp * .3], [x0 + per, base]];
      const wave = []; for (let i = 0; i < 6; i++) wave.push(...beat(M.x + i * per));
      const wd = 'M' + wave.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L');
      let s = `<div class="circ">`;
      s += `<svg class="iso-svg circ-svg cx-svg an-svg" viewBox="0 0 ${A.W} ${A.H}" role="group" aria-label="Circulația sistemică: inima cu crosa aortei, creierul, pielea în secțiune cu vase și glande sudoripare, rinichiul, venele cave și monitorul presiunii arteriale">`;
      s += `<defs>${U(A.defs)}<clipPath id="${uid}-m"><rect x="${M.x}" y="${M.y}" width="${M.w}" height="${M.h}" rx="3"/></clipPath></defs>`;
      s += U(L.skin + L.renArt + L.renVen + L.kidney + L.vessBack + L.venBack + L.venTop + L.pt + L.heart + L.lbcv + L.cuts + L.brain);
      const org = new Set(A.flow.org);
      s += A.flow.art.map((d, i) => `<path class="flow fa a${i}${org.has(i) ? ' org' : ''}" d="${d}"/>`).join('') + A.flow.ven.map((d, i) => `<path class="flow fv v${i}" d="${d}"/>`).join('');
      s += L.monitor + `<g clip-path="url(#${uid}-m)"><g class="bp-run" style="--mw:${(per * 3).toFixed(1)}"><path class="bp-wave" d="${wd}"/></g></g>`;
      const hs = A.hits, bd = A.badges, many = x => [].concat(x).map(hit).join('');
      s += H.spart('h1', many(hs.dil) + badge(1, bd.dil));
      s += H.spart('h2a', many(hs.sweat) + badge(2, bd.sweat));
      s += H.spart('h2b', many(hs.vol) + badge(3, bd.vol));
      s += H.spart('h3a', many(hs.vr) + badge(4, bd.vr));
      s += H.spart('h4a', many(hs.heart) + badge(5, bd.heart));
      s += H.spart('h4b', many(hs.bp) + badge(6, bd.bp));
      s += H.spart('h5', many(hs.org) + badge(7, bd.org) + badge(7, bd.org2));
      s += '</svg>';
      const cut = s.length;
      s += `<ul class="circ-rows" aria-label="Parametrii circulației">${ROWS.map((r, i) => `<li><button type="button" class="fxp row" data-p="${r.p}"><span class="bdg" data-ui>${r.b}</span><span class="rt"><span class="rl">${H.lab('l' + i, r.lab)}</span><span class="rd" data-ui>${r.dev}</span></span><span class="trk" aria-hidden="true"><i><u></u></i><s style="left:${r.n * 100}%"></s></span><span class="ar" aria-hidden="true"></span></button></li>`).join('')}</ul>`;
      s += `<div class="circ-sym"><span class="sl" data-ui>Simptome (slide 13)</span>${['s1', 's2', 's3', 's4'].map(id => `<button type="button" class="fxp sym" data-p="${id}">${P[id].t}</button>`).join('')}</div>`;
      s += `<div class="circ-sym"><span class="sl" data-ui>Din curs și context</span>${['c1', 'c2', 'x1'].map(id => `<button type="button" class="fxp sym ${P[id].ctx ? 'ctxs' : ''}" data-p="${id}">${P[id].t}</button>`).join('')}</div></div>`;
      return { view: s.slice(0, cut) + '</div>', legend: '<div class="circ circ-leg">' + DEF + s.slice(cut) };
    },
    update(el, S) {
      const root = el.querySelector('.circ'); if (!root) return;
      const p = Math.max(0, Math.min(6, Math.round(S.vv))), L = LV[p];
      const [dil, sw, vol, vr, rvp, co, bp, pf, sym] = L, st = root.style;
      st.setProperty('--dil', dil); st.setProperty('--vol', (.55 + .45 * vol).toFixed(2));
      st.setProperty('--amp', (1 + .09 * co).toFixed(3)); st.setProperty('--bp', bp.toFixed(2));
      st.setProperty('--pale', ((1 - pf) * 1.6).toFixed(2));
      st.setProperty('--fa', (2.2 / co).toFixed(2) + 's'); st.setProperty('--fv', (2.6 / vr).toFixed(2) + 's');
      st.setProperty('--fo', pf.toFixed(2));
      root.dataset.sw = sw ? '1' : '0'; root.dataset.sym = sym ? '1' : '0'; root.dataset.p = p;
      el.querySelectorAll('.circ-rows li').forEach((li, i) => {
        const r = ROWS[i], lvl = L[r.k];
        let f, ch;
        if (r.k === 0) { f = .4 + .4 * lvl; ch = lvl > 0 ? 1 : 0; }
        else if (r.k === 1) { f = .08 + .72 * lvl; ch = lvl > 0 ? 1 : 0; }
        else { f = r.n * lvl; ch = lvl < 1 ? -1 : 0; }
        li.querySelector('u').style.width = (f * 100).toFixed(0) + '%';
        li.querySelector('.row').dataset.ch = ch;
        li.querySelector('.ar').textContent = ch > 0 ? '↑' : ch < 0 ? '↓' : '·';
      });
      el.querySelectorAll('.circ-sym .sym').forEach(b => { const id = b.dataset.p; b.classList.toggle('lit', /^s\d/.test(id) ? !!sym : P[id].on(S)); });
    },
    panel(S, H) {
      const ids = Object.keys(P).filter(id => !P[id].ctx && !/^c\d/.test(id) && (P[id].on == null || P[id].on(S)));
      return `<section class="fx-grp"><h4><span data-ui>Ce spune cursul până la pasul ${S.v}</span><small>slide 12–13</small></h4><ol class="fx-chain flat">${ids.map(id => `<li>${H.node(id, id === 'h0' ? 'pen' : 'heat')}</li>`).join('')}</ol></section>`;
    },
  });
})();
