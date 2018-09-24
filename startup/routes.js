'use strict';

const users = require('../routes/users');
const home = require('../routes/home');
const auth = require('../routes/auth');

const express = require('express');

module.exports = function(app) {
    app.use(express.json());
    app.use('/', home);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    // app.use(error);
}