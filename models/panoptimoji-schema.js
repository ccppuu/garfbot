const mongoose = require('mongoose');

const PanoptimojiSchema = mongoose.Schema({
  user: String,
  emoji: String,
  count: Number,
});

PanoptimojiSchema.plugin(require('mongoose-random'));
PanoptimojiSchema.plugin(require('mongoose-find-one-or-create'));

module.exports = mongoose.model('Panoptimoji', PanoptimojiSchema);
