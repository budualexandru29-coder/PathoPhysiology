/* ===== Capitolul 3: Sindromul inflamator (Î21–24) ===== */

Q[21] = {
  ch: 'inflam', s: 'Inflamația: definiție, scop, cauze', src: 'Sindromul inflamator, slide 2–3',
  sum: 'Inflamația este reacția de apărare a organismului și a țesuturilor sale la stimuli exogeni sau endogeni care pot provoca leziuni. Scopul: limitarea și repararea leziunilor și eliminarea cauzei. Cauze exogene: microorganisme (fungi, bacterii, virusuri, paraziți) și corpi străini (proteine străine, polen, cristale de azbest și siliciu, pulberi, iritanți inhalatori). Cauze endogene: produși ai distrucției tisulare (lezare mecanică, chimică, factori fizici: temperatură, UV, raze X, radioactivitate), celule tumorale, cristale precipitate (acid uric, oxalați și fosfat de calciu, colesterol).',
  learn: [
    ['def', 'Inflamația', 'Reacția de apărare a organismului și a țesuturilor sale la <b>stimuli exogeni sau endogeni</b> care pot provoca leziuni.'],
    ['def', 'Scopul', 'Să <b>limiteze și să repare leziunile</b> produse și să <b>elimine cauza</b> care a dus la apariția ei.'],
    ['fig', 'inflamCauses'],
    ['cols', [
      ['Cauze exogene', ['<b>Microorganisme</b> (fungi, bacterii, virusuri, paraziți): declanșează o reacție inițial localizată, apoi, prin depășirea mecanismelor locale de apărare, o reacție generalizată (sistemică)', '<b>Corpi străini</b>: proteine străine (polen, particule vegetale sau animale), cristale de azbest și siliciu, pulberi, iritanți inhalatori']],
      ['Cauze endogene', ['<b>Produși ai distrucției tisulare</b> prin lezare mecanică, chimică sau prin factori fizici (temperatură crescută, radiații UV, raze X, radioactivitate)', '<b>Celule tumorale</b>', '<b>Cristale precipitate</b> în organism: acid uric, oxalat de calciu, fosfat de calciu, colesterol; induc inflamație localizată sau generalizată']]
    ]],
    ['box', 'tip', 'Cum structurezi', 'Definiție → scop (limitare, reparare, eliminarea cauzei) → <b>exogene</b> (microorganisme, corpi străini) → <b>endogene</b> (distrucție tisulară, tumori, cristale). Dă câte un exemplu pentru fiecare.'],
    ['box', 'ctx', 'Exemple clinice', 'Cristale de acid uric: guta. Azbest și siliciu: azbestoza, silicoza. Colesterol: placa de aterom.']
  ],
  plan: ['Definiția: reacție de apărare la stimuli exogeni sau endogeni care pot produce leziuni.', 'Scopul: limitarea și repararea leziunilor, eliminarea cauzei.', 'Cauze exogene: microorganisme (local → sistemic), corpi străini (polen, azbest, siliciu, pulberi, iritanți).', 'Cauze endogene: distrucție tisulară (mecanică, chimică, fizică: temperatură, UV, raze X, radioactivitate), celule tumorale, cristale (acid uric, oxalați, fosfat de Ca, colesterol).'],
  cloze: [
    'Inflamația reprezintă reacția de [[apărare|aparare]] a organismului și a țesuturilor sale la stimuli [[exogeni]] sau [[endogeni]] care pot provoca leziuni.',
    'Scopul reacției inflamatorii este să [[limiteze]] și să [[repare]] leziunile produse și să elimine [[cauza]].',
    'Microorganismele declanșează o reacție inițial [[localizată|localizata|locala]], iar ulterior, prin depășirea mecanismelor locale, o reacție [[generalizată|generalizata|sistemica]].',
    'Corpii străini care pot declanșa inflamația includ polenul și cristalele de [[azbest]] și [[siliciu]].',
    'Cauzele endogene includ produșii rezultați din distrucția [[tisulară|tisulara]] prin lezare mecanică, chimică sau prin factori fizici.',
    'Factorii fizici includ temperatura crescută, radiațiile [[UV|ultraviolete]], razele [[X]] și radioactivitatea.',
    'Alte cauze endogene sunt celulele [[tumorale]] și cristalele precipitate: acid [[uric]], oxalați de calciu, fosfat de calciu și [[colesterol]].'
  ],
  rub: [
    ['Definiție și scop', [
      ['Reacție de apărare a organismului și țesuturilor', ['aparar'], 2],
      ['La stimuli exogeni sau endogeni care pot produce leziuni', ['stimul', 'lezi'], 1],
      ['Scop: limitarea și repararea leziunilor', ['limit', 'repar'], 2],
      ['Scop: eliminarea cauzei', ['elimin+cauz', 'elimin'], 1]
    ]],
    ['Cauze exogene', [
      ['Microorganisme: fungi, bacterii, virusuri, paraziți', ['microorganism', 'bacteri', 'virus', 'fung', 'parazit'], 2],
      ['Reacție inițial localizată, apoi generalizată (sistemică)', ['generaliz', 'sistemic']],
      ['Corpi străini', ['corp+strain', 'corpi strain'], 2],
      ['Polen, proteine străine, azbest, siliciu, pulberi, iritanți inhalatori', ['polen', 'azbest', 'silici', 'pulber', 'iritant'], 1]
    ]],
    ['Cauze endogene', [
      ['Produși ai distrucției tisulare', ['distructi+tisul', 'distrug+tesut', 'lezar', 'necroz'], 2],
      ['Lezare mecanică, chimică, factori fizici (temperatură, UV, raze X, radioactivitate)', ['mecanic', 'chimic', 'fizic', '=uv', 'raze', 'radioactiv'], 1],
      ['Celule tumorale', ['tumor'], 1],
      ['Cristale precipitate: acid uric, oxalați, fosfat de calciu, colesterol', ['cristal', 'uric', 'oxalat', 'colesterol'], 2]
    ]]
  ],
  chains: []
};

