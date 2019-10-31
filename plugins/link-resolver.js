const defaultLocale = 'fr-fr'

export default function(doc) {
  const staticRoute = [
    'mediation',
    'employers',
    'about',
    'school-education',
    'higher-education',
    'competences',
    'cgu_page',
    'statistiques',
    'legal-notices'
  ]
  if (staticRoute.includes(doc.type)) {
    return doc.lang === defaultLocale
      ? `/${doc.uid}`
      : `/${doc.lang}/${doc.uid}`
  }
  if (doc.type === 'news_item') {
    return doc.lang === defaultLocale
      ? `/actualites/${doc.uid}`
      : `${doc.lang}/news/${doc.uid}`
  }
  if (doc.type === 'index') {
    return doc.lang === defaultLocale ? `/` : `${doc.lang}/`
  }
}
