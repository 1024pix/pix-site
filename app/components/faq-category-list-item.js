import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({

  // Dependencies
  prismic: service(),

  // Element
  tagName: 'article',
  classNames: ['faq-category-list-item'],

  // Props
  model: null,

  // CPs
  title: computed('model', function() {
    const model = this.get('model');
    return this.get('prismic').getText(model.rawJSON.title);
  }),

  nbQuestions: computed('model', function() {
    const model = this.get('model');
    return model.rawJSON.questions.length;
  }),
});
