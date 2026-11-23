// Regnedelen for «Hva kan jeg lage i dag?». Ingen skjerm, ingen nett, ingen lagring.
// Allergivalg brukes bare til å skjule idéer og vise påminnelser.
// De sendes ALDRI med søket: søkefunksjonene tar ikke imot dem.

import { INGREDIENSER, IDEER, ALLERGIER } from './data.mjs';

export const MAKS_FORSLAG = 5;
export const MAKS_FRITEKST = 5;
export const MAKS_FRITEKST_LENGDE = 40;

const ingrediensEtterId = new Map(INGREDIENSER.map((i) => [i.id, i]));
const allergiEtterId = new Map(ALLERGIER.map((a) => [a.id, a]));

export function finnIngrediens(id) {
  return ingrediensEtterId.get(id);
}

function passer(post, vare) {
  if (post.startsWith('@')) return vare.gruppe === post.slice(1);
  return post === vare.id;
}

// Hvilke av brukerens varer passer inn i en liste av poster.
function treff(poster, valgte) {
  return valgte.filter((v) => poster.some((p) => passer(p, v)));
}

function vurder(ide, valgte) {
  // Alle plasser i «krever» må fylles.
  for (const plass of ide.krever) {
    if (treff(plass, valgte).length === 0) return null;
  }
  const alle = [...ide.krever.flat(), ...ide.bruker];
  const brukte = treff(alle, valgte);
  return { ide, brukte: brukte.map((v) => v.id), poeng: brukte.length };
}

/**
 * Finn middagsidéer.
 * @param {Iterable<string>} valgteIder  ID-er for varene brukeren har.
 * @param {Iterable<string>} allergiIder ID-er for valgte allergier.
 * @returns {{ vist: Array<{ide, brukte: string[], poeng: number}>, skjult: number, skjultIder: string[] }}
 */
export function forslag(valgteIder, allergiIder = [], maks = MAKS_FORSLAG) {
  const alleValgte = [...new Set(valgteIder)].map(finnIngrediens).filter(Boolean);
  const allergier = new Set(allergiIder);
  // Varer som vanligvis inneholder en valgt allergi, brukes verken i idéer eller søk.
  const valgte = alleValgte.filter((v) => !v.allergener.some((a) => allergier.has(a)));
  const passende = [];
  const skjultIder = [];
  IDEER.forEach((ide, rekkefolge) => {
    const v = vurder(ide, valgte);
    // Idéen ville passet med alle varene, men ikke uten allergivarene: skjult.
    if (!v) {
      if (valgte.length !== alleValgte.length && vurder(ide, alleValgte)) skjultIder.push(ide.id);
      return;
    }
    if (ide.allergener.some((a) => allergier.has(a))) {
      skjultIder.push(ide.id);
      return;
    }
    passende.push({ ...v, rekkefolge });
  });
  passende.sort((a, b) => b.poeng - a.poeng || a.rekkefolge - b.rekkefolge);
  const vist = passende.slice(0, maks).map(({ ide, brukte, poeng }) => ({ ide, brukte, poeng }));
  return { vist, skjult: skjultIder.length, skjultIder };
}

/** Varer brukeren kan søke med: de valgte, uten dem som vanligvis inneholder en valgt allergi. */
export function sokbareVarer(valgteIder, allergiIder) {
  const allergier = new Set(allergiIder);
  return [...new Set(valgteIder)].filter((id) => {
    const v = finnIngrediens(id);
    return v && !v.allergener.some((a) => allergier.has(a));
  });
}

/** Allergier som ingen idé er merket med. Filteret kan ikke skjule noe for dem. */
export const IKKE_DEKKET = ALLERGIER.map((a) => a.id).filter((id) => !IDEER.some((i) => i.allergener.includes(id)));

/** Varer brukeren har valgt som vanligvis inneholder en valgt allergi. */
export function ingrediensAdvarsler(valgteIder, allergiIder) {
  const allergier = new Set(allergiIder);
  const ut = [];
  for (const id of new Set(valgteIder)) {
    const vare = finnIngrediens(id);
    if (!vare) continue;
    const funn = vare.allergener.filter((a) => allergier.has(a));
    if (funn.length) ut.push({ ingrediens: id, allergener: funn });
  }
  return ut;
}

/** Del opp «andre ting du har» i en kort, ryddet liste. */
export function rensFritekst(tekst) {
  if (typeof tekst !== 'string') return [];
  // Fjern halve tegn (kan ellers få søkelenken til å krasje), og kort ned per hele tegn (emoji).
  const hel = typeof tekst.toWellFormed === 'function' ? tekst.toWellFormed() : tekst.replace(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g, '�');
  const deler = hel
    .split(/[,;\n]+/)
    .map((d) => Array.from(d.replace(/\s+/g, ' ').trim()).slice(0, MAKS_FRITEKST_LENGDE).join('').trim())
    .filter(Boolean);
  const sett = [];
  for (const d of deler) {
    if (!sett.some((s) => s.toLowerCase() === d.toLowerCase())) sett.push(d);
  }
  return sett.slice(0, MAKS_FRITEKST);
}

/**
 * Lag søketeksten. Tar bevisst IKKE imot allergier.
 * @param {string[]} ingrediensIder varer som skal være med (i fast rekkefølge)
 * @param {string[]} fritekst ryddet fritekst (fra rensFritekst)
 * @param {string|null} ideId  idéen det søkes for, eller null for «søk med alt»
 * @param {'nb'|'en'} sprak
 */
export function sokeTekst(ingrediensIder, fritekst, ideId, sprak) {
  const s = sprak === 'en' ? 'en' : 'nb';
  const ide = ideId ? IDEER.find((i) => i.id === ideId) : null;
  // Varer som allerede står i navnet på retten (f.eks. «ris» i «stekt ris») tas ikke med to ganger.
  const rettOrd = new Set(ide ? ide.sok[s].toLowerCase().split(' ') : []);
  const ord = [];
  for (const id of ingrediensIder) {
    const vare = finnIngrediens(id);
    if (vare && !rettOrd.has(vare[s].toLowerCase())) ord.push(vare[s]);
  }
  ord.push(...fritekst);
  if (ide) ord.push(ide.sok[s]);
  else ord.push(s === 'en' ? 'dinner' : 'middag');
  ord.push(s === 'en' ? 'recipe' : 'oppskrift');
  return ord.join(' ');
}

export function sokeLenke(tekst) {
  return 'https://www.google.com/search?q=' + encodeURIComponent(tekst);
}

export function allergiNavn(id, sprak) {
  const a = allergiEtterId.get(id);
  return a ? a[sprak === 'en' ? 'en' : 'nb'] : id;
}
