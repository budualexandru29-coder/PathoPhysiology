/* ===== Î8: termogeneza și sursele ei =====
   Desenul vine din art/tgen.mjs (ART.tgen). Variabila: situația (repaus, efort, frig cu frison, frig cu țesut adipos brun,
   adaptarea lentă prin hormonii tiroidieni). Textele cu diapozitiv vin din LP (Termoreglarea, slide 5–8) și din Cursul 3 (slide 5–12, 25–29). */
(function () {
  const A = ART.tgen;
  const ST = ['Repaus', 'Efort fizic', 'Frig: frisonul', 'Frig: țesutul adipos brun', 'Adaptare lentă: hormonii tiroidieni'];
  const at = (...v) => S => v.includes(S.v);
  const LP = 'Termoreglarea (LP), slide 8';
  const C3 = n => 'Cursul 3, slide ' + n;
  const P = {
    def: { t: 'Termogeneza: producerea căldurii, în echilibru cu termoliza', slide: 'Termoreglarea (LP), slide 5–6; ' + C3(5), q: { 8: ['0:0', '0:1'] },
      body: 'Termogeneza este producerea căldurii în organism. Temperatura internă reprezintă un prag de echilibru între producerea de căldură (termogeneza) și pierderea de căldură (termoliza). Menținerea constantă a temperaturii este obligatorie pentru activitatea enzimatică intra- și extracelulară.' },
    met: { t: 'Metabolismul energetic celular: principala sursă', slide: LP + '; ' + C3(10), q: { 8: ['1:0', '1:1'] },
      body: 'Principala sursă a termogenezei este metabolismul energetic celular: producerea de căldură are loc în timpul reacțiilor chimice de oxido-reducere (redox). În desen, mitocondria cu criste și ciclul Krebs (cercul roșu) din matrice.' },
    ox: { t: '70% din energia eliberată prin fosforilare oxidativă', slide: LP + '; ' + C3(10), q: { 8: ['1:2', '1:3'] },
      body: 'Metabolismul energetic celular reprezintă 70% din energia eliberată prin fosforilare oxidativă; fosforilarea oxidativă eliberează energie sub formă de căldură. În desen, porțiunea mărită din membrana internă: complexele lanțului respirator (I albastru, III verde, IV violet) pompează protonii (portocalii) în spațiul intermembranar.' },
    gly: { t: 'Cu oxigen: de la 2 ATP (glicoliza) la 36 ATP (ciclul Krebs)', slide: C3(10),
      body: 'Oxigenul crește randamentul reacțiilor energogene de la 2 molecule de ATP (glicoliza anaerobă, în citosol) la 36 de molecule de ATP (ciclul Krebs, în mitocondrie). În desen, sus în stânga: glucoza (hexagonul galben) se desface în două molecule de piruvat, cu 2 ATP.' },
    nak: { t: 'ATP-aza Na⁺/K⁺ dependentă: a doua sursă', slide: LP + '; ' + C3(10), q: { 8: ['1:4', '1:5'] },
      body: 'Activitatea ATP-azei Na⁺/K⁺ dependente de la nivelul membranelor celulare este a doua sursă de energie necesară termogenezei: prin degradarea ATP-ului degajă căldură. În desen, pompa scoate 3 Na⁺ (albaștri) și introduce 2 K⁺ (violeți), consumând ATP (ATP → ADP + Pi).' },
    fr: { t: 'Mușchiul striat: contracția voluntară și frisonul', slide: C3(12) + '; ' + LP, q: { 8: ['2:0'] }, eff: 1, on: at(1, 2),
      body: 'La efort, musculatura scheletică devine preponderentă în generarea de căldură: 90% din termogeneză. Termogeneza musculară e controlată prin tonusul muscular: contracția voluntară (mișcări de „încălzire”), contracția involuntară (frisonul), rigiditatea musculară. Tremuratul e inițiat de impulsuri hipotalamice (slide 29).' },
    bat: { t: 'Țesutul adipos brun: termogeneza fără frison', slide: LP, q: { 8: ['2:1'] }, eff: 1, on: at(3),
      body: 'Efectorii termici care cresc producția de căldură: mușchiul striat (frisonul) și țesutul adipos brun (termogeneza fără frison). În desen, adipocitul brun: multe picături mici de lipide și foarte multe mitocondrii (de aici culoarea brună).' },
    sym: { t: 'Simpaticul: noradrenalina activează adipocitul brun', slide: C3('11, 25'), eff: 1, on: at(3),
      body: 'Adaptarea rapidă a termogenezei se face prin sistemul nervos simpatic și catecolamine (noradrenalina, adrenalina). Hipotalamusul posterior, centrul termogenezei, controlează simpaticul și crește metabolismul energetic celular. În desen, terminațiile simpatice (galbene) eliberează noradrenalina (puncte albastre) pe adipocit.' },
    adr: { t: 'Adaptarea rapidă: simpaticul și catecolaminele', slide: C3('11, 27'), eff: 1, on: at(2, 3),
      body: 'Termogeneza organelor interne e controlată hormonal, prin stimularea catabolismului: adaptarea rapidă prin simpatic și catecolamine (noradrenalina și adrenalina, din medulosuprarenală). În desen, glanda suprarenală pe rinichi.' },
    thy: { t: 'Adaptarea lentă: hormonii tiroidieni cresc metabolismul bazal', slide: C3('11, 27'), eff: 1, on: at(4),
      body: 'Adaptarea lentă se face prin hormonii tiroidieni, care cresc metabolismul bazal; tot lent acționează glucocorticoizii (cortizolul), prin efectele catabolice. În desen, glanda tiroidă; în toate celulele cresc mitocondriile și pompele Na⁺/K⁺ (căldura se intensifică peste tot).' },
    bars: { t: 'Repaus: organele interne 50–60% (ficatul peste 30%); efort: mușchii 90%', slide: C3('11–12'), eff: 1,
      body: 'În repaus, sursa principală de căldură e activitatea organelor interne: 50–60% din termogeneză, din care ficatul peste 30%. La efort, musculatura scheletică produce 90% din căldură.' },
    kc: { t: 'Câtă căldură: 60–70 kcal/h în repaus, 800–1000 kcal/h la efort', slide: C3(7),
      body: 'Căldura specifică a țesuturilor vii e de ~0,83 kcal/kg/°C: la un adult de 70 kg, ~58 kcal cresc temperatura cu 1°C. În repaus organismul consumă 60–70 kcal/oră, ceea ce ar crește teoretic temperatura cu ~1,2°C/oră; la efort, mușchii consumă 800–1000 kcal/oră, cu creșteri tranzitorii de 1–2°C pe oră. (Cursul scrie „calorii”; valorile sunt kilocalorii.)' },
    x1: { t: 'De la protoni la ATP și la căldură', ctx: 'Alberts B et al. Molecular Biology of the Cell, 6th ed., Garland Science 2015, cap. 14',
      body: 'Electronii din NADH trec prin complexele I, III și IV până la oxigen, care devine apă; energia lor pompează protoni din matrice în spațiul intermembranar. Protonii se întorc prin ATP-sintază (rotorul portocaliu, capul galben), care face ATP. Doar o parte din energie e prinsă în ATP; restul se pierde direct ca și căldură. Iar ATP-ul folosit (de pompe, de mușchi) devine și el, în final, căldură.' },
    x2: { t: 'UCP1: căldură fără ATP', ctx: 'Cannon B, Nedergaard J. Brown adipose tissue: function and physiological significance. Physiol Rev 2004;84:277–359',
      body: 'Mitocondriile adipocitului brun au o proteină specială, UCP1 (termogenina, verde-albastră), un canal prin care protonii se întorc în matrice ocolind ATP-sintaza: energia gradientului devine direct căldură. Noradrenalina, prin receptorii β3, pornește lipoliza, iar acizii grași activează UCP1. Țesutul adipos brun e important la nou-născut; adultul are puțin, mai ales în jurul gâtului și supraclavicular.' },
    x3: { t: 'Cât consumă pompa Na⁺/K⁺', ctx: 'Rolfe DFS, Brown GC. Cellular energy utilization and molecular origin of standard metabolic rate in mammals. Physiol Rev 1997;77:731–758',
      body: 'Pompa Na⁺/K⁺ consumă o parte mare din ATP-ul folosit în repaus: aproximativ 20–25% din metabolismul bazal, după estimări la mamifere. Tot acest ATP devine căldură.' },
  };
  const HITS = [['gly', 'gly', 1], ['met', 'mito', 2], ['ox', 'etc', 3], ['x1', 'asyn', 4], ['nak', 'nak', 5], ['x3', 'grad', 6], ['fr', 'mus', 7], ['bat', 'bat', 8], ['sym', 'sym', 9], ['def', 'bal', 10], ['bars', 'bars', 11], ['thy', 'thy', 12], ['adr', 'adr', 13]];
  const DEV = { gly: 'Glucoza și piruvatul, în citosol', met: 'Mitocondria', ox: 'Membrana internă, mărită', x1: 'ATP-sintaza', nak: 'Pompele Na⁺/K⁺', x3: 'Na⁺ afară, K⁺ înăuntru', fr: 'Fibrele musculare și nervul motor', bat: 'Adipocitul brun', sym: 'Terminațiile simpatice', def: 'Balanța', bars: 'Barele repaus și efort', thy: 'Tiroida', adr: 'Suprarenala pe rinichi' };
  const hit = a => a.w != null ? `<rect class="hit" x="${(+a.x).toFixed(1)}" y="${(+a.y).toFixed(1)}" width="${(+a.w).toFixed(1)}" height="${(+a.h).toFixed(1)}" rx="8"/>` : `<circle class="hit" cx="${(+a.cx).toFixed(1)}" cy="${(+a.cy).toFixed(1)}" r="${a.r}"/>`;
  const badge = (n, [x, y]) => `<g class="bdg-s"><circle cx="${x}" cy="${y}" r="8.6"/><text x="${x}" y="${y + 3.6}" text-anchor="middle" data-ui>${n}</text></g>`;

  FX.def('tgen', {
    title: 'Termogeneza: de unde vine căldura',
    meta: 'Termogeneza: sursele celulare, efectorii și controlul',
    qs: [8],
    kind: 'mix',
    note: 'Sus, la nivel de celulă: o mitocondrie cu o porțiune din membrana internă mărită (lanțul respirator și ATP-sintaza) și membrana celulară cu pompele Na⁺/K⁺. Jos: fibre musculare scheletice cu nervul motor, un adipocit brun cu terminații simpatice, balanța termogeneză–termoliză, sursele căldurii în repaus și la efort, tiroida și suprarenala. Moleculele și organitele sunt mărite și simplificate; aura portocalie arată unde se produce mai multă căldură.',
    src: 'Termoreglarea (LP), slide 5–8; Cursul 3 (Termoreglarea), slide 5–12, 25–29',
    neutral: 0,
    ctl: { type: 'range', label: 'Situația', min: 0, max: 4, step: 1, init: 0, fmt: v => ST[v], play: { ms: 2600, label: 'Treci prin situații' }, peek: 'Compară cu repausul' },
    initV: () => 0,
    hints: {
      predict: 'Alege o situație, bifează ce crezi că produce căldura, apoi apasă „Dezvăluie”.',
      explore: 'Mută situația. Apasă o moleculă, un organit, o celulă sau o glandă ori un rând de mai jos: vezi textul din LP și punctul din barem.',
    },
    predict: { kind: 'pick', prompt: (S, lab) => `${lab}: ce produce căldura?` },
    tour: [
      { v: 0, parts: ['def'], t: 'Termogeneza și termoliza',
        see: 'Balanța (10): temperatura internă e un prag de echilibru între producerea și pierderea de căldură. Figura arată de unde vine căldura.' },
      { v: 0, parts: ['gly', 'met', 'ox', 'x1'], t: 'Sursa 1: metabolismul energetic celular',
        see: 'Glucoza se desface în citosol (1), apoi mitocondria (2) arde produșii ei. În membrana internă (3), lanțul respirator pompează protoni; ATP-sintaza (4) face ATP din întoarcerea lor. O parte mare din energie se degajă ca și căldură.' },
      { v: 0, parts: ['nak', 'x3'], t: 'Sursa 2: pompa Na⁺/K⁺',
        see: 'Pompele din membrana celulară (5) scot Na⁺ și bagă K⁺ împotriva gradientului (6), consumând ATP; energia devine căldură.' },
      { v: 0, parts: ['bars', 'kc'], t: 'În repaus: organele interne',
        see: 'În repaus, organele interne produc 50–60% din căldură, iar ficatul singur peste 30% (11).' },
      { v: 1, parts: ['fr'], t: 'La efort: mușchii',
        see: 'La efort, mușchii scheletici (7) produc 90% din căldură.' },
      { v: 2, parts: ['fr', 'adr'], t: 'La frig: frisonul',
        see: 'Frigul pornește frisonul: contracții involuntare, rapide, ale mușchilor (7). Simpaticul și catecolaminele (13) cresc rapid metabolismul.' },
      { v: 3, parts: ['bat', 'sym', 'x2'], t: 'La frig: țesutul adipos brun',
        see: 'Terminațiile simpatice (9) eliberează noradrenalină pe adipocitul brun (8). Mitocondriile lui lasă protonii să se întoarcă prin UCP1, fără ATP: energia devine direct căldură, fără frison.' },
      { v: 4, parts: ['thy'], t: 'Adaptarea lentă',
        see: 'Hormonii tiroidieni (12) cresc metabolismul bazal în toate celulele: mai multe mitocondrii active, mai multe pompe Na⁺/K⁺, mai multă căldură.' },
    ],
    parts: P,
    games: {
      order: {
        prompt: 'Pune în ordine drumul energiei, de la glucoză la căldură.',
        items: [
          { t: 'Glucoza se desface în citosol (glicoliza): 2 ATP', parts: ['gly'] },
          { t: 'Ciclul Krebs, în mitocondrie: NADH', parts: ['met'] },
          { t: 'Lanțul respirator pompează protoni; o parte din energie devine căldură', parts: ['ox'] },
          { t: 'ATP-sintaza face ATP', parts: ['x1'] },
          { t: 'Pompa Na⁺/K⁺ folosește ATP-ul: încă o dată căldură', parts: ['nak'] },
        ],
      },
      sort: {
        prompt: 'Sursă, efector sau control?',
        bins: [{ id: 's', t: 'Sursele termogenezei', sub: 'LP, slide 8', short: 'Surse', tone: 'heat' }, { id: 'e', t: 'Efectorii', sub: 'LP, slide 8', short: 'Efectori' }, { id: 'c', t: 'Controlul', sub: 'Cursul 3, slide 11', short: 'Control' }],
        items: [{ id: 'met', bin: 's' }, { id: 'ox', bin: 's' }, { id: 'nak', bin: 's' }, { id: 'fr', bin: 'e' }, { id: 'bat', bin: 'e' }, { id: 'adr', bin: 'c' }, { id: 'thy', bin: 'c' }],
      },
    },
    now(S) { return `<b data-ui>${ST[S.v]}</b>`; },
    stage(o, H, S) {
      const uid = 'fx' + FX.n, U = x => x.replaceAll('__U__', uid), L = A.L, hs = A.hits, bd = A.badges;
      let s = `<div class="tgx" data-st="${S.v}">`;
      s += `<svg class="iso-svg tg-svg an-svg" viewBox="0 0 ${A.W} ${A.H}" role="group" aria-label="Mitocondria cu lanțul respirator, pompele Na⁺/K⁺, fibrele musculare, adipocitul brun, balanța termogeneză–termoliză și sursele de căldură">`;
      s += `<defs>${U(A.defs)}</defs>`;
      s += L.frames + U(L.panelA) + U(L.panelB) + U(L.panelC) + L.panelD;
      HITS.forEach(([id, hk, n]) => { s += H.spart(id, hit(hs[hk]) + badge(n, bd[hk])); });
      s += '</svg>';
      const cut = s.length;
      s += `<ul class="circ-rows fv-rows tg-rows" aria-label="Ce arată figura">${HITS.map(([id, , n]) => `<li><button type="button" class="fxp row" data-p="${id}"><span class="bdg" data-ui>${n}</span><span class="rt"><span class="rl">${H.lab('l' + id, P[id].t)}</span><span class="rd" data-ui>${DEV[id]}</span></span><span class="ar" aria-hidden="true"></span></button></li>`).join('')}</ul>`;
      s += `<div class="circ-sym"><span class="sl" data-ui>Din curs</span><button type="button" class="fxp sym" data-p="kc">${P.kc.t}</button><button type="button" class="fxp sym ctxs" data-p="x2">${P.x2.t}</button></div></div>`;
      return { view: s.slice(0, cut) + '</div>', legend: '<div class="tgx tg-leg circ" data-st="' + S.v + '">' + s.slice(cut) };
    },
    update(el, S) {
      const v = Math.max(0, Math.min(4, Math.round(S.vv)));
      el.querySelectorAll('.tgx').forEach(r => { r.dataset.st = v; });
      el.querySelectorAll('.tg-rows .row').forEach(b => { const on = FX.isOn(P[b.dataset.p], { v }); b.dataset.ch = on ? 1 : 0; b.querySelector('.ar').textContent = on ? '●' : '·'; });
      el.querySelectorAll('.tg-leg .sym').forEach(b => b.classList.toggle('lit', FX.isOn(P[b.dataset.p], { v })));
    },
    panel(S, H) {
      const li = ids => ids.map(id => `<li>${H.node(id, 'heat')}</li>`).join('');
      const extra = { 0: ['bars', 'kc'], 1: ['fr', 'bars'], 2: ['fr', 'adr'], 3: ['bat', 'sym', 'adr', 'x2'], 4: ['thy'] }[S.v];
      return `<section class="fx-grp"><h4><span data-ui>Sursele, în orice situație</span><small>${LP}</small></h4><ol class="fx-chain">${li(['def', 'met', 'ox', 'nak'])}</ol></section>`
        + `<section class="fx-grp"><h4><span data-ui>${ST[S.v]}</span><small>${C3('11–12, 25–29')}</small></h4><ol class="fx-chain">${li(extra)}</ol></section>`;
    },
  });
})();
