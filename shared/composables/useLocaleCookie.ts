export default function useLocaleCookie() {
  const appConfig = useAppConfig();

  const localeCookie = useCookie("locale", {
    maxAge: 31536000,
    sameSite: "strict",
  });

  function setLocaleCookie(
    selectedLocale: "fr" | "fr-fr" | "fr-be" | "en",
    callback?: Function
  ): void {
    localeCookie.value = selectedLocale;
    if (callback) callback();
  }

  return {
    localeCookie: localeCookie.value,
    setLocaleCookie,
  };
}
