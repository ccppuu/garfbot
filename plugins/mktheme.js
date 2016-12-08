const logger = require('../utils/logger');
const slackAPI = require('../lib/slack-api');
const randomColour = require('randomcolor');
const config = require('config');

// There are 8 colours to a Slack theme
const themeColours = 8;

const regex = /mktheme( [\w]+)?/;

module.exports = {
  regex,

  description: 'Garf generates a random Slack theme for you',

  requirePrefix: true,

  fn(message) {
    var opts = {
      count: themeColours
    }

    const matches = regex.exec(message.text);
    if (matches.length >= 2) {
      const hue = matches[1].trim();
      opts['hue'] = hue;
    }

    const colours = randomColour(opts);
    var theme = ""

    for (var i = 0; i < themeColours; i++) {
      theme += colours[i];
      if (i < (themeColours - 1)) {
        theme += ",";
      }
    }

    return Promise.resolve(theme);
  }
};
