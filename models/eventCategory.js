'use strict';

module.exports = (sequelize, Sequelize) => {

    const eventCategorySchema = {};

    const EventCategory = sequelize.define('event_category', eventCategorySchema, {});
    EventCategory.removeAttribute('id');

    return EventCategory;
};