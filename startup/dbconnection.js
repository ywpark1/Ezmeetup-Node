'use strict';

const Sequelize = require('sequelize');
const config = require('config');
const UserModel = require('../models/user');
const EventModel = require('../models/event');
const UserEventModel = require('../models/userEvent');

const sequelize = new Sequelize(config.get('dbConfig'));
const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* Model/tables */
db.users = UserModel(sequelize, Sequelize);
db.events = EventModel(sequelize, Sequelize);
db.userEvents = UserEventModel(sequelize, Sequelize);

db.events.belongsTo(db.users, { foreignKey: { name: 'userId', allowNull: false }});

db.userEvents.belongsTo(db.users, { foreignKey: { primaryKey: true, name: 'userId', allowNull: false }});
db.userEvents.belongsTo(db.events, { foreignKey: { primaryKey: true, name: 'eventId', allowNull: false }});

module.exports = db;