Q[22] = {
  ch: 'inflam', s: 'Reacțiile de fază acută și complementul', src: 'Sindromul inflamator, slide 3–6',
  sum: 'Reacțiile inflamatorii sunt locale (semnele celsiene: dolor, tumor, rubor, calor) și generale (de fază acută): febra (pirogeni endogeni pe termostatul hipotalamic), leucocitoza cu deviere la stânga (produși ai inflamației pe măduvă) și sinteza hepatică a proteinelor plasmatice (reactanți de fază acută, pro- și antiinflamatori). Mecanism: antigenul activează mastocitele/bazofilele → degranulare (histamină, IL-8, factori chemotactici); Ca²⁺ activează fosfolipaza A2 → acid arahidonic → prostaglandine, leucotriene, PAF; vasodilatație, permeabilitate, durere. Complementul: C3b + C5–C9 formează MAC (liza patogenului); C3a, C4a, C5a (anafilatoxine) atrag și activează macrofagele.',
  learn: [
    ['cols', [
      ['Reacții locale', ['autolimitate', 'semnele celsiene: <b>dolor, tumor, rubor, calor</b> (+ functio laesa)']],
      ['Reacții generale (de fază acută)', ['<b>febra</b>', '<b>leucocitoza</b>', '<b>stimularea sintezei proteinelor plasmatice</b>']]
    ]],
    ['tbl', 'Reacțiile generale (de fază acută)', ['Reacția', 'Mecanismul'], [
      ['<b>Febra</b>', 'Acțiunea pirogenilor endogeni asupra termostatului hipotalamic, a cărui valoare de referință e setată mai sus'],
      ['<b>Leucocitoza</b>', 'Acțiunea unor produși ai inflamației asupra măduvei hematogene: <b>„devierea la stânga a formulei leucocitare”</b> (apar forme imature)'],
      ['<b>Sinteza proteinelor plasmatice</b>', 'Mai ales în ficat; mult crescută în fazele precoce; proteine pro- și antiinflamatorii, numite <b>„reactanți de fază acută”</b>']
    ]],
    ['flow', 'acutePhase'],
    ['h', 'Rolul sistemului complement'],
    ['flow', 'complement'],
    ['p', 'Mediatorii proinflamatori au <b>efecte sistemice</b>: cerebral (oboseală, somnolență), hipotalamic (febră), pe măduva hematogenă (eliberarea de leucocite imature, adică devierea la stânga) și metabolic (stimularea lipolizei și a reacțiilor catabolice).'],
    ['box', 'note', 'O greșeală din slide', 'Printre mediatorii eliberați de mastocite, slide-ul 4 scrie „exotoxina”. Probabil e vorba de <b>eotaxină</b> (factor chemotactic pentru eozinofile); exotoxinele sunt produse de bacterii.'],
    ['box', 'tip', 'Structura răspunsului', '1) Local vs general. 2) Cele trei reacții de fază acută. 3) Mecanismul: mastocit → histamină; PLA2 → acid arahidonic → PG, LT, PAF → vasodilatație, permeabilitate, durere. 4) Complementul: MAC (liză) și anafilatoxine (chemotactism).']
  ],
  plan: ['Reacții locale (semnele celsiene) vs generale (de fază acută).', 'Febra: pirogeni endogeni → termostat hipotalamic.', 'Leucocitoza: deviere la stânga.', 'Proteinele de fază acută: sinteză hepatică, pro- și antiinflamatoare.', 'Mecanismul: mastocite/bazofile → degranulare (histamină, IL-8); Ca²⁺ → PLA2 → acid arahidonic → PG, LT, PAF.', 'Vasodilatație (eritem, căldură, marginație prin selectine), permeabilitate (diapedeză, exudat), nociceptori (durere).', 'Complementul: C3b + C5–C9 → MAC → liza; C3a, C4a, C5a → chemotactism, activarea macrofagelor.', 'Efecte sistemice: oboseală, febră, leucocite imature, lipoliză, catabolism.'],
  cloze: [
    'Reacțiile inflamatorii locale se caracterizează prin semnele [[celsiene]]: dolor, tumor, rubor și [[calor]].',
    'Reacțiile generale de fază acută sunt febra, [[leucocitoza]] și stimularea sintezei proteinelor [[plasmatice]].',
    'Leucocitoza apare prin acțiunea produșilor inflamației asupra măduvei hematogene, cu [[devierea la stânga|deviere la stanga]] a formulei leucocitare.',
    'Proteinele plasmatice ale inflamației sunt sintetizate în principal în [[ficat]] și se numesc reactanți de [[fază acută|faza acuta]].',
    'Complexul antigen-anticorp determină degranularea rapidă a [[mastocitelor|mastocite]], cu eliberarea de [[histamină|histamina]].',
    'În prezența calciului se activează fosfolipaza [[A2|a 2]], care scindează acidul [[arahidonic]] din membranele celulare.',
    'Din acidul arahidonic rezultă prostaglandine, [[leucotriene]] și [[PAF|factor activator plachetar]].',
    'IL-4 activează endoteliul și determină migrarea [[selectinelor]] în lumen, cu marginație [[leucocitară|leucocitara]].',
    'Creșterea permeabilității endoteliale favorizează [[diapedeza]] leucocitelor și formarea exudatului inflamator.',
    'Fracțiunea [[C3b|c 3 b]] polimerizează C5–C9 și formează complexul de atac [[membranar]].',
    'Anafilatoxinele C3a, C4a și C5a acționează prin [[chemotactism|chemotaxie]] și activează [[macrofagele|macrofage]].'
  ],
  rub: [
    ['Local vs general', [
      ['Reacții locale: semnele celsiene (dolor, tumor, rubor, calor)', ['celsian', 'dolor', 'rubor', 'calor', 'tumor'], 1],
      ['Reacții generale = de fază acută', ['faza acut'], 1]
    ]],
    ['Reacțiile de fază acută', [
      ['Febra (pirogeni endogeni pe termostatul hipotalamic)', ['febr'], 2],
      ['Leucocitoza', ['leucocitoz'], 2],
      ['Devierea la stânga a formulei leucocitare', ['deviere', 'stanga', 'imatur'], 1],
      ['Sinteza hepatică a proteinelor plasmatice (reactanți de fază acută)', ['protein+plasm', 'reactant', 'ficat', 'hepatic'], 2]
    ]],
    ['Mecanism', [
      ['Activarea mastocitelor / bazofilelor', ['mastocit', 'bazofil'], 2],
      ['Degranulare: histamină, IL-8, factori chemotactici', ['histamin', 'degranul'], 1],
      ['Ca²⁺ activează fosfolipaza A2', ['fosfolipaz'], 1],
      ['Acid arahidonic → prostaglandine, leucotriene, PAF', ['arahidon', 'leucotrien', 'prostaglandin', '=paf'], 2],
      ['Vasodilatație: eritem, ↑ temperatura locală, flux încetinit', ['vasodilat'], 1],
      ['Marginație leucocitară (IL-4, selectine)', ['marginat', 'selectin'], 1],
      ['↑ permeabilitate: diapedeză, exudat, tumefacție', ['permeabil', 'hiperpermeabil', 'diapedez', 'exudat'], 1],
      ['Nociceptori → durere', ['nocicept', 'durer']]
    ]],
    ['Complement', [
      ['C3b + C5–C9 → complexul de atac membranar', ['atac membranar', '=mac', '=c 3 b', 'c 5+c 9'], 2],
      ['Liza patogenului', ['liz'], 1],
      ['Anafilatoxinele C3a, C4a, C5a', ['anafilatoxin', '=c 3 a', '=c 5 a'], 1],
      ['Chemotactism, activarea macrofagelor', ['chemotact', 'macrofag'], 1]
    ]],
    ['Efecte sistemice', [
      ['Oboseală, somnolență, lipoliză, catabolism', ['obosea', 'somnolent', 'lipoliz', 'catabol']]
    ]]
  ],
  chains: ['acutePhase']
};

