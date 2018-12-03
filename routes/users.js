"use strict";

/* /api/users */

const express = require("express");
const router = express.Router();

const userController = require("../controllers/UsersController");
const eventController = require("../controllers/EventsController");

// Middleware
const { authLocal, authJwt } = require("../middleware/auth");
const admin = require("../middleware/admin");

// Handling image
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      moment().format("YYYY_MM_DD_HH_mm_ss") +
        "-" +
        file.originalname.replace(/ /g, "-")
    );
  }
});
const upload = multer({ storage: storage });

const moment = require("moment");

// Users
router.get("/", [authJwt, admin], userController.findAll);

router.post("/register", userController.create);
router.get("/verify/:token", userController.verifyAccount);
router.post("/login", authLocal, userController.login);

router.get("/:userId", authJwt, userController.findById);
router.put("/:userId", authJwt, userController.update);
router.delete("/:userId", authJwt, userController.delete);

// router.put("/:userId/updatePassword", authJwt, userController.updatePassword);
// router.post("/:userId/updatePassword", (req, res) => {
//   res.send("Password update");
// });

// Events with User
router.get("/:userId/events", authJwt, userController.findAllEventsById); // list of events user joined
router.get(
  "/:userId/events/details/:eventId",
  authJwt,
  userController.findOneEventWithDetails
); // Get one joined event details

router.get(
  "/:userId/events/created",
  authJwt,
  userController.findAllEventsUserCreated
); // display the list of events current user created
router.put(
  "/:userId/events/edit/:eventId",
  authJwt,
  upload.single("eventImage"),
  eventController.update
); // update event info if user is a event creator
router.post("/:userId/events/join/:eventId", authJwt, userController.joinEvent); // Join the event
router.post(
  "/:userId/events/leave/:eventId",
  authJwt,
  userController.leaveEvent
); // Leave the event

router.delete(
  "/:userId/events/delete/:eventId",
  authJwt,
  eventController.delete
);

module.exports = router;
