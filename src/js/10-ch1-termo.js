/* ===== Capitolul 1: Termoreglarea. Hipertermia și hipotermia (Î1–9) ===== */

Q[1] = {
  ch: 'termo', s: 'Hipertermia sub 39°C: modificări hemodinamice', src: 'Termoreglarea, slide 12–13',
  sum: 'Sub 39°C, hipertermia e dominată de costul hemodinamic al termolizei maximale: vasodilatația și sudorația scad volumul circulant, întoarcerea venoasă și rezistența periferică, deci scad debitul cardiac și presiunea arterială, iar organele ajung hipoperfuzate.',
  learn: [
    ['def', 'Hipertermia', 'Creșterea temperaturii centrale prin <b>depășirea mecanismelor termolizei</b>, după expunerea organismului într-un mediu cald sau după un efort fizic intens. Valoarea de referință hipotalamică rămâne normală: organismul „vrea” să fie la 37°C, dar nu reușește să piardă căldura destul de repede.'],
    ['p', 'În condiții normale temperatura centrală este între <b>36,2°C și 37,7°C</b>. Sub 39°C tabloul este dominat de consecințele hemodinamice ale termolizei: pielea se vasodilată și transpiră abundent, iar tocmai aceste mecanisme de apărare ajung să compromită circulația.'],
    ['fig', 'thermo', { marks: [[37.7, 39, 'Î1: sub 39°C', 'heat']] }],
    ['flow', 'hyper39'],
    ['box', 'tip', 'Lanțul de reținut', '<b>Vasodilatație + sudorație → ↓ volum circulant → ↓ întoarcere venoasă și ↓ RVP → ↓ debit cardiac și ↓ TA → hipoperfuzie de organ</b> → slăbiciune, vertij, greață, alterarea conștienței.'],
    ['box', 'ctx', 'De ce scade debitul cardiac', 'Debitul cardiac = volum-bătaie × frecvență cardiacă. Când volumul circulant scade și sângele se acumulează în venele dilatate ale pielii, inima primește mai puțin sânge (preîncărcare mică), deci volumul-bătaie scade (legea Frank–Starling). Tahicardia compensatorie nu mai poate menține debitul. Presiunea arterială depinde de debit și de rezistența periferică, iar ambele scad.']
  ],
  plan: ['Definește hipertermia: depășirea termolizei, după mediu cald sau efort; valoarea de referință e normală.', 'Vasodilatația cutanată.', 'Sudorația intensă → reducerea volumului circulant.', 'Scăderea întoarcerii venoase și a rezistenței vasculare periferice.', 'Scăderea debitului cardiac și a presiunii arteriale.', 'Hipoperfuzia de organ.', 'Simptomele: slăbiciune musculară, vertij, greață, alterarea conștienței.'],
  cloze: [
    'Hipertermia reprezintă depășirea mecanismelor [[termolizei|termoliza]], cu creșterea temperaturii centrale după expunerea în mediu [[cald]] sau după un [[efort fizic|efort]] intens.',
    'În condiții normale, temperatura centrală la om este între [[36,2]]°C și [[37,7]]°C.',
    'Pentru valori sub 39°C, primul răspuns vascular este [[vasodilatația|vasodilatatie|vasodilatatia cutanata]].',
    'Intensificarea [[sudorației|transpiratiei|sudoratie]] determină reducerea volumului [[circulant]].',
    'Scad întoarcerea [[venoasă]] și rezistența vasculară [[periferică]].',
    'Consecutiv scad [[debitul cardiac]] și [[presiunea arterială|tensiunea arteriala]].',
    'Rezultatul final al modificărilor hemodinamice este [[hipoperfuzia|hipoperfuzie]] de organ.',
    'Clinic apar slăbiciune [[musculară]], [[vertij|ameteala|ameteli]], greață și alterarea stării de [[conștiență|constienta]].'
  ],
  rub: [
    ['Definiție', [
      ['Hipertermia = depășirea mecanismelor termolizei', ['termoliz'], 2],
      ['Apare în mediu cald sau după efort fizic intens', ['mediu cald', 'caldur', 'efort', 'canicul']]
    ]],
    ['Modificări hemodinamice', [
      ['Vasodilatație cutanată', ['vasodilat', 'dilat+vas'], 2],
      ['Intensificarea sudorației', ['sudora', 'transpir'], 2],
      ['Reducerea volumului circulant', ['volum+circul', 'volemi', 'hipovolem', 'volum+sang', 'volum+plasm'], 2],
      ['Scăderea întoarcerii venoase', ['intoarcer+veno', 'retur+veno', 'preincarc', 'aflux+veno'], 2],
      ['Scăderea rezistenței vasculare periferice', ['rezistent+periferic', 'rezistent+vascular', '=rvp', '=rps']],
      ['Scăderea debitului cardiac', ['debit+cardiac', '=dc', 'debit+inim'], 2],
      ['Scăderea presiunii arteriale', ['presiun+arterial', 'tensiun+arterial', 'hipotensiun', '=ta'], 2],
      ['Hipoperfuzie de organ', ['hipoperfuz', 'perfuzi+scad', 'perfuzi+organ', 'irigat+scad'], 2]
    ]],
    ['Manifestări', [
      ['Slăbiciune musculară', ['slabiciun', 'astenie']],
      ['Vertij', ['vertij', 'amete']],
      ['Greață', ['great']],
      ['Alterarea stării de conștiență', ['constient', 'sincop', 'lipotim', 'lesin']]
    ]]
  ],
  chains: ['hyper39']
};

