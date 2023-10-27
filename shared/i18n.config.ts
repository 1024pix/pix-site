const config = {
  lazy: true,
  langDir: "translations",
  locales: [
    {
      code: "en",
      file: "en.js",
      name: "English",
      icon: "globe-europe.svg",
      // domain: process.env.DOMAIN_ORG,
    },
    {
      code: "fr",
      file: "fr.js",
      name: "Français",
      icon: "globe-europe.svg",
      // domain: process.env.DOMAIN_ORG,
    },
    {
      code: "fr-fr",
      file: "fr-fr.js",
      name: "France",
      icon: "flag-fr.svg",
      // domain: process.env.DOMAIN_FR,
    },
  ],
  strategy: "prefix_except_default",
  defaultLocale: "fr-fr",
  // differentDomains: process.env.NODE_ENV === "production",
  compilation: {
    strictMessage: false,
  },
  detectBrowserLanguage: {
    useCookie: false,
  },
};

if (process.env.SITE === "pix-site") {
  config.locales.push({
    code: "fr-be",
    file: "fr-be.js",
    name: "Fédération Wallonie-Bruxelles",
    icon: "flag-be.svg",
    // domain: process.env.DOMAIN_ORG,
  });
}

export default { ...config };
