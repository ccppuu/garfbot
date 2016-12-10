/* eslint-disable no-console */
const emojiUtils = require('../utils/emoji');
const Panoptimoji = require('../models/panoptimoji-schema');

const MAX_RESULTS = 5;

module.exports = {
  regex: /\!emoji/,

  description: 'x-emojiscore club',

  requirePrefix: true,

  fn(data) {
    const user = data.user;
    return Panoptimoji.find({ user }).sort({ count: 'desc' }).limit(5)
      .then(result => {
        if (!result || !result.length) {
          return Promise.resolve();
        }

        const response = result
          .filter(r => r.emoji && r.emoji !== 'undefined')
          .map(r => {
            return `${r.emoji} (${r.count})`;
          }).join('\n');

        return Promise.resolve(response);
      }).catch(error => {
        console.error(error);
      });
  }
};
