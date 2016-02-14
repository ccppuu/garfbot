const assert = require('chai').assert;
const mux = require('../mux');

describe('pin plugin', () => {
  it('should pin URLs', (done) => {
    mux('pin http://google.com')
      .then(result => {
        assert.equal('pinned http://google.com :garf:', result);
        done();
      })
      .catch(done);
  });
});