import Service from '@ember/service';

export default Service.extend({

  getApi() {
    return PrismicJS.getApi('https://pix-site.cdn.prismic.io/api/v2');
  },

  async getFaqMenu() {
    const api = await this.getApi();
    const document = await api.query(PrismicJS.Predicates.at('document.type', 'faq_menu'), { 'fetchLinks': 'faq_category.title' });
    return document.results[0];
  },

  async getFaqCategoryByUid(faqCategoryUid) {
    const api = await this.getApi();
    const document = await api.query(PrismicJS.Predicates.at('my.faq_category.uid', faqCategoryUid));
    return document.results[0];
  },

  async findFaqItemsByFaqCategory(faqCategory) {
    const api = await this.getApi();
    const faqItemIds = faqCategory.data.faq_items.map(document => document.faq_item.id);
    const documents = await api.getByIDs(faqItemIds);
    return documents.results;
  },

  async findJobs() {
    const api = await this.getApi();
    const documents = await api.query(PrismicJS.Predicates.at('document.type', 'job_offer'));
    return documents.results;
  },

  async getJobByUid(jobUid) {
    const api = await this.getApi();
    const document = await api.query(PrismicJS.Predicates.at('my.job_offer.uid', jobUid));
    return document.results[0];
  },

  async getPage(pageName) {
    const api = await this.getApi();
    return await api.getSingle(pageName);
  },

});
