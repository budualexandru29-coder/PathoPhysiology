/* ===== Î7: termoliza, cele patru mecanisme fizice (Cursul 3, slide 14–19) =====
   Desenul vine din art/thermo.mjs (ART.thermo): blocul de piele din Î1 ca suprafață a corpului și, deasupra lui,
   radiația, convecția, conducția (o placă rece sau apa) și evaporarea. Variabila: scenariul (mediul).
   Procentele apar doar pentru repaus, cu sursa lor; în celelalte scenarii efectele sunt calitative. */
(function () {
  const A = ART.thermo;
  const SC = ['Repaus, aer la ~21 °C', 'Vânt', 'Imersie în apă rece', 'Mediu peste 35 °C', 'Căldură umedă'];
  /* pentru fiecare mecanism și scenariu: [sens, mărime] — sens 1 = pierde căldură, -1 = primește căldură, 0 = blocat */
  const M = {
    ra: [[1, .9], [1, .85], [1, .2], [-1, .7], [-1, .5]],
    cv: [[1, .3], [1, .9], [1, .75], [-1, .55], [-1, .45]],
    cd: [[1, .1], [1, .1], [1, 1], [-1, .15], [-1, .15]],
    ev: [[1, .45], [1, .6], [0, 0], [1, 1], [0, .04]],
  };
  const PCT = { ra: 'până la 60%', cv: 'până la 12%', cd: '3–4%', ev: '~25% (13% piele, 12% respirație)' };
  const loses = id => S => M[id][S.v][0] === 1 && M[id][S.v][1] >= .2;
  const P = {
    def: { t: 'Termoliza: pierderea de căldură', slide: 'Termoreglarea (LP); Cursul 3, slide 5 și 14', q: { 7: ['0:0', '0:1', '0:2'] },
      body: 'Termoliza: totalitatea mecanismelor fizice, adaptative și voluntare care au ca rezultat final pierderea de căldură și, deci, scăderea temperaturii centrale. Pierderea de căldură se realizează printr-o serie de mecanisme fizice: conducție, convecție, iradiere, evaporare.' },
    ra: { t: 'Radiația (iradierea)', dq: 'Pierderea prin radiație', slide: 'Cursul 3, slide 17', q: { 7: ['1:0', '1:1'] }, eff: 1, on: loses('ra'),
      body: 'Iradierea reprezintă modalitatea principală de pierdere a căldurii corporale, ajungând la 60% din total. Corpul uman emite radiații calorice electro-magnetice, în spectrul infraroșu (λ = 5–20 µm), care sunt absorbite de corpurile mai reci din jur, solide sau lichide. Fenomenul are loc și invers: corpul uman absoarbe radiații calorice de la un corp încălzit.' },
    cv: { t: 'Convecția', dq: 'Pierderea prin convecție', slide: 'Cursul 3, slide 16', q: { 7: ['1:4', '1:5'] }, eff: 1, on: loses('cv'),
      body: 'Convecția se realizează prin schimbarea permanentă a aerului cald din contactul direct cu pielea. Poate ajunge până la 12% din pierderile de căldură. Cu cât viteza aerului este mai mare (vânt, deplasarea individului), cu atât crește termoliza. Un strat izolator de îmbrăcăminte poate diminua sau stopa acest fenomen; stratul subcutanat de grăsime funcționează ca izolator termic.' },
    cd: { t: 'Conducția', dq: 'Pierderea prin conducție', slide: 'Cursul 3, slide 15', q: { 7: ['1:2', '1:3'] }, eff: 1, on: loses('cd'),
      body: 'Conducția: schimbul de căldură dintre corp și mediul înconjurător, datorită contactului direct cu mediul. În aer este neglijabilă, mai ales în cazul îmbrăcămintei adecvate (3–4%); în aerul cu o temperatură net inferioară corpului poate deveni însemnată; foarte importantă în cazul imersiei în apă rece.' },
    ev: { t: 'Evaporarea', dq: 'Pierderea prin evaporare', slide: 'Cursul 3, slide 18–19', q: { 7: ['1:6', '1:7'] }, eff: 1, on: loses('ev'),
      body: 'Evaporarea este una dintre cele mai eficiente și rapide metode de pierdere de căldură. În repaus reprezintă aproximativ 25% din pierderile calorice: 13% cutanat, 12% respirator. În mediu cu temperatură de peste 35°C devine principalul mecanism de termoliză. Glandele sudoripare ecrine produc 600 ml de sudoare pierdută prin perspirație insensibilă; în efort sau la căldură, secreția poate ajunge la 1,5–4 l/oră. În caz de umiditate crescută, evaporarea nu poate avea loc.' },
    eq: { t: 'Echilibrul termogeneză–termoliză', slide: 'Cursul 3, slide 5', q: { 7: ['2:0'] },
      body: 'Temperatura internă reprezintă un prag de echilibru între producerea de căldură (termogeneză) și pierderea de căldură (termoliză).' },
    bl: { t: 'Sângele cald aduce căldura la piele', slide: 'Cursul 3, slide 18', body: 'Fluxul sangvin cutanat poate crește de la 5% la 30% și astfel este stimulată activitatea glandelor sudoripare.' },
    fat: { t: 'Grăsimea subcutanată: izolator termic', slide: 'Cursul 3, slide 16', body: 'Stratul subcutanat de grăsime funcționează ca izolator termic.' },
    w1: { t: 'Vântul crește convecția', slide: 'Cursul 3, slide 16', on: S => S.v === 1, body: 'Cu cât viteza aerului este mai mare (exemplu în cazul vântului sau deplasarea individului), cu atât crește termoliza.' },
    w2: { t: 'În apă rece conducția devine foarte importantă', slide: 'Cursul 3, slide 15', on: S => S.v === 2, body: 'Conducția … foarte importantă în cazul imersiei în apă rece.' },
    w3: { t: 'Peste 35 °C rămâne doar evaporarea', slide: 'Cursul 3, slide 18–19', on: S => S.v === 3, body: 'În mediu exterior cu temperatură de peste 35°C devine principalul mecanism de termoliză. Sudorația poate fi singurul mecanism eficient într-un mediu supraîncălzit.' },
    w4: { t: 'Umiditatea mare blochează evaporarea', slide: 'Cursul 3, slide 19', on: S => S.v === 4, body: 'În caz de umiditate crescută, evaporarea nu poate avea loc (căldura umedă este foarte greu de suportat).' },
  };
  const ROWS = [['ra', 1, 'Undele infraroșii care pleacă de pe piele'], ['cv', 2, 'Curenții de aer: moleculele încălzite pleacă'], ['cd', 3, 'Placa metalică rece (sau apa) pe piele'], ['ev', 4, 'Moleculele de apă care pleacă din picături']];
  const hit = a => a.w != null ? `<rect class="hit" x="${a.x.toFixed(1)}" y="${a.y.toFixed(1)}" width="${a.w.toFixed(1)}" height="${a.h.toFixed(1)}" rx="8"/>` : `<circle class="hit" cx="${a.cx}" cy="${a.cy}" r="${a.r}"/>`;
  const badge = (n, [x, y]) => `<g class="bdg-s"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="8.6"/><text x="${x.toFixed(1)}" y="${(y + 3.6).toFixed(1)}" text-anchor="middle" data-ui>${n}</text></g>`;

  FX.def('thermolysis', {
    title: 'Termoliza: cum pierde pielea căldură',
    meta: 'Termoliza: cele patru mecanisme fizice',
    qs: [7],
    kind: 'mix',
    note: 'Un bloc de piele (antebraț) ca suprafață a corpului, același ca la Î1; grosimile straturilor sunt schematice. Căldura vine din sângele cald din plexurile dermului (săgețile roșii din derm). Deasupra pielii: undele infraroșii ale radiației, curenții de aer ai convecției (moleculele de aer se încălzesc lângă piele și sunt duse mai departe), o placă metalică rece pentru conducție (apa, la imersie) și moleculele de apă (O roșu, H alb) care pleacă din picăturile de sudoare. Procentele apar doar pentru repaus și sunt cele din Cursul 3 (slide 15–18); în celelalte scenarii barele arată sensul și mărimea aproximativă, nu valori măsurate.',
    src: 'Cursul 3, slide 5, 14–19; Termoreglarea (LP)',
    neutral: 0,
    ctl: { type: 'range', label: 'Mediul', min: 0, max: 4, step: 1, init: 0, fmt: v => SC[v], play: { ms: 2600, label: 'Treci prin scenarii' } },
    initV: () => 0,
    hints: {
      predict: 'Alege un scenariu, bifează mecanismele prin care pielea pierde căldură în el, apoi apasă „Dezvăluie”.',
      explore: 'Schimbă mediul. Apasă un mecanism din desen sau un rând de mai jos: vezi textul din curs și punctul din barem.',
    },
    predict: { kind: 'pick', prompt: (S, lab) => `Mediul: ${lab}. Prin ce mecanisme pierde pielea căldură?` },
    tour: [
      { v: 0, hl: [], parts: ['def', 'bl'], t: 'Pielea ca radiator',
        see: 'Un bloc de piele în secțiune: epidermul, dermul cu plexurile vasculare și glandele sudoripare, hipodermul cu grăsime. Sângele cald din plexurile dermului aduce căldura spre suprafață (săgețile roșii). De la suprafață, căldura pleacă prin patru mecanisme fizice.' },
      { v: 0, hl: ['ra'], parts: ['ra'], t: 'Radiația: fără contact',
        see: 'Undele infraroșii (1) pleacă de pe piele spre corpurile mai reci din jur. În repaus, la ~21 °C, radiația e calea principală: până la 60% din pierderi.' },
      { v: 0, hl: ['cv'], parts: ['cv'], t: 'Convecția: aerul încălzit e dus de curenți',
        see: 'Moleculele de aer (2) care ating pielea se încălzesc (roșii) și sunt duse de curenți; în locul lor vine aer rece (albastru), care preia din nou căldură.' },
      { v: 0, hl: ['cd'], parts: ['cd'], t: 'Conducția: prin contact direct',
        see: 'Placa metalică rece (3) așezată pe piele preia căldura direct, prin contact (săgețile albastre). În aer, conducția e mică: 3–4%.' },
      { v: 0, hl: ['ev'], parts: ['ev'], t: 'Evaporarea: apa trecută în vapori ia căldura',
        see: 'Din pori pleacă molecule de apă (4): când apa trece în vapori, consumă căldură de pe piele. În repaus, evaporarea dă ~25% din pierderi (13% prin piele, 12% prin respirație).' },
      { v: 1, hl: ['cv'], parts: ['w1'], t: 'Vântul',
        see: 'Curenții de aer (2) se înteţesc: aerul încălzit e înlocuit mai repede, deci convecția crește.' },
      { v: 2, hl: ['cd'], parts: ['w2'], t: 'Imersia în apă rece',
        see: 'Apa acoperă pielea: conducția (3) devine foarte importantă (săgețile albastre pe toată suprafața), iar evaporarea nu mai e posibilă.' },
      { v: 3, hl: ['ev'], parts: ['w3'], t: 'Mediul mai cald decât pielea (peste 35 °C)',
        see: 'Soarele și aerul cald dau căldură pielii (săgețile roșii care intră): radiația, convecția și conducția se inversează. Rămâne un singur mecanism de termoliză: evaporarea sudorii (4).' },
      { v: 4, hl: ['ev'], parts: ['w4'], t: 'Căldura umedă',
        see: 'Aerul e plin de vapori (moleculele de apă din aer). Sudoarea iese, dar nu se mai evaporă: picăturile rămân pe piele și nu iau căldura. De aceea căldura umedă e greu de suportat și duce ușor la hipertermie.' },
      { v: 0, hl: [], parts: ['eq', 'fat'], t: 'Echilibrul',
        see: 'Temperatura centrală e pragul de echilibru dintre termogeneză și termoliză. Hipodermul cu grăsime, de sub derm, e un izolator termic.' },
    ],
    parts: P,
    games: {
      order: {
        prompt: 'Pune mecanismele fizice în ordinea importanței lor în repaus, de la cel mai mare la cel mai mic (Cursul 3).',
        items: [
          { t: 'Radiația (până la 60%)', parts: ['ra'] },
          { t: 'Evaporarea (~25%)', parts: ['ev'] },
          { t: 'Convecția (până la 12%)', parts: ['cv'] },
          { t: 'Conducția (3–4%)', parts: ['cd'] },
        ],
      },
    },
    now(S) { return `<b data-ui>${SC[S.v]}</b>`; },
    stage(o, H, S) {
      const uid = 'fx' + FX.n, U = x => x.replaceAll('__U__', uid), L = A.L;
      let s = `<div class="tl" data-sc="${S.v}">`;
      s += `<svg class="iso-svg tl-svg an-svg" viewBox="0 0 ${A.W} ${A.H}" role="group" aria-label="Bloc de piele în secțiune cu cele patru căi de pierdere a căldurii: radiație, convecție, conducție și evaporare">`;
      s += `<defs>${U(A.defs)}</defs>`;
      s += `<g class="tl-sun">${L.sun}</g>`;
      s += U(L.skin) + `<g class="heat">${L.heat}</g>` + U(L.skinTop);
      s += `<g class="tl-plate">${L.plate}<g class="cond">${L.cond}</g></g>`;
      s += `<g class="tl-water">${L.water}<g class="cond">${L.condW}</g></g>`;
      s += `<g class="tl-gain heat">${L.gain}</g>`;
      s += `<g class="tl-radout">${L.radOut}</g><g class="tl-radin">${L.radIn}</g>`;
      s += `<g class="tl-conv">${L.conv}</g>`;
      s += `<g class="tl-vap">${L.vap}</g><g class="tl-hum">${L.humid}</g>`;
      const hs = A.hits, bd = A.badges;
      s += H.spart('ra', hit(hs.rad) + badge(1, bd.rad));
      s += H.spart('cv', hit(hs.conv) + badge(2, bd.conv));
      s += H.spart('cd', hit(hs.cond) + badge(3, bd.cond));
      s += H.spart('ev', hs.evap.map(hit).join('') + badge(4, bd.evap));
      s += H.spart('bl', hit(hs.skin));
      s += '</svg>';
      const cut = s.length;
      s += `<ul class="circ-rows tl-rows" aria-label="Mecanismele fizice">${ROWS.map(([id, b, dev]) => `<li><button type="button" class="fxp row" data-p="${id}"><span class="bdg" data-ui>${b}</span><span class="rt"><span class="rl">${H.lab('l' + id, P[id].t)}</span><span class="rd" data-ui>${dev}<i class="pct" data-ui></i></span></span><span class="trk" aria-hidden="true"><i><u></u></i></span><span class="ar" aria-hidden="true"></span></button></li>`).join('')}</ul>`;
      s += `<div class="circ-sym"><span class="sl" data-ui>Din curs</span>${['def', 'eq', 'bl', 'fat', 'w1', 'w2', 'w3', 'w4'].map(id => `<button type="button" class="fxp sym" data-p="${id}">${P[id].t}</button>`).join('')}</div></div>`;
      return { view: s.slice(0, cut) + '</div>', legend: '<div class="tl tl-leg circ">' + s.slice(cut) };
    },
    update(el, S) {
      const root = el.querySelector('.tl'); if (!root) return;
      const v = Math.max(0, Math.min(4, Math.round(S.vv)));
      root.dataset.sc = v; root.dataset.sw = v >= 3 ? '1' : '0';
      root.style.setProperty('--dil', v >= 3 ? 1 : 0);
      el.querySelectorAll('.tl-rows .row').forEach(b => {
        const id = b.dataset.p, [dir, mag] = M[id][v];
        b.querySelector('u').style.width = (mag * 100).toFixed(0) + '%';
        b.dataset.ch = dir === 1 ? -1 : dir === -1 ? 1 : 0;
        b.querySelector('.ar').textContent = dir === 1 ? '↑' : dir === -1 ? '↓' : '✕';
        b.querySelector('.ar').title = dir === 1 ? 'pierde căldură' : dir === -1 ? 'primește căldură' : 'blocat';
        b.querySelector('.pct').textContent = v === 0 ? ' · ' + PCT[id] : dir === -1 ? ' · inversat: pielea primește căldură' : dir === 0 ? ' · nu are loc' : '';
      });
      el.querySelectorAll('.tl-leg .sym').forEach(b => b.classList.toggle('lit', FX.isOn(P[b.dataset.p], { v })));
    },
    panel(S, H) {
      const ids = ['ra', 'cv', 'cd', 'ev'].filter(id => FX.isOn(P[id], S));
      return `<section class="fx-grp"><h4><span data-ui>Pierd căldură: ${SC[S.v]}</span><small>Cursul 3</small></h4><ol class="fx-chain flat">${ids.length ? ids.map(id => `<li>${H.node(id, 'cold')}</li>`).join('') : '<li class="fx-gap">Niciun mecanism fizic nu scoate căldura: temperatura centrală crește.</li>'}</ol></section>`;
    },
  });
})();
