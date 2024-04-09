<template>
  <iframe class="slice-embed" :src="src" />
</template>

<script setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss">
.slice-embed {
  display: block;
  width: min(1080px, calc(100vw - 32px));
  height: auto;
  aspect-ratio: 16/9;
  margin: 0 auto 64px;
}
</style>
