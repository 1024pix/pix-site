import { getRoutesToGenerate } from "./services/get-routes-to-generate";
import i18nConfig from "./i18n.config";

export default async () => {
  const routes = await getRoutesToGenerate({ locales: i18nConfig.locales });
  return defineNuxtConfig({
      extends: ["../shared"],
      devServer: {
        port: 7001
      },
      modules: ["@nuxtjs/prismic", "@nuxtjs/i18n", "@vueuse/nuxt", "@nuxt/image"],
      runtimeConfig: {
        public: {
          site: "https://pro.pix."
        }
      },
      nitro: {
        prerender: {
          crawlLinks: false,
          routes
        }
      },
      i18n: i18nConfig
    }
  );
}
