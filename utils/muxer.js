const _ = require('lodash');
const config = require('config');
const path = require('path');

// Load plugins
const pathToPlugins = path.join(__dirname, '..', 'plugins');
const plugins = require('require-all')({
  dirname: pathToPlugins
});

console.log('plugins', plugins);

module.exports = (data) => {
  const sender = data.username;

  // Ignore messages sent by the bot
  if (sender === config.username) return null;

  // Iterate through all of the plugins. The first regex match will be used.
  // TODO: allow multiple matches
  var reply;
  _.each(plugins, plugin => {
    var isMatch = plugin.regex.test(data.text);
    if (isMatch) {
      reply = plugin.fn(data.text);
      return;
    }
  });

  return reply;
};