import { resolve } from "path";
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
    "pages:extend": filterNuxtPages
  },
  modules: ["@nuxtjs/prismic", "@nuxtjs/i18n", "@vueuse/nuxt", "@nuxt/image"],
  prismic: {
    endpoint: "pix-site"
  },
  runtimeConfig: {
    public: {
      easiwareScriptUrl: process.env.EASIWARE_SCRIPT_URL
    }
  }
};
