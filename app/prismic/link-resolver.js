import { DOCUMENTS } from '~/services/document-fetcher'

export default function (doc) {
  const staticRoute = [DOCUMENTS.STATISTIQUES, DOCUMENTS.SIMPLE_PAGE]

  if (staticRoute.includes(doc.type)) {
    const locale = doc.lang !== 'fr-fr' ? `/${doc.lang}` : ''
    return `${locale}/${doc.uid}`
  }
  if (doc.type === DOCUMENTS.NEWS_ITEM) {
    return `/actualites/${doc.uid}`
  }
  if (doc.type === DOCUMENTS.INDEX) {
    return `/`
  }
}
