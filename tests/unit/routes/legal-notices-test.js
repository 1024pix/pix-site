import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | legal-notices', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:legal-notices');
    assert.ok(route);
  });
});
