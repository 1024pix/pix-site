<template>
  <div class="article">
    <div class="article__text">
      <prismic-rich-text :field="title" class="article__text-title" />
      <prismic-rich-text
        :field="description"
        class="article__text-description"
      />
      <cta-button :link="linkUrl" :name="linkName" />
    </div>
    <div class="article__image">
      <img :src="image" />
    </div>
  </div>
</template>

<script>
import CtaButton from '../cta-button'

export default {
  name: 'Article',
  components: {
    CtaButton,
  },
  props: {
    content: {
      type: Object,
      default: null,
    },
  },
  computed: {
    linkUrl() {
      return this.content.primary['article-link-url'].url
    },
    linkName() {
      return this.content.primary['article-link-name']
    },
    description() {
      return this.content.primary['article-description']
    },
    image() {
      return this.content.primary['article-image'].url
    },
    title() {
      return this.content.primary['article-title']
    },
  },
}
</script>

<style lang="scss">
.article {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 32px 0px;
  background: #f5f5f5;
}

.article__text {
  display: flex;
  flex-direction: column;
}

// Title rendered by prismic-rich-text component
h2 {
  color: blue;
}

.article__text-description {
  color: red;
}
</style>
