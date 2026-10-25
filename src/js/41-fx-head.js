/* ===== Î2 + Î6: capul ca „radiator” și creierul la 40–43°C (slide 14, 15, 7) =====
   Anatomie schematică (nu atlas): scalp cu glande sudoripare, craniu, creier, hipotalamus, vene, sinus cavernos, carotidă.
   Variabila: temperatura centrală, doar cu valorile din curs (40; 40,5 = limita; 41–43). Efectele sunt calitative (sens), nu mărimi. */
(function () {
  const A = ART.head;
  const fmtN = t => String(t).replace('.', ',');
  const fmt = v => fmtN(v) + ' °C';
  const COMP = S => S.v <= 40.5;              // slide 14: 40–40,5°C
  const DEC = S => S.v > 40.5;                // slide 15: 40,5–43°C
  const T14 = 'Intensificarea mecanismelor termolizei: la nivelul extremității cefalice se intensifică sudorația, accelerând pierderea de căldură prin evaporare.';
  const V14 = 'Sângele periferic, cu o temperatură mai scăzută, ajunge la nivelul creierului prin sistemul venos endocranian și a sinusului cavernos și prin conducție va scădea temperatura sângelui din arterele învecinate.';
  const P = {
    n1: { t: 'Manifestările nervoase', dq: 'Manifestările nervoase', slide: 'slide 14', q: { 2: ['0:0', '0:1'] }, eff: 1, dir: 'up', on: COMP,
      body: 'Temperatura centrală între 40°C și 40,5°C: manifestările nervoase ← modificările substanței cerebrale.' },
    sw: { t: 'Intensificarea sudorației la nivelul extremității cefalice', dq: 'Sudorația la nivelul extremității cefalice', slide: 'slide 14', q: { 2: ['1:0', '1:1'] }, eff: 1, dir: 'up', on: COMP, body: T14 },
    ev: { t: 'Pierderea de căldură prin evaporare', dq: 'Pierderea de căldură prin evaporare', slide: 'slide 14', q: { 2: ['1:2'] }, eff: 1, dir: 'up', on: COMP, body: T14 },
    vn: { t: 'Sânge periferic cu temperatură mai scăzută', dq: 'Temperatura sângelui periferic care ajunge la creier', slide: 'slide 14', q: { 2: ['1:3'] }, eff: 1, dir: 'down', on: COMP, body: V14 },
    en: { t: 'Sistemul venos endocranian', slide: 'slide 14', q: { 2: ['1:4'] }, eff: 1, on: COMP, body: V14 },
    cs: { t: 'Sinusul cavernos', slide: 'slide 14', q: { 2: ['1:5'] }, eff: 1, on: COMP, body: V14 },
    cd: { t: 'Conducția scade temperatura sângelui din arterele învecinate', dq: 'Temperatura sângelui din arterele învecinate', slide: 'slide 14', q: { 2: ['1:6'] }, eff: 1, dir: 'down', on: COMP, body: V14 },
    ar: { t: 'Arterele învecinate', slide: 'slide 14', q: { 2: ['1:7'] }, eff: 1, on: COMP, body: V14 },
    hy: { t: 'Sistarea activității centrului termoreglator hipotalamic', dq: 'Activitatea centrului termoreglator', slide: 'slide 15', q: { 6: ['0:0', '0:1'] }, eff: 1, dir: 'down', on: DEC,
      body: 'Temperatura centrală între 40,5°C și 43°C: sistarea activității centrului termoreglator hipotalamic.' },
    ed: { t: 'Edem cerebral progresiv', dq: 'Edemul cerebral', slide: 'slide 15', q: { 6: ['0:2'] }, eff: 1, dir: 'up', on: DEC, body: 'Edem cerebral progresiv.' },
    sh: { t: 'Șoc termic', slide: 'slide 15', q: { 6: ['0:3'] }, eff: 1, on: DEC, body: 'Șoc termic.' },
    mo: { t: 'Insuficiență multiplă de organ', dq: 'Funcția organelor', slide: 'slide 7', q: { 6: ['0:4'] }, eff: 1, dir: 'down', on: DEC, body: 'Slide 7: la 40–44°C apare șoc termic cu insuficiență multiplă de organ.' },
    x1: { t: 'Termoliza nu mai funcționează, temperatura crește necontrolat', q: { 6: ['1:0'] }, on: DEC, ctx: 'deducție din slide 15 și din rubrica Î6; Robbins: „diaforeza încetează”',
      body: 'Cursul spune doar „sistarea activității centrului termoreglator hipotalamic”. Dacă centrul nu mai funcționează, nu mai există comanda pentru termoliză: căldura nu mai este eliminată și temperatura crește necontrolat. Această concluzie este deducția din fapt, nu o frază din diapozitiv.' },
  };
  /* rândurile legendei: partea, insigna, unde e în desen, eticheta ascunsă, tipul de bară */
  const ROWS = [
    { g: 'a', p: 'sw', b: 1, dev: 'Glandele de pe scalp: picăturile', lab: 'Sudorația extremității cefalice', k: 'dir', n: .22 },
    { g: 'a', p: 'ev', b: 2, dev: 'Valurile de deasupra capului', lab: 'Evaporarea', k: 'dir', n: .22 },
    { g: 'a', p: 'vn', b: 3, dev: 'Vena din scalp și de pe față', lab: 'Sângele periferic, cu temperatură mai scăzută', k: 'dir', n: .6 },
    { g: 'a', p: 'en', b: 4, dev: 'Canalul de sub craniu', lab: 'Sistemul venos endocranian', k: 'flow', n: 0 },
    { g: 'a', p: 'cs', b: 5, dev: 'Buzunarul de lângă carotidă', lab: 'Sinusul cavernos', k: 'flow', n: 0 },
    { g: 'a', p: 'cd', b: 6, dev: 'Săgețile roșii din sinus', lab: 'Conducția', k: 'dir', n: .6 },
    { g: 'a', p: 'ar', b: 7, dev: 'Tubul roșu din gât', lab: 'Arterele învecinate', k: 'dir', n: .6 },
    { g: 'a', p: 'n1', b: 8, dev: 'Creierul: conturul punctat', lab: 'Manifestările nervoase', k: 'dir', n: .08 },
    { g: 'b', p: 'hy', b: 9, dev: 'Hipotalamusul: becul', lab: 'Centrul termoreglator', k: 'hyp', n: .85 },
    { g: 'b', p: 'ed', b: 10, dev: 'Creierul: picăturile și volumul', lab: 'Edemul cerebral', k: 'ed', n: .08 },
  ];
  const hit = a => a.w != null ? `<rect class="hit" x="${a.x}" y="${a.y}" width="${a.w}" height="${a.h}" rx="8"/>` : `<circle class="hit" cx="${a.cx}" cy="${a.cy}" r="${a.r}"/>`;
  const badge = (n, [x, y]) => `<g class="bdg-s"><circle cx="${x}" cy="${y}" r="8.6"/><text x="${x}" y="${y + 3.6}" text-anchor="middle" data-ui>${n}</text></g>`;
  const TEMPS = [40, 40.5, 41, 41.5, 42, 42.5, 43];

  FX.def('head', {
    title: 'Capul ca radiator: temperatura centrală 40–43 °C',
    meta: 'Capul ca radiator: Tc 40–43°C',
    qs: [2, 6],
    kind: 'mix',
    note: 'Schemă anatomică simplificată, nu atlas: traseul venelor și poziția glandelor sunt schematice (cursul spune doar „sistemul venos endocranian și sinusul cavernos”). Scala de temperatură folosește doar valorile din slide 14 și 15; efectele arată sensul, nu mărimea. La 40,5°C cursul scrie ambele intervale (40–40,5 în slide 14 și 40,5–43 în slide 15); aici este limita compensării.',
    src: 'Termoreglarea, slide 14, 15 și 7',
    neutral: 37,
    ctl: { type: 'range', label: 'Temperatura centrală', min: 40, max: 43, step: .5, init: 40, fmt, play: { ms: 1500, label: 'Redă încălzirea' }, peek: 'Compară cu normal' },
    initV: o => (o && o.q === 6 ? 42 : 40),
    hints: {
      predict: 'Alege o temperatură (cursorul sau termometrul), spune ce se întâmplă cu fiecare semn, apoi „Dezvăluie”. Capul rămâne în starea normală până răspunzi.',
      explore: 'Mută temperatura sau apasă „Redă încălzirea”. Apasă o piesă din desen sau un rând de mai jos: vezi textul din curs și punctul din barem.',
    },
    predict: { kind: 'dir', prompt: (S, lab) => `Temperatura centrală este ${lab}. Ce se întâmplă cu fiecare semn?` },
    tour: [
      { dv: 37, v: 40, hl: [], t: 'Orientare în desen',
        see: 'Capul tăiat pe linia mediană, văzut din profil: pielea și scalpul cu glande sudoripare (1), craniul, creierul (8) cu corpul calos, talamusul și hipotalamusul (9, centrul termoreglării), trunchiul cerebral și cerebelul. Artera carotidă internă (7, roșu) urcă prin gât, intră în craniu și face o buclă (sifonul) prin sinusul cavernos (5, albastru), lângă hipofiză. Carotida, sinusul cavernos, ochiul și vena oftalmică sunt de fapt laterale; aici sunt proiectate peste secțiune. Acum temperatura e normală.' },
      { v: 40, hl: ['n1'], parts: ['n1'], t: '40–40,5 °C: creierul suferă',
        see: 'Conturul creierului (8) pulsează cu roșu, iar creierul se colorează: apar manifestările nervoase.' },
      { v: 40, hl: ['sw'], parts: ['sw'], t: 'Sudorația capului se intensifică',
        see: 'Glandele din scalp și de pe frunte (1) picură.' },
      { v: 40, hl: ['ev'], parts: ['ev'], t: 'Evaporarea scoate căldura',
        see: 'Deasupra capului urcă valuri (2): apa transpirată se evaporă și pielea pierde căldură.' },
      { v: 40, hl: ['vn'], parts: ['vn'], t: 'Sângele din piele e mai rece',
        see: 'Prin vena feței, apoi prin vena oftalmică de deasupra ochiului (3), sângele răcit în piele curge spre interior (punctele albe). La fel prin venele scalpului.' },
      { v: 40, hl: ['en'], parts: ['en'], t: 'Intră în craniu: sistemul venos endocranian',
        see: 'Prin vena emisară, care traversează calota, sângele din scalp ajunge în sinusul sagital superior (4), parte a sistemului venos endocranian.' },
      { v: 40, hl: ['cs'], parts: ['cs'], t: 'Ajunge în sinusul cavernos',
        see: 'Sângele venos rece ajunge în sinusul cavernos (5), spațiul venos de lângă șaua turcească prin care trece sifonul carotidei.', zoom: [160, 168, 136, 150] },
      { v: 40, hl: ['cd', 'ar'], parts: ['cd', 'ar'], t: 'Conducția răcește sângele arterial',
        see: 'Săgețile roșii (6) arată căldura care trece din peretele carotidei în sângele venos rece din jur. După sinus, carotida (7) devine mai palidă: sângele care urcă spre creier e mai rece.', zoom: [160, 168, 136, 150] },
      { v: 41, hl: ['hy'], parts: ['hy', 'x1'], t: 'Peste 40,5 °C: centrul termoreglator se oprește',
        see: 'Becul hipotalamusului (9) se stinge. Picăturile, valurile și curgerea prin vene se opresc.' },
      { v: 42, hl: ['ed'], parts: ['ed'], t: 'Edem cerebral progresiv',
        see: 'Creierul se umflă: ventriculii (albastru, sub corpul calos) se îngustează, șanțurile se șterg și apar picături de apă (10). Mută temperatura spre 43 °C în Explorează: edemul crește.' },
      { v: 43, hl: [], parts: ['sh', 'mo'], t: 'Șoc termic',
        see: 'Consecințele generale apar ca butoane roșii sub desen, în modul Explorează.' },
    ],
    tourStart: o => (o && o.q === 6 ? 8 : 0),
    parts: P,
    games: {
      order: {
        prompt: 'Pune în ordinea din curs calea prin care capul își scade temperatura (40–40,5°C).',
        items: [
          { t: 'Intensificarea sudorației la nivelul extremității cefalice', parts: ['sw'] },
          { t: 'Pierderea de căldură prin evaporare', parts: ['ev'] },
          { t: 'Sângele periferic, cu temperatură mai scăzută', parts: ['vn'] },
          { t: 'Ajunge la creier prin sistemul venos endocranian', parts: ['en'] },
          { t: 'și prin sinusul cavernos', parts: ['cs'] },
          { t: 'Prin conducție scade temperatura sângelui din arterele învecinate', parts: ['cd', 'ar'] },
        ],
      },
      sort: {
        prompt: 'Așază fiecare semn în intervalul de temperatură centrală din curs.',
        bins: [{ id: 'a', t: '40–40,5 °C', sub: 'slide 14', short: '40–40,5 °C' }, { id: 'b', t: '40,5–43 °C', sub: 'slide 15', short: '40,5–43 °C', tone: 'heat' }],
        items: [
          { id: 'n1', bin: 'a' }, { id: 'sw', bin: 'a' }, { id: 'ev', bin: 'a' }, { id: 'vn', bin: 'a' }, { id: 'cs', bin: 'a' }, { id: 'cd', bin: 'a' },
          { id: 'hy', bin: 'b' }, { id: 'ed', bin: 'b' }, { id: 'sh', bin: 'b' },
        ],
      },
    },
    now(S) {
      const v = S.v;
      const tail = v === 40.5 ? ' · <i data-ui>40,5°C apare în ambele intervale din curs</i>' : '';
      return v <= 40.5
        ? `<b data-ui>${fmt(v)}</b> · slide 14: se intensifică termoliza la nivelul extremității cefalice; manifestările nervoase ← modificările substanței cerebrale${tail}`
        
        : `<b data-ui>${fmt(v)}</b> · slide 15: sistarea activității centrului termoreglator hipotalamic, edem cerebral progresiv, șoc termic`;
    },
    stage(o, H, S) {
      const uid = 'fx' + FX.n;
      const cur = S.v;
      let s = `<div class="hd">`;
      /* termometru-control: apasă o valoare */
      s += `<div class="hd-th" role="group" aria-label="Temperatura centrală: valorile din curs"><div class="hd-th-r">${TEMPS.map(t => `<button type="button" class="th ${t <= 40.5 ? 'z14' : 'z15'}" data-jump="${t}" aria-pressed="${t === cur}"><b data-ui>${fmtN(t)}</b></button>`).join('')}</div><div class="hd-th-c" data-ui><span style="grid-column:span 2">slide 14</span><span style="grid-column:span 5">slide 15</span></div></div>`;
      s += `<svg class="iso-svg hd-svg hx-svg" viewBox="20 -6 372 444" role="group" aria-label="Capul în secțiune sagitală: scalp cu glande sudoripare, craniu, creier cu hipotalamus, trunchi cerebral, cerebel, ochi, vene, sinus cavernos și artera carotidă internă">`;
      s += `<defs><radialGradient id="${uid}-g"><stop offset="0" stop-color="var(--red)" stop-opacity=".7"/><stop offset="1" stop-color="var(--red)" stop-opacity=".16"/></radialGradient><clipPath id="${uid}-b"><path d="${A.brainD}"/></clipPath><clipPath id="${uid}-k"><path d="${A.skinD}"/></clipPath></defs>`;
      const L = A.L;
      s += `<g clip-path="url(#${uid}-k)">` + L.skin + L.glands + L.vscalp + L.calv + L.diploe + L.fsin + L.orbroof + L.sphen + L.ssin + L.nasal + L.turb + L.orbit + L.palate + L.mand + L.teeth + L.tongue + L.phar + L.vert + L.disc + L.cord + '</g>';
      s += `<path class="hx-skinedge" d="${A.skinD}"/>`;
      s += `<g class="brain-g">${L.brain}<g clip-path="url(#${uid}-b)"><g class="hx-sulci">${L.sulci}</g><g class="hx-ventg">${L.vent}</g><g class="ed-dots">${A.edDots.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i % 3 === 0 ? 3 : 2.2}"/>`).join('')}</g></g><path class="brain-heat" d="${A.brainD}" fill="url(#${uid}-g)"/><path class="brain-nv" d="${A.brainD}"/></g>`;
      s += L.cc + L.fornix + L.thal;
      s += `<circle class="hy-glow" cx="${A.hypo.cx}" cy="${A.hypo.cy}" r="${A.hypo.r + 4}"/>` + L.hypo + `<path class="hy-lamp" d="${A.hypoD}"/>`;
      s += L.mamm + L.chiasm + L.stalk + L.pit + L.cereb + L.arbor + L.tent + L.stem + L.pons + L.v4 + L.eye + L.optic;
      s += L.sss + `<g class="cs-g">${L.cs}</g>` + L.vface + L.artPre + L.artPost + L.artEnd + L.balls;
      s += `<path class="flow fv" d="${A.flow.face}"/><path class="flow fv" d="${A.flow.scalp}"/><path class="flow fv" d="${A.flow.endo}"/><path class="flow fa" d="${A.flow.artPre}"/><path class="flow fa" d="${A.flow.artPost}"/>`;
      s += `<g class="cond-g">${A.cond.map(d => `<path class="cond" d="${d}"/>`).join('')}</g>`;
      s += A.pores.map((p, i) => `<circle class="drop d${i}" cx="${p.at[0]}" cy="${p.at[1]}" r="2.2" style="--dx:${p.dx};--dy:${p.dy}"/>`).join('');
      s += A.waves.map((d, i) => `<path class="wave w${i}" d="${d}" data-free="end"/>`).join('');
      const hs = A.hits, bd = A.badges;
      s += H.spart('sw', hs.sweat.map(hit).join('') + badge(1, bd.sweat));
      s += H.spart('ev', hit(hs.evap) + badge(2, bd.evap));
      s += H.spart('vn', [].concat(hs.vein).map(hit).join('') + badge(3, bd.vein));
      s += H.spart('en', [].concat(hs.endo).map(hit).join('') + badge(4, bd.endo));
      s += H.spart('cs', hit(hs.cs) + badge(5, bd.cs));
      s += H.spart('cd', hit(hs.cond) + badge(6, bd.cond));
      s += H.spart('ar', hit(hs.art) + badge(7, bd.art));
      s += H.spart('n1', hit(hs.brain) + badge(8, bd.brain));
      s += H.spart('ed', hit(hs.edema) + hit(hs.brain) + badge(10, bd.edema));
      s += H.spart('hy', hit(hs.hypo) + badge(9, bd.hypo));
      s += '</svg>';
      const cut = s.length;
      s += `<div class="hd-rows"><div class="hd-gh" data-ui>Calea răcirii · 40–40,5 °C <small>slide 14</small></div><ul>${ROWS.filter(r => r.g === 'a').map(rowHTML(H)).join('')}</ul><div class="hd-gh b" data-ui>După 40,5 °C <small>slide 15</small></div><ul>${ROWS.filter(r => r.g === 'b').map(rowHTML(H, ROWS.filter(r => r.g === 'a').length)).join('')}</ul></div>`;
      s += `<div class="hd-gen"><span class="sl" data-ui>Consecințe generale</span>${['sh', 'mo', 'x1'].map(id => `<button type="button" class="fxp sym ${P[id].ctx ? 'ctxs' : ''}" data-p="${id}">${P[id].ctx ? `<span data-ui>${P[id].t}</span>` : P[id].t}</button>`).join('')}</div></div>`;
      return { view: s.slice(0, cut) + '</div>', legend: '<div class="hd hd-leg">' + s.slice(cut) };
    },
    update(el, S) {
      const root = el.querySelector('.hd'); if (!root) return;
      const v = S.vv, base = v < 40, comp = !base && v <= 40.5, dec = v > 40.5;
      const ed = dec ? Math.min(1, (v - 40.5) / 2.5) : 0;
      const ht = base ? 0 : comp ? .22 + (v - 40) * .3 : .42 + (v - 40.5) / 2.5 * .55;
      const st = root.style;
      st.setProperty('--sw', comp ? 1 : 0); st.setProperty('--cool', comp ? 1 : 0); st.setProperty('--hy', dec ? 0 : 1);
      st.setProperty('--nv', comp ? 1 : 0); st.setProperty('--ed', ed.toFixed(2)); st.setProperty('--ht', ht.toFixed(2));
      root.dataset.c = base ? 'base' : comp ? 'comp' : 'dec';
      el.querySelectorAll('.hd-th .th').forEach(b => { const t = +b.dataset.jump; b.setAttribute('aria-pressed', String(t === S.v)); b.classList.toggle('lit', t <= S.v); });
      el.querySelectorAll('.hd-rows .row').forEach(b => {
        const r = ROWS.find(x => x.p === b.dataset.p), p = P[r.p]; const act = !base && FX.isOn(p, { v });
        let f, ch = 0;
        if (r.k === 'dir') { f = act ? (p.dir === 'up' ? .88 : .2) : r.n; ch = act ? (p.dir === 'up' ? 1 : -1) : 0; }
        else if (r.k === 'flow') { f = act ? .88 : .1; ch = act ? 2 : 0; }
        else if (r.k === 'hyp') { f = dec ? .06 : r.n; ch = dec ? -1 : 0; }
        else { f = r.n + ed * .84; ch = ed > 0 ? 1 : 0; }
        b.querySelector('u').style.width = (f * 100).toFixed(0) + '%';
        b.dataset.ch = ch; b.classList.toggle('inact', !act && r.k !== 'hyp' && r.k !== 'ed');
        b.querySelector('.ar').textContent = ch === 1 ? '↑' : ch === -1 ? '↓' : ch === 2 ? '→' : '·';
      });
      el.querySelectorAll('.hd-gen .sym').forEach(b => b.classList.toggle('lit', dec));
    },
    panel(S, H) {
      const ids = Object.keys(P).filter(id => FX.isOn(P[id], S));
      const t = S.v <= 40.5 ? 'slide 14' : 'slide 15 și 7';
      return `<section class="fx-grp"><h4><span data-ui>Ce spune cursul la ${fmt(S.v)}</span><small>${t}</small></h4><ol class="fx-chain flat">${ids.map(id => `<li>${H.node(id, DEC(S) ? 'heat' : 'pen')}</li>`).join('')}</ol></section>`;
    },
  });
  function rowHTML(H, off) {
    off = off || 0;
    return (r, i) => `<li><button type="button" class="fxp row" data-p="${r.p}"><span class="bdg" data-ui>${r.b}</span><span class="rt"><span class="rl">${H.lab('l' + r.p, r.lab)}</span><span class="rd" data-ui>${r.dev}</span></span><span class="trk" aria-hidden="true"><i><u></u></i><s style="left:${r.n * 100}%"></s></span><span class="ar" aria-hidden="true"></span></button></li>`;
  }
})();
