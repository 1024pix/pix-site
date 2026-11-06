<script setup lang="ts">
import type { Content } from '@prismicio/client';

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(getSliceComponentProps<Content.LatestNewsSlice>(
  ['slice', 'index', 'slices', 'context'],
));
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    Placeholder component for {{ slice.slice_type }} (variation: {{ slice.variation }}) slices.
    <br />
    <strong>You can edit this slice directly in your code editor.</strong>
  </section>
</template>
