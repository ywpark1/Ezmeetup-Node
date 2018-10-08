'use strict';

const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../startup/dbconnection').users;

module.exports = (sequelize, Sequelize) => {

    const eventSchema = {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true
        },
        eventName: {
            type: Sequelize.STRING(300),
            allowNull: false
        },
        eventLocation: {
            type: Sequelize.STRING(200),
            allowNull: true
        },
        eventDescription: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        eventCapacity: {
            type: Sequelize.INTEGER(3).UNSIGNED,
            allowNull: false
        },
        eventDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    };

    const Event = sequelize.define('event', eventSchema, {});
    // User.beforeCreate((user, option) => {
    //     return bcrypt.hash(user.password, saltRounds)
    //         .then(hashedPw => {
    //             user.password = hashedPw;
    //         });
    // });

    // User.prototype.validPassword = async function(password) {
    //     return await bcrypt.compare(password, this.password);
    // };

    // User.prototype.generateAuthToken = function() {
    //     const payload = {
    //         id: this.id,
    //         email: this.email,
    //         loginStatus: this.loginStatus,
    //         isAdmin: this.isAdmin
    //     };

    //     // const token = jwt.sign(payload, config.get('jwtPrivateKey'), { expiresIn: config.get('tokenExp') }); // expires in seconds
    //     const token = jwt.sign(payload, config.get('jwtPrivateKey')); // expires in seconds

    //     return token;
    // }

    return Event;
};