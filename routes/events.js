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
router.post('/create', eventController.create);

router.get('/:eventId', authJwt, eventController.findById);


module.exports = router;