Q[2] = {
  ch: 'termo', s: 'SNC la 40–40,5°C', src: 'Termoreglarea, slide 14',
  sum: 'La 40–40,5°C apar manifestări nervoase prin modificarea substanței cerebrale. Organismul răspunde intensificând termoliza la nivelul capului: sudorația crește, sângele venos răcit ajunge prin venele endocraniene în sinusul cavernos și, prin conducție, răcește sângele arterial care merge spre creier.',
  learn: [
    ['def', 'Ce se întâmplă la 40–40,5°C', 'Apar <b>manifestările nervoase</b>, produse de <b>modificările substanței cerebrale</b>. Creierul este organul cel mai sensibil la căldură, așa că termoliza se intensifică mai ales la nivelul extremității cefalice.'],
    ['fig', 'thermo', { marks: [[40, 40.5, 'Î2: 40–40,5°C', 'heat']] }],
    ['flow', 'brain40'],
    ['fig', 'braincool'],
    ['box', 'tip', 'Ideea centrală', '<b>Răcirea selectivă a creierului</b>: sudorația capului răcește sângele venos, care trece prin sistemul venos endocranian și sinusul cavernos și, prin conducție, răcește sângele arterial din vecinătate.'],
    ['box', 'ctx', 'Anatomia schimbului de căldură', 'Artera carotidă internă străbate sinusul cavernos, scăldată de sângele venos venit din venele feței și ale orbitei (prin venele oftalmice). Sângele răcit la suprafața capului preia căldură prin peretele arterei, ca într-un schimbător de căldură. Manifestările nervoase tipice pot fi cefalee, iritabilitate, confuzie, agitație.']
  ],
  plan: ['Apar manifestări nervoase, determinate de modificările substanței cerebrale.', 'Se intensifică termoliza la nivelul extremității cefalice: sudorație crescută.', 'Pierderea de căldură se accelerează prin evaporare.', 'Sângele periferic mai rece ajunge la creier prin sistemul venos endocranian și sinusul cavernos.', 'Prin conducție scade temperatura sângelui din arterele învecinate (răcirea creierului).'],
  cloze: [
    'Când temperatura centrală ajunge la 40–40,5°C apar [[manifestările nervoase|manifestari nervoase|manifestari neurologice]], determinate de modificările [[substanței cerebrale|substantei cerebrale]].',
    'Termoliza se intensifică la nivelul extremității [[cefalice]], unde crește [[sudorația|transpiratia]].',
    'Sudorația de la nivelul capului accelerează pierderea de căldură prin [[evaporare]].',
    'Sângele periferic, cu temperatură mai scăzută, ajunge la creier prin sistemul venos [[endocranian]] și prin sinusul [[cavernos]].',
    'Prin [[conducție|conductie]], sângele venos mai rece scade temperatura sângelui din [[arterele]] învecinate.'
  ],
  rub: [
    ['Afectarea SNC', [
      ['Apar manifestări nervoase', ['nervo', 'neurolog'], 2],
      ['Cauza: modificările substanței cerebrale', ['substant+cerebral', 'modificar+cerebral', 'substant+creier'], 2]
    ]],
    ['Mecanism de protecție', [
      ['Intensificarea termolizei', ['termoliz']],
      ['Sudorație crescută la nivelul extremității cefalice', ['sudora+cefal', 'sudora+=cap', 'sudora+=capului', 'transpir+=cap', 'extremit+cefal', 'sudora+=fata', 'sudora+=fetei'], 2],
      ['Pierdere de căldură prin evaporare', ['evapor'], 2],
      ['Sânge periferic cu temperatură mai scăzută', ['periferic+rece', 'periferic+scazut', 'temperatur+scazut', 'sange+rece', 'racit']],
      ['Ajunge prin sistemul venos endocranian', ['endocranian', 'venos+cranian', 'vene+cranian'], 1],
      ['Sinusul cavernos', ['cavernos'], 2],
      ['Prin conducție scade temperatura sângelui arterial', ['conducti', 'conductie'], 2],
      ['Arterele învecinate (spre creier)', ['arter']]
    ]]
  ],
  chains: ['brain40']
};

