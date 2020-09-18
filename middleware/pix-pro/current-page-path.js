export default function (context) {
  const { req, route, redirect } = context
  const shouldRedirect = ![
    '/mediation-numerique',
    '/employeurs',
    '/continuite-pedagogique-of',
    '/cadre-juridique-continuite-pedagogique',
  ].includes(route.path)
  if (shouldRedirect) {
    redirect(`https://pix.fr/${route.path}`)
  }
  const host = req ? req.headers.host : window.location.host
  context.currentPagePath = `${host}${route.path}`
}
