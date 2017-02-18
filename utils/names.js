const slackClient = require('../lib/slack-events');

/**
 * @param {string} userID - a slack user ID (e.g. 'U0M6V40S1')
 * @returns {string} the friendly user name or 'Unknown'
 */
const idToName = (userID) => {
  const uInfo = slackClient.dataStore.users[userID];
  return uInfo ? uInfo.name : 'Unknown';
};

/**
 * @param {string} channelID - a slack channel ID (e.g. 'C39FWB6SF')
 * @returns {string} the friendly channel name or 'Unknown'
 */
const channelToName = (channelID) => {
  const cInfo = slackClient.dataStore.getChannelById(channelID);
  return cInfo ? cInfo.name : 'Unknown';
};

/**
 * @param {string} username - a friendly username (e.g. 'cpu')
 * @returns {string} a 'quiet' version of the name that won't alert (e.g.
 * 'c.pu')
 */
const quietName = (username) => {
  if (!username || username.length < 2) {
    return username;
  }
  return `${username[0]}.${username.substring(1)}`;
};

module.exports = {
  idToName,
  quietName,
  channelToName,
};
