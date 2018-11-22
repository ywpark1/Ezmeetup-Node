"use strict";

const config = require("config");
const express = require("express");
const app = express();

const logger = require("./startup/logger");

/* import app.use() */
require("./startup/prod")(express, app);
require("./startup/routes")(app);
app.get("env") === "development" ? require("./startup/dev")(app) : null;

console.log("\nApplication Name: " + config.get("name") + "\n");

const db = require("./startup/dbconnection");

// const port = process.env.PORT || 3000;
const port = 10034;

const server = require("http").Server(app);

server.listen(port, () => logger.info(`Listening on port ${port}...`));

module.exports = server;
