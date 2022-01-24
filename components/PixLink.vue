<template>
  <component :is="linkComponent">
    <slot />
  </component>
</template>

<script>
import prismicDOM from 'prismic-dom'
import { SITES_PRISMIC_TAGS } from '~/services/available-sites'

export default {
  name: 'PixLink',
  props: {
    field: {
      required: true,
      type: Object,
      default: null,
    },
  },
  computed: {
    linkComponent() {
      if (!this.field) {
        return null
      }
      let template = ''
      const url = prismicDOM.Link.url(this.field, this.$prismic.linkResolver)
      const relativeLinkPrefix = getRelativeLinkPrefix(url, this.$i18n.locale)

      if (this.field.link_type === 'Document') {
        const localeURL = getLocaleUrl(url, this.localePath)
        template = `
          <nuxt-link to="${localeURL}" exact>
            <slot/>
          </nuxt-link>
        `
      } else if (relativeLinkPrefix) {
        const relativeUrl = url.replace(relativeLinkPrefix, '/')
        const localeURL = getLocaleUrl(relativeUrl, this.localePath)
        template = `
          <nuxt-link to="${localeURL}" exact>
            <slot/>
          </nuxt-link>
        `
      } else {
        const target = this.field.target
          ? `target="'${this.field.target}'" rel="noopener"`
          : ''
        template = `
          <a href="${url}" ${target}>
            <slot/>
          </a>
        `
      }
      return { template }
    },
  },
}

function getLocaleUrl(url, localePath) {
  if (
    url.startsWith('/fr') ||
    url.startsWith('/en-gb') ||
    (process.env.IS_FR_BE_LANGUAGE_LOCALE_AVAILABLE === 'true' &&
      url.startsWith('/fr-be')) ||
    url.startsWith('/fr-fr')
  ) {
    return url
  }
  return localePath(url)
}

function getRelativeLinkPrefix(url, locale) {
  if (!url) return ''
  let relativeLinkPrefix
  if (process.env.SITE === SITES_PRISMIC_TAGS.PIX_PRO) {
    relativeLinkPrefix = 'https://pro.pix.fr'
  } else {
    relativeLinkPrefix = {
      'fr-fr': 'https://pix.fr/',
      fr: 'https://pix.org/fr/',
      'fr-be': 'https://pix.org/fr-be/',
      'en-gb': 'https://pix.org/en-gb/',
    }[locale]
  }
  return url.startsWith(relativeLinkPrefix) ? relativeLinkPrefix : ''
}
</script>
