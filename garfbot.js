const _ = require('lodash');
const config = require('config');
const db = require('./lib/db');
const logger = require('./utils/logger');
const muxer = require('./utils/muxer');
const slackClient = require('./lib/slack-events');
const slackAPI = require('./lib/slack-api');

slackClient.on('message', message => {
  logger.info(message);

  const self = {
    id: slackClient.activeUserId
  };

  muxer({
    self,
    message
  }).then(replies => {
    _.each(replies, reply => {
      slackAPI.chat.postMessage(message.channel, reply, {
        username: config.username,
        icon_emoji: ':garf:',
        unfurl_links: true,
        unfurl_media: true
      });
    });
  });
});