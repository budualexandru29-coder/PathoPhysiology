/* ===== Capitolul 2: Febra. Limfomul Hodgkin. Angina streptococică (Î10–20) ===== */

Q[10] = {
  ch: 'febra', s: 'Febra vs hipertermie', src: 'Febra, slide 2–5; Termoreglarea, slide 12',
  sum: 'Febra este resetarea temporară a termostatului hipotalamic la o valoare mai ridicată, ca răspuns la substanțe pirogene. Diferența fundamentală: în febră crește valoarea de referință (setpoint-ul) și organismul își ridică activ temperatura prin termogeneză; în hipertermie setpoint-ul rămâne nemodificat, iar temperatura crește pentru că termoliza este depășită.',
  learn: [
    ['def', 'Febra', 'Resetarea temporară a <b>termostatului hipotalamic</b> la o valoare mai ridicată, ca răspuns la <b>substanțele pirogene</b> endogene sau exogene. Este un mecanism nespecific și o <b>reacție de fază acută</b>: apare când pirogenii determină creșterea bruscă a temperaturii de referință.'],
    ['def', 'Hipertermia', 'Creșterea temperaturii centrale prin <b>depășirea mecanismelor termolizei</b> (mediu cald, efort fizic intens), cu valoarea de referință <b>nemodificată</b>.'],
    ['fig', 'feverVsHyper'],
    ['tbl', 'Febră ≠ hipertermie', ['', 'Febră', 'Hipertermie'], [
      ['<b>Setpoint-ul hipotalamic</b>', 'Crește: valoarea de referință e mutată în sus', 'Nemodificat: rămâne ~37°C'],
      ['<b>Cauza</b>', 'Substanțe pirogene exogene sau endogene', 'Mediu cald, efort fizic intens, defecte genetice (hipertermia malignă)'],
      ['<b>Cum crește temperatura</b>', 'Activ: termogeneză (vasoconstricție, frison) până la noul setpoint', 'Pasiv: aportul sau producția de căldură depășesc termoliza'],
      ['<b>Termoliza</b>', 'Frânată în faza de creștere', 'Activată la maximum (vasodilatație, sudorație), dar depășită'],
      ['<b>Senzația bolnavului</b>', 'Frig, frison, în faza de creștere', 'Căldură'],
      ['<b>Antipireticele</b>', 'Eficiente: aspirina blochează PGE2', 'Ineficiente: se răcește extern (context)']
    ]],
    ['box', 'tip', 'Diferența fundamentală, într-o frază', 'În febră <b>crește valoarea de referință</b> și organismul își ridică singur temperatura prin termogeneză; în hipertermie <b>valoarea de referință e normală</b>, iar temperatura crește pentru că termoliza e depășită.']
  ],
  plan: ['Definiția febrei: resetarea temporară a termostatului hipotalamic la o valoare mai ridicată, ca răspuns la pirogeni; reacție de fază acută.', 'Definiția hipertermiei: depășirea termolizei, setpoint nemodificat.', 'Diferența fundamentală: setpoint crescut (febră) vs setpoint normal (hipertermie).', 'Consecința: în febră termogeneza e activă (vasoconstricție, frison); în hipertermie termoliza e maximă, dar depășită.'],
  cloze: [
    'Febra reprezintă resetarea temporară a [[termostatului hipotalamic|termostatului]] la o valoare mai [[ridicată|ridicata|mare]].',
    'Febra apare ca răspuns la substanțele [[pirogene]] endogene sau exogene.',
    'Febra este o reacție de fază [[acută|acuta]].',
    'În febră valoarea de [[referință|referinta]] crește brusc, iar organismul activează mecanismele [[termogenezei|termogeneza]].',
    'În hipertermie set-point-ul hipotalamic rămâne [[nemodificat|normal]], iar temperatura crește prin depășirea mecanismelor [[termolizei|termoliza]].',
    'Antipireticele precum acidul acetilsalicilic scad febra prin inhibarea sintezei de [[PGE2|prostaglandina e2|pge 2]].'
  ],
  rub: [
    ['Definiția febrei', [
      ['Resetarea temporară a termostatului hipotalamic', ['resetar', 'termostat', 'set point', 'setpoint', 'valoar+referint', 'temperatur+referint'], 2],
      ['la o valoare mai ridicată', ['valoar+ridicat', 'valoar+mare', 'valoar+superioar', 'cresc+referint', 'cresc+set', 'cresc+termostat', 'cresc+setpoint'], 1],
      ['Ca răspuns la substanțe pirogene (exogene/endogene)', ['pirogen'], 2],
      ['Reacție de fază acută', ['faza acut']]
    ]],
    ['Hipertermia', [
      ['Depășirea mecanismelor termolizei', ['termoliz'], 2],
      ['Set-point-ul rămâne nemodificat', ['nemodificat', 'normal', 'neschimbat', 'nu se modific', 'ramane+37'], 2]
    ]],
    ['Diferența', [
      ['În febră temperatura crește activ, prin termogeneză', ['termogenez', 'frison', 'vasoconstric'], 2],
      ['În hipertermie temperatura crește pasiv (aport/producție > pierdere)', ['pasiv', 'mediu cald', 'efort', 'depasit']]
    ]]
  ],
  chains: []
};

