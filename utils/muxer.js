const _ = require('lodash');
const Promise = require('bluebird');
const config = require('config');
const path = require('path');
const logger = require('./logger');

// Load plugins
const pathToPlugins = path.join(__dirname, '..', 'plugins');
const plugins = require('require-all')({
  dirname: pathToPlugins
});

/**
 * @param {object} data
 * @param {object} data.self
 * @param {object} data.self.id
 * @param {object} data.self.name
 * @param {object} data.message
 * @param {string} data.message.text
 */
module.exports = (data) => {
  const self = data.self;
  const message = data.message;

  // Ignore messages sent by the bot
  const sender = message.username;
  if (sender === config.username) return Promise.resolve();

  const replyRe = new RegExp(`<@${self.id}>:`);
  const isToMe = replyRe.test(message.text);

  const promises = _(plugins)
    .filter(plugin => {
      const isRegexMatch = !!plugin.regex && plugin.regex.test(message.text);
      const isTarget = plugin.requirePrefix ? isToMe : true;
      return isRegexMatch && isTarget;
    })
    .map(plugin => {
      return plugin.fn(message);
    })
    .value();

  return Promise.all(promises);
};
