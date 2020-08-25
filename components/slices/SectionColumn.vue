<template>
  <section :class="sectionClass">
    <div class="background"></div>
    <div class="container flex padding-container">
      <div class="container-column">
        <prismic-rich-text :field="title" />
        <prismic-rich-text :field="description" />
        <ul :class="ulClass">
          <li
            v-for="(item, index) in paragraphs"
            :key="`item-${index}`"
            :class="liClass"
          >
            <prismic-rich-text :field="item.paragraph" />
          </li>
        </ul>
      </div>
      <div class="container-column">
        <div v-if="hasImage" :class="rightClass">
          <prismic-image :field="image"></prismic-image>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SectionColumnSlice',
  props: {
    slice: {
      type: Object,
      default: null,
    },
    sectionClass: {
      type: String,
      default: '',
    },
    ulClass: {
      type: String,
      default: '',
    },
    liClass: {
      type: String,
      default: '',
    },
    rightClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    paragraphs() {
      return this.slice.items
    },
    title() {
      return this.slice.primary.title
    },
    description() {
      return this.slice.primary.description
    },
    image() {
      return this.slice.primary.image
    },
    hasImage() {
      return this.image && this.image.url
    },
  },
}
</script>

<style></style>
