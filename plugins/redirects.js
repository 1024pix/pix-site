// https://github.com/nuxt/nuxt.js/issues/2367
export default function ({ app }) {
  app.router.onReady(() => {
    if (
      process.env.isPixSite &&
      window.location.hostname.endsWith('.org') &&
      app.i18n.locale === 'fr-fr'
    ) {
      app.i18n.setLocale('fr')
    }
  })
}
