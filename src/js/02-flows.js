/* ===== Cascadele (schemele pas cu pas), toate într-un loc =====
   t = titlul pasului (scurt) · d = detaliu · z = unde se petrece (apare când se schimbă)
   e = verbul de pe săgeata care intră în pas · w = „de ce?” · k = start | end · x = explicație suplimentară
   side = inhibitor desenat lângă pas · br = ramuri în paralel · ord = ordinea pentru exercițiul „Cascadă” */

/* ---------- Termoreglare ---------- */
FLOWS.hyper39 = {
  t: 'Hipertermia sub 39°C: cascada hemodinamică',
  steps: [
    { t: 'Mediu cald sau efort fizic intens', z: 'Cauza', k: 'start', w: 'Aportul sau producția de căldură depășesc capacitatea termolizei. Valoarea de referință hipotalamică rămâne ~37°C.' },
    { t: 'Termoliza activată la maximum', d: 'hipotalamusul comandă pierderea de căldură', z: 'Hipotalamus', e: 'Tc > 37°C', w: 'Temperatura reală depășește valoarea de referință, deci hipotalamusul anterior pornește toate mecanismele de pierdere a căldurii.' },
    { z: 'Piele', br: [
      [{ t: 'Vasodilatație cutanată', d: 'sângele cald e dus spre piele', w: 'Căldura se cedează prin radiație, convecție și conducție. Patul vascular periferic se lărgește mult.' }],
      [{ t: 'Sudorație intensă', d: 'evaporarea răcește pielea', w: 'Fiecare litru de sudoare înseamnă apă și sodiu pierdute din plasmă.' }]
    ] },
    { t: '↓ Volumul circulant', d: 'pierderi prin sudoare + sânge reținut în venele pielii', z: 'Circulație', w: 'Volumul plasmatic scade, iar o parte din sânge stagnează în venele dilatate.' },
    { t: '↓ Întoarcerea venoasă și ↓ RVP', d: 'rezistența vasculară periferică scade prin vasodilatație', w: 'Mai puțin sânge revine la inimă (preîncărcare scăzută).' },
    { t: '↓ Debitul cardiac și ↓ TA', d: 'preîncărcare mică → volum-bătaie mic', w: 'Presiunea arterială = debit cardiac × rezistență periferică, iar ambii factori scad.' },
    { t: 'Hipoperfuzie de organ', z: 'Organe', w: 'Creierul, mușchii și rinichii primesc mai puțin sânge oxigenat.' },
    { t: 'Slăbiciune, vertij, greață, alterarea conștienței', z: 'Clinic', k: 'end', e: 'se manifestă prin', w: 'Expresia clinică a hipoperfuziei cerebrale și musculare.' }
  ],
  ord: ['Expunere la căldură sau efort intens', 'Vasodilatație și sudorație intensă', 'Reducerea volumului circulant', '↓ întoarcerea venoasă și ↓ rezistența periferică', '↓ debitul cardiac și ↓ presiunea arterială', 'Hipoperfuzie de organ', 'Slăbiciune, vertij, greață, alterarea conștienței']
};

FLOWS.brain40 = {
  t: 'La 40–40,5°C: răcirea selectivă a creierului',
  steps: [
    { t: 'Temperatura centrală 40–40,5°C', z: 'Cauza', k: 'start' },
    { t: 'Manifestări nervoase', d: 'prin modificarea substanței cerebrale', z: 'SNC', w: 'Neuronii sunt foarte sensibili la căldură; funcția lor se alterează primii.' },
    { t: 'Sudorație intensă la nivelul capului', d: 'termoliza crește la extremitatea cefalică', z: 'Tegumentul capului', e: 'organismul răspunde', w: 'Organismul își protejează creierul crescând sudorația pe față și scalp.' },
    { t: 'Pierdere de căldură prin evaporare', d: 'sângele din venele superficiale se răcește', w: 'Evaporarea sudorii răcește tegumentul și sângele venos de sub el.' },
    { t: 'Sângele venos rece ajunge în sinusul cavernos', d: 'prin sistemul venos endocranian (vene oftalmice, emisare)', z: 'Vene endocraniene', e: 'drenează', w: 'Venele feței și scalpului comunică cu sinusurile durale.' },
    { t: 'Se răcește sângele arterial spre creier', d: 'prin conducție, în jurul arterei carotide interne', z: 'Sinusul cavernos', e: 'conducție', k: 'end', w: 'Sângele venos rece scaldă artera carotidă internă și preia căldură din sângele care urcă spre creier.' }
  ],
  ord: ['Temperatura centrală 40–40,5°C', 'Manifestări nervoase (substanța cerebrală afectată)', 'Sudorație intensă la nivelul capului', 'Pierdere de căldură prin evaporare', 'Sânge venos răcit ajunge în sinusul cavernos', 'Conducție: se răcește sângele arterial spre creier']
};

FLOWS.hm = {
  t: 'Hipertermia malignă',
  steps: [
    { t: 'Defect genetic: receptorul pentru rianodină', d: 'transportorul sarcoplasmic al calciului', z: 'Teren genetic', k: 'start', w: 'Receptorul pentru rianodină este canalul prin care reticulul sarcoplasmic eliberează Ca²⁺. Defectul e moștenit și nu dă simptome până la contactul cu agentul declanșator.' },
    { t: 'Anestezice inhalatorii halogenate sau miorelaxante depolarizante', d: 'ex. halotan, sevofluran; succinilcolină', z: 'Declanșator', e: 'la expunerea la', w: 'Aceste substanțe deschid anormal canalul defect.' },
    { t: 'Eliberare necontrolată de Ca²⁺', d: 'din reticulul sarcoplasmic în citoplasmă', z: 'Fibra musculară', x: 1, w: 'Calciul intracelular crescut menține fibrele contractate.' },
    { t: 'Contracție susținută și hipermetabolism', d: 'consum masiv de ATP: căldură, CO₂, acid lactic', x: 1 },
    { t: 'Hipertermie severă', d: 'producția de căldură depășește termoliza', z: 'Organism', k: 'end', x: 1 }
  ],
  ord: ['Defect genetic: receptorul pentru rianodină', 'Anestezic halogenat / miorelaxant depolarizant', 'Eliberare necontrolată de Ca²⁺', 'Contracție susținută, hipermetabolism', 'Hipertermie severă']
};

