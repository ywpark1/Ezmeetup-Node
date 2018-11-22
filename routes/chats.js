"use strict";

/* /api/chats */

const express = require("express");
const router = express.Router();

const chatController = require("../controllers/ChatsController");

// Middleware
const { authJwt } = require("../middleware/auth");

router.get("/:eventId", authJwt, chatController.getAllByEventId);
router.post("/:eventId", authJwt, chatController.create);

module.exports = router;
