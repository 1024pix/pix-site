import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  // Props
  page: null,

  // CPs
  pageHeader: computed('page', function() {
    const page = this.get('page');
    return PrismicDOM.RichText.asHtml(page.rawJSON.header);
  }),

  pageBody: computed('page', function() {
    const page = this.get('page');
    return PrismicDOM.RichText.asHtml(page.rawJSON.body);
  }),

  pageFooter: computed('page', function() {
    const page = this.get('page');
    return PrismicDOM.RichText.asHtml(page.rawJSON.footer);
  }),

});
