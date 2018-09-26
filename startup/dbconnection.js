'use strict';

const Sequelize = require('sequelize');
const config = require('config');
const UserModel = require('../models/user');
const UserActivityModel = require('../models/userActivity');

const sequelize = new Sequelize(config.get('dbConfig'));
const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* Model/tables */
db.users = UserModel(sequelize, Sequelize);
db.useractivities = UserActivityModel(sequelize, Sequelize);

db.useractivities.belongsTo(db.users);
module.exports = db;