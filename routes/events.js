"use strict";

/* /api/events */

const express = require("express");
const router = express.Router();

const eventController = require("../controllers/EventsController");

// Middleware
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const { authJwt } = require("../middleware/auth");

router.get("/", eventController.findAll);
router.post("/create", eventController.create);

router.get("/:eventId", eventController.findById);

module.exports = router;
