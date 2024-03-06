export default function useLocaleCookie() {

  const localeCookie = useCookie("locale", {
    maxAge: 31536000,
    sameSite: "strict",
  });

  function setLocaleCookie(
    locale: string,
    callback?: Function
  ): void {
    const localeCanonicalName = Intl.getCanonicalLocales(locale)?.[0]
    localeCookie.value = localeCanonicalName;
    if (callback) callback();
  }

  return {
    localeCookie,
    setLocaleCookie,
  };
}
