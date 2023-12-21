// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["../shared"],
  devServer: {
    port: Number(process.env.PORT) || 7000,
  },
  runtimeConfig: {
    public: {
      site: "https://pix.",
    },
  },
});

if (!process.env.SITE) {
  throw new Error('Missing SITE environment variable');
}
