/* ===== Î5: cele trei stadii ale hipotermiei (slide 22–24) =====
   Anatomie schematică: „panou” de organe (creier, ochi + lanternă, inimă + ECG, plămâni, tub de glucoză, cadran de oxigen,
   antebraț cu mușchi și vas de piele, celulă). Variabila: temperatura centrală pe cele trei intervale din curs.
   Efectele arată sensul, nu mărimea; ce nu spune cursul pentru un stadiu rămâne estompat. */
(function () {
  const A = ART.cold;
  const TC = ['', '32–35 °C', '28–32 °C', 'sub 28 °C'];
  const NM = ['', 'stadiul de agitație (faza de excitație)', 'stadiul de epuizare (faza de inhibiție)', 'stadiul de paralizie (faza critică)'];
  const at = n => S => S.v === n;
  const S1 = 'Stadiul de agitație (faza de excitație): temperatura centrală 32°C–35°C, frison, glicoliză marcată: hiperglicemie, creșterea consumului de oxigen, vasoconstricție, tahicardie, păstrarea conștienței (evtl confuzie, apatie).';
  const S2 = 'Stadiul de epuizare (faza de inhibiție): temperatura centrală scade (32°C–28°C): epuizarea surselor energetice (hipoglicemie), tulburări de ritm și de conducere la nivelul miocardului, alterarea senzoriului (halucinații → comă).';
  const S3 = 'Stadiul de paralizie (faza critică): temperatura centrală < 28°C, rezervele sunt complet epuizate, comă cu lipsa reflexelor pupilare, complicații cardiovasculare și respiratorii (fibrilație ventriculară, apnee); formarea cristalelor de gheață la nivel celular: modificări ireversibile prin distrucția peretelui celular (moartea celulară).';
  const P = {
    st1: { t: 'Stadiul de agitație (faza de excitație)', slide: 'slide 22–23', q: { 5: ['0:0', '0:1'] }, on: at(1), body: S1 },
    st2: { t: 'Stadiul de epuizare (faza de inhibiție)', slide: 'slide 22–23', q: { 5: ['1:0', '1:1'] }, on: at(2), body: S2 },
    st3: { t: 'Stadiul de paralizie (faza critică)', slide: 'slide 22, 24', q: { 5: ['2:0', '2:1'] }, on: at(3), body: S3 },
    fr: { t: 'Frison', slide: 'slide 23', q: { 5: ['0:2'] }, eff: 1, on: at(1), body: S1 },
    gl1: { t: 'Glicoliză marcată: hiperglicemie', slide: 'slide 23', q: { 5: ['0:3'] }, eff: 1, on: at(1), body: S1 },
    o2: { t: 'Creșterea consumului de oxigen', slide: 'slide 23', q: { 5: ['0:4'] }, eff: 1, on: at(1), body: S1 },
    vc: { t: 'Vasoconstricție', slide: 'slide 23', q: { 5: ['0:4'] }, eff: 1, on: at(1), body: S1 },
    tc: { t: 'Tahicardie', slide: 'slide 23', q: { 5: ['0:4'] }, eff: 1, on: at(1), body: S1 },
    co: { t: 'Păstrarea conștienței (evtl confuzie, apatie)', slide: 'slide 23', q: { 5: ['0:5'] }, eff: 1, on: at(1), body: S1 },
    gl2: { t: 'Epuizarea surselor energetice: hipoglicemie', slide: 'slide 23', q: { 5: ['1:2'] }, eff: 1, on: at(2), body: S2 },
    ar: { t: 'Tulburări de ritm și de conducere la nivelul miocardului', slide: 'slide 23', q: { 5: ['1:3'] }, eff: 1, on: at(2), body: S2 },
    se: { t: 'Alterarea senzoriului (halucinații → comă)', slide: 'slide 23', q: { 5: ['1:4'] }, eff: 1, on: at(2), body: S2 },
    re: { t: 'Rezervele sunt complet epuizate', slide: 'slide 24', on: at(3), body: S3 },
    pu: { t: 'Comă cu lipsa reflexelor pupilare', slide: 'slide 24', q: { 5: ['2:2'] }, eff: 1, on: at(3), body: S3 },
    fv: { t: 'Fibrilație ventriculară', slide: 'slide 24', q: { 5: ['2:3'] }, eff: 1, on: at(3), body: S3 },
    ap: { t: 'Apnee', slide: 'slide 24', q: { 5: ['2:3'] }, eff: 1, on: at(3), body: S3 },
    ic: { t: 'Formarea cristalelor de gheață la nivel celular', slide: 'slide 24', q: { 5: ['2:4'] }, eff: 1, on: at(3), body: S3 },
    mc: { t: 'Distrucția peretelui celular (moartea celulară)', slide: 'slide 24', q: { 5: ['2:4'] }, eff: 1, on: at(3), body: S3 },
  };
  /* legenda: grupuri pe stadii; fiecare rând = un semn, cu insigna din desen și stadiul în care apare */
  const GR = [
    { st: 1, h: 'st1', lab: 'Stadiul de agitație (faza de excitație)', rows: [['fr', 7, 'Mușchiul striat: tremurul fibrelor', 'Frisonul'], ['gl1', 5, 'Vasul de sânge: moleculele de glucoză', 'Hiperglicemia (glicoliza marcată)'], ['o2', 6, 'Cadranul de oxigen', 'Consumul de oxigen'], ['vc', 8, 'Arteriola din derm: diametrul', 'Vasoconstricția'], ['tc', 3, 'Inima: ritmul și ECG-ul', 'Tahicardia'], ['co', 1, 'Creierul: lumina', 'Conștiența păstrată']] },
    { st: 2, h: 'st2', lab: 'Stadiul de epuizare (faza de inhibiție)', rows: [['gl2', 5, 'Vasul de sânge: moleculele de glucoză', 'Hipoglicemia (epuizarea surselor energetice)'], ['ar', 3, 'Inima: ritmul și ECG-ul', 'Tulburările de ritm și conducere'], ['se', 1, 'Creierul: scânteile', 'Alterarea senzoriului']] },
    { st: 3, h: 'st3', lab: 'Stadiul de paralizie (faza critică)', rows: [['pu', 2, 'Ochiul și lanterna', 'Lipsa reflexelor pupilare'], ['fv', 3, 'Inima: ritmul și ECG-ul', 'Fibrilația ventriculară'], ['ap', 4, 'Plămânii: mișcarea', 'Apneea'], ['ic', 9, 'Cristalele din jurul celulei', 'Cristalele de gheață'], ['mc', 10, 'Membrana celulei: rupturile', 'Distrucția peretelui celular']] },
  ];
  const STAGE_OF = {}; GR.forEach(g => g.rows.forEach(r => { STAGE_OF[r[0]] = g.st; }));
  const hit = a => a.w != null ? `<rect class="hit" x="${a.x}" y="${a.y}" width="${a.w}" height="${a.h}" rx="8"/>` : `<circle class="hit" cx="${a.cx}" cy="${a.cy}" r="${a.r}"/>`;
  const badge = (n, [x, y]) => `<g class="bdg-s"><circle cx="${x}" cy="${y}" r="8.6"/><text x="${x}" y="${y + 3.6}" text-anchor="middle" data-ui>${n}</text></g>`;
  /* ECG: 4 trasee periodice (lățime = ecran), derulate cu CSS */
  const E = A.ecg, by = E.y + E.h * .62, u = E.h * .3, EW = E.w;
  const beat = (x, a) => [[x, by], [x + 3, by], [x + 5, by - .25 * u], [x + 7, by], [x + 10, by], [x + 11.5, by + .3 * u], [x + 13.5, by - a * u], [x + 15.5, by + .45 * u], [x + 17, by], [x + 21, by], [x + 24, by - .35 * u], [x + 27, by], [x + 30, by]];
  const toD = pts => 'M' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L');
  const regular = n => { const per = EW / n, o = []; for (let i = 0; i < n; i++) o.push(...beat(E.x + i * per, 1.05)); o.push([E.x + EW, by]); return o; };
  const irregular = () => { const iv = [.27, .13, .34, .2, .06]; const tot = iv.reduce((a, b) => a + b, 0); let x = E.x, o = []; iv.forEach((f, i) => { const w = f / tot * EW; if (w > 31) o.push(...beat(x, i % 2 ? .55 : 1.1).slice(i === 2 ? 4 : 0)); else o.push([x, by], [x + w * .5, by - .5 * u], [x + w, by]); x += w; }); o.push([E.x + EW, by]); return o; };
  const fib = () => { const o = []; for (let i = 0; i <= 160; i++) { const t = i / 160, x = E.x + t * EW; const y = by + (Math.sin(2 * Math.PI * 9 * t + .4) * .55 + Math.sin(2 * Math.PI * 14 * t + 1.7) * .4 + Math.sin(2 * Math.PI * 23 * t + .9) * .3) * u * .75; o.push([x, y]); } return o; };
  const TRACES = { n: regular(3), t: regular(6), a: irregular(), f: fib() };
  const dot3 = n => [1, 2, 3].map(k => `<i class="${k === n ? 'on' : ''}"></i>`).join('');

  FX.def('cold', {
    title: 'Cele trei stadii ale hipotermiei',
    meta: 'Stadiile hipotermiei (Tc sub 35°C)',
    qs: [5],
    kind: 'mix',
    note: 'Anatomie schematică, nu atlas: fiecare dală arată un organ și ce spune cursul despre el. Intervalele de temperatură sunt cele din slide 23–24 (cursul scrie stadiul 2 descrescător, 32–28°C); la 32°C se ating stadiile 1 și 2. Ce nu spune cursul pentru un stadiu (de exemplu oxigenul sau vasele în stadiul 2) rămâne estompat. Frecvența inimii și valorile glicemiei sunt calitative: arată sensul, nu mărimea.',
    src: 'Termoreglarea, slide 22–24',
    neutral: 0,
    ctl: { type: 'range', label: 'Temperatura centrală', min: 1, max: 3, step: 1, init: 1, fmt: v => TC[v], play: { ms: 2300, label: 'Redă răcirea' }, peek: 'Compară cu normal' },
    initV: () => 1,
    hints: {
      predict: 'Alege un interval de temperatură (cursorul sau segmentele de sus), bifează semnele pe care le crezi în acest stadiu și apasă „Dezvăluie”. Panoul rămâne normal până răspunzi.',
      explore: 'Mută temperatura sau apasă „Redă răcirea”. Apasă un organ din desen sau un rând de mai jos: vezi textul din curs și punctul din barem. Apasă lanterna: vezi dacă pupila reacționează.',
    },
    predict: { kind: 'pick', prompt: (S, lab) => `Temperatura centrală este ${lab}. Alege semnele care apar în acest stadiu.` },
    tour: [
      { dv: 0, v: 1, hl: [], t: 'Orientare în desen',
        see: 'Fiecare dală e un organ: creierul (1), ochiul cu o lanternă (2), inima văzută din față cu ECG-ul (3), plămânii cu bronhiile (4), un vas de sânge cu molecule de glucoză (5, hexagoanele galbene), cadranul consumului de oxigen (6), pielea cu o arteriolă (8) și mușchiul de sub ea (7), o celulă (9, 10). Acum temperatura e normală.' },
      { v: 1, hl: [], parts: ['st1'], t: 'Stadiul 1: agitația (32–35 °C)', quote: 'Stadiul de agitație (faza de excitație): temperatura centrală 32°C–35°C.',
        see: 'Organele despre care cursul nu spune nimic în acest stadiu se estompează.' },
      { v: 1, hl: ['fr'], parts: ['fr'], t: 'Frisonul', quote: 'Frison.', slide: 'slide 23', zoom: [2, 428, 196, 146],
        see: 'Fibrele mușchiului striat de sub piele (7) tremură.' },
      { v: 1, hl: ['gl1', 'o2'], parts: ['gl1', 'o2'], t: 'Hiperglicemia și consumul de oxigen', quote: 'Glicoliză marcată: hiperglicemie, creșterea consumului de oxigen.', slide: 'slide 23', zoom: [202, 285, 196, 140],
        see: 'În vasul de sânge (5) apar mai multe molecule de glucoză (hexagoanele): glicemia crește. Acul cadranului (6) urcă: consumul de oxigen crește.' },
      { v: 1, hl: ['vc', 'tc'], parts: ['vc', 'tc'], t: 'Vasoconstricția și tahicardia', quote: 'Vasoconstricție, tahicardie.', slide: 'slide 23',
        see: 'Arteriola din dermul pielii (8) se îngustează. Inima (3) bate repede, iar complexele de pe ECG se îndesesc.' },
      { v: 1, hl: ['co'], parts: ['co'], t: 'Conștiența rămâne păstrată', quote: 'Păstrarea conștienței (evtl confuzie, apatie).', slide: 'slide 23', zoom: [2, 0, 196, 140],
        see: 'Creierul (1) rămâne colorat, se clatină puțin: conștiența e păstrată.' },
      { v: 2, hl: [], parts: ['st2'], t: 'Stadiul 2: epuizarea (32–28 °C)', quote: 'Stadiul de epuizare (faza de inhibiție): temperatura centrală scade (32°C–28°C).',
        see: 'Frisonul, vasoconstricția și consumul de oxigen nu mai sunt menționate: dalele lor se estompează.' },
      { v: 2, hl: ['gl2'], parts: ['gl2'], t: 'Hipoglicemia', quote: 'Epuizarea surselor energetice (hipoglicemie).', slide: 'slide 23', zoom: [202, 285, 196, 140],
        see: 'În vasul de sânge (5) rămân foarte puține molecule de glucoză.' },
      { v: 2, hl: ['ar'], parts: ['ar'], t: 'Tulburările de ritm și de conducere', quote: 'Tulburări de ritm și de conducere la nivelul miocardului.', slide: 'slide 23', zoom: [2, 143, 396, 140],
        see: 'Pe ECG complexele vin la distanțe inegale și au înălțimi diferite; inima (3) bate neregulat.' },
      { v: 2, hl: ['se'], parts: ['se'], t: 'Alterarea senzoriului', quote: 'Alterarea senzoriului (halucinații → comă).', slide: 'slide 23', zoom: [2, 0, 196, 140],
        see: 'În creier (1) apar scântei, iar creierul se întunecă: de la halucinații spre comă.' },
      { v: 3, hl: [], parts: ['st3', 're'], t: 'Stadiul 3: paralizia (sub 28 °C)', quote: 'Stadiul de paralizie (faza critică): temperatura centrală < 28°C, rezervele sunt complet epuizate.',
        see: 'Vasul de sânge (5) nu mai are deloc glucoză.' },
      { v: 3, hl: ['pu'], parts: ['pu'], t: 'Comă fără reflexe pupilare', quote: 'Comă cu lipsa reflexelor pupilare.', slide: 'slide 24', act: 'torch', zoom: [202, 0, 196, 140],
        see: 'Lanterna se aprinde, dar pupila (2) nu se micșorează. În modul Explorează poți aprinde lanterna în fiecare stadiu.' },
      { v: 3, hl: ['fv', 'ap'], parts: ['fv', 'ap'], t: 'Fibrilația ventriculară și apneea', quote: 'Complicații cardiovasculare și respiratorii (fibrilație ventriculară, apnee).', slide: 'slide 24',
        see: 'ECG-ul devine o linie haotică, fără complexe; inima (3) doar tremură. Plămânii (4) nu se mai mișcă.' },
      { v: 3, hl: ['ic', 'mc'], parts: ['ic', 'mc'], t: 'Cristale de gheață, moartea celulară', quote: 'Formarea cristalelor de gheață la nivel celular: modificări ireversibile prin distrucția peretelui celular (moartea celulară).', slide: 'slide 24', zoom: [202, 428, 196, 146],
        see: 'Se formează cristale de gheață (9) în jurul și în interiorul celulei; membrana (10) se rupe (marcajele roșii), iar celula se întunecă.' },
    ],
    parts: P,
    games: {
      order: {
        prompt: 'Pune în ordinea din curs ce se întâmplă cu rezervele și cu celula pe măsură ce temperatura scade.',
        items: [
          { t: 'Glicoliză marcată: hiperglicemie', parts: ['gl1'] },
          { t: 'Epuizarea surselor energetice: hipoglicemie', parts: ['gl2'] },
          { t: 'Rezervele sunt complet epuizate', parts: ['re'] },
          { t: 'Formarea cristalelor de gheață la nivel celular', parts: ['ic'] },
          { t: 'Distrucția peretelui celular (moartea celulară)', parts: ['mc'] },
        ],
      },
      sort: {
        prompt: 'Așază fiecare semn în stadiul hipotermiei în care apare.',
        bins: [{ id: 'a', t: 'Stadiul 1 · agitație', sub: '32–35 °C', short: 'Stadiul 1' }, { id: 'b', t: 'Stadiul 2 · epuizare', sub: '28–32 °C', short: 'Stadiul 2' }, { id: 'c', t: 'Stadiul 3 · paralizie', sub: 'sub 28 °C', short: 'Stadiul 3', tone: 'cold' }],
        items: [
          { id: 'fr', bin: 'a' }, { id: 'gl1', bin: 'a' }, { id: 'o2', bin: 'a' }, { id: 'vc', bin: 'a' }, { id: 'tc', bin: 'a' }, { id: 'co', bin: 'a' },
          { id: 'gl2', bin: 'b' }, { id: 'ar', bin: 'b' }, { id: 'se', bin: 'b' },
          { id: 'pu', bin: 'c' }, { id: 'fv', bin: 'c' }, { id: 'ap', bin: 'c' }, { id: 'ic', bin: 'c' },
        ],
      },
    },
    actions: {
      torch(el, S) {
        const root = el.querySelector('.cd'); if (!root) return;
        root.dataset.torch = '1'; clearTimeout(root._tt);
        const out = el.querySelector('[data-rout]');
        const st = S.vv == null ? S.v : S.vv;
        if (out) out.dataset.st = String(st);
        if (out) out.textContent = st === 3 ? 'Nicio reacție: lipsa reflexelor pupilare (slide 24).' : 'Pupila se micșorează. Cursul menționează lipsa reflexelor doar în stadiul 3.';
        root._tt = setTimeout(() => { root.dataset.torch = '0'; }, 1900);
      },
    },
    now(S) {
      const v = S.v;
      return `<b data-ui>${TC[v]}</b> · ${NM[v]}`;
    },
    stage(o, H, S) {
      const uid = 'fx' + FX.n;
      const L = A.layers, cur = S.v;
      let s = `<div class="cd" data-st="${cur}">`;
      s += `<div class="hd-th cd-th" role="group" aria-label="Temperatura centrală: intervalele din curs"><div class="hd-th-r cd3">${[1, 2, 3].map(k => `<button type="button" class="th k${k}" data-jump="${k}" aria-pressed="${k === cur}"><b data-ui>${TC[k]}</b></button>`).join('')}</div><div class="hd-th-c cd3" data-ui><span>Stadiul 1</span><span>Stadiul 2</span><span>Stadiul 3</span></div></div>`;
      s += `<svg class="iso-svg cd-svg" viewBox="0 0 400 580" role="group" aria-label="Panou cu organele: creier, ochi, inimă cu ECG, plămâni, tub de glucoză, cadran de oxigen, antebraț cu vas de piele și celulă">`;
      s += `<defs><clipPath id="${uid}-e"><rect x="${E.x}" y="${E.y}" width="${E.w}" height="${E.h}" rx="5"/></clipPath></defs>`;
      s += `<g class="cd-tiles">${L.tiles}</g>`;
      /* creier */
      s += `<g class="a-brain" data-rel="co se pu">${L.brainA}<g class="sparks">${A.sparks.map(([x, y], i) => `<circle class="sp s${i}" cx="${x}" cy="${y}" r="2.6"/>`).join('')}</g></g>`;
      /* ochi + lanternă */
      s += `<g class="a-eye">${L.eyeB}<circle class="pupil" cx="${A.eye.cx}" cy="${A.eye.cy}" r="${A.eye.rp0}"/>${L.glint}<path class="beam" d="${A.beam}"/>${L.torch}</g>`;
      /* inimă + ECG */
      s += `<g class="a-heart" data-rel="tc ar fv">${L.heartC}${L.screen}<rect class="ecg-bg" x="${E.x}" y="${E.y}" width="${E.w}" height="${E.h}" rx="5"/><g clip-path="url(#${uid}-e)"><path class="ecg-grid" d="${Array.from({ length: 7 }, (_, i) => `M${(E.x + (i + 1) * E.w / 8).toFixed(1)} ${E.y}V${E.y + E.h}`).join('')}"/><g class="ecg-run" style="--ew:${EW.toFixed(1)}">${Object.entries(TRACES).map(([k, pts]) => `<path class="ecg-t t-${k}" data-free="end" d="${toD(pts.concat(pts.map(([x, y]) => [x + EW, y])))}"/>`).join('')}</g></g></g>`;
      /* plămâni */
      s += `<g class="a-lung" data-rel="ap"><g class="lung lL">${L.lungL}</g><g class="lung lR">${L.lungR}</g>${L.trachea}</g>`;
      /* glucoza din sânge + oxigen */
      s += `<g class="a-gluc" data-rel="gl1 gl2 re">${L.vessel}${A.glu.map((d, i) => `<path class="glu" data-i="${i}" d="${d}"/>`).join('')}</g>`;
      s += `<g class="a-o2" data-rel="o2">${L.dial}${A.dialSvg}<g class="needle" style="transform-origin:${A.needle.cx}px ${A.needle.cy}px"><path class="iso-line" data-tone="hi" data-free="end" d="M${A.needle.cx} ${A.needle.cy}L${A.needle.cx} ${(A.needle.cy - A.needle.len).toFixed(1)}"/></g><circle class="hub" cx="${A.needle.cx}" cy="${A.needle.cy}" r="2.4"/></g>`;
      /* pielea cu arteriola + mușchiul striat */
      s += `<g class="a-arm" data-rel="fr vc">${L.skinF}<path class="vwall" d="${A.vess.d}"/><path class="vblood" d="${A.vess.d}"/><g class="arm-g">${L.muscleF}</g></g>`;
      /* celulă + cristale */
      s += `<g class="a-cell" data-rel="ic mc">${L.cellG}<g class="rupt">${A.rupt.map(([x, y]) => `<circle class="cd-rupt" cx="${x}" cy="${y}" r="6"/>`).join('')}</g><g class="ice">${A.ice.map((k, i) => `<path class="ice-k i${i}" d="${k.d}"/>`).join('')}</g></g>`;
      /* zone apăsabile */
      const hs = A.hits;
      s += H.spart('co', hit(hs.brain)) + H.spart('se', hit(hs.brain)) + H.spart('pu', hit(hs.brain));
      s += H.spart('pu', hit(hs.eye), 'always');
      s += `<g class="torch-h" data-fxa="torch" tabindex="0" role="button" aria-label="Luminează ochiul cu lanterna">${hit(hs.torch)}</g>`;
      s += H.spart('tc', hit(hs.heart) + hit(hs.ecg)) + H.spart('ar', hit(hs.heart) + hit(hs.ecg)) + H.spart('fv', hit(hs.heart) + hit(hs.ecg));
      s += H.spart('ap', hit(hs.lungs), 'always');
      s += H.spart('gl1', hit(hs.tank)) + H.spart('gl2', hit(hs.tank)) + H.spart('re', hit(hs.tank));
      s += H.spart('o2', hit(hs.dial), 'always');
      s += H.spart('fr', hit(hs.muscle), 'always') + H.spart('vc', hit(hs.vessel), 'always');
      s += H.spart('ic', hs.ice.map(hit).join(''), 'always') + H.spart('mc', hit(hs.cell), 'always');
      const bd = A.badges;
      const bf = (n, p, ids) => badge(n, p).replace('<g class="bdg-s">', `<g class="bdg-s" data-for="${ids}">`);
      s += `<g class="bdgs">` + bf(1, bd.brain, 'co se pu') + bf(2, bd.eye, 'pu') + bf(3, bd.heart, 'tc ar fv') + bf(4, bd.lungs, 'ap') + bf(5, bd.gluc, 'gl1 gl2 re') + bf(6, bd.o2, 'o2') + bf(7, bd.muscle, 'fr') + bf(8, bd.vessel, 'vc') + bf(9, bd.ice, 'ic') + bf(10, bd.cell, 'mc') + `</g>`;
      s += '</svg>';
      const cut = s.length;
      s += `<div class="cd-tools"><button type="button" class="btn soft" data-fxa="torch" data-ui>Luminează ochiul cu lanterna</button><span class="cd-ro" data-rout aria-live="polite" data-ui>Apasă lanterna: vezi dacă pupila reacționează.</span></div>`;
      s += `<div class="cd-rows">${GR.map(g => `<section class="cd-g g${g.st}"><button type="button" class="fxp gh" data-p="${g.h}"><span class="gt">${H.lab(g.h, g.lab)}</span><span class="gc" data-ui>${TC[g.st]}</span></button><ul>${g.rows.map(r => `<li><button type="button" class="fxp row" data-p="${r[0]}"><span class="bdg" data-ui>${r[1]}</span><span class="rt"><span class="rl">${H.lab('l' + r[0], r[3])}</span><span class="rd" data-ui>${r[2]}</span></span><span class="s3" aria-hidden="true">${dot3(g.st)}</span></button></li>`).join('')}</ul></section>`).join('')}</div>`;
      s += `</div>`;
      return { view: s.slice(0, cut) + '</div>', legend: '<div class="cd cd-leg">' + s.slice(cut) };
    },
    update(el, S) {
      const root = el.querySelector('.cd'); if (!root) return;
      const st = S.vv, v = S.v, ST = { v: st };
      root.dataset.st = st;
      const NG = [7, 14, 2, 0], OA = [-6, 62, -6, -6];
      const css = root.style;
      el.querySelectorAll('.glu').forEach(g => g.classList.toggle('on', +g.dataset.i < NG[st])); css.setProperty('--oa', OA[st] + 'deg');
      css.setProperty('--vc', st === 1 ? 1 : 0); css.setProperty('--vr', st === 1 ? 1.8 : 4.4); css.setProperty('--sh', st === 1 ? 1 : 0);
      css.setProperty('--ic', st === 3 ? 1 : 0); css.setProperty('--bo', [0, 0, .32, .7][st]);
      css.setProperty('--ew', EW.toFixed(1));
      root.dataset.reflex = st === 3 ? '0' : '1';
      el.querySelectorAll('.cd-th .th').forEach(b => { const k = +b.dataset.jump; b.setAttribute('aria-pressed', String(k === v)); });
      /* estompare: piesele care nu sunt în stadiul ales (nu și în starea normală) */
      el.querySelectorAll('[data-rel]').forEach(g => { const ids = g.dataset.rel.split(' '); const rel = st === 0 || ids.some(id => FX.isOn(P[id], { v: st })); g.classList.toggle('dim', !rel); });
      el.querySelectorAll('.cd-rows .row').forEach(b => { b.classList.toggle('inact', STAGE_OF[b.dataset.p] !== v && st !== 0 ? true : false); });
      el.querySelectorAll('.cd-rows .gh').forEach(b => b.classList.toggle('cur', b.dataset.p === 'st' + v));
      const out = el.querySelector('[data-rout]');
      if (out && out.dataset.st !== String(st)) { out.dataset.st = String(st); out.textContent = 'Apasă lanterna: vezi dacă pupila reacționează.'; }
    },
    panel(S, H) {
      const ids = Object.keys(P).filter(id => FX.isOn(P[id], S));
      return `<section class="fx-grp"><h4><span data-ui>Ce spune cursul la ${TC[S.v]}</span><small>slide 22–24</small></h4><ol class="fx-chain flat">${ids.map(id => `<li>${H.node(id, id.startsWith('st') ? 'pen' : 'cold')}</li>`).join('')}</ol></section>`;
    },
  });
})();
