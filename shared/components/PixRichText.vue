<template>
  <prismic-rich-text :field="field" :serializer="localizedLinks ? customPrismicRichTextSerializer : undefined" />
</template>

<script setup>
defineProps({
  field: {
    type: Array,
    default: null,
  },
  // Resolve links to Prismic documents according to the document locale
  localizedLinks: {
    type: Boolean,
    default: false,
  },
});

const { customPrismicRichTextSerializer } = usePrismicRichTextSerializer();
</script>
