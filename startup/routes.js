'use strict';

const users = require('../routes/users');
const home = require('../routes/home');

const express = require('express');

module.exports = function(app) {
    app.use(express.json());
    app.use('/', home);
    app.use('/api/users', users);
    // app.use(error);
}