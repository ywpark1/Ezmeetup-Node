'use strict';

module.exports = (sequelize, Sequelize) => {

    const userEventSchema = {
        // id: {
        //     type: Sequelize.INTEGER.UNSIGNED,
        //     primaryKey: false,
        //     autoIncrement: true
        // },
        eventDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    };

    const UserEvent = sequelize.define('user_event', userEventSchema, {});
    UserEvent.removeAttribute('id');

    return UserEvent;
};