import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | navigations', function(hooks) {
  setupTest(hooks);

  test('it should load navigations', async function(assert) {
    // Given
    const navigations = this.owner.lookup('service:navigations');

    // When
    await navigations.load();

    // Then
    assert.ok(navigations.nav);
  });
});