Q[11] = {
  ch: 'febra', s: 'Bazele fiziopatologice ale febrei', src: 'Febra, slide 2–9',
  sum: 'Pirogenii exogeni (LPZ din Gram-negativi, componente ale Gram-pozitivilor) sunt opsonizați de complement și fagocitați de macrofage, care eliberează pirogeni endogeni (IL-1, TNF-α, IL-6, IFN). Aceștia acționează în aria preoptică și în OVLT (fără barieră hematoencefalică), unde induc PGE2; pe calea AMPc crește setpoint-ul. Temperatura reală fiind sub noul setpoint, apar vasoconstricția (senzație de frig) și frisonul. Când setpoint-ul scade: vasodilatație, senzație de căldură, sudorație. AVP, α-MSH, CRH, IL-10 și antagonistul IL-1 limitează febra; aspirina inhibă COX-1/2.',
  learn: [
    ['def', 'Febra', 'Resetarea temporară a termostatului hipotalamic la o valoare mai ridicată, ca răspuns la substanțele pirogene endogene sau exogene. Temperatura centrală (~37°C, cu variații diurne) e menținută prin echilibrul dintre termogeneză, menținerea temperaturii și termoliză; în febră echilibrul se reglează în jurul unei valori mai mari.'],
    ['h', 'Substanțele pirogene'],
    ['cols', [
      ['Pirogeni exogeni', ['componente structurale ale agenților patogeni (virusuri, bacterii, fungi)', '<b>lipopolizaharidul (LPZ, endotoxina)</b> din peretele bacteriilor Gram-negative', 'la Gram-pozitivi: acidul lipoteicoic, peptidoglicanii (în slide: „exotoxinele” Gram+)', 'cei mai puternici pirogeni']],
      ['Pirogeni endogeni = citokine proinflamatorii', ['IL-1α, IL-1β, IL-6, IL-8, IL-11', 'IFN-α2, IFN-γ', 'TNF-α (cașectina), TNF-β (limfotoxina)', 'MIP-1 (proteina inflamatorie a macrofagelor)']]
    ]],
    ['flow', 'feverCascade'],
    ['fig', 'feverCurve'],
    ['box', 'lp', 'Limitarea febrei (slide 9)', 'În cursul reacției febrile creierul eliberează <b>arginin-vasopresină (AVP)</b>, <b>hormonul stimulator al α-melanocitelor (α-MSH)</b> și <b>hormonul eliberator de corticotropină (CRH)</b>. Apare și un feedback negativ prin citokine antiinflamatorii, <b>IL-10</b> și <b>antagonistul receptorului IL-1</b> (în slide e scris „agonist”), care atenuează răspunsul febril.'],
    ['box', 'note', 'Aspirina', 'Acidul acetilsalicilic inhibă ciclooxigenazele 1 și 2, deci blochează sinteza de PGE2: este un antipiretic foarte eficient.'],
    ['box', 'tip', 'Ce nu trebuie să lipsească', 'Pirogen exogen → macrofag → pirogeni endogeni → <b>OVLT / aria preoptică, fără BHE</b> → <b>PGE2</b> → <b>AMPc</b> → <b>setpoint ↑</b> → vasoconstricție + frison → febră. Plus defervescența: vasodilatație și sudorație.']
  ],
  plan: ['Definiția febrei și echilibrul termogeneză–termoliză.', 'Pirogenii exogeni: LPZ (Gram-negativi), acid lipoteicoic, peptidoglicani (Gram-pozitivi).', 'Opsonizare (complement), fagocitoză (macrofage) → eliberarea pirogenilor endogeni: IL-1, TNF-α, IL-6, IFN.', 'Acțiunea în aria preoptică și OVLT (fără BHE) → PGE2 → AMPc → setpoint ↑.', 'Faza de creștere: Tc < setpoint → vasoconstricție (senzație de frig) + frison.', 'Defervescența: setpoint ↓, Tc > setpoint → vasodilatație, senzație de căldură, sudorație abundentă.', 'Limitarea febrei: AVP, α-MSH, CRH, IL-10, antagonistul IL-1; aspirina inhibă COX-1/2.'],
  cloze: [
    'Pirogenii exogeni sunt componente [[structurale]] ale agenților patogeni.',
    'Cei mai puternici pirogeni sunt complexele [[lipopolizaharidice|lipopolizaharidice lpz|lps|lpz]] (endotoxinele) din peretele germenilor [[Gram-negativi|gram negativi|gram]].',
    'LPZ este opsonizat de către [[complement]] și fagocitat de către [[macrofage]].',
    'Macrofagele activate eliberează citokine proinflamatorii, numite pirogeni [[endogeni]].',
    'TNF-α se mai numește [[cașectina|casectina]], iar TNF-β se numește [[limfotoxina]].',
    'Citokinele ajung în aria [[preoptică|preoptica]] și în organum vasculosum al laminei [[terminale]] (OVLT).',
    'Structurile circumventriculare nu au barieră [[hematoencefalică|hematoencefalica]].',
    'La nivelul OVLT se eliberează [[PGE2|prostaglandina e2|pge 2]], iar pragul centrului termoreglator crește pe calea [[AMPc|amp ciclic]].',
    'În faza de creștere, vasoconstricția scade fluxul sanguin cutanat, iar bolnavul are senzația de [[frig]].',
    'Frisonul reprezintă [[contracții musculare involuntare|contractii involuntare]] care cresc producția de căldură.',
    'Când temperatura de referință scade, apar [[vasodilatația|vasodilatatie]], senzația de căldură și [[sudorația|sudoratie|transpiratia]] abundentă.',
    'Acidul acetilsalicilic inhibă [[ciclooxigenazele|ciclooxigenaza|cox]] 1 și 2 și este un [[antipiretic]] foarte eficient.',
    'Feedback-ul negativ al febrei e realizat de citokine antiinflamatorii: [[IL-10|il 10]] și antagonistul receptorului IL-1.'
  ],
  rub: [
    ['Definiție', [
      ['Resetarea termostatului hipotalamic la o valoare mai mare', ['termostat', 'set point', 'setpoint', 'valoar+referint', 'temperatur+referint'], 2],
      ['Echilibrul termogeneză–termoliză', ['echilibr', 'termoliz']]
    ]],
    ['Pirogeni', [
      ['Pirogeni exogeni = componente ale agenților patogeni', ['pirogen+exogen', 'exogen'], 2],
      ['LPZ (endotoxina) din Gram-negativi', ['lipopoliz', '=lps', '=lpz', 'endotoxin'], 2],
      ['Acid lipoteicoic, peptidoglicani (Gram-pozitivi)', ['lipoteicoic', 'peptidoglic', 'gram pozitiv']],
      ['Opsonizare de către complement', ['opsoniz', 'complement']],
      ['Fagocitoză de către macrofage', ['macrofag', 'fagocit'], 2],
      ['Pirogeni endogeni = citokine proinflamatorii', ['pirogen+endogen', 'endogen', 'citokin'], 2],
      ['IL-1', ['=il 1', 'interleukin+1'], 1],
      ['TNF-α', ['=tnf', 'factor+necroz'], 1],
      ['IL-6, IFN', ['=il 6', '=ifn', 'interferon']]
    ]],
    ['Mecanism central', [
      ['Aria preoptică', ['preoptic'], 1],
      ['OVLT (organum vasculosum al laminei terminale)', ['=ovlt', 'vasculos', 'lamin+terminal', 'organ+vascular'], 2],
      ['Fără barieră hematoencefalică', ['hematoencef', 'circumventricular', '=bhe'], 1],
      ['Sinteza de PGE2', ['=pge 2', 'prostaglandin'], 2],
      ['Calea AMPc', ['=ampc', 'amp ciclic', '=camp', 'ampc']],
      ['Setpoint-ul crește → activarea termogenezei', ['termogenez', 'resetat+superioar']]
    ]],
    ['Faze', [
      ['Creștere: vasoconstricție, senzație de frig', ['vasoconstric', 'senzati+frig'], 2],
      ['Frison (contracții musculare involuntare)', ['frison'], 2],
      ['Defervescență: vasodilatație, sudorație, senzație de căldură', ['vasodilat', 'sudora', 'transpir'], 2]
    ]],
    ['Reglare', [
      ['AVP, α-MSH, CRH', ['vasopresin', '=avp', 'melanocit', '=msh', '=crh', 'corticotrop']],
      ['IL-10, antagonistul receptorului IL-1 (feedback negativ)', ['=il 10', 'antagonist', 'feedback', 'feed back', 'antiinflam']],
      ['Aspirina inhibă COX-1 și COX-2', ['aspirin', 'acetilsalic', 'ciclooxigen', '=cox', '=aas']]
    ]]
  ],
  chains: ['feverCascade']
};

