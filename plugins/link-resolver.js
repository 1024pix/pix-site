export default function(doc) {
  switch (doc.type) {
    case 'index': {
      return doc.lang === 'fr-fr' ? `/` : `${doc.lang}/`
    }
    case 'mediation': {
      return doc.lang === 'fr-fr' ? `/${doc.uid}` : `${doc.lang}/${doc.uid}`
    }
    case 'employers': {
      return doc.lang === 'fr-fr' ? `/${doc.uid}` : `${doc.lang}/${doc.uid}`
    }
    case 'about': {
      return doc.lang === 'fr-fr' ? `/${doc.uid}` : `${doc.lang}/${doc.uid}`
    }
    case 'school-education': {
      return doc.lang === 'fr-fr' ? `/${doc.uid}` : `${doc.lang}/${doc.uid}`
    }
    case 'higher-education': {
      return doc.lang === 'fr-fr' ? `/${doc.uid}` : `${doc.lang}/${doc.uid}`
    }
    case 'competences': {
      return doc.lang === 'fr-fr' ? `/${doc.uid}` : `${doc.lang}/${doc.uid}`
    }
    case 'stats': {
      return doc.lang === 'fr-fr' ? `/${doc.uid}` : `${doc.lang}/${doc.uid}`
    }
    case 'legal-notices': {
      return doc.lang === 'fr-fr' ? `/${doc.uid}` : `${doc.lang}/${doc.uid}`
    }
    case 'news_item': {
      return doc.lang === 'fr-fr'
        ? `/actualites/${doc.uid}`
        : `${doc.lang}/news/${doc.uid}`
    }
  }
}
