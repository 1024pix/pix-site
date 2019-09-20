<template>
  <section :class="sectionClass">
    <div class="background"></div>
    <div :class="containerClass">
      <prismic-rich-text :field="title" />
      <prismic-rich-text :field="description" />
      <div :class="flexContainerClass">
        <div
          v-for="(item, index) in paragraphs"
          :key="`item-${index}`"
          :class="flexContentClass"
        >
          <prismic-rich-text :field="item.paragraph" />
        </div>
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
    containerClass: {
      type: String,
      default: ''
    },
    flexContainerClass: {
      type: String,
      default: ''
    },
    flexContentClass: {
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
