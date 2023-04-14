import { config } from '~/config/environment'

const FR_COUNTRY_CODE = 'FR'
const DOM_TOM_COUNTRY_CODES = [
  'GA',
  'GF',
  'MQ',
  'RE',
  'YT',
  'NC',
  'PF',
  'BL',
  'MF',
  'PM',
  'TF',
  'WF',
]
const COUNTRIES_WHERE_BANNER_SHOULD_NOT_BE_SHOWN = [
  FR_COUNTRY_CODE,
  ...DOM_TOM_COUNTRY_CODES,
]

export async function shouldShowOutOfFranceBanner(baseUrl) {
  if (!config.isFrenchDomain || !config.isPixSite) return false

  const country = await _getUserCountryFromGeolocationService(baseUrl)
  if (!country) return false

  return _shouldShowBannerForCountry(country)
}

async function _getUserCountryFromGeolocationService(baseUrl) {
  const url = new URL('/geolocate', baseUrl)

  const response = await fetch(url).then((res) => res.json())
  if (!response) return undefined

  return response.country
}

function _shouldShowBannerForCountry(country) {
  return !COUNTRIES_WHERE_BANNER_SHOULD_NOT_BE_SHOWN.includes(country)
}
