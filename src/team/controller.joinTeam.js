const { Router } = require("express");
const teams = require("../models/team.model");
const Message = require("../models/teamMessage.model");

const router = Router();

router.get("/", (req, res) => {
  res.render("joinTeam.handlebars");
});

router.post("/", async (req, res) => {
  try {
    const { nameTeam, password } = req.body;
    const team = await teams.findOne({ nameTeam });

    if (team && team.password === password) {
      const teamId = team._id;
      const updatedTeam = await teams.findOneAndUpdate(
        { _id: teamId },
        { $push: { usuarios: { username: req.session.user } } },
        { new: true }
      );

      const messages = await Message.find({ teamId }).sort({ timestamp: 1 });

      return res.render("chatTeam.handlebars", { messages, teamId });
    } else {
      return res.status(401).send("Nombre de equipo o contraseña incorrectos");
    }
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return res.status(500).send("Error interno del servidor");
  }
});

module.exports = router;
