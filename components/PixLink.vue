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
      let url = prismicDOM.Link.url(this.field, this.$prismic.linkResolver)

      url = removeHostIfCurrentSite(url, this.$i18n.locale)

      if (this.field.link_type === 'Document') {
        const localeURL = getLocaleURL(url, this.$i18n, this.localePath)
        template = `
          <nuxt-link to="${localeURL}" exact>
            <slot/>
          </nuxt-link>
        `
      } else if (isCurrentLocaleURL(url, this.$i18n)) {
        template = `
          <nuxt-link to="${url}" exact>
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

export function isCurrentLocaleURL(url, $i18n) {
  if (!url.startsWith('/')) return false

  const locale = getPathLocale(url, $i18n) ?? $i18n.defaultLocale
  return locale === $i18n.locale
}

function getLocaleURL(url, $i18n, localePath) {
  if (!url.startsWith('/') || getPathLocale(url, $i18n)) return url
  return localePath(url)
}

export function getPathLocale(path, $i18n) {
  const localeCodesWithoutDefault = $i18n.localeCodes.filter(
    (code) => code !== $i18n.defaultLocale
  )

  const rootMatch = new RegExp(
    `^/(${localeCodesWithoutDefault.join('|')})$`
  ).exec(path)
  if (rootMatch != null) return rootMatch[1]

  const pageMatch = new RegExp(
    `^/(${localeCodesWithoutDefault.join('|')})/`
  ).exec(path)
  if (pageMatch != null) return pageMatch[1]

  return undefined
}

export function removeHostIfCurrentSite(url, locale) {
  try {
    const parsedURL = new URL(url)

    if (!isCurrentSiteURL(parsedURL, locale)) return url

    return parsedURL.pathname + parsedURL.search + parsedURL.hash
  } catch (e) {
    // relative URL
    return url
  }
}

function isCurrentSiteURL(url, locale) {
  return url.host === getCurrentSiteHost(locale)
}

function getCurrentSiteHost(locale) {
  if (process.env.SITE === SITES_PRISMIC_TAGS.PIX_PRO) return 'pro.pix.fr'
  if (locale === 'fr-fr') return 'pix.fr'
  return 'pix.org'
}
</script>
