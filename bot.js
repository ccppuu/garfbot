const config = require('config');
const muxer = require('./utils/muxer');
const SlackBot = require('slackbots');

const params = {
  icon_emoji: ':garf:'
};

const bot = new SlackBot({
  token: config.slack.api_token,
  name: config.username
});

bot.on('message', (data) => {
  switch (data.type) {
    case 'message':
      const reply = muxer(data);
      if (reply) {
        bot.postMessageToChannel(config.slack.default_room, reply, params)
          .fail(console.error);
      }
      break;
  }
});