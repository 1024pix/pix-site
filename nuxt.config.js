import { transports } from 'winston'
import routes from './services/get-routes-to-generate'
import isSeoIndexingEnabled from './services/is-seo-indexing-enabled'
import { SITES_PRISMIC_TAGS } from './services/available-sites'
import { language } from './config/language'

const config = {
  generate: { routes, fallback: '404.html' },
  target: 'static',
  publicRuntimeConfig: {
    formKeysToMap: process.env.FORM_KEYS_TO_MAP || {},
  },
  server: {
    port: process.env.PORT || 5000,
  },
  env: {
    // Nuxt env are required to be usable client-side (e.g.: PixLink)
    SITE: process.env.SITE,
    DOMAIN_ORG: process.env.DOMAIN_ORG,
    DOMAIN_FR: process.env.DOMAIN_FR,
  },
  dir: {
    pages: `pages/${process.env.SITE}`,
  },
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'fr',
    },
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
      isSeoIndexingEnabled() ? {} : { name: 'robots', content: 'noindex' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        type: 'text/javascript',
        src: process.env.MATOMO_CONTAINER,
        async: true,
        defer: true,
      },
      {
        type: 'text/javascript',
        src: '/scripts/start-matomo-event.js',
        'data-matomo-debug-mode': process.env.MATOMO_DEBUG,
      },
    ],
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
    '~/plugins/meta.js',
    { src: '~plugins/slide-menu', ssr: false },
    '~plugins/vue-js-modal',
    { src: '~/plugins/prismicLinks', ssr: false },
  ],
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    ['@nuxtjs/eslint-module', { fix: true }],
    '~/modules/propagate-fetch-error-during-generation',
    '@nuxtjs/prismic',
    '@nuxt/image',
  ],

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
    '@nuxtjs/i18n',
    '@nuxtjs/moment',
    '@nuxtjs/robots',
    [
      'nuxt-fontawesome',
      {
        component: 'fa',
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: [
              'faAngleDown',
              'faAngleUp',
              'faAngleRight',
              'faArrowRight',
              'faCalendar',
              'faCheck',
              'faCircle',
              'faCog',
              'faExclamationTriangle',
              'faHome',
              'faPlayCircle',
            ],
          },
        ],
      },
    ],
    [
      'nuxt-winston-log',
      {
        loggerOptions: {
          level: 'debug',
          transports: [new transports.Console()],
        },
      },
    ],
  ],
  moment: {
    locales: ['fr'],
  },
  styleResources: {
    scss: ['assets/scss/globals.scss'],
  },
  i18n: {
    detectBrowserLanguage: false,
    defaultLocale: 'fr-fr',
    locales: language.locales,
    lazy: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: 'fr-fr',
    },
  },
  prismic: {
    endpoint: process.env.PRISMIC_API_ENDPOINT,
    modern: true,
  },
  router: {
    middleware: 'current-page-path',
    linkExactActiveClass: 'current-active-link',
  },
  robots: () => {
    return {
      UserAgent: '*',
      Disallow: isSeoIndexingEnabled() ? '' : '/',
    }
  },
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

const availablesSites = Object.values(SITES_PRISMIC_TAGS)
if (!availablesSites.includes(process.env.SITE)) {
  throw new Error(
    `The SITE environment variable must have one of these values: (${availablesSites})`
  )
}

if (process.env.MATOMO_URL && process.env.MATOMO_SITE_ID) {
  config.modules.push([
    'nuxt-matomo',
    {
      matomoUrl: process.env.MATOMO_URL,
      siteId: process.env.MATOMO_SITE_ID,
    },
  ])
} else {
  console.warn(
    'Both MATOMO_URL and MATOMO_SITE_ID environment variables must be provided'
  )
}

export default config
