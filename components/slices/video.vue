<template>
  <div>
    <vue-plyr ref="plyr">
      <video :src="videoUrl" />
    </vue-plyr>
  </div>
</template>

<script>
export default {
  name: 'VideoSlice',
  props: {
    videoUrl: {
      type: String,
      default: null
    }
  },
  methods: {
    stop() {
      this.$refs.plyr.player.stop()
    }
  }
}
</script>

<style scoped />
