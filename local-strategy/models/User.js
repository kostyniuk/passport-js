const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = ({
  username: {type: String, required: true},
  hash: {type: String, required: true},
  salt: {type: String, required: true}
})

module.exports = mongoose.model('User', UserSchema);