Q[3] = {
  ch: 'termo', s: 'Tipurile de hipertermie', src: 'Termoreglarea, slide 16–18',
  sum: 'Patru tipuri: hipertermia malignă (defect genetic al transportorului sarcoplasmic de Ca²⁺, receptorul pentru rianodină, declanșată de anestezice halogenate sau miorelaxante depolarizante), mialgia termică (spasme musculare la efort prelungit în căldură), insolația (radiație solară pe cap, edem cerebral, risc de meningită seroasă) și arsurile solare.',
  learn: [
    ['p', 'LP-ul prezintă <b>patru tipuri de hipertermie</b>: hipertermia malignă, mialgia termică, insolația și arsurile solare.'],
    ['tbl', 'Tipurile de hipertermie', ['Tip', 'Cauza', 'Ce se întâmplă'], [
      ['<b>Hipertermia malignă</b>', 'Defecte genetice heterogene ale transportorului sarcoplasmic al calciului; afectarea receptorului pentru rianodină de la nivelul canalelor de calciu', 'Se declanșează la expunerea la anestezice inhalatorii halogenate sau la miorelaxante depolarizante'],
      ['<b>Mialgia termică</b>', 'Activitate fizică intensă și prelungită într-un mediu ambiental foarte cald', 'Spasme musculare'],
      ['<b>Insolația</b>', 'Efectul direct al radiației solare asupra extremității cefalice', 'Edem cerebral de diferite grade; cea mai severă complicație: meningita seroasă, cu potențial letal'],
      ['<b>Arsurile solare</b>', 'Expunerea directă a organismului la radiația solară', 'Arsuri de diferite grade']
    ]],
    ['flow', 'hm'],
    ['box', 'ctx', 'Mialgia termică: de ce apar spasmele', 'Prin transpirație abundentă se pierd apă și sodiu. Dezechilibrul hidro-electrolitic crește excitabilitatea fibrelor musculare solicitate intens, care intră în spasm.'],
    ['box', 'lp', 'Principiile de tratament ale hipertermiei (slide 18)', '<ol><li>Scoaterea din mediul cald</li><li>Scăderea temperaturii prin metode externe</li><li>Hidratare enterală și parenterală</li><li>Corectarea dezechilibrelor hidro-electrolitice</li><li>Alcalinizarea urinii</li><li>Tratamentul aritmiilor</li></ol>']
  ],
  plan: ['Enumeră cele patru tipuri: hipertermia malignă, mialgia termică, insolația, arsurile solare.', 'Hipertermia malignă: defecte genetice ale transportorului sarcoplasmic de Ca²⁺, receptorul pentru rianodină; declanșată de anestezice halogenate sau miorelaxante depolarizante.', 'Mialgia termică: spasme musculare la efort intens și prelungit în mediu foarte cald.', 'Insolația: radiație solară directă pe extremitatea cefalică, edem cerebral, risc de meningită seroasă.', 'Arsurile: de diferite grade, prin expunere directă la radiația solară.'],
  cloze: [
    'Tipurile de hipertermie prezentate sunt: hipertermia [[malignă|maligna]], mialgia [[termică]], [[insolația|insolatie]] și [[arsurile|arsuri]] solare.',
    'Hipertermia malignă are la bază defecte genetice heterogene ale transportorului [[sarcoplasmic]] al [[calciului|calciu]].',
    'În hipertermia malignă este afectat receptorul pentru [[rianodină|rianodina|ryanodina]] de la nivelul canalelor de calciu.',
    'Hipertermia malignă se declanșează la expunerea la anestezice inhalatorii [[halogenate]] sau la miorelaxante [[depolarizante]].',
    'Mialgia termică constă în [[spasme musculare|crampe musculare|spasme]] induse de activitate fizică intensă și [[prelungită]] într-un mediu foarte cald.',
    'Insolația este efectul direct al radiației [[solare]] asupra extremității [[cefalice]], însoțit de [[edem cerebral]].',
    'Cea mai severă complicație a insolației este [[meningita seroasă|meningita]], cu potențial letal.',
    'Arsurile solare, de diferite grade, apar prin expunerea [[directă]] a organismului la radiația solară.'
  ],
  rub: [
    ['Enumerare', [
      ['Hipertermia malignă', ['hipertermi+malign', 'malign'], 1],
      ['Mialgia termică', ['mialgi'], 1],
      ['Insolația', ['insolati'], 1],
      ['Arsurile solare', ['arsur'], 1]
    ]],
    ['Hipertermia malignă', [
      ['Defecte genetice', ['genetic', 'ereditar', 'congenital']],
      ['Transportorul sarcoplasmic al calciului', ['sarcoplasm', 'transport+calciu', 'canal+calciu', 'canal+ca'], 2],
      ['Receptorul pentru rianodină', ['rianodin', 'ryanodin', '=ryr', '=ryr 1'], 2],
      ['Declanșată de anestezice inhalatorii halogenate', ['halogen', 'anestez'], 2],
      ['sau de miorelaxante depolarizante', ['miorelax', 'depolariz', 'succinilcolin', 'curar']]
    ]],
    ['Mialgia termică', [
      ['Spasme musculare', ['spasm', 'cramp', 'contractur'], 2],
      ['Activitate fizică intensă și prelungită în mediu foarte cald', ['efort', 'activitat+fizic', 'prelung']]
    ]],
    ['Insolația', [
      ['Radiația solară directă pe extremitatea cefalică', ['cefal', '=cap', '=capul', '=capului', 'radiati+solar', 'soare', 'solar'], 2],
      ['Edem cerebral de diferite grade', ['edem+cerebral', 'edem'], 2],
      ['Complicația cea mai severă: meningita seroasă', ['mening'], 2]
    ]],
    ['Arsurile solare', [
      ['Expunere directă la radiația solară, arsuri de diferite grade', ['grad', 'direct+radiati', 'expuner+direct', 'expuner+solar']]
    ]]
  ],
  chains: ['hm']
};

