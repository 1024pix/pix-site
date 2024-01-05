const config = {
  lazy: true,
  langDir: "translations",
  locales: [
    {
      code: "en",
      file: "en.js",
      name: "English",
      icon: "globe-europe.svg",
      domain: `https://${process.env.DOMAIN_ORG}`
    },
    {
      code: "fr",
      file: "fr.js",
      name: "Français",
      icon: "globe-europe.svg",
      domain: `https://${process.env.DOMAIN_ORG}`
    },
    {
      code: "fr-fr",
      file: "fr-fr.js",
      name: "France",
      icon: "flag-fr.svg",
      domain: `https://${process.env.DOMAIN_FR}`
    }
  ],
  strategy: "prefix_except_default",
  defaultLocale: "fr-fr",
  compilation: {
    strictMessage: false
  },
  detectBrowserLanguage: false
};

if (process.env.SITE === "pix-site") {
  config.locales.push({
    code: "fr-be",
    file: "fr-be.js",
    name: "Fédération Wallonie-Bruxelles",
    icon: "flag-be.svg",
    domain: `https://${process.env.DOMAIN_ORG}`
  });
}

if (process.env.SITE_DOMAIN === 'FR') {
  config.locales = config.locales.filter((locale) => locale.code === 'fr-fr');
}

if (process.env.SITE_DOMAIN === 'ORG') {
  config.locales = config.locales.filter((locale) => locale.code !== 'fr-fr');
  config.defaultLocale = 'fr'
  config.strategy = 'prefix'
}

console.log(config);

export default { ...config };
