"use strict";

/* /api/users */

const express = require("express");
const router = express.Router();

const userController = require("../controllers/UsersController");
const eventController = require("../controllers/EventsController");

// Middleware
const { authLocal, authJwt } = require("../middleware/auth");
const admin = require("../middleware/admin");

const User = require("../startup/dbconnection").users;

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
router.put("/:userId/events/edit/:eventId", authJwt, eventController.update); // update event info if user is a event creator
router.post("/:userId/events/join/:eventId", userController.joinEvent); // Join the event
router.post("/:userId/events/leave/:eventId", userController.leaveEvent); // Leave the event

module.exports = router;
