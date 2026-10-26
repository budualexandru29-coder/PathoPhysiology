/* ===== Î15: pirogenii exogeni și efectele biologice ale pirogenilor endogeni =====
   Desenul vine din art/pyro.mjs (ART.pyro). Variabila: pasul, de la „fără pirogen” la efectele periferice (0–4).
   Textele cu diapozitiv vin din LP (Febra, slide 6–8, 18–19) și din Cursurile 2 și 3; restul sunt explicații suplimentare, cu sursa. */
(function () {
  const A = ART.pyro;
  const ST = ['Fără pirogen', 'Pirogenul exogen e recunoscut', 'Macrofagul face pirogenii endogeni', 'Efectele centrale: febra', 'Efectele periferice și proinflamatoare'];
  const from = n => S => S.v >= n;
  const LP = 'Febra (LP), slide 18–19';
  const P = {
    exo: { t: 'Pirogenii exogeni: lipopolizaharidul (endotoxina) Gram-negativilor', slide: 'Febra (LP), slide 6; Cursul 3, slide 58', q: { 15: ['0:0'] }, eff: 1, on: from(1),
      body: 'Pirogenii exogeni sunt microorganismele patogene și toxinele lor: endotoxinele bacteriilor Gram-negative (lipopolizaharidul, LPZ). În desen, bacteria eliberează o veziculă de membrană externă cu LPS; o moleculă de LPS e desenată mare, ținută de o proteină de transport.' },
    gp: { t: 'Gram-pozitivi: acidul lipoteicoic, peptidoglicanii', slide: 'Cursul 3, slide 58', q: { 15: ['0:0'] }, on: from(1),
      body: 'Și componentele bacteriilor Gram-pozitive sunt pirogeni exogeni: acidul lipoteicoic și peptidoglicanii. În desen, marginea peretelui gros de peptidoglican (lanțuri de glican legate prin punți peptidice) și firele de acid lipoteicoic; o moleculă eliberată, cu ancora ei de diacilglicerol, e recunoscută de heterodimerul TLR2:TLR6 (Janeway ed. 10, p. 252). LP-ul numește aceste componente „exotoxine”; manualul le numește componente ale peretelui (PAMP).' },
    rec: { t: 'Receptorii macrofagului recunosc tiparul microbian (TLR)', slide: 'Cursul 2, slide 41–42', eff: 1, on: from(1),
      body: 'PRR (Pattern Recognition Receptors) recunosc tiparul agenților infecțioși (PAMP, Pathogen-Associated Molecular Patterns). Printre ei, receptorii de tip Toll (TLR): la om cel puțin 11 tipuri, care vin în contact direct și rapid cu microorganismele, pe macrofage, neutrofile, celule dendritice, mastocite, celule epiteliale.' },
    fag: { t: 'LPS opsonizat de complement, fagocitat de macrofage', slide: 'Febra (LP), slide 6–7', q: { 15: ['0:1'] }, eff: 1, on: from(1),
      body: 'LPZ este opsonizat de complement și fagocitat de macrofage, care eliberează pirogenii endogeni. În desen, macrofagul întreg din colț, la scara lui (21 µm; bara de 10 µm): un fagozom cu o bacterie acoperită de C3b (punctele galbene), un lizozom alături, alte bacterii afară. Cercul punctat de pe membrană e locul mărit în restul panoului (~0,1 µm).' },
    endo: { t: 'Pirogenii endogeni: IL-1, TNF-α, IL-6, IFN', slide: 'Febra (LP), slide 7; Cursul 3, slide 59', q: { 15: ['0:1'] }, eff: 1, on: from(2),
      body: 'Pirogenii exogeni acționează prin pirogenii endogeni pe care îi induc. Monocitele și macrofagele eliberează cantități mari de IL-1 și TNF-α (cei mai puternici pirogeni endogeni), IFN-α și IFN-γ; IL-6 este cel mai slab pirogen, dar efectul său este persistent. (Janeway, p. 321–322, numește ca pirogeni endogeni TNF-α, IL-1β și IL-6; interferonii apar printre pirogeni doar în LP și în curs.)' },
    ovlt: { t: 'Efecte centrale: PGE2 în endoteliul OVLT', slide: LP + '; Cursul 3, slide 60', q: { 15: ['1:0', '1:1'] }, eff: 1, on: from(3),
      body: '↑ eliberarea mediatorilor de origine lipidică (PGE2) la nivelul celulelor endoteliale din OVLT, care vascularizează centrul hipotalamic anterior (aria preoptică). În desen, capilarul fenestrat și enzima COX-2 (galbenă), care face PGE2.' },
    poa: { t: 'Aria preoptică: AMPc, GMPc', slide: LP + '; Cursul 3, slide 60', q: { 15: ['1:1', '1:2'] }, eff: 1, on: from(3),
      body: 'PGE2 acționează pe neuronii ariei preoptice (receptorii EP3, albaștri); crește pragul centrului termoreglator pe calea AMPc și GMPc. În desen, molecula portocalie din neuron e AMPc.' },
    set: { t: 'Pragul termoreglator crește: febra', slide: LP + '; Cursul 3, slide 57, 60', q: { 15: ['1:2'] }, eff: 1, on: from(3),
      body: 'Pragul centrului termoreglator crește și se declanșează reacția febrilă. În febră pragul de reglare („set point-ul”) este crescut, iar mecanismele de feedback sunt normale. Acul termostatului trece de la 37 spre 39°C.' },
    per: { t: 'Efecte periferice: ↑ apărarea specifică și nespecifică; LB, LT', slide: LP, q: { 15: ['2:0', '3:7'] }, eff: 1, on: from(4),
      body: 'Efectele periferice cresc capacitatea de apărare specifică și nespecifică a organismului. Pirogenii endogeni activează limfocitele B și T. În desen, un limfocit B cu receptorii lui, un plasmocit care secretă anticorpi și un limfocit T care se divide.' },
    lip: { t: 'Mediatorii lipidici: PGE2, tromboxan, PAF', slide: LP + '; Cursul 3, slide 61', q: { 15: ['3:0'] }, eff: 1, on: from(4),
      body: 'Efectul proinflamator: stimulează eliberarea mediatorilor de origine lipidică: PGE2, tromboxan (Tx), PAF. În desen, un trombocit în vas, apoi, de sus în jos, tromboxanul, PAF și PGE2.' },
    mob: { t: 'Mobilizarea leucocitelor din măduvă', slide: LP, q: { 15: ['3:1'] }, eff: 1, on: from(4),
      body: 'Crește mobilizarea leucocitelor din măduva hematogenă. În desen, neutrofilele ies din măduvă printr-un sinus și ajung în vas.' },
    adh: { t: 'Molecule de adeziune pe endoteliu; IL-8', slide: LP, q: { 15: ['3:2', '3:3'] }, eff: 1, on: from(4),
      body: 'Crește expresia moleculelor de adeziune pe endoteliul vascular; pirogenii endogeni induc sinteza de IL-8, factor chemotactic pentru monocite și neutrofile. În desen, selectinele (roz) și ICAM-1 (portocaliu) pe peretele vasului, un neutrofil care trece prin perete și urmează IL-8 (punctele verzi) spre un macrofag.' },
    fgc: { t: 'Activează fagocitoza', slide: LP + '; Cursul 3, slide 61', q: { 15: ['3:4'] }, eff: 1, on: from(4),
      body: 'Pirogenii endogeni activează fagocitoza: microfagele (neutrofilele) și macrofagele. În desen, un neutrofil întinde pseudopode în jurul unei bacterii opsonizate.' },
    apr: { t: 'Ficatul: proteinele de fază acută; scad Fe și Zn', slide: LP + '; Cursul 3, slide 62', q: { 15: ['3:5', '3:6'] }, eff: 1, on: from(4),
      body: 'Crește sinteza hepatică a proteinelor de fază acută (fibrinogen, proteina C reactivă, amiloid seric A, antiproteaze, ceruloplasmină, haptoglobină). Scade concentrația de Fe și Zn, necesare multiplicării bacteriene. În desen, PCR în sinusoid; fierul (maro) trece din sânge în ficat și în celula Kupffer.' },
    ifn: { t: 'Interferonii antivirali', slide: LP, q: { 15: ['3:7'] }, eff: 1, on: from(4),
      body: 'Pirogenii endogeni stimulează producția de interferoni antivirali. În desen, celula infectată (virionii verzi) eliberează interferon (albastru); celula vecină intră în starea antivirală.' },
    x1: { t: 'Structura lipopolizaharidului', ctx: 'Raetz CRH, Whitfield C. Lipopolysaccharide endotoxins. Annu Rev Biochem 2002;71:635–700',
      body: 'Trei părți: lipidul A, ancorat în membrana externă (un dizaharid de glucozamină cu două grupări fosfat și șase lanțuri de acizi grași; este partea toxică, pirogenă), miezul oligozaharidic și antigenul O, un lanț de unități repetitive de zaharuri, diferit de la o tulpină la alta.' },
    x2: { t: 'Calea TLR4: de la LPS la NF-κB', ctx: "Janeway's Immunobiology ed. 10, p. 258–262; structura PDB 3FXI",
      body: 'Proteina care leagă LPS (LBP, bumerangul portocaliu) îl scoate din membrana bacteriei și îl duce la CD14 (potcoava albastră, ancorată prin GPI), care îl predă complexului TLR4–MD-2: lanțurile lipidului A intră în buzunarul MD-2 (galben) și două complexe se unesc într-un dimer în formă de „m”. Domeniile TIR (gri) recrutează MyD88 (galben); domeniul morții al MyD88 aduce kinazele IRAK4 și IRAK1 (portocalii) și TRAF6 (roz), apoi TAK1 (verde) activează IKK (roșu, cu NEMO). IKK fosforilează IκB, care se degradează și eliberează NF-κB (p50/p65, verzi). NF-κB intră în nucleu și pornește genele IL-1β, TNF-α, IL-6. TLR2:TLR6 folosește tot MyD88.' },
    x3: { t: 'De ce scad fierul și zincul', ctx: 'Ganz T, Nemeth E. Iron homeostasis in host defense and inflammation. Nat Rev Immunol 2015;15:500–510; Liuzzi JP et al. Interleukin-6 regulates the zinc transporter Zip14 in liver. Proc Natl Acad Sci USA 2005;102:6843–6848',
      body: 'IL-6 crește hepcidina, care blochează feroportina: fierul rămâne în macrofage și hepatocite, legat de feritină, iar fierul plasmatic scade. Tot IL-6 crește transportorul ZIP14 din ficat, care preia zincul din sânge. Bacteriile au mai puțin fier și zinc la dispoziție.' },
    x4: { t: 'Scările desenului', ctx: 'dimensiuni: structurile PDB 3FXI (TLR4–MD-2–LPS), 3A79 (TLR2–TLR6); Junqueira ed. 13, p. 113, 251–261, 273; Ross ed. 7, p. 203, 653',
      body: 'Sus, membrana macrofagului e la 4 px/nm (bara de 10 nm): dublul strat are 4 nm, dimerul TLR4–MD-2 ~13 nm, TLR2:TLR6 ~12 nm (extinderile structurilor PDB). LBP, CD14 și proteinele de semnalizare de sub membrană au mărimi aproximative, nemăsurate în sursele folosite. Chenarul cu LPS e mărit de 2,5 ori (bara de 2 nm). Macrofagul din colț e la 3 px/µm (bara de 10 µm). Jos, celulele sunt toate la 2,4 px/µm (bara de 10 µm): hematia 7,6 µm, neutrofilul 12, limfocitul 7,5, plasmocitul 18, macrofagul 18–21, hepatocitul ~21 µm. Moleculele din panoul de jos (PGE2, PCR, anticorpii, interferonul, IL-8, fierul) și virionii sunt simboluri, nu la scară. Panoul de jos e o hartă: cele șase scene sunt în locuri diferite din corp, legate aici de un singur vas.' },
    x5: { t: 'Cum ies citokinele din macrofag', ctx: "Janeway's Immunobiology ed. 10, p. 273 (caspaza 1, gasdermina D), p. 319 (TACE)",
      body: 'Nu toate pe aceeași cale. TNF-α se face ca trimer ancorat în membrană și e tăiat de proteaza TACE (ADAM17), care eliberează trimerul solubil. IL-1β nu are peptid semnal: forma inactivă (pro-IL-1β) e tăiată de caspaza 1 în inflamazom, iar IL-1β iese prin porii pe care îi face gasdermina D (roșii, în membrană). IL-6 urmează secreția obișnuită. Toate trei sunt desenate la scară, lângă membrană.' },
  };
  const HITS = [['exo', 'lps', 1], ['rec', 'tlr4', 2], ['x2', 'myd', 3], ['endo', 'ck', 4], ['fag', 'fag', 5], ['gp', 'tlr2', 6], ['ovlt', 'ovlt', 7], ['poa', 'poa', 8], ['set', 'dial', 9], ['apr', 'liv', 10], ['mob', 'mar', 11], ['lip', 'lip', 12], ['adh', 'adh', 13], ['per', 'per', 14], ['fgc', 'fgc', 15], ['ifn', 'ifn', 16]];
  const DEV = { exo: 'Membrana bacteriei și LPS', rec: 'TLR4–MD-2 și CD14 pe membrană', x2: 'MyD88 și kinazele, sub membrană', endo: 'Citokinele care ies, în stânga', fag: 'Macrofagul întreg, în colț', gp: 'Peretele Gram-pozitiv și TLR2:TLR6', ovlt: 'Capilarul OVLT', poa: 'Neuronul preoptic', set: 'Termostatul', apr: 'Ficatul', mob: 'Măduva', lip: 'Trombocitul și mediatorii lipidici', adh: 'Peretele vasului și IL-8', per: 'Limfocitele B, T și plasmocitul', fgc: 'Neutrofilul cu bacteria', ifn: 'Celulele epiteliale' };
  const hit = a => a.w != null ? `<rect class="hit" x="${(+a.x).toFixed(1)}" y="${(+a.y).toFixed(1)}" width="${(+a.w).toFixed(1)}" height="${(+a.h).toFixed(1)}" rx="8"/>` : `<circle class="hit" cx="${(+a.cx).toFixed(1)}" cy="${(+a.cy).toFixed(1)}" r="${a.r}"/>`;
  const badge = (n, [x, y]) => `<g class="bdg-s"><circle cx="${x}" cy="${y}" r="8.6"/><text x="${x}" y="${y + 3.6}" text-anchor="middle" data-ui>${n}</text></g>`;
  const ang = v => v >= 3 ? 60 : -60;           // acul termostatului: 37°C (−150° pe cadran) → 39°C (−30°); acul desenat arată în sus (−90°)

  FX.def('pyro', {
    title: 'Pirogenii exogeni și efectele pirogenilor endogeni',
    meta: 'Pirogenii exogeni: recunoașterea lor și efectele pirogenilor endogeni',
    qs: [15],
    kind: 'mix',
    note: 'Sus, membrana unui macrofag la scară moleculară (bara de 10 nm): membrana externă a unei bacterii Gram-negative cu LPS, receptorii, semnalul spre nucleu și citokinele care ies; în dreapta sus, peretele unei bacterii Gram-pozitive; în colț, macrofagul întreg (bara de 10 µm). Jos, o hartă a efectelor: șase scene legate de un vas sanguin, cu celulele la aceeași scară (bara de 10 µm).',
    src: 'Febra (LP), slide 6–8, 18–19; Cursul 3 (Termoreglarea), slide 58–62; Cursul 2 (Inflamația), slide 41–42',
    neutral: 0,
    ctl: { type: 'range', label: 'Pasul', min: 0, max: 4, step: 1, init: 4, fmt: v => ST[v], play: { ms: 2600, label: 'Redă pașii' }, peek: 'Compară cu fără pirogen' },
    initV: () => 4,
    hints: {
      predict: 'Alege un pas, bifează ce s-a întâmplat deja, apoi apasă „Dezvăluie”.',
      explore: 'Mută pasul. Apasă o moleculă, o celulă sau o scenă ori un rând de mai jos: vezi textul din LP și punctul din barem.',
    },
    predict: { kind: 'pick', prompt: (S, lab) => `${lab}: ce s-a întâmplat deja?` },
    tour: [
      { v: 0, parts: ['x4'], t: 'Un macrofag în repaus',
        see: 'Sus, membrana macrofagului: receptorii TLR4 sunt separați, NF-κB e ținut în citoplasmă de IκB, nucleul nu produce citokine. În stânga sus, o bacterie Gram-negativă. Jos, cele șase scene în repaus; acul termostatului e la 37°C.' },
      { v: 1, parts: ['exo', 'x1', 'rec', 'gp'], t: 'Recunoașterea pirogenului exogen',
        see: 'LBP scoate o moleculă de LPS din membrana bacteriei (1) și o duce la CD14. Receptorii macrofagului o recunosc (2): două complexe TLR4–MD-2 se unesc în jurul lipidului A. În dreapta sus, acidul lipoteicoic al Gram-pozitivilor unește TLR2 cu TLR6 (6).' },
      { v: 1, parts: ['fag', 'x2'], t: 'Opsonizarea și fagocitoza',
        see: 'În macrofagul întreg din colț, o bacterie opsonizată de complement e înglobată într-un fagozom (5). Sub membrană, semnalul pornește: MyD88, IRAK4, IRAK1, TRAF6, TAK1, IKK (3).' },
      { v: 2, parts: ['endo'], t: 'Pirogenii endogeni',
        see: 'IκB se degradează, NF-κB pleacă spre nucleu (săgeata verde); în macrofagul din colț apar ARNm-urile (roșii). Citokinele ies (4): TNF-α tăiat de TACE din membrană, IL-1β prin porii de gasdermină D, IL-6; apoi trec în sânge.' },
      { v: 3, parts: ['ovlt', 'poa', 'set'], t: 'Efectele centrale',
        see: 'În OVLT (7), endoteliul face PGE2 cu COX-2. PGE2 acționează pe neuronii ariei preoptice (8): AMPc crește. Pragul termostatului urcă (9): febra.' },
      { v: 4, parts: ['per', 'fgc', 'ifn'], t: 'Efectele periferice',
        see: 'Crește apărarea specifică (limfocite B, plasmocite cu anticorpi, limfocite T, 14) și nespecifică (fagocitoza, 15). Celulele infectate cu virusuri fac interferon, care protejează celulele vecine (16).' },
      { v: 4, parts: ['lip', 'mob', 'adh', 'apr', 'x3'], t: 'Efectul proinflamator',
        see: 'Mediatori lipidici: PGE2, tromboxan, PAF (12). Leucocitele ies din măduvă (11). Endoteliul exprimă molecule de adeziune, iar IL-8 atrage neutrofilele (13). Ficatul (10) face proteine de fază acută și reține fierul; Fe și Zn din sânge scad.' },
    ],
    parts: P,
    games: {
      order: {
        prompt: 'Pune în ordine drumul de la pirogenul exogen la febră.',
        items: [
          { t: 'Bacteria eliberează LPS (pirogen exogen)', parts: ['exo'] },
          { t: 'Receptorii macrofagului (TLR) recunosc LPS', parts: ['rec'] },
          { t: 'Macrofagul eliberează pirogenii endogeni: IL-1, TNF-α, IL-6', parts: ['endo'] },
          { t: 'PGE2 în endoteliul OVLT', parts: ['ovlt'] },
          { t: 'AMPc în neuronii ariei preoptice', parts: ['poa'] },
          { t: 'Pragul termoreglator crește: febra', parts: ['set'] },
        ],
      },
      sort: {
        prompt: 'Așază efectele pirogenilor endogeni în grupa din LP (slide 18–19).',
        bins: [{ id: 'c', t: 'Centrale', sub: 'hipotalamus', short: 'Centrale', tone: 'heat' }, { id: 'p', t: 'Periferice', sub: 'apărarea', short: 'Periferice' }, { id: 'i', t: 'Proinflamatoare', sub: 'mediatori, celule, ficat', short: 'Proinflamatoare' }],
        items: [{ id: 'ovlt', bin: 'c' }, { id: 'poa', bin: 'c' }, { id: 'set', bin: 'c' }, { id: 'per', bin: 'p' }, { id: 'lip', bin: 'i' }, { id: 'mob', bin: 'i' }, { id: 'adh', bin: 'i' }, { id: 'fgc', bin: 'i' }, { id: 'apr', bin: 'i' }, { id: 'ifn', bin: 'i' }],
      },
    },
    now(S) { return `<b data-ui>${ST[S.v]}</b>`; },
    stage(o, H, S) {
      const uid = 'fx' + FX.n, U = x => x.replaceAll('__U__', uid), L = A.L, hs = A.hits, bd = A.badges, N = A.needle;
      let s = `<div class="pyx" data-st="${S.v}">`;
      s += `<svg class="iso-svg py-svg an-svg" viewBox="0 0 ${A.W} ${A.H}" role="group" aria-label="Recunoașterea lipopolizaharidului pe membrana macrofagului și efectele pirogenilor endogeni în jurul unui vas sanguin">`;
      s += `<defs>${U(A.defs)}</defs>`;
      s += L.frames + U(L.panelA) + L.frameLine + U(L.B)
        + `<g class="py-needle" style="transform-origin:${N.cx}px ${N.cy}px;transform:rotate(${ang(S.v)}deg)"><path class="dl-needle" d="M${N.cx - 1.4} ${N.cy + 4}L${N.cx} ${(N.cy - N.len).toFixed(1)}L${N.cx + 1.4} ${N.cy + 4}Z"/></g><circle class="hub" cx="${N.cx}" cy="${N.cy}" r="2"/>`;
      HITS.forEach(([id, hk, n]) => { s += H.spart(id, hit(hs[hk]) + badge(n, bd[hk])); });
      s += '</svg>';
      const cut = s.length;
      s += `<ul class="circ-rows fv-rows py-rows" aria-label="Ce arată figura">${HITS.map(([id, , n]) => `<li><button type="button" class="fxp row" data-p="${id}"><span class="bdg" data-ui>${n}</span><span class="rt"><span class="rl">${H.lab('l' + id, P[id].t)}</span><span class="rd" data-ui>${DEV[id]}</span></span><span class="ar" aria-hidden="true"></span></button></li>`).join('')}</ul>`;
      s += `<div class="circ-sym"><span class="sl" data-ui>Explicații</span>${['x1', 'x5', 'x3', 'x4'].map(id => `<button type="button" class="fxp sym ctxs" data-p="${id}">${P[id].t}</button>`).join('')}</div></div>`;
      return { view: s.slice(0, cut) + '</div>', legend: '<div class="pyx py-leg circ" data-st="' + S.v + '">' + s.slice(cut) };
    },
    update(el, S) {
      const v = Math.max(0, Math.min(4, Math.round(S.vv)));
      el.querySelectorAll('.pyx').forEach(r => { r.dataset.st = v; });
      const n = el.querySelector('.py-needle'); if (n) n.style.transform = `rotate(${ang(v)}deg)`;
      el.querySelectorAll('.py-rows .row').forEach(b => { const on = FX.isOn(P[b.dataset.p], { v }); b.dataset.ch = on ? 1 : 0; b.querySelector('.ar').textContent = on ? '●' : '·'; });
      el.querySelectorAll('.py-leg .sym').forEach(b => b.classList.toggle('lit', FX.isOn(P[b.dataset.p], { v })));
    },
    panel(S, H) {
      const li = (ids, cls) => ids.filter(id => FX.isOn(P[id], S)).map(id => `<li>${H.node(id, cls)}</li>`).join('');
      if (S.v === 0) return `<section class="fx-grp"><h4><span data-ui>${ST[0]}</span><small>macrofag în repaus</small></h4><ol class="fx-chain"><li class="fx-gap">Fără pirogen: receptorii sunt liberi, NF-κB e inactiv, nu se produc citokine.</li></ol></section>`;
      let h = `<section class="fx-grp"><h4><span data-ui>Pirogenii exogeni → endogeni</span><small>Febra (LP), slide 6–7</small></h4><ol class="fx-chain">${li(['exo', 'gp', 'rec', 'fag', 'endo'], 'heat')}</ol></section>`;
      if (S.v >= 3) h += `<section class="fx-grp"><h4><span data-ui>Efecte centrale</span><small>${LP}</small></h4><ol class="fx-chain">${li(['ovlt', 'poa', 'set'], 'heat')}</ol></section>`;
      if (S.v >= 4) h += `<section class="fx-grp"><h4><span data-ui>Efecte periferice</span><small>${LP}</small></h4><ol class="fx-chain">${li(['per'])}</ol></section><section class="fx-grp"><h4><span data-ui>Efect proinflamator</span><small>${LP}</small></h4><ol class="fx-chain">${li(['lip', 'mob', 'adh', 'fgc', 'apr', 'ifn'])}</ol></section>`;
      return h;
    },
  });
})();
