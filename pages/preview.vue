<template>
  <div class="outer-container">
    <p>{{ $t('preview-page-load') }}</p>
  </div>
</template>

<script>
import { documentFetcher } from '~/services/document-fetcher'
export default {
  name: 'Preview',
  async asyncData({ $primsic, query, redirect, error }) {
    try {
      const url = await documentFetcher($primsic).getPreviewUrl(query.token)
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
