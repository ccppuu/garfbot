const _ = require('lodash');
const config = require('config');
const slackAPI = require('../lib/slack-api');

const wordToEmoji = config.plugins["keyword-reactions"].keywords;

module.exports = {
  regex: /.*/,

  fn(message) {
    if (!message.text) return null;

    const text = message.text;

    _.forIn(wordToEmoji, (emoji, word) => {
      var isFound = text.indexOf(word);
      if (isFound < 0) return;

      const target = {
        channel: message.channel,
        timestamp: message.ts
      };
      const emojis = Array.isArray(emoji) ? emoji : [emoji];

      _.forEach(emojis, emoji => {
        slackAPI.reactions.add(emoji, target);
      });
    });
  }
};