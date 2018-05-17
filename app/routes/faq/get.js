import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  prismic: service(),

  async model(params) {
    const faqMenu = await this._fetchFaqMenuDocument();
    const faqItems = await this._fetchFaqItems(params.uid);
    return { faqMenu, faqItems };
  },

  async _fetchFaqMenuDocument() {
    const api = await this.get('prismic').getApi();
    const document = await api.query(Prismic.Predicates.at('document.type', 'faq_menu'), { 'fetchLinks': 'faq_category.title' });
    return document.results[0];
  },

  async _fetchFaqItems(faqCategoryUid) {
    const api = await this.get('prismic').getApi();
    const document = await api.query(Prismic.Predicates.at('my.faq_category.uid', faqCategoryUid), { 'fetchLinks': ['faq_item.uid', 'faq_item.question', 'faq_item.answer'] });
    return document.results[0];
  }
});
