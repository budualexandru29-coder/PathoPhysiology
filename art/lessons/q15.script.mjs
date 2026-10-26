// Scenariul lecției Î15 (pirogenii exogeni), în stilul Khan Academy: o voce explică, iar desenul se face pe tablă în ritmul ei.
// Fiecare frază are exact o acțiune de desen; cuvântul-cheie (kw) e momentul în care începe desenul.
// rub: punctele din baremul Î15 (src/js/11-ch2-febra.js, Q[15].rub, „secțiune:punct”); src: de unde vine afirmația.
// Acțiuni: trace = un contur trasat, arrow = o săgeată, write = un cuvânt sau un rând scris, circle = un cerc de semnalizare,
// strike = o linie peste ceva (tăiere). Culorile au sens fix (COLORS). Desenul e o schemă de tablă: nu e la scară, cu o excepție
// declarată, membrana din capitolul 1, unde receptorii (~10–13 nm) sunt desenați proporțional cu membrana (~4 nm).
export const COLORS = {
  alb: { hex: "#F3F1EA", rol: "structurile (celule, membrane, organe, axe) și textul obișnuit" },
  rosu: { hex: "#F06A5F", rol: "pirogenul exogen: bacteria, LPS, acidul lipoteicoic" },
  albastru: { hex: "#6CB4F0", rol: "recunoașterea: receptorii (TLR, CD14, MD-2) și moleculele de adeziune" },
  verde: { hex: "#7FD38F", rol: "pirogenii endogeni și celelalte citokine (IL-1, TNF-α, IL-6, IL-8, IFN)" },
  galben: { hex: "#F5CF55", rol: "semnalul și efectul: căile, PGE₂, AMPc, pragul termostatului, cercurile de semnalizare" },
};
export const WPM = 150;             // ritmul vocii când vorbește (cuvinte pe minut); vocea tace cât se termină un desen, deci ritmul mediu e mai mic

