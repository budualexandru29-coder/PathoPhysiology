# Simulator Fiziopatologie · Modulul I

Aplicație de învățare pentru examenul practic de fiziopatologie, Modulul I: cele 41 de întrebări ale disciplinei (2026–2027), cu explicații, cascade pas cu pas, enunțuri de completat, redactare corectată pe cuvinte-cheie, simulare de bilet și figuri interactive.

Capitole:

1. Termoreglarea. Hipertermia și hipotermia (Î1–9)
2. Febra. Limfomul Hodgkin. Angina streptococică (Î10–20)
3. Sindromul inflamator (Î21–24)
4. Sindromul inflamator în context infecțios (Î25–41)

## Cum o deschizi

Deschide `index.html` în browser (dublu-clic). Totul e într-un singur fișier și merge și fără internet, cu excepția fonturilor.

Progresul (scoruri, completări) se ține în browser, în `localStorage`.

## Cum e organizat codul

| Folder | Ce conține |
|---|---|
| `src/css/` | Stilurile: aplicația, figurile interactive, desenele anima |
| `src/js/0*` | Nucleul (corectarea pe cuvinte-cheie, completări), textul celor 41 de întrebări, cascadele |
| `src/js/1*` | Conținutul pe capitole: explicații, plan de răspuns, enunțuri, barem |
| `src/js/2*` | Figurile statice (SVG și scheme HTML) |
| `src/js/3*` | Motorul figurilor interactive (FX) și desenele generate (`31-art.generated.js`) |
| `src/js/4*` | Figurile interactive, câte una pe fișier |
| `src/js/9*` | Aplicația: ecrane, rute, exerciții, simularea de bilet |
| `art/` | Scripturile care desenează figurile cu kitul anima și scriu `31-art.generated.js` |
| `tools/anima/` | Kitul de desen izometric [anima](https://github.com/Garinmckayl/anima) (MIT) |

Pagina se reface cu:

```sh
node build.mjs
```

`build.mjs` lipește bucățile din `src/` în ordinea din `src/manifest.json` și scrie `index.html` (pagina completă) și `dist/artifact.html` (aceeași pagină, pentru artifactul de pe claude.ai).

## Notă

Material educațional pentru pregătirea examenului, după cursurile și LP-urile disciplinei. Nu e sfat medical.
