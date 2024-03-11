import { getRoutesToGenerate } from "./services/get-routes-to-generate";
import i18nConfig, { reachableLocales} from "./i18n.config";

export default async () => {
  return defineNuxtConfig({
      extends: ["../shared"],
      hooks: {
        async 'nitro:config' (nitroConfig) {
          if (process.env.NODE_ENV === 'test') return;
          let localesToGenerate = [];

          if (process.env.SITE_DOMAIN === 'FR') {
            localesToGenerate = reachableLocales.filter((locale) => locale.code === "fr-fr");
          } else {
            localesToGenerate = reachableLocales.filter((locale) => locale.code !== "fr-fr");
          }

          console.log({ localesToGenerate });

          const routes = await getRoutesToGenerate({ locales: localesToGenerate });

          console.log({ length: routes.length, routes });
          // @ts-ignore
          nitroConfig.prerender.routes = routes;
        },
      },
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


