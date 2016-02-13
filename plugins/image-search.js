const _ = require('lodash');
const imageSearch = require('../lib/google-images');

const regex = /gis (.*)$/;

module.exports = {
  regex,

  description: 'google image search',

  fn(message) {
    const query = regex.exec(message)[1];
    return imageSearch(query)
      .then(results => {
        const result = _.sample(results);
        return result.link;
      });
  }
};