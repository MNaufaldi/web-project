const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  ID: {
      type: String,
      required: true
  },
  Username: {
      type: String,
      required: true
  },
  Password: {
      type: String,
      required: true
  },
  First_name: {
      type: String,
      required: true
  },
  Last_name: {
      type: String,
      required: false
  },
  Photo: {
      type: String,
      required: true
  },
  DateOfBirth: {
      type: Date,
      required: true
  }
});

module.exports = mongoose.model('User', userSchema);