Q[12] = {
  ch: 'febra', s: 'Consecințele sistemice și efectele benefice ale febrei', src: 'Febra, slide 10–11, 28',
  sum: 'Consecințe sistemice: ↑ temperatura centrală, ↑ frecvența cardiacă cu ~8–12 bpm/°C, intensificarea metabolismului bazal, ↑ consumul energetic și de oxigen, modificări ale senzoriului (somn cu unde lente, delir, convulsii febrile). Efecte benefice: distruge celulele infectate și împiedică replicarea virală, stimulează fagocitoza, reduce rezervele de glucoză, inhibă enzimele și sintezele proteice microbiene, scade Fe, Zn și Cu plasmatice; intensifică inflamația și răspunsul imun specific (LT helper, interferon).',
  learn: [
    ['cols', [
      ['Consecințele sistemice (slide 10)', ['↑ temperatura centrală', '<b>↑ frecvența cardiacă cu aproximativ 8–12 bpm/°C</b>', 'intensificarea <b>metabolismului bazal</b>', '↑ consumul energetic și de oxigen', 'modificări ale senzoriului, după valoarea temperaturii: intensificarea <b>somnului cu unde lente</b> (efect neuroprotector), <b>delir</b>, <b>convulsii febrile</b>']],
      ['Efectele benefice (slide 11 și 28)', ['distruge celulele infectate și <b>împiedică replicarea virală</b>', '<b>stimulează fagocitoza</b>', 'reduce rezervele de glucoză (împiedică multiplicarea microorganismelor)', 'inhibă activitatea enzimatică și sintezele proteice', '<b>scade Fe, Zn și Cu plasmatice</b>, oligoelemente esențiale multiplicării bacteriene', 'intensifică reacția inflamatorie', 'intensifică răspunsul imun specific: ↑ activitatea și proliferarea LT helper, sinteza de interferon']]
    ]],
    ['box', 'ctx', 'De ce crește pulsul', 'Căldura accelerează depolarizarea spontană a nodului sinusal, iar sistemul simpatic e activat. În plus, metabolismul crescut cere mai mult oxigen, deci un debit cardiac mai mare.'],
    ['box', 'ctx', 'De ce scad fierul și zincul', 'În inflamație ficatul produce hepcidină, care sechestrează fierul în macrofage și scade absorbția intestinală. Bacteriile au nevoie de fier ca să se multiplice, așa că lipsa lui le frânează creșterea.'],
    ['box', 'tip', 'Structura răspunsului', 'Două liste clare: <b>consecințe sistemice</b> (cardiac, metabolic, neurologic) și <b>efecte benefice</b> (pe microorganism și pe apărarea gazdei).']
  ],
  plan: ['Consecințe sistemice: ↑ Tc; ↑ FC cu 8–12 bpm/°C.', 'Intensificarea metabolismului bazal; ↑ consumul energetic și de O₂.', 'Senzoriul: somn cu unde lente (neuroprotector), delir, convulsii febrile.', 'Efecte benefice asupra microorganismelor: distrugerea celulelor infectate, împiedicarea replicării virale, ↓ glucoză, inhibarea enzimelor și sintezelor proteice, ↓ Fe, Zn, Cu.', 'Efecte benefice asupra apărării: stimularea fagocitozei, intensificarea inflamației și a răspunsului imun specific (LT helper, interferon).'],
  cloze: [
    'În febră frecvența cardiacă crește cu aproximativ [[8-12|8 12|10]] bpm pentru fiecare grad Celsius.',
    'Febra intensifică metabolismul [[bazal]] și crește consumul energetic și de [[oxigen]].',
    'Febra intensifică somnul cu unde [[lente]], care are efect [[neuroprotector]].',
    'La valori mari ale temperaturii pot apărea delir și [[convulsii febrile|convulsii]].',
    'Febra distruge celulele infectate și împiedică [[replicarea virală|replicarea virala|replicarea]].',
    'Febra stimulează [[fagocitoza]] și reduce rezervele de [[glucoză|glucoza]].',
    'Febra scade concentrația plasmatică de [[fier|fe]], [[zinc|zn]] și [[cupru|cu]], oligoelemente esențiale multiplicării bacteriilor.',
    'Temperatura crescută intensifică răspunsul imun specific, crescând activitatea limfocitelor [[T helper|th|t helper cd4]] și sinteza de [[interferon]].'
  ],
  rub: [
    ['Consecințe sistemice', [
      ['↑ temperatura centrală', ['temperatur+central', 'temperatur+cresc']],
      ['↑ frecvența cardiacă cu ~8–12 bpm/°C', ['tahicard', 'frecvent+cardiac', 'puls', '8+12', 'bpm'], 2],
      ['Intensificarea metabolismului bazal', ['metabolism+bazal', 'metabolism'], 2],
      ['↑ consumul energetic și de oxigen', ['consum+oxigen', 'consum+energ', 'consum+=o'], 1],
      ['Somn cu unde lente (efect neuroprotector)', ['unde lente', 'somn', 'neuroprotect'], 1],
      ['Delir', ['delir'], 1],
      ['Convulsii febrile', ['convulsi'], 1]
    ]],
    ['Efecte benefice', [
      ['Distruge celulele infectate', ['distrug+celul', 'celul+infectat']],
      ['Împiedică replicarea virală', ['replicar+viral', 'replicar', 'multiplicar+viral'], 2],
      ['Stimulează fagocitoza', ['fagocit'], 2],
      ['Reduce rezervele de glucoză', ['glucoz'], 1],
      ['Inhibă activitatea enzimatică și sintezele proteice', ['enzim', 'sintez+protei']],
      ['Scade Fe, Zn, Cu plasmatice', ['=fe', 'fier', '=zn', 'zinc', 'cupru', 'oligoelem'], 2],
      ['Intensifică reacția inflamatorie', ['intensific+inflam', 'reacti+inflam']],
      ['Intensifică răspunsul imun specific: LT helper, interferon', ['helper', 'interferon', '=ifn', 'imun+specific', 'limfocit']]
    ]]
  ],
  chains: []
};

Q[13] = {
  ch: 'febra', s: 'Febra non-infecțioasă: definiție și baze', src: 'Febra, slide 12–15',
  sum: 'Febra non-infecțioasă e declanșată de pirogeni endogeni, în condiții patologice cu substrat comun imunologic. Când organismul nu mai diferențiază antigenele self de non-self apare un sindrom inflamator, cu eliberare de citokine proinflamatorii care declanșează febra. Pirogenii endogeni sunt produși de monocite și macrofage (IL-1, TNF-α, IFN-α și IFN-γ, cei mai puternici; IL-6, cel mai slab, dar persistent) și de celule tumorale.',
  learn: [
    ['def', 'Febra non-infecțioasă', 'Febra de etiologie non-infecțioasă, <b>declanșată de pirogeni endogeni</b>, legată de condiții patologice care au ca <b>substrat comun mecanisme mediate imunologic</b>.'],
    ['flow', 'noninf'],
    ['p', 'Eșuarea abilității organismului de a diferenția antigenele <b>non-self</b> de antigenele <b>self</b> este urmată de un <b>sindrom inflamator</b>, cu eliberarea în circulație a unor citokine proinflamatorii, al căror efect comun este reacția febrilă. <b>Alterarea răspunsului imun este placa turnantă a bolilor autoimune.</b>'],
    ['ul', 'Imunitatea nespecifică implicată', ['substanțe umorale: lizozimul și factorii complementului', 'fagocite: macrofagele, derivate din monocitele migrate în țesuturi', 'neutrofilele: atrase de chemokine (chemotactism), declanșează procesul inflamator prin eliberare de mediatori']],
    ['tbl', 'Pirogenii endogeni', ['Sursa', 'Ce produce', 'Observație'], [
      ['Monocite, macrofage', 'IL-1, TNF-α, IFN (α, γ)', '<b>Cei mai puternici</b> pirogeni endogeni'],
      ['Diverse celule', 'IL-6', '<b>Cel mai slab</b> pirogen, dar cu <b>efect persistent</b>'],
      ['Celule tumorale', 'citokine pirogene', 'Leucemii, limfom Hodgkin, diverse neoplazii; și în bolile autoimune']
    ]]
  ],
  plan: ['Definiție: febră declanșată de pirogeni endogeni; substrat comun imunologic.', 'Eșecul diferențierii self / non-self → sindrom inflamator → citokine proinflamatorii → febră; alterarea răspunsului imun e placa turnantă a bolilor autoimune.', 'Imunitatea nespecifică: lizozim, complement, macrofage, neutrofile (chemotactism, mediatori).', 'Pirogenii endogeni: IL-1, TNF-α, IFN (cei mai puternici, din monocite/macrofage); IL-6 (cel mai slab, persistent); celule tumorale.'],
  cloze: [
    'Febra non-infecțioasă este declanșată de pirogeni [[endogeni]].',
    'Condițiile patologice care produc febră non-infecțioasă au ca substrat comun mecanisme mediate [[imunologic]].',
    'Eșuarea abilității de a diferenția antigenele [[non-self|nonself|straine]] de antigenele [[self|proprii]] este urmată de un sindrom [[inflamator]].',
    'Alterarea răspunsului imun este placa turnantă a bolilor [[autoimune]].',
    'Neutrofilele sunt atrase de chemokine prin [[chemotactism|chemotaxie]].',
    'Cei mai puternici pirogeni endogeni sunt [[IL-1|il 1]], TNF-α și IFN, produși de monocite și [[macrofage]].',
    '[[IL-6|il 6]] este cel mai slab pirogen, dar are efect [[persistent]].',
    'Pirogeni endogeni pot fi produși și de celulele [[tumorale]].'
  ],
  rub: [
    ['Definiție', [
      ['Declanșată de pirogeni endogeni', ['endogen'], 2],
      ['Substrat comun: mecanisme mediate imunologic', ['imunolog', 'imun'], 2]
    ]],
    ['Baze fiziopatologice', [
      ['Eșecul diferențierii self / non-self', ['self', 'propri+strain', 'toleranț', 'toleran'], 2],
      ['Apare un sindrom inflamator', ['sindrom+inflam', 'inflam'], 1],
      ['Citokine proinflamatorii eliberate în circulație → febră', ['citokin'], 2],
      ['Alterarea răspunsului imun: placa turnantă a bolilor autoimune', ['autoimun'], 1],
      ['Imunitatea nespecifică: lizozim, complement', ['lizozim', 'complement']],
      ['Macrofage și neutrofile (chemotactism, mediatori)', ['neutrofil', 'chemotact', 'chemokin', 'macrofag']]
    ]],
    ['Pirogenii endogeni', [
      ['IL-1, TNF-α, IFN: cei mai puternici (monocite, macrofage)', ['=il 1', '=tnf', '=ifn', 'interferon'], 2],
      ['IL-6: cel mai slab, efect persistent', ['=il 6', 'persistent'], 1],
      ['Celule tumorale (leucemii, limfom Hodgkin, neoplazii)', ['tumor', 'neoplaz', 'leucemi', 'hodgkin']]
    ]]
  ],
  chains: ['noninf']
};

