const slack = require('@slack/client');
const dataStore = new slack.MemoryDataStore();
module.exports = dataStore;
