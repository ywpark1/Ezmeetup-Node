'use strict';

/* /api/events */

const express = require('express');
const router = express.Router();

const eventController = require('../controllers/EventsController');

// Middleware
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const { authJwt } = require('../middleware/auth');


router.get('/', [authJwt, admin], eventController.findAll);
// router.get('/user/:userId', eventController.findAllWithUser);
router.post('/create', eventController.create);
// router.post('/login', authLocal, eventController.login);
// // router.post('/login', eventController.login);
// router.get('/:userId', eventController.findById);
// router.put('/:userId', eventController.update);
// router.delete('/:userId', eventController.delete);

// router.get('/hello', authJwt, (req, res) => {
//     res.send('This is a private route!!!!');
// });


module.exports = router;