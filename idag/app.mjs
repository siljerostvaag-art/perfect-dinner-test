// Skjermen for «Hva kan jeg lage i dag?». All logikk ligger i motor.mjs.
// Valgene holdes bare i minnet mens siden er åpen. Ingenting lagres eller sendes.
import { INGREDIENSER, GRUPPER, ALLERGIER, ANTALL_ALLERGIER_FORST } from './data.mjs';
import { forslag, sokeTekst, sokeLenke, rensFritekst, ingrediensAdvarsler, finnIngrediens, allergiNavn, sokbareVarer, IKKE_DEKKET } from './motor.mjs';
import { t } from './tekster.mjs';

const tilstand = {
  sprak: 'nb',
  varer: new Set(),
  allergier: new Set(),
  fritekst: '',
};

const $ = (id) => document.getElementById(id);

function lag(tag, egenskaper = {}, ...barn) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(egenskaper)) {
    if (k === 'tekst') el.textContent = v;
    else if (k === 'klasse') el.className = v;
    else el.setAttribute(k, v);
  }
  for (const b of barn) if (b) el.append(b);
  return el;
}

function avkrysning(prefiks, id, navn, valgt, vedEndring, ikon = '') {
  const inputId = `${prefiks}-${id}`;
  const input = lag('input', { type: 'checkbox', id: inputId, value: id });
  input.checked = valgt;
  input.addEventListener('change', () => vedEndring(id, input.checked));
  const etikett = lag('label', { for: inputId });
  if (ikon) etikett.append(lag('span', { klasse: 'ikon', 'aria-hidden': 'true', tekst: ikon }));
  etikett.append(lag('span', { tekst: navn }));
  return lag('span', { klasse: 'brikke' }, input, etikett);
}

const storForbokstav = (tekst) => tekst.charAt(0).toUpperCase() + tekst.slice(1);

function liste(ord, sprak) {
  if (ord.length <= 1) return ord.join('');
  return `${ord.slice(0, -1).join(', ')} ${t(sprak, 'og')} ${ord[ord.length - 1]}`;
}

function tegnValg() {
  const s = tilstand.sprak;
  document.documentElement.lang = s === 'en' ? 'en' : 'nb';
  document.title = t(s, 'tittel');
  for (const [id, nokkel] of [
    ['tittel', 'tittel'], ['ingress', 'ingress'], ['har-overskrift', 'har_overskrift'],
    ['fritekst-etikett', 'fritekst_etikett'], ['fritekst-hjelp', 'fritekst_hjelp'],
    ['nullstill', 'nullstill'], ['allergi-overskrift', 'allergi_overskrift'],
    ['allergi-ingress', 'allergi_ingress'], ['flere-allergier-tittel', 'flere_allergier'],
    ['forslag-overskrift', 'forslag_overskrift'], ['bunntekst', 'bunntekst'],
    ['valgfritt', 'valgfritt'], ['allergi-mer', 'allergi_mer'], ['se-forslag', 'se_forslag'],
  ]) $(id).textContent = t(s, nokkel);
  $('fritekst').setAttribute('placeholder', t(s, 'fritekst_plassholder'));
  const bytt = $('bytt-sprak');
  bytt.textContent = t(s, 'bytt_sprak');
  bytt.setAttribute('aria-label', t(s, 'bytt_sprak_etikett'));
  bytt.setAttribute('lang', s === 'en' ? 'nb' : 'en');

  const varer = $('varer');
  varer.replaceChildren();
  for (const g of GRUPPER) {
    const felt = lag('fieldset', { klasse: 'gruppe' }, lag('legend', { tekst: g[s] }));
    const valg = lag('div', { klasse: 'valg' });
    for (const v of INGREDIENSER.filter((i) => i.gruppe === g.id)) {
      valg.append(avkrysning('vare', v.id, v[s], tilstand.varer.has(v.id), (id, pa) => {
        pa ? tilstand.varer.add(id) : tilstand.varer.delete(id);
        tegnResultat();
      }, v.ikon));
    }
    felt.append(valg);
    varer.append(felt);
  }

  const vedAllergi = (id, pa) => {
    pa ? tilstand.allergier.add(id) : tilstand.allergier.delete(id);
    tegnResultat();
  };
  $('allergier-forst').replaceChildren(...ALLERGIER.slice(0, ANTALL_ALLERGIER_FORST)
    .map((a) => avkrysning('allergi', a.id, a[s], tilstand.allergier.has(a.id), vedAllergi)));
  $('allergier-flere').replaceChildren(...ALLERGIER.slice(ANTALL_ALLERGIER_FORST)
    .map((a) => avkrysning('allergi', a.id, a[s], tilstand.allergier.has(a.id), vedAllergi)));
  // Er noe valgt i den lukkede delen, vises den åpen så valget ikke glemmes (A2).
  if (ALLERGIER.slice(ANTALL_ALLERGIER_FORST).some((a) => tilstand.allergier.has(a.id))) $('flere-allergier').open = true;

  $('fritekst').value = tilstand.fritekst;
  tegnResultat();
}

let lopenummer = 0;
function sokeblokk(tekst, knappetekst, etikett, s) {
  const nr = ++lopenummer;
  const lenke = lag('a', {
    klasse: 'knapp', href: sokeLenke(tekst), target: '_blank', rel: 'noopener noreferrer',
    'aria-label': etikett, 'aria-describedby': `sok-${nr} adv-${nr}`, tekst: knappetekst,
  });
  return lag('div', { klasse: 'sok' },
    lenke,
    lag('p', { klasse: 'hjelp', id: `sok-${nr}`, tekst: `${t(s, 'sok_viser')} «${tekst}»` }),
    lag('p', { klasse: 'advarsel', id: `adv-${nr}`, tekst: t(s, 'nett_advarsel') }),
  );
}

