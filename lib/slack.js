const config = require('config');
const logger = require('../utils/logger');
const Slack = require('slack-client');

const slack = new Slack(config.slack.api_token, true, true);

slack.on('open', () => {
  logger.info(`Connected to ${slack.team.name} as @${slack.self.name}`);
});

slack.on('error', error => {
  logger.error(error);
});

slack.login();

module.exports = slack;