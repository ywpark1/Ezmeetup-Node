"use strict";

const Sequelize = require("sequelize");
const config = require("config");
const UserModel = require("../models/user");
const EventModel = require("../models/event");
const UserEventModel = require("../models/userEvent");
const CategoryModel = require("../models/category");
const EventCategoryModel = require("../models/eventCategory");

const sequelize = new Sequelize(config.get("dbConfig"));
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* Model/tables */
db.users = UserModel(sequelize, Sequelize);
db.events = EventModel(sequelize, Sequelize);
db.userEvents = UserEventModel(sequelize, Sequelize);
db.categories = CategoryModel(sequelize, Sequelize);
db.eventCategories = EventCategoryModel(sequelize, Sequelize);

db.events.belongsTo(db.users, {
  foreignKey: { name: "userId", allowNull: false }
});

db.userEvents.belongsTo(db.users, {
  foreignKey: { primaryKey: true, name: "userId", allowNull: false }
});
db.users.hasMany(db.userEvents, {
  foreignKey: "userId",
  constraints: false
});

db.userEvents.belongsTo(db.events, {
  foreignKey: { primaryKey: true, name: "eventId", allowNull: false }
});
db.events.hasMany(db.userEvents, {
  foreignKey: "eventId",
  constraints: false
});

db.eventCategories.belongsTo(db.events, {
  foreignKey: { primaryKey: true, name: "eventId", allowNull: false }
});
db.events.hasMany(db.eventCategories, {
  foreignKey: "eventId",
  constraints: false
});

db.eventCategories.belongsTo(db.categories, {
  foreignKey: { primaryKey: true, name: "categoryId", allowNull: false }
});
db.categories.hasMany(db.eventCategories, {
  foreignKey: "categoryId",
  constraints: false
});

module.exports = db;
