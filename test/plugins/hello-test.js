const assert = require('chai').assert;
const mux = require('../mux');

describe('hello plugin', () => {
  it('should say hello', (done) => {
    mux('hello')
      .then(result => {
        assert.equal('hello', result);
        done();
      });
  });
});