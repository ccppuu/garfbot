const mongoose = require('mongoose');

const Pin = mongoose.model('Pin', {
  url: String
});

module.exports = Pin;
