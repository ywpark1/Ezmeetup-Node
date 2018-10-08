'use strict';

/* /api/users */

const express = require('express');
const router = express.Router();

const userController = require('../controllers/UsersController');
const eventController = require('../controllers/EventsController');

// Middleware
const { authLocal, authJwt } = require('../middleware/auth');
const admin = require('../middleware/admin');

const User = require('../startup/dbconnection').users;
const bcrypt = require('bcrypt');


router.get('/', userController.findAll);
router.post('/register', userController.create);
router.post('/login', authLocal, userController.login);
router.get('/:userId', userController.findById);
router.get('/:userId/events', eventController.findAllWithUser);
// router.put('/:userId', userController.update);
router.put('/:userId', authJwt, userController.update);
// router.put('/:userId', authJwt, (req, res) => {
//     res.send("aa");
// });
router.delete('/:userId', userController.delete);

// router.get('/hello', authJwt, (req, res) => {
//     res.send('This is a private route!!!!');
// });


module.exports = router;