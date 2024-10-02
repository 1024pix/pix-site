const LOCALE_COOKIE_NAME = 'locale';

export default function useLocaleCookie() {
  const appConfig = useAppConfig();
  const runtimeConfig = useRuntimeConfig();
  const domainFrUrl = new URL(appConfig.domainFr);
  const domainOrgUrl = new URL(appConfig.domainOrg);

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
  function setLocaleCookie(locale: string, callback?: Function): void {
    const localeCanonicalName = Intl.getCanonicalLocales(locale)?.[0];

    if (previousLocaleCookieToDelete.value) {
      previousLocaleCookieToDelete.value = null;
    }

    localeCookie.value = localeCanonicalName;
    if (callback) callback();
  }

  return {
    localeCookie,
    setLocaleCookie,
  };
}
