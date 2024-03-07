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

  if (process.env.SITE_DOMAIN === "ORG") {
    config.defaultLocale = null;
    config.strategy = "prefix";
  }

  config.locales = reachableLocales;

  return config
}
