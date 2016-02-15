const config = require('config');
const logger = require('../utils/logger');
const slack = require('slack-client');

const webClient = new slack.WebClient(config.slack.api_token);
module.exports = webClient;