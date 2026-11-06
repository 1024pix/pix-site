<template>
  <!--
    Depuis @prismicio/vue v6, <PrismicRichText> ne rend plus de <div> englobante :
    les classes passées au composant étaient perdues. Cette <div> reproduit l'ancien DOM.
  -->
  <div>
    <prismic-rich-text
      :field="field"
      :link-resolver="localizedLinks ? localizedLinkResolver : undefined"
      :components="components"
      :fallback="fallback"
    />
  </div>
</template>

<script setup>
defineProps({
  field: {
    type: Array,
    default: null,
  },
  // Remplace l'ancienne prop :serializer="customPrismicRichTextSerializer"
  localizedLinks: {
    type: Boolean,
    default: false,
  },
  components: {
    type: Object,
    default: undefined,
  },
  fallback: {
    type: [String, Object, Function],
    default: undefined,
  },
});

const { localizedLinkResolver } = usePrismicRichTextSerializer();
</script>
