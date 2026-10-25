/* ===== Capitolul 4: Sindromul inflamator în context infecțios (Î25–41) ===== */

Q[25] = {
  ch: 'infect', s: 'Infecția: definiție și clasificare', src: 'Sindromul inflamator în context infecțios, slide 12–13',
  sum: 'Infecția este invazia și multiplicarea unui microorganism patogen în organismul gazdă, asociată de obicei cu un răspuns al gazdei care poate produce leziuni tisulare sau boală. Clasificare: după agentul etiologic (bacterii, virusuri, fungi, paraziți); după localizare (respiratorii, urinare, gastrointestinale, cutanate); după evoluție (acute, cronice, latente); după origine și circumstanțe (comunitare, nosocomiale – peste 48 h de la internare; oportuniste vs produse de patogeni primari).',
  learn: [
    ['def', 'Infecția', '<b>Invazia și multiplicarea</b> unui microorganism patogen în organismul gazdă, asociată de obicei cu un <b>răspuns al gazdei</b> care poate cauza leziuni tisulare sau boală.'],
    ['fig', 'infectClass'],
    ['tbl', 'Clasificarea infecțiilor', ['Criteriu', 'Categorii'], [
      ['<b>Agentul etiologic</b>', 'bacterii, virusuri, fungi, paraziți'],
      ['<b>Localizarea / anatomia afectată</b>', 'respiratorii, urinare, ale tractului gastrointestinal, cutanate etc.'],
      ['<b>Evoluția în timp</b>', '<b>acute</b> (scurtă durată, adesea severe); <b>cronice</b> (lungă durată, ex. hepatita cronică B); <b>latente</b> (agentul rămâne inactiv, cu reactivări periodice, ex. virusul herpetic)'],
      ['<b>Originea și circumstanțele apariției</b>', '<b>comunitare</b> (dobândite în afara spitalului); <b>nosocomiale</b> (dobândite într-o unitate medicală, la peste 48 de ore de la internare); <b>oportuniste</b> (la gazde cu deficiențe imunologice sau comorbidități, ex. infecții fungice invazive la imunodeprimați); produse de <b>patogeni primari</b> (pot îmbolnăvi și gazde sănătoase)']
    ]],
    ['box', 'tip', 'Patogen primar vs oportunist', 'Un <b>patogen primar (franc)</b> produce boală chiar și la indivizi imunocompetenți. Un <b>patogen oportunist</b> produce boală mai ales când apărarea gazdei e compromisă.']
  ],
  plan: ['Definiția infecției: invazie + multiplicare + răspunsul gazdei care produce leziuni sau boală.', 'După agent: bacterii, virusuri, fungi, paraziți.', 'După localizare: respiratorii, urinare, GI, cutanate.', 'După evoluție: acute, cronice (hepatita B), latente (herpes).', 'După origine: comunitare, nosocomiale (> 48 h), oportuniste vs patogeni primari (definește-i).'],
  cloze: [
    'Infecția reprezintă [[invazia]] și [[multiplicarea]] unui microorganism patogen în organismul gazdă.',
    'Infecția este asociată de obicei cu un [[răspuns al gazdei|raspuns al gazdei|raspuns]] care poate cauza leziuni tisulare sau boală.',
    'După agentul etiologic, infecțiile sunt produse de bacterii, [[virusuri]], fungi și [[paraziți|paraziti]].',
    'După evoluție, infecțiile sunt acute, [[cronice]] (ex. hepatita B) și [[latente]] (ex. virusul herpetic).',
    'Infecțiile [[nosocomiale]] sunt dobândite într-o unitate medicală, la peste [[48]] de ore de la internare.',
    'Infecțiile [[comunitare]] sunt dobândite în afara spitalului.',
    'Un patogen [[oportunist]] produce boală mai ales când mecanismele de apărare ale gazdei sunt compromise.',
    'Un patogen [[primar|franc]] poate cauza boală chiar și la indivizi [[imunocompetenți|imunocompetenti]].'
  ],
  rub: [
    ['Definiție', [
      ['Invazia și multiplicarea unui microorganism patogen', ['invazi', 'multiplic'], 2],
      ['în organismul gazdă', ['gazd']],
      ['Răspunsul gazdei poate cauza leziuni tisulare sau boală', ['raspuns', 'lezi', 'boal'], 1]
    ]],
    ['Clasificare', [
      ['După agent: bacterii, virusuri, fungi, paraziți', ['bacteri', 'virus', 'fung', 'parazit'], 2],
      ['După localizare: respiratorii, urinare, GI, cutanate', ['respirator', 'urinar', 'gastrointestin', 'digestiv', 'cutanat', 'localiz'], 1],
      ['După evoluție: acute', ['acut'], 1],
      ['cronice (ex. hepatita B)', ['cronic'], 1],
      ['latente (ex. virusul herpetic), cu reactivări', ['latent', 'reactiv'], 1],
      ['Comunitare (în afara spitalului)', ['comunitar'], 1],
      ['Nosocomiale (> 48 h de la internare)', ['nosocom', '=48', 'spital'], 2],
      ['Oportuniste (gazde imunodeprimate)', ['oportun'], 1],
      ['Patogeni primari (franci), boală și la imunocompetenți', ['primar', 'franc', 'imunocompetent'], 1]
    ]]
  ],
  chains: []
};

Q[26] = {
  ch: 'infect', s: 'Barierele naturale ale gazdei', src: 'Sindromul inflamator în context infecțios, slide 14',
  sum: 'Barierele naturale sunt prima linie de apărare: previn nespecific aderența și invazia germenilor. Pielea intactă și mucoasele formează o barieră fizică continuă. Mecanisme particulare: clearance-ul mucociliar al epiteliului respirator; secreții protectoare (lacrimi, salivă, mucus) cu enzime (lizozim, lactoferină, defensine); pH-ul acid al stomacului și al pielii; flora microbiană normală (ex. lactobacilii vaginali mențin pH-ul scăzut și inhibă Candida).',
  learn: [
    ['def', 'Barierele naturale', '<b>Prima linie de apărare</b> împotriva infecțiilor: previn <b>aderența și invazia</b> majorității germenilor, în mod <b>nespecific</b>.'],
    ['fig', 'defenseLayers'],
    ['tbl', 'Barierele naturale (slide 14)', ['Barieră', 'Cum protejează'], [
      ['<b>Pielea intactă și mucoasele</b>', 'Barieră fizică continuă, dificil de penetrat de majoritatea patogenilor'],
      ['<b>Clearance-ul mucociliar</b>', 'Celulele epiteliale ale tractului respirator au cili care împing mucusul (cu particule și germeni) spre faringe'],
      ['<b>Secrețiile protectoare</b>', 'Lacrimile, saliva, mucusul conțin enzime (<b>lizozim, lactoferină, defensine</b>) care distrug sau inhibă microorganismele'],
      ['<b>pH-ul acid</b>', 'Stomacul și pielea creează un mediu ostil pentru multe microorganisme'],
      ['<b>Flora microbiană normală (microbiomul)</b>', 'Pe piele, în cavitatea bucală, în tractul gastrointestinal și pe alte mucoase; ex. flora vaginală (lactobacili) menține un pH scăzut care inhibă creșterea fungilor precum <i>Candida albicans</i>']
    ]],
    ['box', 'ctx', 'Cum acționează microbiomul', 'Flora normală ocupă locurile de aderență, consumă nutrienții și produce substanțe care inhibă germenii patogeni (rezistență la colonizare). Antibioticele cu spectru larg o pot distruge și favorizează suprainfecțiile, de exemplu candidoza.']
  ],
  plan: ['Definiție: prima linie de apărare, nespecifică; previn aderența și invazia.', 'Pielea intactă și mucoasele: barieră fizică continuă.', 'Clearance-ul mucociliar (epiteliul respirator ciliat).', 'Secrețiile (lacrimi, salivă, mucus) cu lizozim, lactoferină, defensine.', 'pH-ul acid (stomac, piele).', 'Flora normală (microbiomul); exemplul lactobacililor vaginali vs Candida.'],
  cloze: [
    'Barierele naturale reprezintă [[prima linie|prima linie de aparare]] de apărare împotriva infecțiilor.',
    'Barierele naturale previn [[aderența|aderenta]] și invazia germenilor în mod [[nespecific]].',
    'Pielea intactă și mucoasele formează o barieră [[fizică|fizica]] continuă.',
    'Celulele epiteliale ale tractului respirator au [[cili]] care realizează clearance-ul [[mucociliar]].',
    'Lacrimile, saliva și mucusul conțin enzime: [[lizozim]], lactoferină și [[defensine]].',
    'pH-ul [[acid]] din stomac și de pe piele creează un mediu ostil microorganismelor.',
    'Flora vaginală normală, dominată de [[lactobacili]], menține un pH scăzut care inhibă creșterea [[Candida|candida albicans]].'
  ],
  rub: [
    ['Definiție', [
      ['Prima linie de apărare', ['prima linie'], 1],
      ['Previne nespecific aderența și invazia', ['nespecific', 'aderent', 'invazi'], 1]
    ]],
    ['Bariere', [
      ['Pielea intactă și mucoasele: barieră fizică continuă', ['piel', 'tegument', 'mucoas'], 2],
      ['Clearance-ul mucociliar (cili respiratori)', ['mucociliar', 'cili'], 2],
      ['Secrețiile: lacrimi, salivă, mucus', ['lacrim', 'saliv', 'mucus', 'secreti'], 1],
      ['Enzime: lizozim, lactoferină, defensine', ['lizozim', 'lactoferin', 'defensin'], 2],
      ['pH-ul acid din stomac și de pe piele', ['=ph', 'acid'], 2],
      ['Flora microbiană normală (microbiomul)', ['flor', 'microbiom'], 2],
      ['Exemplu: lactobacilii vaginali inhibă Candida', ['lactobac', 'candida']]
    ]]
  ],
  chains: []
};

