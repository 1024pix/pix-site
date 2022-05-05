import { DOCUMENTS } from '~/services/document-fetcher'
import { translation } from '~/lang'

export const STATIC_ROUTE = [
  DOCUMENTS.STATISTIQUES,
  DOCUMENTS.SIMPLE_PAGE,
  DOCUMENTS.SLICES_PAGE,
]
export function linkResolver(doc) {
  if (STATIC_ROUTE.includes(doc.type)) {
    const locale = doc.lang !== 'fr-fr' ? `/${doc.lang}` : ''
    return `${locale}/${doc.uid}`
  }
  if (doc.type === DOCUMENTS.NEWS_ITEM) {
    return `/${translation[doc.lang]['news-page-prefix']}/${doc.uid}`
  }
  if (doc.type === DOCUMENTS.INDEX) {
    return `/`
  }
}

export default linkResolver
