import { config } from '~/config/environment'

export async function shouldShowOutOfFranceBanner(baseUrl) {
  if (!config.isFrenchDomain || !config.isPixSite) return false

  const country = await _getUserCountryFromGeolocationService(baseUrl)
  if (!country) return false

  const FR_COUNTRY_CODE = 'FR'
  return country !== FR_COUNTRY_CODE
}

async function _getUserCountryFromGeolocationService(baseUrl) {
  const url = new URL('/geolocate', baseUrl)

  const response = await fetch(url).then((res) => res.json())
  if (!response) return undefined

  return response.country
}
