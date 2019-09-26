<template>
  <div class="outer-container">
    <p>Loading the Prismic's Preview...</p>
  </div>
</template>

<script>
import DocumentFetcher from '~/services/document-fetcher'
export default {
  name: 'Preview',
  async asyncData({ query, redirect }) {
    const url = await DocumentFetcher().getPreviewUrl(query.token)
    redirect(url)
  }
}
</script>
<style scoped></style>
