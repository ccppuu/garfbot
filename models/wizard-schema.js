const mongoose = require('mongoose');

const WizardSchema = mongoose.Schema({
  url: String,
  occurrences: Number,
});

WizardSchema.plugin(require('mongoose-random'));

module.exports = mongoose.model('Wizard', WizardSchema);
