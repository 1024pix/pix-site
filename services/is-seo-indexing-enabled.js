export default function isSeoIndexingEnabled() {
  return process.env.SEO_ENABLE_INDEXING === 'true'
}
