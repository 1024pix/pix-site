<template>
  <section :class="{ 'banner-with-background': hasBackgroundImage }">
    <div :class="['banner', { 'banner--with-image': hasImage }]">
      <div class="banner__main">
        <prismic-rich-text :field="title" class="title--big" />
        <prismic-rich-text :field="textContent" class="text--normal" />
        <slot></slot>
        <div class="banner__button-group">
          <div v-for="(link, index) in links" :key="`item-${index}`">
            <pix-link
              v-if="!isVideo(link)"
              :field="link.bannerlinkurl"
              class="button"
              :class="videoClass(link)"
            >
              {{ link.bannerlinktext }}
            </pix-link>
            <template v-if="isVideo(link)">
              <button class="button button-video" @click="openVideoModal()">
                <fa icon="play-circle" />
                {{ link.bannerlinktext }}
              </button>
              <modal ref="modal" name="videoModal" height="auto">
                <VideoSlice :video-url="link.bannerlinkurl" />
              </modal>
            </template>
          </div>
        </div>
      </div>
      <prismic-image v-if="hasImage" :field="imageUrl" />
    </div>
  </section>
</template>

<script>
import VideoSlice from './video'
import { LARGE_SCREEN_MIN_WIDTH } from '~/config/breakpoints'

export default {
  name: 'Banner',
  components: { VideoSlice },
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
    hasImage() {
      return (
        this.content.primary.bannerimage && this.content.primary.bannerimage.url
      )
    },
    hasBackgroundImage() {
      return (
        this.content.primary.bannerbackground &&
        this.content.primary.bannerbackground.url
      )
    },
    imageUrl() {
      return this.content.primary.bannerimage
    },
  },
  mounted() {
    if (this.hasBackgroundImage) {
      this.changeBackgroundImage()
      window.addEventListener('resize', this.changeBackgroundImage)
    }
  },
  beforeDestroy() {
    if (this.bannerWithBackgroundImageClass) {
      window.removeEventListener('resize', this.changeBackgroundImage)
    }
  },
  methods: {
    openVideoModal() {
      this.$modal.show('videoModal')
    },
    isVideo(link) {
      return link.bannerlinkurl.url.includes('pix-videos/')
    },
    videoClass(link) {
      return this.isVideo(link) ? 'banner__video' : ''
    },
    changeBackgroundImage() {
      const banner = document.getElementsByClassName(
        'banner-with-background'
      )[0]
      if (screen.width <= LARGE_SCREEN_MIN_WIDTH) {
        banner.style.background = `no-repeat url(${this.content.primary.bannerbackground.url})`
        banner.style.backgroundSize = '100%'
        banner.style.backgroundPosition = 'top right'
      } else {
        banner.style.background = 'none'
      }
    },
  },
}
</script>

<style lang="scss">
.banner {
  font-family: 'Open Sans', Arial, sans-serif;
  padding: 64px 0;
  text-align: center;
  margin: 0 auto;

  &__main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 32px;
  }

  .text--normal p {
    margin: 16px 0 24px;
  }

  .banner__button-group {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .button {
      margin: 5px 0;
    }
  }

  &--with-image img {
    display: none;
  }
}

@include device-is('large-mobile') {
  .banner {
    padding: 80px 0;

    .banner__button-group {
      flex-direction: row;

      .button {
        width: initial;
        margin: 0 10px;
      }
    }
  }
}

@include device-is('large-screen') {
  .banner {
    &__main {
      width: 504px;
    }

    &--with-image {
      display: flex;
      justify-content: space-between;
      max-width: 1140px;
      text-align: left;

      img {
        display: block;
        max-width: 510px;
      }

      .banner__button-group {
        justify-content: left;

        .button {
          margin: 0 20px 0 0;
        }
      }
    }
  }
}
</style>
