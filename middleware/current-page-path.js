import { getCurrentSiteHost } from '~/services/get-current-site-host'

// Middleware computes og:url for meta tags (SEO)
export default function (context) {
  const { app, route } = context
  const host = getCurrentSiteHost(app.i18n.locale, true)
  context.currentPagePath = `${host}${route.path}`
}
