/* ===== Lecția în stilul Khan Academy (Î15 ca mostră) =====
   Datele: ART.lesson15 (art/lessons/q15.board.mjs): tabla de 1280 × 720, capitolele și frazele, fiecare cu desenul ei (SVG)
   și timpii din modelul comun (art/lessons/timing.mjs): fraza începe la start, desenul ei pornește după aOff secunde
   (la cuvântul-cheie) și ține aDur secunde; fraza ocupă len secunde, cu pauza. Liniile se trasează progresiv
   (stroke-dashoffset), cuvintele se scriu de la stânga la dreapta (clip-path), în ritmul vocii.
   Vocea: Web Speech API, numai cu o voce românească; desenul pornește când vocea ajunge la cuvântul-cheie (evenimentul
   boundary), iar fraza următoare așteaptă vocea. Fără voce românească rămâne subtitlul, în ritmul modelului (150 cuvinte/min).
   Segmentare (Mayer): lecția se oprește la sfârșitul fiecărui capitol și continuă când apeși.
   Tastele: spațiu = pornește/oprește, ← → = fraza dinainte/următoare, F = ecran complet. */
const LESSON = (function () {
  const TW = 2.2;                                   // un cuvânt scris cere de TW ori mai mult timp decât o linie de aceeași lungime
  const TITLE_DRAW = 1.6;                           // cât se scrie titlul capitolului (s)
  const fmt = s => { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const data = n => (typeof ART !== 'undefined' && ART['lesson' + n]) || null;
  let active = null;                                // lecția care vorbește acum (una singură)
  // testul de după lecție (tools/lesson-test.mjs), publicat separat, cu tabelul comun al rezultatelor
  const TESTS = { 15: 'https://claude.ai/artifact/BvoeHQef5iaZZSN2AMR6dR' };

  /* ---- subtitlul: fraza împărțită în bucăți scurte și cam egale (cel mult 9 cuvinte), tăiate de preferință la punctuație ---- */
  function chunks(t) {
    const ws = [], re = /\S+/g; let m; while ((m = re.exec(t))) ws.push({ w: m[0], at: m.index });
    const out = []; let cur = [], size = 9;
    ws.forEach((x, i) => {
      if (!cur.length) { const rem = ws.length - i; size = Math.ceil(rem / Math.ceil(rem / 9)); }   // restul, în bucăți egale
      cur.push(x);
      const punct = /[,;:.!?]$/.test(x.w) || /^[—–]$/.test((ws[i + 1] || {}).w || ''), left = ws.length - i - 1;
      if (cur.length >= size || (punct && cur.length >= Math.max(3, size - 3) && left >= 3) || !left) { out.push(cur); cur = []; }
    });
    let wi = 0;
    return out.map(c => { const o = { text: c.map(x => x.w).join(' '), at: c[0].at, w0: wi, w1: wi + c.length }; wi += c.length; return o; });
  }

  /* ---- marcajul ---- */
  function html(n) {
    const D = data(n); if (!D) return '';
    const vars = Object.entries(D.colors).map(([k, v]) => `--k-${k}:${v}`).join(';');
    let k = 0;
    const board = D.chapters.map((c, ci) => `<g class="kl-ch" data-ch="${ci}" style="display:none"><g class="kl-ln" data-k="${k++}">${c.titleSvg}</g>${c.lines.map(l => `<g class="kl-ln" data-k="${k++}">${l.svg}</g>`).join('')}</g>`).join('');
    const segs = D.chapters.map((c, ci) => `<button class="kl-seg" data-kl="seek" data-ch="${ci}" style="flex:${(c.t1 - c.t0).toFixed(1)} 1 0" aria-label="Capitolul ${esc(c.title)}" title="${esc(c.title)}"><i></i></button>`).join('');
    const legend = Object.entries(D.legend).map(([k, v]) => `<li><b style="background:var(--k-${k})"></b><span><strong>${{ alb: 'alb', rosu: 'roșu', albastru: 'albastru', verde: 'verde', galben: 'galben' }[k] || k}</strong> ${esc(v)}</span></li>`).join('');
    const script = D.chapters.map(c => `<h4>${esc(c.title)}</h4><ol>${c.lines.map(l => `<li><span>${esc(l.t)}</span><small>${esc(l.act[0] === 'write' ? 'scrie' : l.act[0] === 'arrow' ? 'săgeată' : l.act[0] === 'circle' ? 'cerc' : l.act[0] === 'strike' ? 'taie' : 'trasează')}: ${esc(l.act[1])} · ${esc(l.src)}</small></li>`).join('')}</ol>`).join('');
    return `<figure class="kl blk" data-lesson="${n}" style="${vars}" tabindex="-1" aria-label="Lecția Î${n}, desenată pe tablă">
  <div class="kl-scr">
    <svg class="kl-board" data-kl="board" viewBox="0 0 ${D.W} ${D.H}" role="img" aria-label="Tabla lecției; textul vorbit apare dedesubt">${board}</svg>
    <div class="kl-ov" data-ov="start"><button class="kl-big" data-kl="play"><span class="kl-tri" aria-hidden="true"></span><span><b>Pornește lecția</b><small>${D.chapters.length} capitole · ${fmt(D.total)} · <i class="kl-vnote">caut vocea…</i></small></span></button></div>
  </div>
  <p class="kl-cap" aria-hidden="true"><span></span></p>
  <div class="kl-bar">
    <button class="kl-b kl-pp" data-kl="play" aria-label="Pornește"><span class="kl-ico" aria-hidden="true"></span></button>
    <button class="kl-b" data-kl="prev" aria-label="Fraza dinainte">⏮</button>
    <button class="kl-b" data-kl="next" aria-label="Fraza următoare">⏭</button>
    <div class="kl-tl">${segs}</div>
    <span class="kl-time">0:00 / ${fmt(D.total)}</span>
    <button class="kl-b kl-t" data-kl="speed" aria-label="Viteza">1×</button>
    <button class="kl-b kl-t" data-kl="voice" aria-pressed="true" aria-label="Vocea">voce</button>
    <button class="kl-b" data-kl="full" aria-label="Ecran complet">⛶</button>
  </div>
  <div class="kl-chs">${D.chapters.map((c, ci) => `<button data-kl="seek" data-ch="${ci}" data-at="0"><i>${ci + 1}</i>${esc(c.title.replace(/^\d+\.\s*/, ''))}<small>${fmt(c.t1 - c.t0)}</small></button>`).join('')}</div>
  <div class="kl-more">
    ${TESTS[n] ? `<p class="kl-test"><a href="${TESTS[n]}" target="_blank" rel="noopener">Testul de după lecție</a><span>o singură vizionare, apoi scrii din memorie; lecția trece dacă fiecare recuperează ≥ 80% din barem</span></p>` : ''}
    <details class="kl-leg"><summary>Culorile tablei</summary><ul>${legend}</ul></details>
    <details class="kl-scp"><summary>Textul lecției, cu desenele și sursele</summary>${script}</details>
  </div>
</figure>`;
  }

  /* ---- pregătirea: lungimile liniilor și ponderea fiecărui element în acțiunea frazei ---- */
  function ready(el) {
    if (el._kl) return el._kl;
    const D = data(el.dataset.lesson); if (!D) return null;
    const items = [];
    D.chapters.forEach((c, ci) => {
      items.push({ kind: 'title', ci, start: c.t0, len: D.TITLE, aOff: 0, aDur: TITLE_DRAW });
      c.lines.forEach((l, li) => items.push({ kind: 'line', ci, li, l, start: l.start, len: l.len, aOff: l.aOff, aDur: l.aDur, ch: chunks(l.t) }));
    });
    // fraza de la care tabla e curată (recapitularea), pe capitole
    items.forEach((it, k) => { it.from = k; });
    D.chapters.forEach((c, ci) => {
      const ks = items.filter(it => it.ci === ci).map(it => items.indexOf(it)); let from = ks[0];
      ks.forEach(k => { const it = items[k]; if (it.kind === 'line' && it.l.clear) from = k; it.from = from; });
    });
    const groups = [...el.querySelectorAll('.kl-ln')];
    items.forEach((it, k) => {
      const g = groups[k]; it.g = g;
      it.els = [...g.querySelectorAll('path,text')].map(e => {
        let w, len = 0;
        if (e.tagName === 'path') { len = e.getTotalLength(); w = len; e.style.strokeDasharray = len + ' ' + (len + 10); }
        else w = e.textContent.length * (+e.getAttribute('font-size') || 30) * 0.5 * TW;
        return { e, w: Math.max(1, w), len, txt: e.tagName === 'text' };
      });
      let acc = 0; it.els.forEach(x => { x.c0 = acc; acc += x.w; }); it.W = acc;
    });
    const X = el._kl = { el, D, items, k: 0, tau: 0, playing: false, speed: 1, voiceOn: true, voice: null, ds: null, shown: new Array(items.length).fill(-1), ch: -1,
      utt: null, vDone: true, vEnd: 0, sawB: false, capW: 0, started: false };
    X.cap = el.querySelector('.kl-cap span'); X.time = el.querySelector('.kl-time'); X.fills = [...el.querySelectorAll('.kl-seg i')];
    pickVoice(X); layout(X); paintBar(X);
    return X;
  }

  /* ---- vocea ---- */
  const hasTTS = typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
  function pickVoice(X) {
    const set = () => {
      const vs = hasTTS ? speechSynthesis.getVoices() : [];
      X.voice = vs.filter(v => /^ro([-_]|$)/i.test(v.lang)).sort((a, b) => (b.localService - a.localService))[0] || null;
      const note = X.el.querySelector('.kl-vnote'), vb = X.el.querySelector('[data-kl="voice"]');
      if (note) note.textContent = X.voice ? 'cu voce (' + X.voice.name.replace(/\s*\(.*\)$/, '') + ')' : 'fără voce românească pe acest dispozitiv: urmărește subtitlul';
      if (vb) { vb.disabled = !X.voice; vb.setAttribute('aria-pressed', String(!!X.voice && X.voiceOn)); vb.textContent = 'voce'; vb.title = X.voice ? 'Vocea: ' + X.voice.name : 'Nu există o voce românească pe acest dispozitiv; lecția merge cu subtitlul'; }
    };
    set();
    if (hasTTS) { speechSynthesis.addEventListener('voiceschanged', set); setTimeout(set, 1200); }
  }
  const voiceOn = X => hasTTS && X.voice && X.voiceOn;
  function hush(X) { X.utt = null; if (hasTTS && active === X) speechSynthesis.cancel(); }
  // vorbește fraza curentă, de la bucata de subtitlu în care suntem (la reluare după pauză)
  function speak(X) {
    const it = X.items[X.k]; if (!voiceOn(X) || it.kind !== 'line') { X.vDone = true; return; }
    const c = it.ch[chunkAt(X, it)] || it.ch[0], from = c.at, text = it.l.t.slice(from);
    const u = new SpeechSynthesisUtterance(text);
    u.voice = X.voice; u.lang = X.voice.lang; u.rate = X.speed; u.pitch = 1;
    const wordStart = (() => { const re = /\S+/g; let m, i = 0; while ((m = re.exec(it.l.t))) { if (i === it.l.ki) return m.index; i++; } return 0; })();
    u.onboundary = e => {
      if (u !== X.utt || e.name && e.name !== 'word') return;
      X.sawB = true; const at = from + e.charIndex;
      const wi = (it.l.t.slice(0, at).match(/\S+/g) || []).length; X.capW = wi;
      if (X.ds == null && at >= wordStart) X.ds = X.tau;               // desenul pornește la cuvântul-cheie
    };
    u.onend = u.onerror = () => { if (u !== X.utt) return; X.vDone = true; X.vEnd = X.tau; X.utt = null; };
    X.utt = u; X.vDone = false; X.sawB = false; X.vStart = X.tau; active = X;
    if (speechSynthesis.speaking || speechSynthesis.pending) speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }
  function chunkAt(X, it) {
    const w = voiceOn(X) && X.sawB ? X.capW : Math.floor(Math.min(1, X.tau / Math.max(0.1, it.l.dur)) * it.ch[it.ch.length - 1].w1);
    let i = it.ch.findIndex(c => w < c.w1); return i < 0 ? it.ch.length - 1 : i;
  }

  /* ---- desenul ---- */
  function paint(it, p) {
    const want = it.W * p;
    it.els.forEach(x => {
      const q = Math.max(0, Math.min(1, (want - x.c0) / x.w));
      if (q === x.q) return; x.q = q;
      x.e.style.visibility = q > 0 ? 'visible' : 'hidden';
      if (x.txt) x.e.style.clipPath = q >= 1 ? 'none' : `inset(-40% ${((1 - q) * 100).toFixed(1)}% -40% -4%)`;
      else x.e.style.strokeDashoffset = q >= 1 ? '0' : String(x.len * (1 - q));
    });
  }
  const progress = (X, it) => it.kind === 'title' ? Math.min(1, X.tau / it.aDur) : X.ds == null ? 0 : Math.min(1, (X.tau - X.ds) / it.aDur);
  // starea întregii table pentru fraza curentă: capitolul ei, frazele de dinainte desenate, cele de după ascunse
  function layout(X) {
    const it = X.items[X.k];
    if (X.ch !== it.ci) { X.el.querySelectorAll('.kl-ch').forEach((g, i) => { g.style.display = i === it.ci ? '' : 'none'; }); X.ch = it.ci; }
    X.items.forEach((o, k) => {
      if (o.ci !== it.ci) return;
      o.g.style.display = o.kind === 'line' && k < it.from ? 'none' : '';     // după „tabla curată” rămâne doar titlul capitolului
      if (k === X.k) return;
      const want = k > X.k ? 0 : 1;
      if (X.shown[k] !== want) { paint(o, want); X.shown[k] = want; }
    });
    frame(X);
  }
  function frame(X) {
    const it = X.items[X.k];
    paint(it, progress(X, it)); X.shown[X.k] = null;
    X.cap.textContent = it.kind === 'title' ? X.D.chapters[it.ci].title : !X.playing && X.tau >= it.l.dur ? it.l.t : it.ch[chunkAt(X, it)].text;
    paintBar(X);
  }
  function pos(X) { const it = X.items[X.k]; return it.start + Math.min(X.tau, it.len); }
  function paintBar(X) {
    const t = pos(X);
    X.D.chapters.forEach((c, i) => { X.fills[i].style.width = (Math.max(0, Math.min(1, (t - c.t0) / (c.t1 - c.t0))) * 100).toFixed(2) + '%'; });
    X.time.textContent = fmt(t) + ' / ' + fmt(X.D.total);
  }

  /* ---- ceasul ---- */
  function done(X, it) {
    if (it.kind === 'title') return X.tau >= it.len;
    const drawn = X.ds != null && X.tau >= X.ds + it.aDur + 0.3;
    if (!voiceOn(X)) return drawn && X.tau >= it.len;
    if (X.tau >= it.len + 10) return true;                              // vocea nu a anunțat sfârșitul: mergem mai departe
    return drawn && X.vDone && X.tau >= X.vEnd + X.D.GAP;
  }
  function tick(X, now) {
    if (!X.playing) return;
    if (!document.contains(X.el)) { stop(X); return; }
    const dt = Math.min(0.1, (now - X.last) / 1000) * X.speed; X.last = now; X.tau += dt;
    const it = X.items[X.k];
    if (it.kind === 'line' && X.ds == null) {
      if (!voiceOn(X)) { if (X.tau >= it.aOff) X.ds = it.aOff; }
      else if (!X.sawB && X.tau >= it.aOff + 0.25) X.ds = it.aOff;      // vocea nu trimite granițele cuvintelor: după model
      else if (X.tau >= it.aOff + 2) X.ds = X.tau;                        // cuvântul-cheie întârzie: nu mai așteptăm
    }
    frame(X);
    if (done(X, it)) {
      paint(it, 1); X.shown[X.k] = 1;
      const nx = X.items[X.k + 1];
      if (!nx || nx.kind === 'title') {                                  // sfârșit de capitol (sau de lecție): tabla rămâne, pauză
        X.tau = Math.max(X.tau, it.len); X.brk = !!nx; stop(X); frame(X); overlay(X, nx ? 'chapter' : 'end'); return;
      }
      go(X, X.k + 1, 0); speak(X);
    }
    X.raf = requestAnimationFrame(t => tick(X, t));
  }
  function go(X, k, tau) {
    X.k = Math.max(0, Math.min(X.items.length - 1, k)); X.tau = tau || 0;
    const it = X.items[X.k];
    X.ds = it.kind === 'line' && X.tau > it.aOff ? Math.max(0, Math.min(X.tau, it.aOff)) : null;
    X.vDone = true; X.vEnd = 0; X.sawB = false; X.capW = 0; X.brk = false; hush(X);
    layout(X);
  }
  function play(X) {
    if (X.playing) return;
    if (active && active !== X) stop(active);
    if (X.brk) go(X, X.k + 1, 0);                                      // capitolul următor
    else if (X.k === X.items.length - 1 && X.tau >= X.items[X.k].len) go(X, 0, 0);
    X.playing = true; X.started = true; X.last = performance.now(); overlay(X, null); ui(X);
    const it = X.items[X.k]; if (it.kind === 'line' && (X.tau < it.l.dur || !X.vDone)) speak(X);
    X.raf = requestAnimationFrame(t => tick(X, t));
  }
  function stop(X) { X.playing = false; cancelAnimationFrame(X.raf); hush(X); X.vDone = true; X.vEnd = X.tau; ui(X); }
  function seekTime(X, t) {
    const k = X.items.findIndex(it => t >= it.start && t < it.start + it.len);
    const was = X.playing; stop(X);
    go(X, k < 0 ? X.items.length - 1 : k, k < 0 ? X.items[X.items.length - 1].len : t - X.items[k].start);
    overlay(X, null); if (was) play(X);
  }
  function step(X, d) {
    const was = X.playing; stop(X);
    let k = d < 0 && X.tau > 1.5 ? X.k : X.k + d;
    while (X.items[k] && X.items[k].kind === 'title' && d > 0 && k < X.items.length - 1) k++;
    k = Math.max(0, Math.min(X.items.length - 1, k));
    // în pauză, fraza apare întreagă (desen și subtitlu), ca s-o poți citi; în redare, pornește de la început
    go(X, k, was ? 0 : X.items[k].len); overlay(X, null); if (was) play(X);
  }

  /* ---- interfața ---- */
  function ui(X) {
    const b = X.el.querySelector('.kl-pp'); if (b) { b.classList.toggle('on', X.playing); b.setAttribute('aria-label', X.playing ? 'Pauză' : 'Pornește'); }
    X.el.classList.toggle('playing', X.playing);
  }
  function overlay(X, kind) {
    const ov = X.el.querySelector('.kl-ov'); if (!ov) return;
    if (!kind) { ov.hidden = true; return; }
    ov.hidden = false; ov.dataset.ov = kind;
    if (kind === 'chapter') {
      const c = X.D.chapters[X.items[X.k].ci + 1];
      ov.innerHTML = `<button class="kl-big" data-kl="play"><span class="kl-tri" aria-hidden="true"></span><span><b>Continuă: ${esc(c.title)}</b><small>capitolul s-a terminat; pornește-l pe următorul când ești gata</small></span></button>`;
    } else if (kind === 'end') {
      ov.innerHTML = `<div class="kl-endbox"><b>Lecția s-a terminat.</b><span>Acum scrie răspunsul din memorie, fără să te mai uiți.</span><div>${TESTS[X.el.dataset.lesson] ? `<a class="btn primary" href="${TESTS[X.el.dataset.lesson]}" target="_blank" rel="noopener">Testul de după lecție</a>` : ''}<a class="btn" href="#q-${X.el.dataset.lesson}-r">Redactează răspunsul</a><button class="btn" data-kl="replay">Încă o dată</button></div></div>`;
    }
  }
  function full(X) {
    const el = X.el;
    if (document.fullscreenElement === el || el.classList.contains('kl-max')) {
      if (document.fullscreenElement === el && document.exitFullscreen) document.exitFullscreen().catch(() => {});
      el.classList.remove('kl-max'); document.documentElement.classList.remove('kl-open'); return;
    }
    const fall = () => { el.classList.add('kl-max'); document.documentElement.classList.add('kl-open'); };
    if (el.requestFullscreen) el.requestFullscreen().then(() => { try { screen.orientation && screen.orientation.lock && screen.orientation.lock('landscape').catch(() => {}); } catch (e) { /* telefonul poate refuza */ } }).catch(fall);
    else fall();
  }

  if (typeof document !== 'undefined') {
    document.addEventListener('click', e => {
      const b = e.target.closest && e.target.closest('figure.kl [data-kl]'); if (!b) return;
      const el = b.closest('figure.kl'), X = ready(el); if (!X) return;
      const a = b.dataset.kl;
      if (a === 'play' || a === 'board') X.playing ? stop(X) : play(X);
      else if (a === 'replay') { go(X, 0, 0); play(X); }
      else if (a === 'prev') step(X, -1);
      else if (a === 'next') step(X, 1);
      else if (a === 'speed') { X.speed = X.speed === 1 ? 0.75 : 1; b.textContent = X.speed === 1 ? '1×' : '0,75×'; if (X.playing && X.utt) { hush(X); speak(X); } }
      else if (a === 'voice') { X.voiceOn = !X.voiceOn; b.setAttribute('aria-pressed', String(X.voiceOn)); b.title = X.voiceOn ? 'Vocea: ' + X.voice.name : 'Vocea e oprită; rămâne subtitlul'; hush(X); X.vDone = true; X.vEnd = X.tau; if (X.playing && X.voiceOn) speak(X); }
      else if (a === 'full') full(X);
      else if (a === 'seek') {
        const c = X.D.chapters[+b.dataset.ch];
        const r = b.getBoundingClientRect(), f = b.dataset.at != null ? 0 : Math.max(0, Math.min(0.999, (e.clientX - r.left) / Math.max(1, r.width)));
        seekTime(X, c.t0 + f * (c.t1 - c.t0));
      }
    });
    document.addEventListener('keydown', e => {
      const el = (e.target.closest && e.target.closest('figure.kl')) || document.querySelector('figure.kl.kl-max') || (document.fullscreenElement && document.fullscreenElement.matches('figure.kl') ? document.fullscreenElement : null);
      if (!el || e.altKey || e.ctrlKey || e.metaKey) return;
      const X = ready(el); if (!X) return;
      const onBtn = e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.tagName === 'SUMMARY';
      if ((e.key === ' ' || e.key === 'k') && !(onBtn && e.key === ' ')) { e.preventDefault(); X.playing ? stop(X) : play(X); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); step(X, 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); step(X, -1); }
      else if (e.key === 'f' || e.key === 'F') { e.preventDefault(); full(X); }
      else if (e.key === 'Escape' && el.classList.contains('kl-max')) { e.preventDefault(); full(X); }
    });
    document.addEventListener('fullscreenchange', () => document.querySelectorAll('figure.kl').forEach(el => el.classList.toggle('kl-fs', document.fullscreenElement === el)));
    document.addEventListener('visibilitychange', () => { if (document.hidden && active && active.playing) stop(active); });
    const scan = root => (root.querySelectorAll ? root.querySelectorAll('figure.kl:not([data-ready])') : []).forEach(el => { el.dataset.ready = '1'; requestAnimationFrame(() => ready(el)); });
    new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => { if (n.nodeType === 1) scan(n); }))).observe(document.documentElement, { childList: true, subtree: true });
    document.addEventListener('DOMContentLoaded', () => scan(document));
  }
  // seek și state: pentru verificarea automată (tools/verify) și pentru legături directe la un moment din lecție
  return { html, ready, chunks, seek: (el, t) => { const X = ready(el); if (X) seekTime(X, t); }, state: el => { const X = ready(el); return X && { k: X.k, tau: X.tau, ds: X.ds, playing: X.playing, pos: pos(X), cap: X.cap.textContent, voice: X.voice && X.voice.name, vDone: X.vDone }; } };
})();
