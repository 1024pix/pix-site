import { getRoutesToGenerate } from "./services/get-routes-to-generate";
import i18nConfig from "./i18n.config";
export default async () => {
  const routes = await getRoutesToGenerate({ locales: i18nConfig.locales });
  return defineNuxtConfig({
      extends: ["../shared"],
      devServer: {
        port: Number(process.env.PORT) || 7000
      },
      modules: ["@nuxtjs/prismic", "@nuxtjs/i18n", "@vueuse/nuxt", "@nuxt/image"],
      runtimeConfig: {
        public: {
          site: "https://pix.",
          siteDomain: process.env.SITE_DOMAIN,
          formKeysToMap: process.env.FORM_KEYS_TO_MAP || null
        }
      },
      nitro: {
        prerender: {
          crawlLinks: false,
          routes
        },
        devProxy: {
          "/geolocate": {
            target: `https://${process.env.GEOAPI_HOST}/me`,
            changeOrigin: true
          }
        }
      },
      i18n: i18nConfig,
    }
  );
}

if (!process.env.SITE) {
  throw new Error("Missing SITE environment variable");
}