FLOWS.hypoMech = {
  t: 'Mecanismele generale ale hipotermiei',
  steps: [
    { t: 'Expunere prelungită la frig', d: 'mai ales la teren cu metabolism scăzut', z: 'Cauza', k: 'start', w: 'Vârstnici, nou-născuți, alcoolici, hipotiroidism, malnutriție etc.: rată metabolică scăzută, glicoliză insuficientă.' },
    { z: 'Balanța termică', br: [
      [{ t: '↑ Termoliza', d: 'pierdere excesivă de căldură', w: 'Mediu rece, vânt, apă rece, îmbrăcăminte insuficientă.' }],
      [{ t: '↓ Termogeneza', d: 'producție inadecvată de căldură', w: 'Metabolism bazal scăzut, rezerve mici, frison ineficient.' }]
    ] },
    { t: 'Tc < 35°C', d: 'mecanismele de producere și conservare sunt depășite', w: 'Pragul care definește hipotermia.' },
    { t: 'Vasoconstricție periferică și tahicardie', d: '↑ consumul de O₂, ↓ glicogenul hepatic', z: 'Răspuns inițial', e: 'organismul compensează', w: 'Organismul păstrează căldura (vasoconstricție) și o produce (frison, glicoliză), cu cost energetic mare.' },
    { t: 'Epuizarea resurselor', d: '↓ rata reacțiilor metabolismului bazal', z: 'Decompensare', w: 'Enzimele lucrează mai lent la rece: se produce și mai puțină căldură (cerc vicios).' },
    { t: 'Alterarea microcirculației', d: '↑ vâscozitatea sângelui, acidoză metabolică', w: 'Sângele vâscos curge greu; țesuturile slab oxigenate produc acid lactic.' },
    { t: 'Bradicardie, aritmii, asistolie', d: 'potențiale de acțiune prelungite, ↓ conductibilitatea', z: 'Cord', w: 'Canalele ionice se mișcă mai lent; conducerea prin miocard încetinește.' },
    { t: 'Moarte celulară', z: 'Celulă', k: 'end' }
  ],
  ord: ['Expunere prelungită la frig', '↑ termoliza sau ↓ termogeneza', 'Temperatura centrală < 35°C', 'Vasoconstricție, tahicardie, ↑ consum de O₂', 'Epuizarea resurselor, ↓ metabolismul bazal', '↑ vâscozitate, acidoză metabolică', 'Bradicardie, aritmii, asistolie', 'Moarte celulară']
};

FLOWS.hypoStages = {
  t: 'Stadiile hipotermiei',
  steps: [
    { t: '1. Agitație (excitație)', d: 'frison, glicoliză → hiperglicemie, ↑ O₂, vasoconstricție, tahicardie; conștiență păstrată', z: '35–32°C', k: 'start', w: 'Organismul luptă: produce și păstrează căldura cu orice cost. Eventual confuzie, apatie.' },
    { t: '2. Epuizare (inhibiție)', d: 'hipoglicemie; tulburări de ritm și conducere; halucinații → comă', z: '32–28°C', e: 'rezervele se consumă', w: 'Sursele energetice se termină; miocardul și creierul cedează primele.' },
    { t: '3. Paralizie (faza critică)', d: 'comă fără reflexe pupilare; fibrilație ventriculară, apnee; cristale de gheață → moarte celulară', z: 'sub 28°C', e: 'rezerve epuizate', k: 'end', w: 'Cristalele de gheață distrug peretele celular: modificări ireversibile.' }
  ],
  ord: ['Agitație (excitație): 32–35°C, frison, hiperglicemie', 'Epuizare (inhibiție): 28–32°C, hipoglicemie, aritmii', 'Paralizie (faza critică): < 28°C, comă, fibrilație ventriculară, apnee']
};

FLOWS.hyper43 = {
  t: 'Tc 40,5–43°C: decompensarea',
  steps: [
    { t: 'Temperatura centrală 40,5–43°C', z: 'Cauza', k: 'start' },
    { t: 'Sistarea activității centrului termoreglator', d: 'centrul hipotalamic e lezat de căldură', z: 'Hipotalamus', w: 'Termoliza nu mai este comandată.' },
    { t: 'Termoliza se oprește', d: 'piele uscată, fierbinte; temperatura urcă necontrolat', z: 'Organism', x: 1, w: 'Fără comanda hipotalamică sudorația scade; căldura se acumulează: cerc vicios.' },
    { t: 'Edem cerebral progresiv', z: 'Creier', w: 'Căldura lezează celulele și barierele vasculare; apa trece în țesutul cerebral.' },
    { t: 'Șoc termic', d: 'cu insuficiență multiplă de organ (slide 7)', z: 'Organism', k: 'end' }
  ],
  ord: ['Tc 40,5–43°C', 'Sistarea activității centrului termoreglator', 'Termoliza se oprește, temperatura crește', 'Edem cerebral progresiv', 'Șoc termic, insuficiență multiplă de organ']
};

