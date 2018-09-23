'use strict';

const config = require('config');
const express = require('express');
const app = express();

const logger = require('./startup/logger');

/* import app.use() */
require('./startup/prod')(express, app);
require('./startup/routes')(app);
app.get('env') === 'development' ? require('./startup/dev')(app) : null;

console.log('Application Name: ' + config.get('name') + '\n');

const db = require('./startup/dbconnection');

// db
//   .authenticate()
//   .then(() => {
//     logger.info('Connection has been established successfully.');
//   })
//   .catch(err => {
//     logger.error('Unable to connect to the database:', err);
// });

db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync with { force: true }');
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => logger.info(`Listening on port ${port}...`));

module.exports = server;