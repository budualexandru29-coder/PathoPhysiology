/* ===== Î9: efectele locale ale frigului =====
   Desenul vine din art/coldloc.mjs (ART.coldloc). Variabila: etapa, de la normal la expunerea prelungită (0–4).
   Textele cu diapozitiv vin din LP (Termoreglarea, slide 26) și din Cursul 3 (slide 39–43); restul sunt explicații suplimentare, cu sursa. */
(function () {
  const A = ART.coldloc;
  const ST = ['Normal', 'Frig: vasoconstricție, flux încetinit', 'Îngheț: cristale de gheață', 'Reîncălzire: histamină, edem, flictene', 'Expunere prelungită: microtromboze, necroză'];
  const at = (...v) => S => v.includes(S.v);
  const from = n => S => S.v >= n;
  const LP = 'Termoreglarea (LP), slide 26';
  const C3 = n => 'Cursul 3, slide ' + n;
  const P = {
    deg: { t: 'Degerăturile', slide: LP + '; ' + C3(43), q: { 9: ['2:0'] }, on: from(1),
      body: 'Expunerea prelungită la frig duce la apariția degerăturilor. Gradul I: inițial paloare și pierderea sensibilității; durere și tumefiere după reîncălzire. Gradul II: după 12–24 de ore de expunere, vezicule; vindecare cu cicatrici post-veziculare. Gradul III: după zile sau săptămâni de expunere, necroză tisulară extinsă; vindecare cu cicatrici sau sechele morfo-funcționale.' },
    vc: { t: 'Vasoconstricția', slide: LP + '; ' + C3('25, 39'), q: { 9: ['0:0'] }, eff: 1, on: at(1, 2, 4),
      body: 'Efectele locale ale frigului sunt secundare vasoconstricției și încetinirii fluxului sanguin. Hipotalamusul posterior produce vasoconstricție periferică temporară, urmată după o vreme de vasodilatație, care previne ischemia. În desen, arteriola se îngustează, ansele capilare se golesc, degetul se albește.' },
    flow: { t: 'Încetinirea fluxului sanguin', slide: LP, q: { 9: ['0:1'] }, eff: 1, on: at(1, 2, 4),
      body: 'Fluxul sanguin încetinește. În desen, hematiile se lipesc în fișicuri (stive) în venulă și în anse.' },
    ice: { t: 'Cristalele de gheață lezează direct membranele', slide: C3(39), eff: 1, on: at(2),
      body: 'Efecte directe: cristalele de gheață duc la leziuni directe ale membranelor celulare, cu tulburări ale distribuției apei la nivel intracelular sau interstițial; modificări ale echilibrului osmotic și hidro-electrolitic. Leziunile sunt mai grave în țesuturile dense decât în cele laxe. În desen, cristalele (albastru deschis) în interstițiu și celulele care se zbârcesc.' },
    nv: { t: 'Pierderea sensibilității', slide: C3(43), eff: 1, on: at(1, 2),
      body: 'Gradul I al degerăturii începe cu paloare și pierderea sensibilității. În desen, terminațiile nervoase (galbene) din derm.' },
    mast: { t: 'Mediatorii vasoactivi: histamina', slide: LP + '; ' + C3(39), q: { 9: ['1:0', '1:1'] }, eff: 1, on: at(3),
      body: 'Frigul determină eliberarea de mediatori vasoactivi, în special histamina. În desen, mastocitul de lângă vase eliberează granulele (punctele violet).' },
    perm: { t: 'Hiperpermeabilitate capilară: apa trece în interstițiu, edem', slide: LP + '; ' + C3(39), q: { 9: ['1:2', '1:3', '1:4'] }, eff: 1, on: at(3),
      body: 'Histamina produce hiperpermeabilitate capilară și extravazarea apei în interstițiu, cu apariția edemelor. La reîncălzire apar durerea și tumefierea (gradul I) și veziculele (gradul II). În desen, lichidul (puncte albastre) între fibre și ansele capilare dilatate.' },
    bl: { t: 'Gradul II: vezicule (flictene)', slide: C3(43), eff: 1, on: at(3),
      body: 'După 12–24 de ore de expunere la frig apar vezicule; vindecarea se face cu cicatrici post-veziculare. În desen, epidermul ridicat de lichid.' },
    thr: { t: 'Microtrombozele', slide: LP + '; ' + C3(39), q: { 9: ['0:2'] }, eff: 1, on: at(4),
      body: 'Încetinirea fluxului favorizează apariția microtrombozelor. Prin lezarea pereților vaselor mici se produc leziuni de ischemie și hipoxie; microtrombozele vasculare determină necroze tisulare importante. În desen, trombii (roșu-închis, cu trombocite și fibrină) în venulă și în anse.' },
    nec: { t: 'Necrozele (gradul III)', slide: LP + '; ' + C3('39, 43'), q: { 9: ['0:3'] }, eff: 1, on: at(4),
      body: 'Urmează necrozele. Gradul III al degerăturii apare după zile sau săptămâni de expunere: necroză tisulară extinsă, cu vindecare prin cicatrici sau cu sechele. În desen, epidermul și dermul superficial distruse, cu nuclei picnotici; vârful degetului e negru, cu o linie de demarcație.' },
    fat: { t: 'Necroza grăsoasă', slide: LP, q: { 9: ['2:1'] }, eff: 1, on: at(4),
      body: 'Expunerea prelungită la frig duce la degerături și la necroză grăsoasă. În desen, unele adipocite din hipoderm se rup, iar grăsimea lor devine o masă albicioasă, cu depozite cretoase.' },
    chart: { t: 'Gradul degerăturii depinde de durata expunerii', slide: C3(43),
      body: 'Gradul I: palid, fără sensibilitate, apoi durere și tumefiere la reîncălzire. Gradul II: după 12–24 de ore de expunere, vezicule. Gradul III: după zile sau săptămâni, necroză extinsă. Triunghiul roșu arată etapa aleasă.' },
    rew: { t: 'Reîncălzirea: lentă; leziuni de ischemie–reperfuzie', slide: C3('40–41'), on: at(3),
      body: 'Reîncălzirea trebuie făcută lent: dacă e rapidă și externă, cu mai mult de câteva grade pe oră, apar leziuni asemănătoare celor din ischemie–reperfuzie: vasodilatație periferică marcată, scăderea volemiei și a tensiunii; sângele periferic cu pH scăzut ajunge la cord (aritmii) și poate produce hipotermie paradoxală.' },
    x1: { t: 'De ce se zbârcesc celulele în îngheț', ctx: 'Murphy JV et al. Frostbite: pathogenesis and treatment. J Trauma 2000;48:171–178; McIntosh SE et al. Wilderness Medical Society clinical practice guidelines for the prevention and treatment of frostbite: 2019 update. Wilderness Environ Med 2019;30:S19–S32',
      body: 'La răcire lentă, gheața se formează întâi în afara celulelor: apa înghețată lasă interstițiul mai concentrat, iar apa iese din celule, care se deshidratează și se zbârcesc. La răcire rapidă se formează gheață și în celule, care le distruge direct. La reîncălzire, endoteliul lezat, trombii și mediatorii (tromboxan, prostaglandine) extind ischemia: de aceea necroza se definitivează în zilele următoare.' },
    x2: { t: 'Scara desenului', ctx: 'desen schematic',
      body: 'Secțiunea prin pulpa degetului e schematică: arteriola, ansele capilare și venula sunt desenate mai mari și mai ordonate decât în realitate, iar cristalele de gheață sunt mărite.' },
  };
  const HITS = [['deg', 'fing', 1], ['vc', 'art', 2], ['flow', 'roul', 3], ['ice', 'ice', 4], ['nv', 'nv', 5], ['mast', 'mast', 6], ['perm', 'edema', 7], ['bl', 'bl', 8], ['thr', 'thr', 9], ['nec', 'nec', 10], ['fat', 'fat', 11], ['chart', 'chart', 12]];
  const DEV = { deg: 'Degetul', vc: 'Arteriola', flow: 'Hematiile din venulă', ice: 'Cristalele din interstițiu', nv: 'Nervul din derm', mast: 'Mastocitul', perm: 'Lichidul dintre fibre', bl: 'Epidermul ridicat', thr: 'Trombii din venulă', nec: 'Țesutul brun, distrus', fat: 'Adipocitele rupte', chart: 'Axa duratei' };
  const hit = a => a.w != null ? `<rect class="hit" x="${(+a.x).toFixed(1)}" y="${(+a.y).toFixed(1)}" width="${(+a.w).toFixed(1)}" height="${(+a.h).toFixed(1)}" rx="8"/>` : `<circle class="hit" cx="${(+a.cx).toFixed(1)}" cy="${(+a.cy).toFixed(1)}" r="${a.r}"/>`;
  const badge = (n, [x, y]) => `<g class="bdg-s"><circle cx="${x}" cy="${y}" r="8.6"/><text x="${x}" y="${y + 3.6}" text-anchor="middle" data-ui>${n}</text></g>`;

  FX.def('coldloc', {
    title: 'Efectele locale ale frigului: degetul',
    meta: 'Efectele locale ale frigului și degerăturile',
    qs: [9],
    kind: 'mix',
    note: 'În stânga, un deget văzut dinspre unghie. În dreapta, o secțiune prin pulpa lui: epidermul, dermul cu o arteriolă, anse capilare, o venulă, un mastocit și un nerv, hipodermul cu adipocite. Jos, gradele degerăturii după durata expunerii. Cursorul trece prin etapele efectelor locale ale frigului.',
    src: 'Termoreglarea (LP), slide 26; Cursul 3 (Termoreglarea), slide 25, 39–43',
    neutral: 0,
    ctl: { type: 'range', label: 'Etapa', min: 0, max: 4, step: 1, init: 4, fmt: v => ST[v], play: { ms: 2600, label: 'Redă etapele' }, peek: 'Compară cu normal' },
    initV: () => 4,
    hints: {
      predict: 'Alege o etapă, bifează ce crezi că se vede, apoi apasă „Dezvăluie”.',
      explore: 'Mută cursorul. Apasă degetul, un vas, o celulă sau axa duratei ori un rând de mai jos: vezi textul din LP și punctul din barem.',
    },
    predict: { kind: 'pick', prompt: (S, lab) => `${lab}: ce se vede?` },
    tour: [
      { v: 0, parts: ['x2'], t: 'Pulpa degetului',
        see: 'Degetul normal și secțiunea prin pulpa lui: arteriola (roșie) trimite anse capilare spre papile, sângele se întoarce prin venulă (albastră); lângă vase, un mastocit; dedesubt, adipocitele hipodermului.' },
      { v: 1, parts: ['vc', 'flow', 'nv'], t: 'Calea vasculară: vasoconstricția',
        see: 'Arteriola se îngustează (2), ansele se golesc, fluxul încetinește și hematiile se lipesc în fișicuri (3). Degetul e palid și își pierde sensibilitatea (5).' },
      { v: 2, parts: ['ice', 'x1'], t: 'Înghețul',
        see: 'În interstițiu apar cristale de gheață (4); celulele pierd apă și se zbârcesc. Membranele sunt lezate direct. Degetul e alb-cerat, cu brumă.' },
      { v: 3, parts: ['mast', 'perm', 'bl', 'rew'], t: 'Calea mediatorilor: la reîncălzire',
        see: 'Mastocitul eliberează histamină (6); capilarele devin permeabile, apa trece în interstițiu (7): edem. Epidermul se ridică într-o flictenă (8). Degetul e roșu, umflat, dureros.' },
      { v: 4, parts: ['thr', 'nec', 'fat', 'deg'], t: 'Expunerea prelungită',
        see: 'Fluxul lent și pereții lezați duc la microtromboze (9), apoi la necroză (10). În hipoderm apare necroza grăsoasă (11). Vârful degetului e negru, separat de țesutul viu printr-o linie de demarcație.' },
      { v: 4, parts: ['chart', 'deg'], t: 'Gradele degerăturii',
        see: 'Gradul depinde de durata expunerii (12): ore (gradul I), 12–24 de ore (gradul II, vezicule), zile–săptămâni (gradul III, necroză).' },
    ],
    parts: P,
    games: {
      order: {
        prompt: 'Pune în ordine calea vasculară a efectelor locale ale frigului (LP, slide 26).',
        items: [
          { t: 'Vasoconstricția', parts: ['vc'] },
          { t: 'Încetinirea fluxului sanguin', parts: ['flow'] },
          { t: 'Microtrombozele', parts: ['thr'] },
          { t: 'Necrozele', parts: ['nec'] },
        ],
      },
      sort: {
        prompt: 'Așază fiecare efect pe calea lui (LP, slide 26).',
        bins: [{ id: 'v', t: 'Calea vasculară', short: 'Vasculară', tone: 'heat' }, { id: 'm', t: 'Calea mediatorilor', short: 'Mediatori' }, { id: 'p', t: 'Expunerea prelungită', short: 'Prelungită' }],
        items: [{ id: 'vc', bin: 'v' }, { id: 'flow', bin: 'v' }, { id: 'thr', bin: 'v' }, { id: 'nec', bin: 'v' }, { id: 'mast', bin: 'm' }, { id: 'perm', bin: 'm' }, { id: 'deg', bin: 'p' }, { id: 'fat', bin: 'p' }],
      },
    },
    now(S) { return `<b data-ui>${ST[S.v]}</b>`; },
    stage(o, H, S) {
      const uid = 'fx' + FX.n, U = x => x.replaceAll('__U__', uid), L = A.L, hs = A.hits, bd = A.badges;
      let s = `<div class="clx" data-st="${S.v}">`;
      s += `<svg class="iso-svg cl-svg an-svg" viewBox="0 0 ${A.W} ${A.H}" role="group" aria-label="Degetul și secțiunea prin pulpa lui, cu vasele, mastocitul, cristalele de gheață, trombii și necroza; axa gradelor degerăturii">`;
      s += `<defs>${U(A.defs)}</defs>`;
      s += L.frames + U(L.finger) + U(L.panelB) + L.callout + L.chart + `<g class="cl-ptrg" style="transform:translateX(${A.marks[S.v]}px)">${L.pointer}</g>`;
      HITS.forEach(([id, hk, n]) => { s += H.spart(id, hit(hs[hk]) + badge(n, bd[hk])); });
      s += '</svg>';
      const cut = s.length;
      s += `<ul class="circ-rows fv-rows cl-rows" aria-label="Ce arată figura">${HITS.map(([id, , n]) => `<li><button type="button" class="fxp row" data-p="${id}"><span class="bdg" data-ui>${n}</span><span class="rt"><span class="rl">${H.lab('l' + id, P[id].t)}</span><span class="rd" data-ui>${DEV[id]}</span></span><span class="ar" aria-hidden="true"></span></button></li>`).join('')}</ul>`;
      s += `<div class="circ-sym"><span class="sl" data-ui>Din curs</span><button type="button" class="fxp sym" data-p="rew">${P.rew.t}</button><button type="button" class="fxp sym ctxs" data-p="x1">${P.x1.t}</button><button type="button" class="fxp sym ctxs" data-p="x2">${P.x2.t}</button></div></div>`;
      return { view: s.slice(0, cut) + '</div>', legend: '<div class="clx cl-leg circ" data-st="' + S.v + '">' + s.slice(cut) };
    },
    update(el, S) {
      const v = Math.max(0, Math.min(4, Math.round(S.vv)));
      el.querySelectorAll('.clx').forEach(r => { r.dataset.st = v; });
      const p = el.querySelector('.cl-ptrg'); if (p) p.style.transform = `translateX(${A.marks[v]}px)`;
      el.querySelectorAll('.cl-rows .row').forEach(b => { const on = FX.isOn(P[b.dataset.p], { v }); b.dataset.ch = on ? 1 : 0; b.querySelector('.ar').textContent = on ? '●' : '·'; });
      el.querySelectorAll('.cl-leg .sym').forEach(b => b.classList.toggle('lit', FX.isOn(P[b.dataset.p], { v })));
    },
    panel(S, H) {
      const li = (ids, cls) => ids.filter(id => FX.isOn(P[id], S)).map(id => `<li>${H.node(id, cls)}</li>`).join('');
      if (S.v === 0) return `<section class="fx-grp"><h4><span data-ui>${ST[0]}</span><small>${LP}</small></h4><ol class="fx-chain"><li class="fx-gap">Fără frig: vasele, celulele și pielea sunt normale.</li></ol></section>`;
      return `<section class="fx-grp"><h4><span data-ui>${ST[S.v]}</span><small>${LP}</small></h4><ol class="fx-chain">${li(['vc', 'flow', 'ice', 'nv', 'mast', 'perm', 'bl', 'thr', 'nec', 'fat', 'rew'], 'heat')}</ol></section>`
        + `<section class="fx-grp"><h4><span data-ui>Degerăturile</span><small>${C3(43)}</small></h4><ol class="fx-chain"><li>${H.node('deg')}</li></ol></section>`;
    },
  });
})();
