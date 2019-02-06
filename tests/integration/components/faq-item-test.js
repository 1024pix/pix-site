import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | faq-item', function(hooks) {

  setupRenderingTest(hooks);

  const faqItem = {
    uid: 'faq_item_uid',
    data: {
      question: [{
        text: 'Question title ?',
        type: 'heading1'
      }],
      answer: [{
        text: 'Answer’s paragraph 1',
        type: 'paragraph',
        spans: []
      }, {
        text: 'Answer’s paragraph 2',
        type: 'paragraph',
        spans: []
      }]
    }
  };

  test('it should have element class faq-item', async function(assert) {
    // given
    this.set('faqItem', faqItem);

    // when
    await render(hbs`{{faq-item faqItem=faqItem}}`);

    // then
    assert.dom('.faq-item').exists();
  });

  test('it displays question', async function(assert) {
    // given
    this.set('faqItem', faqItem);

    // when
    await render(hbs`{{faq-item faqItem=faqItem}}`);

    // then
    const itemQuestion = this.element.querySelector('h3.faq-item__question');
    assert.equal(itemQuestion.textContent.trim(), 'Question title ?');
  });

  test('item’s answer should be collapsed by default', async function(assert) {
    // given
    this.set('faqItem', faqItem);

    // when
    await render(hbs`{{faq-item faqItem=faqItem}}`);

    // then
    assert.dom('.faq-item').hasClass('closed');
  });

  test('item’s answer  should be expanded when user clicked on question', async function(assert) {
    // given
    this.set('faqItem', faqItem);
    await render(hbs`{{faq-item faqItem=faqItem _statusClass="closed"}}`);

    // when
    await click('.faq-item__question');

    // then
    assert.dom('.faq-item').hasClass('opened');
  });

  test('item’s answer  should collapse when it has been opened and user clicked on question', async function(assert) {
    // given
    this.set('faqItem', faqItem);
    await render(hbs`{{faq-item faqItem=faqItem _statusClass="opened"}}`);

    // when
    await click('.faq-item__question');

    // then
    assert.dom('.faq-item').hasClass('closed');
  });

  test('it displays all the paragraphs of the answer', async function(assert) {
    // given
    this.set('faqItem', faqItem);

    // when
    await render(hbs`{{faq-item faqItem=faqItem _statusClass="opened"}}`);

    // then
    const $answer = this.element.querySelector('div.faq-item__answer');
    assert.equal(this.element.querySelectorAll('div.faq-item__answer p').length, 2);
    assert.ok($answer.textContent.includes('Answer’s paragraph 1'));
    assert.ok($answer.textContent.includes('Answer’s paragraph 2'));
  });

  test('item’s question has an anchor for accessibility', async function(assert) {
    // given
    this.set('faqItem', faqItem);

    // when
    await render(hbs`{{faq-item faqItem=faqItem}}`);

    // then
    assert.dom('.faq-item__question#faq_item_uid').exists();
  });
});
