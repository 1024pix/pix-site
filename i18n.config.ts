export default {
  lazy: true,
  langDir: "translations",
  defaultLocale: "fr",
  locales: [
    {
      code: "en",
      file: "en.js",
    },
    {
      code: "fr",
      file: "fr.js",
    },
    {
      code: "fr-BE",
      file: "fr-be.js",
    },
    {
      code: "fr-FR",
      file: "fr-fr.js",
    },
  ],
  compilation: {
    strictMessage: false,
  },
};
