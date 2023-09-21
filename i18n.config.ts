export default {
  lazy: true,
  langDir: "translations",
  defaultLocale: "fr-fr",
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
  compilation: {
    strictMessage: false,
  },
};
