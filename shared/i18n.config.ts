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
  {
    code: "fr-be",
    file: "fr-be.js",
    name: "Fédération Wallonie-Bruxelles",
    icon: "flag-be.svg",
    domain: process.env.DOMAIN_ORG
  }
];

const config = {
  lazy: true,
  langDir: "translations",
  locales: reachableLocales,
  strategy: "prefix_except_default",
  defaultLocale: "fr-fr",
  compilation: {
    strictMessage: false
  },
  detectBrowserLanguage: false
};

if (process.env.SITE_DOMAIN === "FR") {
  config.locales = reachableLocales.filter((locale) => locale.code === "fr-fr");
}

if (process.env.SITE_DOMAIN === "ORG") {
  config.locales = reachableLocales.filter((locale) => locale.code !== "fr-fr");
  config.defaultLocale = null;
  config.strategy = "prefix";
}

export default { ...config };
export { reachableLocales };
