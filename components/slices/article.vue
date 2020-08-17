<template>
  <div class="article">
    <div class="article__text">
      <prismic-rich-text :field="title" class="title--big" />
      <prismic-rich-text :field="description" />
      <a :href="buttonLink" target="_blank">{{ buttonText }}</a>
    </div>
    <div class="article__image">
      <img :src="image" />
    </div>
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
    buttonLink() {
      return this.content.primary['article-link-url'].url
    },
    buttonText() {
      return this.content.primary['article-link-text']
    },
    description() {
      return this.content.primary['article-description']
    },
    image() {
      return this.content.primary['article-image'].url
    },
    title() {
      console.log(this.content.primary)
      return this.content.primary['article-title']
    },
  },
}
</script>

<style>
.article {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.article__text {
  display: flex;
  flex-direction: column;
}
</style>
