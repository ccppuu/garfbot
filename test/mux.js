const muxer = require('../utils/muxer');

module.exports = function mux(text) {
  return muxer({
    self: {
      id: 'test',
      name: 'test'
    },
    message: {
      text: `<@test>: ${text}`
    }
  })
  .then(results => {
    return results[0];
  });
};