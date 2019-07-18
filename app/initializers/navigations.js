export function initialize(application) {
  application.inject('route', 'navigations', 'service:navigations');
}

export default {
  initialize
};
