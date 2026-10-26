/* ===== Î21: cauzele inflamației =====
   Desenul vine din art/inflcause.mjs (ART.inflcause). Variabila: cauza (0 țesut normal, 1–2 exogene, 3–5 endogene).
   Textele cu diapozitiv vin din LP (Sindromul inflamator, slide 2–3) și din Cursul 2 (Inflamația); restul sunt explicații suplimentare, cu sursa. */
(function () {
  const A = ART.inflcause;
  const ST = ['Țesutul normal', 'Microorganisme', 'Corpi străini', 'Distrucție tisulară', 'Celule tumorale', 'Cristale'];
  const at = (...v) => S => v.includes(S.v);
  const any = S => S.v > 0;
  const LP = 'Sindromul inflamator (LP), slide 2–3';
  const C2 = n => 'Cursul 2 (Inflamația), slide ' + n;
  const P = {
    def: { t: 'Inflamația: reacție de apărare', slide: LP, q: { 21: ['0:0', '0:1'] },
      body: 'Inflamația este reacția de apărare a organismului și a țesuturilor sale la stimuli exogeni sau endogeni care pot provoca leziuni. Cursul 2 adaugă: e o reacție nespecifică, care urmează același tipar indiferent de agentul cauzal. În desen, cursorul schimbă cauza; reacția țesutului (vasele, edemul, leucocitele, mastocitul, macrofagul) rămâne aceeași.' },
    mic: { t: 'Microorganismele', slide: LP, q: { 21: ['1:0'] }, eff: 1, on: at(1),
      body: 'Cauze exogene: fungi, bacterii, virusuri, paraziți. În desen: bastonașe și coci în lanț în conjunctiv, hife septate cu levuri care pătrund din suprafață, un keratinocit infectat cu virioni (verzi) și o larvă de nematod (schematică).' },
    sys: { t: 'Reacția: întâi localizată, apoi sistemică', slide: LP, q: { 21: ['1:1'] }, eff: 1, on: at(1),
      body: 'Microorganismele declanșează o reacție inițial localizată, apoi, prin depășirea mecanismelor locale de apărare, o reacție generalizată (sistemică). În desen, câteva bacterii au ajuns în venulă: de aici pot fi duse în tot organismul.' },
    fb: { t: 'Corpii străini', slide: LP, q: { 21: ['1:2', '1:3'] }, eff: 1, on: at(2),
      body: 'Proteine străine (polen, particule vegetale sau animale), cristale de azbest și siliciu, pulberi, iritanți inhalatori. În desen: granule de polen pe suprafață, care își eliberează proteinele (puncte galbene) în epiteliu; fibre de azbest și un corp azbestozic (fibra acoperită cu proteine și fier, în „mătănii”); particule de siliciu; macrofagul încărcat cu pulberi.' },
    dt: { t: 'Produșii distrucției tisulare', slide: LP, q: { 21: ['2:0', '2:1'] }, eff: 1, on: at(3),
      body: 'Cauze endogene: produșii rezultați din distrucția tisulară prin lezare mecanică, chimică sau prin factori fizici (temperatură crescută, radiații UV, raze X, radioactivitate). În desen: o plagă cu hematii ieșite din vase, o arsură chimică, căldura, UV, razele X; în conjunctiv, celule necrotice (nucleu picnotic, fragmentat sau dizolvat) care eliberează conținutul lor (punctele verzi).' },
    tu: { t: 'Celulele tumorale', slide: LP, q: { 21: ['2:2'] }, eff: 1, on: at(4),
      body: 'Celulele tumorale sunt o cauză endogenă de inflamație. În desen, un cuib de celule atipice (nuclei mari, hipercromi, o mitoză) rupe membrana bazală și invadează conjunctivul; în jur, limfocite.' },
    cr: { t: 'Cristalele precipitate', slide: LP, q: { 21: ['2:3'] }, eff: 1, on: at(5),
      body: 'Cristale precipitate în organism: acid uric, oxalat de calciu, fosfat de calciu, colesterol; induc inflamație localizată sau generalizată. În desen: un tofus (material amorf cu ace de urat) cu o celulă gigantă multinucleată, plăci de colesterol cu un colț crestat, cristale de oxalat de calciu în formă de plic, granule de fosfat de calciu.' },
    vasc: { t: 'Vasele: vasodilatație, permeabilitate, edem', slide: C2('2, 11–12'), eff: 1, on: any,
      body: 'Oricare ar fi cauza, reacția urmează același tipar. Vasodilatație locală: hiperemie, deschiderea capilarelor, stază. Crește permeabilitatea capilară: apa și proteinele plasmatice trec în interstițiu (edem), hematiile rămân în vas. În desen, mai multe hematii în venulă, joncțiuni deschise între celulele endoteliale, lichid (puncte albastre) în conjunctiv.' },
    neu: { t: 'Neutrofilele ies din vas spre cauză', slide: C2('4, 13'), eff: 1, on: any,
      body: 'Leucocitele, mai ales neutrofilele, aderă de peretele vascular și îl traversează prin pseudopode (diapedeza), printre celulele endoteliale depărtate de mediatori (histamină, bradikinină, prostaglandine, leucotriene). În desen, un neutrofil aderent, unul care trece prin perete și două care urcă spre cauză.' },
    mast: { t: 'Mastocitul se degranulează', slide: C2('44–45'), eff: 1, on: any,
      body: 'Mastocitele stau în țesutul conjunctiv, lângă vase. Au granule cu substanțe vasoactive (histamină, proteaze, factori chemotactici, TNF-α, IL-4) și se degranulează sub acțiunea multor factori exogeni sau endogeni. În desen, în țesutul normal granulele sunt în celulă; în reacție, ies în jur.' },
    mac: { t: 'Macrofagul rezident: fagocitoza', slide: C2('42, 46'),
      body: 'Macrofagele recunosc direct microorganismele prin receptori (PRR, de exemplu Toll-like) și înglobează particule și resturi celulare în fagozomi. În desen, macrofagul din conjunctiv; după cauză, conține pulberi și siliciu sau un ac de urat.' },
    lim: { t: 'Scopul: limitează leziunea', slide: LP + '; ' + C2(34), q: { 21: ['0:2'] }, eff: 1, on: any,
      body: 'Scopul inflamației: să limiteze și să repare leziunile produse. Rețeaua de fibrină funcționează ca o capcană pentru microorganisme și corpi străini și împiedică extinderea infecției (Cursul 2). În desen, cauza (gri) înconjurată de fibrină (galben) și de neutrofile.' },
    elim: { t: 'Scopul: elimină cauza', slide: LP + '; ' + C2('5, 46'), q: { 21: ['0:3'] }, eff: 1, on: any,
      body: 'Inflamația elimină cauza care a dus la apariția ei. Dacă inflamația acută reușește să elimine cauza, fenomenele dispar și organismul se vindecă; dacă persistă, se cronicizează. În desen, un macrofag care a înglobat o bacterie într-un fagozom.' },
    rep: { t: 'Scopul: repară țesutul', slide: LP + '; ' + C2('2, 34'), q: { 21: ['0:2'] }, eff: 1, on: any,
      body: 'Inflamația inițiază repararea și refacerea tisulară; fibrina oferă suportul necesar reparării și vindecării rănilor. În desen, un fibroblast care depune colagen nou și un capilar nou care înmugurește.' },
    x1: { t: 'Exemple clinice', ctx: 'Kumar V, Abbas AK, Aster JC. Robbins Basic Pathology, 10th ed., Elsevier 2018, cap. 3 (Inflammation and Repair)',
      body: 'Cristalele de urat de sodiu: guta (artrita acută, tofii). Siliciul și azbestul: silicoza și azbestoza (fibroză pulmonară), azbestul și mezoteliomul. Colesterolul: placa de aterom (inflamație cronică în peretele arterial). Polenul: rinita alergică. Corpii străini care nu pot fi înglobați (fire de sutură, așchii) dau granuloame de corp străin, cu celule gigante.' },
    x2: { t: 'Cum „simte” țesutul cauza', ctx: 'Kumar V et al., Robbins Basic Pathology, 10th ed., 2018, cap. 3; Martinon F et al. Gout-associated uric acid crystals activate the NALP3 inflammasome. Nature 2006;440:237–241',
      body: 'Microorganismele poartă tipare moleculare (PAMP: lipopolizaharid, peptidoglican, ARN viral), recunoscute de receptorii Toll-like. Celulele necrotice eliberează molecule care în mod normal stau în interior (DAMP: ATP, acid uric, ADN). Cristalele de urat și de colesterol, siliciul și azbestul, înglobate de macrofage, activează inflamazomul, care produce IL-1β. Așa ajung cauze atât de diferite la aceeași reacție.' },
    x3: { t: 'Scara desenului', ctx: 'desen schematic',
      body: 'Secțiunea e schematică: epiteliul, celulele și vasul nu sunt la scară, iar agenții cauzali (bacterii, virioni, polen, cristale) sunt măriți diferit, ca să se vadă. Celulele tumorale și cristalele nu apar de obicei în același țesut cu polenul sau cu hifele: țesutul e același doar ca să se vadă că reacția e aceeași.' },
  };
  // [part, hit, badge, unde se vede]
  const HITS = [
    ['mic', 'cause', 1, 'o1'], ['fb', 'cause', 1, 'o2'], ['dt', 'cause', 1, 'o3'], ['tu', 'cause', 1, 'o4'], ['cr', 'cause', 1, 'o5'],
    ['sys', 'sys', 2, 'o1'], ['vasc', 'ves', 3, 'on'], ['neu', 'neu', 4, 'on'], ['mac', 'mac', 5, 'oall'], ['mast', 'mast', 6, 'oall'],
    ['lim', 'lim', 7, 'oall'], ['elim', 'elim', 8, 'oall'], ['rep', 'rep', 9, 'oall'],
  ];
  const TILES = [['mic', 't1'], ['fb', 't2'], ['dt', 't3'], ['tu', 't4'], ['cr', 't5']];
  const DEV = { mic: 'Bacterii, hife, virioni, larvă', fb: 'Polen, azbest, siliciu, pulberi', dt: 'Plaga, arsura, razele, celulele necrotice', tu: 'Cuibul de celule atipice', cr: 'Tofusul, plăcile, plicurile', sys: 'Bacteriile din venulă', vasc: 'Venula și lichidul din conjunctiv', neu: 'Neutrofilele de lângă venulă', mac: 'Macrofagul', mast: 'Mastocitul', lim: 'Vinieta din stânga, jos', elim: 'Vinieta din mijloc, jos', rep: 'Vinieta din dreapta, jos' };
  const hit = a => a.w != null ? `<rect class="hit" x="${(+a.x).toFixed(1)}" y="${(+a.y).toFixed(1)}" width="${(+a.w).toFixed(1)}" height="${(+a.h).toFixed(1)}" rx="8"/>` : `<circle class="hit" cx="${(+a.cx).toFixed(1)}" cy="${(+a.cy).toFixed(1)}" r="${a.r}"/>`;
  const badge = (n, [x, y]) => `<g class="bdg-s"><circle cx="${x}" cy="${y}" r="8.6"/><text x="${x}" y="${y + 3.6}" text-anchor="middle" data-ui>${n}</text></g>`;

  FX.def('inflcause', {
    title: 'Cauzele inflamației: aceeași reacție, oricare ar fi cauza',
    meta: 'Inflamația: definiție, scop, cauze exogene și endogene',
    qs: [21],
    kind: 'mix',
    note: 'Sus, o secțiune prin piele sau mucoasă: epiteliul, membrana bazală, conjunctivul cu fibroblaste, un macrofag, un mastocit și o venulă. Cursorul schimbă cauza (exogenă sau endogenă); reacția țesutului rămâne aceeași. Jos, clasificarea cauzelor din LP și scopul inflamației.',
    src: 'Sindromul inflamator (LP), slide 2–3; Cursul 2 (Inflamația), slide 2–5, 11–13, 34, 42–46',
    neutral: 0,
    ctl: { type: 'range', label: 'Cauza', min: 0, max: 5, step: 1, init: 1, fmt: v => ST[v], play: { ms: 2800, label: 'Redă cauzele' }, peek: 'Compară cu țesutul normal' },
    initV: () => 1,
    hints: {
      predict: 'Alege o cauză, bifează ce crezi că se vede, apoi apasă „Dezvăluie”.',
      explore: 'Mută cursorul. Apasă cauza, venula, o celulă, o casetă de jos sau un rând de mai jos: vezi textul din LP și punctul din barem.',
    },
    predict: { kind: 'pick', prompt: (S, lab) => `${lab}: ce se vede?` },
    tour: [
      { v: 0, parts: ['def', 'x3'], t: 'Țesutul înainte de agresiune',
        see: 'Epiteliul, membrana bazală, conjunctivul cu fibre de colagen și fibroblaste; macrofagul (5) și mastocitul (6) stau de pază lângă venulă.' },
      { v: 1, parts: ['mic', 'sys'], t: 'Cauze exogene: microorganismele',
        see: 'Bacterii, coci în lanț, hife de fungi, un keratinocit infectat viral, o larvă (1). Unele bacterii ajung în venulă (2): reacția locală poate deveni sistemică.' },
      { v: 1, parts: ['vasc', 'neu', 'mast', 'mac'], t: 'Reacția: aceeași pentru orice cauză',
        see: 'Venula se dilată și devine permeabilă: edem (3). Neutrofilele ies din vas spre cauză (4). Mastocitul își eliberează granulele (6), macrofagul fagocitează (5).' },
      { v: 2, parts: ['fb'], t: 'Cauze exogene: corpii străini',
        see: 'Polen pe suprafață, fibre de azbest și un corp azbestozic, particule de siliciu, macrofagul cu pulberi (1).' },
      { v: 3, parts: ['dt', 'x2'], t: 'Cauze endogene: distrucția tisulară',
        see: 'Plaga (mecanic), arsura (chimic), căldura, UV, razele X (fizic); celulele necrotice își varsă conținutul (1).' },
      { v: 4, parts: ['tu'], t: 'Cauze endogene: celulele tumorale',
        see: 'Celule atipice care rup membrana bazală, cu limfocite în jur (1).' },
      { v: 5, parts: ['cr', 'x1'], t: 'Cauze endogene: cristalele',
        see: 'Ace de urat într-un tofus, cu o celulă gigantă; colesterol, oxalat de calciu, fosfat de calciu (1).' },
      { v: 5, parts: ['lim', 'elim', 'rep'], t: 'Scopul inflamației',
        see: 'Limitează leziunea (7), elimină cauza (8), repară țesutul (9).' },
    ],
    parts: P,
    games: {
      sort: {
        prompt: 'Așază fiecare cauză în grupa ei (LP, slide 2–3).',
        bins: [{ id: 'x', t: 'Cauze exogene', short: 'Exogene', tone: 'heat' }, { id: 'n', t: 'Cauze endogene', short: 'Endogene' }],
        items: [{ id: 'mic', bin: 'x' }, { id: 'fb', bin: 'x' }, { id: 'dt', bin: 'n' }, { id: 'tu', bin: 'n' }, { id: 'cr', bin: 'n' }],
      },
    },
    now(S) { return `<b data-ui>${ST[S.v]}</b>${S.v ? ` <span data-ui>· ${S.v <= 2 ? 'exogenă' : 'endogenă'}</span>` : ''}`; },
    stage(o, H, S) {
      const uid = 'fx' + FX.n, U = x => x.replaceAll('__U__', uid), L = A.L, hs = A.hits, bd = A.badges;
      let s = `<div class="icx" data-st="${S.v}">`;
      s += `<svg class="iso-svg ic-svg an-svg" viewBox="0 0 ${A.W} ${A.H}" role="group" aria-label="Secțiune prin țesut cu cauza inflamației, venula, neutrofilele, mastocitul și macrofagul; dedesubt, cauzele exogene și endogene și scopul inflamației">`;
      s += `<defs>${U(A.defs)}</defs>`;
      s += L.frames + U(L.panelA) + L.panelB;
      TILES.forEach(([id, hk]) => { s += H.spart(id, hit(hs[hk])); });
      HITS.forEach(([id, hk, n, k]) => { s += `<g class="ic-only ${k}">${H.spart(id, hit(hs[hk]) + badge(n, bd[hk]))}</g>`; });
      s += '</svg>';
      const cut = s.length;
      s += `<ul class="circ-rows fv-rows ic-rows" aria-label="Ce arată figura">${HITS.map(([id, , n, k]) => `<li class="ic-only ${k}"><button type="button" class="fxp row" data-p="${id}"><span class="bdg" data-ui>${n}</span><span class="rt"><span class="rl">${H.lab('l' + id, P[id].t)}</span><span class="rd" data-ui>${DEV[id]}</span></span><span class="ar" aria-hidden="true"></span></button></li>`).join('')}</ul>`;
      s += `<div class="circ-sym"><span class="sl" data-ui>Din LP</span><button type="button" class="fxp sym" data-p="def">${P.def.t}</button>${['x1', 'x2', 'x3'].map(id => `<button type="button" class="fxp sym ctxs" data-p="${id}">${P[id].t}</button>`).join('')}</div></div>`;
      return { view: s.slice(0, cut) + '</div>', legend: '<div class="icx ic-leg circ" data-st="' + S.v + '">' + s.slice(cut) };
    },
    update(el, S) {
      const v = Math.max(0, Math.min(5, Math.round(S.vv)));
      el.querySelectorAll('.icx').forEach(r => { r.dataset.st = v; });
      el.querySelectorAll('.ic-rows .row').forEach(b => { const on = FX.isOn(P[b.dataset.p], { v }); b.dataset.ch = on ? 1 : 0; b.querySelector('.ar').textContent = on ? '●' : '·'; });
      el.querySelectorAll('.ic-leg .sym').forEach(b => b.classList.toggle('lit', FX.isOn(P[b.dataset.p], { v })));
    },
    panel(S, H) {
      const li = (ids, cls) => ids.map(id => `<li>${H.node(id, cls)}</li>`).join('');
      if (S.v === 0) return `<section class="fx-grp"><h4><span data-ui>${ST[0]}</span><small>${C2(44)}</small></h4><ol class="fx-chain"><li class="fx-gap">Fără agresiune: vasele, celulele și fibrele sunt în repaus; macrofagul și mastocitul stau de pază.</li></ol></section>`;
      const cause = ['mic', 'fb', 'dt', 'tu', 'cr'][S.v - 1];
      return `<section class="fx-grp"><h4><span data-ui>Cauza: ${ST[S.v]}</span><small>${LP}</small></h4><ol class="fx-chain">${li(S.v === 1 ? ['mic', 'sys'] : [cause], 'heat')}</ol></section>`
        + `<section class="fx-grp"><h4><span data-ui>Aceeași reacție</span><small>${C2('2, 11–13')}</small></h4><ol class="fx-chain">${li(['vasc', 'neu', 'mast', 'mac'])}</ol></section>`
        + `<section class="fx-grp"><h4><span data-ui>Scopul</span><small>${LP}</small></h4><ol class="fx-chain">${li(['lim', 'elim', 'rep'])}</ol></section>`;
    },
  });
})();
