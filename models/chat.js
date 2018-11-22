"use strict";

const config = require("config");

module.exports = (sequelize, Sequelize) => {
  const chatSchema = {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    message: {
      type: Sequelize.STRING(300),
      allowNull: false
    }
  };

  const Chat = sequelize.define("chats", chatSchema, {});

  return Chat;
};
