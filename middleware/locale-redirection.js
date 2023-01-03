export default function (context) {
  if (process.client) {
    const { route, redirect } = context
    if (route.path !== '/') {
      return
    }

    const localeCookie = _getLocaleFromCookie()
    return localeCookie
      ? redirect(`/${localeCookie}`)
      : redirect('/locale-choice')
  }
}

function _getLocaleFromCookie() {
  const localeCookie = document.cookie
    .split('; ')
    .find((item) => item.startsWith('locale'))
  if (!localeCookie) return null
  return localeCookie.split('=')[1]
}
