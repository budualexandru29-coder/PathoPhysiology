/* ===== Figuri (SVG inline + scheme HTML), toate redesenate după conținutul LP ===== */
const FIGS = {};
const FIGMETA = {};
function fig(title, inner, cap, cls) {
  return `<figure class="fig ${cls || ''}">${title ? `<span class="ft">${title}</span>` : ''}${inner}${cap ? `<figcaption>${cap}</figcaption>` : ''}</figure>`;
}
function wrapTxt(s, n) {
  const out = []; let cur = '';
  s.split(' ').forEach(w => { if ((cur + ' ' + w).trim().length > n && cur) { out.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); });
  if (cur) out.push(cur);
  return out;
}
function tspans(lines, x, y, lh, attrs) {
  return `<text x="${x}" y="${y}" ${attrs || ''}>${lines.map((l, i) => `<tspan x="${x}" dy="${i ? lh : 0}">${esc(l)}</tspan>`).join('')}</text>`;
}
function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
const ARROW = id => `<defs>${[['i', 'f-ink'], ['h', 'f-heat'], ['c', 'f-cold']].map(([k, c]) => `<marker id="${id}-${k}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="${c}"/></marker>`).join('')}</defs>`;
let _fid = 0;

/* ===== Motorul de desen pentru cascade și scheme =====
   Conectorii sunt SVG (linia și vârful în același desen, deci mereu aliniate).
   Barele bifurcațiilor sunt desenate de fiecare coloană, din mijlocul ei, ca să cadă exact pe săgeata coloanei. */
