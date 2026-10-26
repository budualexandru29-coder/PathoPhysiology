/* ===== Î18, Î19 și Î20: angina streptococică (febra, mecanismul, complicațiile) și comparația cu angina virală =====
   Desenul vine din art/strep.mjs (ART.strep). Variabila: etapa anginei streptococice (0–4) sau angina virală (5).
   Textele cu diapozitiv vin din LP (Febra, slide 22–32) și din Cursul 3; restul sunt explicații suplimentare, cu sursa. */
(function () {
  const A = ART.strep;
  const ST = ['Faringe normal', 'Contaminarea aerogenă și aderența', 'Multiplicare, toxine: inflamația locală', 'Exsudat purulent, adenopatie, febră', 'Complicațiile', 'Angina virală (comparație)'];
  const at = (...v) => S => v.includes(S.v);
  const B = S => S.v >= 1 && S.v <= 4;
  const WALKER = 'Walker MJ et al. Disease manifestations and pathogenic mechanisms of group A Streptococcus. Clin Microbiol Rev 2014;27:264–301';
  const P = {
    ag: { t: 'Streptococcus pyogenes, streptococul β-hemolitic de grup A', slide: 'Febra (LP), slide 22, 29', q: { 18: ['0:0'], 19: ['0:0'] }, on: B,
      body: 'Faringita / angina streptococică este o infecție bacteriană cauzată de Streptococcus pyogenes (streptococul de grup A). Evidențierea streptococului β-hemolitic de grup A se face din exudatul faringian sau prin test rapid (RADT).' },
    tr: { t: 'Contaminare aerogenă (picături Pflügge)', slide: 'Febra (LP), slide 29', q: { 19: ['0:1'] }, eff: 1, on: at(1),
      body: 'Transmiterea se face pe cale aerogenă, prin picături Pflügge. Anamneza: contact direct cu un caz confirmat de scarlatină.' },
    adh: { t: 'Aderența la epiteliul amigdalian, multiplicarea', slide: 'Febra (LP), slide 22–25', q: { 19: ['1:0'] }, eff: 1, on: at(1, 2, 3, 4),
      body: 'Streptococul aderă la epiteliul faringo-amigdalian și se multiplică. În lupă: lanțuri de coci lipite de celulele superficiale ale criptei amigdaliene.' },
    tox: { t: 'Exotoxine și enzime streptococice', slide: 'Febra (LP), slide 26', q: { 18: ['1:0'], 19: ['1:1'] }, eff: 1, on: at(2, 3, 4),
      body: 'Pirogenii exogeni sunt exotoxinele streptococice. În desen, glifele galbene care difuzează în țesut.' },
    inf: { t: 'Eritem intens: hiperemie, hipertrofie amigdaliană', slide: 'Febra (LP), slide 29–30', q: { 19: ['1:2', '1:3'], 20: ['3:1'] }, eff: 1, on: at(2, 3, 4),
      body: 'Inflamație acută locală. Examen obiectiv: hipertrofie amigdaliană, hiperemie amigdaliană cu depozite purulente. În angina bacteriană eritemul este intens (în cea virală, discret).' },
    exu: { t: 'Depozite purulente (exsudat) pe amigdale', slide: 'Febra (LP), slide 29', q: { 19: ['1:4'] }, eff: 1, on: at(3, 4),
      body: 'Hiperemie amigdaliană cu depozite purulente. În lupă, puroiul din criptă: neutrofile, bacterii și celule epiteliale descuamate.' },
    op: { t: 'Opsonizate de complement, fagocitate de macrofage', slide: 'Febra (LP), slide 26', q: { 18: ['1:1', '1:2', '1:3'] }, eff: 1, on: at(3, 4),
      body: 'Exotoxinele (pirogenii exogeni) sunt opsonizate de complement și fagocitate de macrofage, inclusiv celulele Kupffer, care eliberează citokine. În desen, macrofagul cu fagozom și fragmentele C3b (galbene).' },
    ck: { t: 'Pirogenii endogeni: IL, IFN, TNF', slide: 'Febra (LP), slide 26', q: { 18: ['2:0', '2:1', '2:2'] }, eff: 1, on: at(3, 4),
      body: 'Pirogenii endogeni: interleukinele IL-1α, IL-1β, IL-6, IL-8, IL-11; interferonul IFN-α2, IFN-γ; factorul de necroză tumorală TNF-α și TNF-β. Trec în capilar și ajung la hipotalamus.' },
    hyp: { t: 'Hipotalamusul: aria preoptică și OVLT, PGE2', slide: 'Febra (LP), slide 26; Cursul 3, slide 60', q: { 18: ['3:0', '3:1', '3:2'] }, on: at(3, 4),
      body: 'Citokinele acționează în aria preoptică și în organul vascular al laminei terminale (OVLT); prin PGE2 crește valoarea de referință a termostatului hipotalamic (mecanismul e desenat în figura febrei, la Î11).' },
    term: { t: 'Termogeneza: vasoconstricție, frison, ↑ metabolism, glicoliză, tahicardie', slide: 'Febra (LP), slide 26', q: { 18: ['4:0', '4:1', '4:2', '4:3', '4:4'] }, on: at(3, 4),
      body: 'Termogeneza se realizează prin vasoconstricție periferică, frison, intensificarea metabolismului bazal, stimularea glicolizei, tahicardie și creșterea debitului cardiac: rezultă febra.' },
    fev: { t: 'Debut brusc (într-o zi), febră înaltă', slide: 'Febra (LP), slide 29–30', q: { 19: ['2:0'], 20: ['0:1'] }, eff: 1, on: at(3, 4),
      body: 'Angina bacteriană are debut brusc, într-o zi; febra este înaltă. În grafic, curba roșie.' },
    ntf: { t: 'Neutrofilie', slide: 'Febra (LP), slide 29', q: { 19: ['2:1'], 20: ['5:0'] }, eff: 1, on: at(2, 3, 4),
      body: 'Hemoleucograma: neutrofilie, care sugerează infecția bacteriană. În lupă, neutrofilele ies din capilar și trec prin epiteliu spre criptă; în grafic, bara B.' },
    ln: { t: 'Adenopatie laterocervicală dureroasă', slide: 'Febra (LP), slide 29–30', q: { 19: ['1:5'], 20: ['2:1'] }, eff: 1, on: at(2, 3, 4),
      body: 'Examen obiectiv: tumefierea ganglionilor laterocervicali. În angina bacteriană adenopatia regională este dureroasă. În desen, ganglionul jugulodigastric (sub unghiul mandibulei) și lanțul de-a lungul marginii anterioare a mușchiului sternocleidomastoidian, măriți și hiperemici.' },
    rh: { t: 'Rinoreea mucoasă precede debutul febrei', slide: 'Febra (LP), slide 30', q: { 20: ['1:1'] }, eff: 1, on: at(1, 2, 3, 4),
      body: 'În angina bacteriană rinoreea este mucoasă și precede debutul febrei. În grafic, bara galbenă începe înaintea liniei punctate (debutul febrei).' },
    ot: { t: 'Otita medie supurată', slide: 'Febra (LP), slide 31', q: { 19: ['3:0'] }, eff: 1, on: at(4),
      body: 'Complicații locale imediate: otită medie supurată, limfadenită, abces periamigdalian, sinuzită. Urechea medie comunică cu nazofaringele prin trompa auditivă (desenată de la faringe la ureche).' },
    si: { t: 'Sinuzita', slide: 'Febra (LP), slide 31', q: { 19: ['3:0'] }, eff: 1, on: at(4),
      body: 'Complicații locale imediate: otită medie supurată, limfadenită, abces periamigdalian, sinuzită. În desen, sinusul maxilar plin de secreție.' },
    ab: { t: 'Abcesul periamigdalian, limfadenita', slide: 'Febra (LP), slide 31', q: { 19: ['3:0'] }, eff: 1, on: at(4),
      body: 'Complicații locale imediate: otită medie supurată, limfadenită, abces periamigdalian, sinuzită. În gură: vălul palatin bombat deasupra amigdalei drepte și uvula împinsă spre partea opusă; ganglionul jugulodigastric are o colecție purulentă.' },
    raa: { t: 'Reumatismul articular acut', slide: 'Febra (LP), slide 31', q: { 19: ['3:1'] }, eff: 1, on: at(4),
      body: 'Complicații la distanță: reumatism articular acut și glomerulonefrită post-streptococică. În desen, inima și o articulație mare (genunchiul), cu sinoviala inflamată.' },
    gn: { t: 'Glomerulonefrita post-streptococică', slide: 'Febra (LP), slide 31', q: { 19: ['3:2'] }, eff: 1, on: at(4),
      body: 'Complicațiile la distanță: reumatism articular acut și glomerulonefrită post-streptococică.' },
    cb: { t: 'Complicații din slide la angina bacteriană: afte, hepato-splenomegalie', slide: 'Febra (LP), slide 30', q: { 20: ['4:1'] }, on: at(1, 2, 3, 4),
      body: 'Așa apar în tabelul de diagnostic diferențial din slide 30, în coloana anginei bacteriene. Scrie la examen varianta din slide.' },
    vv: { t: 'Angina virală: virusul infectează epiteliul', slide: 'Febra (LP), slide 23', eff: 1, on: at(5),
      body: 'Faringita virală este cea mai comună (70–90%): rinovirus, adenovirus, virus gripal, virusul Epstein–Barr (mononucleoza), coronavirus, HSV, Coxsackie (herpangina). În lupă: celule epiteliale balonizate, virioni (verzi) și mai multe limfocite; nu există puroi.' },
    erv: { t: 'Eritem discret', slide: 'Febra (LP), slide 30', q: { 20: ['3:0'] }, eff: 1, on: at(5),
      body: 'În angina virală eritemul este discret (în cea bacteriană, intens); amigdalele nu au depozite purulente.' },
    fevv: { t: 'Debut progresiv', slide: 'Febra (LP), slide 30', q: { 20: ['0:0'] }, eff: 1, on: at(5),
      body: 'Angina virală are debut progresiv. În grafic, curba albastră urcă în câteva zile.' },
    rhv: { t: 'Rinoree seroasă (mai rar mucoasă), simultan cu febra', slide: 'Febra (LP), slide 30', q: { 20: ['1:0'] }, eff: 1, on: at(5),
      body: 'În angina virală rinoreea este seroasă, mai rar mucoasă, și debutează simultan cu febra.' },
    lnv: { t: 'Adenopatie regională nedureroasă', slide: 'Febra (LP), slide 30', q: { 20: ['2:0'] }, eff: 1, on: at(5),
      body: 'În angina virală adenopatia regională este nedureroasă: ganglionii sunt ușor măriți, fără hiperemie.' },
    cv: { t: 'Complicații la angina virală: otită, sinuzită', slide: 'Febra (LP), slide 30', q: { 20: ['4:0'] }, on: at(5),
      body: 'Complicațiile anginei virale, conform slide-ului 30: otită, sinuzită.' },
    lyv: { t: 'Limfocitoză', slide: 'Febra (LP)', q: { 20: ['5:0'] }, eff: 1, on: at(5),
      body: 'Hemoleucograma: leucocitoză cu limfocitoză în infecția virală (neutrofilie în cea bacteriană). În grafic, bara V.' },
    pet: { t: 'Peteșii pe vălul palatin', ctx: 'Shulman ST et al. Clinical practice guideline for the diagnosis and management of group A streptococcal pharyngitis: 2012 update by the IDSA. Clin Infect Dis 2012;55:e86–e102', on: at(2, 3, 4),
      body: 'Punctele roșii-închis de pe palatul moale apar des în faringita streptococică. Sunt un indiciu, nu o dovadă: diagnosticul se confirmă prin test rapid sau cultură din exudatul faringian.' },
    x1: { t: 'Cum aderă și cum scapă streptococul', ctx: WALKER,
      body: 'Proteina M, fibrilele de pe suprafața cocilor, și acidul lipoteicoic leagă fibronectina de pe celulele epiteliale: așa aderă lanțurile. Capsula de acid hialuronic (haloul pal din jurul lanțului) și proteina M împiedică fagocitoza. Cocii au ~1 µm; în lupă sunt desenați de aproximativ trei ori mai mari, ca să se vadă.' },
    x2: { t: 'Toxinele și enzimele streptococului', ctx: WALKER,
      body: 'Exotoxinele pirogene (SpeA, SpeC) sunt superantigene: activează nespecific multe limfocite T și cresc mult citokinele (de aici și erupția din scarlatină). Streptolizinele O și S fac pori în membrane; anticorpii anti-streptolizină O (ASLO) arată o infecție recentă. Streptokinaza, hialuronidaza și DNazele ajută răspândirea în țesut.' },
    x3: { t: 'De ce apar reumatismul și glomerulonefrita', ctx: 'Carapetis JR et al. Acute rheumatic fever and rheumatic heart disease. Nat Rev Dis Primers 2016;2:15084; Rodriguez-Iturbe B, Batsford S. Pathogenesis of poststreptococcal glomerulonephritis a century after Clemens von Pirquet. Kidney Int 2007;71:1094–1104',
      body: 'Sunt complicații imunologice, care apar la câteva săptămâni după angină. În reumatismul articular acut, anticorpii și limfocitele T îndreptate contra proteinei M recunosc și proteine proprii (miozina cardiacă, valvele): mimetism molecular. În glomerulonefrita post-streptococică, complexe imune cu antigene streptococice se depun în glomerul (hipersensibilitate de tip III).' },
    x4: { t: 'Amigdala palatină și scara lupei', ctx: 'Mescher AL. Junqueira’s Basic Histology, 16th ed., McGraw-Hill 2021, cap. 14',
      body: 'Amigdala palatină e acoperită de epiteliu pavimentos stratificat necheratinizat, care pătrunde în adâncime și formează cripte. Epiteliul criptelor e subțire și infiltrat de limfocite; sub el sunt foliculi limfoizi cu centru germinativ. Lupa e la ~1,6 px/µm; bacteriile, toxinele și virionii sunt mărite.' },
    x5: { t: 'Graficul debutului', ctx: 'construit pe criteriile din LP, slide 29–30',
      body: 'Curbele sunt schematice: arată doar diferențele din slide (debut brusc față de progresiv, rinoree înaintea febrei față de odată cu ea). Barele de leucocite sunt exemple de proporții: neutrofile multe (B), limfocite multe (V).' },
  };
  const HITS = [
    ['inf', 'ton', 1, 'b'], ['erv', 'phx', 1, 'v'], ['pet', 'pet', 2, 'b'], ['adh', 'adh', 3, 'b'], ['vv', 'adh', 3, 'v'], ['tox', 'tox', 4, 'b'], ['ntf', 'ntw', 5, 'b'], ['exu', 'pus', 6, 'b'], ['op', 'mac', 7, 'b'], ['ck', 'cap', 8, 'b'],
    ['ln', 'ln', 9, 'b'], ['lnv', 'ln', 9, 'v'], ['rh', 'rh', 10, 'b'], ['rhv', 'rh', 10, 'v'], ['tr', 'drops', 11, 'b'], ['ot', 'ear', 12, 'b'], ['si', 'sin', 13, 'b'], ['ab', 'abs', 14, 'b'], ['raa', 'raa', 15, 'b'], ['gn', 'gn', 16, 'b'], ['fev', 'chart', 17, 'b'], ['fevv', 'chart', 17, 'v'],
  ];
  const DEV = { inf: 'Amigdalele și mucoasa, în gură', erv: 'Mucoasa, în gură', pet: 'Punctele de pe vălul palatin', adh: 'Lanțurile de coci de pe epiteliu', vv: 'Celulele balonizate și virionii', tox: 'Glifele galbene din țesut', ntf: 'Neutrofilele din epiteliu', exu: 'Puroiul din criptă', op: 'Macrofagul cu fagozom', ck: 'Capilarul cu citokine', ln: 'Ganglionii de sub unghiul mandibulei', lnv: 'Ganglionii de sub unghiul mandibulei', rh: 'Secreția din nară', rhv: 'Secreția din nară', tr: 'Picăturile din aer', ot: 'Urechea medie', si: 'Sinusul maxilar', ab: 'Lângă amigdală și vălul bombat', raa: 'Inima și genunchiul', gn: 'Rinichiul', fev: 'Graficul debutului', fevv: 'Graficul debutului' };
  const hit = a => a.w != null ? `<rect class="hit" x="${(+a.x).toFixed(1)}" y="${(+a.y).toFixed(1)}" width="${(+a.w).toFixed(1)}" height="${(+a.h).toFixed(1)}" rx="8"/>` : `<circle class="hit" cx="${(+a.cx).toFixed(1)}" cy="${(+a.cy).toFixed(1)}" r="${a.r}"/>`;
  const badge = (n, [x, y]) => `<g class="bdg-s"><circle cx="${x}" cy="${y}" r="8.6"/><text x="${x}" y="${y + 3.6}" text-anchor="middle" data-ui>${n}</text></g>`;

  FX.def('strep', {
    title: 'Angina streptococică: amigdala, ganglionii și febra',
    meta: 'Angina streptococică și diagnosticul diferențial cu angina virală',
    qs: [19, 18, 20],
    kind: 'mix',
    note: 'Sus, orofaringele văzut prin gura deschisă și o lupă pe o criptă a amigdalei drepte (~1,6 px/µm; bacteriile, toxinele și virionii sunt mărite). Jos, capul din profil cu ganglionii cervicali, sinusul maxilar, urechea medie și amigdala proiectate; complicațiile la distanță; graficul debutului, cu febra, rinoreea și formula leucocitară (curbe schematice, după criteriile din slide 29–30). Cursorul trece prin etapele anginei streptococice; ultima valoare arată angina virală, pentru comparație.',
    src: 'Febra (LP), slide 22–32; Cursul 3 (Termoreglarea), slide 58–60',
    neutral: 0,
    ctl: { type: 'range', label: 'Etapa', min: 0, max: 5, step: 1, init: 3, fmt: v => ST[v], play: { ms: 2600, label: 'Redă angina' }, peek: 'Compară cu faringele normal' },
    initV: () => 3,
    hints: {
      predict: 'Alege o etapă, bifează ce crezi că se vede, apoi apasă „Dezvăluie”.',
      explore: 'Mută cursorul. Apasă amigdala, o celulă din lupă, un ganglion sau graficul ori un rând de mai jos: vezi textul din LP și punctul din barem.',
    },
    predict: { kind: 'pick', prompt: (S, lab) => `${lab}: ce se vede?` },
    tour: [
      { v: 0, parts: ['x4'], t: 'Un faringe normal',
        see: 'Prin gura deschisă: palatul, vălul cu uvula, pilierii anteriori și posteriori, între ei amigdalele palatine, în spate peretele faringelui, jos limba. Lupa arată o criptă a amigdalei: epiteliul pavimentos stratificat, foliculi limfoizi, un capilar și un macrofag.' },
      { v: 1, parts: ['ag', 'tr', 'adh', 'x1'], t: 'Contaminarea și aderența',
        see: 'Picăturile Pflügge (11) aduc Streptococcus pyogenes. Lanțurile de coci (3) aderă de celulele superficiale ale criptei. Rinoreea mucoasă (10) apare încă de acum, înaintea febrei.' },
      { v: 2, parts: ['tox', 'inf', 'ntf', 'pet', 'x2'], t: 'Multiplicarea, toxinele, inflamația',
        see: 'Bacteriile se înmulțesc și eliberează exotoxine (4). Mucoasa se înroșește intens, amigdalele se măresc (1), apar peteșii pe văl (2). Capilarul se dilată, neutrofilele (5) ies din el și trec prin epiteliu spre criptă.' },
      { v: 3, parts: ['exu', 'op', 'ck', 'ln'], t: 'Exsudatul, adenopatia, citokinele',
        see: 'Pe amigdale apar depozite purulente; în criptă, puroiul (6): neutrofile, bacterii, celule descuamate. Macrofagul (7) fagocitează bacterii opsonizate de complement și eliberează IL-1, TNF-α, IL-6 în capilar (8). Ganglionii laterocervicali (9) sunt măriți și dureroși.' },
      { v: 3, parts: ['hyp', 'term', 'fev'], t: 'Febra',
        see: 'Pirogenii endogeni ajung la aria preoptică și OVLT; PGE2 crește valoarea de referință; urmează termogeneza. În grafic (17), febra urcă brusc, într-o zi, până la valori înalte.' },
      { v: 4, parts: ['ot', 'si', 'ab', 'raa', 'gn', 'x3'], t: 'Complicațiile',
        see: 'Locale: otită medie supurată (12), sinuzită (13), abces periamigdalian și limfadenită (14); în gură, vălul bombat împinge uvula spre partea opusă. La distanță (15, 16): reumatism articular acut și glomerulonefrită post-streptococică.' },
      { v: 5, parts: ['vv', 'erv', 'fevv', 'rhv', 'lnv', 'lyv'], t: 'Angina virală',
        see: 'Eritem discret, fără depozite purulente (1). În lupă, celule epiteliale balonizate și virioni, fără puroi (3). Rinoreea e seroasă (10) și începe odată cu febra; febra urcă progresiv (17); ganglionii sunt nedureroși (9); limfocitoză.' },
    ],
    parts: P,
    games: {
      order: {
        prompt: 'Pune în ordine mecanismul anginei streptococice (LP, slide 22–31).',
        items: [
          { t: 'Contaminare aerogenă, prin picături Pflügge', parts: ['tr'] },
          { t: 'Aderența streptococului la epiteliul amigdalian și multiplicarea', parts: ['adh'] },
          { t: 'Exotoxine și enzime streptococice', parts: ['tox'] },
          { t: 'Inflamația acută locală: hiperemie, hipertrofie amigdaliană', parts: ['inf'] },
          { t: 'Depozite purulente, adenopatie laterocervicală dureroasă', parts: ['exu', 'ln'] },
          { t: 'Febră înaltă, neutrofilie', parts: ['fev', 'ntf'] },
          { t: 'Complicații locale și la distanță', parts: ['ot', 'raa', 'gn'] },
        ],
      },
      sort: {
        prompt: 'Așază fiecare caracteristică la angina căreia îi aparține (LP, slide 30).',
        bins: [{ id: 'b', t: 'Angina bacteriană', sub: 'streptococică', short: 'Bacteriană', tone: 'heat' }, { id: 'v', t: 'Angina virală', sub: 'cea mai frecventă', short: 'Virală' }],
        items: [{ id: 'fev', bin: 'b' }, { id: 'fevv', bin: 'v' }, { id: 'rh', bin: 'b' }, { id: 'rhv', bin: 'v' }, { id: 'ln', bin: 'b' }, { id: 'lnv', bin: 'v' }, { id: 'inf', bin: 'b' }, { id: 'erv', bin: 'v' }, { id: 'cb', bin: 'b' }, { id: 'cv', bin: 'v' }, { id: 'ntf', bin: 'b' }, { id: 'lyv', bin: 'v' }],
      },
    },
    now(S) { return `<b data-ui>${ST[S.v]}</b>`; },
    stage(o, H, S) {
      const uid = 'fx' + FX.n, U = x => x.replaceAll('__U__', uid), L = A.L, hs = A.hits, bd = A.badges;
      let s = `<div class="spx" data-st="${S.v}">`;
      s += `<svg class="iso-svg sp-svg an-svg" viewBox="0 0 ${A.W} ${A.H}" role="group" aria-label="Orofaringele prin gura deschisă, lupă pe cripta amigdaliană, capul din profil cu ganglionii, complicațiile la distanță și graficul debutului">`;
      s += `<defs>${U(A.defs)}</defs>`;
      s += L.skin + U(L.mouth) + L.lips + L.callout + U(L.lens) + L.scaleBar + L.frames + U(L.head) + L.distTitle + U(L.dist) + L.chart;
      HITS.forEach(([id, hk, n, k]) => { s += `<g class="sp-only ${k}">${H.spart(id, hit(hs[hk]) + badge(n, bd[hk]))}</g>`; });
      s += '</svg>';
      const cut = s.length;
      s += `<ul class="circ-rows fv-rows sp-rows" aria-label="Ce arată figura">${HITS.map(([id, , n, k]) => `<li class="sp-only ${k}"><button type="button" class="fxp row" data-p="${id}"><span class="bdg" data-ui>${n}</span><span class="rt"><span class="rl">${H.lab('l' + id, P[id].t)}</span><span class="rd" data-ui>${DEV[id]}</span></span><span class="ar" aria-hidden="true"></span></button></li>`).join('')}</ul>`;
      s += `<div class="circ-sym"><span class="sl" data-ui>Din LP</span>${['ag', 'hyp', 'term', 'cb', 'cv', 'lyv'].map(id => `<button type="button" class="fxp sym" data-p="${id}">${P[id].t}</button>`).join('')}${['x1', 'x2', 'x3', 'x4', 'x5'].map(id => `<button type="button" class="fxp sym ctxs" data-p="${id}">${P[id].t}</button>`).join('')}</div></div>`;
      return { view: s.slice(0, cut) + '</div>', legend: '<div class="spx sp-leg circ" data-st="' + S.v + '">' + s.slice(cut) };
    },
    update(el, S) {
      const v = Math.max(0, Math.min(5, Math.round(S.vv)));
      el.querySelectorAll('.spx').forEach(r => { r.dataset.st = v; });
      el.querySelectorAll('.sp-rows .row').forEach(b => { const on = FX.isOn(P[b.dataset.p], { v }); b.dataset.ch = on ? 1 : 0; b.querySelector('.ar').textContent = on ? '●' : '·'; });
      el.querySelectorAll('.sp-leg .sym').forEach(b => b.classList.toggle('lit', FX.isOn(P[b.dataset.p], { v })));
    },
    panel(S, H) {
      const li = (ids, cls) => ids.map(id => `<li>${H.node(id, cls)}</li>`).join('');
      if (S.v === 0) return `<section class="fx-grp"><h4><span data-ui>${ST[0]}</span><small>histologie</small></h4><ol class="fx-chain"><li>${H.node('x4')}</li></ol></section>`;
      if (S.v === 5) return `<section class="fx-grp"><h4><span data-ui>Angina virală</span><small>Febra (LP), slide 30</small></h4><ol class="fx-chain">${li(['vv', 'fevv', 'rhv', 'lnv', 'erv', 'cv', 'lyv'])}</ol></section>`;
      const STEP = { tr: 1, adh: 1, tox: 2, inf: 2, ntf: 2, ln: 2, exu: 3, fev: 3, ot: 4, si: 4, ab: 4, raa: 4, gn: 4 };
      const mech = Object.keys(STEP).filter(id => STEP[id] <= S.v);
      let h = `<section class="fx-grp"><h4><span data-ui>${ST[S.v]}</span><small>Febra (LP), slide 22–31</small></h4><ol class="fx-chain">${li(['ag'])}${li(mech, 'heat')}</ol></section>`;
      if (S.v >= 3) h += `<section class="fx-grp"><h4><span data-ui>Febra în faringita streptococică</span><small>Febra (LP), slide 26</small></h4><ol class="fx-chain">${li(['tox', 'op', 'ck', 'hyp', 'term', 'fev'], 'heat')}</ol></section>`;
      h += `<section class="fx-grp"><h4><span data-ui>Față de angina virală</span><small>Febra (LP), slide 30</small></h4><ol class="fx-chain">${li(['fev', 'rh', 'ln', 'inf', 'cb'])}</ol></section>`;
      return h;
    },
  });
})();
