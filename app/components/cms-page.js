import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({

  // Dependencies
  prismic: service(),

  // Element
  classNames: ['cms-page'],

  // Props
  page: null,

  // CPs
  title: computed('post', function() {
    const page = this.get('page');
    return this.get('prismic').getText(page.rawJSON.title);
  }),

  pageHeader: computed('page', function() {
    const page = this.get('page');
    return this.get('prismic').getHtml(page.rawJSON.header);
  }),

  pageBody: computed('page', function() {
    const page = this.get('page');
    return this.get('prismic').getHtml(page.rawJSON.body);
  }),

  pageFooter: computed('page', function() {
    const page = this.get('page');
    return this.get('prismic').getHtml(page.rawJSON.footer);
  }),

});
