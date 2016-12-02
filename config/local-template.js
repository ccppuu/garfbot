module.exports = {
  mongo: {
    db: 'garfbot-dev'
    user: 'garfbot',
    // TODO: Fill this in with he database password for your 'garfbot' user
    // in the garfbot database.
    password: null,
    // TODO: add the host for your mlab database here. For example:
    //    hosts: ["ds123456.mlab.com:98765"]
    hosts: [],
  },

  slack: {
    // TODO: Fill this in with your Slack API Token. You can find it at
    // https://goodsonicfanart.slack.com/apps/A0F7YS25R-bots
    // under your bot's config.
    api_token: null,
  },
};
