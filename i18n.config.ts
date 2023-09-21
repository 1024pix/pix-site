export default {
  lazy: true,
  langDir: "translations",
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
      code: "fr-be",
      file: "fr-be.js",
    },
    {
      code: "fr-fr",
      file: "fr-fr.js",
    },
  ],
  defaultLocale: "fr-fr",
  compilation: {
    strictMessage: false,
  },
};
