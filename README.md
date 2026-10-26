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
node art/build.mjs   # redesenează figurile și scrie src/js/31-art.generated.js
node build.mjs       # lipește aplicația
```

`build.mjs` lipește bucățile din `src/` în ordinea din `src/manifest.json` și scrie `index.html` (pagina completă) și `dist/artifact.html` (aceeași pagină, pentru artifactul de pe claude.ai). Dacă ai schimbat doar texte din `src/js/1*`, ajunge `node build.mjs`.

Un singur desen se poate vedea separat, fără aplicație: `node art/preview.mjs art/fever.mjs` scrie `shots/preview.html` (`--light` pentru tema deschisă, `--state ph=3` pentru o anumită stare).

## Figurile interactive

Toate sunt desenate ca planșe de atlas: organe cu volum, vase cu perete și lumen care își schimbă calibrul, structuri la scară acolo unde scara contează. Fiecare are un tur ghidat, piese pe care apeși ca să vezi ce spune cursul despre ele (cu numărul slide-ului), un exercițiu de predicție și, unde se potrivește, un joc de ordonare sau sortare. Explicațiile care nu sunt în curs apar pe un chip punctat, cu sursa.

| Întrebarea | Figura | Ce se vede |
|---|---|---|
| Î1 | Circulația în termoreglare | Inima, aorta cu ramurile, creierul, rinichiul și un bloc de piele; vasodilatația cutanată mută debitul cardiac spre piele, iar monitorul arată unda de puls |
| Î2, Î6 | Capul în secțiune mediosagitală | Craniul cu diploe, sinusurile venoase, venele emisare și oftalmice, glandele sudoripare; răcirea selectivă a creierului și limitele ei la om |
| Î5 | Stadiile hipotermiei | Creier, ochi cu reflexul pupilar, inimă cu ECG (bradicardie, unda J), plămâni, cadranul consumului de O₂ (×1–×6), glicemia, pielea cu piloerecție și celula cu cristale de gheață |
| Î7 | Termoliza | Radiația, convecția, conducția și evaporarea la suprafața pielii, în cinci situații: aer liniștit, vânt, apă rece, mediu peste 35 °C, căldură umedă |
| Î11, Î10 | Febra | Bacterii și macrofag în țesut, citokinele IL-1, TNF-α, IL-6, OVLT, COX-2 și PGE₂ pe neuronul hipotalamic, cu curba punctului de reglare în cele trei faze |
| Î15 | Pirogenii exogeni | Membrana macrofagului la scară moleculară: lipopolizaharidul (lipidul A, miezul, antigenul O), LBP, CD14, TLR4–MD-2, MyD88, NF-κB, nucleul și citokinele; acidul lipoteicoic pe TLR2; apoi efectele centrale, periferice și proinflamatoare, în șase scene legate de un vas |
| Î16, Î17 | Limfomul Hodgkin | Ganglionul limfatic în secțiune și o lupă pe micromediul tumoral, la scară, în culorile colorației hematoxilină–eozină: celula Reed–Sternberg, fondul inflamator reactiv, cele cinci subtipuri; organele afectate, citokinele pirogene spre hipotalamus și simptomele B |
| Î18, Î19, Î20 | Angina streptococică | Orofaringele prin gura deschisă și o lupă pe cripta amigdaliană (streptococii în lanțuri, toxinele, neutrofilele, puroiul), capul din profil cu ganglionii și complicațiile locale, complicațiile la distanță și graficul debutului; ultima etapă arată angina virală, pentru diagnosticul diferențial |
| Î22 | Reacția de fază acută și complementul | Mastocitul (IgE, antigen, Ca²⁺, degranulare), acidul arahidonic și derivații lui, venula și nociceptorul; cele trei căi ale complementului pe o bacterie Gram-negativă, opsonizarea, anafilatoxinele și complexul de atac membranar; ficatul cu proteinele de fază acută, frotiul cu devierea la stânga, hipotalamusul și graficele în timp |
| Î27, Î22 | Inflamația acută | Capilarul în secțiune: vasodilatație, exudat, marginație, rulare pe selectine, aderare prin integrine, diapedeză, chemotaxie și fagocitoză |

Figurile sunt construite după Cursul 1 (Starea de boală), Cursul 2 (Inflamația) și Cursul 3 (Termoreglarea) ale disciplinei.

## Notă

Material educațional pentru pregătirea examenului, după cursurile și LP-urile disciplinei. Nu e sfat medical.
