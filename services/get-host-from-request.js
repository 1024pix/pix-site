export default function getHostFromRequest(req) {
  if (!req) {
    return
  }
  const headers = req.headers
  return headers['x-forwarded-host']
    ? headers['x-forwarded-host']
    : headers.host
}
