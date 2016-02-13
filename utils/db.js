const config = require('config');
const makeURL = require('mongo-make-url');
const mongoose = require('mongoose');

const mongoURL = makeURL(config.mongo);
return mongoose.connect(mongoURL);
