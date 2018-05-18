import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({

  // Dependencies
  prismic: service(),

  // Element
  classNames: ['faq-category'],

  // Data props
  document: null,

  // CPs
  categoryTitle: computed('document', function() {
    const document = this.get('document');
    return this.get('prismic').getText(document.rawJSON.title);
  }),

  faqItems: computed('document', function() {
    const document = this.get('document');

    return document.rawJSON.faq_items.map((faqItemDocument) => {
      const prismic = this.get('prismic');
      const documentId = faqItemDocument.faq_item.id;
      const uid = faqItemDocument.faq_item.uid;
      const question = prismic.getText(faqItemDocument.faq_item.data.question);
      const answer = prismic.getHtml(faqItemDocument.faq_item.data.answer);
      return {
        documentId,
        uid,
        question,
        answer,
        statusClass: 'closed'
      }
    });
  })
});
