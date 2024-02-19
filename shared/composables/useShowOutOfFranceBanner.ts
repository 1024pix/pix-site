const FRANCE_COUNTRY_CODE = "FR";
const DOM_TOM_COUNTRY_CODES = [
  "GA",
  "GF",
  "MQ",
  "RE",
  "YT",
  "NC",
  "PF",
  "BL",
  "MF",
  "PM",
  "TF",
  "WF"
];
const COUNTRIES_WHERE_BANNER_SHOULD_NOT_BE_SHOWN = [
  FRANCE_COUNTRY_CODE,
  ...DOM_TOM_COUNTRY_CODES
];

async function _getUserCountryFromGeolocationService(baseUrl, useFetch) {
  const url = new URL("/geolocate", baseUrl);

  const response = await useFetch(url, { server: false });
  if (!response) return undefined;
  return response.country;
}

function _shouldShowBannerForCountry(country) {
  return !COUNTRIES_WHERE_BANNER_SHOULD_NOT_BE_SHOWN.includes(country);
}

export default function useShowOutOfFranceBanner() {
  const showOutOfFranceBanner = async (baseUrl, useFetch) => {
    const config = useRuntimeConfig();
    if (config.public.siteDomain !== "FR") return false;


    const country = await _getUserCountryFromGeolocationService(baseUrl, useFetch);

    if (!country) return false;

    return _shouldShowBannerForCountry(country);
  };

  return {
    showOutOfFranceBanner
  };
}


