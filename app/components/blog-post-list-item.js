import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({

  // Dependencies
  prismic: service(),

  // Element
  tagName: 'article',
  classNames: ['blog-post-list-item'],

  // Data props
  post: null,

  // CPs
  uid: computed('post', function() {
    const post = this.get('post');
    return this.get('prismic').getUid(post);
  }),

  category: computed('post', function() {
    const post = this.get('post');
    return this.get('prismic').getText(post.rawJSON.category);
  }),

  publicationDate: computed('post', function() {
    const post = this.get('post');
    const lastPublicationDate = this.get('prismic').getLastPublicationDate(post);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return lastPublicationDate.toLocaleDateString('fr-FR', options);
  }),

  title: computed('post', function() {
    const post = this.get('post');
    return this.get('prismic').getText(post.rawJSON.title);
  }),

  firstParagraph: computed('post', function() {
    const post = this.get('post');
    const firstParagraph = post.rawJSON.content.find((fragment) => fragment.type === 'paragraph');
    return this.get('prismic').getHtml([firstParagraph]);
  }),

  author: computed('post', function() {
    const post = this.get('post');
    return this.get('prismic').getText(post.rawJSON.author.data.name);
  }),

});
