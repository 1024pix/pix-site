import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({

  // Dependencies
  prismic: service(),

  // Element
  classNames: ['blog-post-detail'],

  // Data props
  post: null,

  // CPs
  title: computed('post', function() {
    const post = this.get('post');
    return this.get('prismic').getText(post.rawJSON.title);
  }),

  publicationDate: computed('post', function() {
    const post = this.get('post');
    const lastPublicationDate = this.get('prismic').getLastPublicationDate(post);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return lastPublicationDate.toLocaleDateString('fr-FR', options);
  }),

  content: computed('post', function() {
    const post = this.get('post');
    return this.get('prismic').getHtml(post.rawJSON.content);
  }),

});
