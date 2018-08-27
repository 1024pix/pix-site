import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | formable-pages/pix-orga-newsletter-subscription', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:formable-pages/pix-orga-newsletter-subscription');
    assert.ok(route);
  });
});
