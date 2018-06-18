import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  prismic: service(),

  model(params) {
    const pageUid = params.path;
    return this.get('prismic').getApi()
      .then(api => api.getByUID('simple_page', pageUid));
  },

  afterModel(model) {
    if (!model) {
      this.transitionTo('404');
    }
  }
});
