const _ = require('lodash');
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

  // Iterate through all of the plugins. The first regex match will be used.
  // TODO: allow multiple matches
  var reply;
  _.each(plugins, plugin => {
    if (!plugin.regex) return;

    var isMatch = plugin.regex.test(message.text);
    if (isMatch) {
      reply = plugin.fn(message.text);
      return;
    }
  });

  return reply;
};