const config = require('config');
const SlackBot = require('slackbots');

const bot = new SlackBot({
  token: config.slack.api_token,
  name: 'garfbot'
});

bot.on('start', () => {
  const params = {
    icon_emoji: ':garf:'
  };

  bot.postMessageToChannel(config.default_room, 'meow', params);
});

bot.on('message', (data) => {
  console.log(data);
});