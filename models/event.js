"use strict";

const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../startup/dbconnection").users;

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

  const Event = sequelize.define("event", eventSchema, {});

  return Event;
};
