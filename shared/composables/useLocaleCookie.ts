export default function useLocaleCookie() {
  const appConfig = useAppConfig();
  const runtimeConfig = useRuntimeConfig();
  const domainFrUrl = new URL(appConfig.domainFr);
  const domainOrgUrl = new URL(appConfig.domainOrg);

  const localeCookie = useCookie('locale', {
    domain: runtimeConfig.public.siteDomain === 'ORG' ? domainOrgUrl.hostname : domainFrUrl.hostname,
    maxAge: 31536000,
    sameSite: 'strict',
  });

  function setLocaleCookie(locale: string, callback?: Function): void {
    const localeCanonicalName = Intl.getCanonicalLocales(locale)?.[0];
    localeCookie.value = localeCanonicalName;
    if (callback) callback();
  }

  return {
    localeCookie,
    setLocaleCookie,
  };
}
