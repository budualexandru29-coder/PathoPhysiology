/* ===== Î22: reacțiile inflamatorii locale și generale (de fază acută) și rolul complementului =====
   Desenul vine din art/apr.mjs (ART.apr). Variabila: timpul de la agresiune, de la „înainte” la ziua a cincea (0–4).
   Textele cu diapozitiv vin din LP (Sindromul inflamator, slide 3–6) și din Cursul 2; restul sunt explicații suplimentare, cu sursa. */
(function () {
  const A = ART.apr;
  const ST = ['Înainte de agresiune', 'Primele minute: mastocitul și complementul', 'Primele ore: citokinele, febra', 'A doua zi: PCR maximă, leucocitoză', 'Ziua a cincea: fibrinogen crescut, PCR în scădere'];
  const from = n => S => S.v >= n;
  const LP = 'Sindromul inflamator (LP), slide 3–6';
  const P = {
    loc: { t: 'Reacțiile locale: dolor, tumor, rubor, calor', slide: 'Sindromul inflamator (LP), slide 3; Cursul 2, slide 8', q: { 22: ['0:0'] }, on: from(1),
      body: 'Reacțiile inflamatorii locale sunt autolimitate și se manifestă prin semnele celsiene: dolor, tumor, rubor, calor (Virchow adaugă functio laesa).' },
    gen: { t: 'Reacțiile generale, de fază acută', slide: 'Sindromul inflamator (LP), slide 3; Cursul 2, slide 60', q: { 22: ['0:1'] }, on: from(2),
      body: 'Reacțiile generale (de fază acută) sunt: febra, leucocitoza și stimularea sintezei proteinelor plasmatice. Cursul: febra (pirogeni exogeni și endogeni), leucocitoza, creșterea nivelului plasmatic al proteinelor de fază acută: hsCRP, fibrinogenul, amiloidul seric A, antiproteazele, ceruloplasmina, haptoglobina.' },
    ige: { t: 'Complexul antigen–anticorp pe suprafața mastocitului', slide: LP + '; Cursul 2, slide 45', q: { 22: ['2:0'] }, eff: 1, on: from(1),
      body: 'Antigenul pătrunde în organism; complexul antigen–anticorp de pe suprafața mastocitelor declanșează reacția. Mastocitele sunt stimulate de IgE (în desen, anticorpii albaștri pe receptori); antigenul (portocaliu) leagă între ei doi anticorpi vecini.' },
    mast: { t: 'Activarea mastocitelor (bazofilelor)', slide: LP + '; Cursul 2, slide 44–45', q: { 22: ['2:0'] }, eff: 1, on: from(1),
      body: 'Mastocitele sunt în țesuturile conjunctive moi, lângă vasele de sânge (bazofilele sunt echivalentul lor din sânge). Conțin granule cu substanțe vasoactive: histamină, proteaze, proteoglicani, factori chemotactici, citokine (TNF-α, IL-4).' },
    deg: { t: 'Degranularea: histamină, IL-8, factorul chemotactic al neutrofilelor', slide: LP, q: { 22: ['2:1'] }, eff: 1, on: from(1),
      body: 'Activarea mastocitului duce la degranulare rapidă, cu eliberarea de histamină, IL-8 și factorul chemotactic al neutrofilelor. În desen, granulele fuzionează cu membrana și se deschid spre exterior.' },
    aa: { t: 'Ca²⁺ → fosfolipaza A2 → acid arahidonic → PG, LT, PAF', slide: LP + '; Cursul 2, slide 53–54', q: { 22: ['2:2', '2:3'] }, eff: 1, on: from(1),
      body: 'În prezența calciului (canalul verde, ionii care intră) se activează fosfolipaza A2, care eliberează acidul arahidonic din fosfolipidele membranare. Din el se formează prostaglandine (calea ciclooxigenazei, enzima galbenă), leucotriene (calea lipooxigenazei, enzima violetă) și PAF. Glucocorticoizii inhibă PLA2; AINS inhibă COX.' },
    ven: { t: 'Vasodilatație, marginație, permeabilitate crescută', slide: LP + '; Cursul 2, slide 11–13', q: { 22: ['2:4', '2:5', '2:6'] }, eff: 1, on: from(1),
      body: 'Mediatorii produc vasodilatație (eritem, creșterea temperaturii locale, flux încetinit), marginație leucocitară (IL-4 activează endoteliul, selectinele ajung în lumen) și creșterea permeabilității endoteliale (diapedeză, extravazare de lichid: tumefacție, exsudat). Pașii leucocitelor sunt desenați în figura inflamației acute.' },
    nv: { t: 'Nociceptorii stimulați: durerea', slide: LP + '; Cursul 2, slide 38', q: { 22: ['2:7'] }, eff: 1, on: from(1),
      body: 'Mediatorii stimulează nociceptorii: durerea. Cursul: bradikinina, împreună cu prostaglandinele și leucotrienele, produce durere. În desen, terminația nervoasă liberă (galbenă) descarcă impulsuri.' },
    cls: { t: 'Calea clasică: C1q pe complexul antigen–anticorp', slide: 'Cursul 2, slide 29', on: from(1),
      body: 'Calea clasică: activarea se produce datorită reacției antigen–anticorp (imunitate dobândită): Ag + Ac + C1 → C2b, C4a → C3. În desen, C1q (buchetul violet) se leagă de porțiunile Fc a doi anticorpi IgG (verzi).' },
    lec: { t: 'Calea lectinei: MBL pe manoza bacteriană', slide: 'Cursul 2, slide 29', on: from(1),
      body: 'Calea lectinei: activarea se produce prin contactul cu glucidele bacteriene care conțin manoză → C2b, C4a → C3. În desen, lectina care leagă manoza (MBL, buchetul albastru) pe zaharurile de suprafață.' },
    alt: { t: 'Calea alternativă: LPS, convertaza C3', slide: 'Cursul 2, slide 29, 31', on: from(1),
      body: 'Calea alternativă: activarea se face de către bacteriile Gram-negative și de fungii care conțin lipopolizaharide în perete → C3. Calea comună: C3 convertază → C5 convertază → C6, C7, C8, C9. În desen, C3b legat de suprafață, cu factorul Bb (portocaliu).' },
    op: { t: 'C3b: opsonizarea', slide: 'Cursul 2, slide 32–33, 48', eff: 1, on: from(1),
      body: 'C3b este un factor major de opsonizare: acoperă bacteria (punctele galbene), iar fagocitele o recunosc și o înglobează mai ușor.' },
    mac: { t: 'C3b + C5–C9: complexul de atac membranar, liza', slide: LP + '; Cursul 2, slide 31', q: { 22: ['3:0', '3:1'] }, eff: 1, on: from(1),
      body: 'Fracțiunea C3b polimerizează C5–C9 și formează complexul de atac membranar (MAC), care face pori în peretele celulelor atacate. Are loc un influx masiv de sodiu și calciu, cu dezechilibru osmotic sever și liza celulei.' },
    frag: { t: 'Anafilatoxinele C3a, C4a, C5a', slide: LP + '; Cursul 2, slide 32', q: { 22: ['3:2'] }, eff: 1, on: from(1),
      body: 'C3a, C4a și C5a sunt anafilatoxine: produc degranularea rapidă a mastocitelor, cu histamină, vasodilatație și permeabilitate crescută. În desen, rombii violeți (C3a) și verzi (C5a).' },
    ntc: { t: 'Chemotactism: fagocitele sunt atrase și activate', slide: LP + '; Cursul 2, slide 32', q: { 22: ['3:3'] }, eff: 1, on: from(1),
      body: 'Anafilatoxinele acționează prin chemotactism și activează macrofagele; C5a este factorul chemotactic major pentru neutrofile. În desen, un neutrofil întinde un pseudopod spre bacterie.' },
    liv: { t: 'Ficatul: sinteza proteinelor de fază acută', slide: LP + '; Cursul 2, slide 57–58, 60', q: { 22: ['1:3'] }, eff: 1, on: from(2),
      body: 'Proteinele plasmatice ale inflamației se sintetizează mai ales în ficat; sinteza e mult crescută în fazele precoce. Sunt proteine pro- și antiinflamatorii, numite reactanți de fază acută. IL-1 și TNF-α stimulează proteinele de tip I (proteina C reactivă, amiloidul A), IL-6 pe cele de tip II (fibrinogen, haptoglobină, α1-antitripsină). În desen, PCR (pentamerii roz) și fibrinogenul (bastonașele portocalii) în sinusoid.' },
    smear: { t: 'Leucocitoza cu devierea la stânga', slide: LP + '; Cursul 2, slide 58', q: { 22: ['1:1', '1:2'] }, eff: 1, on: from(3),
      body: 'Leucocitoza apare prin acțiunea unor produși ai inflamației asupra măduvei hematogene: devierea la stânga a formulei leucocitare, cu apariția formelor imature. IL-6 stimulează măduva să producă mai multe leucocite. În frotiu: neutrofile mai multe, unele nesegmentate (nucleu în potcoavă) și un metamielocit.' },
    brain: { t: 'Febra; oboseala, somnolența', slide: LP + '; Cursul 3, slide 60', q: { 22: ['1:0', '4:0'] }, eff: 1, on: from(2),
      body: 'Febra: acțiunea pirogenilor endogeni asupra termostatului hipotalamic, a cărui valoare de referință e setată mai sus. Mediatorii proinflamatori au și efecte cerebrale: oboseală, somnolență.' },
    sys: { t: 'Efecte metabolice: lipoliza, catabolismul', slide: LP, q: { 22: ['4:0'] }, on: from(2),
      body: 'Efectele sistemice ale mediatorilor proinflamatori: cerebral (oboseală, somnolență), hipotalamic (febră), pe măduva hematogenă (eliberarea de leucocite imature) și metabolic (stimularea lipolizei și a reacțiilor catabolice).' },
    fib: { t: 'Fibrinogenul crește mai lent', ctx: 'Gabay C, Kushner I. Acute-phase proteins and other systemic responses to inflammation. N Engl J Med 1999;340:448–454', on: from(3),
      body: 'Proteinele de fază acută nu cresc toate la fel: proteina C reactivă și amiloidul seric A pot crește de până la ~1000 de ori, în una-două zile; fibrinogenul și haptoglobina cresc de câteva ori, mai lent; albumina și transferina scad (reactanți negativi).' },
    apc: { t: 'Proteinele de fază acută în timp', ctx: 'Pepys MB, Hirschfield GM. C-reactive protein: a critical update. J Clin Invest 2003;111:1805–1812; Gabay C, Kushner I. N Engl J Med 1999;340:448–454',
      body: 'PCR crește în câteva ore de la agresiune și atinge maximul în jur de 48 de ore; scade repede când stimulul dispare (timp de înjumătățire ~19 ore), deci urmărește bine evoluția inflamației. Curbele din grafic sunt exemple pe o scară logaritmică; linia punctată arată momentul ales.' },
    wbc: { t: 'Leucocitele în timp', ctx: 'Bain BJ. Blood Cells: A Practical Guide, 5th ed., Wiley 2015',
      body: 'Banda verde e intervalul obișnuit de referință, aproximativ 4–10 × 10⁹/L (variază între laboratoare). Aria violet închis sunt formele tinere, nesegmentate: devierea la stânga. Curba e un exemplu.' },
    x1: { t: 'Moleculele sunt desenate mărit', ctx: 'Murphy K, Weaver C. Janeway’s Immunobiology, 9th ed., Garland Science 2017',
      body: 'Anticorpii, complementul, enzimele și citokinele au câțiva nanometri; aici sunt mărite de mii de ori față de celule. Complexul de atac membranar e format din C5b, C6, C7, C8 și un inel de până la ~16 molecule de C9, cu un por de ~10 nm. Bacteria e Gram-negativă: membrana externă cu LPS, peptidoglicanul subțire, membrana internă.' },
  };
  const HITS = [['mast', 1], ['ige', 2], ['deg', 3], ['aa', 4], ['ven', 5], ['nv', 6], ['cls', 7], ['lec', 8], ['alt', 9], ['op', 10], ['mac', 11], ['frag', 12], ['ntc', 13], ['liv', 14], ['smear', 15], ['brain', 16], ['apc', 17], ['wbc', 18]];
  const DEV = { mast: 'Celula mare, cu granule violet', ige: 'Anticorpii albaștri și antigenul portocaliu', deg: 'Granulele deschise spre exterior', aa: 'Banda de jos: membrana, PLA2, acidul arahidonic', ven: 'Venula din dreapta', nv: 'Terminația nervoasă galbenă', cls: 'C1q pe doi anticorpi IgG', lec: 'MBL pe manoză', alt: 'C3bBb pe suprafață', op: 'Punctele galbene de pe bacterie', mac: 'Porul roșu din membrana externă', frag: 'Rombii violeți și verzi', ntc: 'Neutrofilul din colț', liv: 'Hepatocitele și sinusoidul', smear: 'Frotiul de sânge', brain: 'Hipotalamusul', apc: 'Graficul de sus', wbc: 'Graficul de jos' };
  const hit = a => a.w != null ? `<rect class="hit" x="${(+a.x).toFixed(1)}" y="${(+a.y).toFixed(1)}" width="${(+a.w).toFixed(1)}" height="${(+a.h).toFixed(1)}" rx="8"/>` : `<circle class="hit" cx="${(+a.cx).toFixed(1)}" cy="${(+a.cy).toFixed(1)}" r="${a.r}"/>`;
  const badge = (n, [x, y]) => `<g class="bdg-s"><circle cx="${x}" cy="${y}" r="8.6"/><text x="${x}" y="${y + 3.6}" text-anchor="middle" data-ui>${n}</text></g>`;

  FX.def('apr', {
    title: 'Reacția de fază acută și complementul',
    meta: 'Reacțiile inflamatorii locale și generale; sistemul complement',
    qs: [22],
    kind: 'mix',
    note: 'Sus, două scene la nivel de celulă și moleculă: un mastocit lângă o venulă și o terminație nervoasă, cu banda acidului arahidonic dedesubt; complementul pe peretele unei bacterii Gram-negative. Jos, reacțiile generale: ficatul (hepatocite și sinusoid), un frotiu de sânge, creierul cu hipotalamusul, și două grafice în timp (curbe-exemplu). Moleculele sunt mărite mult. Cursorul e timpul de la agresiune.',
    src: 'Sindromul inflamator (LP), slide 3–6; Cursul 2 (Inflamația), slide 8–13, 28–33, 44–45, 53–60',
    neutral: 0,
    ctl: { type: 'range', label: 'Timpul', min: 0, max: 4, step: 1, init: 3, fmt: v => ST[v], play: { ms: 2600, label: 'Redă în timp' }, peek: 'Compară cu înainte' },
    initV: () => 3,
    hints: {
      predict: 'Alege un moment, bifează ce s-a întâmplat deja, apoi apasă „Dezvăluie”.',
      explore: 'Mută timpul. Apasă mastocitul, o moleculă a complementului, ficatul, frotiul sau un grafic ori un rând de mai jos: vezi textul din LP și punctul din barem.',
    },
    predict: { kind: 'pick', prompt: (S, lab) => `${lab}: ce s-a întâmplat deja?` },
    tour: [
      { v: 0, parts: ['x1'], t: 'Înainte de agresiune',
        see: 'Un mastocit plin de granule, cu anticorpi IgE pe receptori; lângă el o venulă și o terminație nervoasă liberă. În dreapta, peretele unei bacterii Gram-negative care tocmai a pătruns în țesut. Jos: ficatul, un frotiu de sânge, creierul și graficele.' },
      { v: 1, parts: ['ige', 'mast', 'deg', 'loc'], t: 'Mastocitul se activează',
        see: 'Antigenul (portocaliu) leagă între ei anticorpii de pe mastocit (2). Intră Ca²⁺, granulele fuzionează cu membrana și eliberează histamină (3). Venula se dilată și lasă să iasă plasmă (5); terminația nervoasă descarcă (6): rubor, calor, tumor, dolor.' },
      { v: 1, parts: ['aa', 'ven', 'nv'], t: 'Mediatorii lipidici',
        see: 'Banda de jos (4): fosfolipaza A2 (verde) taie un fosfolipid din membrană și eliberează acidul arahidonic. Ciclooxigenaza îl transformă în prostaglandine, lipooxigenaza în leucotriene; tot din membrană se formează PAF.' },
      { v: 1, parts: ['cls', 'lec', 'alt', 'op'], t: 'Complementul se activează pe bacterie',
        see: 'Trei căi: clasică, C1q pe anticorpi (7); a lectinei, MBL pe manoză (8); alternativă, C3b direct pe suprafață (9). Toate duc la C3b depus pe bacterie (10): opsonizarea.' },
      { v: 1, parts: ['mac', 'frag', 'ntc'], t: 'Liza și chemotactismul',
        see: 'C3b polimerizează C5–C9: complexul de atac membranar (11) face un por prin care intră Na⁺ și Ca²⁺; bacteria se lizează. Fragmentele mici C3a și C5a (12) atrag neutrofilul (13) și degranulează mastocitele.' },
      { v: 2, parts: ['gen', 'brain', 'liv', 'sys'], t: 'Reacțiile generale',
        see: 'În câteva ore, citokinele (IL-1, IL-6, TNF-α) ajung în sânge. Hipotalamusul (16) ridică valoarea de referință: febra. Hepatocitele (14) încep să secrete proteine de fază acută: PCR, apoi fibrinogenul.' },
      { v: 3, parts: ['smear', 'apc', 'wbc'], t: 'A doua zi',
        see: 'PCR e la maxim (17). În frotiu (15), mai multe neutrofile, unele nesegmentate și un metamielocit: leucocitoză cu deviere la stânga (18).' },
      { v: 4, parts: ['fib'], t: 'Ziua a cincea',
        see: 'PCR scade repede, fibrinogenul e acum la maxim, albumina rămâne scăzută. Leucocitele revin spre normal.' },
    ],
    parts: P,
    games: {
      order: {
        prompt: 'Pune în ordine reacțiile, după momentul în care apar.',
        items: [
          { t: 'Mastocitul degranulează (secunde, minute)', parts: ['deg'] },
          { t: 'Citokinele ajung la hipotalamus: febra (ore)', parts: ['brain'] },
          { t: 'Leucocitoza cu devierea la stânga (1–2 zile)', parts: ['smear'] },
          { t: 'PCR atinge maximul (~2 zile)', parts: ['apc'] },
          { t: 'Fibrinogenul la maxim (zilele 3–5)', parts: ['fib'] },
        ],
      },
      sort: {
        prompt: 'Reacție locală sau reacție generală (de fază acută)?',
        bins: [{ id: 'l', t: 'Locală', sub: 'semnele celsiene', short: 'Locală' }, { id: 'g', t: 'Generală', sub: 'de fază acută', short: 'Generală', tone: 'heat' }],
        items: [{ id: 'ven', bin: 'l' }, { id: 'nv', bin: 'l' }, { id: 'deg', bin: 'l' }, { id: 'aa', bin: 'l' }, { id: 'liv', bin: 'g' }, { id: 'smear', bin: 'g' }, { id: 'brain', bin: 'g' }, { id: 'sys', bin: 'g' }],
      },
    },
    now(S) { return `<b data-ui>${ST[S.v]}</b>`; },
    stage(o, H, S) {
      const uid = 'fx' + FX.n, U = x => x.replaceAll('__U__', uid), L = A.L, hs = A.hits, bd = A.badges;
      let s = `<div class="apx" data-st="${S.v}">`;
      s += `<svg class="iso-svg ap-svg an-svg" viewBox="0 0 ${A.W} ${A.H}" role="group" aria-label="Mastocit cu venulă și nociceptor, complementul pe peretele bacterian, ficatul, frotiul de sânge, creierul și graficele proteinelor de fază acută și ale leucocitelor">`;
      s += `<defs>${U(A.defs)}</defs>`;
      s += L.frames + U(L.panelA) + U(L.panelB) + U(L.panelC) + L.frameLines + L.ch1 + L.ch2 + `<g class="ap-curg" style="transform:translateX(${A.tMark[S.v]}px)">${L.cursor}</g>`;
      HITS.forEach(([id, n]) => { s += H.spart(id, hit(hs[id]) + badge(n, bd[id])); });
      s += '</svg>';
      const cut = s.length;
      s += `<ul class="circ-rows fv-rows ap-rows" aria-label="Ce arată figura">${HITS.map(([id, n]) => `<li><button type="button" class="fxp row" data-p="${id}"><span class="bdg" data-ui>${n}</span><span class="rt"><span class="rl">${H.lab('l' + id, P[id].t)}</span><span class="rd" data-ui>${DEV[id]}</span></span><span class="ar" aria-hidden="true"></span></button></li>`).join('')}</ul>`;
      s += `<div class="circ-sym"><span class="sl" data-ui>Din LP</span>${['loc', 'gen', 'sys'].map(id => `<button type="button" class="fxp sym" data-p="${id}">${P[id].t}</button>`).join('')}${['fib', 'x1'].map(id => `<button type="button" class="fxp sym ctxs" data-p="${id}">${P[id].t}</button>`).join('')}</div></div>`;
      return { view: s.slice(0, cut) + '</div>', legend: '<div class="apx ap-leg circ" data-st="' + S.v + '">' + s.slice(cut) };
    },
    update(el, S) {
      const v = Math.max(0, Math.min(4, Math.round(S.vv)));
      el.querySelectorAll('.apx').forEach(r => { r.dataset.st = v; });
      const c = el.querySelector('.ap-curg'); if (c) c.style.transform = `translateX(${A.tMark[v]}px)`;
      el.querySelectorAll('.ap-rows .row').forEach(b => { const on = FX.isOn(P[b.dataset.p], { v }); b.dataset.ch = on ? 1 : 0; b.querySelector('.ar').textContent = on ? '●' : '·'; });
      el.querySelectorAll('.ap-leg .sym').forEach(b => b.classList.toggle('lit', FX.isOn(P[b.dataset.p], { v })));
    },
    panel(S, H) {
      const li = (ids, cls) => ids.filter(id => FX.isOn(P[id], S)).map(id => `<li>${H.node(id, cls)}</li>`).join('');
      if (S.v === 0) return `<section class="fx-grp"><h4><span data-ui>${ST[0]}</span><small>${LP}</small></h4><ol class="fx-chain"><li class="fx-gap">Nicio reacție încă: mastocitul e intact, complementul nu s-a activat.</li></ol></section>`;
      let h = `<section class="fx-grp"><h4><span data-ui>Reacția locală</span><small>${LP}</small></h4><ol class="fx-chain">${li(['ige', 'mast', 'deg', 'aa', 'ven', 'nv', 'loc'], 'heat')}</ol></section>`;
      h += `<section class="fx-grp"><h4><span data-ui>Complementul</span><small>Cursul 2, slide 29–33</small></h4><ol class="fx-chain">${li(['cls', 'lec', 'alt', 'op', 'mac', 'frag', 'ntc'], 'heat')}</ol></section>`;
      if (S.v >= 2) h += `<section class="fx-grp"><h4><span data-ui>Reacțiile generale</span><small>${LP}</small></h4><ol class="fx-chain">${li(['gen', 'brain', 'liv', 'smear', 'sys', 'fib'], 'heat')}</ol></section>`;
      return h;
    },
  });
})();
