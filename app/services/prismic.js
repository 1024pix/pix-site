import Service from '@ember/service';
import { Promise } from "rsvp";

export default Service.extend({

  getApi() {
    return new Promise(function(resolve, reject) {
      Prismic.api('https://pix-site.cdn.prismic.io/api/v2', function(error, api) {
        if (error) {
          reject(error);
        }
        resolve(api);
      });
    });
  },

  async getFaqMenu() {
    const api = await this.getApi();
    const document = await api.query(Prismic.Predicates.at('document.type', 'faq_menu'), { 'fetchLinks': 'faq_category.title' });
    return document.results[0];
  },

  async getFaqCategoryByUid(faqCategoryUid) {
    const api = await this.getApi();
    const document = await api.query(Prismic.Predicates.at('my.faq_category.uid', faqCategoryUid));
    return document.results[0];
  },

  async findFaqItemsByFaqCategory(faqCategory) {
    const api = await this.getApi();
    const faqItemIds = faqCategory.rawJSON.faq_items.map(document => document.faq_item.id);
    const documents = await api.getByIDs(faqItemIds);
    return documents.results;
  },

  async findJobs() {
    const api = await this.getApi();
    const documents = await api.query(Prismic.Predicates.at('document.type', 'job'));
    return documents.results;
  },

  async getJobByUid(jobUid) {
    const api = await this.getApi();
    const document = await api.query(Prismic.Predicates.at('my.job_offer.uid', jobUid));
    return document.results[0];
  }

});
