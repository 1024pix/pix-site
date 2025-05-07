import { resolve } from 'path';
import { filterNuxtPages } from './services/filter-nuxt-pages';

const config = {
  app: {
    head: {
      script: [],
    },
  },
  image: {
    provider: process.env.IS_BUILTIN_IMAGES_ENABLED ? undefined : 'prismic',
  },
  appConfig: {
    domainFr: process.env.DOMAIN_FR,
    domainOrg: process.env.DOMAIN_ORG,
    site: process.env.SITE,
  },
  alias: {
    '@shared': resolve(__dirname, '../shared'),
  },
  components: ['@/components', '@shared/components'],
  css: ['@shared/assets/scss/shared.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@shared/assets/scss/globals.scss";',
        },
      },
    },
  },
  devtools: { enabled: true },
  hooks: {
    'pages:extend': filterNuxtPages,
  },
  modules: ['@nuxt/test-utils/module'],
  prismic: {
    clientConfig: {
      accessToken: process.env.PRISMIC_API_TOKEN,
    },
    endpoint: 'pix-site',
    linkResolver: '../shared/services/link-resolver.js',
  },
  runtimeConfig: {
    public: {
      easiwareScriptUrl: process.env.EASIWARE_SCRIPT_URL,
      matomo: {
        containerUrl: process.env.MATOMO_CONTAINER,
        debug: process.env.MATOMO_DEBUG || false,
      },
      plausible: {
        scriptUrl: process.env.ANALYTICS_SCRIPT_URL,
        siteId: process.env.ANALYTICS_SITE_ID,
      },
      application: process.env.SITE,
    },
  },
};

if (config.runtimeConfig.public.matomo.containerUrl) {
  config.app.head.script.push(
    {
      type: 'text/javascript',
      src: config.runtimeConfig.public.matomo.containerUrl,
      async: true,
      defer: true,
    },
    {
      type: 'text/javascript',
      src: '/scripts/start-matomo-event.js',
      'data-matomo-debug-mode': config.runtimeConfig.public.matomo.debug,
    },
  );
}

if (config.runtimeConfig.public.plausible.siteId) {
  if (process.env.NODE_ENV === 'production') {
    config.app.head.script.push({
      type: 'text/javascript',
      src: '/analytics/script.js',
      'data-api': '/analytics/event',
      defer: true,
      'data-domain': config.runtimeConfig.public.plausible.siteId,
    });
  } else {
    config.app.head.script.push({
      type: 'text/javascript',
      src: config.runtimeConfig.public.plausible.scriptUrl,
      defer: true,
      'data-domain': config.runtimeConfig.public.plausible.siteId,
    });
  }
}

export default config;
