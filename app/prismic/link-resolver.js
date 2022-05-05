import { DOCUMENTS } from '~/services/document-fetcher'
import { translation } from '~/lang'

export const STATIC_ROUTE = [
  DOCUMENTS.STATISTIQUES,
  DOCUMENTS.SIMPLE_PAGE,
  DOCUMENTS.SLICES_PAGE,
]
export function linkResolver(doc) {
  const locale = doc.lang !== 'fr-fr' ? `/${doc.lang}` : ''
  if (STATIC_ROUTE.includes(doc.type)) {
    return `${locale}/${doc.uid}`
  }
  if (doc.type === DOCUMENTS.NEWS_ITEM) {
    return `${locale}/${translation[doc.lang]['news-page-prefix']}/${doc.uid}`
  }
  if (doc.type === DOCUMENTS.INDEX) {
    return `${locale}/`
  }
}

export default linkResolver
