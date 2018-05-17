import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | faq/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:faq/index');
    assert.ok(route);
  });
});
