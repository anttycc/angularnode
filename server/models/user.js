const mongoose = require('mongoose');
const { stringify } = require('querystring');
const userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNumber: { type: Number, required: true },
  profileImage: { type: String }

})
module.exports = mongoose.model('User', userSchema);