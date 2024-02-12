const express = require("express");
const handlebars = require("express-handlebars");
const session = require("express-session");
const mongoConnect = require("../db/index.js");
const router = require("./router/index.js");

const app = express();

app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

mongoConnect();
router(app);
module.exports = app;
