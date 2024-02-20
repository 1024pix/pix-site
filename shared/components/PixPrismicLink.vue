<template>
  <component :is="linkComponent">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'PixPrismicLink',
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
      const url = removeHostIfCurrentSite(this.field.url, this.$i18n.locale)

      if (isCurrentLocaleURL(url, this.$i18n)) {
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

export function getPathLocale(path, $i18n) {
  console.log('i18n locales', $i18n.localeCodes)
  const localeCodesWithoutDefault = $i18n.localeCodes.filter(
    (code) => code !== $i18n.defaultLocale
  )

  // When fr-fr, no other locale is available, so return undefined
  if (localeCodesWithoutDefault.length === 0) return undefined

  const rootMatch = new RegExp(
    `^/(${localeCodesWithoutDefault.join('|')})?($|\\/)`
  ).exec(path)
  if (rootMatch != null) return rootMatch[1]

  return undefined
}

export function removeHostIfCurrentSite(url, locale) {
  try {
    const parsedURL = new URL(url)

    if (!isCurrentLocaleURL(parsedURL, locale)) return url

    return parsedURL.pathname + parsedURL.search + parsedURL.hash
  } catch (e) {
    // relative URL
    return url
  }
}
</script>
