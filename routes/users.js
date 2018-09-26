'use strict';

/* /api/users */

const express = require('express');
const router = express.Router();

const userController = require('../controllers/UsersController');

// Middleware
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const { authLocal, authJwt } = require('../middleware/auth');


router.get('/', userController.findAll);
router.post('/register', userController.create);
router.post('/login', authLocal, userController.login);
// router.post('/login', userController.login);
router.get('/:userId', userController.findById);
router.put('/:userId', userController.update);
router.delete('/:userId', userController.delete);

// router.get('/hello', authJwt, (req, res) => {
//     res.send('This is a private route!!!!');
// });


module.exports = router;