import EmberRouter from '@ember/routing/router';
import RouterScroll from 'ember-router-scroll';
import config from './config/environment';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';

const Router = EmberRouter.extend(RouterScroll, {
  location: config.locationType,
  rootURL: config.rootURL,
  metrics: service(),

  // cf. https://romulomachado.github.io/2016/12/20/resetting-scroll-on-route-changes.html
  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    scheduleOnce('afterRender', this, () => {
      const page = this.get('url');
      const title = this.getWithDefault('currentRouteName', 'unknown');

      get(this, 'metrics').trackPage({ page, title });
    });
  }
});

Router.map(function() {
  this.route('school-education', { path: 'enseignement-scolaire' });
  this.route('higher-education', { path: 'enseignement-superieur' });
  this.route('employers', { path: 'employeurs' });
  this.route('faq', { path: 'aide' }, function() {
    this.route('get', { path: '/:uid' });
  });
  this.route('jobs', { path: 'recrutement' }, function() {
    this.route('get', { path: '/:uid' });
  });
  this.route('competences');
  this.route('legal-notices', { path: 'mentions-legales' });
  this.route('partners', { path: 'etablissements-pionniers' });
  this.route('privacy-policy', { path: 'donnees-personnelles' });
  this.route('simple-page', { path: '/*path' });
  this.route('terms-of-service', { path: 'conditions-generales-d-utilisation'});

  this.route('formable-pages', { path: 'formulaire' }, function() {
    this.route('school-education-establishement-registration', { path: 'inscription-etablissement-scolaire' });
    this.route('higher-education-establishement-registration', { path: 'inscription-etablissement-superieur' });
    this.route('pix-orga-newsletter-subscription', { path: 'abonnement-actualites-pix-orga' });
    this.route('pix-orga-registration', { path: 'contact-pix-pro' });
  });

  this.route('certifications');
  this.route('certifications', { path: 'certifications/*path'});

  this.route('404', { path: '/*path'});
});

export default Router;
