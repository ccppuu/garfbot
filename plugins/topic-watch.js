const logger = require('../utils/logger');
const slackAPI = require('../lib/slack-api');
const config = require('config');
const Topic = require('../models/topic-schema');
const names = require('../utils/names');

const regex = /^<@([\w]+)\|[\w]+> set the channel topic: (.*)$/

module.exports = {
  regex,

  description: 'channel topic tracker',

  requirePrefix: false,

  fn(message) {
    // Only process channel_topic messages
    if (message.subtype !== 'channel_topic') {
      return null;
    }
    // Only process messages that match the regex for user/topic
    const matches = regex.exec(message.text);
    if (matches.length < 3) {
      return null;
    }

    const author = matches[1];
    const authorName = names.idToName(author);
    const topic = matches[2];
    const channel = message.channel;
    const channelName = names.channelToName(channel);
    logger.info('Caught', channelName, 'topic change by', authorName, 'to', topic);

    const topicRecord = new Topic({
      creator: author,
      channel: channel,
      topic: topic,
      date: message.ts,
    });
    topicRecord.save().then(result => {
      return Topic.count();
    }).then(count => {
      const replyTo = {
        channel: message.channel,
        timestamp: message.ts
      };
      logger.info('total topics:', count);
      slackAPI.reactions.add('mag', replyTo);
      slackAPI.reactions.add('newspaper', replyTo);
    });
  }
};
