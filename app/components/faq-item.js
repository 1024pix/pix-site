import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  // Props
  model: null,

  // CPs
  question: computed('model', function() {
    const model = this.get('model');
    return PrismicDOM.RichText.asText(model.question);
  }),

  answer: computed('model', function() {
    const model = this.get('model');
    return PrismicDOM.RichText.asHtml(model.answer);
  }),

});
