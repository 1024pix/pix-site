import getHostFromRequest from '~/services/get-host-from-request'

export default function (context) {
  const { req, route } = context
  const host = getHostFromRequest(req)
    ? getHostFromRequest(req)
    : window.location.host

  context.currentPagePath = `${host}${route.path}`
}
