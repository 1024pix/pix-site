export default {
  lazy: true,
  langDir: "translations",
  locales: [
    {
      code: "en",
      file: "en.js",
      name: "International English",
      icon: "globe-europe.svg",
      domain: process.env.DOMAIN_ORG,
    },
    {
      code: "fr",
      file: "fr.js",
      name: "International Français",
      icon: "globe-europe.svg",
      domain: process.env.DOMAIN_ORG,
    },
    {
      code: "fr-be",
      file: "fr-be.js",
      name: "Fédération Wallonie-Bruxelles",
      icon: "flag-be.svg",
      domain: process.env.DOMAIN_ORG,
    },
    {
      code: "fr-fr",
      file: "fr-fr.js",
      name: "France",
      icon: "flag-fr.svg",
      domain: process.env.DOMAIN_FR,
    },
  ],
  defaultLocale: "fr-fr",
  differentDomains: process.env.NODE_ENV === "production",
  compilation: {
    strictMessage: false,
  },
};
