<template>
  <component :is="linkComponent">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'PixLink',
  props: {
    href: {
      required: true,
      type: String,
      default: '',
    },
  },
  computed: {
    linkComponent() {
      let template = ''
      if (this.isOnCurrentDomain(this.href)) {
        template = `
          <nuxt-link to="${this.href}">
            <slot />
          </nuxt-link>
         `
      } else {
        template = `
          <a href="${this.href}">
            <slot />
          </a>
        `
      }
      return { template }
    },
  },
  methods: {
    isOnCurrentDomain(targetDomain) {
      return targetDomain.startsWith('/') && !targetDomain.startsWith('//')
    },
  },
}
</script>
