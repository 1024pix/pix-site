import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  prismic: service(),

  async model(params) {
    const prismic = this.prismic;
    const faqMenu = await prismic.getFaqMenu();
    const faqCategory = await prismic.getFaqCategoryByUid(params.uid);
    const faqItems = await prismic.findFaqItemsByFaqCategory(faqCategory);
    return { faqMenu, faqCategory, faqItems };
  }

});
