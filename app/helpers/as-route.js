import { helper } from '@ember/component/helper';

export function asRoute([fragment]) {
  const routesMap = {
    'mediation-numerique' : 'digital-mediation',
    'enseignement-scolaire': 'school-education',
    'enseignement-superieur': 'higher-education',
    'employeurs': 'employers',
    'aide': 'faq',
    'actualites': 'news',
    'qui-sommes-nous': 'about',
    'competences': 'competences',
    'mentions-legales': 'legal-notices',
    'donnees-personnelles': 'privacy-policy',
    'conditions-generales-d-utilisation': 'terms-of-service',
    'certifications': 'certifications',
    'stats': 'stats'
  }

  if(fragment.charAt(0) === '/') {
    fragment = fragment.substr(1);
  }

  const route = routesMap[fragment];
  if(route) {
    return route;
  }
  return 'index';
}

export default helper(asRoute);
