const { Router } = require("express");
const chatUsers = require("../models/user.model");
const router = Router();

router.get("/", async (req, res) => {
  res.render("login.handlebars");
});

router.get("/username", (req, res) => {
  const username = req.session.user;
  res.json({ username });
});

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.json({ error });
    res.redirect("/login");
  });
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await chatUsers.findOne({ username });

    if (user && user.password === password) {
      req.session.user = username;
      console.log("inicio exitoso");
      res.redirect("/");
    } else {
      const errorLogin = "credenciales incorrectas";
      res.render("login.handlebars", { errorLogin: errorLogin });
    }
  } catch (error) {
    throw error;
  }
});

module.exports = router;
