import Component from '@ember/component';

export default Component.extend({

  // Element
  classNames: ['faq-item'],
  classNameBindings: ['_statusClass'],

  // Data props
  faqItem: null,

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
