import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({

  // Dependencies
  prismic: service(),

  // Element
  classNames: ['faq-item'],
  classNameBindings: ['_statusClass'],

  // Data props
  faqItem: null,

  // CPs
  question: computed('faqItem', function() {
    const document = this.get('faqItem');
    return this.get('prismic').getText(document.rawJSON.question);
  }),
  answer: computed('faqItem', function() {
    const document = this.get('faqItem');
    return this.get('prismic').getHtml(document.rawJSON.answer);
  }),

  // Actions
  actions: {
    displayFaqItemAnswer() {
      if (this.get('_statusClass') === 'closed') {
        this.set('_statusClass', 'opened');
      } else {
        this.set('_statusClass', 'closed');
      }
    }
  },

  // Internals
  _statusClass: 'closed'

});
