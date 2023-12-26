// https://nuxt.com/docs/api/configuration/nuxt-config
import { filterNuxtPages } from "../shared/services/filter-nuxt-pages";

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
  hooks: {
    'pages:extend': filterNuxtPages
  }
});

if (!process.env.SITE) {
  throw new Error('Missing SITE environment variable');
}
