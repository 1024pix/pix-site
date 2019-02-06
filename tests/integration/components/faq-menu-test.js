import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | faq-menu', function(hooks) {

  setupRenderingTest(hooks);

  const faqMenu = {
    data: {
      faq_categories: [{
        faq_category: {
          uid: 'faq_category_a',
          data: {
            title: [{
              text: 'FAQ category A',
              type: 'heading1'
            }]
          }
        }
      }, {
        faq_category: {
          uid: 'faq_category_b',
          data: {
            title: [{
              text: 'FAQ category B',
              type: 'heading1'
            }]
          }
        }
      }]
    }
  };

  test('it renders as many entries as categories fetched', async function(assert) {
    // given
    this.set('faqMenu', faqMenu);

    // when
    await render(hbs`{{faq-menu document=faqMenu}}`);

    // then
    const $menuEntries = this.element.querySelectorAll('.faq-menu-entry .faq-menu-entry__link');
    assert.equal(this.element.querySelectorAll('li.faq-menu-entry a.faq-menu-entry__link').length, 2);
    assert.equal($menuEntries[0].textContent.trim(), 'FAQ category A');
    assert.equal($menuEntries[1].textContent.trim(), 'FAQ category B');
  });
});
