<template>
  <section :class="sectionClass">
    <div :class="backgroundClass"></div>
    <div :class="contentClass">
      <prismic-rich-text :field="title" />
      <prismic-rich-text :field="description" />
      <pix-link v-if="hasButton" :class="buttonClass" :field="buttonLink">
        {{ $prismic.asText(buttonText) }}
      </pix-link>
      <template v-if="hasVideo">
        <div :class="buttonClass" @click="openVideoModal()">
          <fa icon="play-circle" />
          {{ $prismic.asText(videoButtonText) }}
        </div>
        <modal ref="modal" name="videoModal" height="auto">
          <MediaPlayer :video-url="videoUrl" />
        </modal>
      </template>
    </div>
  </section>
</template>

<script>
import MediaPlayer from './MediaPlayer'

export default {
  name: 'HeroBanner',
  components: { MediaPlayer },
  props: {
    slice: {
      type: Object,
      default: null,
    },
    sectionClass: {
      type: String,
      default: '',
    },
    backgroundClass: {
      type: String,
      default: '',
    },
    contentClass: {
      type: String,
      default: '',
    },
    buttonClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    title() {
      return this.slice.primary.title
    },
    description() {
      return this.slice.primary.description
    },
    buttonLink() {
      return this.slice.primary.button_link
    },
    buttonText() {
      return this.slice.primary.button_title
    },
    hasButton() {
      return this.buttonText && this.buttonText.length
    },
    hasVideo() {
      return this.videoButtonText
    },
    videoUrl() {
      return this.slice.primary.video_button_link.url
    },
    videoButtonText() {
      return this.slice.primary.video_button_title
    },
  },
  methods: {
    openVideoModal() {
      this.$modal.show('videoModal')
    },
  },
}
</script>

<style scoped></style>
