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
| `art/lessons/` | Lecțiile pe tablă: scenariul (`q15.script.mjs`), desenul fiecărei fraze (`q15.board.mjs`) și modelul de timp comun (`timing.mjs`) |
| `tools/` | Verificările (`tools/verify/`) și generatorul testului de după lecție (`lesson-test.mjs`) |
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
| Î15 | Pirogenii exogeni | O lecție pe tablă, în stilul Khan Academy (vezi mai jos), în locul figurii animate: patru capitole, 47 de fraze, 4 min 52 s. De la bacterie (LPS, acidul lipoteicoic) la receptorii macrofagului (LBP, CD14, TLR4:MD-2, TLR2:TLR6, la 10 px/nm), pirogenii endogeni (NF-κB, TNF-α tăiat de TACE, IL-1β prin porii de gasdermină D), efectele centrale (OVLT, COX-2, PGE₂, AMPc/GMPc, graficul pragului după Guyton fig. 74-11) și cele periferice și proinflamatoare (cele opt puncte din LP) |
| Î16, Î17 | Limfomul Hodgkin | Ganglionul limfatic în secțiune și o lupă pe micromediul tumoral, la scară, în culorile colorației hematoxilină–eozină: celula Reed–Sternberg, fondul inflamator reactiv, cele cinci subtipuri; organele afectate, citokinele pirogene spre hipotalamus și simptomele B |
| Î18, Î19, Î20 | Angina streptococică | Orofaringele prin gura deschisă și o lupă pe cripta amigdaliană (streptococii în lanțuri, toxinele, neutrofilele, puroiul), capul din profil cu ganglionii și complicațiile locale, complicațiile la distanță și graficul debutului; ultima etapă arată angina virală, pentru diagnosticul diferențial |
| Î22 | Reacția de fază acută și complementul | Mastocitul (IgE, antigen, Ca²⁺, degranulare), acidul arahidonic și derivații lui, venula și nociceptorul; cele trei căi ale complementului pe o bacterie Gram-negativă, opsonizarea, anafilatoxinele și complexul de atac membranar; ficatul cu proteinele de fază acută, frotiul cu devierea la stânga, hipotalamusul și graficele în timp |
| Î27, Î22 | Inflamația acută | Capilarul în secțiune: vasodilatație, exudat, marginație, rulare pe selectine, aderare prin integrine, diapedeză, chemotaxie și fagocitoză |

Figurile sunt construite după Cursul 1 (Starea de boală), Cursul 2 (Inflamația) și Cursul 3 (Termoreglarea) ale disciplinei.

## Biblioteca de celule și verificarea

Celulele și moleculele care apar în mai multe figuri sunt desenate o singură dată, în `art/parts/cells.mjs`, la scară: celulele primesc scara în px/µm (dimensiunile din Junqueira și Ross & Pawlina), moleculele în px/nm (extinderile calculate din structurile PDB: IgG 1IGT, IgM 2RCJ, IgA 6UE7, C1q 1PK6, MHC 3HLA și 1DLH, PCR 1B09, TLR4–MD-2 3FXI, TLR2–TLR6 3A79). Planșa lor: `node art/preview.mjs art/parts/cells.preview.mjs shots/cells.html`. Fiecare celulă își poartă scara în desen (`data-k`), așa că se poate măsura direct în µm.

- `node tools/verify/coverage.cjs` verifică dacă fiecare punct din baremul întrebărilor e acoperit de o piesă a unei figuri sau de o frază a unei lecții puse în pagina întrebării.
- `node tools/verify/figs.cjs` deschide fiecare figură: erori JS, toate modurile, lățimea pe telefon (390 px), capturi în ambele teme și cu simularea deuteranopiei și protanopiei, dimensiunea fiecărei celule din bibliotecă față de manual (±20%).

