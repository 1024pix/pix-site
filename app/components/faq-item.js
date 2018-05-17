import Component from '@ember/component';

export default Component.extend({

  // Element
  classNames: ['faq-item'],
  classNameBindings: ['faqItem.statusClass'],

  // Data props
  faqItem: null,

  // Actions
  actions: {
    displayFaqItemAnswer() {
      if (this.get('faqItem.statusClass') === 'closed') {
        this.set('faqItem.statusClass', 'opened');
      } else {
        this.set('faqItem.statusClass', 'closed');
      }
    }
  }

});
