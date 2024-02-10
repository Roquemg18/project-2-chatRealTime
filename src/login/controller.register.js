const { Router } = require("express");
const chatUsers = require("../models/user.model");
const router = Router();

router.get("/", async (req, res) => {
  const user = await chatUsers.find();

  res.render("register.handlebars");
});

router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUserInfo = {
      username,
      email,
      password,
    };

    const newUser = await chatUsers.create(newUserInfo);

    res.redirect("/");
  } catch (error) {
    throw error;
  }
});

module.exports = router;
