'use strict';

module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user', {
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
            type: Sequelize.STRING(250),
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
        // createdAt: {
        //     type: Sequelize.DATE,
        //     defaultValue: Sequelize.NOW
        // },
        loginStatus: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        }
    })
};

    // let sql = "CREATE TABLE IF NOT EXISTS users (ID INT(11) NOT NULL AUTO_INCREMENT, email VARCHAR(250) NOT NULL, passwd VARCHAR(250) NOT NULL, firstName VARCHAR(100) default null, lastName VARCHAR(100) default null, phoneNumber VARCHAR(40) NOT NULL, createDate DATETIME DEFAULT CURRENT_TIMESTAMP, loginStatus TINYINT(1) DEFAULT 0, CONSTRAINT user_id_pk PRIMARY KEY (ID), CONSTRAINT users_email_uk UNIQUE (email) );";
