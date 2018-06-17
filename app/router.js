import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('faq', function () {
    this.route('get', { path: '/:uid' });
  });
  this.route('404');
  this.route('jobs', { path: 'recrutement'}, function () {
    this.route('get', { path: '/:uid' });
  });
  this.route('partners', { path: 'partenaires' });
});

export default Router;
