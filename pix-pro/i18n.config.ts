import { generateConfig } from "../shared/i18n.config";
const reachableLocales = [
  {
    code: "en",
    file: "en.js",
    name: "English",
    icon: "globe-europe.svg",
    domain: process.env.DOMAIN_ORG
  },
  {
    code: "fr",
    file: "fr.js",
    name: "Français",
    icon: "globe-europe.svg",
    domain: process.env.DOMAIN_ORG
  },
  {
    code: "fr-fr",
    file: "fr-fr.js",
    name: "France",
    icon: "flag-fr.svg",
    domain: process.env.DOMAIN_FR
  },
];

const config = generateConfig(reachableLocales);
export default { ...config };
export { reachableLocales };
