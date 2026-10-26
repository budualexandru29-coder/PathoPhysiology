/* ===== Î12: consecințele sistemice și efectele benefice ale febrei =====
   Desenul vine din art/fevcons.mjs (ART.fevcons). Variabila: temperatura centrală, 37–41°C, din jumătate în jumătate de grad.
   Textele cu diapozitiv vin din LP (Febra, slide 10–11, 28) și din Cursul 3 (slide 65–67); restul sunt explicații suplimentare, cu sursa. */
(function () {
  const A = ART.fevcons, G = A.geo;
  const T = v => 37 + v * 0.5;
  const band = v => { const t = T(v); return t < 38 ? 0 : t < 39 ? 1 : t < 40 ? 2 : 3; };
  const fmt = v => T(v).toFixed(1).replace('.', ',') + '°C';
  const fromB = n => S => band(S.v) >= n;
  const atB = (...b) => S => b.includes(band(S.v));
  const LP = 'Febra (LP), slide 10–11, 28';
  const C3 = n => 'Cursul 3, slide ' + n;
  const P = {
    tc: { t: '↑ temperatura centrală', slide: 'Febra (LP), slide 10', q: { 12: ['0:0'] }, on: fromB(1),
      body: 'Prima consecință sistemică: crește temperatura centrală. Febra reglată de hipotalamus de obicei nu trece de 41°C (mecanism de siguranță); peste 41,5°C vorbim de hiperpirexie, o urgență medicală (Cursul 3, slide 57, 72).' },
    hr: { t: '↑ frecvența cardiacă cu ~8–12/min la fiecare °C', slide: 'Febra (LP), slide 10; ' + C3(67), q: { 12: ['0:1'] }, eff: 1, on: fromB(1),
      body: 'Frecvența cardiacă crește cu aproximativ 8–12 bătăi pe minut pentru fiecare grad Celsius (cursul dă 15/min). Toxinele sau degenerarea miocardului în febra de lungă durată pot produce extrasistole sau alte tulburări de ritm. În desen, frecvența e calculată ca 70 + 10/min pe grad.' },
    met: { t: 'Metabolismul bazal crește; ↑ consumul de energie și de O₂', slide: 'Febra (LP), slide 10; ' + C3('66–67'), q: { 12: ['0:2', '0:3'] }, eff: 1, on: fromB(1),
      body: 'Febra intensifică metabolismul bazal și crește consumul energetic și de oxigen. Cursul: creșterea temperaturii cu 1°C crește consumul celular de O₂ cu 13%; metabolismul accelerat suprasolicită inima la bolnavii cardiovasculari. Se ard mai mult lipide și proteine, cu scădere ponderală; arderea rapidă a lipidelor poate da acidoză metabolică.' },
    sws: { t: 'Somnul cu unde lente (efect neuroprotector)', slide: 'Febra (LP), slide 10', q: { 12: ['0:4'] }, eff: 1, on: atB(1, 2),
      body: 'Senzoriul se modifică după valoarea temperaturii: se intensifică somnul cu unde lente, cu efect neuroprotector. În desen, EEG-ul are unde lente și ample.' },
    del: { t: 'Delir; convulsii febrile la copii', slide: 'Febra (LP), slide 10; ' + C3('64, 66'), q: { 12: ['0:5', '0:6'] }, eff: 1, on: atB(3),
      body: 'La valori mari ale temperaturii apar delir și, la copii, convulsii febrile. Cursul: tulburări ale activității mentale, dezorientare, delir; la copii, risc de convulsii febrile.' },
    bac: { t: 'Distruge celulele infectate; inhibă enzimele și sintezele proteice microbiene', slide: LP, q: { 12: ['1:0', '1:4'] }, eff: 1, on: fromB(1),
      body: 'Efecte benefice: febra distruge celulele infectate, inhibă activitatea enzimatică și sintezele proteice ale microorganismelor. În desen, bacteriile se înmulțesc tot mai puțin pe măsură ce temperatura crește.' },
    vir: { t: 'Împiedică replicarea virală', slide: LP + '; ' + C3(65), q: { 12: ['1:1'] }, eff: 1, on: fromB(1),
      body: 'Febra împiedică replicarea virală: efect bactericid, bacteriostatic și antiviral. În desen, celula infectată eliberează tot mai puțini virioni.' },
    fag: { t: 'Stimulează fagocitoza', slide: LP + '; ' + C3(65), q: { 12: ['1:2'] }, eff: 1, on: fromB(1),
      body: 'Febra stimulează fagocitoza: activează leucocitoza, chemotactismul, migrarea neutrofilelor și fagocitoza. În desen, neutrofilul înglobează tot mai multe bacterii.' },
    glu: { t: 'Reduce rezervele de glucoză', slide: LP + '; ' + C3(67), q: { 12: ['1:3'] }, eff: 1, on: fromB(1),
      body: 'Febra reduce rezervele de glucoză, care ar susține multiplicarea microorganismelor. Cursul: metabolismul virează de la utilizarea glucozei (mediu excelent pentru creșterea bacteriană) la arderea proteinelor și a lipidelor.' },
    fe: { t: 'Scad Fe, Zn și Cu plasmatice', slide: LP + '; ' + C3(65), q: { 12: ['1:5'] }, eff: 1, on: fromB(1),
      body: 'Scad fierul, zincul și cuprul plasmatice, oligoelemente esențiale multiplicării bacteriene. În desen, punctele maro (Fe), gri (Zn) și verzi (Cu) din capilar se răresc, iar macrofagul stochează fierul (feritina).' },
    inf: { t: 'Intensifică reacția inflamatorie', slide: LP + '; ' + C3(65), q: { 12: ['1:6'] }, eff: 1, on: fromB(1),
      body: 'Temperatura crescută intensifică reacția inflamatorie și producerea de factori proinflamatori. În desen, macrofagul eliberează citokine.' },
    lt: { t: 'Răspunsul imun specific: limfocite T helper, interferon', slide: LP + '; ' + C3(65), q: { 12: ['1:7'] }, eff: 1, on: fromB(1),
      body: 'Febra intensifică răspunsul imun specific: crește activitatea și proliferarea limfocitelor T helper și sinteza de interferon. În desen, limfocitele T se înmulțesc, iar interferonul (albastru) crește.' },
    bad: { t: 'Efectele nefavorabile', slide: C3('66–67'),
      body: 'Creșterea cu 1°C a temperaturii crește consumul celular de O₂ cu 13%; suprasolicitarea cordului la bolnavii cardiovasculari; dezorientare, delir; la copii convulsii febrile; la gravide, în primul trimestru, un episod febril dublează riscul de defecte de tub neural; polipnee; scădere ponderală, acidoză metabolică.' },
    chart: { t: 'Graficele: frecvența cardiacă și consumul de O₂', slide: 'Febra (LP), slide 10; ' + C3(66),
      body: 'Stânga: frecvența cardiacă, pornind de la 70/min, crește cu 8–12/min la fiecare grad (banda roz; linia roșie e mijlocul, 10/min). Dreapta: consumul de oxigen crește cu 13% la fiecare grad. Linia punctată e temperatura aleasă.' },
    x1: { t: 'De ce crește pulsul', ctx: 'Guyton AC, Hall JE. Textbook of Medical Physiology, 14th ed., Elsevier 2021, cap. 9 (efectul temperaturii asupra inimii)',
      body: 'Căldura accelerează depolarizarea spontană a nodului sinusal, iar sistemul simpatic e activat. În plus, metabolismul crescut cere mai mult oxigen, deci un debit cardiac mai mare.' },
  };
  const HITS = [['sws', 'eeg', 1], ['del', 'eeg', 1], ['hr', 'hr', 2], ['met', 'met', 3], ['bac', 'bac', 4], ['vir', 'vir', 5], ['fag', 'fag', 6], ['lt', 'lt', 7], ['glu', 'glu', 8], ['inf', 'inf', 9], ['fe', 'fe', 10], ['chart', 'chart', 11]];
  const DEV = { sws: 'Creierul și EEG-ul', del: 'Creierul și EEG-ul', hr: 'Inima și ECG-ul', met: 'Celula și consumul de O₂', bac: 'Bacteriile', vir: 'Celula infectată cu virus', fag: 'Neutrofilul', lt: 'Limfocitele T și interferonul', glu: 'Glucoza (hexagoanele galbene)', inf: 'Macrofagul', fe: 'Capilarul cu Fe, Zn, Cu', chart: 'Graficele de jos' };
  const hit = a => a.w != null ? `<rect class="hit" x="${(+a.x).toFixed(1)}" y="${(+a.y).toFixed(1)}" width="${(+a.w).toFixed(1)}" height="${(+a.h).toFixed(1)}" rx="8"/>` : `<circle class="hit" cx="${(+a.cx).toFixed(1)}" cy="${(+a.cy).toFixed(1)}" r="${a.r}"/>`;
  const badge = (n, [x, y]) => `<g class="bdg-s"><circle cx="${x}" cy="${y}" r="8.6"/><text x="${x}" y="${y + 3.6}" text-anchor="middle" data-ui>${n}</text></g>`;
  const curX = (g, v) => g.x + (T(v) - 37) / 4 * g.w;
  const hrOf = v => 70 + 10 * (T(v) - 37), o2Of = v => 100 + 13 * (T(v) - 37);

  FX.def('fevcons', {
    title: 'Febra: ce face gazdei și ce face microbului',
    meta: 'Consecințele sistemice și efectele benefice ale febrei',
    qs: [12],
    kind: 'mix',
    note: 'În stânga, gazda: creierul cu EEG-ul, inima cu ECG-ul și o celulă cu mitocondriile ei. În dreapta, un focar de infecție: bacterii, o celulă infectată cu virus, un neutrofil, limfocite T, glucoză, un macrofag și un capilar. Jos, frecvența cardiacă și consumul de oxigen în funcție de temperatură. Trasee, celule și curbe schematice, construite pe valorile din LP și din curs.',
    src: 'Febra (LP), slide 10–11, 28; Cursul 3 (Termoreglarea), slide 64–67, 72',
    neutral: 0,
    ctl: { type: 'range', label: 'Temperatura centrală', min: 0, max: 8, step: 1, init: 4, fmt, play: { ms: 1400, label: 'Crește temperatura' }, peek: 'Compară cu 37°C' },
    initV: () => 4,
    hints: {
      predict: 'Alege o temperatură, bifează ce crezi că se întâmplă, apoi apasă „Dezvăluie”.',
      explore: 'Mută temperatura. Apasă creierul, inima, o celulă sau un grafic ori un rând de mai jos: vezi textul din LP și punctul din barem.',
    },
    predict: { kind: 'pick', prompt: (S, lab) => `La ${lab}: ce se întâmplă?` },
    tour: [
      { v: 0, parts: ['chart'], t: 'La 37°C',
        see: 'Treaz, EEG cu unde rapide; inima la 70/min; consumul de oxigen la 100%. În focar, bacteriile se înmulțesc, celula infectată eliberează virioni, în sânge sunt Fe, Zn și Cu.' },
      { v: 4, parts: ['tc', 'hr', 'met'], t: 'La 39°C: gazda',
        see: 'Pulsul crește cu 8–12/min la fiecare grad: aici ~90/min (2). Metabolismul se intensifică: consumul de O₂ crește cu 13% pe grad, aici ~126% (3).' },
      { v: 4, parts: ['sws'], t: 'Senzoriul',
        see: 'Febra moderată intensifică somnul cu unde lente (1), cu efect neuroprotector.' },
      { v: 4, parts: ['bac', 'vir', 'fag'], t: 'Efectele benefice asupra microbului',
        see: 'Bacteriile se înmulțesc greu (4), replicarea virală e împiedicată (5), neutrofilul fagocitează mai mult (6).' },
      { v: 4, parts: ['glu', 'fe', 'inf', 'lt'], t: 'Microbul e lipsit de resurse; apărarea crește',
        see: 'Rezervele de glucoză scad (8). Fe, Zn și Cu din sânge scad (10): macrofagul (9) stochează fierul. Limfocitele T helper se înmulțesc, crește interferonul (7).' },
      { v: 7, parts: ['del', 'bad'], t: 'Peste 40°C',
        see: 'EEG-ul devine dezorganizat: delir; la copii, convulsii febrile (1). Inima și metabolismul sunt suprasolicitate.' },
    ],
    parts: P,
    games: {
      sort: {
        prompt: 'Consecință sistemică sau efect benefic? (LP, slide 10–11)',
        bins: [{ id: 'c', t: 'Consecințe sistemice', sub: 'gazda', short: 'Consecințe', tone: 'heat' }, { id: 'b', t: 'Efecte benefice', sub: 'contra microbului', short: 'Benefice' }],
        items: [{ id: 'hr', bin: 'c' }, { id: 'met', bin: 'c' }, { id: 'sws', bin: 'c' }, { id: 'del', bin: 'c' }, { id: 'bac', bin: 'b' }, { id: 'vir', bin: 'b' }, { id: 'fag', bin: 'b' }, { id: 'glu', bin: 'b' }, { id: 'fe', bin: 'b' }, { id: 'lt', bin: 'b' }],
      },
    },
    now(S) { return `<b data-ui>${fmt(S.v)}</b>`; },
    stage(o, H, S) {
      const uid = 'fx' + FX.n, U = x => x.replaceAll('__U__', uid), L = A.L, hs = A.hits, bd = A.badges, b = band(S.v);
      let s = `<div class="fcx" data-b="${b}">`;
      s += `<svg class="iso-svg fc-svg an-svg" viewBox="0 0 ${A.W} ${A.H}" role="group" aria-label="Creierul cu EEG, inima cu ECG, o celulă și consumul de oxigen; un focar de infecție cu bacterii, virus, neutrofil, limfocite, macrofag și capilar; graficele frecvenței cardiace și ale consumului de oxigen">`;
      s += `<defs>${U(A.defs)}</defs>`;
      s += L.frames + U(L.panelA) + U(L.panelB) + L.chart + L.cur;
      HITS.forEach(([id, hk, n]) => { const k = id === 'sws' ? 'only12' : id === 'del' ? 'only3' : ''; s += k ? `<g class="fc-only ${k}">${H.spart(id, hit(hs[hk]) + badge(n, bd[hk]))}</g>` : H.spart(id, hit(hs[hk]) + badge(n, bd[hk])); });
      s += '</svg>';
      const cut = s.length;
      s += `<ul class="circ-rows fv-rows fc-rows" aria-label="Ce arată figura">${HITS.map(([id, , n]) => `<li><button type="button" class="fxp row" data-p="${id}"><span class="bdg" data-ui>${n}</span><span class="rt"><span class="rl">${H.lab('l' + id, P[id].t)}</span><span class="rd" data-ui>${DEV[id]}</span></span><span class="ar" aria-hidden="true"></span></button></li>`).join('')}</ul>`;
      s += `<div class="circ-sym"><span class="sl" data-ui>Din curs</span>${['tc', 'bad'].map(id => `<button type="button" class="fxp sym" data-p="${id}">${P[id].t}</button>`).join('')}<button type="button" class="fxp sym ctxs" data-p="x1">${P.x1.t}</button></div></div>`;
      return { view: s.slice(0, cut) + '</div>', legend: '<div class="fcx fc-leg circ" data-b="' + b + '">' + s.slice(cut) };
    },
    update(el, S) {
      const v = Math.max(0, Math.min(8, Math.round(S.vv))), b = band(v);
      el.querySelectorAll('.fcx').forEach(r => { r.dataset.b = b; });
      const hr = Math.round(hrOf(v)), o2 = Math.round(o2Of(v));
      const th = el.querySelector('[data-hr]'); if (th) th.textContent = hr;
      const to = el.querySelector('[data-o2]'); if (to) to.textContent = o2;
      const c1 = el.querySelector('.fc-cur1'), c2 = el.querySelector('.fc-cur2');
      if (c1) { c1.style.transform = `translateX(${curX(G.G1, v)}px)`; c1.querySelector('circle').setAttribute('cy', (G.hy0 - (hr - 60) * G.hyK).toFixed(1)); }
      if (c2) { c2.style.transform = `translateX(${curX(G.G2, v)}px)`; c2.querySelector('circle').setAttribute('cy', (G.oy0 - (o2 - 90) * G.oyK).toFixed(1)); }
      el.querySelectorAll('.fc-rows .row').forEach(r => { const on = FX.isOn(P[r.dataset.p], { v }); r.dataset.ch = on ? 1 : 0; r.querySelector('.ar').textContent = on ? '●' : '·'; });
      el.querySelectorAll('.fc-leg .sym').forEach(r => r.classList.toggle('lit', FX.isOn(P[r.dataset.p], { v })));
    },
    panel(S, H) {
      const li = ids => ids.filter(id => FX.isOn(P[id], S)).map(id => `<li>${H.node(id, 'heat')}</li>`).join('');
      if (band(S.v) === 0) return `<section class="fx-grp"><h4><span data-ui>${fmt(S.v)}</span><small>${LP}</small></h4><ol class="fx-chain"><li class="fx-gap">Temperatură normală: fără consecințele febrei.</li></ol></section>`;
      return `<section class="fx-grp"><h4><span data-ui>Consecințe sistemice · ${fmt(S.v)}</span><small>Febra (LP), slide 10</small></h4><ol class="fx-chain">${li(['tc', 'hr', 'met', 'sws', 'del'])}</ol></section>`
        + `<section class="fx-grp"><h4><span data-ui>Efecte benefice</span><small>Febra (LP), slide 11, 28</small></h4><ol class="fx-chain">${li(['bac', 'vir', 'fag', 'glu', 'fe', 'inf', 'lt'])}</ol></section>`;
    },
  });
})();
