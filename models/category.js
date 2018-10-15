'use strict';

module.exports = (sequelize, Sequelize) => {

    const categorySchema = {
        id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
        },
        categoryName: {
            type: Sequelize.STRING(100),
            unique: true,
            allowNull: false
        },
    };

    const Category = sequelize.define('category', categorySchema, {});

    return Category;
};