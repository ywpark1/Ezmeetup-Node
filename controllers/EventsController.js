const _ = require('lodash');
// const jwt = require('jsonwebtoken');
const db = require('../startup/dbconnection');
// const config = require('config');
const Event = db.events;
const User = db.users;

// Display list of all Events.
exports.findAll = (req, res) => {
    Event.findAll()
        .then(events => {
            res.send(events);
        }).catch(err => {
            res.status(400).send(err.errors[0].message);
        });
};

exports.findAllWithUser = (req, res) => {
    Event.findAll({ where: { userId: req.params.userId } })
        .then(events => {
            res.send(events);
        }).catch(err => {
            res.status(400).send(err.errors[0].message);
        });
};

// Create new event
exports.create = (req, res) => {
    Event.create({
        eventName: req.body.eventName,
        eventLocation: req.body.eventLocation,
        eventDescription: req.body.eventDescription,
        eventCapacity: req.body.eventCapacity,
        eventDate: req.body.eventDate,
        userId: req.body.userId
    }).then(event => {
        res.status(201).send(event);
    }).catch(err => {
        if(err.name === "SequelizeForeignKeyConstraintError") {
            res.status(400).send("Event creator does not exist");
        }
        res.status(400).send(err);
    });
};



// Find a User by Id
exports.findById = (req, res) => {
    Event.findOne({ where: { id: req.params.eventId } })
        .then(event => {
            if (!event) {
                res.status(404).send('Event not found');
            } else {
                res.status(200).send(event);
            }
        }).catch(err => {
            res.status(400).send(err);
        });
};

// Update User info
exports.update = (req, res) => {
    const userId = req.params.userId;
    const eventId = req.params.eventId;

    Event.findOne({
        where: {
            id: eventId,
            userId: userId
        }
    })
        .then(event => {
            if (!event) {
                res.status(404).send('Event not found');
            }

            return event.update({
                eventName: req.body.eventName,
                eventLocation: req.body.eventLocation,
                eventDescription: req.body.eventDescription,
                eventCapacity: req.body.eventCapacity,
                eventDate: req.body.eventDate,
            })
        })
        .then(event => {
            res.status(200).send(event);
            // res.status(200).send("Updated successfully a event with id = " + id);
            
        }).catch(err => {
            res.status(400).send(err);
        });
};

// Delete a User by Id
exports.delete = (req, res) => {
    const userId = req.params.userId;
    const eventId = req.params.eventId;
    Event.destroy({
        where: { id: eventId, userId: userId }
    }).then(() => {
        res.status(200).send('deleted successfully a User with id = ' + id);
    });
};