Q[14] = {
  ch: 'febra', s: 'Tipurile de febră non-infecțioasă', src: 'Febra, slide 16–17',
  sum: '(1) „Drug fever”: ascensiune termică înaltă cu frison după unele medicamente (beta-lactamine, difenilhidantoină, procainamidă), cu eozinofilie și leucocitoză tranzitorie. (2) Reacțiile posttransfuzionale: febră la 30–180 de minute după sânge sau derivate, precedată de frison, cu leucocitoză tranzitorie până la 12 ore. (3) Febra în context neoplazic (inclusiv limfomul Hodgkin): etiologie plurifactorială (tumora, hipersensibilitate, grefă contra gazdă, tromboze), citokine proinflamatorii din răspunsul gazdei.',
  learn: [
    ['tbl', 'Tipurile de febră non-infecțioasă', ['Tip', 'Declanșator', 'Caracteristici'], [
      ['<b>„Drug fever”</b> (febra medicamentoasă)', 'Medicamente: antibiotice beta-lactamine, difenilhidantoina, procainamida', 'Ascensiune termică înaltă însoțită de frison; <b>eozinofilie</b> și leucocitoză tranzitorie'],
      ['<b>Reacțiile posttransfuzionale</b>', 'Administrarea de sânge sau derivate', 'Febra apare la <b>30–180 de minute</b>, precedată de frison; leucocitoză tranzitorie, până la <b>12 ore</b> posttransfuzional'],
      ['<b>Febra în context neoplazic</b> (inclusiv limfomul Hodgkin)', 'Etiologie plurifactorială: tumora, reacții de hipersensibilitate, rejet grefă contra gazdă, tromboze', 'Limfom Hodgkin, leucemie acută, cancer renal, sarcoame osoase, tumori mamare, pulmonare, de colon, metastaze hepatice; citokinele proinflamatorii din răspunsul gazdei la tumoră declanșează febra']
    ]],
    ['box', 'tip', 'Ce diferențiază tipurile', '„Drug fever” → <b>eozinofilie</b> (indiciu de mecanism alergic). Posttransfuzional → <b>fereastra de 30–180 min</b>. Neoplazic → <b>plurifactorial</b>, prin citokine.'],
    ['box', 'ctx', 'Legătura cu Î13', 'Toate sunt febre prin pirogeni endogeni: o reacție imunologică (hipersensibilitate la medicament sau la componentele sângelui) sau răspunsul gazdei la tumoră duce la eliberarea de IL-1, TNF-α, IL-6.']
  ],
  plan: ['Enumeră: „drug fever”, reacțiile posttransfuzionale, febra în context neoplazic.', 'Drug fever: febră înaltă cu frison după beta-lactamine, difenilhidantoină, procainamidă; eozinofilie, leucocitoză tranzitorie.', 'Posttransfuzional: după sânge/derivate, la 30–180 min, precedată de frison; leucocitoză până la 12 h.', 'Neoplazic: plurifactorial (tumoră, hipersensibilitate, grefă contra gazdă, tromboze); exemple de tumori; citokinele gazdei declanșează febra.'],
  cloze: [
    'Febra medicamentoasă („drug fever”) este o ascensiune termică înaltă însoțită de [[frison]].',
    '„Drug fever” apare după antibiotice din clasa [[beta-lactaminelor|beta lactamine|betalactamine]], difenilhidantoină sau [[procainamidă|procainamida]].',
    'În „drug fever” apar [[eozinofilie|eozinofilia]] și leucocitoză [[tranzitorie]].',
    'În reacțiile posttransfuzionale febra apare într-un interval de 30 până la [[180]] de minute și este precedată de [[frison]].',
    'Leucocitoza tranzitorie posttransfuzională poate dura până la [[12]] ore.',
    'Febra în context neoplazic are etiologie [[plurifactorială|plurifactoriala|multifactoriala]].',
    'Febra neoplazică e declanșată de citokinele [[proinflamatorii]] rezultate din răspunsul gazdei la prezența tumorii.'
  ],
  rub: [
    ['Drug fever', [
      ['Febra medicamentoasă („drug fever”)', ['drug', 'medicament'], 2],
      ['Ascensiune termică înaltă cu frison', ['frison', 'inalt']],
      ['Beta-lactamine, difenilhidantoină, procainamidă', ['beta lactam', 'betalactam', 'difenilhidant', 'fenitoin', 'procainamid'], 1],
      ['Eozinofilie și leucocitoză tranzitorie', ['eozinofil'], 2]
    ]],
    ['Reacții posttransfuzionale', [
      ['Reacțiile posttransfuzionale (sânge sau derivate)', ['transfuz', 'posttransfuz', 'post transfuz'], 2],
      ['Febra apare la 30–180 de minute', ['=30+=180', '=180', '30+minut'], 1],
      ['Precedată de frison', ['preced+frison', 'frison']],
      ['Leucocitoză tranzitorie până la 12 ore', ['=12+or', '12 ore', 'leucocitoz']]
    ]],
    ['Context neoplazic', [
      ['Febra în context neoplazic (inclusiv limfomul Hodgkin)', ['neoplaz', 'tumor', 'cancer', 'hodgkin'], 2],
      ['Etiologie plurifactorială: tumora, hipersensibilitate, grefă contra gazdă, tromboze', ['plurifact', 'multifact', 'hipersensib', 'graft', 'grefa', 'tromboz']],
      ['Exemple: leucemie acută, cancer renal, sarcoame, metastaze hepatice', ['leucemi', 'renal', 'sarcom', 'metastaz']],
      ['Mecanism: citokine proinflamatorii din răspunsul gazdei', ['citokin'], 1]
    ]]
  ],
  chains: []
};

