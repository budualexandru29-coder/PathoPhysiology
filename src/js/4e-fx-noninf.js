/* ===== Î13/Î14: febra non-infecțioasă =====
   Desenul vine din art/noninf.mjs (ART.noninf). Variabila: tipul (0 autoimun, 1 „drug fever”, 2 posttransfuzional, 3 neoplazic).
   Textele cu diapozitiv vin din LP (Febra, slide 12–17); restul sunt explicații suplimentare, cu sursa. */
(function () {
  const A = ART.noninf;
  const ST = ['Bazele: autoimunitatea', '„Drug fever”', 'Reacția posttransfuzională', 'Febra în context neoplazic'];
  const at = (...v) => S => v.includes(S.v);
  const LP = n => 'Febra (LP), slide ' + n;
  const P = {
    def: { t: 'Febra non-infecțioasă', slide: LP(12), q: { 13: ['0:0', '0:1'] },
      body: 'Febra de etiologie non-infecțioasă e declanșată de pirogeni endogeni și e legată de condiții patologice care au ca substrat comun mecanisme mediate imunologic. Nu există un microb: declanșatorul e o reacție imună (autoimunitate, hipersensibilitate) sau o tumoră.' },
    self: { t: 'Eșecul diferențierii self / non-self', slide: LP('12–13'), q: { 13: ['1:0', '1:3'] }, eff: 1, on: at(0),
      body: 'Eșuarea abilității organismului de a diferenția antigenele non-self de antigenele self e urmată de un sindrom inflamator. Alterarea răspunsului imun este placa turnantă a bolilor autoimune. În desen, o celulă proprie acoperită de autoanticorpi (roșii) și de C3b (galben), lângă un limfocit T autoreactiv.' },
    ic: { t: 'Sindromul inflamator mediat imunologic', slide: LP(13), q: { 13: ['1:1'] }, eff: 1, on: at(0, 1, 2),
      body: 'Reacția imună întreține un sindrom inflamator, cu eliberarea în circulație a unor citokine proinflamatorii, al căror efect comun e reacția febrilă. În desen, complexele imune (antigen și anticorpi) se leagă de receptorii Fc ai macrofagului și îl activează.' },
    mac: { t: 'Monocitele și macrofagele produc pirogenii', slide: LP(14), q: { 13: ['2:0'] }, eff: 1,
      body: 'Pirogenii endogeni sunt produși de monocite și de macrofage (macrofagele derivă din monocitele migrate în țesuturi). În desen, macrofagul activat, cu nucleul reniform, lizozomi (verzi) și aparatul Golgi.' },
    ck: { t: 'Citokinele proinflamatorii, în circulație', slide: LP('13–14'), q: { 13: ['1:2'] }, eff: 1,
      body: 'Citokinele proinflamatorii (IL-1, TNF-α, IFN, IL-6) ajung în sânge; efectul lor comun e reacția febrilă. În desen, glifele colorate ies din macrofag și urcă prin vas spre creier.' },
    hyp: { t: 'Hipotalamusul: crește valoarea de referință', slide: 'Febra (LP), slide 2–9',
      body: 'Mecanismul central e identic cu cel al febrei infecțioase: pirogenii endogeni ajung la OVLT (fără barieră hematoencefalică), induc PGE2, iar pe calea AMPc crește valoarea de referință a centrului termoreglator. În desen, punctul galben e hipotalamusul, cel roșu OVLT.' },
    fev: { t: 'Febra', slide: LP(12), eff: 1,
      body: 'Temperatura reală e sub noua valoare de referință: apar vasoconstricția, senzația de frig și frisonul, iar temperatura urcă. În desen, coloana termometrului.' },
    pyr: { t: 'Pirogenii endogeni: cei mai puternici și cel mai slab', slide: LP(14), q: { 13: ['2:0', '2:1'] }, eff: 1, on: at(0),
      body: 'IL-1, TNF-α și IFN (α, γ), produși de monocite și macrofage, sunt cei mai puternici pirogeni endogeni. IL-6 e cel mai slab pirogen, dar are efect persistent. Graficul e o schemă calitativă, fără valori: arată doar ordinea din LP (vârfuri înalte pentru IL-1, TNF-α, IFN; o curbă joasă, dar lungă, pentru IL-6).' },
    nsi: { t: 'Imunitatea nespecifică', slide: LP(13), q: { 13: ['1:4', '1:5'] }, eff: 1, on: at(0),
      body: 'Substanțe umorale: lizozimul și factorii complementului. Fagocite: macrofagele, derivate din monocitele migrate în țesuturi. Neutrofilele, atrase de chemokine (chemotactism), declanșează procesul inflamator prin eliberare de mediatori. În desen, un monocit iese din capilar și devine macrofag; un neutrofil urcă gradientul de chemokine (punctele turcoaz) spre focar.' },
    tck: { t: 'Celulele tumorale produc pirogeni', slide: LP('14, 17'), q: { 13: ['2:2'], 14: ['2:3'] }, eff: 1, on: at(3),
      body: 'Pirogeni endogeni pot fi produși și de celulele tumorale (leucemii, limfom Hodgkin, diverse neoplazii). Citokinele proinflamatorii rezultate din răspunsul gazdei la prezența tumorii declanșează febra. În desen, citokinele pleacă din cuibul tumoral spre macrofag.' },
    drug: { t: '„Drug fever”: febră înaltă, cu frison', slide: LP(16), q: { 14: ['0:0', '0:1'] }, eff: 1, on: at(1),
      body: 'Febra medicamentoasă („drug fever”) e o ascensiune termică înaltă, însoțită de frison, după unele medicamente. În desen, medicamentul (nucleul beta-lactamic, roșu) legat de proteine proprii; unii anticorpi îl recunosc.' },
    drugs: { t: 'Beta-lactamine, difenilhidantoină, procainamidă', slide: LP(16), q: { 14: ['0:2'] }, eff: 1, on: at(1),
      body: 'Medicamentele din LP: antibioticele beta-lactamine, difenilhidantoina (fenitoina) și procainamida. Formulele din desen sunt simplificate: nucleul penicilinelor (inelul beta-lactamic fuzionat cu inelul tiazolidinic), fenitoina (inelul hidantoinic cu două fenile pe același atom de carbon) și procainamida.' },
    eo: { t: 'Eozinofilie și leucocitoză tranzitorie', slide: LP(16), q: { 14: ['0:3'] }, eff: 1, on: at(1),
      body: '„Drug fever” se însoțește de eozinofilie și de leucocitoză tranzitorie. Eozinofilia e un indiciu de mecanism alergic. În desen, frotiul: eozinofilele au nucleul bilobat și granule roșii; neutrofilele au nucleul cu mai mulți lobi.' },
    tr: { t: 'Reacțiile posttransfuzionale', slide: LP(16), q: { 14: ['1:0'] }, eff: 1, on: at(2),
      body: 'Febra poate apărea după administrarea de sânge sau de derivate de sânge. În desen, punga cu sânge, leucocitele donatorului cu antigene HLA străine (portocaliu) și anticorpii primitorului legați de ele.' },
    trw: { t: 'Febra la 30–180 de minute, precedată de frison', slide: LP(16), q: { 14: ['1:1', '1:2'] }, eff: 1, on: at(2),
      body: 'Febra apare într-un interval de 30 până la 180 de minute de la transfuzie și e precedată de frison. În desen, axa timpului e comprimată (logaritmică), ca să încapă și primele minute, și cele 12 ore.' },
    trl: { t: 'Leucocitoză tranzitorie, până la 12 ore', slide: LP(16), q: { 14: ['1:3'] }, eff: 1, on: at(2),
      body: 'Reacția posttransfuzională se însoțește de leucocitoză tranzitorie, care poate dura până la 12 ore după transfuzie.' },
    neo: { t: 'Febra în context neoplazic: plurifactorială', slide: LP(17), q: { 14: ['2:0', '2:1'] }, eff: 1, on: at(3),
      body: 'Febra în context neoplazic (inclusiv în limfomul Hodgkin) are etiologie plurifactorială: tumora însăși, reacțiile de hipersensibilitate, rejetul grefă contra gazdă, trombozele. În desen, un cuib de celule tumorale (nuclei mari, hipercromi, o mitoză), cu necroză centrală, și un vas mic cu trombus.' },
    neoex: { t: 'Tumorile care dau febră: exemple din LP', slide: LP(17), q: { 14: ['2:2'] }, eff: 1, on: at(3),
      body: 'Limfomul Hodgkin, leucemia acută, cancerul renal, sarcoamele osoase, tumorile mamare, pulmonare, de colon, metastazele hepatice. În desen, punctele închise la culoare din organe.' },
    x1: { t: 'Medicamentul ca haptenă', ctx: 'Patel RA, Gallagher JC. Drug fever. Pharmacotherapy 2010;30(1):57–69',
      body: 'Cele mai multe febre medicamentoase sunt reacții de hipersensibilitate. Molecula mică a medicamentului (haptena) se leagă de proteine proprii și formează un antigen nou; anticorpii și limfocitele T îl recunosc, iar complexele imune activează macrofagele, care eliberează pirogeni endogeni. Febra apare de obicei după câteva zile de tratament și dispare după oprirea medicamentului.' },
    x2: { t: 'De ce apare febra după transfuzie', ctx: 'Heddle NM. Pathophysiology of febrile nonhemolytic transfusion reactions. Curr Opin Hematol 1999;6(6):420–426',
      body: 'Două mecanisme. Anticorpii primitorului (formați după sarcini sau transfuzii anterioare) recunosc antigenele HLA de pe leucocitele donatorului; complexele formate activează complementul și macrofagele, care eliberează IL-1, TNF-α, IL-6. În plus, leucocitele din pungă eliberează citokine în timpul stocării. Leucodepleția (filtrarea leucocitelor) reduce aceste reacții. Febra în timpul unei transfuzii cere oprirea ei și excluderea unei reacții hemolitice sau a unei contaminări bacteriene.' },
    x3: { t: 'Febra neoplazică e un diagnostic de excludere', ctx: 'Zell JA, Chang JC. Neoplastic fever: a neglected paraneoplastic syndrome. Support Care Cancer 2005;13(11):870–877',
      body: 'Pacientul oncologic e adesea imunodeprimat, așa că întâi se caută și se exclud infecția, febra medicamentoasă și reacțiile posttransfuzionale. Tumora sau macrofagele din jurul ei produc IL-1, IL-6, TNF-α, IFN; necroza tumorală eliberează și ea pirogeni. Răspunsul prompt la un antiinflamator nesteroidian (testul cu naproxen) e folosit ca argument pentru originea neoplazică.' },
    x4: { t: 'Scara desenului', ctx: 'desen schematic',
      body: 'Celulele, anticorpii și citokinele nu sunt la scară: anticorpii și citokinele sunt mult mărite. Creierul e în secțiune mediosagitală, mic. Graficul pirogenilor e calitativ, fără valori; axa timpului posttransfuzional e comprimată.' },
  };
  const HITS = [
    ['self', 'trig', 1, 'o0'], ['drug', 'trig', 1, 'o1'], ['tr', 'trig', 1, 'o2'], ['neo', 'trig', 1, 'o3'],
    ['ic', 'bridge', 2, 'o0 o1 o2'], ['tck', 'bridge', 2, 'o3'],
    ['mac', 'mac', 3, 'oall'], ['ck', 'ck', 4, 'oall'], ['hyp', 'hyp', 5, 'oall'], ['fev', 'therm', 6, 'oall'],
    ['pyr', 'b0ch', 7, 'o0'], ['nsi', 'b0ni', 8, 'o0'], ['drugs', 'b1mol', 7, 'o1'], ['eo', 'b1sm', 8, 'o1'],
    ['trw', 'b2fv', 7, 'o2'], ['trl', 'b2lk', 8, 'o2'], ['neoex', 'b3body', 7, 'o3'],
  ];
  const DEV = { self: 'Celula proprie și autoanticorpii', drug: 'Proteinele cu medicament', tr: 'Punga și leucocitele donatorului', neo: 'Cuibul tumoral și trombusul', ic: 'Complexele imune de lângă macrofag', tck: 'Citokinele de lângă tumoră', mac: 'Macrofagul din centru', ck: 'Citokinele care ies din macrofag', hyp: 'Vasul și creierul', fev: 'Termometrul', pyr: 'Graficul de jos', nsi: 'Capilarul, monocitul, neutrofilul', drugs: 'Formulele de jos', eo: 'Frotiul', trw: 'Barele de sus', trl: 'Bara violet', neoex: 'Organele din siluetă' };
  const hit = a => a.w != null ? `<rect class="hit" x="${(+a.x).toFixed(1)}" y="${(+a.y).toFixed(1)}" width="${(+a.w).toFixed(1)}" height="${(+a.h).toFixed(1)}" rx="8"/>` : `<circle class="hit" cx="${(+a.cx).toFixed(1)}" cy="${(+a.cy).toFixed(1)}" r="${a.r}"/>`;
  const badge = (n, [x, y]) => `<g class="bdg-s"><circle cx="${x}" cy="${y}" r="8.6"/><text x="${x}" y="${y + 3.6}" text-anchor="middle" data-ui>${n}</text></g>`;

  FX.def('noninf', {
    title: 'Febra non-infecțioasă: de la declanșator la hipotalamus',
    meta: 'Febra non-infecțioasă: bazele și tipurile ei',
    qs: [13, 14],
    kind: 'mix',
    note: 'Sus, aceeași cale pentru toate tipurile: declanșatorul (stânga), macrofagul care eliberează pirogenii endogeni, vasul care îi duce la hipotalamus și termometrul. Cursorul schimbă declanșatorul: autoimunitatea, un medicament, o transfuzie, o tumoră. Jos, ce e specific fiecărui tip.',
    src: 'Febra (LP), slide 12–17',
    neutral: 0,
    ctl: { type: 'range', label: 'Tipul', min: 0, max: 3, step: 1, init: 0, fmt: v => ST[v], play: { ms: 3200, label: 'Redă tipurile' } },
    initV: () => 0,
    tourStart: o => (o && o.q === 14 ? 5 : 0),
    hints: {
      predict: 'Alege un tip, bifează ce crezi că se vede, apoi apasă „Dezvăluie”.',
      explore: 'Mută cursorul. Apasă declanșatorul, macrofagul, citokinele, creierul sau panoul de jos ori un rând de mai jos: vezi textul din LP și punctul din barem.',
    },
    predict: { kind: 'pick', prompt: (S, lab) => `${lab}: ce se vede?` },
    tour: [
      { v: 0, parts: ['def', 'self'], t: 'Febră fără microb',
        see: 'Declanșatorul e o reacție imună: organismul nu mai deosebește proteinele proprii (self) de cele străine (1). Celula proprie e acoperită de autoanticorpi și de C3b; lângă ea, un limfocit T autoreactiv.' },
      { v: 0, parts: ['ic', 'mac', 'ck'], t: 'Sindromul inflamator: citokinele',
        see: 'Complexele imune se leagă de macrofag (2), care se activează (3) și eliberează citokine proinflamatorii în sânge (4).' },
      { v: 0, parts: ['hyp', 'fev'], t: 'Același mecanism central ca în febra infecțioasă',
        see: 'Citokinele ajung la OVLT (5): PGE2, valoarea de referință crește, temperatura urcă (6).' },
      { v: 0, parts: ['pyr', 'x4'], t: 'Pirogenii endogeni',
        see: 'IL-1, TNF-α și IFN sunt cei mai puternici; IL-6 e cel mai slab, dar persistent (7). Graficul e calitativ, fără valori.' },
      { v: 0, parts: ['nsi'], t: 'Imunitatea nespecifică',
        see: 'Lizozimul și complementul; monocitul iese din capilar și devine macrofag; neutrofilul urcă gradientul de chemokine spre focar (8).' },
      { v: 1, parts: ['drug', 'drugs', 'eo', 'x1'], t: '„Drug fever”',
        see: 'Medicamentul legat de proteine proprii (1) devine antigen. Beta-lactaminele, difenilhidantoina, procainamida (7). Febră înaltă cu frison; pe frotiu, eozinofile (8).' },
      { v: 2, parts: ['tr', 'trw', 'trl', 'x2'], t: 'Reacția posttransfuzională',
        see: 'Anticorpii primitorului recunosc HLA-ul de pe leucocitele donatorului (1). Febra apare la 30–180 de minute, după frison (7); leucocitoza durează până la 12 ore (8).' },
      { v: 3, parts: ['neo', 'tck', 'neoex', 'x3'], t: 'Febra în context neoplazic',
        see: 'Tumora, necroza, trombozele (1); citokinele din tumoră și din răspunsul gazdei (2). Exemplele din LP, în siluetă (7).' },
    ],
    parts: P,
    games: {
      order: {
        prompt: 'Pune în ordine calea febrei non-infecțioase (LP, slide 12–14).',
        items: [
          { t: 'Eșecul diferențierii self / non-self', parts: ['self'] },
          { t: 'Sindromul inflamator mediat imunologic', parts: ['ic'] },
          { t: 'Monocitele și macrofagele se activează', parts: ['mac'] },
          { t: 'Citokinele proinflamatorii ajung în sânge', parts: ['ck'] },
          { t: 'PGE2 în hipotalamus, valoarea de referință crește', parts: ['hyp'] },
          { t: 'Febra', parts: ['fev'] },
        ],
      },
      sort: {
        prompt: 'Așază fiecare caracteristică la tipul ei de febră non-infecțioasă (LP, slide 16–17).',
        bins: [{ id: 'd', t: '„Drug fever”', short: 'Medicament', tone: 'heat' }, { id: 't', t: 'Reacția posttransfuzională', short: 'Transfuzie' }, { id: 'n', t: 'Febra în context neoplazic', short: 'Neoplazic' }],
        items: [{ id: 'drugs', bin: 'd' }, { id: 'eo', bin: 'd' }, { id: 'trw', bin: 't' }, { id: 'trl', bin: 't' }, { id: 'neoex', bin: 'n' }, { id: 'tck', bin: 'n' }],
      },
    },
    now(S) { return `<b data-ui>${ST[S.v]}</b>`; },
    stage(o, H, S) {
      const uid = 'fx' + FX.n, U = x => x.replaceAll('__U__', uid), L = A.L, hs = A.hits, bd = A.badges;
      let s = `<div class="nix" data-st="${S.v}">`;
      s += `<svg class="iso-svg ni-svg an-svg" viewBox="0 0 ${A.W} ${A.H}" role="group" aria-label="Declanșatorul febrei non-infecțioase, macrofagul care eliberează pirogeni endogeni, vasul spre hipotalamus și termometrul; dedesubt, ce e specific fiecărui tip">`;
      s += `<defs>${U(A.defs)}</defs>`;
      s += L.frames + U(L.panelA) + U(L.panelB);
      HITS.forEach(([id, hk, n, k]) => { s += `<g class="ni-only ${k}">${H.spart(id, hit(hs[hk]) + badge(n, bd[hk]))}</g>`; });
      s += '</svg>';
      const cut = s.length;
      s += `<ul class="circ-rows fv-rows ni-rows" aria-label="Ce arată figura">${HITS.map(([id, , n, k]) => `<li class="ni-only ${k}"><button type="button" class="fxp row" data-p="${id}"><span class="bdg" data-ui>${n}</span><span class="rt"><span class="rl">${H.lab('l' + id, P[id].t)}</span><span class="rd" data-ui>${DEV[id]}</span></span><span class="ar" aria-hidden="true"></span></button></li>`).join('')}</ul>`;
      s += `<div class="circ-sym"><span class="sl" data-ui>Din LP</span><button type="button" class="fxp sym" data-p="def">${P.def.t}</button>${['x1', 'x2', 'x3', 'x4'].map(id => `<button type="button" class="fxp sym ctxs" data-p="${id}">${P[id].t}</button>`).join('')}</div></div>`;
      return { view: s.slice(0, cut) + '</div>', legend: '<div class="nix ni-leg circ" data-st="' + S.v + '">' + s.slice(cut) };
    },
    update(el, S) {
      const v = Math.max(0, Math.min(3, Math.round(S.vv)));
      el.querySelectorAll('.nix').forEach(r => { r.dataset.st = v; });
      el.querySelectorAll('.ni-rows .row').forEach(b => { const on = FX.isOn(P[b.dataset.p], { v }); b.dataset.ch = on ? 1 : 0; b.querySelector('.ar').textContent = on ? '●' : '·'; });
      el.querySelectorAll('.ni-leg .sym').forEach(b => b.classList.toggle('lit', FX.isOn(P[b.dataset.p], { v })));
    },
    panel(S, H) {
      const li = ids => ids.map(id => `<li>${H.node(id, 'heat')}</li>`).join('');
      const path = { 0: ['self', 'ic'], 1: ['drug', 'ic'], 2: ['tr', 'ic'], 3: ['neo', 'tck'] }[S.v];
      const spec = { 0: ['pyr', 'nsi'], 1: ['drugs', 'eo'], 2: ['trw', 'trl'], 3: ['neoex'] }[S.v];
      const src = { 0: LP('12–14'), 1: LP(16), 2: LP(16), 3: LP(17) }[S.v];
      return `<section class="fx-grp"><h4><span data-ui>${ST[S.v]}</span><small>${src}</small></h4><ol class="fx-chain">${li([...path, 'mac', 'ck', 'hyp', 'fev'])}</ol></section>`
        + `<section class="fx-grp"><h4><span data-ui>Specific</span><small>${src}</small></h4><ol class="fx-chain">${li(spec)}</ol></section>`;
    },
  });
})();
