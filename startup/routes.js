'use strict';

const users = require('../routes/users');
const events = require('../routes/events');
const home = require('../routes/home');
const auth = require('../routes/auth');

const express = require('express');

module.exports = function(app) {
    app.use(express.json());
    app.use('/', home);
    app.use('/api/users', users);
    app.use('/api/events', events);
    app.use('/api/auth', auth);
    // app.use(error);
}