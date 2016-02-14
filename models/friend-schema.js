const mongoose = require('mongoose');

const FriendSchema = mongoose.Schema({
  twitter_handle: String,
  slack_id: String
});

module.exports = mongoose.model('Friend', FriendSchema);;