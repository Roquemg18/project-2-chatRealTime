const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  const username = req.session.username;

  res.render("index.handlebars", { username });
});

module.exports = router;
