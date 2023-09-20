<template>
  <div>
    <div v-if="data.type === DOCUMENTS.FORM_PAGE">
      <form-page :content="data.data" />
    </div>
    <div v-if="data.type === DOCUMENTS.SIMPLE_PAGE">
      <simple-page :content="data.data" />
    </div>
    <div v-if="data.type === DOCUMENTS.SLICES_PAGE">
      <prismic-custom-slice-zone :slices="data.data.body" />
    </div>
  </div>
</template>

<script setup>
import { DOCUMENTS } from "~/services/document-fetcher";

const { client } = usePrismic();
const { data } = await useAsyncData(() => {
  return client.getByUID("slices_page", "index-pix-site", { lang: "fr" });
});
</script>
