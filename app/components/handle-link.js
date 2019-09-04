import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  url: null,
  path: computed('url', function() {
    const doc = document.createElement('a');
    doc.href = this.url;
    if(doc.hostname === 'pix.fr') {
      return doc.pathname;
    }
  }),
  useLinkTo: computed('path', function() {
    return this.path && !this.path.includes('documents/');
  }),
  linkClass: null,
  text: null,
  target: null,
});
