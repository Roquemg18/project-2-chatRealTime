const { Router } = require("express");
const chatAccess = require("../middleware/chat.access");

const router = Router();

router.get("/", chatAccess, (req, res) => {
  const username = req.session.user;
  res.render("index.handlebars", { username });
});

module.exports = router;
