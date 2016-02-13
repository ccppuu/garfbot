const _ = require('lodash');
const google = require('./google');

function makeParams(params) {
  return _.assign({}, params, {
    searchType: 'image'
  });
}

/**
 * @param {string} query - search string
 * @param {object} params - for a full list, see:
 *    https://developers.google.com/custom-search/json-api/v1/reference/cse/list
 *
 * @returns {object}
 */
module.exports = function googleImages(query, params) {
  return google(query, makeParams(params))
    .then(response => {
      return response.items;
    });
};