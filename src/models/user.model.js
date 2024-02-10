const mongoose = require("mongoose");

const userCollection = "chatUser";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

const chatUsers = mongoose.model(userCollection, userSchema);

module.exports = chatUsers;
