const logger = require('../utils/logger');
const Pin = require('../models/pin-schema');
const regex = /pin (\S*)/;

module.exports = {
  regex,

  description: 'pin links to slack',

  fn(message) {
    const matches = regex.exec(message.text);
    if (matches.length < 2) {
      return Promise.resolve('gimme a cool url 2 pin :sunglasses:');
    }

    const url = matches[1];
    const pin = new Pin({ url });

    return pin.save()
      .then(result => {
        logger.info(`saved ${url}`);
        return Pin.count();
      })
      .then(count => {
        logger.info('total pins:', count);
        return `pinned ${url} :garf:`;
      })
      .catch(err => {
        logger.error('error', err);
      });
  }
};