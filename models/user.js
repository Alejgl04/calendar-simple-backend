
const {Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  }, // String is shorthand for {type: String}
  email: {
    type: String,
    required: true,
    unique: true,
  }, // String is shorthand for {type: String}
  password: {
    type: String,
    required: true
  }
});


module.exports = model('User', UserSchema)