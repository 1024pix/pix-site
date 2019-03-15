import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  // Element
  classNames: ['partners-school-list'],

  // Data props
  documents: null,

  // CPs
  columnASchools: computed('documents', function () {
    const documents = this.documents;
    const nbColumnDocuments = this._nbDocumentsForColumnA();
    const begin = 0;
    const end = nbColumnDocuments;
    return documents.slice(begin, end);
  }),

  columnBSchools: computed('documents', function () {
    const documents = this.documents;
    const nbColumnDocuments = this._nbDocumentsForColumnB();
    const begin = this._nbDocumentsForColumnA();
    const end = begin + nbColumnDocuments;
    return documents.slice(begin, end);
  }),

  columnCSchools: computed('documents', function () {
    const documents = this.documents;
    const nbColumnDocuments = this._nbDocumentsForColumnC();
    const begin = this._nbDocumentsForColumnA() + this._nbDocumentsForColumnB();
    const end = begin + nbColumnDocuments;
    return documents.slice(begin, end);
  }),

  _nbDocumentsForColumnA() {
    const documents = this.documents;
    const nbDocuments = documents.length;
    return Math.ceil(nbDocuments / 3) + Math.ceil(((nbDocuments % 3) / 2));
  },

  _nbDocumentsForColumnB() {
    const documents = this.documents;
    const nbDocuments = documents.length;
    return Math.floor(nbDocuments / 3) + Math.floor(((nbDocuments % 3) / 2));
  },

  _nbDocumentsForColumnC() {
    const documents = this.documents;
    const nbDocuments = documents.length;
    return Math.floor(nbDocuments / 3);
  },

});
