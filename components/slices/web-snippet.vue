<template>
  <div class="web-snippet">
    <div v-for="(code, index) in slice.primary.code" :key="`code-${index}`">
      <div v-html="code.text" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'WebSnippet',
  props: {
    slice: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped></style>
