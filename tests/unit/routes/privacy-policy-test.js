import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | privacy-policy', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:privacy-policy');
    assert.ok(route);
  });
});
