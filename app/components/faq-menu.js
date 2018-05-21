import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  // Element
  tagName: 'nav',
  classNames: ['faq-menu'],

  // Data props
  document: null,

  // CPs
  menuEntries: computed('document', function() {
    return this.get('document').rawJSON.faq_categories.map((faqCategoryDocument) => {
      return {
        uri: faqCategoryDocument.faq_category.uid,
        title: faqCategoryDocument.faq_category.data.title
      };
    });
  })

});
