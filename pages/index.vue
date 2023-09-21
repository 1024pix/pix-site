<template>
  <div>
    <div v-if="data.type === 'form_page'">
      <form-page :content="data.data" />
    </div>
    <div v-if="data.type === 'simple_page'">
      <simple-page :content="data.data" />
    </div>
    <div v-if="data.type === 'slices_page'">
      <prismic-custom-slice-zone :slices="data.data.body" />
    </div>
  </div>
</template>

<script setup>
const { client } = usePrismic();
const { data } = await useAsyncData(() => {
  return client.getByUID("slices_page", "index-pix-site", { lang: "fr" });
});
</script>
