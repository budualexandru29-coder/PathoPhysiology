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
| Î4 | Mecanismele generale ale hipotermiei | Metafora rezervorului de căldură (robinetul = termogeneza, scurgerea = termoliza, nivelul = temperatura centrală, cu pragurile 35/32/28°C) și categoriile expuse; cursorul trece prin cele două cauze, răspunsul inițial, epuizarea și decompensarea: vasoconstricția și microcirculația pielii, glicogenul hepatic, consumul de O₂ și metabolismul, hematiile în fișicuri și acidoza, potențialul de acțiune prelungit și ECG-ul (tahicardie, bradicardie cu undă J, fibrilație, asistolie) |
| Î5 | Stadiile hipotermiei | Creier, ochi cu reflexul pupilar, inimă cu ECG (bradicardie, unda J), plămâni, cadranul consumului de O₂ (×1–×6), glicemia, pielea cu piloerecție și celula cu cristale de gheață |
| Î3 | Tipurile de hipertermie | Hipertermia malignă la nivelul fibrei musculare (tubii T, reticulul sarcoplasmic, receptorii de rianodină, sarcomerul, mitocondriile, monitorul de anestezie, dantrolenul), mialgia termică, insolația și arsurile solare de gradele I–III, pe aceleași trepte: normal, ușor, moderat, sever, tratament |
| Î7 | Termoliza | Radiația, convecția, conducția și evaporarea la suprafața pielii, în cinci situații: aer liniștit, vânt, apă rece, mediu peste 35 °C, căldură umedă |
| Î8 | Termogeneza | Mitocondria cu lanțul respirator și ATP-sintaza, glicoliza, pompa Na⁺/K⁺, fibrele musculare (frisonul), adipocitul brun cu UCP1 și terminațiile simpatice, balanța termogeneză–termoliză, sursele căldurii în repaus și la efort, tiroida și suprarenala |
| Î9 | Efectele locale ale frigului | Degetul și secțiunea prin pulpa lui: vasoconstricția și fluxul încetinit, cristalele de gheață, histamina, edemul și flictena, microtrombii, necroza și necroza grăsoasă; gradele degerăturii după durata expunerii |
| Î11, Î10 | Febra | Bacterii și macrofag în țesut, citokinele IL-1, TNF-α, IL-6, OVLT, COX-2 și PGE₂ pe neuronul hipotalamic, cu curba punctului de reglare în cele trei faze |
| Î12 | Consecințele și efectele benefice ale febrei | Cursorul e temperatura centrală (37–41°C): EEG-ul, ECG-ul cu frecvența (+8–12/min/°C), consumul de oxigen (+13%/°C), apoi bacteriile, virusul, neutrofilul, limfocitele T, glucoza, fierul, zincul și cuprul |
| Î13/Î14 | Febra non-infecțioasă: bazele și tipurile | Aceeași cale pentru toate tipurile (declanșatorul, macrofagul cu receptori Fc, citokinele în sânge, hipotalamusul cu OVLT, termometrul); cursorul schimbă declanșatorul: autoanticorpi și LT autoreactiv, beta-lactamina ca haptenă pe proteine proprii, leucocitele donatorului cu HLA străin, cuibul tumoral cu necroză și trombus. Jos: pirogenii endogeni și imunitatea nespecifică, formulele medicamentelor și frotiul cu eozinofile, fereastra de 30–180 min și leucocitoza până la 12 h, organele cu tumori care dau febră |
| Î21 | Inflamația: definiție, scop, cauze | O secțiune prin piele sau mucoasă (epiteliu, membrană bazală, conjunctiv, macrofag, mastocit, venulă); cursorul schimbă cauza: microorganisme (cu trecerea în sânge), corpi străini (polen, azbest cu corp azbestozic, siliciu, pulberi), distrucție tisulară (plagă, chimic, căldură, UV, raze X, necroză), celule tumorale, cristale (tofus cu ace de urat și celulă gigantă, colesterol, oxalat, fosfat de Ca). Reacția rămâne aceeași (Cursul 2, slide 2). Jos: cauzele exogene și endogene și scopul inflamației |
| Î15 | Pirogenii exogeni | Planșă de manual, pe șase pași, cu etichete scrise lângă structuri. Sus, membrana macrofagului la 4 px/nm: membrana externă Gram-negativă cu LPS (și o moleculă mărită: lipidul A, miezul, antigenul O), LBP, CD14, dimerul TLR4–MD-2 cu lipidul A, acidul lipoteicoic pe TLR2:TLR6, lanțul MyD88 → IRAK4 → IRAK1 → TRAF6 → TAK1 → IKK → NF-κB, TNF-α tăiat de TACE și IL-1β ieșind prin porii de gasdermină D; în colț, macrofagul întreg. Jos, schema efectelor sistemice (după Janeway), apoi câte trei scene pe pas: OVLT, neuronul preoptic și graficul punctului de reglare; măduva, venula, apărarea; mediatorii lipidici, ficatul, interferonul |
| Î16, Î17 | Limfomul Hodgkin | Ganglionul limfatic în secțiune și o lupă pe micromediul tumoral, la scară, în culorile colorației hematoxilină–eozină: celula Reed–Sternberg, fondul inflamator reactiv, cele cinci subtipuri; organele afectate, citokinele pirogene spre hipotalamus și simptomele B |
| Î18, Î19, Î20 | Angina streptococică | Orofaringele prin gura deschisă și o lupă pe cripta amigdaliană (streptococii în lanțuri, toxinele, neutrofilele, puroiul), capul din profil cu ganglionii și complicațiile locale, complicațiile la distanță și graficul debutului; ultima etapă arată angina virală, pentru diagnosticul diferențial |
| Î22 | Reacția de fază acută și complementul | Mastocitul (IgE, antigen, Ca²⁺, degranulare), acidul arahidonic și derivații lui, venula și nociceptorul; cele trei căi ale complementului pe o bacterie Gram-negativă, opsonizarea, anafilatoxinele și complexul de atac membranar; ficatul cu proteinele de fază acută, frotiul cu devierea la stânga, hipotalamusul și graficele în timp |
| Î27, Î22 | Inflamația acută | Capilarul în secțiune: vasodilatație, exudat, marginație, rulare pe selectine, aderare prin integrine, diapedeză, chemotaxie și fagocitoză |

