// https://nuxt.com/docs/api/configuration/nuxt-config
import sharedConfig from "../shared/shared.nuxt.config";

export default defineNuxtConfig({
  ...sharedConfig,
  devServer: {
    port: 7000,
  },
  runtimeConfig: {
    public: {
      site: "https://pix.",
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
