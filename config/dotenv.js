'use strict';

<<<<<<< HEAD
module.exports = function() {
  return {
    clientAllowedKeys: ['PRISMIC_API_ENDPOINT', 'PRISMIC_API_TOKEN'],
=======
const path = require('path');

module.exports = function() {
  return {
    clientAllowedKeys: ['PRISMIC_API_TOKEN'],
>>>>>>> Add environment variables
    failOnMissingKey: false,
  }
};
