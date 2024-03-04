export default defineNuxtRouteMiddleware(() => {
  console.group('NuxtMiddleware::locale-cookie');
  const { localeCookie } = useLocaleCookie();
  console.dir({ localeCookie });
  console.log({ localeCookie });
  if (localeCookie.value) {
    console.info(`Redirecting to /${localeCookie.value}`)
    console.groupEnd();
    return navigateTo(`/${localeCookie.value}`);
  }
  console.groupEnd();
})
