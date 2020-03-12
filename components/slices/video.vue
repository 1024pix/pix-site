<template>
  <video
    controls
    autoplay
    class="video-slice"
  >
    <source :src="videoUrl" type="video/mp4" />
  </video>
</template>

<script>
export default {
  name: 'VideoSlice',
  props: {
    videoUrl: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss">
.video-slice {
  height: 100%;
  width: 100%;
  display: block;
}
</style>
