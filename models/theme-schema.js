const mongoose = require('mongoose');

const ThemeSchema = mongoose.Schema({
  name: String,
  theme: String,
  creator: String,
});

ThemeSchema.plugin(require('mongoose-random'));
ThemeSchema.plugin(require('mongoose-find-one-or-create'));

module.exports = mongoose.model('Theme', ThemeSchema);
