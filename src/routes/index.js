const mainController = require("../viewsTemplate/controller.viewsTemplate");
const loginController = require("../login/controller.login");
const registercontroller = require("../login/controller.register");
const createTeamController = require("../team/controller.createTeam");
const joinTeamController = require("../team/controller.joinTeam");

const router = (app) => {
  app.use("/", mainController);
  app.use("/login", loginController);
  app.use("/register", registercontroller);
  app.use("/createTeam", createTeamController);
  app.use("/joinTeam", joinTeamController);
};

module.exports = router;
