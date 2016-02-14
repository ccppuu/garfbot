const mongoose = require('mongoose');

const PinSchema = mongoose.Schema({
  url: String
});

PinSchema.plugin(require('mongoose-random'));

module.exports = mongoose.model('Pin', PinSchema);
