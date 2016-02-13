const _ = require('lodash');
const Promise = require('bluebird');
const config = require('config');
const path = require('path');

// Load plugins
const pathToPlugins = path.join(__dirname, '..', 'plugins');
const plugins = require('require-all')({
  dirname: pathToPlugins
});

console.log('plugins', plugins);

/**
 * @param {object} data
 * @param {object} data.self
 * @param {object} data.self.id
 * @param {object} data.self.name
 * @param {object} data.message
 * @param {string} data.message.text
 */
module.exports = (data) => {

  console.log(data);

  const self = data.self;
  const message = data.message;

  // Ignore messages sent by the bot
  const sender = message.username;
  if (sender === config.username) return null;

  const replyRe = new RegExp(`<@${self.id}>:`);
  const isToMe = replyRe.test(message.text);
  if (!isToMe) return null;

  const promises = _(plugins)
    .filter(plugin => {
      return !!plugin.regex && plugin.regex.test(message.text)
    })
    .map(plugin => {
      return plugin.fn(message.text);
    })
    .value();

  return Promise.all(promises);
};