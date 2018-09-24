'use strict';

const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (sequelize, Sequelize) => {

    const userSchema = {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true
        },
        email: {
            type: Sequelize.STRING(250),
            unique: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        firstName: {
            type: Sequelize.STRING(250),
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING(250),
            allowNull: false
        },
        phoneNumber: {
            type: Sequelize.STRING(40),
            allowNull: false
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        },
        loginStatus: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        }
    };

    const User = sequelize.define('user', userSchema, {});
    User.beforeCreate((user, option) => {
        return bcrypt.hash(user.password, saltRounds)
            .then(hashedPw => {
                user.password = hashedPw;
            });
    });

    User.prototype.validPassword = async function(password) {
        return await bcrypt.compare(password, this.password);
    };

    User.prototype.generateAuthToken = function() {
        const payload = {
            id: this.id,
            email: this.email,
            admin: this.isAdmin
        };

        const token = jwt.sign(payload, config.get('jwtPrivateKey'));

        return token;
    }

    return User;
};

    // let sql = "CREATE TABLE IF NOT EXISTS users (ID INT(11) NOT NULL AUTO_INCREMENT, email VARCHAR(250) NOT NULL, passwd VARCHAR(250) NOT NULL, firstName VARCHAR(100) default null, lastName VARCHAR(100) default null, phoneNumber VARCHAR(40) NOT NULL, createDate DATETIME DEFAULT CURRENT_TIMESTAMP, loginStatus TINYINT(1) DEFAULT 0, CONSTRAINT user_id_pk PRIMARY KEY (ID), CONSTRAINT users_email_uk UNIQUE (email) );";