Q[4] = {
  ch: 'termo', s: 'Mecanismele generale ale hipotermiei', src: 'Termoreglarea, slide 19–21',
  sum: 'Hipotermia (Tc < 35°C, după expunere prelungită la frig) apare când mecanismele de producere și conservare a căldurii sunt depășite: pierdere excesivă (↑ termoliză) sau producție inadecvată (↓ termogeneză). Urmează vasoconstricție și tahicardie cu ↑ consum de O₂ și ↓ glicogen hepatic, apoi epuizarea resurselor: ↓ metabolism, ↑ vâscozitate, acidoză metabolică, prelungirea potențialelor de acțiune, bradicardie, aritmii, asistolie, moarte celulară.',
  learn: [
    ['def', 'Hipotermia', 'Scăderea temperaturii centrale <b>sub 35°C</b> ca urmare a expunerii prelungite la frig.'],
    ['ul', 'Categorii mai frecvent expuse', ['vârstnici, sugari, nou-născuți', 'alcoolici, bolnavi psihic', 'hipotiroidism, hipopituitarism', 'insuficiență hepatică, malnutriție, artrită reumatoidă', 'Numitorul comun: <b>rată metabolică scăzută, glicoliză insuficientă</b>']],
    ['flow', 'hypoMech'],
    ['box', 'tip', 'Două idei de reținut', '1. Mecanismele de producere și de conservare a căldurii sunt <b>depășite</b>: fie pierderea e prea mare (↑ termoliza), fie producția e prea mică (↓ termogeneza).<br>2. Răspunsul inițial (vasoconstricție, tahicardie, frison) <b>consumă rezervele</b>; după epuizarea lor apar bradicardia, aritmiile și asistolia.'],
    ['box', 'ctx', 'De ce apar acidoza și creșterea vâscozității', 'Vasoconstricția și încetinirea circulației scad oxigenarea țesuturilor; celulele trec pe metabolism anaerob și produc acid lactic (acidoză metabolică). Frigul crește direct vâscozitatea sângelui, iar trecerea plasmei în interstițiu îl concentrează.']
  ],
  plan: ['Definiție: Tc < 35°C, expunere prelungită la frig; categoriile expuse.', 'Mecanismele de producere și conservare a căldurii sunt depășite: ↑ termoliza sau ↓ termogeneza.', 'Vasoconstricție periferică, alterarea microcirculației.', '↑ consumul de O₂, ↓ rezervele hepatice de glicogen.', '↓ rata reacțiilor metabolismului bazal; ↑ vâscozitatea sângelui, acidoză metabolică.', 'Tahicardie → epuizarea resurselor → bradicardie, aritmii, asistolie; prelungirea potențialelor de acțiune, ↓ conductibilitatea.', 'Moartea celulară.'],
  cloze: [
    'Hipotermia este scăderea temperaturii centrale sub [[35]]°C, ca urmare a expunerii [[prelungite]] la frig.',
    'Sunt mai expuse persoanele cu rată metabolică [[scăzută]] și [[glicoliză|glicoliza]] insuficientă.',
    'În hipotermie mecanismele de producere și de [[conservare]] a căldurii sunt depășite.',
    'Cauza poate fi pierderea excesivă de căldură, prin creșterea [[termolizei|termoliza]], sau producția inadecvată, prin scăderea [[termogenezei|termogeneza]].',
    'Apar [[vasoconstricția|vasoconstrictie]] periferică și alterarea [[microcirculației|microcirculatiei]].',
    'Crește consumul de [[oxigen|o2]] și scad rezervele hepatice de [[glicogen]].',
    'Crește [[vâscozitatea|vascozitatea]] sanguină și apare [[acidoza metabolică|acidoza]].',
    'Tahicardia inițială duce la epuizarea resurselor, apoi la [[bradicardie]], aritmii și în final [[asistolie]].',
    'La nivel cardiac se prelungesc [[potențialele de acțiune|potentialele de actiune]] și scade [[conductibilitatea]].'
  ],
  rub: [
    ['Definiție', [
      ['Temperatura centrală sub 35°C', ['=35', 'sub 35'], 2],
      ['Expunere prelungită la frig', ['frig', 'rece']],
      ['Categorii expuse: vârstnici, nou-născuți, alcoolici, hipotiroidism etc.', ['varstnic', 'batran', 'sugar', 'nou nascut', 'alcool', 'hipotiroid', 'malnutriti']]
    ]],
    ['Mecanisme', [
      ['Mecanismele de producere și conservare a căldurii sunt depășite', ['depasit', 'conservar'], 1],
      ['Pierdere excesivă de căldură (↑ termoliza)', ['termoliz', 'pierder+caldur'], 2],
      ['Producție inadecvată (↓ termogeneza)', ['termogenez', 'productie+caldur', 'productie+inadecvat'], 2],
      ['Vasoconstricție periferică', ['vasoconstric'], 2],
      ['Alterarea microcirculației', ['microcircul']],
      ['↑ consumul de oxigen', ['consum+oxigen', 'consum+=o', 'consum+o 2'], 1],
      ['↓ rezervele hepatice de glicogen', ['glicogen'], 1],
      ['↓ rata reacțiilor chimice / metabolismului bazal', ['metabolism+bazal', 'reacti+chimic', 'metabolism+scad', 'rat+metabolic']],
      ['↑ vâscozitatea sângelui', ['vascozit'], 1],
      ['Acidoză metabolică', ['acidoz'], 2],
      ['Tahicardie → epuizarea resurselor', ['tahicard', 'epuizar']],
      ['Bradicardie, aritmii, asistolie', ['bradicard', 'aritmi', 'asistol'], 2],
      ['Prelungirea potențialelor de acțiune, ↓ conductibilitatea', ['potential+actiun', 'conductibil', 'conducer']],
      ['Moartea celulară', ['moart+celul', 'necroz', 'distructi+celul']]
    ]]
  ],
  chains: ['hypoMech']
};

