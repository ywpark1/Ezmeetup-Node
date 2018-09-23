'use strict';

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

require('express-async-errors');

const myFormat = printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

const logger = createLogger({
    format: combine(
        label({ label: process.env.NODE_ENV }),
        timestamp(),
        myFormat
    ),
    transports: [
        // new transports.Console(),
        new transports.File({ filename: 'logs/logfile.log' }),
    ]
});

logger.stream = {
    write: function (message, encoding) {
        logger.info(message.trim());
    }
};
  

module.exports = logger;