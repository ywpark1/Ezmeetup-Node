'use strict';

// const jwt = require('jsonwebtoken');
// const config = require('config');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

// const User = require('./user');

module.exports = (sequelize, Sequelize) => {

    const userActivitySchema = {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true
        },

        loginStatus: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        }
    };

    const UserActivity = sequelize.define('userActivity', userActivitySchema, {});

    
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
    //         isAdmin: this.isAdmin
    //     };

    //     const token = jwt.sign(payload, config.get('jwtPrivateKey'), { expiresIn: config.get('tokenExp') }); // expires in seconds

    //     return token;
    // }

    return UserActivity;
};
