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
      default: null
    }
  },
  computed: {
    linkComponent() {
      if (!this.field) {
        return null
      }
      let template = ''
      const url = prismicDOM.Link.url(this.field, this.$prismic.linkResolver)
      if (this.field.link_type === 'Document') {
        template = `
          <router-link to="${url}">
            <slot/>
          </router-link>
        `
      } else if (url.startsWith('https://pix.fr')) {
        const relativeUrl = url.replace('https://pix.fr', '')
        template = `
          <router-link to="${relativeUrl}">
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
    }
  }
}
</script>