Figurile sunt construite după Cursul 1 (Starea de boală), Cursul 2 (Inflamația) și Cursul 3 (Termoreglarea) ale disciplinei.

## Biblioteca de celule și verificarea

Celulele și moleculele care apar în mai multe figuri sunt desenate o singură dată, în `art/parts/cells.mjs`, la scară: celulele primesc scara în px/µm (dimensiunile din Junqueira și Ross & Pawlina), moleculele în px/nm (extinderile calculate din structurile PDB: IgG 1IGT, IgM 2RCJ, IgA 6UE7, C1q 1PK6, MHC 3HLA și 1DLH, PCR 1B09, TLR4–MD-2 3FXI, TLR2–TLR6 3A79). Planșa lor: `node art/preview.mjs art/parts/cells.preview.mjs shots/cells.html`. Fiecare celulă își poartă scara în desen (`data-k`), așa că se poate măsura direct în µm.

- `node tools/verify/coverage.cjs` verifică dacă fiecare punct din baremul întrebărilor e acoperit de o piesă a unei figuri.
Între pași, piesele se mișcă (`src/js/32-fx-anim.js`: fiecare piesă are cadre cheie, date de desen), iar sub figură o listă numerotată spune ce se întâmplă în acel moment; „Arată cum se întâmplă” reia mișcarea pasului curent. Stilul figurilor refăcute e cel al planșelor de manual: etichete scrise lângă structuri, cu o linie subțire terminată într-un punct (`art/lib/label.mjs`), fără numere în cerculețe și fără aparate desenate; fiecare pas arată doar ce e nou; figura stă pe o planșă deschisă la culoare în ambele teme.

- `node tools/verify/figs.cjs` deschide fiecare figură: erori JS, toate modurile, lățimea pe telefon (390 px), capturi în ambele teme și cu simularea deuteranopiei și protanopiei, dimensiunea fiecărei celule din bibliotecă față de manual (±20%).

## Notă

Material educațional pentru pregătirea examenului, după cursurile și LP-urile disciplinei. Nu e sfat medical.
