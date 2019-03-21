import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | formable-pages/contact-digital-mediation', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:formable-pages/contact-digital-mediation');
    assert.ok(route);
  });
});