Q[27] = {
  ch: 'infect', s: 'Răspunsul inflamator acut în infecție', src: 'Sindromul inflamator în context infecțios, slide 15',
  sum: 'Inflamația este un proces fiziologic de apărare prin care organismul recrutează celule inflamatorii la locul infecției ca să limiteze și să elimine agentul patogen. Semne celsiene: rubor, tumor, calor, dolor, functio laesa. Mecanisme: vasodilatație și ↑ permeabilitate (histamină din mastocite) → extravazarea plasmei și recrutarea leucocitelor; neutrofilele și monocitele (macrofagele) sunt chemotactate, fagocitează și eliberează enzime și ROS. Inflamația locală limitează răspândirea și crește drenajul limfatic spre ganglioni, unde stimulează răspunsul imun specific.',
  learn: [
    ['def', 'Răspunsul inflamator acut', 'Proces fiziologic de apărare prin care organismul <b>recrutează celule inflamatorii la locul infecției</b> pentru a limita și elimina agentul patogen.'],
    ['p', 'Semnele clasice ale inflamației locale (semnele celsiene): <b>rubor, tumor, calor, dolor</b> și <b>pierderea funcției</b> (roșeață, umflare, căldură, durere, impotență funcțională).'],
    ['flow', 'infInflam'],
    ['tbl', 'De la mecanism la semn', ['Semn', 'Mecanism'], [
      ['Rubor, calor', 'Vasodilatație, flux sanguin crescut'],
      ['Tumor', '↑ permeabilitate, extravazarea plasmei (exudat)'],
      ['Dolor', 'Mediatorii stimulează nociceptorii; presiunea edemului'],
      ['Functio laesa', 'Durerea, edemul și leziunea tisulară']
    ]],
    ['box', 'tip', 'Final de răspuns', 'Inflamația locală <b>limitează răspândirea</b> și <b>duce antigenele la limfonodulii regionali</b> (prin lichidul interstițial), făcând legătura cu imunitatea specifică.']
  ],
  plan: ['Definiție: proces fiziologic de apărare; recrutarea celulelor inflamatorii pentru a limita și elimina patogenul.', 'Semnele celsiene: rubor, tumor, calor, dolor, functio laesa.', 'Vasodilatație și ↑ permeabilitate (histamina din mastocite) → extravazarea plasmei, recrutarea leucocitelor.', 'Neutrofilele și monocitele/macrofagele, chemotactate de chemokine: fagocitoză, enzime, ROS.', 'Limitarea răspândirii; ↑ drenajul limfatic spre limfonoduli → stimularea răspunsului imun specific.'],
  cloze: [
    'Inflamația este un proces fiziologic de apărare prin care organismul [[recrutează|recruteaza]] celule inflamatorii la locul infecției.',
    'Semnele celsiene sunt: rubor, tumor, [[calor]], [[dolor]] și pierderea funcției.',
    'Vasodilatația și creșterea [[permeabilității|permeabilitatii]] vaselor sunt produse de [[histamina]] eliberată de mastocite.',
    'Aceste modificări permit [[extravazarea]] plasmei și recrutarea leucocitelor către focarul infecțios.',
    'Neutrofilele și monocitele sunt atrase la locul infecției de [[chemokine]].',
    'Fagocitele distrug agentul patogen și eliberează enzime și [[ROS|specii reactive de oxigen|radicali liberi]].',
    'Lichidul interstițial drenează către [[limfonodulii|limfonoduli|ganglionii]] regionali, unde stimulează răspunsul imun [[specific]].'
  ],
  rub: [
    ['Definiție', [
      ['Proces fiziologic de apărare', ['aparar', 'fiziologic'], 1],
      ['Recrutarea celulelor inflamatorii la locul infecției', ['recrut'], 2],
      ['Pentru a limita și elimina agentul patogen', ['limit', 'elimin']]
    ]],
    ['Semne', [
      ['Semnele celsiene: rubor, tumor, calor, dolor, functio laesa', ['celsian', 'rubor', 'calor', 'dolor', 'roset', 'caldur', 'durer'], 2]
    ]],
    ['Mecanism', [
      ['Vasodilatație', ['vasodilat'], 2],
      ['↑ permeabilitatea vaselor', ['permeabil', 'hiperpermeabil'], 2],
      ['Histamina din mastocite', ['histamin', 'mastocit'], 1],
      ['Extravazarea plasmei, recrutarea leucocitelor', ['extravaz', 'leucocit'], 1],
      ['Neutrofile și monocite/macrofage chemotactate de chemokine', ['neutrofil', 'monocit', 'macrofag', 'chemotact', 'chemokin'], 2],
      ['Fagocitoză, eliberare de enzime și ROS', ['fagocit', '=ros', 'radical', 'enzim'], 1],
      ['Limitează răspândirea microorganismelor', ['raspandir', 'limit+raspand']],
      ['Drenaj spre limfonodulii regionali → răspuns imun specific', ['limfonod', 'gangli', 'specific'], 1]
    ]]
  ],
  chains: ['infInflam']
};

Q[28] = {
  ch: 'infect', s: 'Imunitatea înnăscută', src: 'Sindromul inflamator în context infecțios, slide 16–18',
  sum: 'Imunitatea înnăscută se activează imediat și nu depinde de recunoașterea specifică a unui agent. Recunoaște PAMPs (LPS, ARN viral dublu catenar) prin PRR preformați (TLR, lectine de tip C) de pe macrofage, celule dendritice, neutrofile, NK și celule epiteliale → citokine (IL, TNF-α) și chemokine. Componente: fagocitele profesioniste (neutrofile, macrofage; macrofagele prezintă antigenul LT), limfocitele NK (apoptoza celulelor infectate viral sau tumorale, lipsite de MHC normal), complementul (opsonizare, chemotaxie, liză prin MAC) și mediatorii solubili (defensine, catelicidine; proteine de fază acută: PCR, fibrinogen, C3; interferonii de tip I).',
  learn: [
    ['def', 'Imunitatea înnăscută (nespecifică)', 'Ansamblul mecanismelor de apărare care <b>nu depind de recunoașterea specifică</b> a unui anumit agent. Se activează <b>imediat</b> în caz de infecție.'],
    ['flow', 'innate'],
    ['tbl', 'Componentele imunității înnăscute', ['Componentă', 'Rol'], [
      ['<b>Fagocitele profesioniste</b>: neutrofile, macrofage', 'Fagocitează și distrug agenții patogeni. Macrofagele procesează antigenele și le prezintă limfocitelor T (legătura cu imunitatea dobândită).'],
      ['<b>Limfocitele NK</b>', 'Recunosc și induc apoptoza celulelor infectate viral sau transformate tumoral, fără antigen specific. Le recunosc prin absența expresiei normale de MHC.'],
      ['<b>Sistemul complement</b>', 'Proteine serice care, activate, produc opsonizarea microorganismelor, chemotaxia leucocitelor și liza directă prin complexul de atac membranar (MAC).'],
      ['<b>Mediatorii solubili antimicrobieni</b>', 'Peptide antimicrobiene (defensine, catelicidine) care distrug membranele microbilor; proteine de fază acută (PCR, fibrinogen, C3) pentru opsonizare; interferonii de tip I (IFN-α/β) induc un status antiviral în celulele vecine.']
    ]],
    ['box', 'tip', 'Rolul în infecție, într-o frază', 'Imunitatea înnăscută <b>răspunde imediat</b>, <b>recunoaște tipare comune</b> (PAMPs prin PRR), <b>declanșează inflamația</b> prin citokine și <b>pregătește imunitatea dobândită</b> prin prezentarea antigenului.']
  ],
  plan: ['Definiție: apărare imediată, nespecifică.', 'Recunoașterea PAMPs (LPS, ARN dublu catenar) prin PRR preformați (TLR, lectine tip C) pe macrofage, dendritice, neutrofile, NK, epiteliu.', 'Semnalizare → citokine (IL, TNF-α) și chemokine → amplificarea inflamației, recrutare.', 'Fagocitele profesioniste (neutrofile, macrofage; prezentarea antigenului).', 'Limfocitele NK (lipsa MHC → apoptoză).', 'Complementul (opsonizare, chemotaxie, MAC).', 'Mediatorii solubili: defensine, catelicidine, proteine de fază acută, IFN de tip I.'],
  cloze: [
    'Sistemul imun înnăscut este activat [[imediat]] în caz de infecție și nu depinde de recunoașterea [[specifică|specifica]] a agentului.',
    'Imunitatea înnăscută recunoaște modele moleculare conservate ale patogenilor, numite [[PAMPs|pamp]].',
    'Recunoașterea se face prin receptori germinali preformați (PRR), precum receptorii [[toll-like|toll like|tlr]].',
    'Fagocitele profesioniste sunt [[neutrofilele|neutrofile]] și macrofagele.',
    'Macrofagele procesează antigenele și le prezintă limfocitelor [[T]].',
    'Limfocitele NK recunosc celulele anormale prin absența expresiei normale de [[MHC|complex major de histocompatibilitate]].',
    'Complementul produce opsonizare, chemotaxie și liză directă prin complexul de atac [[membranar]].',
    'Peptidele antimicrobiene sunt [[defensinele|defensine]] și catelicidinele.',
    'Interferonii de tip [[I|1]] (IFN-α/β) induc un status antiviral în celulele din jur.'
  ],
  rub: [
    ['Rol', [
      ['Se activează imediat', ['imediat'], 1],
      ['Nu depinde de recunoașterea specifică a agentului', ['nespecific', 'nu depind'], 1],
      ['Recunoaște PAMPs (LPS, ARN viral dublu catenar)', ['pamp', 'model+molecular'], 2],
      ['prin PRR: receptori toll-like (TLR), lectine de tip C', ['=prr', 'toll', '=tlr', 'lectin'], 2],
      ['Pe macrofage, celule dendritice, neutrofile, NK, celule epiteliale', ['dendritic', 'epiteli']],
      ['Secreția de citokine (IL, TNF-α) și chemokine → amplificarea inflamației', ['citokin', 'chemokin'], 1]
    ]],
    ['Componente', [
      ['Fagocitele profesioniste: neutrofile, macrofage', ['fagocit', 'neutrofil', 'macrofag'], 2],
      ['Macrofagele prezintă antigenul limfocitelor T', ['prezint+antigen', 'prezentar+antigen', 'prezent'], 1],
      ['Limfocitele NK: apoptoza celulelor infectate viral sau tumorale', ['=nk', 'natural killer'], 2],
      ['NK recunosc absența MHC', ['=mhc', 'histocompat'], 1],
      ['Complementul: opsonizare, chemotaxie, liză (MAC)', ['complement'], 2],
      ['Defensine, catelicidine', ['defensin', 'catelicid'], 1],
      ['Proteine de fază acută (PCR, fibrinogen, C3)', ['faza acut', '=pcr', 'proteina c reactiva', 'fibrinogen'], 1],
      ['Interferonii de tip I (IFN-α/β): status antiviral', ['interferon', '=ifn', 'antiviral'], 1]
    ]]
  ],
  chains: ['innate']
};

