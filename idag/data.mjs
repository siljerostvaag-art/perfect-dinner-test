// Data for «Hva kan jeg lage i dag?».
// Alt er skrevet i egne ord. Ingen oppskrifter er kopiert.
// ID-ene er faste og skal ikke endres (språk endrer bare visningen).

// De 14 allergigruppene. De åtte første vises først.
export const ALLERGIER = [
  { id: 'gluten', nb: 'Glutenholdig korn', en: 'Cereals containing gluten' },
  { id: 'melk', nb: 'Melk', en: 'Milk' },
  { id: 'egg', nb: 'Egg', en: 'Eggs' },
  { id: 'fisk', nb: 'Fisk', en: 'Fish' },
  { id: 'skalldyr', nb: 'Skalldyr', en: 'Crustaceans' },
  { id: 'notter', nb: 'Nøtter', en: 'Tree nuts' },
  { id: 'peanotter', nb: 'Peanøtter', en: 'Peanuts' },
  { id: 'soya', nb: 'Soya', en: 'Soy' },
  { id: 'selleri', nb: 'Selleri', en: 'Celery' },
  { id: 'sennep', nb: 'Sennep', en: 'Mustard' },
  { id: 'sesam', nb: 'Sesam', en: 'Sesame' },
  { id: 'sulfitt', nb: 'Svoveldioksid og sulfitter', en: 'Sulphur dioxide and sulphites' },
  { id: 'lupin', nb: 'Lupin', en: 'Lupin' },
  { id: 'blotdyr', nb: 'Bløtdyr', en: 'Molluscs' },
];
export const ANTALL_ALLERGIER_FORST = 8;

export const GRUPPER = [
  { id: 'protein', nb: 'Kjøtt, fisk, egg og bønner', en: 'Meat, fish, eggs and beans' },
  { id: 'base', nb: 'Ris, pasta, poteter og brød', en: 'Rice, pasta, potatoes and bread' },
  { id: 'gronnsak', nb: 'Grønnsaker', en: 'Vegetables' },
  { id: 'annet', nb: 'Meieri og annet', en: 'Dairy and other' },
];

