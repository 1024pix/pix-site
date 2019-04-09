import Controller from '@ember/controller';

export default Controller.extend({

  queryParams: ['page', 'pageSize'],
  page: 1,
  pageSize: 6,
});
