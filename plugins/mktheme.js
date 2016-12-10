const logger = require('../utils/logger');
const slackAPI = require('../lib/slack-api');
const randomColour = require('randomcolor');
const values = require('lodash/values');
const config = require('config');

// There are 8 colours to a Slack theme
const NUM_THEME_COLOURS = 8;

const regex = /mktheme( [\w]+)?/;

module.exports = {
  regex,

  description: 'Garf generates a random Slack theme for you',

  requirePrefix: true,

  fn(message) {
    var opts = {
      count: NUM_THEME_COLOURS
    };

    const matches = regex.exec(message.text);
    if (matches.length >= 2 && matches[1] !== undefined) {
      const hue = matches[1].trim();
      opts.hue = hue;
    }

    const colours = randomColour(opts);
    logger.info(colours);

    const theme = values(colours).join(',');
    slackAPI.chat.postMessage(
      message.channel,
      theme,
      {
        icon_emoji: config.icon_emoji,
        unfurl_links: true,
        unfurl_media: true,
        // Using `as_user` is required to get the hex colour previews
        // & a "switch sidebar theme" button.
        as_user: true,
      });
    return Promise.resolve();
  }
};
