export default function (context) {
  const { req, route, redirect } = context
  const host = req ? req.headers.host : window.location.host

  if (req && req.url === '/') {
    redirect(`${host}/employeurs`)
  }
  context.currentPagePath = `${host}${route.path}`
}
