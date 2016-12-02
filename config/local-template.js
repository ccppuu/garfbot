module.exports = {
  // Secrets for accessing the Google APIs. You'll need to grab these
  // from someone that has them.
  google: {
    cse_id: null,
    api_key: null,
  },

  mongo: {
    db: 'garfbot-dev'
    user: 'garfbot',
    // TODO: Fill this in with he database password for your 'garfbot' user
    // in the garfbot database.
    password: null,
    // TODO: add the host for your mlab database here. For example:
    //    hosts: ["ds123456.mlab.com:98765"]
    // You can find this at https://mlab.com/databases/garfbot-dev
    hosts: [],
  },

  slack: {
    default_room: 'shitposting-garfbot'
    // TODO: Fill this in with your Slack API Token. You can find it at
    // https://goodsonicfanart.slack.com/apps/A0F7YS25R-bots
    // under your bot's config.
    api_token: null,
  },

  // Secrets for accessing the Twitter API. You'll either need to grab the
  // Garfbot secrets from someone that has them, or create your own Twitter app
  // for your local garfbot at http://apps.twitter.com/.
  twitter: {
    consumer_key: null,
    consumer_secret: null,
    access_token: null,
    access_token_secret: null,
  },
};
