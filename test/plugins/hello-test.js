const assert = require('chai').assert;
const muxer = require('../../utils/muxer');

function mux(text) {
  return muxer({
    self: {
      id: 'test',
      name: 'test'
    },
    message: {
      text: `<@test>: ${text}`
    }
  }).then(results => {
    return results[0];
  });
}

describe('hello plugin', () => {
  it('should say hello', (done) => {
    mux('hello')
      .then(result => {
        assert.equal('hello', result);
        done();
      })
  });
});