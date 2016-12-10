const logger = require('../utils/logger');
const config = require('config');
const slackAPI = require('../lib/slack-api');
const Theme = require('../models/theme-schema');

// cmdRegex matches the 'themes' plugin prefix and a subcommand (e.g. 'list')
const cmdRegex = /themes( \w+)?/;

// themeRegex matches a theme name and the theme. A theme is 8 colours in
// typical HTML hex encoding (e.g. #95e830), optionally separated by
// whitespace and commas
const themeRegex = /([\S]+) ((?:#[\da-fA-F]{6}[\s\,]*){8})/;

const addTheme = (text, message) => {
  const replyTo = {
    channel: message.channel,
    timestamp: message.ts
  };

  const themeMsg = themeRegex.exec(text);
  const name = themeMsg[1];
  const theme = themeMsg[2];
  if (!name || !theme) { return; }

  const themeRecord = new Theme({
    name: name.trim(),
    theme: theme.trim(),
    creator: message.user,
  });
  themeRecord.save().then(result => {
    return Theme.count();
  }).then(count => {
    logger.info('total themes:', count);
    slackAPI.reactions.add('art', replyTo);
    slackAPI.reactions.add('lower_left_paintbrush', replyTo);
  });
};

const printThemes = (message) => {
  Theme.find().then(themes => {
    const themeList = themes.map((theme, i) =>
      `${i + 1} - Theme _${theme.name}_ by ${theme.creator}:\n${theme.theme}`
    ).join('\n');
    slackAPI.chat.postMessage(
      message.channel,
      themeList,
      {
        icon_emoji: config.icon_emoji,
        // Using `as_user` is required to get the hex colour previews
        // & a "switch sidebar theme" button.
        as_user: true,
      }
    );
  });
};

module.exports = {
  regex: cmdRegex,

  description: 'Garf remembers #cool themes for you. "themes add <name> <theme>", "themes list"',

  requirePrefix: true,

  fn(message) {
    // Default to the "list" subcommand if none is provided
    var cmd = 'list';
    const matches = cmdRegex.exec(message.text);

    // If there was a subcommand match, use it instead of the default
    if (matches[1]) {
      cmd = matches[1].trim();
    }

    if (cmd === 'add') {
      // Extract everything after the themes command and the subcommand.
      const cmdPrefix = `themes ${cmd} `;
      const rest = message.text.substring(
        message.text.indexOf(cmdPrefix) + cmdPrefix.length);
      addTheme(rest, message);
      return Promise.resolve();
    } else if (cmd === 'list') {
      printThemes(message);
      return Promise.resolve();
    }

    // Unknown command ¯\_(ツ)_/¯
    return Promise.resolve();
  }
};
