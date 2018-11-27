"use strict";

/* /api/events */

const express = require("express");
const router = express.Router();

const eventController = require("../controllers/EventsController");

// Middleware
const { authJwt } = require("../middleware/auth");

// Handling image
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public");
  },
  filename: function(req, file, cb) {
    cb(null, moment().format("YYYY_MM_DD_HH_mm_ss") + "-" + file.originalname);
  }
});
const upload = multer({ storage: storage });

const moment = require("moment");

router.get("/", eventController.findAll);
router.get(
  "/withCategoriesOfUser/:userId",
  authJwt,
  eventController.findAllWithCategories
);

router.post(
  "/create",
  authJwt,
  upload.single("eventImage"),
  eventController.create
);

router.get("/:eventId", authJwt, eventController.findById);

router.get("/:eventId/users", authJwt, eventController.findAllUsersinEvent);

module.exports = router;
