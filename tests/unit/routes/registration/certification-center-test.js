import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | registration/certification-center', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:registration/certification-center');
    assert.ok(route);
  });
});
