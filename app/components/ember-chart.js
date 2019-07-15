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
  legendPosition: 'bottom',
  chart: null,

  didInsertElement() {
    this._super(...arguments);
    if (this.data) {
      this.chart = new Chart(document.getElementById(this.elementId).children, {
        type: this.type,
        data: this.data,
        options: {
          legend: {
            poisition: this.legendPosition,
          }
        }
      });
    }
  },

  willDestroyElement() {
    if (this.chart) {
      this.chart.destroy();
    }
  },
});
