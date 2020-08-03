<template>
  <section class="banner">
    <prismic-rich-text :field="title" class="banner__title" />
    <prismic-rich-text :field="textContent" class="banner__content" />
    <div>
      <pix-link
        v-for="(link, index) in links"
        :key="`item-${index}`"
        :field="link.bannerlinkurl"
        class="btn-primary"
        :class="videoCssClass(link)"
      >
        {{ link.bannerlinktext }}
      </pix-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Banner',
  props: {
    content: {
      type: Object,
      default: null,
    },
  },
  computed: {
    title() {
      return this.content.primary.bannertitle
    },
    textContent() {
      return this.content.primary.bannercontent
    },
    links() {
      return this.content.items
    },
    imageUrl() {
      return this.content.primary.bannerimage
    },
    backgroundImageUrl() {
      return this.content.primary.bannerimagebackground
    },
  },
  methods: {
    videoCssClass(link) {
      if (link.bannerlinkurl.url.includes('pix-videos/')) {
        return 'banner__video'
      }
      return ''
    },
  },
}
</script>

<style lang="scss">
.banner {
  font-family: 'Open Sans', Arial, sans-serif;
  padding: 80px 0;
  text-align: center;
  margin: 0 auto;

  &__title h1 {
    font-size: 2.875rem;
    line-height: 3.813rem;
    font-weight: 300;
    color: $grey-11;
  }

  &__content p {
    font-size: 1.25rem;
    line-height: 2rem;
    color: $grey-10;
    margin: 16px 0 24px;
  }

  .btn-primary {
    height: 44px;
    line-height: 44px;
    margin: 0 10px;

    &.banner__video {
      border-radius: 4px;
      border: 1.5px solid $grey-11;
      height: 44px;
      width: 167px;
      color: $grey-11;
      background-color: $white;
    }
  }
}
</style>