Q[15] = {
  ch: 'febra', s: 'Efectele biologice ale pirogenilor', src: 'Febra, slide 6–8, 18–19',
  sum: 'Pirogenii exogeni acționează prin intermediul pirogenilor endogeni, ale căror efecte sunt: centrale (↑ PGE2 în celulele endoteliale ale OVLT, ↑ pragul centrului termoreglator pe calea AMPc și GMPc → febră), periferice (↑ apărarea specifică și nespecifică) și proinflamatorii (PGE2, tromboxan, PAF; mobilizarea leucocitelor și moleculele de adeziune; IL-8; fagocitoză și proteine de fază acută; ↓ Fe și Zn; activarea LB și LT, IFN antivirali).',
  learn: [
    ['box', 'note', 'Atenție la formulare', 'Întrebarea spune „pirogenii <b>exogeni</b>”, dar slide-urile 18–19 se numesc „Efectele biologice ale pirogenilor <b>endogeni</b>”. Pirogenii exogeni își produc efectele prin pirogenii endogeni pe care îi induc. La examen începe cu această legătură (o frază), apoi descrie cele trei grupe de efecte din slide.'],
    ['p', '<b>Pirogenii exogeni</b> sunt componente structurale ale agenților patogeni: lipopolizaharidul (LPZ, endotoxina) din peretele bacteriilor Gram-negative și componentele Gram-pozitivilor (acid lipoteicoic, peptidoglicani), cei mai puternici pirogeni. LPZ este opsonizat de complement și fagocitat de macrofage, care eliberează <b>pirogenii endogeni</b> (IL-1, TNF-α, IL-6, IFN).'],
    ['flow', 'pyroEffects'],
    ['cols', [
      ['1. Efectele centrale', ['↑ eliberarea mediatorilor de origine lipidică (<b>PGE2</b>) în celulele endoteliale ale <b>OVLT</b>, care vascularizează centrul hipotalamic anterior (aria preoptică)', '↑ <b>pragul centrului termoreglator</b> pe calea <b>AMPc și GMPc</b> → reacția febrilă']],
      ['2. Efectele periferice', ['↑ capacitatea de apărare <b>specifică și nespecifică</b> a organismului']],
      ['3. Efectul proinflamator', ['stimulează eliberarea mediatorilor lipidici: <b>PGE2, tromboxan (Tx), PAF</b>', '↑ mobilizarea leucocitelor din măduva hematogenă și expresia <b>moleculelor de adeziune</b> pe endoteliu', 'induc sinteza de <b>IL-8</b> (factor chemotactic pentru monocite și neutrofile)', 'activează fagocitoza, ↑ sinteza hepatică a <b>proteinelor de fază acută</b>', '↓ concentrația de <b>Fe și Zn</b> (necesare multiplicării bacteriene)', 'activează limfocitele B și T, stimulează producția de <b>IFN antivirali</b>']]
    ]]
  ],
  plan: ['Pirogenii exogeni (LPZ, acid lipoteicoic, peptidoglicani) induc, prin macrofage, pirogenii endogeni (IL-1, TNF-α, IL-6, IFN).', 'Efecte centrale: PGE2 în OVLT, ↑ pragul termoreglator (AMPc, GMPc) → febră.', 'Efecte periferice: ↑ apărarea specifică și nespecifică.', 'Efect proinflamator: PGE2, Tx, PAF; mobilizarea leucocitelor, molecule de adeziune; IL-8; fagocitoză, proteine de fază acută; ↓ Fe, Zn; activarea LB, LT, IFN antivirali.'],
  cloze: [
    'Pirogenii exogeni acționează prin intermediul pirogenilor [[endogeni]], eliberați de [[macrofage|macrofagele|monocite]].',
    'Efectele centrale constau în creșterea eliberării de [[PGE2|pge 2|prostaglandina e2]] la nivelul celulelor endoteliale ale [[OVLT]].',
    'Pragul centrului termoreglator crește pe calea [[AMPc|amp ciclic]] și [[GMPc|gmp ciclic]].',
    'Efectele periferice cresc capacitatea de apărare [[specifică|specifica]] și nespecifică a organismului.',
    'Efectul proinflamator stimulează eliberarea de PGE2, [[tromboxan|tx]] și [[PAF|factor activator plachetar]].',
    'Pirogenii endogeni cresc expresia moleculelor de [[adeziune]] la nivelul endoteliului vascular.',
    'Pirogenii endogeni induc sinteza de [[IL-8|il 8]], factor chemotactic pentru monocite și neutrofile.',
    'Pirogenii endogeni cresc sinteza hepatică a proteinelor de fază [[acută|acuta]].',
    'Pirogenii endogeni scad concentrația de [[fier|fe]] și [[zinc|zn]], necesare multiplicării bacteriene.'
  ],
  rub: [
    ['Legătura exogen → endogen', [
      ['Pirogenii exogeni (LPZ, componente microbiene)', ['exogen', 'lipopoliz', '=lps', '=lpz', 'endotoxin'], 1],
      ['acționează prin pirogenii endogeni (IL-1, TNF-α, IL-6) eliberați de macrofage', ['endogen', 'macrofag', 'citokin'], 2]
    ]],
    ['Efecte centrale', [
      ['↑ PGE2 în celulele endoteliale ale OVLT', ['=pge 2', 'prostaglandin'], 2],
      ['OVLT / aria preoptică, hipotalamus anterior', ['=ovlt', 'preoptic', 'hipotalam']],
      ['↑ pragul centrului termoreglator pe calea AMPc și GMPc → febră', ['=ampc', '=gmpc', 'ampc', 'gmpc', 'prag', 'febr'], 2]
    ]],
    ['Efecte periferice', [
      ['↑ capacitatea de apărare specifică și nespecifică', ['aparar', 'specific+nespecific', 'nespecific'], 2]
    ]],
    ['Efect proinflamator', [
      ['Eliberarea de PGE2, tromboxan, PAF', ['tromboxan', '=tx', '=paf', 'activator+plachet'], 1],
      ['↑ mobilizarea leucocitelor din măduvă', ['mobiliz+leucocit', 'leucocit', 'maduv'], 1],
      ['↑ expresia moleculelor de adeziune pe endoteliu', ['adeziun'], 1],
      ['Induc sinteza de IL-8 (chemotactic)', ['=il 8', 'chemotact'], 1],
      ['Activează fagocitoza', ['fagocit']],
      ['↑ sinteza hepatică a proteinelor de fază acută', ['faza acut', 'proteine+acut', 'reactant'], 1],
      ['↓ Fe și Zn', ['=fe', 'fier', '=zn', 'zinc'], 1],
      ['Activează LB și LT, IFN antivirali', ['limfocit', '=lb', '=lt', 'interferon', '=ifn', 'antiviral']]
    ]]
  ],
  chains: []
};

