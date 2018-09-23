'use strict';

const debug = require('debug')('app:startup');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const logger = require('./logger');

const morganFormat = ':method :url :status :response-time ms - :res[content-length]';
module.exports = function(app) {
    app.use(morgan(morganFormat, {
        skip: function (req, res) {
            return res.statusCode < 400
        },
        stream: logger.stream
    }));

    app.use(morgan(morganFormat, {
        skip: function (req, res) {
            return res.statusCode >= 400
        },
        stream: logger.stream
    }));

    debug('Morgan enabled...'); // debug module
}
