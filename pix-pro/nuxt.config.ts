// https://nuxt.com/docs/api/configuration/nuxt-config
import sharedConfig from "../shared/shared.nuxt.config";

export default defineNuxtConfig({
  ...sharedConfig,
  devServer: {
    port: 7001,
  },
  runtimeConfig: {
    public: {
      site: "https://pro.pix.",
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/globals.scss";',
        },
      },
    },
  },
});
