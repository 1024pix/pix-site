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
      const relativeLinkPrefix = getRelativeLinkPrefix(url)

      if (this.field.link_type === 'Document') {
        const localeURL = getLocaleUrl(url, this.localePath)
        template = `
          <router-link to="${localeURL}" exact>
            <slot/>
          </router-link>
        `
      } else if (relativeLinkPrefix) {
        const relativeUrl = url.replace(relativeLinkPrefix, '/')
        const localeURL = getLocaleUrl(relativeUrl, this.localePath)
        template = `
          <router-link to="${localeURL}" exact>
            <slot/>
          </router-link>
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

function getRelativeLinkPrefix(url) {
  if (!url) {
    return ''
  }
  const relativeLinkPrefixes =
    process.env.SITE === SITES_PRISMIC_TAGS.PIX_PRO
      ? ['https://pro.pix.fr']
      : ['https://pix.org', 'https://pix.fr']
  return relativeLinkPrefixes
    .map((relativeLinkPrefix) =>
      url.startsWith(relativeLinkPrefix) ? `${relativeLinkPrefix}/` : ''
    )
    .filter((relativeLinkPrefix) => relativeLinkPrefix !== '')[0]
}
</script>