function arrowSVG(h, open) {
  return `<svg class="ca" width="14" height="${h}" viewBox="0 0 14 ${h}" aria-hidden="true" focusable="false"><line x1="7" y1="0" x2="7" y2="${open ? h : h - 5}"/><path d="M1.5 ${h - 9} L7 ${h} L12.5 ${h - 9} Z"/></svg>`;
}
function renderFlow(f, o) {
  o = o || {};
  let zone = null, num = 0, idx = 0;
  const conn = (e, cls) => { const h = cls && cls.includes('drop') ? (e ? 34 : 22) : (e ? 34 : 26); return `<div class="fc ${cls || ''}" aria-hidden="true">${arrowSVG(h, cls && cls.includes('tofork'))}${e ? `<span class="flab">${e}</span>` : ''}</div>`; };
  const nb = x => String(x).replace(/([↑↓→←⊣]) /g, '$1 ').replace(/(^|[\s(])(Vaso|vaso|Hiper|hiper|Hipo|hipo|Micro|micro|Termo|termo|Glomerulo|glomerulo)(?=[a-zăâîșț]{6,})/g, '$1$2­').replace(/\b(IL|TNF|IFN|COX|EF|TLR|CD|MHC|PGE|LT|LB|C)-(?=[\wαβγ])/g, '$1‑');
  const node = (s, label, zOverride) => {
    const z = s.z || zOverride;
    const showZ = z && z !== zone; if (z) zone = z;
    const body = `<span class="fb">${showZ ? `<span class="fz">${z}</span>` : ''}<b class="ftt">${nb(s.t)}</b>${s.d ? `<span class="fd">${nb(s.d)}</span>` : ''}${s.x ? '<span class="fx">explicație suplimentară</span>' : ''}${s.w ? `<span class="fq">de ce?</span><span class="why">${s.w}</span>` : ''}</span>`;
    const lab = o.plain ? '' : label;
    const cls = `fn ${s.k || ''} ${lab ? '' : 'nonum'}`;
    return (s.w ? `<button type="button" class="${cls}" data-act="why" aria-expanded="false">${lab ? `<span class="fnum">${lab}</span>` : ''}${body}</button>` : `<div class="${cls}">${lab ? `<span class="fnum">${lab}</span>` : ''}${body}</div>`)
      + (s.side ? `<div class="side">${s.side.t}</div>` : '');
  };
  const items = f.steps.map((s, si) => {
    const first = si === 0, lastItem = si === f.steps.length - 1;
    num++;
    if (s.br) {
      const n = s.br.length, z0 = zone, st = n >= 3 || o.stack ? 'st' : '';
      const cols = s.br.map((col, ci) => {
        zone = ci > 0 ? (s.z || z0) : z0;
        let h = conn(col[0].e, 'drop');
        col.forEach((x, k) => { if (k) h += conn(x.e); h += node(x, k === 0 ? num + 'abcd'[ci] : '', k === 0 && ci === 0 ? s.z : null); });
        if (!lastItem) h += '<div class="rise" aria-hidden="true"></div>';
        return `<div class="fcol">${h}</div>`;
      }).join('');
      zone = s.z || zone;
      return `<div class="fi fbr" data-i="${idx++}">${first ? '' : conn(s.e, 'tofork ' + st)}<div class="fork n${n} ${st} ${lastItem ? '' : 'join'}"><span class="fpar">în paralel</span>${cols}</div></div>`;
    }
    return `<div class="fi" data-i="${idx++}">${first ? '' : conn(s.e)}${node(s, String(num))}</div>`;
  }).join('');
  const hasWhy = f.steps.some(s => s.w || (s.br && s.br.some(c => c.some(x => x.w))));
  const tools = o.tools && !o.plain ? `<div class="flow-tools">
      <button type="button" class="btn sm soft" data-act="stepstart">Pas cu pas</button>
      <button type="button" class="btn sm" data-act="essopt" aria-pressed="${!!o.ess}">${o.ess ? 'Arată detaliile' : 'Doar esențialul'}</button></div>` : '';
  return `<div class="flow ${o.tone || ''} ${o.plain ? 'plain' : ''}" ${o.key ? `id="fl-${o.key}" data-key="${o.key}"` : ''} data-n="${idx}">
    ${f.t || tools ? `<div class="flow-h">${f.t ? `<b>${f.t}</b>` : ''}${tools}</div>` : ''}
    <div class="fl">${items}</div>
    ${tools ? `<div class="flow-foot" hidden><button type="button" class="btn sm" data-act="stepall">Arată tot</button><button type="button" class="btn sm primary" data-act="stepnext">Următorul pas</button></div>` : ''}
    ${hasWhy && o.tip ? '<p class="flow-tip">Atinge un pas cu „de ce?” ca să vezi explicația.</p>' : ''}
  </div>`;
}

/* --- 1. Scala temperaturii centrale (slide 7 + praguri din LP) --- */
FIGMETA.thermo = { t: 'Scala temperaturii centrale', q: [1, 2, 5, 6] };
FIGS.thermo = function (o) {
  o = o || {};
  const T0 = 26, T1 = 45, y0 = 18, y1 = 478, W = 360, H = 524;
  const Y = t => y0 + (T1 - t) * (y1 - y0) / (T1 - T0);
  const tone = t => t === 'cold' ? 'cold' : 'heat';
  const bands = [[40, 44, 'Șoc termic cu insuficiență multiplă de organ', 'heat'], [38, 40, 'Hipertermie', 'heat'], [36, 38, 'Interval normal', 'ok'], [34, 36, 'Hipotermie medie', 'cold'], [30, 34, 'Alterarea mecanismelor termoreglării', 'cold'], [27, 29, 'Aritmii cardiace', 'cold']];
  let s = '';
  (o.marks || []).forEach(([a, b, , tn]) => { s += `<rect x="98" y="${Y(b)}" width="260" height="${Y(a) - Y(b)}" rx="4" class="b-${tone(tn)}" stroke="none" fill-opacity=".55"/>`; });
  for (let t = T0; t <= T1; t++) {
    const y = Y(t).toFixed(1);
    s += `<line x1="120" x2="${t % 2 ? 124 : 128}" y1="${y}" y2="${y}" class="ln" stroke-width="1"/>`;
    if (t % 2 === 0) s += `<text x="131" y="${(+y + 4).toFixed(1)}" font-size="11.5" class="mu mono">${t}</text>`;
  }
  s += `<text x="131" y="${Y(37) + 4}" font-size="11.5" font-weight="700" class="mono t-heat">37</text>`;
  bands.forEach(([a, b, l, tn]) => {
    const ya = Y(b), yb = Y(a), h = yb - ya, lines = wrapTxt(l, 25);
    s += `<rect x="152" y="${ya + 1.5}" width="204" height="${h - 3}" rx="5" class="b-${tn}" stroke-width="1"/>`;
    s += tspans(lines, 162, (ya + yb) / 2 - (lines.length - 1) * 8 + 4.5, 16, 'font-size="13" font-weight="600"');
    s += `<text x="348" y="${ya + 14}" text-anchor="end" font-size="10" class="mu mono">${a}–${b}°</text>`;
  });
  s += `<rect x="104" y="${y0 - 8}" width="16" height="${y1 - y0 + 18}" rx="8" class="b-sheet" stroke-width="1.5"/>`;
  s += `<rect x="108" y="${Y(37)}" width="8" height="${y1 - Y(37) + 12}" class="f-heat"/>`;
  s += `<circle cx="112" cy="${y1 + 24}" r="14" class="f-heat"/>`;
  s += `<line x1="98" x2="126" y1="${Y(37)}" y2="${Y(37)}" class="ink" stroke-width="1.4" stroke-dasharray="4 3"/><line x1="146" x2="152" y1="${Y(37)}" y2="${Y(37)}" class="ink" stroke-width="1.4"/>`;
  (o.marks || []).forEach(([a, b, l, tn]) => {
    const ya = Y(b), yb = Y(a), lines = wrapTxt(l, 12);
    s += `<path d="M88 ${ya + 1} H94 V${yb - 1} H88" class="s-${tone(tn)}" stroke-width="2.2"/>`;
    s += tspans(lines, 84, (ya + yb) / 2 - (lines.length - 1) * 7.5 + 4.5, 15, `text-anchor="end" font-size="12.5" font-weight="700" class="t-${tone(tn)}"`);
  });
  const svg = `<div class="svgw"><svg viewBox="0 0 ${W} ${H}" width="${W}" role="img" aria-label="Scala temperaturii centrale de la 26 la 45 de grade, cu consecințele fiecărui interval">${s}</svg></div>`;
  return fig('Scala temperaturii centrale', svg, 'Benzile reproduc tabelul „Consecințele modificării temperaturii corpului” (slide 7). Linia punctată e valoarea de referință normală, 37°C. Zona colorată din stânga e intervalul din întrebare.');
};

/* --- 2. Răcirea selectivă a creierului --- */
FIGMETA.braincool = { t: 'Răcirea selectivă a creierului', q: [2] };
FIGS.braincool = function () {
  const id = 'ab' + (++_fid);
  const s = `${ARROW(id)}
  <rect x="10" y="20" width="158" height="74" rx="10" class="b-cold" stroke-width="1.5"/>
  <text x="32" y="42" font-size="13" font-weight="700">Tegumentul capului</text>
  <text x="20" y="62" font-size="12">sudorație ↑ → evaporare</text>
  <text x="20" y="80" font-size="12">sângele venos se răcește</text>
  <path d="M70 94 V176 H166" class="s-cold" stroke-width="2.5" marker-end="url(#${id}-c)"/>
  <text x="78" y="126" font-size="11.5" class="t-cold">vene oftalmice,</text>
  <text x="78" y="141" font-size="11.5" class="t-cold">vene emisare</text>
  <rect x="170" y="116" width="200" height="128" rx="14" class="b-cold" stroke-width="1.5"/>
  <text x="182" y="140" font-size="13" font-weight="700">Sinusul cavernos</text>
  <text x="198" y="164" font-size="12">sânge venos</text>
  <text x="198" y="179" font-size="12">răcit</text>
  <rect x="300" y="34" width="24" height="300" rx="12" class="b-heat" stroke-width="1.5"/>
  <path d="M312 300 V64" class="s-heat" stroke-width="2.5" marker-end="url(#${id}-h)"/>
  <path d="M296 168 H262 M296 186 H262 M296 204 H262" class="s-heat" stroke-width="2" marker-end="url(#${id}-h)"/>
  <text x="270" y="232" font-size="11.5" text-anchor="middle" class="t-heat" font-weight="700">conducție</text>
  <text x="396" y="22" font-size="12" text-anchor="end" font-weight="700">spre creier: sânge arterial răcit</text>
  <text x="312" y="352" font-size="12" text-anchor="middle">a. carotidă internă, sânge cald</text>
  ${[[18, 14, 1], [64, 112, 2], [182, 160, 3], [334, 88, 4]].map(([x, y, n]) => `<circle cx="${x}" cy="${y}" r="9" class="f-pen"/><text x="${x}" y="${y + 4}" text-anchor="middle" font-size="11" font-weight="700" class="mono" style="fill:var(--sheet)">${n}</text>`).join('')}`;
  const svg = `<div class="svgw"><svg viewBox="0 0 400 362" width="400" role="img" aria-label="Sângele venos răcit la suprafața capului ajunge în sinusul cavernos și preia prin conducție căldura sângelui din artera carotidă internă">${s}</svg></div>`;
  return fig('Răcirea selectivă a creierului (40–40,5°C)', svg, '<ol class="figsteps"><li>Sudorația capului: sângele venos superficial se răcește prin evaporare.</li><li>Sângele rece drenează prin venele oftalmice și emisare (sistemul venos endocranian).</li><li>Ajunge în sinusul cavernos, care înconjoară artera carotidă internă.</li><li>Prin conducție, sângele arterial care urcă spre creier se răcește.</li></ol>');
};

/* --- 3. Cele patru mecanisme fizice ale termolizei --- */
FIGMETA.termoliza = { t: 'Mecanismele fizice ale termolizei', q: [7] };
FIGS.termoliza = function () {
  const id = 'at' + (++_fid);
  const s = `${ARROW(id)}
  <rect x="150" y="92" width="100" height="148" rx="44" class="b-heat" stroke-width="1.5"/>
  <text x="200" y="166" text-anchor="middle" font-size="18" font-weight="700" class="mono">37°C</text>
  <text x="200" y="186" text-anchor="middle" font-size="12" class="mu">corp</text>
  <path d="M140 104 q-10 12 0 24 M126 96 q-16 20 0 40 M112 88 q-22 28 0 56" class="s-heat" stroke-width="2" stroke-linecap="round"/>
  <path d="M100 96 L66 56" class="s-heat" stroke-width="2" marker-end="url(#${id}-h)"/>
  <text x="10" y="30" font-size="13" font-weight="700">Radiație</text>
  <text x="10" y="46" font-size="11.5" class="mu">infraroșu, fără contact</text>
  <path d="M236 98 L326 50" class="s-cold" stroke-width="2" marker-end="url(#${id}-c)"/>
  <circle cx="262" cy="74" r="3" class="f-cold"/><circle cx="286" cy="66" r="3" class="f-cold"/><circle cx="276" cy="86" r="3" class="f-cold"/>
  <text x="394" y="28" text-anchor="end" font-size="13" font-weight="700">Evaporare</text>
  <text x="394" y="44" text-anchor="end" font-size="11.5" class="mu">sudoare → vapori</text>
  <path d="M252 160 H340" class="s-cold" stroke-width="2" marker-end="url(#${id}-c)"/>
  <path d="M262 176 q12 -8 24 0 t24 0 t24 0" class="ln" stroke-width="1.5"/>
  <path d="M262 144 q12 -8 24 0 t24 0 t24 0" class="ln" stroke-width="1.5"/>
  <text x="394" y="132" text-anchor="end" font-size="13" font-weight="700">Convecție</text>
  <text x="394" y="200" text-anchor="end" font-size="11.5" class="mu">curenți de aer</text>
  <path d="M200 240 V258" class="s-cold" stroke-width="2.5" marker-end="url(#${id}-c)"/>
  <rect x="110" y="262" width="180" height="18" rx="4" class="b-cold" stroke-width="1.5"/>
  <text x="200" y="300" text-anchor="middle" font-size="11.5" class="mu">suprafață rece</text>
  <text x="300" y="268" font-size="13" font-weight="700">Conducție</text>
  <text x="300" y="284" font-size="11.5" class="mu">contact direct</text>`;
  const svg = `<div class="svgw"><svg viewBox="0 0 400 310" width="400" role="img" aria-label="Corpul pierde căldură prin radiație, evaporare, convecție și conducție">${s}</svg></div>`;
  return fig('Termoliza: patru căi fizice', svg, 'Radiația și evaporarea nu cer contact; conducția cere contact direct; convecția depinde de mișcarea aerului sau a apei din jurul corpului.');
};

/* --- 4. Bucla termoreglării (slide 5) --- */
FIGMETA.loop = { t: 'Bucla de feedback a termoreglării', q: [7, 8] };
FIGS.loop = function () {
  const id = 'al' + (++_fid);
  const box = (x, y, w, h, title, lines, cls) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" class="${cls || 'b-sheet'}" stroke-width="1.5"/><text x="${x + 10}" y="${y + 20}" font-size="12.5" font-weight="700">${title}</text>` + lines.map((l, i) => `<text x="${x + 10}" y="${y + 37 + i * 15}" font-size="11.5" class="mu">${l}</text>`).join('');
  const s = `${ARROW(id)}
  ${box(10, 14, 172, 62, 'Temperatura centrală', ['menținută ~37°C'], 'b-heat')}
  ${box(10, 126, 172, 62, '1. Receptori termici', ['piele, viscere, hipotalamus'])}
  ${box(10, 238, 172, 62, '2. Căi aferente', ['termosenzitive'])}
  ${box(218, 238, 172, 62, '3. Integrare în SNC', ['hipotalamus: compară cu', 'valoarea de referință'], 'b-pen')}
  ${box(218, 126, 172, 62, '4. Căi eferente', ['nervoase, hormonale'])}
  ${box(218, 6, 172, 84, '5. Efectori termici', ['țesut adipos brun, mușchi', 'striat, vase cutanate,', 'glande sudoripare'])}
  <path d="M96 76 V122" class="ink" stroke-width="1.8" marker-end="url(#${id}-i)"/>
  <path d="M96 188 V234" class="ink" stroke-width="1.8" marker-end="url(#${id}-i)"/>
  <path d="M182 269 H214" class="ink" stroke-width="1.8" marker-end="url(#${id}-i)"/>
  <path d="M304 238 V192" class="ink" stroke-width="1.8" marker-end="url(#${id}-i)"/>
  <path d="M304 126 V94" class="ink" stroke-width="1.8" marker-end="url(#${id}-i)"/>
  <path d="M218 45 H186" class="ink" stroke-width="1.8" marker-end="url(#${id}-i)"/>`;
  const svg = `<div class="svgw"><svg viewBox="0 0 400 310" width="400" role="img" aria-label="Bucla termoreglării: receptori, căi aferente, hipotalamus, căi eferente, efectori, temperatura centrală">${s}</svg></div>`;
  return fig('Termoreglarea: bucla de feedback', svg, 'Cele cinci componente din slide-ul 5. Efectorii modifică temperatura centrală, iar receptorii o raportează din nou hipotalamusului.');
};

/* --- 5. Balanța termică --- */
FIGMETA.balance = { t: 'Balanța termogeneză–termoliză', q: [8] };
FIGS.balance = function () {
  const pan = (x, title, cls, items) => `<rect x="${x}" y="164" width="156" height="94" rx="10" class="${cls}" stroke-width="1.5"/><text x="${x + 10}" y="184" font-size="13" font-weight="700">${title}</text>` + items.map((t, i) => `<text x="${x + 10}" y="${203 + i * 15}" font-size="11.5">${t}</text>`).join('');
  const s = `
  <line x1="88" y1="164" x2="88" y2="132" class="ln" stroke-width="1.5"/><line x1="312" y1="164" x2="312" y2="132" class="ln" stroke-width="1.5"/>
  <line x1="60" y1="132" x2="340" y2="132" class="ink" stroke-width="4" stroke-linecap="round"/>
  <circle cx="200" cy="132" r="6" class="f-pen"/>
  <path d="M200 132 L178 246 H222 Z" class="b-pen" stroke-width="1.5"/>
  <text x="200" y="112" text-anchor="middle" font-size="12.5" font-weight="700">hipotalamus</text>
  <text x="200" y="232" text-anchor="middle" font-size="12" font-weight="700" class="mono t-pen">37°C</text>
  ${pan(10, 'Termogeneză', 'b-heat', ['metabolism celular (70%)', 'ATP-aza Na⁺/K⁺', 'frison (mușchi striat)', 'țesut adipos brun'])}
  ${pan(234, 'Termoliză', 'b-cold', ['radiație', 'convecție', 'conducție', 'evaporare'])}
  `;
  const svg = `<div class="svgw"><svg viewBox="0 96 400 170" width="400" role="img" aria-label="Balanța dintre termogeneză și termoliză, controlată de hipotalamus la 37 de grade">${s}</svg></div>`;
  return fig('Balanța termică', svg, 'Termogeneza și termoliza sunt în echilibru și interdependente (slide 6). Dacă producția depășește pierderea apare hipertermia; dacă pierderea depășește producția, hipotermia.');
};

const LEGEND = '<div class="lg"><span><i class="d"></i>valoarea de referință (setpoint)</span><span><i></i>temperatura centrală</span></div>';
/* --- 6. Febră vs hipertermie --- */
FIGMETA.feverVsHyper = { t: 'Febră vs hipertermie (grafic)', q: [10] };
FIGS.feverVsHyper = function () {
  const Y = t => 170 - (t - 36) * 30;
  const axes = `<line x1="36" y1="20" x2="36" y2="172" class="ln"/><line x1="36" y1="172" x2="292" y2="172" class="ln"/>` + [37, 39, 41].map(t => `<text x="30" y="${Y(t) + 4}" text-anchor="end" font-size="11" class="mu mono">${t}</text><line x1="36" x2="292" y1="${Y(t)}" y2="${Y(t)}" class="gr"/>`).join('') + `<text x="292" y="190" text-anchor="end" font-size="11" class="mu">timp →</text><text x="36" y="12" font-size="11" class="mu">°C</text>`;
  const f = `<svg viewBox="0 0 300 196" width="300" role="img" aria-label="În febră valoarea de referință urcă la 39,5 grade, iar temperatura centrală o urmează"> ${axes}
    <path d="M36 ${Y(37)} H90 V${Y(39.5)} H200 V${Y(37)} H292" class="s-pen" stroke-width="2" stroke-dasharray="6 4"/>
    <path d="M36 ${Y(37)} H90 C122 ${Y(37)} 128 ${Y(39.5)} 160 ${Y(39.5)} H200 C222 ${Y(39.5)} 230 ${Y(37)} 262 ${Y(37)} H292" class="s-heat" stroke-width="3"/>
    <text x="118" y="${Y(37.5)}" font-size="11.5" class="t-heat" font-weight="700">frison</text>
    <text x="226" y="${Y(38.7)}" font-size="11.5" class="t-cold" font-weight="700">sudorație</text>
    <text x="146" y="${Y(39.5) - 8}" font-size="11" class="t-pen" text-anchor="middle">setpoint ↑</text></svg>`;
  const h = `<svg viewBox="0 0 300 196" width="300" role="img" aria-label="În hipertermie valoarea de referință rămâne la 37 de grade, iar temperatura centrală o depășește"> ${axes}
    <path d="M36 ${Y(37)} H292" class="s-pen" stroke-width="2" stroke-dasharray="6 4"/>
    <path d="M36 ${Y(37)} H80 C140 ${Y(37.2)} 170 ${Y(40)} 240 ${Y(40.3)} H292" class="s-heat" stroke-width="3"/>
    <text x="150" y="${Y(37) + 16}" font-size="11" class="t-pen" text-anchor="middle">setpoint nemodificat (37°C)</text>
    <text x="196" y="${Y(40.3) - 10}" font-size="11.5" class="t-heat" font-weight="700" text-anchor="middle">termoliză depășită</text></svg>`;
  const inner = `${LEGEND}<div class="duo"><div><h4>Febră</h4><div class="svgw">${f}</div></div><div><h4>Hipertermie</h4><div class="svgw">${h}</div></div></div>`;
  return fig('Febră vs hipertermie', inner, 'În febră temperatura centrală urmărește un setpoint crescut; în hipertermie depășește un setpoint rămas normal.');
};

/* --- 7. Fazele febrei --- */
FIGMETA.feverCurve = { t: 'Fazele febrei (grafic)', q: [11] };
FIGS.feverCurve = function () {
  const Y = t => 200 - (t - 36) * 36;
  const s = `
  <rect x="100" y="16" width="90" height="186" class="b-sheet2"/><rect x="290" y="16" width="80" height="186" class="b-sheet2"/>
  <text x="145" y="32" text-anchor="middle" font-size="13" font-weight="700" class="mono t-pen">I</text>
  <text x="240" y="32" text-anchor="middle" font-size="13" font-weight="700" class="mono t-pen">II</text>
  <text x="330" y="32" text-anchor="middle" font-size="13" font-weight="700" class="mono t-pen">III</text>
  <line x1="40" y1="16" x2="40" y2="202" class="ln"/><line x1="40" y1="202" x2="412" y2="202" class="ln"/>
  ${[37, 38, 39, 40].map(t => `<text x="34" y="${Y(t) + 4}" text-anchor="end" font-size="11" class="mu mono">${t}</text>`).join('')}
  <text x="412" y="220" text-anchor="end" font-size="11" class="mu">timp →</text>
  <path d="M40 ${Y(37)} H100 V${Y(39.6)} H290 V${Y(37)} H412" class="s-pen" stroke-width="2" stroke-dasharray="6 4"/>
  <path d="M40 ${Y(37)} H100 C132 ${Y(37)} 150 ${Y(39.6)} 190 ${Y(39.6)} H290 C314 ${Y(39.6)} 334 ${Y(37)} 370 ${Y(37)} H412" class="s-heat" stroke-width="3"/>
  <text x="145" y="${Y(36.45)}" text-anchor="middle" font-size="11" class="t-heat">Tc &lt; setpoint</text>
  <text x="330" y="${Y(36.45)}" text-anchor="middle" font-size="11" class="t-cold">Tc &gt; setpoint</text>`;
  const svg = `<div class="svgw"><svg viewBox="0 0 420 228" width="420" role="img" aria-label="Fazele febrei: creștere, platou și scădere a temperaturii față de valoarea de referință">${s}</svg></div>`;
  const leg = `<ol class="phases">
    <li><b class="n">I</b><span><b>Ascensiune</b>: setpoint-ul crește brusc; temperatura reală e mai mică → vasoconstricție (pielea se răcește, <b>senzație de frig</b>) și <b>frison</b>.</span></li>
    <li><b class="n">II</b><span><b>Platou</b>: temperatura centrală a atins noul setpoint și e menținută la nivel ridicat prin termogeneză.</span></li>
    <li><b class="n">III</b><span><b>Defervescență</b>: setpoint-ul scade; temperatura centrală e mai mare → <b>vasodilatație</b>, senzație de căldură, <b>sudorație abundentă</b>.</span></li></ol>`;
  return fig('Fazele febrei', LEGEND + svg + leg, '');
};

/* --- 8. Tipare de infecție virală --- */
FIGMETA.viralPatterns = { t: 'Persistența virală (grafice)', q: [40] };
FIGS.viralPatterns = function () {
  const panel = (title, d, extra, aria) => `<div><h4>${title}</h4><div class="svgw"><svg viewBox="0 0 240 118" width="240" role="img" aria-label="${aria}">
    <line x1="14" y1="96" x2="232" y2="96" class="ln"/><line x1="14" y1="8" x2="14" y2="96" class="ln"/>
    <text x="18" y="14" font-size="10" class="mu">virus</text><text x="232" y="112" text-anchor="end" font-size="10" class="mu">timp →</text>
    <path d="${d}" class="s-cold" stroke-width="2.6"/>${extra || ''}</svg></div></div>`;
  const inner = `<div class="duo">
    ${panel('Acută, cu clearance', 'M14 96 C40 96 50 22 70 22 C92 22 104 96 130 96 H232', '<text x="180" y="88" text-anchor="middle" font-size="11" class="t-ok" style="fill:var(--ok)" font-weight="700">clearance</text>', 'Virusul crește apoi dispare complet')}
    ${panel('Latentă', 'M14 96 C30 96 38 30 52 30 C66 30 74 94 92 94 H134 C140 94 142 66 148 66 C154 66 156 94 162 94 H196 C202 94 204 62 210 62 C216 62 218 94 224 94 H232', '<text x="186" y="50" text-anchor="middle" font-size="11" class="t-cold" font-weight="700">reactivări</text>', 'Virusul scade aproape de zero și se reactivează periodic')}
    ${panel('Cronică (productivă)', 'M14 96 C30 96 38 24 54 24 C70 24 80 62 100 64 C140 66 190 60 232 62', '<text x="140" y="86" text-anchor="middle" font-size="11" class="t-cold" font-weight="700">producție continuă, ritm scăzut</text>', 'Virusul rămâne la un nivel moderat constant')}
    ${panel('Lentă (progresivă)', 'M14 96 C60 95 130 94 170 90 C196 86 214 40 232 16', '<text x="100" y="84" text-anchor="middle" font-size="11" class="t-cold" font-weight="700">incubație de ani</text>', 'Virusul rămâne minim ani de zile, apoi crește rapid')}
  </div>`;
  return fig('Evoluția încărcăturii virale', inner, 'Desene schematice, fără valori reale: arată doar forma fiecărui tip de infecție descris în slide-urile 35–36.');
};

/* --- 9. Diseminarea virală (HTML) --- */
FIGMETA.viralRoutes = { t: 'Căile de diseminare virală', q: [39] };
FIGS.viralRoutes = function () {
  const d = renderFlow({ steps: [
    { t: 'Poarta de intrare', d: 'replicare inițială', k: 'start' },
    { br: [[{ t: 'Rămâne localizat', d: 'infecție locală', k: 'end' }], [{ t: 'Diseminează', d: 'infecție sistemică', k: 'end' }]] }
  ] }, { plain: true, tone: 'cold' });
  const routes = `<p class="lt" style="margin:16px 0 8px">Căile de diseminare</p><div class="routes">
      <div><b>Sanguină</b><span>liber în plasmă sau în celulele sanguine</span></div>
      <div><b>Limfatică</b><span>prin vasele limfatice</span></div>
      <div><b>Neurală</b><span>de-a lungul axonilor nervilor periferici</span></div>
      <div><b>Transplacentară</b><span>de la mamă la făt</span></div></div>`;
  return fig('Diseminarea virusului', d + routes, 'Cele patru căi din slide-ul 34.');
};

/* --- 10. Limfomul Hodgkin: clasificare (HTML) --- */
FIGMETA.hodgkinTree = { t: 'Clasificarea limfomului Hodgkin', q: [16] };
FIGS.hodgkinTree = function () {
  const d = renderFlow({ steps: [
    { t: 'Limfomul Hodgkin', k: 'start' },
    { br: [[{ t: 'Limfom Hodgkin clasic', d: '<ul><li>scleroză nodulară</li><li>celularitate mixtă</li><li>bogat în limfocite</li><li>sărac în limfocite</li></ul>' }], [{ t: 'Limfom Hodgkin nodular cu predominanță limfocitară' }]] }
  ] }, { plain: true, tone: 'pen' });
  return fig('Clasificare', d, '');
};

/* --- 11. Schema febrei în faringita streptococică (după slide 26) --- */
FIGMETA.strepScheme = { t: 'Schema febrei în faringita streptococică', q: [18] };
FIGS.strepScheme = function () {
  const d = renderFlow({ steps: [
    { t: 'Substanțe pirogene', k: 'start' },
    { br: [[{ t: 'Exogene', d: 'exotoxine opsonizate de complement și fagocitate de macrofage (celule Kupffer), care eliberează citokine' }], [{ t: 'Endogene', d: 'IL (1α, 1β, 6, 8, 11) · interferon (α2 și γ) · TNF α și β' }]] },
    { t: 'Hipotalamus', d: 'aria preoptică · organul vascular al lamei terminale' },
    { t: 'Termogeneză', d: 'vasoconstricție periferică, frison, intensificarea metabolismului bazal, stimularea glicolizei, tahicardie, crește debitul cardiac' },
    { t: 'FEBRĂ', k: 'end' }
  ] }, { plain: true, tone: 'heat' });
  return fig('Schema din slide-ul 26', d, 'Aceleași etichete ca în materialul disciplinei, reașezate pentru ecranul telefonului.');
};

/* --- 12. Cauzele inflamației (HTML) --- */
FIGMETA.inflamCauses = { t: 'Cauzele inflamației', q: [21] };
FIGS.inflamCauses = function () {
  const d = renderFlow({ steps: [
    { t: 'Cauzele reacției inflamatorii', k: 'start' },
    { br: [
      [{ t: 'Exogene', d: '<ul><li>microorganisme: fungi, bacterii, virusuri, paraziți</li><li>corpi străini: polen, proteine străine, azbest, siliciu, pulberi, iritanți inhalatori</li></ul>' }],
      [{ t: 'Endogene', d: '<ul><li>produși ai distrucției tisulare (mecanic, chimic, fizic: temperatură, UV, raze X, radioactivitate)</li><li>celule tumorale</li><li>cristale: acid uric, oxalat și fosfat de calciu, colesterol</li></ul>' }]
    ] }
  ] }, { plain: true, tone: 'pen', stack: true });
  return fig('Cauzele inflamației', d, '');
};

/* --- 13. Tabelul hipersensibilităților (HTML) --- */
FIGMETA.hsTable = { t: 'Cele patru tipuri de hipersensibilitate', q: [23, 24] };
FIGS.hsTable = function () {
  const inner = `<div class="tblw"><table class="t"><thead><tr><th>Tip</th><th>Mediat de</th><th>Timp</th><th>Mecanism</th><th>Exemple</th></tr></thead><tbody>
    <tr><td><b>I</b> anafilactic</td><td>IgE pe mastocite; LTH2 (IL-4, IL-5)</td><td>minute (+ ore)</td><td>degranularea mastocitelor sensibilizate: histamină, leucotriene, PG</td><td>rinită alergică, astm, urticarie, șoc anafilactic</td></tr>
    <tr><td><b>II</b> citotoxic</td><td>IgM, IgG; complement; NK</td><td>la a doua expunere</td><td>anticorpi pe celula-țintă → opsonizare, complement, citoliză</td><td>reacția posttransfuzională, sindromul Goodpasture</td></tr>
    <tr><td><b>III</b> complexe imune</td><td>complexe Ag-Ac (IgM, IgG); complement</td><td>—</td><td>complexe mici, solubile, depuse în glomerul, articulații, tegument</td><td>glomerulonefrită, artralgii, febră, urticarie</td></tr>
    <tr><td><b>IV</b> întârziat</td><td>LTH1, LT citotoxice, macrofage (IFN-γ)</td><td>maxim la 4 zile</td><td>prezentarea antigenului, proliferare limfocitară, activarea macrofagelor</td><td>TBC, lepră, boala celiacă, rejet de organ</td></tr>
  </tbody></table></div>`;
  return fig('Hipersensibilitatea: tipurile I–IV', inner, 'Rezumat comparativ după slide-urile 7–11.');
};

/* --- 14. Clasificarea infecțiilor (HTML) --- */
FIGMETA.infectClass = { t: 'Clasificarea infecțiilor', q: [25] };
FIGS.infectClass = function () {
  const d = renderFlow({ steps: [
    { t: 'Clasificarea infecțiilor', k: 'start' },
    { br: [
      [{ t: 'Agentul etiologic', d: '<ul><li>bacterii</li><li>virusuri</li><li>fungi</li><li>paraziți</li></ul>' }],
      [{ t: 'Localizarea', d: '<ul><li>respiratorii</li><li>urinare</li><li>gastrointestinale</li><li>cutanate</li></ul>' }],
      [{ t: 'Evoluția', d: '<ul><li>acute</li><li>cronice (hepatita B)</li><li>latente (herpes)</li></ul>' }],
      [{ t: 'Originea', d: '<ul><li>comunitare</li><li>nosocomiale (&gt; 48 h)</li><li>oportuniste</li><li>patogeni primari</li></ul>' }]
    ] }
  ] }, { plain: true, tone: 'cold' });
  return fig('Patru criterii de clasificare', d, '');
};

/* --- 15. Liniile de apărare (HTML) --- */
FIGMETA.defenseLayers = { t: 'Liniile de apărare', q: [26, 28, 29] };
FIGS.defenseLayers = function () {
  const inner = `<div class="layers">
    <div class="layer l-a"><div><b>Barierele naturale</b><span>piele, mucoase, cili, secreții, pH acid, flora normală</span></div><em>prima linie</em></div>
    <div class="layer l-b"><div><b>Imunitatea înnăscută</b><span>fagocite, NK, complement, peptide antimicrobiene, IFN tip I</span></div><em>imediat</em></div>
    <div class="layer l-c"><div><b>Imunitatea dobândită</b><span>limfocite B (anticorpi), LT helper, LT citotoxice, LT reglatoare</span></div><em>zile · memorie</em></div></div>`;
  return fig('Unde se află barierele naturale', inner, 'Barierele naturale sunt prima linie, nespecifică; dacă sunt depășite intră în acțiune imunitatea înnăscută, apoi cea dobândită.');
};

/* --- 16. Bacterian vs viral (HTML) --- */
FIGMETA.bvCompare = { t: 'Infecție bacteriană vs virală', q: [35, 41] };
FIGS.bvCompare = function () {
  const inner = `<div class="tblw"><table class="t"><thead><tr><th></th><th>Bacteriană</th><th>Virală</th></tr></thead><tbody>
    <tr><td><b>Febra</b></td><td>înaltă, adesea &gt; 38°C</td><td>moderată, adesea &lt; 38°C, sau subfebrilitate</td></tr>
    <tr><td><b>Generale</b></td><td colspan="2">mialgii, artralgii, stare generală alterată (oboseală marcată, confuzie în cazuri severe)</td></tr>
    <tr><td><b>Exemplu specific</b></td><td>SNC: iritație meningeană, redoarea cefei, Kernig, Brudzinski</td><td>respirator: rinoree apoasă, strănut, tuse, wheezing</td></tr>
    <tr><td><b>Hemoleucogramă</b></td><td>leucocitoză cu <b>neutrofilie</b></td><td>leucocitoză cu <b>limfocitoză</b></td></tr>
    <tr><td><b>Reactanți de fază acută</b></td><td><b>crescuți</b> (PCR, fibrinogen, hepcidină, procalcitonină)</td><td><b>ușor crescuți sau normali</b></td></tr>
    <tr><td><b>Agentul</b></td><td>identificare în sânge, urină, LCR + <b>antibiogramă</b></td><td>identificare în sânge, urină, LCR</td></tr>
    <tr><td><b>Imagistică</b></td><td colspan="2">radiografie, CT, RMN</td></tr>
  </tbody></table></div>`;
  return fig('Bacterian vs viral', inner, 'Slide-urile 29–30 și 37–38 puse alături.');
};