FLOWS.coldLocal = {
  t: 'Efectele locale ale frigului',
  steps: [
    { t: 'Expunere locală la frig', z: 'Cauza', k: 'start' },
    { z: 'Țesut', br: [
      [
        { t: 'Vasoconstricție, flux încetinit', d: 'calea vasculară', w: 'Vasele extremităților se contractă ca să păstreze căldura; sângele curge lent.' },
        { t: 'Microtromboze', d: 'staza favorizează trombii', w: 'Staza și vâscozitatea crescută favorizează trombii în vasele mici.' },
        { t: 'Necroze', k: 'end', w: 'Țesutul rămas fără irigație moare.' }
      ],
      [
        { t: 'Mediatori vasoactivi: histamina', d: 'calea umorală', w: 'Celulele lezate de frig și mastocitele eliberează histamină.' },
        { t: 'Hiperpermeabilitate capilară', w: 'Histamina lărgește joncțiunile dintre celulele endoteliale.' },
        { t: 'Edeme', d: 'apa trece în interstițiu', k: 'end' }
      ]
    ] },
    { t: 'Degerături, necroză grăsoasă', d: 'la expunere prelungită', z: 'Expunere prelungită', k: 'end', w: 'Ischemia, trombozele și edemul se adună în leziuni grave.' }
  ],
  ord: ['Expunere locală la frig', 'Vasoconstricție, flux sanguin încetinit', 'Microtromboze', 'Necroze', 'Expunere prelungită: degerături, necroză grăsoasă']
};

/* ---------- Febra ---------- */
FLOWS.feverCascade = {
  t: 'Mecanismul febrei: de la pirogen la frison',
  steps: [
    { t: 'Pirogeni exogeni', d: 'LPZ (endotoxina) din Gram-negativi; acid lipoteicoic, peptidoglicani din Gram-pozitivi', z: 'Focarul infecțios', k: 'start', w: 'Componente structurale ale agenților patogeni; endotoxinele sunt cei mai puternici pirogeni.' },
    { t: 'Opsonizare și fagocitoză', d: 'complementul marchează, macrofagele înglobează', e: 'sunt preluați de', w: 'Macrofagele care fagocitează LPZ se activează.' },
    { t: 'Pirogeni endogeni: IL-1, TNF-α, IL-6, IFN', d: 'citokine eliberate de macrofagele activate', z: 'Sânge', e: 'eliberează', w: 'Citokinele proinflamatorii circulă până la creier.' },
    { t: 'OVLT și aria preoptică', d: 'structuri circumventriculare, fără barieră hematoencefalică', z: 'Creier', e: 'ajung la', w: 'Capilarele OVLT sunt permeabile, așa că citokinele acționează direct pe endoteliul de aici.' },
    { t: 'Sinteza de PGE2', d: 'în endoteliul OVLT, prin ciclooxigenază (COX)', e: 'induc', side: { t: 'Aspirina inhibă COX-1 și COX-2' }, w: 'PGE2 este mediatorul final al febrei la nivel hipotalamic.' },
    { t: 'Setpoint-ul crește', d: 'pe calea AMPc (și GMPc) în neuronii hipotalamusului anterior', z: 'Hipotalamus', e: 'acționează pe', w: 'Valoarea de referință e mutată în sus; temperatura reală devine „prea mică”.' },
    { z: 'Efectori', e: 'Tc < noul setpoint', br: [
      [{ t: 'Vasoconstricție cutanată', d: 'conservă căldura; senzație de frig', w: 'Fluxul sanguin cutanat scade, tegumentele se răcesc.' }],
      [{ t: 'Frison', d: 'contracții musculare involuntare: termogeneză', w: 'Activitatea mușchilor scheletici produce căldură.' }]
    ] },
    { t: 'Febră', k: 'end' }
  ],
  ord: ['Pirogeni exogeni (LPZ)', 'Opsonizare și fagocitoză de către macrofage', 'Eliberarea de pirogeni endogeni (IL-1, TNF-α, IL-6)', 'Acțiune pe OVLT și aria preoptică', 'Sinteza de PGE2', '↑ AMPc: setpoint-ul crește', 'Vasoconstricție și frison', 'Febră']
};

FLOWS.noninf = {
  t: 'Febra non-infecțioasă',
  steps: [
    { t: 'Declanșator imunologic', d: 'eșecul diferențierii self / non-self, tumoră, medicament, transfuzie', z: 'Cauza', k: 'start', w: 'Nu există un microb: declanșatorul e o reacție imună (autoimunitate, hipersensibilitate) sau o tumoră.' },
    { t: 'Sindrom inflamator mediat imunologic', d: 'placa turnantă a bolilor autoimune', z: 'Țesut', w: 'Alterarea răspunsului imun întreține inflamația.' },
    { t: 'Neutrofile, monocite, macrofage activate', d: 'neutrofilele atrase prin chemotactism eliberează mediatori', e: 'recrutează' },
    { t: 'Pirogeni endogeni', d: 'IL-1, TNF-α, IFN (cei mai puternici); IL-6 (slab, persistent)', z: 'Sânge', e: 'eliberează', w: 'Și celulele tumorale pot produce pirogeni.' },
    { t: 'PGE2 → setpoint ↑', z: 'Hipotalamus', w: 'Mecanismul central e identic cu cel al febrei infecțioase.' },
    { t: 'Febră', k: 'end' }
  ],
  ord: ['Eșecul toleranței self / tumoră / medicament', 'Sindrom inflamator mediat imunologic', 'Activarea neutrofilelor, monocitelor, macrofagelor', 'Eliberarea pirogenilor endogeni (IL-1, TNF-α, IFN)', 'PGE2 hipotalamic, setpoint ↑', 'Febră']
};

