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

db.sequelize.sync({force: true})
    .then(() => {
        db.categories.bulkCreate([
            { categoryName: 'Food'},
            { categoryName: 'Event'},
            { categoryName: 'Sports'},
            { categoryName: 'Car Pool'},
            { categoryName: 'Conference'},
            { categoryName: 'Entertainment'}
        ]).then(() => {
            db.users.create({
                email: "admin@test.ca",
                password: "admin123",
                firstName: "Admin",
                lastName: "Admin",
                phoneNumber: "123-456-7890",
                isAdmin: true
            })
        }).then(() => {
            console.log('Drop and Resync with { force: true }');
        });
    });

// const port = process.env.PORT || 3000;
const port = 10034;

const server = app.listen(port, () => logger.info(`Listening on port ${port}...`));

module.exports = server;