Q[16] = {
  ch: 'febra', s: 'Limfomul Hodgkin: definiție, clasificare, simptome B', src: 'Febra, slide 20',
  sum: 'Neoplazie limfoidă malignă de origine B; forma clasică are celule Hodgkin și Reed–Sternberg într-un fond inflamator reactiv bogat în celule non-neoplazice; afectează predominant ganglionii, dar și splina, ficatul, măduva. Clasificare: LH clasic (scleroză nodulară, celularitate mixtă, bogat în limfocite, sărac în limfocite) și LH nodular cu predominanță limfocitară. Simptome B: febră inexplicabilă > 38°C, transpirații nocturne profuze, scădere ponderală neintenționată > 10% în 6 luni.',
  learn: [
    ['def', 'Limfomul Hodgkin', 'Neoplazie limfoidă malignă, de <b>origine B</b>. Limfomul Hodgkin clasic se caracterizează prin prezența <b>celulelor tumorale Hodgkin și Reed–Sternberg</b>, într-un <b>fond inflamator reactiv</b> bogat în celule non-neoplazice. Afectează predominant <b>nodulii limfatici</b>, dar poate interesa și splina, ficatul sau măduva osoasă.'],
    ['fig', 'hodgkinTree'],
    ['ol', 'Simptomele B', ['<b>Febră inexplicabilă peste 38°C</b>', '<b>Transpirații nocturne profuze</b>', '<b>Scădere ponderală neintenționată de peste 10% în ultimele 6 luni</b>']],
    ['box', 'ctx', 'De ce „fond inflamator”', 'Celulele Reed–Sternberg sunt puține; cea mai mare parte a ganglionului e formată din celule reactive (limfocite T, macrofage, eozinofile) atrase de citokinele tumorale. Tot aceste citokine (IL-1, IL-6, TNF-α) explică simptomele B; TNF-α se mai numește cașectină, de la cașexie.'],
    ['box', 'tip', 'Cifrele din simptomele B', '<b>38°C</b> · <b>nocturne</b> · <b>10% în 6 luni</b>.']
  ],
  plan: ['Definiție: neoplazie limfoidă malignă de origine B; celule Hodgkin și Reed–Sternberg într-un fond inflamator reactiv; ganglioni, splină, ficat, măduvă.', 'Clasificare: LH clasic (scleroză nodulară, celularitate mixtă, bogat în limfocite, sărac în limfocite) și LH nodular cu predominanță limfocitară.', 'Simptome B: febră > 38°C inexplicabilă, transpirații nocturne profuze, scădere ponderală > 10% în 6 luni.'],
  cloze: [
    'Limfomul Hodgkin este o neoplazie limfoidă [[malignă|maligna]], de origine [[B]].',
    'Limfomul Hodgkin clasic se caracterizează prin prezența celulelor Hodgkin și [[Reed-Sternberg|reed sternberg]].',
    'Celulele tumorale se găsesc într-un fond [[inflamator]] reactiv, bogat în celule non-neoplazice.',
    'Limfomul Hodgkin afectează predominant [[nodulii limfatici|ganglionii limfatici|ganglionii]], dar poate interesa și splina, ficatul sau măduva osoasă.',
    'Subtipurile limfomului Hodgkin clasic sunt: scleroză [[nodulară|nodulara]], celularitate [[mixtă|mixta]], bogat în limfocite și sărac în limfocite.',
    'A doua formă este limfomul Hodgkin nodular cu [[predominanță limfocitară|predominanta limfocitara]].',
    'Simptomele B sunt: febră inexplicabilă peste [[38]]°C, transpirații [[nocturne]] profuze și scădere ponderală neintenționată de peste [[10]]% în ultimele [[6]] luni.'
  ],
  rub: [
    ['Definiție', [
      ['Neoplazie limfoidă malignă', ['neoplaz', 'malign', 'limfom'], 1],
      ['de origine B', ['=b+origin', 'origin+=b', 'limfocit+=b', 'celul+=b'], 2],
      ['Celule Hodgkin și Reed–Sternberg', ['reed', 'sternberg'], 2],
      ['Fond inflamator reactiv, celule non-neoplazice', ['fond+inflam', 'reactiv', 'non neoplaz', 'neneoplaz'], 1],
      ['Afectează ganglionii, splina, ficatul, măduva', ['nodul+limf', 'gangli', 'splin', 'ficat', 'maduv']]
    ]],
    ['Clasificare', [
      ['LH clasic', ['clasic'], 1],
      ['Scleroză nodulară', ['scleroz'], 1],
      ['Celularitate mixtă', ['celularit'], 1],
      ['Bogat în limfocite / sărac în limfocite', ['bogat', 'sarac'], 1],
      ['LH nodular cu predominanță limfocitară', ['predominant'], 2]
    ]],
    ['Simptome B', [
      ['Febră inexplicabilă peste 38°C', ['=38', 'febr+inexplic', 'febr'], 2],
      ['Transpirații nocturne profuze', ['nocturn', 'transpirat', 'sudorat'], 2],
      ['Scădere ponderală > 10% în 6 luni', ['ponderal', 'greutat', '=10', 'slabi'], 2]
    ]]
  ],
  chains: []
};

Q[17] = {
  ch: 'febra', s: 'Mecanismul fiziopatologic al limfomului Hodgkin', src: 'Febra, slide 21',
  sum: 'Celulele Hodgkin / Reed–Sternberg secretă citokine și chemokine care recrutează și activează celulele inflamatorii din micromediul tumoral (limfocite T, macrofage, eozinofile). Acestea eliberează citokine pirogene (IL-1, IL-6, TNF-α), care cresc sinteza de PGE2 hipotalamic și temperatura de referință; urmează vasoconstricție periferică, frison, termogeneză și febră.',
  learn: [
    ['flow', 'hodgkin'],
    ['box', 'tip', 'Cheia mecanismului', 'Febra din limfomul Hodgkin este <b>non-infecțioasă</b>: pirogenii sunt <b>endogeni</b> (IL-1, IL-6, TNF-α), produși de tumoră și de celulele inflamatorii pe care tumora le atrage. De aici se continuă exact ca în febra clasică: PGE2 → setpoint ↑ → vasoconstricție, frison → febră.'],
    ['box', 'ctx', 'Și celelalte simptome B', 'Aceleași citokine explică transpirațiile nocturne (defervescențe repetate, cu vasodilatație și sudorație) și scăderea ponderală (TNF-α și IL-6 cresc catabolismul).']
  ],
  plan: ['Celulele Hodgkin / Reed–Sternberg secretă citokine și chemokine.', 'Recrutarea și activarea celulelor inflamatorii din micromediu: LT, macrofage, eozinofile.', 'Eliberarea de citokine pirogene: IL-1, IL-6, TNF-α.', 'Sinteză crescută de PGE2 hipotalamic → ↑ setpoint.', 'Vasoconstricție periferică, frison, termogeneză → febră.'],
  cloze: [
    'Mecanismul începe cu celulele tumorale Hodgkin / [[Reed-Sternberg|reed sternberg]].',
    'Celulele tumorale secretă [[citokine]] și [[chemokine]].',
    'Sunt recrutate celulele inflamatorii din micromediul tumoral: limfocite [[T]], [[macrofage]] și [[eozinofile]].',
    'Se eliberează citokine pirogene: IL-1, [[IL-6|il 6]] și [[TNF-α|tnf alfa|tnf]].',
    'Crește sinteza de [[PGE2|pge 2|prostaglandina e2]] la nivel hipotalamic.',
    'Crește temperatura de referință a setpoint-ului [[hipotalamic]].',
    'Organismul răspunde prin vasoconstricție periferică, [[frison]] și termogeneză, rezultând febra.'
  ],
  rub: [
    ['Mecanism', [
      ['Celulele Hodgkin / Reed–Sternberg', ['reed', 'sternberg', 'hodgkin'], 2],
      ['Secretă citokine și chemokine', ['chemokin', 'citokin'], 1],
      ['Recrutează și activează celulele inflamatorii din micromediul tumoral', ['recrut', 'micromedi', 'activ+inflam'], 2],
      ['Limfocite T, macrofage, eozinofile', ['eozinofil', 'macrofag', 'limfocit+=t'], 1],
      ['Eliberarea de citokine pirogene: IL-1, IL-6, TNF-α', ['=il 1', '=il 6', '=tnf', 'pirogen'], 2],
      ['Sinteză crescută de PGE2 hipotalamic', ['=pge 2', 'prostaglandin'], 2],
      ['Creșterea temperaturii de referință (setpoint)', ['setpoint', 'set point', 'referint', 'termostat'], 2],
      ['Vasoconstricție periferică, frison, termogeneză', ['vasoconstric', 'frison', 'termogenez'], 1],
      ['Febră', ['febr']]
    ]]
  ],
  chains: ['hodgkin']
};