// allergener = hva varen vanligvis inneholder (brukes bare til en påminnelse).
export const INGREDIENSER = [
  { id: 'kylling', ikon: '🍗', gruppe: 'protein', nb: 'kylling', en: 'chicken', allergener: [] },
  { id: 'kjottdeig', ikon: '🥩', gruppe: 'protein', nb: 'kjøttdeig', en: 'minced meat', allergener: [] },
  { id: 'svinekjott', ikon: '🍖', gruppe: 'protein', nb: 'svinekjøtt', en: 'pork', allergener: [] },
  { id: 'polser', ikon: '🌭', gruppe: 'protein', nb: 'pølser', en: 'sausages', allergener: ['melk', 'gluten', 'sennep', 'selleri', 'soya'] },
  { id: 'bacon', ikon: '🥓', gruppe: 'protein', nb: 'bacon', en: 'bacon', allergener: [] },
  { id: 'laks', ikon: '🐟', gruppe: 'protein', nb: 'laks', en: 'salmon', allergener: ['fisk'] },
  { id: 'torsk', ikon: '🐠', gruppe: 'protein', nb: 'hvit fisk', en: 'white fish', allergener: ['fisk'] },
  { id: 'reker', ikon: '🦐', gruppe: 'protein', nb: 'reker', en: 'prawns', allergener: ['skalldyr'] },
  { id: 'egg', ikon: '🥚', gruppe: 'protein', nb: 'egg', en: 'eggs', allergener: ['egg'] },
  { id: 'bonner', ikon: '🫘', gruppe: 'protein', nb: 'bønner', en: 'beans', allergener: [] },
  { id: 'kikerter', ikon: '🧆', gruppe: 'protein', nb: 'kikerter', en: 'chickpeas', allergener: [] },
  { id: 'tofu', ikon: '🥢', gruppe: 'protein', nb: 'tofu', en: 'tofu', allergener: ['soya'] },

  { id: 'ris', ikon: '🍚', gruppe: 'base', nb: 'ris', en: 'rice', allergener: [] },
  { id: 'pasta', ikon: '🍝', gruppe: 'base', nb: 'pasta', en: 'pasta', allergener: ['gluten'] },
  { id: 'poteter', ikon: '🥔', gruppe: 'base', nb: 'poteter', en: 'potatoes', allergener: [] },
  { id: 'nudler', ikon: '🍜', gruppe: 'base', nb: 'nudler', en: 'noodles', allergener: ['gluten', 'egg'] },
  { id: 'tortilla', ikon: '🌯', gruppe: 'base', nb: 'tortilla', en: 'tortillas', allergener: ['gluten'] },
  { id: 'brod', ikon: '🍞', gruppe: 'base', nb: 'brød', en: 'bread', allergener: ['gluten', 'melk', 'sesam', 'soya'] },
  { id: 'couscous', ikon: '🥣', gruppe: 'base', nb: 'couscous', en: 'couscous', allergener: ['gluten'] },

  { id: 'brokkoli', ikon: '🥦', gruppe: 'gronnsak', nb: 'brokkoli', en: 'broccoli', allergener: [] },
  { id: 'blomkal', ikon: '🥬', gruppe: 'gronnsak', nb: 'blomkål', en: 'cauliflower', allergener: [] },
  { id: 'gulrot', ikon: '🥕', gruppe: 'gronnsak', nb: 'gulrot', en: 'carrots', allergener: [] },
  { id: 'lok', ikon: '🧅', gruppe: 'gronnsak', nb: 'løk', en: 'onion', allergener: [] },
  { id: 'purre', ikon: '🌿', gruppe: 'gronnsak', nb: 'purre', en: 'leek', allergener: [] },
  { id: 'paprika', ikon: '🫑', gruppe: 'gronnsak', nb: 'paprika', en: 'peppers', allergener: [] },
  { id: 'tomat', ikon: '🍅', gruppe: 'gronnsak', nb: 'tomat', en: 'tomatoes', allergener: [] },
  { id: 'hermetiske-tomater', ikon: '🥫', gruppe: 'gronnsak', nb: 'hermetiske tomater', en: 'canned tomatoes', allergener: [] },
  { id: 'squash', ikon: '🥒', gruppe: 'gronnsak', nb: 'squash', en: 'courgette', allergener: [] },
  { id: 'spinat', ikon: '🍃', gruppe: 'gronnsak', nb: 'spinat', en: 'spinach', allergener: [] },
  { id: 'sopp', ikon: '🍄', gruppe: 'gronnsak', nb: 'sopp', en: 'mushrooms', allergener: [] },
  { id: 'mais', ikon: '🌽', gruppe: 'gronnsak', nb: 'mais', en: 'sweetcorn', allergener: [] },
  { id: 'erter', ikon: '🫛', gruppe: 'gronnsak', nb: 'erter', en: 'peas', allergener: [] },
  { id: 'agurk', ikon: '🥒', gruppe: 'gronnsak', nb: 'agurk', en: 'cucumber', allergener: [] },
  { id: 'avokado', ikon: '🥑', gruppe: 'gronnsak', nb: 'avokado', en: 'avocado', allergener: [] },
  { id: 'selleri', ikon: '🌱', gruppe: 'gronnsak', nb: 'selleri', en: 'celery', allergener: ['selleri'] },

  { id: 'ost', ikon: '🧀', gruppe: 'annet', nb: 'ost', en: 'cheese', allergener: ['melk'] },
  { id: 'flote', ikon: '🍶', gruppe: 'annet', nb: 'fløte', en: 'cream', allergener: ['melk'] },
  { id: 'romme', ikon: '🫙', gruppe: 'annet', nb: 'rømme', en: 'sour cream', allergener: ['melk'] },
  { id: 'melk', ikon: '🥛', gruppe: 'annet', nb: 'melk', en: 'milk', allergener: ['melk'] },
  { id: 'kokosmelk', ikon: '🥥', gruppe: 'annet', nb: 'kokosmelk', en: 'coconut milk', allergener: [] },
];

