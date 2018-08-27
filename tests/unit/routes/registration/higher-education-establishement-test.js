import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | registration/higher-education-establishement', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:registration/higher-education-establishement');
    assert.ok(route);
  });
});
