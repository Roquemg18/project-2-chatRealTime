const mongoose = require("mongoose");

const teamCollection = "team";

const teamSchema = new mongoose.Schema({
  nameTeam: {
    type: String,
    unique: true,
  },
  password: String,
  history: [
    {
      nameUser: String,
      text: String,
    },
  ],
  usuarios: [
    {
      username: String,
    },
  ],
});

const teams = mongoose.model(teamCollection, teamSchema);

module.exports = teams;