Q[29] = {
  ch: 'infect', s: 'Imunitatea dobândită', src: 'Sindromul inflamator în context infecțios, slide 19–20',
  sum: 'Imunitatea dobândită este răspunsul specializat al limfocitelor, care recunosc specific antigenele patogenului; are latență mai lungă (zile), specificitate înaltă și memorie imunologică (la reexpunere răspunsul e mai rapid și mai eficient). Componente: limfocitele B (plasmocite, anticorpi: neutralizare și opsonizare, principala armă contra infecțiilor extracelulare) și limfocitele T: helper CD4+ (coordonează prin citokine), citotoxice CD8+ (distrug celulele infectate care prezintă peptide pe MHC I), reglatoare (previn leziunile autoimune). LT sunt esențiale în infecțiile intracelulare (virusuri, M. tuberculosis, Listeria).',
  learn: [
    ['def', 'Imunitatea dobândită (specifică)', 'Răspunsul imun specializat al <b>limfocitelor</b>, care recunoaște <b>specific</b> antigenele patogenului.'],
    ['cols', [
      ['Caracteristici', ['<b>latență mai lungă</b> (zile) până devine efectivă', '<b>specificitate înaltă</b> pentru agentul patogen', '<b>memorie imunologică</b>: la o expunere ulterioară, răspunsul se declanșează mult mai rapid și eficient']],
      ['Componente', ['<b>limfocitele B</b> → plasmocite → anticorpi', '<b>LT helper (CD4+)</b>', '<b>LT citotoxice (CD8+)</b>', '<b>LT reglatoare</b>']]
    ]],
    ['flow', 'adaptive'],
    ['tbl', 'Cine face ce', ['Celula', 'Mecanism', 'Ținta principală'], [
      ['Limfocitele B / plasmocite', 'Anticorpi: <b>neutralizare</b> (blochează interacțiunea patogenului cu celulele gazdei) și <b>opsonizare</b> („marchează” germenii pentru fagocitoză)', 'Infecțiile <b>extracelulare</b>'],
      ['LT helper (CD4+)', 'Secretă citokine care „orchestrează” activitatea altor celule (activarea macrofagelor, a LB)', 'Coordonare'],
      ['LT citotoxice (CD8+)', 'Recunosc celulele care prezintă peptide virale sau bacteriene pe <b>MHC I</b> și le distrug direct, prin mecanisme citolitice similare NK', 'Infecțiile <b>intracelulare</b>: virusuri, M. tuberculosis, Listeria'],
      ['LT reglatoare', 'Modulează intensitatea reacțiilor imune', 'Previn leziunile autoimune']
    ]],
    ['box', 'tip', 'De reținut', 'Anticorpii pentru germenii <b>din afara celulelor</b>; limfocitele T pentru <b>rezervoarele ascunse în celule</b>.']
  ],
  plan: ['Definiție: răspunsul specializat al limfocitelor, recunoaștere specifică.', 'Caracteristici: latență (zile), specificitate înaltă, memorie imunologică.', 'Limfocitele B → plasmocite → anticorpi: neutralizare, opsonizare; infecții extracelulare.', 'LT helper CD4+: citokine, coordonare (macrofage, LB).', 'LT citotoxice CD8+: distrug celulele infectate (MHC I).', 'LT reglatoare: previn leziunile autoimune.', 'LT esențiale în infecțiile intracelulare (virusuri, M. tuberculosis, Listeria).'],
  cloze: [
    'Imunitatea dobândită are o latență mai lungă, de [[zile]], până devine efectivă.',
    'Imunitatea dobândită are specificitate înaltă și dezvoltă [[memoria imunologică|memorie imunologica|memorie]].',
    'Limfocitele B se diferențiază în [[plasmocite]], care produc anticorpi specifici.',
    'Anticorpii realizează [[neutralizarea|neutralizare]] și [[opsonizarea|opsonizare]] agenților patogeni.',
    'Anticorpii reprezintă principala armă împotriva infecțiilor [[extracelulare]].',
    'Limfocitele T helper sunt [[CD4|cd 4]]+ și coordonează răspunsul imun prin secreția de [[citokine]].',
    'Limfocitele T citotoxice (CD8+) recunosc celulele infectate care prezintă peptide pe [[MHC I|mhc 1|mhc clasa i]].',
    'Limfocitele T [[reglatoare]] modulează intensitatea reacțiilor imune, prevenind leziunile autoimune.',
    'Limfocitele T sunt esențiale în controlul infecțiilor [[intracelulare]].'
  ],
  rub: [
    ['Rol și caracteristici', [
      ['Răspunsul specializat al limfocitelor, recunoaștere specifică', ['specific', 'limfocit'], 2],
      ['Latență mai lungă (zile)', ['latent', 'zile'], 1],
      ['Specificitate înaltă', ['specificit'], 1],
      ['Memorie imunologică (reexpunere: răspuns mai rapid, mai eficient)', ['memori'], 2]
    ]],
    ['Limfocitele B', [
      ['LB → plasmocite → anticorpi (imunoglobuline)', ['plasmocit', 'anticorp', 'imunoglobulin'], 2],
      ['Neutralizare', ['neutraliz'], 1],
      ['Opsonizare', ['opsoniz'], 1],
      ['Principala armă contra infecțiilor extracelulare', ['extracelul'], 1]
    ]],
    ['Limfocitele T', [
      ['LT helper (CD4+): citokine, coordonare', ['helper', 'cd 4'], 2],
      ['LT citotoxice (CD8+): distrug celulele infectate', ['citotox', 'cd 8'], 2],
      ['Recunoaștere pe MHC I', ['=mhc'], 1],
      ['LT reglatoare: previn leziunile autoimune', ['reglator', 'autoimun'], 1],
      ['Esențiale în infecțiile intracelulare (virusuri, M. tuberculosis, Listeria)', ['intracelul', 'tubercul', 'listeri'], 1]
    ]]
  ],
  chains: []
};

Q[30] = {
  ch: 'infect', s: 'Etapele în infecțiile bacteriene (enumerare)', src: 'Sindromul inflamator în context infecțios, slide 21',
  sum: '1. Aderența bacteriană la celulele gazdei. 2. Invazia (traversarea barierelor) și diseminarea în țesuturi. 3. Toxinele bacteriene și efectele lor. 4. Mecanismele de evaziune a răspunsului imun. 5. Inflamația sistemică și complicațiile infecției bacteriene.',
  learn: [
    ['p', 'Infecțiile bacteriene implică o succesiune de etape în care bacteriile trebuie să adere la gazdă, să invadeze țesuturile, să se multiplice și, adesea, să elibereze toxine sau alți factori de virulență care produc leziuni. În același timp încearcă să evite eliminarea de către sistemul imun.'],
    ['flow', 'bactSteps'],
    ['box', 'tip', 'Întrebare de enumerare', 'Cerința spune „fără a descrie”: scrie doar cele <b>5 etape, în ordine</b>. Mnemotehnic: <b>A-I-T-E-I</b> (Aderență, Invazie, Toxine, Evaziune, Inflamație sistemică).'],
    ['box', 'note', 'Unde găsești descrierile', 'Etapele 1–2: Î31. Etapa 3: Î32. Etapa 4: Î33. Etapa 5: Î34.']
  ],
  plan: ['Aderența bacteriană la celulele gazdei.', 'Invazia (traversarea barierelor) și diseminarea în țesuturi.', 'Toxinele bacteriene și efectele lor.', 'Mecanismele de evaziune a răspunsului imun.', 'Inflamația sistemică și complicațiile infecției bacteriene.'],
  cloze: [
    'Prima etapă în infecțiile bacteriene este [[aderența|aderenta]] bacteriană la celulele gazdei.',
    'A doua etapă este [[invazia]] (traversarea barierelor) și [[diseminarea]] în țesuturi.',
    'A treia etapă privește [[toxinele|toxinele bacteriene]] bacteriene și efectele lor.',
    'A patra etapă cuprinde mecanismele de [[evaziune]] a răspunsului imun.',
    'A cincea etapă este inflamația [[sistemică|sistemica]] și complicațiile infecției bacteriene.'
  ],
  rub: [
    ['Etape', [
      ['1. Aderența la celulele gazdei', ['aderent'], 2],
      ['2. Invazia (traversarea barierelor)', ['invazi', 'traversar'], 2],
      ['   și diseminarea în țesuturi', ['disemin'], 1],
      ['3. Toxinele bacteriene și efectele lor', ['toxin'], 2],
      ['4. Evaziunea răspunsului imun', ['evaziun', 'evitar'], 2],
      ['5. Inflamația sistemică', ['sistemic'], 2],
      ['   și complicațiile infecției bacteriene', ['complicat'], 1]
    ]]
  ],
  chains: ['bactSteps']
};

