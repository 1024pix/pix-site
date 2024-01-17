const baseConfig = {
  lazy: true,
  langDir: "../shared/translations",
  locales: [],
  strategy: "prefix_except_default",
  defaultLocale: "fr-fr",
  compilation: {
    strictMessage: false
  },
  detectBrowserLanguage: false
};

export function generateConfig(reachableLocales){
  const config = { ...baseConfig };

  if (process.env.SITE_DOMAIN === "FR") {
    config.locales = reachableLocales.filter((locale) => locale.code === "fr-fr");
  }

  if (process.env.SITE_DOMAIN === "ORG") {
    config.locales = reachableLocales.filter((locale) => locale.code !== "fr-fr");
    config.defaultLocale = null;
    config.strategy = "prefix";
  }

  return config
}
