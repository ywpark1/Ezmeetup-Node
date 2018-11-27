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
    eventAddress1: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    eventAddress2: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    eventCity: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    eventProvince: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    eventPostalCode: {
      type: Sequelize.STRING(10),
      allowNull: false
    },
    eventLocation: {
      type: Sequelize.STRING(300),
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
