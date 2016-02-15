const config = require('config');
const logger = require('../utils/logger');
const slack = require('slack-client');
const dataStore = require('./slack-store');

const realTimeClient = new slack.RtmClient(config.slack.api_token, {
  dataStore,
  logLevel: 'info'
});

realTimeClient.on('open', () => {
  logger.info('connected');
  logger.info(dataStore);
});

realTimeClient.on('error', error => {
  logger.error(error);
});

realTimeClient.start();

module.exports = realTimeClient;