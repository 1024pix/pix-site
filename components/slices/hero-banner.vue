<template>
  <section :class="sectionClass">
    <div :class="backgroundClass"></div>
    <div :class="contentClass">
      <prismic-rich-text :field="title" />
      <prismic-rich-text :field="description" />
      <pix-link v-if="hasButton" :class="buttonClass" :field="buttonLink">
        {{ $prismic.richTextAsPlain(buttonText) }}
      </pix-link>
      <template v-if="hasVideo">
        <div :class="buttonClass" @click="openVideoModal()">
          <fa :icon="fas.faPlayCircle" />
          {{ $prismic.richTextAsPlain(videoButtonText) }}
        </div>
        <sweet-modal
          ref="modal"
          modal-theme="dark"
          overlay-theme="dark"
          @close="stopPlayingVideo"
        >
          <VideoSlice ref="videoPlayer" :video-url="videoUrl" />
        </sweet-modal>
      </template>
    </div>
  </section>
</template>

<script>
import { fas } from '@fortawesome/free-solid-svg-icons'
import VideoSlice from './video'

export default {
  name: 'HeroBanner',
  components: { VideoSlice },
  props: {
    content: {
      type: Object,
      default: null
    },
    sectionClass: {
      type: String,
      default: ''
    },
    backgroundClass: {
      type: String,
      default: ''
    },
    contentClass: {
      type: String,
      default: ''
    },
    buttonClass: {
      type: String,
      default: ''
    }
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
    fas() {
      return fas
    }
  },
  methods: {
    openVideoModal() {
      this.$refs.modal.open()
    },
    stopPlayingVideo() {
      this.$refs.videoPlayer.stop()
    }
  }
}
</script>

<style scoped></style>
