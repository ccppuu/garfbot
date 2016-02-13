const _ = require('lodash');
const config = require('config');
const google = require('googleapis');
const request = require('request');

const API_ENDPOINT = 'https://www.googleapis.com/customsearch/v1';

function makeQuery(query, params) {
  return _.assign({
    q: query,
    cx: config.google.cse_id,
    key: config.google.api_key
  }, params);
}

/**
 * @param {string} query - search string
 * @param {object} params - for a full list, see:
 *    https://developers.google.com/custom-search/json-api/v1/reference/cse/list
 *
 * @returns {object}
 */
module.exports = function search(query, params) {
  return new Promise((resolve, reject) => {
    request({
      uri: API_ENDPOINT,
      qs: makeQuery(query, params)
    }, (error, response, body) => {
      if (error) return reject(error);
      resolve(body);
    });
  });
};