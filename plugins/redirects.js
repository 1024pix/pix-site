// https://github.com/nuxt/nuxt.js/issues/2367
export default function ({ app, route, redirect }) {
  app.router.onReady(() => {
    if (
      window.location.hostname.endsWith('.org') &&
      app.i18n.locale === 'fr-fr'
    ) {
      app.i18n.setLocale('fr')
    }
  })
}
