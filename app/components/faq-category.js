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

    return document.rawJSON.questions.map((item) => {
      const prismic = this.get('prismic');
      const question = prismic.getText(item.question.data.question);
      const answer = prismic.getHtml(item.question.data.answer);
      return {
        question,
        answer
      }
    });
  })

});
