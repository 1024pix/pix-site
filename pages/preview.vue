<template>
  <div class="outer-container">
    <p>Chargement de la page de prévisualisation...</p>
  </div>
</template>

<script>
import { documentFetcher } from '~/services/document-fetcher'
export default {
  name: 'Preview',
  async asyncData({ query, redirect }) {
    const url = await documentFetcher().getPreviewUrl(query.token)
    redirect(url)
  },
}
</script>
<style scoped></style>