Q[31] = {
  ch: 'infect', s: 'Aderența, invazia și diseminarea bacteriană', src: 'Sindromul inflamator în context infecțios, slide 22–23',
  sum: 'Aderența este primul pas al patogenezei: la poarta de intrare (mucoasa nazofaringiană pentru S. pneumoniae, intestinală pentru Salmonella), adezinele bacteriene recunosc receptori de pe celulele gazdei; specificitatea adezină–receptor explică tropismul. Invazia poate fi activă (invazine care facilitează pătrunderea în celule sau printre ele) sau pasivă (prin leziuni preexistente). Capacitatea de invazie e un determinant major al patogenității: unele bacterii rămân la poarta de intrare, altele diseminează pe cale limfatică sau sangvină, producând infecții sistemice.',
  learn: [
    ['flow', 'adhInv'],
    ['h', 'Aderența'],
    ['ul', null, ['<b>Poarta de intrare</b>: ex. mucoasa nazofaringiană pentru <i>Streptococcus pneumoniae</i>, mucoasa intestinală pentru <i>Salmonella</i>', 'Aderența este <b>primul pas</b> în patogeneza bacteriană, mediată de <b>adezine</b> (proteine / structuri de suprafață) care recunosc receptori de pe celulele gazdei', 'Specificitatea <b>adezină–receptor</b> explică <b>tropismul</b>: unii microbi infectează preferențial anumite organe, unde găsesc receptorii adecvați']],
    ['h', 'Invazia și diseminarea'],
    ['ul', null, ['<b>Activă</b>: bacteriile exprimă <b>invazine</b>, proteine care facilitează pătrunderea în celule sau trecerea prin spațiile intercelulare', '<b>Pasivă</b>: bacteriile profită de <b>leziuni preexistente</b> ale epiteliilor', 'Capacitatea de invazie e un <b>determinant major al patogenității</b>: unele bacterii rămân localizate la poarta de intrare, altele traversează bariera și <b>diseminează pe cale limfatică sau sangvină</b>, producând infecții sistemice']],
    ['box', 'ctx', 'Exemplu din LP 1', 'Corynebacterium diphtheriae rămâne localizat pe mucoasa faringiană (nu invadează profund); formele severe sunt produse de toxina absorbită în sânge, nu de invazia bacteriei.']
  ],
  plan: ['Poarta de intrare (exemple: S. pneumoniae nazofaringian, Salmonella intestinal).', 'Aderența = primul pas; adezine care recunosc receptori ai gazdei.', 'Specificitatea adezină–receptor → tropism.', 'Invazia activă (invazine) sau pasivă (leziuni preexistente).', 'Invazia, determinant major al patogenității: localizare la poartă vs diseminare limfatică / sangvină → infecții sistemice.'],
  cloze: [
    'Aderența este [[primul pas|prima etapa]] în patogeneza bacteriană.',
    'Aderența este mediată de factori specifici numiți [[adezine]], care recunosc [[receptori]] de pe celulele gazdei.',
    'Specificitatea adezină–receptor explică [[tropismul]] bacterian.',
    'Poarta de intrare pentru Streptococcus pneumoniae este mucoasa [[nazofaringiană|nazofaringiana]], iar pentru Salmonella mucoasa [[intestinală|intestinala]].',
    'În invazia activă bacteriile exprimă proteine numite [[invazine]].',
    'În invazia pasivă bacteriile profită de [[leziuni preexistente|leziunile preexistente]] ale epiteliilor.',
    'Bacteriile care traversează bariera locală diseminează pe cale [[limfatică|limfatica]] sau [[sangvină|sanguina|sangvina]].'
  ],
  rub: [
    ['Aderența', [
      ['Poarta de intrare (ex. S. pneumoniae, Salmonella)', ['poart', 'pneumonia', 'salmonel'], 1],
      ['Aderența = primul pas al patogenezei', ['primul pas', 'prim+pas', 'prim+etap'], 1],
      ['Mediată de adezine', ['adezin'], 2],
      ['care recunosc receptori ai celulelor gazdei', ['receptor'], 1],
      ['Specificitatea adezină–receptor explică tropismul', ['tropism'], 2]
    ]],
    ['Invazia și diseminarea', [
      ['Invazie activă: invazine', ['invazin', 'activ'], 2],
      ['Invazie pasivă: leziuni preexistente ale epiteliilor', ['pasiv', 'preexist', 'leziun'], 2],
      ['Determinant major al patogenității', ['patogenit', 'determin'], 1],
      ['Unele rămân la poarta de intrare', ['localiz', 'raman+poart']],
      ['Diseminare pe cale limfatică sau sangvină → infecții sistemice', ['disemin', 'limfatic', 'sangvin', 'sanguin'], 2]
    ]]
  ],
  chains: ['adhInv']
};

Q[32] = {
  ch: 'infect', s: 'Toxinele bacteriene', src: 'Sindromul inflamator în context infecțios, slide 24–25; LP 1, slide 16',
  sum: 'Bacteriile își exercită virulența prin toxine care interferează cu funcțiile celulelor gazdei. Exotoxinele sunt secretate activ, acționează specific, sunt extrem de potente (toxina botulinică < 1 μg letal): toxina difterică (inactivează EF-2, blochează sinteza proteică, necroză), tetanică (blochează neurotransmițătorii inhibitori → contracții generalizate), botulinică (blochează acetilcolina la joncțiunea neuromusculară → paralizie flască), holerică (secreție intestinală masivă → diaree severă), stafilococice (de la șoc toxic la toxiinfecții alimentare). Endotoxina = LPS din membrana externă a Gram-negativilor, eliberată la liza bacteriei; activează macrofagele prin TLR4 → IL-1, TNF-α, IL-6; doze mici: febră; doze mari: sindrom inflamator generalizat.',
  learn: [
    ['p', 'Bacteriile patogene își exercită virulența prin eliberarea de <b>toxine</b>, care interferează direct cu funcțiile celulelor gazdei: produc leziuni directe și perturbă homeostazia. Există două categorii majore: <b>exotoxinele</b> și <b>endotoxina</b>.'],
    ['tbl', 'Exotoxine vs endotoxină', ['', 'Exotoxine', 'Endotoxină'], [
      ['<b>Ce sunt</b>', 'Proteine secretate activ', 'LPS din membrana externă a bacteriilor Gram-negative'],
      ['<b>Eliberare</b>', 'Secretate activ', 'Nu e secretată; se eliberează la <b>liza</b> bacteriei'],
      ['<b>Acțiune</b>', 'Specifică, pe ținte precise → tablouri clinice caracteristice', 'Stimulează puternic imunitatea înnăscută: macrofage și celule dendritice prin <b>TLR4</b> → IL-1, TNF-α, IL-6'],
      ['<b>Potență</b>', 'Extrem de mare (toxina botulinică: sub 1 μg letal la adult)', 'Doze mici: febră, stimularea imunității; doze mari: sindrom inflamator generalizat']
    ]],
    ['tbl', 'Exemple de exotoxine (slide 24)', ['Toxina', 'Producător', 'Mecanism și efect'], [
      ['Difterică', '<i>Corynebacterium diphtheriae</i>', 'Inactivează EF-2 → inhibă sinteza proteică → necroză celulară'],
      ['Tetanică', '<i>Clostridium tetani</i>', 'Blochează eliberarea neurotransmițătorilor <b>inhibitori</b> → contracții musculare generalizate (tetanos)'],
      ['Botulinică', '<i>Clostridium botulinum</i>', 'Blochează eliberarea <b>acetilcolinei</b> la joncțiunea neuromusculară → paralizie flască'],
      ['Holerică (enterotoxina)', '<i>Vibrio cholerae</i>', 'Secreție masivă de apă și electroliți în intestin → diaree severă'],
      ['Stafilococice (ex. exfoliatine)', '<i>Staphylococcus aureus</i>', 'De la sindromul șocului toxic la intoxicații alimentare']
    ]],
    ['flow', 'diphtToxin'],
    ['flow', 'endotox'],
    ['box', 'note', 'Gram-pozitivii', 'Unele bacterii Gram-pozitive au în perete acizi teichoici și peptidoglican, cu efecte asemănătoare endotoxinei, dar LPS rămâne prototipul endotoxinei.'],
    ['box', 'tip', 'Perechea care se confundă', 'Tetanică → <b>blochează inhibiția</b> → spasme (paralizie spastică). Botulinică → <b>blochează acetilcolina</b> → paralizie <b>flască</b>.']
  ],
  plan: ['Rolul toxinelor: interferează cu funcțiile celulelor gazdei, leziuni directe, perturbarea homeostaziei; două categorii.', 'Exotoxine: secretate activ, acțiune specifică, potență extremă (botulinica < 1 μg).', 'Exemple: difterică (EF-2), tetanică (inhibitori), botulinică (acetilcolină), holerică (diaree), stafilococice.', 'Endotoxina: LPS din Gram-negativi, eliberată la liză; TLR4 → IL-1, TNF-α, IL-6.', 'Doze mici: febră, stimularea imunității; doze mari: sindrom inflamator generalizat.', 'Gram-pozitivi: acizi teichoici, peptidoglican (endotoxin-like).'],
  cloze: [
    'Cele două categorii majore de toxine bacteriene sunt [[exotoxinele|exotoxine]] și [[endotoxina|endotoxine]].',
    'Exotoxinele sunt [[secretate activ|secretate]] și acționează specific asupra unor ținte din organism.',
    'Toxina difterică inhibă sinteza proteică prin inactivarea factorului de elongare [[EF-2|ef 2|2]].',
    'Toxina tetanică blochează eliberarea neurotransmițătorilor [[inhibitori]], producând contracții musculare generalizate.',
    'Toxina botulinică blochează eliberarea [[acetilcolinei|acetilcolina]] la joncțiunea neuromusculară, cauzând paralizie [[flască|flasca]].',
    'Enterotoxina holerică determină secreție masivă de apă și electroliți în intestin, cu [[diaree]] severă.',
    'Doza letală de toxină botulinică este sub 1 [[μg|microgram|ug|mcg]] pentru un adult.',
    'Endotoxina este [[lipopolizaharidul|lps|lipopolizaharid]] din membrana externă a bacteriilor Gram-[[negative|negativ]].',
    'Endotoxina nu este secretată activ, ci este eliberată la [[liza]] bacteriilor.',
    'Endotoxina activează macrofagele și celulele dendritice prin receptorii [[TLR4|tlr 4|toll like 4]].',
    'În doze mici LPS induce [[febră|febra]], iar în doze mari provoacă un sindrom inflamator [[generalizat|sistemic]].'
  ],
  rub: [
    ['General', [
      ['Toxinele interferează cu funcțiile celulelor gazdei (leziuni, homeostazie)', ['interfer', 'homeostaz', 'virulent']],
      ['Două categorii: exotoxine și endotoxina', ['exotoxin', 'endotoxin'], 2]
    ]],
    ['Exotoxine', [
      ['Secretate activ, acțiune specifică', ['secret+activ', 'secretat', 'specific'], 2],
      ['Extrem de potente (botulinica < 1 μg)', ['potent', '=1+=ug', 'microgram', 'doz+letal'], 1],
      ['Difterică: inactivează EF-2 → blochează sinteza proteică → necroză', ['difteric', '=ef', 'sintez+protei'], 2],
      ['Tetanică: blochează neurotransmițătorii inhibitori → contracții generalizate', ['tetan'], 1],
      ['Botulinică: blochează acetilcolina → paralizie flască', ['botulin', 'acetilcolin', 'flasc'], 1],
      ['Holerică: secreție de apă și electroliți → diaree severă', ['holer', 'cholera', 'diaree'], 1],
      ['Stafilococice: șoc toxic, intoxicații alimentare', ['stafiloc', 'soc toxic', 'exfoliat'], 1]
    ]],
    ['Endotoxina', [
      ['LPS din membrana externă a Gram-negativilor', ['lipopoliz', '=lps', '=lpz', 'gram negativ'], 2],
      ['Nu e secretată; eliberată la liza bacteriei', ['liz'], 1],
      ['Activează macrofagele / celulele dendritice prin TLR4', ['tlr', 'toll', 'macrofag'], 1],
      ['Eliberare masivă de IL-1, TNF-α, IL-6', ['=il 1', '=tnf', '=il 6', 'citokin'], 1],
      ['Doze mici: febră; doze mari: sindrom inflamator generalizat', ['doz', 'generaliz', 'febr'], 2],
      ['Gram-pozitivi: acizi teichoici, peptidoglican (endotoxin-like)', ['teichoic', 'teicoic', 'peptidoglic']]
    ]]
  ],
  chains: ['diphtToxin', 'endotox']
};

