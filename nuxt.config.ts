// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/prismic"],
  prismic: {
    endpoint: "pix-site"
  },
  // SCSS imports
  css: ['@/assets/scss/shared.scss'],
  // SCSS import, should be loaded before all
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/globals.scss";',
        },
      },
    },
  },
})