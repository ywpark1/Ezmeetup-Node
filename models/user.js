"use strict";

const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = (sequelize, Sequelize) => {
  const userSchema = {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    email: { type: Sequelize.STRING(250), unique: true, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
    firstName: { type: Sequelize.STRING(250), allowNull: false },
    lastName: { type: Sequelize.STRING(250), allowNull: false },
    phoneNumber: { type: Sequelize.STRING(40), allowNull: false },
    isAdmin: { type: Sequelize.BOOLEAN, defaultValue: 0 },
    loginStatus: { type: Sequelize.BOOLEAN, defaultValue: 0 },
    isVerified: { type: Sequelize.BOOLEAN, defaultValue: 0 }
  };

  const User = sequelize.define("user", userSchema, {});
  User.beforeCreate((user, option) => {
    return bcrypt.hash(user.password, saltRounds).then(hashedPw => {
      user.password = hashedPw;
    });
  });

  User.beforeUpdate(user => {
    if (user.changed("password") && user.password != "") {
      return bcrypt.hash(user.password, saltRounds).then(hashedPw => {
        user.password = hashedPw;
      });
    } else {
      user.password = user.previous.password;
    }
  });

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.prototype.userVerified = function() {
    return this.isVerified;
  };

  User.prototype.generateAuthToken = function() {
    const payload = {
      id: this.id,
      email: this.email,
      loginStatus: this.loginStatus,
      isAdmin: this.isAdmin
    };

    // const token = jwt.sign(payload, config.get('jwtPrivateKey'), { expiresIn: config.get('tokenExp') }); // expires in seconds
    const token = jwt.sign(payload, config.get("jwtPrivateKey")); // expires in seconds

    return token;
  };

  User.prototype.generateVerifyToken = function() {
    const payload = {
      id: this.id,
      email: this.email
    };

    // const token = jwt.sign(payload, config.get('jwtPrivateKey'), { expiresIn: config.get('tokenExp') }); // expires in seconds
    const token = jwt.sign(payload, config.get("jwtPrivateKey"), {
      expiresIn: "12h"
    }); // expires in seconds

    return token;
  };

  return User;
};

// let sql = "CREATE TABLE IF NOT EXISTS users (ID INT(11) NOT NULL AUTO_INCREMENT, email VARCHAR(250) NOT NULL, passwd VARCHAR(250) NOT NULL, firstName VARCHAR(100) default null, lastName VARCHAR(100) default null, phoneNumber VARCHAR(40) NOT NULL, createDate DATETIME DEFAULT CURRENT_TIMESTAMP, loginStatus TINYINT(1) DEFAULT 0, CONSTRAINT user_id_pk PRIMARY KEY (ID), CONSTRAINT users_email_uk UNIQUE (email) );";
