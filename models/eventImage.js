"use strict";

module.exports = (sequelize, Sequelize) => {
  const eventImageSchema = {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    image: {
      type: Sequelize.TEXT,
      allowNull: true
    }
  };

  const EventImage = sequelize.define("event_image", eventImageSchema, {});
  //   EventImage.removeAttribute("id");

  return EventImage;
};