function tegnResultat() {
  const s = tilstand.sprak;
  const ut = $('resultat');
  ut.replaceChildren();
  lopenummer = 0;
  const fritekst = rensFritekst(tilstand.fritekst);
  const valgte = INGREDIENSER.map((i) => i.id).filter((id) => tilstand.varer.has(id));

  for (const adv of ingrediensAdvarsler(valgte, tilstand.allergier)) {
    ut.append(lag('p', { klasse: 'varsel', tekst: t(s, 'vare_advarsel', {
      vare: storForbokstav(finnIngrediens(adv.ingrediens)[s]),
      allergener: liste(adv.allergener.map((a) => allergiNavn(a, s).toLowerCase()), s),
    }) }));
  }

  const ikkeDekket = IKKE_DEKKET.filter((a) => tilstand.allergier.has(a));
  if (ikkeDekket.length) {
    ut.append(lag('p', { klasse: 'varsel', tekst: t(s, 'ikke_dekket', { allergier: liste(ikkeDekket.map((a) => allergiNavn(a, s).toLowerCase()), s) }) }));
  }

  tegnBunnlinje(valgte.length + fritekst.length);

  if (valgte.length === 0 && fritekst.length === 0) {
    ut.append(lag('div', { klasse: 'tomt' },
      lag('span', { klasse: 'tomt-ikon', 'aria-hidden': 'true', tekst: '🍽️' }),
      lag('p', { tekst: t(s, 'velg_forst') })));
    $('status').textContent = '';
    return;
  }

  const { vist, skjult } = forslag(valgte, tilstand.allergier);
  const status = skjult > 0 ? t(s, 'status_skjult', { antall: vist.length, skjult }) : t(s, 'status', { antall: vist.length });
  if ($('status').textContent !== status) $('status').textContent = status;
  if (tilstand.allergier.size > 0) {
    const info = lag('div', { klasse: 'filterinfo' });
    if (skjult > 0) info.append(lag('p', { tekst: skjult === 1 ? t(s, 'skjult_en') : t(s, 'skjult_flere', { antall: skjult }) }));
    info.append(lag('p', { tekst: t(s, 'filter_grunnlag') }));
    ut.append(info);
  }

  if (vist.length === 0) ut.append(lag('p', { tekst: t(s, 'ingen_treff') }));

  const liste_ = lag('ol', { klasse: 'ideer' });
  vist.forEach(({ ide, brukte }, plass) => {
    const navn = ide[s].navn;
    const tittel = lag('div', { klasse: 'ide-tittel' });
    if (plass === 0 && vist.length > 1) tittel.append(lag('span', { klasse: 'merke beste', tekst: t(s, 'beste_treff') }));
    tittel.append(lag('h3', { tekst: navn }), lag('p', { tekst: ide[s].kort }));
    const brukteListe = lag('ul', { klasse: 'brukte', 'aria-label': t(s, 'du_har') });
    for (const id of brukte) {
      const v = finnIngrediens(id);
      brukteListe.append(lag('li', {}, lag('span', { 'aria-hidden': 'true', tekst: v.ikon + ' ' }), v[s]));
    }
    liste_.append(lag('li', { klasse: 'kort ide' },
      lag('div', { klasse: 'ide-topp' },
        lag('span', { klasse: 'ide-ikon', 'aria-hidden': 'true', tekst: ide.ikon }),
        tittel),
      brukteListe,
      sokeblokk(sokeTekst(brukte, fritekst, ide.id, s), t(s, 'finn_oppskrifter'),
        t(s, 'finn_oppskrifter_etikett', { navn: navn.toLowerCase() }), s),
    ));
  });
  if (vist.length) ut.append(liste_);

  ut.append(lag('div', { klasse: 'kort alt' },
    lag('h3', { tekst: t(s, 'sok_med_alt_overskrift') }),
    sokeblokk(sokeTekst(sokbareVarer(valgte, tilstand.allergier), fritekst, null, s), t(s, 'sok_med_alt'), t(s, 'sok_med_alt_etikett'), s)));
}

let forslagSynlig = false;
let antallValgt = 0;
function tegnBunnlinje(antall = antallValgt) {
  antallValgt = antall;
  const s = tilstand.sprak;
  $('valgt-tekst').textContent = antall === 1 ? t(s, 'valgt_en') : t(s, 'valgt_flere', { antall });
  // Uten IntersectionObserver vet vi ikke når forslagene synes; da vises linjen aldri, så den ikke dekker noe.
  $('bunnlinje').hidden = antall === 0 || forslagSynlig || !('IntersectionObserver' in window);
}

function start() {
  $('se-forslag').addEventListener('click', (e) => {
    e.preventDefault();
    const maal = $('forslag');
    const rolig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    maal.scrollIntoView({ behavior: rolig ? 'auto' : 'smooth', block: 'start' });
    maal.focus({ preventScroll: true });
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((rader) => {
      forslagSynlig = rader[0].isIntersecting;
      tegnBunnlinje();
    }, { rootMargin: '0px 0px -40% 0px' }).observe($('forslag'));
  }
  $('bytt-sprak').addEventListener('click', () => {
    tilstand.sprak = tilstand.sprak === 'nb' ? 'en' : 'nb';
    tegnValg();
  });
  $('fritekst').addEventListener('input', (e) => {
    tilstand.fritekst = e.target.value;
    tegnResultat();
  });
  $('nullstill').addEventListener('click', () => {
    tilstand.varer.clear();
    tilstand.fritekst = '';
    tegnValg();
    $('fritekst').focus();
  });
  tegnValg();
}

start();
