// https://nuxt.com/docs/api/configuration/nuxt-config
import i18nConfig from "./i18n.config";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/prismic", "@nuxtjs/i18n", "@vueuse/nuxt", "@nuxt/image"],
  i18n: i18nConfig,
  /* SCSS global imports */
  css: ["@/assets/scss/shared.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/globals.scss";',
        },
      },
    },
  },
  /* Prismic */
  prismic: {
    endpoint: "pix-site",
  },
});
