const LOCALE_COOKIE_NAME = 'locale';

export default function useLocaleCookie() {
  const appConfig = useAppConfig();
  const runtimeConfig = useRuntimeConfig();

  const domainFrUrl = new URL(appConfig.domainFr);
  const domainOrgUrl = new URL(appConfig.domainOrg);

  const availableLocaleNames = runtimeConfig.public.availableLocaleNames as Array<string>;

  const previousLocaleCookieToDelete = useCookie(LOCALE_COOKIE_NAME, {
    maxAge: 31536000, // 1 year
    sameSite: 'strict',
  });

  const localeCookie = useCookie(LOCALE_COOKIE_NAME, {
    domain: runtimeConfig.public.siteDomain === 'ORG' ? domainOrgUrl.hostname : domainFrUrl.hostname,
    maxAge: 31536000, // 1 year
    sameSite: 'strict',
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  function setLocaleCookie(localeName: string, callback?: Function): void {
    if (previousLocaleCookieToDelete.value) {
      previousLocaleCookieToDelete.value = null;
    }

    localeCookie.value = localeName;
    if (callback) callback();
  }

  function getBestMatchingLocaleName(localeName: string) {
    const localeCanonicalName = Intl.getCanonicalLocales(localeName)?.[0];

    if (availableLocaleNames.includes(localeCanonicalName)) {
      return localeCanonicalName;
    }

    const localeCanonicalNameLanguage = new Intl.Locale(localeCanonicalName).language;
    if (availableLocaleNames.includes(localeCanonicalNameLanguage)) {
      return localeCanonicalNameLanguage;
    }

    return availableLocaleNames[0];
  }

  return {
    localeCookie,
    setLocaleCookie,
    getBestMatchingLocaleName,
  };
}
