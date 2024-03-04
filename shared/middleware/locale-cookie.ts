export default defineNuxtRouteMiddleware((to) => {
  const { localeCookie } = useLocaleCookie();
  if (localeCookie.value) {
    return navigateTo(`/${localeCookie.value}/`);
  }
})
