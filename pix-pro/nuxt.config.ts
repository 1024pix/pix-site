import { getRoutesToGenerate } from './services/get-routes-to-generate';
import i18nConfig, { reachableLocales, reachableLocaleNames, reachableLocaleCanonicalNames } from './i18n.config';

export default async () => {
  const routes = process.env.NODE_ENV !== 'test' ? await getRoutesToGenerate({ locales: i18nConfig.locales }) : [];

  return defineNuxtConfig({
    extends: ['../shared'],
    devServer: {
      port: Number(process.env.PORT) || 6001,
    },
    modules: ['@nuxtjs/prismic', '@nuxtjs/i18n', '@vueuse/nuxt', '@nuxt/image', '@element-plus/nuxt'],
    runtimeConfig: {
      public: {
        site: 'https://pro.pix.',
        availableLocales: reachableLocales,
        availableLocaleNames: reachableLocaleNames,
        availableLocaleCanonicalNames: reachableLocaleCanonicalNames,
      },
    },
    nitro: {
      prerender: {
        crawlLinks: false,
        routes,
      },
    },
    i18n: i18nConfig,
  });
};
