import Component from '@ember/component';

export default Component.extend({
  classNames: ['pop-in-campagns','pop-in-campagns__bottom'],
  classNameBindings: ['isClose:pop-in-campagns-min'],
  isClose: null,


  actions: {
    closePopIn() {
      this.set('isClose', true);
    },
    openPopIn() {
      this.set('isClose', false);
    },
  }
});