FLOWS.pyroEffects = {
  t: 'De la pirogenul exogen la efectele biologice',
  steps: [
    { t: 'Pirogen exogen', d: 'LPZ, componente microbiene', z: 'Focar', k: 'start', w: 'Acționează mai ales indirect, prin celulele imune ale gazdei.' },
    { t: 'Monocite și macrofage activate', e: 'activează' },
    { t: 'Pirogeni endogeni: IL-1, TNF-α, IL-6, IFN', z: 'Sânge', e: 'eliberează', w: 'Aceste citokine mediază efectele descrise în slide-urile 18–19.' },
    { z: 'Efecte', br: [
      [{ t: 'Centrale', d: 'PGE2 în OVLT; ↑ pragul termoreglator (AMPc, GMPc) → febră', k: 'end' }],
      [{ t: 'Periferice', d: '↑ apărarea specifică și nespecifică', k: 'end' }],
      [{ t: 'Proinflamatorii', d: 'PGE2, Tx, PAF; leucocite, adeziune, IL-8; proteine de fază acută; ↓ Fe, Zn; LB, LT, IFN', k: 'end' }]
    ] }
  ]
};

FLOWS.hodgkin = {
  t: 'Mecanismul febrei în limfomul Hodgkin',
  steps: [
    { t: 'Celule Hodgkin / Reed–Sternberg', d: 'celule B maligne, puține în ganglion', z: 'Ganglion', k: 'start' },
    { t: 'Secreție de citokine și chemokine', e: 'produc', w: 'Celulele tumorale își construiesc micromediul atrăgând celule inflamatorii.' },
    { t: 'Recrutarea celulelor inflamatorii', d: 'limfocite T, macrofage, eozinofile din micromediul tumoral', e: 'atrag și activează', w: 'Ele formează fondul inflamator reactiv al tumorii.' },
    { t: 'Citokine pirogene: IL-1, IL-6, TNF-α', z: 'Sânge', e: 'eliberează' },
    { t: 'Sinteză crescută de PGE2', z: 'Hipotalamus', e: 'induc', w: 'Același mecanism central ca în febra infecțioasă.' },
    { t: 'Setpoint-ul crește', d: 'temperatura de referință hipotalamică' },
    { t: 'Vasoconstricție, frison, termogeneză', z: 'Efectori', e: 'Tc < setpoint' },
    { t: 'Febră (simptom B)', k: 'end' }
  ],
  ord: ['Celule Hodgkin / Reed–Sternberg', 'Secreție de citokine și chemokine', 'Recrutarea LT, macrofagelor, eozinofilelor', 'Eliberarea de IL-1, IL-6, TNF-α', 'PGE2 hipotalamic crescut', 'Setpoint-ul crește', 'Vasoconstricție, frison, termogeneză', 'Febră']
};

FLOWS.strepFever = {
  t: 'Febra în faringita streptococică (după schema din slide 26)',
  steps: [
    { t: 'Streptococcus pyogenes', d: 'streptococ β-hemolitic de grup A, Gram-pozitiv', z: 'Faringe, amigdale', k: 'start' },
    { t: 'Pirogeni exogeni: exotoxinele', d: 'opsonizate de complement', e: 'eliberează' },
    { t: 'Fagocitoză de către macrofage', d: 'inclusiv celulele Kupffer', e: 'sunt preluate prin', w: 'Macrofagele activate devin sursa pirogenilor endogeni.' },
    { t: 'Pirogeni endogeni', d: 'IL-1α, IL-1β, IL-6, IL-8, IL-11 · IFN-α2, IFN-γ · TNF-α, TNF-β', z: 'Sânge', e: 'eliberează' },
    { t: 'Aria preoptică și OVLT', d: 'PGE2 → valoarea de referință crește', z: 'Hipotalamus', e: 'ajung la' },
    { t: 'Termogeneză', d: 'vasoconstricție periferică, frison, ↑ metabolism bazal, glicoliză, tahicardie, ↑ debit cardiac', z: 'Efectori' },
    { t: 'FEBRĂ', k: 'end' }
  ],
  ord: ['Streptococcus pyogenes în faringe', 'Exotoxine (pirogeni exogeni) opsonizate de complement', 'Fagocitoză de către macrofage / celule Kupffer', 'Pirogeni endogeni: IL-1, IL-6, IFN, TNF', 'Aria preoptică și OVLT', 'Termogeneză: vasoconstricție, frison, ↑ metabolism', 'Febră']
};

FLOWS.strepMech = {
  t: 'Mecanismul anginei streptococice (reconstruit din LP)',
  steps: [
    { t: 'Contaminare aerogenă', d: 'picături Pflügge, de la bolnav sau purtător (ex. scarlatină)', z: 'Transmitere', k: 'start' },
    { t: 'Aderența la epiteliul faringo-amigdalian', d: 'adezine: proteina M, acid lipoteicoic', z: 'Faringe, amigdale', x: 1 },
    { t: 'Multiplicare, exotoxine și enzime', d: 'exotoxine pirogene, streptolizine, hialuronidază, streptokinază', x: 1, w: 'Toxinele și enzimele lezează țesutul și ajută extinderea.' },
    { br: [
      [
        { t: 'Inflamație acută locală', d: 'vasodilatație, permeabilitate, neutrofile', w: 'Hiperemia, edemul și migrarea neutrofilelor produc tabloul local.' },
        { t: 'Hiperemie, hipertrofie amigdaliană, depozite purulente', k: 'end' }
      ],
      [
        { t: 'Drenaj limfatic regional', w: 'Antigenele și germenii ajung în ganglionii laterocervicali.' },
        { t: 'Adenopatie laterocervicală dureroasă', k: 'end' }
      ],
      [
        { t: 'Pirogeni → IL-1, IL-6, TNF-α → PGE2', w: 'Mecanismul febrei din Î18.' },
        { t: 'Febră înaltă, neutrofilie', k: 'end' }
      ]
    ] },
    { t: 'Complicații', d: 'locale: otită medie supurată, limfadenită, abces periamigdalian, sinuzită · la distanță: RAA, glomerulonefrită post-streptococică', z: 'Evoluție', k: 'end', w: 'Complicațiile la distanță sunt imunologice: anticorpi care reacționează încrucișat cu țesuturi proprii (RAA) sau complexe imune depuse în glomerul (GNPS, hipersensibilitate tip III).' }
  ],
  ord: ['Contaminare aerogenă (picături Pflügge)', 'Aderența streptococului la epiteliul faringian', 'Multiplicare, exotoxine și enzime', 'Inflamație acută locală', 'Hiperemie, hipertrofie amigdaliană, exudat purulent', 'Febră, neutrofilie', 'Complicații: locale și la distanță (RAA, GNPS)']
};

