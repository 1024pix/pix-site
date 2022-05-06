import { DOCUMENTS, TAGS } from '~/services/document-fetcher'
import { translation } from '~/lang'

export function linkResolver(doc) {
  const locale = doc.lang !== 'fr-fr' ? `/${doc.lang}` : ''

  if (doc.type === DOCUMENTS.NEWS_ITEM) {
    return `${locale}/${translation[doc.lang]['news-page-prefix']}/${doc.uid}`
  }
  if (doc.tags?.includes(TAGS.INDEX)) {
    return `${locale}/`
  }
  return `${locale}/${doc.uid}`
}

export default linkResolver
