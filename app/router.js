import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('faq', function() {
    this.route('get', { path: '/:uid' });
  });
  this.route('404');
});

export default Router;