/* ---------- Inflamația ---------- */
FLOWS.acutePhase = {
  t: 'Declanșarea reacției inflamatorii',
  steps: [
    { t: 'Antigenul pătrunde în organism', z: 'Cauza', k: 'start' },
    { t: 'Activarea mastocitelor / bazofilelor', d: 'complexul antigen-anticorp de pe suprafața lor', z: 'Mastocit', w: 'Mastocitele sunt în țesuturi, bazofilele în sânge.' },
    { br: [
      [{ t: 'Degranulare', d: 'histamină, IL-8, factorul chemotactic al neutrofilelor', w: 'Mediatori preformați, eliberați în secunde.' }],
      [{ t: 'Ca²⁺ → fosfolipaza A2 → acid arahidonic', d: 'prostaglandine, leucotriene, PAF', w: 'Mediatori lipidici sintetizați din membrane, în minute.' }]
    ] },
    { t: 'Vasodilatație', d: 'eritem, ↑ temperatura locală, flux încetinit', z: 'Vas', e: 'mediatorii produc', w: 'Fluxul încetinit permite leucocitelor să atingă peretele vascular.' },
    { t: 'Marginație leucocitară', d: 'IL-4 activează endoteliul, selectinele ajung în lumen' },
    { t: '↑ Permeabilitate endotelială', d: 'diapedeză; extravazare de lichid → tumefacție, exudat' },
    { t: 'Durere', d: 'mediatorii stimulează nociceptorii', z: 'Țesut', k: 'end' }
  ],
  ord: ['Antigenul pătrunde în organism', 'Activarea mastocitelor / bazofilelor', 'Degranulare și activarea fosfolipazei A2', 'Vasodilatație: eritem, căldură, flux lent', 'Marginație leucocitară (selectine)', '↑ permeabilitate: diapedeză, exudat, tumefacție', 'Nociceptori stimulați: durere']
};

FLOWS.complement = {
  t: 'Sistemul complementului',
  steps: [
    { t: 'Activarea complementului', d: 'proteine serice', z: 'Plasmă', k: 'start' },
    { br: [
      [{ t: 'C3b + C5–C9', d: 'polimerizare', w: 'Formează un por în membrana patogenului.' }, { t: 'Complexul de atac membranar → liza patogenului', k: 'end' }],
      [{ t: 'Anafilatoxine: C3a, C4a, C5a', d: 'chemotactism', w: 'Atrag și activează celulele inflamatorii.' }, { t: 'Macrofage activate → liza agentului', k: 'end' }]
    ] }
  ]
};

FLOWS.hs1 = {
  t: 'Hipersensibilitatea de tip I',
  steps: [
    { t: 'Primul contact: sensibilizare', d: 'fără simptome', z: 'Primul contact', k: 'start' },
    { t: 'LB + LTH2 → IL-4, IL-5', d: 'IL-4: LB antigen-specifice (IgE) · IL-5: eozinofile' },
    { t: 'IgE fixate pe mastocite', d: 'mastocite sensibilizate', x: 1 },
    { t: 'Reacția imediată (minute)', d: 'degranulare: histamină, proteaze, leucotriene, prostaglandine, citokine', z: 'Al doilea contact', e: 'alergenul revine', w: 'Produc mâncărime, strănut, congestie, edem.' },
    { t: 'Reacția întârziată (ore)', d: 'eozinofile, neutrofile, IgG atrase local' },
    { t: 'Rinită, astm, simptome digestive, urticarie; șoc anafilactic', z: 'Clinic', k: 'end', w: 'Șocul apare mai ales când alergenul intră parenteral.' }
  ],
  ord: ['Sensibilizare la primul contact', 'LB + LTH2: IL-4, IL-5', 'IgE fixate pe mastocite', 'Reacția imediată: degranulare, histamină', 'Reacția întârziată: eozinofile, neutrofile', 'Manifestări / șoc anafilactic']
};

FLOWS.hs2 = {
  t: 'Hipersensibilitatea de tip II (citotoxică)',
  steps: [
    { t: 'Antigen pe celulă', d: 'sau pe matricea extracelulară; haptene legate de celule sanguine', z: 'Celula-țintă', k: 'start' },
    { t: 'IgM și IgG specifice', d: 'la a doua expunere, în cantitate mare', e: 'se leagă' },
    { t: 'Opsonizare și activarea complementului' },
    { t: 'Limfocite NK citotoxice', e: 'stimulează' },
    { t: 'Citoliză', d: 'reacția posttransfuzională, sindromul Goodpasture', k: 'end' }
  ],
  ord: ['Antigen pe celulă / haptenă legată de celulă', 'A doua expunere: IgM și IgG specifice', 'Opsonizare și activarea complementului', 'Stimularea NK citotoxice', 'Citoliză']
};