Q[23] = {
  ch: 'inflam', s: 'Hipersensibilitatea de tip I și II', src: 'Sindromul inflamator, slide 7–9',
  sum: 'Tipul I: precedat de sensibilizare la primul contact; LB și LTH2 eliberează IL-4 (proliferarea LB antigen-specifice) și IL-5 (eozinofile). Reacția imediată (minute): degranularea mastocitelor cuplate cu IgE → histamină, proteaze, leucotriene, prostaglandine, citokine. Reacția întârziată (ore): eozinofile, neutrofile, IgG. Manifestări: rinită alergică, astm, simptome digestive, cutanate, șoc anafilactic. Tipul II (citotoxic): antigen pe celule sau pe matricea extracelulară, haptene pe celule sanguine; la a doua expunere IgM și IgG opsonizează, activează complementul și NK → citoliză (reacția posttransfuzională, sindromul Goodpasture).',
  learn: [
    ['fig', 'hsTable'],
    ['h', 'Tipul I'],
    ['flow', 'hs1'],
    ['ul', 'Manifestările tipului I (slide 8)', ['edem al mucoasei cu hipersecreție: <b>rinita alergică</b>', '<b>bronhospasm</b>: astm', 'reacții gastrointestinale: durere abdominală, greață, vomă, diaree (pentru înlăturarea antigenului)', 'reacții tegumentare: prurit, tumefiere, urticarie, dermatită atopică (ex. veninul de albină)', 'hipotensiune și <b>șoc anafilactic</b>, mai ales când alergenul pătrunde parenteral']],
    ['h', 'Tipul II'],
    ['flow', 'hs2'],
    ['box', 'tip', 'Diferența esențială I vs II', 'Tipul I: <b>IgE pe mastocite</b>, mediatori solubili, minute. Tipul II: <b>IgM/IgG pe celula-țintă</b>, complement și NK, distrugerea celulei.']
  ],
  plan: ['Tipul I: sensibilizare la primul contact.', 'LB + LTH2: IL-4 (LB antigen-specifice), IL-5 (eozinofile); IgE.', 'Reacția imediată (minute): degranularea mastocitelor cu IgE → histamină, proteaze, LT, PG, citokine.', 'Reacția întârziată (ore): eozinofile, neutrofile, IgG.', 'Manifestări: rinită alergică, astm, GI, urticarie/dermatită atopică, șoc anafilactic.', 'Tipul II (citotoxic): antigen pe celule / matrice; haptene pe celule sanguine.', 'A doua expunere: IgM, IgG → opsonizare, complement, NK → citoliză. Exemple: reacția posttransfuzională, sindromul Goodpasture.'],
  cloze: [
    'Reacția de hipersensibilitate de tip I este precedată de [[sensibilizarea|sensibilizare]] la primul contact cu alergenul.',
    'LB și [[TH2|th 2|limfocitele th2]] cooperează și eliberează IL-4 și [[IL-5|il 5]].',
    'IL-5 are rol în diferențierea [[eozinofilelor|eozinofile]].',
    'Reacția imediată apare în [[minute]] și constă în degranularea mastocitelor cuplate cu [[IgE|ig e]].',
    'Mastocitele eliberează [[histamină|histamina]], proteaze, leucotriene, prostaglandine și citokine.',
    'Reacția întârziată apare după câteva [[ore]] și este mediată de eozinofile, neutrofile și [[IgG|ig g]].',
    'Bronhospasmul din hipersensibilitatea de tip I se manifestă ca [[astm]].',
    'Când alergenul pătrunde parenteral poate apărea [[șocul anafilactic|soc anafilactic|socul anafilactic]].',
    'Hipersensibilitatea de tip II se mai numește [[citotoxică|citotoxica]].',
    'În tipul II, la a doua expunere se secretă IgM și IgG, care activează [[complementul|complement]] și limfocitele [[NK]].',
    'Exemple de hipersensibilitate de tip II sunt reacția [[posttransfuzională|posttransfuzionala]] și sindromul [[Goodpasture]].'
  ],
  rub: [
    ['Tipul I', [
      ['Sensibilizare la primul contact cu alergenul', ['sensibiliz'], 2],
      ['LB și LTH2 cooperează; IL-4 și IL-5', ['th 2', '=il 4', '=il 5'], 1],
      ['IgE pe mastocite', ['=ige', 'ig e'], 2],
      ['Reacția imediată (minute): degranularea mastocitelor', ['imediat', 'degranul', 'mastocit'], 2],
      ['Histamină, proteaze, leucotriene, prostaglandine', ['histamin', 'leucotrien', 'proteaz'], 1],
      ['Reacția întârziată (ore): eozinofile, neutrofile, IgG', ['intarziat', 'eozinofil'], 1],
      ['Manifestări: rinită alergică, astm, GI, urticarie', ['rinit', 'astm', 'bronhospasm', 'urticari', 'prurit'], 1],
      ['Șoc anafilactic (alergen parenteral)', ['anafilact', 'soc'], 1]
    ]],
    ['Tipul II', [
      ['Reacție citotoxică', ['citotox'], 2],
      ['Antigen pe celule / matrice extracelulară; haptene pe celule sanguine', ['hapten', 'matric', 'celul+sanguin'], 1],
      ['A doua expunere: IgM și IgG', ['=igm', '=igg', 'ig m', 'ig g'], 2],
      ['Opsonizare, activarea complementului', ['opsoniz', 'complement'], 1],
      ['Limfocite NK citotoxice → citoliză', ['=nk', 'citoliz', 'natural killer'], 1],
      ['Exemple: reacția posttransfuzională, sindromul Goodpasture', ['transfuz', 'posttransfuz', 'goodpasture'], 2]
    ]]
  ],
  chains: ['hs1', 'hs2']
};

