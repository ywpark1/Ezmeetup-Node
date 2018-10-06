'use strict';

/* /api/events */

const express = require('express');
const router = express.Router();

const eventController = require('../controllers/EventsController');

// Middleware
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const { authLocal, authJwt } = require('../middleware/auth');


router.get('/', eventController.findAll);
router.post('/register', eventController.create);
router.post('/login', authLocal, eventController.login);
// router.post('/login', eventController.login);
router.get('/:userId', eventController.findById);
router.put('/:userId', eventController.update);
router.delete('/:userId', eventController.delete);

// router.get('/hello', authJwt, (req, res) => {
//     res.send('This is a private route!!!!');
// });


module.exports = router;