Q[33] = {
  ch: 'infect', s: 'Evaziunea răspunsului imun', src: 'Sindromul inflamator în context infecțios, slide 26–27',
  sum: '„Succesul” unei infecții depinde de capacitatea bacteriilor de a evita distrugerea. Mecanisme: capsula bacteriană (maschează structurile de suprafață, împiedică recunoașterea și opsonizarea); secreția de proteaze și toxine anti-imune (proteaza IgA a N. gonorrhoeae și H. influenzae, proteina A a S. aureus care leagă porțiunea Fc a imunoglobulinelor, toxina pertussis care afectează macrofagele și limfocitele); variabilitatea antigenică; supraviețuirea intracelulară (evită anticorpii și complementul); interferența cu prezentarea antigenelor către LT.',
  learn: [
    ['p', '„Succesul” unei infecții depinde de abilitatea bacteriilor de a <b>evita distrugerea</b> de către mecanismele de apărare.'],
    ['tbl', 'Mecanismele de evaziune imunitară', ['Mecanism', 'Cum funcționează', 'Exemplu'], [
      ['<b>Capsula bacteriană</b>', 'Maschează structurile de suprafață; împiedică recunoașterea și opsonizarea', '—'],
      ['<b>Proteaze și toxine anti-imune</b>', 'Degradează sau inactivează efectorii imuni', '<b>Proteaza IgA</b> (<i>N. gonorrhoeae</i>, <i>H. influenzae</i>) degradează IgA de pe mucoase; <b>proteina A</b> (<i>S. aureus</i>) leagă porțiunea <b>Fc</b> a imunoglobulinelor și le inactivează; <b>toxina pertussis</b> (<i>Bordetella pertussis</i>) afectează macrofagele și limfocitele'],
      ['<b>Variabilitatea antigenică</b>', 'Modificarea repetată a antigenelor de suprafață: anticorpii formați anterior nu le mai recunosc', '—'],
      ['<b>Supraviețuirea intracelulară</b>', 'În interiorul celulelor bacteriile evită anticorpii și complementul', 'ex. <i>M. tuberculosis</i>, <i>Listeria</i> (Î29)'],
      ['<b>Interferența cu prezentarea antigenelor</b>', 'Perturbă procesarea și prezentarea antigenelor către LT, șuntând răspunsul imun; mai bine cunoscută la virusuri', '—']
    ]],
    ['box', 'tip', 'Mnemotehnic: 5 trucuri', '<b>Ascunde-te</b> (capsula), <b>atacă</b> (proteaze, toxine), <b>schimbă-ți fața</b> (variabilitate antigenică), <b>intră în casă</b> (intracelular), <b>taie firul de comunicare</b> (prezentarea antigenului).']
  ],
  plan: ['Principiul: succesul infecției depinde de evitarea distrugerii.', 'Capsula: maschează suprafața, împiedică recunoașterea și opsonizarea.', 'Proteaze și toxine anti-imune: proteaza IgA (N. gonorrhoeae, H. influenzae), proteina A (S. aureus, Fc), toxina pertussis.', 'Variabilitatea antigenică.', 'Supraviețuirea intracelulară (evită anticorpii și complementul).', 'Interferența cu prezentarea antigenelor către LT.'],
  cloze: [
    'Capsula bacteriană maschează structurile de suprafață și împiedică recunoașterea și [[opsonizarea|opsonizare]].',
    'Proteaza [[IgA|ig a]] produsă de N. gonorrhoeae sau H. influenzae degradează imunoglobulinele de pe mucoase.',
    'Staphylococcus aureus secretă proteina [[A]], care leagă porțiunea [[Fc|f c]] a imunoglobulinelor.',
    'Bordetella pertussis secretă toxina [[pertussis]], care afectează macrofagele și limfocitele.',
    'Variabilitatea [[antigenică|antigenica]] înseamnă modificarea repetată a antigenelor de suprafață.',
    'Bacteriile care trăiesc [[intracelular]] evită expunerea la anticorpi și [[complement]].',
    'Unele bacterii interferă cu procesarea și [[prezentarea]] antigenelor către limfocitele T.'
  ],
  rub: [
    ['Mecanisme', [
      ['Capsula bacteriană', ['capsul'], 2],
      ['maschează suprafața, împiedică recunoașterea și opsonizarea', ['masch', 'opsoniz', 'recunoast']],
      ['Proteaze și toxine anti-imune', ['proteaz', 'anti imun', 'antiimun'], 1],
      ['Proteaza IgA (N. gonorrhoeae, H. influenzae)', ['=iga', 'ig a', 'gonorrh', 'influenz'], 1],
      ['Proteina A a S. aureus leagă Fc-ul imunoglobulinelor', ['proteina a', '=fc', 'aureus'], 1],
      ['Toxina pertussis (macrofage, limfocite)', ['pertussis', 'bordetel'], 1],
      ['Variabilitatea antigenică', ['variabil', 'variati+antigen', 'modific+antigen'], 2],
      ['Supraviețuirea intracelulară (evită anticorpii, complementul)', ['intracelul'], 2],
      ['Interferența cu prezentarea antigenelor către LT', ['prezentar', 'procesar'], 2]
    ]]
  ],
  chains: []
};

Q[34] = {
  ch: 'infect', s: 'Inflamația sistemică și complicațiile', src: 'Sindromul inflamator în context infecțios, slide 28',
  sum: 'Bacteriemia (bacterii viabile în sânge) expune tot organismul la componentele microbiene, care activează masiv sistemul imun. Sepsisul este un răspuns inflamator sistemic exagerat și inadecvat la un agent infecțios, care devine el însuși cauza leziunilor și insuficiențelor de organ: „taifunul” de citokine (IL-1, TNF, IL-6, IFN) produce vasodilatație sistemică, ↑ permeabilitate capilară, hipotensiune, edeme, CID (prin activarea endoteliului și a coagulării) și disfuncție multiplă de organe (șoc septic). Sepsisul și șocul septic sunt cele mai grave complicații și urgențe medicale majore.',
  learn: [
    ['def', 'Bacteriemia', 'Prezența <b>bacteriilor viabile în sânge</b>: întregul organism este expus la componentele microbiene, care activează masiv sistemul imun.'],
    ['def', 'Sepsisul', 'Un <b>răspuns inflamator sistemic exagerat și inadecvat</b> la prezența unui agent infecțios, răspuns care devine <b>el însuși cauza leziunilor</b> și a insuficiențelor de organ.'],
    ['flow', 'sepsis'],
    ['box', 'tip', 'Ideea-cheie', 'În sepsis nu bacteria, ci <b>răspunsul gazdei</b> (furtuna de citokine) produce leziunile: vasodilatație, permeabilitate, CID, insuficiență multiplă de organ.'],
    ['box', 'ctx', 'Legătura cu endotoxina', 'La Gram-negativi, LPS eliberat în cantitate mare activează prin TLR4 macrofagele; în doze mari produce exact acest sindrom inflamator generalizat (Î32).']
  ],
  plan: ['Bacteriemia: bacterii viabile în sânge, activarea masivă a sistemului imun.', 'Sepsisul: răspuns inflamator sistemic exagerat și inadecvat, care devine cauza leziunilor.', 'Taifunul de citokine: IL-1, TNF, IL-6, IFN.', 'Efecte: vasodilatație sistemică, ↑ permeabilitate capilară, hipotensiune, edeme, CID.', 'Disfuncție multiplă de organe: șoc septic.', 'Sepsisul și șocul septic: cele mai grave complicații, urgențe medicale majore.'],
  cloze: [
    'Bacteriemia reprezintă prezența bacteriilor [[viabile]] în sânge.',
    'Sepsisul este un răspuns inflamator [[sistemic]] exagerat și [[inadecvat]] la prezența unui agent infecțios.',
    'În sepsis, răspunsul gazdei devine el însuși cauza [[leziunilor|leziuni]] și insuficiențelor de organ.',
    'În sepsis se eliberează un „taifun” de [[citokine]] proinflamatorii: IL-1, TNF și IL-6.',
    'Citokinele determină [[vasodilatație|vasodilatatie]] sistemică și creșterea permeabilității capilare, cu [[hipotensiune]] și edeme.',
    'Activarea celulelor endoteliale și a cascadei coagulării produce coagulare intravasculară [[diseminată|diseminata]].',
    'Disfuncția multiplă de organe definește [[șocul septic|socul septic|soc septic]].'
  ],
  rub: [
    ['Bacteriemia', [
      ['Bacterii viabile în sânge', ['bacteriemi', 'viabil'], 2],
      ['Activarea masivă a sistemului imun', ['activ+masiv', 'activ+imun']]
    ]],
    ['Sepsisul', [
      ['Răspuns inflamator sistemic exagerat și inadecvat', ['exagerat', 'inadecvat', 'sepsis'], 2],
      ['Răspunsul devine cauza leziunilor și insuficiențelor de organ', ['cauz+lezi', 'insuficient']],
      ['„Taifun” de citokine: IL-1, TNF, IL-6', ['taifun', 'furtun', 'citokin'], 2],
      ['Vasodilatație sistemică', ['vasodilat'], 1],
      ['↑ permeabilitatea capilară, edeme', ['permeabil', 'hiperpermeabil', 'edem'], 1],
      ['Hipotensiune', ['hipotensiun'], 1],
      ['CID (activarea endoteliului și a coagulării)', ['=cid', 'coagular', 'intravascular'], 2],
      ['Disfuncție multiplă de organe: șoc septic', ['soc+septic', 'multipl+organ', 'disfunct'], 2],
      ['Cele mai grave complicații, urgențe medicale majore', ['urgent', 'grav']]
    ]]
  ],
  chains: ['sepsis']
};

