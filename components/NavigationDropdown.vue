<template>
  <div class="btn-group navigation-dropdown">
    <ul class="dropdown-menu">
      <li v-for="option in options" :key="option.key">
        <pix-link :field="option.link">
          {{ $prismic.asText(option.name) }}
        </pix-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NavigationDropdown',
  props: {
    options: {
      type: [Array, Object],
      default: null,
    },
  },
  data() {
    return {
      eventListener: (event) => {
        if (!event.target.classList.contains('dropdown-toggle')) {
          this.closeDropdown()
        }
      },
    }
  },
  mounted() {
    const page = document.getElementsByTagName('body')[0]
    page.addEventListener('click', this.eventListener)
  },
  beforeDestroy() {
    const page = document.getElementsByTagName('body')[0]
    page.removeEventListener('click', this.eventListener)
  },

  methods: {
    closeDropdown() {
      this.$emit('closeNavigationDropdown')
    },
  },
}
</script>

<style scoped></style>
