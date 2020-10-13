export default function (context) {
  const { req, route } = context
  const host = req ? req.headers.host : window.location.host
  context.currentPagePath = `${host}${route.path}`
}
