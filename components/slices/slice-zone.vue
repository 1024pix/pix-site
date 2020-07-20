<template>
  <div class="slice-zone">
    <section v-for="(slice, index) in slices" :key="`slice-${index}`">
      <template v-if="slice.slice_type === 'rich_text'">
        <prismic-rich-text :field="slice.primary.text" />
      </template>
      <template v-if="slice.slice_type === 'multiple_column'">
        <multiple-column :slice="slice" />
      </template>
      <template v-if="slice.slice_type === 'web_snippet'">
        <web-snippet :slice="slice" />
      </template>
    </section>
  </div>
</template>

<script>
import MultipleColumn from '~/components/slices/multiple-column'
import WebSnippet from '~/components/slices/web-snippet'

export default {
  name: 'SliceZone',
  components: { WebSnippet, MultipleColumn },
  props: {
    slices: {
      type: Array,
      default: null,
    },
  },
}
</script>

<style></style>
