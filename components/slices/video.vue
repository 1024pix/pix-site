<template>
  <div class="videoPlayerClass">
    <client-only>
      <vue-plyr ref="plyr">
        <video :src="videoUrl" />
      </vue-plyr>
    </client-only>
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
