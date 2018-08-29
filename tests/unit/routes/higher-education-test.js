import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | higher-education', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:higher-education');
    assert.ok(route);
  });
});
