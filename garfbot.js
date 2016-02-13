const _ = require('lodash');
const config = require('config');
const logger = require('./utils/logger');
const muxer = require('./utils/muxer');
const slack = require('./lib/slack');

slack.on('message', message => {
  var channel = slack.getChannelGroupOrDMByID(message.channel);
  var user = slack.getUserByID(message.user);

  var self = slack.self;

  muxer({
    self, message
  }).then(replies => {
    _.each(replies, text => {
      channel.postMessage({
        text,
        username: config.username,
        icon_emoji: ':garf:'
      });
    });
  });
});