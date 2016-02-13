const config = require('config');
const Twit = require('twit');

const client = !!config.twitter.consumer_key ? new Twit(config.twitter) : {};
module.exports = client;