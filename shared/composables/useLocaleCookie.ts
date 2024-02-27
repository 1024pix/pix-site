export default function useLocaleCookie() {

  const localeCookie = useCookie("locale", {
    maxAge: 31536000,
    sameSite: "strict",
  });

  function setLocaleCookie(
    selectedLocale: string,
    callback?: Function
  ): void {
    localeCookie.value = selectedLocale;
    if (callback) callback();
  }

  return {
    localeCookie,
    setLocaleCookie,
  };
}
