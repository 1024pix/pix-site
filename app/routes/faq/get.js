import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  prismic: service(),

  async model(params) {
    const faqCategoryUID = params.uid;
    const api = await this.get('prismic').getApi();
    const faqMenu = (await api.query(
      Prismic.Predicates.at('document.type', 'faq_menu'),
      { 'fetchLinks': 'faq_category.title' }))
      .results[0];
    const faqItems = (await api.query(
      Prismic.Predicates.at('my.faq_category.uid', faqCategoryUID),
      { 'fetchLinks': ['faq_item.question', 'faq_item.answer'] }))
      .results[0];
    return { faqMenu, faqItems };
  }
});
