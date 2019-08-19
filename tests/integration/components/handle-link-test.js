import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | handle-link', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.lookup('router:main').setupRouter();
  });

  test('it should return entire url if it\'s not a Pix url', async function(assert) {
    // given
    const url = "https://google.fr";
    this.set('url', url);

    // when
    await render(hbs`<HandleLink @url={{this.url}} />`);

    // then
    assert.equal(this.element.querySelector('a').getAttribute('href'), 'https://google.fr');
  });


  test('it should return path of url if it\'s a Pix url', async function(assert) {
    // given
    const url = "https://pix.fr/mediation-numerique";
    this.set('url', url);

    // when
    await render(hbs`<HandleLink @url={{this.url}} />`);

    // then
    assert.equal(this.element.querySelector('a').getAttribute('href'), '/mediation-numerique');
  });

  test('it should add class for external link', async function(assert) {
    // given
    const url = "https://youtube.fr";
    this.set('url', url);
    const className = "test";
    this.set('class', className);

    // when
    await render(hbs`<HandleLink @url={{this.url}} @linkClass={{this.class}} />`);

    // then
    assert.dom('.test').exists();
  });

  test('it should add class for internal link', async function(assert) {
    // given
    const url = "https://pix.fr";
    this.set('url', url);
    const className = "test";
    this.set('class', className);

    // when
    await render(hbs`<HandleLink @url={{this.url}} @linkClass={{this.class}} />`);

    // then
    assert.dom('.test').exists();
  });

  test('it should have text args for external link', async function(assert) {
    // given
    const url = "https://youtube.fr";
    this.set('url', url);
    const text = "Test text";
    this.set('text', text);

    // when
    await render(hbs`<HandleLink @url={{this.url}} @text={{this.text}} />`);

    // then
    assert.dom('a').hasText('Test text');
  });

  test('it should have text args for internal link', async function(assert) {
    // given
    const url = "https://pix.fr";
    this.set('url', url);
    const text = "Test text";
    this.set('text', text);

    // when
    await render(hbs`<HandleLink @url={{this.url}} @text={{this.text}} />`);

    // then
    assert.dom('a').hasText(text);
  });

  test('it should have target in new blank for external link', async function(assert) {
    // given
    const url = "https://youtube.fr";
    this.set('url', url);
    const target = "_blank";
    this.set('target', target);

    // when
    await render(hbs`<HandleLink @url={{this.url}} @target={{this.target}} />`);

    // then
    assert.equal(this.element.querySelector('a').getAttribute('target'), target);
  });

});
