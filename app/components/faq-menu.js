import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({

  // Dependencies
  prismic: service(),

  // Element
  tagName: 'nav',
  classNames: ['faq-menu'],

  // Data props
  document: null,

  // CPs
  menuEntries: computed('document', function() {
    return this.get('document').rawJSON.categories.map((category) => {
      const categoryUri = category.category.uid;
      const categoryTitle = this.get('prismic').getText(category.category.data.title);
      return {
        uri: categoryUri,
        title: categoryTitle
      };
    });
  })

});
