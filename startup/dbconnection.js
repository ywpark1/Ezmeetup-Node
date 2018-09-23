'use strict';

const Sequelize = require('sequelize');
const config = require('config');
const UserModel = require('../models/user');

const sequelize = new Sequelize(config.get('dbConfig'));
const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* Model/tables */
db.users = UserModel(sequelize, Sequelize);


module.exports = db;