const config = require('config');
const Twit = require('twit');

module.exports = new Twit(config.twitter);