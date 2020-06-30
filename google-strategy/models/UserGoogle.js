const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: String,
  password: String,
  provider: String,
  providerId: String,
  fullName: String,
  email: String,
  picture: String,
});

mongoose.model('UserGoogle', UserSchema);
