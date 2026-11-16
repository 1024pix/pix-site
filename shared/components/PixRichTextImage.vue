<template>
  <!--
    Renders rich text images as @prismicio/vue v4 did: a plain <img> with its src and alt.
    The default v6 <PrismicImage> adds width/height attributes (from the Prismic image dimensions)
    and a srcset, which changes the displayed size of images, e.g. SVG logos.
  -->
  <p class="block-img">
    <prismic-link v-if="node.linkTo" :field="node.linkTo">
      <img :src="node.url" :alt="node.alt ?? undefined" :copyright="node.copyright || undefined" />
    </prismic-link>
    <img v-else :src="node.url" :alt="node.alt ?? undefined" :copyright="node.copyright || undefined" />
  </p>
</template>

<script setup>
defineProps({
  // Rich text image node, given by <PrismicRichText>
  node: {
    type: Object,
    required: true,
  },
});
</script>
