const db = require('../lib/db');

const regex = /pin (\S*)/;

module.exports = {
  regex,

  description: 'pin links to slack',

  fn(message) {
    const matches = regex.exec(message);
    if (matches.length < 2) {
      return Promise.resolve('gimme a cool url 2 pin :sunglasses:');
    }

    const url = matches[1];
    return Promise.resolve(`pinned ${url} :garf:`);
  }
};