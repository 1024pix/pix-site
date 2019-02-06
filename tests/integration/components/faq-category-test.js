import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | faq-category', function(hooks) {

  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    const faqCategory = {
      uid: 'faq_category_uid',
      data: {
        title: [{ type: 'heading1', text: 'Titre de la catégorie' }]
      }
    };
    this.set('faqCategory', faqCategory);
  });

  test('it displays FAQ category title', async function(assert) {
    // when
    await render(hbs`{{faq-category faqCategory=faqCategory}}`);

    // then
    assert.dom('h2.faq-category-title').exists();
    assert.dom('h2.faq-category-title').hasText('Titre de la catégorie');
  });

  test('it displays a message when there is no FAQ items', async function(assert) {
    // when
    await render(hbs`{{faq-category faqCategory=faqCategory}}`);

    // then
    assert.dom('.faq-category-items').includesText('Il n’y a pas encore de questions.');
  });

  test('it renders all category items', async function(assert) {
    // given
    const faqItemA = {
      uid: 'faq_item_A',
      data: {
        question: [{
          text: 'Question A',
          type: 'heading1'
        }],
        answer: []
      }
    };
    const faqItemB = {
      uid: 'faq_item_B',
      data: {
        question: [{
          text: 'Question B',
          type: 'heading1'
        }],
        answer: []
      }
    };
    const faqItemC = {
      uid: 'faq_item_C',
      data: {
        question: [{
          text: 'Question C',
          type: 'heading1'
        }],
        answer: []
      }
    };
    const faqItems = [faqItemA, faqItemB, faqItemC];
    this.set('faqItems', faqItems);

    // when
    await render(hbs`{{faq-category faqCategory=faqCategory faqItems=faqItems}}`);

    // then
    assert.dom('.faq-category-item').exists({ count: 3 });
    assert.dom('.faq-item').exists({ count: 3 });
  });
});
