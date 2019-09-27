export default function(doc) {
  const staticRoute = [
    'mediation',
    'employers',
    'about',
    'school-education',
    'higher-education',
    'competences',
    'stats',
    'legal-notices'
  ]
  if (staticRoute.includes(doc.type)) {
    return doc.lang === 'fr-fr' ? `/${doc.uid}` : `${doc.lang}/${doc.uid}`
  }
  if (doc.type === 'news_item') {
    return doc.lang === 'fr-fr'
      ? `/actualites/${doc.uid}`
      : `${doc.lang}/news/${doc.uid}`
  }
  if (doc.type === 'index') {
    return doc.lang === 'fr-fr' ? `/` : `${doc.lang}/`
  }
}