Q[35] = {
  ch: 'infect', s: 'Infecțiile bacteriene: semne și paraclinic', src: 'Sindromul inflamator în context infecțios, slide 29–30',
  sum: 'Generale: febră înaltă (adesea > 38°C), mialgii și artralgii, stare generală alterată (oboseală marcată, confuzie în cazuri severe). Specifice, după poarta de intrare; ex. SNC: sindrom de iritație meningeană (cefalee fronto-occipitală intensă, fotofobie, fonofobie, hiperexcitabilitate, vărsături în jet), semne meningeene (redoarea cefei, Kernig, Brudzinski), convulsii, poziție „în cocoș de pușcă”. Paraclinic: leucocitoză cu neutrofilie; reactanți de fază acută crescuți (PCR, fibrinogen, hepcidină, procalcitonină); identificarea agentului (sânge, urină, LCR); antibiogramă; imagistică.',
  learn: [
    ['fig', 'bvCompare'],
    ['cols', [
      ['Semne și simptome generale', ['<b>febră înaltă</b> (adesea peste 38°C)', 'mialgii și artralgii', 'stare generală alterată: oboseală marcată, confuzie în cazuri severe']],
      ['Exemplu specific: SNC (meningită)', ['<b>sindrom de iritație meningeană</b>: cefalee fronto-occipitală intensă, fotofobie, fonofobie, hiperexcitabilitatea simțurilor, vărsături în jet', '<b>semne de iritație meningeană</b>: redoarea cefei, semnul Kernig, semnul Brudzinski', 'convulsii', 'poziție „în cocoș de pușcă”']]
    ]],
    ['ul', 'Paraclinic (slide 30)', ['Hemoleucogramă: <b>leucocitoză cu neutrofilie</b>', 'Biochimie: <b>reactanți de fază acută crescuți</b>: proteina C reactivă (PCR), fibrinogen, hepcidină, procalcitonină', 'Identificarea agentului patogen în sânge, urină sau LCR', '<b>Antibiogramă</b> pentru schema de tratament', 'Investigații imagistice: radiografie, CT, RMN']],
    ['box', 'tip', 'Cuvintele pe care le caută examinatorul', '<b>Febră > 38°C</b>, <b>neutrofilie</b>, <b>reactanți de fază acută crescuți</b> (PCR, procalcitonină), <b>antibiogramă</b>.']
  ],
  plan: ['Generale: febră înaltă (> 38°C), mialgii, artralgii, stare generală alterată (oboseală, confuzie).', 'Specifice după poarta de intrare; exemplu SNC: cefalee, fotofobie, fonofobie, vărsături în jet; redoarea cefei, Kernig, Brudzinski; convulsii; cocoș de pușcă.', 'Hemoleucogramă: leucocitoză cu neutrofilie.', 'Reactanți de fază acută crescuți: PCR, fibrinogen, hepcidină, procalcitonină.', 'Identificarea agentului (sânge, urină, LCR), antibiogramă, imagistică.'],
  cloze: [
    'În infecțiile bacteriene febra este de obicei [[înaltă|inalta|mare]], adesea peste [[38]]°C.',
    'Simptomele generale includ mialgii, [[artralgii]] și stare generală alterată.',
    'Sindromul de iritație meningeană include cefalee fronto-occipitală intensă, fotofobie, fonofobie și vărsături în [[jet]].',
    'Semnele de iritație meningeană sunt redoarea [[cefei]], semnul Kernig și semnul [[Brudzinski]].',
    'Bolnavul cu meningită adoptă poziția în „cocoș de [[pușcă|pusca]]”.',
    'Hemoleucograma arată leucocitoză cu [[neutrofilie|neutrofilia]].',
    'Reactanții de fază acută crescuți sunt proteina C reactivă, fibrinogenul, hepcidina și [[procalcitonina]].',
    'Pentru schema de tratament se realizează [[antibiograma|antibiograma]].'
  ],
  rub: [
    ['Semne generale', [
      ['Febră înaltă (adesea > 38°C)', ['febr', '=38'], 2],
      ['Mialgii și artralgii', ['mialg', 'artralg'], 1],
      ['Stare generală alterată (oboseală, confuzie)', ['stare general', 'obosea', 'confuz'], 1]
    ]],
    ['Semne specifice (ex. SNC)', [
      ['Cefalee, fotofobie, fonofobie, vărsături în jet', ['cefale', 'fotofob', 'fonofob', 'varsatur'], 1],
      ['Redoarea cefei, Kernig, Brudzinski', ['redoar', 'kernig', 'brudzinsk', 'meninge'], 1],
      ['Convulsii, poziție în cocoș de pușcă', ['convulsi', 'cocos']]
    ]],
    ['Paraclinic', [
      ['Leucocitoză cu neutrofilie', ['neutrofil'], 2],
      ['Reactanți de fază acută crescuți', ['reactant', 'faza acut'], 2],
      ['PCR, fibrinogen, hepcidină, procalcitonină', ['=pcr', 'proteina c', 'fibrinogen', 'hepcidin', 'procalciton'], 1],
      ['Identificarea agentului în sânge, urină, LCR', ['identific', 'hemocultur', 'urocultur', '=lcr', 'cultur'], 1],
      ['Antibiogramă', ['antibiogram'], 1],
      ['Imagistică (radiografie, CT, RMN)', ['imagist', 'radiograf', '=ct', '=rmn']]
    ]]
  ],
  chains: []
};

Q[36] = {
  ch: 'infect', s: 'Etapele în infecțiile virale (enumerare)', src: 'Sindromul inflamator în context infecțios, slide 31',
  sum: '1. Atașarea și intrarea intracelulară (recunoașterea receptorilor celulari specifici). 2. Replicarea intracelulară. 3. Diseminarea virusului (la alte celule sau țesuturi). 4. Efectele citopatice. 5. Persistența în organism sau eliminarea (clearance-ul).',
  learn: [
    ['p', 'Virusurile sunt agenți infecțioși care <b>nu se pot reproduce independent</b>, ci obligatoriu în interiorul celulelor gazdei. Patogeneza infecțiilor virale are etape distincte:'],
    ['flow', 'viralSteps'],
    ['box', 'tip', 'Întrebare de enumerare', 'Scrie cele <b>5 etape, în ordine</b>, fără descriere. Mnemotehnic: <b>A-R-D-E-P</b> (Atașare, Replicare, Diseminare, Efecte citopatice, Persistență/clearance).'],
    ['box', 'note', 'Unde găsești descrierile', 'Etapa 1: Î37. Etapa 2: Î38. Etapele 3–4: Î39. Etapa 5: Î40.']
  ],
  plan: ['Atașarea și intrarea intracelulară (receptori celulari specifici).', 'Replicarea intracelulară.', 'Diseminarea virusului.', 'Efectele citopatice.', 'Persistența sau eliminarea (clearance-ul).'],
  cloze: [
    'Virusurile nu se pot reproduce independent, ci obligatoriu în interiorul [[celulelor gazdei|celulelor|celulei gazda]].',
    'Prima etapă este [[atașarea|atasarea]] și intrarea intracelulară, prin recunoașterea [[receptorilor|receptori]] celulari specifici.',
    'A doua etapă este [[replicarea]] intracelulară.',
    'A treia etapă este [[diseminarea]] virusului la alte celule sau țesuturi.',
    'A patra etapă constă în efectele [[citopatice]].',
    'A cincea etapă este [[persistența|persistenta]] în organism sau eliminarea ([[clearance-ul|clearance]]).'
  ],
  rub: [
    ['Etape', [
      ['1. Atașarea și intrarea intracelulară', ['atasar', 'intrar'], 2],
      ['   prin recunoașterea receptorilor celulari specifici', ['receptor'], 1],
      ['2. Replicarea intracelulară', ['replic'], 2],
      ['3. Diseminarea virusului', ['disemin'], 2],
      ['4. Efectele citopatice', ['citopat'], 2],
      ['5. Persistența', ['persist'], 2],
      ['   sau eliminarea (clearance-ul)', ['clearance', 'elimin'], 1]
    ]]
  ],
  chains: ['viralSteps']
};

Q[37] = {
  ch: 'infect', s: 'Atașarea și intrarea virusului', src: 'Sindromul inflamator în context infecțios, slide 32',
  sum: 'Fiecare virus are o țintă celulară preferențială, determinată de receptori specifici pe suprafața celulelor. Reacția dintre proteinele de suprafață virală și receptorii celulari inițiază infecția și conferă tropismul viral. După legare, virusul pătrunde prin endocitoză (urmată de eliberarea în citoplasmă) sau prin fuziune directă cu membrana. Intrarea presupune dezvelirea: capsida se desface, iar genomul viral e eliberat în citoplasmă sau în nucleu.',
  learn: [
    ['flow', 'viralEntry'],
    ['ul', 'De scris (slide 32)', ['Fiecare tip de virus are o <b>„țintă” celulară preferențială</b>, determinată de <b>receptori specifici</b> pe suprafața celulelor', 'Reacția dintre <b>proteinele de suprafață virală</b> și <b>receptorii celulari</b> inițiază infecția și conferă <b>tropismul viral</b>', 'Pătrunderea în celulă: <b>endocitoză</b> (urmată de eliberarea în citoplasmă) sau <b>fuziune directă</b> cu membrana celulară', 'Intrarea presupune <b>dezvelirea</b>: capsida virală se desface, iar genomul viral e eliberat în compartimentul celular relevant (citoplasmă sau nucleu)']],
    ['box', 'ctx', 'Exemple clasice de tropism', 'HIV se leagă de CD4 (limfocite T helper); virusul gripal se leagă de acidul sialic al epiteliului respirator; SARS-CoV-2 se leagă de ACE2.']
  ],
  plan: ['Ținta celulară preferențială, determinată de receptori specifici.', 'Proteinele de suprafață virală + receptorii celulari → inițierea infecției, tropismul viral.', 'Pătrundere: endocitoză (apoi eliberare în citoplasmă) sau fuziune directă cu membrana.', 'Dezvelirea: capsida se desface; genomul ajunge în citoplasmă sau nucleu.'],
  cloze: [
    'Fiecare tip de virus are o țintă celulară preferențială, determinată de prezența unor [[receptori]] specifici pe suprafața celulelor.',
    'Reacția dintre proteinele de suprafață virală și receptorii celulari inițiază infecția și conferă [[tropismul|tropism]] viral.',
    'După legarea de receptor, virusurile pătrund în celulă prin [[endocitoză|endocitoza]] sau prin [[fuziune]] directă cu membrana celulară.',
    'Procesul de intrare presupune [[dezvelirea]]: capsida virală se desface.',
    'Genomul viral este eliberat în compartimentul celular relevant: [[citoplasmă|citoplasma]] sau [[nucleu]].'
  ],
  rub: [
    ['Atașarea', [
      ['Ținta celulară preferențială', ['tint', 'preferent'], 1],
      ['Receptori specifici pe suprafața celulelor', ['receptor'], 2],
      ['Proteinele de suprafață virală se leagă de receptori', ['protein+suprafat', 'protein+viral', 'leag'], 1],
      ['Inițiază infecția și conferă tropismul viral', ['tropism'], 2]
    ]],
    ['Intrarea', [
      ['Endocitoză (urmată de eliberarea în citoplasmă)', ['endocit'], 2],
      ['Fuziune directă cu membrana celulară', ['fuziun'], 2],
      ['Dezvelirea: capsida se desface', ['dezvelir', 'capsid', 'decapsid'], 2],
      ['Genomul viral eliberat în citoplasmă sau nucleu', ['genom', 'nucle', 'citoplasm'], 1]
    ]]
  ],
  chains: ['viralEntry']
};

