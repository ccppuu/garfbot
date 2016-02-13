const config = require('config');
const makeURL = require('mongo-make-url');

console.log(config.mongo);
const mongoURL = makeURL(config.mongo);
console.log(mongoURL);