Q[5] = {
  ch: 'termo', s: 'Cele trei stadii ale hipotermiei', src: 'Termoreglarea, slide 22–24',
  sum: 'Agitație (excitație, 32–35°C): frison, glicoliză marcată cu hiperglicemie, ↑ consum de O₂, vasoconstricție, tahicardie, conștiență păstrată. Epuizare (inhibiție, 28–32°C): hipoglicemie, tulburări de ritm și conducere, alterarea senzoriului până la comă. Paralizie (critică, < 28°C): comă fără reflexe pupilare, fibrilație ventriculară, apnee, cristale de gheață intracelulare și moarte celulară.',
  learn: [
    ['p', 'Hipotermia evoluează în trei stadii, pe măsură ce temperatura centrală scade și rezervele energetice se consumă. Logica lor: întâi organismul luptă (excitație), apoi obosește (inhibiție), apoi cedează (paralizie).'],
    ['fig', 'thermo', { marks: [[32, 35, '1. Agitație', 'cold'], [28, 32, '2. Epuizare', 'cold'], [26, 28, '3. Paralizie', 'cold']] }],
    ['tbl', 'Stadiile hipotermiei', ['Stadiu', 'Tc', 'Ce se întâmplă'], [
      ['<b>1. Agitație</b> (faza de excitație)', '32–35°C', 'Frison; glicoliză marcată → <b>hiperglicemie</b>; ↑ consumul de oxigen; vasoconstricție; tahicardie; conștiență păstrată (eventual confuzie, apatie)'],
      ['<b>2. Epuizare</b> (faza de inhibiție)', '28–32°C', 'Epuizarea surselor energetice → <b>hipoglicemie</b>; tulburări de ritm și de conducere miocardică; alterarea senzoriului (halucinații → comă)'],
      ['<b>3. Paralizie</b> (faza critică)', 'sub 28°C', 'Rezerve complet epuizate; comă cu lipsa reflexelor pupilare; complicații cardiovasculare și respiratorii (<b>fibrilație ventriculară, apnee</b>); cristale de gheață la nivel celular → distrucția peretelui celular, modificări ireversibile, moarte celulară']
    ]],
    ['flow', 'hypoStages'],
    ['box', 'tip', 'Capcană frecventă', 'Glicemia se inversează: <b>hiperglicemie</b> în stadiul de agitație (glicoliză intensă) și <b>hipoglicemie</b> în stadiul de epuizare (rezerve consumate).'],
    ['box', 'lp', 'Sechelele pe termen lung (slide 25)', 'Insuficiențe de organ (cardiacă, renală, hepatică, afectare neurologică), infarct miocardic, pancreatită, alterarea hemostazei, eritropoieză anormală.'],
    ['box', 'lp', 'Principiile de tratament ale hipotermiei (slide 27)', '<ol><li>Reîncălzirea (activă și pasivă), maxim 1°C/oră</li><li>Oxigenoterapie</li><li>Susținerea funcțiilor vitale</li><li>Perfuzarea cu lichide glucozate</li><li>Monitorizarea diurezei</li><li>Tratamentul complicațiilor</li></ol>']
  ],
  plan: ['Enumeră stadiile: agitație (excitație), epuizare (inhibiție), paralizie (faza critică).', 'Agitație: Tc 32–35°C, frison, glicoliză marcată cu hiperglicemie, ↑ O₂, vasoconstricție, tahicardie, conștiență păstrată.', 'Epuizare: Tc 28–32°C, hipoglicemie, tulburări de ritm și conducere, halucinații → comă.', 'Paralizie: Tc < 28°C, rezerve epuizate, comă fără reflexe pupilare, fibrilație ventriculară, apnee, cristale de gheață, moarte celulară.'],
  cloze: [
    'Primul stadiu al hipotermiei este stadiul de [[agitație|agitatie]] (faza de [[excitație|excitatie]]), cu temperatura centrală între 32 și [[35]]°C.',
    'În stadiul de agitație glicoliza marcată produce [[hiperglicemie]], iar frisonul crește consumul de [[oxigen]].',
    'În stadiul de agitație conștiența este [[păstrată|pastrata]], eventual cu confuzie și [[apatie]].',
    'Al doilea stadiu este stadiul de [[epuizare]] (faza de [[inhibiție|inhibitie]]), cu temperatura centrală între [[28]] și 32°C.',
    'În stadiul de epuizare sursele energetice se epuizează, apărând [[hipoglicemia|hipoglicemie]].',
    'În stadiul de epuizare apar tulburări de [[ritm]] și de conducere la nivelul miocardului și alterarea senzoriului, de la halucinații la [[comă|coma]].',
    'Al treilea stadiu este stadiul de [[paralizie]] (faza [[critică|critica]]), cu temperatura centrală sub 28°C.',
    'În faza critică apare comă cu lipsa reflexelor [[pupilare]], [[fibrilație ventriculară|fibrilatie ventriculara]] și apnee.',
    'Formarea cristalelor de [[gheață|gheata]] la nivel celular distruge peretele celular și produce modificări [[ireversibile]].'
  ],
  rub: [
    ['Stadiul 1: agitație (excitație)', [
      ['Numele: stadiul de agitație / faza de excitație', ['agitati', 'excitati'], 2],
      ['Tc 32–35°C', ['32+35']],
      ['Frison', ['frison']],
      ['Glicoliză marcată, hiperglicemie', ['hiperglicem', 'glicoliz'], 2],
      ['↑ consum de O₂, vasoconstricție, tahicardie', ['tahicard', 'vasoconstric', 'consum+oxigen']],
      ['Conștiență păstrată (confuzie, apatie)', ['constient+pastrat', 'apati', 'confuz']]
    ]],
    ['Stadiul 2: epuizare (inhibiție)', [
      ['Numele: stadiul de epuizare / faza de inhibiție', ['epuizar', 'inhibiti'], 2],
      ['Tc 28–32°C', ['28+32']],
      ['Epuizarea surselor energetice: hipoglicemie', ['hipoglicem'], 2],
      ['Tulburări de ritm și conducere miocardică', ['ritm', 'aritmi', 'conducer']],
      ['Alterarea senzoriului: halucinații → comă', ['halucin', 'senzori', 'coma']]
    ]],
    ['Stadiul 3: paralizie (faza critică)', [
      ['Numele: stadiul de paralizie / faza critică', ['paraliz', 'critic'], 2],
      ['Tc sub 28°C', ['sub 28', '=28']],
      ['Comă fără reflexe pupilare', ['pupil', 'reflex']],
      ['Fibrilație ventriculară, apnee', ['fibrilati', 'apnee', 'apne'], 2],
      ['Cristale de gheață, distrucția peretelui celular, moarte celulară', ['cristal', 'gheat', 'ireversib'], 2]
    ]]
  ],
  chains: ['hypoStages']
};

