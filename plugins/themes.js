const logger = require('../utils/logger');
const config = require('config');
const slackAPI = require('../lib/slack-api');
const Theme = require('../models/theme-schema');

const regex = /themes ([\w]+)(?: ([\w]+) (#[\dabcdef]{6}[\s\,]*#[\dabcdef]{6}[\s\,]*#[\dabcdef]{6}[\s\,]*#[\dabcdef]{6}[\s\,]*#[\dabcdef]{6}[\s\,]*#[\dabcdef]{6}[\s\,]*#[\dabcdef]{6}[\s\,]*#[\dabcdef]{6}))?/;

module.exports = {
  regex,

  description: 'Garf remembers #cool themes for you',

  requirePrefix: true,

  fn(message) {
    const matches = regex.exec(message.text);
    if (matches.length < 4) {
      logger.info("Too few matches: ", matches.length);
      return null;
    }

    const cmd = matches[1];
    const name = matches[2];
    const theme = matches[3];

    logger.info("Cmd: ", cmd);
    if (cmd === "add" && name && theme) {
      logger.info("Name: ", name);
      logger.info("Theme: ", theme);
      const themeRecord = new Theme({
        name: name.trim(),
        theme: theme.trim(),
        creator: message.user,
      });
      return themeRecord.save()
        .then(result => {
          return Theme.count();
        })
        .then(count => {
          logger.info('total themes:', count);
          slackAPI.reactions.add('art', {
            channel: message.channel,
            timestamp: message.ts
          });
          slackAPI.reactions.add('lower_left_paintbrush', {
            channel: message.channel,
            timestamp: message.ts
          });
          return null;
        });
    } else if (cmd === "list") {
      Theme.find().then(themes => {
        if(themes && themes.length) {
          var output = "";
          for (var i = 0; i < themes.length; i++) {
            var t = themes[i];
            output += (i+1);
            output += ") Theme _";
            output += t.name;
            output += "_ by ";
            output += t.creator;
            output += ": \n";
            output += t.theme;
            output += "\n";
          }

          slackAPI.chat.postMessage(
            message.channel,
            output,
            {
              icon_emoji: config.icon_emoji,
              // Using `as_user` is required to get the hex colour previews
              // & a "switch sidebar theme" button.
              as_user: true,
            });
          return null;
        }
      });
    }

    return Promise.resolve();
  }
};
