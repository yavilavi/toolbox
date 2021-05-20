const mongoose = require('mongoose');

const TextSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  title: String,
  date_created: Date,
});

module.exports = mongoose.model('Text', TextSchema);
