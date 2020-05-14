export default function(context) {
  const { req, route } = context
  const host = _getHostFromRequest(req)
    ? _getHostFromRequest(req)
    : window.location.host

  context.currentPagePath = `${host}${route.path}`
}

function _getHostFromRequest(req) {
  if (!req) {
    return
  }
  const headers = req.headers
  return headers['x-forwarded-host']
    ? headers['x-forwarded-host']
    : headers.host
}
