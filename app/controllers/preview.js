import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['documentId', 'token'],
  documentId: null, 
  token: null
});
