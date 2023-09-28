import { resolve } from "path";
import i18nConfig from "./i18n.config";

export default {
  alias: {
    "@shared": resolve(__dirname, "../shared"),
  },
  components: ["@/components", "@shared/components"],
  css: ["@shared/assets/scss/shared.scss"],
  devtools: { enabled: true },
  i18n: i18nConfig,
  modules: ["@nuxtjs/prismic", "@nuxtjs/i18n", "@vueuse/nuxt", "@nuxt/image"],
  prismic: {
    endpoint: "pix-site",
  },
};
