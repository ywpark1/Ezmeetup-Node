"use strict";

module.exports = (sequelize, Sequelize) => {
  const userCategorySchema = {};

  const UserCategory = sequelize.define(
    "user_category",
    userCategorySchema,
    {}
  );
  UserCategory.removeAttribute("id");

  return UserCategory;
};
