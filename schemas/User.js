const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: {
    type: [String],
    default: ["User"]
  },
  refreshToken: String // Added for JWT refresh token functionality
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
