const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  dob: String
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