// Middagsidéer. Hver plass i «krever» må fylles av minst én vare brukeren har.
// «@gruppe» betyr hvilken som helst vare i gruppen.
// «bruker» er varer som passer inn i tillegg.
// «allergener» er det slike retter VANLIGVIS inneholder (f.eks. soyasaus i wok).
// Idéen skjules hvis brukeren har valgt en av disse allergiene.
export const IDEER = [
  {
    id: 'wok', ikon: '🥘', sok: { nb: 'wok', en: 'stir fry' },
    nb: { navn: 'Wok', kort: 'Stek alt raskt i en het panne og server med ris eller nudler.' },
    en: { navn: 'Stir-fry', kort: 'Fry everything quickly in a hot pan and serve with rice or noodles.' },
    krever: [['kylling', 'kjottdeig', 'svinekjott', 'reker', 'tofu', 'egg'], ['ris', 'nudler']],
    bruker: ['@gronnsak'],
    allergener: ['soya', 'gluten', 'sesam', 'peanotter', 'notter', 'fisk', 'blotdyr', 'egg'],
  },
  {
    id: 'karri', ikon: '🍛', sok: { nb: 'karri', en: 'curry' },
    nb: { navn: 'Karri', kort: 'En krydret gryte, gjerne med kokosmelk. Server med ris.' },
    en: { navn: 'Curry', kort: 'A spiced stew, often with coconut milk. Serve with rice.' },
    krever: [['kylling', 'svinekjott', 'reker', 'torsk', 'kikerter', 'bonner', 'tofu']],
    bruker: ['ris', 'kokosmelk', '@gronnsak'],
    allergener: ['sennep', 'selleri', 'peanotter', 'notter', 'melk', 'fisk', 'skalldyr'],
  },
  {
    id: 'ovnsform', ikon: '🔥', sok: { nb: 'i ovn med grønnsaker', en: 'traybake' },
    nb: { navn: 'Alt i ovnen', kort: 'Skjær i biter, krydre og stek alt sammen på ett brett.' },
    en: { navn: 'Traybake', kort: 'Cut into pieces, season and roast everything on one tray.' },
    krever: [['@protein'], ['@gronnsak', 'poteter']],
    bruker: ['poteter', '@gronnsak'],
    allergener: ['sennep'],
  },
  {
    id: 'kremet-gryte', ikon: '🍲', sok: { nb: 'gryte med fløte', en: 'creamy casserole' },
    nb: { navn: 'Kremet gryte', kort: 'Brun kjøttet, ha i grønnsaker og fløte eller rømme, og la det småkoke.' },
    en: { navn: 'Creamy casserole', kort: 'Brown the meat, add vegetables and cream, and let it simmer.' },
    krever: [['kylling', 'svinekjott', 'kjottdeig', 'polser', 'sopp']],
    bruker: ['ris', 'pasta', 'poteter', 'flote', 'romme', '@gronnsak'],
    allergener: ['melk', 'gluten', 'selleri'],
  },
  {
    id: 'suppe', ikon: '🥣', sok: { nb: 'suppe', en: 'soup' },
    nb: { navn: 'Suppe', kort: 'Kok grønnsakene møre i kraft og mos dem, eller la bitene være hele.' },
    en: { navn: 'Soup', kort: 'Simmer the vegetables in stock, then blend or leave them chunky.' },
    krever: [['@gronnsak']],
    bruker: ['poteter', 'flote', 'kokosmelk', '@protein'],
    allergener: ['selleri', 'melk', 'gluten'],
  },
  {
    id: 'pasta', ikon: '🍝', sok: { nb: 'pasta', en: 'pasta' },
    nb: { navn: 'Pastarett', kort: 'Kok pasta og vend inn en enkel saus med det du har.' },
    en: { navn: 'Pasta dish', kort: 'Cook pasta and toss it with a simple sauce from what you have.' },
    krever: [['pasta']],
    bruker: ['@protein', '@gronnsak', 'ost', 'flote'],
    allergener: ['gluten', 'melk', 'egg'],
  },
  {
    id: 'taco', ikon: '🌮', sok: { nb: 'taco', en: 'tacos' },
    nb: { navn: 'Taco eller wrap', kort: 'Stekt fyll i lefser med friske grønnsaker på toppen.' },
    en: { navn: 'Tacos or wraps', kort: 'Fried filling in tortillas, topped with fresh vegetables.' },
    krever: [['tortilla'], ['@protein']],
    bruker: ['@gronnsak', 'ost', 'romme'],
    allergener: ['gluten', 'melk', 'selleri'],
  },
  {
    id: 'omelett', ikon: '🍳', sok: { nb: 'omelett', en: 'omelette' },
    nb: { navn: 'Omelett', kort: 'Pisk eggene og stek dem med fyll av det du har.' },
    en: { navn: 'Omelette', kort: 'Whisk the eggs and fry them with whatever filling you have.' },
    krever: [['egg']],
    bruker: ['@gronnsak', 'ost', 'bacon', 'poteter'],
    allergener: ['egg', 'melk'],
  },
  {
    id: 'bowl', ikon: '🍱', sok: { nb: 'risbolle', en: 'rice bowl' },
    nb: { navn: 'Risbolle', kort: 'Ris i bunnen, med kjøtt, fisk eller bønner og grønnsaker på toppen.' },
    en: { navn: 'Rice bowl', kort: 'Rice at the bottom with meat, fish or beans and vegetables on top.' },
    krever: [['ris', 'couscous'], ['@protein']],
    bruker: ['@gronnsak'],
    allergener: ['soya', 'sesam', 'gluten', 'fisk'],
  },
  {
    id: 'stekt-ris', ikon: '🍚', sok: { nb: 'stekt ris', en: 'fried rice' },
    nb: { navn: 'Stekt ris', kort: 'Stek kokt ris med egg og småbiter av grønnsaker. Fint for rester.' },
    en: { navn: 'Fried rice', kort: 'Fry cooked rice with egg and small pieces of vegetables. Good for leftovers.' },
    krever: [['ris']],
    bruker: ['egg', '@protein', '@gronnsak'],
    allergener: ['egg', 'soya', 'gluten', 'sesam', 'fisk', 'blotdyr'],
  },
  {
    id: 'fisk-i-ovn', ikon: '🐟', sok: { nb: 'fisk i ovn', en: 'baked fish' },
    nb: { navn: 'Fisk i ovn', kort: 'Legg fisken i en form med grønnsaker og stek den til den er akkurat ferdig.' },
    en: { navn: 'Baked fish', kort: 'Put the fish in a dish with vegetables and bake until just done.' },
    krever: [['laks', 'torsk']],
    bruker: ['poteter', 'ris', 'flote', '@gronnsak'],
    allergener: ['fisk', 'melk'],
  },
  {
    id: 'salat', ikon: '🥗', sok: { nb: 'middagssalat', en: 'dinner salad' },
    nb: { navn: 'Middagssalat', kort: 'Friske grønnsaker med noe mettende på toppen.' },
    en: { navn: 'Dinner salad', kort: 'Fresh vegetables with something filling on top.' },
    krever: [['agurk', 'tomat', 'avokado', 'spinat', 'paprika', 'mais'], ['@protein']],
    bruker: ['@gronnsak', 'ost'],
    allergener: ['sennep', 'egg', 'melk', 'notter'],
  },
  {
    id: 'kjott-og-poteter', ikon: '🥔', sok: { nb: 'middag med poteter', en: 'dinner with potatoes' },
    nb: { navn: 'Kjøtt eller fisk med poteter', kort: 'Stek kjøttet eller fisken, og server med poteter og grønnsaker.' },
    en: { navn: 'Meat or fish with potatoes', kort: 'Pan-fry the meat or fish and serve with potatoes and vegetables.' },
    krever: [['poteter'], ['@protein']],
    bruker: ['@gronnsak'],
    allergener: ['melk', 'gluten'],
  },
  {
    id: 'burger', ikon: '🍔', sok: { nb: 'hjemmelaget burger', en: 'homemade burger' },
    nb: { navn: 'Hjemmelaget burger', kort: 'Form kjøttdeigen til burgere og server i brød med grønnsaker.' },
    en: { navn: 'Homemade burger', kort: 'Shape the mince into patties and serve in bread with vegetables.' },
    krever: [['kjottdeig'], ['brod']],
    bruker: ['ost', 'tomat', 'agurk', 'lok'],
    allergener: ['gluten', 'egg', 'sennep', 'sesam', 'melk', 'soya'],
  },
  {
    id: 'grateng', ikon: '🧀', sok: { nb: 'grateng', en: 'gratin' },
    nb: { navn: 'Grateng', kort: 'Legg alt i en form, dryss ost over og stek til det er gyllent.' },
    en: { navn: 'Gratin', kort: 'Put everything in a dish, top with cheese and bake until golden.' },
    krever: [['ost'], ['pasta', 'poteter', 'blomkal', 'brokkoli']],
    bruker: ['flote', 'melk', 'bacon', 'kylling', 'kjottdeig', '@gronnsak'],
    allergener: ['melk', 'gluten', 'egg'],
  },
  {
    id: 'chili', ikon: '🌶️', sok: { nb: 'chili con carne', en: 'chilli' },
    nb: { navn: 'Chili', kort: 'Bønner eller kjøttdeig som småkoker med tomat og krydder.' },
    en: { navn: 'Chilli', kort: 'Beans or mince simmered with tomato and spices.' },
    krever: [['bonner', 'kjottdeig'], ['hermetiske-tomater', 'tomat']],
    bruker: ['lok', 'paprika', 'mais', 'ris', 'tortilla', 'romme'],
    allergener: ['selleri', 'gluten', 'melk'],
  },
];
