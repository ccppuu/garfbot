module.exports = {
  regex: /hello/,

  description: 'say hello with garf',

  fn: (data) => {
    return Promise.resolve('hello');
  }
};