<template>
  <!--
    Keeps the rendering of @prismicio/vue v4 (used until @nuxtjs/prismic 3):
    - <PrismicRichText> no longer renders a wrapper element since v6: this <div> keeps the previous DOM
      and receives the classes given to <pix-rich-text>;
    - an empty field (e.g. a single empty paragraph) rendered nothing in v4, but renders an empty <p> in v6;
    - images are rendered without the width/height/srcset attributes added in v6 (see PixRichTextImage).
  -->
  <div>
    <prismic-rich-text v-if="isFilled.richText(field)" :field="field" :components="components" />
  </div>
</template>

<script setup>
import { isFilled } from '@prismicio/client';
import PixRichTextImage from './PixRichTextImage.vue';

defineProps({
  field: {
    type: Array,
    default: null,
  },
});

const components = { image: PixRichTextImage };
</script>