FLOWS.hs3 = {
  t: 'Hipersensibilitatea de tip III (complexe imune)',
  steps: [
    { t: 'Antigen în exces + IgM / IgG', z: 'Sânge', k: 'start' },
    { t: 'Complexe imune mici, solubile, circulante', e: 'formează' },
    { t: 'Depunere', d: 'membrana glomerulară, articulații, tegument', z: 'Țesuturi', e: 'se depun' },
    { t: 'Activarea complementului', d: 'și a macrofagelor, granulocitelor, trombocitelor', e: 'activează' },
    { t: 'Glomerulonefrită, artralgii, febră, urticarie, limfadenită', z: 'Clinic', k: 'end' }
  ],
  ord: ['Antigen în exces + IgM/IgG', 'Complexe imune mici, solubile, circulante', 'Depunere: glomerul, articulații, tegument', 'Activarea complementului, macrofagelor, granulocitelor, trombocitelor', 'Glomerulonefrită, artralgii, febră, urticarie']
};

FLOWS.hs4 = {
  t: 'Hipersensibilitatea de tip IV (întârziată)',
  steps: [
    { t: 'Antigen', d: 'patogeni (virusuri, TBC, lepră, fungi), gliadina, haptene (medicamente, metale, cosmetice)', z: 'Țesut', k: 'start' },
    { t: 'Fagocitoză de către macrofag', e: 'preluat prin' },
    { t: 'Prezentare la LTH (≈5 zile)', d: 'macrofagele migrează în limfonoduli', z: 'Limfonod', e: 'prezintă' },
    { t: 'Proliferare limfocitară', d: 'LTH1, LT citotoxice' },
    { t: 'IFN-γ activează macrofagele', d: 'și stimulează formarea de monocite', z: 'Țesut', e: 'LT revin la locul expunerii' },
    { t: 'Distrugere tisulară masivă, maxim la ~4 zile', d: 'TBC, lepră, rejet de organ', k: 'end' }
  ],
  ord: ['Antigen (patogen, gliadină, haptenă)', 'Fagocitoză de către macrofag', 'Prezentare la LT în limfonoduli', 'Proliferarea LTH1 / LT citotoxice', 'IFN-γ activează macrofagele', 'Inflamație cu distrugere tisulară, maxim la ~4 zile']
};

/* ---------- Infecția ---------- */
FLOWS.infInflam = {
  t: 'Răspunsul inflamator acut în infecție',
  steps: [
    { t: 'Patogen la poarta de intrare', z: 'Focar', k: 'start' },
    { t: 'Histamină și alți mediatori', d: 'din mastocite și alte celule', e: 'eliberează' },
    { t: 'Vasodilatație, ↑ permeabilitate', d: 'extravazarea plasmei: rubor, calor, tumor', z: 'Vas' },
    { t: 'Neutrofile și monocite chemotactate', d: 'de chemokine', e: 'recrutează' },
    { t: 'Fagocitoză, enzime, ROS', d: 'distrug patogenul (și pot leza țesutul)', z: 'Focar' },
    { t: 'Drenaj spre limfonodulii regionali', d: 'răspândirea e limitată', z: 'Limfă' },
    { t: 'Stimularea răspunsului imun specific', k: 'end' }
  ],
  ord: ['Patogen la poarta de intrare', 'Eliberarea de histamină și mediatori', 'Vasodilatație, ↑ permeabilitate', 'Chemotactismul neutrofilelor și monocitelor', 'Fagocitoză, enzime, ROS', 'Drenaj interstițial spre limfonoduli', 'Stimularea răspunsului imun specific']
};

FLOWS.innate = {
  t: 'Imunitatea înnăscută: recunoaștere și semnalizare',
  steps: [
    { t: 'PAMPs', d: 'LPS al Gram-negativilor, ARN viral dublu catenar', z: 'Patogen', k: 'start', w: 'Structuri pe care gazda nu le are, comune unor clase întregi de germeni.' },
    { t: 'PRR: receptori toll-like, lectine de tip C', d: 'pe macrofage, celule dendritice, neutrofile, NK, epiteliu', z: 'Celula imună', e: 'recunoscute de', w: 'Receptori preformați: nu au nevoie de expunere anterioară.' },
    { t: 'Semnalizare intracelulară' },
    { t: 'Citokine (IL, TNF-α) și chemokine', e: 'secretă' },
    { t: 'Inflamație amplificată, celule imune recrutate', z: 'Țesut', k: 'end' }
  ],
  ord: ['PAMPs ale patogenului', 'Recunoaștere de către PRR (TLR)', 'Semnalizare intracelulară', 'Citokine proinflamatorii și chemokine', 'Recrutarea celulelor imune']
};

FLOWS.adaptive = {
  t: 'Imunitatea dobândită',
  steps: [
    { t: 'Antigenul patogenului', d: 'prezentat de macrofage și celule dendritice', k: 'start' },
    { br: [
      [{ t: 'Limfocite B → plasmocite', w: 'Plasmocitele produc imunoglobuline specifice.' }, { t: 'Anticorpi: neutralizare, opsonizare', d: 'infecții extracelulare', k: 'end' }],
      [{ t: 'LT helper (CD4+)', d: 'citokine: coordonează' }, { t: 'LT citotoxice (CD8+)', d: 'distrug celulele infectate (MHC I)', k: 'end', w: 'Esențiale în infecțiile intracelulare.' }],
      [{ t: 'LT reglatoare', d: 'modulează intensitatea' }, { t: 'Previn leziunile autoimune', k: 'end' }]
    ] },
    { t: 'Memorie imunologică', d: 'la reexpunere: răspuns mai rapid și mai eficient', k: 'end' }
  ]
};

