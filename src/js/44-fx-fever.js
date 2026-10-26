/* ===== Î11 (și Î10, Î12): bazele fiziopatologice ale febrei =====
   Desenul vine din art/fever.mjs (ART.fever): țesutul cu bacterii Gram-negative și un macrofag, vasul care duce
   pirogenii endogeni spre creier, creierul în secțiune mediosagitală cu o lupă pe capilarul OVLT și graficul
   valorii de referință și al temperaturii centrale. Variabila: faza, de la normal la defervescență (0–6). */
(function () {
  const A = ART.fever;
  const PH = ['Normal', 'Pirogenul exogen', 'Pirogenii endogeni', 'OVLT: PGE2 → AMPc', 'Faza de creștere', 'Faza de stare (platou)', 'Defervescența'];
  const at = (...v) => S => v.includes(S.v);
  const from = n => S => S.v >= n;
  const P = {
    def: { t: 'Febra: termostatul hipotalamic e resetat mai sus', slide: 'Febra (LP); Cursul 3, slide 57', q: { 11: ['0:0', '0:1'] },
      body: 'În caz de febră pragul de reglare („set point-ul”) al termostatului hipotalamic este CRESCUT, iar mecanismele de feed-back sunt NORMALE și vor determina menținerea temperaturii la un nivel ridicat. În hipertermie, creșterea temperaturii se declanșează cu menținerea pragului de termoreglare la un nivel normal.' },
    ex: { t: 'Pirogenii exogeni: LPZ, acid lipoteicoic, peptidoglicani', slide: 'Cursul 3, slide 58', q: { 11: ['1:0', '1:1', '1:2'] }, on: from(1),
      body: 'Pirogenii exogeni: microorganismele patogene și toxinele acestora — endotoxinele bacteriilor Gram-negative (lipopolizaharidul, LPZ) și componente ale bacteriilor Gram-pozitive (acidul lipoteicoic, peptidoglicanii); virusuri, fungi; substanțe toxice, medicamente; complexe Ag–Ac care fixează complementul; substanțe cu potențial alergen.' },
    op: { t: 'Opsonizarea de către complement', slide: 'Febra (LP)', q: { 11: ['1:3'] }, on: from(1),
      body: 'LPZ este opsonizat de către complement (punctele galbene de pe bacterii: fragmentele C3b) și fagocitat de către macrofage.' },
    fg: { t: 'Fagocitoza de către macrofage', slide: 'Febra (LP)', q: { 11: ['1:4'] }, on: from(1),
      body: 'LPZ este opsonizat de către complement și fagocitat de către macrofage; macrofagele activate eliberează citokine proinflamatorii.' },
    en: { t: 'Pirogenii endogeni: IL-1, TNF-α, IL-6, IFN', slide: 'Cursul 3, slide 59', q: { 11: ['1:5', '1:6', '1:7', '1:8'] }, on: from(2),
      body: 'Cea mai mare categorie de pirogeni endogeni sunt citokinele produse de celulele implicate în inflamație și imunitate. Monocitele și macrofagele eliberează cantități mari de IL-1 și TNF-α (cei mai puternici pirogeni endogeni), IFN-α și IFN-γ, IL-6 (cel mai slab pirogen, dar cu efect persistent).' },
    ov: { t: 'OVLT, fără barieră hematoencefalică', slide: 'Cursul 3, slide 60; Febra (LP)', q: { 11: ['2:1', '2:2'] }, on: from(3),
      body: 'Citokinele ajung în aria preoptică și în organum vasculosum al laminei terminale (OVLT). Structurile circumventriculare nu au barieră hematoencefalică: endoteliul capilarelor lor are fenestre.' },
    pg: { t: 'Endoteliul eliberează PGE2', slide: 'Cursul 3, slide 60', q: { 11: ['2:3'] }, on: from(3),
      body: 'Se activează cascada acidului arahidonic cu eliberarea mediatorilor de origine lipidică – PGE2 – la nivelul celulelor endoteliale din vasele care irigă centrul hipotalamic anterior (aria preoptică – PO și organum vasculosum al laminei terminale – OVLT).' },
    am: { t: 'Aria preoptică: AMPc, pragul de reglare crește', slide: 'Cursul 3, slide 60', q: { 11: ['2:0', '2:4', '2:5'] }, on: from(3),
      body: 'Creșterea pragului de reglare al centrului termoreglator (via AMPc, GMPc) și se declanșează reacția febrilă. Pirogenii exogeni pot modifica și ei acest mecanism de reglare pe calea fibrelor viscero-senzitive.' },
    vc: { t: 'Vasoconstricție cutanată, senzație de frig', dq: 'Fluxul sanguin cutanat', slide: 'Cursul 3, slide 63', q: { 11: ['3:0'] }, eff: 1, dir: 'down', on: at(4),
      body: 'Faza de creștere a temperaturii: pragul de reglare crește peste 37°C; temperatura reală a corpului e resimțită ca fiind scăzută și se activează mecanismele care se opun răcirii: scade termoliza prin vasoconstricție cutanată (senzație de frig); crește termogeneza prin creșterea tonusului musculaturii scheletice și frison.' },
    fr: { t: 'Frison', dq: 'Termogeneza musculară', slide: 'Cursul 3, slide 63', q: { 11: ['3:1'] }, eff: 1, dir: 'up', on: at(4),
      body: 'Crește termogeneza prin creșterea tonusului musculaturii scheletice și frison (contracții musculare involuntare).' },
    pl: { t: 'Echilibru la un nivel superior', slide: 'Cursul 3, slide 64', eff: 1, on: at(5),
      body: 'Faza de stare: echilibru între termoliză și termogeneză la un nivel superior, hipotalamic; vasodilatație cutanată. În această perioadă de platou pot apărea complicații neurologice: delir, convulsii febrile.' },
    vd: { t: 'Vasodilatație, senzație de căldură, sudorație', dq: 'Termoliza', slide: 'Cursul 3, slide 64', q: { 11: ['3:2'] }, eff: 1, dir: 'up', on: at(6),
      body: 'Faza de revenire: pragul de reglare revine la normal; se activează mecanismele care se opun supraîncălzirii: crește termoliza prin vasodilatație cutanată (senzație de cald și sudorație marcată); scade termogeneza prin scăderea tonusului muscular, relaxare și tendință la somn.' },
    lim: { t: 'Limitarea febrei: AVP, α-MSH, CRH, IL-10, antagonistul IL-1', slide: 'Febra (LP), slide 9', q: { 11: ['4:0', '4:1'] }, on: from(5),
      body: 'În cursul reacției febrile creierul eliberează arginin-vasopresină (AVP), hormonul stimulator al α-melanocitelor (α-MSH) și hormonul eliberator de corticotropină (CRH). Apare și un feedback negativ prin citokine antiinflamatorii, IL-10 și antagonistul receptorului IL-1, care atenuează răspunsul febril.' },
    asp: { t: 'Aspirina blochează COX: nu se mai face PGE2', slide: 'Febra (LP)', q: { 11: ['4:2'] }, on: at(6),
      body: 'Acidul acetilsalicilic inhibă ciclooxigenazele 1 și 2, deci blochează sinteza de PGE2: este un antipiretic foarte eficient (în desen, enzima galbenă din celula endotelială este COX-2).' },
    ch: { t: 'Valoarea de referință și temperatura centrală', slide: 'Cursul 3, slide 3, 57, 63–64',
      body: 'Linia punctată e pragul de reglare (set point) al centrului termoreglator, normal 37,1°C ± 0,6°C; linia roșie e temperatura centrală reală. Faza I (creștere): pragul a urcat, temperatura reală e sub el și urcă. Faza II (stare): echilibru la nivel superior. Faza III (revenire): pragul a coborât, temperatura reală e peste el și scade.' },
    l41: { t: 'Febra nu urcă de obicei peste 41 °C', slide: 'Cursul 3, slide 57', on: from(4), body: 'Febra reglată de hipotalamus de obicei nu se ridică peste 41°C (mecanism de siguranță).' },
    x1: { t: 'Cum ridică PGE2 pragul (detaliu modern)', on: from(3), ctx: 'Nakamura K. Central circuitries for body temperature regulation and fever. Am J Physiol Regul Integr Comp Physiol 2011;301:R1207–R1228; Lazarus M et al. Nat Neurosci 2007;10:1131–1133',
      body: 'Endoteliul are receptori pentru IL-1 și TNF-α; activarea lor induce COX-2 și sinteza de PGE2. PGE2 se leagă de receptorii EP3 ai neuronilor din aria preoptică mediană; receptorul EP3 scade AMPc în acești neuroni, care încetinesc. Ei frânau în mod normal căile simpatice ale termogenezei și vasoconstricției; când frâna slăbește, organismul produce și păstrează căldură până la noul prag. Cursul rezumă pasul prin „via AMPc”.' },
  };
  const ROWS = [['ex', 1, 'Bacteriile Gram-negative, cu opsonine C3b'], ['fg', 2, 'Macrofagul cuprinde o bacterie cu pseudopode'], ['en', 3, 'Citokinele: IL-1 (trefoi), TNF-α (trimer), IL-6 (4 helixuri)'], ['ov', 4, 'OVLT: capilarul cu endoteliu fenestrat'], ['pg', 5, 'COX-2 (galben) și moleculele de PGE2'], ['am', 6, 'Neuronul preoptic cu receptorii EP3'], ['ch', 7, 'Graficul: valoarea de referință și temperatura']];
  const hit = a => a.w != null ? `<rect class="hit" x="${(+a.x).toFixed(1)}" y="${(+a.y).toFixed(1)}" width="${(+a.w).toFixed(1)}" height="${(+a.h).toFixed(1)}" rx="8"/>` : `<circle class="hit" cx="${a.cx}" cy="${a.cy}" r="${a.r}"/>`;
  const badge = (n, [x, y]) => `<g class="bdg-s"><circle cx="${(+x).toFixed(1)}" cy="${(+y).toFixed(1)}" r="8.6"/><text x="${(+x).toFixed(1)}" y="${(+y + 3.6).toFixed(1)}" text-anchor="middle" data-ui>${n}</text></g>`;

  FX.def('fever', {
    title: 'Febra: de la pirogen la termostatul hipotalamic',
    meta: 'Febra: pirogeni, OVLT, PGE2, fazele',
    qs: [11, 10],
    kind: 'mix',
    note: 'Trei scări în aceeași planșă, nu la aceeași scară: țesutul infectat (bacterii Gram-negative cu membrana externă și lipopolizaharid, opsonizate cu C3b și fagocitate de un macrofag), creierul în secțiune mediosagitală cu OVLT în lama terminală, deasupra chiasmei optice, și o lupă pe un capilar al OVLT, cu un neuron din aria preoptică. Vasul roșu rezumă drumul citokinelor prin circulație (venă, inimă, arteră). Citokinele sunt glife, nu structuri: IL-1 ca trefoi, TNF-α ca trimer, IL-6 ca mănunchi de patru helixuri. PGE2 e desenată ca formulă scheletică simplificată. În grafic, 37°C și limita de 41°C sunt din Cursul 3 (slide 3 și 57); înălțimea platoului (~39°C) și durata fazelor sunt ilustrative.',
    src: 'Febra (LP), slide 2–9; Cursul 3, slide 57–64',
    neutral: 0,
    ctl: { type: 'range', label: 'Faza', min: 0, max: 6, step: 1, init: 4, fmt: v => PH[v], play: { ms: 2400, label: 'Redă febra' }, peek: 'Compară cu normal' },
    initV: () => 4,
    hints: {
      predict: 'Alege o fază, bifează ce se întâmplă în ea, apoi apasă „Dezvăluie”.',
      explore: 'Mută faza. Apasă o piesă din desen sau un rând de mai jos: vezi textul din curs și punctul din barem.',
    },
    predict: { kind: 'pick', prompt: (S, lab) => `Faza: ${lab}. Ce se întâmplă acum?` },
    tour: [
      { v: 0, hl: [], parts: ['def', 'ch'], t: 'Trei niveluri, un singur proces',
        see: 'Jos-stânga: un țesut (1, 2). Vasul roșu (3) duce sângele spre creier. Sus: creierul tăiat pe linia mediană, cu OVLT în peretele anterior al ventriculului III (4), mărit în lupă: un capilar, endoteliul lui (5) și un neuron din aria preoptică (6). Jos-dreapta: graficul (7), cu valoarea de referință (punctat) și temperatura centrală. Acum totul e normal: amândouă la ~37°C.' },
      { v: 1, hl: ['ex'], parts: ['ex', 'op'], t: 'Pirogenul exogen',
        see: 'Bacterii Gram-negative (1) au pătruns în țesut. Franjurii de pe membrana lor externă sunt lipopolizaharidul (LPZ, endotoxina), cel mai puternic pirogen exogen. Punctele galbene sunt fragmentele de complement (C3b) care le opsonizează.' },
      { v: 1, hl: ['fg'], parts: ['fg'], t: 'Fagocitoza',
        see: 'Macrofagul (2) întinde pseudopode în jurul unei bacterii opsonizate; altă bacterie e deja închisă într-un fagozom.' },
      { v: 2, hl: ['en'], parts: ['en'], t: 'Pirogenii endogeni',
        see: 'Macrofagul activat eliberează citokine: IL-1, TNF-α și IL-6 (3). Ele intră în sânge și ajung în tot organismul, inclusiv în creier.' },
      { v: 3, hl: ['ov'], parts: ['ov'], t: 'OVLT: aici nu există barieră hematoencefalică',
        see: 'În OVLT (4), în lama terminală, capilarele au endoteliu fenestrat: citokinele din sânge ajung la celulele endoteliale și la aria preoptică vecină.' },
      { v: 3, hl: ['pg'], parts: ['pg', 'x1'], t: 'PGE2',
        see: 'În celula endotelială se activează ciclooxigenaza 2 (COX-2, enzima galbenă, 5), care transformă acidul arahidonic în PGE2. Moleculele de PGE2 difuzează spre neuronul preoptic.' },
      { v: 3, hl: ['am'], parts: ['am'], t: 'Pragul de reglare crește',
        see: 'PGE2 se leagă de receptorii neuronului preoptic (6). Pe calea AMPc, pragul de reglare al centrului termoreglator urcă: în grafic, linia punctată sare la ~39°C, dar temperatura reală e încă 37°C.' },
      { v: 4, hl: ['vc'], parts: ['vc', 'fr'], t: 'Faza de creștere: frig și frison',
        see: 'Pentru hipotalamus, 37°C e acum „prea rece”: pielea face vasoconstricție (senzație de frig) și mușchii produc frison. Temperatura centrală urcă spre noul prag.' },
      { v: 5, hl: ['vc'], parts: ['pl', 'lim'], t: 'Faza de stare',
        see: 'Temperatura a ajuns la noul prag: termogeneza și termoliza sunt din nou în echilibru, dar la un nivel mai înalt. Creierul începe să limiteze febra (AVP, α-MSH, CRH, IL-10, antagonistul IL-1).' },
      { v: 6, hl: ['vc'], parts: ['vd', 'asp'], t: 'Defervescența',
        see: 'Pragul revine la 37°C (cauza dispare sau un antipiretic, ca aspirina, blochează COX și sinteza de PGE2). Acum temperatura reală e „prea mare”: vasodilatație, senzație de căldură și sudorație abundentă, până la normal.' },
    ],
    parts: P,
    games: {
      order: {
        prompt: 'Pune în ordine pașii febrei, de la pirogen la creșterea temperaturii.',
        items: [
          { t: 'Pirogenul exogen (LPZ din peretele bacteriilor Gram-negative)', parts: ['ex'] },
          { t: 'Opsonizare (complement) și fagocitoză (macrofage)', parts: ['op', 'fg'] },
          { t: 'Eliberarea pirogenilor endogeni: IL-1, TNF-α, IL-6', parts: ['en'] },
          { t: 'OVLT și aria preoptică, fără barieră hematoencefalică', parts: ['ov'] },
          { t: 'Sinteza de PGE2 în endoteliu', parts: ['pg'] },
          { t: 'Calea AMPc: pragul de reglare crește', parts: ['am'] },
          { t: 'Vasoconstricție și frison: temperatura urcă', parts: ['vc', 'fr'] },
        ],
      },
    },
    now(S) { return `<b data-ui>${PH[S.v]}</b>`; },
    stage(o, H, S) {
      const uid = 'fx' + FX.n, U = x => x.replaceAll('__U__', uid), L = A.L, G = A.G;
      let s = `<div class="fvr" data-ph="${S.v}">`;
      s += `<svg class="iso-svg fv-svg an-svg" viewBox="0 0 ${A.W} ${A.H}" role="group" aria-label="Febra: bacterii și un macrofag în țesut, vasul spre creier, creierul în secțiune cu OVLT mărit într-o lupă și graficul valorii de referință și al temperaturii">`;
      s += `<defs>${U(A.defs)}</defs>`;
      s += U(L.brain) + L.callout + U(L.tissue) + `<g class="fv-bacs">${L.bacts}</g>` + `<g class="fv-mac">${L.mac}</g>` + `<g class="fv-out">${L.ckOut}</g>` + L.vessel + `<g class="fv-flow">${L.ckFlow}</g>` + U(L.lens);
      s += L.chartFrame + L.chart + `<g class="ch-mk"><path class="ch-cur" d=""/><circle class="ch-dsp" r="3.6"/><circle class="ch-dtc" r="4.2"/></g>`;
      const hs = A.hits, bd = A.badges;
      s += H.spart('ex', hs.bac.map(hit).join('') + badge(1, bd.bac));
      s += H.spart('fg', hit(hs.mac) + badge(2, bd.mac));
      s += H.spart('en', hit(hs.ck) + badge(3, bd.ck));
      s += H.spart('ov', hit(hs.ovlt) + hit(hs.endo) + badge(4, bd.ovlt));
      s += H.spart('pg', hit(hs.pge) + badge(5, bd.pge));
      s += H.spart('am', hit(hs.poa) + badge(6, bd.poa));
      s += H.spart('ch', hit(hs.chart) + badge(7, bd.chart));
      s += '</svg>';
      const cut = s.length;
      s += `<ul class="circ-rows fv-rows" aria-label="Pașii febrei">${ROWS.map(([id, b, dev]) => `<li><button type="button" class="fxp row" data-p="${id}"><span class="bdg" data-ui>${b}</span><span class="rt"><span class="rl">${H.lab('l' + id, P[id].t)}</span><span class="rd" data-ui>${dev}</span></span><span class="ar" aria-hidden="true"></span></button></li>`).join('')}</ul>`;
      s += `<div class="circ-sym"><span class="sl" data-ui>Fazele și reglarea</span>${['def', 'vc', 'fr', 'pl', 'vd', 'lim', 'asp', 'l41'].map(id => `<button type="button" class="fxp sym" data-p="${id}">${P[id].t}</button>`).join('')}<button type="button" class="fxp sym ctxs" data-p="x1">${P.x1.t}</button></div></div>`;
      return { view: s.slice(0, cut) + '</div>', legend: '<div class="fvr fv-leg circ">' + s.slice(cut) };
    },
    update(el, S) {
      const root = el.querySelector('.fvr'); if (!root) return;
      const v = Math.max(0, Math.min(6, Math.round(S.vv)));
      root.dataset.ph = v;
      const m = A.marks[v], G = A.G;
      const mk = el.querySelector('.ch-mk');
      if (mk) {
        mk.querySelector('.ch-cur').setAttribute('d', `M${m.x} ${G.y}V${G.y + G.h}`);
        const a = mk.querySelector('.ch-dsp'), b = mk.querySelector('.ch-dtc');
        a.setAttribute('cx', m.x); a.setAttribute('cy', m.sp); b.setAttribute('cx', m.x); b.setAttribute('cy', m.tc);
      }
      el.querySelectorAll('.fv-rows .row').forEach(b => { const on = FX.isOn(P[b.dataset.p], { v }); b.dataset.ch = on ? 1 : 0; b.querySelector('.ar').textContent = on ? '●' : '·'; });
      el.querySelectorAll('.fv-leg .sym').forEach(b => b.classList.toggle('lit', FX.isOn(P[b.dataset.p], { v })));
    },
    panel(S, H) {
      const ids = Object.keys(P).filter(id => !P[id].ctx && P[id].on && FX.isOn(P[id], S));
      return `<section class="fx-grp"><h4><span data-ui>${PH[S.v]}</span><small>Febra (LP), Cursul 3</small></h4><ol class="fx-chain">${ids.map(id => `<li>${H.node(id, 'heat')}</li>`).join('')}</ol></section>`;
    },
  });
})();
