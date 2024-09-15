const FR_FR_LOCALE_CODE = 'fr-fr';

export default function useEnvironmentUrl() {
  const getEnvironmentUrl = (url: string) => {
    const runtimeConfig = useRuntimeConfig();

    const siteUrlStart = runtimeConfig.public.site as string;
    const availableLocaleCodes: Array<string> = runtimeConfig.public.availableLocaleCodes as Array<string>;

    const urlObj = new URL(url);
    const prefix = urlObj.pathname.split('/')[1];

    // This is an URL from pix-site or pix-pro
    if (url.startsWith(siteUrlStart)) {
      // Adding the /fr-fr prefix if no locale prefix is found
      // TODO: Remove this block when there is no more
      // https://pix.fr/ or https://pro.pix.fr/ links in Prismic
      if (!availableLocaleCodes.includes(prefix)) {
        urlObj.pathname = `${FR_FR_LOCALE_CODE}${urlObj.pathname}`;
        url = urlObj.href;
      }

      // For development and test environments
      if (process.env.NODE_ENV !== 'production') {
        url = urlObj.pathname;
      }
    }

    return url;
  };

  return {
    getEnvironmentUrl,
  };
}