Q[6] = {
  ch: 'termo', s: 'Tc 40,5–43°C: consecințe', src: 'Termoreglarea, slide 7 și 15',
  sum: 'La 40,5–43°C centrul termoreglator hipotalamic își sistează activitatea, apare edemul cerebral progresiv și se instalează șocul termic, cu insuficiență multiplă de organ.',
  learn: [
    ['p', 'Dacă temperatura centrală depășește 40,5°C, mecanismele de apărare cedează. Slide-ul 15 enumeră trei consecințe, care se înlănțuie:'],
    ['ol', null, ['<b>Sistarea activității centrului termoreglator hipotalamic</b>', '<b>Edemul cerebral progresiv</b>', '<b>Șocul termic</b> (slide 7: la 40–44°C, șoc termic cu insuficiență multiplă de organ)']],
    ['fig', 'thermo', { marks: [[40.5, 43, 'Î6: 40,5–43°C', 'heat']] }],
    ['flow', 'hyper43'],
    ['tbl', 'Consecințele modificării temperaturii corpului (slide 7)', ['Temperatura (°C)', 'Consecință'], [
      ['40–44', 'Șoc termic cu insuficiență multiplă de organ'], ['38–40', 'Hipertermie'], ['36–38', 'Interval normal'], ['34–36', 'Hipotermie medie'], ['30–34', 'Alterarea mecanismelor termoreglării'], ['27–29', 'Aritmii cardiace']
    ]],
    ['box', 'tip', 'Cum legi cele trei puncte', 'Peste 40,5°C centrul termoreglator se oprește → termoliza nu mai e comandată → temperatura urcă necontrolat → edem cerebral progresiv → șoc termic cu insuficiență multiplă de organ.']
  ],
  plan: ['Sistarea activității centrului termoreglator hipotalamic.', 'Edem cerebral progresiv.', 'Șoc termic, cu insuficiență multiplă de organ (40–44°C, slide 7).', 'Leagă-le: fără centrul termoreglator, termoliza încetează și temperatura crește necontrolat.'],
  cloze: [
    'La 40,5–43°C are loc sistarea activității centrului [[termoreglator]] [[hipotalamic]].',
    'La aceste valori se instalează [[edemul cerebral|edem cerebral]] progresiv.',
    'Stadiul final este [[șocul termic|socul termic|soc termic]].',
    'Conform tabelului din LP, la 40–44°C apare șoc termic cu insuficiență [[multiplă|multipla]] de [[organ]].',
    'Conform aceluiași tabel, între 27 și 29°C apar [[aritmiile cardiace|aritmii cardiace|aritmii]].'
  ],
  rub: [
    ['Consecințe', [
      ['Sistarea activității centrului termoreglator', ['sistar', 'centr+termoregl', 'oprir+centr', 'inceta+centr'], 2],
      ['Centrul este hipotalamic', ['hipotalam'], 1],
      ['Edem cerebral progresiv', ['edem+cerebral', 'edem'], 2],
      ['Șoc termic', ['soc+termic', 'socul termic'], 2],
      ['Insuficiență multiplă de organ', ['insuficient+multipl', 'multipl+organ', '=mods', '=msof'], 1]
    ]],
    ['Explicație', [
      ['Termoliza nu mai funcționează, temperatura crește necontrolat', ['necontrolat', 'cerc vicios', 'termoliz+=nu', 'termoliz+inceta', 'sudora+inceta', 'sudora+=nu']]
    ]]
  ],
  chains: ['hyper43']
};

