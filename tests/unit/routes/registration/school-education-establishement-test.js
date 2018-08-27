import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | registration/school-education-establishement', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:registration/school-education-establishement');
    assert.ok(route);
  });
});
