export default function(req, res, next) {
  const shouldRedirect = ['/mediation-numerique'].includes(req.url)
  if (shouldRedirect) {
    res.writeHead(301, { Location: `https://pro.pix.fr${req.url}` })
    res.end()
  } else {
    next()
  }
}