Fiecare pas e împărțit în momente scurte (`src/js/32-fx-anim.js`: piesele au cadre cheie, date de desen). Un moment se joacă încet, apoi mișcarea se oprește cu explicația pe ecran; „Următorul” și „Înapoi” merg în ritmul cititorului, „Redă singur” lasă timp de citit între momente, iar viteza se poate schimba. „Ecran complet” pune procesul pe tot ecranul: desenul cât mai mare, explicația jos, ca un subtitlu, iar sus pașii (se poate sări la oricare) și închiderea; din tastatură, → sau spațiu merg mai departe, ← înapoi, Esc închide. Stilul figurilor refăcute e cel al planșelor de manual: etichete scrise lângă structuri, cu o linie subțire terminată într-un punct (`art/lib/label.mjs`), fără numere în cerculețe și fără aparate desenate; fiecare pas arată doar ce e nou; figura stă pe o planșă deschisă la culoare în ambele teme.

## Lecția pe tablă (Î15)

Î15 e o lecție în stilul Khan Academy: tablă închisă la culoare, desen trasat progresiv în ritmul vocii, explicația vorbită și un subtitlu scurt jos. Pornește de la scenariu, nu de la desen.

- **Scenariul** (`art/lessons/q15.script.mjs`): pe capitole, fiecare frază cu exact o acțiune de desen (un contur trasat, o săgeată, un cuvânt scris, un cerc de semnalizare, o linie care taie), cuvântul la care începe desenul, punctul din barem pe care îl acoperă și sursa (baremul, LP-ul „Sindromul febril”, Janeway, Guyton).
- **Tabla** (`art/lessons/q15.board.mjs`): 1280 × 720, linii „de mână” și fontul Caveat (literele grecești din Mynerve), cel mult cinci culori cu sens fix, fără umbre și fără volum. Singura scară declarată e cercul de mărire din capitolul 1 (membrana de 4 nm și receptorii, la 10 px/nm, cu bara de 10 nm).
- **Culorile**: alb = structurile și textul obișnuit; roșu = pirogenul exogen (bacteria, LPS, acidul lipoteicoic); albastru = recunoașterea (TLR, CD14, MD-2, moleculele de adeziune); verde = pirogenii endogeni și celelalte citokine; galben = semnalul și efectul (căile, PGE₂, AMPc, pragul, cercurile de semnalizare).
- **Timpul** (`art/lessons/timing.mjs`, același pentru player și verificare): 150 de cuvinte pe minut, desenul pornește la cuvântul-cheie și ține 2–6 s, iar fraza următoare așteaptă desenul.
- **Playerul** (`src/js/33-lesson.js`): pornește/pauză, fraza dinainte și următoare, bara de timp pe capitole (apeși oriunde în ea), viteza 1× sau 0,75×, vocea, ecranul complet; tastele: spațiu, ← →, F. Vocea folosește Web Speech API, doar cu o voce românească (ro-RO); desenul pornește când vocea ajunge la cuvântul-cheie, iar fraza următoare așteaptă vocea. Fără voce românească pe dispozitiv rămâne subtitlul, în același ritm. Lecția se oprește la sfârșitul fiecărui capitol și continuă când apeși (segmentare); textul complet, cu desenele și sursele, e sub player.
- **Verificarea**: `node tools/verify/lesson.mjs 15` (o acțiune pe frază, acțiuni de 2–6 s, capitole de 1–2 min, 120–160 de cuvinte pe minut, fiecare punct din barem cu o frază); `node tools/verify/coverage.cjs` (Î15 14/14 din frazele lecției).
- **Testul de după lecție**: `node tools/lesson-test.mjs 15` scrie `dist/test-q15.html`, publicat separat, cu un tabel comun al rezultatelor. Fiecare participant vede lecția o singură dată, scrie răspunsul din memorie, îl corectează după barem (cu același motor ca aplicația, apoi bifează onest ce n-a recunoscut robotul) și spune dacă s-a pierdut undeva. Lecția trece dacă fiecare recuperează cel puțin 12 din 14 puncte și nimeni nu s-a pierdut.

## Notă

Material educațional pentru pregătirea examenului, după cursurile și LP-urile disciplinei. Nu e sfat medical.
