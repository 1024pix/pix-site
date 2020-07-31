<template>
  <section :class="{ 'banner-with-background': hasBackgroundImage }">
    <div :class="['banner', { 'banner--with-image': hasImage }]">
      <div class="banner__main">
        <prismic-rich-text :field="title" class="banner__title" />
        <prismic-rich-text :field="textContent" class="banner__content" />
        <slot></slot>
        <div class="banner__button-group">
          <div v-for="(link, index) in links" :key="`item-${index}`">
            <pix-link
              v-if="!isVideo(link)"
              :field="link.bannerlinkurl"
              class="banner__button"
              :class="videoClass(link)"
            >
              {{ link.bannerlinktext }}
            </pix-link>
            <template v-if="isVideo(link)">
              <button
                class="banner__button banner__button-video"
                @click="openVideoModal()"
              >
                <fa :icon="fas.faPlayCircle" />
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
  padding: 80px 0;
  text-align: center;
  margin: 0 auto;

  &__main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 32px;
  }

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

  .banner__button-group {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .banner__button {
    height: 44px;
    font-family: 'Roboto', Arial, sans-serif;
    background-color: $blue-1;
    color: $white;
    font-size: 1rem;
    width: 240px;
    border: 1.5px solid transparent;
    border-radius: 4px;
    padding: 0 20px;
    margin: 5px 0;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      cursor: pointer;
      background-color: $blue-3;
    }

    &.banner__button-video {
      border-radius: 4px;
      border: 1.5px solid $grey-11;
      height: 44px;
      color: $grey-11;
      background-color: $white;

      svg {
        margin-right: 10px;
      }

      &:hover {
        background-color: $grey-3;
      }
    }
  }

  &--with-image img {
    display: none;
  }

  @include device-is('large-mobile') {
    .banner__button-group {
      flex-direction: row;
    }
    .banner__button {
      width: initial;
      margin: 0 10px;
    }
  }

  @include device-is('large-screen') {
    &--main {
      margin-right: 60px;
    }

    &--with-image {
      display: flex;
      max-width: 1140px;
      text-align: left;

      img:nth-child(2) {
        display: block;
        max-width: 400px;
      }

      .banner__button-group {
        justify-content: left;
      }

      .banner__button {
        margin: 0 20px 0 0;
      }
    }
  }
}
</style>