FLOWS.bactSteps = {
  t: 'Etapele infecției bacteriene',
  steps: [
    { t: 'Aderența la celulele gazdei', k: 'start' },
    { t: 'Invazia și diseminarea în țesuturi' },
    { t: 'Toxinele bacteriene și efectele lor' },
    { t: 'Evaziunea răspunsului imun' },
    { t: 'Inflamația sistemică și complicațiile', k: 'end' }
  ],
  ord: ['Aderența la celulele gazdei', 'Invazia și diseminarea în țesuturi', 'Toxinele bacteriene și efectele lor', 'Evaziunea răspunsului imun', 'Inflamația sistemică și complicațiile']
};

FLOWS.adhInv = {
  t: 'Aderența, invazia și diseminarea bacteriană',
  steps: [
    { t: 'Poarta de intrare', d: 'ex. nazofaringe (S. pneumoniae), intestin (Salmonella)', z: 'Mucoasă', k: 'start' },
    { t: 'Aderența: adezine ↔ receptori', d: 'specificitatea explică tropismul', w: 'Primul pas al patogenezei: unii germeni infectează preferențial organele unde găsesc receptorii potriviți.' },
    { br: [
      [{ t: 'Invazie activă', d: 'invazine: pătrund în celule sau printre ele' }],
      [{ t: 'Invazie pasivă', d: 'prin leziuni preexistente ale epiteliului' }]
    ] },
    { z: 'Rezultat', br: [
      [{ t: 'Rămân la poarta de intrare', d: 'infecție localizată', k: 'end' }],
      [{ t: 'Diseminare limfatică / sangvină', d: 'infecție sistemică', k: 'end' }]
    ] }
  ],
  ord: ['Poarta de intrare', 'Adezinele recunosc receptorii celulelor gazdei', 'Invazie (activă prin invazine sau pasivă prin leziuni)', 'Traversarea barierei locale', 'Diseminare limfatică / sangvină', 'Infecție sistemică']
};

FLOWS.diphtToxin = {
  t: 'Toxina difterică A-B (LP 1)',
  steps: [
    { t: 'Toxina difterică A-B', z: 'Extracelular', k: 'start' },
    { t: 'Subunitatea B se leagă de receptor', d: 'endocitoză', e: 'B = binding' },
    { t: 'Subunitatea A intră în citoplasmă', d: 'partea enzimatică', z: 'Citoplasmă' },
    { t: 'ADP-ribozilarea EF-2', d: 'factorul de elongare 2', e: 'catalizează' },
    { t: 'EF-2 inactivat → sinteza proteică blocată' },
    { t: 'Moarte celulară, necroză tisulară', k: 'end' }
  ],
  ord: ['Subunitatea B se leagă de receptor (endocitoză)', 'Subunitatea A intră în citoplasmă', 'ADP-ribozilarea EF-2', 'Inactivarea EF-2, blocarea sintezei proteice', 'Moarte celulară, necroză']
};

FLOWS.endotox = {
  t: 'Endotoxina (LPS): doza decide efectul',
  steps: [
    { t: 'Liza bacteriilor Gram-negative', d: 'LPS nu e secretat activ', z: 'Focar', k: 'start' },
    { t: 'LPS liber', e: 'eliberează' },
    { t: 'Macrofage și celule dendritice activate', d: 'prin TLR4', z: 'Imunitate înnăscută', e: 'activează' },
    { t: 'IL-1, TNF-α, IL-6', d: 'eliberare masivă', e: 'eliberează' },
    { br: [
      [{ t: 'Doze mici', d: 'febră, stimularea imunității', k: 'end' }],
      [{ t: 'Doze mari / sistemic', d: 'sindrom inflamator generalizat', k: 'end' }]
    ] }
  ],
  ord: ['Liza bacteriilor Gram-negative', 'Eliberarea LPS', 'Activarea macrofagelor prin TLR4', 'Eliberarea de IL-1, TNF-α, IL-6', 'Febră (doze mici) / sindrom inflamator generalizat (doze mari)']
};

FLOWS.sepsis = {
  t: 'De la bacteriemie la șocul septic',
  steps: [
    { t: 'Bacteriemie', d: 'bacterii viabile în sânge', z: 'Sânge', k: 'start' },
    { t: 'Activarea masivă a sistemului imun', d: 'tot organismul e expus la componentele microbiene' },
    { t: 'Sepsis: „taifun” de citokine', d: 'IL-1, TNF, IL-6, IFN; răspuns exagerat și inadecvat', e: 'eliberează', w: 'Răspunsul gazdei devine el însuși cauza leziunilor.' },
    { z: 'Vase, endoteliu', br: [
      [{ t: 'Vasodilatație sistemică', d: '→ hipotensiune' }],
      [{ t: '↑ Permeabilitate capilară', d: '→ edeme' }],
      [{ t: 'Endoteliu + coagulare activate', d: '→ CID' }]
    ] },
    { t: 'Disfuncție multiplă de organe: șoc septic', d: 'urgență medicală majoră', z: 'Organe', k: 'end' }
  ],
  ord: ['Bacteriemie', 'Activarea masivă a sistemului imun', 'Taifun de citokine (IL-1, TNF, IL-6)', 'Vasodilatație, ↑ permeabilitate, CID', 'Hipotensiune, edeme', 'Disfuncție multiplă de organe (șoc septic)']
};

