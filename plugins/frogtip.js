const _ = require('lodash');
const request = require('request');

const FROG_API = 'http://frog.tips/api/1/tips';

module.exports = {
  regex: /frogtip/,

  description: 'frog care and feeding',

  requirePrefix: true,

  fn(data) {
    return new Promise((resolve, reject) => {
      request.get({
        uri: FROG_API,
        json: true
      }, (err, response, body) => {
        if (err) return reject(err);

        const tip = _.sample(body.tips);

        return resolve(`\`${tip}\` :frog:`);
      });
    });
  }
};