Q[24] = {
  ch: 'inflam', s: 'Hipersensibilitatea de tip III și IV', src: 'Sindromul inflamator, slide 10–11',
  sum: 'Tipul III: formarea și depunerea complexelor imune circulante (Ag-Ac, IgM și IgG); activează complementul, macrofagele, granulocitele și trombocitele; antigenul în exces formează complexe mici, solubile, care se depun în membrana glomerulară, articulații, tegument → glomerulonefrită, artralgii, febră, urticarie, limfadenită. Tipul IV (întârziat): susținut de LTH1, LT citotoxice și macrofage, maxim la 4 zile; declanșat de proteine ale patogenilor (virusuri, TBC, lepră, fungi), proteine străine (gliadina) și haptene (medicamente, metale, cosmetice); antigenul prezentat LTH (5 zile) stimulează monocitele și, prin IFN-γ, macrofagele → inflamație cu distrugere tisulară (TBC, lepră, rejet).',
  learn: [
    ['fig', 'hsTable'],
    ['h', 'Tipul III'],
    ['flow', 'hs3'],
    ['h', 'Tipul IV'],
    ['flow', 'hs4'],
    ['box', 'tip', 'Diferența esențială III vs IV', 'Tipul III: <b>anticorpi</b> (IgM, IgG) în <b>complexe imune</b> care se depun și activează complementul. Tipul IV: <b>fără anticorpi</b>, mediat de <b>celule</b> (LTH1, LT citotoxice, macrofage), cu maxim la <b>4 zile</b>.'],
    ['box', 'ctx', 'Legătura cu angina streptococică', 'Glomerulonefrita post-streptococică (complicație din Î19) e un exemplu clasic de hipersensibilitate de tip III: complexele antigen streptococic-anticorp se depun în glomerul.']
  ],
  plan: ['Tipul III: formarea și depunerea complexelor imune circulante (Ag-Ac); aglutinare prin IgM și IgG.', 'Activează complementul, macrofagele, granulocitele, trombocitele.', 'Antigen în exces → complexe mici, solubile → depunere în membrana glomerulară, articulații, tegument → glomerulonefrită, artralgii, febră, urticarie, limfadenită.', 'Tipul IV: LTH1, LT citotoxice, macrofage; întârziat, maxim la 4 zile.', 'Declanșatori: patogeni (virusuri, TBC, lepră, fungi), gliadina (boala celiacă), haptene (medicamente, metale, cosmetice).', 'Macrofagul fagocitează și prezintă antigenul LTH (5 zile) în limfonoduli; proliferare limfocitară; IFN-γ activează macrofagele → distrugere tisulară (TBC, lepră, rejet de organ).'],
  cloze: [
    'Hipersensibilitatea de tip III se datorează formării și depunerii [[complexelor imune|complexe imune]] circulante.',
    'Antigenele sunt aglutinate prin [[IgM|ig m]] și IgG.',
    'Complexele imune activează sistemul [[complementului|complement]], macrofagele, granulocitele și trombocitele.',
    'Antigenele în exces formează complexe imune mici, [[solubile]], care se depun la nivelul membranei [[glomerulare]], articulațiilor și tegumentului.',
    'Manifestările tipului III includ [[glomerulonefrita|glomerulonefrita|glomerulonefrite]], dureri articulare, febră, urticarie și limfadenită.',
    'Hipersensibilitatea de tip IV este susținută de limfocitele [[TH1|th 1]], limfocitele T citotoxice și [[macrofage]].',
    'Tipul IV atinge intensitatea maximă la [[4]] zile, fiind o hipersensibilitate [[întârziată|intarziata]].',
    'Tipul IV poate fi declanșat de gliadină, în boala [[celiacă|celiaca]].',
    'Macrofagele activate prin [[IFN-γ|ifn gama|interferon gama]] declanșează o reacție inflamatorie cu distrugere tisulară masivă.',
    'Exemple pentru tipul IV sunt tuberculoza, lepra și [[rejetul|rejet]] de organ.'
  ],
  rub: [
    ['Tipul III', [
      ['Formarea și depunerea complexelor imune circulante (Ag-Ac)', ['complex+imun', 'complex+antigen', 'ag ac'], 2],
      ['Aglutinare prin IgM și IgG', ['=igm', '=igg', 'ig m', 'ig g'], 1],
      ['Activează complementul, macrofagele, granulocitele, trombocitele', ['complement', 'granulocit', 'trombocit'], 1],
      ['Antigen în exces → complexe mici, solubile, circulante', ['exces', 'solubil', 'mic'], 1],
      ['Depunere în membrana glomerulară, articulații, tegument', ['depun', 'glomerul', 'articul'], 2],
      ['Glomerulonefrită, artralgii, febră, urticarie, limfadenită', ['glomerulonefrit', 'urticari', 'limfadenit', 'artralg', 'dureri articul'], 1]
    ]],
    ['Tipul IV', [
      ['Mediat de LTH1, LT citotoxice, macrofage', ['th 1', 'citotox', 'macrofag', 'limfocit+=t'], 2],
      ['Întârziat: maxim la 4 zile', ['intarziat', '4 zile', '=4'], 2],
      ['Declanșat de patogeni (virusuri, TBC, lepră, fungi)', ['tubercul', '=tbc', 'lepr', 'fung'], 1],
      ['Proteine străine (gliadina, boala celiacă), haptene (medicamente, metale, cosmetice)', ['gliadin', 'celiac', 'hapten', 'metal', 'cosmetic'], 1],
      ['Antigenul fagocitat de macrofag e prezentat LTH (5 zile, limfonoduli)', ['prezent', 'limfonod', 'gangli'], 1],
      ['IFN-γ activează macrofagele; formarea de monocite', ['=ifn', 'interferon', 'monocit'], 1],
      ['Distrugere tisulară masivă: TBC, lepră, rejet de organ', ['distrug+tesut', 'distrus', 'rejet'], 1]
    ]]
  ],
  chains: ['hs3', 'hs4']
};

;