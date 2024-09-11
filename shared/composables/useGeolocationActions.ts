const FRANCE_COUNTRY_CODE = 'FR';
const DOMTOM_COUNTRY_CODES = ['GA', 'GF', 'MQ', 'RE', 'YT', 'NC', 'PF', 'BL', 'MF', 'PM', 'TF', 'WF'];
const FRANCE_AND_DOMTOM_COUNTRIES_CODES = [FRANCE_COUNTRY_CODE, ...DOMTOM_COUNTRY_CODES];

const SITE_DOMAIN_FR = 'FR';

export default async function useGeolocationActions(currentUrl, useFetch) {
  const config = useRuntimeConfig();

  const country = await _getUserCountryFromGeolocationService(currentUrl, useFetch);
  const isUserInFranceOrDomtom = FRANCE_AND_DOMTOM_COUNTRIES_CODES.includes(country);
  const isPathEmpty = new URL(currentUrl).pathname === '/';

  const shouldRedirectToFrFr = isUserInFranceOrDomtom && isPathEmpty;

  const showOutOfFranceBanner = (function () {
    if (config.public.siteDomain !== SITE_DOMAIN_FR) return false;

    if (!country) return false;

    return _shouldShowBannerForCountry(country);
  })();

  return {
    showOutOfFranceBanner,
    shouldRedirectToFrFr,
  };
}

async function _getUserCountryFromGeolocationService(origin, $fetch) {
  console.log('_getUserCountryFromGeolocationService');
  const geolocationApiUrl = new URL('/geolocate', origin);
  console.log('_getUserCountryFromGeolocationService url:', geolocationApiUrl);

  const data = await $fetch(geolocationApiUrl);
  console.log({ data });

  if (!data) return undefined;

  return data.country;
}

function _shouldShowBannerForCountry(country) {
  return !FRANCE_AND_DOMTOM_COUNTRIES_CODES.includes(country);
}
