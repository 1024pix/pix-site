import { asRoute } from 'pix-site/helpers/as-route';
import { module, test } from 'qunit';

module('Unit | Helper | as-route', function() {

  test('it should return digital-mediation', function(assert) {
    assert.equal(asRoute(['/mediation-numerique']), 'digital-mediation');
  });

  test('it should return index for inexistant path', function(assert) {
    assert.equal(asRoute(['/bad-path']), 'index');
  });
});
