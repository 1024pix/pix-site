import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  prismic: service(),

  model(params) {
    const faqCategoryUID = params.uid;
    return this.get('prismic').getApi()
      .then(api => api.getByUID('faq_category', faqCategoryUID));
  }
});