Q[38] = {
  ch: 'infect', s: 'Replicarea virală intracelulară', src: 'Sindromul inflamator în context infecțios, slide 33',
  sum: 'Virusurile acaparează resursele celulei gazdă: își multiplică genomul și produc proteinele virale necesare asamblării noilor particule. Replicarea intensă perturbă funcțiile celulei: inhibă sinteza macromoleculelor celulare, blochează sinteza proteică a gazdei și dedică ribozomii exclusiv sintezei de proteine virale. La finalul ciclului, mulți viruși produc liza celulei, eliberând virionii nou formați.',
  learn: [
    ['flow', 'viralRep'],
    ['ul', 'De scris (slide 33)', ['Virusurile <b>acaparează resursele celulei gazdă</b> pentru propria replicare', 'Virusul începe <b>multiplicarea genomului</b> și <b>producția de proteine virale</b> necesare asamblării noilor particule', 'Replicarea intensă <b>perturbă funcțiile celulei gazdă</b>: inhibă sinteza macromoleculelor celulare, <b>blochează sinteza proteică a gazdei</b>, <b>dedică ribozomii exclusiv</b> sintezei de proteine virale', 'La finalul ciclului, numeroși viruși produc <b>liza celulei</b>, eliberând virionii nou formați']],
    ['box', 'tip', 'Imaginea care ajută', 'Celula devine o <b>„fabrică” confiscată</b>: aceeași linie de producție (ribozomii), alt produs (proteine virale), iar la final fabrica e demolată (liza) ca să iasă marfa (virionii).']
  ],
  plan: ['Virusul acaparează resursele celulei.', 'Multiplicarea genomului și producția de proteine virale pentru asamblare.', 'Perturbarea celulei: inhibarea sintezei macromoleculelor, blocarea sintezei proteice a gazdei, ribozomi dedicați proteinelor virale.', 'Liza celulei la finalul ciclului, eliberarea virionilor.'],
  cloze: [
    'Virusurile [[acaparează|acapareaza|preiau]] resursele celulei gazdă pentru propria replicare.',
    'În celulă virusul începe multiplicarea [[genomului|genom]] și producția de [[proteine virale|proteine]].',
    'Replicarea virală intensă inhibă sinteza [[macromoleculelor]] celulare.',
    'Sinteza proteică a gazdei este blocată, iar [[ribozomii]] sunt dedicați exclusiv sintezei de proteine virale.',
    'La finalul ciclului, numeroși viruși produc [[liza]] celulei, eliberând [[virionii|virioni]] nou formați.'
  ],
  rub: [
    ['Replicarea', [
      ['Acapararea resurselor celulei gazdă', ['acapar', 'resurs', 'preia'], 2],
      ['Multiplicarea genomului viral', ['genom', 'multiplic'], 2],
      ['Producția de proteine virale pentru asamblarea noilor particule', ['protein+viral', 'asambl'], 2],
      ['Perturbarea funcțiilor celulei gazdă', ['perturb'], 1],
      ['Inhibarea sintezei macromoleculelor celulare', ['macromolec'], 1],
      ['Blocarea sintezei proteice a gazdei', ['sintez+protei', 'bloc'], 2],
      ['Ribozomii dedicați exclusiv proteinelor virale', ['ribozom'], 2],
      ['Liza celulei, eliberarea virionilor', ['liz', 'virion'], 2]
    ]]
  ],
  chains: ['viralRep']
};

Q[39] = {
  ch: 'infect', s: 'Diseminarea virală și efectele citopatice', src: 'Sindromul inflamator în context infecțios, slide 34',
  sum: 'După replicarea inițială la poarta de intrare, virusurile pot rămâne localizate sau pot disemina, producând infecții sistemice: pe cale sanguină (liberi în plasmă sau în celulele sanguine), limfatică, neurală (de-a lungul axonilor nervilor periferici) și transplacentar (de la mamă la făt). Efectele citopatice și lezarea țesuturilor: dereglarea homeostaziei celulare (fluxuri ionice, semnalizare), inhibarea sintezelor celulare (ARN și proteine ale gazdei), efecte genotoxice (instabilitate genomică, fracturi cromozomiale) și alterarea proprietăților antigenice ale celulei.',
  learn: [
    ['fig', 'viralRoutes'],
    ['cols', [
      ['Diseminarea virusului', ['după replicarea inițială la poarta de intrare, virusurile pot rămâne <b>localizate</b> sau pot <b>disemina</b> spre alte țesuturi → infecții sistemice', '<b>pe cale sanguină</b>: liberi în plasmă sau în interiorul celulelor sanguine', '<b>pe cale limfatică</b>', '<b>pe cale neurală</b>: de-a lungul axonilor nervilor periferici', '<b>de la mamă la făt (transplacentar)</b>: în infecțiile materne virale']],
      ['Efectele citopatice (CPE) și lezarea țesuturilor', ['<b>dereglarea homeostaziei celulare</b>: modificări ale fluxurilor de ioni și ale semnalizării intracelulare', '<b>inhibarea sintezelor celulare</b>: oprirea sintezei de ARN și proteine ale gazdei', '<b>efecte genotoxice</b>: instabilitate genomică, fracturi cromozomiale', '<b>alterarea proprietăților antigenice</b> ale celulei']]
    ]],
    ['box', 'ctx', 'Exemple', 'Neural: virusul rabic, herpes simplex, varicelo-zosterian. Transplacentar: rubeola, citomegalovirusul. Alterarea antigenelor de suprafață face celula infectată ținta limfocitelor T citotoxice și NK, deci o parte din leziune vine din răspunsul imun.']
  ],
  plan: ['După replicarea locală: rămân localizate sau diseminează → infecții sistemice.', 'Căi: sanguină (liberi sau în celule), limfatică, neurală (axoni), transplacentară.', 'Efecte citopatice: dereglarea homeostaziei celulare (ioni, semnalizare).', 'Inhibarea sintezelor celulare (ARN, proteine).', 'Efecte genotoxice (instabilitate genomică, fracturi cromozomiale).', 'Alterarea proprietăților antigenice ale celulei.'],
  cloze: [
    'După replicarea inițială la poarta de intrare, virusurile pot rămâne [[localizate]] sau pot disemina, cauzând infecții [[sistemice]].',
    'Pe cale sanguină virusurile circulă liberi în [[plasmă|plasma]] sau în interiorul celulelor sanguine.',
    'Pe cale [[neurală|neurala|nervoasa]] virusurile migrează de-a lungul [[axonilor|axoni]] nervilor periferici.',
    'De la mamă la făt virusurile trec pe cale [[transplacentară|transplacentara]].',
    'Efectele citopatice includ dereglarea [[homeostaziei|homeostazia]] celulare, cu modificări ale fluxurilor de ioni.',
    'Virusurile opresc sinteza de [[ARN|acid ribonucleic]] și proteine a gazdei.',
    'Efectele [[genotoxice]] constau în instabilitate genomică și fracturi [[cromozomiale]].',
    'Infecția virală alterează proprietățile [[antigenice]] ale celulei.'
  ],
  rub: [
    ['Diseminarea', [
      ['Localizare la poarta de intrare sau diseminare → infecții sistemice', ['localiz', 'sistemic', 'disemin'], 1],
      ['Cale sanguină (liberi în plasmă sau în celule sanguine)', ['sangu', 'sangv', 'plasm', 'hematogen'], 2],
      ['Cale limfatică', ['limfatic'], 2],
      ['Cale neurală (axonii nervilor periferici)', ['neural', 'axon', 'nerv'], 2],
      ['Transplacentar (mamă–făt)', ['placent', 'fat'], 2]
    ]],
    ['Efecte citopatice', [
      ['Dereglarea homeostaziei celulare (ioni, semnalizare)', ['homeostaz', 'ion', 'semnaliz'], 2],
      ['Inhibarea sintezelor celulare (ARN, proteine)', ['inhib+sintez', 'sintez', '=arn'], 2],
      ['Efecte genotoxice: instabilitate genomică, fracturi cromozomiale', ['genotox', 'cromozom', 'instabil'], 2],
      ['Alterarea proprietăților antigenice', ['antigen'], 2]
    ]]
  ],
  chains: []
};

