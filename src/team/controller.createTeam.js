const { Router } = require("express");
const teams = require("../models/team.model");

const router = Router();

router.get("/", (req, res) => {
  res.render("createTeam.handlebars");
});

router.post("/", async (req, res) => {
  try {
    const { nameTeam, password } = req.body;
    const teamInfo = {
      password,
      nameTeam,
    };

    const newTeam = await teams.create(teamInfo);
    res.redirect("/joinTeam");
  } catch (error) {
    throw error;
  }
});

module.exports = router;