Q[18] = {
  ch: 'febra', s: 'Febra în faringita streptococică', src: 'Febra, slide 22, 26–28',
  sum: 'Streptococcus pyogenes eliberează exotoxine (pirogeni exogeni), opsonizate de complement și fagocitate de macrofage (inclusiv celulele Kupffer), care eliberează pirogeni endogeni: IL-1α, IL-1β, IL-6, IL-8, IL-11, IFN-α2, IFN-γ, TNF-α și TNF-β. Aceștia acționează în aria preoptică și în OVLT și cresc valoarea de referință; termogeneza (vasoconstricție periferică, frison, ↑ metabolism bazal, glicoliză, tahicardie, ↑ debit cardiac) produce febra.',
  learn: [
    ['def', 'Faringita / angina streptococică', 'Infecție bacteriană cauzată de <b>Streptococcus pyogenes</b> (streptococul de grup A).'],
    ['flow', 'strepFever'],
    ['fig', 'strepScheme'],
    ['box', 'lp', 'Rolul benefic al temperaturii crescute (slide 28)', 'Intensifică reacția inflamatorie; intensifică răspunsul imun specific (↑ activitatea și proliferarea LT helper, sinteza de interferon); reduce rezervele de glucoză și scade Cu, Fe, Zn plasmatice → scade proliferarea virală și bacteriană.'],
    ['box', 'tip', 'Ce cere schema', 'Trei niveluri: <b>pirogeni exogeni</b> (exotoxine opsonizate, fagocitate de macrofage/celule Kupffer) → <b>pirogeni endogeni</b> (IL, IFN, TNF) → <b>hipotalamus</b> (aria preoptică, OVLT) → <b>termogeneză</b> (6 mecanisme) → febră.']
  ],
  plan: ['Definiție: infecție cu Streptococcus pyogenes (grup A).', 'Pirogeni exogeni: exotoxinele, opsonizate de complement și fagocitate de macrofage (celule Kupffer), care eliberează citokine.', 'Pirogeni endogeni: IL-1α, IL-1β, IL-6, IL-8, IL-11; IFN-α2, IFN-γ; TNF-α, TNF-β.', 'Hipotalamus: aria preoptică, OVLT → PGE2 → setpoint ↑.', 'Termogeneză: vasoconstricție periferică, frison, ↑ metabolism bazal, glicoliză, tahicardie, ↑ debit cardiac → febră.'],
  cloze: [
    'Faringita streptococică este cauzată de Streptococcus [[pyogenes]], streptococul de grup [[A]].',
    'Pirogenii exogeni sunt [[exotoxinele|exotoxine]] streptococice, opsonizate de [[complement]].',
    'Exotoxinele opsonizate sunt fagocitate de macrofage, inclusiv celulele [[Kupffer]], care eliberează citokine.',
    'Pirogenii endogeni sunt interleukinele (1α, 1β, 6, 8, 11), [[interferonul|interferon|ifn]] (α2, γ) și [[TNF|factorul de necroza tumorala]] (α, β).',
    'La nivelul hipotalamusului, citokinele acționează în aria [[preoptică|preoptica]] și în organul [[vascular]] al lamei terminale.',
    'Termogeneza se realizează prin vasoconstricție [[periferică|periferica]], [[frison]], intensificarea metabolismului bazal, stimularea [[glicolizei|glicoliza]], tahicardie și creșterea debitului cardiac.'
  ],
  rub: [
    ['Agentul', [
      ['Streptococcus pyogenes (grup A)', ['pyogenes', 'piogen', 'grup+=a', 'streptoc'], 2]
    ]],
    ['Pirogeni exogeni', [
      ['Exotoxine streptococice', ['exotoxin'], 2],
      ['Opsonizate de complement', ['opsoniz', 'complement'], 1],
      ['Fagocitate de macrofage (celule Kupffer)', ['macrofag', 'kupffer', 'fagocit'], 2],
      ['→ eliberare de citokine', ['citokin', 'eliber']]
    ]],
    ['Pirogeni endogeni', [
      ['Interleukine: IL-1α, IL-1β, IL-6, IL-8, IL-11', ['=il', 'interleukin'], 2],
      ['Interferon α2, γ', ['interferon', '=ifn'], 1],
      ['TNF-α și β', ['=tnf'], 1]
    ]],
    ['Hipotalamus', [
      ['Aria preoptică', ['preoptic'], 2],
      ['Organul vascular al laminei terminale (OVLT)', ['=ovlt', 'vascular+lam', 'lam+terminal', 'organ+vascular'], 2],
      ['PGE2 → creșterea valorii de referință', ['=pge 2', 'prostaglandin', 'setpoint', 'set point', 'referint']]
    ]],
    ['Termogeneză', [
      ['Vasoconstricție periferică', ['vasoconstric'], 1],
      ['Frison', ['frison'], 1],
      ['Intensificarea metabolismului bazal', ['metabolism'], 1],
      ['Stimularea glicolizei', ['glicoliz'], 1],
      ['Tahicardie, ↑ debitul cardiac', ['tahicard', 'debit+cardiac'], 1]
    ]]
  ],
  chains: ['strepFever']
};

Q[19] = {
  ch: 'febra', s: 'Mecanismul anginei streptococice (schema)', src: 'Febra, slide 22–25, 29–31',
  sum: 'Streptococcus pyogenes ajunge pe cale aerogenă în faringe, aderă la epiteliul amigdalian, se multiplică și eliberează exotoxine și enzime. Urmează inflamația acută locală (hiperemie, hipertrofie amigdaliană, exudat purulent), drenajul limfatic (adenopatie laterocervicală dureroasă) și răspunsul sistemic (febră înaltă, neutrofilie). Complicațiile sunt locale (otită, abces periamigdalian, sinuzită, limfadenită) și la distanță (RAA, glomerulonefrită post-streptococică).',
  learn: [
    ['box', 'note', 'Despre schemă', 'Schema din materialul disciplinei (slide 25) este o imagine pe care nu am primit-o. Mai jos e reconstruită din conținutul LP (definiție, examen obiectiv, paraclinic, complicații). Verific-o cu schema din material și scrie la examen varianta din material.'],
    ['flow', 'strepMech'],
    ['cols', [
      ['Clasificarea etiologică a faringitei (slide 23)', ['<b>virală</b> (cea mai comună, 70–90%): rinovirus, adenovirus, virus gripal, EBV (mononucleoza), coronavirus, HSV, Coxsackie (herpangina)', '<b>bacteriană</b>: streptococul de grup A, N. gonorrhoeae, C. diphtheriae, M. pneumoniae, C. pneumoniae', '<b>fungică</b>: Candida', 'alte cauze: alergeni, iritanți (fumatul), traumatisme, factori de mediu']],
      ['Clasificarea după durată (slide 24)', ['<b>acută</b>: sub 3 săptămâni; majoritatea se rezolvă singure (mai ales cele virale)', '<b>cronică</b>: peste 3 săptămâni; iritanți, infecții cronice, factori de mediu (fumatul)']]
    ]],
    ['ul', 'Diagnostic pozitiv (slide 29)', ['Anamneză: contact direct cu un caz confirmat de scarlatină', 'Examen obiectiv: hipertrofie amigdaliană, hiperemie amigdaliană cu depozite purulente, tumefierea ganglionilor laterocervicali, febră înaltă', 'Hemoleucogramă: neutrofilie (sugerează infecție bacteriană)', 'Evidențierea streptococului β-hemolitic de grup A: exudat faringian sau test rapid (RADT)']],
    ['box', 'lp', 'Evoluție, complicații, tratament (slide 31–32)', 'Antibioterapia orală, în doze adecvate, cel puțin 10 zile, are evoluție favorabilă și reduce agravarea și răspândirea; nu necesită confirmare bacteriologică post-tratament; unii rămân purtători cronici asimptomatici. Complicații locale imediate: otită medie supurată, limfadenită, abces periamigdalian, sinuzită. La distanță: reumatism articular acut, glomerulonefrită post-streptococică. Tratament: antibioterapie, antipiretice, antiinflamatoare, antiseptice locale, hidratare enterală și parenterală.']
  ],
  plan: ['Agentul: Streptococcus pyogenes (grup A); transmitere aerogenă.', 'Aderență la epiteliul faringo-amigdalian, multiplicare, exotoxine.', 'Inflamație acută locală: hiperemie, hipertrofie amigdaliană, depozite purulente.', 'Drenaj limfatic: adenopatie laterocervicală dureroasă.', 'Răspuns sistemic: pirogeni → febră înaltă; neutrofilie.', 'Complicații locale și la distanță (RAA, GNPS).'],
  cloze: [
    'Angina streptococică este produsă de Streptococcus pyogenes, streptococul β-hemolitic de grup [[A]].',
    'Transmiterea se face pe cale [[aerogenă|aeriana|aerogena]], prin picături Pflügge.',
    'Local apar hipertrofie amigdaliană și hiperemie amigdaliană cu depozite [[purulente]].',
    'Prin drenaj limfatic apare tumefierea ganglionilor [[laterocervicali|latero cervicali]].',
    'Hemoleucograma evidențiază [[neutrofilie|neutrofilia]], sugestivă pentru o infecție bacteriană.',
    'Complicațiile locale includ otita medie supurată și abcesul [[periamigdalian]].',
    'Complicațiile la distanță sunt reumatismul articular [[acut]] și glomerulonefrita [[post-streptococică|poststreptococica]].'
  ],
  rub: [
    ['Agent și poartă', [
      ['Streptococcus pyogenes, grup A (β-hemolitic)', ['pyogenes', 'grup+=a', 'streptoc', 'hemolit'], 2],
      ['Transmitere aerogenă / contact cu un caz (scarlatină)', ['aerogen', 'aerian', 'pflugge', 'scarlatin', 'contact']]
    ]],
    ['Mecanism local', [
      ['Aderența la epiteliul faringo-amigdalian, multiplicare', ['aderent', 'multiplic', 'coloniz']],
      ['Exotoxine / enzime streptococice', ['exotoxin', 'toxin', 'enzim']],
      ['Inflamație acută locală', ['inflam'], 2],
      ['Hiperemie și hipertrofie amigdaliană', ['hiperemi', 'hipertrofi'], 2],
      ['Depozite / exudat purulent', ['purulent', 'exudat'], 2],
      ['Adenopatie laterocervicală dureroasă', ['adenopat', 'gangli', 'laterocervic'], 2]
    ]],
    ['Răspuns sistemic', [
      ['Febră înaltă (pirogeni → PGE2 → setpoint)', ['febr'], 1],
      ['Neutrofilie', ['neutrofil'], 1]
    ]],
    ['Complicații', [
      ['Locale: otită medie supurată, abces periamigdalian, sinuzită, limfadenită', ['otit', 'abces', 'sinuzit', 'limfadenit']],
      ['La distanță: reumatism articular acut', ['reumatism', '=raa'], 1],
      ['La distanță: glomerulonefrită post-streptococică', ['glomerulonefrit'], 1]
    ]]
  ],
  chains: ['strepMech']
};

