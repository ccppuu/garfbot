const logger = require('../utils/logger');
const Wizard = require('../models/wizard-schema');
const slackAPI = require('../lib/slack-api');
const config = require('config');

const regex = /^<(http:\/\/www.elftown.com\/stuff\/[a-zA-Z0-9\-\.\_\%]+.jpg).*>/;

module.exports = {
  regex,

  description: 'rare wizards',

  requirePrefix: false,

  fn(message) {
    var wizRecord;
    const matches = regex.exec(message.text);
    if (matches.length < 2) {
      return null;
    }

    const url = matches[1];
    logger.info('I heard a wizard: ', url);


    Wizard.findOne({ url }, 'occurrences', (err, seenWizard) => {
      if (err) {
        logger.error('error', err);
        return null;
      }
      if (!seenWizard) {
        wizRecord = new Wizard({
          url,
          occurrences: 1,
        });
      } else {
        wizRecord = seenWizard;
        wizRecord.occurrences++;
      }
      logger.info('seen this wiz:', wizRecord.occurrences);

      return wizRecord.save()
        .then(result => {
          if (result.occurrences === 1) {
            slackAPI.chat.postMessage(
              message.channel,
              ':sparkles: :pray: PRAISE BE! A PREVIOUSLY UNSEEN WIZARD! :pray: :sparkles:',
              {
                username: config.username,
                icon_emoji: config.icon_emoji,
                unfurl_links: true,
                unfurl_media: true
              });
          }
          return Wizard.count();
        })
        .then(count => {
          logger.info('total wizards:', count);
          slackAPI.reactions.add('wizdick', {
            channel: message.channel,
            timestamp: message.ts
          });
          return null;
        })
        .catch(unknownErr => {
          logger.error('error', unknownErr);
        });
    });
  }
};
