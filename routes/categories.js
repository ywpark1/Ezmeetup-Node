"use strict";

/* /api/categories */

const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/CategoriesController");

// Middleware
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const { authJwt } = require("../middleware/auth");

router.get("/", categoryController.findAll);
// router.post("/create", eventController.create);

// router.get("/:eventId", authJwt, eventController.findById);

module.exports = router;
