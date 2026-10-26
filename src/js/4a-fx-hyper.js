/* ===== Î3: tipurile de hipertermie — hipertermia malignă, mialgia termică, insolația, arsurile solare =====
   Desenul vine din art/hyper.mjs (ART.hyper). Variabila: forma, de la normal la severă, plus tratamentul (0–4), aceeași pentru toate plăcile.
   Textele cu diapozitiv vin din LP (Termoreglarea, slide 16–18) și din Cursul 3 (slide 44–56); restul sunt explicații suplimentare, cu sursa. */
(function () {
  const A = ART.hyper;
  const ST = ['Normal', 'Forma ușoară, la debut', 'Forma moderată', 'Forma severă', 'Tratamentul'];
  const at = (...v) => S => v.includes(S.v);
  const LP = 'Termoreglarea (LP), slide 16–17';
  const C3 = n => 'Cursul 3, slide ' + n;
  const ROS = 'Rosenberg H et al. Malignant hyperthermia: a review. Orphanet J Rare Dis 2015;10:93';
  const P = {
    enum: { t: 'Cele patru tipuri: hipertermia malignă, mialgia termică, insolația, arsurile solare', slide: LP, q: { 3: ['0:0', '0:1', '0:2', '0:3'] },
      body: 'LP-ul prezintă patru tipuri de hipertermie: hipertermia malignă, mialgia termică, insolația și arsurile solare. Cursul le împarte în hipertermie exogenă (temperatură crescută a mediului: crampa hipertermică, epuizarea termică, sincopa termică, șocul termic) și endogenă (hipertermia malignă, la temperatură normală a mediului).' },
    ryr: { t: 'Hipertermia malignă: defect genetic al receptorului pentru rianodină', slide: LP + '; ' + C3(53), q: { 3: ['1:0', '1:2'] }, on: at(0, 1, 2, 3, 4),
      body: 'Defecte genetice heterogene ale transportorului sarcoplasmic al calciului; este afectat receptorul pentru rianodină de la nivelul canalelor de calciu. Cursul: tulburare ereditară (AD/AR, gene de pe brațul lung al cromozomului 19). În desen, RyR1 (roșu) pe cisternele reticulului sarcoplasmic, față în față cu receptorii de dihidropiridină (albaștri) din tubul T.' },
    trig: { t: 'Declanșată de anestezice inhalatorii halogenate sau miorelaxante depolarizante', slide: LP + '; ' + C3(53), q: { 3: ['1:3', '1:4'] }, eff: 1, on: at(1, 2, 3),
      body: 'Hipertermia malignă se declanșează la expunerea la anestezice inhalatorii halogenate (halotan) sau la miorelaxante depolarizante (succinilcolină), fără ca temperatura mediului să fie crescută. În desen, moleculele de halotan (C, F, Br, Cl) și de succinilcolină în spațiul extracelular.' },
    ca: { t: 'Eliberarea masivă de Ca²⁺ din reticulul sarcoplasmic', slide: LP + '; ' + C3(53), q: { 3: ['1:1'] }, eff: 1, on: at(1, 2, 3),
      body: 'Reticulul sarcoplasmic are un defect genetic de stocare a calciului, la nivelul canalelor de calciu (receptorul pentru rianodină). Are loc eliberarea masivă a ionilor de Ca²⁺ din reticulul sarcoplasmic al celulelor musculare striate. În desen, canalele RyR1 rămân deschise (galben), ionii verzi ies din cisterne în citoplasmă.' },
    sarc: { t: 'Contracții rapide și necontrolate, rigiditate', slide: C3('53–54'), eff: 1, on: at(1, 2, 3),
      body: 'Se produc contracții musculare rapide și necontrolate. Tabloul clinic: rigiditate musculară, contractură necontrolată, spasme. În desen, sarcomerul se scurtează: liniile Z se apropie, filamentele subțiri alunecă peste cele groase.' },
    mito: { t: 'Termogeneză excesivă, consum crescut de oxigen', slide: C3(53), eff: 1, on: at(1, 2, 3),
      body: 'Contracțiile necontrolate eliberează masiv căldură (termogeneză excesivă) și cresc consumul de oxigen. În desen, mitocondriile se încălzesc.' },
    mon: { t: 'Tabloul clinic: până la 43°C, tahicardie, hipotensiune, hiperpotasemie, acidoză', slide: C3('53–54'), eff: 1, on: at(2, 3),
      body: 'Temperatura internă crește rapid la 39–40°C și poate ajunge la 43°C. Rigiditate musculară; acidoză, hiperpotasemie; hipotensiune; tahicardie și aritmie. Decesul poate apărea rapid, prin leziunile produse de calciu, lipsa oxigenului și disfuncțiile cardio-respiratorii. În desen, K⁺ (violet) iese din fibră; valorile de temperatură de pe monitor sunt exemple.' },
    dan: { t: 'Tratament: oprirea agentului, răcire, dantrolen', slide: C3(54), eff: 1, on: at(4),
      body: 'Înlăturarea factorului declanșator (anestezicul sau miorelaxantul); răcirea corpului și metode de termoliză; administrarea de dantrolen de sodiu (miorelaxant), care blochează efectele calciului la nivel celular. În desen, dantrolenul (galben) pe receptorii de rianodină, care se închid; Ca²⁺ revine în reticul.' },
    cr: { t: 'Mialgia termică: spasme musculare', slide: LP + '; ' + C3(47), q: { 3: ['0:1', '2:0'] }, eff: 1, on: at(2, 3),
      body: 'Mialgia termică: spasme musculare induse de activitate fizică intensă și prelungită într-un mediu ambiental foarte cald. Cursul o numește crampa hipertermică (crampa minerilor sau a sportivilor): cea mai ușoară formă de hipertermie exogenă.' },
    crE: { t: 'Efort intens, prelungit, în căldură: se pierd apă și săruri', slide: LP + '; ' + C3(47), q: { 3: ['2:1'] }, eff: 1, on: at(1, 2, 3),
      body: 'Apare la efort fizic intens într-un mediu supraîncălzit (mină, furnale, fotbaliști). Se datorează pierderilor excesive de apă și minerale prin sudoare. În desen, picăturile de sudoare cu Na⁺ (albastru) și Cl⁻ (verde).' },
    crW: { t: 'Se înlocuiește doar apa, fără săruri', slide: C3(47), eff: 1, on: at(1, 2, 3),
      body: 'Pierderile de apă și minerale sunt urmate de refacerea doar a rezervelor de apă, fără săruri.' },
    crB: { t: 'Na și Cl plasmatice scad; hemoconcentrație', slide: C3(47), eff: 1, on: at(2, 3),
      body: 'Scade nivelul plasmatic de Na și Cl, cu hemoconcentrație. În desen, mai puțini ioni în vas și hematii mai înghesuite.' },
    crT: { t: 'Tratament: rehidratare, săruri, repaus, mediu răcoros', slide: C3(47), eff: 1, on: at(4),
      body: 'Tratamentul constă în rehidratare, administrare de săruri, repaus fizic și plasarea într-un mediu mai rece.' },
    ins: { t: 'Insolația: radiația solară directă pe cap și gât', slide: LP + '; ' + C3(55), q: { 3: ['0:2', '3:0'] }, eff: 1, on: at(1, 2, 3),
      body: 'Insolația este efectul direct al radiației solare asupra extremității cefalice (și a gâtului). Cauza: hipertermia cerebrală. Formele ușoare: amețeală, cefalee.' },
    insE: { t: 'Edem cerebral de diferite grade', slide: LP + '; ' + C3(55), q: { 3: ['3:1'] }, eff: 1, on: at(2, 3),
      body: 'Insolația produce edem cerebral de diferite grade. În desen, creierul se umflă și se încarcă cu lichid (tenta albăstruie).' },
    insM: { t: 'Meningita seroasă, complicația cea mai severă', slide: LP + '; ' + C3(55), q: { 3: ['3:2'] }, eff: 1, on: at(3),
      body: 'Cea mai severă complicație a insolației: meningita seroasă, cu potențial letal. În desen, meningele (spațiul dintre creier și craniu) se îngroașă și se încarcă cu lichid.' },
    insT: { t: 'Tratament: scos de sub soare, măsuri de termoliză', slide: C3(55), eff: 1, on: at(4),
      body: 'Tratamentul constă în măsuri termolitice și scoaterea pacientului de sub efectul direct al razelor de Soare.' },
    bu1: { t: 'Arsura de gradul I: edem și eritem', slide: LP + '; ' + C3(56), q: { 3: ['0:3', '4:0'] }, eff: 1, on: at(1, 2),
      body: 'Arsurile solare apar prin expunerea directă a organismului la radiația solară și au diferite grade. Gradul I: edem și eritem (roșeață). În desen, ansele capilare din papilele dermului se dilată, dermul se înroșește și apare lichid între fibre.' },
    bu2: { t: 'Arsura de gradul II: leziuni veziculo-buloase', slide: C3(56), q: { 3: ['4:0'] }, eff: 1, on: at(2),
      body: 'Gradul II: leziuni veziculo-buloase. În desen, o flictenă: epidermul e ridicat de lichid de pe derm.' },
    bu3: { t: 'Arsura de gradul III: necroză', slide: C3(56), q: { 3: ['4:0'] }, eff: 1, on: at(3, 4),
      body: 'Gradul III: necroză. În desen, epidermul și dermul sunt distruse pe toată grosimea, cu vasele trombozate; se formează o escară. Cursul nu descrie tratamentul arsurilor (trimite la Semiologie chirurgicală, anul III).' },
    trt: { t: 'Principiile de tratament ale hipertermiei', slide: 'Termoreglarea (LP), slide 18', on: at(4),
      body: 'Scoaterea din mediul cald; scăderea temperaturii prin metode externe; hidratare enterală și parenterală; corectarea dezechilibrelor hidro-electrolitice; alcalinizarea urinii; tratamentul aritmiilor.' },
    x1: { t: 'Cuplarea excitație–contracție, pe scurt', ctx: ROS,
      body: 'Potențialul de acțiune intră în fibră pe tubii T; receptorii de dihidropiridină (DHPR) își schimbă forma și trag de receptorii de rianodină (RyR1) de pe cisternele reticulului sarcoplasmic, care se deschid. Ca²⁺ se leagă de troponina C, iar miozina trage actina. Pompele SERCA (galbene) aduc calciul înapoi în reticul și mușchiul se relaxează. În hipertermia malignă, un RyR1 mutant rămâne deschis în prezența agentului declanșator.' },
    x2: { t: 'Primele semne pe monitor', ctx: ROS,
      body: 'Pe monitorul de anestezie, unul dintre primele semne este creșterea CO₂ expirat (hipermetabolism), urmată de tahicardie, rigiditate (mai ales a maseterilor), acidoză și hiperpotasemie; temperatura crește adesea mai târziu. Valorile de temperatură de pe monitor sunt exemple.' },
    x3: { t: 'Convențiile desenului', ctx: 'desen schematic',
      body: 'Fibra musculară e desenată mult mărită și simplificată: un sarcomer, două triade, câteva molecule. Plăcile de jos sunt schematice. Cursorul trece toate cele patru tipuri prin aceleași trepte: normal, ușor, moderat, sever, tratament.' },
  };
  const HITS = [['trig', 'trig', 1], ['ryr', 'ryr', 2], ['ca', 'sr', 3], ['sarc', 'sarc', 4], ['mito', 'mito', 5], ['mon', 'mon', 6], ['crE', 'sweat', 7], ['crW', 'glass', 8], ['crB', 'blood', 9], ['cr', 'mus', 10], ['ins', 'sun', 11], ['insE', 'brain', 12], ['insM', 'men', 13], ['bu1', 'g1', 14], ['bu2', 'g2', 15], ['bu3', 'g3', 16]];
  const DEV = { trig: 'Moleculele din spațiul extracelular', ryr: 'Receptorii roșii de pe cisterne', ca: 'Cisternele reticulului sarcoplasmic și Ca²⁺', sarc: 'Sarcomerul (filamente, linii Z)', mito: 'Mitocondriile', mon: 'Monitorul de anestezie', crE: 'Sudoarea cu Na⁺ și Cl⁻', crW: 'Paharul cu apă', crB: 'Vasul de sânge', cr: 'Mușchiul gambei', ins: 'Soarele și razele pe cap', insE: 'Creierul', insM: 'Meningele', bu1: 'Ansele capilare dilatate', bu2: 'Flictena', bu3: 'Escara' };
  const hit = a => a.w != null ? `<rect class="hit" x="${(+a.x).toFixed(1)}" y="${(+a.y).toFixed(1)}" width="${(+a.w).toFixed(1)}" height="${(+a.h).toFixed(1)}" rx="8"/>` : `<circle class="hit" cx="${(+a.cx).toFixed(1)}" cy="${(+a.cy).toFixed(1)}" r="${a.r}"/>`;
  const badge = (n, [x, y]) => `<g class="bdg-s"><circle cx="${x}" cy="${y}" r="8.6"/><text x="${x}" y="${y + 3.6}" text-anchor="middle" data-ui>${n}</text></g>`;

  FX.def('hyper', {
    title: 'Tipurile de hipertermie',
    meta: 'Hipertermia malignă, mialgia termică, insolația și arsurile solare',
    qs: [3],
    kind: 'mix',
    note: 'Sus, hipertermia malignă la nivelul fibrei musculare: sarcolema, tubii T, cisternele reticulului sarcoplasmic (triadele), un sarcomer și două mitocondrii, mult mărite; în dreapta, un monitor de anestezie. Jos, trei plăci: mialgia termică (sudoarea, sângele, mușchiul gambei), insolația (capul din profil, craniul, meningele, creierul) și arsurile solare (pielea în secțiune). Cursorul trece toate tipurile prin aceleași trepte.',
    src: 'Termoreglarea (LP), slide 16–18; Cursul 3 (Termoreglarea), slide 44–56',
    neutral: 0,
    ctl: { type: 'range', label: 'Forma', min: 0, max: 4, step: 1, init: 3, fmt: v => ST[v], play: { ms: 2600, label: 'Redă treptele' }, peek: 'Compară cu normal' },
    initV: () => 3,
    hints: {
      predict: 'Alege o treaptă, bifează ce crezi că se vede, apoi apasă „Dezvăluie”.',
      explore: 'Mută cursorul. Apasă o moleculă, un receptor, un organ sau o leziune ori un rând de mai jos: vezi textul din LP și punctul din barem.',
    },
    predict: { kind: 'pick', prompt: (S, lab) => `${lab}: ce se vede?` },
    tour: [
      { v: 0, parts: ['enum', 'x3'], t: 'Patru tipuri de hipertermie',
        see: 'Sus, o fibră musculară: tubii T coboară din sarcolemă, de o parte și de alta stau cisternele reticulului sarcoplasmic, pline de Ca²⁺; dedesubt, un sarcomer. Jos: pielea, sângele și mușchiul gambei; capul din profil; pielea în secțiune.' },
      { v: 0, parts: ['ryr', 'x1'], t: 'Defectul din hipertermia malignă',
        see: 'Receptorii de rianodină (2) sunt canalele prin care reticulul sarcoplasmic eliberează Ca²⁺ la fiecare contracție. În hipertermia malignă sunt defecți genetic, dar fără agentul declanșator funcționează normal.' },
      { v: 1, parts: ['trig', 'ca'], t: 'Agentul declanșator',
        see: 'Anestezicul halogenat sau succinilcolina (1) deschid canalele defecte: Ca²⁺ iese masiv din cisterne (3) și nu mai e pompat înapoi.' },
      { v: 3, parts: ['sarc', 'mito', 'mon', 'x2'], t: 'Contractura și căldura',
        see: 'Sarcomerul (4) rămâne contractat: rigiditate. Mitocondriile (5) ard tot mai mult: căldură, consum de O₂. K⁺ iese din fibre. Pe monitor (6): temperatura până la 43°C, tahicardie, hipotensiune, hiperpotasemie, acidoză.' },
      { v: 2, parts: ['crE', 'crW', 'crB', 'cr'], t: 'Mialgia termică',
        see: 'Efortul în căldură scoate apă și săruri prin sudoare (7). Se bea doar apă (8): Na și Cl scad în plasmă, sângele se concentrează (9). Mușchiul intră în spasm (10).' },
      { v: 3, parts: ['ins', 'insE', 'insM'], t: 'Insolația',
        see: 'Razele soarelui cad direct pe cap și gât (11). Creierul se încălzește și apare edemul (12); în forma cea mai severă, meningita seroasă (13).' },
      { v: 2, parts: ['bu1', 'bu2', 'bu3'], t: 'Arsurile solare',
        see: 'Gradul I: eritem și edem (14). Gradul II: flictene (15). Gradul III: necroză (16). Mută cursorul pe „sever” ca să vezi gradul III.' },
      { v: 4, parts: ['dan', 'crT', 'insT', 'trt'], t: 'Tratamentul',
        see: 'Dantrolenul închide receptorii de rianodină și calciul revine în reticul. Mialgia termică: rehidratare cu săruri, repaus, răcoare. Insolația: umbră și termoliză.' },
    ],
    parts: P,
    games: {
      order: {
        prompt: 'Pune în ordine mecanismul hipertermiei maligne.',
        items: [
          { t: 'Defect genetic al receptorului pentru rianodină', parts: ['ryr'] },
          { t: 'Anestezic halogenat sau miorelaxant depolarizant', parts: ['trig'] },
          { t: 'Eliberare masivă de Ca²⁺ din reticulul sarcoplasmic', parts: ['ca'] },
          { t: 'Contracții necontrolate, rigiditate', parts: ['sarc'] },
          { t: 'Termogeneză excesivă: temperatura până la 43°C', parts: ['mito', 'mon'] },
        ],
      },
      sort: {
        prompt: 'La ce tip de hipertermie aparține fiecare?',
        bins: [{ id: 'm', t: 'Hipertermia malignă', short: 'Malignă', tone: 'heat' }, { id: 'c', t: 'Mialgia termică', short: 'Mialgia' }, { id: 'i', t: 'Insolația', short: 'Insolația' }, { id: 'b', t: 'Arsurile solare', short: 'Arsurile' }],
        items: [{ id: 'trig', bin: 'm' }, { id: 'ryr', bin: 'm' }, { id: 'dan', bin: 'm' }, { id: 'crW', bin: 'c' }, { id: 'crB', bin: 'c' }, { id: 'cr', bin: 'c' }, { id: 'insE', bin: 'i' }, { id: 'insM', bin: 'i' }, { id: 'bu2', bin: 'b' }, { id: 'bu3', bin: 'b' }],
      },
    },
    now(S) { return `<b data-ui>${ST[S.v]}</b>`; },
    stage(o, H, S) {
      const uid = 'fx' + FX.n, U = x => x.replaceAll('__U__', uid), L = A.L, hs = A.hits, bd = A.badges;
      let s = `<div class="hmx" data-st="${S.v}">`;
      s += `<svg class="iso-svg hm-svg an-svg" viewBox="0 0 ${A.W} ${A.H}" role="group" aria-label="Fibră musculară cu triadele și sarcomerul, monitor de anestezie, mialgia termică, insolația și arsurile solare">`;
      s += `<defs>${U(A.defs)}</defs>`;
      s += L.frames + U(L.panelA) + U(L.panelB) + U(L.panelC) + U(L.panelD);
      HITS.forEach(([id, hk, n]) => { s += H.spart(id, hit(hs[hk]) + badge(n, bd[hk])); });
      s += '</svg>';
      const cut = s.length;
      s += `<ul class="circ-rows fv-rows hm-rows" aria-label="Ce arată figura">${HITS.map(([id, , n]) => `<li><button type="button" class="fxp row" data-p="${id}"><span class="bdg" data-ui>${n}</span><span class="rt"><span class="rl">${H.lab('l' + id, P[id].t)}</span><span class="rd" data-ui>${DEV[id]}</span></span><span class="ar" aria-hidden="true"></span></button></li>`).join('')}</ul>`;
      s += `<div class="circ-sym"><span class="sl" data-ui>Din LP și curs</span>${['enum', 'dan', 'crT', 'insT', 'trt'].map(id => `<button type="button" class="fxp sym" data-p="${id}">${P[id].t}</button>`).join('')}${['x1', 'x2', 'x3'].map(id => `<button type="button" class="fxp sym ctxs" data-p="${id}">${P[id].t}</button>`).join('')}</div></div>`;
      return { view: s.slice(0, cut) + '</div>', legend: '<div class="hmx hm-leg circ" data-st="' + S.v + '">' + s.slice(cut) };
    },
    update(el, S) {
      const v = Math.max(0, Math.min(4, Math.round(S.vv)));
      el.querySelectorAll('.hmx').forEach(r => { r.dataset.st = v; });
      el.querySelectorAll('.hm-rows .row').forEach(b => { const on = FX.isOn(P[b.dataset.p], { v }); b.dataset.ch = on ? 1 : 0; b.querySelector('.ar').textContent = on ? '●' : '·'; });
      el.querySelectorAll('.hm-leg .sym').forEach(b => b.classList.toggle('lit', FX.isOn(P[b.dataset.p], { v })));
    },
    panel(S, H) {
      const li = (ids, cls) => ids.filter(id => FX.isOn(P[id], S)).map(id => `<li>${H.node(id, cls)}</li>`).join('') || '<li class="fx-gap">Nimic deosebit la această treaptă.</li>';
      if (S.v === 0) return `<section class="fx-grp"><h4><span data-ui>${ST[0]}</span><small>${LP}</small></h4><ol class="fx-chain"><li>${H.node('enum')}</li><li>${H.node('ryr')}</li></ol></section>`;
      return `<section class="fx-grp"><h4><span data-ui>Hipertermia malignă</span><small>${C3('53–54')}</small></h4><ol class="fx-chain">${li(['ryr', 'trig', 'ca', 'sarc', 'mito', 'mon', 'dan'], 'heat')}</ol></section>`
        + `<section class="fx-grp"><h4><span data-ui>Mialgia termică</span><small>${C3(47)}</small></h4><ol class="fx-chain">${li(['crE', 'crW', 'crB', 'cr', 'crT'], 'heat')}</ol></section>`
        + `<section class="fx-grp"><h4><span data-ui>Insolația</span><small>${C3(55)}</small></h4><ol class="fx-chain">${li(['ins', 'insE', 'insM', 'insT'], 'heat')}</ol></section>`
        + `<section class="fx-grp"><h4><span data-ui>Arsurile solare</span><small>${C3(56)}</small></h4><ol class="fx-chain">${li(['bu1', 'bu2', 'bu3'], 'heat')}</ol></section>`
        + (S.v === 4 ? `<section class="fx-grp"><h4><span data-ui>Principiile tratamentului</span><small>Termoreglarea (LP), slide 18</small></h4><ol class="fx-chain"><li>${H.node('trt')}</li></ol></section>` : '');
    },
  });
})();
