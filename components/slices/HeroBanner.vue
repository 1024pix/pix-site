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
          <VideoSlice :video-url="videoUrl" />
        </modal>
      </template>
    </div>
  </section>
</template>

<script>
import VideoSlice from './video'

export default {
  name: 'HeroBanner',
  components: { VideoSlice },
  props: {
    content: {
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
      return this.content.primary.title
    },
    description() {
      return this.content.primary.description
    },
    buttonLink() {
      return this.content.primary.button_link
    },
    buttonText() {
      return this.content.primary.button_title
    },
    hasButton() {
      return this.buttonText && this.buttonText.length
    },
    hasVideo() {
      return this.videoButtonText
    },
    videoUrl() {
      return this.content.primary.video_button_link.url
    },
    videoButtonText() {
      return this.content.primary.video_button_title
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
