'use strict';

const express = require('express');
const router = express.Router();

const userController = require('../controllers/UsersController');

// Middleware
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', [auth, admin], userController.findAll);
router.post('/', userController.create);
// router.post('/login', userController.login);
router.get('/:userId', userController.findById);
router.put('/:userId', userController.update);
router.delete('/:userId', userController.delete);

module.exports = router;