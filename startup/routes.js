"use strict";

const users = require("../routes/users");
const events = require("../routes/events");
const home = require("../routes/home");
const auth = require("../routes/auth");
const categories = require("../routes/categories");
const chats = require("../routes/chats");

const express = require("express");

module.exports = function(app) {
  app.use(express.json());
  app.use("/", home);
  app.use("/api/users", users);
  app.use("/api/events", events);
  app.use("/api/categories", categories);
  app.use("/api/chats", chats);
  app.use("/api/auth", auth);
};
