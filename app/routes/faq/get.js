import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  prismic: service(),

  async model(params) {
    const faqMenu = await this._fetchFaqMenuDocument();
    const faqCategory = await this._fetchFaqItems(params.uid);
    return { faqMenu, faqCategory };
  },

  async afterModel(model) {
    const api = await this.get('prismic').getApi();
    const faqItemIds = model.faqCategory.rawJSON.faq_items.map(document => document.faq_item.id);
    model.faqItems = (await api.getByIDs(faqItemIds)).results;
    return model;
  },

  async _fetchFaqMenuDocument() {
    const api = await this.get('prismic').getApi();
    const document = await api.query(Prismic.Predicates.at('document.type', 'faq_menu'), { 'fetchLinks': 'faq_category.title' });
    return document.results[0];
  },

  async _fetchFaqItems(faqCategoryUid) {
    const api = await this.get('prismic').getApi();
    const document = await api.query(Prismic.Predicates.at('my.faq_category.uid', faqCategoryUid));
    return document.results[0];
  }
});
