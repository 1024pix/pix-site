import { transports } from 'winston'
import routes from './services/get-routes-to-generate'
import { filterNuxtPages } from './services/filter-nuxt-pages'
import { localization } from './config/localization'
import { config } from './config/environment'
import { SITES_PRISMIC_TAGS } from './services/available-sites'

const i18nConfigurationForFrenchDomain = {
  defaultLocale: 'fr-fr',
  strategy: 'prefix_except_default',
  vueI18n: {
    fallbackLocale: 'fr-fr',
  },
}

const i18nConfigurationForInternationalDomain = {
  defaultLocale: config.isPixSite ? null : 'fr',
  strategy: 'prefix',
  vueI18n: {
    fallbackLocale: 'fr',
  },
}

const nuxtConfig = {
  generate: {
    routes,
    dir: `dist/${config.siteDomain}`,
    fallback: '404.html',
    crawler: false,
  },
  target: 'static',
  publicRuntimeConfig: {
    formKeysToMap: process.env.FORM_KEYS_TO_MAP || {},
  },
  server: {
    port: process.env.PORT || 7000,
  },
  env: {
    // Nuxt env are required to be usable client-side (e.g.: PixPrismicLink)
    SITE: process.env.SITE,
    DOMAIN_ORG: process.env.DOMAIN_ORG,
    DOMAIN_FR: process.env.DOMAIN_FR,
    SITE_DOMAIN: process.env.SITE_DOMAIN,
    FT_IS_NEW_MENU_AVAILABLE: process.env.FT_IS_NEW_MENU_AVAILABLE,
    EASIWARE_SCRIPT_URL: process.env.EASIWARE_SCRIPT_URL,
  },
  dir: {
    pages: `pages/${process.env.SITE}`,
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'Pix - Cultivez vos compétences numériques',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Pix est le service public en ligne pour évaluer, développer et certifier ses compétences numériques tout au long de la vie.',
      },
      config.isSeoIndexingEnabled ? {} : { name: 'robots', content: 'noindex' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Shared CSS
   */
  css: ['assets/scss/shared.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/components.js',
    '~/plugins/easiware.js',
    '~/plugins/meta.js',
    { src: '~plugins/slide-menu', mode: 'client' },
    '~plugins/vue-js-modal',
    { src: '~/plugins/prismicLinks', mode: 'client' },
    { src: '~/plugins/locale-observer', mode: 'client' },
  ],
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '~/modules/propagate-fetch-error-during-generation',
    '@nuxtjs/i18n',
    '@nuxtjs/prismic',
    '@nuxtjs/fontawesome',
    '@nuxt/image',
    '@nuxtjs/proxy',
  ],

  eslint: {
    fix: true,
  },

  i18n: {
    detectBrowserLanguage: false,
    locales: localization.localesForCurrentSite,
    lazy: true,
    langDir: 'config/localization/translations/',
    ...(config.isFrenchDomain
      ? i18nConfigurationForFrenchDomain
      : i18nConfigurationForInternationalDomain),
  },

  prismic: {
    endpoint: config.prismic.apiEndpoint,
    modern: true,
  },

  // This is only useful in local dev mode. GEOAPI_HOST is overriden in nginx conf
  // (NGINX_GEOAPI_UPSTREAM_HOST) in review-app / integration / production
  proxy: {
    '/geolocate': {
      target: `https://${process.env.GEOAPI_HOST}/`,
      changeOrigin: true,
      pathRewrite: { '^/geolocate': '/me' },
    },
  },

  fontawesome: {
    component: 'fa',
    icons: {
      solid: [
        'faAngleDown',
        'faAngleUp',
        'faAngleLeft',
        'faAngleRight',
        'faArrowLeft',
        'faArrowRight',
        'faBars',
        'faCalendar',
        'faCheck',
        'faCircle',
        'faCog',
        'faExclamationTriangle',
        'faHome',
        'faPlayCircle',
        'faXmark',
      ],
    },
  },

  image: {
    provider: 'static',
    domains: [
      'images.prismic.io',
      'pix-site.cdn.prismic.io',
      'storage.gra.cloud.ovh.net',
      'prismic-io.s3.amazonaws.com',
    ],
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/dayjs',
    '@nuxtjs/robots',
    'nuxt-winston-log',
  ],

  styleResources: {
    scss: ['assets/scss/globals.scss'],
  },

  dayjs: {
    locales: ['fr', 'en'],
    plugins: ['localizedFormat'],
  },

  robots: () => {
    return [
      {
        UserAgent: '*',
        Disallow: config.isSeoIndexingEnabled ? '' : '/',
      },
      {
        UserAgent: '*',
        Disallow: '/support/*',
      },
    ]
  },

  winstonLog: {
    loggerOptions: {
      level: 'debug',
      transports: [new transports.Console()],
    },
  },

  router: {
    middleware: ['current-page-path'],
    linkExactActiveClass: 'current-active-link',
    extendRoutes(routes) {
      return filterNuxtPages(routes, config)
    },
  },

  buildDir: `.nuxt/${process.env.SITE_DOMAIN}`,

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.resolve.alias.vue = 'vue/dist/vue.common'
    },
    postcss: {
      plugins: {
        'postcss-url': false,
      },
      preset: {
        autoprefixer: {
          grid: 'autoplace',
        },
        browsers: ['last 2 versions', 'ie 11'],
      },
    },
  },
}

if (process.env.DOMAIN_ORG === undefined) {
  throw new Error(`The DOMAIN_ORG environment variable must be provided`)
}

if (process.env.DOMAIN_FR === undefined) {
  throw new Error(`The DOMAIN_FR environment variable must be provided`)
}

const availableSiteDomains = ['pix.fr', 'pix.org']
if (!availableSiteDomains.includes(process.env.SITE_DOMAIN)) {
  throw new Error(
    `The SITE_DOMAIN environment variable must have one of these values (${availableSiteDomains})`
  )
}

const availableSites = Object.values(SITES_PRISMIC_TAGS)
if (!availableSites.includes(process.env.SITE)) {
  throw new Error(
    `The SITE environment variable must have one of these values: (${availableSites})`
  )
}

if (config.matomo.containerUrl) {
  nuxtConfig.head.script.push(
    {
      type: 'text/javascript',
      src: config.matomo.containerUrl,
      async: true,
      defer: true,
    },
    {
      type: 'text/javascript',
      src: '/scripts/start-matomo-event.js',
      'data-matomo-debug-mode': config.matomo.debug,
    }
  )
}

export default nuxtConfig
