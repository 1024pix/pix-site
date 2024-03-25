<template>
  <div class="slice-zone">
    <section v-for="(slice, index) in slices" :key="`slice-${index}`">
      <template v-if="slice.slice_type === 'rich_text'">
        <prismic-rich-text :field="slice.primary.text" :serializer="customPrismicRichTextSerializer" />
      </template>
      <template v-if="slice.slice_type === 'banner'">
        <slices-page-banner :slice="slice" :index-for-id="index" />
      </template>
      <template v-if="slice.slice_type === 'article'">
        <slices-article :slice="slice" :index-for-id="index" />
      </template>
      <template v-if="slice.slice_type === 'multiple_block'">
        <slices-multiple-block :slice="slice" :index-for-id="index" />
      </template>
      <template v-if="slice.slice_type === 'partners_logos'">
        <slices-partners-logos :slice="slice" :index-for-id="index" />
      </template>
      <template v-if="slice.slice_type === 'latest_news'">
        <slices-latest-news :slice="slice" :index-for-id="index" />
      </template>
      <template v-if="slice.slice_type === 'embed'">
        <slices-embed :src="slice.primary.iframe_link" />
      </template>
      <!-- <template v-if="slice.slice_type === 'stat'">
        <slices-stat :slice="slice" :index-for-id="index" />
      </template> -->
    </section>
  </div>
</template>

<script setup>
const props = defineProps({
  slices: {
    type: Array,
    default: null,
  },
});

const { customPrismicRichTextSerializer } = usePrismicRichTextSerializer();
</script>
