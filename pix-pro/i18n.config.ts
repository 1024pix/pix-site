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
    code: 'fr-FR',
    iso: 'fr-FR',
    file: 'fr-FR.js',
    name: 'France',
    icon: 'flag-fr.svg',
    domain: process.env.DOMAIN_FR,
  },
];

const reachableLocaleNames = reachableLocales.map(reachableLocale => reachableLocale.code);
// When the locales are by default written in their canonical form this reachableLocaleCanonicalNames variable
// will be useless and thus removed.
const reachableLocaleCanonicalNames = reachableLocaleNames.map(localeName => new Intl.Locale(localeName).toString());

const config = generateConfig(reachableLocales);
export default { ...config };
export { reachableLocales, reachableLocaleNames, reachableLocaleCanonicalNames };