Q[7] = {
  ch: 'termo', s: 'Termoliza și mecanismele fizice', src: 'Termoreglarea, slide 5–6, 9–11',
  sum: 'Termoliza este totalitatea mecanismelor fizice, adaptative și voluntare care duc la pierderea de căldură și scăderea temperaturii centrale. Mecanismele fizice: radiația (unde infraroșii spre obiecte mai reci, fără contact), conducția (contact direct cu o suprafață rece), convecția (aerul sau apa încălzite lângă piele sunt îndepărtate de curenți) și evaporarea (apa care trece în vapori consumă căldură).',
  learn: [
    ['def', 'Termoliza', 'Totalitatea mecanismelor <b>fizice, adaptative și voluntare</b> care au ca rezultat final <b>pierderea de căldură</b> și, deci, scăderea temperaturii centrale.'],
    ['fig', 'termoliza'],
    ['tbl', 'Cele patru mecanisme fizice', ['Mecanism', 'Cum se pierde căldura', 'Exemplu'], [
      ['<b>Radiație</b>', 'Corpul emite căldură sub formă de radiații infraroșii spre obiectele mai reci din jur, <b>fără contact direct</b>.', 'Repaus într-o cameră răcoroasă; e calea principală în repaus.'],
      ['<b>Conducție</b>', 'Transfer direct de căldură <b>prin contact</b> cu un obiect sau o suprafață mai rece.', 'Stat pe o suprafață rece, imersie în apă rece.'],
      ['<b>Convecție</b>', 'Aerul (sau apa) încălzit lângă piele este <b>îndepărtat de curenți</b> și înlocuit cu aer rece, care preia din nou căldură.', 'Vântul sau ventilatorul cresc pierderea.'],
      ['<b>Evaporare</b>', 'Transformarea apei în vapori <b>consumă căldură</b> de pe suprafața pielii și a mucoaselor respiratorii.', 'Sudorația; singura cale eficientă când mediul e mai cald decât pielea.']
    ]],
    ['box', 'ctx', 'Valori orientative', 'În repaus, la ~21°C: radiație ~60%, evaporare ~22%, convecție ~15%, conducție ~3%. La efort sau în mediu cald evaporarea devine dominantă. Mecanisme adaptative: vasodilatația cutanată, sudorația. Mecanisme voluntare: îmbrăcăminte, umbră, postură.'],
    ['h', 'Unde se încadrează termoliza'],
    ['fig', 'loop'],
    ['p', 'Termoreglarea are cinci componente (slide 5): <b>receptori termici</b>, <b>căi aferente termosenzitive</b>, <b>sistemul de integrare din SNC</b> (hipotalamusul), <b>căi eferente</b> și <b>efectorii termici</b>: țesutul adipos brun, mușchiul striat, vasele de sânge ale pielii, glandele sudoripare.'],
    ['box', 'tip', 'Echilibrul termic', 'Termogeneza (producerea căldurii) și termoliza (menținerea și pierderea căldurii) sunt în echilibru și interdependente. Afectarea uneia duce la tulburări ale termoreglării, spre hipertermie sau hipotermie.']
  ],
  plan: ['Definiția termolizei: mecanisme fizice, adaptative și voluntare → pierdere de căldură → scăderea temperaturii centrale.', 'Radiația: unde infraroșii spre obiecte mai reci, fără contact.', 'Conducția: contact direct cu o suprafață rece.', 'Convecția: aerul/apa încălzite lângă piele sunt îndepărtate de curenți.', 'Evaporarea: apa (sudoarea) trecută în vapori consumă căldură.', 'Opțional: echilibrul cu termogeneza; efectorii (vase cutanate, glande sudoripare).'],
  cloze: [
    'Termoliza reprezintă totalitatea mecanismelor fizice, [[adaptative]] și [[voluntare]] care au ca rezultat final pierderea de căldură.',
    'Rezultatul termolizei este scăderea temperaturii [[centrale]].',
    'Cele patru mecanisme fizice ale termolizei sunt radiația, [[convecția|convectia]], [[conducția|conductia]] și [[evaporarea]].',
    'Prin [[radiație|radiatie]] corpul cedează căldură sub formă de radiații infraroșii, fără contact direct.',
    'Prin [[conducție|conductie]] căldura trece direct, prin contact, către o suprafață mai rece.',
    'Prin [[convecție|convectie]] aerul încălzit de lângă piele este îndepărtat de curenți de aer.',
    'Prin [[evaporare]], transformarea sudorii în vapori consumă căldură.',
    'Efectorii termoreglării sunt țesutul adipos [[brun|maro]], mușchiul striat, vasele de sânge ale pielii și glandele [[sudoripare]].'
  ],
  rub: [
    ['Definiție', [
      ['Totalitatea mecanismelor fizice, adaptative și voluntare', ['adaptativ', 'voluntar', 'mecanism+fizic'], 2],
      ['Rezultat: pierderea de căldură', ['pierder+caldur', 'pierd+caldur'], 2],
      ['→ scăderea temperaturii centrale', ['scader+temperatur', 'scad+temperatur']]
    ]],
    ['Mecanisme fizice', [
      ['Radiație', ['radiati'], 2],
      ['Radiația: unde infraroșii, fără contact', ['infrarosi', 'fara contact', 'unde electromagn']],
      ['Conducție', ['conducti'], 2],
      ['Conducția: prin contact direct cu o suprafață mai rece', ['contact']],
      ['Convecție', ['convecti'], 2],
      ['Convecția: curenți de aer/apă care îndepărtează căldura', ['curent', 'vant', 'aer+miscar', 'deplasar+aer']],
      ['Evaporare', ['evapor'], 2],
      ['Evaporarea: sudoarea trecută în vapori consumă căldură', ['vapor', 'sudoar', 'sudora', 'transpir']]
    ]],
    ['Context', [
      ['Echilibrul termogeneză–termoliză', ['termogenez', 'echilibr']]
    ]]
  ],
  chains: []
};

Q[8] = {
  ch: 'termo', s: 'Termogeneza și sursele ei', src: 'Termoreglarea, slide 5–6, 8',
  sum: 'Termogeneza este producerea căldurii în organism. Sursele principale: (1) metabolismul energetic celular, principala sursă, 70% din energia eliberată prin fosforilare oxidativă; (2) activitatea ATP-azei Na⁺/K⁺ dependente din membranele celulare, a doua sursă.',
  learn: [
    ['def', 'Termogeneza', '<b>Producerea căldurii</b> în organism. Este în echilibru cu termoliza (menținerea și pierderea căldurii).'],
    ['ol', 'Sursele termogenezei (slide 8)', ['<b>Metabolismul energetic celular</b>: principala sursă de energie (energie de termogeneză); reprezintă <b>70% din energia eliberată prin fosforilare oxidativă</b>.', '<b>Activitatea ATP-azei Na⁺/K⁺ dependente</b> de la nivelul membranelor celulare: a doua sursă de energie necesară termogenezei.']],
    ['fig', 'balance'],
    ['ul', 'Efectorii termici care cresc producția de căldură', ['<b>mușchiul striat</b>: frisonul (contracții musculare involuntare)', '<b>țesutul adipos brun</b>: termogeneză fără frison', 'în febră (slide 26): intensificarea metabolismului bazal, stimularea glicolizei, tahicardie']],
    ['box', 'ctx', 'Cum devine energia căldură', 'Oxidarea nutrienților eliberează energie; doar o parte este captată în ATP, restul se degajă direct ca și căldură. Când ATP-ul este folosit (de exemplu de pompa Na⁺/K⁺, care consumă o parte mare din ATP-ul bazal), energia lui ajunge tot căldură. Țesutul adipos brun produce căldură prin decuplarea fosforilării oxidative.'],
    ['box', 'lp', 'Homeotermia (slide 2–4)', 'Ansamblul mecanismelor care mențin constantă temperatura internă, indiferent de temperatura mediului și de efortul fizic. Temperatura centrală ≈ 37°C (36,2–37,7°C după regiune), cu ~0,5°C mai mare decât cea periferică. Reglarea e strictă, prin feedback, și implică hipotalamusul, sistemul endocrin și glandele suprarenale (medulară și corticală).']
  ],
  plan: ['Definiție: termogeneza = producerea căldurii; e în echilibru cu termoliza.', 'Sursa 1: metabolismul energetic celular, principala sursă, 70% din energia eliberată prin fosforilare oxidativă.', 'Sursa 2: activitatea ATP-azei Na⁺/K⁺ dependente din membranele celulare.', 'Opțional: efectorii (mușchiul striat prin frison, țesutul adipos brun).'],
  cloze: [
    'Termogeneza reprezintă [[producerea căldurii|producerea de caldura|productia de caldura]] în organism.',
    'Principala sursă a termogenezei este metabolismul [[energetic]] [[celular]].',
    'Metabolismul energetic celular reprezintă [[70]]% din energia eliberată prin [[fosforilare oxidativă|fosforilarea oxidativa]].',
    'A doua sursă a termogenezei este activitatea [[ATP-azei Na/K|atp aza na k|atpazei na k|pompei na k]] dependente de la nivelul membranelor celulare.',
    'Frisonul crește producția de căldură prin contracții involuntare ale mușchiului [[striat|scheletic]].',
    'Între termogeneză și termoliză există o relație de [[echilibru]] și de interdependență.'
  ],
  rub: [
    ['Definiție', [
      ['Termogeneza = producerea căldurii', ['producer+caldur', 'productie+caldur', 'produc+caldur'], 2],
      ['Echilibru cu termoliza', ['termoliz', 'echilibr']]
    ]],
    ['Surse', [
      ['Metabolismul energetic celular', ['metabolism+celul', 'metabolism+energetic'], 2],
      ['este principala sursă', ['principal']],
      ['70% din energia eliberată', ['=70'], 1],
      ['prin fosforilare oxidativă', ['fosforil'], 2],
      ['Activitatea ATP-azei Na⁺/K⁺ dependente', ['atp aza', 'atpaz', 'pomp+na', 'na k', '=na+=k'], 2],
      ['din membranele celulare (a doua sursă)', ['membran']]
    ]],
    ['Efectori', [
      ['Frisonul (mușchiul striat)', ['frison', 'muschi']],
      ['Țesutul adipos brun', ['adipos+brun', 'adipos+maro', 'grasim+brun']]
    ]]
  ],
  chains: []
};

