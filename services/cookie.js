import { config } from '~/config/environment'

function getCookie(name) {
  const cookie = document.cookie
    .split('; ')
    .find((item) => item.startsWith(name))

  if (!cookie) return null

  return cookie.split('=')[1]
}

function setCookie(name, value, isDev) {
  const cookieProperties = [
    `${name}=${value}`,
    'path=/',
    'max-age=31536000',
    'SameSite=Strict',
  ]

  if (!isDev) {
    cookieProperties.push(`domain=${config.siteDomain}`)
  }

  document.cookie = cookieProperties.join('; ')
}

export { getCookie, setCookie }
