import { generateConfig } from '../shared/i18n.config';

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
    code: 'fr-fr',
    iso: 'fr-fr',
    file: 'fr-fr.js',
    name: 'France',
    icon: 'flag-fr.svg',
    domain: process.env.DOMAIN_FR,
  },
  {
    code: 'fr-be',
    iso: 'fr-be',
    file: 'fr-be.js',
    name: 'Belgique (Français)',
    icon: 'flag-be.svg',
    domain: process.env.DOMAIN_ORG,
  },
  {
    code: 'nl-be',
    iso: 'nl-be',
    file: 'nl-be.js',
    name: 'België (Nederlands)',
    icon: 'flag-be.svg',
    domain: process.env.DOMAIN_ORG,
  },
];

const reachableLocaleNames = reachableLocales.map(reachableLocale => reachableLocale.code);

const config = generateConfig(reachableLocales);
export default { ...config };
export { reachableLocales, reachableLocaleNames };
