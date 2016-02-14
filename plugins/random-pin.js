const Pin = require('../models/pin-schema');

const regex = /random/;
module.exports = {
  regex,

  description: 'garf barf a random pin',

  fn() {
    return new Promise((resolve, reject) => {
      Pin.syncRandom((err, result) => {
        if (err) return reject(err);

        Pin.findRandom().limit(1).exec(function (err, pins) {
          if (err) return reject(err);
          return resolve(pins[0].url);
        });
      });
    });
  }
};