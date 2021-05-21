const mongoose = require('mongoose');

// eslint-disable-next-line node/no-unsupported-features/es-syntax
// const regexp = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
  },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);
