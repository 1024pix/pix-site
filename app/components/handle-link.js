import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  url: null,
  internalLink: computed('url', function() {
    const doc = document.createElement('a');
    doc.href = this.url;
    if(doc.hostname === 'pix.fr') {
      return doc.pathname;
    }
  }),
  inDocuments: computed('path', function() {
    return this.internalLink && this.internalLink.indexOf('documents/') !== -1;
  }),
  linkClass: null,
  text: null,
  target: null,
});
