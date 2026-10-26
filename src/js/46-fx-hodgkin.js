/* ===== Î16 și Î17: limfomul Hodgkin — ganglionul, micromediul tumoral, organele afectate, simptomele B =====
   Desenul vine din art/hodgkin.mjs (ART.hodgkin). Variabila: ganglionul normal sau unul din cele cinci subtipuri (0–5).
   Textele cu diapozitiv vin din LP (Febra, slide 20–21) și din Cursul 3; descrierile de histologie sunt explicații suplimentare, cu sursa. */
(function () {
  const A = ART.hodgkin;
  const ST = ['Ganglion normal', 'LH clasic: scleroză nodulară', 'LH clasic: celularitate mixtă', 'LH clasic: bogat în limfocite', 'LH clasic: sărac în limfocite', 'LH nodular cu predominanță limfocitară'];
  const NODE = ['nn', 'ns', 'mc', 'lr', 'ld', 'lp'];
  const from = n => S => S.v >= n;
  const at = (...v) => S => v.includes(S.v);
  const P = {
    def: { t: 'Limfomul Hodgkin: neoplazie limfoidă malignă, de origine B', slide: 'Febra (LP), slide 20', q: { 16: ['0:0', '0:1'] }, on: from(1),
      body: 'Neoplazie limfoidă malignă, de origine B. Limfomul Hodgkin clasic se caracterizează prin prezența celulelor tumorale Hodgkin și Reed–Sternberg, într-un fond inflamator reactiv bogat în celule non-neoplazice. Afectează predominant nodulii limfatici, dar poate interesa și splina, ficatul sau măduva osoasă.' },
    rs: { t: 'Celulele Hodgkin și Reed–Sternberg', slide: 'Febra (LP), slide 20–21', q: { 16: ['0:2'], 17: ['0:0'] }, on: from(1),
      body: 'Limfomul Hodgkin clasic se caracterizează prin prezența celulelor tumorale Hodgkin și Reed–Sternberg. Mecanismul febrei începe cu ele: celulele Hodgkin / Reed–Sternberg secretă citokine și chemokine.' },
    bg: { t: 'Fondul inflamator reactiv: limfocite T, macrofage, eozinofile', slide: 'Febra (LP), slide 20–21', q: { 16: ['0:3'], 17: ['0:2', '0:3'] }, on: from(1),
      body: 'Celulele tumorale se găsesc într-un fond inflamator reactiv, bogat în celule non-neoplazice. Citokinele și chemokinele tumorale recrutează și activează celulele inflamatorii din micromediul tumoral: limfocite T, macrofage, eozinofile.' },
    ck: { t: 'Celulele tumorale secretă citokine și chemokine', slide: 'Febra (LP), slide 21', q: { 17: ['0:1'] }, on: from(1),
      body: 'Celulele Hodgkin / Reed–Sternberg secretă citokine și chemokine care recrutează și activează celulele inflamatorii din micromediul tumoral. În desen, punctele verzi din jurul celulei tumorale sunt chemokinele; limfocitele T se adună în rozetă în jurul ei.' },
    pyr: { t: 'Citokinele pirogene IL-1, IL-6, TNF-α ajung în sânge', slide: 'Febra (LP), slide 21; Cursul 3, slide 59', q: { 17: ['0:4'] }, on: from(1),
      body: 'Celulele inflamatorii activate eliberează citokine pirogene: IL-1, IL-6, TNF-α. Cursul: celulele tumorale (leucemii, limfoame Hodgkin, cancere de organe solide) acționează fie prin efect pirogen direct, fie prin implicarea celulelor inflamatorii.' },
    hyp: { t: 'Hipotalamusul: PGE2, setpoint-ul crește', slide: 'Febra (LP), slide 21; Cursul 3, slide 60', q: { 17: ['0:5', '0:6'] }, on: from(1),
      body: 'Citokinele pirogene cresc sinteza de PGE2 la nivel hipotalamic și temperatura de referință (setpoint-ul). Organismul răspunde prin vasoconstricție periferică, frison și termogeneză.' },
    b1: { t: 'Febră inexplicabilă peste 38°C', slide: 'Febra (LP), slide 20–21', q: { 16: ['2:0'], 17: ['0:7', '0:8'] }, on: from(1),
      body: 'Simptomele B: febră inexplicabilă peste 38°C, transpirații nocturne profuze, scădere ponderală neintenționată de peste 10% în ultimele 6 luni. Febra apare prin vasoconstricție periferică, frison și termogeneză, după ce setpoint-ul a crescut.' },
    b2: { t: 'Transpirații nocturne profuze', slide: 'Febra (LP), slide 20', q: { 16: ['2:1'] }, on: from(1),
      body: 'Al doilea simptom B: transpirații nocturne profuze.' },
    b3: { t: 'Scădere ponderală neintenționată > 10% în 6 luni', slide: 'Febra (LP), slide 20', q: { 16: ['2:2'] }, on: from(1),
      body: 'Al treilea simptom B: scădere ponderală neintenționată de peste 10% în ultimele 6 luni.' },
    sites: { t: 'Nodulii limfatici, afectați predominant', slide: 'Febra (LP), slide 20', q: { 16: ['0:4'] }, on: from(1),
      body: 'Limfomul Hodgkin afectează predominant nodulii limfatici. În desen sunt mărite grupele cervicale, supraclaviculare și mediastinale.' },
    org: { t: 'Splina și ficatul', slide: 'Febra (LP), slide 20', q: { 16: ['0:4'] }, on: from(1),
      body: 'Pe lângă nodulii limfatici, boala poate interesa și splina, ficatul sau măduva osoasă.' },
    mar: { t: 'Măduva osoasă', slide: 'Febra (LP), slide 20', q: { 16: ['0:4'] }, on: from(1),
      body: 'Pe lângă nodulii limfatici, boala poate interesa și splina, ficatul sau măduva osoasă. În desen, măduva roșie din aripile iliace și din femur.' },
    cls: { t: 'Clasificarea: LH clasic (4 subtipuri) și LH nodular cu predominanță limfocitară', slide: 'Febra (LP), slide 20', q: { 16: ['1:0', '1:1', '1:2', '1:3', '1:4'] }, on: from(1),
      body: 'Limfomul Hodgkin clasic: scleroză nodulară, celularitate mixtă, bogat în limfocite, sărac în limfocite. A doua formă: limfomul Hodgkin nodular cu predominanță limfocitară.' },
    nn: { t: 'Ganglionul limfatic normal', ctx: 'Mescher AL. Junqueira’s Basic Histology, 16th ed., McGraw-Hill 2021, cap. 14', on: at(0),
      body: 'Capsula de țesut conjunctiv, cu limfaticele aferente; sub ea sinusul subcapsular. Corticala are foliculi limfoizi (limfocite B), cu centru germinativ palid; paracortexul (limfocite T) are venule cu endoteliu înalt, pe unde intră limfocitele din sânge. Medulara are cordoane medulare și sinusuri. La hil intră artera și ies vena și limfaticul eferent. În lupă: paracortexul, plin de limfocite mici.' },
    ns: { t: 'Scleroza nodulară', ctx: 'Swerdlow SH et al. WHO Classification of Tumours of Haematopoietic and Lymphoid Tissues, revised 4th ed., IARC 2017; Kumar V et al. Robbins & Cotran Pathologic Basis of Disease, 10th ed., 2020', q: { 16: ['1:0', '1:1'] }, on: at(1),
      body: 'Benzi groase de colagen împart ganglionul în noduli, iar capsula se îngroașă. Celula tipică e celula lacunară: citoplasma se retrage la fixarea țesutului și lasă un spațiu clar în jurul ei. Fondul are limfocite, eozinofile, histiocite. Este cel mai frecvent subtip (aproximativ 70% din LH clasic), des cu mase mediastinale, la adulți tineri.' },
    mc: { t: 'Celularitatea mixtă', ctx: 'Swerdlow SH et al. WHO Classification of Tumours of Haematopoietic and Lymphoid Tissues, revised 4th ed., IARC 2017; Kumar V et al. Robbins & Cotran Pathologic Basis of Disease, 10th ed., 2020', q: { 16: ['1:0', '1:2'] }, on: at(2),
      body: 'Ganglionul e șters difuz, fără benzi de colagen. Celule Reed–Sternberg clasice, binucleate, într-un fond amestecat: limfocite, eozinofile, plasmocite, histiocite. Aproximativ 20–25% din LH clasic; subtipul cel mai des asociat cu virusul Epstein–Barr; simptomele B sunt mai frecvente.' },
    lr: { t: 'Forma bogată în limfocite', ctx: 'Swerdlow SH et al. WHO Classification of Tumours of Haematopoietic and Lymphoid Tissues, revised 4th ed., IARC 2017', q: { 16: ['1:0', '1:3'] }, on: at(3),
      body: 'Puține celule Hodgkin / Reed–Sternberg, risipite printre foarte multe limfocite mici, adesea într-un model nodular; eozinofilele și plasmocitele sunt rare. Aproximativ 5% din LH clasic.' },
    ld: { t: 'Forma săracă în limfocite', ctx: 'Swerdlow SH et al. WHO Classification of Tumours of Haematopoietic and Lymphoid Tissues, revised 4th ed., IARC 2017', q: { 16: ['1:0', '1:3'] }, on: at(4),
      body: 'Multe celule Hodgkin / Reed–Sternberg, adesea pleomorfe, puține limfocite și fibroză difuză, dezordonată. Este cea mai rară formă (sub 1% din LH clasic), mai frecventă la vârstnici și la persoanele cu infecție HIV.' },
    lp: { t: 'Forma nodulară cu predominanță limfocitară', ctx: 'Swerdlow SH et al. WHO Classification of Tumours of Haematopoietic and Lymphoid Tissues, revised 4th ed., IARC 2017', q: { 16: ['1:4'] }, on: at(5),
      body: 'Noduli mari, vagi, de limfocite B mici, cu rețea de celule dendritice foliculare. Celulele tumorale sunt celule LP („popcorn”), cu nucleu plurilobat, pliat, și nucleoli mici; în jurul lor, rozete de limfocite T. Spre deosebire de celulele Reed–Sternberg clasice, sunt CD20+, CD15− și CD30−. Aproximativ 5% din limfoamele Hodgkin; simptomele B sunt rare.' },
    /* trăsăturile de histologie ale fiecărui subtip: variantele exercițiului „Prezice” */
    fGc: { t: 'Foliculi cu centri germinativi, paracortex și medulară păstrate', ctx: 'Mescher AL. Junqueira’s Basic Histology, 16th ed., 2021', eff: 1, on: at(0), body: 'Arhitectura normală a ganglionului: foliculi limfoizi cu centru germinativ în corticală, paracortex, medulară cu cordoane și sinusuri.' },
    fNo: { t: 'Nicio celulă Hodgkin / Reed–Sternberg', ctx: 'Mescher AL. Junqueira’s Basic Histology, 16th ed., 2021', eff: 1, on: at(0), body: 'Într-un ganglion normal nu există celule Hodgkin / Reed–Sternberg.' },
    fHrs: { t: 'Celule Hodgkin / Reed–Sternberg (CD30+, CD15+)', ctx: 'Swerdlow SH et al. WHO Classification of Tumours of Haematopoietic and Lymphoid Tissues, revised 4th ed., IARC 2017', eff: 1, on: at(1, 2, 3, 4), body: 'Celulele tumorale ale limfomului Hodgkin clasic, prezente în toate cele patru subtipuri: exprimă CD30 și CD15.' },
    fBand: { t: 'Benzi groase de colagen care împart ganglionul în noduli', ctx: 'Swerdlow SH et al. WHO Classification of Tumours of Haematopoietic and Lymphoid Tissues, revised 4th ed., IARC 2017', eff: 1, on: at(1), body: 'Trăsătura care dă numele sclerozei nodulare.' },
    fLac: { t: 'Celule lacunare, într-un spațiu clar', ctx: 'Swerdlow SH et al. WHO Classification of Tumours of Haematopoietic and Lymphoid Tissues, revised 4th ed., IARC 2017', eff: 1, on: at(1), body: 'Varianta de celulă tumorală tipică sclerozei nodulare: citoplasma se retrage la fixare și lasă un spațiu clar.' },
    fMix: { t: 'Fond amestecat: multe eozinofile, plasmocite, histiocite', ctx: 'Swerdlow SH et al. WHO Classification of Tumours of Haematopoietic and Lymphoid Tissues, revised 4th ed., IARC 2017', eff: 1, on: at(2), body: 'Fondul care dă numele celularității mixte.' },
    fDif: { t: 'Ganglion șters difuz, fără benzi de colagen', ctx: 'Swerdlow SH et al. WHO Classification of Tumours of Haematopoietic and Lymphoid Tissues, revised 4th ed., IARC 2017', eff: 1, on: at(2, 4), body: 'Arhitectura ganglionului dispare complet, fără noduli delimitați de benzi de colagen: celularitatea mixtă și forma săracă în limfocite.' },
    fLy: { t: 'Foarte multe limfocite mici, rare celule tumorale', ctx: 'Swerdlow SH et al. WHO Classification of Tumours of Haematopoietic and Lymphoid Tissues, revised 4th ed., IARC 2017', eff: 1, on: at(3, 5), body: 'Forma bogată în limfocite și forma nodulară cu predominanță limfocitară.' },
    fPleo: { t: 'Multe celule Hodgkin pleomorfe, puține limfocite, fibroză', ctx: 'Swerdlow SH et al. WHO Classification of Tumours of Haematopoietic and Lymphoid Tissues, revised 4th ed., IARC 2017', eff: 1, on: at(4), body: 'Forma săracă în limfocite.' },
    fPop: { t: 'Celule „popcorn” (LP): CD20+, CD15−, CD30−', ctx: 'Swerdlow SH et al. WHO Classification of Tumours of Haematopoietic and Lymphoid Tissues, revised 4th ed., IARC 2017', eff: 1, on: at(5), body: 'Celulele tumorale ale formei nodulare cu predominanță limfocitară, diferite imunofenotipic de celulele Reed–Sternberg clasice.' },
    fNod: { t: 'Noduli mari și vagi de limfocite B', ctx: 'Swerdlow SH et al. WHO Classification of Tumours of Haematopoietic and Lymphoid Tissues, revised 4th ed., IARC 2017', eff: 1, on: at(5), body: 'Arhitectura formei nodulare cu predominanță limfocitară.' },
    x1: { t: 'Cum arată celula Reed–Sternberg', ctx: 'Küppers R. The biology of Hodgkin’s lymphoma. Nat Rev Cancer 2009;9:15–27; Swerdlow SH et al. WHO Classification, IARC 2017',
      body: 'O celulă mare, cu doi nuclei în oglindă (sau un nucleu bilobat), fiecare cu un nucleol mare, roșu, înconjurat de un halou clar: aspectul de „ochi de bufniță”. Varianta cu un singur nucleu e celula Hodgkin. Provin din limfocite B ale centrului germinativ, dar și-au pierdut programul de limfocit B; exprimă CD30 și CD15. Sunt foarte puține: de obicei 0,1–2% din celulele țesutului tumoral.' },
    x2: { t: 'Ce semnale trimite celula tumorală', ctx: 'Aldinucci D et al. The classical Hodgkin’s lymphoma microenvironment and its role in promoting tumour growth and immune escape. J Pathol 2010;221:248–263',
      body: 'Câteva exemple: chemokinele CCL17 (TARC) și CCL22 atrag limfocite T helper de tip 2 și T reglatoare, care formează rozeta; IL-5 și eotaxina atrag eozinofilele; TGF-β, IL-13 și TNF-α stimulează fibroblastele (colagenul din scleroza nodulară). Micromediul ajută celula tumorală să scape de răspunsul imun.' },
    x3: { t: 'Scara și convențiile desenului', ctx: 'Mescher AL. Junqueira’s Basic Histology, 16th ed., McGraw-Hill 2021',
      body: 'Ganglionul e schematic, nu la scară (un ganglion normal are de obicei sub 1 cm). Lupa e la scară aproximativă, 2,3 px/µm: limfocitul mic ~7 µm, eozinofilul ~13 µm, celula Reed–Sternberg ~36 µm. Culorile imită colorația hematoxilină–eozină: nucleii violet, citoplasma și colagenul roz, granulele eozinofilelor roșu-portocaliu. Citokinele sunt mărite mult, ca să se vadă.' },
    x4: { t: 'Graficele simptomelor B', ctx: 'Lister TA et al. Report of a committee convened to discuss the evaluation and staging of patients with Hodgkin’s disease: Cotswolds meeting. J Clin Oncol 1989;7:1630–1636',
      body: 'Pragurile sunt cele din definiție: 38°C, nocturne, 10% în 6 luni. Curbele sunt exemple: greutatea scade de la 70 la 61 kg; febra vine în valuri de câteva zile, cu perioade fără febră între ele (tipar clasic, dar nu obligatoriu, în limfomul Hodgkin).' },
    pr: { t: 'Pruritul', ctx: 'Lister TA et al. Cotswolds meeting. J Clin Oncol 1989;7:1630–1636; Ansell SM. Hodgkin lymphoma: 2023 update on diagnosis, risk-stratification, and management. Am J Hematol 2022;97:1478–1488',
      body: 'Mâncărimea pielii e frecventă în limfomul Hodgkin, dar nu face parte din simptomele B.' },
    ad: { t: 'Adenopatia nedureroasă', ctx: 'Ansell SM. Hodgkin lymphoma: 2023 update on diagnosis, risk-stratification, and management. Am J Hematol 2022;97:1478–1488',
      body: 'Cel mai des, boala se arată ca un ganglion mărit, nedureros, cervical sau mediastinal. E semnul de prezentare, nu un simptom B.' },
  };
  const FEAT = ['fHrs', 'fBand', 'fLac', 'fMix', 'fDif', 'fLy', 'fPleo', 'fPop', 'fNod'];
  const ROWS = [['rs', 2, 'Celula mare cu nucleoli roșii, din centrul lupei'], ['ck', 2, 'Punctele verzi din jurul celulei tumorale'], ['bg', 3, 'Limfocitele, eozinofilele, plasmocitele, histiocitele'], ['pyr', 4, 'Venula cu citokine: IL-1, TNF-α, IL-6'], ['hyp', 8, 'Hipotalamusul (punctul galben)'], ['sites', 5, 'Ganglionii cervicali, supraclaviculari, mediastinali'], ['org', 6, 'Splina și ficatul'], ['mar', 7, 'Măduva din bazin și din femur'], ['b1', 9, 'Graficul temperaturii'], ['b2', 10, 'Noaptea, cu picături de sudoare'], ['b3', 11, 'Graficul greutății']];
  const hit = a => a.w != null ? `<rect class="hit" x="${(+a.x).toFixed(1)}" y="${(+a.y).toFixed(1)}" width="${(+a.w).toFixed(1)}" height="${(+a.h).toFixed(1)}" rx="8"/>` : `<circle class="hit" cx="${(+a.cx).toFixed(1)}" cy="${(+a.cy).toFixed(1)}" r="${a.r}"/>`;
  const badge = (n, [x, y]) => `<g class="bdg-s"><circle cx="${x}" cy="${y}" r="8.6"/><text x="${x}" y="${y + 3.6}" text-anchor="middle" data-ui>${n}</text></g>`;

  FX.def('hodgkin', {
    title: 'Limfomul Hodgkin: ganglionul, celula Reed–Sternberg și simptomele B',
    meta: 'Limfomul Hodgkin: subtipurile, micromediul tumoral și simptomele B',
    qs: [16, 17],
    kind: 'mix',
    note: 'Sus, un ganglion limfatic în secțiune (schematic) și o lupă pe țesutul lui, la scară aproximativă (2,3 px/µm), în culorile colorației hematoxilină–eozină. Jos, corpul văzut din față, cu grupele de ganglioni, splina, ficatul și măduva, și trei grafice pentru simptomele B. Cursorul trece de la ganglionul normal la cele cinci subtipuri; graficele sunt exemple construite pe pragurile din definiție.',
    src: 'Febra (LP), slide 20–21; Cursul 3 (Termoreglarea), slide 59–60, 68',
    neutral: 0,
    ctl: { type: 'range', label: 'Ganglionul', min: 0, max: 5, step: 1, init: 2, fmt: v => ST[v], play: { ms: 2600, label: 'Treci prin subtipuri' }, peek: 'Compară cu ganglionul normal' },
    initV: () => 2,
    hints: {
      predict: 'Alege un subtip, bifează ce crezi că se vede, apoi apasă „Dezvăluie”.',
      explore: 'Mută cursorul prin subtipuri. Apasă o celulă, un ganglion sau un grafic ori un rând de mai jos: vezi textul din LP și punctul din barem.',
    },
    predict: { kind: 'pick', prompt: (S, lab) => `${lab}: ce găsești?` },
    tour: [
      { v: 0, parts: ['nn', 'x3'], t: 'Un ganglion limfatic normal',
        see: 'Capsula roz, sub ea sinusul subcapsular (linia albă), foliculii cu centru germinativ palid, paracortexul, medulara cu cordoane și sinusuri, iar la hil artera, vena și limfaticul eferent. Lupa arată paracortexul: limfocite mici, dense, un macrofag și o venulă cu endoteliu înalt.' },
      { v: 2, parts: ['def', 'rs', 'x1'], t: 'Celula Reed–Sternberg',
        see: 'În celularitatea mixtă ganglionul e șters difuz. În centrul lupei (2), celula Reed–Sternberg: mare, cu doi nuclei în oglindă și câte un nucleol roșu, cu halou. Sus, în dreapta, o celulă Hodgkin, cu un singur nucleu.' },
      { v: 2, parts: ['ck', 'bg', 'x2'], t: 'Fondul inflamator reactiv',
        see: 'Celulele tumorale sunt puține. Restul sunt celule reactive (3), atrase de citokinele și chemokinele tumorii (punctele verzi): limfocite T în rozetă în jurul celulei Reed–Sternberg, eozinofile cu granule roșu-portocalii, plasmocite cu nucleul excentric, histiocite palide.' },
      { v: 2, parts: ['pyr', 'hyp', 'b1'], t: 'De la ganglion la febră',
        see: 'Celulele inflamatorii eliberează IL-1, TNF-α și IL-6, care intră în venulă (4) și, prin sânge, ajung la hipotalamus (8). Acolo crește sinteza de PGE2 și setpoint-ul; urmează vasoconstricție, frison, termogeneză: febră peste 38°C (9).' },
      { v: 2, parts: ['b1', 'b2', 'b3', 'x4'], t: 'Simptomele B',
        see: 'Febra inexplicabilă peste 38°C (9), transpirațiile nocturne profuze (10) și scăderea ponderală neintenționată de peste 10% în 6 luni (11): aici, de la 70 la 61 kg.' },
      { v: 2, parts: ['sites', 'org', 'mar'], t: 'Unde se localizează',
        see: 'Predominant în ganglioni (5): aici cervicali, supraclaviculari și mediastinali, măriți. Poate interesa și splina, ficatul (6) sau măduva osoasă (7).' },
      { v: 1, parts: ['cls', 'ns'], t: 'Scleroza nodulară',
        see: 'Benzi groase de colagen împart ganglionul în noduli, iar capsula se îngroașă. În lupă, banda de colagen cu fibroblaste și celulele lacunare: celule tumorale într-un spațiu clar.' },
      { v: 3, parts: ['cls', 'lr'], t: 'Forma bogată în limfocite',
        see: 'Noduli denși de limfocite mici; în lupă, o singură celulă Hodgkin printre foarte multe limfocite.' },
      { v: 4, parts: ['cls', 'ld'], t: 'Forma săracă în limfocite',
        see: 'Ganglionul e palid, fibros. În lupă, multe celule Hodgkin pleomorfe, fibre de colagen dezordonate și puține limfocite.' },
      { v: 5, parts: ['cls', 'lp'], t: 'Forma nodulară cu predominanță limfocitară',
        see: 'A doua formă din clasificare. Noduli mari și vagi; în lupă, celule „popcorn”, cu nucleu plurilobat și nucleoli mici, înconjurate de rozete de limfocite T, într-un fond de limfocite B mici.' },
    ],
    parts: P,
    games: {
      order: {
        prompt: 'Pune în ordine mecanismul febrei în limfomul Hodgkin (LP, slide 21).',
        items: [
          { t: 'Celulele Hodgkin / Reed–Sternberg secretă citokine și chemokine', parts: ['rs', 'ck'] },
          { t: 'Recrutarea și activarea limfocitelor T, macrofagelor, eozinofilelor', parts: ['bg'] },
          { t: 'Eliberarea de citokine pirogene: IL-1, IL-6, TNF-α', parts: ['pyr'] },
          { t: 'Sinteză crescută de PGE2 hipotalamic, setpoint-ul crește', parts: ['hyp'] },
          { t: 'Vasoconstricție periferică, frison, termogeneză: febră', parts: ['b1'] },
        ],
      },
      sort: {
        prompt: 'Care sunt simptome B și care nu?',
        bins: [{ id: 'b', t: 'Simptom B', sub: 'Febra (LP), slide 20', short: 'B', tone: 'heat' }, { id: 'n', t: 'Nu e simptom B', sub: 'explicație suplimentară', short: 'Nu' }],
        items: [{ id: 'b1', bin: 'b' }, { id: 'b2', bin: 'b' }, { id: 'b3', bin: 'b' }, { id: 'pr', bin: 'n' }, { id: 'ad', bin: 'n' }],
      },
    },
    now(S) { return `<b data-ui>${ST[S.v]}</b>`; },
    stage(o, H, S) {
      const uid = 'fx' + FX.n, U = x => x.replaceAll('__U__', uid), L = A.L, hs = A.hits, bd = A.badges;
      let s = `<div class="hk" data-st="${S.v}">`;
      s += `<svg class="iso-svg hk-svg an-svg" viewBox="0 0 ${A.W} ${A.H}" role="group" aria-label="Ganglion limfatic în secțiune, lupă pe micromediul tumoral cu celula Reed–Sternberg, corpul cu grupele de ganglioni și graficele simptomelor B">`;
      s += `<defs>${U(A.defs)}</defs>`;
      s += L.frames + U(L.node) + L.callout + U(L.lens) + L.scaleBar + L.body + L.nodesB + L.sitesHL + L.ckBody + L.hypo + L.ch1 + L.ch2 + L.ch3;
      NODE.forEach((id, i) => { s += `<g class="hkn n${i}">${H.spart(id, hit(hs.node) + badge(1, bd.node))}</g>`; });
      [['rs', 2], ['bg', 3], ['pyr', 4], ['sites', 5], ['org', 6], ['mar', 7], ['hyp', 8], ['b1', 9], ['b2', 10], ['b3', 11]].forEach(([id, n]) => { s += H.spart(id, hit(hs[id]) + badge(n, bd[id])); });
      s += '</svg>';
      const cut = s.length;
      s += `<ul class="circ-rows fv-rows hk-rows" aria-label="Ce arată figura">${NODE.map((id, i) => `<li class="hkn n${i}"><button type="button" class="fxp row" data-p="${id}"><span class="bdg" data-ui>1</span><span class="rt"><span class="rl">${H.lab('l' + id, P[id].t)}</span><span class="rd" data-ui>Ganglionul în secțiune</span></span><span class="ar" aria-hidden="true"></span></button></li>`).join('')}`
        + ROWS.map(([id, b, dev]) => `<li><button type="button" class="fxp row" data-p="${id}"><span class="bdg" data-ui>${b}</span><span class="rt"><span class="rl">${H.lab('l' + id, P[id].t)}</span><span class="rd" data-ui>${dev}</span></span><span class="ar" aria-hidden="true"></span></button></li>`).join('') + '</ul>';
      s += `<div class="circ-sym"><span class="sl" data-ui>Din LP</span>${['def', 'cls'].map(id => `<button type="button" class="fxp sym" data-p="${id}">${P[id].t}</button>`).join('')}${['x1', 'x2', 'x3', 'x4'].map(id => `<button type="button" class="fxp sym ctxs" data-p="${id}">${P[id].t}</button>`).join('')}</div></div>`;
      return { view: s.slice(0, cut) + '</div>', legend: '<div class="hk hk-leg circ" data-st="' + S.v + '">' + s.slice(cut) };
    },
    update(el, S) {
      const v = Math.max(0, Math.min(5, Math.round(S.vv)));
      el.querySelectorAll('.hk').forEach(r => { r.dataset.st = v; });
      el.querySelectorAll('.hk-rows .row').forEach(b => { const on = FX.isOn(P[b.dataset.p], { v }); b.dataset.ch = on ? 1 : 0; b.querySelector('.ar').textContent = on ? '●' : '·'; });
      el.querySelectorAll('.hk-leg .sym').forEach(b => b.classList.toggle('lit', FX.isOn(P[b.dataset.p], { v })));
    },
    panel(S, H) {
      if (S.v === 0) return `<section class="fx-grp"><h4><span data-ui>${ST[0]}</span><small>histologie</small></h4><ol class="fx-chain"><li>${H.node('nn')}</li><li>${H.node('fGc')}</li><li>${H.node('fNo')}</li></ol></section>`;
      return `<section class="fx-grp"><h4><span data-ui>${ST[S.v]}</span><small>Febra (LP), slide 20</small></h4><ol class="fx-chain"><li>${H.node('cls')}</li><li>${H.node(NODE[S.v], 'heat')}</li>${FEAT.filter(id => FX.isOn(P[id], S)).map(id => `<li>${H.node(id)}</li>`).join('')}</ol></section>`
        + `<section class="fx-grp"><h4><span data-ui>Mecanismul febrei</span><small>Febra (LP), slide 21</small></h4><ol class="fx-chain">${['rs', 'ck', 'bg', 'pyr', 'hyp', 'b1'].map(id => `<li>${H.node(id, 'heat')}</li>`).join('')}</ol></section>`
        + `<section class="fx-grp"><h4><span data-ui>Simptomele B</span><small>Febra (LP), slide 20</small></h4><ol class="fx-chain">${['b1', 'b2', 'b3'].map(id => `<li>${H.node(id)}</li>`).join('')}</ol></section>`;
    },
  });
})();
