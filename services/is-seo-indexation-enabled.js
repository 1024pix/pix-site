export default function isSeoIndexationEnabled() {
  return process.env.SEO_ENABLE_INDEXATION === 'true'
}