export const CH = [
  {
    id: "c1", title: "1. De la bacterie la receptorul macrofagului",
    lines: [
      { t: "Legăm azi două lucruri: întrebarea spune pirogenii exogeni, dar efectele din curs sunt ale pirogenilor endogeni.", a: ["write", "titlul: «exogen → endogen → efecte»", "alb"], kw: "Legăm", src: "Febra LP, slide 18" },
      { t: "Bacteriile, virusurile și fungii au componente structurale care sunt pirogeni exogeni.", a: ["trace", "conturul unei bacterii Gram-negative (bastonaș)", "rosu"], kw: "Bacteriile", src: "Febra LP, slide 6" },
      { t: "Cel mai puternic este lipopolizaharidul, endotoxina din membrana externă a bacteriilor Gram-negative.", a: ["trace", "franjurile de LPS pe membrana externă, cu «LPS» scris lângă", "rosu"], kw: "lipopolizaharidul", rub: ["0:0"], src: "Febra LP, slide 6; Janeway p. 258" },
      { t: "La bacteriile Gram-pozitive, pirogenii sunt acidul lipoteicoic și peptidoglicanii din peretele gros.", a: ["trace", "o bacterie Gram-pozitivă (coc) cu peretele gros și firele de acid lipoteicoic", "rosu"], kw: "Gram-pozitive", src: "Febra LP, slide 6 (le numește «exotoxine»); Janeway p. 252" },
      { t: "Să mărim membrana unui macrofag, celula care le întâlnește prima.", a: ["trace", "cercul de mărire și linia membranei (dublu strat, ~4 nm)", "alb"], kw: "mărim", src: "Janeway p. 258–259" },
      { t: "În sânge, o proteină numită LBP preia molecula de LPS și o duce la CD14, de pe suprafața macrofagului.", a: ["arrow", "săgeata LPS → CD14, cu «LBP» scris pe ea", "albastru"], kw: "LBP", src: "Janeway p. 259" },
      { t: "CD14 o predă complexului TLR4 cu MD-2, iar două astfel de complexe se unesc în jurul lipidului A.", a: ["trace", "dimerul TLR4–MD-2, în formă de «m», ~13 nm", "albastru"], kw: "TLR4", src: "Janeway p. 258; PDB 3FXI" },
      { t: "TLR2 și TLR6, o altă pereche de receptori, recunosc acidul lipoteicoic.", a: ["trace", "heterodimerul TLR2:TLR6, ~12 nm, cu acidul lipoteicoic legat", "albastru"], kw: "TLR2", src: "Janeway p. 252; PDB 3A79" },
      { t: "Macrofagul înconjoară bacteria acoperită de complement și o fagocitează.", a: ["trace", "pseudopodele macrofagului care înconjoară bacteria (fagozomul)", "alb"], kw: "înconjoară", src: "Febra LP, slide 7" },
      { t: "Receptorii recunosc un tipar comun al microbilor, nu o bacterie anume; de aceea răspunsul vine repede.", a: ["circle", "un cerc în jurul celor doi receptori, cu «tipar microbian» scris lângă", "galben"], kw: "tipar", src: "Cursul 2, slide 41–42" },
    ],
  },
  {
    id: "c2", title: "2. Macrofagul face pirogenii endogeni",
    lines: [
      { t: "Odată legați, receptorii trimit semnalul în celulă, prin MyD88 și o cascadă de kinaze, până la NF-κB.", a: ["arrow", "săgeata în trepte: receptor → MyD88 → kinaze → NF-κB", "galben"], kw: "semnalul", src: "Janeway p. 260–262" },
      { t: "NF-κB intră în nucleu și pornește genele citokinelor.", a: ["arrow", "săgeata NF-κB → nucleu, cu «gene» scris în nucleu", "galben"], kw: "nucleu", src: "Janeway p. 261–262" },
      { t: "Macrofagul eliberează astfel pirogenii endogeni: interleukina 1, TNF-α și interleukina 6.", a: ["write", "«IL-1, TNF-α, IL-6» ieșind din celulă", "verde"], kw: "pirogenii", rub: ["0:1"], src: "Janeway p. 321; Febra LP, slide 7" },
      { t: "De aceea, la examen spunem: pirogenii exogeni acționează prin pirogenii endogeni pe care îi induc.", a: ["circle", "un cerc în jurul «IL-1, TNF-α, IL-6», cu «endogeni» scris", "galben"], kw: "acționează", rub: ["0:1"], src: "Febra LP, slide 7, 18" },
      { t: "IL-1 și TNF-α sunt cei mai puternici; IL-6 e cel mai slab pirogen, dar efectul lui durează mai mult.", a: ["write", "lângă IL-6, mai mic: «slab, dar persistent»", "verde"], kw: "IL-6", src: "Cursul 3, slide 59" },
      { t: "Atenție: lista din LP mai cuprinde interferonii, IL-8 și TNF-β și nu pomenește IL-6, pe care manualul îl numește alături de primii doi.", a: ["write", "dedesubt, mai mic: «LP: + IFN-α, IFN-γ, IL-8, TNF-β»", "verde"], kw: "LP", src: "Febra LP, slide 7 vs Janeway p. 321" },
      { t: "TNF-α stă întâi ancorat în membrană, iar proteaza TACE îl taie: nu toate citokinele ies la fel.", a: ["trace", "trimerul TNF-α ancorat în membrană și foarfeca TACE", "verde"], kw: "TNF-α", src: "Janeway p. 319" },
      { t: "Interleukina 1 beta nu are peptid semnal, așa că iese prin porii pe care îi face gasdermina D.", a: ["trace", "un por în membrană și IL-1β trecând prin el", "verde"], kw: "porii", src: "Janeway p. 273" },
      { t: "Toate trec în sânge și ajung la creier, la măduvă, la vase și la ficat.", a: ["arrow", "săgeata din celulă într-un vas, cu citokinele ca puncte verzi", "verde"], kw: "sânge", src: "Janeway p. 321–322" },
    ],
  },
  {
    id: "c3", title: "3. Efectele centrale: febra",
    lines: [
      { t: "Hipotalamusul anterior, cu aria preoptică, este locul din creier unde ajung citokinele.", a: ["trace", "conturul creierului în secțiune, cu hipotalamusul marcat", "alb"], kw: "Hipotalamusul", rub: ["1:1"], src: "Febra LP, slide 8, 18" },
      { t: "OVLT, organul vascular al laminei terminale, nu are barieră hematoencefalică.", a: ["write", "«OVLT — fără barieră hematoencefalică», cu o săgeată mică spre el", "alb"], kw: "OVLT", src: "Febra LP, slide 8" },
      { t: "În celulele endoteliale ale OVLT, citokinele cresc sinteza de PGE2, prin enzima COX-2.", a: ["write", "«COX-2 → PGE₂ ↑»", "galben"], kw: "PGE2", rub: ["1:0"], src: "Febra LP, slide 18; Janeway p. 321" },
      { t: "PGE2 acționează pe neuronii ariei preoptice și, pe calea AMPc și GMPc, crește pragul centrului termoreglator.", a: ["write", "«AMPc, GMPc → pragul ↑»", "galben"], kw: "AMPc", rub: ["1:2"], src: "Febra LP, slide 18" },
      { t: "Pe orizontală punem orele, pe verticală temperatura corpului, ca să urmărim totul în timp.", a: ["trace", "axele graficului, cu 37 și 39 °C", "alb"], kw: "orizontală", src: "Febra LP, slide 27 (după Guyton fig. 74-11)" },
      { t: "Pragul termostatului urcă brusc, de la 37 la 39 de grade.", a: ["trace", "linia pragului, în treaptă", "galben"], kw: "brusc", src: "Guyton p. 879–880; Febra LP, slide 27" },
      { t: "Corpul e acum sub noul prag, așa că simte frig: vasoconstricție, piloerecție, adrenalină și frison.", a: ["trace", "curba temperaturii corpului, care urcă încet", "alb"], kw: "Corpul", src: "Febra LP, slide 27; Guyton p. 879" },
      { t: "Febra: în câteva ore, temperatura corpului ajunge la noul prag.", a: ["circle", "un cerc pe platou, cu «febra» scris", "galben"], kw: "Febra", src: "Guyton p. 879–880" },
      { t: "Când pirogenul dispare, pragul coboară brusc, iar căldura în plus se pierde prin vasodilatație și transpirație: criza.", a: ["trace", "coborârea pragului și a temperaturii", "galben"], kw: "coboară", src: "Febra LP, slide 27; Guyton p. 880" },
      { t: "Aspirina blochează COX și, cu ea, sinteza de PGE2; de aceea scade febra.", a: ["strike", "o linie peste «COX-2»", "alb"], kw: "blochează", src: "Febra LP, slide 8; Guyton p. 879" },
    ],
  },
  {
    id: "c4", title: "4. Efectele periferice și proinflamatoare",
    lines: [
      { t: "Apărarea organismului crește și în periferie: pirogenii endogeni nu acționează doar pe creier.", a: ["write", "«periferic: apărarea ↑»", "alb"], kw: "Apărarea", rub: ["2:0"], src: "Febra LP, slide 18" },
      { t: "Crește apărarea nespecifică, a celulelor care recunosc tipare, ca neutrofilele și macrofagele.", a: ["trace", "un neutrofil (nucleu lobat), cu «nespecifică» scris", "alb"], kw: "nespecifică", src: "Febra LP, slide 18" },
      { t: "Crește și apărarea specifică, a limfocitelor B și T, care recunosc fiecare un antigen anume.", a: ["trace", "două limfocite, B și T, cu «specifică» scris", "alb"], kw: "specifică", src: "Febra LP, slide 18" },
      { t: "Anticorpii vin de la limfocitele B activate, care devin plasmocite; limfocitele T se activează și ele.", a: ["trace", "trei anticorpi în formă de Y lângă limfocitul B", "alb"], kw: "Anticorpii", rub: ["3:7"], src: "Febra LP, slide 19" },

      { t: "Un vas mic în mijlocul tablei: în jurul lui desenăm cele opt puncte ale efectului proinflamator.", a: ["trace", "o venulă orizontală în mijlocul tablei", "alb"], kw: "vas", src: "Febra LP, slide 19" },
      { t: "Unu: se eliberează mediatori de origine lipidică, PGE2, tromboxan și PAF.", a: ["write", "«1. PGE₂, TxA₂, PAF»", "galben"], kw: "lipidică", rub: ["3:0"], src: "Febra LP, slide 19" },
      { t: "Doi: crește mobilizarea leucocitelor din măduva hematogenă.", a: ["arrow", "«2.» săgeata din măduvă spre vas, cu leucocite", "alb"], kw: "mobilizarea", rub: ["3:1"], src: "Febra LP, slide 19" },
      { t: "Trei: pe endoteliu crește expresia moleculelor de adeziune, iar leucocitele se lipesc de perete.", a: ["trace", "«3.» moleculele de adeziune pe peretele vasului", "albastru"], kw: "adeziune", rub: ["3:2"], src: "Febra LP, slide 19" },
      { t: "Patru: se sintetizează IL-8, care atrage monocitele și neutrofilele spre focar.", a: ["arrow", "«4.» săgeata din vas spre focar, cu «IL-8»", "verde"], kw: "IL-8", rub: ["3:3"], src: "Febra LP, slide 19" },
      { t: "Cinci: fagocitoza e activată, iar fagocitul înconjoară bacteria.", a: ["trace", "«5.» un fagocit care înconjoară o bacterie", "alb"], kw: "fagocitoza", rub: ["3:4"], src: "Febra LP, slide 19" },
      { t: "Șase: ficatul crește sinteza proteinelor de fază acută, ca proteina C reactivă și fibrinogenul.", a: ["write", "«6. ficat → proteine de fază acută (PCR, fibrinogen)»", "alb"], kw: "ficatul", rub: ["3:5"], src: "Febra LP, slide 19; Janeway p. 322" },
      { t: "Șapte: scad fierul și zincul, de care bacteriile au nevoie ca să se înmulțească.", a: ["write", "«7. Fe ↓, Zn ↓»", "galben"], kw: "fierul", rub: ["3:6"], src: "Febra LP, slide 19" },
      { t: "Opt: interferonii antivirali cresc, iar limfocitele B și T sunt activate.", a: ["write", "«8. LB, LT, IFN antivirali»", "verde"], kw: "interferonii", rub: ["3:7"], src: "Febra LP, slide 19" },

      { t: "Pe scurt: LPS sau acidul lipoteicoic sunt recunoscute de receptorii Toll ai macrofagului.", a: ["write", "recapitularea, sus: «pirogen exogen → TLR»", "rosu"], kw: "LPS", src: "capitolul 1" },
      { t: "Macrofagul eliberează pirogenii endogeni: IL-1, TNF-α și IL-6.", a: ["arrow", "săgeata spre «IL-1, TNF-α, IL-6»", "verde"], kw: "eliberează", src: "capitolul 2" },
      { t: "Central, ei cresc PGE2 în OVLT și pragul termoreglator, pe calea AMPc: apare febra.", a: ["arrow", "săgeata spre «central: PGE₂ → prag ↑ → febra»", "galben"], kw: "Central", src: "capitolul 3" },
      { t: "Periferic, cresc apărarea specifică și nespecifică, iar efectul proinflamator are cele opt puncte.", a: ["arrow", "o săgeată care se ramifică spre «periferic» și «proinflamator (8)»", "alb"], kw: "Periferic", src: "capitolele 4–5" },
    ],
  },
];