FLOWS.viralSteps = {
  t: 'Etapele infecției virale',
  steps: [
    { t: 'Atașarea și intrarea intracelulară', d: 'receptori celulari specifici', k: 'start' },
    { t: 'Replicarea intracelulară' },
    { t: 'Diseminarea virusului' },
    { t: 'Efectele citopatice' },
    { t: 'Persistența sau clearance-ul', k: 'end' }
  ],
  ord: ['Atașarea și intrarea intracelulară', 'Replicarea intracelulară', 'Diseminarea virusului', 'Efectele citopatice', 'Persistența sau clearance-ul']
};

FLOWS.viralEntry = {
  t: 'Atașarea și intrarea virusului',
  steps: [
    { t: 'Proteine virale ↔ receptori specifici', d: 'inițiază infecția și dau tropismul viral', z: 'Membrana celulară', k: 'start' },
    { br: [
      [{ t: 'Endocitoză', d: 'apoi eliberare în citoplasmă' }],
      [{ t: 'Fuziune directă', d: 'cu membrana celulară' }]
    ] },
    { t: 'Dezvelirea', d: 'capsida se desface', z: 'Citoplasmă' },
    { t: 'Genomul viral eliberat', d: 'în citoplasmă sau în nucleu', k: 'end' }
  ],
  ord: ['Legarea proteinelor virale de receptori specifici', 'Pătrundere: endocitoză sau fuziune cu membrana', 'Dezvelirea: capsida se desface', 'Genomul viral eliberat în citoplasmă / nucleu']
};

FLOWS.viralRep = {
  t: 'Replicarea virală intracelulară',
  steps: [
    { t: 'Virusul acaparează resursele celulei', z: 'Celula gazdă', k: 'start' },
    { t: 'Multiplicarea genomului, proteine virale', d: 'pentru asamblarea noilor particule' },
    { t: 'Sinteza proteică a gazdei blocată', d: 'ribozomii lucrează doar pentru virus; macromoleculele celulare inhibate', w: 'Replicarea intensă perturbă funcțiile celulei.' },
    { t: 'Asamblarea virionilor' },
    { t: 'Liza celulei, virionii eliberați', k: 'end' }
  ],
  ord: ['Acapararea resurselor celulei', 'Multiplicarea genomului, sinteza proteinelor virale', 'Blocarea sintezei proteice a gazdei', 'Asamblarea virionilor', 'Liza celulei, eliberarea virionilor']
};

/* ---------- Anexă: difteria (LP 1) ---------- */
FLOWS.dipht1 = {
  t: 'Difteria 1: transmitere și colonizare',
  steps: [
    { t: 'Transmitere aeriană', d: 'picături Pflügge', z: 'Transmitere', k: 'start' },
    { t: 'Colonizarea mucoasei nazofaringiene / faringiene', z: 'Mucoasă' },
    { t: 'Aderență și multiplicare locală', d: 'Corynebacterium diphtheriae' },
    { t: 'Producerea toxinei difterice', k: 'end', w: 'Bacteria rămâne localizată pe mucoasă; formele severe vin de la toxină, nu de la invazie.' }
  ]
};
FLOWS.dipht2 = {
  t: 'Difteria 2: pseudomembrana',
  steps: [
    { t: 'Toxina + inflamația locală', z: 'Mucoasa faringiană', k: 'start' },
    { t: 'Necroză epitelială, ↑ permeabilitate vasculară' },
    { t: 'Extravazare plasmatică, depunere de fibrină' },
    { t: 'Fibrină + celule necrozate + leucocite + bacterii', e: 'se adună' },
    { t: 'Pseudomembrană alb-cenușie, aderentă' },
    { t: 'Sângerare la detașare', d: 'mucoasa de dedesubt e inflamată și necrozată', k: 'end' }
  ],
  ord: ['Toxina + inflamația locală', 'Necroză epitelială, ↑ permeabilitate', 'Extravazare plasmatică, depunere de fibrină', 'Fibrină + celule necrozate + leucocite + bacterii', 'Pseudomembrană aderentă', 'Sângerare la detașare']
};
FLOWS.dipht4 = {
  t: 'Difteria 4: efectele sistemice ale toxinei',
  steps: [
    { t: 'Toxină produsă local', z: 'Faringe', k: 'start' },
    { t: 'Absorbție în sânge', z: 'Sânge' },
    { t: 'Fixare în țesuturi cu metabolism intens', e: 'se fixează' },
    { z: 'Organe-țintă', br: [
      [{ t: 'Miocard', d: 'miocardită, aritmii, tulburări de conducere', k: 'end' }],
      [{ t: 'Nervi periferici', d: 'neuropatii craniene și periferice', k: 'end' }],
      [{ t: 'Rinichi', d: 'nefrită, afectare renală', k: 'end' }]
    ] }
  ]
};
FLOWS.diphtFever = {
  t: 'Difteria 5: mecanismul febrei',
  steps: [
    { t: 'Componente bacteriene, leziuni tisulare', z: 'Focar', k: 'start' },
    { t: 'Macrofage și monocite activate', e: 'activează' },
    { t: 'IL-1, IL-6, TNF-α', z: 'Sânge', e: 'eliberează' },
    { t: 'PGE2 hipotalamic', z: 'Hipotalamus', e: 'induc' },
    { t: 'Pragul termic crește' },
    { t: 'Vasoconstricție, frison, termogeneză', z: 'Efectori' },
    { t: 'Febră', k: 'end' }
  ],
  ord: ['Componente bacteriene, leziuni tisulare', 'Activarea macrofagelor și monocitelor', 'IL-1, IL-6, TNF-α', 'PGE2 hipotalamic', 'Pragul termic hipotalamic crește', 'Vasoconstricție, frison, termogeneză', 'Febră']
};

;