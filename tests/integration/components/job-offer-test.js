import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | job-offer', function(hooks) {
  setupRenderingTest(hooks);

  const jobOffer = {
    uid: 'job_offer_uid',
    rawJSON: {
      title: [{
        text: 'Job title',
        type: 'heading1'
      }],
      description: [{
        text: 'Paragraph 1',
        type: 'paragraph',
        spans: []
      }, {
        text: 'Paragraph 2',
        type: 'paragraph',
        spans: []
      }]
    }
  };

  test('it should have element class job-offer', async function(assert) {
    // given
    this.set('jobOffer', jobOffer);

    // when
    await render(hbs`{{job-offer jobOffer=jobOffer}}`);

    // then
    assert.dom('.job-offer').exists();
  });

  test('it displays all the paragraphs of the description', async function(assert) {
    // given
    this.set('jobOffer', jobOffer);

    // when
    await render(hbs`{{job-offer jobOffer=jobOffer}}`);

    // then
    const $answer = this.element.querySelector('div.job-offer__description');
    assert.equal(this.element.querySelectorAll('div.job-offer__description p').length, 2);
    assert.ok($answer.textContent.includes('Paragraph 1'));
    assert.ok($answer.textContent.includes('Paragraph 2'));
  });

});
