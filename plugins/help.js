const _ = require('lodash');
const config = require('config');
const path = require('path');

// Load plugins
const pathToPlugins = path.join(__dirname, '..', 'plugins');
const plugins = require('require-all')({
  dirname: pathToPlugins
});

module.exports = {
  regex: /help/,

  requirePrefix: true,

  fn(data) {
    var commands = [];

    _.each(plugins, plugin => {
      if (!plugin.regex || !plugin.description) return;
      commands.push(`${plugin.regex} - ${plugin.description}`);
    });
    return commands.join('\n');
  }
};