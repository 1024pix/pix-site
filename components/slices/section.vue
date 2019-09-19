<template>
  <section :class="sectionClass">
    <div class="background"></div>
    <div class="container padding-container">
      <prismic-rich-text :field="title" />
      <prismic-rich-text :field="description" />
      <div class="features-wrapper">
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
    </div>
  </section>
</template>

<script>
export default {
  name: 'SectionSlice',
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
    }
  }
}
</script>

<style></style>
