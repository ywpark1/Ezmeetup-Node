'use strict';

const Sequelize = require('sequelize');
const config = require('config');
const UserModel = require('../models/user');
const EventModel = require('../models/event');

const sequelize = new Sequelize(config.get('dbConfig'));
const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* Model/tables */
db.users = UserModel(sequelize, Sequelize);
db.events = EventModel(sequelize, Sequelize);

module.exports = db;