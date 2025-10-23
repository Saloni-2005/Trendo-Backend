const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  displayName: {type: String, required: true},
  bio: {type: String, required: true},
  avatarUrl: {type: String, required: true},
  followersCount: {type: Number, default: 0},
  followingCount: {type: Number, default: 0},
  settings: {
    private: {type: Boolean, default: false},
    notifications: {type: Object, default: {}},
  },
});


module.exports = mongoose.model("User", UserSchema);