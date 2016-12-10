/* eslint-disable no-console, no-param-reassign */
const emojiUtils = require('../utils/emoji');
const Panoptimoji = require('../models/panoptimoji-schema');
const Promise = require('bluebird');

/**
 * @param {string} user - the user string
 * @param {string} emoji - an emoji (":garf:")
 * @returns {Promise} a promise that resolves with the panoptomoji db object
 */
const findOrCreatePanoptimoji = (user, emoji) => {
  return new Promise((resolve, reject) => {
    Panoptimoji.findOneOrCreate(
      { user, emoji },
      { user, emoji, count: 0 },
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
};

module.exports = {
  regex: /.*/,

  description: 'all-seeing emoji',

  requirePrefix: false,

  fn(data) {
    const user = data.user;
    const emojis = emojiUtils.parse(data.text);

    if (!emojis.length) {
      return Promise.resolve();
    }

    const promises = emojis.map(emoji => {
      return findOrCreatePanoptimoji(user, emoji)
        .then(result => {
          const newCount = result.count + 1;
          result.count = newCount;
          result.save();
        });
    });

    return Promise.all(promises)
      .then(() => {
        return Promise.resolve();
      })
      .catch(error => console.error);
  }
};
