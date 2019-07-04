import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,

  init() {
    this._super(...arguments);
    this.on('routeDidChange', () => {
      window.scrollTo(0, 0);
    });
  },
});

Router.map(function() {
  this.route('digital-mediation', { path: 'mediation-numerique' });
  this.route('school-education', { path: 'enseignement-scolaire' });
  this.route('higher-education', { path: 'enseignement-superieur' });
  this.route('employers', { path: 'employeurs' });
  this.route('faq', { path: 'aide' }, function() {
    this.route('get', { path: '/:uid' });
  });
  this.route('news', { path: 'actualites' }, function() {
    this.route('show', { path: '/:uid' });
  });
  this.route('about', { path: 'qui-sommes-nous' });
  this.route('competences');
  this.route('legal-notices', { path: 'mentions-legales' });
  this.route('partners', { path: 'etablissements-pionniers' });
  this.route('privacy-policy', { path: 'donnees-personnelles' });
  this.route('simple-page', { path: '/*path' });
  this.route('terms-of-service', { path: 'conditions-generales-d-utilisation' });

  this.route('formable-pages', { path: 'formulaire' }, function() {
    this.route('school-education-establishement-registration', { path: 'inscription-etablissement-scolaire' });
    this.route('higher-education-establishement-registration', { path: 'inscription-etablissement-superieur' });
    this.route('pix-orga-newsletter-subscription', { path: 'abonnement-actualites-pix-orga' });
    this.route('pix-orga-registration', { path: 'contact-pix-pro' });
    this.route('pix-orga-higher-school-registration', { path: 'finalisation-pix-orga-sup' });
    this.route('pix-certification-application', { path: 'demande-agrement-centre-certification' });
    this.route('contact-digital-mediation', { path: 'contact-mediation-numerique' });
  });

  this.route('certifications');
  this.route('certifications', { path: 'certifications/*path' });

  this.route('404');
  this.route('stats');
  this.route('preview');
});

export default Router;
