import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({

  // Dependencies
  prismic: service(),

  // Element
  classNames: ['faq-category'],

  // Data props
  faqCategory: null,
  faqItems: null,

  // CPs
  categoryTitle: computed('faqCategory', function() {
    const document = this.get('faqCategory');
    return this.get('prismic').getText(document.rawJSON.title);
  })
});
