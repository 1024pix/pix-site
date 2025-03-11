import { generateConfig } from '../shared/i18n.config';

// "reachableLocales" should be renamed into "localeDefinitions"
const reachableLocales = [
  {
    // The "code" property should be renamed into "name": https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/Locale
    code: 'en',
    iso: 'en',
    file: 'en.js',
    // The "name" property should be renamed into "displayName": https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames/DisplayNames
    name: 'English',
    icon: 'globe-europe.svg',
    domain: process.env.DOMAIN_ORG,
  },
  {
    code: 'fr',
    iso: 'fr',
    file: 'fr.js',
    name: 'Français',
    icon: 'globe-europe.svg',
    domain: process.env.DOMAIN_ORG,
  },
  {
    code: 'es',
    iso: 'es',
    file: 'es.js',
    name: 'Español',
    icon: 'globe-europe.svg',
    domain: process.env.DOMAIN_ORG,
  },
  {
    code: 'it',
    iso: 'it',
    file: 'it.js',
    name: 'Italiano',
    icon: 'globe-europe.svg',
    domain: process.env.DOMAIN_ORG,
  },
  {
    code: 'de-AT',
    iso: 'de-AT',
    file: 'de-AT.js',
    name: 'Deutsch',
    icon: 'globe-europe.svg',
    domain: process.env.DOMAIN_ORG,
  },
  {
    code: 'fr-FR',
    iso: 'fr-FR',
    file: 'fr-FR.js',
    name: 'France',
    icon: 'flag-fr.svg',
    domain: process.env.DOMAIN_FR,
  },
  {
    code: 'fr-BE',
    iso: 'fr-BE',
    file: 'fr-BE.js',
    name: 'Belgique (Français)',
    icon: 'flag-be.svg',
    domain: process.env.DOMAIN_ORG,
  },
  {
    code: 'nl-BE',
    iso: 'nl-BE',
    file: 'nl-BE.js',
    name: 'België (Nederlands)',
    icon: 'flag-be.svg',
    domain: process.env.DOMAIN_ORG,
  },
];

const reachableLocaleNames = reachableLocales.map(reachableLocale => reachableLocale.code);

const config = generateConfig(reachableLocales);
export default { ...config };
export { reachableLocales, reachableLocaleNames };