Q[40] = {
  ch: 'infect', s: 'Persistența și clearance-ul viral', src: 'Sindromul inflamator în context infecțios, slide 35–36',
  sum: 'Unii viruși nu au efect litic imediat, ci persistă: infecții latente (virus „adormit”, genom integrat în cromozom sau episom, expresie genică restrânsă, fără particule infecțioase), cronice productive (producție lentă de particule, inflamație cronică cu leziuni progresive) și lente (incubație de ani, apoi boală severă și deces). Clearance-ul (eliminarea completă) e obiectivul ideal, frecvent în infecțiile acute necomplicate; rujeola, oreionul, rubeola dau imunitate de lungă durată prin memorie imunologică. Dacă eșuează, infecția devine cronică. Transformarea oncogenă: efect de lungă durată al infecțiilor persistente; 15–20% din cancerele umane.',
  learn: [
    ['fig', 'viralPatterns'],
    ['tbl', 'Infecțiile persistente', ['Tip', 'Ce face virusul', 'Consecință'], [
      ['<b>Latentă</b>', 'Rămâne „adormit” în celulă; genomul persistă <b>integrat</b> în cromozomul gazdei sau ca <b>episom</b> extracromozomal; nu produce activ particule infecțioase; expresia genelor virale e foarte restrânsă', 'Celula purtătoare suferă puține modificări; reactivări periodice (ex. herpes)'],
      ['<b>Cronică (productivă)</b>', 'Persistă și continuă să producă particule infecțioase, într-un ritm scăzut sau doar în unele celule, fără boală acută', 'Inflamație cronică cu <b>leziuni progresive</b> (ex. hepatita cronică B)'],
      ['<b>Lentă (progresivă)</b>', 'Perioadă foarte lungă de incubație (ani), cu replicare minimă inițial', 'Progresie spre boală severă și deces']
    ]],
    ['h', 'Clearance-ul'],
    ['ul', null, ['Eliminarea completă a virusului din organism: <b>obiectivul ideal</b> al răspunsului imun; se întâmplă frecvent în infecțiile acute necomplicate', 'Multe infecții virale autolimitate (<b>rujeolă, oreion, rubeolă</b>) conferă <b>imunitate pe termen lung</b>, prin clearance complet și memorie imunologică', 'Dacă sistemul imun eșuează să elimine virusul, infecția devine <b>cronică</b>']],
    ['box', 'lp', 'Transformarea oncogenă', 'Anumiți viruși pot altera celulele spre cancer. Nu e o consecință imediată, ci un efect de lungă durată al infecțiilor persistente sau latente. Infecțiile virale cronice stau la originea a circa <b>15–20% din cancerele umane</b>.'],
    ['box', 'ctx', 'Exemple de virusuri oncogene', 'HPV (cancer de col uterin), virusurile hepatitice B și C (hepatocarcinom), EBV (limfoame, carcinom nazofaringian).']
  ],
  plan: ['Persistență: fără efect litic imediat, cu efect minim inițial.', 'Latente: genom integrat sau episom, expresie restrânsă, fără particule; reactivări.', 'Cronice productive: particule în ritm scăzut, inflamație cronică, leziuni progresive.', 'Lente: incubație de ani, apoi boală severă și deces.', 'Clearance: eliminare completă, frecvent în infecțiile acute; imunitate de lungă durată (rujeolă, oreion, rubeolă); eșec → cronicizare.', 'Transformarea oncogenă: 15–20% din cancere.'],
  cloze: [
    'Unii viruși nu au efect [[litic]] imediat, ci persistă în celule timp îndelungat.',
    'În infecțiile [[latente]] virusul rămâne „adormit”, iar genomul persistă integrat în cromozomul gazdei sau ca [[episom]].',
    'În infecțiile latente expresia genelor virale este foarte [[restrânsă|restransa]] și nu se produc activ particule infecțioase.',
    'În infecțiile [[cronice]] productive virusul produce particule infecțioase într-un ritm scăzut, cu inflamație cronică și leziuni [[progresive]].',
    'Infecțiile [[lente]] au o perioadă de incubație foarte lungă, de ani, urmată de boală severă și deces.',
    'Clearance-ul reprezintă [[eliminarea completă|eliminarea]] virusului din organism.',
    'Rujeola, oreionul și rubeola conferă imunitate pe termen lung datorită [[memoriei imunologice|memoriei]].',
    'Dacă sistemul imun eșuează să elimine virusul, infecția devine [[cronică|cronica]].',
    'Infecțiile virale cronice stau la originea a circa [[15-20|15 20|15]]% din cancerele umane, prin transformare [[oncogenă|oncogena]].'
  ],
  rub: [
    ['Persistența', [
      ['Unii viruși persistă, fără efect litic imediat', ['persist', 'litic'], 1],
      ['Infecții latente: virus „adormit”', ['latent', 'adormit'], 2],
      ['Genom integrat în cromozom sau episom; expresie restrânsă; fără particule', ['integrat', 'episom', 'restrans'], 1],
      ['Infecții cronice productive: particule în ritm scăzut', ['cronic', 'productiv'], 2],
      ['Inflamație cronică, leziuni progresive', ['progresiv', 'inflam+cronic']],
      ['Infecții lente: incubație de ani, boală severă, deces', ['=lent', 'lente', 'incubati'], 2]
    ]],
    ['Clearance-ul', [
      ['Eliminarea completă a virusului (obiectivul ideal)', ['clearance', 'elimin'], 2],
      ['Frecvent în infecțiile acute necomplicate', ['acut']],
      ['Rujeolă, oreion, rubeolă: imunitate pe termen lung, memorie imunologică', ['rujeol', 'oreion', 'rubeol', 'memori'], 1],
      ['Eșecul clearance-ului → infecție cronică', ['esu', 'esec', 'cronic']]
    ]],
    ['Transformarea oncogenă', [
      ['Transformare oncogenă în infecțiile persistente', ['oncogen', 'cancer', 'neoplaz'], 1],
      ['15–20% din cancerele umane', ['=15', '=20'], 1]
    ]]
  ],
  chains: []
};

Q[41] = {
  ch: 'infect', s: 'Infecțiile virale: semne și paraclinic', src: 'Sindromul inflamator în context infecțios, slide 37–38',
  sum: 'Generale: febră moderată (adesea sub 38°C) sau subfebrilitate, mialgii și artralgii, stare generală alterată (oboseală marcată, confuzie în cazuri severe). Specifice, după poarta de intrare; ex. căile respiratorii: rinoree apoasă, congestie nazală, strănut, durere în gât, tuse seacă sau cu expectorație mucoasă, dispnee, wheezing. Paraclinic: leucocitoză cu limfocitoză; reactanți de fază acută ușor crescuți sau normali (PCR, fibrinogen, hepcidină, procalcitonină); identificarea agentului (sânge, urină, LCR); imagistică.',
  learn: [
    ['fig', 'bvCompare'],
    ['cols', [
      ['Semne și simptome generale', ['<b>febră moderată</b> (adesea sub 38°C) sau <b>subfebrilități</b>', 'mialgii și artralgii', 'stare generală alterată: oboseală marcată, confuzie în cazuri severe']],
      ['Exemplu specific: căile respiratorii', ['rinoree (secreții nazale apoase), congestie nazală, strănut, durere în gât', 'tuse seacă sau cu expectorație mucoasă', 'dispnee, wheezing']]
    ]],
    ['ul', 'Paraclinic (slide 38)', ['Hemoleucogramă: <b>leucocitoză cu limfocitoză</b>', 'Biochimie: <b>reactanți de fază acută ușor crescuți sau în parametri normali</b> (PCR, fibrinogen, hepcidină, procalcitonină)', 'Identificarea agentului patogen în sânge, urină sau LCR', 'Investigații imagistice: radiografie, CT, RMN']],
    ['box', 'tip', 'Oglinda Î35', 'Același schelet ca la bacterii, dar: febră <b>moderată</b> (< 38°C), <b>limfocitoză</b> (nu neutrofilie), reactanți de fază acută <b>ușor crescuți sau normali</b>, <b>fără antibiogramă</b>.']
  ],
  plan: ['Generale: febră moderată (< 38°C) sau subfebrilitate, mialgii, artralgii, stare generală alterată.', 'Specifice după poarta de intrare; exemplu respirator: rinoree apoasă, congestie, strănut, durere în gât, tuse seacă sau mucoasă, dispnee, wheezing.', 'Hemoleucogramă: leucocitoză cu limfocitoză.', 'Reactanți de fază acută ușor crescuți sau normali (PCR, fibrinogen, hepcidină, procalcitonină).', 'Identificarea agentului (sânge, urină, LCR); imagistică.'],
  cloze: [
    'În infecțiile virale febra este [[moderată|moderata]], adesea sub [[38]]°C, sau apar subfebrilități.',
    'Simptomele generale includ [[mialgii]], artralgii și stare generală alterată.',
    'La nivel respirator apare rinoree cu secreții nazale [[apoase]], congestie nazală și strănut.',
    'Tusea poate fi [[seacă|seaca]] sau cu expectorație mucoasă; pot apărea dispnee și [[wheezing]].',
    'Hemoleucograma arată leucocitoză cu [[limfocitoză|limfocitoza]].',
    'Reactanții de fază acută sunt [[ușor crescuți|usor crescuti]] sau în parametri normali.'
  ],
  rub: [
    ['Semne generale', [
      ['Febră moderată (adesea < 38°C) sau subfebrilitate', ['moderat', 'subfebril', 'sub 38'], 2],
      ['Mialgii și artralgii', ['mialg', 'artralg'], 1],
      ['Stare generală alterată (oboseală, confuzie)', ['stare general', 'obosea', 'confuz'], 1]
    ]],
    ['Semne specifice (ex. respirator)', [
      ['Rinoree apoasă, congestie nazală, strănut, durere în gât', ['rinore', 'congesti', 'stranut', 'durer+gat'], 1],
      ['Tuse seacă sau cu expectorație mucoasă', ['tuse'], 1],
      ['Dispnee, wheezing', ['dispne', 'wheez']]
    ]],
    ['Paraclinic', [
      ['Leucocitoză cu limfocitoză', ['limfocitoz'], 2],
      ['Reactanți de fază acută ușor crescuți sau normali', ['usor+cresc', 'normal', 'reactant'], 2],
      ['PCR, fibrinogen, hepcidină, procalcitonină', ['=pcr', 'proteina c', 'fibrinogen', 'procalciton', 'hepcidin'], 1],
      ['Identificarea agentului în sânge, urină, LCR', ['identific', '=lcr', 'cultur'], 1],
      ['Imagistică', ['imagist', 'radiograf', '=ct', '=rmn']]
    ]]
  ],
  chains: []
};

;