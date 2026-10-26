/* ===== Î27 (și Î22): răspunsul inflamator acut — venula postcapilară și recrutarea leucocitelor =====
   Desenul vine din art/inflam.mjs (ART.inflam). Variabila: etapa, de la normal la fagocitoză și drenaj (0–6).
   Textele vin din Cursul 2 (Inflamația) și din LP; numărul de diapozitiv e trecut la fiecare piesă. */
(function () {
  const A = ART.inflam;
  const ST = ['Normal', 'Mastocitul degranulează: vasodilatație', 'Permeabilitate crescută: exsudat', 'Marginație și rulare', 'Activare și aderare fermă', 'Transmigrare și chemotaxie', 'Fagocitoză și drenaj limfatic'];
  const from = n => S => S.v >= n;
  const P = {
    def: { t: 'Inflamația: apărare la locul agresiunii', slide: 'Cursul 2, slide 2–4', q: { 27: ['0:0', '0:1', '0:2'] },
      body: 'Reacție de apărare a organismului, ca rezultat al acțiunii unor factori externi sau interni care produc leziuni celulare sau tisulare; are rolul de a stopa sau a limita efectele agentului cauzal și de a iniția repararea. Mecanismele principale ale inflamației acute: extravazarea de fluid și de proteine plasmatice în țesuturile perivasculare și migrarea leucocitelor (mai ales neutrofilele, PMN) din vase în țesuturi – diapedeza.' },
    cel: { t: 'Semnele celsiene: rubor, tumor, calor, dolor, functio laesa', slide: 'Cursul 2, slide 8', q: { 27: ['1:0'], 22: ['0:0'] }, on: from(1),
      body: 'Celsus: RUBOR – roșeață, eritem; TUMOR – umflătură, edem; CALOR – temperatură locală crescută, hiperemie; DOLOR – durere. Virchow: FUNCTIO LAESA – afectarea funcțională. Semnele caracterizează inflamația acută.' },
    mast: { t: 'Mastocitul degranulează: histamină', slide: 'Cursul 2, slide 44–45', q: { 27: ['2:2'], 22: ['2:0', '2:1'] }, on: from(1),
      body: 'Mastocitele sunt localizate în țesuturile conjunctive moi, în apropierea vaselor de sânge. Conțin granule cu substanțe vasoactive: histamină, proteaze, proteoglicani, factori chemotactici, citokine (TNF-α, IL-4). Se degranulează sub acțiunea a numeroși factori exogeni sau endogeni.' },
    vd: { t: 'Vasodilatație locală, hiperemie, stază', slide: 'Cursul 2, slide 11', q: { 27: ['2:0'], 22: ['2:4'] }, on: from(1),
      body: 'Vasodilatație locală: hiperemie arterială, deschiderea capilarelor, stază venoasă. Perilezional se observă o vasoconstricție arteriolară, similară cu cea din primele faze ale hemostazei primare.' },
    perm: { t: 'Permeabilitate crescută: exsudat, edem', slide: 'Cursul 2, slide 12, 21–22', q: { 27: ['2:1', '2:3'], 22: ['2:6'] }, on: from(2),
      body: 'Plasma părăsește capilarele; proteinele plasmatice și apa ajung în interstițiu – edem interstițial; hematiile rămân în vase – hemoconcentrație locală și creșterea vâscozității. Pierderea proteinelor din vase modifică echilibrul Starling. Exsudatul are proteine > 3 g/dl (transudatul < 3 g/dl).' },
    s1: { t: 'Marginația', slide: 'Cursul 2, slide 16', q: { 22: ['2:5'] }, on: from(3),
      body: 'În mod normal hematiile sunt în coloana axială centrală, iar leucocitele sunt împinse spre perete, dar fluxul le împiedică să se atașeze. Când fluxul încetinește (stază), mai multe leucocite iau o poziție periferică de-a lungul endoteliului: marginația.' },
    s2: { t: 'Rularea pe selectine', slide: 'Cursul 2, slide 15, 17–18', q: { 22: ['2:5'] }, on: from(3),
      body: 'Endoteliul activat de citokine exprimă molecule de adeziune de care leucocitele se atașează slab; ele se leagă și se desprind și se rostogolesc pe suprafața endotelială: rularea. Selectinele: E-selectina (endoteliu), P-selectina (trombocite și endoteliu), L-selectina (pe microvilozitățile leucocitelor).' },
    s3: { t: 'Activarea: chemokinele deschid integrinele', slide: 'Cursul 2, slide 19', q: { 27: ['2:4'] }, on: from(4),
      body: 'Integrinele sunt exprimate pe leucocite într-o formă cu afinitate scăzută până când leucocitele sunt activate de chemokine. Chemokinele, prezente pe suprafața endotelială, activează leucocitele; integrinele își schimbă conformația spre o formă cu afinitate ridicată.' },
    s4: { t: 'Aderarea fermă (integrine – ICAM-1)', slide: 'Cursul 2, slide 15, 20', on: from(4),
      body: 'Leucocitele se opresc din rostogolire, iar angajarea integrinelor de către liganzii lor (pe endoteliu, ICAM-1) transmite semnale care modifică citoscheletul și le atașează ferm de endoteliu: aderarea strânsă.' },
    s5: { t: 'Transmigrarea (diapedeza)', slide: 'Cursul 2, slide 13, 20', q: { 27: ['2:3'], 22: ['2:6'] }, on: from(5),
      body: 'Leucocitele migrează prin peretele vasului, mai ales la nivelul joncțiunilor intercelulare, emițând pseudopode: transmigrarea, care are loc în principal în venulele postcapilare. Joncțiunile se desfac sub acțiunea mediatorilor: histamină, bradikinină, prostaglandine, leucotriene.' },
    s6: { t: 'Chemotaxia spre bacterii', slide: 'Cursul 2, slide 48', q: { 27: ['2:4'] }, on: from(5),
      body: 'Macrofagele și granulocitele migrează spre locul ocupat de bacterii, atrase de o substanță chimică, cu o viteză de 0,7–1 µm/min. Factori chemotactici: chemokinele, C5a, fibrinopeptidele.' },
    s7: { t: 'Fagocitoza: fagozom, enzime, specii reactive de oxigen', slide: 'Cursul 2, slide 46–51', q: { 27: ['2:5'] }, on: from(6),
      body: 'Etapele fagocitozei: opsonizarea, chemotactismul, contactul, aderența, faza reologică (pseudopodele înconjoară bacteria și formează fagozomul, care fuzionează cu un lizozom). Se formează H2O2 și substanțe antibacteriene.' },
    mac: { t: 'Macrofagul rezident: citokine care activează endoteliul', slide: 'Cursul 2, slide 17, 57, 59', on: from(3),
      body: 'Celulele endoteliale activate de citokine și alți mediatori produși local exprimă molecule de adeziune. IL-1 și TNF-α, produse de macrofage, stimulează fagocitele și au efecte proinflamatorii.' },
    ly: { t: 'Drenajul limfatic spre limfonoduli', slide: 'Cursul 2, slide 21', q: { 27: ['2:6', '2:7'] }, on: from(6),
      body: 'Răspunsul vascular oprește răspândirea microorganismelor. Dacă drenajul limfatic funcționează, o parte din lichid e reabsorbit pe cale limfatică; microorganismele sunt preluate de fluxul limfatic și ajung în limfonoduli, unde pot fi procesate de sistemul imunitar.' },
    x1: { t: 'Scara desenului', ctx: 'Mescher AL. Junqueira’s Basic Histology, 16th ed., McGraw-Hill 2021 (dimensiunile hematiei, neutrofilului și venulei postcapilare)',
      body: 'Celulele sunt aproximativ la scară: hematia are ~7,5 µm, neutrofilul ~12 µm, iar lumenul venulei ~30 µm. Moleculele de adeziune (selectine, integrine, ICAM-1), chemokinele și bacteriile sunt desenate mult mai mari decât sunt, ca să se vadă.' },
  };
  const ROWS = [['vd', 1, 'Lumenul: hematii mai multe, flux încetinit'], ['mast', 2, 'Mastocitul perivascular și granulele lui'], ['perm', 3, 'Joncțiunile deschise, proteinele în interstițiu'], ['s1', 4, 'Neutrofil lângă perete'], ['s2', 5, 'Microvilozități pe selectinele roz'], ['s3', 6, 'Chemokinele verzi, integrinele albastre'], ['s4', 7, 'Neutrofil turtit, lipit de ICAM-1 (portocaliu)'], ['s5', 8, 'Neutrofil în clepsidră, prin perete'], ['s6', 9, 'Neutrofil ameboid spre bacterii'], ['s7', 10, 'Neutrofil cu bacterie înghițită și ROS'], ['mac', 11, 'Macrofagul din interstițiu'], ['ly', 12, 'Capilarul limfatic, cu capăt orb']];
  const hit = a => a.w != null ? `<rect class="hit" x="${(+a.x).toFixed(1)}" y="${(+a.y).toFixed(1)}" width="${(+a.w).toFixed(1)}" height="${(+a.h).toFixed(1)}" rx="8"/>` : `<circle class="hit" cx="${(+a.cx).toFixed(1)}" cy="${(+a.cy).toFixed(1)}" r="${a.r}"/>`;
  const badge = (n, [x, y]) => `<g class="bdg-s"><circle cx="${x}" cy="${y}" r="8.6"/><text x="${x}" y="${y + 3.6}" text-anchor="middle" data-ui>${n}</text></g>`;

  FX.def('inflam', {
    title: 'Inflamația acută: vasul și leucocitele',
    meta: 'Inflamația acută: răspunsul vascular și recrutarea leucocitelor',
    qs: [27, 22],
    kind: 'mix',
    note: 'O venulă postcapilară tăiată pe lung, cu interstițiul de sub ea. Celulele sunt aproximativ la scară (hematie ~7,5 µm, neutrofil ~12 µm, lumen ~30 µm); moleculele de adeziune, chemokinele și bacteriile sunt mărite. Sângele curge de la stânga la dreapta. Neutrofilele sunt așezate pe stații de-a lungul peretelui de jos, ca să se vadă toți pașii deodată: în realitate aceeași celulă trece prin ei, unul după altul. Endoteliul are nucleii turtiți, membrana bazală și pericite; în interstițiu sunt fibre de colagen, fibroblaste, un mastocit lângă vas, un macrofag, bacterii și un capilar limfatic cu capăt orb.',
    src: 'Cursul 2 (Inflamația), slide 2–21, 44–51; Sindromul inflamator în context infecțios (LP)',
    neutral: 0,
    ctl: { type: 'range', label: 'Etapa', min: 0, max: 6, step: 1, init: 6, fmt: v => ST[v], play: { ms: 2200, label: 'Redă inflamația' }, peek: 'Compară cu normal' },
    initV: () => 6,
    hints: {
      predict: 'Alege o etapă, bifează ce se vede deja în ea, apoi apasă „Dezvăluie”.',
      explore: 'Mută etapa. Apasă o celulă sau o piesă din desen ori un rând de mai jos: vezi textul din curs și punctul din barem.',
    },
    predict: { kind: 'pick', prompt: (S, lab) => `Etapa: ${lab}. Ce s-a întâmplat deja?` },
    tour: [
      { v: 0, hl: [], parts: ['def', 'x1'], t: 'O venulă și țesutul din jur',
        see: 'Sus, o venulă postcapilară tăiată pe lung: endoteliul subțire, cu nucleii turtiți, și hematiile din curentul axial. Jos, interstițiul: colagen, fibroblaste, un mastocit lângă vas (2), un macrofag (11), bacterii care au pătruns (dreapta jos) și un capilar limfatic (12).' },
      { v: 1, hl: ['mast', 'vd'], parts: ['mast', 'vd'], t: 'Răspunsul vascular: vasodilatația',
        see: 'Mastocitul (2) eliberează granulele cu histamină spre vas. Vasul se dilată: vin mai multe hematii (1), fluxul încetinește (stază). De aici roșeața și căldura locală.' },
      { v: 2, hl: ['perm'], parts: ['perm', 'cel'], t: 'Permeabilitate crescută: exsudatul',
        see: 'Joncțiunile dintre celulele endoteliale se desfac (3): plasma cu proteine trece în interstițiu (punctele albastre) și apare edemul (tumefacția). Hematiile rămân în vas: hemoconcentrație locală.' },
      { v: 3, hl: ['s1', 's2', 'mac'], parts: ['s1', 's2', 'mac'], t: 'Marginația și rularea',
        see: 'Citokinele macrofagului (11) activează endoteliul, care exprimă selectine (roz). Fluxul încetinit împinge neutrofilele spre perete (4); microvilozitățile lor se leagă și se desprind de selectine, iar celula se rostogolește (5).' },
      { v: 4, hl: ['s3', 's4'], parts: ['s3', 's4'], t: 'Activarea și aderarea fermă',
        see: 'Chemokinele de pe endoteliu (puncte verzi) activează neutrofilul (6): integrinele lui (albastru) trec din forma îndoită în cea întinsă, cu afinitate mare. Se leagă de ICAM-1 (portocaliu): celula se oprește și se turtește pe perete (7).' },
      { v: 5, hl: ['s5', 's6'], parts: ['s5', 's6'], t: 'Transmigrarea și chemotaxia',
        see: 'Neutrofilul se strecoară printre două celule endoteliale, la nivelul joncțiunii (8), apoi merge prin interstițiu spre bacterii (9), urmând gradientul de factori chemotactici (cercurile verzi).' },
      { v: 6, hl: ['s7', 'ly'], parts: ['s7', 'ly'], t: 'Fagocitoza și drenajul limfatic',
        see: 'Neutrofilul înglobează o bacterie într-un fagozom și eliberează specii reactive de oxigen (10). Lichidul de edem și unele bacterii intră în capilarul limfatic (12) și ajung la limfonodulii regionali: acolo începe răspunsul imun specific.' },
    ],
    parts: P,
    games: {
      order: {
        prompt: 'Pune în ordine pașii recrutării leucocitelor (Cursul 2, slide 15–20).',
        items: [
          { t: 'Marginația: neutrofilele ajung lângă perete', parts: ['s1'] },
          { t: 'Rularea pe selectine', parts: ['s2'] },
          { t: 'Activarea de către chemokine: integrinele trec în forma cu afinitate mare', parts: ['s3'] },
          { t: 'Aderarea fermă: integrine – ICAM-1', parts: ['s4'] },
          { t: 'Transmigrarea (diapedeza) prin joncțiuni', parts: ['s5'] },
          { t: 'Chemotaxia spre bacterii', parts: ['s6'] },
          { t: 'Fagocitoza', parts: ['s7'] },
        ],
      },
      sort: {
        prompt: 'Așază fiecare fenomen în răspunsul căruia îi aparține.',
        bins: [{ id: 'v', t: 'Răspunsul vascular', sub: 'Cursul 2, slide 11–13', short: 'Vascular' }, { id: 'c', t: 'Răspunsul celular', sub: 'Cursul 2, slide 15–20, 46', short: 'Celular', tone: 'heat' }],
        items: [{ id: 'vd', bin: 'v' }, { id: 'perm', bin: 'v' }, { id: 'mast', bin: 'v' }, { id: 's1', bin: 'c' }, { id: 's2', bin: 'c' }, { id: 's3', bin: 'c' }, { id: 's4', bin: 'c' }, { id: 's5', bin: 'c' }, { id: 's6', bin: 'c' }, { id: 's7', bin: 'c' }],
      },
    },
    now(S) { return `<b data-ui>${ST[S.v]}</b>`; },
    stage(o, H, S) {
      const uid = 'fx' + FX.n, U = x => x.replaceAll('__U__', uid), L = A.L;
      let s = `<div class="infl" data-st="${S.v}">`;
      s += `<svg class="iso-svg inf-svg an-svg" viewBox="0 0 ${A.W} ${A.H}" role="group" aria-label="Venulă postcapilară cu neutrofile în etapele recrutării și interstițiul cu mastocit, macrofag, bacterii și capilar limfatic">`;
      s += `<defs>${U(A.defs)}</defs>`;
      s += L.tissue + `<g class="if-grad">${L.grad}</g>` + `<g class="if-ly">${L.lymph}</g>` + U(L.mast) + `<g class="if-hist">${L.hist}</g>` + L.mac + L.bact + `<g class="if-exu">${L.exu}</g>`;
      s += L.lumen + `<g class="if-rbcx">${L.rbcX}</g>` + L.rbc + A.flow.map((d, i) => `<path class="if-flow f${i}" d="${d}"/>`).join('') + L.walls + `<g class="if-gaps">${L.gaps}</g>`;
      s += `<g class="if-sel">${L.selectins}</g><g class="if-icam">${L.icam}</g><g class="if-chk">${L.chemok}</g>`;
      s += ['n1', 'n2', 'n3', 'n4'].map((k, i) => `<g class="if-n s${i + 1}">${U(L[k])}</g>`).join('') + `<g class="if-itg">${L.integrins}</g>` + ['n5', 'n6', 'n7'].map((k, i) => `<g class="if-n s${i + 5}">${U(L[k])}</g>`).join('') + `<g class="if-n s7">${L.engulfed}${L.ros}</g>`;
      const hs = A.hits, bd = A.badges;
      ['vd', 'mast', 'perm', 's1', 's2', 's3', 's4', 's5', 's6', 's7', 'mac', 'ly'].forEach((id, i) => { const hk = id === 'ly' ? 'lymph' : id; s += H.spart(id, hit(hs[hk]) + badge(i + 1, bd[hk])); });
      s += '</svg>';
      const cut = s.length;
      s += `<ul class="circ-rows fv-rows if-rows" aria-label="Etapele inflamației">${ROWS.map(([id, b, dev]) => `<li><button type="button" class="fxp row" data-p="${id}"><span class="bdg" data-ui>${b}</span><span class="rt"><span class="rl">${H.lab('l' + id, P[id].t)}</span><span class="rd" data-ui>${dev}</span></span><span class="ar" aria-hidden="true"></span></button></li>`).join('')}</ul>`;
      s += `<div class="circ-sym"><span class="sl" data-ui>Din curs</span>${['def', 'cel'].map(id => `<button type="button" class="fxp sym" data-p="${id}">${P[id].t}</button>`).join('')}<button type="button" class="fxp sym ctxs" data-p="x1">${P.x1.t}</button></div></div>`;
      return { view: s.slice(0, cut) + '</div>', legend: '<div class="infl if-leg circ">' + s.slice(cut) };
    },
    update(el, S) {
      const root = el.querySelector('.infl'); if (!root) return;
      const v = Math.max(0, Math.min(6, Math.round(S.vv)));
      root.dataset.st = v;
      el.querySelectorAll('.if-rows .row').forEach(b => { const on = FX.isOn(P[b.dataset.p], { v }); b.dataset.ch = on ? 1 : 0; b.querySelector('.ar').textContent = on ? '●' : '·'; });
      el.querySelectorAll('.if-leg .sym').forEach(b => b.classList.toggle('lit', FX.isOn(P[b.dataset.p], { v })));
    },
    panel(S, H) {
      const ids = ['mast', 'vd', 'perm', 's1', 's2', 's3', 's4', 's5', 's6', 's7', 'ly'].filter(id => FX.isOn(P[id], S));
      return `<section class="fx-grp"><h4><span data-ui>${ST[S.v]}</span><small>Cursul 2</small></h4><ol class="fx-chain">${ids.length ? ids.map(id => `<li>${H.node(id, 'heat')}</li>`).join('') : '<li class="fx-gap">Vas normal: leucocitele circulă în fluxul sanguin.</li>'}</ol></section>`;
    },
  });
})();
