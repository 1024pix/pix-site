import { generateConfig } from '../shared/i18n.config';
const reachableLocales = [
  {
    code: 'en',
    iso: 'en',
    file: 'en.js',
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
];

const config = generateConfig(reachableLocales);
export default { ...config };
export { reachableLocales };
