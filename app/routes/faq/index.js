import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  prismic: service(),

  async model() {
    const api = await this.get('prismic').getApi();
    return api.getSingle('faq_menu');
  },

  afterModel(model) {
    const firstFaqCategoryUri = model.rawJSON.categories[0].category.uid;
    if (firstFaqCategoryUri) {
      return this.transitionTo('faq.get', firstFaqCategoryUri);
    }
    return this.transitionTo('404');
  }
});
