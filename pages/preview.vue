<template>
  <div class="outer-container">
    <p>Chargement de la page de prévisualisation...</p>
  </div>
</template>

<script>
import { documentFetcher } from '~/services/document-fetcher'
export default {
  name: 'Preview',
  async asyncData({ query, redirect, error }) {
    try {
      const url = await documentFetcher().getPreviewUrl(query.token)
      redirect(url)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error({ e })
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>
<style scoped></style>
