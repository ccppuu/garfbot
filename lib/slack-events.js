const config = require('config');
const logger = require('../utils/logger');
const slack = require('@slack/client');
const dataStore = require('./slack-store');

const realTimeClient = new slack.RtmClient(config.slack.api_token, {
  dataStore,
  logLevel: 'info'
});

realTimeClient.on('open', () => {
  const userID = realTimeClient.activeUserId;
  const team = realTimeClient.activeTeamId;
  logger.info(`connected to slack team ${team} as ${userID}`);
});

realTimeClient.on('error', error => {
  logger.error(error);
});

realTimeClient.start();

module.exports = realTimeClient;
