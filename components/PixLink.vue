<template>
  <component :is="linkComponent">
    <slot />
  </component>
</template>

<script>
import prismicDOM from 'prismic-dom'
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
        template = `
          <router-link to="${this.localePath(url)}">
            <slot/>
          </router-link>
        `
      } else if (relativeLinkPrefix) {
        const relativeUrl = url.replace(relativeLinkPrefix, '/')
        template = `
          <router-link to="${this.localePath(relativeUrl)}">
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
function getRelativeLinkPrefix(url) {
  if (!url) {
    return ''
  }
  let defaultPrefixes
  if (process.env.isPixPro) {
    defaultPrefixes = 'https://pro.pix.fr/'
  } else {
    defaultPrefixes = 'https://pix.org/,https://pix.fr/'
  }
  const relativeLinkPrefixes = (
    process.env.RELATIVE_LINK_PREFIXES || defaultPrefixes
  ).split(',')
  return relativeLinkPrefixes
    .map((relativeLinkPrefix) =>
      url.startsWith(relativeLinkPrefix) ? relativeLinkPrefix : ''
    )
    .filter((relativeLinkPrefix) => relativeLinkPrefix !== '')[0]
}
</script>
