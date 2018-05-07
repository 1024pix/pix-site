import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  prismic: service(),

  model() {
    return this.get('prismic').getApi()
      .then(api => api.query(
        Prismic.Predicates.at('document.type', 'faq_page'),
        { 'fetchLinks': ['faq_item.question', 'faq_item.answer'] }))
      .then((response) => {
        const document = response.results[0];
        return document;
      });
  }

});
