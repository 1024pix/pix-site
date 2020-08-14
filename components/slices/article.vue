<template>
  <div>
    <prismic-rich-text :field="title" class="title--big" />
    <div v-for="item in content" :key="item" />
  </div>
</template>

<script>
export default {
  name: 'Article',
  props: {
    content: {
      type: Object,
      default: null,
    },
  },
  computed: {
    title() {
      return this.content.primary['article-title']
    },
  },
}
</script>

<style></style>
