const assert = require('chai').assert;
const validURL = require('valid-url');
const mux = require('../mux');

describe('hello plugin', () => {
  it('should say hello', (done) => {
    mux('gis garfield')
      .then(result => {
        assert(validURL.isUri(result), 'result must be a valid image URL');
        done();
      });
  });
});