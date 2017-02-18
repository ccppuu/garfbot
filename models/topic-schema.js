const mongoose = require('mongoose');

const TopicSchema = mongoose.Schema({
  creator: String,
  channel: String,
  topic: String,
  date: String,
});

TopicSchema.plugin(require('mongoose-random'));
TopicSchema.plugin(require('mongoose-find-one-or-create'));

module.exports = mongoose.model('Topic', TopicSchema);
