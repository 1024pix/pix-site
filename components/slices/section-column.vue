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
        <div :class="rightClass">
          <prismic-image v-if="image !== null" :field="image"></prismic-image>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SectionColumnSlice',
  props: {
    content: {
      type: Object,
      default: null
    },
    sectionClass: {
      type: String,
      default: ''
    },
    ulClass: {
      type: String,
      default: ''
    },
    liClass: {
      type: String,
      default: ''
    },
    rightClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    paragraphs() {
      return this.content.items
    },
    title() {
      return this.content.primary.title
    },
    description() {
      return this.content.primary.description
    },
    image() {
      return this.content.primary.image
    }
  }
}
</script>

<style></style>
