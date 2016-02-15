module.exports = {
  regex: /hello/,

  description: 'say hello with garf',

  requirePrefix: true,

  fn(data) {
    return Promise.resolve('hello');
  }
};