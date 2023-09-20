// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/prismic", "@nuxtjs/i18n", "@nuxt/image"],
  i18n: {
    defaultLocale: "fr",
    detectBrowserLanguage: false,
    locales: ["fr", "en"],
  },

  // SCSS
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

  // Prismic
  prismic: {
    endpoint: "pix-site",
  },
});