Q[20] = {
  ch: 'febra', s: 'Angina bacteriană vs angina virală', src: 'Febra, slide 29–30',
  sum: 'Angina virală: debut progresiv, rinoree seroasă (rar mucoasă) simultană cu febra, adenopatie regională nedureroasă, eritem discret, complicații otită, sinuzită. Angina bacteriană: debut brusc (într-o zi), rinoreea mucoasă precede febra, adenopatie regională dureroasă, eritem intens, complicații (în slide) afte, hepato-splenomegalie.',
  learn: [
    ['tbl', 'Diagnostic diferențial (slide 30)', ['Criteriu', 'Angina virală', 'Angina bacteriană'], [
      ['<b>Debut</b>', 'Progresiv', 'Brusc (într-o zi)'],
      ['<b>Rinoreea</b>', 'Seroasă, mai rar mucoasă; debutează <b>simultan</b> cu febra', 'Mucoasă; <b>precede</b> debutul febrei'],
      ['<b>Adenopatia regională</b>', '<b>Nedureroasă</b>', '<b>Dureroasă</b>'],
      ['<b>Eritemul</b>', 'Discret', 'Intens'],
      ['<b>Complicații</b>', 'Otită, sinuzită', 'Afte, hepato-splenomegalie (așa apare în slide)']
    ]],
    ['tbl', 'Elemente utile din alte slide-uri', ['Criteriu', 'Viral', 'Bacterian'], [
      ['Hemoleucogramă', 'Leucocitoză cu limfocitoză', 'Leucocitoză cu neutrofilie'],
      ['Febră', 'Moderată, adesea sub 38°C', 'Înaltă, adesea peste 38°C'],
      ['Reactanți de fază acută', 'Ușor crescuți sau normali', 'Crescuți (PCR, fibrinogen, procalcitonină)'],
      ['Faringe', '—', 'Hiperemie amigdaliană cu depozite purulente; RADT / exudat pozitiv pentru SGA']
    ]],
    ['box', 'tip', 'Cum scrii', 'Fă un tabel cu două coloane și cele cinci criterii din slide: <b>debut, rinoree, adenopatie, eritem, complicații</b>. Poți adăuga hemoleucograma (neutrofilie vs limfocitoză) ca argument paraclinic.']
  ],
  plan: ['Debut: progresiv (viral) vs brusc, într-o zi (bacterian).', 'Rinoreea: seroasă, simultană cu febra (viral) vs mucoasă, precede febra (bacterian).', 'Adenopatia regională: nedureroasă vs dureroasă.', 'Eritemul: discret vs intens.', 'Complicații: otită, sinuzită (viral) vs afte, hepato-splenomegalie (bacterian, conform slide-ului).', 'Opțional: limfocitoză vs neutrofilie.'],
  cloze: [
    'Angina virală are debut [[progresiv]], iar angina bacteriană are debut [[brusc]], într-o zi.',
    'În angina virală rinoreea este [[seroasă|seroasa]] și debutează [[simultan]] cu febra.',
    'În angina bacteriană rinoreea [[mucoasă|mucoasa]] [[precede]] debutul febrei.',
    'Adenopatia regională este [[nedureroasă|nedureroasa]] în angina virală și [[dureroasă|dureroasa]] în angina bacteriană.',
    'Eritemul este [[discret]] în angina virală și [[intens]] în angina bacteriană.',
    'Complicațiile anginei virale sunt otita și [[sinuzita]].',
    'Hemoleucograma arată neutrofilie în infecția bacteriană și [[limfocitoză|limfocitoza]] în infecția virală.'
  ],
  rub: [
    ['Debut', [
      ['Viral: debut progresiv', ['progresiv'], 2],
      ['Bacterian: debut brusc (într-o zi)', ['brusc'], 2]
    ]],
    ['Rinoree', [
      ['Viral: rinoree seroasă, simultan cu febra', ['seros', 'seroas', 'simultan'], 2],
      ['Bacterian: rinoreea mucoasă precede febra', ['preced', 'mucoas'], 2]
    ]],
    ['Adenopatie', [
      ['Viral: adenopatie nedureroasă', ['nedurero'], 2],
      ['Bacterian: adenopatie dureroasă', ['=dureroasa', '=dureros', 'adenopat+=dureroasa', 'adenopat+=dureros'], 2]
    ]],
    ['Eritem', [
      ['Viral: eritem discret', ['discret'], 1],
      ['Bacterian: eritem intens', ['intens'], 1]
    ]],
    ['Complicații', [
      ['Viral: otită, sinuzită', ['otit', 'sinuzit'], 1],
      ['Bacterian (slide): afte, hepato-splenomegalie', ['afte', 'hepato', 'splenomegal'], 1]
    ]],
    ['Paraclinic (bonus)', [
      ['Neutrofilie (bacterian) vs limfocitoză (viral)', ['neutrofil', 'limfocitoz']]
    ]]
  ],
  chains: []
};

;