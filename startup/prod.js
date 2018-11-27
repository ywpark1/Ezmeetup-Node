const helmet = require("helmet");
const compression = require("compression");
const passport = require("passport");

module.exports = function(express, app) {
  app.set("view engine", "pug"); // Template Engine(use with render)
  app.set("views", "./views"); // all pug files are located for views

  app.use(helmet());
  app.use(compression());
  app.use(express.urlencoded({ extended: true })); //key=value&key=value
  // app.use(express.static('public'));
  app.use("/public", express.static("public"));

  app.use(passport.initialize());
};
