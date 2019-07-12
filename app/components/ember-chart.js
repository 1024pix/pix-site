import Component from '@ember/component';
import { Chart } from 'chart.js';

export default Component.extend({

  // Element
  classNames: ['ember-chart'],

  // Data props
  type: 'line',
  data: null,
  width: null,
  height: null,

  didInsertElement() {
    this._super(...arguments);
    if (this.data !== null) {
      new Chart(document.getElementById(this.elementId).children, {
        type: this.type,
        data: this.data,
      });
    }
  }
});
