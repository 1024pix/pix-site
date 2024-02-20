import { DOCUMENTS, TAGS } from './document-fetcher'

export async function linkResolver(doc) {
  const locale = doc.lang !== 'fr-fr' ? `/${doc.lang}` : ''

  const translations = await import(`../translations/${doc.lang}.js`)

  const { default: { 'news-page-prefix': newsPagePrefix } } = translations
  if (doc.type === DOCUMENTS.NEWS_ITEM) {
    return `${locale}/${newsPagePrefix}/${doc.uid}`
  }
  if (doc.tags?.includes(TAGS.INDEX)) {
    return `${locale}/`
  }
  return `${locale}/${doc.uid}`
}

export default linkResolver