Q[9] = {
  ch: 'termo', s: 'Efectele locale ale frigului', src: 'Termoreglarea, slide 26',
  sum: 'Trei categorii: (1) prin vasoconstricție și încetinirea fluxului sanguin: microtromboze și necroze; (2) prin eliberarea de mediatori vasoactivi (histamină): hiperpermeabilitate capilară, extravazarea apei în interstițiu, edeme; (3) la expunere prelungită: degerături și necroză grăsoasă.',
  learn: [
    ['p', 'Frigul acționează local pe două căi, vasculară și umorală. Expunerea prelungită le adună în leziuni grave.'],
    ['flow', 'coldLocal'],
    ['ol', 'Ce scrii (slide 26)', ['<b>Secundar vasoconstricției și încetinirii fluxului sanguin</b>: microtromboze și apariția necrozelor.', '<b>Eliberarea de mediatori vasoactivi, histamina</b>: hiperpermeabilitate capilară și extravazarea apei în interstițiu (edeme).', '<b>Expunerea prelungită la frig</b>: apariția degerăturilor și a necrozei grăsoase.']],
    ['box', 'tip', 'Mnemotehnic', 'Vas strâns → <b>tromb</b> → <b>necroză</b>. Histamină → <b>permeabilitate</b> → <b>edem</b>. Timp lung → <b>degerătură</b>.']
  ],
  plan: ['Vasoconstricție și încetinirea fluxului sanguin → microtromboze → necroze.', 'Eliberarea de mediatori vasoactivi (histamină) → hiperpermeabilitate capilară → extravazarea apei în interstițiu → edeme.', 'Expunere prelungită → degerături și necroză grăsoasă.'],
  cloze: [
    'Efectele locale ale frigului sunt secundare [[vasoconstricției|vasoconstrictiei|vasoconstrictie]] și încetinirii fluxului sanguin.',
    'Încetinirea fluxului sanguin favorizează apariția [[microtrombozelor|microtromboze|microtrombozelor]] și a [[necrozelor|necroze|necroza]].',
    'Frigul determină eliberarea de mediatori vasoactivi, în special [[histamina|histamina]].',
    'Histamina produce hiperpermeabilitate [[capilară|capilara]] și extravazarea apei în [[interstițiu|interstitiu]], cu apariția [[edemelor|edeme|edem]].',
    'Expunerea prelungită la frig duce la apariția [[degerăturilor|degeraturi|degeraturilor]] și a necrozei [[grăsoase|grasoase]].'
  ],
  rub: [
    ['Calea vasculară', [
      ['Vasoconstricție', ['vasoconstric'], 2],
      ['Încetinirea fluxului sanguin', ['incetin', 'flux+sang', 'staz', 'flux+lent']],
      ['Microtromboze', ['microtromb', 'tromb'], 2],
      ['Necroze', ['necroz'], 2]
    ]],
    ['Calea mediatorilor', [
      ['Eliberarea de mediatori vasoactivi', ['mediator+vasoactiv', 'vasoactiv', 'mediator']],
      ['Histamina', ['histamin'], 2],
      ['Hiperpermeabilitate capilară', ['permeabil', 'hiperpermeabil'], 2],
      ['Extravazarea apei în interstițiu', ['extravaz', 'interstiti']],
      ['Edeme', ['edem'], 2]
    ]],
    ['Expunere prelungită', [
      ['Degerături', ['degerat'], 2],
      ['Necroză grăsoasă', ['necroz+grasoas', 'grasoas', 'adipos']]
    ]]
  ],
  chains: ['coldLocal']
};

;