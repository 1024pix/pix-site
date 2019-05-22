import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | stats', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:stats');
    assert.ok(route);
  });
});
