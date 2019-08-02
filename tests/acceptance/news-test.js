import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | news', function(hooks) {
  setupApplicationTest(hooks);

  test('it should visit actualites when the url is valid', async function(assert) {
    //when
    await visit('/actualites');
    //then
    assert.equal(currentURL(), '/actualites');
  });

  test('it should redirect to index when the url is invalid', async function(assert) {
    //when
    await visit('/actualites/no-exist-slug-test');
    //then
    assert.equal(currentURL(), '/');
  });
});
