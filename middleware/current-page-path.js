import { SITES_PRISMIC_TAGS } from '~/services/available-sites'

// Middleware computes og:url for meta tags (SEO)
export default function (context) {
  const { app, route } = context
  const host = getHost(app.i18n.locale)
  context.currentPagePath = `${host}${route.path}`
}

function getHost(locale) {
  if (process.env.SITE === SITES_PRISMIC_TAGS.PIX_SITE) {
    return locale === 'fr-fr' ? 'https://pix.fr' : 'https://pix.org'
  }
  return 'https://pro.pix.fr'
}
