/* ===== Nucleu: date globale, normalizare, potrivire cuvinte-cheie, completare ===== */
const Q = {};
const FLOWS = {};
const EXTRA = [];
const CH = [
  { id: 'termo', n: 'Termoreglarea. Hipertermia și hipotermia', s: 'Termoreglare', tone: 'heat', deck: 'Termoreglarea – Hipertermia; Hipotermia', from: 1, to: 9 },
  { id: 'febra', n: 'Febra. Limfomul Hodgkin. Angina streptococică', s: 'Febra', tone: 'heat', deck: 'Sindromul febril – Angina streptococică; Limfomul Hodgkin', from: 10, to: 20 },
  { id: 'inflam', n: 'Sindromul inflamator', s: 'Inflamația', tone: 'pen', deck: 'Sindromul inflamator', from: 21, to: 24 },
  { id: 'infect', n: 'Sindromul inflamator în context infecțios', s: 'Infecția', tone: 'cold', deck: 'Sindromul inflamator în context infecțios', from: 25, to: 41 }
];

/* --- normalizare: un token de text = un token normalizat (pentru evidențiere) --- */
const GREEK = { 'α': 'alfa', 'β': 'beta', 'γ': 'gama', 'δ': 'delta', 'κ': 'kapa', 'μ': 'micro', 'µ': 'micro' };
function normTok(t) {
  const g = GREEK[t]; if (g) return g;
  t = t.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '');
  if (t === 'gamma') t = 'gama';
  return t;
}
function toks(s) {
  s = String(s || '').replace(/[α-ωµ]/g, ' $& ');
  const out = []; const re = /\p{L}+|\p{N}+/gu; let m;
  while ((m = re.exec(s))) {
    const w = normTok(m[0]);
    if (w) out.push({ w, s: m.index, e: m.index + m[0].length });
  }
  return out;
}
const words = s => toks(s).map(t => t.w);

/* --- pattern: cuvintele sunt prefixe; "=x" exact; "a+b" = a și b la max. 8 cuvinte distanță; cifrele sunt mereu exacte --- */
const _pc = new Map();
function parsePat(p) {
  let r = _pc.get(p);
  if (r) return r;
  r = p.split('+').map(part => {
    const arr = [];
    part.trim().split(/\s+/).forEach(w => {
      const ex = w[0] === '=';
      words(ex ? w.slice(1) : w).forEach(x => arr.push({ ex: ex || /^\d+$/.test(x), w: x }));
    });
    return arr;
  }).filter(a => a.length);
  _pc.set(p, r);
  return r;
}
function phrasePos(tw, ws) {
  const out = [];
  outer: for (let i = 0; i + ws.length <= tw.length; i++) {
    for (let j = 0; j < ws.length; j++) {
      const t = tw[i + j], w = ws[j];
      if (w.ex ? t !== w.w : !t.startsWith(w.w)) continue outer;
    }
    out.push(i);
  }
  return out;
}
/* întoarce indicii tokenilor potriviți sau null */
function matchPat(tw, pat) {
  const parts = parsePat(pat);
  if (!parts.length) return null;
  const pos = parts.map(ws => phrasePos(tw, ws));
  if (pos.some(a => !a.length)) return null;
  const span = (i, n) => Array.from({ length: n }, (_, k) => i + k);
  if (parts.length === 1) return span(pos[0][0], parts[0].length);
  for (const i of pos[0]) {
    const pick = pos.slice(1).map(a => a.find(k => Math.abs(k - i) <= 8));
    if (pick.every(k => k != null)) {
      let idx = span(i, parts[0].length);
      pick.forEach((k, j) => { idx = idx.concat(span(k, parts[j + 1].length)); });
      return idx;
    }
  }
  return null;
}
function evalRubric(rub, text) {
  const tk = toks(text), tw = tk.map(t => t.w);
  const marks = new Set();
  const secs = rub.map(([name, pts]) => ({
    name,
    pts: pts.map(([label, pats, wt]) => {
      let hit = false;
      for (const p of pats) { const m = matchPat(tw, p); if (m) { hit = true; m.forEach(i => marks.add(i)); break; } }
      return { label, w: wt || 1, hit };
    })
  }));
  return { secs, marks: [...marks], tk };
}
function scoreRubric(secs) {
  let got = 0, all = 0;
  secs.forEach(s => s.pts.forEach(p => { all += p.w; if (p.hit) got += p.w; }));
  return all ? got / all : 0;
}
function countHits(rub, text) { let n = 0; evalRubric(rub, text).secs.forEach(s => s.pts.forEach(p => { if (p.hit) n++; })); return n; }

/* --- completare: [[răspuns|variantă|variantă]] --- */
function parseCloze(str) {
  const parts = []; const re = /\[\[(.+?)\]\]/g; let last = 0, m;
  while ((m = re.exec(str))) {
    if (m.index > last) parts.push({ t: str.slice(last, m.index) });
    const alts = m[1].split('|').map(s => s.trim()).filter(Boolean);
    parts.push({ a: alts });
    last = m.index + m[0].length;
  }
  if (last < str.length) parts.push({ t: str.slice(last) });
  return parts;
}
function lev(a, b) {
  if (a === b) return 0;
  const m = a.length, n = b.length; if (!m) return n; if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[n];
}
const SUF = /(urilor|ului|ilor|elor|ile|ele|uri|ul|ua|ei|ii|ia|ie|ea|le|a|e|i|u|ă)$/;
function stem(w) { return w.length > 4 ? w.replace(SUF, '') : w; }
function wordOk(u, e) {
  if (/\d/.test(e) || /\d/.test(u)) return u === e;
  if (u === e) return true;
  if (e.length >= 4 && stem(u) === stem(e)) return true;
  const tol = e.length >= 9 ? 2 : e.length >= 5 ? 1 : 0;
  return tol > 0 && lev(u, e) <= tol;
}
/* 'ok' | 'near' | 'no' */
function checkBlank(user, alts) {
  const uw = words(user);
  if (!uw.length) return 'no';
  let best = 'no';
  for (const alt of alts) {
    const ew = words(alt);
    if (!ew.length) continue;
    if (uw.join(' ') === ew.join(' ')) return 'ok';
    const allIn = ew.every(e => uw.some(u => wordOk(u, e)));
    if (allIn && uw.length <= ew.length + 2) best = 'near';
  }
  return best;
}

if (typeof module !== 'undefined') module.exports = { Q, FLOWS, EXTRA, CH, toks, words, matchPat, evalRubric, scoreRubric, parseCloze, checkBlank };

;