import { config } from '~/config/environment'

export async function shouldShowOutOfFranceBanner(baseUrl) {
  const FR_COUNTRY_CODE = 'FR'
  const url = new URL('/geolocate', baseUrl)

  if (!config.isFrenchDomain || !config.isPixSite) return false

  const response = await fetch(url).then((res) => res.json())

  if (!response?.country) return false

  return response.country !== FR_COUNTRY_CODE
}
