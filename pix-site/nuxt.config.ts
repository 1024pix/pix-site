// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["../shared"],
  devServer: {
    port: 7000,
  },
  runtimeConfig: {
    public: {
      site: "https://pix.",
    },
  },
});
