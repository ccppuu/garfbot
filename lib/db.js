const config = require('config');
const makeURL = require('mongo-make-url');
const mongoose = require('mongoose');
const logger = require('../utils/logger');

mongoose.Promise = require('bluebird');

const mongoURL = makeURL(config.mongo);
logger.info(`Connecting to mongo at ${mongoURL}`);

const db = mongoose.connect(mongoURL);
const connection = mongoose.connection;

connection.on('error', err => {
  logger.error('A database error occurred');
  logger.error(err);
});

connection.once('open', () => {
  logger.info(`Connected to mongo at ${mongoURL}`);
});

module.exports = connection;
