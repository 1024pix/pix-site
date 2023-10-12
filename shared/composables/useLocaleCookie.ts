export default function useLocaleCookie() {
  const appConfig = useAppConfig();
  const { localeProperties } = useI18n();

  const localeCookie = useCookie("locale", {
    maxAge: 31536000,
    sameSite: "strict",
  });

  if (!localeCookie.value && appConfig.site.includes("pro")) {
    localeCookie.value = localeProperties.value.code || "fr-fr";
  }

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
