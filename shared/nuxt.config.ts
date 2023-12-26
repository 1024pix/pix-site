import { resolve } from "path";
import i18nConfig from "./i18n.config";
import { filterNuxtPages } from "./services/filter-nuxt-pages";

export default {
  appConfig: {
    site: process.env.SITE
  },
  alias: {
    "@shared": resolve(__dirname, "../shared")
  },
  components: ["@/components", "@shared/components"],
  css: ["@shared/assets/scss/shared.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@import \"@shared/assets/scss/globals.scss\";"
        }
      }
    }
  },
  devtools: { enabled: true },
  hooks: {
    'pages:extend': filterNuxtPages
  },
  i18n: i18nConfig,
  modules: ["@nuxtjs/prismic", "@nuxtjs/i18n", "@vueuse/nuxt", "@nuxt/image"],
  prismic: {
    endpoint: "pix-site"
  }
  // nitro:{
  //   prerender:{
  //     ignore:['/en/'],
  //   }
  // }
};
